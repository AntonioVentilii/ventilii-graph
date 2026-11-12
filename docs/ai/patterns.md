# Patterns

The patterns this repository really uses, each with an example to copy. New
code follows them; it does not bring a new one. Below them, the anti-patterns
already in the code, named so nobody copies them.

## Content and locales

- **One content object.** `portfolioData` in
  `src/lib/services/portfolio.services.ts:12` is the whole portfolio, typed by
  `PortfolioData` (`src/lib/types/portfolio.types.ts:97`). Every renderer reads
  it: the panel, `StaticCv.svelte`, the search, and the AI through
  `server/knowledge.ts:45`. Strings in it are built with `L.en(en, it, pt)`
  (`portfolio.services.ts:3`).
- **`Localised` plus `pickLocale`.** Content strings are `Localised`
  (`portfolio.types.ts:6`, English required, others optional) and are read with
  `pickLocale({ text, locale })` (`src/lib/utils/locale.utils.ts:20`), which
  falls back to English.
- **UI copy as `Record<Locale, string>` tables, one module per page.** Every
  string is in `ASK_COPY` (`src/lib/utils/ask-copy.utils.ts:6`), `MAP_COPY`
  (`map-copy.utils.ts`) or `CV_COPY` (`cv-copy.utils.ts`), read through
  `askCopy`, `mapCopy` or `cvCopy` with `{ key, locale }` (`ask-copy.utils.ts:441`);
  components alias it as `t` or `tr` (`src/lib/components/ai/DeckMode.svelte:24`).
  A string two pages share goes next to its concept: the language menu's label
  is `LANGUAGE_LABEL` in `locale.utils.ts`, read by `LocaleSelect` itself. Labels for a content enum
  live next to their helper: `STATUS_LABELS` in `src/lib/utils/project.utils.ts:4`.
- **One locale list.** `LOCALES` (`src/lib/types/portfolio.types.ts`) is the
  list the `Locale` type, the menus, the hreflang links and the API read; every
  per-locale mapping (`HTML_LANG`, `OG_LOCALE`) is a `Record<Locale, string>` in
  `src/lib/utils/locale.utils.ts`.
- **Locale is client state.** Pages are prerendered in English (the CV pages
  are prerendered per locale); `?lang=` is read in `onMount` with `parseLocale`
  (`src/lib/components/PortfolioApp.svelte:19`). Links carry it with
  `mapPath`, `cvPath`, `askPath` and `evidenceLink` (`locale.utils.ts`,
  `ask-copy.utils.ts:451`, `src/lib/utils/evidence.utils.ts:11`).

## Leaf ids

Every kind of map item is in `LEAF_KINDS` (`src/lib/utils/leaf.utils.ts:10`),
with its category and its items next to it. A leaf is written `kind:id`
(`project:officina`) by `leafKey` (`leaf.utils.ts:46`): the same string is the
URL's `?item=`, the graph's node keys, the ids in the AI's portfolio text and
`EVIDENCE_IDS` (`server/knowledge.ts:122`). Parse it with `parseLeaf`
(`leaf.utils.ts:64`), label it with `leafLabel` (`leaf.utils.ts:59`), link it
with `evidenceLink`. A new kind is one entry in `LEAF_KINDS` and its two records,
then its detail component.

## Functions

- **One object parameter**, destructured, with an explicit return type:
  `projectMeta({ project, locale }): string | undefined`
  (`project.utils.ts:20`). The oisy ESLint config's `prefer-object-params` rule
  enforces it; single-primitive helpers such as `cvPath(locale)` are allowed.
- **Arrow function constants**, exported by name; no default exports outside
  `.svelte` files.
- **Comments say why.** See the cost-guard block in `server/index.ts:27` or
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
  (`server/index.ts:111`) turns unknown JSON into an `AiRequest` or `undefined`;
  every reply goes through `send` (`server/index.ts:268`) with a status and an
  `AiResponse`. Internal failures are small `Error` subclasses
  (`RefusedError`, `UncountedError`, `server/index.ts:176`) mapped to codes in
  `handleGenerate` (`server/index.ts:314`).
- **Model output is never trusted.** Structured outputs fix the shape
  (`SCHEMAS`, `server/modes.ts:199`); `cleanResult` (`server/modes.ts:391`)
  trims lengths, drops unknown evidence ids and inline ids; `leaksNotes`
  (`server/modes.ts:324`) withholds an answer that repeats private notes.
  On the page, model text renders only through `RichText.svelte`, never
  `{@html}`.
- **Configuration is read once, at the top of the module,** from env with a
  default (`server/claude.ts:12`). Constants stay in the module that owns them.
  A count, an amount or a price goes through `positiveNumberEnv`
  (`server/env.ts`), which keeps the default unless the value is a finite
  number above zero; the port goes through `portEnv` (1 to 65535).

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
- **SEO head per route**, built from the constants in `src/lib/utils/seo.utils.ts`,
  with `OgImageMeta` and `TwitterMeta` for the banner tags every page shares
  (`src/routes/ask/+page.svelte`); JSON-LD goes through `serializeSchema`. The
  sitemap is a prerendered endpoint built from the same constants
  (`src/routes/sitemap.xml/+server.ts`), never a file in `static/`.

## Anti-patterns in the code today (do not copy)

- **Long files**: `graph-layout.services.ts`, `StaticCv.svelte`,
  `ask-copy.utils.ts`. Add to them only what belongs to their
  concern; split along the section comments when a change allows it.
- **Hand-synced copies**: `static/llms.txt` restates portfolio content.
- **`AI_EFFORT` is cast unchecked** in `server/claude.ts`. Narrow it with a
  guard instead, as `isThemeMode` does in `theme.store.ts`.
- **Copy-pasted markup**: the author, article and JSON-LD
  lines of `StaticCv.svelte` and `routes/+page.svelte`. Extract a component
  before adding a third copy.
