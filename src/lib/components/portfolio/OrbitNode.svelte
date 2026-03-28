<script lang="ts">
	import type { Snippet } from 'svelte';
	import { ringFloatStyle } from '$lib/portfolio/graph-geometry';

	interface Props {
		left: number;
		top: number;
		floatVariant: 0 | 1 | 2;
		seed: number;
		variant: 'category' | 'leaf';
		selected: boolean;
		onclick: () => void;
		ariaPressed?: boolean;
		opacity?: number;
		noFloat?: boolean;
		emphasis?: 'default' | 'center';
		graphCatId?: string;
		graphLeafKey?: string;
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
		graphCatId,
		graphLeafKey,
		children
	}: Props = $props();

	const base =
		'cursor-pointer backdrop-blur-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

	const sizeClass = $derived(
		variant === 'category'
			? 'flex h-10 w-20 items-center justify-center rounded-full border-2 text-[0.625rem] font-semibold leading-tight shadow-orbit'
			: emphasis === 'center'
				? 'inline-flex w-max max-w-[min(92vw,18rem)] items-center justify-center whitespace-normal rounded-2xl border-2 px-4 py-3 text-center text-xs font-medium leading-tight shadow-leaf lg:max-w-none lg:whitespace-nowrap lg:leading-none'
				: 'inline-flex w-max max-w-[min(92vw,10rem)] items-center justify-center whitespace-normal rounded-2xl border-2 px-3 py-2 text-center text-[0.625rem] font-medium leading-tight shadow-leaf sm:text-xs lg:max-w-none lg:whitespace-nowrap lg:leading-none'
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

	const orbitInner = $derived(noFloat ? '' : `orbit-float orbit-float--${floatVariant}`);
	const driftStyle = $derived(noFloat ? '' : ringFloatStyle(seed));
</script>

{#if variant === 'leaf'}
	<!-- left/top = ring center; centering on this node avoids anchor/box drift vs edges -->
	<div
		style="left: {left}px; top: {top}px; opacity: {opacity}; pointer-events: {opacity < 0.01
			? 'none'
			: 'auto'};"
		class="graph-node-shift absolute z-10 -translate-x-1/2 -translate-y-1/2"
		aria-hidden={opacity < 0.01}
	>
		<div style={driftStyle} class="{orbitInner} relative inline-block">
			<button
				class="{sizeClass} {base} {stateClass}"
				aria-pressed={ariaPressed}
				data-graph-leaf={graphLeafKey}
				{onclick}
				tabindex={opacity < 0.01 ? -1 : undefined}
				type="button"
			>
				{@render children()}
			</button>
		</div>
	</div>
{:else}
	<div
		style="left: {left}px; top: {top}px; opacity: {opacity}; pointer-events: {opacity < 0.01
			? 'none'
			: 'auto'};"
		class="graph-node-shift absolute z-10 -translate-x-1/2 -translate-y-1/2"
		aria-hidden={opacity < 0.01}
	>
		<div style={driftStyle} class="{orbitInner} relative inline-block">
			<button
				class="{sizeClass} {base} {stateClass}"
				aria-pressed={ariaPressed}
				data-graph-cat={graphCatId}
				{onclick}
				tabindex={opacity < 0.01 ? -1 : undefined}
				type="button"
			>
				{@render children()}
			</button>
		</div>
	</div>
{/if}
