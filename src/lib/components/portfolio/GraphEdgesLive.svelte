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

	interface Seg {
		x1: number;
		y1: number;
		x2: number;
		y2: number;
		opacity: number;
	}
	let segments = $state<Seg[]>([]);

	const centerOf = ({
		el,
		cr
	}: {
		el: Element | null;
		cr: DOMRect;
	}): { x: number; y: number } | null => {
		if (!el || !(el instanceof HTMLElement)) {
			return null;
		}
		const r = el.getBoundingClientRect();
		return {
			x: r.left + r.width / 2 - cr.left,
			y: r.top + r.height / 2 - cr.top
		};
	};

	/** Move from node center toward `toward` so the segment meets the pill rim (not an empty center gap). */
	const attachOnNodeToward = ({
		el,
		cr,
		towardX,
		towardY,
		rimRatio = 0.46
	}: {
		el: HTMLElement;
		cr: DOMRect;
		towardX: number;
		towardY: number;
		rimRatio?: number;
	}): { x: number; y: number } | null => {
		const r = el.getBoundingClientRect();
		const cx = r.left + r.width / 2 - cr.left;
		const cy = r.top + r.height / 2 - cr.top;
		const dx = towardX - cx;
		const dy = towardY - cy;
		const len = Math.hypot(dx, dy);
		if (len < 0.5) {
			return { x: cx, y: cy };
		}
		const nx = dx / len;
		const ny = dy / len;
		const rim = Math.min(r.width, r.height) * rimRatio;
		return { x: cx + nx * rim, y: cy + ny * rim };
	};

	const buildSegments = ({
		cont,
		cr,
		lay,
		catId,
		itId
	}: {
		cont: HTMLElement;
		cr: DOMRect;
		lay: GraphLayoutResult;
		catId: string | null;
		itId: string | null;
	}): Seg[] => {
		const hubEl = cont.querySelector('[data-graph-hub]');
		const hub = centerOf({ el: hubEl, cr });
		const next: Seg[] = [];

		if (!hub || lay.hub.opacity < 0.01) {
			return next;
		}

		const { view, categories, leaves } = lay;

		if (view === 'root') {
			portfolioData.categories.forEach((cat, i) => {
				const cl = categories[i];
				if (cl && cl.opacity >= 0.01) {
					const el = cont.querySelector(`[data-graph-cat="${CSS.escape(cat.id)}"]`);
					if (el instanceof HTMLElement) {
						const t = centerOf({ el, cr });
						if (t) {
							const hubEnd =
								hubEl instanceof HTMLElement
									? attachOnNodeToward({ el: hubEl, cr, towardX: t.x, towardY: t.y })
									: hub;
							const catEnd = attachOnNodeToward({ el, cr, towardX: hub.x, towardY: hub.y }) ?? t;
							const x1 = hubEnd?.x ?? hub.x;
							const y1 = hubEnd?.y ?? hub.y;
							next.push({ x1, y1, x2: catEnd.x, y2: catEnd.y, opacity: 1 });
						}
					}
				}
			});
			return next;
		}

		if (view === 'category' && catId) {
			const catEl = cont.querySelector(`[data-graph-cat="${CSS.escape(catId)}"]`);
			const catC = centerOf({ el: catEl, cr });
			if (catC && catEl instanceof HTMLElement) {
				const hubEnd =
					hubEl instanceof HTMLElement
						? attachOnNodeToward({ el: hubEl, cr, towardX: catC.x, towardY: catC.y })
						: hub;
				const catHubEnd =
					attachOnNodeToward({ el: catEl, cr, towardX: hub.x, towardY: hub.y }) ?? catC;
				const hx1 = hubEnd?.x ?? hub.x;
				const hy1 = hubEnd?.y ?? hub.y;
				next.push({ x1: hx1, y1: hy1, x2: catHubEnd.x, y2: catHubEnd.y, opacity: 1 });

				leaves.forEach((L) => {
					if (L.opacity >= 0.01) {
						const key = `${L.leaf.kind}:${L.leaf.id}`;
						const le = cont.querySelector(`[data-graph-leaf="${CSS.escape(key)}"]`);
						if (le instanceof HTMLElement) {
							const leafC = centerOf({ el: le, cr });
							if (leafC) {
								const catOut =
									attachOnNodeToward({ el: catEl, cr, towardX: leafC.x, towardY: leafC.y }) ?? catC;
								const leafIn =
									attachOnNodeToward({ el: le, cr, towardX: catC.x, towardY: catC.y }) ?? leafC;
								next.push({ x1: catOut.x, y1: catOut.y, x2: leafIn.x, y2: leafIn.y, opacity: 1 });
							}
						}
					}
				});
			}
			return next;
		}

		/* Vertical spine: two segments so the line meets hub, category, and leaf (not a single hub→leaf chord) */
		if (view === 'leaf' && catId && itId) {
			const catEl = cont.querySelector(`[data-graph-cat="${CSS.escape(catId)}"]`);
			const leafEl = cont.querySelector(`[data-graph-leaf="${CSS.escape(itId)}"]`);
			if (
				hubEl instanceof HTMLElement &&
				catEl instanceof HTMLElement &&
				leafEl instanceof HTMLElement
			) {
				const catC = centerOf({ el: catEl, cr });
				const leafC = centerOf({ el: leafEl, cr });
				if (hub && catC && leafC) {
					const hubEnd =
						attachOnNodeToward({ el: hubEl, cr, towardX: catC.x, towardY: catC.y }) ?? hub;
					const catTowardHub =
						attachOnNodeToward({ el: catEl, cr, towardX: hub.x, towardY: hub.y }) ?? catC;
					next.push({
						x1: hubEnd.x,
						y1: hubEnd.y,
						x2: catTowardHub.x,
						y2: catTowardHub.y,
						opacity: 1
					});

					const catTowardLeaf =
						attachOnNodeToward({ el: catEl, cr, towardX: leafC.x, towardY: leafC.y }) ?? catC;
					const leafTowardCat =
						attachOnNodeToward({ el: leafEl, cr, towardX: catC.x, towardY: catC.y }) ?? leafC;
					next.push({
						x1: catTowardLeaf.x,
						y1: catTowardLeaf.y,
						x2: leafTowardCat.x,
						y2: leafTowardCat.y,
						opacity: 1
					});
				}
			}
		}

		return next;
	};

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
				segments = buildSegments({ cont, cr, lay, catId: cId, itId: iId });
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
				if (!cont) {
					return;
				}
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

		const frame = () => {
			if (stopped || !cont) {
				return;
			}
			const cr = cont.getBoundingClientRect();
			segments = buildSegments({ cont, cr, lay, catId: cId, itId: iId });
			frameId = requestAnimationFrame(frame);
		};

		frameId = requestAnimationFrame(frame);

		return () => {
			stopped = true;
			cancelAnimationFrame(frameId);
		};
	});
</script>

{#if size > 0}
	<svg
		class="portfolio-graph-edges text-graph pointer-events-none absolute top-0 left-0 z-0"
		aria-hidden="true"
		height={size}
		width={size}
	>
		{#each segments as s (`${s.x1}-${s.y1}-${s.x2}-${s.y2}`)}
			<line
				stroke="currentColor"
				stroke-linecap="round"
				stroke-opacity={s.opacity}
				stroke-width="1.5"
				x1={s.x1}
				x2={s.x2}
				y1={s.y1}
				y2={s.y2}
			/>
		{/each}
	</svg>
{/if}
