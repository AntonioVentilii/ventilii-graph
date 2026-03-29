<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		label: string;
		children: Snippet;
	}

	let { label, children }: Props = $props();
</script>

<div class="border-t border-border pt-3 text-sm">
	<p class="mb-2 text-[0.625rem] font-semibold tracking-wide text-fg-subtle uppercase">
		{label}
	</p>
	{@render children()}
</div>
