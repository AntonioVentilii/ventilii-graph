<script lang="ts">
	interface Props {
		items: string[];
	}

	let { items }: Props = $props();
</script>

{#if items.length}
	<ul class="text-fg-muted list-disc space-y-2 pl-5 text-sm">
		{#each items as line (line)}
			<li>{line}</li>
		{/each}
	</ul>
{/if}
