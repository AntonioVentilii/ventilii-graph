<script lang="ts">
	import { ChevronLeft, ChevronRight, Maximize2, Printer } from 'lucide-svelte';
	import EvidenceChips from '$lib/components/ai/EvidenceChips.svelte';
	import type { DeckResult } from '$lib/types/ai.types';
	import type { Locale } from '$lib/types/portfolio.types';
	import { askCopy } from '$lib/utils/ask-copy.utils';

	interface Props {
		deck: DeckResult;
		locale: Locale;
		name: string;
	}

	let { deck, locale, name }: Props = $props();

	let index = $state(0);
	let root: HTMLElement | undefined = $state();
	let stage: HTMLElement | undefined = $state();

	const t = (key: Parameters<typeof askCopy>[0]['key']) => askCopy({ key, locale });
	const total = $derived(deck.slides.length);

	const go = (delta: number) => {
		index = Math.min(total - 1, Math.max(0, index + delta));
	};

	// Arrow keys drive the deck while focus is on its controls or it is fullscreen, like a slide app.
	const onkeydown = (e: KeyboardEvent) => {
		const active = document.fullscreenElement === stage || root?.contains(document.activeElement);
		if (!active) {
			return;
		}
		if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
			e.preventDefault();
			go(1);
		} else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
			e.preventDefault();
			go(-1);
		} else if (e.key === 'Home') {
			index = 0;
		} else if (e.key === 'End') {
			index = total - 1;
		}
	};

	const present = async () => {
		try {
			await stage?.requestFullscreen();
		} catch {
			// Fullscreen can be refused (iframes, some mobile browsers); the inline deck still works.
		}
	};
</script>

<svelte:window {onkeydown} />

<div bind:this={root} class="space-y-3">
	<section
		bind:this={stage}
		class="deck-stage shadow-hub relative overflow-hidden rounded-2xl border border-border bg-card-solid outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
		aria-label={deck.title}
		aria-roledescription="slides"
	>
		{#each deck.slides as slide, i (i)}
			<article
				class="deck-slide flex aspect-[16/10] flex-col justify-between gap-4 p-6 sm:p-10"
				class:is-current={i === index}
				aria-hidden={i !== index}
				aria-label="{i + 1} / {total}"
			>
				<div class="space-y-4">
					<p class="font-display text-xs tracking-[0.18em] text-accent uppercase">
						{slide.kicker}
					</p>
					<h3 class="deck-heading font-display font-bold text-fg">{slide.heading}</h3>
					<ul class="deck-bullets space-y-2 text-fg-muted">
						{#each slide.bullets as b, j (j)}
							<li class="flex gap-3">
								<span class="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"></span>
								<span>{b}</span>
							</li>
						{/each}
					</ul>
				</div>
				<footer class="flex flex-wrap items-end justify-between gap-3">
					<div class="deck-evidence min-w-0">
						<EvidenceChips evidence={slide.evidence} {locale} />
					</div>
					<p class="shrink-0 text-xs text-fg-faint tabular-nums">
						{name} · {i + 1}/{total}
					</p>
				</footer>
			</article>
		{/each}
	</section>

	<div class="deck-controls flex flex-wrap items-center justify-between gap-2">
		<div class="flex items-center gap-2">
			<button
				class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-popover text-fg-muted transition hover:border-accent hover:text-fg disabled:opacity-40"
				aria-label={t('prev')}
				disabled={index === 0}
				onclick={() => go(-1)}
				type="button"
			>
				<ChevronLeft aria-hidden="true" size={16} />
			</button>
			<span class="text-xs text-fg-subtle tabular-nums">{index + 1} {t('slideOf')} {total}</span>
			<button
				class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-popover text-fg-muted transition hover:border-accent hover:text-fg disabled:opacity-40"
				aria-label={t('next')}
				disabled={index === total - 1}
				onclick={() => go(1)}
				type="button"
			>
				<ChevronRight aria-hidden="true" size={16} />
			</button>
			<div class="ml-2 hidden gap-1 sm:flex" aria-hidden="true">
				{#each deck.slides as _, i (i)}
					<button
						class="h-1.5 rounded-full transition-all {i === index
							? 'w-6 bg-accent'
							: 'w-1.5 bg-border-strong'}"
						aria-label="{i + 1} / {total}"
						onclick={() => (index = i)}
						tabindex="-1"
						type="button"
					></button>
				{/each}
			</div>
		</div>
		<div class="flex items-center gap-2">
			<button
				class="inline-flex h-9 items-center gap-2 rounded-full border border-border bg-popover px-3 text-xs text-fg-muted transition hover:border-accent hover:text-fg"
				onclick={present}
				type="button"
			>
				<Maximize2 aria-hidden="true" size={14} />
				{t('present')}
			</button>
			<button
				class="inline-flex h-9 items-center gap-2 rounded-full border border-border bg-popover px-3 text-xs text-fg-muted transition hover:border-accent hover:text-fg"
				onclick={() => window.print()}
				type="button"
			>
				<Printer aria-hidden="true" size={14} />
				{t('print')}
			</button>
		</div>
	</div>
	<p class="text-xs text-fg-faint">{t('generatedBy')}</p>
</div>

<style lang="postcss">
	.deck-slide {
		display: none;
	}
	.deck-slide.is-current {
		display: flex;
		animation: deck-in 0.28s ease-out;
	}
	.deck-heading {
		font-size: clamp(1.1rem, 3.2vw, 2rem);
		line-height: 1.15;
	}
	.deck-bullets {
		font-size: clamp(0.8rem, 1.6vw, 1.05rem);
		line-height: 1.5;
	}
	.deck-stage:fullscreen {
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 0;
		border: 0;
	}
	.deck-stage:fullscreen .deck-slide.is-current {
		width: min(100vw, 160vh);
		padding: 5vh 6vw;
	}
	.deck-stage:fullscreen .deck-heading {
		font-size: clamp(1.5rem, 4.5vh, 3.25rem);
	}
	.deck-stage:fullscreen .deck-bullets {
		font-size: clamp(1rem, 2.6vh, 1.6rem);
	}
	@keyframes deck-in {
		from {
			opacity: 0;
			transform: translateY(6px);
		}
		to {
			opacity: 1;
			transform: none;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.deck-slide.is-current {
			animation: none;
		}
	}

	/* Print: every slide on its own landscape page, nothing else on the sheet. */
	@media print {
		.deck-slide {
			display: flex !important;
			break-after: page;
			aspect-ratio: auto;
			min-height: 90vh;
			animation: none !important;
		}
		.deck-stage {
			border: 0;
			box-shadow: none;
		}
		.deck-controls {
			display: none;
		}
	}
</style>
