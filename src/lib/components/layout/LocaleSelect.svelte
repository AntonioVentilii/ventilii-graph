<script lang="ts">
	import type { Locale } from '$lib/types/portfolio.types';

	interface Props {
		locale: Locale;
		langLabel: string;
	}

	let { locale = $bindable(), langLabel }: Props = $props();
</script>

<label class="text-fg-subtle inline-flex items-center gap-2 text-xs">
	<span class="sr-only">{langLabel}</span>
	<select
		class="border-border bg-popover text-fg h-9 min-h-9 cursor-pointer rounded-full border px-3 text-xs leading-none"
		bind:value={locale}
	>
		<option value="en">EN</option>
		<option value="it">IT</option>
	</select>
</label>
