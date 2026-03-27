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
		class="flex w-full flex-col items-center gap-2 rounded-2xl border-2 border-zinc-600 bg-zinc-900/95 p-3 shadow-[0_8px_40px_rgba(0,0,0,0.55)] transition hover:border-brand-500/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-400"
		{onclick}
	>
		<span
			class="inline-flex rounded-full bg-gradient-to-br from-brand-200 via-brand-500 to-brand-800 p-[3px] shadow-[0_0_0_1px_rgba(18,38,46,0.95),0_0_24px_rgba(61,143,163,0.4)]"
		>
			<span class="overflow-hidden rounded-full bg-zinc-950 p-[2px]">
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
			<p class="text-xs font-bold text-white">{person.name}</p>
			<p class="text-[10px] text-zinc-400">{pickLocale(person.title, locale)}</p>
		</div>
	</button>
</div>
