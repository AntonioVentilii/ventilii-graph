import type { PortfolioData } from '$lib/portfolio/types';

const L = {
	// eslint-disable-next-line local-rules/prefer-object-params
	en: (en: string, it?: string) => (it ? { en, it } : { en })
};

export const portfolioData: PortfolioData = {
	person: {
		id: 'person',
		name: 'Antonio Ventilii',
		title: L.en('Senior Software Engineer', 'Senior Software Engineer'),
		tagline: L.en(
			'Shipping production systems in TypeScript, Rust, and Python across Web3 and traditional finance — including a flagship wallet whose full codebase is public on GitHub.',
			'Sistemi production-grade in TypeScript, Rust e Python tra Web3 e finance tradizionale — incluso un wallet flagship open source su GitHub.'
		),
		location: L.en('Zurich, Switzerland', 'Zurigo, Svizzera'),
		avatarUrl: '/images/antonio-ventilii.jpg',
		email: 'antonioventilii@gmail.com',
		links: [
			{ label: L.en('GitHub', 'GitHub'), href: 'https://github.com/AntonioVentilii' },
			{ label: L.en('LinkedIn', 'LinkedIn'), href: 'https://linkedin.com/in/AntonioVentilii' }
		]
	},
	categories: [
		{
			id: 'experience',
			label: L.en('Experience', 'Esperienza'),
			shortHint: L.en('Roles, impact, and timelines.', 'Ruoli, impatto e periodi.')
		},
		{
			id: 'projects',
			label: L.en('Projects', 'Progetti'),
			shortHint: L.en('OISY, personal repos, experiments.', 'OISY, repo personali, esperimenti.')
		},
		{
			id: 'stack',
			label: L.en('Stack', 'Stack'),
			shortHint: L.en(
				'Languages, frontend, Web3, platforms.',
				'Linguaggi, frontend, Web3, piattaforme.'
			)
		},
		{
			id: 'education',
			label: L.en('Education', 'Formazione'),
			shortHint: L.en('Degrees and scholarships.', 'Titoli e borse di studio.')
		},
		{
			id: 'languages',
			label: L.en('Languages', 'Lingue'),
			shortHint: L.en(
				'Spoken languages — UI copy stays in your toggle.',
				'Lingue parlate — l’interfaccia segue il selettore.'
			)
		},
		{
			id: 'about',
			label: L.en('About', 'About'),
			shortHint: L.en('How to read this map.', 'Come leggere questa mappa.')
		}
	],
	experiences: [
		{
			id: 'dfinity',
			company: L.en('DFINITY Foundation', 'DFINITY Foundation'),
			location: L.en('Zurich, Switzerland', 'Zurigo, Svizzera'),
			role: L.en('Senior Software Engineer', 'Senior Software Engineer'),
			dates: L.en('May 2024 — Present', 'Mag 2024 — oggi'),
			summary: L.en(
				'OISY Wallet (Apache-2.0): a browser wallet on the Internet Computer with TypeScript, Svelte, Rust canisters, and chain fusion. The entire product is open source — implementation, history, and review are public on GitHub.',
				'OISY Wallet (Apache-2.0): browser wallet su Internet Computer con TypeScript, Svelte, canister Rust e chain fusion. Prodotto interamente open source su GitHub.'
			),
			highlights: [
				L.en(
					'Solana (mainnet & devnet): native SOL and SPL end-to-end — balances, history, sends; Solana-specific semantics and chain-key signing paths distinct from Bitcoin and Ethereum.',
					'Solana (mainnet & devnet): SOL e SPL end-to-end; semantica specifica e signing chain-key distinto da Bitcoin ed Ethereum.'
				),
				L.en(
					'Extended EVM coverage: Base, Polygon, Arbitrum, BSC behind a repeatable pattern; documented steps to add more networks.',
					'Copertura EVM estesa: Base, Polygon, Arbitrum, BSC con pattern ripetibile e note per nuove reti.'
				),
				L.en(
					'Modular providers: swaps via NEAR Intents (Solana & EVMs); fiat on-ramp via Onramper behind a pluggable model.',
					'Provider modulari: swap con NEAR Intents; on-ramp fiat con Onramper.'
				),
				L.en(
					'Backend-first workers: transaction loaders and FX jobs moved to canisters — pagination, cache, persistence, scheduled rates — restoring predictable UI performance.',
					'Worker lato backend: loader transazioni e job FX su canister con cache e job schedulati.'
				),
				L.en(
					'Backend hardening: rate limits; Internet Identity delegation-chain checks binding traffic to the real frontend.',
					'Hardening: rate limit e verifiche sulla catena di delegazione Internet Identity.'
				),
				L.en(
					'Leadership & tooling: currency/language preferences, token-list performance; shared strict ESLint config reused across foundation repos; coding agents for implementation and review.',
					'Leadership e tooling: preferenze UX, performance liste token; ESLint condiviso; agenti per implementazione e review.'
				)
			],
			links: [
				{
					label: L.en('OISY on GitHub', 'OISY su GitHub'),
					href: 'https://github.com/dfinity/oisy-wallet'
				},
				{ label: L.en('OISY (web)', 'OISY (web)'), href: 'https://oisy.com' }
			],
			stackIds: ['typescript', 'svelte', 'rust', 'icp', 'evm-solana'],
			projectIds: ['oisy']
		},
		{
			id: 'vontobel',
			company: L.en('Vontobel Swiss Financial Advisers AG', 'Vontobel Swiss Financial Advisers AG'),
			location: L.en('Zurich, Switzerland', 'Zurigo, Svizzera'),
			role: L.en(
				'Desk Developer / Senior Multi-Asset Trader',
				'Desk Developer / Senior Multi-Asset Trader'
			),
			dates: L.en('2020 — May 2024', '2020 — mag 2024'),
			summary: L.en(
				'Former UBS Swiss Financial Advisers AG. Built desk automation and controls while executing multi-asset trades for HNWI/UHNWI clients.',
				'Ex UBS Swiss Financial Advisers. Automazione e controlli di desk mentre operavo mercati multi-asset per clienti HNWI/UHNWI.'
			),
			highlights: [
				L.en(
					'Flask API + React app for rule-based asset analysis used across four teams.',
					'API Flask + app React per analisi regole su quattro team.'
				),
				L.en(
					'Forex book end-of-day hedge optimisation (linear programming) — ~40% reduction in related market fees.',
					'Ottimizzazione hedge EOD FX (programmazione lineare) — ~40% fee in meno.'
				),
				L.en(
					'Python automation for booking GUI; data distribution for Bloomberg and third-party feeds; internal/external API wrappers; desk-wide Git/DevOps adoption.',
					'Automazione Python su GUI booking; distribuzione dati Bloomberg/API; wrapper; DevOps su tutto il desk.'
				)
			],
			stackIds: ['python', 'react']
		},
		{
			id: 'itau-ch',
			company: L.en('Banco Itaú (Suisse) S.A.', 'Banco Itaú (Suisse) S.A.'),
			location: L.en('Zurich, Switzerland', 'Zurigo, Svizzera'),
			role: L.en('Senior Trader / Desk Developer', 'Senior Trader / Desk Developer'),
			dates: L.en('2019 — 2020', '2019 — 2020'),
			summary: L.en(
				'Trading and coding for desk controls: scrapers for Certificates of Deposit, automated booking/pricing/P&L reporting.',
				'Trading e tool per controlli: scraper per CD, reporting booking/pricing/P&L.'
			),
			highlights: [
				L.en(
					'Multi-asset execution including derivatives and structured products.',
					'Esecuzione multi-asset con derivati e strutturati.'
				),
				L.en(
					'Trade ideas for Direct Access clients in Derivatives and Fixed Income.',
					'Idee di trade per Direct Access in Derivati e Fixed Income.'
				)
			],
			stackIds: ['python']
		},
		{
			id: 'stoneco',
			company: L.en('StoneCo Ltd.', 'StoneCo Ltd.'),
			location: L.en('São Paulo, Brazil', 'San Paolo, Brasile'),
			role: L.en(
				'Desk Developer / Financial Specialist, Treasury & Risk',
				'Desk Developer / Financial Specialist, Treasury & Risk'
			),
			dates: L.en('2018 — 2019', '2018 — 2019'),
			summary: L.en(
				'IPO controls with internal dev teams, market risk data platform, Scrum/DevOps, treasury hedging, regulatory filing support.',
				'Controlli IPO con team interni, piattaforma market risk, Scrum/DevOps, treasury, supporto filing.'
			),
			highlights: [
				L.en(
					'Market data: Bloomberg, Yahoo, APIs, scraping.',
					'Market data: Bloomberg, Yahoo, API, scraping.'
				),
				L.en('Docker/venv, CI/CD with automated tests.', 'Docker/venv, CI/CD con test automatici.')
			],
			stackIds: ['python', 'react']
		},
		{
			id: 'itau-br',
			company: L.en('Itaú Unibanco S.A.', 'Itaú Unibanco S.A.'),
			location: L.en('São Paulo, Brazil', 'San Paolo, Brasile'),
			role: L.en('Trader, Volatility Trading Desk', 'Trader, Volatility Trading Desk'),
			dates: L.en('2013 — 2016', '2013 — 2016'),
			summary: L.en(
				'Flow pricing, prop risk, internal clients; co-built desk controls and a central Volatility database (SQL, C#).',
				'Pricing flow, rischio prop, clienti interni; controlli desk e database Volatilità centralizzato.'
			),
			highlights: [
				L.en(
					'Automation with layered security and redundancy.',
					'Automazione con sicurezza a strati e ridondanza.'
				)
			],
			stackIds: ['python']
		}
	],
	projects: [
		{
			id: 'oisy',
			title: L.en('OISY Wallet (DFINITY)', 'OISY Wallet (DFINITY)'),
			kind: 'org',
			summary: L.en(
				'Multi-chain browser wallet on the Internet Computer. Public codebase: auditable history, issues, and reviews on GitHub. Flagship focus of my current role.',
				'Wallet multi-chain su Internet Computer. Codebase pubblica e revisionabile su GitHub.'
			),
			highlights: [
				L.en(
					'Apache-2.0, TypeScript + Svelte frontend, Rust canisters, chain fusion (Bitcoin, Ethereum-family, Solana).',
					'Apache-2.0, frontend TS/Svelte, canister Rust, chain fusion (BTC, EVM, Solana).'
				)
			],
			links: [
				{ label: L.en('Repository', 'Repository'), href: 'https://github.com/dfinity/oisy-wallet' },
				{ label: L.en('Website', 'Sito'), href: 'https://oisy.com' }
			],
			stackIds: ['typescript', 'svelte', 'rust', 'icp', 'evm-solana'],
			experienceId: 'dfinity'
		},
		{
			id: 'icdc-core',
			title: L.en('icdc-core', 'icdc-core'),
			kind: 'personal',
			summary: L.en(
				'Clearing-focused core on the Internet Computer (Rust canisters) — settlement-style workflows for on-chain markets.',
				'Core clearing su IC (Rust) — workflow tipo settlement per mercati on-chain.'
			),
			links: [
				{ label: L.en('GitHub', 'GitHub'), href: 'https://github.com/AntonioVentilii/icdc-core' }
			],
			stackIds: ['rust', 'icp']
		},
		{
			id: 'escrow',
			title: L.en('escrow', 'escrow'),
			kind: 'personal',
			summary: L.en(
				'Decentralized escrow: Solidity with user, admin, and arbitrator roles; React app for interaction.',
				'Escrow decentralizzato in Solidity con ruoli user/admin/arbitro; app React.'
			),
			links: [
				{ label: L.en('GitHub', 'GitHub'), href: 'https://github.com/AntonioVentilii/escrow' }
			],
			stackIds: ['react']
		},
		{
			id: 'vici-app',
			title: L.en('vici-app', 'vici-app'),
			kind: 'personal',
			summary: L.en(
				'Svelte app — recently active on GitHub.',
				'App Svelte — attività recente su GitHub.'
			),
			links: [
				{ label: L.en('GitHub', 'GitHub'), href: 'https://github.com/AntonioVentilii/vici-app' }
			],
			stackIds: ['svelte', 'typescript']
		},
		{
			id: 'vault',
			title: L.en('vault-app / vault-core', 'vault-app / vault-core'),
			kind: 'personal',
			summary: L.en(
				'Split Rust core and JavaScript app — custody/experiment surface (descriptions on GitHub).',
				'Core Rust e app JS — esperimento/custodia (dettagli su GitHub).'
			),
			links: [
				{
					label: L.en('vault-core', 'vault-core'),
					href: 'https://github.com/AntonioVentilii/vault-core'
				},
				{
					label: L.en('vault-app', 'vault-app'),
					href: 'https://github.com/AntonioVentilii/vault-app'
				}
			],
			stackIds: ['rust', 'typescript']
		},
		{
			id: 'icrc-factory',
			title: L.en('icrc-factory', 'icrc-factory'),
			kind: 'personal',
			summary: L.en(
				'Factory canister for deploying and managing ICRC-style tokens on the Internet Computer.',
				'Canister factory per token in stile ICRC su Internet Computer.'
			),
			links: [
				{ label: L.en('GitHub', 'GitHub'), href: 'https://github.com/AntonioVentilii/icrc-factory' }
			],
			stackIds: ['rust', 'icp']
		},
		{
			id: 'deribit-wrapper',
			title: L.en('deribit-wrapper', 'deribit-wrapper'),
			kind: 'personal',
			summary: L.en(
				'Python integration layer for Deribit’s trading API.',
				'Wrapper Python per API trading Deribit.'
			),
			links: [
				{
					label: L.en('GitHub', 'GitHub'),
					href: 'https://github.com/AntonioVentilii/deribit-wrapper'
				}
			],
			stackIds: ['python']
		},
		{
			id: 'bitcoin-utxo-lp',
			title: L.en('bitcoin-utxo-lp', 'bitcoin-utxo-lp'),
			kind: 'personal',
			summary: L.en(
				'Bitcoin UTXO coin-selection via LP/MILP optimisation.',
				'Selezione UTXO Bitcoin con ottimizzazione LP/MILP.'
			),
			links: [
				{
					label: L.en('GitHub', 'GitHub'),
					href: 'https://github.com/AntonioVentilii/bitcoin-utxo-lp'
				}
			],
			stackIds: ['python']
		},
		{
			id: 'juno-ecosystem',
			title: L.en('Juno ecosystem forks', 'Fork ecosistema Juno'),
			kind: 'personal',
			summary: L.en(
				'Contributions and forks around Juno: juno, juno-js, plugins, icp-js-canisters — Web3 hosting toolkit experimentation.',
				'Fork e contributi su Juno (juno, juno-js, plugins, icp-js-canisters).'
			),
			links: [
				{ label: L.en('juno', 'juno'), href: 'https://github.com/AntonioVentilii/juno' },
				{ label: L.en('juno-js', 'juno-js'), href: 'https://github.com/AntonioVentilii/juno-js' }
			],
			stackIds: ['typescript', 'icp']
		},
		{
			id: 'all-github',
			title: L.en('All public repositories', 'Tutte le repo pubbliche'),
			kind: 'personal',
			summary: L.en(
				'Full list on GitHub — eslint plugins, tooling repros, Tokenmania on ICP Ninja, and more.',
				'Lista completa su GitHub — plugin eslint, repro tooling, Tokenmania, altro.'
			),
			links: [
				{
					label: L.en('AntonioVentilii on GitHub', 'Profilo GitHub'),
					href: 'https://github.com/AntonioVentilii?tab=repositories'
				}
			]
		}
	],
	technologies: [
		{
			id: 'typescript',
			label: L.en('TypeScript', 'TypeScript'),
			blurb: L.en(
				'Primary language for OISY frontend/tooling and many side projects.',
				'Linguaggio principale per OISY e molti side project.'
			),
			yearsHint: L.en('Production use since desk + Web3 era.', 'Uso production da desk a Web3.'),
			relatedProjectIds: ['oisy', 'vici-app', 'juno-ecosystem']
		},
		{
			id: 'rust',
			label: L.en('Rust', 'Rust'),
			blurb: L.en(
				'Canisters, icdc-core, vault-core, icrc-factory, performance-sensitive on-chain logic.',
				'Canister Rust, icdc-core, vault-core, icrc-factory.'
			),
			relatedProjectIds: ['oisy', 'icdc-core', 'vault', 'icrc-factory']
		},
		{
			id: 'python',
			label: L.en('Python', 'Python'),
			blurb: L.en(
				'Trading desks, APIs, optimisation (LP), data pipelines, wrappers (Deribit, WhatsApp, Firestore).',
				'Desk trading, API, LP, pipeline dati, wrapper vari.'
			),
			relatedProjectIds: ['deribit-wrapper', 'bitcoin-utxo-lp']
		},
		{
			id: 'svelte',
			label: L.en('Svelte', 'Svelte'),
			blurb: L.en(
				'OISY UI, vici-app, this portfolio — lean reactivity and small bundles.',
				'UI OISY, vici-app, questa portfolio.'
			),
			relatedProjectIds: ['oisy', 'vici-app']
		},
		{
			id: 'icp',
			label: L.en('Internet Computer', 'Internet Computer'),
			blurb: L.en(
				'Canisters, Internet Identity, chain-key patterns, Internet Computer as host for OISY.',
				'Canister, Internet Identity, chain-key; host di OISY.'
			),
			relatedProjectIds: ['oisy', 'icdc-core', 'icrc-factory', 'juno-ecosystem']
		},
		{
			id: 'evm-solana',
			label: L.en('EVM & Solana', 'EVM e Solana'),
			blurb: L.en(
				'WalletConnect, multi-chain expansion in OISY: EVM family + Solana semantics.',
				'WalletConnect, più chain in OISY: famiglia EVM + Solana.'
			),
			relatedProjectIds: ['oisy']
		},
		{
			id: 'react',
			label: L.en('React', 'React'),
			blurb: L.en(
				'Desk-era internal apps and escrow front-end.',
				'App interne da desk e frontend escrow.'
			),
			relatedProjectIds: ['escrow']
		}
	],
	education: [
		{
			id: 'usp',
			institution: L.en('University of São Paulo', 'Università di San Paolo'),
			degree: L.en(
				"Master's in Aeronautics Engineering (exchange)",
				'Magistrale in Ingegneria Aeronautica (exchange)'
			),
			dates: L.en('2012 — 2013', '2012 — 2013'),
			note: L.en('International exchange.', 'Scambio internazionale.')
		},
		{
			id: 'polimi-m',
			institution: L.en('Politecnico di Milano', 'Politecnico di Milano'),
			degree: L.en("Master's in Aeronautics Engineering", 'Magistrale in Ingegneria Aeronautica'),
			dates: L.en('2011 — 2013', '2011 — 2013'),
			note: L.en('Two-year merit-based scholarship.', 'Borsa di merito biennale.')
		},
		{
			id: 'polimi-b',
			institution: L.en('Politecnico di Milano', 'Politecnico di Milano'),
			degree: L.en("Bachelor's in Aerospace Engineering", 'Triennale in Ingegneria Aerospaziale'),
			dates: L.en('2008 — 2011', '2008 — 2011'),
			note: L.en('Three-year merit-based scholarship.', 'Borsa di merito triennale.')
		}
	],
	languages: [
		{ id: 'it', label: L.en('Italian', 'Italiano'), level: L.en('Native', 'Madrelingua') },
		{ id: 'pt', label: L.en('Portuguese', 'Portoghese'), level: L.en('Fluent', 'Fluente') },
		{ id: 'en', label: L.en('English', 'Inglese'), level: L.en('Fluent', 'Fluente') },
		{ id: 'de', label: L.en('German', 'Tedesco'), level: L.en('Beginner', 'Base') }
	],
	about: [
		{
			id: 'map',
			title: L.en('How this portfolio works', 'Come funziona questa portfolio'),
			body: L.en(
				'This is a small graph: the centre is identity; the first ring is categories; the second ring lists items. Details stay in the panel so circles stay readable. Use Tab to move between nodes — there is always a boring GitHub list if you prefer linear browsing.',
				'È un piccolo grafo: al centro l’identità; il primo anello le categorie; il secondo gli elementi. I dettagli stanno nel pannello. Usa Tab tra i nodi; c’è sempre GitHub per una vista lineare.'
			)
		}
	],
	orgHighlights: [
		{
			name: 'dfinity/oisy-wallet',
			url: 'https://github.com/dfinity/oisy-wallet',
			note: L.en(
				'Primary public repo for my current product work — TypeScript, Svelte, Rust; Apache-2.0.',
				'Mia repo prodotto principale — TypeScript, Svelte, Rust; Apache-2.0.'
			)
		},
		{
			name: 'dfinity',
			url: 'https://github.com/dfinity',
			note: L.en(
				'Organisation home for the Internet Computer stack and ecosystem.',
				'Organizzazione Internet Computer e ecosistema.'
			)
		}
	]
};
