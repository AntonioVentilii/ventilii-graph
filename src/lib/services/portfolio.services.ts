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
				'OISY, Officina, VICI, experiments. Each marked with when and how far it got.',
				'OISY, Officina, VICI, esperimenti. Ognuno con quando e fin dove è arrivato.',
				'OISY, Officina, VICI, experimentos. Cada um com quando e até onde chegou.'
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
			dates: L.en('2024-present', '2024-oggi', '2024-presente'),
			status: 'production',
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
			id: 'officina',
			title: L.en('Officina', 'Officina'),
			kind: 'personal',
			summary: L.en(
				'A collaborative software workshop on top of a GitHub repository. Anyone on a team describes a change in plain language; Claude agents interview them, write the spec, build the branch and review it; people approve, verify and merge. One shared board, one audit trail, and agents never merge or approve their own work.',
				'Un’officina software collaborativa sopra un repository GitHub. Chiunque nel team descrive una modifica a parole; agenti Claude fanno le domande giuste, scrivono la spec, costruiscono il branch e lo revisionano; le persone approvano, verificano e fanno il merge. Una board condivisa, un unico audit trail, e gli agenti non fanno mai merge né approvano il proprio lavoro.',
				'Uma oficina de software colaborativa sobre um repositório GitHub. Qualquer pessoa do time descreve uma mudança em linguagem natural; agentes Claude fazem as perguntas certas, escrevem a spec, constroem o branch e fazem a review; pessoas aprovam, verificam e fazem o merge. Um board compartilhado, um único audit trail, e os agentes nunca fazem merge nem aprovam o próprio trabalho.'
			),
			dates: L.en('Sep 2026-present', 'set 2026-oggi', 'set 2026-presente'),
			status: 'in-use',
			highlights: [
				L.en(
					'Bun + Elysia API, SvelteKit board (Svelte 5), Postgres with an append-only audit log and pg_notify feeding realtime updates over SSE. Seven agent roles (interviewer, spec, builder, two reviewers, chooser, learner) run on Anthropic Managed Agents; each returns a typed result that code validates, with retries.',
					'API Bun + Elysia, board SvelteKit (Svelte 5), Postgres con audit log append-only e pg_notify per gli aggiornamenti realtime via SSE. Sette ruoli agente (interviewer, spec, builder, due reviewer, chooser, learner) girano su Anthropic Managed Agents; ognuno restituisce un risultato tipizzato che il codice valida, con retry.',
					'API Bun + Elysia, board SvelteKit (Svelte 5), Postgres com audit log append-only e pg_notify alimentando atualizações em tempo real via SSE. Sete papéis de agente (interviewer, spec, builder, dois reviewers, chooser, learner) rodam no Anthropic Managed Agents; cada um devolve um resultado tipado que o código valida, com retries.'
				),
				L.en(
					'Deterministic engine: one tested state machine decides every transition. Risk lanes are recomputed from the real diff (the stricter lane wins) instead of trusting the model; GitHub App tokens are least-privilege, and the builder may only push its own task branch.',
					'Engine deterministico: un’unica state machine testata decide ogni transizione. Le risk lane sono ricalcolate dal diff reale (vince la più restrittiva) invece di fidarsi del modello; token GitHub App a privilegio minimo, e il builder può pushare solo il proprio branch.',
					'Engine determinístico: uma única state machine testada decide cada transição. As risk lanes são recalculadas a partir do diff real (vence a mais restritiva) em vez de confiar no modelo; tokens de GitHub App com privilégio mínimo, e o builder só pode fazer push no próprio branch.'
				),
				L.en(
					'No API key stored in production: Fly.io OIDC workload identity federation to Anthropic. Honest scope: a solo build of about 12 days (16 PRs) with Claude Code, deployed on Fly.io as a single-tenant instance for one repository. In early use, not a released product.',
					'Nessuna API key salvata in produzione: workload identity federation OIDC da Fly.io verso Anthropic. Perimetro onesto: costruito da solo in circa 12 giorni (16 PR) con Claude Code, deployato su Fly.io come istanza single-tenant per un solo repository. In uso iniziale, non un prodotto rilasciato.',
					'Nenhuma API key armazenada em produção: workload identity federation OIDC do Fly.io para a Anthropic. Escopo honesto: construído sozinho em cerca de 12 dias (16 PRs) com Claude Code, implantado no Fly.io como instância single-tenant para um único repositório. Em uso inicial, não é um produto lançado.'
				)
			],
			stackIds: ['typescript', 'svelte', 'ai-agentic']
		},
		{
			id: 'vici-app',
			title: L.en('VICI', 'VICI'),
			kind: 'personal',
			summary: L.en(
				'Social prediction-markets app (YES/NO markets, feed, leagues, battles), live at vici.market and moving to vici.app. One SvelteKit codebase ships two builds: a web3 build on the Internet Computer (Juno, Internet Identity, icdc-core clearing) and a web2 build on Fly.io with a Bun + Elysia + Postgres backend.',
				'App social di mercati di previsione (mercati SÌ/NO, feed, leghe, sfide), live su vici.market e in migrazione verso vici.app. Un’unica codebase SvelteKit produce due build: una web3 su Internet Computer (Juno, Internet Identity, clearing icdc-core) e una web2 su Fly.io con backend Bun + Elysia + Postgres.',
				'App social de mercados de previsão (mercados SIM/NÃO, feed, ligas, batalhas), no ar em vici.market e migrando para vici.app. Uma única codebase SvelteKit gera dois builds: um web3 na Internet Computer (Juno, Internet Identity, clearing icdc-core) e um web2 no Fly.io com backend Bun + Elysia + Postgres.'
			),
			dates: L.en('Feb 2026-present', 'feb 2026-oggi', 'fev 2026-presente'),
			status: 'production',
			highlights: [
				L.en(
					'Phased web3-to-web2 migration in progress: account-claim flow with a signed principal handoff, adoption of imported accounts, and an idempotent points import that never re-pays an award.',
					'Migrazione web3→web2 a fasi, in corso: flusso di claim dell’account con handoff firmato del principal, adozione degli account importati e import idempotente dei punti che non ripaga mai un premio.',
					'Migração web3→web2 em fases, em andamento: fluxo de claim de conta com handoff assinado do principal, adoção de contas importadas e import idempotente de pontos que nunca paga um prêmio duas vezes.'
				),
				L.en(
					'Web2 backend with custodial multi-chain accounts (BTC, EVM, Solana, ICP chain watchers, ledger, withdrawals). 70+ releases via release-please, Playwright E2E tests, and an agent-first repo setup: it is the first repository Officina runs on.',
					'Backend web2 con account custodial multi-chain (chain watcher BTC, EVM, Solana, ICP, ledger, prelievi). Oltre 70 release con release-please, test E2E Playwright e un setup del repo pensato per agenti: è il primo repository su cui gira Officina.',
					'Backend web2 com contas custodiais multi-chain (chain watchers BTC, EVM, Solana, ICP, ledger, saques). Mais de 70 releases via release-please, testes E2E com Playwright e um setup de repositório pensado para agentes: é o primeiro repositório em que o Officina roda.'
				)
			],
			links: [
				{ label: L.en('vici.market', 'vici.market'), href: 'https://vici.market' },
				{ label: L.en('vici.app', 'vici.app'), href: 'https://vici.app' },
				{
					label: L.en('GitHub', 'GitHub'),
					href: 'https://github.com/ViciApp/vici-app'
				}
			],
			stackIds: ['svelte', 'typescript', 'icp']
		},
		{
			id: 'icdc-core',
			title: L.en('icdc-core', 'icdc-core'),
			kind: 'personal',
			summary: L.en(
				'IC Derivatives Clearing: a multi-canister central-counterparty engine in Rust for derivatives and prediction markets (instrument registry, margin, order matching with partial fills, settlement). Deployed on mainnet as the backend of VICI’s markets.',
				'IC Derivatives Clearing: un motore di controparte centrale multi-canister in Rust per derivati e mercati di previsione (registro strumenti, margini, matching ordini con fill parziali, settlement). Deployato su mainnet come backend dei mercati VICI.',
				'IC Derivatives Clearing: um motor de contraparte central multi-canister em Rust para derivativos e mercados de previsão (registro de instrumentos, margem, matching de ordens com fills parciais, settlement). Implantado na mainnet como backend dos mercados do VICI.'
			),
			dates: L.en('Feb 2026-present', 'feb 2026-oggi', 'fev 2026-presente'),
			status: 'production',
			highlights: [
				L.en(
					'Plan-Execute-Finalise pattern for every ledger interaction (no await while planning, created_at_time as the idempotency key) and multi-phase settlement with a heartbeat sweep for stalled settlements. PocketIC integration tests, CI that deploys to staging and production canisters.',
					'Pattern Plan-Execute-Finalise per ogni interazione col ledger (nessun await in fase di plan, created_at_time come chiave di idempotenza) e settlement multi-fase con uno sweep periodico per quelli bloccati. Test di integrazione PocketIC, CI che deploya su canister di staging e produzione.',
					'Padrão Plan-Execute-Finalise para toda interação com o ledger (nenhum await no planejamento, created_at_time como chave de idempotência) e settlement em várias fases com um sweep periódico para os travados. Testes de integração com PocketIC, CI que implanta em canisters de staging e produção.'
				),
				L.en(
					'Not finished, per its own README: exchange authorisation and position-proof signatures are not implemented yet, and multi-asset margin is planned.',
					'Non finito, come dice il suo README: autorizzazione degli exchange e firme delle position proof non sono ancora implementate, e il margine multi-asset è pianificato.',
					'Não está pronto, segundo o próprio README: autorização de exchanges e assinaturas de position proofs ainda não foram implementadas, e margem multi-asset está planejada.'
				)
			],
			links: [
				{
					label: L.en('GitHub', 'GitHub'),
					href: 'https://github.com/AntonioVentilii/icdc-core'
				}
			],
			stackIds: ['rust', 'icp']
		},
		{
			id: 'household-app',
			title: L.en('Household app (private)', 'App di casa (privata)', 'App da casa (privado)'),
			kind: 'personal',
			summary: L.en(
				'A private app for a two-person household (calendar, tasks and lists, trips, shared finances), used every day on the web, from Claude over MCP, and from WhatsApp. Designed so AI can help without being trusted: agents propose, humans commit.',
				'Un’app privata per una casa di due persone (calendario, attività e liste, viaggi, finanze condivise), usata ogni giorno dal web, da Claude via MCP e da WhatsApp. Progettata perché l’AI possa aiutare senza doversi fidare di lei: gli agenti propongono, le persone confermano.',
				'Um app privado para uma casa de duas pessoas (calendário, tarefas e listas, viagens, finanças compartilhadas), usado todo dia pela web, pelo Claude via MCP e pelo WhatsApp. Projetado para a IA ajudar sem precisar confiar nela: agentes propõem, pessoas confirmam.'
			),
			dates: L.en('Sep 2026-present', 'set 2026-oggi', 'set 2026-presente'),
			status: 'in-use',
			highlights: [
				L.en(
					'Its own MCP server (about 30 verbs, deliberately no raw SQL) with an OAuth 2.1 authorization server (dynamic client registration, PKCE, rotating refresh tokens), so Claude and ChatGPT connect as first-class clients.',
					'Un proprio server MCP (circa 30 verbi, volutamente niente SQL libero) con un authorization server OAuth 2.1 (dynamic client registration, PKCE, refresh token a rotazione), così Claude e ChatGPT si collegano come client a pieno titolo.',
					'Um servidor MCP próprio (cerca de 30 verbos, propositalmente sem SQL livre) com um authorization server OAuth 2.1 (dynamic client registration, PKCE, refresh tokens rotativos), para que Claude e ChatGPT se conectem como clientes de primeira classe.'
				),
				L.en(
					'Propose-then-approve writes: whatever an agent or job suggests (Claude over MCP, a nightly Gmail sweep, a WhatsApp assistant) becomes a typed proposal a person accepts. A stale check refuses the acceptance if the row changed, and a database constraint stops automated actors from writing money movements.',
					'Scritture proponi-poi-approva: qualunque cosa suggerisca un agente o un job (Claude via MCP, uno sweep notturno di Gmail, un assistente WhatsApp) diventa una proposta tipizzata che una persona accetta. Un controllo di staleness rifiuta l’accettazione se il dato è cambiato, e un vincolo nel database impedisce agli attori automatici di scrivere movimenti di denaro.',
					'Escritas propor-depois-aprovar: o que um agente ou job sugere (Claude via MCP, uma varredura noturna do Gmail, um assistente no WhatsApp) vira uma proposta tipada que uma pessoa aceita. Uma checagem de staleness recusa a aceitação se o dado mudou, e uma constraint no banco impede atores automáticos de gravar movimentações de dinheiro.'
				),
				L.en(
					'Bun + Elysia + Postgres (forward-only migrations applied at release) and a SvelteKit PWA on Fly.io; about 350 tests, including one that walks every route and expects a 401 unless the route is explicitly public. Built with Claude Code in about three weeks; private repository.',
					'Bun + Elysia + Postgres (migrazioni forward-only applicate al rilascio) e una PWA SvelteKit su Fly.io; circa 350 test, tra cui uno che percorre ogni route e si aspetta un 401 salvo route esplicitamente pubbliche. Costruita con Claude Code in circa tre settimane; repository privato.',
					'Bun + Elysia + Postgres (migrations forward-only aplicadas no release) e uma PWA SvelteKit no Fly.io; cerca de 350 testes, incluindo um que percorre todas as rotas e espera 401 salvo rotas explicitamente públicas. Construído com Claude Code em cerca de três semanas; repositório privado.'
				)
			],
			stackIds: ['typescript', 'svelte', 'ai-agentic']
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
			dates: L.en('Jun 2026', 'giu 2026', 'jun 2026'),
			status: 'in-use',
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
			dates: L.en('May-Aug 2026', 'mag-ago 2026', 'mai-ago 2026'),
			status: 'production',
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
			id: 'fantasy-football',
			title: L.en(
				'Fantasy-football assistant',
				'Assistente per il fantacalcio',
				'Assistente de fantasy football'
			),
			kind: 'personal',
			summary: L.en(
				'A personal assistant for a private fantasy-football league among friends: an auction coach used live at the draft, then scheduled jobs that run the season (lineups, transfer bids, reports). Decisions are deterministic; the LLM only explains and researches.',
				'Un assistente personale per una lega privata di fantacalcio tra amici: un coach per l’asta usato dal vivo, poi job schedulati che gestiscono la stagione (formazioni, offerte di mercato, report). Le decisioni sono deterministiche; l’LLM spiega e fa ricerca, e basta.',
				'Um assistente pessoal para uma liga privada de fantasy football entre amigos: um coach de leilão usado ao vivo no draft, depois jobs agendados que tocam a temporada (escalações, lances de transferência, relatórios). As decisões são determinísticas; o LLM só explica e pesquisa.'
			),
			dates: L.en('Sep 2026-present', 'set 2026-oggi', 'set 2026-presente'),
			status: 'in-use',
			highlights: [
				L.en(
					'Exact knapsack auction planner in Python, ported to JavaScript inside a single-file mobile app (about 11 ms per lot) and replayed over the 200 real auction lots to evaluate it.',
					'Planner d’asta con knapsack esatto in Python, portato in JavaScript dentro una web app mobile a file singolo (circa 11 ms per giocatore) e rigiocato sui 200 lotti reali dell’asta per valutarlo.',
					'Planejador de leilão com knapsack exato em Python, portado para JavaScript dentro de um app mobile de arquivo único (cerca de 11 ms por lote) e reexecutado sobre os 200 lotes reais do leilão para avaliá-lo.'
				),
				L.en(
					'Telemetry first: about 2,750 logged auction events rebuilt the whole auction and matched the league’s official file exactly, after the primary state sync had silently failed (root cause found and documented).',
					'Telemetria prima di tutto: circa 2.750 eventi d’asta registrati hanno ricostruito l’intera asta, identica al file ufficiale della lega, dopo che la sincronizzazione principale era fallita in silenzio (causa trovata e documentata).',
					'Telemetria em primeiro lugar: cerca de 2.750 eventos registrados reconstruíram o leilão inteiro, idêntico ao arquivo oficial da liga, depois que a sincronização principal falhou em silêncio (causa encontrada e documentada).'
				),
				L.en(
					'A hobby tool with one user: Python, Supabase, Fly.io, GitHub Actions cron jobs and scheduled Claude routines; the league sync has six guards and treats silence as failure.',
					'Uno strumento hobbistico con un solo utente: Python, Supabase, Fly.io, cron su GitHub Actions e routine Claude schedulate; la sincronizzazione della lega ha sei controlli e tratta il silenzio come un errore.',
					'Uma ferramenta de hobby com um único usuário: Python, Supabase, Fly.io, cron jobs no GitHub Actions e rotinas Claude agendadas; a sincronização da liga tem seis checagens e trata silêncio como falha.'
				)
			],
			stackIds: ['python', 'ai-agentic']
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
			dates: L.en('Jun 2026', 'giu 2026', 'jun 2026'),
			status: 'prototype',
			highlights: [
				L.en(
					'TypeScript monorepo: typed agent contracts, policy engine, variant engine with rollback, telemetry contracts, and a Svelte reference integration. A short prototype (June 2026), not in use.',
					'Monorepo TypeScript: contratti agente tipizzati, policy engine, variant engine con rollback, contratti di telemetria e integrazione di riferimento in Svelte. Un prototipo breve (giugno 2026), non in uso.',
					'Monorepo TypeScript: contratos de agente tipados, policy engine, variant engine com rollback, contratos de telemetria e integração de referência em Svelte. Um protótipo curto (junho de 2026), fora de uso.'
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
			dates: L.en('May-Jul 2026', 'mag-lug 2026', 'mai-jul 2026'),
			status: 'prototype',
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
			dates: L.en('Jun 2026', 'giu 2026', 'jun 2026'),
			status: 'prototype',
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
			id: 'escrow',
			title: L.en('escrow', 'escrow'),
			kind: 'personal',
			summary: L.en(
				'Decentralized escrow: Solidity with user, admin, and arbitrator roles; React app for interaction.',
				'Escrow decentralizzato in Solidity con ruoli user/admin/arbitro; app React.',
				'Escrow descentralizado: Solidity com papéis de usuário, admin e árbitro; app React para interação.'
			),
			dates: L.en('Mar-May 2026', 'mar-mag 2026', 'mar-mai 2026'),
			status: 'prototype',
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
			dates: L.en('Apr 2024', 'apr 2024', 'abr 2024'),
			status: 'prototype',
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
			dates: L.en('Apr 2024', 'apr 2024', 'abr 2024'),
			status: 'prototype',
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
			id: 'vault',
			title: L.en('vault-app / vault-core', 'vault-app / vault-core'),
			kind: 'personal',
			summary: L.en(
				'Split Rust core and JavaScript app: a custody/experiment surface.',
				'Core Rust e app JS: superficie di esperimento per custodia.',
				'Núcleo em Rust e app em JavaScript separados: uma superfície de experimentos de custódia.'
			),
			dates: L.en('Feb 2026', 'feb 2026', 'fev 2026'),
			status: 'prototype',
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
			dates: L.en('Jan 2026', 'gen 2026', 'jan 2026'),
			status: 'prototype',
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
			dates: L.en('2024-2026', '2024-2026'),
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
			dates: L.en('Jan 2026', 'gen 2026', 'jan 2026'),
			status: 'prototype',
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
			dates: L.en('Mar 2026-present', 'mar 2026-oggi', 'mar 2026-presente'),
			status: 'production',
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
			relatedProjectIds: [
				'oisy',
				'officina',
				'vici-app',
				'household-app',
				'ventilii-graph',
				'ombrellone',
				'verto'
			]
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
			relatedProjectIds: [
				'fantasy-football',
				'chaditt',
				'deribit-wrapper',
				'bitcoin-utxo-lp',
				'whatsapp-wrapper'
			]
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
				'officina',
				'vici-app',
				'household-app',
				'ventilii-graph',
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
			relatedProjectIds: ['oisy', 'vici-app', 'icdc-core', 'icrc-factory', 'privatim', 'vici-maker']
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
				'officina',
				'household-app',
				'claude-skills',
				'fantasy-football',
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
	],
	limits: [
		L.en(
			'Formal background is an MSc in aeronautical engineering, not computer science. Software skills were built on the job: first as a desk developer inside trading roles (2013-2024), then full-time as a software engineer from 2024.'
		),
		L.en(
			'Full-time software-engineering tenure is about two years (DFINITY, 2024-present). Before that, code was a large part of trading-desk roles but not the whole job.'
		),
		L.en(
			'The newest personal projects (Officina, the household app, the fantasy-football assistant) are weeks old, were built with heavy Claude Code assistance, and have very few users: one or two people, or one team. They show system design and judgement, not scale or years of maintenance.'
		),
		L.en(
			'Nothing in this portfolio shows operating high-traffic distributed systems at large scale, or training ML models. The AI work is applying and orchestrating LLMs, not ML research.'
		),
		L.en(
			'Management: led technical direction, planning and mentoring on OISY for a period before a team restructure. No formal people-manager title.'
		),
		L.en(
			'German is elementary, so roles that need working German are a real gap. Italian is native; English and Portuguese are fluent.'
		),
		L.en(
			'No shipped native mobile app in this portfolio, even though React Native appears in the stack.'
		),
		L.en(
			'Recent work is TypeScript, Rust and Python. Go, Java/Kotlin and similar backend languages are not shown; C# and SQL were used at Itaú (2013-2016).'
		),
		L.en(
			'Several listed repositories are short experiments or prototypes. Each project carries its dates and status so it is not over-read.'
		),
		L.en(
			'Salary, notice period, availability, visa and relocation are not in this portfolio: ask Antonio directly.'
		)
	]
};
