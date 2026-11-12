<script lang="ts">
	interface Props {
		label: string;
		disabled: boolean;
		/** Let a flex row shrink the button; the fit form's row does. */
		canShrink?: boolean;
	}

	let { label, disabled, canShrink = false }: Props = $props();
</script>

<button
	class="h-10 rounded-xl bg-accent px-4 text-sm font-bold text-accent-fg transition hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
	class:shrink-0={!canShrink}
	{disabled}
	type="submit"
>
	{label}
</button>
