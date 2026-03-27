<script lang="ts">
	import { pickLocale } from '$lib/portfolio/locale';
	import type { Locale } from '$lib/portfolio/types';
	import type { Technology } from '$lib/portfolio/types';
	import PanelEyebrow from '$lib/components/ui/PanelEyebrow.svelte';
	import InlineNavLink from '$lib/components/ui/InlineNavLink.svelte';
	import type { Leaf } from '$lib/portfolio/leaf';
	import { relatedProjectsForStack } from '$lib/portfolio/relations';

	interface Props {
		technology: Technology;
		locale: Locale;
		sectionEyebrow?: string;
		relatedHeading: string;
		onSelectLeaf: (leaf: Leaf) => void;
	}

	let { technology, locale, sectionEyebrow, relatedHeading, onSelectLeaf }: Props = $props();

	const projects = $derived(relatedProjectsForStack(technology.id));
</script>

<div class="space-y-3 animate-fade">
	{#if sectionEyebrow}
		<PanelEyebrow text={sectionEyebrow} />
	{/if}
	<h2 class="text-xl font-bold text-fg">{pickLocale(technology.label, locale)}</h2>
	<p class="text-sm leading-relaxed text-fg-muted">{pickLocale(technology.blurb, locale)}</p>
	{#if technology.yearsHint}
		<p class="text-xs text-fg-subtle">{pickLocale(technology.yearsHint, locale)}</p>
	{/if}
	{#if projects.length}
		<div class="border-t border-border pt-3">
			<p class="text-sm text-fg-subtle">{relatedHeading}</p>
			<ul class="mt-2 space-y-1 text-sm">
				{#each projects as p}
					<li>
						<InlineNavLink onclick={() => onSelectLeaf({ kind: 'project', id: p.id })}>
							{pickLocale(p.title, locale)}
						</InlineNavLink>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>
