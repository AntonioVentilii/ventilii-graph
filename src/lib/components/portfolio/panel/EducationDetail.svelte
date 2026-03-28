<script lang="ts">
	import PanelEyebrow from '$lib/components/ui/PanelEyebrow.svelte';
	import { pickLocale } from '$lib/portfolio/locale';
	import type { Locale, Education } from '$lib/portfolio/types';

	interface Props {
		entry: Education;
		locale: Locale;
		sectionEyebrow?: string;
	}

	let { entry, locale, sectionEyebrow }: Props = $props();
</script>

<div class="animate-fade space-y-3">
	{#if sectionEyebrow}
		<PanelEyebrow text={sectionEyebrow} />
	{/if}
	<h2 class="text-fg text-xl font-bold">{pickLocale({ text: entry.institution, locale })}</h2>
	<p class="text-fg-muted text-sm">{pickLocale({ text: entry.degree, locale })}</p>
	<p class="text-fg-subtle text-xs">{pickLocale({ text: entry.dates, locale })}</p>
	{#if entry.note}
		<p class="text-fg-muted text-sm">{pickLocale({ text: entry.note, locale })}</p>
	{/if}
</div>
