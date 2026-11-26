<script lang="ts">
	import VisitApp from '#lib/components/visit/VisitApp.svelte';
	import { SITE_AUTHOR } from '#lib/utils/seo.utils.ts';
	import { VISIT_COPY } from '#lib/utils/visit-copy.utils.ts';
	import type { VisitRecipient } from '#lib/utils/visit-recipients.utils.ts';

	interface Props {
		data: { recipient: VisitRecipient };
	}

	let { data }: Props = $props();
</script>

<!-- A page for one reader: kept out of search engines and the sitemap. -->
<svelte:head>
	<title>{VISIT_COPY.coverTitle} · {SITE_AUTHOR}</title>
	<meta name="description" content={VISIT_COPY.metaDescription} />
	<meta name="robots" content="noindex, nofollow" />
	<meta name="author" content={SITE_AUTHOR} />
</svelte:head>

<VisitApp recipient={data.recipient} />
