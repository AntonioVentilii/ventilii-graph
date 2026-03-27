<script lang="ts">
	interface Props {
		text: string;
	}

	let { text }: Props = $props();
</script>

<p class="text-xs uppercase tracking-wide text-fg-subtle">{text}</p>
