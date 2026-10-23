import type { Locale } from '$lib/types/portfolio.types';

/**
 * Contract between the /ask page and the API in server/. Evidence ids use the
 * graph's leaf format (`project:officina`, `experience:dfinity`), so every
 * claim links back to the item on the map that supports it.
 */
export type AiMode = 'ask' | 'fit' | 'deck';

export interface AskRequest {
	mode: 'ask';
	locale: Locale;
	question: string;
}

export interface FitRequest {
	mode: 'fit';
	locale: Locale;
	jobDescription: string;
}

export interface DeckRequest {
	mode: 'deck';
	locale: Locale;
	audience: string;
}

export type AiRequest = AskRequest | FitRequest | DeckRequest;

export interface EvidenceRef {
	id: string;
	why: string;
}

export interface AskResult {
	answer: string;
	confidence: 'high' | 'medium' | 'low';
	evidence: EvidenceRef[];
	/** What the question asks that the portfolio cannot answer, if anything. */
	notInPortfolio: string | null;
	followUps: string[];
}

export interface FitMatch {
	requirement: string;
	strength: 'direct' | 'adjacent';
	note: string;
	evidence: string[];
}

export interface FitGap {
	requirement: string;
	severity: 'minor' | 'significant' | 'blocker';
	note: string;
}

export interface FitResult {
	role: string;
	verdict: 'strong' | 'good' | 'partial' | 'weak';
	verdictLine: string;
	matches: FitMatch[];
	gaps: FitGap[];
	interviewQuestions: string[];
	bottomLine: string;
}

export interface DeckSlide {
	kicker: string;
	heading: string;
	bullets: string[];
	evidence: string[];
}

export interface DeckResult {
	title: string;
	audience: string;
	slides: DeckSlide[];
}

export type AiResult =
	| { mode: 'ask'; result: AskResult }
	| { mode: 'fit'; result: FitResult }
	| { mode: 'deck'; result: DeckResult };

export type AiErrorCode =
	| 'bad_request'
	| 'unconfigured'
	| 'rate_limited'
	| 'daily_cap'
	| 'busy'
	| 'refused'
	| 'upstream';

export type AiResponse =
	| ({ ok: true } & AiResult)
	| { ok: false; error: AiErrorCode; retryAfterSeconds?: number };

export interface AiHealth {
	configured: boolean;
	model: string;
}

/** Input limits, enforced by the server and mirrored by the form. */
export const AI_INPUT_LIMITS = {
	question: 600,
	jobDescription: 12_000,
	audience: 400
} as const;
