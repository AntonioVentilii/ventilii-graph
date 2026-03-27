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
		children,
	}: Props = $props();

	const base =
		'cursor-pointer backdrop-blur-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

	const sizeClass = $derived(
		variant === 'category'
			? 'flex h-10 w-20 items-center justify-center rounded-full border-2 text-[10px] font-semibold leading-tight shadow-orbit'
			: emphasis === 'center'
				? 'inline-flex w-max max-w-[min(96vw,40rem)] items-center justify-center whitespace-nowrap rounded-2xl border-2 px-4 py-3 text-center text-xs font-medium leading-none shadow-leaf'
				: 'inline-flex w-max max-w-[min(96vw,40rem)] items-center justify-center whitespace-nowrap rounded-2xl border-2 px-3 py-2 text-center text-[10px] font-medium leading-none shadow-leaf sm:text-xs'
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

	const orbitInner = $derived(
		noFloat ? '' : `orbit-float orbit-float--${floatVariant}`
	);
	const driftStyle = $derived(noFloat ? '' : ringFloatStyle(seed));
</script>

{#if variant === 'leaf'}
	<!-- left/top = ring center; ~75% arc leaves parent corridor at top -->
	<div
		class="graph-node-shift absolute z-10"
		style="left: {left}px; top: {top}px; opacity: {opacity}; pointer-events: {opacity < 0.01 ? 'none' : 'auto'};"
		aria-hidden={opacity < 0.01}
	>
		<div class="-translate-x-1/2 -translate-y-1/2">
			<div class="{orbitInner} relative" style={driftStyle}>
				<button
					type="button"
					class="{sizeClass} {base} {stateClass}"
					{onclick}
					aria-pressed={ariaPressed}
					tabindex={opacity < 0.01 ? -1 : undefined}
					data-graph-leaf={graphLeafKey}
				>
					{@render children()}
				</button>
			</div>
		</div>
	</div>
{:else}
	<div
		class="{orbitInner} graph-node-shift absolute z-10"
		style="left: {left}px; top: {top}px; opacity: {opacity}; pointer-events: {opacity < 0.01 ? 'none' : 'auto'}; {driftStyle}"
		aria-hidden={opacity < 0.01}
	>
		<button
			type="button"
			class="{sizeClass} {base} {stateClass}"
			{onclick}
			aria-pressed={ariaPressed}
			tabindex={opacity < 0.01 ? -1 : undefined}
			data-graph-cat={graphCatId}
		>
			{@render children()}
		</button>
	</div>
{/if}
