import type { AiRequest } from '../src/lib/types/ai.types.ts';
import { SYSTEM_PROMPT, buildTurn } from './modes.ts';

/** USD per million tokens. */
export interface Price {
	in: number;
	out: number;
}

export interface Usage {
	input_tokens: number;
	output_tokens: number;
	cache_read_input_tokens?: number | null;
	cache_creation_input_tokens?: number | null;
}

export interface CostGuardConfig {
	perIpWindowMs: number;
	perIpPerWindow: number;
	perIpPerDay: number;
	dailyLimit: number;
	dailyBudgetUsd: number;
	strikesPerDay: number;
	maxInFlight: number;
	maxOutputTokens: Record<AiRequest['mode'], number>;
	/** By model id; a model not listed is billed at the dearest price listed. */
	prices: Record<string, Price>;
}

export type LimitCheck =
	| { ok: true }
	| { ok: false; error: 'rate_limited' | 'daily_cap' | 'guard_blocked'; retry: number };

// A fallback can cost a second attempt, on whichever model is dearest.
const MAX_ATTEMPTS = 2;
const DAY_MS = 24 * 60 * 60 * 1000;

const today = (): string => new Date().toISOString().slice(0, 10);

/**
 * The cost guards: per-address and daily limits, the daily dollar budget and
 * the strikes. State lives in memory and resets at midnight UTC. The server
 * makes one; tests make one each, with their own limits.
 */
export const createCostGuard = (config: CostGuardConfig) => {
	const hits = new Map<string, number[]>();
	const strikes = new Map<string, number>();
	let day = today();
	let usedToday = 0;
	let spentTodayUsd = 0;
	let inFlight = 0;
	// Generations running per address. One at a time: strikes are only known
	// once a verdict is back, so parallel requests from one address would all
	// pass the strike check before any of them counted.
	const inFlightByIp = new Set<string>();
	// Spend is only known once a response is back, so each generation reserves
	// its worst case up front (see worstCaseUsd). Admission counts these
	// reservations, so requests in flight together can't push the day past the
	// budget; the reservation is released when the real usage is recorded.
	let reservedUsd = 0;

	const worstPrice: Price = Object.values(config.prices).reduce(
		(a, b) => ({ in: Math.max(a.in, b.in), out: Math.max(a.out, b.out) }),
		{ in: 0, out: 0 }
	);
	const priceOf = (model: string): Price => config.prices[model] ?? worstPrice;

	// The whole prompt billed as a cache write, counting one token per UTF-8
	// byte (a token never covers less than a byte, so this holds for any script
	// or emoji a visitor sends), plus every output token the mode allows, for
	// every attempt a fallback can add, all at the dearest price.
	const worstCaseUsd = (request: AiRequest): number =>
		(MAX_ATTEMPTS *
			((Buffer.byteLength(SYSTEM_PROMPT) + Buffer.byteLength(buildTurn(request))) *
				worstPrice.in *
				2 +
				config.maxOutputTokens[request.mode] * worstPrice.out)) /
		1_000_000;

	const rollDay = () => {
		const now = today();
		if (now !== day) {
			day = now;
			usedToday = 0;
			spentTodayUsd = 0;
			hits.clear();
			strikes.clear();
		}
	};

	const secondsToMidnight = (now: number): number =>
		Math.ceil((new Date(`${day}T00:00:00Z`).getTime() + DAY_MS - now) / 1000);

	const checkLimits = ({ ip, reserve }: { ip: string; reserve: number }): LimitCheck => {
		rollDay();
		const now = Date.now();
		if (
			usedToday >= config.dailyLimit ||
			spentTodayUsd + reservedUsd + reserve > config.dailyBudgetUsd
		) {
			return { ok: false, error: 'daily_cap', retry: secondsToMidnight(now) };
		}
		if ((strikes.get(ip) ?? 0) >= config.strikesPerDay) {
			return { ok: false, error: 'guard_blocked', retry: secondsToMidnight(now) };
		}
		const mine = hits.get(ip) ?? [];
		const recent = mine.filter((t) => now - t < config.perIpWindowMs);
		if (mine.length >= config.perIpPerDay) {
			return { ok: false, error: 'rate_limited', retry: 60 * 60 };
		}
		if (recent.length >= config.perIpPerWindow) {
			const oldest = Math.min(...recent);
			return {
				ok: false,
				error: 'rate_limited',
				retry: Math.ceil((config.perIpWindowMs - (now - oldest)) / 1000)
			};
		}
		return { ok: true };
	};

	/** Whether the server is at its concurrency cap, or the address already has a generation running. */
	const isBusy = (ip: string): boolean => inFlight >= config.maxInFlight || inFlightByIp.has(ip);

	/** Counts the request and reserves its worst case; `release` undoes all but the count. */
	const admit = ({ ip, reserve }: { ip: string; reserve: number }) => {
		usedToday += 1;
		hits.set(ip, [...(hits.get(ip) ?? []), Date.now()]);
		inFlight += 1;
		inFlightByIp.add(ip);
		reservedUsd += reserve;
	};

	const release = ({ ip, reserve }: { ip: string; reserve: number }) => {
		inFlight -= 1;
		inFlightByIp.delete(ip);
		reservedUsd = Math.max(0, reservedUsd - reserve);
	};

	const usageUsd = ({ usage, model }: { usage: Usage; model: string }): number => {
		const price = priceOf(model);
		return (
			(usage.input_tokens * price.in +
				(usage.cache_read_input_tokens ?? 0) * price.in * 0.1 +
				(usage.cache_creation_input_tokens ?? 0) * price.in * 2 +
				usage.output_tokens * price.out) /
			1_000_000
		);
	};

	// Top-level usage covers only the attempt that produced the message. When a
	// fallback ran, usage.iterations lists every attempt, the declined one
	// included, each with the model that ran it; all of them are counted.
	const recordSpend = (response: {
		model: string;
		usage: Usage & { iterations?: (Usage & { model?: string | null })[] | null };
	}): number => {
		const { iterations } = response.usage;
		const usd = iterations?.length
			? iterations.reduce(
					(sum, usage) => sum + usageUsd({ usage, model: usage.model ?? response.model }),
					0
				)
			: usageUsd({ usage: response.usage, model: response.model });
		rollDay();
		spentTodayUsd += usd;
		return usd;
	};

	// An attempt whose usage never arrived is charged what it could have cost.
	const recordWorstCase = (usd: number) => {
		rollDay();
		spentTodayUsd += usd;
	};

	const strikesLeft = (ip: string): number =>
		Math.max(0, config.strikesPerDay - (strikes.get(ip) ?? 0));

	/** Counts a strike against the address and returns how many it has left. */
	const recordStrike = (ip: string): number => {
		rollDay();
		strikes.set(ip, (strikes.get(ip) ?? 0) + 1);
		return strikesLeft(ip);
	};

	return {
		spentTodayUsd: (): number => spentTodayUsd,
		worstCaseUsd,
		rollDay,
		checkLimits,
		isBusy,
		admit,
		release,
		recordSpend,
		recordWorstCase,
		recordStrike,
		strikesLeft
	};
};
