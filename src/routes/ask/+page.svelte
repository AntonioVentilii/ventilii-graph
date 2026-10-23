<script lang="ts">
	import AskApp from '$lib/components/ai/AskApp.svelte';
	import {
		OG_IMAGE,
		OG_IMAGE_ALT,
		OG_IMAGE_HEIGHT,
		OG_IMAGE_WIDTH,
		SITE_AUTHOR,
		absoluteUrl
	} from '$lib/utils/seo.utils';

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
	<meta content={OG_IMAGE} property="og:image" />
	<meta content={OG_IMAGE_WIDTH} property="og:image:width" />
	<meta content={OG_IMAGE_HEIGHT} property="og:image:height" />
	<meta name="author" content={SITE_AUTHOR} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content={OG_IMAGE} />
	<meta name="twitter:image:alt" content={OG_IMAGE_ALT} />
</svelte:head>

<AskApp />
