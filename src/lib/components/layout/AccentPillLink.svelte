<script lang="ts">
	import type { LucideIcon } from '@lucide/svelte';

	interface Props {
		href: string;
		label: string;
		title: string;
		icon: LucideIcon;
		onclick?: () => void;
	}

	let { href, label, title, icon: Icon, onclick }: Props = $props();
</script>

<!-- The label hides below `sm`, so `title` is what a screen reader and the tooltip say. -->
<a
	class="inline-flex h-9 w-9 items-center justify-center gap-2 rounded-full border border-accent/50 bg-accent-soft text-xs leading-none font-bold text-fg outline-hidden transition hover:border-accent focus-visible:ring-2 focus-visible:ring-accent sm:w-auto sm:px-3"
	aria-label={title}
	{href}
	{onclick}
	{title}
>
	<Icon class="text-accent" aria-hidden="true" size={14} strokeWidth={2} />
	<span class="hidden sm:inline">{label}</span>
</a>
