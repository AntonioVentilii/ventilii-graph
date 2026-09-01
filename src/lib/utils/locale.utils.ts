import type { Locale, Localised } from '$lib/types/portfolio.types';

export const LOCALES: Locale[] = ['en', 'it', 'pt'];

export const pickLocale = ({ text, locale }: { text: Localised; locale: Locale }): string =>
	text[locale] ?? text.en;

/** Site-root-relative path of the static CV page for a locale (see src/routes/cv). */
export const cvPath = (locale: Locale): string => (locale === 'en' ? '/cv/' : `/cv/${locale}/`);
