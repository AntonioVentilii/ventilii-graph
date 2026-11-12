<script lang="ts">
	import { OG_IMAGE, OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from '#lib/utils/seo.utils.ts';
</script>

<!-- The social-share banner, the same on every page: render inside <svelte:head>. -->
<meta content={OG_IMAGE} property="og:image" />
<meta content={OG_IMAGE_WIDTH} property="og:image:width" />
<meta content={OG_IMAGE_HEIGHT} property="og:image:height" />
