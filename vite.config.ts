import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(), tailwindcss()],
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
