<script lang="ts">
	import AskApp from '#lib/components/ai/AskApp.svelte';
	import OgImageMeta from '#lib/components/layout/OgImageMeta.svelte';
	import TwitterMeta from '#lib/components/layout/TwitterMeta.svelte';
	import { ASK_COPY } from '#lib/utils/ask-copy.utils.ts';
	import { SITE_AUTHOR, absoluteUrl } from '#lib/utils/seo.utils.ts';

	// Locale is a client-side choice (?lang=), so the prerendered head carries
	// the English metadata; AskApp swaps <title> and description on the client.
	const title = ASK_COPY.metaTitle.en;
	const description = ASK_COPY.metaDescription.en;
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
