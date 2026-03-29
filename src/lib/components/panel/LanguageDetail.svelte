<script lang="ts">
	import EntryHeader from '$lib/components/ui/EntryHeader.svelte';
	import PanelEyebrow from '$lib/components/ui/PanelEyebrow.svelte';
	import type { Locale, LanguageEntry } from '$lib/types/portfolio.types';
	import { pickLocale } from '$lib/utils/locale.utils';

	interface Props {
		entry: LanguageEntry;
		locale: Locale;
		sectionEyebrow?: string;
		uiCopyNote: string;
	}

	let { entry, locale, sectionEyebrow, uiCopyNote }: Props = $props();
</script>

<div class="animate-fade space-y-2">
	{#if sectionEyebrow}
		<PanelEyebrow text={sectionEyebrow} />
	{/if}

	<EntryHeader
		subtitle={pickLocale({ text: entry.level, locale })}
		title={pickLocale({ text: entry.label, locale })}
	/>

	<p class="text-xs text-fg-subtle">{uiCopyNote}</p>
</div>
