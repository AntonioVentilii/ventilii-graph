<script lang="ts">
	import BulletList from '$lib/components/ui/BulletList.svelte';
	import ExternalPill from '$lib/components/ui/ExternalPill.svelte';
	import PanelEyebrow from '$lib/components/ui/PanelEyebrow.svelte';
	import type { Leaf } from '$lib/portfolio/leaf';
	import { pickLocale } from '$lib/portfolio/locale';
	import { relatedStackForProject } from '$lib/portfolio/relations';
	import type { Project, Locale } from '$lib/portfolio/types';

	interface Props {
		project: Project;
		locale: Locale;
		sectionEyebrow?: string;
		stackLabel: string;
		onSelectLeaf: (leaf: Leaf) => void;
	}

	let { project, locale, sectionEyebrow, stackLabel, onSelectLeaf }: Props = $props();

	const bullets = $derived(project.highlights?.map((h) => pickLocale({ text: h, locale })) ?? []);
	const stacks = $derived(relatedStackForProject(project.id));
</script>

<div class="animate-fade space-y-3">
	{#if sectionEyebrow}
		<PanelEyebrow text={sectionEyebrow} />
	{/if}
	<h2 class="text-fg text-xl font-bold">{pickLocale({ text: project.title, locale })}</h2>
	<p class="text-fg-muted text-sm leading-relaxed">
		{pickLocale({ text: project.summary, locale })}
	</p>
	<BulletList items={bullets} />
	<div class="flex flex-wrap items-center gap-2">
		{#each project.links as link (link.href)}
			<ExternalPill class="py-1" href={link.href}>
				{pickLocale({ text: link.label, locale })}
			</ExternalPill>
		{/each}
	</div>
	{#if stacks.length}
		<div class="border-border border-t pt-3 text-sm">
			<p class="text-fg-subtle">{stackLabel}</p>
			<div class="mt-2 flex flex-wrap items-center gap-1.5">
				{#each stacks as s (s.id)}
					<button
						class="border-border bg-card-solid text-fg-muted hover:border-accent inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs transition"
						onclick={() => onSelectLeaf({ kind: 'technology', id: s.id })}
						type="button"
					>
						{pickLocale({ text: s.label, locale })}
					</button>
				{/each}
			</div>
		</div>
	{/if}
</div>
