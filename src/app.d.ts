// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	/** Year of the build, injected by Vite `define` (see vite.config.ts). */
	const __BUILD_YEAR__: string;

	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
