<script lang="ts">
	import { portfolioData } from '$lib/data/portfolio.data';
	import type { Locale } from '$lib/portfolio/types';
	import PersonSummary from './panel/PersonSummary.svelte';

	interface Props {
		locale: Locale;
		labels: {
			panelHint: string;
			orgNote: string;
			categoryIntroEyebrow: string;
			hintPickOuter: string;
			relatedProjects: string;
			stack: string;
			relatedTechProjects: string;
			languageUiNote: string;
		};
	}

	let { locale, labels }: Props = $props();
</script>

<div class="flex min-h-0 flex-col md:sticky md:top-8">
	<aside
		id="detail-panel"
		tabindex="-1"
		class="min-h-[240px] scroll-mt-24 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-panel-inset)]"
		aria-label="Profile and links"
	>
		<PersonSummary
			data={portfolioData}
			{locale}
			orgNoteLabel={labels.orgNote}
			panelHint={labels.panelHint}
		/>
	</aside>
</div>
