export type Locale = 'en' | 'it';

export type Localised = Record<Locale, string> | { en: string; it?: string };

export type Person = {
	id: string;
	name: string;
	title: Localised;
	tagline: Localised;
	location: Localised;
	avatarUrl: string;
	email: string;
	links: { label: Localised; href: string }[];
};

export type Category = {
	id: string;
	label: Localised;
	shortHint: Localised;
};

export type Experience = {
	id: string;
	company: Localised;
	location: Localised;
	role: Localised;
	dates: Localised;
	summary: Localised;
	highlights: Localised[]; // bullet strings
	links?: { label: Localised; href: string }[];
	stackIds?: string[];
	projectIds?: string[];
};

export type Project = {
	id: string;
	title: Localised;
	kind: 'work' | 'personal' | 'org';
	summary: Localised;
	highlights?: Localised[];
	links: { label: Localised; href: string }[]; // GitHub / live
	stackIds?: string[];
	experienceId?: string;
};

export type Technology = {
	id: string;
	label: Localised;
	blurb: Localised;
	yearsHint?: Localised;
	relatedProjectIds?: string[];
};

export type Education = {
	id: string;
	institution: Localised;
	degree: Localised;
	dates: Localised;
	note?: Localised;
};

export type LanguageEntry = {
	id: string;
	label: Localised;
	level: Localised;
};

export type AboutBlock = {
	id: string;
	title: Localised;
	body: Localised;
};

export type PortfolioData = {
	person: Person;
	categories: Category[];
	experiences: Experience[];
	projects: Project[];
	technologies: Technology[];
	education: Education[];
	languages: LanguageEntry[];
	about: AboutBlock[];
	orgHighlights: { name: string; url: string; note: Localised }[];
};
