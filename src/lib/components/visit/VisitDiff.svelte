<script lang="ts">
	import { VISIT_COPY as t, VISIT_VERDICT_COPY } from '#lib/utils/visit-copy.utils.ts';
	import type { VisitPosting, VisitVerdict } from '#lib/utils/visit-recipients.utils.ts';
	import { visitRows, visitTally } from '#lib/utils/visit.utils.ts';

	interface Props {
		posting: VisitPosting;
	}

	let { posting }: Props = $props();

	const rows = $derived(visitRows(posting));
	const tally = $derived(visitTally(posting));

	// Rows land one after another, like a review loading (all at once with reduced motion).
	const rowDelay = (i: number): string => `${350 + i * 160}ms`;

	const TONE: Record<VisitVerdict, string> = {
		direct: 'text-diff-add',
		adjacent: 'text-diff-mid',
		missing: 'text-diff-del'
	};
</script>

<!-- The one monospace block of the page: a posting read as a code review. -->
<figure
	class="shadow-leaf overflow-hidden rounded-2xl border border-border bg-card-solid font-display text-[0.8rem] leading-relaxed sm:text-sm"
>
	<figcaption
		class="flex items-center justify-between gap-3 border-b border-border px-4 py-2.5 text-xs text-fg-subtle"
	>
		<span class="flex items-center gap-2">
			<span class="h-2 w-2 rounded-full bg-accent" aria-hidden="true"></span>
			{t.diffLabel}
		</span>
		<span>{rows.length} {t.requirements}</span>
	</figcaption>

	<div class="border-b border-border">
		<p class="flex gap-3 bg-diff-del-bg px-4 py-1.5 text-fg">
			<span class="w-3 shrink-0 text-diff-del" aria-hidden="true">-</span>
			<span class="sr-only">{t.was}:</span>
			<del class="no-underline">{posting.from}</del>
		</p>
		<p class="flex gap-3 bg-diff-add-bg px-4 py-1.5 font-bold text-fg">
			<span class="w-3 shrink-0 text-diff-add" aria-hidden="true">+</span>
			<span class="sr-only">{t.now}:</span>
			<ins class="no-underline">{posting.to}</ins>
		</p>
	</div>

	<ol class="divide-y divide-border-muted">
		{#each rows as row, i (row.text)}
			<li
				style:animation-delay={rowDelay(i)}
				class="flex animate-row-in gap-3 px-4 py-2.5 motion-reduce:animate-none"
			>
				<span class="w-3 shrink-0 font-bold {TONE[row.verdict]}" aria-hidden="true"
					>{VISIT_VERDICT_COPY[row.verdict].mark}</span
				>
				<div class="min-w-0 flex-1 md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-6">
					<p class="text-fg">
						<span class="sr-only">{VISIT_VERDICT_COPY[row.verdict].label}:</span>
						{row.text}
					</p>
					<p class="text-fg-subtle">
						{#each row.evidence as link, j (link.href)}
							{#if j > 0}<span class="mx-1.5" aria-hidden="true">·</span>{/if}<a
								class="text-link underline decoration-border-strong underline-offset-2 transition hover:text-link-hover hover:decoration-current"
								href={link.href}>{link.label}</a
							>
						{/each}{#if row.note}{row.evidence.length > 0 ? ': ' : ''}<span
								class={row.verdict === 'direct' ? '' : TONE[row.verdict]}>{row.note}</span
							>{/if}
					</p>
				</div>
			</li>
		{/each}
	</ol>

	<p
		style:animation-delay={rowDelay(rows.length)}
		class="flex animate-row-in flex-wrap gap-x-4 gap-y-1 border-t border-border px-4 py-2.5 text-xs text-fg-subtle motion-reduce:animate-none"
	>
		<span class="sr-only">{t.tallyLabel}:</span>
		{#each tally as { verdict, count } (verdict)}
			<span
				><span class="font-bold {TONE[verdict]}">{VISIT_VERDICT_COPY[verdict].mark} {count}</span>
				{VISIT_VERDICT_COPY[verdict].label}</span
			>
		{/each}
	</p>
</figure>
