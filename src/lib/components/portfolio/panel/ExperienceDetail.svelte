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
		sectionEyebrow: string;
		relatedProjectsLabel: string;
		onSelectLeaf: (leaf: Leaf) => void;
	}

	let { experience, locale, sectionEyebrow, relatedProjectsLabel, onSelectLeaf }: Props = $props();

	const bullets = $derived(experience.highlights.map((h) => pickLocale(h, locale)));
</script>

<div class="space-y-3 animate-fade">
	<PanelEyebrow text={sectionEyebrow} />
	<h2 class="text-xl font-bold text-white">{pickLocale(experience.company, locale)}</h2>
	<p class="text-sm text-zinc-400">{pickLocale(experience.role, locale)}</p>
	<p class="text-xs text-zinc-500">
		{pickLocale(experience.dates, locale)} · {pickLocale(experience.location, locale)}
	</p>
	<p class="text-sm leading-relaxed text-zinc-300">{pickLocale(experience.summary, locale)}</p>
	<BulletList items={bullets} />
	{#if experience.links?.length}
		<div class="flex flex-wrap gap-2 pt-2">
			{#each experience.links as link}
				<a
					href={link.href}
					class="text-sm text-brand-300 hover:text-white"
					target="_blank"
					rel="noopener noreferrer"
				>
					{pickLocale(link.label, locale)}
				</a>
			{/each}
		</div>
	{/if}
	{#if experience.projectIds?.length}
		<div class="border-t border-zinc-800 pt-3 text-sm text-zinc-400">
			<span class="text-zinc-500">{relatedProjectsLabel}</span>
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
