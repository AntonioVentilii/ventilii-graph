<script lang="ts">
	import BulletList from '$lib/components/ui/BulletList.svelte';
	import EntryHeader from '$lib/components/ui/EntryHeader.svelte';
	import LinkList from '$lib/components/ui/LinkList.svelte';
	import PanelEyebrow from '$lib/components/ui/PanelEyebrow.svelte';
	import RelatedSection from '$lib/components/ui/RelatedSection.svelte';
	import TagButton from '$lib/components/ui/TagButton.svelte';
	import type { Project, Locale } from '$lib/types/portfolio.types';
	import type { Leaf } from '$lib/utils/leaf.utils';
	import { pickLocale } from '$lib/utils/locale.utils';
	import { relatedStackForProject } from '$lib/utils/relations.utils';

	interface Props {
		project: Project;
		locale: Locale;
		sectionEyebrow?: string;
		stackLabel: string;
		onSelectLeaf: (leaf: Leaf) => void;
	}

	let { project, locale, sectionEyebrow, stackLabel, onSelectLeaf }: Props = $props();

	const bullets = $derived(project.highlights?.map((h) => pickLocale({ text: h, locale })) ?? []);
	const stacks = $derived(relatedStackForProject(project.id));
</script>

<div class="animate-fade space-y-3">
	{#if sectionEyebrow}
		<PanelEyebrow text={sectionEyebrow} />
	{/if}

	<EntryHeader title={pickLocale({ text: project.title, locale })} />

	<p class="text-fg-muted text-sm leading-relaxed">
		{pickLocale({ text: project.summary, locale })}
	</p>

	<BulletList items={bullets} />

	<LinkList links={project.links} {locale} />

	{#if stacks.length}
		<RelatedSection label={stackLabel}>
			<div class="flex flex-wrap items-center gap-1.5">
				{#each stacks as s (s.id)}
					<TagButton
						onclick={() => onSelectLeaf({ kind: 'technology', id: s.id })}
						text={pickLocale({ text: s.label, locale })}
					/>
				{/each}
			</div>
		</RelatedSection>
	{/if}

	{#if project.note}
		<div class="border-accent/10 bg-accent/5 text-accent mt-4 rounded-xl border p-3 text-xs italic">
			<span class="mr-1 font-bold not-italic">Meta:</span>
			{pickLocale({ text: project.note, locale })}
		</div>
	{/if}
</div>
