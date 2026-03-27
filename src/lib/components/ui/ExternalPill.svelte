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
	class="rounded-full border border-border bg-card-solid px-3 py-1 text-xs text-fg transition hover:border-accent {className}"
	target="_blank"
	rel="noopener noreferrer"
>
	{@render children()}
</a>
