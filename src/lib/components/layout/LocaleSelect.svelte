<script lang="ts">
	import type { Locale } from '$lib/portfolio/types';

	interface Props {
		locale: Locale;
		langLabel: string;
	}

	let { locale = $bindable(), langLabel }: Props = $props();
</script>

<label class="flex items-center gap-2 text-xs text-fg-subtle">
	<span class="sr-only">{langLabel}</span>
	<select
		bind:value={locale}
		class="rounded-full border border-border bg-popover px-2 py-1.5 text-fg"
	>
		<option value="en">EN</option>
		<option value="it">IT</option>
	</select>
</label>
