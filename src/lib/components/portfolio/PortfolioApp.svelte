<script lang="ts">
	import { portfolioData } from '$lib/data/portfolio.data';
	import type { Locale } from '$lib/portfolio/types';
	import { pickLocale } from '$lib/portfolio/locale';

	let wrapEl: HTMLDivElement | undefined = $state();
	let size = $state(360);

	$effect(() => {
		if (!wrapEl) return;
		const el = wrapEl;
		const ro = new ResizeObserver(() => {
			size = el.clientWidth;
		});
		ro.observe(el);
		size = el.clientWidth;
		return () => ro.disconnect();
	});

	let locale = $state<Locale>('en');
	let categoryId = $state<string | null>(null);
	let itemId = $state<string | null>(null);

	const t = {
		skip: {
			en: 'Skip to details',
			it: 'Salta ai dettagli',
		},
		cvFallback: {
			en: 'Linear view (GitHub repos)',
			it: 'Vista lineare (repo GitHub)',
		},
		langLabel: {
			en: 'Language',
			it: 'Lingua',
		},
		home: {
			en: 'Home',
			it: 'Home',
		},
		panelHint: {
			en: 'Select a node to see details here.',
			it: 'Seleziona un nodo per i dettagli.',
		},
		orgNote: {
			en: 'DFINITY on GitHub',
			it: 'DFINITY su GitHub',
		},
	} as const;

	function tr<K extends keyof typeof t>(key: K): string {
		return t[key][locale];
	}

	const R1 = $derived(size * 0.34);
	const R2 = $derived(size * 0.5);
	const cx = $derived(size / 2);
	const cy = $derived(size / 2);

	function categoryAngle(index: number): number {
		return (index / portfolioData.categories.length) * Math.PI * 2 - Math.PI / 2;
	}

	function childAngles(parentIndex: number, count: number): number[] {
		const tp = categoryAngle(parentIndex);
		if (count <= 0) return [];
		if (count === 1) return [tp];
		const spread = Math.min(1.1, 0.28 * count);
		const step = spread / (count - 1);
		return Array.from({ length: count }, (_, k) => tp - spread / 2 + k * step);
	}

	type Leaf =
		| { kind: 'experience'; id: string }
		| { kind: 'project'; id: string }
		| { kind: 'technology'; id: string }
		| { kind: 'education'; id: string }
		| { kind: 'language'; id: string }
		| { kind: 'about'; id: string };

	function leavesForCategory(cat: string): Leaf[] {
		switch (cat) {
			case 'experience':
				return portfolioData.experiences.map((e) => ({ kind: 'experience', id: e.id }));
			case 'projects':
				return portfolioData.projects.map((p) => ({ kind: 'project', id: p.id }));
			case 'stack':
				return portfolioData.technologies.map((s) => ({ kind: 'technology', id: s.id }));
			case 'education':
				return portfolioData.education.map((e) => ({ kind: 'education', id: e.id }));
			case 'languages':
				return portfolioData.languages.map((l) => ({ kind: 'language', id: l.id }));
			case 'about':
				return portfolioData.about.map((a) => ({ kind: 'about', id: a.id }));
			default:
				return [];
		}
	}

	function leafLabel(leaf: Leaf): string {
		switch (leaf.kind) {
			case 'experience': {
				const e = portfolioData.experiences.find((x) => x.id === leaf.id)!;
				return pickLocale(e.company, locale);
			}
			case 'project': {
				const p = portfolioData.projects.find((x) => x.id === leaf.id)!;
				return pickLocale(p.title, locale);
			}
			case 'technology': {
				const s = portfolioData.technologies.find((x) => x.id === leaf.id)!;
				return pickLocale(s.label, locale);
			}
			case 'education': {
				const ed = portfolioData.education.find((x) => x.id === leaf.id)!;
				return pickLocale(ed.institution, locale);
			}
			case 'language': {
				const l = portfolioData.languages.find((x) => x.id === leaf.id)!;
				return pickLocale(l.label, locale);
			}
			case 'about': {
				const a = portfolioData.about.find((x) => x.id === leaf.id)!;
				return pickLocale(a.title, locale);
			}
		}
	}

	const leaves = $derived(categoryId ? leavesForCategory(categoryId) : []);
	const parentIndex = $derived(
		categoryId ? portfolioData.categories.findIndex((c) => c.id === categoryId) : -1
	);
	const childAnglesList = $derived(
		parentIndex >= 0 ? childAngles(parentIndex, leaves.length) : []
	);

	function toggleCategory(id: string) {
		if (categoryId === id) {
			categoryId = null;
			itemId = null;
			return;
		}
		categoryId = id;
		itemId = null;
	}

	function categoryForLeafKind(kind: Leaf['kind']): string {
		switch (kind) {
			case 'experience':
				return 'experience';
			case 'project':
				return 'projects';
			case 'technology':
				return 'stack';
			case 'education':
				return 'education';
			case 'language':
				return 'languages';
			case 'about':
				return 'about';
		}
	}

	function selectLeaf(l: Leaf) {
		categoryId = categoryForLeafKind(l.kind);
		itemId = `${l.kind}:${l.id}`;
	}


	function parseLeaf(): Leaf | null {
		if (!itemId) return null;
		const [kind, ...rest] = itemId.split(':');
		const id = rest.join(':');
		if (
			kind === 'experience' ||
			kind === 'project' ||
			kind === 'technology' ||
			kind === 'education' ||
			kind === 'language' ||
			kind === 'about'
		) {
			return { kind, id } as Leaf;
		}
		return null;
	}

	function resetHome() {
		categoryId = null;
		itemId = null;
	}

	function relatedProjectsForStack(stackId: string) {
		return portfolioData.projects.filter((p) => p.stackIds?.includes(stackId));
	}

	function relatedStackForProject(projectId: string) {
		const p = portfolioData.projects.find((x) => x.id === projectId);
		if (!p?.stackIds) return [];
		return portfolioData.technologies.filter((s) => p.stackIds!.includes(s.id));
	}
</script>

<div
	class="min-h-[100dvh] bg-zinc-950 text-zinc-100 selection:bg-lavender-blue-500/30"
>
	<a
		href="#detail-panel"
		class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-lavender-blue-600 focus:px-3 focus:py-2 focus:text-white"
	>
		{tr('skip')}
	</a>

	<header
		class="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/80 px-4 py-4 md:px-8"
	>
		<p class="text-xs uppercase tracking-widest text-zinc-500">
			Antonio Ventilii — graph portfolio
		</p>
		<div class="flex flex-wrap items-center gap-2">
			<a
				href="https://github.com/AntonioVentilii?tab=repositories"
				class="rounded-full border border-zinc-700 bg-zinc-900/80 px-3 py-1.5 text-xs text-zinc-300 hover:border-lavender-blue-500 hover:text-white"
				target="_blank"
				rel="noopener noreferrer"
			>
				{tr('cvFallback')}
			</a>
			<label class="flex items-center gap-2 text-xs text-zinc-400">
				<span class="sr-only">{tr('langLabel')}</span>
				<select
					bind:value={locale}
					class="rounded-full border border-zinc-700 bg-zinc-900/80 px-2 py-1.5 text-zinc-200"
				>
					<option value="en">EN</option>
					<option value="it">IT</option>
				</select>
			</label>
		</div>
	</header>

	<div
		class="mx-auto grid max-w-6xl gap-8 px-4 py-8 md:grid-cols-[minmax(280px,1fr)_minmax(320px,420px)] md:items-start md:gap-12 md:px-8 lg:grid-cols-[1fr_400px]"
	>
		<div class="flex flex-col items-center gap-6">
			<div
				bind:this={wrapEl}
				class="relative aspect-square w-full max-w-[min(92vw,420px)] shrink-0"
				aria-label="Portfolio graph"
			>
				{#if size > 0}
					<svg
						width={size}
						height={size}
						class="absolute left-0 top-0 text-lavender-blue-500/25"
						aria-hidden="true"
					>
						{#each portfolioData.categories as _, i}
							{@const a = categoryAngle(i)}
							{@const x2 = cx + R1 * Math.cos(a)}
							{@const y2 = cy + R1 * Math.sin(a)}
							<line
								x1={cx}
								y1={cy}
								x2={x2}
								y2={y2}
								stroke="currentColor"
								stroke-width="1"
							/>
						{/each}
						{#if categoryId && parentIndex >= 0}
							{@const pa = categoryAngle(parentIndex)}
							{@const px = cx + R1 * Math.cos(pa)}
							{@const py = cy + R1 * Math.sin(pa)}
							{#each childAnglesList as ca, ki}
								{@const x2 = cx + R2 * Math.cos(ca)}
								{@const y2 = cy + R2 * Math.sin(ca)}
								<line
									x1={px}
									y1={py}
									x2={x2}
									y2={y2}
									stroke="currentColor"
									stroke-width="1.25"
									class="text-lavender-blue-400/45"
								/>
							{/each}
						{/if}
					</svg>
				{/if}

				{#each portfolioData.categories as cat, i}
					{@const a = categoryAngle(i)}
					{@const x = cx + R1 * Math.cos(a) - 36}
					{@const y = cy + R1 * Math.sin(a) - 18}
					<button
						type="button"
						class="absolute flex h-9 w-[4.5rem] items-center justify-center rounded-full border text-[10px] font-semibold leading-tight transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lavender-blue-400 {categoryId ===
						cat.id
							? 'border-lavender-blue-400 bg-lavender-blue-500/15 text-white'
							: 'border-zinc-600 bg-zinc-900/90 text-zinc-200 hover:border-zinc-500'}"
						style="left: {x}px; top: {y}px;"
						onclick={() => toggleCategory(cat.id)}
						aria-pressed={categoryId === cat.id}
					>
						{pickLocale(cat.label, locale)}
					</button>
				{/each}

				{#if categoryId && leaves.length > 0}
					{#each leaves as leaf, ki}
						{@const a = childAnglesList[ki] ?? categoryAngle(parentIndex)}
						{@const x = cx + R2 * Math.cos(a) - 40}
						{@const y = cy + R2 * Math.sin(a) - 14}
						<button
							type="button"
							class="absolute max-w-[5.6rem] truncate rounded-lg border px-2 py-1 text-[10px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lavender-blue-400 {itemId ===
							`${leaf.kind}:${leaf.id}`
								? 'border-lavender-blue-400 bg-lavender-blue-600/20 text-white'
								: 'border-zinc-700 bg-zinc-900/95 text-zinc-300 hover:border-zinc-500'}"
							style="left: {x}px; top: {y}px;"
							onclick={() => selectLeaf(leaf)}
						>
							{leafLabel(leaf)}
						</button>
					{/each}
				{/if}

				<button
					type="button"
					class="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 rounded-2xl border border-zinc-700 bg-zinc-900/95 p-3 shadow-lg shadow-black/40 transition hover:border-lavender-blue-500/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lavender-blue-400"
					style="width: {Math.min(148, size * 0.42)}px;"
					onclick={resetHome}
				>
					<img
						src={portfolioData.person.avatarUrl}
						alt={portfolioData.person.name}
						class="h-14 w-14 rounded-full border border-zinc-600 object-cover"
						width="56"
						height="56"
					/>
					<div class="text-center">
						<p class="text-xs font-bold text-white">{portfolioData.person.name}</p>
						<p class="text-[10px] text-zinc-400">
							{pickLocale(portfolioData.person.title, locale)}
						</p>
					</div>
				</button>
			</div>

		</div>

		<aside
			id="detail-panel"
			tabindex="-1"
			class="min-h-[280px] scroll-mt-24 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 shadow-inner shadow-black/20 md:sticky md:top-8"
		>
			{#if categoryId && !itemId}
				{@const cat = portfolioData.categories.find((c) => c.id === categoryId)}
				{#if cat}
					<div class="space-y-4 animate-fade">
						<p class="text-xs uppercase tracking-wide text-zinc-500">
							{locale === 'it' ? 'Categoria' : 'Category'}
						</p>
						<h2 class="text-xl font-bold text-white">{pickLocale(cat.label, locale)}</h2>
						<p class="text-sm leading-relaxed text-zinc-300">{pickLocale(cat.shortHint, locale)}</p>
						<p class="text-xs text-zinc-500">
							{locale === 'it'
								? 'Scegli un elemento nel secondo anello per i dettagli.'
								: 'Pick an item in the outer ring for details.'}
						</p>
						<ul class="space-y-1.5 border-t border-zinc-800 pt-3 text-sm">
							{#each leavesForCategory(categoryId) as leaf}
								<li>
									<button
										type="button"
										class="text-lavender-blue-300 hover:text-white"
										onclick={() => selectLeaf(leaf)}
									>
										{leafLabel(leaf)}
									</button>
								</li>
							{/each}
						</ul>
					</div>
				{/if}
			{:else if !itemId}
				<div class="space-y-4 animate-fade">
					<h2 class="text-lg font-bold text-white">{portfolioData.person.name}</h2>
					<p class="text-sm text-lavender-blue-200">
						{pickLocale(portfolioData.person.title, locale)}
					</p>
					<p class="text-sm leading-relaxed text-zinc-300">
						{pickLocale(portfolioData.person.tagline, locale)}
					</p>
					<p class="text-xs text-zinc-500">
						{pickLocale(portfolioData.person.location, locale)}
					</p>
					<div class="flex flex-wrap gap-2 pt-2">
						<a
							href={'mailto:' + portfolioData.person.email}
							class="rounded-full bg-lavender-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-lavender-blue-500"
						>
							Email
						</a>
						{#each portfolioData.person.links as link}
							<a
								href={link.href}
								class="rounded-full border border-zinc-600 px-3 py-1.5 text-xs text-zinc-200 hover:border-lavender-blue-500"
								target="_blank"
								rel="noopener noreferrer"
							>
								{pickLocale(link.label, locale)}
							</a>
						{/each}
					</div>
					<div class="border-t border-zinc-800 pt-4">
						<p class="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
							{tr('orgNote')}
						</p>
						<ul class="space-y-2 text-sm">
							{#each portfolioData.orgHighlights as org}
								<li>
									<a
										href={org.url}
										class="text-lavender-blue-300 hover:text-white"
										target="_blank"
										rel="noopener noreferrer"
									>
										{org.name}
									</a>
									<span class="text-zinc-500"> — {pickLocale(org.note, locale)}</span>
								</li>
							{/each}
						</ul>
					</div>
					<p class="pt-4 text-xs text-zinc-600">{tr('panelHint')}</p>
				</div>
			{:else if itemId}
				{@const leaf = parseLeaf()}
				{#if leaf?.kind === 'experience'}
					{@const e = portfolioData.experiences.find((x) => x.id === leaf.id)}
					{#if e}
						<div class="space-y-3 animate-fade">
							<p class="text-xs uppercase tracking-wide text-zinc-500">
								{pickLocale(portfolioData.categories[0].label, locale)}
							</p>
							<h2 class="text-xl font-bold text-white">{pickLocale(e.company, locale)}</h2>
							<p class="text-sm text-zinc-400">{pickLocale(e.role, locale)}</p>
							<p class="text-xs text-zinc-500">{pickLocale(e.dates, locale)} · {pickLocale(e.location, locale)}</p>
							<p class="text-sm leading-relaxed text-zinc-300">{pickLocale(e.summary, locale)}</p>
							<ul class="list-disc space-y-2 pl-5 text-sm text-zinc-300">
								{#each e.highlights as h}
									<li>{pickLocale(h, locale)}</li>
								{/each}
							</ul>
							{#if e.links?.length}
								<div class="flex flex-wrap gap-2 pt-2">
									{#each e.links as link}
										<a
											href={link.href}
											class="text-sm text-lavender-blue-300 hover:text-white"
											target="_blank"
											rel="noopener noreferrer"
										>
											{pickLocale(link.label, locale)}
										</a>
									{/each}
								</div>
							{/if}
							{#if e.projectIds?.length}
								<div class="border-t border-zinc-800 pt-3 text-sm text-zinc-400">
									<span class="text-zinc-500"
										>{locale === 'it' ? 'Progetti collegati:' : 'Related projects:'}</span
									>
									<ul class="mt-1 space-y-1">
										{#each e.projectIds as pid}
											{@const p = portfolioData.projects.find((x) => x.id === pid)}
											{#if p}
												<li>
													<button
														type="button"
														class="text-left text-lavender-blue-300 hover:text-white"
														onclick={() => selectLeaf({ kind: 'project', id: p.id })}
													>
														{pickLocale(p.title, locale)}
													</button>
												</li>
											{/if}
										{/each}
									</ul>
								</div>
							{/if}
						</div>
					{/if}
				{:else if leaf?.kind === 'project'}
					{@const p = portfolioData.projects.find((x) => x.id === leaf.id)}
					{#if p}
						{@const stacks = relatedStackForProject(p.id)}
						<div class="space-y-3 animate-fade">
							<p class="text-xs uppercase tracking-wide text-zinc-500">
								{pickLocale(portfolioData.categories[1].label, locale)}
							</p>
							<h2 class="text-xl font-bold text-white">{pickLocale(p.title, locale)}</h2>
							<p class="text-sm leading-relaxed text-zinc-300">{pickLocale(p.summary, locale)}</p>
							{#if p.highlights?.length}
								<ul class="list-disc space-y-2 pl-5 text-sm text-zinc-300">
									{#each p.highlights as h}
										<li>{pickLocale(h, locale)}</li>
									{/each}
								</ul>
							{/if}
							<div class="flex flex-wrap gap-2">
								{#each p.links as link}
									<a
										href={link.href}
										class="rounded-full border border-zinc-600 px-3 py-1 text-xs text-zinc-200 hover:border-lavender-blue-500"
										target="_blank"
										rel="noopener noreferrer"
									>
										{pickLocale(link.label, locale)}
									</a>
								{/each}
							</div>
							{#if stacks.length}
								<div class="border-t border-zinc-800 pt-3 text-sm">
									<p class="text-zinc-500">{locale === 'it' ? 'Stack:' : 'Stack:'}</p>
									<div class="mt-2 flex flex-wrap gap-1.5">
										{#each stacks as s}
											<button
												type="button"
												class="rounded-md border border-zinc-700 px-2 py-0.5 text-xs text-zinc-300 hover:border-lavender-blue-500"
												onclick={() => selectLeaf({ kind: 'technology', id: s.id })}
											>
												{pickLocale(s.label, locale)}
											</button>
										{/each}
									</div>
								</div>
							{/if}
						</div>
					{/if}
				{:else if leaf?.kind === 'technology'}
					{@const s = portfolioData.technologies.find((x) => x.id === leaf.id)}
					{#if s}
						{@const rps = relatedProjectsForStack(s.id)}
						<div class="space-y-3 animate-fade">
							<p class="text-xs uppercase tracking-wide text-zinc-500">
								{pickLocale(portfolioData.categories[2].label, locale)}
							</p>
							<h2 class="text-xl font-bold text-white">{pickLocale(s.label, locale)}</h2>
							<p class="text-sm leading-relaxed text-zinc-300">{pickLocale(s.blurb, locale)}</p>
							{#if s.yearsHint}
								<p class="text-xs text-zinc-500">{pickLocale(s.yearsHint, locale)}</p>
							{/if}
							{#if rps.length}
								<div class="border-t border-zinc-800 pt-3">
									<p class="text-sm text-zinc-500">
										{locale === 'it' ? 'Progetti con questo elemento:' : 'Projects using this:'}
									</p>
									<ul class="mt-2 space-y-1 text-sm">
										{#each rps as p}
											<li>
												<button
													type="button"
													class="text-lavender-blue-300 hover:text-white"
													onclick={() => selectLeaf({ kind: 'project', id: p.id })}
												>
													{pickLocale(p.title, locale)}
												</button>
											</li>
										{/each}
									</ul>
								</div>
							{/if}
						</div>
					{/if}
				{:else if leaf?.kind === 'education'}
					{@const ed = portfolioData.education.find((x) => x.id === leaf.id)}
					{#if ed}
						<div class="space-y-3 animate-fade">
							<p class="text-xs uppercase tracking-wide text-zinc-500">
								{pickLocale(portfolioData.categories[3].label, locale)}
							</p>
							<h2 class="text-xl font-bold text-white">{pickLocale(ed.institution, locale)}</h2>
							<p class="text-sm text-zinc-300">{pickLocale(ed.degree, locale)}</p>
							<p class="text-xs text-zinc-500">{pickLocale(ed.dates, locale)}</p>
							{#if ed.note}
								<p class="text-sm text-zinc-400">{pickLocale(ed.note, locale)}</p>
							{/if}
						</div>
					{/if}
				{:else if leaf?.kind === 'language'}
					{@const l = portfolioData.languages.find((x) => x.id === leaf.id)}
					{#if l}
						<div class="space-y-2 animate-fade">
							<p class="text-xs uppercase tracking-wide text-zinc-500">
								{pickLocale(portfolioData.categories[4].label, locale)}
							</p>
							<h2 class="text-xl font-bold text-white">{pickLocale(l.label, locale)}</h2>
							<p class="text-sm text-zinc-300">{pickLocale(l.level, locale)}</p>
							<p class="text-xs text-zinc-500">
								{locale === 'it'
									? 'Il testo dell’interfaccia segue il selettore EN/IT in alto.'
									: 'Interface copy follows the EN/IT toggle above.'}
							</p>
						</div>
					{/if}
				{:else if leaf?.kind === 'about'}
					{@const a = portfolioData.about.find((x) => x.id === leaf.id)}
					{#if a}
						<div class="space-y-3 animate-fade">
							<p class="text-xs uppercase tracking-wide text-zinc-500">
								{pickLocale(portfolioData.categories[5].label, locale)}
							</p>
							<h2 class="text-xl font-bold text-white">{pickLocale(a.title, locale)}</h2>
							<p class="text-sm leading-relaxed text-zinc-300">{pickLocale(a.body, locale)}</p>
						</div>
					{/if}
				{/if}
			{/if}
		</aside>
	</div>

	<footer class="border-t border-zinc-800/80 px-4 py-6 text-center text-xs text-zinc-600 md:px-8">
		Static site — SvelteKit + adapter-static.
	</footer>
</div>

<style>
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	.animate-fade {
		animation: fade 0.22s ease-out;
	}
</style>
