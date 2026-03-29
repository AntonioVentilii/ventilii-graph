<script lang="ts">
	interface Props {
		text: string;
	}

	let { text }: Props = $props();
</script>

<p class="text-xs tracking-wide text-fg-subtle uppercase">{text}</p>
