import type { PortfolioData } from '$lib/types/portfolio.types';

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
			'Senior software engineer shipping production systems in TypeScript, Rust, and Python across Web3 and traditional finance, including a flagship wallet whose full codebase is public on GitHub. Deeply invested in AI/agentic engineering: coding agents, custom agent skills, and MCP connectors as part of the daily workflow. Emphasis on code review, maintainability, and idiomatic code.',
			'Senior software engineer, con sistemi production in TypeScript, Rust e Python tra Web3 e finance tradizionale, incluso un wallet flagship open source su GitHub. Forte focus su AI/ingegneria agentica: coding agent, skill custom e connettori MCP nel workflow quotidiano. Attenzione a code review, manutenibilità e codice idiomatico.'
		),
		location: L.en('Zurich, Switzerland', 'Zurigo, Svizzera'),
		avatarUrl: '/images/antonio-ventilii.jpg',
		email: 'antonioventilii@gmail.com',
		links: [
			{
				label: L.en('GitHub', 'GitHub'),
				href: 'https://github.com/AntonioVentilii',
				iconName: 'Github'
			},
			{
				label: L.en('LinkedIn', 'LinkedIn'),
				href: 'https://linkedin.com/in/AntonioVentilii',
				iconName: 'Linkedin'
			}
		],
		cvUrl: '/Antonio_Ventilii_CV.pdf'
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
				'Languages, frontend, Web3, AI/agentic, platforms.',
				'Linguaggi, frontend, Web3, AI/agentico, piattaforme.'
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
				'Spoken languages. UI copy stays in your toggle.',
				'Lingue parlate. L’interfaccia segue il selettore.'
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
			dates: L.en('2024-Present', '2024-oggi'),
			summary: L.en(
				'OISY Wallet (Apache-2.0): production, multi-chain browser wallet on the Internet Computer (TypeScript, Svelte, Rust canisters, chain fusion). Fully public development on GitHub; primary contributor by commit volume (AntonioVentilii). Also collaborates on other foundation initiatives and partner-facing engineering.',
				'OISY Wallet (Apache-2.0): wallet browser multi-chain su Internet Computer (TS, Svelte, Rust, chain fusion). Sviluppo pubblico su GitHub; contributore principale per volume di commit.'
			),
			highlights: [
				L.en(
					'Solana (mainnet & devnet): extended the product to SOL and SPL (send, receive, balances/history) with correct account and transaction semantics; integrated chain-key signing paths that differ materially from Bitcoin and Ethereum.',
					'Solana (mainnet & devnet): esteso il prodotto a SOL e SPL (invio/ricezione/storico) con semantica corretta; integrazione signing chain-key differente da BTC/ETH.'
				),
				L.en(
					'EVM scale-out: shipped Base, Polygon, Arbitrum, and BSC behind one extensible integration pattern and documented how to add further chains.',
					'EVM scale-out: Base, Polygon, Arbitrum e BSC sotto un unico pattern estensibile; documentata l’aggiunta di nuove reti.'
				),
				L.en(
					'In-wallet services: swap flows via NEAR Intents (Solana and EVMs) through a pluggable provider model; fiat on-ramp via Onramper (buy crypto without leaving the wallet).',
					'Servizi in-wallet: swap via NEAR Intents (Solana/EVM) con modello a provider; on-ramp fiat via Onramper.'
				),
				L.en(
					'Performance / architecture: moved transaction loading (pagination, caching, persistence) and exchange-rate refresh into canisters with scheduled jobs, reducing browser work and stabilizing UI under real usage.',
					'Performance/architettura: spostato carico transazioni (paginazione, cache, persistenza) su canister con job schedulati.'
				),
				L.en(
					'Security / abuse: rate limits on sensitive endpoints; Internet Identity delegation-chain validation so backend requests align with the legitimate frontend.',
					'Security: rate limit su endpoint sensibili; valida della catena di delegazione Internet Identity.'
				),
				L.en(
					'Product, leadership, tooling: currency and language preferences and token-list performance work; before a team restructure, owned technical direction, planning, and mentoring; introduced a shared ESLint setup (strict + custom rules) reused across foundation repos; coding agents used heavily for implementation and review.',
					'Leadership & tooling: preferenze UI, performance liste token; direzione tecnica e mentoring; setup ESLint condiviso; uso intensivo di coding agents.'
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
			dates: L.en('2020-2024', '2020-2024'),
			summary: L.en(
				'Former UBS Swiss Financial Advisers AG. Built desk automation and controls while executing multi-asset trades for HNWI/UHNWI clients. Cut time on repetitive desk operations from about eight hours to about two hours per day.',
				'Ex UBS Swiss Financial Advisers. Automazione desk operando mercati multi-asset per clienti HNWI/UHNWI. Operazioni ripetitive ridotte da 8 a 2 ore al giorno.'
			),
			highlights: [
				L.en(
					'Flask API and React web app for rule-based asset screening and analysis, used across four teams.',
					'API Flask e app React per screening asset basato su regole, usato da quattro team.'
				),
				L.en(
					'FX book end-of-day hedge optimisation (linear programming), cutting related market fees by about 40%.',
					'Ottimizzazione hedge EOD FX (programmazione lineare), -40% in fee di mercato.'
				),
				L.en(
					'Python package automating the booking GUI, eliminating manual steps across 7-8 recurring desk workflows; data pipeline for Bloomberg and third-party market data; internal/external API wrappers.',
					'Package Python per automazione GUI booking su 7-8 workflow; pipeline dati Bloomberg.'
				),
				L.en(
					'Git-based workflows, testing, and DevOps practices adopted desk-wide.',
					'Workflow basati su Git, testing e pratiche DevOps adottate in tutto il desk.'
				),
				L.en(
					'Executed trades on multi-asset markets (Fixed Income, FX, Equity, Structured Products, Derivatives) for HNWI and UHNWI clients.',
					'Esecuzione trade multi-asset (FI, FX, Equity, Strutturati, Derivati).'
				)
			],
			stackIds: ['python', 'react']
		},
		{
			id: 'itau-ch',
			company: L.en('Banco Itaú (Suisse) S.A.', 'Banco Itaú (Suisse) S.A.'),
			location: L.en('Zurich, Switzerland', 'Zurigo, Svizzera'),
			role: L.en('Senior Trader / Desk Developer', 'Senior Trader / Desk Developer'),
			dates: L.en('2019-2020', '2019-2020'),
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
			dates: L.en('2018-2019', '2018-2019'),
			summary: L.en(
				'IPO controls with internal dev teams, market risk data platform, Scrum/DevOps, treasury hedging, regulatory filing support.',
				'Controlli IPO con team interni, piattaforma market risk, Scrum/DevOps, treasury, supporto filing.'
			),
			highlights: [
				L.en(
					'Market data: Bloomberg, Yahoo, APIs, scraping.',
					'Market data: Bloomberg, Yahoo, API, scraping.'
				),
				L.en(
					'Agile (Scrum); Docker/venv and CI/CD with automated tests.',
					'Agile (Scrum); Docker/venv e CI/CD con test automatizzati.'
				)
			],
			stackIds: ['python', 'react']
		},
		{
			id: 'itau-br',
			company: L.en('Itaú Unibanco S.A.', 'Itaú Unibanco S.A.'),
			location: L.en('São Paulo, Brazil', 'San Paolo, Brasile'),
			role: L.en('Trader at Volatility Trading Desk', 'Trader at Volatility Trading Desk'),
			dates: L.en('2013-2016', '2013-2016'),
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
				{
					label: L.en('Repository', 'Repository'),
					href: 'https://github.com/dfinity/oisy-wallet'
				},
				{ label: L.en('Website', 'Sito'), href: 'https://oisy.com' }
			],
			stackIds: ['typescript', 'svelte', 'rust', 'icp', 'evm-solana'],
			experienceId: 'dfinity'
		},
		{
			id: 'claude-skills',
			title: L.en('claude-skills', 'claude-skills'),
			kind: 'personal',
			summary: L.en(
				'Version-controlled Claude Code agent skills: a durable, git-backed home symlinked into the local agent so they are never lost, and ready to double as a plugin marketplace for a team.',
				'Skill agentiche per Claude Code sotto version control: una casa durevole su git, in symlink sull’agente locale così da non perderle mai, pronte anche come plugin marketplace per un team.'
			),
			highlights: [
				L.en(
					'Skills like prototype-to-app-port (high-fidelity design→production porting) and sapiens (a concise-but-complete communication mode), each with a triggerable command.',
					'Skill come prototype-to-app-port (porting design→produzione ad alta fedeltà) e sapiens (modalità di comunicazione concisa ma completa), ciascuna con comando dedicato.'
				)
			],
			links: [
				{
					label: L.en('GitHub', 'GitHub'),
					href: 'https://github.com/AntonioVentilii/claude-skills'
				}
			],
			stackIds: ['ai-agentic']
		},
		{
			id: 'privatim',
			title: L.en('Privatim: Sovereign AI', 'Privatim: Sovereign AI'),
			kind: 'personal',
			summary: L.en(
				'Sovereign AI for private banking: a single-bundle wealth-management showcase for the Internet Computer’s Cloud Engines, built so client data never leaves the bank’s compute (banking secrecy, FINMA, FADP/GDPR).',
				'AI sovrana per il private banking: showcase wealth-management single-bundle per le Cloud Engines di Internet Computer, dove i dati cliente non lasciano mai il compute della banca (segreto bancario, FINMA, FADP/GDPR).'
			),
			highlights: [
				L.en(
					'AI assistant canister that queries the bank’s data under the caller’s identity and calls a real LLM on an attached GPU node via HTTPS outcall; canister-built citations the model can’t invent.',
					'Canister assistente AI che interroga i dati della banca sotto l’identità del chiamante e chiama un LLM reale su GPU via HTTPS outcall; citazioni costruite dal canister, non inventate dal modello.'
				),
				L.en(
					'Role-gated CRM (Advisor / Compliance / Admin), hash-chained audit log of every read, write, and AI prompt, and Internet Identity at the edge.',
					'CRM con ruoli (Advisor / Compliance / Admin), audit log hash-chained di ogni lettura, scrittura e prompt AI, e Internet Identity al bordo.'
				)
			],
			links: [
				{
					label: L.en('GitHub', 'GitHub'),
					href: 'https://github.com/AntonioVentilii/privatim-bundle'
				}
			],
			stackIds: ['rust', 'icp', 'ai-agentic', 'cloud-engines']
		},
		{
			id: 'workday',
			title: L.en('Workday AI Control Plane', 'Workday AI Control Plane'),
			kind: 'personal',
			summary: L.en(
				'A developer-AI platform concept: team-pooled budgets, workday access windows, quota governance, and provider routing over LLMs such as Anthropic Claude. The control plane is the product; every surface is a thin adapter over one stable API.',
				'Una piattaforma AI per sviluppatori: budget condivisi di team, finestre di accesso “workday”, governance delle quote e routing tra provider LLM come Anthropic Claude. Il control plane è il prodotto; ogni surface è un adapter sottile su un’unica API stabile.'
			),
			highlights: [
				L.en(
					'Modular surfaces (VS Code extension, JetBrains, CLI, GitHub App, web dashboard, MCP server, Claude Code plugin) are all adapters over a shared client SDK and quota/policy/ledger/model-gateway core.',
					'Surface modulari (estensione VS Code, JetBrains, CLI, GitHub App, dashboard web, server MCP, plugin Claude Code) sono tutte adapter su un client SDK condiviso e un core di quota/policy/ledger/model-gateway.'
				)
			],
			links: [
				{
					label: L.en('GitHub', 'GitHub'),
					href: 'https://github.com/AntonioVentilii/workday-ai-control-plane'
				}
			],
			stackIds: ['typescript', 'ai-agentic']
		},
		{
			id: 'vici-maker',
			title: L.en('vici-maker', 'vici-maker'),
			kind: 'personal',
			summary: L.en(
				'Autonomous market maker for VICI: a Bun + Elysia service (on Fly.io) running an LMSR pricing brain that always quotes a price on every open prediction market, posting real two-sided limit orders on the on-chain CLOB so a market is never empty.',
				'Market maker autonomo per VICI: servizio Bun + Elysia (su Fly.io) con un “cervello” di pricing LMSR che quota sempre un prezzo su ogni mercato di previsione aperto, postando ordini limite reali su due lati sul CLOB on-chain così che un mercato non sia mai vuoto.'
			),
			links: [
				{
					label: L.en('GitHub', 'GitHub'),
					href: 'https://github.com/AntonioVentilii/vici-maker'
				}
			],
			stackIds: ['typescript', 'icp']
		},
		{
			id: 'icdc-core',
			title: L.en('icdc-core', 'icdc-core'),
			kind: 'personal',
			summary: L.en(
				'Clearing-focused core on the Internet Computer (Rust canisters): settlement-style workflows for on-chain markets.',
				'Core clearing su IC (Rust): workflow tipo settlement per mercati on-chain.'
			),
			links: [
				{
					label: L.en('GitHub', 'GitHub'),
					href: 'https://github.com/AntonioVentilii/icdc-core'
				}
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
				{
					label: L.en('GitHub', 'GitHub'),
					href: 'https://github.com/AntonioVentilii/escrow'
				}
			],
			stackIds: ['react']
		},
		{
			id: 'chaditt',
			title: L.en('CHaDitt', 'CHaDitt'),
			kind: 'personal',
			summary: L.en(
				'WhatsApp audio → transcription / translation via an AI model (Flask, webhooks).',
				'Audio WhatsApp → trascrizione/traduzione via modello AI (Flask, webhook).'
			),
			links: [
				{
					label: L.en('GitHub', 'GitHub'),
					href: 'https://github.com/AntonioVentilii/CHaDitt'
				}
			],
			stackIds: ['python']
		},
		{
			id: 'whatsapp-wrapper',
			title: L.en('whatsapp-wrapper', 'whatsapp-wrapper'),
			kind: 'personal',
			summary: L.en(
				'WhatsApp Cloud API wrapper with Firestore-backed message storage.',
				'Wrapper WhatsApp Cloud API con persistenza su Firestore.'
			),
			links: [
				{
					label: L.en('GitHub', 'GitHub'),
					href: 'https://github.com/AntonioVentilii/whatsapp-wrapper'
				}
			],
			stackIds: ['python']
		},
		{
			id: 'cryptovol',
			title: L.en('CryptoVol Robot', 'CryptoVol Robot'),
			kind: 'personal',
			summary: L.en(
				'Deribit + Telegram volatility bot for automated notifications.',
				'Bot di volatilità Deribit + Telegram per notifiche automatizzate.'
			),
			links: [{ label: L.en('GitHub', 'GitHub'), href: 'https://github.com/AntonioVentilii' }],
			stackIds: ['python']
		},
		{
			id: 'arbitrage',
			title: L.en('3-Way Arbitrage', '3-Way Arbitrage'),
			kind: 'personal',
			summary: L.en(
				'Cross-venue arbitrage system (including Kraken integration).',
				'Sistema di arbitraggio cross-venue (con integrazione Kraken).'
			),
			links: [{ label: L.en('GitHub', 'GitHub'), href: 'https://github.com/AntonioVentilii' }],
			stackIds: ['python']
		},
		{
			id: 'retropanda',
			title: L.en('RetroPandaClub NFT', 'RetroPandaClub NFT'),
			kind: 'personal',
			summary: L.en(
				'NFT smart contracts developed in Solidity and Rust.',
				'Smart contract NFT sviluppati in Solidity e Rust.'
			),
			links: [{ label: L.en('GitHub', 'GitHub'), href: 'https://github.com/AntonioVentilii' }],
			stackIds: ['rust', 'react']
		},
		{
			id: 'treasure-hunt',
			title: L.en('Treasure Hunt Bot', 'Treasure Hunt Bot'),
			kind: 'personal',
			summary: L.en(
				'Telegram puzzle bot for interactive engagement.',
				'Bot Telegram per puzzle e engagement interattivo.'
			),
			links: [{ label: L.en('GitHub', 'GitHub'), href: 'https://github.com/AntonioVentilii' }],
			stackIds: ['python']
		},
		{
			id: 'vici-app',
			title: L.en('vici-app', 'vici-app'),
			kind: 'personal',
			summary: L.en(
				'Svelte app in active development in the ecosystem.',
				'App Svelte in sviluppo attivo nell’ecosistema.'
			),
			links: [
				{
					label: L.en('GitHub', 'GitHub'),
					href: 'https://github.com/AntonioVentilii/vici-app'
				}
			],
			stackIds: ['svelte', 'typescript']
		},
		{
			id: 'vault',
			title: L.en('vault-app / vault-core', 'vault-app / vault-core'),
			kind: 'personal',
			summary: L.en(
				'Split Rust core and JavaScript app: a custody/experiment surface.',
				'Core Rust e app JS: superficie di esperimento per custodia.'
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
				'Factory canister for deploying and managing ICRC tokens on IC.',
				'Canister factory per token ICRC su Internet Computer.'
			),
			links: [
				{
					label: L.en('GitHub', 'GitHub'),
					href: 'https://github.com/AntonioVentilii/icrc-factory'
				}
			],
			stackIds: ['rust', 'icp']
		},
		{
			id: 'deribit-wrapper',
			title: L.en('deribit-wrapper', 'deribit-wrapper'),
			kind: 'personal',
			summary: L.en(
				'Python integration layer for Deribit’s trading API.',
				'Layer di integrazione Python per l’API di Deribit.'
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
			id: 'ventilii-graph',
			title: L.en('ventilii-graph', 'ventilii-graph'),
			kind: 'personal',
			summary: L.en(
				'The "Meta" Portfolio: This very interactive career map. A self-documenting visualization of my journey, stack, and projects.',
				'Il Portfolio "Meta": Questa mappa interattiva. Una visualizzazione auto-documentante del mio percorso, stack e progetti.'
			),
			highlights: [
				L.en(
					'Custom Force-Directed Graph using Svelte 5 and Tailwind CSS v4.',
					'Graph Force-Directed personalizzato in Svelte 5 e Tailwind CSS v4.'
				)
			],
			links: [
				{
					label: L.en('Repository', 'Repository'),
					href: 'https://github.com/AntonioVentilii/ventilii-graph'
				}
			],
			stackIds: ['typescript', 'svelte', 'tailwind'],
			note: L.en(
				'How meta it is that this portfolio is mentioned in itself as a project in its own deployment?',
				'Quanto è "meta" che questo portfolio sia menzionato in sé stesso come progetto nel suo stesso deployment?'
			)
		},
		{
			id: 'all-github',
			title: L.en('All public repositories', 'Tutte le repo pubbliche'),
			kind: 'personal',
			summary: L.en(
				'Full list on GitHub, including eslint plugins and other experiments.',
				'Lista completa su GitHub, con plugin eslint e altri esperimenti.'
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
			label: L.en('TypeScript / JS', 'TypeScript / JS'),
			blurb: L.en(
				'Primary language for OISY frontend/tooling. Emphasis on strict type safety and modern patterns.',
				'Linguaggio principale per OISY frontend/tooling. Focus su type safety e pattern moderni.'
			),
			yearsHint: L.en('Daily production use.', 'Uso quotidiano in produzione.'),
			relatedProjectIds: ['oisy', 'ventilii-graph', 'vici-app']
		},
		{
			id: 'rust',
			label: L.en('Rust', 'Rust'),
			blurb: L.en(
				'Backend canisters, icdc-core, vault-core, and systems programming.',
				'Canister backend, icdc-core, vault-core e programmazione di sistema.'
			),
			relatedProjectIds: ['oisy', 'icdc-core', 'vault', 'icrc-factory', 'retropanda', 'privatim']
		},
		{
			id: 'python',
			label: L.en('Python', 'Python'),
			blurb: L.en(
				'Trading automation, data pipelines, APIs (Flask), and optimisation logic.',
				'Automazione trading, pipeline dati, API Flask e logica di ottimizzazione.'
			),
			relatedProjectIds: ['chaditt', 'deribit-wrapper', 'bitcoin-utxo-lp', 'whatsapp-wrapper']
		},
		{
			id: 'svelte',
			label: L.en('Svelte / React', 'Svelte / React'),
			blurb: L.en(
				'Frontend development with Svelte, React, and React Native.',
				'Sviluppo frontend con Svelte, React e React Native.'
			),
			relatedProjectIds: ['oisy', 'ventilii-graph', 'vici-app', 'escrow', 'retropanda']
		},
		{
			id: 'tailwind',
			label: L.en('Tailwind CSS', 'Tailwind CSS'),
			blurb: L.en(
				'Utility-first CSS framework for rapid and consistent UI development. Used heavily in this portfolio and OISY.',
				'Framework CSS utility-first per sviluppo UI rapido e consistente. Usato pesantemente in questo portfolio e in OISY.'
			),
			relatedProjectIds: ['oisy', 'ventilii-graph']
		},
		{
			id: 'icp',
			label: L.en('Internet Computer / Web3', 'Internet Computer / Web3'),
			blurb: L.en(
				'ICP canisters, Internet Identity, and chain-key crypto patterns.',
				'Canister ICP, Internet Identity e pattern chain-key crypto.'
			),
			relatedProjectIds: ['oisy', 'icdc-core', 'icrc-factory', 'privatim', 'vici-maker']
		},
		{
			id: 'evm-solana',
			label: L.en('Multi-chain (EVM/SOL)', 'Multi-chain (EVM/SOL)'),
			blurb: L.en(
				'Cross-chain integration: Ethereum family and Solana.',
				'Integrazione cross-chain: famiglia Ethereum e Solana.'
			),
			relatedProjectIds: ['oisy']
		},
		{
			id: 'ai-agentic',
			label: L.en('AI / Agentic Engineering', 'AI / Ingegneria Agentica'),
			blurb: L.en(
				'Agentic development as a daily practice: coding agents for implementation and review, custom agent skills, and MCP connectors wired into real workflows. Used to ship faster while keeping code review, maintainability, and idiomatic code front and center.',
				'Sviluppo agentico come pratica quotidiana: coding agent per implementazione e review, skill agentiche custom e connettori MCP integrati nei workflow reali. Usati per accelerare la delivery mantenendo code review, manutenibilità e codice idiomatico.'
			),
			yearsHint: L.en('Core part of how I build today.', 'Parte centrale di come costruisco oggi.'),
			relatedProjectIds: [
				'claude-skills',
				'workday',
				'privatim',
				'oisy',
				'ventilii-graph',
				'chaditt'
			]
		},
		{
			id: 'cloud-engines',
			label: L.en('Cloud Engines (Sovereign apps)', 'Cloud Engines (App sovrane)'),
			blurb: L.en(
				'Single-bundle sovereign apps for the Internet Computer’s Cloud Engines marketplace: auditable and jurisdiction-locked, running on the customer’s own compute. A growing suite, starting with sovereign AI for private banking.',
				'App sovrane single-bundle per il marketplace Cloud Engines di Internet Computer: auditabili e vincolate per giurisdizione, eseguite sul compute del cliente. Una suite in crescita, a partire dall’AI sovrana per il private banking.'
			),
			relatedProjectIds: ['privatim']
		}
	],
	education: [
		{
			id: 'usp',
			institution: L.en('University of São Paulo', 'Università di San Paolo'),
			degrees: [
				{
					label: L.en(
						"Master's Degree in Aeronautics Engineering",
						'Magistrale in Ingegneria Aeronautica'
					),
					dates: L.en('2012-2013', '2012-2013'),
					note: L.en('International Exchange.', 'Scambio internazionale.')
				}
			]
		},
		{
			id: 'polimi',
			institution: L.en('Politecnico di Milano', 'Politecnico di Milano'),
			degrees: [
				{
					label: L.en(
						"Master's Degree in Aeronautics Engineering",
						'Magistrale in Ingegneria Aeronautica'
					),
					dates: L.en('2011-2013', '2011-2013'),
					note: L.en('2-year merit-based scholarship.', 'Borsa di merito biennale.')
				},
				{
					label: L.en(
						"Bachelor's Degree in Aerospace Engineering",
						'Triennale in Ingegneria Aerospaziale'
					),
					dates: L.en('2008-2011', '2008-2011'),
					note: L.en('3-year merit-based scholarship.', 'Borsa di merito triennale.')
				}
			]
		}
	],
	languages: [
		{ id: 'it', label: L.en('Italian', 'Italiano'), level: L.en('Native', 'Madrelingua') },
		{ id: 'pt', label: L.en('Portuguese', 'Portoghese'), level: L.en('Fluent', 'Fluente') },
		{ id: 'en', label: L.en('English', 'Inglese'), level: L.en('Fluent', 'Fluente') },
		{ id: 'de', label: L.en('German', 'Tedesco'), level: L.en('Elementary', 'Base') }
	],
	about: [
		{
			id: 'meta',
			title: L.en('A "Meta" Portfolio', 'Un Portfolio "Meta"'),
			body: L.en(
				'This project is recursive: it’s an interactive map of a career, built by its own subject using the same technologies (Svelte, Tailwind, TypeScript) it describes. It’s both the container and the content.',
				'Questo progetto è ricorsivo: una mappa interattiva di una carriera, costruita dal soggetto stesso usando le tecnologie (Svelte, Tailwind, TypeScript) che descrive. È sia il contenitore che il contenuto.'
			)
		},
		{
			id: 'map',
			title: L.en('How this portfolio works', 'Come funziona questa portfolio'),
			body: L.en(
				'Identity at the center, categories in the first ring, items in the second. Details appear in the panel. Use Tab to navigate; a list view is available on GitHub.',
				'Identità al centro, categorie nel primo anello, elementi nel secondo. I dettagli compaiono nel pannello. Naviga con Tab.'
			)
		}
	],
	orgHighlights: [
		{
			name: 'dfinity/oisy-wallet',
			url: 'https://github.com/dfinity/oisy-wallet',
			note: L.en(
				'Primary public repo for my current product work: TypeScript, Svelte, Rust; Apache-2.0.',
				'Mia repo prodotto principale: TypeScript, Svelte, Rust; Apache-2.0.'
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
