<script lang="ts">
	import PersonSummary from '$lib/components/panel/PersonSummary.svelte';
	import { portfolioData } from '$lib/services/portfolio.services';
	import type { Locale } from '$lib/types/portfolio.types';

	interface Props {
		locale: Locale;
		labels: {
			panelHint: string;
			orgNote: string;
		};
	}

	let { locale, labels }: Props = $props();
</script>

<div class="flex min-h-0 flex-col lg:sticky lg:top-8">
	<aside
		id="detail-panel"
		class="min-h-[240px] scroll-mt-24 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-panel-inset)]"
		aria-label="Profile and links"
		tabindex="-1"
	>
		<PersonSummary
			data={portfolioData}
			{locale}
			orgNoteLabel={labels.orgNote}
			panelHint={labels.panelHint}
		/>
	</aside>
</div>
