import type { VisitQuestionId } from '#lib/utils/visit.utils.ts';

/*
  Who a visit page is for: one entry per reader, the only list of them. A
  page is /for/<slug>/, prerendered for every entry here, kept out of the
  sitemap and marked noindex. The repository is public, so an entry names
  no one: not the reader, not their company, not the company hiring. The
  slug is random, and the role is described only as far as the page needs.
  A page for a new reader on the same post is a new entry that reuses the
  same role.
*/

/** The post a page is about, in general terms. Several readers may share one. */
export interface VisitRole {
	title: string;
	facts: string[];
	/** Where Antonio falls short of the post, said plainly. */
	gap: string;
	/** What he is a candidate for instead. */
	pitch: string;
}

export interface VisitRecipient {
	/** Random, so the URL says nothing about who it is for. */
	slug: string;
	role: VisitRole;
	questions: readonly VisitQuestionId[];
}

const DIRECTOR_OF_ENGINEERING: VisitRole = {
	title: 'Director of Engineering',
	facts: ['Remote, in the EU or the US', 'Hands-on, not only management'],
	gap: 'This is a Director role that asks for years of people management. I do not have them, so I am not your candidate for the Director seat itself.',
	pitch:
		'I am a candidate for the hands-on work just under it: a staff, principal or lead engineer in crypto infrastructure, on-chain finance or agentic finance, at this company or at another one you work with.'
};

export const VISIT_RECIPIENTS: readonly VisitRecipient[] = [
	{
		slug: 'b62986ac',
		role: DIRECTOR_OF_ENGINEERING,
		questions: ['roles', 'chains', 'focus', 'hours']
	}
];

export const findRecipient = (slug: string): VisitRecipient | undefined =>
	VISIT_RECIPIENTS.find((r) => r.slug === slug);
