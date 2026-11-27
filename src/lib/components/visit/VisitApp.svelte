<script lang="ts">
	import { FileText, Mail, ShieldCheck, Sparkles } from '@lucide/svelte';
	import Footer from '#lib/components/layout/Footer.svelte';
	import ThemeToggle from '#lib/components/layout/ThemeToggle.svelte';
	import VisitDiff from '#lib/components/visit/VisitDiff.svelte';
	import { portfolioData } from '#lib/services/portfolio.services.ts';
	import { ASK_COPY, askPath } from '#lib/utils/ask-copy.utils.ts';
	import { cvPath, mapPath } from '#lib/utils/locale.utils.ts';
	import { VISIT_COPY as t } from '#lib/utils/visit-copy.utils.ts';
	import type { VisitRecipient } from '#lib/utils/visit-recipients.utils.ts';

	interface Props {
		recipient: VisitRecipient;
	}

	let { recipient }: Props = $props();

	const { person } = portfolioData;
	const ask = askPath('en');

	const links = [
		{ label: ASK_COPY.tabFit.en, href: `${ask}?mode=fit`, icon: Sparkles },
		{ label: t.breakMyAi, href: `${ask}#protection`, icon: ShieldCheck },
		{ label: t.cv, href: cvPath('en'), icon: FileText },
		{ label: person.email, href: `mailto:${person.email}`, icon: Mail }
	];
</script>

<div class="page-aurora flex min-h-dvh flex-col font-sans text-fg selection:bg-selection/40">
	<header class="mx-auto flex w-full max-w-4xl items-center justify-between gap-3 px-4 pt-5">
		<a
			class="rounded-md text-sm font-semibold text-fg outline-hidden transition hover:text-accent focus-visible:ring-2 focus-visible:ring-accent"
			href={mapPath('en')}>{person.name}</a
		>
		<ThemeToggle />
	</header>

	<main class="mx-auto w-full max-w-4xl flex-1 space-y-6 px-4 py-7 sm:py-9">
		<div class="space-y-2">
			<h1 class="text-2xl leading-tight font-semibold tracking-tight text-balance sm:text-3xl">
				{t.title}
			</h1>
			<p class="text-sm text-fg-subtle">{person.title.en} · {person.location.en}</p>
		</div>

		<VisitDiff posting={recipient.posting} />

		<p class="max-w-[52ch] text-base leading-relaxed text-fg">{recipient.posting.line}</p>

		<nav aria-label={t.linksLabel}>
			<ul class="flex flex-wrap gap-2">
				{#each links as link, i (link.href)}
					<li>
						<a
							class="inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm transition focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-hidden {i ===
							0
								? 'border-accent bg-accent font-semibold text-accent-fg hover:bg-accent-hover'
								: 'border-border bg-popover text-fg hover:border-accent'}"
							href={link.href}
						>
							<link.icon aria-hidden="true" size={15} />
							{link.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</main>

	<Footer />
</div>
