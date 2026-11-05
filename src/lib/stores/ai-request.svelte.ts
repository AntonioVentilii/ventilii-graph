import { requestAi } from '#lib/services/ai.services.ts';
import type {
	AiErrorCode,
	AiRequest,
	AskResult,
	DeckResult,
	FitResult,
	Guard
} from '#lib/types/ai.types.ts';

type Mode = AiRequest['mode'];

interface ResultByMode {
	ask: AskResult;
	fit: FitResult;
	deck: DeckResult;
}

/**
 * One in-flight generation per mode: loading, result or error. A new run
 * aborts the previous one, so a quick second question never shows the answer
 * to the first.
 */
export class AiRequestState<M extends Mode> {
	loading = $state(false);
	result = $state<ResultByMode[M] | undefined>(undefined);
	error = $state<AiErrorCode | undefined>(undefined);
	/** Set with the 'guarded' error: what the model would not do, and how many tries are left today. */
	guard = $state<{ guard: Guard; strikesLeft: number } | undefined>(undefined);

	#controller: AbortController | undefined;

	run = async (request: Extract<AiRequest, { mode: M }>) => {
		this.#controller?.abort();
		const controller = new AbortController();
		this.#controller = controller;

		// Drop the previous answer too: if this run fails, its error must not
		// sit above an old result that looks like the answer to the new request.
		this.loading = true;
		this.error = undefined;
		this.guard = undefined;
		this.result = undefined;

		try {
			const response = await requestAi({ request, signal: controller.signal });
			if (controller.signal.aborted) {
				return;
			}
			if (response.ok && response.mode === request.mode) {
				this.result = response.result as ResultByMode[M];
			} else if (!response.ok && response.error === 'guarded') {
				this.error = 'guarded';
				this.guard = { guard: response.guard, strikesLeft: response.strikesLeft };
			} else {
				this.error = response.ok ? 'upstream' : response.error;
			}
		} catch {
			// Aborted by a newer run: that run owns the state now.
			return;
		}
		this.loading = false;
	};
}
