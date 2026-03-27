<script lang="ts">
	import { onMount } from 'svelte';
	import { portfolioData } from '$lib/data/portfolio.data';
	import type { Locale } from '$lib/portfolio/types';
	import { pickLocale } from '$lib/portfolio/locale';
	import { computeGraphLayout, LEAF_CENTER_H } from '$lib/portfolio/graph-layout';
	import { leafLabel, type Leaf } from '$lib/portfolio/leaf';
	import GraphEdgesLive from './GraphEdgesLive.svelte';
	import GraphHub from './GraphHub.svelte';
	import LeafDetailCard from './LeafDetailCard.svelte';
	import OrbitNode from './OrbitNode.svelte';

	interface Props {
		locale: Locale;
		categoryId: string | null;
		itemId: string | null;
		leafDetailLabels: {
			relatedProjects: string;
			stack: string;
			relatedTechProjects: string;
			languageUiNote: string;
			selectionLabel: string;
		};
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
		leafDetailLabels,
		onToggleCategory,
		onSelectLeaf,
		onResetHome,
		onStepToCategoryView,
	}: Props = $props();

	let wrapEl: HTMLDivElement | undefined = $state();
	let size = $state(480);
	/** Enables left/top transitions only after first paint (see portfolio-graph.css). */
	let layoutReady = $state(false);

	onMount(() => {
		const enable = () => {
			layoutReady = true;
		};
		if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			enable();
			return;
		}
		requestAnimationFrame(() => {
			requestAnimationFrame(enable);
		});
	});

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
	const frozen = $derived(!!itemId);

	/** Anchor the in-graph detail card below the focused leaf, clamped inside the square */
	const leafCardAnchor = $derived.by(() => {
		if (!itemId || layout.view !== 'leaf') return null;
		const L = layout.leaves.find((l) => l.isCenter);
		if (!L || size < 40) return null;
		const gapBelowNode = 10;
		const pad = 14;
		const cardMaxW = Math.min(352, size - pad * 2);
		const halfW = cardMaxW / 2;
		const left = Math.round(Math.max(halfW + pad, Math.min(L.left, size - halfW - pad)));
		/* L.left/top = ring center (OrbitNode translate); place card just under the pill */
		const top = Math.round(L.top + LEAF_CENTER_H / 2 + gapBelowNode);
		return { left, top, cardMaxW };
	});

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
	class="relative aspect-square w-full max-w-[min(96vw,720px)] shrink-0 overflow-visible {layoutReady
		? 'graph-layout-ready'
		: ''} {frozen ? 'graph-frozen' : ''}"
	aria-label="Portfolio graph"
>
	<GraphEdgesLive
		container={wrapEl}
		{size}
		{layout}
		{categoryId}
		{itemId}
		{frozen}
	/>

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
			noFloat={frozen || c.isCenter || (layout.view === 'leaf' && cat.id === categoryId)}
			emphasis="default"
			graphCatId={cat.id}
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
			noFloat={frozen || L.isCenter}
			emphasis={L.isCenter ? 'center' : 'default'}
			graphLeafKey={`${L.leaf.kind}:${L.leaf.id}`}
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

	{#if itemId && leafCardAnchor}
		{@const a = leafCardAnchor}
		{@const cardMaxH = Math.max(120, size - a.top - 12)}
		<div class="pointer-events-none absolute inset-0 z-[35]">
			<div
				class="pointer-events-auto absolute flex max-h-[min(48vh,var(--card-mh))] min-h-0 -translate-x-1/2 flex-col"
				style="left: {a.left}px; top: {a.top}px; width: {a.cardMaxW}px; --card-mh: {cardMaxH}px;"
			>
				<div class="mb-1.5 flex shrink-0 flex-col items-center" aria-hidden="true">
					<div class="h-4 w-px shrink-0 bg-accent/70"></div>
					<div class="h-0 w-0 border-x-[5px] border-x-transparent border-b-[6px] border-b-accent/70"></div>
				</div>
				<div
					class="min-h-0 flex-1 overflow-y-auto overflow-x-hidden rounded-xl shadow-[0_8px_32px_-8px_rgba(0,0,0,0.28)] dark:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.55)]"
				>
					<LeafDetailCard
						{locale}
						{itemId}
						labels={leafDetailLabels}
						{onSelectLeaf}
					/>
				</div>
			</div>
		</div>
	{/if}
</div>
