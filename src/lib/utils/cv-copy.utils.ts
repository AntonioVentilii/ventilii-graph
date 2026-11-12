import type { Locale } from '#lib/types/portfolio.types.ts';

/** Every string of the static CV pages (`StaticCv`), in the three site locales. */
export const CV_COPY = {
	metaTitle: {
		en: 'Antonio Ventilii CV | AI-Native Senior Software Engineer',
		it: 'CV di Antonio Ventilii | Senior Software Engineer AI-Native',
		pt: 'CV de Antonio Ventilii | Senior Software Engineer AI-Native'
	},
	metaDescription: {
		en: 'CV of Antonio Ventilii, Senior Software Engineer. Orchestrates AI coding agents across many parallel projects while shipping production TypeScript, Rust, and Python for Web3 and finance. Experience at DFINITY, Vontobel, and Itaú.',
		it: 'CV di Antonio Ventilii, Senior Software Engineer. Orchestra coding agent AI su molti progetti in parallelo e sviluppa TypeScript, Rust e Python in produzione per Web3 e finanza. Esperienza in DFINITY, Vontobel e Itaú.',
		pt: 'CV de Antonio Ventilii, Senior Software Engineer. Orquestra coding agents de IA em muitos projetos paralelos e entrega TypeScript, Rust e Python em produção para Web3 e finanças. Experiência em DFINITY, Vontobel e Itaú.'
	},
	scatter: { en: 'scatter', it: 'sparpaglia', pt: 'espalhar' },
	scatterTitle: {
		en: 'Scatter this page back into the interactive graph',
		it: 'Sparpaglia questa pagina nella mappa interattiva',
		pt: 'Espalhar esta página de volta no mapa interativo'
	},
	hint: {
		en: 'The flat, machine-friendly version of an interactive career map.',
		it: 'La versione piatta e leggibile dalle macchine di una mappa interattiva.',
		pt: 'A versão plana e legível por máquinas de um mapa de carreira interativo.'
	},
	downloadPdf: { en: 'Download PDF', it: 'Scarica il PDF', pt: 'Baixar PDF' },
	orgs: { en: 'GitHub organizations', it: 'Organizzazioni GitHub', pt: 'Organizações no GitHub' },
	langNav: { en: 'CV language', it: 'Lingua del CV', pt: 'Idioma do CV' }
} as const satisfies Record<string, Record<Locale, string>>;

export const cvCopy = ({ key, locale }: { key: keyof typeof CV_COPY; locale: Locale }): string =>
	CV_COPY[key][locale];
