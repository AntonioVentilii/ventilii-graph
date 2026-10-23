import { portfolioData } from '../src/lib/services/portfolio.services.ts';
import type { Localised, ProjectStatus } from '../src/lib/types/portfolio.types.ts';

/**
 * The portfolio rendered as plain text for the model: the same data the map
 * and the CV render, so the AI version can never drift from the site. Every
 * item carries the id the answers cite as evidence.
 */

const en = (text: Localised): string => text.en;

const STATUS_TEXT: Record<ProjectStatus, string> = {
	production: 'live, with real users',
	'in-use': 'deployed privately, used by its author or one team',
	prototype: 'prototype or experiment, not in use',
	archived: 'archived, no longer run'
};

const section = ({ title, lines }: { title: string; lines: string[] }): string =>
	[`## ${title}`, '', ...lines].join('\n');

const bullets = (items: Localised[] | undefined): string[] =>
	(items ?? []).map((item) => `- ${en(item)}`);

const techLabel = (id: string): string =>
	portfolioData.technologies.find((t) => t.id === id)?.label.en ?? id;

const stackLine = (ids: string[] | undefined): string[] =>
	ids?.length ? [`Stack: ${ids.map(techLabel).join(', ')}`] : [];

const linksLine = (links: { href: string }[] | undefined): string[] =>
	links?.length ? [`Links: ${links.map((l) => l.href).join(', ')}`] : [];

const buildKnowledge = (): string => {
	const { person, experiences, projects, technologies, education, languages, about, limits } =
		portfolioData;

	const header = [
		`# ${person.name}`,
		'',
		`Title: ${en(person.title)}`,
		`Location: ${en(person.location)}`,
		`Contact: ${person.email}`,
		`Profiles: ${person.links.map((l) => l.href).join(', ')}`,
		`Site: https://ventilii.dev (interactive map), https://ventilii.dev/cv/ (CV)`,
		'',
		en(person.tagline)
	].join('\n');

	const experienceLines = experiences.flatMap((e) => [
		`### [experience:${e.id}] ${en(e.company)}: ${en(e.role)} (${en(e.dates)}, ${en(e.location)})`,
		en(e.summary),
		...bullets(e.highlights),
		...stackLine(e.stackIds),
		''
	]);

	const projectLines = projects.flatMap((p) => [
		`### [project:${p.id}] ${en(p.title)}`,
		[
			`When: ${p.dates ? en(p.dates) : 'not recorded'}`,
			`Status: ${p.status ? STATUS_TEXT[p.status] : 'not recorded'}`,
			`Kind: ${p.kind === 'org' ? 'employer project' : 'personal project'}`
		].join(' | '),
		en(p.summary),
		...bullets(p.highlights),
		...stackLine(p.stackIds),
		...linksLine(p.links),
		''
	]);

	const technologyLines = technologies.flatMap((t) => [
		`### [technology:${t.id}] ${en(t.label)}`,
		en(t.blurb),
		...(t.yearsHint ? [en(t.yearsHint)] : []),
		''
	]);

	const educationLines = education.flatMap((e) => [
		`### [education:${e.id}] ${en(e.institution)}`,
		...e.degrees.map((d) => `- ${en(d.label)} (${en(d.dates)})${d.note ? `: ${en(d.note)}` : ''}`),
		''
	]);

	const languageLines = languages.map((l) => `- [language:${l.id}] ${en(l.label)}: ${en(l.level)}`);

	const aboutLines = about.flatMap((a) => [`### [about:${a.id}] ${en(a.title)}`, en(a.body), '']);

	return [
		header,
		section({ title: 'Experience', lines: experienceLines }),
		section({ title: 'Projects (newest and most relevant first)', lines: projectLines }),
		section({ title: 'Stack', lines: technologyLines }),
		section({ title: 'Education', lines: educationLines }),
		section({ title: 'Spoken languages', lines: languageLines }),
		section({ title: 'About', lines: aboutLines }),
		section({ title: 'Known limits and caveats', lines: bullets(limits) })
	].join('\n\n');
};

export const KNOWLEDGE = buildKnowledge();

/** Every id the model may cite; anything else is dropped before it reaches the page. */
export const EVIDENCE_IDS: ReadonlySet<string> = new Set([
	...portfolioData.experiences.map((e) => `experience:${e.id}`),
	...portfolioData.projects.map((p) => `project:${p.id}`),
	...portfolioData.technologies.map((t) => `technology:${t.id}`),
	...portfolioData.education.map((e) => `education:${e.id}`),
	...portfolioData.languages.map((l) => `language:${l.id}`),
	...portfolioData.about.map((a) => `about:${a.id}`)
]);
