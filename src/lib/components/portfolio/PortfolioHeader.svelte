<script lang="ts">
	import type { Locale } from '$lib/portfolio/types';

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
	class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-brand-600 focus:px-3 focus:py-2 focus:text-white"
>
	{skipLabel}
</a>

<header
	class="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/80 px-4 py-4 md:px-8"
>
	<p class="text-xs uppercase tracking-widest text-zinc-500">Antonio Ventilii — graph portfolio</p>
	<div class="flex flex-wrap items-center gap-2">
		<a
			href="https://github.com/AntonioVentilii?tab=repositories"
			class="rounded-full border border-zinc-700 bg-zinc-900/80 px-3 py-1.5 text-xs text-zinc-300 hover:border-brand-500 hover:text-white"
			target="_blank"
			rel="noopener noreferrer"
		>
			{cvFallbackLabel}
		</a>
		<label class="flex items-center gap-2 text-xs text-zinc-400">
			<span class="sr-only">{langLabel}</span>
			<select
				bind:value={locale}
				class="rounded-full border border-zinc-700 bg-zinc-900/80 px-2 py-1.5 text-zinc-200"
			>
				<option value="en">EN</option>
				<option value="it">IT</option>
			</select>
		</label>
	</div>
</header>
