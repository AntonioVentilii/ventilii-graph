<script lang="ts">
	import { pickLocale } from '$lib/portfolio/locale';
	import type { Locale } from '$lib/portfolio/types';
	import type { Education } from '$lib/portfolio/types';
	import PanelEyebrow from '$lib/components/ui/PanelEyebrow.svelte';

	interface Props {
		entry: Education;
		locale: Locale;
		sectionEyebrow: string;
	}

	let { entry, locale, sectionEyebrow }: Props = $props();
</script>

<div class="space-y-3 animate-fade">
	<PanelEyebrow text={sectionEyebrow} />
	<h2 class="text-xl font-bold text-white">{pickLocale(entry.institution, locale)}</h2>
	<p class="text-sm text-zinc-300">{pickLocale(entry.degree, locale)}</p>
	<p class="text-xs text-zinc-500">{pickLocale(entry.dates, locale)}</p>
	{#if entry.note}
		<p class="text-sm text-zinc-400">{pickLocale(entry.note, locale)}</p>
	{/if}
</div>
