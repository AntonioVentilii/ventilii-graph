<script lang="ts">
	import EntryHeader from '$lib/components/ui/EntryHeader.svelte';
	import PanelEyebrow from '$lib/components/ui/PanelEyebrow.svelte';
	import type { Locale, Education } from '$lib/types/portfolio.types';
	import { pickLocale } from '$lib/utils/locale.utils';

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

	<EntryHeader
		meta={pickLocale({ text: entry.dates, locale })}
		subtitle={pickLocale({ text: entry.degree, locale })}
		title={pickLocale({ text: entry.institution, locale })}
	/>

	{#if entry.note}
		<p class="text-sm text-fg-muted">{pickLocale({ text: entry.note, locale })}</p>
	{/if}
</div>
