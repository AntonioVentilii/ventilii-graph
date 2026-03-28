import { portfolioData } from '$lib/data/portfolio.data';

const n = () => portfolioData.categories.length;

export const categoryAngle = (index: number): number => (index / n()) * Math.PI * 2 - Math.PI / 2;

/**
 * Around the **selected center node**, treat the circle as 360°:
 * - **120°** for the parents path (hub → category), centered toward the top
 *   (-π/2: negative Y in SVG / screen space).
 * - **240°** for sub-nodes, split into `count` equal angular slots; each leaf sits
 *   at the **center** of its slot.
 *
 * Convention: angle 0 = east (+x), π/2 = south (+y), -π/2 = north (−y, toward hub).
 */
export const leafAnglesOpenRing = (count: number): number[] => {
	if (count <= 0) {
		return [];
	}

	const parentsPathDeg = 120;
	const subNodesDeg = 360 - parentsPathDeg; // 240°
	const arcLen = (subNodesDeg / 180) * Math.PI;

	const parentsCenter = -Math.PI / 2;
	const parentsHalf = ((parentsPathDeg / 2) * Math.PI) / 180;
	// First angle after the blocked wedge, moving counterclockwise from +x
	const arcStart = parentsCenter + parentsHalf;

	const slot = arcLen / count;
	return Array.from({ length: count }, (_, k) => arcStart + (k + 0.5) * slot);
};

/** Staggered orbit drift timing (edges follow nodes via live DOM measurement) */
export const ringFloatStyle = (seed: number): string => {
	const dur = 5.5 + (seed % 5) * 0.65;
	const delay = -(seed % 7) * 0.85 - (seed % 3) * 0.4;
	return `animation-duration:${dur}s;animation-delay:${delay}s`;
};
