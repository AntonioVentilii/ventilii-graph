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

## A page for one reader

`/for/<slug>/` (`src/routes/for/[slug]/`) is a visit page written for one
reader: one screen, a job posting read as a code review. The diff swaps the
seat asked for (`from`) for the seat offered (`to`), then one row per
requirement marked direct, adjacent or missing, then one line of plain text
and the links (Fit check, Break my AI, CV, email). Model: the first entry in
`VISIT_RECIPIENTS`.

1. Add an entry to `VISIT_RECIPIENTS` in `src/lib/utils/visit-recipients.utils.ts`:
   a random slug (`openssl rand -hex 4`) and its posting (reuse an existing
   `VisitPosting` when the post is the same). `entries` in `+page.ts`
   prerenders it; any other slug is a 404.
2. Each requirement points at map ids (`project:...`, `experience:...`) as its
   evidence, with at most one short clause; an adjacent or missing one always
   says how. Every claim must already be in the portfolio: a fact missing from
   it goes into `portfolio.services.ts` first
   ([update-content.md](./update-content.md)). Run the site's own Fit check on
   the posting and keep the rows in line with it.
3. The page is `noindex`, not in the sitemap, not in `static/llms.txt`, and
   not linked from the map. Do not add it to any of them.
4. The repository is public: an entry never names the reader, their company
   or the company hiring, in the code, the tests, the CI probe, the commit or
   the PR. The slug says nothing about them and the role stays general. Ask
   the owner before adding one.

## A new locale

Ask the owner before starting. The list is `LOCALES` and `Localised` in
`portfolio.types.ts`; the type checker then points at every `Record<Locale, ...>`
that needs the new entry (`HTML_LANG`, `OG_LOCALE`, `LANGUAGE_LABEL`,
`LANGUAGE_NAMES` in `server/modes.ts`, every copy table). Then `L.en` in
`portfolio.services.ts`, a `/cv/<locale>/` route, the sitemap and the probes.

Verify with the local gates and `npm run build`, then open the page in
`npm run preview`.
