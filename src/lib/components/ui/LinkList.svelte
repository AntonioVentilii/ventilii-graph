<script lang="ts">
	import { Github, Linkedin } from 'lucide-svelte';
	import type { ComponentType } from 'svelte';
	import type { Locale, Localised } from '$lib/types/portfolio.types';
	import { pickLocale } from '$lib/utils/locale.utils';

	interface Link {
		label: Localised;
		href: string;
		iconName?: string;
	}

	interface Props {
		links: Link[];
		locale: Locale;
		class?: string;
		linkClass?: string;
	}

	let { links, locale, class: className = '', linkClass = '' }: Props = $props();

	const iconMap: Record<string, ComponentType> = {
		Github,
		Linkedin
	};
</script>

{#if links.length}
	<div class="flex flex-wrap items-center gap-2 {className}">
		{#each links as link (link.href)}
			{@const label = pickLocale({ text: link.label, locale })}
			{@const Icon = link.iconName ? iconMap[link.iconName] : null}

			<a
				class="{linkClass ||
					'text-link hover:text-link-hover text-sm transition'} inline-flex items-center justify-center leading-none"
				aria-label={Icon ? label : undefined}
				href={link.href}
				rel="noopener noreferrer"
				target="_blank"
				title={Icon ? label : undefined}
			>
				{#if Icon}
					<Icon size={14} strokeWidth={2.5} />
				{:else}
					{label}
				{/if}
			</a>
		{/each}
	</div>
{/if}
