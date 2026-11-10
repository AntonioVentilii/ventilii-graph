import { browser } from '$app/env';
import { writable } from 'svelte/store';

type ThemeMode = 'light' | 'dark';

const isThemeMode = (value: string | null): value is ThemeMode =>
	value === 'light' || value === 'dark';

const stored = browser ? localStorage.getItem('theme') : null;

export const theme = writable<{ mode: ThemeMode }>({
	mode: isThemeMode(stored) ? stored : 'light'
});

const syncDom = (mode: ThemeMode) => {
	if (!browser) {
		return;
	}
	document.documentElement.classList.toggle('dark', mode === 'dark');
	document.documentElement.classList.toggle('light', mode === 'light');
	localStorage.setItem('theme', mode);
};

export const initThemeFromStorage = () => {
	if (!browser) {
		return;
	}
	const saved = localStorage.getItem('theme');
	if (isThemeMode(saved)) {
		theme.set({ mode: saved });
		syncDom(saved);
	} else {
		const mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
		theme.set({ mode });
		syncDom(mode);
	}
};

export const setTheme = (next: 'light' | 'dark') => {
	theme.set({ mode: next });
	syncDom(next);
};

export const toggleTheme = () => {
	theme.update((curr) => {
		const next = curr.mode === 'dark' ? 'light' : 'dark';
		syncDom(next);
		return { mode: next };
	});
};
