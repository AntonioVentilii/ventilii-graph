<script lang="ts">
	import PortfolioApp from '$lib/components/PortfolioApp.svelte';
</script>

<!-- SEO metadata lives in app.html: with `ssr = false` this head is injected
     client-side only, so scrapers that don't run JS would never see it. -->
<svelte:head>
	<title>Antonio Ventilii | Senior Software Engineer (Portfolio)</title>
</svelte:head>

<PortfolioApp />
