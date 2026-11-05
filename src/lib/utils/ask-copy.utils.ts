import type { Locale } from '$lib/types/portfolio.types';

type Copy = Record<Locale, string>;

/** Every string of the /ask page, in the three site locales. */
export const ASK_COPY = {
	metaTitle: {
		en: 'Ask the AI version · Antonio Ventilii',
		it: 'Chiedi alla versione AI · Antonio Ventilii',
		pt: 'Pergunte à versão IA · Antonio Ventilii'
	},
	metaDescription: {
		en: 'An AI that has read Antonio Ventilii’s whole portfolio: ask what he has built, check how he fits a job posting, or get a short tailored presentation. Instructed to state gaps, not to sell.',
		it: 'Un’AI che ha letto tutto il portfolio di Antonio Ventilii: chiedi cosa ha costruito, verifica quanto si adatta a un annuncio, o fatti preparare una breve presentazione. Istruita a dire le lacune, non a vendere.',
		pt: 'Uma IA que leu todo o portfólio de Antonio Ventilii: pergunte o que ele construiu, veja como ele se encaixa numa vaga ou gere uma apresentação curta sob medida. Instruída a apontar lacunas, não a vender.'
	},
	backToMap: { en: 'Back to the map', it: 'Torna alla mappa', pt: 'Voltar ao mapa' },
	map: { en: 'map', it: 'mappa', pt: 'mapa' },
	langLabel: { en: 'Language', it: 'Lingua', pt: 'Idioma' },
	eyebrow: { en: 'The AI version', it: 'La versione AI', pt: 'A versão IA' },
	title: {
		en: 'Ask about Antonio. Get a straight answer.',
		it: 'Chiedi di Antonio. Ricevi una risposta onesta.',
		pt: 'Pergunte sobre o Antonio. Receba uma resposta direta.'
	},
	intro: {
		en: 'A language model that has read everything on this site: every role, every project with its dates and how far it got where they are known, and a list of his known gaps. It is told to keep proportions and to say what the portfolio does not show. It is not Antonio, and it can be wrong: every claim links to the item that supports it, so you can check.',
		it: 'Un modello linguistico che ha letto tutto il sito: ogni ruolo, ogni progetto con date e stato dove sono noti, e un elenco delle sue lacune note. Ha l’istruzione di mantenere le proporzioni e di dire cosa il portfolio non mostra. Non è Antonio e può sbagliare: ogni affermazione rimanda all’elemento che la sostiene, così puoi verificare.',
		pt: 'Um modelo de linguagem que leu tudo neste site: cada cargo, cada projeto com datas e status quando conhecidos, e uma lista das lacunas conhecidas. Ele é instruído a manter as proporções e a dizer o que o portfólio não mostra. Não é o Antonio e pode errar: cada afirmação aponta para o item que a sustenta, para você conferir.'
	},
	privacy: {
		en: 'Privacy: what you type is sent to Anthropic, in the United States, which runs the model. It is used only to generate the answer, never to train models, and Anthropic may keep it for up to 30 days to monitor abuse. This site does not log it: it keeps generated answers in memory for up to 6 hours, to reuse them for identical requests, and your IP address until midnight UTC, for rate limits. Page views, and requests that fail, sit in the hosting provider’s server logs, as on any site. Please don’t paste confidential postings or other people’s personal details. Questions:',
		it: 'Privacy: ciò che scrivi viene inviato ad Anthropic, negli Stati Uniti, che gestisce il modello. Serve solo a generare la risposta, mai ad addestrare modelli, e Anthropic può conservarlo fino a 30 giorni per il controllo degli abusi. Questo sito non lo registra: tiene in memoria le risposte generate fino a 6 ore, per riusarle con richieste identiche, e il tuo indirizzo IP fino alla mezzanotte UTC, per i limiti di utilizzo. Le visite alle pagine, e le richieste che falliscono, restano nei log del provider di hosting, come su ogni sito. Non incollare annunci riservati né dati personali di altre persone. Domande:',
		pt: 'Privacidade: o que você digita é enviado à Anthropic, nos Estados Unidos, que opera o modelo. É usado só para gerar a resposta, nunca para treinar modelos, e a Anthropic pode guardá-lo por até 30 dias para monitorar abusos. Este site não registra o texto: guarda as respostas geradas na memória por até 6 horas, para reutilizá-las em pedidos idênticos, e seu endereço IP até a meia-noite UTC, para os limites de uso. As visitas às páginas, e os pedidos que falham, ficam nos logs do provedor de hospedagem, como em qualquer site. Não cole vagas confidenciais nem dados pessoais de outras pessoas. Dúvidas:'
	},
	tabsLabel: { en: 'What to do', it: 'Cosa fare', pt: 'O que fazer' },
	tabAsk: { en: 'Ask', it: 'Chiedi', pt: 'Perguntar' },
	tabAskHint: {
		en: 'Any question about his work',
		it: 'Qualsiasi domanda sul suo lavoro',
		pt: 'Qualquer pergunta sobre o trabalho dele'
	},
	tabFit: { en: 'Fit check', it: 'Fit check', pt: 'Fit check' },
	tabFitHint: {
		en: 'Paste a job posting',
		it: 'Incolla un annuncio di lavoro',
		pt: 'Cole uma vaga'
	},
	tabDeck: { en: 'Mini deck', it: 'Mini slide', pt: 'Mini slides' },
	tabDeckHint: {
		en: 'Slides tailored to an audience',
		it: 'Slide su misura per un pubblico',
		pt: 'Slides sob medida para um público'
	},
	askLabel: { en: 'Your question', it: 'La tua domanda', pt: 'Sua pergunta' },
	askPlaceholder: {
		en: 'What has Antonio built that real people use?',
		it: 'Cosa ha costruito Antonio che viene usato davvero?',
		pt: 'O que o Antonio construiu que pessoas reais usam?'
	},
	askSubmit: { en: 'Ask', it: 'Chiedi', pt: 'Perguntar' },
	suggestions: { en: 'Try', it: 'Prova', pt: 'Tente' },
	fitLabel: { en: 'Job posting', it: 'Annuncio di lavoro', pt: 'Vaga' },
	fitPlaceholder: {
		en: 'Paste the job description: title, responsibilities, requirements.',
		it: 'Incolla la descrizione: titolo, responsabilità, requisiti.',
		pt: 'Cole a descrição: título, responsabilidades, requisitos.'
	},
	fitSubmit: { en: 'Check the fit', it: 'Verifica il fit', pt: 'Verificar o fit' },
	fitSamples: {
		en: 'Or try a sample posting:',
		it: 'Oppure prova un annuncio d’esempio:',
		pt: 'Ou teste uma vaga de exemplo:'
	},
	fitSampleGood: {
		en: 'Senior TypeScript + AI tooling',
		it: 'Senior TypeScript + AI tooling',
		pt: 'Sênior TypeScript + AI tooling'
	},
	fitSampleBad: {
		en: 'German-speaking Java platform lead',
		it: 'Lead Java di piattaforma, in tedesco',
		pt: 'Lead de plataforma Java, em alemão'
	},
	deckLabel: {
		en: 'Who is the presentation for?',
		it: 'Per chi è la presentazione?',
		pt: 'Para quem é a apresentação?'
	},
	deckPlaceholder: {
		en: 'e.g. the CTO of a 30-person fintech hiring a senior full-stack engineer',
		it: 'es. il CTO di una fintech di 30 persone che cerca un senior full-stack',
		pt: 'ex.: o CTO de uma fintech de 30 pessoas contratando um sênior full-stack'
	},
	deckSubmit: { en: 'Make the deck', it: 'Crea la presentazione', pt: 'Criar a apresentação' },
	deckPresets: { en: 'Audiences:', it: 'Pubblici:', pt: 'Públicos:' },
	charsLeft: { en: 'characters left', it: 'caratteri rimasti', pt: 'caracteres restantes' },
	thinking: [
		{
			en: 'Reading the portfolio…',
			it: 'Leggo il portfolio…',
			pt: 'Lendo o portfólio…'
		},
		{
			en: 'Checking dates and how far each project got…',
			it: 'Controllo date e stato di ogni progetto…',
			pt: 'Conferindo datas e até onde cada projeto chegou…'
		},
		{
			en: 'Looking for the gaps too…',
			it: 'Cerco anche le lacune…',
			pt: 'Procurando também as lacunas…'
		},
		{
			en: 'Linking every claim to its evidence…',
			it: 'Collego ogni affermazione alla sua prova…',
			pt: 'Ligando cada afirmação à sua evidência…'
		}
	] satisfies Copy[],
	slowNote: {
		en: 'Careful answers take 20 to 60 seconds.',
		it: 'Le risposte ragionate richiedono 20-60 secondi.',
		pt: 'Respostas cuidadosas levam de 20 a 60 segundos.'
	},
	evidence: { en: 'Evidence', it: 'Evidenze', pt: 'Evidências' },
	confidence: { en: 'Confidence', it: 'Affidabilità', pt: 'Confiança' },
	confidenceHigh: {
		en: 'high: the portfolio answers this directly',
		it: 'alta: il portfolio risponde direttamente',
		pt: 'alta: o portfólio responde diretamente'
	},
	confidenceMedium: {
		en: 'medium: partly inferred',
		it: 'media: in parte dedotta',
		pt: 'média: em parte deduzida'
	},
	confidenceLow: {
		en: 'low: the portfolio barely covers this',
		it: 'bassa: il portfolio copre poco questo tema',
		pt: 'baixa: o portfólio quase não cobre isso'
	},
	notInPortfolio: {
		en: 'Not in the portfolio',
		it: 'Non nel portfolio',
		pt: 'Fora do portfólio'
	},
	followUps: { en: 'Ask next', it: 'Chiedi poi', pt: 'Pergunte em seguida' },
	verdict: { en: 'Fit reading', it: 'Lettura del fit', pt: 'Leitura do fit' },
	verdictStrong: { en: 'Strong fit', it: 'Fit forte', pt: 'Fit forte' },
	verdictGood: { en: 'Good fit', it: 'Buon fit', pt: 'Bom fit' },
	verdictPartial: { en: 'Partial fit', it: 'Fit parziale', pt: 'Fit parcial' },
	verdictWeak: { en: 'Weak fit', it: 'Fit debole', pt: 'Fit fraco' },
	fitNotADecision: {
		en: 'This compares the public portfolio with the posting. It is a starting point for a conversation, not a hiring decision or an assessment of the person: a human should make that call.',
		it: 'Confronta il portfolio pubblico con l’annuncio. È un punto di partenza per una conversazione, non una decisione di assunzione né una valutazione della persona: quella spetta a un essere umano.',
		pt: 'Compara o portfólio público com a vaga. É um ponto de partida para uma conversa, não uma decisão de contratação nem uma avaliação da pessoa: essa decisão cabe a um ser humano.'
	},
	matches: { en: 'Where he matches', it: 'Dove corrisponde', pt: 'Onde ele se encaixa' },
	direct: { en: 'direct', it: 'diretta', pt: 'direta' },
	adjacent: { en: 'adjacent', it: 'affine', pt: 'próxima' },
	gaps: { en: 'Gaps', it: 'Lacune', pt: 'Lacunas' },
	noGaps: {
		en: 'No gaps found against this posting. Still worth verifying in an interview.',
		it: 'Nessuna lacuna rispetto a questo annuncio. Vale comunque la pena verificarlo in un colloquio.',
		pt: 'Nenhuma lacuna para esta vaga. Ainda vale verificar numa entrevista.'
	},
	minor: { en: 'minor', it: 'minore', pt: 'menor' },
	significant: { en: 'significant', it: 'rilevante', pt: 'relevante' },
	blocker: { en: 'blocker', it: 'bloccante', pt: 'impeditiva' },
	interviewQuestions: {
		en: 'What to ask him in an interview',
		it: 'Cosa chiedergli in un colloquio',
		pt: 'O que perguntar numa entrevista'
	},
	bottomLine: { en: 'Bottom line', it: 'In sintesi', pt: 'Em resumo' },
	copy: { en: 'Copy', it: 'Copia', pt: 'Copiar' },
	copied: { en: 'Copied', it: 'Copiato', pt: 'Copiado' },
	prev: { en: 'Previous slide', it: 'Slide precedente', pt: 'Slide anterior' },
	next: { en: 'Next slide', it: 'Slide successiva', pt: 'Próximo slide' },
	present: { en: 'Present', it: 'Presenta', pt: 'Apresentar' },
	print: { en: 'Print / PDF', it: 'Stampa / PDF', pt: 'Imprimir / PDF' },
	slideOf: { en: 'of', it: 'di', pt: 'de' },
	generatedBy: {
		en: 'Generated by an AI from ventilii.dev, not written by Antonio. Check the evidence before relying on it; the CV is the reference.',
		it: 'Generato da un’AI a partire da ventilii.dev, non scritto da Antonio. Controlla le evidenze prima di farci affidamento; il riferimento è il CV.',
		pt: 'Gerado por uma IA a partir de ventilii.dev, não escrito pelo Antonio. Confira as evidências antes de confiar; a referência é o CV.'
	},
	aiGenerated: { en: 'AI-generated', it: 'generato da AI', pt: 'gerado por IA' },
	offline: {
		en: 'The AI version is offline right now. The map and the CV are always there.',
		it: 'La versione AI al momento non è attiva. La mappa e il CV ci sono sempre.',
		pt: 'A versão IA está fora do ar agora. O mapa e o CV continuam aqui.'
	},
	errorRateLimited: {
		en: 'That is a lot of questions in a short time. Try again in a few minutes.',
		it: 'Tante domande in poco tempo. Riprova tra qualche minuto.',
		pt: 'Muitas perguntas em pouco tempo. Tente de novo em alguns minutos.'
	},
	errorDailyCap: {
		en: 'The AI version has used up today’s budget. It resets at midnight UTC; meanwhile you can write to Antonio directly.',
		it: 'La versione AI ha esaurito il budget di oggi. Si azzera a mezzanotte UTC; nel frattempo puoi scrivere direttamente ad Antonio.',
		pt: 'A versão IA esgotou o orçamento de hoje. Ele zera à meia-noite UTC; enquanto isso, você pode escrever direto para o Antonio.'
	},
	errorBusy: {
		en: 'Busy right now. Try again in a moment.',
		it: 'Occupato in questo momento. Riprova tra poco.',
		pt: 'Ocupado agora. Tente de novo em instantes.'
	},
	errorRefused: {
		en: 'The model declined this request. Try rephrasing it as a question about Antonio’s work.',
		it: 'Il modello ha rifiutato questa richiesta. Prova a riformularla come domanda sul lavoro di Antonio.',
		pt: 'O modelo recusou este pedido. Tente reformular como uma pergunta sobre o trabalho do Antonio.'
	},
	errorForbidden: {
		en: 'The AI version only answers requests made from ventilii.dev itself. Open this page there and try again.',
		it: 'La versione AI risponde solo a richieste fatte da ventilii.dev stesso. Apri questa pagina lì e riprova.',
		pt: 'A versão IA só responde a pedidos feitos a partir do próprio ventilii.dev. Abra esta página lá e tente de novo.'
	},
	errorGeneric: {
		en: 'Something went wrong. Try again, or write to Antonio directly.',
		it: 'Qualcosa è andato storto. Riprova, o scrivi direttamente ad Antonio.',
		pt: 'Algo deu errado. Tente de novo ou escreva direto para o Antonio.'
	},
	errorGuardBlocked: {
		en: 'That was enough off-topic tries for today: the chat is closed for you until midnight UTC. The challenge will still be here tomorrow; meanwhile you can write to Antonio directly.',
		it: 'Per oggi i tentativi fuori tema sono finiti: la chat per te è chiusa fino a mezzanotte UTC. La sfida resta aperta anche domani; intanto puoi scrivere direttamente ad Antonio.',
		pt: 'Chega de tentativas fora do tema por hoje: o chat está fechado para você até a meia-noite UTC. O desafio continua aberto amanhã; enquanto isso, você pode escrever direto para o Antonio.'
	},
	// The guard note. `{attempt}` is the model's few-word paraphrase of what
	// the visitor asked for, already in the page's language.
	guardTitle: { en: 'Nice try.', it: 'Bel tentativo.', pt: 'Boa tentativa.' },
	guardOffTopic: {
		en: 'No “{attempt}” here: this chat only talks about Antonio’s work, and anything else would be on his bill.',
		it: 'Qui niente «{attempt}»: questa chat parla solo del lavoro di Antonio, e tutto il resto sarebbe a sue spese.',
		pt: 'Aqui não rola “{attempt}”: este chat só fala do trabalho do Antonio, e o resto sairia do bolso dele.'
	},
	guardOffTopicPlain: {
		en: 'Not this one: this chat only talks about Antonio’s work, and anything else would be on his bill.',
		it: 'Questa no: la chat parla solo del lavoro di Antonio, e tutto il resto sarebbe a sue spese.',
		pt: 'Essa não: este chat só fala do trabalho do Antonio, e o resto sairia do bolso dele.'
	},
	guardOffTopicName: {
		en: 'Requests like this have a name: denial of wallet, getting a site’s public AI to do your work until its credits run out. Antonio planned for it: a daily spending cap, limits per visitor, answers in a fixed format and a model that spots off-topic requests.',
		it: 'Richieste così hanno un nome: denial of wallet, far lavorare l’AI pubblica di un sito finché i crediti finiscono. Antonio l’ha previsto: un tetto di spesa giornaliero, limiti per visitatore, risposte in formato fisso e un modello che riconosce le richieste fuori tema.',
		pt: 'Pedidos assim têm nome: denial of wallet, fazer a IA pública de um site trabalhar para você até os créditos acabarem. O Antonio previu isso: teto de gasto diário, limites por visitante, respostas em formato fixo e um modelo que reconhece pedidos fora do tema.'
	},
	guardManipulation: {
		en: '“{attempt}”? Not today. What you write here is material to read, not orders to follow.',
		it: '«{attempt}»? Non oggi. Quello che scrivi qui è materiale da leggere, non ordini da eseguire.',
		pt: '“{attempt}”? Hoje não. O que você escreve aqui é material para ler, não ordens para seguir.'
	},
	guardManipulationPlain: {
		en: 'Not today. What you write here is material to read, not orders to follow.',
		it: 'Non oggi. Quello che scrivi qui è materiale da leggere, non ordini da eseguire.',
		pt: 'Hoje não. O que você escreve aqui é material para ler, não ordens para seguir.'
	},
	guardManipulationName: {
		en: 'Tricks like this have a name: prompt injection, slipping new orders to an AI through the text it reads. Antonio planned for it: the model treats what you write as material, keeps to the public portfolio and answers in a fixed format.',
		it: 'Trucchi così hanno un nome: prompt injection, dare nuovi ordini a un’AI attraverso il testo che legge. Antonio l’ha previsto: il modello tratta ciò che scrivi come materiale, resta sul portfolio pubblico e risponde in un formato fisso.',
		pt: 'Truques assim têm nome: prompt injection, dar novas ordens a uma IA pelo texto que ela lê. O Antonio previu isso: o modelo trata o que você escreve como material, fica no portfólio público e responde num formato fixo.'
	},
	guardChallenge: {
		en: 'Fancy a challenge? If you get me to do something I shouldn’t, write to Antonio and tell him how. Whoever manages it goes into the hall of fame, and the coffee is on him.',
		it: 'Ti va una sfida? Se riesci a farmi fare qualcosa che non dovrei, scrivi ad Antonio e raccontagli come. Chi ci riesce entra nell’hall of fame, e il caffè lo offre lui.',
		pt: 'Topa um desafio? Se conseguir me fazer algo que eu não deveria, escreva para o Antonio e conte como. Quem conseguir entra no hall da fama, e o café é por conta dele.'
	},
	guardRulesLink: {
		en: 'Rules and hall of fame',
		it: 'Regole e hall of fame',
		pt: 'Regras e hall da fama'
	},
	guardOneLeft: {
		en: 'One more request like this and the chat closes for you until midnight UTC.',
		it: 'Ancora una richiesta così e la chat per te chiude fino a mezzanotte UTC.',
		pt: 'Mais um pedido assim e o chat fecha para você até a meia-noite UTC.'
	},
	guardNoneLeft: {
		en: 'That was the last one for today: the chat is closed for you until midnight UTC. The challenge will still be here tomorrow.',
		it: 'Era l’ultima per oggi: la chat per te è chiusa fino a mezzanotte UTC. La sfida resta aperta anche domani.',
		pt: 'Esse foi o último de hoje: o chat está fechado para você até a meia-noite UTC. O desafio continua aberto amanhã.'
	},
	guardAskReal: {
		en: 'Or ask something real about Antonio:',
		it: 'Oppure chiedimi davvero qualcosa su Antonio:',
		pt: 'Ou me pergunte algo de verdade sobre o Antonio:'
	},
	// The "how this chat is protected" section at the foot of /ask.
	protectionTitle: {
		en: 'How this chat is protected',
		it: 'Come è protetta questa chat',
		pt: 'Como este chat é protegido'
	},
	protectionIntro: {
		en: 'An AI on a public page can be used as a free model: someone asks it for book summaries, translations or code, and the site owner pays for every word. It is called denial of wallet. Here:',
		it: 'Un’AI su una pagina pubblica può essere usata come modello gratis: qualcuno le chiede riassunti di libri, traduzioni o codice, e ogni parola la paga il proprietario del sito. Si chiama denial of wallet. Qui:',
		pt: 'Uma IA numa página pública pode ser usada como modelo de graça: alguém pede resumos de livros, traduções ou código, e o dono do site paga cada palavra. Isso se chama denial of wallet. Aqui:'
	},
	challengeTitle: { en: 'The challenge', it: 'La sfida', pt: 'O desafio' },
	challengeIntro: {
		en: 'Find a way through and write to Antonio with what you typed and what came back. It counts if you get the chat to:',
		it: 'Trova un varco e scrivi ad Antonio cosa hai digitato e cosa ti è tornato. Vale se riesci a far sì che la chat:',
		pt: 'Encontre uma brecha e escreva para o Antonio com o que você digitou e o que voltou. Vale se você conseguir que o chat:'
	},
	challengeRules: {
		en: 'Only through the chat on this page, a few tries at a time: the limits are part of the game. No load tests and no attacks on the server or the hosting.',
		it: 'Solo dalla chat di questa pagina, pochi tentativi alla volta: i limiti fanno parte del gioco. Niente test di carico né attacchi al server o all’hosting.',
		pt: 'Só pelo chat desta página, poucas tentativas por vez: os limites fazem parte do jogo. Nada de testes de carga nem ataques ao servidor ou à hospedagem.'
	},
	challengeReport: { en: 'Write to', it: 'Scrivi a', pt: 'Escreva para' },
	hallOfFameTitle: { en: 'Hall of fame', it: 'Hall of fame', pt: 'Hall da fama' },
	hallOfFameEmpty: {
		en: 'Nobody yet. The first name here gets a coffee on Antonio.',
		it: 'Ancora nessuno. Il primo nome qui si prende un caffè offerto da Antonio.',
		pt: 'Ninguém ainda. O primeiro nome aqui ganha um café por conta do Antonio.'
	},
	contact: {
		en: 'Prefer the human version?',
		it: 'Preferisci la versione umana?',
		pt: 'Prefere a versão humana?'
	},
	askCta: { en: 'Ask the AI version', it: 'Chiedi alla versione AI', pt: 'Pergunte à versão IA' }
} as const;

export const PROTECTION_POINTS: Copy[] = [
	{
		en: 'A daily spending cap, measured on what each answer really costs: whatever happens, the bill cannot go past it.',
		it: 'Un tetto di spesa giornaliero, misurato su quanto costa davvero ogni risposta: qualunque cosa succeda, il conto non lo supera.',
		pt: 'Um teto de gasto diário, medido pelo custo real de cada resposta: aconteça o que acontecer, a conta não passa dele.'
	},
	{
		en: 'Limits per visitor, and two off-topic requests close the chat for that visitor until midnight UTC.',
		it: 'Limiti per visitatore, e due richieste fuori tema chiudono la chat per quel visitatore fino a mezzanotte UTC.',
		pt: 'Limites por visitante, e dois pedidos fora do tema fecham o chat para esse visitante até a meia-noite UTC.'
	},
	{
		en: 'Answers come in a fixed format with a length cap: there is no room for a novel.',
		it: 'Le risposte hanno un formato fisso e una lunghezza massima: non c’è spazio per un romanzo.',
		pt: 'As respostas têm formato fixo e tamanho máximo: não cabe um romance.'
	},
	{
		en: 'The model reads what you write as material, not as orders, and keeps to the public portfolio.',
		it: 'Il modello legge ciò che scrivi come materiale, non come ordini, e resta sul portfolio pubblico.',
		pt: 'O modelo lê o que você escreve como material, não como ordens, e fica no portfólio público.'
	}
];

export const CHALLENGE_GOALS: Copy[] = [
	{
		en: 'do work that has nothing to do with Antonio (a translation, code, a summary)',
		it: 'faccia un lavoro che non c’entra con Antonio (una traduzione, del codice, un riassunto)',
		pt: 'faça um trabalho que não tem nada a ver com o Antonio (uma tradução, código, um resumo)'
	},
	{
		en: 'state something false about his work',
		it: 'affermi qualcosa di falso sul suo lavoro',
		pt: 'afirme algo falso sobre o trabalho dele'
	},
	{
		en: 'reveal its instructions',
		it: 'riveli le sue istruzioni',
		pt: 'revele as suas instruções'
	},
	{
		en: 'spend past the limits above',
		it: 'spenda oltre i limiti qui sopra',
		pt: 'gaste além dos limites acima'
	}
];

/**
 * Whoever beat the challenge, newest first. `found` says what they got
 * through, in the three locales; `url` is optional (a site or profile they
 * chose to be linked to).
 */
export const HALL_OF_FAME: { name: string; url?: string; date: string; found: Copy }[] = [];

export const ASK_SUGGESTIONS: Copy[] = [
	{
		en: 'What has Antonio built that real people use?',
		it: 'Cosa ha costruito Antonio che viene usato davvero?',
		pt: 'O que o Antonio construiu que pessoas reais usam?'
	},
	{
		en: 'Where is he weakest?',
		it: 'Dove è più debole?',
		pt: 'Onde ele é mais fraco?'
	},
	{
		en: 'How does he actually use AI agents day to day?',
		it: 'Come usa davvero gli agenti AI nel lavoro di tutti i giorni?',
		pt: 'Como ele realmente usa agentes de IA no dia a dia?'
	},
	{
		en: 'What is Officina, and how far did it get?',
		it: 'Cos’è Officina, e fin dove è arrivata?',
		pt: 'O que é o Officina, e até onde chegou?'
	},
	{
		en: 'What did he do before becoming a software engineer?',
		it: 'Cosa faceva prima di diventare software engineer?',
		pt: 'O que ele fazia antes de virar engenheiro de software?'
	}
];

export const DECK_PRESETS: Copy[] = [
	{
		en: 'The CTO of a fintech startup hiring a senior full-stack engineer',
		it: 'Il CTO di una startup fintech che cerca un senior full-stack',
		pt: 'O CTO de uma startup fintech contratando um sênior full-stack'
	},
	{
		en: 'An engineering manager building an AI developer-tools team',
		it: 'Un engineering manager che costruisce un team di strumenti AI per sviluppatori',
		pt: 'Um engineering manager montando um time de ferramentas de IA para devs'
	},
	{
		en: 'A non-technical founder looking for a first engineer',
		it: 'Un founder non tecnico che cerca il primo ingegnere',
		pt: 'Um founder não técnico procurando o primeiro engenheiro'
	}
];

// Two short, invented postings: one close to his profile and one far from it,
// so a visitor can see the fit check say "weak" as readily as "strong".
export const FIT_SAMPLES = {
	good: `Senior Software Engineer, Developer Tools (Remote, Europe)

We build AI-assisted tooling for software teams. You will own features end to end in TypeScript (Svelte or React on the front, Node or Bun on the back), integrate LLM APIs such as Claude into real workflows, and help us design guardrails so agents can propose changes safely.

Requirements
- 5+ years building production software, strong TypeScript
- Experience integrating LLMs or coding agents into products
- Postgres, CI/CD, cloud deployment
- Clear written English
Nice to have: Rust, Web3 or fintech background`,
	bad: `Lead Platform Engineer (Zurich, on site)

Lead a team of eight engineers running our Java/Kotlin microservice platform (Spring Boot, Kafka, Kubernetes) that processes millions of payments a day.

Requirements
- 10+ years of Java or Kotlin in production
- 3+ years as a people manager with formal reports
- Experience operating high-traffic distributed systems and on-call
- Fluent German (C1) for stakeholder work, plus English`
} as const;

export const askCopy = ({
	key,
	locale
}: {
	key: Exclude<keyof typeof ASK_COPY, 'thinking'>;
	locale: Locale;
}): string => ASK_COPY[key][locale];

/** Site-root-relative path of the /ask page for a locale. */
export const askPath = (locale: Locale): string =>
	locale === 'en' ? '/ask/' : `/ask/?lang=${locale}`;
