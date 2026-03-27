import type { Locale, Localised } from './types';

export function pickLocale(text: Localised, locale: Locale): string {
	if ('en' in text && 'it' in text) {
		const t = text as Record<Locale, string>;
		return t[locale] ?? t.en;
	}
	const partial = text as { en: string; it?: string };
	return locale === 'it' && partial.it ? partial.it : partial.en;
}
