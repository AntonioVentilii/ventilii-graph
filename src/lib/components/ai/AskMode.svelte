<script lang="ts">
	import EvidenceChips from '#lib/components/ai/EvidenceChips.svelte';
	import FieldCounter from '#lib/components/ai/FieldCounter.svelte';
	import ModeOutput from '#lib/components/ai/ModeOutput.svelte';
	import RichText from '#lib/components/ai/RichText.svelte';
	import SubmitButton from '#lib/components/ai/SubmitButton.svelte';
	import { AiRequestState } from '#lib/stores/ai-request.svelte.ts';
	import { AI_INPUT_LIMITS, type AskResult } from '#lib/types/ai.types.ts';
	import type { Locale } from '#lib/types/portfolio.types.ts';
	import { ASK_SUGGESTIONS, askCopy } from '#lib/utils/ask-copy.utils.ts';

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
			bind:value={question}></textarea>
		<SubmitButton disabled={disabled || req.loading || !question.trim()} label={t('askSubmit')} />
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

<ModeOutput {email} {locale} onAsk={ask} {req}>
	{#snippet result(r)}
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

			<p class="text-xs text-fg-faint">{t('generatedBy')}</p>
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
	{/snippet}
</ModeOutput>
