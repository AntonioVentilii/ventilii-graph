<script lang="ts">
	interface Props {
		title: string;
		subtitle?: string;
		meta?: string;
		titleClass?: string;
	}

	let { title, subtitle, meta, titleClass = 'text-xl font-bold' }: Props = $props();
</script>

<div class="space-y-1">
	<h2 class="text-fg {titleClass}">{title}</h2>
	{#if subtitle}
		<p class="text-fg-muted text-sm">{subtitle}</p>
	{/if}
	{#if meta}
		<p class="text-fg-subtle text-xs">{meta}</p>
	{/if}
</div>
