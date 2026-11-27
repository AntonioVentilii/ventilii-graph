import type { VisitVerdict } from '#lib/utils/visit-recipients.utils.ts';

/*
  Every fixed string of the /for/<slug>/ visit pages. They are English only:
  each page is written for one reader, in the language of the conversation
  with them, so there is no locale to switch. What a page says about its
  posting is in visit-recipients.utils.ts.
*/
export const VISIT_COPY = {
	title: 'The posting, reviewed against my work',
	metaDescription:
		'A job posting read as a code review: what Antonio Ventilii brings to each requirement.',
	diffLabel: 'Suggested change',
	requirements: 'requirements',
	was: 'Asked for',
	now: 'Suggested',
	tallyLabel: 'Review summary',
	linksLabel: 'Check it yourself',
	breakMyAi: 'Break my AI',
	cv: 'CV'
} as const;

/** The mark a verdict carries in the diff, and its name for the tally and screen readers. */
export const VISIT_VERDICT_COPY: Record<VisitVerdict, { mark: string; label: string }> = {
	direct: { mark: '✓', label: 'direct' },
	adjacent: { mark: '~', label: 'adjacent' },
	missing: { mark: '✗', label: 'not there' }
};
