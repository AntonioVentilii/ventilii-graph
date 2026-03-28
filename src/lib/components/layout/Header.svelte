<script lang="ts">
	import HeaderActions from '$lib/components/layout/HeaderActions.svelte';
	import SkipToContent from '$lib/components/layout/SkipToContent.svelte';
	import type { Locale } from '$lib/portfolio/types';

	interface Props {
		locale: Locale;
		skipLabel: string;
		cvFallbackLabel: string;
		langLabel: string;
	}

	let { locale = $bindable(), skipLabel, cvFallbackLabel, langLabel }: Props = $props();
</script>

<SkipToContent label={skipLabel} />

<header
	class="border-border bg-page/80 flex flex-wrap items-center justify-end gap-3 border-b px-4 py-4 backdrop-blur-md lg:px-8"
>
	<HeaderActions {cvFallbackLabel} {langLabel} bind:locale />
</header>
