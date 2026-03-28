<script lang="ts">
	import PanelEyebrow from '$lib/components/ui/PanelEyebrow.svelte';
	import { pickLocale } from '$lib/portfolio/locale';
	import type { Locale, AboutBlock } from '$lib/portfolio/types';

	interface Props {
		block: AboutBlock;
		locale: Locale;
		sectionEyebrow?: string;
	}

	let { block, locale, sectionEyebrow }: Props = $props();
</script>

<div class="animate-fade space-y-3">
	{#if sectionEyebrow}
		<PanelEyebrow text={sectionEyebrow} />
	{/if}
	<h2 class="text-fg text-xl font-bold">{pickLocale({ text: block.title, locale })}</h2>
	<p class="text-fg-muted text-sm leading-relaxed">{pickLocale({ text: block.body, locale })}</p>
</div>
