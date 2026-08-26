import { portfolioData } from '$lib/services/portfolio.services';
import { categoryAngle, leafAnglesOpenRing } from '$lib/utils/graph-geometry.utils';
import { leafLabel, leavesForCategory, type Leaf } from '$lib/utils/leaf.utils';

export type GraphView = 'root' | 'category' | 'leaf';

/** Category pill size; layout stores ring **center** (OrbitNode centers with translate) */
export const CAT_W = 80;
export const CAT_H = 40;
/** Used for vertical stack geometry in leaf-focused view */
export const LEAF_CENTER_H = 44;

export const graphView = ({
	categoryId,
	itemId
}: {
	categoryId: string | null;
	itemId: string | null;
}): GraphView => {
	if (!categoryId) {
		return 'root';
	}
	if (!itemId) {
		return 'category';
	}
	return 'leaf';
};

export interface HubLayout {
	x: number;
	y: number;
	compact: boolean;
	opacity: number;
}

export interface CategoryNodeLayout {
	id: string;
	left: number;
	top: number;
	opacity: number;
	isCenter: boolean;
}

export interface LeafNodeLayout {
	leaf: Leaf;
	left: number;
	top: number;
	opacity: number;
	isCenter: boolean;
}

export interface EdgeSegment {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
	opacity: number;
}

export interface GraphLayoutResult {
	view: GraphView;
	cx: number;
	cy: number;
	hub: HubLayout;
	categories: CategoryNodeLayout[];
	leaves: LeafNodeLayout[];
	edges: EdgeSegment[];
	hubWidthPx: number;
	/** Container height in px; taller than `size` for crowded category rings on small screens */
	height: number;
}

const hubSize = ({
	size,
	compact
}: {
	size: number;
	compact: boolean;
}): { w: number; h: number } => {
	if (compact) {
		return { w: 112, h: 78 };
	}
	const w = size < 480 ? Math.min(112, size * 0.35) : Math.min(148, size * 0.42);
	return { w, h: 108 };
};

interface LeafBox {
	x: number;
	y: number;
	halfW: number;
	halfH: number;
}

/**
 * Estimated pill half-extents from the label. JetBrains Mono makes width ≈ chars ×
 * char-width; caps mirror the leaf `max-w-*` classes in OrbitNode (wrapped = 2 lines).
 */
const estimateLeafHalf = ({
	label,
	size
}: {
	label: string;
	size: number;
}): { halfW: number; halfH: number; wraps: boolean } => {
	const small = size < 480;
	const charW = small ? 6.4 : 9.4;
	const padX = small ? 30 : 38;
	const capW = small ? 164 : 228;
	const rawW = label.length * charW + padX;
	const wraps = rawW > capW;
	/* Wrapped width is bounded by the cap; a slight overestimate only costs spacing */
	const w = wraps ? capW : rawW;
	const halfH = wraps ? (small ? 26 : 33) : small ? 17 : 23;
	return { halfW: w / 2, halfH, wraps };
};

/**
 * Deterministic AABB separation: push overlapping pills apart along the axis of least
 * overlap, keep them off the hub/category pills, and clamp inside the container.
 */
const relaxLeafBoxes = ({
	boxes,
	obstacles,
	width,
	height
}: {
	boxes: LeafBox[];
	obstacles: LeafBox[];
	width: number;
	height: number;
}): void => {
	const margin = 10;
	const pad = 4;
	const xInside = ({ box, x }: { box: LeafBox; x: number }): boolean =>
		x >= pad + box.halfW && x <= width - pad - box.halfW;
	for (let iter = 0; iter < 200; iter++) {
		let moved = false;
		for (let i = 0; i < boxes.length; i++) {
			const a = boxes[i];
			for (let j = i + 1; j < boxes.length; j++) {
				const b = boxes[j];
				const dx = b.x - a.x;
				const dy = b.y - a.y;
				const ox = a.halfW + b.halfW + margin - Math.abs(dx);
				const oy = a.halfH + b.halfH + margin - Math.abs(dy);
				if (ox > 0 && oy > 0) {
					moved = true;
					const sx = (dx >= 0 ? 1 : -1) * (ox / 2);
					/* Push along the axis of least overlap, but never into the container clamp */
					if (ox < oy && xInside({ box: a, x: a.x - sx }) && xInside({ box: b, x: b.x + sx })) {
						a.x -= sx;
						b.x += sx;
					} else {
						const s = (dy >= 0 ? 1 : -1) * (oy / 2);
						a.y -= s;
						b.y += s;
					}
				}
			}
			for (const o of obstacles) {
				const dx = a.x - o.x;
				const dy = a.y - o.y;
				const ox = a.halfW + o.halfW + margin - Math.abs(dx);
				const oy = a.halfH + o.halfH + margin - Math.abs(dy);
				if (ox > 0 && oy > 0) {
					moved = true;
					const nx = a.x + (dx >= 0 ? 1 : -1) * ox;
					if (ox < oy && xInside({ box: a, x: nx })) {
						a.x = nx;
					} else {
						a.y += (dy >= 0 ? 1 : -1) * oy;
					}
				}
			}
			a.x = Math.min(Math.max(a.x, pad + a.halfW), width - pad - a.halfW);
			a.y = Math.min(Math.max(a.y, pad + a.halfH), height - pad - a.halfH);
		}
		if (!moved) {
			break;
		}
	}
};

const catCenter = ({
	i,
	cx,
	cy,
	r1
}: {
	i: number;
	cx: number;
	cy: number;
	r1: number;
}): { x: number; y: number } => {
	const a = categoryAngle(i);
	return { x: cx + r1 * Math.cos(a), y: cy + r1 * Math.sin(a) };
};

export const computeGraphLayout = (params: {
	size: number;
	categoryId: string | null;
	itemId: string | null;
}): GraphLayoutResult => {
	const { size, categoryId, itemId } = params;
	const cx = size / 2;
	const cy = size / 2;
	const r1 = size * 0.28;
	const r2 = size * 0.42;
	const view = graphView({ categoryId, itemId });

	const parentIndex = categoryId
		? portfolioData.categories.findIndex((c) => c.id === categoryId)
		: -1;
	const leaves = categoryId ? leavesForCategory(categoryId) : [];
	const crowdedRing = leaves.length > 8;
	const childAnglesList = parentIndex >= 0 ? leafAnglesOpenRing(leaves.length) : [];

	const hubWidthPx = hubSize({ size, compact: false }).w;

	const categories: CategoryNodeLayout[] = portfolioData.categories.map((cat, i) => {
		const cc = catCenter({ i, cx, cy, r1 });
		return {
			id: cat.id,
			left: cc.x,
			top: cc.y,
			opacity: 1,
			isCenter: false
		};
	});

	const emptyLeaves: LeafNodeLayout[] = [];

	if (view === 'root') {
		const edges: EdgeSegment[] = portfolioData.categories.map((_, i) => {
			const cc = catCenter({ i, cx, cy, r1 });
			return {
				x1: cx,
				y1: cy,
				x2: cc.x,
				y2: cc.y,
				opacity: 1
			};
		});
		return {
			view,
			cx,
			cy,
			hub: { x: cx, y: cy, compact: false, opacity: 1 },
			categories,
			leaves: emptyLeaves,
			edges,
			hubWidthPx,
			height: size
		};
	}

	if (view === 'category' && categoryId && parentIndex >= 0) {
		const crowded = crowdedRing;
		/* Small screens can't fit a crowded ring: stack leaves in two columns below the spine */
		const columns = crowded && size < 640;
		const { h: hubH } = hubSize({ size, compact: true });
		/* Compact hub renders taller than hubSize (stacked name on mobile): pad generously */
		const hubHalfH = hubH / 2 + 16;

		let height = size;
		let catY = size / 2;
		let hy = Math.max(hubHalfH + 4, catY - size * 0.3);
		const hx = cx;

		const boxes: LeafBox[] = [];

		if (columns) {
			hy = hubHalfH + 4;
			catY = hy + hubHalfH + CAT_H / 2 + 24;
			const pad = 6;
			const gap = 12;
			const yStart = catY + CAT_H / 2 + 6;
			let leftY = yStart;
			let rightY = yStart;
			leaves.forEach((leaf, ki) => {
				const label = leafLabel({ leaf, locale: 'en' });
				const { halfW, halfH, wraps } = estimateLeafHalf({ label, size });
				/* Deterministic per-item inset keeps the columns organic; wide pills hug the edge */
				const inset = wraps ? pad : pad + (ki % 3) * 9;
				if (ki % 2 === 0) {
					boxes.push({ x: size - inset - halfW, y: rightY + halfH, halfW, halfH });
					rightY += halfH * 2 + gap;
				} else {
					boxes.push({ x: inset + halfW, y: leftY + halfH, halfW, halfH });
					leftY += halfH * 2 + gap;
				}
			});

			/* Wide pills on facing rows can touch across the spine: push the lower one down,
			   then re-stack each column so order and gaps are preserved (y only grows) */
			for (let guard = 0; guard < 40; guard++) {
				let changed = false;
				for (let i = 0; i < boxes.length; i++) {
					for (let j = 0; j < boxes.length; j++) {
						if (i !== j && i % 2 !== j % 2) {
							const a = boxes[i];
							const b = boxes[j];
							const ox = a.halfW + b.halfW + pad - Math.abs(a.x - b.x);
							const oy = a.halfH + b.halfH + pad - Math.abs(a.y - b.y);
							if (ox > 0 && oy > 0) {
								(a.y >= b.y ? a : b).y += oy;
								changed = true;
							}
						}
					}
				}
				for (let k = 2; k < boxes.length; k++) {
					const prev = boxes[k - 2];
					const minY = prev.y + prev.halfH + boxes[k].halfH + gap;
					if (boxes[k].y < minY) {
						boxes[k].y = minY;
						changed = true;
					}
				}
				if (!changed) {
					break;
				}
			}

			height = Math.round(Math.max(...boxes.map((b) => b.y + b.halfH)) + 16);
		} else {
			catY = height / 2;
			hy = Math.max(hubHalfH + 4, catY - size * 0.3);
			const xR = size * 0.42;
			const yR = height * 0.42;
			leaves.forEach((leaf, ki) => {
				const a = childAnglesList[ki] ?? 0;
				/* Crowded rings alternate two radii so neighbours never sit side by side */
				const radial = crowded ? (ki % 2 === 0 ? 1 : 0.72) : 1;
				const label = leafLabel({ leaf, locale: 'en' });
				boxes.push({
					x: cx + xR * radial * Math.cos(a),
					y: catY + yR * radial * Math.sin(a),
					...estimateLeafHalf({ label, size })
				});
			});
			relaxLeafBoxes({
				boxes,
				obstacles: [
					{ x: hx, y: hy, halfW: 62, halfH: hubHalfH },
					{ x: cx, y: catY, halfW: CAT_W / 2 + 6, halfH: CAT_H / 2 + 4 }
				],
				width: size,
				height
			});
		}

		const sel = categories.find((c) => c.id === categoryId);
		if (sel) {
			sel.left = cx;
			sel.top = catY;
			sel.opacity = 1;
			sel.isCenter = true;
		}

		for (const c of categories) {
			if (c.id !== categoryId) {
				c.opacity = 0;
			}
		}

		const leafLayouts: LeafNodeLayout[] = leaves.map((leaf, ki) => ({
			leaf,
			left: boxes[ki].x,
			top: boxes[ki].y,
			opacity: 1,
			isCenter: false
		}));

		const catCenterPt = { x: cx, y: catY };
		const edges: EdgeSegment[] = [
			{ x1: hx, y1: hy, x2: catCenterPt.x, y2: catCenterPt.y, opacity: 1 },
			...leafLayouts.map((L) => ({
				x1: catCenterPt.x,
				y1: catCenterPt.y,
				x2: L.left,
				y2: L.top,
				opacity: 1
			}))
		];

		return {
			view,
			cx,
			cy,
			hub: { x: hx, y: hy, compact: true, opacity: 1 },
			categories,
			leaves: leafLayouts,
			edges,
			hubWidthPx,
			height
		};
	}

	// leaf view: vertical hub → category → leaf; leaf anchored at center, parents stacked above
	if (view === 'leaf' && categoryId && itemId && parentIndex >= 0) {
		const currentLeaf = leaves.find((l) => `${l.kind}:${l.id}` === itemId);
		if (!currentLeaf) {
			return computeGraphLayout({ size, categoryId, itemId: null });
		}

		const { h: hh } = hubSize({ size, compact: true });
		const vGap = Math.max(18, size * 0.055);
		const leafHalfLayout = Math.max(LEAF_CENTER_H / 2, 30);

		let leafCenterY = cy;
		let cy_cat = leafCenterY - leafHalfLayout - vGap - CAT_H / 2;
		let hy = cy_cat - CAT_H / 2 - vGap - hh / 2;

		const minHubTop = 12;
		let shift = Math.max(0, minHubTop - (hy - hh / 2));
		const maxLeafCenterY = size - Math.min(100, size * 0.28);
		shift = Math.min(shift, Math.max(0, maxLeafCenterY - leafCenterY));
		if (shift > 0) {
			hy += shift;
			cy_cat += shift;
			leafCenterY += shift;
		}

		const hx = cx;

		for (const c of categories) {
			if (c.id !== categoryId) {
				c.opacity = 0;
			} else {
				c.left = cx;
				c.top = cy_cat;
				c.opacity = 1;
				c.isCenter = false;
			}
		}

		const leafLayouts: LeafNodeLayout[] = leaves.map((leaf, ki) => {
			const isSel = `${leaf.kind}:${leaf.id}` === itemId;
			if (isSel) {
				return {
					leaf,
					left: cx,
					top: leafCenterY,
					opacity: 1,
					isCenter: true
				};
			}
			const a = childAnglesList[ki] ?? 0;
			const lx = cx + r2 * Math.cos(a);
			const ly = cy + r2 * Math.sin(a);
			return {
				leaf,
				left: lx,
				top: ly,
				opacity: 0,
				isCenter: false
			};
		});

		const catCx = cx;
		const catCy = cy_cat;
		const leafSel = leafLayouts.find((l) => l.isCenter);
		const lcx = leafSel?.left ?? cx;
		const lcy = leafSel?.top ?? leafCenterY;

		const edges: EdgeSegment[] = [
			{ x1: hx, y1: hy, x2: catCx, y2: catCy, opacity: 1 },
			{ x1: catCx, y1: catCy, x2: lcx, y2: lcy, opacity: 1 }
		];

		return {
			view,
			cx,
			cy,
			hub: { x: hx, y: hy, compact: true, opacity: 1 },
			categories,
			leaves: leafLayouts,
			edges,
			hubWidthPx,
			height: size
		};
	}

	return computeGraphLayout({ size, categoryId: null, itemId: null });
};
