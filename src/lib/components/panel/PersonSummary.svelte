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
	<EntryHeader
		meta={pickLocale({ text: data.person.location, locale })}
		subtitle={pickLocale({ text: data.person.title, locale })}
		title={data.person.name}
		titleClass="text-base font-bold"
	/>

	<p class="text-fg-muted text-xs leading-relaxed">
		{pickLocale({ text: data.person.tagline, locale })}
	</p>

	<div class="flex flex-wrap items-center gap-2 pt-2">
		<a
			class="bg-accent text-accent-fg hover:bg-accent-hover inline-flex items-center justify-center rounded-full px-3 py-1.5 text-[0.625rem] leading-none font-semibold transition"
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
				class="border-border bg-popover text-fg hover:border-accent inline-flex items-center justify-center gap-1.5 rounded-full border px-3 py-1.5 text-[0.625rem] leading-none transition"
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
						class="text-link hover:text-link-hover transition"
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

	<p class="text-fg-faint pt-4 text-[0.625rem]">{panelHint}</p>
</div>
