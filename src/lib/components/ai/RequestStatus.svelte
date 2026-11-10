<script lang="ts">
	import ErrorNote from '#lib/components/ai/ErrorNote.svelte';
	import GuardNote from '#lib/components/ai/GuardNote.svelte';
	import ThinkingIndicator from '#lib/components/ai/ThinkingIndicator.svelte';
	import type { AiErrorCode, Guard } from '#lib/types/ai.types.ts';
	import type { Locale } from '#lib/types/portfolio.types.ts';

	/** Where a mode's request stands: thinking, the guard's note, or an error. */
	interface Props {
		loading: boolean;
		error: AiErrorCode | undefined;
		guard: { guard: Guard; strikesLeft: number } | undefined;
		locale: Locale;
		email: string;
		/** Ask mode passes its own submit, so a visitor can switch to a real question. */
		onAsk?: (question: string) => void;
	}

	let { loading, error, guard, locale, email, onAsk }: Props = $props();
</script>

{#if loading}
	<ThinkingIndicator {locale} />
{:else if error === 'guarded' && guard}
	<GuardNote guard={guard.guard} {locale} {onAsk} strikesLeft={guard.strikesLeft} />
{:else if error}
	<ErrorNote {email} {error} {locale} />
{/if}
