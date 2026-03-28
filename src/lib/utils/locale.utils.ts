import type { Locale, Localised } from '$lib/types/portfolio.types';

export const pickLocale = ({ text, locale }: { text: Localised; locale: Locale }): string => {
	if ('en' in text && 'it' in text) {
		const t = text as Record<Locale, string>;
		return t[locale] ?? t.en;
	}
	const partial = text as { en: string; it?: string };
	return locale === 'it' && partial.it ? partial.it : partial.en;
};
