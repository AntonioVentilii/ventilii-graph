import { portfolioData } from '#lib/services/portfolio.services.ts';
import type { Localised } from '#lib/types/portfolio.types.ts';
import { evidenceLink } from '#lib/utils/evidence.utils.ts';
import { projectMeta } from '#lib/utils/project.utils.ts';

/*
  The questions a visit page can ask, and which of Antonio's real work each
  answer points at. An answer never carries a claim of its own: it names an
  item of portfolioData (and, optionally, which of its highlights), and the
  page shows that item's own text. The recipients, who sees which questions,
  are in visit-recipients.utils.ts.
*/

/**
 * A piece of evidence: an experience, a project or a technology of the
 * portfolio, or one of its stated limits. `highlight` and `limit` name the
 * English text by how it starts, so reordering the lists does not move them.
 */
export type VisitEvidenceRef =
	| { experience: string; highlight?: string }
	| { project: string; highlight?: string }
	| { technology: string }
	| { limit: string };

export interface VisitOption {
	id: string;
	label: string;
	/** A line of plain context under the answer, for answers no item proves (hours). */
	note?: string;
	evidence: VisitEvidenceRef[];
}

export interface VisitQuestion {
	/** The question's name in the page index. */
	name: string;
	title: string;
	hint: string;
	/** Several answers at once, or exactly one. */
	multi: boolean;
	options: VisitOption[];
}

const DFINITY_LEADERSHIP = { experience: 'dfinity', highlight: 'Product, leadership' };
const DFINITY_EVM = { experience: 'dfinity', highlight: 'EVM scale-out' };
const DFINITY_SOLANA = { experience: 'dfinity', highlight: 'Solana' };
const VICI_CUSTODY = { project: 'vici-app', highlight: 'Web2 backend' };

export const VISIT_QUESTIONS = {
	roles: {
		name: 'The team',
		title: 'Which hands-on roles report to the Director?',
		hint: 'Pick every one the client hires for, or that could open up.',
		multi: true,
		options: [
			{
				id: 'staff',
				label: 'Staff or principal engineer',
				evidence: [
					DFINITY_LEADERSHIP,
					{ experience: 'dfinity', highlight: 'Performance / architecture' },
					{ project: 'officina', highlight: 'Deterministic engine' }
				]
			},
			{
				id: 'lead',
				label: 'Lead engineer of a product team',
				evidence: [{ project: 'oisy' }, DFINITY_LEADERSHIP, { limit: 'Management:' }]
			},
			{
				id: 'rust',
				label: 'Senior Rust or protocol engineer',
				evidence: [
					{ project: 'icdc-core', highlight: 'Plan-Execute-Finalise' },
					{ technology: 'rust' }
				]
			},
			{
				id: 'fullstack',
				label: 'Senior full-stack engineer (TypeScript)',
				evidence: [{ project: 'oisy' }, { project: 'vici-app' }, { technology: 'typescript' }]
			}
		]
	},
	chains: {
		name: 'On-chain',
		title: 'What does the product run on?',
		hint: 'The chains it touches today, or the closest match.',
		multi: true,
		options: [
			{
				id: 'bitcoin',
				label: 'Bitcoin',
				evidence: [{ project: 'oisy', highlight: 'Apache-2.0' }, { project: 'bitcoin-utxo-lp' }]
			},
			{
				id: 'evm',
				label: 'Ethereum and EVM chains',
				evidence: [DFINITY_EVM, { project: 'escrow' }]
			},
			{ id: 'solana', label: 'Solana', evidence: [DFINITY_SOLANA] },
			{
				id: 'icp',
				label: 'Internet Computer',
				evidence: [{ project: 'icdc-core' }, { technology: 'icp' }]
			},
			{
				id: 'other',
				label: 'Another chain',
				evidence: [DFINITY_EVM, VICI_CUSTODY]
			}
		]
	},
	focus: {
		name: 'The hard part',
		title: 'Where is the hard part of the product?',
		hint: 'The work that keeps the team up at night.',
		multi: true,
		options: [
			{
				id: 'custody',
				label: 'Custody, keys and signing',
				evidence: [
					DFINITY_SOLANA,
					{ experience: 'dfinity', highlight: 'Security / abuse' },
					VICI_CUSTODY,
					{ project: 'vault' }
				]
			},
			{
				id: 'trading',
				label: 'Trading, markets and clearing',
				evidence: [
					{ project: 'icdc-core' },
					{ project: 'vici-maker' },
					{ experience: 'vontobel', highlight: 'FX book' },
					{ project: 'deribit-wrapper' }
				]
			},
			{
				id: 'agents',
				label: 'Agents that act on money',
				evidence: [
					{ project: 'household-app', highlight: 'Propose-then-approve' },
					{ project: 'officina', highlight: 'Deterministic engine' },
					{ technology: 'ai-agentic' }
				]
			},
			{
				id: 'payments',
				label: 'Swaps, on-ramps and payments',
				evidence: [
					{ experience: 'dfinity', highlight: 'In-wallet services' },
					{ project: 'ombrellone', highlight: 'Full product surface' }
				]
			}
		]
	},
	hours: {
		name: 'Hours',
		title: 'Which hours does the team keep?',
		hint: 'The role is remote, in the EU or the US.',
		multi: false,
		options: [
			{
				id: 'eu',
				label: 'European hours',
				note: 'Zurich is on Central European Time: the same working day as an EU team.',
				evidence: []
			},
			{
				id: 'us-east',
				label: 'US East hours',
				note: 'Zurich is usually six hours ahead of New York: the European afternoon is the US East morning.',
				evidence: []
			},
			{
				id: 'us-west',
				label: 'US West hours',
				note: 'Zurich is usually nine hours ahead of California: the overlap is the end of the European day.',
				evidence: []
			},
			{
				id: 'both',
				label: 'Both, one distributed team',
				note: 'Zurich sits between the two: mornings with Europe, afternoons with the US East coast.',
				evidence: []
			}
		]
	}
} as const satisfies Record<string, VisitQuestion>;

export type VisitQuestionId = keyof typeof VISIT_QUESTIONS;

/** What the reader picked: option ids per question. */
export type VisitAnswers = Partial<Record<VisitQuestionId, string[]>>;

/** A question's answers after the reader presses one option: on or off, and only one if not multi. */
export const toggleAnswer = ({
	multi,
	chosen,
	option
}: {
	multi: boolean;
	chosen: readonly string[];
	option: string;
}): string[] => {
	if (chosen.includes(option)) {
		return chosen.filter((o) => o !== option);
	}
	return multi ? [...chosen, option] : [option];
};

/** A piece of evidence as the page shows it, in the portfolio's own words. */
export interface VisitEvidence {
	key: string;
	label: string;
	meta?: string;
	text: string;
	href?: string;
}

const EN = 'en';

const startingWith = ({
	list,
	start
}: {
	list: Localised[] | undefined;
	start: string;
}): string | undefined => list?.find((text) => text.en.startsWith(start))?.en;

const itemText = ({
	summary,
	highlights,
	highlight
}: {
	summary: Localised;
	highlights?: Localised[];
	highlight: string | undefined;
}): string | undefined =>
	highlight === undefined ? summary.en : startingWith({ list: highlights, start: highlight });

const linked = ({
	key,
	meta,
	text
}: {
	key: string;
	meta?: string;
	text: string | undefined;
}): VisitEvidence | undefined => {
	const link = evidenceLink({ id: key, locale: EN });
	return link && text !== undefined
		? { key: `${key}#${text.slice(0, 24)}`, label: link.label, meta, text, href: link.href }
		: undefined;
};

/** Resolve a reference to the portfolio's own text, or undefined when it names nothing. */
export const visitEvidence = (ref: VisitEvidenceRef): VisitEvidence | undefined => {
	if ('limit' in ref) {
		const text = startingWith({ list: portfolioData.limits, start: ref.limit });
		return text === undefined
			? undefined
			: { key: `limit:${ref.limit}`, label: 'In plain words', text };
	}
	if ('experience' in ref) {
		const item = portfolioData.experiences.find((e) => e.id === ref.experience);
		return item
			? linked({
					key: `experience:${item.id}`,
					meta: `${item.role.en} · ${item.dates.en}`,
					text: itemText({ ...item, highlight: ref.highlight })
				})
			: undefined;
	}
	if ('project' in ref) {
		const item = portfolioData.projects.find((p) => p.id === ref.project);
		return item
			? linked({
					key: `project:${item.id}`,
					meta: projectMeta({ project: item, locale: EN }),
					text: itemText({ ...item, highlight: ref.highlight })
				})
			: undefined;
	}
	const item = portfolioData.technologies.find((t) => t.id === ref.technology);
	return item ? linked({ key: `technology:${item.id}`, text: item.blurb.en }) : undefined;
};

export interface VisitPick {
	option: VisitOption;
	evidence: VisitEvidence[];
}

export interface VisitMatch {
	id: VisitQuestionId;
	question: VisitQuestion;
	picks: VisitPick[];
}

/** Every answer the reader gave, with the work behind it, and how many distinct items that is. */
export const visitMatches = ({
	questions,
	answers
}: {
	questions: readonly VisitQuestionId[];
	answers: VisitAnswers;
}): { matches: VisitMatch[]; items: number } => {
	const matches = questions.map((id): VisitMatch => {
		const question: VisitQuestion = VISIT_QUESTIONS[id];
		const chosen = answers[id] ?? [];
		const picks = question.options
			.filter((option) => chosen.includes(option.id))
			.map((option) => ({
				option,
				evidence: option.evidence
					.map(visitEvidence)
					.filter((e): e is VisitEvidence => e !== undefined)
			}));
		return { id, question, picks };
	});
	const items = new Set(
		matches.flatMap((m) =>
			m.picks.flatMap((p) => p.evidence.filter((e) => e.href).map((e) => e.href))
		)
	).size;
	return { matches, items };
};
