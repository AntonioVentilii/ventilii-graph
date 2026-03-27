<script lang="ts">
	import { portfolioData } from '$lib/data/portfolio.data';
	import type { GraphLayoutResult } from '$lib/portfolio/graph-layout';

	interface Props {
		container: HTMLElement | undefined;
		size: number;
		layout: GraphLayoutResult;
		categoryId: string | null;
		itemId: string | null;
	}

	let { container, size, layout, categoryId, itemId }: Props = $props();

	type Seg = { x1: number; y1: number; x2: number; y2: number; opacity: number };
	let segments = $state<Seg[]>([]);

	function centerOf(el: Element | null, cr: DOMRect): { x: number; y: number } | null {
		if (!el || !(el instanceof HTMLElement)) return null;
		const r = el.getBoundingClientRect();
		return {
			x: r.left + r.width / 2 - cr.left,
			y: r.top + r.height / 2 - cr.top,
		};
	}

	function buildSegments(
		cont: HTMLElement,
		cr: DOMRect,
		lay: GraphLayoutResult,
		catId: string | null,
		itId: string | null
	): Seg[] {
		const hubEl = cont.querySelector('[data-graph-hub]');
		const hub = centerOf(hubEl, cr);
		const next: Seg[] = [];

		if (!hub || lay.hub.opacity < 0.01) return next;

		const { view, categories, leaves } = lay;

		if (view === 'root') {
			for (let i = 0; i < portfolioData.categories.length; i++) {
				const cat = portfolioData.categories[i];
				const cl = categories[i];
				if (!cl || cl.opacity < 0.01) continue;
				const el = cont.querySelector(`[data-graph-cat="${CSS.escape(cat.id)}"]`);
				const t = centerOf(el, cr);
				if (t) next.push({ x1: hub.x, y1: hub.y, x2: t.x, y2: t.y, opacity: 1 });
			}
			return next;
		}

		if (view === 'category' && catId) {
			const catEl = cont.querySelector(`[data-graph-cat="${CSS.escape(catId)}"]`);
			const catC = centerOf(catEl, cr);
			if (!catC) return next;
			next.push({ x1: hub.x, y1: hub.y, x2: catC.x, y2: catC.y, opacity: 1 });
			for (const L of leaves) {
				if (L.opacity < 0.01) continue;
				const key = `${L.leaf.kind}:${L.leaf.id}`;
				const le = cont.querySelector(`[data-graph-leaf="${CSS.escape(key)}"]`);
				const t = centerOf(le, cr);
				if (t) next.push({ x1: catC.x, y1: catC.y, x2: t.x, y2: t.y, opacity: 1 });
			}
			return next;
		}

		if (view === 'leaf' && catId && itId) {
			const catEl = cont.querySelector(`[data-graph-cat="${CSS.escape(catId)}"]`);
			const leafEl = cont.querySelector(`[data-graph-leaf="${CSS.escape(itId)}"]`);
			const catC = centerOf(catEl, cr);
			const leafC = centerOf(leafEl, cr);
			if (catC && leafC) {
				next.push({ x1: hub.x, y1: hub.y, x2: catC.x, y2: catC.y, opacity: 1 });
				next.push({ x1: catC.x, y1: catC.y, x2: leafC.x, y2: leafC.y, opacity: 1 });
			}
		}

		return next;
	}

	$effect(() => {
		const cont = container;
		const sz = size;
		const lay = layout;
		const cId = categoryId;
		const iId = itemId;

		if (!cont || sz <= 0) {
			segments = [];
			return;
		}

		let frameId = 0;
		let stopped = false;

		function frame() {
			if (stopped || !cont) return;
			const cr = cont.getBoundingClientRect();
			segments = buildSegments(cont, cr, lay, cId, iId);
			frameId = requestAnimationFrame(frame);
		}

		frameId = requestAnimationFrame(frame);

		return () => {
			stopped = true;
			cancelAnimationFrame(frameId);
		};
	});
</script>

{#if size > 0}
	<svg
		width={size}
		height={size}
		class="portfolio-graph-edges pointer-events-none absolute left-0 top-0 z-0 text-graph"
		aria-hidden="true"
	>
		{#each segments as s}
			<line
				x1={s.x1}
				y1={s.y1}
				x2={s.x2}
				y2={s.y2}
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-opacity={s.opacity}
			/>
		{/each}
	</svg>
{/if}
