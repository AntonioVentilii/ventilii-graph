<script lang="ts">
	import type { EdgeSegment } from '$lib/portfolio/graph-layout';

	interface Props {
		size: number;
		edges: EdgeSegment[];
	}

	let { size, edges }: Props = $props();
</script>

{#if size > 0}
	<svg
		width={size}
		height={size}
		class="pointer-events-none absolute left-0 top-0 z-0 text-graph transition-opacity duration-300"
		aria-hidden="true"
	>
		{#each edges as e}
			<line
				x1={e.x1}
				y1={e.y1}
				x2={e.x2}
				y2={e.y2}
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-opacity={e.opacity}
			/>
		{/each}
	</svg>
{/if}
