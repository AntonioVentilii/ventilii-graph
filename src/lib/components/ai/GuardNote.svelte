<script lang="ts">
	import { ShieldCheck } from 'lucide-svelte';
	import type { Guard } from '$lib/types/ai.types';
	import type { Locale } from '$lib/types/portfolio.types';
	import { ASK_SUGGESTIONS, askCopy } from '$lib/utils/ask-copy.utils';

	interface Props {
		guard: Guard;
		strikesLeft: number;
		locale: Locale;
		/** Ask mode passes its own submit, so a visitor can switch to a real question. */
		onAsk?: (question: string) => void;
	}

	let { guard, strikesLeft, locale, onAsk }: Props = $props();

	const t = (key: Parameters<typeof askCopy>[0]['key']) => askCopy({ key, locale });

	// The note is fixed copy; only the few-word paraphrase of the request is
	// the model's, and it is rendered as plain text inside the quote marks.
	const lead = $derived.by(() => {
		const offTopic = guard.kind === 'off_topic';
		if (!guard.attempt) {
			return { before: t(offTopic ? 'guardOffTopicPlain' : 'guardManipulationPlain'), after: '' };
		}
		const [before = '', after = ''] = t(offTopic ? 'guardOffTopic' : 'guardManipulation').split(
			'{attempt}'
		);
		return { before, after };
	});

	// The rules sit in a closed <details> at the foot of the page: open it
	// before the browser follows the anchor.
	const openRules = () => {
		const rules = document.getElementById('protection');
		if (rules instanceof HTMLDetailsElement) {
			rules.open = true;
		}
	};
</script>

<article
	class="animate-fade space-y-3 rounded-2xl border border-accent/40 bg-accent-soft p-5 text-sm leading-relaxed text-fg"
	role="alert"
>
	<p class="flex items-center gap-2 font-display font-bold">
		<ShieldCheck class="shrink-0 text-accent" aria-hidden="true" size={18} />
		{t('guardTitle')}
	</p>

	<p>
		{lead.before}{#if guard.attempt}<span class="font-semibold">{guard.attempt}</span
			>{lead.after}{/if}
	</p>

	<p class="text-fg-muted">
		{t(guard.kind === 'off_topic' ? 'guardOffTopicName' : 'guardManipulationName')}
	</p>

	<p class="text-fg-muted">
		{t('guardChallenge')}
		<a
			class="text-link underline underline-offset-2 hover:text-link-hover"
			href="#protection"
			onclick={openRules}>{t('guardRulesLink')}</a
		>
	</p>

	{#if strikesLeft <= 1}
		<p class="text-xs text-fg-subtle">
			{t(strikesLeft === 0 ? 'guardNoneLeft' : 'guardOneLeft')}
		</p>
	{/if}

	{#if onAsk && strikesLeft > 0}
		<div class="flex flex-wrap items-center gap-2 pt-1">
			<span class="w-full text-xs text-fg-subtle">{t('guardAskReal')}</span>
			{#each ASK_SUGGESTIONS.slice(0, 3) as s (s.en)}
				<button
					class="rounded-full border border-border bg-popover px-3 py-1 text-xs text-fg-muted transition hover:border-accent hover:text-fg"
					onclick={() => onAsk(s[locale])}
					type="button"
				>
					{s[locale]}
				</button>
			{/each}
		</div>
	{/if}
</article>
