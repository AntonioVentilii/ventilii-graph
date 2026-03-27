<script lang="ts">
	import type { Snippet } from 'svelte';
	import { onMount } from 'svelte';
	import { initThemeFromStorage } from '$lib/theme.svelte';
	import '../app.css';
	import { initSatellite } from '@junobuild/core';
	import '../app.css';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

		const init = async () => {
		await initSatellite({
		});
	};

	$effect(() => {
		init();
	});

	onMount(() => initThemeFromStorage());
</script>

{@render children()}
