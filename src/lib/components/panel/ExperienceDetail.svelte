<script lang="ts">
	import BulletList from '$lib/components/ui/BulletList.svelte';
	import EntryHeader from '$lib/components/ui/EntryHeader.svelte';
	import InlineNavLink from '$lib/components/ui/InlineNavLink.svelte';
	import LinkList from '$lib/components/ui/LinkList.svelte';
	import PanelEyebrow from '$lib/components/ui/PanelEyebrow.svelte';
	import RelatedSection from '$lib/components/ui/RelatedSection.svelte';
	import { portfolioData } from '$lib/services/portfolio.services';
	import type { Locale, Experience } from '$lib/types/portfolio.types';
	import type { Leaf } from '$lib/utils/leaf.utils';
	import { pickLocale } from '$lib/utils/locale.utils';

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

	<EntryHeader
		meta="{pickLocale({ text: experience.dates, locale })} · {pickLocale({
			text: experience.location,
			locale
		})}"
		subtitle={pickLocale({ text: experience.role, locale })}
		title={pickLocale({ text: experience.company, locale })}
	/>

	<p class="text-sm leading-relaxed text-fg-muted">
		{pickLocale({ text: experience.summary, locale })}
	</p>

	<BulletList items={bullets} />

	<LinkList links={experience.links ?? []} {locale} />

	{#if experience.projectIds?.length}
		<RelatedSection label={relatedProjectsLabel}>
			<ul class="space-y-1">
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
		</RelatedSection>
	{/if}
</div>
