<script lang="ts">
	import AskApp from '#lib/components/ai/AskApp.svelte';
	import OgImageMeta from '#lib/components/layout/OgImageMeta.svelte';
	import TwitterMeta from '#lib/components/layout/TwitterMeta.svelte';
	import { SITE_AUTHOR, absoluteUrl } from '#lib/utils/seo.utils.ts';

	// Locale is a client-side choice (?lang=), so the prerendered head carries
	// the English metadata; AskApp swaps <title> and description on the client.
	const title = 'Ask the AI version · Antonio Ventilii';
	const description =
		'An AI that has read Antonio Ventilii’s whole portfolio: ask what he has built, check how he fits a job posting, or get a short tailored presentation. Instructed to state gaps, not to sell.';
</script>

<svelte:head>
	<link href={absoluteUrl('/ask/')} rel="canonical" />
	<meta content={title} property="og:title" />
	<meta content={description} property="og:description" />
	<meta content="website" property="og:type" />
	<meta content={absoluteUrl('/ask/')} property="og:url" />
	<OgImageMeta />
	<meta name="author" content={SITE_AUTHOR} />
	<TwitterMeta />
</svelte:head>

<AskApp />
