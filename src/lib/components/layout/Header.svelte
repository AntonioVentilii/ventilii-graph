<script lang="ts">
	import type { Locale } from '$lib/portfolio/types';
	import SkipToContent from './SkipToContent.svelte';
	import HeaderActions from './HeaderActions.svelte';

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
	class="flex flex-wrap items-center justify-end gap-3 border-b border-border bg-page/80 px-4 py-4 backdrop-blur-md md:px-8"
>
	<HeaderActions bind:locale {cvFallbackLabel} {langLabel} />
</header>
