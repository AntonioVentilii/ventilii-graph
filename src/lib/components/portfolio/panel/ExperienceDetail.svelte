<script lang="ts">
	import { portfolioData } from '$lib/data/portfolio.data';
	import { pickLocale } from '$lib/portfolio/locale';
	import type { Locale } from '$lib/portfolio/types';
	import type { Experience } from '$lib/portfolio/types';
	import PanelEyebrow from '$lib/components/ui/PanelEyebrow.svelte';
	import BulletList from '$lib/components/ui/BulletList.svelte';
	import InlineNavLink from '$lib/components/ui/InlineNavLink.svelte';
	import type { Leaf } from '$lib/portfolio/leaf';

	interface Props {
		experience: Experience;
		locale: Locale;
		sectionEyebrow?: string;
		relatedProjectsLabel: string;
		onSelectLeaf: (leaf: Leaf) => void;
	}

	let { experience, locale, sectionEyebrow, relatedProjectsLabel, onSelectLeaf }: Props = $props();

	const bullets = $derived(experience.highlights.map((h) => pickLocale(h, locale)));
</script>

<div class="space-y-3 animate-fade">
	{#if sectionEyebrow}
		<PanelEyebrow text={sectionEyebrow} />
	{/if}
	<h2 class="text-xl font-bold text-fg">{pickLocale(experience.company, locale)}</h2>
	<p class="text-sm text-fg-muted">{pickLocale(experience.role, locale)}</p>
	<p class="text-xs text-fg-subtle">
		{pickLocale(experience.dates, locale)} · {pickLocale(experience.location, locale)}
	</p>
	<p class="text-sm leading-relaxed text-fg-muted">{pickLocale(experience.summary, locale)}</p>
	<BulletList items={bullets} />
	{#if experience.links?.length}
		<div class="flex flex-wrap items-center gap-2 pt-2">
			{#each experience.links as link}
				<a
					href={link.href}
					class="text-sm text-link transition hover:text-link-hover"
					target="_blank"
					rel="noopener noreferrer"
				>
					{pickLocale(link.label, locale)}
				</a>
			{/each}
		</div>
	{/if}
	{#if experience.projectIds?.length}
		<div class="border-t border-border pt-3 text-sm text-fg-muted">
			<span class="text-fg-subtle">{relatedProjectsLabel}</span>
			<ul class="mt-1 space-y-1">
				{#each experience.projectIds as pid}
					{@const p = portfolioData.projects.find((x) => x.id === pid)}
					{#if p}
						<li>
							<InlineNavLink onclick={() => onSelectLeaf({ kind: 'project', id: p.id })}>
								{pickLocale(p.title, locale)}
							</InlineNavLink>
						</li>
					{/if}
				{/each}
			</ul>
		</div>
	{/if}
</div>
