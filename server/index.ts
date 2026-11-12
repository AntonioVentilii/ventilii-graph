import Anthropic from '@anthropic-ai/sdk';
import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import {
	AI_INPUT_LIMITS,
	type AiHealth,
	type AiMode,
	type AiRequest,
	type AiResponse
} from '../src/lib/types/ai.types.ts';
import { LOCALES } from '../src/lib/types/portfolio.types.ts';
import { cacheGet, cacheKey, cachePut, type Outcome } from './cache.ts';
import { EFFORT, MODEL, auth, client, configured } from './claude.ts';
import { createCostGuard, type Price } from './cost-guard.ts';
import { portEnv, positiveNumberEnv } from './env.ts';
import { limitKey } from './limit-key.ts';
import { SCHEMAS, SYSTEM_PROMPT, buildTurn, cleanResult, leaksNotes, readGuard } from './modes.ts';

/**
 * The AI version's API: one JSON endpoint in front of the Claude API. It runs
 * next to nginx in the same container (see docker/start.sh), which
 * proxies /api/ to it. No state beyond memory: limits and the answer cache
 * reset on restart, which is fine for a portfolio.
 */

const PORT = portEnv({ name: 'AI_PORT', fallback: 8787 });

// Cost guards. A visitor gets a handful of generations; the whole site gets a
// daily request count AND a daily dollar budget, measured from real token
// usage. Per-IP limits can be dodged by rotating addresses; the dollar budget
// cannot, so it is the hard ceiling on what an abusive visitor can spend.
// Cached answers are free and don't count.
const PER_IP_WINDOW_MS = 10 * 60 * 1000;
const PER_IP_PER_WINDOW = positiveNumberEnv({ name: 'AI_PER_IP_PER_10_MIN', fallback: 6 });
const PER_IP_PER_DAY = positiveNumberEnv({ name: 'AI_PER_IP_PER_DAY', fallback: 25 });
const DAILY_LIMIT = positiveNumberEnv({ name: 'AI_DAILY_LIMIT', fallback: 300 });
const DAILY_BUDGET_USD = positiveNumberEnv({ name: 'AI_DAILY_BUDGET_USD', fallback: 5 });
const MAX_IN_FLIGHT = 4;
// Off-topic or manipulative requests (see Guard) count as strikes against the
// visitor's address. At this many in a day the address gets no more
// generations until midnight UTC, so whoever keeps trying to use the chat as
// a free model stops spending the budget real visitors need.
const STRIKES_PER_DAY = positiveNumberEnv({ name: 'AI_GUARD_STRIKES_PER_DAY', fallback: 2 });

// Output ceiling per mode, thinking included. The JSON each mode asks for fits
// well inside these; a prompt that talks the model into a long translation or
// essay gets cut off here instead of running to the model's maximum.
const MAX_OUTPUT_TOKENS: Record<AiMode, number> = { ask: 5_000, fit: 8_000, deck: 8_000 };

// USD per million tokens, by the model that ran an attempt: the configured
// model, and the one `fallbacks: 'default'` retries a declined request on
// (claude-opus-4-8 for claude-opus-5). Cache reads bill at 0.1x input and
// 1-hour cache writes at 2x. AI_PRICE_IN_PER_MTOK / AI_PRICE_OUT_PER_MTOK set
// the configured model's prices: required when AI_MODEL is not in the table,
// and an override when it is. A model not in the table (a fallback's dated
// snapshot id, say) is billed at the dearest price known, so the budget errs
// high.
const PRICES: Record<string, Price> = {
	'claude-opus-5-5': { in: 4, out: 20 },
	'claude-opus-5': { in: 5, out: 25 },
	'claude-opus-4-8': { in: 5, out: 25 }
};
PRICES[MODEL] = {
	in: positiveNumberEnv({ name: 'AI_PRICE_IN_PER_MTOK', fallback: PRICES[MODEL]?.in ?? 5 }),
	out: positiveNumberEnv({ name: 'AI_PRICE_OUT_PER_MTOK', fallback: PRICES[MODEL]?.out ?? 25 })
};
const MAX_BODY_BYTES = 64 * 1024;

const costGuard = createCostGuard({
	perIpWindowMs: PER_IP_WINDOW_MS,
	perIpPerWindow: PER_IP_PER_WINDOW,
	perIpPerDay: PER_IP_PER_DAY,
	dailyLimit: DAILY_LIMIT,
	dailyBudgetUsd: DAILY_BUDGET_USD,
	strikesPerDay: STRIKES_PER_DAY,
	maxInFlight: MAX_IN_FLIGHT,
	maxOutputTokens: MAX_OUTPUT_TOKENS,
	prices: PRICES
});

// The /ask privacy note promises IPs are gone at midnight UTC; otherwise they
// are only cleared when a later request arrives. cache.ts does the same for
// answers.
setInterval(costGuard.rollDay, 60 * 1000).unref();

// --- request parsing ------------------------------------------------------

// Only the site's own page may spend the budget. A cross-site page can POST
// here without a CORS preflight as long as the body is a "simple" type
// (text/plain), and the browser then runs the generation even though it
// hides the response: each visitor of such a page would burn a generation
// from their own IP. Requiring application/json forces a preflight, which
// this server never approves; Sec-Fetch-Site, where the browser sends it,
// settles it outright. Non-browser clients send neither and pass.
const isSameSite = (req: IncomingMessage): boolean => {
	const type = req.headers['content-type'] ?? '';
	if (!type.toLowerCase().startsWith('application/json')) {
		return false;
	}
	const site = req.headers['sec-fetch-site'];
	return site === undefined || site === 'same-origin' || site === 'none';
};

const normalise = ({ value, max }: { value: unknown; max: number }): string | undefined => {
	if (typeof value !== 'string') {
		return undefined;
	}
	const trimmed = value.replace(/\s+\n/g, '\n').trim();
	return trimmed.length > 0 && trimmed.length <= max ? trimmed : undefined;
};

const parseRequest = (body: unknown): AiRequest | undefined => {
	if (typeof body !== 'object' || body === null) {
		return undefined;
	}
	const { mode, locale: rawLocale } = body as Record<string, unknown>;
	const locale = LOCALES.find((l) => l === rawLocale);
	if (!locale) {
		return undefined;
	}
	const field = (name: string) => (body as Record<string, unknown>)[name];
	switch (mode) {
		case 'ask': {
			const question = normalise({ value: field('question'), max: AI_INPUT_LIMITS.question });
			return question ? { mode, locale, question } : undefined;
		}
		case 'fit': {
			const jobDescription = normalise({
				value: field('jobDescription'),
				max: AI_INPUT_LIMITS.jobDescription
			});
			return jobDescription ? { mode, locale, jobDescription } : undefined;
		}
		case 'deck': {
			const audience = normalise({ value: field('audience'), max: AI_INPUT_LIMITS.audience });
			return audience ? { mode, locale, audience } : undefined;
		}
		default:
			return undefined;
	}
};

const readBody = (req: IncomingMessage): Promise<unknown> =>
	new Promise((resolve, reject) => {
		const chunks: Buffer[] = [];
		let size = 0;
		req.on('data', (chunk: Buffer) => {
			size += chunk.length;
			if (size > MAX_BODY_BYTES) {
				reject(new Error('body too large'));
				req.destroy();
				return;
			}
			chunks.push(chunk);
		});
		req.on('end', () => {
			try {
				resolve(JSON.parse(Buffer.concat(chunks).toString('utf8')));
			} catch (err: unknown) {
				reject(err instanceof Error ? err : new Error('invalid JSON'));
			}
		});
		req.on('error', reject);
	});

// nginx forwards Fly's Fly-Client-IP as X-Client-IP (falling back to its own
// view of the peer), so the socket address is only used when run directly.
const clientIp = (req: IncomingMessage): string => {
	const header = req.headers['x-client-ip'];
	return limitKey(
		(Array.isArray(header) ? header[0] : header) ?? req.socket.remoteAddress ?? 'unknown'
	);
};

// --- the model call -------------------------------------------------------

class RefusedError extends Error {}

// The call failed before any usage came back. Whether Anthropic generated
// anyway (timeout, dropped connection, 5xx) is unknown, so the caller charges
// the worst case; a 4xx means nothing was generated.
class UncountedError extends Error {
	readonly cause: unknown;
	constructor(cause: unknown) {
		super(cause instanceof Error ? cause.message : String(cause));
		this.cause = cause;
	}
	get generated(): boolean {
		return !(this.cause instanceof Anthropic.APIError) || (this.cause.status ?? 500) >= 500;
	}
}

const generate = async (request: AiRequest): Promise<Outcome> => {
	if (!client) {
		throw new Error('unconfigured');
	}
	let response;
	try {
		response = await client.beta.messages.create({
			model: MODEL,
			max_tokens: MAX_OUTPUT_TOKENS[request.mode],
			betas: ['server-side-fallback-2026-07-01'],
			fallbacks: 'default',
			thinking: { type: 'adaptive' },
			output_config: {
				effort: EFFORT,
				format: { type: 'json_schema', schema: SCHEMAS[request.mode] }
			},
			system: [
				{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral', ttl: '1h' } }
			],
			messages: [{ role: 'user', content: buildTurn(request) }]
		});
	} catch (err: unknown) {
		throw new UncountedError(err);
	}

	// Count the spend before anything can throw: truncated or refused
	// responses are billed too.
	const usd = costGuard.recordSpend(response);

	if (response.stop_reason === 'refusal') {
		throw new RefusedError(response.stop_details?.category ?? 'refusal');
	}
	if (response.stop_reason === 'max_tokens') {
		throw new Error('output truncated');
	}

	const textBlock = response.content.find((b) => b.type === 'text');
	if (!textBlock || textBlock.type !== 'text') {
		throw new Error('no text in response');
	}

	const raw: unknown = JSON.parse(textBlock.text);
	// Neither the request nor the model's paraphrase of it is logged: the
	// /ask privacy note promises the site does not keep what visitors type.
	const guard = readGuard({ raw, request });

	console.log(
		JSON.stringify({
			event: guard ? 'guarded' : 'generated',
			mode: request.mode,
			...(guard && { kind: guard.kind }),
			model: response.model,
			input: response.usage.input_tokens,
			cacheRead: response.usage.cache_read_input_tokens,
			cacheWrite: response.usage.cache_creation_input_tokens,
			output: response.usage.output_tokens,
			usd: Number(usd.toFixed(4)),
			spentTodayUsd: Number(costGuard.spentTodayUsd().toFixed(4))
		})
	);

	if (guard) {
		return { guard };
	}
	const result = cleanResult({ mode: request.mode, raw });
	// An answer that copies the confidential notes is withheld and treated as
	// the manipulation it most likely is.
	if (leaksNotes(result)) {
		console.log(JSON.stringify({ event: 'leak_blocked', mode: request.mode }));
		return { guard: { kind: 'manipulation', attempt: '' } };
	}
	return { result };
};

// --- HTTP -----------------------------------------------------------------

const send = ({
	res,
	status,
	body,
	headers = {}
}: {
	res: ServerResponse;
	status: number;
	body: AiResponse | AiHealth | { ok: false; error: 'not_found' };
	headers?: Record<string, string>;
}) => {
	res.writeHead(status, {
		'content-type': 'application/json; charset=utf-8',
		'cache-control': 'no-store',
		...headers
	});
	res.end(JSON.stringify(body));
};

// A freshly generated guard verdict is a strike against the address that
// sent the request. A cached one costs nothing and is not counted: otherwise
// replaying it from rotating addresses would grow the strike table without
// passing any limit.
const sendOutcome = ({
	res,
	ip,
	outcome,
	fresh
}: {
	res: ServerResponse;
	ip: string;
	outcome: Outcome;
	fresh: boolean;
}) => {
	if ('guard' in outcome) {
		const strikesLeft = fresh ? costGuard.recordStrike(ip) : costGuard.strikesLeft(ip);
		send({
			res,
			status: 422,
			body: { ok: false, error: 'guarded', guard: outcome.guard, strikesLeft }
		});
		return;
	}
	send({ res, status: 200, body: { ok: true, ...outcome.result } });
};

const handleGenerate = async ({ req, res }: { req: IncomingMessage; res: ServerResponse }) => {
	let request: AiRequest | undefined;
	try {
		request = parseRequest(await readBody(req));
	} catch {
		request = undefined;
	}
	if (!request) {
		send({ res, status: 400, body: { ok: false, error: 'bad_request' } });
		return;
	}
	if (!isSameSite(req)) {
		send({ res, status: 403, body: { ok: false, error: 'forbidden' } });
		return;
	}

	const ip = clientIp(req);
	const key = cacheKey(request);
	const cached = cacheGet(key);
	if (cached) {
		sendOutcome({ res, ip, outcome: cached, fresh: false });
		return;
	}

	if (!client) {
		send({ res, status: 503, body: { ok: false, error: 'unconfigured' } });
		return;
	}

	const reserve = costGuard.worstCaseUsd(request);
	const limit = costGuard.checkLimits({ ip, reserve });
	if (!limit.ok) {
		send({
			res,
			status: 429,
			body: { ok: false, error: limit.error, retryAfterSeconds: limit.retry },
			headers: { 'retry-after': String(limit.retry) }
		});
		return;
	}
	if (costGuard.isBusy(ip)) {
		send({ res, status: 503, body: { ok: false, error: 'busy', retryAfterSeconds: 20 } });
		return;
	}

	// No await between the checks above and these lines, so admission and
	// reservation happen as one step.
	costGuard.admit({ ip, reserve });
	try {
		const outcome = await generate(request);
		cachePut({ key, value: outcome });
		sendOutcome({ res, ip, outcome, fresh: true });
	} catch (err: unknown) {
		if (err instanceof RefusedError) {
			send({ res, status: 422, body: { ok: false, error: 'refused' } });
			return;
		}
		if (err instanceof UncountedError && err.cause instanceof Anthropic.RateLimitError) {
			send({ res, status: 503, body: { ok: false, error: 'busy', retryAfterSeconds: 30 } });
			return;
		}
		if (err instanceof UncountedError && err.generated) {
			costGuard.recordWorstCase(reserve);
		}
		console.error(
			JSON.stringify({
				event: 'generate_failed',
				mode: request.mode,
				status:
					err instanceof UncountedError && err.cause instanceof Anthropic.APIError
						? err.cause.status
						: undefined,
				message: err instanceof Error ? err.message : String(err)
			})
		);
		send({ res, status: 502, body: { ok: false, error: 'upstream' } });
	} finally {
		costGuard.release({ ip, reserve });
	}
};

// eslint-disable-next-line local-rules/prefer-object-params -- node:http's handler signature
const server = createServer((req, res) => {
	const [path] = (req.url ?? '/').split('?');

	if (req.method === 'GET' && path === '/api/ai/health') {
		send({ res, status: 200, body: { configured, auth, model: MODEL } });
		return;
	}
	if (req.method === 'POST' && path === '/api/ai') {
		void handleGenerate({ req, res });
		return;
	}
	send({ res, status: 404, body: { ok: false, error: 'not_found' } });
});

server.listen(PORT, '127.0.0.1', () => {
	console.log(
		JSON.stringify({ event: 'listening', port: PORT, model: MODEL, effort: EFFORT, auth })
	);
});

// Node exits on an unhandled rejection, and start.sh then restarts the
// container with a fresh budget: log it and keep serving instead.
process.on('unhandledRejection', (reason: unknown) => {
	console.error(
		JSON.stringify({
			event: 'unhandled_rejection',
			message: reason instanceof Error ? reason.message : String(reason)
		})
	);
});

const shutdown = () => server.close(() => process.exit(0));
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
