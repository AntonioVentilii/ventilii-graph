<script lang="ts">
	interface Props {
		title: string;
		subtitle?: string;
		meta?: string;
		titleClass?: string;
		isMain?: boolean;
	}

	let { title, subtitle, meta, titleClass = 'text-xl font-bold', isMain = false }: Props = $props();
</script>

<div class="space-y-1">
	{#if isMain}
		<h1 class="text-fg {titleClass}">{title}</h1>
	{:else}
		<h2 class="text-fg {titleClass}">{title}</h2>
	{/if}
	{#if subtitle}
		<p class="text-fg-muted text-sm">{subtitle}</p>
	{/if}
	{#if meta}
		<p class="text-fg-subtle text-xs">{meta}</p>
	{/if}
</div>
