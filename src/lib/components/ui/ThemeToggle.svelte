<script lang="ts">
	import { theme, toggleTheme } from '$lib/theme.svelte';

	const label = $derived(
		theme.mode === 'dark'
			? 'Switch to light theme'
			: 'Switch to dark theme'
	);
</script>

<button
	type="button"
	class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-popover text-fg-muted transition hover:border-accent hover:text-fg"
	onclick={() => toggleTheme()}
	aria-label={label}
	title={label}
>
	{#if theme.mode === 'dark'}
		<!-- Sun -->
		<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
			<circle cx="12" cy="12" r="4" />
			<path
				d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
				stroke-linecap="round"
			/>
		</svg>
	{:else}
		<!-- Moon -->
		<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
			<path
				d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	{/if}
</button>
