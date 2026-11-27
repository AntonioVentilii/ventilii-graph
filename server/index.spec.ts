import Anthropic from '@anthropic-ai/sdk';
import type { Server } from 'node:http';
import type { AiResponse } from '../src/lib/types/ai.types.ts';

/**
 * The HTTP API end to end: index.ts starts its server on import, so the
 * Claude client is mocked and each test sends real requests to it. Every test
 * uses its own address and its own wording, because the limits and the answer
 * cache are module state shared by the whole file.
 */

const { create, port } = vi.hoisted(() => {
	const port = 20_000 + Math.floor(Math.random() * 20_000);
	process.env.AI_PORT = String(port);
	return { create: vi.fn(), port };
});

vi.mock('./claude.ts', () => ({
	MODEL: 'claude-opus-5',
	EFFORT: 'medium',
	auth: 'api_key',
	configured: true,
	client: { beta: { messages: { create } } }
}));

const BASE = `http://127.0.0.1:${port}`;

const ANSWER = {
	scope: 'portfolio',
	attempt: '',
	answer: 'He built a prediction market [project:vici-app].',
	confidence: 'high',
	evidence: [
		{ id: 'project:vici-app', why: 'He built it.' },
		{ id: 'project:not-in-the-portfolio', why: 'Made up.' }
	],
	notInPortfolio: null,
	followUps: ['What else?']
};

const OFF_TOPIC = { scope: 'off_topic', attempt: 'a cake recipe' };

const message = ({
	raw,
	stop = 'end_turn'
}: {
	raw: unknown;
	stop?: 'end_turn' | 'refusal' | 'max_tokens';
}) => ({
	model: 'claude-opus-5',
	stop_reason: stop,
	content: [{ type: 'text', text: JSON.stringify(raw) }],
	usage: {
		input_tokens: 1_000,
		output_tokens: 200,
		cache_read_input_tokens: 0,
		cache_creation_input_tokens: 0
	}
});

const post = async ({
	body,
	ip,
	headers = {}
}: {
	body: unknown;
	ip: string;
	headers?: Record<string, string>;
}): Promise<{ status: number; body: AiResponse; headers: Headers }> => {
	const res = await fetch(`${BASE}/api/ai`, {
		method: 'POST',
		headers: { 'content-type': 'application/json', 'x-client-ip': ip, ...headers },
		body: typeof body === 'string' ? body : JSON.stringify(body)
	});
	return { status: res.status, body: (await res.json()) as AiResponse, headers: res.headers };
};

const ask = (question: string) => ({ mode: 'ask', locale: 'en', question });

/** The user turn the server sent the model on its last call. */
const lastTurn = (): string => {
	const [params] = create.mock.lastCall as [{ messages: { content: string }[] }];
	return params.messages[0].content;
};

describe('the API server', () => {
	let server: Server | undefined;

	beforeAll(async () => {
		vi.spyOn(console, 'log').mockImplementation(() => undefined);
		vi.spyOn(console, 'error').mockImplementation(() => undefined);
		({ server } = await import('./index.ts'));
		// listen() is asynchronous: wait until the port answers.
		for (let i = 0; i < 50; i++) {
			try {
				await fetch(`${BASE}/api/ai/health`);
				return;
			} catch {
				await new Promise((resolve) => setTimeout(resolve, 20));
			}
		}
		throw new Error('the server did not start');
	});

	beforeEach(() => {
		create.mockReset();
	});

	afterAll(async () => {
		const open = server;
		if (open === undefined) {
			return;
		}
		// Drop fetch's kept-alive sockets, or close() waits for them to time out.
		open.closeAllConnections();
		await new Promise<void>((resolve) => open.close(() => resolve()));
	});

	describe('routes', () => {
		it('reports its configuration on the health route', async () => {
			const res = await fetch(`${BASE}/api/ai/health`);

			expect(res.status).toBe(200);
			await expect(res.json()).resolves.toEqual({
				configured: true,
				auth: 'api_key',
				model: 'claude-opus-5'
			});
		});

		it('answers 404 on any other route', async () => {
			const res = await fetch(`${BASE}/api/other`);

			expect(res.status).toBe(404);
			await expect(res.json()).resolves.toEqual({ ok: false, error: 'not_found' });
		});
	});

	describe('request validation', () => {
		it.each([
			{ name: 'invalid JSON', body: '{' },
			{ name: 'an unknown mode', body: { mode: 'poem', locale: 'en', question: 'Hi' } },
			{ name: 'an unknown locale', body: { mode: 'ask', locale: 'xx', question: 'Hi' } },
			{ name: 'a missing field', body: { mode: 'fit', locale: 'en', question: 'Hi' } },
			{ name: 'a blank question', body: ask(' \n\t \n ') },
			{ name: 'a question over the limit', body: ask('a'.repeat(601)) }
		])('rejects $name without calling the model', async ({ body }) => {
			const res = await post({ body, ip: '10.0.1.1' });

			expect(res.status).toBe(400);
			expect(res.body).toEqual({ ok: false, error: 'bad_request' });
			expect(create).not.toHaveBeenCalled();
		});

		it('drops trailing spaces and blank lines before the model sees the text', async () => {
			create.mockResolvedValue(message({ raw: ANSWER }));
			const res = await post({
				body: ask('  First line   \n\n \n  second line  \n'),
				ip: '10.0.1.2'
			});

			expect(res.status).toBe(200);
			expect(lastTurn()).toContain('First line\n  second line');
		});
	});

	describe('same-site check', () => {
		it.each<{ name: string; headers: Record<string, string> }>([
			{ name: 'a text/plain body', headers: { 'content-type': 'text/plain' } },
			{ name: 'a cross-site browser request', headers: { 'sec-fetch-site': 'cross-site' } }
		])('refuses $name', async ({ headers }) => {
			const res = await post({ body: ask('Who is he?'), ip: '10.0.2.1', headers });

			expect(res.status).toBe(403);
			expect(res.body).toEqual({ ok: false, error: 'forbidden' });
			expect(create).not.toHaveBeenCalled();
		});
	});

	describe('answers', () => {
		it('cleans the model output and serves a repeat from the cache', async () => {
			create.mockResolvedValue(message({ raw: ANSWER }));
			const first = await post({ body: ask('What did he build?'), ip: '10.0.3.1' });

			expect(first.status).toBe(200);
			expect(first.body).toMatchObject({
				ok: true,
				mode: 'ask',
				result: {
					answer: 'He built a prediction market.',
					evidence: [{ id: 'project:vici-app', why: 'He built it.' }]
				}
			});

			const again = await post({ body: ask('What did he build?'), ip: '10.0.3.2' });

			expect(again.body).toEqual(first.body);
			expect(create).toHaveBeenCalledOnce();
		});

		it('maps a refusal to refused', async () => {
			create.mockResolvedValue(message({ raw: {}, stop: 'refusal' }));
			const res = await post({ body: ask('Refuse this'), ip: '10.0.3.3' });

			expect(res.status).toBe(422);
			expect(res.body).toEqual({ ok: false, error: 'refused' });
		});

		it('maps a truncated answer to upstream', async () => {
			create.mockResolvedValue(message({ raw: {}, stop: 'max_tokens' }));
			const res = await post({ body: ask('Truncate this'), ip: '10.0.3.4' });

			expect(res.status).toBe(502);
			expect(res.body).toEqual({ ok: false, error: 'upstream' });
		});

		it('maps an API rate limit to busy', async () => {
			create.mockRejectedValue(
				new Anthropic.RateLimitError(429, undefined, 'rate limited', new Headers())
			);
			const res = await post({ body: ask('Rate limit this'), ip: '10.0.3.5' });

			expect(res.status).toBe(503);
			expect(res.body).toEqual({ ok: false, error: 'busy', retryAfterSeconds: 30 });
		});

		it('maps a network failure to upstream', async () => {
			create.mockRejectedValue(new Error('socket hang up'));
			const res = await post({ body: ask('Drop this'), ip: '10.0.3.6' });

			expect(res.status).toBe(502);
			expect(res.body).toEqual({ ok: false, error: 'upstream' });
		});
	});

	describe('guard strikes', () => {
		it('counts a fresh verdict as a strike and blocks the address after two', async () => {
			create.mockResolvedValue(message({ raw: OFF_TOPIC }));
			const ip = '10.0.4.1';

			const first = await post({ body: ask('A cake recipe, please'), ip });

			expect(first.status).toBe(422);
			expect(first.body).toEqual({
				ok: false,
				error: 'guarded',
				guard: { kind: 'off_topic', attempt: 'a cake recipe' },
				strikesLeft: 1
			});

			// The cached verdict costs nothing, so it is no strike.
			const replay = await post({ body: ask('A cake recipe, please'), ip });

			expect(replay.body).toMatchObject({ error: 'guarded', strikesLeft: 1 });

			const second = await post({ body: ask('Another cake recipe'), ip });

			expect(second.body).toMatchObject({ error: 'guarded', strikesLeft: 0 });

			create.mockResolvedValue(message({ raw: ANSWER }));
			const blocked = await post({ body: ask('Now a real question'), ip });

			expect(blocked.status).toBe(429);
			expect(blocked.body).toMatchObject({ ok: false, error: 'guard_blocked' });
			expect(create).toHaveBeenCalledTimes(2);
		});
	});

	describe('per-address limit', () => {
		it('answers 429 with retry-after once an address has used its window', async () => {
			create.mockResolvedValue(message({ raw: ANSWER }));
			const ip = '10.0.5.1';
			for (let i = 0; i < 6; i++) {
				const res = await post({ body: ask(`Question number ${i}`), ip });

				expect(res.status).toBe(200);
			}
			const over = await post({ body: ask('One question too many'), ip });

			expect(over.status).toBe(429);
			expect(over.body).toMatchObject({ ok: false, error: 'rate_limited' });
			expect(Number(over.headers.get('retry-after'))).toBeGreaterThan(0);
			expect(create).toHaveBeenCalledTimes(6);
		});
	});
});
