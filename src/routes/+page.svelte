<script lang="ts">
	import PortfolioApp from '$lib/components/PortfolioApp.svelte';
	import { portfolioData } from '$lib/services/portfolio.services';

	const _jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: portfolioData.person.name,
		jobTitle: 'Senior Software Engineer',
		url: 'https://ventilii-graph.com', // Replace with actual domain if known
		image: `https://ventilii-graph.com${portfolioData.person.avatarUrl}`,
		sameAs: portfolioData.person.links.map((l) => l.href),
		description: 'Senior Software Engineer specializing in TypeScript, Rust, and Python.',
		knowsAbout: portfolioData.technologies.map((t) => t.label.en)
	};
</script>

<svelte:head>
	<title>Antonio Ventilii — Senior Software Engineer (Portfolio)</title>
	<meta
		name="description"
		content="Interactive career map: experience, projects, stack, and education. Senior Software Engineer specializing in TypeScript, Rust, and Finance / Web3 systems."
	/>
	<meta content="Antonio Ventilii — Portfolio" property="og:title" />
	<meta
		content="Interactive career map and project showcase for Antonio Ventilii, Senior Software Engineer."
		property="og:description"
	/>
	<meta content="website" property="og:type" />

	<script type="application/ld+json">
		{JSON.stringify(_jsonLd)}
	</script>
</svelte:head>

<PortfolioApp />
