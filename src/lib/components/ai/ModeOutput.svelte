<script generics="M extends Mode" lang="ts">
	import type { Snippet } from 'svelte';
	import RequestStatus from '#lib/components/ai/RequestStatus.svelte';
	import type { AiRequestState, Mode, ResultByMode } from '#lib/stores/ai-request.svelte.ts';
	import type { Locale } from '#lib/types/portfolio.types.ts';

	/** Under a mode's form: where its request stands, then its result once it is in. */
	interface Props {
		req: AiRequestState<M>;
		locale: Locale;
		email: string;
		/** Ask mode passes its own submit, so a visitor can switch to a real question. */
		onAsk?: (question: string) => void;
		result: Snippet<[ResultByMode[M]]>;
	}

	let { req, locale, email, onAsk, result }: Props = $props();
</script>

<div class="mt-6 space-y-4">
	<RequestStatus
		{email}
		error={req.error}
		guard={req.guard}
		loading={req.loading}
		{locale}
		{onAsk}
	/>

	{#if req.result && !req.loading}
		{@render result(req.result)}
	{/if}
</div>
