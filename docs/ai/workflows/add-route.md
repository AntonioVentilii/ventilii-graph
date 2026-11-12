# Add a page or a locale

Rare but wide: each one touched the routes, the SEO files and the image probes.
Models: `af0bb1d` (the `/cv/` pages), `f074e86`'s `/ask` route.

## A new page

1. `src/routes/<path>/+page.ts`: `prerender = true`, `ssr = true` and
   `trailingSlash = 'always'`, as every existing route sets them (the layout
   sets only `prerender` and `ssr`; the trailing slash is per route, and nginx
   and the probes expect `/<path>/`).
2. `src/routes/<path>/+page.svelte`: the `<svelte:head>` from the constants in
   `src/lib/utils/seo.utils.ts` (canonical with `absoluteUrl`, `og:*`,
   `twitter:*`), and one app component from `src/lib/components/<feature>/`.
   No logic in the route file.
3. A path helper next to its siblings (`cvPath` in `locale.utils.ts`, `askPath`
   in `ask-copy.utils.ts`) if other pages link to it.
4. Add the URL to `static/sitemap.xml` and, if crawlers should know it,
   `static/llms.txt` (also served as `/llm.txt`).
5. Add `check /<path>/ 200` to the `docker` job in
   `.github/workflows/checks.yml` (a CI file: say so in the PR body).
6. If nginx needs a rule for it (headers, caching), that is `nginx.conf`: ask
   first.

## A new locale

A locale is spelled in several places today (see the anti-patterns in
[../patterns.md](../patterns.md)). Until they are one list, a new locale must
touch all of them: `Locale` and `Localised` in `portfolio.types.ts`, `LOCALES`
in `locale.utils.ts` and `server/index.ts`, `LANGUAGE_NAMES` in
`server/modes.ts`, the `?lang=` checks in `PortfolioApp.svelte` and
`AskApp.svelte`, `<html lang>` in `src/hooks.server.ts`, `AskApp.svelte` and
`StaticCv.svelte`, `ogLocale` and `localeNav` in `StaticCv.svelte`, `L.en` in
`portfolio.services.ts`, every copy table, a `/cv/<locale>/` route, the sitemap
and the probes. Ask the owner before starting.

Verify with the local gates and `npm run build`, then open the page in
`npm run preview`.
