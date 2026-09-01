<script lang="ts">
	import { onDestroy } from 'svelte';
	import type { Person } from '$lib/types/portfolio.types';

	interface Props {
		person: Person;
		hubWidthPx: number;
		/** Center of the hub in px (relative to graph container) */
		centerX: number;
		centerY: number;
		compact?: boolean;
		onclick: () => void;
		/** Easter egg: press-and-hold the hub to "print" the graph into the static CV */
		onPrint?: () => void;
	}

	let { person, hubWidthPx, centerX, centerY, compact = false, onclick, onPrint }: Props = $props();

	const w = $derived(compact ? 112 : hubWidthPx);

	/** Hold-to-print easter egg (pointer only; keyboard users have the header FlattenToggle) */
	const HOLD_TO_PRINT_MS = 900;
	let holding = $state(false);
	let holdCompleted = false;
	let holdTimer: ReturnType<typeof setTimeout> | undefined;

	const startHold = (e: PointerEvent) => {
		if (!onPrint || !e.isPrimary) {
			return;
		}
		holding = true;
		holdTimer = setTimeout(() => {
			holding = false;
			holdCompleted = true;
			onPrint();
		}, HOLD_TO_PRINT_MS);
	};

	const cancelHold = () => {
		clearTimeout(holdTimer);
		holdTimer = undefined;
		holding = false;
	};

	// The timer must not outlive the component (e.g. navigating away mid-hold)
	onDestroy(() => clearTimeout(holdTimer));

	const handleClick = () => {
		// A completed hold fires a click on pointerup; swallow it so it doesn't reset the graph
		if (holdCompleted) {
			holdCompleted = false;
			return;
		}
		cancelHold();
		onclick();
	};
</script>

<div
	style="left: {centerX}px; top: {centerY}px; width: {w}px; transform: translate(-50%, -50%);"
	class="graph-node-shift absolute z-20 flex justify-center"
>
	<button
		style="touch-action: manipulation;"
		class="shadow-hub relative flex w-full cursor-pointer flex-col items-center gap-1.5 rounded-2xl border-2 border-border-strong bg-card-solid p-2 transition hover:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent md:gap-2 md:p-3 {compact
			? 'gap-1.5 p-2'
			: ''}"
		data-graph-hub
		onclick={handleClick}
		onpointercancel={cancelHold}
		onpointerdown={startHold}
		onpointerleave={cancelHold}
		onpointerup={cancelHold}
		type="button"
	>
		{#if holding}
			<svg
				class="hub-hold-ring"
				aria-hidden="true"
				preserveAspectRatio="none"
				viewBox="0 0 100 100"
			>
				<rect height="97" pathLength="100" rx="12" width="97" x="1.5" y="1.5" />
			</svg>
		{/if}
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
			class="text-center text-[0.625rem] leading-tight font-bold text-fg md:text-xs {compact
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
