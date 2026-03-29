<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import PortfolioGraph from '$lib/components/graph/PortfolioGraph.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import DetailPanel from '$lib/components/panel/DetailPanel.svelte';
	import type { Locale } from '$lib/types/portfolio.types';
	import { categoryForLeafKind, type Leaf } from '$lib/utils/leaf.utils';

	let locale = $state<Locale>('en');
	let categoryId = $state<string | null>(null);
	let itemId = $state<string | null>(null);

	onMount(() => {
		const params = new URLSearchParams(window.location.search);
		const catParam = params.get('category');
		const itemParam = params.get('item');

		if (itemParam) {
			const [kind, id] = itemParam.split(':');
			if (kind && id) {
				categoryId = categoryForLeafKind(kind as Leaf['kind']);
				itemId = itemParam;
			}
		} else if (catParam) {
			categoryId = catParam;
		}
	});

	const t = {
		skip: { en: 'Skip to details', it: 'Salta ai dettagli' },
		cvFallback: { en: 'Linear view (GitHub repos)', it: 'Vista lineare (repo GitHub)' },
		langLabel: { en: 'Language', it: 'Lingua' },
		panelHint: {
			en: 'Pick items on the graph; when you open a leaf, detail appears in a card linked to that node.',
			it: 'Scegli sulla mappa; aprendo una foglia, i dettagli compaiono in una scheda collegata al nodo.'
		},
		orgNote: { en: 'DFINITY on GitHub', it: 'DFINITY su GitHub' },
		categoryIntroEyebrow: { en: 'Category', it: 'Categoria' },
		hintPickOuter: {
			en: 'Pick an item in the outer ring for details.',
			it: 'Scegli un elemento nel secondo anello per i dettagli.'
		},
		relatedProjects: { en: 'Related projects:', it: 'Progetti collegati:' },
		stack: { en: 'Stack:', it: 'Stack:' },
		relatedTechProjects: {
			en: 'Projects using this:',
			it: 'Progetti con questo elemento:'
		},
		languageUiNote: {
			en: 'Interface copy follows the EN/IT toggle above.',
			it: 'Il testo dell’interfaccia segue il selettore EN/IT in alto.'
		},
		searchPlaceholder: { en: 'Search portfolio...', it: 'Cerca nel portfolio...' },
		searchShortcut: { en: 'Search (⌘K)', it: 'Cerca (⌘K)' },
		searchLabel: { en: 'Search', it: 'Cerca' }
	} as const;

	const tr = <K extends keyof typeof t>(key: K): string => t[key][locale];

	const panelLabels = $derived({
		orgNote: tr('orgNote'),
		panelHint: tr('panelHint'),
		categoryIntroEyebrow: tr('categoryIntroEyebrow'),
		hintPickOuter: tr('hintPickOuter'),
		relatedProjects: tr('relatedProjects'),
		stack: tr('stack'),
		relatedTechProjects: tr('relatedTechProjects'),
		languageUiNote: tr('languageUiNote'),
		searchPlaceholder: tr('searchPlaceholder'),
		searchShortcut: tr('searchShortcut'),
		searchLabel: tr('searchLabel')
	});

	const toggleCategory = (id: string) => {
		if (categoryId === id) {
			categoryId = null;
			itemId = null;
			return;
		}
		categoryId = id;
		itemId = null;
	};

	const selectLeaf = (l: Leaf) => {
		const id = `${l.kind}:${l.id}`;
		if (itemId === id) {
			itemId = null;
			return;
		}
		categoryId = categoryForLeafKind(l.kind);
		itemId = id;
	};

	const resetHome = () => {
		categoryId = null;
		itemId = null;
	};

	const stepToCategoryView = () => {
		itemId = null;
	};
</script>

<div class="flex min-h-dvh flex-col bg-page text-fg selection:bg-selection/40">
	<Header
		cvFallbackLabel={tr('cvFallback')}
		labels={{
			placeholder: panelLabels.searchPlaceholder,
			shortcut: panelLabels.searchShortcut
		}}
		langLabel={tr('langLabel')}
		onSelectLeaf={selectLeaf}
		skipLabel={tr('skip')}
		bind:locale
	/>

	<main class="flex min-h-0 w-full flex-1 flex-col">
		<div
			class="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 content-start gap-8 px-4 py-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,min(100%,420px))] lg:items-start lg:gap-10 lg:px-8"
			in:fade={{ duration: 680 }}
			out:fade={{ duration: 420 }}
		>
			<div class="order-1 flex w-full min-w-0 flex-col items-center gap-6 lg:order-0">
				<PortfolioGraph
					{categoryId}
					{itemId}
					leafDetailLabels={{
						relatedProjects: panelLabels.relatedProjects,
						stack: panelLabels.stack,
						relatedTechProjects: panelLabels.relatedTechProjects,
						languageUiNote: panelLabels.languageUiNote
					}}
					{locale}
					onResetHome={resetHome}
					onSelectLeaf={selectLeaf}
					onStepToCategoryView={stepToCategoryView}
					onToggleCategory={toggleCategory}
				/>
			</div>

			<div class="order-2 w-full min-w-0 lg:order-0">
				<DetailPanel labels={panelLabels} {locale} />
			</div>
		</div>
	</main>

	<Footer />
</div>
