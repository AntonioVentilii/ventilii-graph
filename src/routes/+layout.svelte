<script lang="ts">
	import type { Snippet } from 'svelte';
	import { onMount } from 'svelte';
	import { initThemeFromStorage } from '$lib/theme.svelte';
	import '../app.css';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	onMount(() => initThemeFromStorage());
</script>

{@render children()}
