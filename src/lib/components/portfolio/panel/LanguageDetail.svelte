<script lang="ts">
	import { pickLocale } from '$lib/portfolio/locale';
	import type { Locale } from '$lib/portfolio/types';
	import type { LanguageEntry } from '$lib/portfolio/types';
	import PanelEyebrow from '$lib/components/ui/PanelEyebrow.svelte';

	interface Props {
		entry: LanguageEntry;
		locale: Locale;
		sectionEyebrow: string;
		uiCopyNote: string;
	}

	let { entry, locale, sectionEyebrow, uiCopyNote }: Props = $props();
</script>

<div class="space-y-2 animate-fade">
	<PanelEyebrow text={sectionEyebrow} />
	<h2 class="text-xl font-bold text-fg">{pickLocale(entry.label, locale)}</h2>
	<p class="text-sm text-fg-muted">{pickLocale(entry.level, locale)}</p>
	<p class="text-xs text-fg-subtle">{uiCopyNote}</p>
</div>
