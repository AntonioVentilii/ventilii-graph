<script lang="ts">
	import EntryHeader from '$lib/components/ui/EntryHeader.svelte';
	import PanelEyebrow from '$lib/components/ui/PanelEyebrow.svelte';
	import type { Locale, LanguageEntry } from '$lib/types/portfolio.types';
	import { pickLocale } from '$lib/utils/locale.utils';

	interface Props {
		entry: LanguageEntry;
		locale: Locale;
		sectionEyebrow?: string;
	}

	let { entry, locale, sectionEyebrow }: Props = $props();
</script>

<div class="animate-fade space-y-2">
	{#if sectionEyebrow}
		<PanelEyebrow text={sectionEyebrow} />
	{/if}

	<EntryHeader
		subtitle={pickLocale({ text: entry.level, locale })}
		title={pickLocale({ text: entry.label, locale })}
	/>
</div>
