<script lang="ts">
	import { pickLocale } from '$lib/portfolio/locale';
	import type { Locale } from '$lib/portfolio/types';
	import type { AboutBlock } from '$lib/portfolio/types';
	import PanelEyebrow from '$lib/components/ui/PanelEyebrow.svelte';

	interface Props {
		block: AboutBlock;
		locale: Locale;
		sectionEyebrow: string;
	}

	let { block, locale, sectionEyebrow }: Props = $props();
</script>

<div class="space-y-3 animate-fade">
	<PanelEyebrow text={sectionEyebrow} />
	<h2 class="text-xl font-bold text-fg">{pickLocale(block.title, locale)}</h2>
	<p class="text-sm leading-relaxed text-fg-muted">{pickLocale(block.body, locale)}</p>
</div>
