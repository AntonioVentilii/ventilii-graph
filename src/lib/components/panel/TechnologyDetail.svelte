<script lang="ts">
	import EntryHeader from '$lib/components/ui/EntryHeader.svelte';
	import InlineNavLink from '$lib/components/ui/InlineNavLink.svelte';
	import PanelEyebrow from '$lib/components/ui/PanelEyebrow.svelte';
	import RelatedSection from '$lib/components/ui/RelatedSection.svelte';
	import type { Locale, Technology } from '$lib/types/portfolio.types';
	import type { Leaf } from '$lib/utils/leaf.utils';
	import { pickLocale } from '$lib/utils/locale.utils';
	import { relatedProjectsForStack } from '$lib/utils/relations.utils';

	interface Props {
		technology: Technology;
		locale: Locale;
		sectionEyebrow?: string;
		relatedHeading: string;
		onSelectLeaf: (leaf: Leaf) => void;
	}

	let { technology, locale, sectionEyebrow, relatedHeading, onSelectLeaf }: Props = $props();

	const projects = $derived(relatedProjectsForStack(technology.id));
</script>

<div class="animate-fade space-y-3">
	{#if sectionEyebrow}
		<PanelEyebrow text={sectionEyebrow} />
	{/if}

	<EntryHeader
		meta={technology.yearsHint ? pickLocale({ text: technology.yearsHint, locale }) : undefined}
		title={pickLocale({ text: technology.label, locale })}
	/>

	<p class="text-fg-muted text-sm leading-relaxed">
		{pickLocale({ text: technology.blurb, locale })}
	</p>

	{#if projects.length}
		<RelatedSection label={relatedHeading}>
			<ul class="mt-2 space-y-1 text-sm">
				{#each projects as p (p.id)}
					<li>
						<InlineNavLink onclick={() => onSelectLeaf({ kind: 'project', id: p.id })}>
							{pickLocale({ text: p.title, locale })}
						</InlineNavLink>
					</li>
				{/each}
			</ul>
		</RelatedSection>
	{/if}
</div>
