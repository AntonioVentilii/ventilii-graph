<script lang="ts">
	import { initSatellite } from '@junobuild/core';
	import { type Snippet, onMount } from 'svelte';
	import { initThemeFromStorage } from '$lib/stores/theme.store';
	// eslint-disable-next-line import/no-relative-parent-imports
	import '../app.css';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	const init = async () => {
		await initSatellite({});
	};

	$effect(() => {
		init();
	});

	onMount(() => initThemeFromStorage());
</script>

{@render children()}
