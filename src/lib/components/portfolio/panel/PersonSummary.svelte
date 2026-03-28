<script lang="ts">
	import { pickLocale } from '$lib/portfolio/locale';
	import type { Locale, PortfolioData } from '$lib/portfolio/types';

	interface Props {
		data: PortfolioData;
		locale: Locale;
		orgNoteLabel: string;
		panelHint: string;
	}

	let { data, locale, orgNoteLabel, panelHint }: Props = $props();
</script>

<div class="space-y-4">
	<h2 class="text-fg text-base font-bold">{data.person.name}</h2>
	<p class="text-accent text-xs">{pickLocale({ text: data.person.title, locale })}</p>
	<p class="text-fg-muted text-xs leading-relaxed">
		{pickLocale({ text: data.person.tagline, locale })}
	</p>
	<p class="text-fg-subtle text-[0.625rem]">{pickLocale({ text: data.person.location, locale })}</p>
	<div class="flex flex-wrap items-center gap-2 pt-2">
		<a
			class="bg-accent text-accent-fg hover:bg-accent-hover inline-flex items-center justify-center rounded-full px-3 py-1.5 text-[0.625rem] font-semibold transition"
			href={`mailto:${data.person.email}`}
		>
			Email
		</a>
		{#each data.person.links as link (link.href)}
			<a
				class="border-border bg-popover text-fg hover:border-accent inline-flex items-center justify-center rounded-full border px-3 py-1.5 text-[0.625rem] transition"
				href={link.href}
				rel="noopener noreferrer"
				target="_blank"
			>
				{pickLocale({ text: link.label, locale })}
			</a>
		{/each}
	</div>
	<div class="border-border border-t pt-4">
		<p class="text-fg-subtle mb-2 text-[0.625rem] font-semibold tracking-wide uppercase">
			{orgNoteLabel}
		</p>
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
	</div>
	<p class="text-fg-faint pt-4 text-[0.625rem]">{panelHint}</p>
</div>
