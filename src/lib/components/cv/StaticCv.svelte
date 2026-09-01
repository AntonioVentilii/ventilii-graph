<script lang="ts">
	import { onMount } from 'svelte';
	import ThemeToggle from '$lib/components/layout/ThemeToggle.svelte';
	import { portfolioData } from '$lib/services/portfolio.services';
	import type { Locale, Localised } from '$lib/types/portfolio.types';
	import { cvPath, pickLocale } from '$lib/utils/locale.utils';
	import {
		OG_IMAGE,
		OG_IMAGE_ALT,
		OG_IMAGE_HEIGHT,
		OG_IMAGE_WIDTH,
		PERSON_KNOWS_ABOUT,
		SITE_AUTHOR,
		SITE_MODIFIED_TIME,
		SITE_PUBLISHED_TIME,
		absoluteUrl,
		serializeSchema
	} from '$lib/utils/seo.utils';

	interface Props {
		locale: Locale;
	}

	let { locale }: Props = $props();

	const { person, categories, experiences, projects, technologies, education, languages, about } =
		portfolioData;

	const pick = (text: Localised): string => pickLocale({ text, locale });

	const category = (id: string): { label: string; hint: string } => {
		const cat = categories.find((c) => c.id === id);
		return cat ? { label: pick(cat.label), hint: pick(cat.shortHint) } : { label: id, hint: '' };
	};

	const techLabel = (id: string): string => {
		const tech = technologies.find((s) => s.id === id);
		return tech ? pick(tech.label) : id;
	};

	const t: Record<string, Localised> = {
		metaTitle: {
			en: 'Antonio Ventilii CV | AI-Native Senior Software Engineer',
			it: 'CV di Antonio Ventilii | Senior Software Engineer AI-Native',
			pt: 'CV de Antonio Ventilii | Senior Software Engineer AI-Native'
		},
		metaDescription: {
			en: 'CV of Antonio Ventilii, Senior Software Engineer. Orchestrates AI coding agents across many parallel projects while shipping production TypeScript, Rust, and Python for Web3 and finance. Experience at DFINITY, Vontobel, and Itaú.',
			it: 'CV di Antonio Ventilii, Senior Software Engineer. Orchestra coding agent AI su molti progetti in parallelo e sviluppa TypeScript, Rust e Python in produzione per Web3 e finanza. Esperienza in DFINITY, Vontobel e Itaú.',
			pt: 'CV de Antonio Ventilii, Senior Software Engineer. Orquestra coding agents de IA em muitos projetos paralelos e entrega TypeScript, Rust e Python em produção para Web3 e finanças. Experiência em DFINITY, Vontobel e Itaú.'
		},
		scatter: { en: 'scatter', it: 'sparpaglia', pt: 'espalhar' },
		scatterTitle: {
			en: 'Scatter this page back into the interactive graph',
			it: 'Sparpaglia questa pagina nella mappa interattiva',
			pt: 'Espalhar esta página de volta no mapa interativo'
		},
		hint: {
			en: 'The flat, machine-friendly version of an interactive career map.',
			it: 'La versione piatta e leggibile dalle macchine di una mappa interattiva.',
			pt: 'A versão plana e legível por máquinas de um mapa de carreira interativo.'
		},
		downloadPdf: { en: 'Download PDF', it: 'Scarica il PDF', pt: 'Baixar PDF' },
		orgs: { en: 'GitHub organizations', it: 'Organizzazioni GitHub', pt: 'Organizações no GitHub' },
		langNav: { en: 'CV language', it: 'Lingua del CV', pt: 'Idioma do CV' }
	};

	const tr = (key: keyof typeof t): string => pick(t[key]);

	const htmlLang = $derived(locale === 'pt' ? 'pt-BR' : locale);
	const ogLocale = $derived(locale === 'en' ? 'en_US' : locale === 'it' ? 'it_IT' : 'pt_BR');

	const canonical = $derived(absoluteUrl(cvPath(locale)));

	const localeNav: { code: Locale; label: string; href: string }[] = [
		{ code: 'en', label: 'EN', href: cvPath('en') },
		{ code: 'it', label: 'IT', href: cvPath('it') },
		{ code: 'pt', label: 'PT', href: cvPath('pt') }
	];

	const _jsonLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'ProfilePage',
		mainEntity: {
			'@type': 'Person',
			name: person.name,
			jobTitle: 'Senior Software Engineer',
			url: canonical,
			mainEntityOfPage: canonical,
			image: absoluteUrl(person.avatarUrl),
			email: `mailto:${person.email}`,
			sameAs: person.links.map((l) => l.href),
			description: pick(person.tagline),
			knowsAbout: PERSON_KNOWS_ABOUT,
			knowsLanguage: ['it', 'pt', 'en', 'de'],
			hasOccupation: {
				'@type': 'Occupation',
				name: 'Senior Software Engineer',
				skills: PERSON_KNOWS_ABOUT.join(', ')
			},
			worksFor: {
				'@type': 'Organization',
				name: 'DFINITY Foundation',
				url: 'https://dfinity.org'
			},
			alumniOf: [
				{ '@type': 'CollegeOrUniversity', name: 'Politecnico di Milano' },
				{ '@type': 'CollegeOrUniversity', name: 'University of São Paulo' }
			]
		}
	});

	const _jsonLdString = $derived(serializeSchema(_jsonLd));
	// Svelte renders <script> tag content in markup as raw text, so inject via @html
	const _jsonLdScript = $derived(
		`<script type="application/ld+json">${_jsonLdString}</${''}script>`
	);

	onMount(() => {
		document.documentElement.lang = htmlLang;
		return () => {
			document.documentElement.lang = 'en';
		};
	});
</script>

<svelte:head>
	<title>{tr('metaTitle')}</title>
	<meta name="description" content={tr('metaDescription')} />
	<link href={canonical} rel="canonical" />
	<link href={absoluteUrl(cvPath('en'))} hreflang="en" rel="alternate" />
	<link href={absoluteUrl(cvPath('it'))} hreflang="it" rel="alternate" />
	<link href={absoluteUrl(cvPath('pt'))} hreflang="pt-BR" rel="alternate" />
	<link href={absoluteUrl(cvPath('en'))} hreflang="x-default" rel="alternate" />
	<meta content={tr('metaTitle')} property="og:title" />
	<meta content={tr('metaDescription')} property="og:description" />
	<meta content="profile" property="og:type" />
	<meta content={canonical} property="og:url" />
	<meta content={ogLocale} property="og:locale" />
	<meta content={OG_IMAGE} property="og:image" />
	<meta content={OG_IMAGE_WIDTH} property="og:image:width" />
	<meta content={OG_IMAGE_HEIGHT} property="og:image:height" />
	<meta name="author" content={SITE_AUTHOR} />
	<meta content={SITE_AUTHOR} property="article:author" />
	<meta content={SITE_PUBLISHED_TIME} property="article:published_time" />
	<meta content={SITE_MODIFIED_TIME} property="article:modified_time" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content={OG_IMAGE} />
	<meta name="twitter:image:alt" content={OG_IMAGE_ALT} />

	<!-- eslint-disable-next-line svelte/no-at-html-tags -- serializeSchema escapes <, >, & -->
	{@html _jsonLdScript}
</svelte:head>

<div class="flex min-h-dvh flex-col bg-page text-fg">
	<header
		class="cv-chrome flex flex-wrap items-center justify-between gap-3 border-b border-border bg-page/80 px-4 py-3 backdrop-blur-md lg:px-8"
	>
		<a
			class="flatten-toggle inline-flex h-9 items-center gap-2 rounded-full border border-border bg-popover px-3 text-xs leading-none text-fg-muted outline-hidden transition hover:border-accent hover:text-fg focus-visible:ring-2 focus-visible:ring-accent"
			aria-label={tr('scatterTitle')}
			href={locale === 'en' ? '/' : `/?lang=${locale}`}
			title={tr('scatterTitle')}
		>
			<svg
				class="h-4 w-4 shrink-0"
				aria-hidden="true"
				fill="none"
				viewBox="0 0 16 16"
				xmlns="http://www.w3.org/2000/svg"
			>
				<circle cx="3" cy="4" fill="currentColor" r="1.4" />
				<circle cx="12" cy="3" fill="currentColor" r="1.4" />
				<circle cx="8" cy="8" fill="currentColor" r="1.4" />
				<circle cx="4" cy="12" fill="currentColor" r="1.4" />
				<circle cx="13" cy="13" fill="currentColor" r="1.4" />
			</svg>
			<span>{tr('scatter')}</span>
		</a>

		<div class="flex flex-wrap items-center gap-2">
			<nav class="flex items-center gap-1" aria-label={tr('langNav')}>
				{#each localeNav as l (l.code)}
					<a
						class="inline-flex h-9 items-center rounded-full border px-3 text-xs leading-none transition focus-visible:ring-2 focus-visible:ring-accent {l.code ===
						locale
							? 'border-accent bg-accent-soft font-bold text-fg'
							: 'border-border bg-popover text-fg-muted hover:border-accent hover:text-fg'}"
						aria-current={l.code === locale ? 'page' : undefined}
						href={l.href}
					>
						{l.label}
					</a>
				{/each}
			</nav>
			<ThemeToggle />
			{#if person.cvUrl}
				<a
					class="inline-flex h-9 items-center rounded-full border border-border bg-popover px-3 text-xs leading-none text-fg-muted transition hover:border-accent hover:text-fg focus-visible:ring-2 focus-visible:ring-accent"
					href={person.cvUrl}
					rel="noopener noreferrer"
					target="_blank"
				>
					{tr('downloadPdf')}
				</a>
			{/if}
		</div>
	</header>

	<main class="mx-auto w-full max-w-3xl flex-1 px-4 py-10 lg:px-0">
		<article>
			<header class="mb-10">
				<h1 class="text-2xl font-extrabold tracking-tight text-balance">{person.name}</h1>
				<p class="mt-1 text-sm font-semibold text-accent">
					{pick(person.title)}
				</p>
				<p class="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-fg-muted">
					<a class="text-link underline-offset-2 hover:underline" href={`mailto:${person.email}`}>
						{person.email}
					</a>
					{#each person.links as link (link.href)}
						<a
							class="text-link underline-offset-2 hover:underline"
							href={link.href}
							rel="noopener noreferrer"
							target="_blank"
						>
							{pick(link.label)}
						</a>
					{/each}
				</p>
				<p class="mt-4 max-w-[65ch] text-sm leading-relaxed text-fg-muted">
					{pick(person.tagline)}
				</p>
				<p class="cv-chrome mt-3 text-xs text-fg-faint italic">
					{tr('hint')}
					<a class="text-link underline-offset-2 hover:underline" href="/">ventilii.dev</a>
				</p>
			</header>

			<section class="mb-10">
				<h2
					class="mb-4 border-b border-border pb-1 text-xs font-bold tracking-[0.14em] text-accent uppercase"
				>
					{category('experience').label}
				</h2>
				<div class="flex flex-col gap-7">
					{#each experiences as exp (exp.id)}
						<section>
							<h3 class="text-sm font-bold">
								{pick(exp.role)} · {pick(exp.company)}
							</h3>
							<p class="mt-0.5 text-xs text-fg-subtle">
								{pick(exp.dates)} · {pick(exp.location)}
							</p>
							<p class="mt-2 max-w-[70ch] text-sm leading-relaxed text-fg-muted">
								{pick(exp.summary)}
							</p>
							{#if exp.highlights.length > 0}
								<ul class="mt-2 flex list-disc flex-col gap-1 pl-5 text-sm text-fg-muted">
									{#each exp.highlights as h, i (i)}
										<li class="max-w-[70ch] leading-relaxed">{pick(h)}</li>
									{/each}
								</ul>
							{/if}
							{#if exp.links?.length}
								<p class="mt-2 flex flex-wrap gap-x-4 text-xs">
									{#each exp.links as link (link.href)}
										<a
											class="text-link underline-offset-2 hover:underline"
											href={link.href}
											rel="noopener noreferrer"
											target="_blank"
										>
											{pick(link.label)}
										</a>
									{/each}
								</p>
							{/if}
							{#if exp.stackIds?.length}
								<p class="mt-2 flex flex-wrap gap-1.5">
									{#each exp.stackIds as id (id)}
										<span
											class="rounded-full border border-border-muted bg-card px-2 py-0.5 text-[0.625rem] text-fg-subtle"
										>
											{techLabel(id)}
										</span>
									{/each}
								</p>
							{/if}
						</section>
					{/each}
				</div>
			</section>

			<section class="mb-10">
				<h2
					class="mb-4 border-b border-border pb-1 text-xs font-bold tracking-[0.14em] text-accent uppercase"
				>
					{category('projects').label}
				</h2>
				<div class="flex flex-col gap-6">
					{#each projects as project (project.id)}
						<section>
							<h3 class="text-sm font-bold">{pick(project.title)}</h3>
							<p class="mt-1 max-w-[70ch] text-sm leading-relaxed text-fg-muted">
								{pick(project.summary)}
							</p>
							{#if project.highlights?.length}
								<ul class="mt-1.5 flex list-disc flex-col gap-1 pl-5 text-sm text-fg-muted">
									{#each project.highlights as h, i (i)}
										<li class="max-w-[70ch] leading-relaxed">{pick(h)}</li>
									{/each}
								</ul>
							{/if}
							{#if project.note}
								<p class="mt-1.5 max-w-[70ch] text-xs text-fg-faint italic">{pick(project.note)}</p>
							{/if}
							{#if (project.links?.length ?? 0) > 0 || (project.stackIds?.length ?? 0) > 0}
								<p class="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs">
									{#each project.links ?? [] as link (link.href)}
										<a
											class="text-link underline-offset-2 hover:underline"
											href={link.href}
											rel="noopener noreferrer"
											target="_blank"
										>
											{pick(link.label)}
										</a>
									{/each}
									{#each project.stackIds ?? [] as id (id)}
										<span
											class="rounded-full border border-border-muted bg-card px-2 py-0.5 text-[0.625rem] text-fg-subtle"
										>
											{techLabel(id)}
										</span>
									{/each}
								</p>
							{/if}
						</section>
					{/each}
				</div>

				{#if portfolioData.orgHighlights.length > 0}
					<h3 class="mt-8 mb-2 text-xs font-bold tracking-[0.1em] text-fg-subtle uppercase">
						{tr('orgs')}
					</h3>
					<ul class="flex flex-col gap-1.5 text-sm text-fg-muted">
						{#each portfolioData.orgHighlights as org (org.url)}
							<li class="max-w-[70ch] leading-relaxed">
								<a
									class="text-link underline-offset-2 hover:underline"
									href={org.url}
									rel="noopener noreferrer"
									target="_blank"
								>
									{org.name}
								</a>
								· {pick(org.note)}
							</li>
						{/each}
					</ul>
				{/if}
			</section>

			<section class="mb-10">
				<h2
					class="mb-4 border-b border-border pb-1 text-xs font-bold tracking-[0.14em] text-accent uppercase"
				>
					{category('stack').label}
				</h2>
				<div class="flex flex-col gap-4">
					{#each technologies as tech (tech.id)}
						<section>
							<h3 class="text-sm font-bold">{pick(tech.label)}</h3>
							<p class="mt-0.5 max-w-[70ch] text-sm leading-relaxed text-fg-muted">
								{pick(tech.blurb)}
								{#if tech.yearsHint}
									<span class="text-fg-subtle">{pick(tech.yearsHint)}</span>
								{/if}
							</p>
						</section>
					{/each}
				</div>
			</section>

			<section class="mb-10">
				<h2
					class="mb-4 border-b border-border pb-1 text-xs font-bold tracking-[0.14em] text-accent uppercase"
				>
					{category('education').label}
				</h2>
				<div class="flex flex-col gap-4">
					{#each education as edu (edu.id)}
						<section>
							<h3 class="text-sm font-bold">{pick(edu.institution)}</h3>
							<ul class="mt-1 flex flex-col gap-1 text-sm text-fg-muted">
								{#each edu.degrees as degree, i (i)}
									<li class="max-w-[70ch] leading-relaxed">
										{pick(degree.label)} ({pick(degree.dates)}){#if degree.note}
											· {pick(degree.note)}{/if}
									</li>
								{/each}
							</ul>
						</section>
					{/each}
				</div>
			</section>

			<section class="mb-10">
				<h2
					class="mb-4 border-b border-border pb-1 text-xs font-bold tracking-[0.14em] text-accent uppercase"
				>
					{category('languages').label}
				</h2>
				<ul class="flex flex-col gap-1 text-sm text-fg-muted">
					{#each languages as lang (lang.id)}
						<li>{pick(lang.label)} · {pick(lang.level)}</li>
					{/each}
				</ul>
			</section>

			<section class="mb-10">
				<h2
					class="mb-4 border-b border-border pb-1 text-xs font-bold tracking-[0.14em] text-accent uppercase"
				>
					{category('about').label}
				</h2>
				<div class="flex flex-col gap-4">
					{#each about as block (block.id)}
						<section>
							<h3 class="text-sm font-bold">{pick(block.title)}</h3>
							<p class="mt-0.5 max-w-[70ch] text-sm leading-relaxed text-fg-muted">
								{pick(block.body)}
							</p>
						</section>
					{/each}
				</div>
			</section>
		</article>
	</main>

	<footer class="cv-chrome border-t border-border px-4 py-6 text-center text-xs text-fg-faint">
		<a class="text-link underline-offset-2 hover:underline" href="/">ventilii.dev</a>
		· <a class="text-link underline-offset-2 hover:underline" href={cvPath('en')}>EN</a>
		· <a class="text-link underline-offset-2 hover:underline" href={cvPath('it')}>IT</a>
		· <a class="text-link underline-offset-2 hover:underline" href={cvPath('pt')}>PT</a>
	</footer>
</div>

<style lang="postcss">
	@media print {
		.cv-chrome {
			display: none;
		}
	}
</style>
