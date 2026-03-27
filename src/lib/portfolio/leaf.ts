import { portfolioData } from '$lib/data/portfolio.data';
import type { Locale } from '$lib/portfolio/types';
import { pickLocale } from '$lib/portfolio/locale';

export type Leaf =
	| { kind: 'experience'; id: string }
	| { kind: 'project'; id: string }
	| { kind: 'technology'; id: string }
	| { kind: 'education'; id: string }
	| { kind: 'language'; id: string }
	| { kind: 'about'; id: string };

export function categoryForLeafKind(kind: Leaf['kind']): string {
	switch (kind) {
		case 'experience':
			return 'experience';
		case 'project':
			return 'projects';
		case 'technology':
			return 'stack';
		case 'education':
			return 'education';
		case 'language':
			return 'languages';
		case 'about':
			return 'about';
	}
}

export function leavesForCategory(cat: string): Leaf[] {
	switch (cat) {
		case 'experience':
			return portfolioData.experiences.map((e) => ({ kind: 'experience', id: e.id }));
		case 'projects':
			return portfolioData.projects.map((p) => ({ kind: 'project', id: p.id }));
		case 'stack':
			return portfolioData.technologies.map((s) => ({ kind: 'technology', id: s.id }));
		case 'education':
			return portfolioData.education.map((e) => ({ kind: 'education', id: e.id }));
		case 'languages':
			return portfolioData.languages.map((l) => ({ kind: 'language', id: l.id }));
		case 'about':
			return portfolioData.about.map((a) => ({ kind: 'about', id: a.id }));
		default:
			return [];
	}
}

export function leafLabel(leaf: Leaf, locale: Locale): string {
	switch (leaf.kind) {
		case 'experience': {
			const e = portfolioData.experiences.find((x) => x.id === leaf.id)!;
			return pickLocale(e.company, locale);
		}
		case 'project': {
			const p = portfolioData.projects.find((x) => x.id === leaf.id)!;
			return pickLocale(p.title, locale);
		}
		case 'technology': {
			const s = portfolioData.technologies.find((x) => x.id === leaf.id)!;
			return pickLocale(s.label, locale);
		}
		case 'education': {
			const ed = portfolioData.education.find((x) => x.id === leaf.id)!;
			return pickLocale(ed.institution, locale);
		}
		case 'language': {
			const l = portfolioData.languages.find((x) => x.id === leaf.id)!;
			return pickLocale(l.label, locale);
		}
		case 'about': {
			const a = portfolioData.about.find((x) => x.id === leaf.id)!;
			return pickLocale(a.title, locale);
		}
	}
}

export function parseLeaf(itemId: string | null): Leaf | null {
	if (!itemId) return null;
	const [kind, ...rest] = itemId.split(':');
	const id = rest.join(':');
	if (
		kind === 'experience' ||
		kind === 'project' ||
		kind === 'technology' ||
		kind === 'education' ||
		kind === 'language' ||
		kind === 'about'
	) {
		return { kind, id } as Leaf;
	}
	return null;
}
