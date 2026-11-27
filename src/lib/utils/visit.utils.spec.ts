import { VISIT_RECIPIENTS, findRecipient } from '#lib/utils/visit-recipients.utils.ts';
import {
	VISIT_QUESTIONS,
	type VisitEvidenceRef,
	type VisitQuestion,
	type VisitQuestionId,
	toggleAnswer,
	visitEvidence,
	visitMatches
} from '#lib/utils/visit.utils.ts';

const QUESTION_IDS: string[] = Object.keys(VISIT_QUESTIONS);

describe('visit questions', () => {
	it('point every answer at an item or limit that exists in the portfolio', () => {
		const questions: VisitQuestion[] = Object.values(VISIT_QUESTIONS);
		const refs: VisitEvidenceRef[] = questions.flatMap((q) => q.options.flatMap((o) => o.evidence));
		const missing = refs.filter((ref) => visitEvidence(ref) === undefined);

		expect(missing).toEqual([]);
	});

	it('show the highlight a reference names, not the summary', () => {
		const text = visitEvidence({ experience: 'dfinity', highlight: 'Solana' })?.text;

		expect(text?.startsWith('Solana')).toBeTruthy();
	});

	it('link portfolio items to the map and leave limits unlinked', () => {
		expect(visitEvidence({ project: 'oisy' })?.href).toBe('/?item=project%3Aoisy');
		expect(visitEvidence({ limit: 'Management:' })?.href).toBeUndefined();
	});
});

describe('visit recipients', () => {
	it('have unique, URL-safe slugs', () => {
		const slugs = VISIT_RECIPIENTS.map((r) => r.slug);

		expect(new Set(slugs).size).toBe(slugs.length);

		for (const slug of slugs) {
			expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
		}
	});

	it('ask only questions that exist', () => {
		for (const r of VISIT_RECIPIENTS) {
			expect(r.questions.every((id) => QUESTION_IDS.includes(id))).toBeTruthy();
		}
	});

	it('find no page for an unknown slug', () => {
		expect(findRecipient('not-a-reader')).toBeUndefined();
	});
});

describe('toggleAnswer', () => {
	it('adds and removes answers when several are allowed', () => {
		expect(toggleAnswer({ multi: true, chosen: ['a'], option: 'b' })).toEqual(['a', 'b']);
		expect(toggleAnswer({ multi: true, chosen: ['a', 'b'], option: 'a' })).toEqual(['b']);
	});

	it('keeps one answer when only one is allowed', () => {
		expect(toggleAnswer({ multi: false, chosen: ['a'], option: 'b' })).toEqual(['b']);
		expect(toggleAnswer({ multi: false, chosen: ['b'], option: 'b' })).toEqual([]);
	});
});

describe('visitMatches', () => {
	const questions: VisitQuestionId[] = ['chains', 'hours'];

	it('matches nothing before any answer', () => {
		const { matches, items } = visitMatches({ questions, answers: {} });

		expect(items).toBe(0);
		expect(matches.map((m) => m.picks.length)).toEqual([0, 0]);
	});

	it('counts an item once even when two answers point at it', () => {
		const { items } = visitMatches({
			questions,
			answers: { chains: ['evm', 'solana'] }
		});

		// Both answers cite the DFINITY experience; EVM also cites the escrow project.
		expect(items).toBe(2);
	});

	it('ignores an answer id the question does not have', () => {
		const { matches } = visitMatches({ questions, answers: { hours: ['mars'] } });

		expect(matches[1].picks).toEqual([]);
	});

	it('keeps the note of an answer that no item proves', () => {
		const { matches, items } = visitMatches({ questions, answers: { hours: ['eu'] } });

		expect(matches[1].picks[0].option.note).toBeTruthy();
		expect(items).toBe(0);
	});
});
