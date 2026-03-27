<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { Locale } from '$lib/portfolio/types';
	import { categoryForLeafKind, type Leaf } from '$lib/portfolio/leaf';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
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
		const id = `${l.kind}:${l.id}`;
		if (itemId === id) {
			itemId = null;
			return;
		}
		categoryId = categoryForLeafKind(l.kind);
		itemId = id;
	}

	function resetHome() {
		categoryId = null;
		itemId = null;
	}

	function stepToCategoryView() {
		itemId = null;
	}
</script>

<div
	class="flex min-h-dvh flex-col bg-page text-fg selection:bg-selection/40"
>
	<Header
		bind:locale
		skipLabel={tr('skip')}
		cvFallbackLabel={tr('cvFallback')}
		langLabel={tr('langLabel')}
	/>

	<main class="flex w-full min-h-0 flex-1 flex-col">
		<div
			class="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 content-start gap-8 px-4 py-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,min(100%,420px))] md:items-start md:gap-10 md:px-8 lg:grid-cols-[minmax(0,1.25fr)_400px]"
		>
			<div
				class="order-1 flex w-full min-w-0 flex-col items-center gap-6 md:order-none"
				in:fade={{ duration: 400 }}
				out:fade={{ duration: 280 }}
			>
				<PortfolioGraph
					{locale}
					{categoryId}
					{itemId}
					onToggleCategory={toggleCategory}
					onSelectLeaf={selectLeaf}
					onResetHome={resetHome}
					onStepToCategoryView={stepToCategoryView}
				/>
			</div>

			<div
				class="order-2 w-full min-w-0 md:order-none"
				in:fade={{ duration: 400 }}
				out:fade={{ duration: 280 }}
			>
				<DetailPanel
					{locale}
					{categoryId}
					{itemId}
					labels={panelLabels}
					onSelectLeaf={selectLeaf}
				/>
			</div>
		</div>
	</main>

	<Footer />
</div>
