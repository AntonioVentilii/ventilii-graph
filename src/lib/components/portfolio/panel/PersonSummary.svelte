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
	<h2 class="text-lg font-bold text-white">{data.person.name}</h2>
	<p class="text-sm text-brand-200">{pickLocale(data.person.title, locale)}</p>
	<p class="text-sm leading-relaxed text-zinc-300">{pickLocale(data.person.tagline, locale)}</p>
	<p class="text-xs text-zinc-500">{pickLocale(data.person.location, locale)}</p>
	<div class="flex flex-wrap gap-2 pt-2">
		<a
			href={'mailto:' + data.person.email}
			class="rounded-full bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-500"
		>
			Email
		</a>
		{#each data.person.links as link}
			<a
				href={link.href}
				class="rounded-full border border-zinc-600 px-3 py-1.5 text-xs text-zinc-200 hover:border-brand-500"
				target="_blank"
				rel="noopener noreferrer"
			>
				{pickLocale(link.label, locale)}
			</a>
		{/each}
	</div>
	<div class="border-t border-zinc-800 pt-4">
		<p class="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">{orgNoteLabel}</p>
		<ul class="space-y-2 text-sm">
			{#each data.orgHighlights as org}
				<li>
					<a
						href={org.url}
						class="text-brand-300 hover:text-white"
						target="_blank"
						rel="noopener noreferrer"
					>
						{org.name}
					</a>
					<span class="text-zinc-500"> — {pickLocale(org.note, locale)}</span>
				</li>
			{/each}
		</ul>
	</div>
	<p class="pt-4 text-xs text-zinc-600">{panelHint}</p>
</div>
