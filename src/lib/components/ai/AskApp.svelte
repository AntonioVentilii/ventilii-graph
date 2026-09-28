<script lang="ts">
	import { ArrowLeft } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import AskMode from '$lib/components/ai/AskMode.svelte';
	import DeckMode from '$lib/components/ai/DeckMode.svelte';
	import FitMode from '$lib/components/ai/FitMode.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import LocaleSelect from '$lib/components/layout/LocaleSelect.svelte';
	import ThemeToggle from '$lib/components/layout/ThemeToggle.svelte';
	import { fetchAiHealth } from '$lib/services/ai.services';
	import { portfolioData } from '$lib/services/portfolio.services';
	import type { AiMode } from '$lib/types/ai.types';
	import type { Locale } from '$lib/types/portfolio.types';
	import { askCopy } from '$lib/utils/ask-copy.utils';
	import { cvPath } from '$lib/utils/locale.utils';

	const { person } = portfolioData;

	let locale = $state<Locale>('en');
	let mode = $state<AiMode>('ask');
	// Unknown until the health check answers; the forms stay usable meanwhile
	// and only lock once the API says it is down.
	let online = $state<boolean | undefined>(undefined);

	const t = (key: Parameters<typeof askCopy>[0]['key']) => askCopy({ key, locale });

	const MODES: {
		id: AiMode;
		label: 'tabAsk' | 'tabFit' | 'tabDeck';
		hint: 'tabAskHint' | 'tabFitHint' | 'tabDeckHint';
	}[] = [
		{ id: 'ask', label: 'tabAsk', hint: 'tabAskHint' },
		{ id: 'fit', label: 'tabFit', hint: 'tabFitHint' },
		{ id: 'deck', label: 'tabDeck', hint: 'tabDeckHint' }
	];

	const mapHref = $derived(locale === 'en' ? '/' : `/?lang=${locale}`);

	onMount(() => {
		const params = new URLSearchParams(window.location.search);
		const lang = params.get('lang');
		if (lang === 'en' || lang === 'it' || lang === 'pt') {
			locale = lang;
		}
		const m = params.get('mode');
		if (m === 'ask' || m === 'fit' || m === 'deck') {
			mode = m;
		}
		void fetchAiHealth().then((health) => {
			online = health?.configured === true;
		});
	});

	$effect(() => {
		document.documentElement.lang = locale === 'pt' ? 'pt-BR' : locale;
	});

	const onTabKeydown = (e: KeyboardEvent) => {
		if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') {
			return;
		}
		e.preventDefault();
		const i = MODES.findIndex((m) => m.id === mode);
		const next = MODES[(i + (e.key === 'ArrowRight' ? 1 : MODES.length - 1)) % MODES.length];
		mode = next.id;
		document.getElementById(`tab-${next.id}`)?.focus();
	};
</script>

<svelte:head>
	<title>{t('metaTitle')}</title>
	<meta name="description" content={t('metaDescription')} />
</svelte:head>

<div class="page-aurora flex min-h-dvh flex-col text-fg selection:bg-selection/40">
	<header
		class="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-page/80 px-4 py-3 backdrop-blur-md lg:px-8 print:hidden"
	>
		<a
			class="inline-flex h-9 items-center gap-2 rounded-full border border-border bg-popover px-3 text-xs leading-none text-fg-muted outline-hidden transition hover:border-accent hover:text-fg focus-visible:ring-2 focus-visible:ring-accent"
			aria-label={t('backToMap')}
			href={mapHref}
			title={t('backToMap')}
		>
			<ArrowLeft aria-hidden="true" size={14} />
			<span>{t('map')}</span>
		</a>
		<div class="flex items-center gap-2">
			<ThemeToggle />
			<LocaleSelect langLabel={t('langLabel')} bind:locale />
		</div>
	</header>

	<main class="mx-auto w-full max-w-3xl flex-1 px-4 py-10 lg:py-14">
		<section class="space-y-4 print:hidden">
			<p class="font-display text-xs tracking-[0.18em] text-accent uppercase">{t('eyebrow')}</p>
			<h1 class="font-display text-2xl leading-tight font-bold text-fg sm:text-3xl">
				{t('title')}
			</h1>
			<p class="max-w-[70ch] text-sm leading-relaxed text-fg-muted">{t('intro')}</p>
		</section>

		{#if online === false}
			<p
				class="mt-6 rounded-2xl border border-border-strong bg-card p-4 text-sm text-fg-muted print:hidden"
				role="status"
			>
				{t('offline')}
				<a class="ml-1 text-link underline underline-offset-2" href={cvPath(locale)}>CV</a>
			</p>
		{/if}

		<div
			class="mt-8 grid grid-cols-3 gap-2 rounded-2xl border border-border bg-card p-1.5 print:hidden"
			aria-label={t('tabsLabel')}
			role="tablist"
		>
			{#each MODES as m (m.id)}
				<button
					id="tab-{m.id}"
					class="min-w-0 rounded-xl px-2 py-2.5 text-left transition sm:px-4 {mode === m.id
						? 'shadow-leaf bg-card-solid'
						: 'hover:bg-card-solid/60'}"
					aria-controls="panel-{m.id}"
					aria-selected={mode === m.id}
					onclick={() => (mode = m.id)}
					onkeydown={onTabKeydown}
					role="tab"
					tabindex={mode === m.id ? 0 : -1}
					type="button"
				>
					<span
						class="block text-xs font-bold sm:text-sm {mode === m.id
							? 'text-accent'
							: 'text-fg-muted'}">{t(m.label)}</span
					>
					<span class="hidden text-xs text-fg-subtle sm:block">{t(m.hint)}</span>
				</button>
			{/each}
		</div>

		<!-- All three stay mounted so switching tabs keeps each answer. -->
		<div class="mt-8">
			<div id="panel-ask" aria-labelledby="tab-ask" hidden={mode !== 'ask'} role="tabpanel">
				<AskMode disabled={online === false} email={person.email} {locale} />
			</div>
			<div id="panel-fit" aria-labelledby="tab-fit" hidden={mode !== 'fit'} role="tabpanel">
				<FitMode disabled={online === false} email={person.email} {locale} />
			</div>
			<div id="panel-deck" aria-labelledby="tab-deck" hidden={mode !== 'deck'} role="tabpanel">
				<DeckMode name={person.name} disabled={online === false} email={person.email} {locale} />
			</div>
		</div>

		<p class="mt-12 text-sm text-fg-subtle print:hidden">
			{t('contact')}
			<a
				class="text-link underline underline-offset-2 hover:text-link-hover"
				href="mailto:{person.email}">{person.email}</a
			>
			·
			<a class="text-link underline underline-offset-2 hover:text-link-hover" href={cvPath(locale)}
				>CV</a
			>
		</p>
	</main>

	<div class="print:hidden">
		<Footer />
	</div>
</div>
