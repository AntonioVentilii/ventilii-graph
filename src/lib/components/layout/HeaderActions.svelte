<script lang="ts">
	import { Github } from 'lucide-svelte';
	import LocaleSelect from '$lib/components/layout/LocaleSelect.svelte';
	import ThemeToggle from '$lib/components/layout/ThemeToggle.svelte';
	import type { Locale } from '$lib/types/portfolio.types';

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
		class="border-border bg-popover text-fg-muted hover:border-accent hover:text-fg inline-flex h-9 w-9 items-center justify-center rounded-full border transition"
		aria-label={cvFallbackLabel}
		href="https://github.com/AntonioVentilii?tab=repositories"
		rel="noopener noreferrer"
		target="_blank"
		title={cvFallbackLabel}
	>
		<Github size={16} strokeWidth={2} />
	</a>
	<LocaleSelect {langLabel} bind:locale />
</div>
