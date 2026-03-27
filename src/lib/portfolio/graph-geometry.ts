import { portfolioData } from '$lib/data/portfolio.data';

const n = () => portfolioData.categories.length;

export function categoryAngle(index: number): number {
	return (index / n()) * Math.PI * 2 - Math.PI / 2;
}

export function childAngles(parentIndex: number, count: number): number[] {
	const tp = categoryAngle(parentIndex);
	if (count <= 0) return [];
	if (count === 1) return [tp];
	const spread = Math.min(1.1, 0.28 * count);
	const step = spread / (count - 1);
	return Array.from({ length: count }, (_, k) => tp - spread / 2 + k * step);
}

/** Staggered motion so each node feels independent */
export function ringFloatStyle(seed: number): string {
	const dur = 5.5 + (seed % 5) * 0.65;
	const delay = -(seed % 7) * 0.85 - (seed % 3) * 0.4;
	return `animation-duration:${dur}s;animation-delay:${delay}s`;
}

export function hubFloatStyle(): string {
	return 'animation-duration:7.8s;animation-delay:-1.4s';
}
