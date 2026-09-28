import type { AiHealth, AiRequest, AiResponse } from '$lib/types/ai.types';

/** Client for the API in server/, served on the same origin under /api/ by nginx (vite proxies it in dev). */

export const fetchAiHealth = async (): Promise<AiHealth | undefined> => {
	try {
		const res = await fetch('/api/ai/health', { cache: 'no-store' });
		return res.ok ? ((await res.json()) as AiHealth) : undefined;
	} catch {
		return undefined;
	}
};

export const requestAi = async ({
	request,
	signal
}: {
	request: AiRequest;
	signal?: AbortSignal;
}): Promise<AiResponse> => {
	try {
		const res = await fetch('/api/ai', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify(request),
			signal
		});
		return (await res.json()) as AiResponse;
	} catch (err: unknown) {
		if (err instanceof DOMException && err.name === 'AbortError') {
			throw err;
		}
		return { ok: false, error: 'upstream' };
	}
};
