<script lang="ts">
	import type { Person } from '$lib/portfolio/types';

	interface Props {
		person: Person;
		hubWidthPx: number;
		/** Center of the hub in px (relative to graph container) */
		centerX: number;
		centerY: number;
		compact?: boolean;
		onclick: () => void;
	}

	let { person, hubWidthPx, centerX, centerY, compact = false, onclick }: Props = $props();

	const w = $derived(compact ? 112 : hubWidthPx);
</script>

<div
	class="graph-node-shift absolute z-20 flex justify-center"
	style="left: {centerX}px; top: {centerY}px; width: {w}px; transform: translate(-50%, -50%);"
>
	<button
		type="button"
		data-graph-hub
		class="shadow-hub flex w-full cursor-pointer flex-col items-center gap-2 rounded-2xl border-2 border-border-strong bg-card-solid p-3 transition hover:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent {compact
			? 'gap-1.5 p-2'
			: ''}"
		{onclick}
	>
		<span
			class="inline-flex rounded-full bg-gradient-to-br from-[var(--grad-from)] via-[var(--grad-via)] to-[var(--grad-to)] p-[3px] shadow-[0_0_0_1px_var(--avatar-ring-outer),0_0_24px_var(--avatar-glow)]"
		>
			<span class="overflow-hidden rounded-full p-[2px]" style="background: var(--avatar-inner)">
				<img
					src={person.avatarUrl}
					alt={person.name}
					class="rounded-full object-cover [object-position:center_42%] {compact ? 'h-10 w-10' : 'h-16 w-16'}"
					width={compact ? 40 : 64}
					height={compact ? 40 : 64}
				/>
			</span>
		</span>
		<p class="text-center text-xs font-bold text-fg {compact ? 'text-[10px] leading-tight' : ''}">
			{person.name}
		</p>
	</button>
</div>
