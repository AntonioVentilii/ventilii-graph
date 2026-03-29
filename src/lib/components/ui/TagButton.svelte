<script lang="ts">
	interface Props {
		text: string;
		onclick: () => void;
	}

	let { text, onclick }: Props = $props();
</script>

<button
	class="inline-flex items-center justify-center rounded-md border border-border bg-card-solid px-2 py-0.5 text-xs text-fg-muted transition hover:border-accent"
	{onclick}
	type="button"
>
	{text}
</button>
