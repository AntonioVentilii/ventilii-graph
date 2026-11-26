<script lang="ts">
	import { ArrowLeft, ArrowRight } from '@lucide/svelte';
	import { tick } from 'svelte';
	import Footer from '#lib/components/layout/Footer.svelte';
	import ThemeToggle from '#lib/components/layout/ThemeToggle.svelte';
	import VisitCover from '#lib/components/visit/VisitCover.svelte';
	import VisitNext from '#lib/components/visit/VisitNext.svelte';
	import VisitQuestionStep from '#lib/components/visit/VisitQuestionStep.svelte';
	import VisitResult from '#lib/components/visit/VisitResult.svelte';
	import VisitRole from '#lib/components/visit/VisitRole.svelte';
	import { portfolioData } from '#lib/services/portfolio.services.ts';
	import { mapPath } from '#lib/utils/locale.utils.ts';
	import { VISIT_COPY as t } from '#lib/utils/visit-copy.utils.ts';
	import type { VisitRecipient } from '#lib/utils/visit-recipients.utils.ts';
	import { VISIT_QUESTIONS, type VisitAnswers } from '#lib/utils/visit.utils.ts';

	interface Props {
		recipient: VisitRecipient;
	}

	let { recipient }: Props = $props();

	type Step =
		| { kind: 'cover' | 'role' | 'result' | 'next'; name: string }
		| { kind: 'question'; name: string; id: VisitRecipient['questions'][number]; n: number };

	// The one list of steps: the index, the progress bar and the arrows read it.
	const steps = $derived<Step[]>([
		{ kind: 'cover', name: t.stepCover },
		{ kind: 'role', name: t.stepRole },
		...recipient.questions.map((id, i): Step => ({
			kind: 'question',
			name: VISIT_QUESTIONS[id].name,
			id,
			n: i + 1
		})),
		{ kind: 'result', name: t.stepResult },
		{ kind: 'next', name: t.stepNext }
	]);

	let step = $state(0);
	let answers = $state<VisitAnswers>({});

	const current = $derived(steps[step]);
	const last = $derived(steps.length - 1);
	const nextLabel = $derived(steps[step + 1]?.kind === 'result' ? t.showMatch : t.next);

	const go = (i: number) => {
		if (i < 0 || i > last || i === step) {
			return;
		}
		step = i;
		window.scrollTo({ top: 0 });
		// On a phone the index is one scrolling row: keep the current step in it.
		void tick().then(() =>
			document
				.querySelector('[aria-current="step"]')
				?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
		);
	};

	const onKey = (e: KeyboardEvent) => {
		const typing = e.target instanceof HTMLElement && e.target.closest('input, textarea, select');
		if (typing || e.altKey || e.metaKey || e.ctrlKey) {
			return;
		}
		if (e.key === 'ArrowRight') {
			go(step + 1);
		}
		if (e.key === 'ArrowLeft') {
			go(step - 1);
		}
	};
</script>

<svelte:window onkeydown={onKey} />

<div class="page-aurora flex min-h-dvh flex-col text-fg selection:bg-selection/40">
	<header
		class="flex items-center justify-between gap-3 border-b border-border bg-page/80 px-4 py-3 backdrop-blur-md lg:px-8"
	>
		<a
			class="inline-flex h-9 items-center gap-2 rounded-full border border-border bg-popover px-3 text-xs leading-none text-fg-muted outline-hidden transition hover:border-accent hover:text-fg focus-visible:ring-2 focus-visible:ring-accent"
			href={mapPath('en')}
		>
			<span class="font-display font-bold text-fg">{portfolioData.person.name}</span>
		</a>
		<ThemeToggle />
	</header>

	<div
		class="mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:py-10"
	>
		<nav class="min-w-0 lg:sticky lg:top-6 lg:self-start" aria-label={t.indexLabel}>
			<ol class="flex gap-1 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
				{#each steps as s, i (s.name)}
					<li>
						<button
							class="flex w-full items-baseline gap-2 rounded-lg px-2.5 py-1.5 text-left text-sm whitespace-nowrap transition {i ===
							step
								? 'bg-accent-soft font-bold text-fg'
								: i < step
									? 'text-fg-muted hover:bg-card'
									: 'text-fg-subtle hover:bg-card'}"
							aria-current={i === step ? 'step' : undefined}
							onclick={() => go(i)}
							type="button"
						>
							<span class="font-display text-xs text-accent">{String(i).padStart(2, '0')}</span>
							{s.name}
						</button>
					</li>
				{/each}
			</ol>
		</nav>

		<main class="min-w-0">
			<div class="h-1 overflow-hidden rounded-full bg-border-muted" aria-hidden="true">
				<span
					style:width="{(step / last) * 100}%"
					class="block h-full rounded-full bg-accent transition-[width] duration-300 motion-reduce:transition-none"
				></span>
			</div>

			<section class="animate-fade min-h-[24rem] py-8 lg:py-12">
				{#key step}
					{#if current.kind === 'cover'}
						<VisitCover onstart={() => go(1)} questions={recipient.questions.length} />
					{:else if current.kind === 'role'}
						<VisitRole role={recipient.role} />
					{:else if current.kind === 'question'}
						<VisitQuestionStep
							id={current.id}
							n={current.n}
							total={recipient.questions.length}
							bind:answers
						/>
					{:else if current.kind === 'result'}
						<VisitResult
							{answers}
							onquestion={(id) => go(steps.findIndex((s) => s.kind === 'question' && s.id === id))}
							questions={recipient.questions}
						/>
					{:else}
						<VisitNext />
					{/if}
				{/key}
			</section>

			{#if current.kind !== 'cover'}
				<div class="flex items-center justify-between gap-3 border-t border-border pt-4">
					<button
						class="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm text-fg-muted transition hover:text-fg"
						onclick={() => go(step - 1)}
						type="button"
					>
						<ArrowLeft aria-hidden="true" size={14} />
						{t.back}
					</button>
					<span class="font-display text-xs text-fg-subtle">{step} / {last}</span>
					{#if step < last}
						<button
							class="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-bold text-accent-fg transition hover:bg-accent-hover"
							onclick={() => go(step + 1)}
							type="button"
						>
							{nextLabel}
							<ArrowRight aria-hidden="true" size={14} />
						</button>
					{:else}
						<span></span>
					{/if}
				</div>
			{/if}
		</main>
	</div>

	<Footer />
</div>
