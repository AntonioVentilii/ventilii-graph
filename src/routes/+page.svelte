<script lang="ts">
	import PortfolioApp from '$lib/components/PortfolioApp.svelte';
	import { portfolioData } from '$lib/services/portfolio.services';
	import { PERSON_KNOWS_ABOUT, absoluteUrl, serializeSchema } from '$lib/utils/seo.utils';

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
	<meta content={absoluteUrl(portfolioData.person.avatarUrl)} property="og:image" />
	<meta name="twitter:card" content="summary" />

	<!-- eslint-disable-next-line svelte/no-at-html-tags -- serializeSchema escapes <, >, & -->
	{@html _jsonLdScript}
</svelte:head>

<PortfolioApp />
