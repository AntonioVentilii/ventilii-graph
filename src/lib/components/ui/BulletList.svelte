<script lang="ts">
	interface Props {
		items: string[];
	}

	let { items }: Props = $props();
</script>

{#if items.length}
	<ul class="list-disc space-y-2 pl-5 text-sm text-fg-muted">
		{#each items as line (line)}
			<li>{line}</li>
		{/each}
	</ul>
{/if}
