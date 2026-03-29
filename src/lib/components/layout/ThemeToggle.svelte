<script lang="ts">
	import { Sun, Moon } from 'lucide-svelte';
	import { theme, toggleTheme } from '$lib/stores/theme.store';

	const label = $derived($theme.mode === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
</script>

<button
	class="border-border bg-popover text-fg-muted hover:border-accent hover:text-fg focus-visible:ring-accent inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border outline-hidden transition focus-visible:ring-2"
	aria-label={label}
	onclick={() => toggleTheme()}
	title={label}
	type="button"
>
	{#if $theme.mode === 'dark'}
		<Sun aria-hidden="true" size={16} strokeWidth={2} />
	{:else}
		<Moon aria-hidden="true" size={16} strokeWidth={2} />
	{/if}
</button>
