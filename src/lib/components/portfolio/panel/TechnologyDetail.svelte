<script lang="ts">
	import InlineNavLink from '$lib/components/ui/InlineNavLink.svelte';
	import PanelEyebrow from '$lib/components/ui/PanelEyebrow.svelte';
	import type { Leaf } from '$lib/portfolio/leaf';
	import { pickLocale } from '$lib/portfolio/locale';
	import { relatedProjectsForStack } from '$lib/portfolio/relations';
	import type { Locale, Technology } from '$lib/portfolio/types';

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

<div class="animate-fade space-y-3">
	{#if sectionEyebrow}
		<PanelEyebrow text={sectionEyebrow} />
	{/if}
	<h2 class="text-fg text-xl font-bold">{pickLocale({ text: technology.label, locale })}</h2>
	<p class="text-fg-muted text-sm leading-relaxed">
		{pickLocale({ text: technology.blurb, locale })}
	</p>
	{#if technology.yearsHint}
		<p class="text-fg-subtle text-xs">{pickLocale({ text: technology.yearsHint, locale })}</p>
	{/if}
	{#if projects.length}
		<div class="border-border border-t pt-3">
			<p class="text-fg-subtle text-sm">{relatedHeading}</p>
			<ul class="mt-2 space-y-1 text-sm">
				{#each projects as p (p.id)}
					<li>
						<InlineNavLink onclick={() => onSelectLeaf({ kind: 'project', id: p.id })}>
							{pickLocale({ text: p.title, locale })}
						</InlineNavLink>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>
