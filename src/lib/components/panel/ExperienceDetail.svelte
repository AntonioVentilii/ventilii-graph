<script lang="ts">
	import RelatedProjects from '#lib/components/panel/RelatedProjects.svelte';
	import BulletList from '#lib/components/ui/BulletList.svelte';
	import EntryHeader from '#lib/components/ui/EntryHeader.svelte';
	import LinkList from '#lib/components/ui/LinkList.svelte';
	import PanelEyebrow from '#lib/components/ui/PanelEyebrow.svelte';
	import type { Locale, Experience } from '#lib/types/portfolio.types.ts';
	import type { Leaf } from '#lib/utils/leaf.utils.ts';
	import { pickLocale } from '#lib/utils/locale.utils.ts';
	import { relatedProjectsForExperience } from '#lib/utils/relations.utils.ts';

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

	<RelatedProjects
		label={relatedProjectsLabel}
		{locale}
		{onSelectLeaf}
		projects={relatedProjectsForExperience({ experience })}
	/>
</div>
