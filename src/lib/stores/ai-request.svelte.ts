import { requestAi } from '$lib/services/ai.services';
import type { AiErrorCode, AiRequest, AskResult, DeckResult, FitResult } from '$lib/types/ai.types';

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

	#controller: AbortController | undefined;

	run = async (request: Extract<AiRequest, { mode: M }>) => {
		this.#controller?.abort();
		const controller = new AbortController();
		this.#controller = controller;

		this.loading = true;
		this.error = undefined;

		try {
			const response = await requestAi({ request, signal: controller.signal });
			if (controller.signal.aborted) {
				return;
			}
			if (response.ok && response.mode === request.mode) {
				this.result = response.result as ResultByMode[M];
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
