<script lang="ts">
	import { VISIT_COPY as t } from '#lib/utils/visit-copy.utils.ts';
	import type { VisitRole } from '#lib/utils/visit-recipients.utils.ts';

	interface Props {
		role: VisitRole;
	}

	let { role }: Props = $props();
</script>

<div class="space-y-5">
	<p class="font-display text-xs tracking-[0.18em] text-accent uppercase">{t.roleKicker}</p>
	<h2 class="font-display text-2xl leading-tight font-bold text-fg sm:text-3xl">{role.title}</h2>
	<ul class="flex flex-wrap gap-2">
		{#each role.facts as fact (fact)}
			<li class="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-fg-muted">
				{fact}
			</li>
		{/each}
	</ul>
	<div class="space-y-4 rounded-2xl border-l-4 border-accent bg-accent-soft p-5">
		<p class="text-sm leading-relaxed text-fg">
			<span class="font-bold">{t.plainly}:</span>
			{role.gap}
		</p>
		<p class="text-sm leading-relaxed text-fg">
			<span class="font-bold">{t.instead}:</span>
			{role.pitch}
		</p>
	</div>
</div>
