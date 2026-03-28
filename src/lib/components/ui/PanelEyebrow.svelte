<script lang="ts">
	interface Props {
		text: string;
	}

	let { text }: Props = $props();
</script>

<p class="text-fg-subtle text-xs tracking-wide uppercase">{text}</p>
