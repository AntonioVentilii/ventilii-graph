<script lang="ts">
	import EntryHeader from '$lib/components/ui/EntryHeader.svelte';
	import PanelEyebrow from '$lib/components/ui/PanelEyebrow.svelte';
	import type { Locale, AboutBlock } from '$lib/types/portfolio.types';
	import { pickLocale } from '$lib/utils/locale.utils';

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

	<EntryHeader title={pickLocale({ text: block.title, locale })} />

	<p class="text-fg-muted text-sm leading-relaxed">{pickLocale({ text: block.body, locale })}</p>
</div>
