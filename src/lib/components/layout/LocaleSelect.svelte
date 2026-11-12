<script lang="ts">
	import { LOCALES, type Locale } from '#lib/types/portfolio.types.ts';
	import { LANGUAGE_LABEL } from '#lib/utils/locale.utils.ts';

	interface Props {
		locale: Locale;
	}

	let { locale = $bindable() }: Props = $props();
</script>

<label class="inline-flex items-center gap-2 text-xs text-fg-subtle">
	<span class="sr-only">{LANGUAGE_LABEL[locale]}</span>
	<select
		class="h-9 min-h-9 cursor-pointer rounded-full border border-border bg-popover px-3 text-xs leading-none text-fg outline-hidden focus:border-accent focus:ring-2 focus:ring-accent"
		bind:value={locale}
	>
		{#each LOCALES as code (code)}
			<option value={code}>{code.toUpperCase()}</option>
		{/each}
	</select>
</label>
