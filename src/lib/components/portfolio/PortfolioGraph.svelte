<script lang="ts">
	import { portfolioData } from '$lib/data/portfolio.data';
	import type { Locale } from '$lib/portfolio/types';
	import { pickLocale } from '$lib/portfolio/locale';
	import { computeGraphLayout } from '$lib/portfolio/graph-layout';
	import { leafLabel, type Leaf } from '$lib/portfolio/leaf';
	import GraphEdges from './GraphEdges.svelte';
	import GraphHub from './GraphHub.svelte';
	import OrbitNode from './OrbitNode.svelte';

	interface Props {
		locale: Locale;
		categoryId: string | null;
		itemId: string | null;
		onToggleCategory: (id: string) => void;
		onSelectLeaf: (leaf: Leaf) => void;
		onResetHome: () => void;
		/** Clear leaf selection (stay on category); used for parent category in leaf view */
		onStepToCategoryView: () => void;
	}

	let {
		locale,
		categoryId,
		itemId,
		onToggleCategory,
		onSelectLeaf,
		onResetHome,
		onStepToCategoryView,
	}: Props = $props();

	let wrapEl: HTMLDivElement | undefined = $state();
	let size = $state(480);

	$effect(() => {
		if (!wrapEl) return;
		const el = wrapEl;
		const ro = new ResizeObserver(() => {
			size = el.clientWidth;
		});
		ro.observe(el);
		size = el.clientWidth;
		return () => ro.disconnect();
	});

	const layout = $derived(computeGraphLayout({ size, categoryId, itemId }));

	function handleCategoryClick(id: string) {
		if (layout.view === 'leaf' && id === categoryId) {
			onStepToCategoryView();
			return;
		}
		onToggleCategory(id);
	}
</script>

<div
	bind:this={wrapEl}
	class="relative aspect-square w-full max-w-[min(96vw,720px)] shrink-0"
	aria-label="Portfolio graph"
>
	<GraphEdges {size} edges={layout.edges} />

	{#each portfolioData.categories as cat, i}
		{@const c = layout.categories[i]}
		<OrbitNode
			left={c.left}
			top={c.top}
			floatVariant={(i % 3) as 0 | 1 | 2}
			seed={i + 1}
			variant="category"
			selected={categoryId === cat.id}
			ariaPressed={layout.view === 'category' && c.isCenter}
			opacity={c.opacity}
			noFloat={c.isCenter || (layout.view === 'leaf' && cat.id === categoryId)}
			emphasis="default"
			onclick={() => handleCategoryClick(cat.id)}
		>
			{pickLocale(cat.label, locale)}
		</OrbitNode>
	{/each}

	{#each layout.leaves as L, ki}
		<OrbitNode
			left={L.left}
			top={L.top}
			floatVariant={((ki + 2) % 3) as 0 | 1 | 2}
			seed={ki + 11}
			variant="leaf"
			selected={itemId === `${L.leaf.kind}:${L.leaf.id}`}
			opacity={L.opacity}
			noFloat={L.isCenter}
			emphasis={L.isCenter ? 'center' : 'default'}
			onclick={() => onSelectLeaf(L.leaf)}
		>
			{leafLabel(L.leaf, locale)}
		</OrbitNode>
	{/each}

	<GraphHub
		person={portfolioData.person}
		hubWidthPx={layout.hubWidthPx}
		centerX={layout.hub.x}
		centerY={layout.hub.y}
		compact={layout.hub.compact}
		onclick={onResetHome}
	/>
</div>
