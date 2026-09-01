import type { Handle } from '@sveltejs/kit';

/**
 * Stamp the correct <html lang> into server-rendered/prerendered pages
 * (see the %lang% placeholder in app.html). Runs at prerender time, so the
 * static CV pages carry their locale without requiring JS execution.
 */
export const handle: Handle = ({ event, resolve }) => {
	const { pathname } = event.url;
	const lang = pathname.startsWith('/cv/it')
		? 'it'
		: pathname.startsWith('/cv/pt')
			? 'pt-BR'
			: 'en';
	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', lang)
	});
};
