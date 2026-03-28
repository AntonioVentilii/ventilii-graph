<script lang="ts">
	import PanelEyebrow from '$lib/components/ui/PanelEyebrow.svelte';
	import { pickLocale } from '$lib/portfolio/locale';
	import type { Locale, LanguageEntry } from '$lib/portfolio/types';

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
	<h2 class="text-fg text-xl font-bold">{pickLocale({ text: entry.label, locale })}</h2>
	<p class="text-fg-muted text-sm">{pickLocale({ text: entry.level, locale })}</p>
	<p class="text-fg-subtle text-xs">{uiCopyNote}</p>
</div>
