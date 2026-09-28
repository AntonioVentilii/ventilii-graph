<script lang="ts">
	import ErrorNote from '$lib/components/ai/ErrorNote.svelte';
	import EvidenceChips from '$lib/components/ai/EvidenceChips.svelte';
	import FieldCounter from '$lib/components/ai/FieldCounter.svelte';
	import ThinkingIndicator from '$lib/components/ai/ThinkingIndicator.svelte';
	import { AiRequestState } from '$lib/stores/ai-request.svelte';
	import { AI_INPUT_LIMITS, type FitGap, type FitResult } from '$lib/types/ai.types';
	import type { Locale } from '$lib/types/portfolio.types';
	import { FIT_SAMPLES, askCopy } from '$lib/utils/ask-copy.utils';

	interface Props {
		locale: Locale;
		disabled: boolean;
		email: string;
	}

	let { locale, disabled, email }: Props = $props();

	const req = new AiRequestState<'fit'>();
	let posting = $state('');
	let copied = $state(false);

	const t = (key: Parameters<typeof askCopy>[0]['key']) => askCopy({ key, locale });

	const check = () => {
		const trimmed = posting.trim();
		if (!trimmed || disabled) {
			return;
		}
		copied = false;
		void req.run({ mode: 'fit', locale, jobDescription: trimmed });
	};

	const onsubmit = (e: SubmitEvent) => {
		e.preventDefault();
		check();
	};

	const useSample = (sample: keyof typeof FIT_SAMPLES) => {
		posting = FIT_SAMPLES[sample];
		check();
	};

	const VERDICT_KEY = {
		strong: 'verdictStrong',
		good: 'verdictGood',
		partial: 'verdictPartial',
		weak: 'verdictWeak'
	} as const;

	// Filled segments on a four-step meter: an honest verdict reads at a glance.
	const VERDICT_LEVEL: Record<FitResult['verdict'], number> = {
		weak: 1,
		partial: 2,
		good: 3,
		strong: 4
	};

	const SEVERITY_ORDER: Record<FitGap['severity'], number> = {
		blocker: 0,
		significant: 1,
		minor: 2
	};

	const asText = (r: FitResult): string =>
		[
			`${r.role}: ${t(VERDICT_KEY[r.verdict])}`,
			r.verdictLine,
			'',
			`${t('matches')}:`,
			...r.matches.map((m) => `- ${m.requirement} (${t(m.strength)}): ${m.note}`),
			'',
			`${t('gaps')}:`,
			...(r.gaps.length
				? r.gaps.map((g) => `- ${g.requirement} (${t(g.severity)}): ${g.note}`)
				: [`- ${t('noGaps')}`]),
			'',
			`${t('interviewQuestions')}:`,
			...r.interviewQuestions.map((q) => `- ${q}`),
			'',
			`${t('bottomLine')}: ${r.bottomLine}`,
			'',
			t('generatedBy')
		].join('\n');

	const copy = async (r: FitResult) => {
		try {
			await navigator.clipboard.writeText(asText(r));
			copied = true;
		} catch {
			copied = false;
		}
	};
</script>

<form class="space-y-3" {onsubmit}>
	<label class="block text-xs tracking-wide text-fg-subtle uppercase" for="fit-posting">
		{t('fitLabel')}
	</label>
	<textarea
		id="fit-posting"
		class="shadow-leaf min-h-48 w-full resize-y rounded-2xl border border-border bg-card-solid p-4 text-sm text-fg outline-hidden placeholder:text-fg-faint focus:border-accent"
		maxlength={AI_INPUT_LIMITS.jobDescription}
		placeholder={t('fitPlaceholder')}
		bind:value={posting}
	></textarea>
	<div class="flex flex-wrap items-center justify-between gap-3">
		<div class="flex flex-wrap items-center gap-2">
			<span class="text-xs text-fg-subtle">{t('fitSamples')}</span>
			<button
				class="rounded-full border border-border bg-popover px-3 py-1 text-xs text-fg-muted transition hover:border-accent hover:text-fg disabled:opacity-50"
				disabled={disabled || req.loading}
				onclick={() => useSample('good')}
				type="button">{t('fitSampleGood')}</button
			>
			<button
				class="rounded-full border border-border bg-popover px-3 py-1 text-xs text-fg-muted transition hover:border-accent hover:text-fg disabled:opacity-50"
				disabled={disabled || req.loading}
				onclick={() => useSample('bad')}
				type="button">{t('fitSampleBad')}</button
			>
		</div>
		<div class="flex items-center gap-3">
			<FieldCounter
				label={t('charsLeft')}
				length={posting.length}
				max={AI_INPUT_LIMITS.jobDescription}
			/>
			<button
				class="h-10 rounded-xl bg-accent px-4 text-sm font-bold text-accent-fg transition hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
				disabled={disabled || req.loading || !posting.trim()}
				type="submit"
			>
				{t('fitSubmit')}
			</button>
		</div>
	</div>
</form>

<div class="mt-6 space-y-4">
	{#if req.loading}
		<ThinkingIndicator {locale} />
	{:else if req.error}
		<ErrorNote {email} error={req.error} {locale} />
	{/if}

	{#if req.result && !req.loading}
		{@const r = req.result}
		<article
			class="animate-fade shadow-leaf space-y-6 rounded-2xl border border-border bg-card p-5"
		>
			<header class="flex flex-wrap items-start justify-between gap-4">
				<div class="min-w-0 space-y-2">
					<p class="text-xs tracking-wide text-fg-subtle uppercase">{r.role}</p>
					<div class="flex items-center gap-3">
						<span class="flex gap-1" aria-hidden="true">
							{#each [1, 2, 3, 4] as level (level)}
								<span
									class="h-2 w-6 rounded-full {level <= VERDICT_LEVEL[r.verdict]
										? 'bg-accent'
										: 'bg-border'}"
								></span>
							{/each}
						</span>
						<h3 class="font-display text-lg font-bold text-fg">{t(VERDICT_KEY[r.verdict])}</h3>
					</div>
					<p class="max-w-[70ch] text-sm text-fg-muted">{r.verdictLine}</p>
				</div>
				<button
					class="h-8 rounded-full border border-border bg-popover px-3 text-xs text-fg-muted transition hover:border-accent hover:text-fg"
					onclick={() => copy(r)}
					type="button"
				>
					{copied ? t('copied') : t('copy')}
				</button>
			</header>

			<section class="space-y-3">
				<h4 class="text-xs font-bold tracking-wide text-accent uppercase">{t('matches')}</h4>
				<ul class="space-y-3">
					{#each r.matches as m, i (i)}
						<li class="space-y-1.5 border-l-2 border-accent pl-3">
							<p class="text-sm font-bold text-fg">
								{m.requirement}
								<span
									class="ml-1 rounded-full border px-2 py-0.5 text-[0.65rem] font-normal tracking-wide uppercase {m.strength ===
									'direct'
										? 'border-accent text-accent'
										: 'border-border-strong text-fg-subtle'}">{t(m.strength)}</span
								>
							</p>
							<p class="text-sm text-fg-muted">{m.note}</p>
							<EvidenceChips evidence={m.evidence} {locale} />
						</li>
					{/each}
				</ul>
			</section>

			<section class="space-y-3">
				<h4 class="text-xs font-bold tracking-wide text-fg-subtle uppercase">{t('gaps')}</h4>
				{#if r.gaps.length}
					<ul class="space-y-3">
						{#each [...r.gaps].sort((a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity]) as g, i (i)}
							<li class="space-y-1 border-l-2 border-dashed border-border-strong pl-3">
								<p class="text-sm font-bold text-fg">
									{g.requirement}
									<span
										class="ml-1 rounded-full border px-2 py-0.5 text-[0.65rem] font-normal tracking-wide uppercase {g.severity ===
										'blocker'
											? 'border-fg bg-fg text-page'
											: g.severity === 'significant'
												? 'border-fg-muted text-fg'
												: 'border-border-strong text-fg-subtle'}">{t(g.severity)}</span
									>
								</p>
								<p class="text-sm text-fg-muted">{g.note}</p>
							</li>
						{/each}
					</ul>
				{:else}
					<p class="text-sm text-fg-muted">{t('noGaps')}</p>
				{/if}
			</section>

			{#if r.interviewQuestions.length}
				<section class="space-y-2">
					<h4 class="text-xs font-bold tracking-wide text-fg-subtle uppercase">
						{t('interviewQuestions')}
					</h4>
					<ol class="list-decimal space-y-1.5 pl-5 text-sm text-fg-muted">
						{#each r.interviewQuestions as q, i (i)}
							<li>{q}</li>
						{/each}
					</ol>
				</section>
			{/if}

			<section class="rounded-xl bg-accent-soft p-4">
				<h4 class="mb-1 text-xs font-bold tracking-wide text-accent uppercase">
					{t('bottomLine')}
				</h4>
				<p class="text-sm text-fg">{r.bottomLine}</p>
			</section>

			<p class="text-xs text-fg-faint">{t('generatedBy')}</p>
		</article>
	{/if}
</div>
