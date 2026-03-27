<script lang="ts">
	import type { Locale } from '$lib/portfolio/types';
	import {
		categoryForLeafKind,
		type Leaf,
	} from '$lib/portfolio/leaf';
	import PortfolioHeader from './PortfolioHeader.svelte';
	import PortfolioFooter from './PortfolioFooter.svelte';
	import PortfolioGraph from './PortfolioGraph.svelte';
	import DetailPanel from './DetailPanel.svelte';

	let locale = $state<Locale>('en');
	let categoryId = $state<string | null>(null);
	let itemId = $state<string | null>(null);

	const t = {
		skip: { en: 'Skip to details', it: 'Salta ai dettagli' },
		cvFallback: { en: 'Linear view (GitHub repos)', it: 'Vista lineare (repo GitHub)' },
		langLabel: { en: 'Language', it: 'Lingua' },
		panelHint: { en: 'Select a node to see details here.', it: 'Seleziona un nodo per i dettagli.' },
		orgNote: { en: 'DFINITY on GitHub', it: 'DFINITY su GitHub' },
		categoryIntroEyebrow: { en: 'Category', it: 'Categoria' },
		hintPickOuter: {
			en: 'Pick an item in the outer ring for details.',
			it: 'Scegli un elemento nel secondo anello per i dettagli.',
		},
		relatedProjects: { en: 'Related projects:', it: 'Progetti collegati:' },
		stack: { en: 'Stack:', it: 'Stack:' },
		relatedTechProjects: {
			en: 'Projects using this:',
			it: 'Progetti con questo elemento:',
		},
		languageUiNote: {
			en: 'Interface copy follows the EN/IT toggle above.',
			it: 'Il testo dell’interfaccia segue il selettore EN/IT in alto.',
		},
	} as const;

	function tr<K extends keyof typeof t>(key: K): string {
		return t[key][locale];
	}

	const panelLabels = $derived({
		orgNote: tr('orgNote'),
		panelHint: tr('panelHint'),
		categoryIntroEyebrow: tr('categoryIntroEyebrow'),
		hintPickOuter: tr('hintPickOuter'),
		relatedProjects: tr('relatedProjects'),
		stack: tr('stack'),
		relatedTechProjects: tr('relatedTechProjects'),
		languageUiNote: tr('languageUiNote'),
	});

	function toggleCategory(id: string) {
		if (categoryId === id) {
			categoryId = null;
			itemId = null;
			return;
		}
		categoryId = id;
		itemId = null;
	}

	function selectLeaf(l: Leaf) {
		categoryId = categoryForLeafKind(l.kind);
		itemId = `${l.kind}:${l.id}`;
	}

	function resetHome() {
		categoryId = null;
		itemId = null;
	}
</script>

<div class="min-h-[100dvh] bg-brand-950 text-zinc-100 selection:bg-brand-500/35">
	<PortfolioHeader
		bind:locale
		skipLabel={tr('skip')}
		cvFallbackLabel={tr('cvFallback')}
		langLabel={tr('langLabel')}
	/>

	<div
		class="mx-auto grid max-w-6xl gap-8 px-4 py-8 md:grid-cols-[minmax(280px,1fr)_minmax(320px,420px)] md:items-start md:gap-12 md:px-8 lg:grid-cols-[1fr_400px]"
	>
		<div class="flex flex-col items-center gap-6">
			<PortfolioGraph
				{locale}
				{categoryId}
				{itemId}
				onToggleCategory={toggleCategory}
				onSelectLeaf={selectLeaf}
				onResetHome={resetHome}
			/>
		</div>

		<DetailPanel
			{locale}
			{categoryId}
			{itemId}
			labels={panelLabels}
			onSelectLeaf={selectLeaf}
		/>
	</div>

	<PortfolioFooter />
</div>
