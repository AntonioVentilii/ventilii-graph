# Patterns

The patterns this repository really uses, each with an example to copy. New
code follows them; it does not bring a new one. Below them, the anti-patterns
already in the code, named so nobody copies them.

## Content and locales

- **One content object.** `portfolioData` in
  `src/lib/services/portfolio.services.ts:12` is the whole portfolio, typed by
  `PortfolioData` (`src/lib/types/portfolio.types.ts:94`). Every renderer reads
  it: the panel, `StaticCv.svelte`, the search, and the AI through
  `server/knowledge.ts:45`. Strings in it are built with `L.en(en, it, pt)`
  (`portfolio.services.ts:3`).
- **`Localised` plus `pickLocale`.** Content strings are `Localised`
  (`portfolio.types.ts:3`, English required, others optional) and are read with
  `pickLocale({ text, locale })` (`src/lib/utils/locale.utils.ts:5`), which
  falls back to English.
- **UI copy as `Record<Locale, string>` tables.** For `/ask`, every string is in
  `ASK_COPY` (`src/lib/utils/ask-copy.utils.ts:6`), read through
  `askCopy({ key, locale })` (`ask-copy.utils.ts:442`); components alias it as
  `t` (`src/lib/components/ai/DeckMode.svelte:24`). Labels for a content enum
  live next to their helper: `STATUS_LABELS` in `src/lib/utils/project.utils.ts:4`.
- **Locale is client state.** Pages are prerendered in English (the CV pages
  are prerendered per locale); `?lang=` is read in `onMount`
  (`src/lib/components/PortfolioApp.svelte:19`). Links carry it with
  `cvPath`, `askPath` and `evidenceLink` (`locale.utils.ts:9`,
  `ask-copy.utils.ts:451`, `src/lib/utils/evidence.utils.ts:11`).

## Leaf ids

A map item is a `Leaf` (`src/lib/utils/leaf.utils.ts:5`), written as
`kind:id` (`project:officina`). The same string is the URL's `?item=`, the
evidence id the AI cites, and the key of `EVIDENCE_IDS`
(`server/knowledge.ts:115`). Parse it with `parseLeaf` (`leaf.utils.ts:78`),
label it with `leafLabel` (`leaf.utils.ts:49`), link it with `evidenceLink`.

## Functions

- **One object parameter**, destructured, with an explicit return type:
  `projectMeta({ project, locale }): string | undefined`
  (`project.utils.ts:20`). The oisy ESLint config's `prefer-object-params` rule
  enforces it; single-primitive helpers such as `cvPath(locale)` are allowed.
- **Arrow function constants**, exported by name; no default exports outside
  `.svelte` files.
- **Comments say why.** See the cost-guard block in `server/index.ts:29` or
  `vite.config.ts` around `__BUILD_YEAR__`.

## State

- **Runes class for request state.** `AiRequestState<M>`
  (`src/lib/stores/ai-request.svelte.ts:24`) holds `loading`, `result`, `error`
  and `guard` as `$state` fields and aborts the previous run with an
  `AbortController`. One instance per mode, created in the mode component.
- **Svelte store for global UI state.** `theme`
  (`src/lib/stores/theme.store.ts:6`) with `toggleTheme`; the first
  paint is set by the inline script in `src/app.html` to avoid a flash.
- **Component state** uses `$state`, `$derived`, `$effect`; props are typed by
  a local `interface Props` and read with `$props()`
  (`src/lib/components/panel/DetailPanel.svelte:6`).

## Data access and errors

- **The site and the API share one contract**, `src/lib/types/ai.types.ts`:
  requests (`AiRequest`), results, `AiResponse` as an `ok` discriminated union
  (`ai.types.ts:108`) and a closed list of `AiErrorCode` (`ai.types.ts:96`).
  A new error is a new code there plus its copy in `ASK_COPY`, rendered by
  `ErrorNote.svelte`.
- **The client never throws for an HTTP failure.** `requestAi`
  (`src/lib/services/ai.services.ts:14`) returns `{ ok: false, error: 'upstream' }`
  and rethrows only an abort; `fetchAiHealth` returns `undefined`.
- **The server validates by hand, then answers a typed body.** `parseRequest`
  (`server/index.ts:326`) turns unknown JSON into an `AiRequest` or `undefined`;
  every reply goes through `send` (`server/index.ts:517`) with a status and an
  `AiResponse`. Internal failures are small `Error` subclasses
  (`RefusedError`, `UncountedError`, `server/index.ts:425`) mapped to codes in
  `handleGenerate` (`server/index.ts:565`).
- **Model output is never trusted.** Structured outputs fix the shape
  (`SCHEMAS`, `server/modes.ts:199`); `cleanResult` (`server/modes.ts:391`)
  trims lengths, drops unknown evidence ids and inline ids; `leaksNotes`
  (`server/modes.ts:324`) withholds an answer that repeats private notes.
  On the page, model text renders only through `RichText.svelte`, never
  `{@html}`.
- **Configuration is read once, at the top of the module,** from env with a
  default (`server/index.ts:25`). Constants stay in the module that owns them.

## Components

- **Feature shell plus parts.** `PortfolioApp.svelte` and `AskApp.svelte` own
  URL state and locale; children receive `locale` and callbacks such as
  `onSelectLeaf`.
- **One detail component per leaf kind** (`ExperienceDetail`, `ProjectDetail`,
  ...), dispatched by `LeafDetailCard.svelte`. A new leaf kind gets its own.
- **Tailwind classes with theme tokens** (`bg-card`, `border-border`,
  `text-accent`) from `src/app.css` and `src/lib/styles/theme-variables.css`;
  no raw colours in components.
- **Icons** from `@lucide/svelte`; the two brand marks it lacks are in
  `components/icons/`.
- **SEO head per route**, built from the constants in `src/lib/utils/seo.utils.ts`
  (`src/routes/ask/+page.svelte`); JSON-LD goes through `serializeSchema`.

## Anti-patterns in the code today (do not copy)

- **The leaf kinds are spelled in many places**: the `Leaf` union and four
  switches in `leaf.utils.ts`, `ID_TYPES` in `server/modes.ts:208`,
  `EVIDENCE_IDS` in `server/knowledge.ts:115`, and a second `item` parser in
  `PortfolioApp.svelte:30` that casts with `as Leaf['kind']` instead of calling
  `parseLeaf`. A new kind must touch all of them; the fix is one list.
- **The locale list is repeated**: `LOCALES` in `locale.utils.ts:3` (imported by
  nothing) and again in
  `server/index.ts:125`; the `?lang=` check in `PortfolioApp.svelte:25` and
  `AskApp.svelte:47`; `pt-BR` for `<html lang>` in `src/hooks.server.ts:10`,
  `AskApp.svelte:72` and `StaticCv.svelte:72`; the locale nav in
  `StaticCv.svelte:76`. Use `LOCALES` and add any per-locale mapping next to it.
- **Map and CV copy live inside components** (`t` in `PortfolioApp.svelte:40`
  and `StaticCv.svelte:43`), while `/ask` keeps its copy in a utils module.
  `src/routes/ask/+page.svelte:14` repeats the English `ASK_COPY.metaTitle` and
  description as literals.
- **`searchLeaves`** (`leaf.utils.ts:97`) repeats one loop per kind, matches
  only English and Italian, and skips languages and about.
- **Long files**: `server/index.ts` (about 690 lines: config, pricing, limits,
  cache, parsing, IP keys, generation, HTTP), `graph-layout.services.ts`,
  `StaticCv.svelte`, `ask-copy.utils.ts`. Add to them only what belongs to their
  concern; split along the section comments when a change allows it.
- **Hand-synced copies**: `static/llms.txt` and `static/llm.txt` are identical
  and restate portfolio content; `SITE_MODIFIED_TIME` (`seo.utils.ts:68`)
  mirrors `<lastmod>` in `static/sitemap.xml`.
- **Casts instead of checks**: `initial as 'light' | 'dark'`
  (`theme.store.ts:7`), `AI_EFFORT` cast unchecked (`server/index.ts:27`). Narrow
  with a guard instead.
- **`prefers-reduced-motion`** is queried inline in `PortfolioApp.svelte:136`,
  `PortfolioGraph.svelte:54` and `:102`, and `GraphEdgesLive.svelte:231`.
- **Copy-pasted markup**: the submit row of `AskMode.svelte`, `FitMode.svelte`
  and `DeckMode.svelte`; the JSON-LD and SEO head of `StaticCv.svelte` and
  `routes/+page.svelte` (and `routes/ask/+page.svelte`); the related-items list
  of `ExperienceDetail.svelte` and `TechnologyDetail.svelte`; two branches of
  `OrbitNode.svelte`. Extract a component before adding a fourth copy.
