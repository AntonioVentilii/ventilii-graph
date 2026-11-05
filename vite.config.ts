import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const file = fileURLToPath(new URL('package.json', import.meta.url));
const json = readFileSync(file, 'utf8');
const { version } = JSON.parse(json);

export default defineConfig({
	plugins: [
		// SvelteKit 3 reads its configuration here; svelte.config.js is gone. The
		// site's own modules are imported as `#lib/…` (package.json "imports").
		sveltekit({
			preprocess: vitePreprocess(),
			adapter: adapter({
				precompress: false,
				// Every route is prerendered, so this fallback is only ever served for an
				// unmatched path: nginx returns it as the 404 body, and the client-side
				// router renders the app's own error page instead of nginx's default.
				fallback: '404.html'
			}),
			version: { name: version }
		}),
		tailwindcss()
	],
	define: {
		// Frozen at build time and inlined into both the prerendered HTML and the
		// client bundle, so the two always agree. Computing it in the component
		// instead would re-run in the browser and overwrite the prerendered year
		// during hydration, which we verified it does.
		__BUILD_YEAR__: JSON.stringify(String(new Date().getFullYear()))
	},
	server: {
		fs: {
			allow: ['.']
		},
		// The AI version's API (server/, `npm run dev:api`); nginx does the same in production.
		proxy: {
			'/api': 'http://127.0.0.1:8787'
		}
	}
});
