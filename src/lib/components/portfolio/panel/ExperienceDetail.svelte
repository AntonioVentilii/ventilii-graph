<script lang="ts">
	import BulletList from '$lib/components/ui/BulletList.svelte';
	import InlineNavLink from '$lib/components/ui/InlineNavLink.svelte';
	import PanelEyebrow from '$lib/components/ui/PanelEyebrow.svelte';
	import { portfolioData } from '$lib/data/portfolio.data';
	import type { Leaf } from '$lib/portfolio/leaf';
	import { pickLocale } from '$lib/portfolio/locale';
	import type { Locale, Experience } from '$lib/portfolio/types';

	interface Props {
		experience: Experience;
		locale: Locale;
		sectionEyebrow?: string;
		relatedProjectsLabel: string;
		onSelectLeaf: (leaf: Leaf) => void;
	}

	let { experience, locale, sectionEyebrow, relatedProjectsLabel, onSelectLeaf }: Props = $props();

	const bullets = $derived(experience.highlights.map((h) => pickLocale({ text: h, locale })));
</script>

<div class="animate-fade space-y-3">
	{#if sectionEyebrow}
		<PanelEyebrow text={sectionEyebrow} />
	{/if}
	<h2 class="text-fg text-xl font-bold">{pickLocale({ text: experience.company, locale })}</h2>
	<p class="text-fg-muted text-sm">{pickLocale({ text: experience.role, locale })}</p>
	<p class="text-fg-subtle text-xs">
		{pickLocale({ text: experience.dates, locale })} · {pickLocale({
			text: experience.location,
			locale
		})}
	</p>
	<p class="text-fg-muted text-sm leading-relaxed">
		{pickLocale({ text: experience.summary, locale })}
	</p>
	<BulletList items={bullets} />
	{#if experience.links?.length}
		<div class="flex flex-wrap items-center gap-2 pt-2">
			{#each experience.links as link (link.href)}
				<a
					class="text-link hover:text-link-hover text-sm transition"
					href={link.href}
					rel="noopener noreferrer"
					target="_blank"
				>
					{pickLocale({ text: link.label, locale })}
				</a>
			{/each}
		</div>
	{/if}
	{#if experience.projectIds?.length}
		<div class="border-border text-fg-muted border-t pt-3 text-sm">
			<span class="text-fg-subtle">{relatedProjectsLabel}</span>
			<ul class="mt-1 space-y-1">
				{#each experience.projectIds as pid (pid)}
					{@const p = portfolioData.projects.find((x) => x.id === pid)}
					{#if p}
						<li>
							<InlineNavLink onclick={() => onSelectLeaf({ kind: 'project', id: p.id })}>
								{pickLocale({ text: p.title, locale })}
							</InlineNavLink>
						</li>
					{/if}
				{/each}
			</ul>
		</div>
	{/if}
</div>
