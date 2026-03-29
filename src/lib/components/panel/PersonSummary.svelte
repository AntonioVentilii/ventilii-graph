<script lang="ts">
	import { Download, Mail } from 'lucide-svelte';
	import EntryHeader from '$lib/components/ui/EntryHeader.svelte';
	import LinkList from '$lib/components/ui/LinkList.svelte';
	import RelatedSection from '$lib/components/ui/RelatedSection.svelte';
	import type { Locale, PortfolioData } from '$lib/types/portfolio.types';
	import { pickLocale } from '$lib/utils/locale.utils';

	interface Props {
		data: PortfolioData;
		locale: Locale;
		orgNoteLabel: string;
		panelHint: string;
	}

	let { data, locale, orgNoteLabel, panelHint }: Props = $props();
</script>

<div class="space-y-4">
	<div class="flex items-start gap-4">
		{#if data.person.avatarUrl}
			<img
				class="h-18 w-18 shrink-0 rounded-2xl object-cover shadow-sm"
				alt={data.person.name}
				src={data.person.avatarUrl}
			/>
		{/if}
		<EntryHeader
			isMain
			meta={pickLocale({ text: data.person.location, locale })}
			subtitle={pickLocale({ text: data.person.title, locale })}
			title={data.person.name}
			titleClass="text-base font-bold"
		/>
	</div>

	<p class="text-xs leading-relaxed text-fg-muted">
		{pickLocale({ text: data.person.tagline, locale })}
	</p>

	<div class="flex flex-wrap items-center gap-2 pt-2">
		<a
			class="inline-flex items-center justify-center rounded-full bg-accent px-3 py-1.5 text-[0.625rem] leading-none font-semibold text-accent-fg transition hover:bg-accent-hover"
			aria-label={pickLocale({ text: { en: 'Email', it: 'Email' }, locale })}
			href={`mailto:${data.person.email}`}
			title={pickLocale({ text: { en: 'Email', it: 'Email' }, locale })}
		>
			<Mail size={14} strokeWidth={2.5} />
		</a>
		<LinkList
			class="pt-0"
			linkClass="border-border bg-popover text-fg hover:border-accent inline-flex items-center justify-center rounded-full border px-3 py-1.5 text-[0.625rem] transition"
			links={data.person.links}
			{locale}
		/>
		{#if data.person.cvUrl}
			<a
				class="inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-popover px-3 py-1.5 text-[0.625rem] leading-none text-fg transition hover:border-accent"
				download="Antonio_Ventilii_CV.pdf"
				href={data.person.cvUrl}
			>
				{pickLocale({ text: { en: 'CV', it: 'CV' }, locale })}
				<Download size={12} strokeWidth={2.5} />
			</a>
		{/if}
	</div>

	<RelatedSection label={orgNoteLabel}>
		<ul class="space-y-2 text-xs">
			{#each data.orgHighlights as org (org.url)}
				<li>
					<a
						class="text-link transition hover:text-link-hover"
						href={org.url}
						rel="noopener noreferrer"
						target="_blank"
					>
						{org.name}
					</a>
					<span class="text-fg-subtle"> — {pickLocale({ text: org.note, locale })}</span>
				</li>
			{/each}
		</ul>
	</RelatedSection>

	<p class="pt-4 text-[0.625rem] text-fg-faint">{panelHint}</p>
</div>
