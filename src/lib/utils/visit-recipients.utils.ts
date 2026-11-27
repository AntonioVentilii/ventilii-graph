import { portfolioData } from '#lib/services/portfolio.services.ts';

/*
  Who a visit page is for: one entry per reader, the only list of them. A
  page is /for/<slug>/, prerendered for every entry here, kept out of the
  sitemap and marked noindex. The repository is public, so an entry names
  no one: not the reader, not their company, not the company hiring. The
  slug is random, and the posting is described only as far as the page needs.
  A page for a new reader on the same posting is a new entry that reuses it.
*/

/** How a requirement of the posting meets the portfolio: direct, adjacent, or not there. */
export type VisitVerdict = 'direct' | 'adjacent' | 'missing';

/** A portfolio item a row points at, as `kind:id`; `label` shortens the map's own name. */
export interface VisitEvidenceRef {
	id: string;
	label?: string;
}

export interface VisitRequirement {
	/** The requirement, in the posting's terms. */
	text: string;
	verdict: VisitVerdict;
	/** One short clause: how, for adjacent; what is missing, for missing. */
	note?: string;
	evidence: VisitEvidenceRef[];
}

/** The posting a page is about, read as a diff: the seat asked for, the seat offered. */
export interface VisitPosting {
	from: string;
	to: string;
	requirements: VisitRequirement[];
	/** The one line of plain text under the diff. */
	line: string;
}

export interface VisitRecipient {
	/** Random, so the URL says nothing about who it is for. */
	slug: string;
	posting: VisitPosting;
}

const OISY = { id: 'project:oisy', label: 'OISY' };
const ICDC_CORE = { id: 'project:icdc-core' };

const DIRECTOR_OF_ENGINEERING: VisitPosting = {
	from: 'Director of Engineering',
	to: 'Staff / Principal Engineer, same team',
	requirements: [
		{
			text: 'Strong crypto / blockchain engineering',
			verdict: 'direct',
			evidence: [OISY, ICDC_CORE]
		},
		{
			text: 'Own technical direction and architecture',
			verdict: 'direct',
			note: 'owned technical direction, planning and mentoring before a team restructure',
			evidence: [OISY]
		},
		{
			text: 'Hands-on with the hard problems, design reviews, critical paths',
			verdict: 'direct',
			evidence: [OISY, ICDC_CORE]
		},
		{
			text: 'On-chain finance products',
			verdict: 'direct',
			evidence: [
				ICDC_CORE,
				{ id: 'project:vici-maker' },
				{ id: 'experience:vontobel', label: 'trading at Vontobel' }
			]
		},
		{
			text: 'Hold a high bar across a team',
			verdict: 'adjacent',
			note: 'mentoring and technical direction, at a smaller scope than 15 engineers',
			evidence: [OISY]
		},
		{
			text: '5+ years of engineering management, leading managers',
			verdict: 'missing',
			note: 'not there: no people-manager title',
			evidence: []
		},
		{
			text: 'Remote, Europe or US',
			verdict: 'direct',
			note: `based in ${portfolioData.person.location.en}`,
			evidence: []
		}
	],
	line: 'Not the Director seat: the hands-on engineer next to it, on the same team.'
};

export const VISIT_RECIPIENTS: readonly VisitRecipient[] = [
	{ slug: 'b62986ac', posting: DIRECTOR_OF_ENGINEERING }
];

export const findRecipient = (slug: string): VisitRecipient | undefined =>
	VISIT_RECIPIENTS.find((r) => r.slug === slug);
