<script lang="ts">
	import { portfolioData } from '$lib/data/portfolio.data';
	import type { GraphLayoutResult } from '$lib/portfolio/graph-layout';

	interface Props {
		container: HTMLElement | undefined;
		size: number;
		layout: GraphLayoutResult;
		categoryId: string | null;
		itemId: string | null;
		/** Leaf selected: no continuous rAF; edges are static */
		frozen?: boolean;
	}

	let { container, size, layout, categoryId, itemId, frozen = false }: Props = $props();

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

	/** Move from node center toward `toward` so the segment meets the pill rim (not an empty center gap). */
	function attachOnNodeToward(
		el: HTMLElement,
		cr: DOMRect,
		towardX: number,
		towardY: number,
		rimRatio = 0.46
	): { x: number; y: number } | null {
		const r = el.getBoundingClientRect();
		const cx = r.left + r.width / 2 - cr.left;
		const cy = r.top + r.height / 2 - cr.top;
		const dx = towardX - cx;
		const dy = towardY - cy;
		const len = Math.hypot(dx, dy);
		if (len < 0.5) return { x: cx, y: cy };
		const nx = dx / len;
		const ny = dy / len;
		const rim = Math.min(r.width, r.height) * rimRatio;
		return { x: cx + nx * rim, y: cy + ny * rim };
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
				if (!(el instanceof HTMLElement)) continue;
				const t = centerOf(el, cr);
				if (!t) continue;
				const hubEnd =
					hubEl instanceof HTMLElement ? attachOnNodeToward(hubEl, cr, t.x, t.y) : hub;
				const catEnd = attachOnNodeToward(el, cr, hub.x, hub.y) ?? t;
				const x1 = hubEnd?.x ?? hub.x;
				const y1 = hubEnd?.y ?? hub.y;
				next.push({ x1, y1, x2: catEnd.x, y2: catEnd.y, opacity: 1 });
			}
			return next;
		}

		if (view === 'category' && catId) {
			const catEl = cont.querySelector(`[data-graph-cat="${CSS.escape(catId)}"]`);
			const catC = centerOf(catEl, cr);
			if (!catC || !(catEl instanceof HTMLElement)) return next;
			const hubEnd =
				hubEl instanceof HTMLElement ? attachOnNodeToward(hubEl, cr, catC.x, catC.y) : hub;
			const catHubEnd = attachOnNodeToward(catEl, cr, hub.x, hub.y) ?? catC;
			const hx1 = hubEnd?.x ?? hub.x;
			const hy1 = hubEnd?.y ?? hub.y;
			next.push({ x1: hx1, y1: hy1, x2: catHubEnd.x, y2: catHubEnd.y, opacity: 1 });
			for (const L of leaves) {
				if (L.opacity < 0.01) continue;
				const key = `${L.leaf.kind}:${L.leaf.id}`;
				const le = cont.querySelector(`[data-graph-leaf="${CSS.escape(key)}"]`);
				if (!(le instanceof HTMLElement)) continue;
				const leafC = centerOf(le, cr);
				if (!leafC) continue;
				const catOut = attachOnNodeToward(catEl, cr, leafC.x, leafC.y) ?? catC;
				const leafIn = attachOnNodeToward(le, cr, catC.x, catC.y) ?? leafC;
				next.push({ x1: catOut.x, y1: catOut.y, x2: leafIn.x, y2: leafIn.y, opacity: 1 });
			}
			return next;
		}

		/* Vertical spine: two segments so the line meets hub, category, and leaf (not a single hub→leaf chord) */
		if (view === 'leaf' && catId && itId) {
			const catEl = cont.querySelector(`[data-graph-cat="${CSS.escape(catId)}"]`);
			const leafEl = cont.querySelector(`[data-graph-leaf="${CSS.escape(itId)}"]`);
			if (
				!(hubEl instanceof HTMLElement) ||
				!(catEl instanceof HTMLElement) ||
				!(leafEl instanceof HTMLElement)
			) {
				return next;
			}
			const catC = centerOf(catEl, cr);
			const leafC = centerOf(leafEl, cr);
			if (!hub || !catC || !leafC) return next;

			const hubEnd = attachOnNodeToward(hubEl, cr, catC.x, catC.y) ?? hub;
			const catTowardHub = attachOnNodeToward(catEl, cr, hub.x, hub.y) ?? catC;
			next.push({
				x1: hubEnd.x,
				y1: hubEnd.y,
				x2: catTowardHub.x,
				y2: catTowardHub.y,
				opacity: 1,
			});

			const catTowardLeaf = attachOnNodeToward(catEl, cr, leafC.x, leafC.y) ?? catC;
			const leafTowardCat = attachOnNodeToward(leafEl, cr, catC.x, catC.y) ?? leafC;
			next.push({
				x1: catTowardLeaf.x,
				y1: catTowardLeaf.y,
				x2: leafTowardCat.x,
				y2: leafTowardCat.y,
				opacity: 1,
			});
		}

		return next;
	}

	$effect(() => {
		const cont = container;
		const sz = size;
		const lay = layout;
		const cId = categoryId;
		const iId = itemId;
		const isFrozen = frozen;

		if (!cont || sz <= 0) {
			segments = [];
			return;
		}

		if (isFrozen) {
			const reduceMotion =
				typeof window !== 'undefined' &&
				window.matchMedia('(prefers-reduced-motion: reduce)').matches;

			const run = () => {
				const cr = cont.getBoundingClientRect();
				segments = buildSegments(cont, cr, lay, cId, iId);
			};

			run();

			if (reduceMotion) {
				return;
			}

			/* Match graph-node-shift ~0.34s transition so edges track nodes into leaf view */
			const t0 = performance.now();
			const durationMs = 420;
			let rafId = 0;

			const step = () => {
				if (!cont) return;
				run();
				if (performance.now() - t0 < durationMs) {
					rafId = requestAnimationFrame(step);
				}
			};

			rafId = requestAnimationFrame(step);

			return () => {
				cancelAnimationFrame(rafId);
			};
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
