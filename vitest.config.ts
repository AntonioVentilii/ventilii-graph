import { defineConfig } from 'vitest/config';

// Unit tests for the API's own logic (server/). Apart from vite.config.ts so a
// Node-only run does not load the SvelteKit plugin.
export default defineConfig({
	test: {
		include: ['server/**/*.spec.ts'],
		environment: 'node',
		// The shared lint config (vitest/no-importing-vitest-globals) wants
		// describe, it, expect and vi as globals.
		globals: true
	}
});
