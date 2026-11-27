import { evidenceLink } from '#lib/utils/evidence.utils.ts';
import type {
	VisitEvidenceRef,
	VisitPosting,
	VisitRequirement,
	VisitVerdict
} from '#lib/utils/visit-recipients.utils.ts';

/*
  A visit page's posting, ready to render: every evidence reference resolved
  to its map link, and the review's tally. A reference that names no item of
  the portfolio is dropped here and caught by visit.utils.spec.ts.
*/

/** The verdicts in the order the tally reads them. */
export const VISIT_VERDICTS = [
	'direct',
	'adjacent',
	'missing'
] as const satisfies readonly VisitVerdict[];

export interface VisitLink {
	label: string;
	href: string;
}

export interface VisitRow extends Omit<VisitRequirement, 'evidence'> {
	evidence: VisitLink[];
}

/** A reference to its label and its deep link on the map, or undefined when it names nothing. */
export const visitLink = ({ id, label }: VisitEvidenceRef): VisitLink | undefined => {
	const link = evidenceLink({ id, locale: 'en' });
	return link ? { label: label ?? link.label, href: link.href } : undefined;
};

export const visitRows = (posting: VisitPosting): VisitRow[] =>
	posting.requirements.map((requirement) => ({
		...requirement,
		evidence: requirement.evidence
			.map(visitLink)
			.filter((link): link is VisitLink => link !== undefined)
	}));

/** How many requirements got each verdict, in the tally's order. */
export const visitTally = (posting: VisitPosting): { verdict: VisitVerdict; count: number }[] =>
	VISIT_VERDICTS.map((verdict) => ({
		verdict,
		count: posting.requirements.filter((r) => r.verdict === verdict).length
	}));
