<script lang="ts">
	import { portfolioData } from '$lib/data/portfolio.data';
	import type { Locale } from '$lib/portfolio/types';
	import { pickLocale } from '$lib/portfolio/locale';
	import { categoryAngle, childAngles } from '$lib/portfolio/graph-geometry';
	import { leafLabel, leavesForCategory, type Leaf } from '$lib/portfolio/leaf';
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
	}

	let { locale, categoryId, itemId, onToggleCategory, onSelectLeaf, onResetHome }: Props = $props();

	let wrapEl: HTMLDivElement | undefined = $state();
	let size = $state(360);

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

	const R1 = $derived(size * 0.34);
	const R2 = $derived(size * 0.5);
	const cx = $derived(size / 2);
	const cy = $derived(size / 2);

	const leaves = $derived(categoryId ? leavesForCategory(categoryId) : []);
	const parentIndex = $derived(
		categoryId ? portfolioData.categories.findIndex((c) => c.id === categoryId) : -1
	);
	const childAnglesList = $derived(
		parentIndex >= 0 ? childAngles(parentIndex, leaves.length) : []
	);

	const hubWidthPx = $derived(Math.min(148, size * 0.42));
</script>

<div
	bind:this={wrapEl}
	class="relative aspect-square w-full max-w-[min(92vw,420px)] shrink-0"
	aria-label="Portfolio graph"
>
	<GraphEdges
		{size}
		{cx}
		{cy}
		r1={R1}
		r2={R2}
		categoryCount={portfolioData.categories.length}
		{parentIndex}
		{childAnglesList}
		{categoryAngle}
		hasCategory={!!categoryId}
	/>

	{#each portfolioData.categories as cat, i}
		{@const a = categoryAngle(i)}
		{@const x = cx + R1 * Math.cos(a) - 40}
		{@const y = cy + R1 * Math.sin(a) - 20}
		<OrbitNode
			left={x}
			top={y}
			floatVariant={(i % 3) as 0 | 1 | 2}
			seed={i + 1}
			variant="category"
			selected={categoryId === cat.id}
			ariaPressed={categoryId === cat.id}
			onclick={() => onToggleCategory(cat.id)}
		>
			{pickLocale(cat.label, locale)}
		</OrbitNode>
	{/each}

	{#if categoryId && leaves.length > 0}
		{#each leaves as leaf, ki}
			{@const a = childAnglesList[ki] ?? categoryAngle(parentIndex)}
			{@const x = cx + R2 * Math.cos(a) - 44}
			{@const y = cy + R2 * Math.sin(a) - 16}
			<OrbitNode
				left={x}
				top={y}
				floatVariant={((ki + 2) % 3) as 0 | 1 | 2}
				seed={ki + 11}
				variant="leaf"
				selected={itemId === `${leaf.kind}:${leaf.id}`}
				onclick={() => onSelectLeaf(leaf)}
			>
				{leafLabel(leaf, locale)}
			</OrbitNode>
		{/each}
	{/if}

	<GraphHub
		person={portfolioData.person}
		{locale}
		{hubWidthPx}
		onclick={onResetHome}
	/>
</div>
