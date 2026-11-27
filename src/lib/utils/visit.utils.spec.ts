import {
	VISIT_RECIPIENTS,
	type VisitPosting,
	findRecipient
} from '#lib/utils/visit-recipients.utils.ts';
import { visitLink, visitRows, visitTally } from '#lib/utils/visit.utils.ts';

const postings: VisitPosting[] = VISIT_RECIPIENTS.map((r) => r.posting);

describe('visit postings', () => {
	it('point every piece of evidence at an item that exists on the map', () => {
		const refs = postings.flatMap((p) => p.requirements.flatMap((r) => r.evidence));
		const missing = refs.filter((ref) => visitLink(ref) === undefined);

		expect(missing).toEqual([]);
	});

	it('back every direct requirement with evidence or a note', () => {
		const bare = postings
			.flatMap((p) => p.requirements)
			.filter((r) => r.verdict === 'direct' && r.evidence.length === 0 && !r.note);

		expect(bare).toEqual([]);
	});

	it('say how for every requirement that is not direct', () => {
		const silent = postings
			.flatMap((p) => p.requirements)
			.filter((r) => r.verdict !== 'direct' && !r.note);

		expect(silent).toEqual([]);
	});
});

describe('visitLink', () => {
	it('links an item to the map with its own name', () => {
		expect(visitLink({ id: 'project:icdc-core' })).toEqual({
			label: 'icdc-core',
			href: '/?item=project%3Aicdc-core'
		});
	});

	it('keeps a shorter label when the reference gives one', () => {
		expect(visitLink({ id: 'project:oisy', label: 'OISY' })?.label).toBe('OISY');
	});

	it('finds nothing for an id the portfolio does not have', () => {
		expect(visitLink({ id: 'project:no-such-project' })).toBeUndefined();
	});
});

describe('visitRows and visitTally', () => {
	const posting: VisitPosting = {
		from: 'A',
		to: 'B',
		line: '',
		requirements: [
			{ text: 'one', verdict: 'direct', evidence: [{ id: 'project:oisy' }, { id: 'project:x' }] },
			{ text: 'two', verdict: 'direct', evidence: [] },
			{ text: 'three', verdict: 'missing', note: 'not there', evidence: [] }
		]
	};

	it('drop a reference that names nothing and keep the rest in order', () => {
		const rows = visitRows(posting);

		expect(rows.map((r) => r.text)).toEqual(['one', 'two', 'three']);
		expect(rows[0].evidence.map((e) => e.href)).toEqual(['/?item=project%3Aoisy']);
	});

	it('count each verdict, zero included', () => {
		expect(visitTally(posting)).toEqual([
			{ verdict: 'direct', count: 2 },
			{ verdict: 'adjacent', count: 0 },
			{ verdict: 'missing', count: 1 }
		]);
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

	it('find no page for an unknown slug', () => {
		expect(findRecipient('not-a-reader')).toBeUndefined();
	});
});
