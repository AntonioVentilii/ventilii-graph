# Structure

The folders as they are today, where each kind of new code goes, and which way
imports point.

## Taxonomy

| Path                                               | Holds                                                                                                                                                                        |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/routes/`                                      | Thin route files: `+page.ts` sets prerender, `+page.svelte` renders one app component and its `<svelte:head>`                                                                |
| `src/lib/components/PortfolioApp.svelte`           | The map's shell: URL state, locale, the map's UI copy, layout of header, graph, panel                                                                                        |
| `src/lib/components/graph/`                        | The interactive map: hub, orbit nodes, live edges                                                                                                                            |
| `src/lib/components/panel/`                        | Side panel and the leaf detail card, one `*Detail.svelte` per leaf kind                                                                                                      |
| `src/lib/components/layout/`                       | Header, footer, toggles, locale select, skip link                                                                                                                            |
| `src/lib/components/ui/`                           | Small presentational pieces with no data access                                                                                                                              |
| `src/lib/components/icons/`                        | Brand icons that `@lucide/svelte` does not ship                                                                                                                              |
| `src/lib/components/cv/`                           | `StaticCv.svelte`, the flat CV used by all three `/cv/` routes                                                                                                               |
| `src/lib/components/ai/`                           | The `/ask` page: `AskApp` shell, one `*Mode.svelte` per mode, their parts                                                                                                    |
| `src/lib/services/`                                | `portfolio.services.ts` (all content), `graph-layout.services.ts` (pure layout maths), `ai.services.ts` (fetch client for `/api`)                                            |
| `src/lib/stores/`                                  | `theme.store.ts` (Svelte store), `ai-request.svelte.ts` (runes class)                                                                                                        |
| `src/lib/utils/`                                   | Pure helpers and constant tables: locale, leaf ids, relations, SEO, `/ask` copy                                                                                              |
| `src/lib/types/`                                   | `portfolio.types.ts` (content model), `ai.types.ts` (the site and API contract)                                                                                              |
| `src/lib/styles/`                                  | Theme CSS variables and the graph's keyframes, imported by `src/app.css`                                                                                                     |
| `src/hooks.server.ts`                              | Stamps `<html lang>` at prerender time                                                                                                                                       |
| `server/`                                          | The `/ask` API. `index.ts` HTTP, limits; `cache.ts` the cache; `modes.ts` prompt, schemas, clean-up; `knowledge.ts` portfolio text; `fly-oidc.ts`, `oidc-helper.ts` Fly OIDC |
| `static/`                                          | Shipped verbatim: `llms.txt`/`llm.txt`, `sitemap.xml`, `robots.txt`, CV PDF, fonts, images                                                                                   |
| `design/`                                          | Banner sources; not deployed                                                                                                                                                 |
| `docker/`, `Dockerfile`, `nginx*.conf`, `fly.toml` | The production image                                                                                                                                                         |

## Where new code goes

| New thing                                 | Goes in                                                                                       |
| ----------------------------------------- | --------------------------------------------------------------------------------------------- |
| A fact about Antonio                      | `src/lib/services/portfolio.services.ts`, typed by `portfolio.types.ts`                       |
| A new field on the content model          | `portfolio.types.ts`, then the renderers: panel, `StaticCv`, `server/knowledge.ts`            |
| A pure function over content or ids       | `src/lib/utils/<concern>.utils.ts` (extend an existing file first)                            |
| A constant table or copy for `/ask`       | `src/lib/utils/ask-copy.utils.ts`                                                             |
| A label table for a content enum          | next to its helper, as `STATUS_LABELS` in `project.utils.ts`                                  |
| Geometry or layout maths for the map      | `graph-geometry.utils.ts` (small) or `graph-layout.services.ts`                               |
| A type shared by the site and the API     | `src/lib/types/ai.types.ts`                                                                   |
| Reactive state shared by components       | `src/lib/stores/`, a `*.svelte.ts` class with runes                                           |
| A call to `/api`                          | `src/lib/services/ai.services.ts`                                                             |
| A presentational piece used twice or more | `src/lib/components/ui/`                                                                      |
| A piece of one feature                    | that feature's folder (`graph/`, `panel/`, `ai/`, ...)                                        |
| A page                                    | `src/routes/<path>/+page.{ts,svelte}`; see [workflows/add-route.md](./workflows/add-route.md) |
| API behaviour                             | `server/modes.ts` for prompts and output, `server/index.ts` for transport and limits          |

Name files by what they are: `*.services.ts`, `*.utils.ts`, `*.store.ts` or
`*.svelte.ts` (runes), `*.types.ts`, `PascalCase.svelte`. No new top-level
folder without asking.

## Direction of dependencies

```
routes -> components -> stores, services, utils, types   (any of them)
          stores     -> services, utils, types
          services   -> utils, types   (utils may read portfolio.services.ts)
          utils      -> types
server/ -> src/lib/{services/portfolio,types}   (never the other way)
```

Components import whichever layer they need directly (`PortfolioApp.svelte`
reads utils, `DetailPanel.svelte` reads `portfolioData`, the `/ask` modes use
`AiRequestState`); what never happens is a lower layer importing a higher one.

- `types/` imports only other types.
- `utils/` may read `portfolioData` (as `leaf.utils.ts` and `relations.utils.ts`
  do) but never a component, a store or `ai.services.ts`.
- `ui/` components take props and render; they do not import `portfolioData`.
- `server/` may import `portfolio.services.ts`, `portfolio.types.ts` and
  `ai.types.ts`, and nothing that touches the DOM or `$app/*`. `src/` never
  imports from `server/`.
- The site reaches the API only over HTTP, through `ai.services.ts`.
