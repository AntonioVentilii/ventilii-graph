import { LOCALES, type Locale, type Localised } from '#lib/types/portfolio.types.ts';

/** `<html lang>` and `hreflang` for each locale. */
export const HTML_LANG: Record<Locale, string> = { en: 'en', it: 'it', pt: 'pt-BR' };

/** Open Graph `og:locale` for each locale. */
export const OG_LOCALE: Record<Locale, string> = { en: 'en_US', it: 'it_IT', pt: 'pt_BR' };

/** A `?lang=` value as a locale, or undefined when it is not one. */
export const parseLocale = (value: string | null): Locale | undefined =>
	LOCALES.find((locale) => locale === value);

export const pickLocale = ({ text, locale }: { text: Localised; locale: Locale }): string =>
	text[locale] ?? text.en;

/** Site-root-relative path of the static CV page for a locale (see src/routes/cv). */
export const cvPath = (locale: Locale): string => (locale === 'en' ? '/cv/' : `/cv/${locale}/`);

/** Site-root-relative path of the map in a locale. */
export const mapPath = (locale: Locale): string => (locale === 'en' ? '/' : `/?lang=${locale}`);
