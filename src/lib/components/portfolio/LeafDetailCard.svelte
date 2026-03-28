<script lang="ts">
	import AboutDetail from '$lib/components/portfolio/panel/AboutDetail.svelte';
	import EducationDetail from '$lib/components/portfolio/panel/EducationDetail.svelte';
	import ExperienceDetail from '$lib/components/portfolio/panel/ExperienceDetail.svelte';
	import LanguageDetail from '$lib/components/portfolio/panel/LanguageDetail.svelte';
	import ProjectDetail from '$lib/components/portfolio/panel/ProjectDetail.svelte';
	import TechnologyDetail from '$lib/components/portfolio/panel/TechnologyDetail.svelte';
	import { portfolioData } from '$lib/data/portfolio.data';
	import { leafLabel, parseLeaf, type Leaf } from '$lib/portfolio/leaf';
	import type { Locale } from '$lib/portfolio/types';

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
	class="leaf-detail-card border-border border-l-accent bg-card scroll-mt-24 rounded-xl border border-l-[3px] p-4 text-sm shadow-[var(--shadow-panel-inset)] [&_.space-y-3]:space-y-2 [&_h2]:text-lg"
	aria-label={leaf ? leafLabel(leaf, locale) : 'Detail'}
	tabindex="-1"
>
	{#if leaf?.kind === 'experience'}
		{@const e = portfolioData.experiences.find((x) => x.id === leaf.id)}
		{#if e}
			<ExperienceDetail
				experience={e}
				{locale}
				{onSelectLeaf}
				relatedProjectsLabel={labels.relatedProjects}
			/>
		{/if}
	{:else if leaf?.kind === 'project'}
		{@const p = portfolioData.projects.find((x) => x.id === leaf.id)}
		{#if p}
			<ProjectDetail {locale} {onSelectLeaf} project={p} stackLabel={labels.stack} />
		{/if}
	{:else if leaf?.kind === 'technology'}
		{@const s = portfolioData.technologies.find((x) => x.id === leaf.id)}
		{#if s}
			<TechnologyDetail
				{locale}
				{onSelectLeaf}
				relatedHeading={labels.relatedTechProjects}
				technology={s}
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
