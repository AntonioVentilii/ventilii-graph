<script lang="ts">
	import { hubFloatStyle } from '$lib/portfolio/graph-geometry';
	import { pickLocale } from '$lib/portfolio/locale';
	import type { Locale, Person } from '$lib/portfolio/types';

	interface Props {
		person: Person;
		locale: Locale;
		hubWidthPx: number;
		onclick: () => void;
	}

	let { person, locale, hubWidthPx, onclick }: Props = $props();
</script>

<div
	class="hub-float absolute left-1/2 top-1/2 z-20 flex justify-center"
	style="width: {hubWidthPx}px; {hubFloatStyle()}"
>
	<button
		type="button"
		class="shadow-hub flex w-full flex-col items-center gap-2 rounded-2xl border-2 border-border-strong bg-card-solid p-3 transition hover:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
		{onclick}
	>
		<span
			class="inline-flex rounded-full bg-gradient-to-br from-[var(--grad-from)] via-[var(--grad-via)] to-[var(--grad-to)] p-[3px] shadow-[0_0_0_1px_var(--avatar-ring-outer),0_0_24px_var(--avatar-glow)]"
		>
			<span class="overflow-hidden rounded-full p-[2px]" style="background: var(--avatar-inner)">
				<img
					src={person.avatarUrl}
					alt={person.name}
					class="h-16 w-16 rounded-full object-cover [object-position:center_42%]"
					width="64"
					height="64"
				/>
			</span>
		</span>
		<div class="text-center">
			<p class="text-xs font-bold text-fg">{person.name}</p>
			<p class="text-[10px] text-fg-subtle">{pickLocale(person.title, locale)}</p>
		</div>
	</button>
</div>
