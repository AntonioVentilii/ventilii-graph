import { portfolioData } from '$lib/services/portfolio.services';
import { categoryAngle, leafAnglesOpenRing } from '$lib/utils/graph-geometry.utils';
import { leavesForCategory, type Leaf } from '$lib/utils/leaf.utils';

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
			hubWidthPx
		};
	}

	if (view === 'category' && categoryId && parentIndex >= 0) {
		const hubDist = size * 0.3;
		const hy = cy - hubDist;
		const hx = cx;

		const sel = categories.find((c) => c.id === categoryId);
		if (sel) {
			sel.left = cx;
			sel.top = cy;
			sel.opacity = 1;
			sel.isCenter = true;
		}

		for (const c of categories) {
			if (c.id !== categoryId) {
				c.opacity = 0;
			}
		}

		const leafLayouts: LeafNodeLayout[] = leaves.map((leaf, ki) => {
			const a = childAnglesList[ki] ?? 0;
			const lx = cx + r2 * Math.cos(a);
			const ly = cy + r2 * Math.sin(a);
			return {
				leaf,
				left: lx,
				top: ly,
				opacity: 1,
				isCenter: false
			};
		});

		const catCenterPt = { x: cx, y: cy };
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
			hubWidthPx
		};
	}

	// leaf view — vertical hub → category → leaf; leaf anchored at center, parents stacked above
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
			hubWidthPx
		};
	}

	return computeGraphLayout({ size, categoryId: null, itemId: null });
};
