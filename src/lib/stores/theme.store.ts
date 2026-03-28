import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const initial = (browser && localStorage.getItem('theme')) ?? 'light';

export const theme = writable<{ mode: 'light' | 'dark' }>({
	mode: initial as 'light' | 'dark'
});

const syncDom = (mode: 'light' | 'dark') => {
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
	if (saved === 'light' || saved === 'dark') {
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
