export type Locale = 'en' | 'it' | 'pt';

export interface Localised {
	en: string;
	it?: string;
	pt?: string;
}

export interface Person {
	id: string;
	name: string;
	title: Localised;
	tagline: Localised;
	location: Localised;
	avatarUrl: string;
	email: string;
	links: { label: Localised; href: string; iconName?: string }[];
	cvUrl?: string;
}

export interface Category {
	id: string;
	label: Localised;
	shortHint: Localised;
}

export interface Experience {
	id: string;
	company: Localised;
	location: Localised;
	role: Localised;
	dates: Localised;
	summary: Localised;
	highlights: Localised[]; // bullet strings
	links?: { label: Localised; href: string; iconName?: string }[];
	stackIds?: string[];
	projectIds?: string[];
}

/**
 * How far a project actually got, so a prototype is never read as a product:
 * `production` has real users, `in-use` runs privately for its author or one
 * team, `prototype` is an experiment or showcase, `archived` is no longer run.
 */
export type ProjectStatus = 'production' | 'in-use' | 'prototype' | 'archived';

export interface Project {
	id: string;
	title: Localised;
	kind: 'work' | 'personal' | 'org';
	summary: Localised;
	/** When it was built, taken from the repository history. */
	dates?: Localised;
	status?: ProjectStatus;
	highlights?: Localised[];
	links?: { label: Localised; href: string; iconName?: string }[]; // GitHub / live
	stackIds?: string[];
	experienceId?: string;
	note?: Localised;
}

export interface Technology {
	id: string;
	label: Localised;
	blurb: Localised;
	yearsHint?: Localised;
	relatedProjectIds?: string[];
}

export interface EducationDegree {
	label: Localised;
	dates: Localised;
	note?: Localised;
}

export interface Education {
	id: string;
	institution: Localised;
	degrees: EducationDegree[];
}

export interface LanguageEntry {
	id: string;
	label: Localised;
	level: Localised;
}

export interface AboutBlock {
	id: string;
	title: Localised;
	body: Localised;
}

export interface PortfolioData {
	person: Person;
	categories: Category[];
	experiences: Experience[];
	projects: Project[];
	technologies: Technology[];
	education: Education[];
	languages: LanguageEntry[];
	about: AboutBlock[];
	orgHighlights: { name: string; url: string; note: Localised }[];
	/**
	 * Known gaps and caveats, stated plainly. Not rendered on the map: the AI
	 * version (/ask) reads them so it never oversells.
	 */
	limits: Localised[];
}
