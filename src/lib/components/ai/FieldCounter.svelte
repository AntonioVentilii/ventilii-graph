<script lang="ts">
	interface Props {
		length: number;
		max: number;
		label: string;
	}

	let { length, max, label }: Props = $props();
</script>

<span class="text-xs text-fg-faint tabular-nums" class:text-fg={max - length < 50}>
	{max - length}
	{label}
</span>
