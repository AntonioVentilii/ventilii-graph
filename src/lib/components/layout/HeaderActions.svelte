<script lang="ts">
	import type { Locale } from '$lib/portfolio/types';
	import ThemeToggle from './ThemeToggle.svelte';
	import LocaleSelect from './LocaleSelect.svelte';

	interface Props {
		locale: Locale;
		cvFallbackLabel: string;
		langLabel: string;
	}

	let { locale = $bindable(), cvFallbackLabel, langLabel }: Props = $props();
</script>

<div class="flex flex-wrap items-center gap-2">
	<ThemeToggle />
	<a
		href="https://github.com/AntonioVentilii?tab=repositories"
		class="rounded-full border border-border bg-popover px-3 py-1.5 text-xs text-fg-muted transition hover:border-accent hover:text-fg"
		target="_blank"
		rel="noopener noreferrer"
	>
		{cvFallbackLabel}
	</a>
	<LocaleSelect bind:locale {langLabel} />
</div>
