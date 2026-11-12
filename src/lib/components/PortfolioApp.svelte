<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import PortfolioGraph from '#lib/components/graph/PortfolioGraph.svelte';
	import Footer from '#lib/components/layout/Footer.svelte';
	import Header from '#lib/components/layout/Header.svelte';
	import DetailPanel from '#lib/components/panel/DetailPanel.svelte';
	import type { Locale } from '#lib/types/portfolio.types.ts';
	import { askCopy, askPath } from '#lib/utils/ask-copy.utils.ts';
	import { categoryForLeafKind, leafKey, parseLeaf, type Leaf } from '#lib/utils/leaf.utils.ts';
	import { cvPath, parseLocale } from '#lib/utils/locale.utils.ts';
	import { mapCopy } from '#lib/utils/map-copy.utils.ts';
	import { goto } from '$app/navigation';

	let locale = $state<Locale>('en');
	let flattening = $state(false);
	let categoryId = $state<string | null>(null);
	let itemId = $state<string | null>(null);

	onMount(() => {
		const params = new URLSearchParams(window.location.search);
		const catParam = params.get('category');
		const itemParam = params.get('item');
		const langParam = params.get('lang');

		locale = parseLocale(langParam) ?? locale;

		if (itemParam) {
			const leaf = parseLeaf(itemParam);
			if (leaf?.id) {
				categoryId = categoryForLeafKind(leaf.kind);
				itemId = itemParam;
			}
		} else if (catParam) {
			categoryId = catParam;
		}
	});

	const tr = (key: Parameters<typeof mapCopy>[0]['key']): string => mapCopy({ key, locale });

	const panelLabels = $derived({
		orgNote: tr('orgNote'),
		panelHint: tr('panelHint'),
		relatedProjects: tr('relatedProjects'),
		stack: tr('stack'),
		relatedTechProjects: tr('relatedTechProjects'),
		searchPlaceholder: tr('searchPlaceholder'),
		searchShortcut: tr('searchShortcut')
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
		const id = leafKey(l);
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

	/** Drop the graph nodes off the map, then land on the prerendered static CV. */
	const flattenToCv = () => {
		if (flattening) {
			return;
		}
		flattening = true;
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		setTimeout(() => goto(cvPath(locale)), reduceMotion ? 0 : 700);
	};

	onMount(() => {
		const onKeydown = (e: KeyboardEvent) => {
			if (e.key !== 'f' || e.metaKey || e.ctrlKey || e.altKey) {
				return;
			}
			const { target } = e;
			if (
				target instanceof HTMLElement &&
				(target.isContentEditable || ['INPUT', 'SELECT', 'TEXTAREA'].includes(target.tagName))
			) {
				return;
			}
			e.preventDefault();
			flattenToCv();
		};
		window.addEventListener('keydown', onKeydown);
		return () => window.removeEventListener('keydown', onKeydown);
	});
</script>

<div
	class="page-aurora flex min-h-dvh flex-col text-fg selection:bg-selection/40"
	class:graph-flattening={flattening}
>
	<Header
		ask={{
			href: askPath(locale),
			label: askCopy({ key: 'askCta', locale })
		}}
		cvFallbackLabel={tr('cvFallback')}
		flatten={{
			href: cvPath(locale),
			label: tr('flatten'),
			title: tr('flattenTitle'),
			onFlatten: flattenToCv
		}}
		labels={{
			placeholder: panelLabels.searchPlaceholder,
			shortcut: panelLabels.searchShortcut
		}}
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
						relatedTechProjects: panelLabels.relatedTechProjects
					}}
					{locale}
					onPrint={flattenToCv}
					onResetHome={resetHome}
					onSelectLeaf={selectLeaf}
					onStepToCategoryView={stepToCategoryView}
					onToggleCategory={toggleCategory}
				/>
			</div>

			<div class="flatten-fade order-2 w-full min-w-0 lg:order-0">
				<DetailPanel labels={panelLabels} {locale} />
			</div>
		</div>
	</main>

	<Footer />
</div>
