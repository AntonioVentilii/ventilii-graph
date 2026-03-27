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
		children,
	}: Props = $props();

	const base =
		'backdrop-blur-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400';

	const sizeClass = $derived(
		variant === 'category'
			? 'flex h-10 w-20 items-center justify-center rounded-full border-2 text-[10px] font-semibold leading-tight shadow-[0_4px_20px_rgba(0,0,0,0.45)]'
			: 'max-w-[5.75rem] truncate rounded-full border-2 px-2.5 py-1.5 text-[10px] font-medium shadow-[0_4px_16px_rgba(0,0,0,0.4)]'
	);

	const stateClass = $derived(
		variant === 'category'
			? selected
				? 'border-brand-400 bg-brand-500/25 text-white shadow-[0_0_24px_rgba(61,143,163,0.4)]'
				: 'border-zinc-500 bg-zinc-900/95 text-zinc-100 hover:border-brand-500/70 hover:bg-zinc-800/95'
			: selected
				? 'border-brand-400 bg-brand-600/25 text-white shadow-[0_0_18px_rgba(61,143,163,0.35)]'
				: 'border-zinc-500 bg-zinc-900/95 text-zinc-200 hover:border-zinc-400'
	);
</script>

<div
	class="orbit-float orbit-float--{floatVariant} absolute z-10"
	style="left: {left}px; top: {top}px; {ringFloatStyle(seed)}"
>
	<button
		type="button"
		class="{sizeClass} {base} {stateClass}"
		{onclick}
		aria-pressed={ariaPressed}
	>
		{@render children()}
	</button>
</div>
