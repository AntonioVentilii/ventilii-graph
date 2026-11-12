import { LOCALES } from '#lib/types/portfolio.types.ts';
import { askPath } from '#lib/utils/ask-copy.utils.ts';
import { cvPath, mapPath } from '#lib/utils/locale.utils.ts';
import { CV_ALTERNATES, SITE_MODIFIED_TIME, absoluteUrl } from '#lib/utils/seo.utils.ts';

export const prerender = true;

interface SitemapUrl {
	path: string;
	priority: string;
	alternates?: { hreflang: string; href: string }[];
}

const URLS: SitemapUrl[] = [
	{ path: mapPath('en'), priority: '1.0' },
	{ path: askPath('en'), priority: '0.8' },
	...LOCALES.map((locale) => ({
		path: cvPath(locale),
		priority: locale === 'en' ? '0.9' : '0.8',
		alternates: CV_ALTERNATES
	}))
];

const LASTMOD = SITE_MODIFIED_TIME.slice(0, 10);

const urlEntry = ({ path, priority, alternates = [] }: SitemapUrl): string =>
	[
		'  <url>',
		`    <loc>${absoluteUrl(path)}</loc>`,
		`    <lastmod>${LASTMOD}</lastmod>`,
		'    <changefreq>monthly</changefreq>',
		`    <priority>${priority}</priority>`,
		...alternates.map(
			({ hreflang, href }) =>
				`    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}"/>`
		),
		'  </url>'
	].join('\n');

export const GET = (): Response =>
	new Response(
		[
			'<?xml version="1.0" encoding="UTF-8"?>',
			'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
			'        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
			...URLS.map(urlEntry),
			'</urlset>',
			''
		].join('\n'),
		{ headers: { 'content-type': 'application/xml' } }
	);
