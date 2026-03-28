<script lang="ts">
	interface Props {
		href?: string;
		label: string;
	}

	let { href = '#detail-panel', label }: Props = $props();
</script>

<a
	class="focus:bg-accent focus:text-accent-fg sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:px-3 focus:py-2"
	{href}
>
	{label}
</a>
