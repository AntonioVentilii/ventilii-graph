<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		onclick: () => void;
		class?: string;
		children: Snippet;
	}

	let { onclick, class: className = '', children }: Props = $props();
</script>

<button
	class="text-left text-link transition hover:text-link-hover {className}"
	{onclick}
	type="button"
>
	{@render children()}
</button>
