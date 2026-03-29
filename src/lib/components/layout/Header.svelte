<script lang="ts">
	import HeaderActions from '$lib/components/layout/HeaderActions.svelte';
	import SkipToContent from '$lib/components/layout/SkipToContent.svelte';
	import Search from '$lib/components/ui/Search.svelte';
	import type { Locale } from '$lib/types/portfolio.types';
	import type { Leaf } from '$lib/utils/leaf.utils';

	interface Props {
		locale: Locale;
		skipLabel: string;
		cvFallbackLabel: string;
		langLabel: string;
		onSelectLeaf: (leaf: Leaf) => void;
		labels: {
			placeholder: string;
			shortcut: string;
		};
	}

	let {
		locale = $bindable(),
		skipLabel,
		cvFallbackLabel,
		langLabel,
		onSelectLeaf,
		labels
	}: Props = $props();
</script>

<SkipToContent label={skipLabel} />

<header
	class="border-border bg-page/80 flex flex-wrap items-center justify-between gap-4 border-b px-4 py-3 backdrop-blur-md lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-3 lg:px-8"
>
	<div class="flex min-w-0 flex-1 items-center justify-start">
		<Search
			{locale}
			onSelect={onSelectLeaf}
			placeholder={labels.placeholder}
			shortcut={labels.shortcut}
		/>
	</div>

	<div class="hidden lg:flex lg:justify-center">
		<!-- Optional brand/logo area could go here, currently empty for focus on graph -->
	</div>

	<div class="flex items-center justify-end">
		<HeaderActions {cvFallbackLabel} {langLabel} bind:locale />
	</div>
</header>
