<script lang="ts">
	import { onMount, untrack } from 'svelte';
	import GraphEdgesLive from '$lib/components/graph/GraphEdgesLive.svelte';
	import GraphHub from '$lib/components/graph/GraphHub.svelte';
	import OrbitNode from '$lib/components/graph/OrbitNode.svelte';
	import LeafDetailCard from '$lib/components/panel/LeafDetailCard.svelte';
	import { computeGraphLayout, LEAF_CENTER_H } from '$lib/services/graph-layout.services';
	import { portfolioData } from '$lib/services/portfolio.services';
	import type { Locale } from '$lib/types/portfolio.types';
	import { leafLabel, type Leaf } from '$lib/utils/leaf.utils';
	import { pickLocale } from '$lib/utils/locale.utils';

	interface Props {
		locale: Locale;
		categoryId: string | null;
		itemId: string | null;
		leafDetailLabels: {
			relatedProjects: string;
			stack: string;
			relatedTechProjects: string;
			languageUiNote: string;
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
		onStepToCategoryView
	}: Props = $props();

	let wrapEl: HTMLDivElement | undefined = $state();
	let size = $state(480);
	/** Enables left/top transitions only after first paint (see portfolio-graph.css). */
	let layoutReady = $state(false);

	onMount(() => {
		const enable = () => {
			layoutReady = true;
		};
		if (
			typeof window !== 'undefined' &&
			window.matchMedia('(prefers-reduced-motion: reduce)').matches
		) {
			enable();
			return;
		}
		requestAnimationFrame(() => {
			requestAnimationFrame(enable);
		});
	});

	$effect(() => {
		if (!wrapEl) {
			return;
		}
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

	/** After hub/category/center-leaf spine motion (CSS), show the detail card below (re-keyed on `itemId` only) */
	let leafCardRevealReady = $state(false);
	/** Match `.graph-layout-ready .graph-node-shift` left/top ~340ms + small buffer */
	const LEAF_CARD_DELAY_MS = 400;

	$effect(() => {
		const id = itemId;

		if (!id) {
			leafCardRevealReady = false;
			return;
		}

		const view = untrack(() => layout.view);

		if (view !== 'leaf') {
			leafCardRevealReady = true;
			return;
		}

		const reduceMotion =
			typeof window !== 'undefined' &&
			window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (reduceMotion) {
			leafCardRevealReady = true;
			return;
		}

		leafCardRevealReady = false;
		const timer = setTimeout(() => {
			leafCardRevealReady = true;
		}, LEAF_CARD_DELAY_MS);

		return () => {
			clearTimeout(timer);
		};
	});

	/** Anchor the in-graph detail card below the focused leaf, clamped inside the square */
	const leafCardAnchor = $derived.by(() => {
		if (!itemId || layout.view !== 'leaf') {
			return null;
		}
		const L = layout.leaves.find((l) => l.isCenter);
		if (!L || size < 40) {
			return null;
		}
		const gapBelowNode = 10;
		const pad = 14;
		const cardMaxW = Math.min(352, size - pad * 2);
		const halfW = cardMaxW / 2;
		const left = Math.round(Math.max(halfW + pad, Math.min(L.left, size - halfW - pad)));
		/* L.left/top = ring center (OrbitNode translate); place card just under the pill */
		const top = Math.round(L.top + LEAF_CENTER_H / 2 + gapBelowNode);
		return { left, top, cardMaxW };
	});

	const handleCategoryClick = (id: string) => {
		if (layout.view === 'leaf' && id === categoryId) {
			onStepToCategoryView();
			return;
		}
		onToggleCategory(id);
	};
</script>

<div
	bind:this={wrapEl}
	class="relative aspect-square w-full max-w-[min(96vw,720px)] shrink-0 overflow-visible {layoutReady
		? 'graph-layout-ready'
		: ''} {frozen ? 'graph-frozen' : ''}"
	aria-label="Portfolio graph"
>
	<GraphEdgesLive {categoryId} container={wrapEl} {frozen} {itemId} {layout} {size} />

	{#each portfolioData.categories as cat, i (cat.id)}
		{@const c = layout.categories[i]}
		<OrbitNode
			ariaPressed={layout.view === 'category' && c.isCenter}
			emphasis="default"
			floatVariant={(i % 3) as 0 | 1 | 2}
			graphCatId={cat.id}
			left={c.left}
			noFloat={frozen || c.isCenter || (layout.view === 'leaf' && cat.id === categoryId)}
			onclick={() => handleCategoryClick(cat.id)}
			opacity={c.opacity}
			seed={i + 1}
			selected={categoryId === cat.id}
			top={c.top}
			variant="category"
		>
			{pickLocale({ text: cat.label, locale })}
		</OrbitNode>
	{/each}

	{#each layout.leaves as L, ki (`${L.leaf.kind}:${L.leaf.id}`)}
		<OrbitNode
			emphasis={L.isCenter ? 'center' : 'default'}
			floatVariant={((ki + 2) % 3) as 0 | 1 | 2}
			graphLeafKey={`${L.leaf.kind}:${L.leaf.id}`}
			left={L.left}
			noFloat={frozen || L.isCenter}
			onclick={() => onSelectLeaf(L.leaf)}
			opacity={L.opacity}
			seed={ki + 11}
			selected={itemId === `${L.leaf.kind}:${L.leaf.id}`}
			top={L.top}
			variant="leaf"
		>
			{leafLabel({ leaf: L.leaf, locale })}
		</OrbitNode>
	{/each}

	<GraphHub
		centerX={layout.hub.x}
		centerY={layout.hub.y}
		compact={layout.hub.compact}
		hubWidthPx={layout.hubWidthPx}
		onclick={onResetHome}
		person={portfolioData.person}
	/>

	{#if itemId && leafCardAnchor && leafCardRevealReady}
		{@const a = leafCardAnchor}
		{@const cardMaxH = Math.max(120, size - a.top - 12)}
		<div class="pointer-events-none absolute inset-0 z-[35]">
			<div
				style="left: {a.left}px; top: {a.top}px; width: {a.cardMaxW}px; --card-mh: {cardMaxH}px;"
				class="graph-leaf-card-reveal pointer-events-auto absolute flex max-h-[min(48vh,var(--card-mh))] min-h-0 -translate-x-1/2 flex-col transition-[top,left] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none"
			>
				<div class="mb-1.5 flex shrink-0 flex-col items-center" aria-hidden="true">
					<div class="bg-accent/70 h-4 w-px shrink-0"></div>
					<div
						class="border-b-accent/70 h-0 w-0 border-x-[5px] border-b-[6px] border-x-transparent"
					></div>
				</div>
				<div
					class="min-h-0 flex-1 overflow-x-hidden overflow-y-auto rounded-xl shadow-[0_8px_32px_-8px_rgba(0,0,0,0.28)] dark:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.55)]"
				>
					<LeafDetailCard {itemId} labels={leafDetailLabels} {locale} {onSelectLeaf} />
				</div>
			</div>
		</div>
	{/if}
</div>
