<script lang="ts">
	import InlineNavLink from '$lib/components/ui/InlineNavLink.svelte';
	import { leafLabel, leavesForCategory, type Leaf } from '$lib/portfolio/leaf';
	import { pickLocale } from '$lib/portfolio/locale';
	import type { Locale, Category } from '$lib/portfolio/types';

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
	<p class="text-fg-subtle text-xs tracking-wide uppercase">{categoryLabel}</p>
	<h2 class="text-fg text-xl font-bold">{pickLocale({ text: category.label, locale })}</h2>
	<p class="text-fg-muted text-sm leading-relaxed">
		{pickLocale({ text: category.shortHint, locale })}
	</p>
	<p class="text-fg-subtle text-xs">{hintPickOuter}</p>
	<ul class="border-border space-y-1.5 border-t pt-3 text-sm">
		{#each leaves as leaf (leaf.id)}
			<li>
				<InlineNavLink onclick={() => onSelectLeaf(leaf)}>
					{leafLabel({ leaf, locale })}
				</InlineNavLink>
			</li>
		{/each}
	</ul>
</div>
