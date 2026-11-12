<script lang="ts">
	import OgImageMeta from '#lib/components/layout/OgImageMeta.svelte';
	import TwitterMeta from '#lib/components/layout/TwitterMeta.svelte';
	import {
		SITE_AUTHOR,
		SITE_AUTHOR_URL,
		SITE_MODIFIED_TIME,
		SITE_PUBLISHED_TIME
	} from '#lib/utils/seo.utils.ts';

	let { jsonLdScript }: { jsonLdScript: string } = $props();
</script>

<!--
	The part of <svelte:head> the map and the CV share: the social-share banner,
	the author and the content dates, the large-image card and the page's
	JSON-LD, already serialised with serializeSchema. Render inside <svelte:head>.
-->
<OgImageMeta />
<meta name="author" content={SITE_AUTHOR} />
<meta content={SITE_AUTHOR_URL} property="article:author" />
<meta content={SITE_PUBLISHED_TIME} property="article:published_time" />
<meta content={SITE_MODIFIED_TIME} property="article:modified_time" />
<TwitterMeta />

<!-- eslint-disable-next-line svelte/no-at-html-tags -- serializeSchema escapes <, >, & -->
{@html jsonLdScript}
