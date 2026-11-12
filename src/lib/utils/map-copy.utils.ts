import type { Locale } from '#lib/types/portfolio.types.ts';

/** Every string of the map page (`PortfolioApp` and the parts it labels), in the three site locales. */
export const MAP_COPY = {
	skip: { en: 'Skip to details', it: 'Salta ai dettagli', pt: 'Pular para os detalhes' },
	cvFallback: {
		en: 'Linear view (GitHub repos)',
		it: 'Vista lineare (repo GitHub)',
		pt: 'Visão linear (repos GitHub)'
	},
	panelHint: {
		en: 'Pick items on the graph; when you open a leaf, detail appears in a card linked to that node.',
		it: 'Scegli sulla mappa; aprendo una foglia, i dettagli compaiono in una scheda collegata al nodo.',
		pt: 'Escolha itens no mapa; ao abrir uma folha, os detalhes aparecem em um cartão ligado àquele nó.'
	},
	orgNote: { en: 'DFINITY on GitHub', it: 'DFINITY su GitHub', pt: 'DFINITY no GitHub' },
	relatedProjects: {
		en: 'Related projects:',
		it: 'Progetti collegati:',
		pt: 'Projetos relacionados:'
	},
	stack: { en: 'Stack:', it: 'Stack:', pt: 'Stack:' },
	relatedTechProjects: {
		en: 'Projects using this:',
		it: 'Progetti con questo elemento:',
		pt: 'Projetos que usam isto:'
	},
	searchPlaceholder: {
		en: 'Search portfolio...',
		it: 'Cerca nel portfolio...',
		pt: 'Buscar no portfólio...'
	},
	searchShortcut: { en: 'Search (⌘K)', it: 'Cerca (⌘K)', pt: 'Buscar (⌘K)' },
	flatten: { en: 'flatten', it: 'appiattisci', pt: 'achatar' },
	flattenTitle: {
		en: 'Flatten the graph into a plain CV page',
		it: 'Appiattisci la mappa in una pagina CV testuale',
		pt: 'Achatar o mapa em uma página de CV em texto'
	}
} as const satisfies Record<string, Record<Locale, string>>;

export const mapCopy = ({ key, locale }: { key: keyof typeof MAP_COPY; locale: Locale }): string =>
	MAP_COPY[key][locale];
