import { portfolioData } from '$lib/services/portfolio.services';
import { cvPath } from '$lib/utils/locale.utils';

/** Canonical origin of the deployed site; keep in sync with static/sitemap.xml. */
export const SITE_ORIGIN = 'https://ventilii.dev';

/** Absolute URL for a site-root-relative path, for canonical/OG metadata. */
export const absoluteUrl = (path: string): string => new URL(path, SITE_ORIGIN).href;

/**
 * Securely stringifies a JSON-LD object for embedding in a <script> tag.
 * This prevents XSS by escaping characters that could be interpreted as HTML tags,
 * specifically the sequence "</script>".
 */
export const serializeSchema = (schema: object): string =>
	JSON.stringify(schema)
		.replace(/</g, '\\u003c')
		.replace(/>/g, '\\u003e')
		.replace(/&/g, '\\u0026')
		.replace(/\u2028/g, '\\u2028')
		.replace(/\u2029/g, '\\u2029');

/** Topics for JSON-LD knowsAbout / Occupation skills, shared by the graph and CV pages. */
export const PERSON_KNOWS_ABOUT = [
	'TypeScript',
	'JavaScript',
	'Rust',
	'Python',
	'Svelte',
	'React',
	'Tailwind CSS',
	'AI agent orchestration',
	'Agentic engineering',
	'Coding agents',
	'Claude Code',
	'Model Context Protocol (MCP)',
	'Multi-agent workflows',
	'LLM integration',
	'AI-assisted code review',
	'Internet Computer (ICP)',
	'Ethereum (EVM)',
	'Solana',
	'Web3',
	'Smart contracts',
	'Trading systems',
	'Quantitative finance'
];

/** Social-share banner (1600x838, 1.91:1) used as og:image on all pages. */
export const OG_IMAGE = absoluteUrl('/images/og-banner.jpg');
export const OG_IMAGE_WIDTH = '1600';
export const OG_IMAGE_HEIGHT = '838';
export const OG_IMAGE_ALT = 'Antonio Ventilii · AI-Native Senior Software Engineer';

/** Author name for meta[name=author], derived from the portfolio data source. */
export const SITE_AUTHOR = portfolioData.person.name;

/**
 * Canonical author profile URL for article:author, which Open Graph defines as a URL.
 * The English CV page is the site's own og:type=profile page for the author.
 */
export const SITE_AUTHOR_URL = absoluteUrl(cvPath('en'));

/** First publication of the site (ISO 8601), for article:published_time. */
export const SITE_PUBLISHED_TIME = '2026-03-27T00:00:00+00:00';

/** Last content update (ISO 8601); keep in sync with static/sitemap.xml lastmod. */
export const SITE_MODIFIED_TIME = '2026-09-01T00:00:00+00:00';
