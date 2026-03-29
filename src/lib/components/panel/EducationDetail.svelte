<script lang="ts">
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

<div class="animate-fade space-y-5">
	{#if sectionEyebrow}
		<PanelEyebrow text={sectionEyebrow} />
	{/if}

	<div class="space-y-1">
		<h2 class="text-lg font-bold tracking-tight text-fg">
			{pickLocale({ text: entry.institution, locale })}
		</h2>
	</div>

	<div class="space-y-6">
		{#each entry.degrees as d (d.label.en)}
			<div class="space-y-2">
				<div class="flex flex-col gap-1">
					<h3 class="font-semibold text-fg">
						{pickLocale({ text: d.label, locale })}
					</h3>
					<p class="text-xs font-medium text-fg-subtle">
						{pickLocale({ text: d.dates, locale })}
					</p>
				</div>

				{#if d.note}
					<p class="text-sm leading-relaxed text-fg-muted">
						{pickLocale({ text: d.note, locale })}
					</p>
				{/if}
			</div>
		{/each}
	</div>
</div>
