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
4. Add the URL to `URLS` in `src/routes/sitemap.xml/+server.ts` and, if crawlers should know it,
   `static/llms.txt` (also served as `/llm.txt`).
5. Add `check /<path>/ 200` to the `docker` job in
   `.github/workflows/checks.yml` (a CI file: say so in the PR body).
6. If nginx needs a rule for it (headers, caching), that is `nginx.conf`: ask
   first.

## A new locale

Ask the owner before starting. The list is `LOCALES` and `Localised` in
`portfolio.types.ts`; the type checker then points at every `Record<Locale, ...>`
that needs the new entry (`HTML_LANG`, `OG_LOCALE`, `LANGUAGE_LABEL`,
`LANGUAGE_NAMES` in `server/modes.ts`, every copy table). Then `L.en` in
`portfolio.services.ts`, a `/cv/<locale>/` route, the sitemap and the probes.

Verify with the local gates and `npm run build`, then open the page in
`npm run preview`.
