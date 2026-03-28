<script lang="ts">
	interface Props {
		text: string;
		onclick: () => void;
	}

	let { text, onclick }: Props = $props();
</script>

<button
	class="border-border bg-card-solid text-fg-muted hover:border-accent inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs transition"
	{onclick}
	type="button"
>
	{text}
</button>
