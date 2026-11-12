<script lang="ts">
	import InlineNavLink from '#lib/components/ui/InlineNavLink.svelte';
	import RelatedSection from '#lib/components/ui/RelatedSection.svelte';
	import type { Locale, Project } from '#lib/types/portfolio.types.ts';
	import type { Leaf } from '#lib/utils/leaf.utils.ts';
	import { pickLocale } from '#lib/utils/locale.utils.ts';

	interface Props {
		label: string;
		projects: Project[];
		locale: Locale;
		onSelectLeaf: (leaf: Leaf) => void;
		listClass?: string;
	}

	let { label, projects, locale, onSelectLeaf, listClass = 'space-y-1' }: Props = $props();
</script>

{#if projects.length}
	<RelatedSection {label}>
		<ul class={listClass}>
			{#each projects as p (p.id)}
				<li>
					<InlineNavLink onclick={() => onSelectLeaf({ kind: 'project', id: p.id })}>
						{pickLocale({ text: p.title, locale })}
					</InlineNavLink>
				</li>
			{/each}
		</ul>
	</RelatedSection>
{/if}
