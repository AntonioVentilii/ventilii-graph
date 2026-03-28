<script lang="ts">
	import type { Person } from '$lib/types/portfolio.types';

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
	style="left: {centerX}px; top: {centerY}px; width: {w}px; transform: translate(-50%, -50%);"
	class="graph-node-shift absolute z-20 flex justify-center"
>
	<button
		class="shadow-hub border-border-strong bg-card-solid hover:border-accent focus-visible:outline-accent flex w-full cursor-pointer flex-col items-center gap-1.5 rounded-2xl border-2 p-2 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 md:gap-2 md:p-3 {compact
			? 'gap-1.5 p-2'
			: ''}"
		data-graph-hub
		{onclick}
		type="button"
	>
		<span
			class="inline-flex rounded-full bg-linear-to-br from-(--grad-from) via-(--grad-via) to-(--grad-to) p-0.75 shadow-[0_0_0_1px_var(--avatar-ring-outer),0_0_24px_var(--avatar-glow)]"
		>
			<span style="background: var(--avatar-inner)" class="overflow-hidden rounded-full p-0.5">
				<img
					class="rounded-full object-cover object-top {compact
						? 'h-10 w-10'
						: 'h-12 w-12 md:h-16 md:w-16'}"
					alt={person.name}
					height={compact ? 40 : 64}
					src={person.avatarUrl}
					width={compact ? 40 : 64}
				/>
			</span>
		</span>
		<p
			class="text-fg text-center text-[0.625rem] leading-tight font-bold md:text-xs {compact
				? 'text-[0.625rem] leading-tight'
				: ''}"
		>
			{#if person.name === 'Antonio Ventilii'}
				<span class="block md:inline">Antonio</span>
				<span class="block md:inline">Ventilii</span>
			{:else}
				{person.name}
			{/if}
		</p>
	</button>
</div>
