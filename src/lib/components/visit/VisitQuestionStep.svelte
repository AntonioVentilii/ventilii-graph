<script lang="ts">
	import { Check } from '@lucide/svelte';
	import { VISIT_COPY as t } from '#lib/utils/visit-copy.utils.ts';
	import {
		VISIT_QUESTIONS,
		toggleAnswer,
		type VisitAnswers,
		type VisitQuestion,
		type VisitQuestionId
	} from '#lib/utils/visit.utils.ts';

	interface Props {
		id: VisitQuestionId;
		n: number;
		total: number;
		answers: VisitAnswers;
	}

	let { id, n, total, answers = $bindable() }: Props = $props();

	const question = $derived<VisitQuestion>(VISIT_QUESTIONS[id]);
	const chosen = $derived(answers[id] ?? []);

	const toggle = (option: string) => {
		answers = { ...answers, [id]: toggleAnswer({ multi: question.multi, chosen, option }) };
	};
</script>

<div class="space-y-5">
	<p class="font-display text-xs tracking-[0.18em] text-accent uppercase">
		{t.questionKicker}
		{n}
		{t.of}
		{total}
	</p>
	<h2 class="font-display text-2xl leading-tight font-bold text-fg sm:text-3xl">
		{question.title}
	</h2>
	<p class="max-w-[60ch] text-sm leading-relaxed text-fg-muted">{question.hint}</p>
	<div class="grid gap-2 sm:grid-cols-2" aria-label={question.title} role="group">
		{#each question.options as option (option.id)}
			{@const on = chosen.includes(option.id)}
			<button
				class="flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition {on
					? 'border-accent bg-accent-soft font-bold text-fg'
					: 'border-border bg-card text-fg-muted hover:border-accent hover:text-fg'}"
				aria-pressed={on}
				onclick={() => toggle(option.id)}
				type="button"
			>
				<span
					class="flex h-5 w-5 shrink-0 items-center justify-center border {question.multi
						? 'rounded-md'
						: 'rounded-full'} {on
						? 'border-accent bg-accent text-accent-fg'
						: 'border-border-strong'}"
					aria-hidden="true"
				>
					{#if on}<Check size={12} strokeWidth={3} />{/if}
				</span>
				{option.label}
			</button>
		{/each}
	</div>
</div>
