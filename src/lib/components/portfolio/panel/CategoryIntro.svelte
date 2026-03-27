<script lang="ts">
	import { pickLocale } from '$lib/portfolio/locale';
	import type { Locale } from '$lib/portfolio/types';
	import type { Category } from '$lib/portfolio/types';
	import { leafLabel, leavesForCategory, type Leaf } from '$lib/portfolio/leaf';
	import InlineNavLink from '$lib/components/ui/InlineNavLink.svelte';

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

<div class="space-y-4 animate-fade">
	<p class="text-xs uppercase tracking-wide text-zinc-500">{categoryLabel}</p>
	<h2 class="text-xl font-bold text-white">{pickLocale(category.label, locale)}</h2>
	<p class="text-sm leading-relaxed text-zinc-300">{pickLocale(category.shortHint, locale)}</p>
	<p class="text-xs text-zinc-500">{hintPickOuter}</p>
	<ul class="space-y-1.5 border-t border-zinc-800 pt-3 text-sm">
		{#each leaves as leaf}
			<li>
				<InlineNavLink onclick={() => onSelectLeaf(leaf)}>
					{leafLabel(leaf, locale)}
				</InlineNavLink>
			</li>
		{/each}
	</ul>
</div>
