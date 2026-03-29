<script lang="ts">
	interface Props {
		href?: string;
		label: string;
	}

	let { href = '#detail-panel', label }: Props = $props();
</script>

<a
	class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-fg"
	{href}
>
	{label}
</a>
