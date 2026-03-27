<script lang="ts">
	import { pickLocale } from '$lib/portfolio/locale';
	import type { Locale } from '$lib/portfolio/types';
	import type { PortfolioData } from '$lib/portfolio/types';

	interface Props {
		data: PortfolioData;
		locale: Locale;
		orgNoteLabel: string;
		panelHint: string;
	}

	let { data, locale, orgNoteLabel, panelHint }: Props = $props();
</script>

<div class="space-y-4 animate-fade">
	<h2 class="text-lg font-bold text-fg">{data.person.name}</h2>
	<p class="text-sm text-accent">{pickLocale(data.person.title, locale)}</p>
	<p class="text-sm leading-relaxed text-fg-muted">{pickLocale(data.person.tagline, locale)}</p>
	<p class="text-xs text-fg-subtle">{pickLocale(data.person.location, locale)}</p>
	<div class="flex flex-wrap items-center gap-2 pt-2">
		<a
			href={'mailto:' + data.person.email}
			class="inline-flex items-center justify-center rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-accent-fg transition hover:bg-accent-hover"
		>
			Email
		</a>
		{#each data.person.links as link}
			<a
				href={link.href}
				class="inline-flex items-center justify-center rounded-full border border-border bg-popover px-3 py-1.5 text-xs text-fg transition hover:border-accent"
				target="_blank"
				rel="noopener noreferrer"
			>
				{pickLocale(link.label, locale)}
			</a>
		{/each}
	</div>
	<div class="border-t border-border pt-4">
		<p class="mb-2 text-xs font-semibold uppercase tracking-wide text-fg-subtle">{orgNoteLabel}</p>
		<ul class="space-y-2 text-sm">
			{#each data.orgHighlights as org}
				<li>
					<a
						href={org.url}
						class="text-link transition hover:text-link-hover"
						target="_blank"
						rel="noopener noreferrer"
					>
						{org.name}
					</a>
					<span class="text-fg-subtle"> — {pickLocale(org.note, locale)}</span>
				</li>
			{/each}
		</ul>
	</div>
	<p class="pt-4 text-xs text-fg-faint">{panelHint}</p>
</div>
