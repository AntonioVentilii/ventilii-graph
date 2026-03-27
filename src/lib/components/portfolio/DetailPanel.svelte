<script lang="ts">
	import { portfolioData } from '$lib/data/portfolio.data';
	import { pickLocale } from '$lib/portfolio/locale';
	import type { Locale } from '$lib/portfolio/types';
	import { parseLeaf, type Leaf } from '$lib/portfolio/leaf';
	import PersonSummary from './panel/PersonSummary.svelte';
	import CategoryIntro from './panel/CategoryIntro.svelte';
	import ExperienceDetail from './panel/ExperienceDetail.svelte';
	import ProjectDetail from './panel/ProjectDetail.svelte';
	import TechnologyDetail from './panel/TechnologyDetail.svelte';
	import EducationDetail from './panel/EducationDetail.svelte';
	import LanguageDetail from './panel/LanguageDetail.svelte';
	import AboutDetail from './panel/AboutDetail.svelte';

	interface Props {
		locale: Locale;
		categoryId: string | null;
		itemId: string | null;
		labels: {
			orgNote: string;
			panelHint: string;
			categoryIntroEyebrow: string;
			hintPickOuter: string;
			relatedProjects: string;
			stack: string;
			relatedTechProjects: string;
			languageUiNote: string;
		};
		onSelectLeaf: (leaf: Leaf) => void;
	}

	let { locale, categoryId, itemId, labels, onSelectLeaf }: Props = $props();
</script>

<aside
	id="detail-panel"
	tabindex="-1"
	class="min-h-[280px] scroll-mt-24 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-panel-inset)] md:sticky md:top-8"
>
	{#if categoryId && !itemId}
		{@const cat = portfolioData.categories.find((c) => c.id === categoryId)}
		{#if cat}
			<CategoryIntro
				category={cat}
				{locale}
				categoryLabel={labels.categoryIntroEyebrow}
				hintPickOuter={labels.hintPickOuter}
				{onSelectLeaf}
			/>
		{/if}
	{:else if !itemId}
		<PersonSummary
			data={portfolioData}
			{locale}
			orgNoteLabel={labels.orgNote}
			panelHint={labels.panelHint}
		/>
	{:else if itemId}
		{@const leaf = parseLeaf(itemId)}
		{#if leaf?.kind === 'experience'}
			{@const e = portfolioData.experiences.find((x) => x.id === leaf.id)}
			{#if e}
				<ExperienceDetail
					experience={e}
					{locale}
					sectionEyebrow={pickLocale(portfolioData.categories[0].label, locale)}
					relatedProjectsLabel={labels.relatedProjects}
					{onSelectLeaf}
				/>
			{/if}
		{:else if leaf?.kind === 'project'}
			{@const p = portfolioData.projects.find((x) => x.id === leaf.id)}
			{#if p}
				<ProjectDetail
					project={p}
					{locale}
					sectionEyebrow={pickLocale(portfolioData.categories[1].label, locale)}
					stackLabel={labels.stack}
					{onSelectLeaf}
				/>
			{/if}
		{:else if leaf?.kind === 'technology'}
			{@const s = portfolioData.technologies.find((x) => x.id === leaf.id)}
			{#if s}
				<TechnologyDetail
					technology={s}
					{locale}
					sectionEyebrow={pickLocale(portfolioData.categories[2].label, locale)}
					relatedHeading={labels.relatedTechProjects}
					{onSelectLeaf}
				/>
			{/if}
		{:else if leaf?.kind === 'education'}
			{@const ed = portfolioData.education.find((x) => x.id === leaf.id)}
			{#if ed}
				<EducationDetail
					entry={ed}
					{locale}
					sectionEyebrow={pickLocale(portfolioData.categories[3].label, locale)}
				/>
			{/if}
		{:else if leaf?.kind === 'language'}
			{@const l = portfolioData.languages.find((x) => x.id === leaf.id)}
			{#if l}
				<LanguageDetail
					entry={l}
					{locale}
					sectionEyebrow={pickLocale(portfolioData.categories[4].label, locale)}
					uiCopyNote={labels.languageUiNote}
				/>
			{/if}
		{:else if leaf?.kind === 'about'}
			{@const a = portfolioData.about.find((x) => x.id === leaf.id)}
			{#if a}
				<AboutDetail
					block={a}
					{locale}
					sectionEyebrow={pickLocale(portfolioData.categories[5].label, locale)}
				/>
			{/if}
		{/if}
	{/if}
</aside>
