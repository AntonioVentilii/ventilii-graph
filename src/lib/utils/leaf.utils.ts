import { portfolioData } from '#lib/services/portfolio.services.ts';
import type { Locale, Localised } from '#lib/types/portfolio.types.ts';
import { pickLocale } from '#lib/utils/locale.utils.ts';

/**
 * Every kind of map item, in the one place that lists them. A leaf is written
 * `kind:id` (`project:officina`): the URL's `?item=`, the graph's node keys
 * and the evidence ids the AI cites all use that form.
 */
export const LEAF_KINDS = [
	'experience',
	'project',
	'technology',
	'education',
	'language',
	'about'
] as const;

export type LeafKind = (typeof LEAF_KINDS)[number];

export interface Leaf {
	kind: LeafKind;
	id: string;
}

/** The category each kind of leaf sits in on the map. */
const LEAF_CATEGORY: Record<LeafKind, string> = {
	experience: 'experience',
	project: 'projects',
	technology: 'stack',
	education: 'education',
	language: 'languages',
	about: 'about'
};

/** Each kind's items in the portfolio, with the text that labels them. */
const LEAF_ITEMS: Record<LeafKind, () => { id: string; label: Localised }[]> = {
	experience: () => portfolioData.experiences.map((e) => ({ id: e.id, label: e.company })),
	project: () => portfolioData.projects.map((p) => ({ id: p.id, label: p.title })),
	technology: () => portfolioData.technologies.map((s) => ({ id: s.id, label: s.label })),
	education: () => portfolioData.education.map((e) => ({ id: e.id, label: e.institution })),
	language: () => portfolioData.languages.map((l) => ({ id: l.id, label: l.label })),
	about: () => portfolioData.about.map((a) => ({ id: a.id, label: a.title }))
};

export const leafKey = ({ kind, id }: Leaf): string => `${kind}:${id}`;

export const categoryForLeafKind = (kind: LeafKind): string => LEAF_CATEGORY[kind];

export const leavesForCategory = (cat: string): Leaf[] =>
	LEAF_KINDS.filter((kind) => LEAF_CATEGORY[kind] === cat).flatMap((kind) =>
		LEAF_ITEMS[kind]().map(({ id }) => ({ kind, id }))
	);

/** Every leaf on the map, as `kind:id`. */
export const allLeafKeys = (): string[] =>
	LEAF_KINDS.flatMap((kind) => LEAF_ITEMS[kind]().map(({ id }) => leafKey({ kind, id })));

export const leafLabel = ({ leaf, locale }: { leaf: Leaf; locale: Locale }): string => {
	const item = LEAF_ITEMS[leaf.kind]().find((x) => x.id === leaf.id);
	return item ? pickLocale({ text: item.label, locale }) : '';
};

export const parseLeaf = (itemId: string | null): Leaf | null => {
	if (!itemId) {
		return null;
	}
	const [rawKind, ...rest] = itemId.split(':');
	const kind = LEAF_KINDS.find((k) => k === rawKind);
	return kind ? { kind, id: rest.join(':') } : null;
};

export const searchLeaves = ({
	query,
	locale
}: {
	query: string;
	locale: Locale;
}): (Leaf & { label: string })[] => {
	const q = query.toLowerCase().trim();
	if (!q) {
		return [];
	}

	const results: (Leaf & { label: string })[] = [];

	const matches = (text: string | { en: string; it?: string }): boolean => {
		if (typeof text === 'string') {
			return text.toLowerCase().includes(q);
		}
		return text.en.toLowerCase().includes(q) || (text.it?.toLowerCase() ?? '').includes(q);
	};

	// Search experiences
	portfolioData.experiences.forEach((e) => {
		if (matches(e.company)) {
			results.push({
				kind: 'experience',
				id: e.id,
				label: pickLocale({ text: e.company, locale })
			});
		}
	});

	// Search projects
	portfolioData.projects.forEach((p) => {
		if (matches(p.title)) {
			results.push({
				kind: 'project',
				id: p.id,
				label: pickLocale({ text: p.title, locale })
			});
		}
	});

	// Search technologies
	portfolioData.technologies.forEach((s) => {
		if (matches(s.label)) {
			results.push({
				kind: 'technology',
				id: s.id,
				label: pickLocale({ text: s.label, locale })
			});
		}
	});

	// Search education
	portfolioData.education.forEach((ed) => {
		const institutionMatch = matches(ed.institution);
		const degreeMatch = ed.degrees.some((d) => matches(d.label) || (d.note && matches(d.note)));

		if (institutionMatch || degreeMatch) {
			results.push({
				kind: 'education',
				id: ed.id,
				label: pickLocale({ text: ed.institution, locale })
			});
		}
	});

	return results;
};
