<script lang="ts">
	import { pickLocale } from '$lib/portfolio/locale';
	import type { Locale } from '$lib/portfolio/types';
	import type { Project } from '$lib/portfolio/types';
	import PanelEyebrow from '$lib/components/ui/PanelEyebrow.svelte';
	import BulletList from '$lib/components/ui/BulletList.svelte';
	import ExternalPill from '$lib/components/ui/ExternalPill.svelte';
	import type { Leaf } from '$lib/portfolio/leaf';
	import { relatedStackForProject } from '$lib/portfolio/relations';

	interface Props {
		project: Project;
		locale: Locale;
		sectionEyebrow: string;
		stackLabel: string;
		onSelectLeaf: (leaf: Leaf) => void;
	}

	let { project, locale, sectionEyebrow, stackLabel, onSelectLeaf }: Props = $props();

	const bullets = $derived(
		project.highlights?.map((h) => pickLocale(h, locale)) ?? []
	);
	const stacks = $derived(relatedStackForProject(project.id));
</script>

<div class="space-y-3 animate-fade">
	<PanelEyebrow text={sectionEyebrow} />
	<h2 class="text-xl font-bold text-fg">{pickLocale(project.title, locale)}</h2>
	<p class="text-sm leading-relaxed text-fg-muted">{pickLocale(project.summary, locale)}</p>
	<BulletList items={bullets} />
	<div class="flex flex-wrap gap-2">
		{#each project.links as link}
			<ExternalPill href={link.href} class="py-1">
				{pickLocale(link.label, locale)}
			</ExternalPill>
		{/each}
	</div>
	{#if stacks.length}
		<div class="border-t border-border pt-3 text-sm">
			<p class="text-fg-subtle">{stackLabel}</p>
			<div class="mt-2 flex flex-wrap gap-1.5">
				{#each stacks as s}
					<button
						type="button"
						class="rounded-md border border-border bg-card-solid px-2 py-0.5 text-xs text-fg-muted transition hover:border-accent"
						onclick={() => onSelectLeaf({ kind: 'technology', id: s.id })}
					>
						{pickLocale(s.label, locale)}
					</button>
				{/each}
			</div>
		</div>
	{/if}
</div>
