<script lang="ts">
	interface Props {
		text: string;
	}

	let { text }: Props = $props();
</script>

<p class="text-xs uppercase tracking-wide text-zinc-500">{text}</p>
