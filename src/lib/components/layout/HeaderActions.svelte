<script lang="ts">
	import { Sparkles } from '@lucide/svelte';
	import Github from '#lib/components/icons/GithubIcon.svelte';
	import AccentPillLink from '#lib/components/layout/AccentPillLink.svelte';
	import FlattenToggle from '#lib/components/layout/FlattenToggle.svelte';
	import LocaleSelect from '#lib/components/layout/LocaleSelect.svelte';
	import ThemeToggle from '#lib/components/layout/ThemeToggle.svelte';
	import type { Locale } from '#lib/types/portfolio.types.ts';

	interface Props {
		locale: Locale;
		cvFallbackLabel: string;
		flatten: { href: string; label: string; title: string; onFlatten: () => void };
		ask: { href: string; label: string; title: string };
	}

	let { locale = $bindable(), cvFallbackLabel, flatten, ask }: Props = $props();
</script>

<div class="flex flex-wrap items-center gap-2">
	<AccentPillLink href={ask.href} icon={Sparkles} label={ask.label} title={ask.title} />
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
	<LocaleSelect bind:locale />
</div>
