import { browser } from '$app/environment';

export const theme = $state({ mode: 'light' as 'light' | 'dark' });

function syncDom() {
	if (!browser) return;
	document.documentElement.classList.toggle('dark', theme.mode === 'dark');
	document.documentElement.classList.toggle('light', theme.mode === 'light');
	localStorage.setItem('theme', theme.mode);
}

/** Call once on client after optional FOUC script in app.html */
export function initThemeFromStorage() {
	if (!browser) return;
	const saved = localStorage.getItem('theme');
	if (saved === 'light' || saved === 'dark') {
		theme.mode = saved;
	} else {
		theme.mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}
	syncDom();
}

export function setTheme(next: 'light' | 'dark') {
	theme.mode = next;
	syncDom();
}

export function toggleTheme() {
	setTheme(theme.mode === 'dark' ? 'light' : 'dark');
}
