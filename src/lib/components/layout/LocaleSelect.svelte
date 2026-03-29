<script lang="ts">
	import type { Locale } from '$lib/types/portfolio.types';

	interface Props {
		locale: Locale;
		langLabel: string;
	}

	let { locale = $bindable(), langLabel }: Props = $props();
</script>

<label class="inline-flex items-center gap-2 text-xs text-fg-subtle">
	<span class="sr-only">{langLabel}</span>
	<select
		class="h-9 min-h-9 cursor-pointer rounded-full border border-border bg-popover px-3 text-xs leading-none text-fg outline-hidden focus:border-accent focus:ring-2 focus:ring-accent"
		bind:value={locale}
	>
		<option value="en">EN</option>
		<option value="it">IT</option>
	</select>
</label>
