<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		href: string;
		class?: string;
		children: Snippet;
	}

	let { href, class: className = '', children }: Props = $props();
</script>

<a
	{href}
	class="rounded-full border border-zinc-600 px-3 py-1 text-xs text-zinc-200 hover:border-brand-500 {className}"
	target="_blank"
	rel="noopener noreferrer"
>
	{@render children()}
</a>
