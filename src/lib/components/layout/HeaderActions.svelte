<script lang="ts">
	import { Github, Sparkles } from 'lucide-svelte';
	import FlattenToggle from '$lib/components/layout/FlattenToggle.svelte';
	import LocaleSelect from '$lib/components/layout/LocaleSelect.svelte';
	import ThemeToggle from '$lib/components/layout/ThemeToggle.svelte';
	import type { Locale } from '$lib/types/portfolio.types';

	interface Props {
		locale: Locale;
		cvFallbackLabel: string;
		langLabel: string;
		flatten: { href: string; label: string; title: string; onFlatten: () => void };
		ask: { href: string; label: string };
	}

	let { locale = $bindable(), cvFallbackLabel, langLabel, flatten, ask }: Props = $props();
</script>

<div class="flex flex-wrap items-center gap-2">
	<a
		class="inline-flex h-9 w-9 items-center justify-center gap-2 rounded-full border border-accent/50 bg-accent-soft text-xs leading-none font-bold text-fg outline-hidden transition hover:border-accent focus-visible:ring-2 focus-visible:ring-accent sm:w-auto sm:px-3"
		aria-label={ask.label}
		href={ask.href}
		title={ask.label}
	>
		<Sparkles class="text-accent" aria-hidden="true" size={14} strokeWidth={2} />
		<span class="hidden sm:inline">{ask.label}</span>
	</a>
	<FlattenToggle
		href={flatten.href}
		label={flatten.label}
		onFlatten={flatten.onFlatten}
		title={flatten.title}
	/>
	<ThemeToggle />
	<a
		class="hidden h-9 w-9 items-center justify-center rounded-full border border-border bg-popover text-fg-muted outline-hidden transition hover:border-accent hover:text-fg focus-visible:ring-2 focus-visible:ring-accent sm:inline-flex"
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
