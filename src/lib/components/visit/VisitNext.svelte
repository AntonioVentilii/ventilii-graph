<script lang="ts">
	import { Mail, ShieldCheck, Sparkles } from '@lucide/svelte';
	import LinkList from '#lib/components/ui/LinkList.svelte';
	import { portfolioData } from '#lib/services/portfolio.services.ts';
	import { ASK_COPY, CHALLENGE_GOALS, askPath } from '#lib/utils/ask-copy.utils.ts';
	import { cvPath, mapPath } from '#lib/utils/locale.utils.ts';
	import { VISIT_COPY as t } from '#lib/utils/visit-copy.utils.ts';

	const { person } = portfolioData;
	const ask = askPath('en');

	const card =
		'block space-y-2 rounded-2xl border border-border bg-card p-5 text-sm leading-relaxed transition hover:border-accent';
</script>

<div class="space-y-6">
	<p class="font-display text-xs tracking-[0.18em] text-accent uppercase">{t.stepNext}</p>
	<h2 class="font-display text-2xl leading-tight font-bold text-fg sm:text-3xl">{t.nextTitle}</h2>
	<p class="max-w-[60ch] text-sm leading-relaxed text-fg-muted">{t.nextLead}</p>

	<div class="grid gap-3 sm:grid-cols-2">
		<a class={card} href="{ask}?mode=fit">
			<span class="flex items-center gap-2 font-bold text-fg">
				<Sparkles class="text-accent" aria-hidden="true" size={16} />
				{t.fitTitle}
			</span>
			<span class="block text-fg-muted">{t.fitBody}</span>
		</a>
		<a class={card} href="{ask}#protection">
			<span class="flex items-center gap-2 font-bold text-fg">
				<ShieldCheck class="text-accent" aria-hidden="true" size={16} />
				{t.breakTitle}
			</span>
			<span class="block text-fg-muted">{t.breakBody}</span>
			<span class="block text-fg-subtle">{ASK_COPY.challengeIntro.en}</span>
			<span class="block">
				{#each CHALLENGE_GOALS as goal (goal.en)}
					<span class="block text-fg-muted">· {goal.en}</span>
				{/each}
			</span>
		</a>
	</div>

	<section class="space-y-3 border-t border-border pt-5">
		<h3 class="font-display text-xs tracking-[0.14em] text-fg-subtle uppercase">
			{t.contactTitle}
		</h3>
		<div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
			<a
				class="inline-flex items-center gap-1.5 text-link underline underline-offset-2 hover:text-link-hover"
				href="mailto:{person.email}"
			>
				<Mail aria-hidden="true" size={14} />
				{person.email}
			</a>
			<a class="text-link underline underline-offset-2 hover:text-link-hover" href={cvPath('en')}
				>{t.cv}</a
			>
			<a class="text-link underline underline-offset-2 hover:text-link-hover" href={mapPath('en')}
				>{t.map}</a
			>
			<LinkList links={person.links} locale="en" />
		</div>
	</section>
</div>
