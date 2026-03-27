<script lang="ts">
	interface Props {
		size: number;
		cx: number;
		cy: number;
		r1: number;
		r2: number;
		categoryCount: number;
		parentIndex: number;
		childAnglesList: number[];
		categoryAngle: (i: number) => number;
		hasCategory: boolean;
	}

	let {
		size,
		cx,
		cy,
		r1,
		r2,
		categoryCount,
		parentIndex,
		childAnglesList,
		categoryAngle,
		hasCategory,
	}: Props = $props();
</script>

{#if size > 0}
	<svg
		width={size}
		height={size}
		class="pointer-events-none absolute left-0 top-0 z-0 text-brand-400/35"
		aria-hidden="true"
	>
		{#each Array(categoryCount) as _, i}
			{@const a = categoryAngle(i)}
			{@const x2 = cx + r1 * Math.cos(a)}
			{@const y2 = cy + r1 * Math.sin(a)}
			<line
				x1={cx}
				y1={cy}
				x2={x2}
				y2={y2}
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
			/>
		{/each}
		{#if hasCategory && parentIndex >= 0}
			{@const pa = categoryAngle(parentIndex)}
			{@const px = cx + r1 * Math.cos(pa)}
			{@const py = cy + r1 * Math.sin(pa)}
			{#each childAnglesList as ca}
				{@const x2 = cx + r2 * Math.cos(ca)}
				{@const y2 = cy + r2 * Math.sin(ca)}
				<line
					x1={px}
					y1={py}
					x2={x2}
					y2={y2}
					stroke="currentColor"
					stroke-width="1.75"
					stroke-linecap="round"
					class="text-brand-400/55"
				/>
			{/each}
		{/if}
	</svg>
{/if}
