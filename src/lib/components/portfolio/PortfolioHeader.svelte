<script lang="ts">
	import type { Locale } from '$lib/portfolio/types';
	import ThemeToggle from '$lib/components/ui/ThemeToggle.svelte';

	interface Props {
		locale: Locale;
		skipLabel: string;
		cvFallbackLabel: string;
		langLabel: string;
	}

	let { locale = $bindable(), skipLabel, cvFallbackLabel, langLabel }: Props = $props();
</script>

<a
	href="#detail-panel"
	class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-fg"
>
	{skipLabel}
</a>

<header
	class="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-page/80 px-4 py-4 backdrop-blur-md md:px-8"
>
	<p class="text-xs uppercase tracking-widest text-fg-subtle">Antonio Ventilii — graph portfolio</p>
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
		<label class="flex items-center gap-2 text-xs text-fg-subtle">
			<span class="sr-only">{langLabel}</span>
			<select
				bind:value={locale}
				class="rounded-full border border-border bg-popover px-2 py-1.5 text-fg"
			>
				<option value="en">EN</option>
				<option value="it">IT</option>
			</select>
		</label>
	</div>
</header>
