import { default as svelteConfig } from '@dfinity/eslint-config-oisy-wallet/svelte';
import { default as vitestConfig } from '@dfinity/eslint-config-oisy-wallet/vitest';
import ts from 'typescript-eslint';

export default ts.config(
	...vitestConfig,
	...svelteConfig,

	{
		ignores: ['build/', '.svelte-kit/', 'dist/', 'static/', 'src/declarations/']
	},

	{
		// Injected by Vite `define` (see vite.config.ts). The declaration in
		// src/app.d.ts covers TypeScript; ESLint's no-undef needs it here too.
		languageOptions: {
			globals: {
				__BUILD_YEAR__: 'readonly'
			}
		}
	},

	{
		rules: {
			'svelte/no-navigation-without-resolve': 'off'
		}
	},

	{
		files: ['src/**/*'],
		rules: {
			'local-rules/no-relative-imports': 'error'
		}
	},

	{
		rules: {
			'no-restricted-syntax': [
				'error',
				{
					selector: "Literal[raw='0n']",
					message: 'Use the shared constant `ZERO` instead of `0n`.'
				}
			]
		}
	}
);
