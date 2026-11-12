<script lang="ts">
	import PortfolioApp from '#lib/components/PortfolioApp.svelte';
	import OgImageMeta from '#lib/components/layout/OgImageMeta.svelte';
	import TwitterMeta from '#lib/components/layout/TwitterMeta.svelte';
	import { portfolioData } from '#lib/services/portfolio.services.ts';
	import {
		PERSON_KNOWS_ABOUT,
		SITE_AUTHOR,
		SITE_AUTHOR_URL,
		SITE_MODIFIED_TIME,
		SITE_PUBLISHED_TIME,
		absoluteUrl,
		serializeSchema
	} from '#lib/utils/seo.utils.ts';

	const _jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: portfolioData.person.name,
		jobTitle: 'Senior Software Engineer',
		url: absoluteUrl('/'),
		image: absoluteUrl(portfolioData.person.avatarUrl),
		sameAs: portfolioData.person.links.map((l) => l.href),
		description:
			'Senior Software Engineer. AI-native development with coding agents, agent skills, and MCP connectors, plus production TypeScript, Rust, and Python.',
		knowsAbout: PERSON_KNOWS_ABOUT,
		worksFor: {
			'@type': 'Organization',
			name: 'DFINITY Foundation',
			url: 'https://dfinity.org'
		},
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Zurich',
			addressCountry: 'CH'
		},
		hasOccupation: {
			'@type': 'Occupation',
			name: 'Senior Software Engineer',
			skills: PERSON_KNOWS_ABOUT.join(', ')
		}
	};

	const _jsonLdString = serializeSchema(_jsonLd);
	// Svelte renders <script> tag content in markup as raw text, so inject via @html
	const _jsonLdScript = `<script type="application/ld+json">${_jsonLdString}</${''}script>`;
</script>

<svelte:head>
	<title>Antonio Ventilii | AI-Native Senior Software Engineer</title>
	<meta
		name="description"
		content="Interactive career map of Antonio Ventilii, Senior Software Engineer: AI-native development with coding agents, agent skills, and MCP connectors, plus production TypeScript, Rust, Svelte, and Python across Web3 and finance."
	/>
	<link href={absoluteUrl('/')} rel="canonical" />
	<meta content="Antonio Ventilii | AI-Native Senior Software Engineer" property="og:title" />
	<meta
		content="Interactive career map: AI agent orchestration, experience, projects, stack, and education of a hands-on Senior Software Engineer."
		property="og:description"
	/>
	<meta content="website" property="og:type" />
	<meta content={absoluteUrl('/')} property="og:url" />
	<OgImageMeta />
	<meta name="author" content={SITE_AUTHOR} />
	<meta content={SITE_AUTHOR_URL} property="article:author" />
	<meta content={SITE_PUBLISHED_TIME} property="article:published_time" />
	<meta content={SITE_MODIFIED_TIME} property="article:modified_time" />
	<TwitterMeta />

	<!-- eslint-disable-next-line svelte/no-at-html-tags -- serializeSchema escapes <, >, & -->
	{@html _jsonLdScript}
</svelte:head>

<PortfolioApp />
