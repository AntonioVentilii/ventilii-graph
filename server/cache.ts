import { createHash } from 'node:crypto';
import type { AiRequest, AiResult, Guard } from '../src/lib/types/ai.types.ts';

/**
 * The answer cache: suggested questions get asked again and again, and a
 * cached answer costs nothing. In memory only, like the limits.
 */

const CACHE_TTL_MS = 6 * 60 * 60 * 1000;
const CACHE_MAX_ENTRIES = 500;

// What a generation produced: an answer, or the guard verdict on a request
// the model would not take on. Both are cached, so sending the same
// off-topic prompt again costs nothing.
export type Outcome = { result: AiResult } | { guard: Guard };

const cache = new Map<string, { at: number; value: Outcome }>();

export const cacheKey = (request: AiRequest): string =>
	createHash('sha256').update(JSON.stringify(request)).digest('hex');

export const cacheGet = (key: string): Outcome | undefined => {
	const hit = cache.get(key);
	if (!hit || Date.now() - hit.at > CACHE_TTL_MS) {
		cache.delete(key);
		return undefined;
	}
	return hit.value;
};

export const cachePut = ({ key, value }: { key: string; value: Outcome }) => {
	if (cache.size >= CACHE_MAX_ENTRIES) {
		const oldest = cache.keys().next().value;
		if (oldest !== undefined) {
			cache.delete(oldest);
		}
	}
	cache.set(key, { at: Date.now(), value });
};

// The /ask privacy note promises answers are gone after 6 hours; otherwise
// they are only cleared when the same request comes back.
setInterval(() => {
	const now = Date.now();
	cache.forEach(({ at }, key) => {
		if (now - at > CACHE_TTL_MS) {
			cache.delete(key);
		}
	});
}, 60 * 1000).unref();
