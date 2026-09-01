<script lang="ts">
	interface Props {
		href: string;
		label: string;
		title: string;
		onFlatten: () => void;
	}

	let { href, label, title, onFlatten }: Props = $props();

	const handleClick = (e: MouseEvent) => {
		// Let modified clicks (new tab, etc.) behave like a normal link
		if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
			return;
		}
		e.preventDefault();
		onFlatten();
	};
</script>

<a
	class="flatten-toggle inline-flex h-9 items-center gap-2 rounded-full border border-border bg-popover px-3 text-xs leading-none text-fg-muted outline-hidden transition hover:border-accent hover:text-fg focus-visible:ring-2 focus-visible:ring-accent"
	aria-label={title}
	{href}
	onclick={handleClick}
	{title}
>
	<svg
		class="flatten-glyph h-4 w-4 shrink-0"
		aria-hidden="true"
		fill="none"
		viewBox="0 0 16 16"
		xmlns="http://www.w3.org/2000/svg"
	>
		<circle class="fg-1" cx="3" cy="4" r="1.4" />
		<circle class="fg-2" cx="12" cy="3" r="1.4" />
		<circle class="fg-3" cx="8" cy="8" r="1.4" />
		<circle class="fg-4" cx="4" cy="12" r="1.4" />
		<circle class="fg-5" cx="13" cy="13" r="1.4" />
	</svg>
	<span class="hidden sm:inline">{label}</span>
	<kbd
		class="hidden rounded border border-border-muted px-1 text-[0.55rem] text-fg-subtle lg:inline"
		aria-hidden="true">F</kbd
	>
</a>
