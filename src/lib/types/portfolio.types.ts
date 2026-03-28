export type Locale = 'en' | 'it';

export type Localised = Record<Locale, string> | { en: string; it?: string };

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

export interface Project {
	id: string;
	title: Localised;
	kind: 'work' | 'personal' | 'org';
	summary: Localised;
	highlights?: Localised[];
	links: { label: Localised; href: string; iconName?: string }[]; // GitHub / live
	stackIds?: string[];
	experienceId?: string;
}

export interface Technology {
	id: string;
	label: Localised;
	blurb: Localised;
	yearsHint?: Localised;
	relatedProjectIds?: string[];
}

export interface Education {
	id: string;
	institution: Localised;
	degree: Localised;
	dates: Localised;
	note?: Localised;
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
}
