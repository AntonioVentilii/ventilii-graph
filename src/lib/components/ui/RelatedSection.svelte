<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		label: string;
		children: Snippet;
	}

	let { label, children }: Props = $props();
</script>

<div class="border-border border-t pt-3 text-sm">
	<p class="text-fg-subtle mb-2 text-[0.625rem] font-semibold tracking-wide uppercase">
		{label}
	</p>
	{@render children()}
</div>
