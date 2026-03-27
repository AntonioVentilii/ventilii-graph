<script lang="ts">
	import { portfolioData } from '$lib/data/portfolio.data';
	import type { Locale } from '$lib/portfolio/types';
	import { leafLabel, parseLeaf, type Leaf } from '$lib/portfolio/leaf';
	import ExperienceDetail from './panel/ExperienceDetail.svelte';
	import ProjectDetail from './panel/ProjectDetail.svelte';
	import TechnologyDetail from './panel/TechnologyDetail.svelte';
	import EducationDetail from './panel/EducationDetail.svelte';
	import LanguageDetail from './panel/LanguageDetail.svelte';
	import AboutDetail from './panel/AboutDetail.svelte';

	interface Props {
		locale: Locale;
		itemId: string;
		labels: {
			relatedProjects: string;
			stack: string;
			relatedTechProjects: string;
			languageUiNote: string;
		};
		onSelectLeaf: (leaf: Leaf) => void;
	}

	let { locale, itemId, labels, onSelectLeaf }: Props = $props();

	const leaf = $derived(parseLeaf(itemId));
</script>

<aside
	id="leaf-detail-panel"
	tabindex="-1"
	class="leaf-detail-card scroll-mt-24 rounded-xl border border-border border-l-[3px] border-l-accent bg-card p-4 text-sm shadow-[var(--shadow-panel-inset)] [&_.space-y-3]:space-y-2 [&_h2]:text-lg"
	aria-label={leaf ? leafLabel(leaf, locale) : 'Detail'}
>
	{#if leaf?.kind === 'experience'}
		{@const e = portfolioData.experiences.find((x) => x.id === leaf.id)}
		{#if e}
			<ExperienceDetail
				experience={e}
				{locale}
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
				relatedHeading={labels.relatedTechProjects}
				{onSelectLeaf}
			/>
		{/if}
	{:else if leaf?.kind === 'education'}
		{@const ed = portfolioData.education.find((x) => x.id === leaf.id)}
		{#if ed}
			<EducationDetail entry={ed} {locale} />
		{/if}
	{:else if leaf?.kind === 'language'}
		{@const l = portfolioData.languages.find((x) => x.id === leaf.id)}
		{#if l}
			<LanguageDetail entry={l} {locale} uiCopyNote={labels.languageUiNote} />
		{/if}
	{:else if leaf?.kind === 'about'}
		{@const a = portfolioData.about.find((x) => x.id === leaf.id)}
		{#if a}
			<AboutDetail block={a} {locale} />
		{/if}
	{/if}
</aside>
