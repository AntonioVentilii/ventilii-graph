import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(), tailwindcss()],
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
		}
	},
	resolve: {
		alias: {
			$routes: resolve('./src/lib/routes'),
			$lib: resolve('./src/lib')
		}
	}
});
