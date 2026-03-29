<script lang="ts">
	import { Command, Search as SearchIcon, X } from 'lucide-svelte';
	import { onMount, tick } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import type { Locale } from '$lib/types/portfolio.types';
	import { searchLeaves, type Leaf } from '$lib/utils/leaf.utils';

	interface Props {
		locale: Locale;
		placeholder: string;
		shortcut: string;
		onSelect: (leaf: Leaf) => void;
	}

	let { locale, placeholder, shortcut, onSelect }: Props = $props();

	let query = $state('');
	let isFocused = $state(false);
	let results = $derived(searchLeaves({ query, locale }));
	let selectedIndex = $state(-1);

	let inputEl: HTMLInputElement | undefined = $state();
	let resultsEl: HTMLDivElement | undefined = $state();

	const handleSelect = (leaf: Leaf) => {
		onSelect(leaf);
		handleClose();
	};

	const handleClose = () => {
		query = '';
		selectedIndex = -1;
		isFocused = false;
		inputEl?.blur();
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			handleClose();
			return;
		}

		if (e.key === 'ArrowDown') {
			e.preventDefault();
			selectedIndex = Math.min(selectedIndex + 1, results.length - 1);
			scrollIntoView();
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			selectedIndex = Math.max(selectedIndex - 1, 0);
			scrollIntoView();
		} else if (e.key === 'Enter' && selectedIndex >= 0) {
			handleSelect(results[selectedIndex]);
		}
	};

	const scrollIntoView = () => {
		const active = resultsEl?.querySelector('[aria-selected="true"]');
		active?.scrollIntoView({ block: 'nearest' });
	};

	// --- Animated Placeholder Logic ---
	const keywords = ['rust canister', 'python auth', 'svelte graph', 'icp wallet', 'near intents'];
	let keywordIndex = 0;
	let charIndex = 0;
	let isDeleting = false;
	let animatedPlaceholder = $state('');

	onMount(() => {
		let timeout: ReturnType<typeof setTimeout>;

		const type = () => {
			if (isFocused || query.length > 0) {
				timeout = setTimeout(type, 500); // Just poll until inactive
				return;
			}

			const currentKeyword = keywords[keywordIndex];

			if (isDeleting) {
				animatedPlaceholder = currentKeyword.substring(0, charIndex - 1);
				charIndex--;
			} else {
				animatedPlaceholder = currentKeyword.substring(0, charIndex + 1);
				charIndex++;
			}

			let typeSpeed = isDeleting ? 50 : 100;

			if (!isDeleting && charIndex === currentKeyword.length) {
				isDeleting = true;
				typeSpeed = 2000; // Pause at the end
			} else if (isDeleting && charIndex === 0) {
				isDeleting = false;
				keywordIndex = (keywordIndex + 1) % keywords.length;
				typeSpeed = 500; // Pause before next word
			}

			timeout = setTimeout(type, typeSpeed);
		};

		type();

		const handleGlobalKey = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
				e.preventDefault();
				inputEl?.focus();
			}
		};
		window.addEventListener('keydown', handleGlobalKey);

		return () => {
			clearTimeout(timeout);
			window.removeEventListener('keydown', handleGlobalKey);
		};
	});
</script>

<div class="relative max-w-md flex-1">
	<div
		class="bg-card group flex h-10 w-full items-center gap-3 rounded-full border px-4 transition-all duration-200 {isFocused ||
		query.length > 0
			? 'border-accent ring-accent/20 border-accent shadow-sm ring-1'
			: 'border-border'}"
	>
		<SearchIcon
			class="shrink-0 transition-colors {isFocused || query.length > 0
				? 'text-accent'
				: 'text-fg-muted'}"
			size={18}
		/>
		<input
			bind:this={inputEl}
			class="placeholder:text-fg-faint w-full bg-transparent text-sm outline-none"
			onblur={() => setTimeout(() => (isFocused = false), 200)}
			onfocus={() => (isFocused = true)}
			onkeydown={handleKeyDown}
			placeholder={query === '' ? `${animatedPlaceholder}|` : placeholder}
			type="text"
			bind:value={query}
		/>

		{#if query.length > 0}
			<button
				class="text-fg-muted hover:text-fg shrink-0 transition-colors"
				onclick={() => (query = '')}
				type="button"
				transition:fade={{ duration: 100 }}
			>
				<X size={16} />
			</button>
		{:else}
			<span
				class="bg-page border-border text-fg-faint hidden items-center gap-1 rounded border px-1.5 py-0.5 text-[10px] lg:flex"
				transition:fade={{ duration: 100 }}
			>
				<Command size={10} />
				{shortcut.replace('Search (', '').replace(')', '').replace('⌘', '')}
			</span>
		{/if}
	</div>

	{#if (isFocused || query.length > 0) && (results.length > 0 || query.trim().length > 0)}
		<div
			class="bg-card border-accent absolute inset-x-0 top-full z-[100] mt-2 flex flex-col overflow-hidden rounded-2xl border shadow-2xl"
			transition:slide={{ duration: 200 }}
		>
			{#if results.length > 0}
				<div bind:this={resultsEl} class="max-h-72 overflow-y-auto p-2">
					<ul role="listbox">
						{#each results as res, i (res.kind + res.id)}
							<li>
								<button
									class="aria-selected:bg-accent/10 aria-selected:text-accent flex w-full items-center gap-3 rounded-lg p-2 text-left text-sm transition-colors"
									aria-selected={selectedIndex === i}
									onclick={() => handleSelect(res)}
									onmouseenter={() => (selectedIndex = i)}
									role="option"
									type="button"
								>
									<span
										class="bg-accent/10 text-accent rounded px-1.5 py-0.5 text-[10px] font-bold tracking-wider uppercase"
									>
										{res.kind}
									</span>
									<span class="flex-1 truncate font-medium">{res.label}</span>
								</button>
							</li>
						{/each}
					</ul>
				</div>
			{:else if query.trim().length > 0}
				<div class="text-fg-faint p-6 text-center text-sm italic">No items found...</div>
			{/if}
		</div>
	{/if}

	{#if isFocused && query.length === 0}
		<!-- Simple backdrop focus for search when results aren't yet visible but focused -->
		<div
			class="fixed inset-0 z-[-1] lg:hidden"
			aria-hidden="true"
			onclick={() => (isFocused = false)}
		></div>
	{/if}
</div>
