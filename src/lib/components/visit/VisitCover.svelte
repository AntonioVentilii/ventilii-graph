<script lang="ts">
	import { portfolioData } from '#lib/services/portfolio.services.ts';
	import { VISIT_COPY as t } from '#lib/utils/visit-copy.utils.ts';

	interface Props {
		questions: number;
		onstart: () => void;
	}

	let { questions, onstart }: Props = $props();

	const { person } = portfolioData;
</script>

<div class="space-y-6 pt-4 lg:pt-10">
	<p class="font-display text-xs tracking-[0.18em] text-accent uppercase">
		{t.coverKicker}
	</p>
	<h1 class="max-w-[22ch] font-display text-3xl leading-tight font-bold text-fg sm:text-5xl">
		{t.coverTitle}
	</h1>
	<p class="max-w-[60ch] text-sm leading-relaxed text-fg-muted">
		{t.coverAnswer}
		{questions}
		{t.coverLead}
	</p>
	<button
		class="rounded-full bg-accent px-6 py-3 text-sm font-bold text-accent-fg transition hover:bg-accent-hover"
		onclick={onstart}
		type="button"
	>
		{t.start}
	</button>
	<div class="flex items-center gap-3 pt-8">
		<img
			class="h-12 w-12 rounded-full border border-border object-cover"
			alt=""
			height="48"
			src={person.avatarUrl}
			width="48"
		/>
		<div class="text-xs leading-relaxed">
			<p class="font-bold text-fg">{person.name} · {person.title.en}</p>
			<p class="text-fg-subtle">{t.coverFine}</p>
		</div>
	</div>
</div>
