import { LOCALES } from '#lib/types/portfolio.types.ts';
import { HTML_LANG, cvPath } from '#lib/utils/locale.utils.ts';
import type { Handle } from '@sveltejs/kit/hooks';

/**
 * Stamp the correct <html lang> into server-rendered/prerendered pages
 * (see the %lang% placeholder in app.html). Runs at prerender time, so the
 * static CV pages carry their locale without requiring JS execution.
 */
export const handle: Handle = ({ event, resolve }) => {
	const { pathname } = event.url;
	const locale = LOCALES.find((l) => l !== 'en' && pathname.startsWith(cvPath(l))) ?? 'en';
	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', HTML_LANG[locale])
	});
};
