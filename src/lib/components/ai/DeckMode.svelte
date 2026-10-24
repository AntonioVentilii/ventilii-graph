<script lang="ts">
	import DeckViewer from '$lib/components/ai/DeckViewer.svelte';
	import ErrorNote from '$lib/components/ai/ErrorNote.svelte';
	import FieldCounter from '$lib/components/ai/FieldCounter.svelte';
	import ThinkingIndicator from '$lib/components/ai/ThinkingIndicator.svelte';
	import { AiRequestState } from '$lib/stores/ai-request.svelte';
	import { AI_INPUT_LIMITS } from '$lib/types/ai.types';
	import type { Locale } from '$lib/types/portfolio.types';
	import { DECK_PRESETS, askCopy } from '$lib/utils/ask-copy.utils';

	interface Props {
		locale: Locale;
		disabled: boolean;
		email: string;
		name: string;
	}

	let { locale, disabled, email, name }: Props = $props();

	const req = new AiRequestState<'deck'>();
	let audience = $state('');

	const t = (key: Parameters<typeof askCopy>[0]['key']) => askCopy({ key, locale });

	const make = (text: string) => {
		const trimmed = text.trim();
		if (!trimmed || disabled) {
			return;
		}
		audience = trimmed;
		void req.run({ mode: 'deck', locale, audience: trimmed });
	};

	const onsubmit = (e: SubmitEvent) => {
		e.preventDefault();
		make(audience);
	};
</script>

<form class="space-y-3 print:hidden" {onsubmit}>
	<label class="block text-xs tracking-wide text-fg-subtle uppercase" for="deck-audience">
		{t('deckLabel')}
	</label>
	<div
		class="shadow-leaf flex items-center gap-2 rounded-2xl border border-border bg-card-solid p-2 focus-within:border-accent"
	>
		<input
			id="deck-audience"
			class="h-10 min-w-0 flex-1 bg-transparent px-2 text-sm text-fg outline-hidden placeholder:text-fg-faint"
			maxlength={AI_INPUT_LIMITS.audience}
			placeholder={t('deckPlaceholder')}
			type="text"
			bind:value={audience}
		/>
		<button
			class="h-10 shrink-0 rounded-xl bg-accent px-4 text-sm font-bold text-accent-fg transition hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
			disabled={disabled || req.loading || !audience.trim()}
			type="submit"
		>
			{t('deckSubmit')}
		</button>
	</div>
	<div class="flex flex-wrap items-center justify-between gap-2">
		<div class="flex flex-wrap items-center gap-2">
			<span class="text-xs text-fg-subtle">{t('deckPresets')}</span>
			{#each DECK_PRESETS as p (p.en)}
				<button
					class="rounded-full border border-border bg-popover px-3 py-1 text-xs text-fg-muted transition hover:border-accent hover:text-fg disabled:opacity-50"
					disabled={disabled || req.loading}
					onclick={() => make(p[locale])}
					type="button"
				>
					{p[locale]}
				</button>
			{/each}
		</div>
		<FieldCounter label={t('charsLeft')} length={audience.length} max={AI_INPUT_LIMITS.audience} />
	</div>
</form>

<div class="mt-6 space-y-4">
	{#if req.loading}
		<ThinkingIndicator {locale} />
	{:else if req.error}
		<ErrorNote {email} error={req.error} {locale} />
	{/if}

	{#if req.result && !req.loading}
		{#key req.result}
			<DeckViewer {name} deck={req.result} {locale} />
		{/key}
	{/if}
</div>
