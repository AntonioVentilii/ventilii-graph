import type { Localised, PortfolioData } from '$lib/types/portfolio.types';

const L = {
	// eslint-disable-next-line local-rules/prefer-object-params
	en: (en: string, it?: string, pt?: string): Localised => ({
		en,
		...(it !== undefined && { it }),
		...(pt !== undefined && { pt })
	})
};

export const portfolioData: PortfolioData = {
	person: {
		id: 'person',
		name: 'Antonio Ventilii',
		title: L.en('Senior Software Engineer', 'Senior Software Engineer', 'Senior Software Engineer'),
		tagline: L.en(
			'Senior software engineer shipping production systems in TypeScript, Rust, and Python across Web3 and traditional finance, including a flagship wallet whose full codebase is public on GitHub. AI-native workflow: orchestrating fleets of coding agents across many parallel projects, with custom agent skills and MCP connectors, while still owning architecture, the hard code, and every review.',
			'Senior software engineer con sistemi production in TypeScript, Rust e Python tra Web3 e finanza tradizionale, incluso un wallet flagship open source su GitHub. Workflow AI-native: orchestrazione di flotte di coding agent su molti progetti in parallelo, con skill agentiche custom e connettori MCP, mantenendo la responsabilità di architettura, codice difficile e ogni review.',
			'Engenheiro de software sênior entregando sistemas em produção com TypeScript, Rust e Python entre Web3 e finanças tradicionais, incluindo uma wallet flagship com código totalmente público no GitHub. Workflow AI-native: orquestrando frotas de coding agents em muitos projetos paralelos, com skills de agente customizadas e conectores MCP, mantendo a responsabilidade pela arquitetura, pelo código difícil e por cada review.'
		),
		location: L.en('Zurich, Switzerland', 'Zurigo, Svizzera', 'Zurique, Suíça'),
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
			label: L.en('Experience', 'Esperienza', 'Experiência'),
			shortHint: L.en(
				'Roles, impact, and timelines.',
				'Ruoli, impatto e periodi.',
				'Cargos, impacto e períodos.'
			)
		},
		{
			id: 'projects',
			label: L.en('Projects', 'Progetti', 'Projetos'),
			shortHint: L.en(
				'OISY, personal repos, experiments.',
				'OISY, repo personali, esperimenti.',
				'OISY, repositórios pessoais, experimentos.'
			)
		},
		{
			id: 'stack',
			label: L.en('Stack', 'Stack', 'Stack'),
			shortHint: L.en(
				'Languages, frontend, Web3, AI/agentic, platforms.',
				'Linguaggi, frontend, Web3, AI/agentico, piattaforme.',
				'Linguagens, frontend, Web3, IA/agêntico, plataformas.'
			)
		},
		{
			id: 'education',
			label: L.en('Education', 'Formazione', 'Formação'),
			shortHint: L.en(
				'Degrees and scholarships.',
				'Titoli e borse di studio.',
				'Diplomas e bolsas de estudo.'
			)
		},
		{
			id: 'languages',
			label: L.en('Languages', 'Lingue', 'Idiomas'),
			shortHint: L.en(
				'Spoken languages. UI copy stays in your toggle.',
				'Lingue parlate. L’interfaccia segue il selettore.',
				'Idiomas falados. A interface segue o seletor.'
			)
		},
		{
			id: 'about',
			label: L.en('About', 'About', 'Sobre'),
			shortHint: L.en('How to read this map.', 'Come leggere questa mappa.', 'Como ler este mapa.')
		}
	],
	experiences: [
		{
			id: 'dfinity',
			company: L.en('DFINITY Foundation', 'DFINITY Foundation'),
			location: L.en('Zurich, Switzerland', 'Zurigo, Svizzera', 'Zurique, Suíça'),
			role: L.en('Senior Software Engineer', 'Senior Software Engineer'),
			dates: L.en('2024-Present', '2024-oggi', '2024-presente'),
			summary: L.en(
				'OISY Wallet (Apache-2.0): production, multi-chain browser wallet on the Internet Computer (TypeScript, Svelte, Rust canisters, chain fusion). Fully public development on GitHub; primary contributor by commit volume (AntonioVentilii). Also collaborates on other foundation initiatives and partner-facing engineering.',
				'OISY Wallet (Apache-2.0): wallet browser multi-chain su Internet Computer (TS, Svelte, Rust, chain fusion). Sviluppo pubblico su GitHub; contributore principale per volume di commit.',
				'OISY Wallet (Apache-2.0): wallet de navegador multi-chain em produção na Internet Computer (TypeScript, Svelte, canisters em Rust, chain fusion). Desenvolvimento totalmente público no GitHub; principal contribuidor por volume de commits (AntonioVentilii). Também colabora em outras iniciativas da fundação e em engenharia voltada a parceiros.'
			),
			highlights: [
				L.en(
					'Solana (mainnet & devnet): extended the product to SOL and SPL (send, receive, balances/history) with correct account and transaction semantics; integrated chain-key signing paths that differ materially from Bitcoin and Ethereum.',
					'Solana (mainnet & devnet): esteso il prodotto a SOL e SPL (invio/ricezione/storico) con semantica corretta; integrazione signing chain-key differente da BTC/ETH.',
					'Solana (mainnet e devnet): estendeu o produto a SOL e SPL (envio, recebimento, saldos/histórico) com semântica correta de contas e transações; integrou caminhos de assinatura chain-key materialmente diferentes de Bitcoin e Ethereum.'
				),
				L.en(
					'EVM scale-out: shipped Base, Polygon, Arbitrum, and BSC behind one extensible integration pattern and documented how to add further chains.',
					'EVM scale-out: Base, Polygon, Arbitrum e BSC sotto un unico pattern estensibile; documentata l’aggiunta di nuove reti.',
					'Escala EVM: lançou Base, Polygon, Arbitrum e BSC sob um único padrão de integração extensível e documentou como adicionar novas redes.'
				),
				L.en(
					'In-wallet services: swap flows via NEAR Intents (Solana and EVMs) through a pluggable provider model; fiat on-ramp via Onramper (buy crypto without leaving the wallet).',
					'Servizi in-wallet: swap via NEAR Intents (Solana/EVM) con modello a provider; on-ramp fiat via Onramper.',
					'Serviços in-wallet: fluxos de swap via NEAR Intents (Solana e EVMs) com modelo de providers plugáveis; on-ramp fiat via Onramper (comprar cripto sem sair da wallet).'
				),
				L.en(
					'Performance / architecture: moved transaction loading (pagination, caching, persistence) and exchange-rate refresh into canisters with scheduled jobs, reducing browser work and stabilizing UI under real usage.',
					'Performance/architettura: spostato carico transazioni (paginazione, cache, persistenza) su canister con job schedulati.',
					'Performance/arquitetura: moveu o carregamento de transações (paginação, cache, persistência) e a atualização de câmbio para canisters com jobs agendados, reduzindo o trabalho no navegador e estabilizando a UI sob uso real.'
				),
				L.en(
					'Security / abuse: rate limits on sensitive endpoints; Internet Identity delegation-chain validation so backend requests align with the legitimate frontend.',
					'Security: rate limit su endpoint sensibili; valida della catena di delegazione Internet Identity.',
					'Segurança: rate limits em endpoints sensíveis; validação da cadeia de delegação do Internet Identity para alinhar as requisições de backend ao frontend legítimo.'
				),
				L.en(
					'Product, leadership, tooling: currency and language preferences and token-list performance work; before a team restructure, owned technical direction, planning, and mentoring; introduced a shared ESLint setup (strict + custom rules) reused across foundation repos; coding agents used heavily for implementation and review.',
					'Leadership & tooling: preferenze UI, performance liste token; direzione tecnica e mentoring; setup ESLint condiviso; uso intensivo di coding agents.',
					'Produto, liderança, tooling: preferências de moeda e idioma e performance de listas de tokens; antes de uma reestruturação do time, foi responsável por direção técnica, planejamento e mentoria; introduziu um setup ESLint compartilhado (estrito + regras custom) reutilizado em repositórios da fundação; uso intensivo de coding agents para implementação e review.'
				)
			],
			links: [
				{
					label: L.en('OISY on GitHub', 'OISY su GitHub', 'OISY no GitHub'),
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
			location: L.en('Zurich, Switzerland', 'Zurigo, Svizzera', 'Zurique, Suíça'),
			role: L.en(
				'Desk Developer / Senior Multi-Asset Trader',
				'Desk Developer / Senior Multi-Asset Trader'
			),
			dates: L.en('2020-2024', '2020-2024'),
			summary: L.en(
				'Former UBS Swiss Financial Advisers AG. Built desk automation and controls while executing multi-asset trades for HNWI/UHNWI clients. Cut time on repetitive desk operations from about eight hours to about two hours per day.',
				'Ex UBS Swiss Financial Advisers. Automazione desk operando mercati multi-asset per clienti HNWI/UHNWI. Operazioni ripetitive ridotte da 8 a 2 ore al giorno.',
				'Antiga UBS Swiss Financial Advisers AG. Construiu automação e controles da mesa enquanto executava operações multi-asset para clientes HNWI/UHNWI. Reduziu operações repetitivas de cerca de oito para cerca de duas horas por dia.'
			),
			highlights: [
				L.en(
					'Flask API and React web app for rule-based asset screening and analysis, used across four teams.',
					'API Flask e app React per screening asset basato su regole, usato da quattro team.',
					'API Flask e web app React para triagem e análise de ativos baseada em regras, usadas por quatro times.'
				),
				L.en(
					'FX book end-of-day hedge optimisation (linear programming), cutting related market fees by about 40%.',
					'Ottimizzazione hedge EOD FX (programmazione lineare), -40% in fee di mercato.',
					'Otimização de hedge EOD do book de FX (programação linear), cortando cerca de 40% das taxas de mercado relacionadas.'
				),
				L.en(
					'Python package automating the booking GUI, eliminating manual steps across 7-8 recurring desk workflows; data pipeline for Bloomberg and third-party market data; internal/external API wrappers.',
					'Package Python per automazione GUI booking su 7-8 workflow; pipeline dati Bloomberg.',
					'Pacote Python automatizando a GUI de booking, eliminando passos manuais em 7-8 fluxos recorrentes da mesa; pipeline de dados para Bloomberg e dados de mercado de terceiros; wrappers de APIs internas/externas.'
				),
				L.en(
					'Git-based workflows, testing, and DevOps practices adopted desk-wide.',
					'Workflow basati su Git, testing e pratiche DevOps adottate in tutto il desk.',
					'Fluxos baseados em Git, testes e práticas de DevOps adotados por toda a mesa.'
				),
				L.en(
					'Executed trades on multi-asset markets (Fixed Income, FX, Equity, Structured Products, Derivatives) for HNWI and UHNWI clients.',
					'Esecuzione trade multi-asset (FI, FX, Equity, Strutturati, Derivati).',
					'Execução de operações em mercados multi-asset (Renda Fixa, FX, Ações, Estruturados, Derivativos) para clientes HNWI e UHNWI.'
				)
			],
			stackIds: ['python', 'svelte']
		},
		{
			id: 'itau-ch',
			company: L.en('Banco Itaú (Suisse) S.A.', 'Banco Itaú (Suisse) S.A.'),
			location: L.en('Zurich, Switzerland', 'Zurigo, Svizzera', 'Zurique, Suíça'),
			role: L.en('Senior Trader / Desk Developer', 'Senior Trader / Desk Developer'),
			dates: L.en('2019-2020', '2019-2020'),
			summary: L.en(
				'Trading and coding for desk controls: scrapers for Certificates of Deposit, automated booking/pricing/P&L reporting.',
				'Trading e tool per controlli: scraper per CD, reporting booking/pricing/P&L.',
				'Trading e código para controles da mesa: scrapers de Certificados de Depósito, relatórios automatizados de booking/pricing/P&L.'
			),
			highlights: [
				L.en(
					'Multi-asset execution including derivatives and structured products.',
					'Esecuzione multi-asset con derivati e strutturati.',
					'Execução multi-asset incluindo derivativos e produtos estruturados.'
				),
				L.en(
					'Trade ideas for Direct Access clients in Derivatives and Fixed Income.',
					'Idee di trade per Direct Access in Derivati e Fixed Income.',
					'Ideias de trade para clientes Direct Access em Derivativos e Renda Fixa.'
				)
			],
			stackIds: ['python']
		},
		{
			id: 'stoneco',
			company: L.en('StoneCo Ltd.', 'StoneCo Ltd.'),
			location: L.en('São Paulo, Brazil', 'San Paolo, Brasile', 'São Paulo, Brasil'),
			role: L.en(
				'Desk Developer / Financial Specialist, Treasury & Risk',
				'Desk Developer / Financial Specialist, Treasury & Risk'
			),
			dates: L.en('2018-2019', '2018-2019'),
			summary: L.en(
				'IPO controls with internal dev teams, market risk data platform, Scrum/DevOps, treasury hedging, regulatory filing support.',
				'Controlli IPO con team interni, piattaforma market risk, Scrum/DevOps, treasury, supporto filing.',
				'Controles de IPO com times internos de dev, plataforma de dados de risco de mercado, Scrum/DevOps, hedge de tesouraria, suporte a arquivamentos regulatórios.'
			),
			highlights: [
				L.en(
					'Market data: Bloomberg, Yahoo, APIs, scraping.',
					'Market data: Bloomberg, Yahoo, API, scraping.',
					'Dados de mercado: Bloomberg, Yahoo, APIs, scraping.'
				),
				L.en(
					'Agile (Scrum); Docker/venv and CI/CD with automated tests.',
					'Agile (Scrum); Docker/venv e CI/CD con test automatizzati.',
					'Ágil (Scrum); Docker/venv e CI/CD com testes automatizados.'
				)
			],
			stackIds: ['python', 'svelte']
		},
		{
			id: 'itau-br',
			company: L.en('Itaú Unibanco S.A.', 'Itaú Unibanco S.A.'),
			location: L.en('São Paulo, Brazil', 'San Paolo, Brasile', 'São Paulo, Brasil'),
			role: L.en(
				'Trader at Volatility Trading Desk',
				'Trader at Volatility Trading Desk',
				'Trader na Mesa de Volatilidade'
			),
			dates: L.en('2013-2016', '2013-2016'),
			summary: L.en(
				'Flow pricing, prop risk, internal clients; co-built desk controls and a central Volatility database (SQL, C#).',
				'Pricing flow, rischio prop, clienti interni; controlli desk e database Volatilità centralizzato.',
				'Pricing de fluxo, risco proprietário, clientes internos; coconstruiu controles da mesa e um banco de dados central de Volatilidade (SQL, C#).'
			),
			highlights: [
				L.en(
					'Automation with layered security and redundancy.',
					'Automazione con sicurezza a strati e ridondanza.',
					'Automação com segurança em camadas e redundância.'
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
				'Wallet multi-chain su Internet Computer. Codebase pubblica e revisionabile su GitHub.',
				'Wallet de navegador multi-chain na Internet Computer. Código público: histórico auditável, issues e reviews no GitHub. Foco principal do meu cargo atual.'
			),
			highlights: [
				L.en(
					'Apache-2.0, TypeScript + Svelte frontend, Rust canisters, chain fusion (Bitcoin, Ethereum-family, Solana).',
					'Apache-2.0, frontend TS/Svelte, canister Rust, chain fusion (BTC, EVM, Solana).',
					'Apache-2.0, frontend TypeScript + Svelte, canisters em Rust, chain fusion (Bitcoin, família Ethereum, Solana).'
				)
			],
			links: [
				{
					label: L.en('Repository', 'Repository', 'Repositório'),
					href: 'https://github.com/dfinity/oisy-wallet'
				},
				{ label: L.en('Website', 'Sito', 'Site'), href: 'https://oisy.com' }
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
				'Skill agentiche per Claude Code sotto version control: una casa durevole su git, in symlink sull’agente locale così da non perderle mai, pronte anche come plugin marketplace per un team.',
				'Skills de agente do Claude Code versionadas: um lar durável no git, com symlink para o agente local para nunca se perderem, prontas para servir também como marketplace de plugins para um time.'
			),
			highlights: [
				L.en(
					'Skills like prototype-to-app-port (high-fidelity design→production porting) and sapiens (a concise-but-complete communication mode), each with a triggerable command.',
					'Skill come prototype-to-app-port (porting design→produzione ad alta fedeltà) e sapiens (modalità di comunicazione concisa ma completa), ciascuna con comando dedicato.',
					'Skills como prototype-to-app-port (porte de design→produção em alta fidelidade) e sapiens (modo de comunicação conciso mas completo), cada uma com comando dedicado.'
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
			id: 'ombrellone',
			title: L.en('OmbrellOne', 'OmbrellOne'),
			kind: 'personal',
			summary: L.en(
				'Beach-umbrella booking marketplace, live at ombrell.one. Started as a Motoko + React app on the Internet Computer, then ported to a Bun + Elysia + Postgres backend on Fly.io with the same React frontend.',
				'Marketplace di prenotazione ombrelloni, live su ombrell.one. Nato come app Motoko + React su Internet Computer, poi portato su backend Bun + Elysia + Postgres su Fly.io con lo stesso frontend React.',
				'Marketplace de reserva de guarda-sóis, no ar em ombrell.one. Começou como app Motoko + React na Internet Computer, depois portado para um backend Bun + Elysia + Postgres no Fly.io com o mesmo frontend React.'
			),
			highlights: [
				L.en(
					'Full product surface: email-OTP and Google auth, listings with photo uploads (S3-compatible storage), bookings, and Stripe payments where the platform never holds host funds.',
					'Superficie prodotto completa: auth email-OTP e Google, annunci con foto (storage S3-compatible), prenotazioni e pagamenti Stripe dove la piattaforma non custodisce mai i fondi degli host.',
					'Superfície completa de produto: auth por email-OTP e Google, anúncios com upload de fotos (storage compatível com S3), reservas e pagamentos Stripe em que a plataforma nunca retém os fundos dos anfitriões.'
				)
			],
			links: [{ label: L.en('ombrell.one', 'ombrell.one'), href: 'https://ombrell.one' }],
			stackIds: ['typescript', 'svelte', 'tailwind']
		},
		{
			id: 'verto',
			title: L.en('Verto', 'Verto'),
			kind: 'personal',
			summary: L.en(
				'Framework for AI-personalized apps with governance: users request personal app variants, an agent classifies and generates reversible variant manifests, policy validates them, and repeated successful variants are promoted into product proposals.',
				'Framework per app personalizzate dall’AI con governance: gli utenti chiedono varianti personali, un agente classifica e genera manifest reversibili, la policy li valida e le varianti ricorrenti diventano proposte di prodotto.',
				'Framework para apps personalizados por IA com governança: usuários pedem variantes pessoais, um agente classifica e gera manifests reversíveis, a policy os valida e variantes recorrentes bem-sucedidas viram propostas de produto.'
			),
			highlights: [
				L.en(
					'TypeScript monorepo: typed agent contracts, policy engine, variant engine with rollback, telemetry contracts, and a Svelte reference integration. In active development.',
					'Monorepo TypeScript: contratti agente tipizzati, policy engine, variant engine con rollback, contratti di telemetria e integrazione di riferimento in Svelte. In sviluppo attivo.',
					'Monorepo TypeScript: contratos de agente tipados, policy engine, variant engine com rollback, contratos de telemetria e integração de referência em Svelte. Em desenvolvimento ativo.'
				)
			],
			stackIds: ['typescript', 'svelte', 'ai-agentic']
		},
		{
			id: 'privatim',
			title: L.en('Privatim: Sovereign AI', 'Privatim: Sovereign AI', 'Privatim: IA Soberana'),
			kind: 'personal',
			summary: L.en(
				'Sovereign AI for private banking: a single-bundle wealth-management showcase for the Internet Computer’s Cloud Engines, built so client data never leaves the bank’s compute (banking secrecy, FINMA, FADP/GDPR).',
				'AI sovrana per il private banking: showcase wealth-management single-bundle per le Cloud Engines di Internet Computer, dove i dati cliente non lasciano mai il compute della banca (segreto bancario, FINMA, FADP/GDPR).',
				'IA soberana para private banking: showcase de wealth management em bundle único para as Cloud Engines da Internet Computer, construída para que os dados do cliente nunca saiam do compute do banco (sigilo bancário, FINMA, FADP/GDPR).'
			),
			highlights: [
				L.en(
					'AI assistant canister that queries the bank’s data under the caller’s identity and calls a real LLM on an attached GPU node via HTTPS outcall; canister-built citations the model can’t invent.',
					'Canister assistente AI che interroga i dati della banca sotto l’identità del chiamante e chiama un LLM reale su GPU via HTTPS outcall; citazioni costruite dal canister, non inventate dal modello.',
					'Canister assistente de IA que consulta os dados do banco sob a identidade do chamador e chama um LLM real em um nó GPU via HTTPS outcall; citações construídas pelo canister que o modelo não pode inventar.'
				),
				L.en(
					'Role-gated CRM (Advisor / Compliance / Admin), hash-chained audit log of every read, write, and AI prompt, and Internet Identity at the edge.',
					'CRM con ruoli (Advisor / Compliance / Admin), audit log hash-chained di ogni lettura, scrittura e prompt AI, e Internet Identity al bordo.',
					'CRM com papéis (Advisor / Compliance / Admin), audit log em hash-chain de cada leitura, escrita e prompt de IA, e Internet Identity na borda.'
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
				'Una piattaforma AI per sviluppatori: budget condivisi di team, finestre di accesso “workday”, governance delle quote e routing tra provider LLM come Anthropic Claude. Il control plane è il prodotto; ogni surface è un adapter sottile su un’unica API stabile.',
				'Um conceito de plataforma de IA para desenvolvedores: orçamentos compartilhados por time, janelas de acesso "workday", governança de quotas e roteamento entre providers de LLM como o Anthropic Claude. O control plane é o produto; cada surface é um adapter fino sobre uma única API estável.'
			),
			highlights: [
				L.en(
					'Modular surfaces (VS Code extension, JetBrains, CLI, GitHub App, web dashboard, MCP server, Claude Code plugin) are all adapters over a shared client SDK and quota/policy/ledger/model-gateway core.',
					'Surface modulari (estensione VS Code, JetBrains, CLI, GitHub App, dashboard web, server MCP, plugin Claude Code) sono tutte adapter su un client SDK condiviso e un core di quota/policy/ledger/model-gateway.',
					'Surfaces modulares (extensão VS Code, JetBrains, CLI, GitHub App, dashboard web, servidor MCP, plugin do Claude Code) são todas adapters sobre um client SDK compartilhado e um núcleo de quota/policy/ledger/model-gateway.'
				)
			],
			stackIds: ['typescript', 'ai-agentic']
		},
		{
			id: 'vici-maker',
			title: L.en('vici-maker', 'vici-maker'),
			kind: 'personal',
			summary: L.en(
				'Autonomous market maker for VICI: a Bun + Elysia service (on Fly.io) running an LMSR pricing brain that always quotes a price on every open prediction market, posting real two-sided limit orders on the on-chain CLOB so a market is never empty.',
				'Market maker autonomo per VICI: servizio Bun + Elysia (su Fly.io) con un “cervello” di pricing LMSR che quota sempre un prezzo su ogni mercato di previsione aperto, postando ordini limite reali su due lati sul CLOB on-chain così che un mercato non sia mai vuoto.',
				'Market maker autônomo para o VICI: um serviço Bun + Elysia (no Fly.io) com um "cérebro" de pricing LMSR que sempre cota um preço em cada mercado de previsão aberto, postando ordens limite reais dos dois lados no CLOB on-chain para que um mercado nunca fique vazio.'
			),
			links: [
				{
					label: L.en('VICI on GitHub', 'VICI su GitHub', 'VICI no GitHub'),
					href: 'https://github.com/ViciApp'
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
				'Core clearing su IC (Rust): workflow tipo settlement per mercati on-chain.',
				'Núcleo focado em clearing na Internet Computer (canisters em Rust): fluxos estilo settlement para mercados on-chain.'
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
				'Escrow decentralizzato in Solidity con ruoli user/admin/arbitro; app React.',
				'Escrow descentralizado: Solidity com papéis de usuário, admin e árbitro; app React para interação.'
			),
			links: [
				{
					label: L.en('GitHub', 'GitHub'),
					href: 'https://github.com/AntonioVentilii/escrow'
				}
			],
			stackIds: ['svelte']
		},
		{
			id: 'chaditt',
			title: L.en('CHaDitt', 'CHaDitt'),
			kind: 'personal',
			summary: L.en(
				'WhatsApp audio → transcription / translation via an AI model (Flask, webhooks).',
				'Audio WhatsApp → trascrizione/traduzione via modello AI (Flask, webhook).',
				'Áudio do WhatsApp → transcrição/tradução via modelo de IA (Flask, webhooks).'
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
				'Wrapper WhatsApp Cloud API con persistenza su Firestore.',
				'Wrapper da WhatsApp Cloud API com armazenamento de mensagens no Firestore.'
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
				'Bot di volatilità Deribit + Telegram per notifiche automatizzate.',
				'Bot de volatilidade Deribit + Telegram para notificações automatizadas.'
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
				'Sistema di arbitraggio cross-venue (con integrazione Kraken).',
				'Sistema de arbitragem entre venues (incluindo integração com a Kraken).'
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
				'Smart contract NFT sviluppati in Solidity e Rust.',
				'Smart contracts de NFT desenvolvidos em Solidity e Rust.'
			),
			links: [{ label: L.en('GitHub', 'GitHub'), href: 'https://github.com/AntonioVentilii' }],
			stackIds: ['rust', 'svelte']
		},
		{
			id: 'treasure-hunt',
			title: L.en('Treasure Hunt Bot', 'Treasure Hunt Bot'),
			kind: 'personal',
			summary: L.en(
				'Telegram puzzle bot for interactive engagement.',
				'Bot Telegram per puzzle e engagement interattivo.',
				'Bot de puzzles no Telegram para engajamento interativo.'
			),
			links: [{ label: L.en('GitHub', 'GitHub'), href: 'https://github.com/AntonioVentilii' }],
			stackIds: ['python']
		},
		{
			id: 'vici-app',
			title: L.en('vici-app', 'vici-app'),
			kind: 'personal',
			summary: L.en(
				'VICI prediction-markets app: Svelte frontend in active development in the VICI ecosystem.',
				'App di mercati di previsione VICI: frontend Svelte in sviluppo attivo nell’ecosistema VICI.',
				'App de mercados de previsão VICI: frontend Svelte em desenvolvimento ativo no ecossistema VICI.'
			),
			links: [
				{
					label: L.en('GitHub', 'GitHub'),
					href: 'https://github.com/ViciApp/vici-app'
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
				'Core Rust e app JS: superficie di esperimento per custodia.',
				'Núcleo em Rust e app em JavaScript separados: uma superfície de experimentos de custódia.'
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
				'Canister factory per token ICRC su Internet Computer.',
				'Canister factory para implantar e gerenciar tokens ICRC na IC.'
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
				'Layer di integrazione Python per l’API di Deribit.',
				'Camada de integração em Python para a API de trading da Deribit.'
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
				'Selezione UTXO Bitcoin con ottimizzazione LP/MILP.',
				'Seleção de UTXOs de Bitcoin via otimização LP/MILP.'
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
				'Il Portfolio "Meta": Questa mappa interattiva. Una visualizzazione auto-documentante del mio percorso, stack e progetti.',
				'O Portfólio "Meta": este próprio mapa interativo de carreira. Uma visualização autodocumentada da minha trajetória, stack e projetos.'
			),
			highlights: [
				L.en(
					'Custom Force-Directed Graph using Svelte 5 and Tailwind CSS v4.',
					'Graph Force-Directed personalizzato in Svelte 5 e Tailwind CSS v4.',
					'Grafo force-directed customizado em Svelte 5 e Tailwind CSS v4.'
				)
			],
			links: [
				{
					label: L.en('Repository', 'Repository', 'Repositório'),
					href: 'https://github.com/AntonioVentilii/ventilii-graph'
				}
			],
			stackIds: ['typescript', 'svelte', 'tailwind'],
			note: L.en(
				'How meta it is that this portfolio is mentioned in itself as a project in its own deployment?',
				'Quanto è "meta" che questo portfolio sia menzionato in sé stesso come progetto nel suo stesso deployment?',
				'Quão "meta" é este portfólio ser mencionado dentro de si mesmo como projeto no próprio deployment?'
			)
		},
		{
			id: 'all-github',
			title: L.en(
				'All public repositories',
				'Tutte le repo pubbliche',
				'Todos os repositórios públicos'
			),
			kind: 'personal',
			summary: L.en(
				'Full list on GitHub, including eslint plugins and other experiments.',
				'Lista completa su GitHub, con plugin eslint e altri esperimenti.',
				'Lista completa no GitHub, incluindo plugins de eslint e outros experimentos.'
			),
			links: [
				{
					label: L.en('AntonioVentilii on GitHub', 'Profilo GitHub', 'AntonioVentilii no GitHub'),
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
				'Linguaggio principale per OISY frontend/tooling. Focus su type safety e pattern moderni.',
				'Linguagem principal para frontend/tooling do OISY. Ênfase em type safety estrita e padrões modernos.'
			),
			yearsHint: L.en(
				'Daily production use.',
				'Uso quotidiano in produzione.',
				'Uso diário em produção.'
			),
			relatedProjectIds: ['oisy', 'ventilii-graph', 'vici-app', 'ombrellone', 'verto']
		},
		{
			id: 'rust',
			label: L.en('Rust', 'Rust'),
			blurb: L.en(
				'Backend canisters, icdc-core, vault-core, and systems programming.',
				'Canister backend, icdc-core, vault-core e programmazione di sistema.',
				'Canisters de backend, icdc-core, vault-core e programação de sistemas.'
			),
			relatedProjectIds: ['oisy', 'icdc-core', 'vault', 'icrc-factory', 'retropanda', 'privatim']
		},
		{
			id: 'python',
			label: L.en('Python', 'Python'),
			blurb: L.en(
				'Trading automation, data pipelines, APIs (Flask), and optimisation logic.',
				'Automazione trading, pipeline dati, API Flask e logica di ottimizzazione.',
				'Automação de trading, pipelines de dados, APIs (Flask) e lógica de otimização.'
			),
			relatedProjectIds: ['chaditt', 'deribit-wrapper', 'bitcoin-utxo-lp', 'whatsapp-wrapper']
		},
		{
			id: 'svelte',
			label: L.en('Svelte / React', 'Svelte / React'),
			blurb: L.en(
				'Frontend development with Svelte, React, and React Native.',
				'Sviluppo frontend con Svelte, React e React Native.',
				'Desenvolvimento frontend com Svelte, React e React Native.'
			),
			relatedProjectIds: [
				'oisy',
				'ventilii-graph',
				'vici-app',
				'escrow',
				'retropanda',
				'ombrellone',
				'verto'
			]
		},
		{
			id: 'tailwind',
			label: L.en('Tailwind CSS', 'Tailwind CSS'),
			blurb: L.en(
				'Utility-first CSS framework for rapid and consistent UI development. Used heavily in this portfolio and OISY.',
				'Framework CSS utility-first per sviluppo UI rapido e consistente. Usato pesantemente in questo portfolio e in OISY.',
				'Framework CSS utility-first para desenvolvimento de UI rápido e consistente. Usado intensamente neste portfólio e no OISY.'
			),
			relatedProjectIds: ['oisy', 'ventilii-graph', 'ombrellone']
		},
		{
			id: 'icp',
			label: L.en('Internet Computer / Web3', 'Internet Computer / Web3'),
			blurb: L.en(
				'ICP canisters, Internet Identity, and chain-key crypto patterns.',
				'Canister ICP, Internet Identity e pattern chain-key crypto.',
				'Canisters ICP, Internet Identity e padrões de criptografia chain-key.'
			),
			relatedProjectIds: ['oisy', 'icdc-core', 'icrc-factory', 'privatim', 'vici-maker']
		},
		{
			id: 'evm-solana',
			label: L.en('Multi-chain (EVM/SOL)', 'Multi-chain (EVM/SOL)'),
			blurb: L.en(
				'Cross-chain integration: Ethereum family and Solana.',
				'Integrazione cross-chain: famiglia Ethereum e Solana.',
				'Integração cross-chain: família Ethereum e Solana.'
			),
			relatedProjectIds: ['oisy']
		},
		{
			id: 'ai-agentic',
			label: L.en(
				'AI / Agentic Engineering',
				'AI / Ingegneria Agentica',
				'IA / Engenharia Agêntica'
			),
			blurb: L.en(
				'Agentic development as a daily practice: coding agents for implementation and review, custom agent skills, and MCP connectors wired into real workflows. Used to ship faster while keeping code review, maintainability, and idiomatic code front and center.',
				'Sviluppo agentico come pratica quotidiana: coding agent per implementazione e review, skill agentiche custom e connettori MCP integrati nei workflow reali. Usati per accelerare la delivery mantenendo code review, manutenibilità e codice idiomatico.',
				'Desenvolvimento agêntico como prática diária: coding agents para implementação e review, skills de agente customizadas e conectores MCP integrados a fluxos reais. Usados para entregar mais rápido mantendo code review, manutenibilidade e código idiomático em primeiro plano.'
			),
			yearsHint: L.en(
				'Core part of how I build today.',
				'Parte centrale di come costruisco oggi.',
				'Parte central de como eu construo hoje.'
			),
			relatedProjectIds: [
				'claude-skills',
				'workday',
				'verto',
				'privatim',
				'oisy',
				'ventilii-graph',
				'chaditt'
			]
		},
		{
			id: 'cloud-engines',
			label: L.en(
				'Cloud Engines (Sovereign apps)',
				'Cloud Engines (App sovrane)',
				'Cloud Engines (Apps soberanos)'
			),
			blurb: L.en(
				'Single-bundle sovereign apps for the Internet Computer’s Cloud Engines marketplace: auditable and jurisdiction-locked, running on the customer’s own compute. A growing suite, starting with sovereign AI for private banking.',
				'App sovrane single-bundle per il marketplace Cloud Engines di Internet Computer: auditabili e vincolate per giurisdizione, eseguite sul compute del cliente. Una suite in crescita, a partire dall’AI sovrana per il private banking.',
				'Apps soberanos em bundle único para o marketplace Cloud Engines da Internet Computer: auditáveis e restritos por jurisdição, rodando no compute do próprio cliente. Uma suíte em crescimento, começando com IA soberana para private banking.'
			),
			relatedProjectIds: ['privatim']
		}
	],
	education: [
		{
			id: 'usp',
			institution: L.en(
				'University of São Paulo',
				'Università di San Paolo',
				'Universidade de São Paulo'
			),
			degrees: [
				{
					label: L.en(
						"Master's Degree in Aeronautics Engineering",
						'Magistrale in Ingegneria Aeronautica',
						'Mestrado em Engenharia Aeronáutica'
					),
					dates: L.en('2012-2013', '2012-2013'),
					note: L.en(
						'International Exchange.',
						'Scambio internazionale.',
						'Intercâmbio internacional.'
					)
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
						'Magistrale in Ingegneria Aeronautica',
						'Mestrado em Engenharia Aeronáutica'
					),
					dates: L.en('2011-2013', '2011-2013'),
					note: L.en(
						'2-year merit-based scholarship.',
						'Borsa di merito biennale.',
						'Bolsa de mérito de 2 anos.'
					)
				},
				{
					label: L.en(
						"Bachelor's Degree in Aerospace Engineering",
						'Triennale in Ingegneria Aerospaziale',
						'Bacharelado em Engenharia Aeroespacial'
					),
					dates: L.en('2008-2011', '2008-2011'),
					note: L.en(
						'3-year merit-based scholarship.',
						'Borsa di merito triennale.',
						'Bolsa de mérito de 3 anos.'
					)
				}
			]
		}
	],
	languages: [
		{
			id: 'it',
			label: L.en('Italian', 'Italiano', 'Italiano'),
			level: L.en('Native', 'Madrelingua', 'Nativo')
		},
		{
			id: 'pt',
			label: L.en('Portuguese', 'Portoghese', 'Português'),
			level: L.en('Fluent', 'Fluente', 'Fluente')
		},
		{
			id: 'en',
			label: L.en('English', 'Inglese', 'Inglês'),
			level: L.en('Fluent', 'Fluente', 'Fluente')
		},
		{
			id: 'de',
			label: L.en('German', 'Tedesco', 'Alemão'),
			level: L.en('Elementary', 'Base', 'Básico')
		}
	],
	about: [
		{
			id: 'ai-native',
			title: L.en(
				'AI-native, still an engineer',
				'AI-native, ma sempre ingegnere',
				'AI-native, ainda engenheiro'
			),
			body: L.en(
				'I run many AI projects in parallel: fleets of coding agents that build, review, and test under human direction, coordinated through custom agent skills, MCP connectors, and multi-agent workflows. Orchestration does not replace engineering. I design the architecture, write the hard parts in TypeScript and Rust myself, and review every line that ships.',
				'Gestisco molti progetti AI in parallelo: flotte di coding agent che implementano, revisionano e testano sotto direzione umana, coordinate con skill agentiche custom, connettori MCP e workflow multi-agente. L’orchestrazione non sostituisce l’ingegneria. Progetto l’architettura, scrivo io le parti difficili in TypeScript e Rust e revisiono ogni riga che va in produzione.',
				'Conduzo muitos projetos de IA em paralelo: frotas de coding agents que implementam, revisam e testam sob direção humana, coordenadas com skills de agente customizadas, conectores MCP e workflows multiagente. Orquestração não substitui engenharia. Eu desenho a arquitetura, escrevo as partes difíceis em TypeScript e Rust e reviso cada linha que vai para produção.'
			)
		},
		{
			id: 'meta',
			title: L.en('A "Meta" Portfolio', 'Un Portfolio "Meta"', 'Um Portfólio "Meta"'),
			body: L.en(
				'This project is recursive: it’s an interactive map of a career, built by its own subject using the same technologies (Svelte, Tailwind, TypeScript) it describes. It’s both the container and the content.',
				'Questo progetto è ricorsivo: una mappa interattiva di una carriera, costruita dal soggetto stesso usando le tecnologie (Svelte, Tailwind, TypeScript) che descrive. È sia il contenitore che il contenuto.',
				'Este projeto é recursivo: um mapa interativo de uma carreira, construído pelo próprio sujeito usando as mesmas tecnologias (Svelte, Tailwind, TypeScript) que descreve. É ao mesmo tempo o contêiner e o conteúdo.'
			)
		},
		{
			id: 'map',
			title: L.en(
				'How this portfolio works',
				'Come funziona questa portfolio',
				'Como este portfólio funciona'
			),
			body: L.en(
				'Identity at the center, categories in the first ring, items in the second. Details appear in the panel. Use Tab to navigate; a list view is available on GitHub.',
				'Identità al centro, categorie nel primo anello, elementi nel secondo. I dettagli compaiono nel pannello. Naviga con Tab.',
				'Identidade no centro, categorias no primeiro anel, itens no segundo. Os detalhes aparecem no painel. Use Tab para navegar; uma visão em lista está disponível no GitHub.'
			)
		}
	],
	orgHighlights: [
		{
			name: 'dfinity/oisy-wallet',
			url: 'https://github.com/dfinity/oisy-wallet',
			note: L.en(
				'Primary public repo for my current product work: TypeScript, Svelte, Rust; Apache-2.0.',
				'Mia repo prodotto principale: TypeScript, Svelte, Rust; Apache-2.0.',
				'Principal repositório público do meu trabalho de produto atual: TypeScript, Svelte, Rust; Apache-2.0.'
			)
		},
		{
			name: 'dfinity',
			url: 'https://github.com/dfinity',
			note: L.en(
				'Organisation home for the Internet Computer stack and ecosystem.',
				'Organizzazione Internet Computer e ecosistema.',
				'Casa da organização para a stack e o ecossistema da Internet Computer.'
			)
		}
	]
};
