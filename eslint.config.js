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
		// The AI API is a separate Node entry point that reads the site's own
		// portfolio data from src/ (one source of truth), and logs to stdout.
		files: ['server/**/*'],
		rules: {
			'import/no-relative-parent-imports': 'off',
			'no-console': 'off'
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
