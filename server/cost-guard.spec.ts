import type { AskRequest } from '../src/lib/types/ai.types.ts';
import { createCostGuard, type CostGuardConfig } from './cost-guard.ts';
import { SYSTEM_PROMPT, buildTurn } from './modes.ts';

const CHEAP = { in: 1, out: 5 };
const DEAR = { in: 5, out: 25 };

const CONFIG: CostGuardConfig = {
	perIpWindowMs: 10 * 60 * 1000,
	perIpPerWindow: 2,
	perIpPerDay: 3,
	dailyLimit: 5,
	dailyBudgetUsd: 1,
	strikesPerDay: 2,
	maxInFlight: 2,
	maxOutputTokens: { ask: 1_000, fit: 2_000, deck: 2_000 },
	prices: { cheap: CHEAP, dear: DEAR }
};

const MILLION = 1_000_000;
const NOON = new Date('2026-11-12T12:00:00Z');

const ask = (question: string): AskRequest => ({ mode: 'ask', locale: 'en', question });

/** One admitted generation that has finished, as the server runs it. */
const run = ({
	guard,
	ip,
	reserve = 0
}: {
	guard: ReturnType<typeof createCostGuard>;
	ip: string;
	reserve?: number;
}) => {
	guard.admit({ ip, reserve });
	guard.release({ ip, reserve });
};

describe('cost guard', () => {
	beforeEach(() => {
		vi.useFakeTimers();
		vi.setSystemTime(NOON);
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	describe('worstCaseUsd', () => {
		it('charges every UTF-8 byte of the visitor text as a token written to the cache, for every attempt, at the dearest input price', () => {
			const guard = createCostGuard(CONFIG);
			const perByte = (2 * 2 * DEAR.in) / MILLION;

			expect(guard.worstCaseUsd(ask('ab')) - guard.worstCaseUsd(ask('a'))).toBeCloseTo(perByte, 12);
			// '😀' is four bytes, 'a' one.
			expect(guard.worstCaseUsd(ask('😀')) - guard.worstCaseUsd(ask('a'))).toBeCloseTo(
				3 * perByte,
				12
			);
		});

		it('charges every output token the mode allows, for every attempt, at the dearest output price', () => {
			const guard = createCostGuard({
				...CONFIG,
				maxOutputTokens: { ...CONFIG.maxOutputTokens, ask: 3_000 }
			});
			const base = createCostGuard(CONFIG);

			expect(guard.worstCaseUsd(ask('a')) - base.worstCaseUsd(ask('a'))).toBeCloseTo(
				(2 * 2_000 * DEAR.out) / MILLION,
				12
			);
		});

		it('uses the dearest model listed', () => {
			const cheapOnly = createCostGuard({ ...CONFIG, prices: { cheap: CHEAP } });
			const both = createCostGuard(CONFIG);

			expect(both.worstCaseUsd(ask('a'))).toBeGreaterThan(cheapOnly.worstCaseUsd(ask('a')));
		});

		it('reserves exactly the dearest response the request can produce', () => {
			const guard = createCostGuard(CONFIG);
			const request = ask('How did Antonio ship the graph? 😀');
			// Each of the two attempts writes the whole prompt to the cache, one
			// token per byte, and uses every output token, on the dearest model.
			const attempt = {
				input_tokens: 0,
				output_tokens: CONFIG.maxOutputTokens.ask,
				cache_creation_input_tokens:
					Buffer.byteLength(SYSTEM_PROMPT) + Buffer.byteLength(buildTurn(request)),
				model: 'dear'
			};
			const spent = guard.recordSpend({
				model: 'dear',
				usage: { ...attempt, iterations: [attempt, attempt] }
			});

			expect(spent).toBeCloseTo(guard.worstCaseUsd(request), 12);
		});
	});

	describe('recordSpend', () => {
		it('prices input and output by the model that ran', () => {
			const guard = createCostGuard(CONFIG);

			expect(
				guard.recordSpend({
					model: 'cheap',
					usage: { input_tokens: MILLION, output_tokens: MILLION }
				})
			).toBeCloseTo(CHEAP.in + CHEAP.out, 12);
		});

		it('bills cache reads at a tenth of input and cache writes at twice input', () => {
			const guard = createCostGuard(CONFIG);

			expect(
				guard.recordSpend({
					model: 'cheap',
					usage: {
						input_tokens: 0,
						output_tokens: 0,
						cache_read_input_tokens: MILLION,
						cache_creation_input_tokens: MILLION
					}
				})
			).toBeCloseTo(CHEAP.in * 0.1 + CHEAP.in * 2, 12);
		});

		it('bills a model it does not know at the dearest price', () => {
			const guard = createCostGuard(CONFIG);

			expect(
				guard.recordSpend({
					model: 'claude-unknown-20261101',
					usage: { input_tokens: MILLION, output_tokens: 0 }
				})
			).toBeCloseTo(DEAR.in, 12);
		});

		it('adds up every attempt of a fallback, each at its own model', () => {
			const guard = createCostGuard(CONFIG);
			const usage = { input_tokens: MILLION, output_tokens: 0 };

			expect(
				guard.recordSpend({
					model: 'cheap',
					usage: {
						...usage,
						iterations: [
							{ ...usage, model: 'dear' },
							{ ...usage, model: null }
						]
					}
				})
			).toBeCloseTo(DEAR.in + CHEAP.in, 12);
		});

		it('uses the top-level usage when iterations is empty', () => {
			const guard = createCostGuard(CONFIG);

			expect(
				guard.recordSpend({
					model: 'cheap',
					usage: { input_tokens: MILLION, output_tokens: 0, iterations: [] }
				})
			).toBeCloseTo(CHEAP.in, 12);
		});

		it('adds the spend to the day', () => {
			const guard = createCostGuard(CONFIG);
			guard.recordSpend({ model: 'cheap', usage: { input_tokens: MILLION / 4, output_tokens: 0 } });
			guard.recordSpend({ model: 'cheap', usage: { input_tokens: MILLION / 4, output_tokens: 0 } });

			expect(guard.spentTodayUsd()).toBeCloseTo(0.5, 12);
		});
	});

	describe('checkLimits', () => {
		it('lets a first request through', () => {
			const guard = createCostGuard(CONFIG);

			expect(guard.checkLimits({ ip: 'a', reserve: 0.1 })).toEqual({ ok: true });
		});

		it('stops an address at its limit per window until the oldest request leaves it', () => {
			const guard = createCostGuard(CONFIG);
			run({ guard, ip: 'a' });
			vi.advanceTimersByTime(60_000);
			run({ guard, ip: 'a' });

			expect(guard.checkLimits({ ip: 'a', reserve: 0 })).toEqual({
				ok: false,
				error: 'rate_limited',
				retry: 9 * 60
			});
			expect(guard.checkLimits({ ip: 'b', reserve: 0 })).toEqual({ ok: true });

			vi.advanceTimersByTime(9 * 60 * 1000);

			expect(guard.checkLimits({ ip: 'a', reserve: 0 })).toEqual({ ok: true });
		});

		it('stops an address at its daily limit', () => {
			const guard = createCostGuard(CONFIG);
			for (let i = 0; i < CONFIG.perIpPerDay; i++) {
				run({ guard, ip: 'a' });
				vi.advanceTimersByTime(CONFIG.perIpWindowMs);
			}

			expect(guard.checkLimits({ ip: 'a', reserve: 0 })).toEqual({
				ok: false,
				error: 'rate_limited',
				retry: 60 * 60
			});
		});

		it('stops everyone at the daily request limit until midnight UTC', () => {
			const guard = createCostGuard(CONFIG);
			for (let i = 0; i < CONFIG.dailyLimit; i++) {
				run({ guard, ip: `ip-${i}` });
			}

			expect(guard.checkLimits({ ip: 'new', reserve: 0 })).toEqual({
				ok: false,
				error: 'daily_cap',
				retry: 12 * 60 * 60
			});
		});

		it('refuses a request whose worst case would take the day past the budget', () => {
			const guard = createCostGuard(CONFIG);

			expect(guard.checkLimits({ ip: 'a', reserve: 1.01 })).toMatchObject({ error: 'daily_cap' });
			expect(guard.checkLimits({ ip: 'a', reserve: 1 })).toEqual({ ok: true });
		});

		it('counts what is spent and what is reserved by requests still running', () => {
			const guard = createCostGuard(CONFIG);
			guard.recordSpend({ model: 'cheap', usage: { input_tokens: MILLION / 4, output_tokens: 0 } });
			guard.admit({ ip: 'a', reserve: 0.5 });

			expect(guard.checkLimits({ ip: 'b', reserve: 0.3 })).toMatchObject({ error: 'daily_cap' });

			guard.release({ ip: 'a', reserve: 0.5 });

			expect(guard.checkLimits({ ip: 'b', reserve: 0.3 })).toEqual({ ok: true });
		});

		it('counts an attempt whose usage never arrived at its worst case', () => {
			const guard = createCostGuard(CONFIG);
			guard.recordWorstCase(0.9);

			expect(guard.checkLimits({ ip: 'a', reserve: 0.2 })).toMatchObject({ error: 'daily_cap' });
		});

		it('blocks an address at its strike limit until midnight UTC', () => {
			const guard = createCostGuard(CONFIG);

			expect(guard.recordStrike('a')).toBe(1);
			expect(guard.recordStrike('a')).toBe(0);
			expect(guard.strikesLeft('a')).toBe(0);
			expect(guard.strikesLeft('b')).toBe(CONFIG.strikesPerDay);
			expect(guard.checkLimits({ ip: 'a', reserve: 0 })).toEqual({
				ok: false,
				error: 'guard_blocked',
				retry: 12 * 60 * 60
			});
		});

		it('starts a new day at midnight UTC', () => {
			const guard = createCostGuard(CONFIG);
			for (let i = 0; i < CONFIG.dailyLimit; i++) {
				run({ guard, ip: 'a' });
			}
			guard.recordStrike('a');
			guard.recordStrike('a');
			guard.recordWorstCase(1);
			vi.setSystemTime(new Date('2026-11-13T00:00:01Z'));

			expect(guard.checkLimits({ ip: 'a', reserve: 0.5 })).toEqual({ ok: true });
			expect(guard.spentTodayUsd()).toBe(0);
		});
	});

	describe('isBusy', () => {
		it('allows one generation per address and caps the ones running together', () => {
			const guard = createCostGuard(CONFIG);
			guard.admit({ ip: 'a', reserve: 0 });

			expect(guard.isBusy('a')).toBeTruthy();
			expect(guard.isBusy('b')).toBeFalsy();

			guard.admit({ ip: 'b', reserve: 0 });

			expect(guard.isBusy('c')).toBeTruthy();

			guard.release({ ip: 'a', reserve: 0 });

			expect(guard.isBusy('a')).toBeFalsy();
		});
	});
});
