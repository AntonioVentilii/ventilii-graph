<script lang="ts">
	import type { Snippet } from 'svelte';
	import { ringFloatStyle } from '$lib/portfolio/graph-geometry';

	interface Props {
		left: number;
		top: number;
		floatVariant: 0 | 1 | 2;
		/** Seed for staggered animation timing */
		seed: number;
		variant: 'category' | 'leaf';
		selected: boolean;
		onclick: () => void;
		ariaPressed?: boolean;
		/** 0 = hidden (no interaction); transitions with graph-node-shift */
		opacity?: number;
		/** Disable orbit drift (focused center nodes) */
		noFloat?: boolean;
		/** Larger label when node is the focus */
		emphasis?: 'default' | 'center';
		children: Snippet;
	}

	let {
		left,
		top,
		floatVariant,
		seed,
		variant,
		selected,
		onclick,
		ariaPressed,
		opacity = 1,
		noFloat = false,
		emphasis = 'default',
		children,
	}: Props = $props();

	const base =
		'backdrop-blur-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

	const sizeClass = $derived(
		variant === 'category'
			? 'flex h-10 w-20 items-center justify-center rounded-full border-2 text-[10px] font-semibold leading-tight shadow-orbit'
			: emphasis === 'center'
				? 'max-w-[8.25rem] rounded-full border-2 px-3 py-2 text-xs font-medium leading-snug shadow-leaf'
				: 'max-w-[5.75rem] truncate rounded-full border-2 px-2.5 py-1.5 text-[10px] font-medium shadow-leaf'
	);

	const stateClass = $derived(
		variant === 'category'
			? selected
				? 'border-accent bg-accent-soft text-fg shadow-[0_0_24px_var(--node-selected-glow)]'
				: 'border-border-strong bg-card-solid text-fg hover:border-accent hover:bg-card'
			: selected
				? 'border-accent bg-accent-soft text-fg shadow-[0_0_18px_var(--node-leaf-selected-glow)]'
				: 'border-border-strong bg-card-solid text-fg-muted hover:border-border'
	);
</script>

<div
	class="{noFloat ? '' : `orbit-float orbit-float--${floatVariant}`} graph-node-shift absolute z-10"
	style="left: {left}px; top: {top}px; opacity: {opacity}; pointer-events: {opacity < 0.01 ? 'none' : 'auto'}; {noFloat ? '' : ringFloatStyle(seed)}"
	aria-hidden={opacity < 0.01}
>
	<button
		type="button"
		class="{sizeClass} {base} {stateClass}"
		{onclick}
		aria-pressed={ariaPressed}
		tabindex={opacity < 0.01 ? -1 : undefined}
	>
		{@render children()}
	</button>
</div>
