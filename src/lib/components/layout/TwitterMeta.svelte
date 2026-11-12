<script lang="ts">
	import { OG_IMAGE, OG_IMAGE_ALT } from '#lib/utils/seo.utils.ts';
</script>

<!-- The large-image card with the social-share banner, the same on every page: render inside <svelte:head>. -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content={OG_IMAGE} />
<meta name="twitter:image:alt" content={OG_IMAGE_ALT} />
