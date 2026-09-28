import type { Locale } from '$lib/types/portfolio.types';
import { leafLabel, parseLeaf } from '$lib/utils/leaf.utils';

export interface EvidenceLink {
	id: string;
	label: string;
	href: string;
}

/** Resolve an evidence id (`project:officina`) to its map label and deep link. */
export const evidenceLink = ({
	id,
	locale
}: {
	id: string;
	locale: Locale;
}): EvidenceLink | undefined => {
	const leaf = parseLeaf(id);
	if (!leaf) {
		return undefined;
	}
	const label = leafLabel({ leaf, locale });
	if (!label) {
		return undefined;
	}
	const params = new URLSearchParams({ item: id });
	if (locale !== 'en') {
		params.set('lang', locale);
	}
	return { id, label, href: `/?${params.toString()}` };
};
