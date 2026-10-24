<script lang="ts">
	import type { EvidenceRef } from '$lib/types/ai.types';
	import type { Locale } from '$lib/types/portfolio.types';
	import { evidenceLink } from '$lib/utils/evidence.utils';

	interface Props {
		evidence: (EvidenceRef | string)[];
		locale: Locale;
		label?: string;
	}

	let { evidence, locale, label }: Props = $props();

	const links = $derived(
		evidence.flatMap((e) => {
			const ref = typeof e === 'string' ? { id: e, why: '' } : e;
			const link = evidenceLink({ id: ref.id, locale });
			return link ? [{ ...link, why: ref.why }] : [];
		})
	);
</script>

{#if links.length}
	<div class="flex flex-wrap items-center gap-1.5">
		{#if label}
			<span class="mr-1 text-xs tracking-wide text-fg-subtle uppercase">{label}</span>
		{/if}
		{#each links as link (link.id)}
			<a
				class="evidence-chip inline-flex max-w-full items-center gap-1 rounded-full border border-border bg-card-solid px-2.5 py-0.5 text-xs text-fg-muted transition hover:border-accent hover:text-fg focus-visible:ring-2 focus-visible:ring-accent"
				href={link.href}
				title={link.why || link.label}
			>
				<span class="text-accent" aria-hidden="true">↗</span>
				<span class="truncate">{link.label}</span>
				{#if link.why}
					<span class="hidden truncate text-fg-faint sm:inline">· {link.why}</span>
				{/if}
			</a>
		{/each}
	</div>
{/if}
