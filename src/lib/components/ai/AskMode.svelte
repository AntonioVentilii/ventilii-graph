<script lang="ts">
	import ErrorNote from '$lib/components/ai/ErrorNote.svelte';
	import EvidenceChips from '$lib/components/ai/EvidenceChips.svelte';
	import FieldCounter from '$lib/components/ai/FieldCounter.svelte';
	import RichText from '$lib/components/ai/RichText.svelte';
	import ThinkingIndicator from '$lib/components/ai/ThinkingIndicator.svelte';
	import { AiRequestState } from '$lib/stores/ai-request.svelte';
	import { AI_INPUT_LIMITS, type AskResult } from '$lib/types/ai.types';
	import type { Locale } from '$lib/types/portfolio.types';
	import { ASK_SUGGESTIONS, askCopy } from '$lib/utils/ask-copy.utils';

	interface Props {
		locale: Locale;
		disabled: boolean;
		email: string;
	}

	let { locale, disabled, email }: Props = $props();

	const req = new AiRequestState<'ask'>();
	let question = $state('');

	const ask = (text: string) => {
		const trimmed = text.trim();
		if (!trimmed || disabled) {
			return;
		}
		question = trimmed;
		void req.run({ mode: 'ask', locale, question: trimmed });
	};

	const onsubmit = (e: SubmitEvent) => {
		e.preventDefault();
		ask(question);
	};

	const onkeydown = (e: KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			ask(question);
		}
	};

	const confidenceText = (c: AskResult['confidence']): string =>
		askCopy({
			key: c === 'high' ? 'confidenceHigh' : c === 'medium' ? 'confidenceMedium' : 'confidenceLow',
			locale
		});

	const t = (key: Parameters<typeof askCopy>[0]['key']) => askCopy({ key, locale });
</script>

<form class="space-y-3" {onsubmit}>
	<label class="block text-xs tracking-wide text-fg-subtle uppercase" for="ask-question">
		{t('askLabel')}
	</label>
	<div
		class="shadow-leaf flex items-end gap-2 rounded-2xl border border-border bg-card-solid p-2 focus-within:border-accent"
	>
		<textarea
			id="ask-question"
			class="max-h-40 min-h-11 flex-1 resize-none bg-transparent px-2 py-2 text-sm text-fg outline-hidden placeholder:text-fg-faint"
			maxlength={AI_INPUT_LIMITS.question}
			{onkeydown}
			placeholder={t('askPlaceholder')}
			rows="2"
			bind:value={question}
		></textarea>
		<button
			class="h-10 shrink-0 rounded-xl bg-accent px-4 text-sm font-bold text-accent-fg transition hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
			disabled={disabled || req.loading || !question.trim()}
			type="submit"
		>
			{t('askSubmit')}
		</button>
	</div>
	<div class="flex justify-end">
		<FieldCounter label={t('charsLeft')} length={question.length} max={AI_INPUT_LIMITS.question} />
	</div>
</form>

<div class="mt-2 flex flex-wrap items-center gap-2">
	<span class="text-xs tracking-wide text-fg-subtle uppercase">{t('suggestions')}</span>
	{#each ASK_SUGGESTIONS as s (s.en)}
		<button
			class="rounded-full border border-border bg-popover px-3 py-1 text-xs text-fg-muted transition hover:border-accent hover:text-fg disabled:opacity-50"
			disabled={disabled || req.loading}
			onclick={() => ask(s[locale])}
			type="button"
		>
			{s[locale]}
		</button>
	{/each}
</div>

<div class="mt-6 space-y-4">
	{#if req.loading}
		<ThinkingIndicator {locale} />
	{:else if req.error}
		<ErrorNote {email} error={req.error} {locale} />
	{/if}

	{#if req.result && !req.loading}
		{@const r = req.result}
		<article
			class="animate-fade shadow-leaf space-y-4 rounded-2xl border border-border bg-card p-5"
		>
			<RichText text={r.answer} />

			{#if r.notInPortfolio}
				<div class="rounded-xl border border-dashed border-border-strong p-3 text-sm text-fg-muted">
					<span class="mr-1 text-xs font-bold tracking-wide text-fg-subtle uppercase"
						>{t('notInPortfolio')}</span
					>
					{r.notInPortfolio}
				</div>
			{/if}

			<EvidenceChips evidence={r.evidence} label={t('evidence')} {locale} />

			<p class="text-xs text-fg-subtle">
				<span class="font-bold tracking-wide uppercase">{t('confidence')}</span>:
				{confidenceText(r.confidence)}
			</p>
		</article>

		{#if r.followUps.length}
			<div class="flex flex-wrap items-center gap-2">
				<span class="text-xs tracking-wide text-fg-subtle uppercase">{t('followUps')}</span>
				{#each r.followUps as f (f)}
					<button
						class="rounded-full border border-accent/40 bg-accent-soft px-3 py-1 text-xs text-fg transition hover:border-accent disabled:opacity-50"
						{disabled}
						onclick={() => ask(f)}
						type="button"
					>
						{f}
					</button>
				{/each}
			</div>
		{/if}
	{/if}
</div>
