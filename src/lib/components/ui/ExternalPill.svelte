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
	class="border-border bg-card-solid text-fg hover:border-accent inline-flex items-center justify-center rounded-full border px-3 py-1 text-xs transition {className}"
	{href}
	rel="noopener noreferrer"
	target="_blank"
>
	{@render children()}
</a>
