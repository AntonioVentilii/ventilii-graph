<script lang="ts">
	import EntryHeader from '$lib/components/ui/EntryHeader.svelte';
	import InlineNavLink from '$lib/components/ui/InlineNavLink.svelte';
	import PanelEyebrow from '$lib/components/ui/PanelEyebrow.svelte';
	import RelatedSection from '$lib/components/ui/RelatedSection.svelte';
	import type { Locale, Category } from '$lib/types/portfolio.types';
	import { leafLabel, leavesForCategory, type Leaf } from '$lib/utils/leaf.utils';
	import { pickLocale } from '$lib/utils/locale.utils';

	interface Props {
		category: Category;
		locale: Locale;
		categoryLabel: string;
		hintPickOuter: string;
		onSelectLeaf: (leaf: Leaf) => void;
	}

	let { category, locale, categoryLabel, hintPickOuter, onSelectLeaf }: Props = $props();

	const leaves = $derived(leavesForCategory(category.id));
</script>

<div class="animate-fade space-y-4">
	<PanelEyebrow text={categoryLabel} />

	<EntryHeader title={pickLocale({ text: category.label, locale })} />

	<p class="text-fg-muted text-sm leading-relaxed">
		{pickLocale({ text: category.shortHint, locale })}
	</p>

	<RelatedSection label={hintPickOuter}>
		<ul class="space-y-1.5 text-sm">
			{#each leaves as leaf (leaf.id)}
				<li>
					<InlineNavLink onclick={() => onSelectLeaf(leaf)}>
						{leafLabel({ leaf, locale })}
					</InlineNavLink>
				</li>
			{/each}
		</ul>
	</RelatedSection>
</div>
