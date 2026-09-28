import Anthropic from '@anthropic-ai/sdk';
import { createHash } from 'node:crypto';
import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import {
	AI_INPUT_LIMITS,
	type AiHealth,
	type AiRequest,
	type AiResponse,
	type AiResult
} from '../src/lib/types/ai.types.ts';
import type { Locale } from '../src/lib/types/portfolio.types.ts';
import { SCHEMAS, SYSTEM_PROMPT, buildTurn, cleanResult } from './modes.ts';

/**
 * The AI version's API: one JSON endpoint in front of the Claude API. It runs
 * next to nginx in the same container (see docker/start.sh), which
 * proxies /api/ to it. No state beyond memory: limits and the answer cache
 * reset on restart, which is fine for a portfolio.
 */

const PORT = Number(process.env.AI_PORT ?? 8787);
const MODEL = process.env.AI_MODEL ?? 'claude-opus-5';
const EFFORT = (process.env.AI_EFFORT ?? 'medium') as 'low' | 'medium' | 'high';

// Cost guards. A visitor gets a handful of generations; the whole site gets a
// daily budget. Cached answers are free and don't count.
const PER_IP_WINDOW_MS = 10 * 60 * 1000;
const PER_IP_PER_WINDOW = Number(process.env.AI_PER_IP_PER_10_MIN ?? 6);
const PER_IP_PER_DAY = Number(process.env.AI_PER_IP_PER_DAY ?? 25);
const DAILY_LIMIT = Number(process.env.AI_DAILY_LIMIT ?? 300);
const MAX_IN_FLIGHT = 4;
const MAX_BODY_BYTES = 64 * 1024;
const CACHE_TTL_MS = 6 * 60 * 60 * 1000;
const CACHE_MAX_ENTRIES = 500;

// The SDK resolves credentials itself: ANTHROPIC_API_KEY, or workload identity
// federation (ANTHROPIC_FEDERATION_RULE_ID + ...) as the other Fly apps use.
const configured = Boolean(
	process.env.ANTHROPIC_API_KEY ?? process.env.ANTHROPIC_FEDERATION_RULE_ID
);
const client = configured ? new Anthropic({ timeout: 110_000, maxRetries: 1 }) : undefined;

const LOCALES: Locale[] = ['en', 'it', 'pt'];

// --- limits -------------------------------------------------------------

const hits = new Map<string, number[]>();
let day = new Date().toISOString().slice(0, 10);
let usedToday = 0;
let inFlight = 0;

const rollDay = () => {
	const today = new Date().toISOString().slice(0, 10);
	if (today !== day) {
		day = today;
		usedToday = 0;
		hits.clear();
	}
};

type LimitCheck = { ok: true } | { ok: false; error: 'rate_limited' | 'daily_cap'; retry: number };

const checkLimits = (ip: string): LimitCheck => {
	rollDay();
	const now = Date.now();
	if (usedToday >= DAILY_LIMIT) {
		const midnight = new Date(`${day}T00:00:00Z`).getTime() + 24 * 60 * 60 * 1000;
		return { ok: false, error: 'daily_cap', retry: Math.ceil((midnight - now) / 1000) };
	}
	const mine = hits.get(ip) ?? [];
	const recent = mine.filter((t) => now - t < PER_IP_WINDOW_MS);
	if (mine.length >= PER_IP_PER_DAY) {
		return { ok: false, error: 'rate_limited', retry: 60 * 60 };
	}
	if (recent.length >= PER_IP_PER_WINDOW) {
		const oldest = Math.min(...recent);
		return {
			ok: false,
			error: 'rate_limited',
			retry: Math.ceil((PER_IP_WINDOW_MS - (now - oldest)) / 1000)
		};
	}
	return { ok: true };
};

const recordHit = (ip: string) => {
	usedToday += 1;
	hits.set(ip, [...(hits.get(ip) ?? []), Date.now()]);
};

// --- answer cache (suggested questions get asked again and again) --------

const cache = new Map<string, { at: number; value: AiResult }>();

const cacheKey = (request: AiRequest): string =>
	createHash('sha256').update(JSON.stringify(request)).digest('hex');

const cacheGet = (key: string): AiResult | undefined => {
	const hit = cache.get(key);
	if (!hit || Date.now() - hit.at > CACHE_TTL_MS) {
		cache.delete(key);
		return undefined;
	}
	return hit.value;
};

const cachePut = ({ key, value }: { key: string; value: AiResult }) => {
	if (cache.size >= CACHE_MAX_ENTRIES) {
		const oldest = cache.keys().next().value;
		if (oldest !== undefined) {
			cache.delete(oldest);
		}
	}
	cache.set(key, { at: Date.now(), value });
};

// --- request parsing ------------------------------------------------------

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
	return (Array.isArray(header) ? header[0] : header) ?? req.socket.remoteAddress ?? 'unknown';
};

// --- the model call -------------------------------------------------------

class RefusedError extends Error {}

const generate = async (request: AiRequest): Promise<AiResult> => {
	if (!client) {
		throw new Error('unconfigured');
	}
	const response = await client.beta.messages.create({
		model: MODEL,
		max_tokens: 16_000,
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

	console.log(
		JSON.stringify({
			event: 'generated',
			mode: request.mode,
			model: response.model,
			input: response.usage.input_tokens,
			cacheRead: response.usage.cache_read_input_tokens,
			cacheWrite: response.usage.cache_creation_input_tokens,
			output: response.usage.output_tokens
		})
	);

	return cleanResult({ mode: request.mode, raw: JSON.parse(textBlock.text) });
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

	const key = cacheKey(request);
	const cached = cacheGet(key);
	if (cached) {
		send({ res, status: 200, body: { ok: true, ...cached } });
		return;
	}

	if (!client) {
		send({ res, status: 503, body: { ok: false, error: 'unconfigured' } });
		return;
	}

	const ip = clientIp(req);
	const limit = checkLimits(ip);
	if (!limit.ok) {
		send({
			res,
			status: 429,
			body: { ok: false, error: limit.error, retryAfterSeconds: limit.retry },
			headers: { 'retry-after': String(limit.retry) }
		});
		return;
	}
	if (inFlight >= MAX_IN_FLIGHT) {
		send({ res, status: 503, body: { ok: false, error: 'busy', retryAfterSeconds: 20 } });
		return;
	}

	recordHit(ip);
	inFlight += 1;
	try {
		const value = await generate(request);
		cachePut({ key, value });
		send({ res, status: 200, body: { ok: true, ...value } });
	} catch (err: unknown) {
		if (err instanceof RefusedError) {
			send({ res, status: 422, body: { ok: false, error: 'refused' } });
			return;
		}
		if (err instanceof Anthropic.RateLimitError) {
			send({ res, status: 503, body: { ok: false, error: 'busy', retryAfterSeconds: 30 } });
			return;
		}
		console.error(
			JSON.stringify({
				event: 'generate_failed',
				mode: request.mode,
				status: err instanceof Anthropic.APIError ? err.status : undefined,
				message: err instanceof Error ? err.message : String(err)
			})
		);
		send({ res, status: 502, body: { ok: false, error: 'upstream' } });
	} finally {
		inFlight -= 1;
	}
};

// eslint-disable-next-line local-rules/prefer-object-params -- node:http's handler signature
const server = createServer((req, res) => {
	const [path] = (req.url ?? '/').split('?');

	if (req.method === 'GET' && path === '/api/ai/health') {
		send({ res, status: 200, body: { configured, model: MODEL } });
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
		JSON.stringify({ event: 'listening', port: PORT, model: MODEL, effort: EFFORT, configured })
	);
});

const shutdown = () => server.close(() => process.exit(0));
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
