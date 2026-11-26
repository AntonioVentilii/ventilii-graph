<script lang="ts">
	import { portfolioData } from '#lib/services/portfolio.services.ts';
	import { VISIT_COPY as t } from '#lib/utils/visit-copy.utils.ts';
	import { type VisitAnswers, type VisitQuestionId, visitMatches } from '#lib/utils/visit.utils.ts';

	interface Props {
		answers: VisitAnswers;
		questions: readonly VisitQuestionId[];
		onquestion: (id: VisitQuestionId) => void;
	}

	let { answers, questions, onquestion }: Props = $props();

	const { person } = portfolioData;
	const result = $derived(visitMatches({ questions, answers }));
	const answered = $derived(result.matches.some((m) => m.picks.length > 0));
</script>

<div class="space-y-6">
	<p class="font-display text-xs tracking-[0.18em] text-accent uppercase">{t.resultKicker}</p>
	{#if !answered}
		<h2 class="font-display text-2xl leading-tight font-bold text-fg sm:text-3xl">
			{t.resultEmpty}
		</h2>
		<p class="max-w-[60ch] text-sm leading-relaxed text-fg-muted">{t.resultEmptyHint}</p>
	{:else}
		<h2 class="font-display text-2xl leading-tight font-bold text-fg sm:text-3xl">
			<span class="text-accent">{result.items}</span>
			{result.items === 1 ? t.resultTitleOne : t.resultTitle}
		</h2>
		<p class="text-xs text-fg-subtle">
			{t.basedIn}
			{person.location.en} · {person.title.en}
		</p>
	{/if}

	{#each result.matches as match (match.id)}
		<section class="space-y-3 border-t border-border pt-5">
			<h3 class="font-display text-xs tracking-[0.14em] text-fg-subtle uppercase">
				{match.question.name}
			</h3>
			{#if match.picks.length === 0}
				<button
					class="text-sm text-link underline underline-offset-2 hover:text-link-hover"
					onclick={() => onquestion(match.id)}
					type="button"
				>
					{t.skipped}: {match.question.title}
				</button>
			{/if}
			{#each match.picks as pick (pick.option.id)}
				<div class="space-y-2">
					<p class="text-sm font-bold text-fg">{pick.option.label}</p>
					{#if pick.option.note}
						<p class="max-w-[60ch] text-sm leading-relaxed text-fg-muted">{pick.option.note}</p>
					{/if}
					<ul class="grid gap-2 sm:grid-cols-2">
						{#each pick.evidence as item (item.key)}
							<li class="rounded-xl border border-border bg-card p-4 text-xs leading-relaxed">
								<p class="flex flex-wrap items-baseline gap-x-2">
									{#if item.href}
										<a
											class="font-bold text-link underline underline-offset-2 hover:text-link-hover"
											href={item.href}
											title={t.onTheMap}>{item.label}</a
										>
									{:else}
										<span class="font-bold text-fg">{item.label}</span>
									{/if}
									{#if item.meta}
										<span class="text-xs text-fg-subtle">{item.meta}</span>
									{/if}
								</p>
								<!-- The whole text is one click away, on the map. -->
								<p class="mt-1 line-clamp-4 text-fg-muted" title={item.text}>{item.text}</p>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</section>
	{/each}
</div>
