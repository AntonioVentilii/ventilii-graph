import { default as svelteConfig } from '@dfinity/eslint-config-oisy-wallet/svelte';
import { default as vitestConfig } from '@dfinity/eslint-config-oisy-wallet/vitest';
import ts from 'typescript-eslint';

const ZERO_LITERAL = {
	selector: "Literal[raw='0n']",
	message: 'Use the shared constant `ZERO` instead of `0n`.'
};

// import-x's `import/no-relative-parent-imports` resolves `#lib/…` subpath
// imports to their file and then reports them as parent imports. This checks
// the specifier as written instead, so `#lib/…` passes and `../…` does not.
const PARENT_IMPORT = {
	selector: 'ImportDeclaration[source.value=/^\\.\\.\\//]',
	message: 'Import from a parent directory through `#lib/…` instead of `../`.'
};

// Size and nesting limits for new code. The files that are over them today are
// pinned below at their current value, so they pass now and can only shrink:
// lower a pin when a change brings the file down, never raise it.
const LIMITS = {
	complexity: ['error', 15],
	'max-depth': ['error', 4],
	'max-lines': ['error', { max: 400, skipBlankLines: true, skipComments: true }]
};

const BASELINE = [
	{ files: ['src/lib/services/portfolio.services.ts'], rules: { 'max-lines': 'off' } },
	{
		files: ['src/lib/services/graph-layout.services.ts'],
		rules: {
			complexity: ['error', 36],
			'max-depth': ['error', 7],
			'max-lines': ['error', { max: 425, skipBlankLines: true, skipComments: true }]
		}
	},
	{
		files: ['server/index.ts'],
		rules: {
			complexity: ['error', 18],
			'max-lines': ['error', { max: 502, skipBlankLines: true, skipComments: true }]
		}
	},
	{
		files: ['src/lib/components/graph/GraphEdgesLive.svelte'],
		rules: { complexity: ['error', 27] }
	},
	{
		files: ['src/lib/components/cv/StaticCv.svelte'],
		rules: { 'max-lines': ['error', { max: 402, skipBlankLines: true, skipComments: true }] }
	},
	{
		files: ['src/lib/utils/ask-copy.utils.ts'],
		rules: { 'max-lines': ['error', { max: 425, skipBlankLines: true, skipComments: true }] }
	}
];

// Imports point one way (docs/ai/structure.md): types <- utils <- services <-
// stores <- components, and the API never reaches the UI. Each entry is a
// regex on the specifier as written (the `#lib/` prefix would read as a
// comment in the default gitignore-style patterns).
const restrict = (regexes) => [
	'error',
	{
		patterns: regexes.map((regex) => ({
			regex,
			message: 'This layer may not import that one: see docs/ai/structure.md.'
		}))
	}
];

const COMPONENTS = '^#lib/components/';
const STORES = '^#lib/stores/';

const BOUNDARIES = [
	{
		files: ['src/lib/types/**'],
		rules: {
			'no-restricted-imports': restrict([COMPONENTS, STORES, '^#lib/services/', '^#lib/utils/'])
		}
	},
	{
		files: ['src/lib/utils/**'],
		rules: {
			'no-restricted-imports': restrict([COMPONENTS, STORES, '^#lib/services/ai\\.services'])
		}
	},
	{
		files: ['src/lib/services/**'],
		rules: { 'no-restricted-imports': restrict([COMPONENTS, STORES]) }
	},
	{
		files: ['src/lib/stores/**'],
		rules: { 'no-restricted-imports': restrict([COMPONENTS]) }
	},
	{
		files: ['src/lib/components/ui/**'],
		rules: { 'no-restricted-imports': restrict(['^#lib/services/', STORES]) }
	},
	{
		files: ['server/**'],
		rules: {
			'no-restricted-imports': restrict([
				'^\\$app/',
				'^svelte(/|$)',
				// Both spellings reach src/: `../src/lib/...` and the `#lib/...` import map.
				'(^#lib|/src/lib)/components/',
				'(^#lib|/src/lib)/stores/',
				'(^#lib|/src/lib)/services/ai\\.services'
			])
		}
	}
];

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
			'svelte/no-navigation-without-resolve': 'off',
			'import/no-relative-parent-imports': 'off',
			'no-restricted-syntax': ['error', ZERO_LITERAL, PARENT_IMPORT],
			...LIMITS
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
			'no-restricted-syntax': ['error', ZERO_LITERAL],
			'no-console': 'off'
		}
	},

	...BASELINE,

	...BOUNDARIES
);
