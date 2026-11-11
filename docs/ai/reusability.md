# Reusability catalog

Everything shared in this repository, one line each. Search here, then in the
code, before writing a component, a helper, a constant or a type. Extend what
exists. A PR that adds or removes a shared piece updates this page.

A piece marked unused is imported nowhere today. Reuse it, or delete it in a
PR of its own; do not write a second one beside it.

## Content and types

| Path                                     | What                                                                                                                                                                                                 |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/lib/services/portfolio.services.ts` | `portfolioData`: every fact on the site and in the AI's knowledge                                                                                                                                    |
| `src/lib/types/portfolio.types.ts`       | `Locale`, `Localised`, `Person`, `Category`, `Experience`, `Project`, `ProjectStatus`, `Technology`, `Education`, `EducationDegree`, `LanguageEntry`, `AboutBlock`, `PortfolioData`                  |
| `src/lib/types/ai.types.ts`              | The `/ask` contract: `AiMode`, `AiRequest` and its three modes, `AskResult`, `FitResult`, `DeckResult` and parts, `EvidenceRef`, `Guard`, `AiErrorCode`, `AiResponse`, `AiHealth`, `AI_INPUT_LIMITS` |

## Utils (`src/lib/utils/`)

| Export                                                                                       | What                                                            |
| -------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `locale.utils.ts` `LOCALES`                                                                  | The three locales, in order (exported but unused: see below)    |
| `locale.utils.ts` `pickLocale`                                                               | `Localised` to string, English fallback                         |
| `locale.utils.ts` `LANGUAGE_LABEL`                                                           | The language menu's label in each locale                        |
| `locale.utils.ts` `cvPath`                                                                   | `/cv/`, `/cv/it/`, `/cv/pt/` for a locale                       |
| `leaf.utils.ts` `LEAF_KINDS`, `LeafKind`                                                     | Every kind of map item, the one list                            |
| `leaf.utils.ts` `Leaf`                                                                       | A map item: `{ kind, id }`                                      |
| `leaf.utils.ts` `leafKey`                                                                    | A `Leaf` to `'project:officina'`                                |
| `leaf.utils.ts` `allLeafKeys`                                                                | Every leaf on the map as `kind:id`                              |
| `leaf.utils.ts` `parseLeaf`                                                                  | `'project:officina'` to a `Leaf`, or `null`                     |
| `leaf.utils.ts` `leafLabel`                                                                  | Localised label of a leaf                                       |
| `leaf.utils.ts` `leavesForCategory`                                                          | All leaves of a category id                                     |
| `leaf.utils.ts` `categoryForLeafKind`                                                        | Category id of a leaf kind                                      |
| `leaf.utils.ts` `searchLeaves`                                                               | Search box matches over experiences, projects, stack, education |
| `evidence.utils.ts` `evidenceLink`                                                           | Evidence id to `{ label, href }` deep link on the map           |
| `relations.utils.ts` `relatedProjectsForStack`                                               | Projects using a technology                                     |
| `relations.utils.ts` `relatedStackForProject`                                                | Technologies of a project                                       |
| `project.utils.ts` `projectStatusLabel`                                                      | Localised label of a `ProjectStatus`                            |
| `project.utils.ts` `projectMeta`                                                             | "Sep 2026-present · In private use" line                        |
| `graph-geometry.utils.ts` `categoryAngle`                                                    | Angle of a category on the ring                                 |
| `graph-geometry.utils.ts` `leafAnglesOpenRing`                                               | Leaf angles on the 240 degree open ring                         |
| `graph-geometry.utils.ts` `ringFloatStyle`                                                   | Staggered float animation style for a seed                      |
| `seo.utils.ts` `SITE_ORIGIN`, `absoluteUrl`                                                  | Canonical origin and absolute URLs                              |
| `seo.utils.ts` `serializeSchema`                                                             | Safe JSON-LD for `{@html}` in a `<script>`                      |
| `seo.utils.ts` `PERSON_KNOWS_ABOUT`                                                          | JSON-LD `knowsAbout` topics                                     |
| `seo.utils.ts` `OG_IMAGE*`                                                                   | Social banner URL, size and alt                                 |
| `seo.utils.ts` `SITE_AUTHOR`, `SITE_AUTHOR_URL`, `SITE_PUBLISHED_TIME`, `SITE_MODIFIED_TIME` | Author and date metadata                                        |
| `map-copy.utils.ts` `MAP_COPY`, `mapCopy`                                                    | Every map string in three locales, and its reader               |
| `cv-copy.utils.ts` `CV_COPY`, `cvCopy`                                                       | Every CV page string in three locales, and its reader           |
| `ask-copy.utils.ts` `ASK_COPY`, `askCopy`                                                    | Every `/ask` string in three locales, and its reader            |
| `ask-copy.utils.ts` `askPath`                                                                | `/ask/` URL for a locale                                        |
| `ask-copy.utils.ts` `PROTECTION_POINTS`, `CHALLENGE_GOALS`, `HALL_OF_FAME`                   | The challenge rules and hall of fame                            |
| `ask-copy.utils.ts` `ASK_SUGGESTIONS`, `DECK_PRESETS`, `FIT_SAMPLES`                         | Starter prompts per mode                                        |

## Services and stores

| Path                                                                                   | What                                                      |
| -------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `services/graph-layout.services.ts` `computeGraphLayout`                               | Positions of hub, categories, leaves and edges for a view |
| `services/graph-layout.services.ts` `graphView`, `GraphView`                           | `root`, `category` or `leaf` from the selection           |
| `services/graph-layout.services.ts` `CAT_W`, `CAT_H`, `LEAF_CENTER_H` and layout types | Node sizes and result types                               |
| `services/ai.services.ts` `requestAi`                                                  | `POST /api/ai`, never throws except on abort              |
| `services/ai.services.ts` `fetchAiHealth`                                              | `GET /api/ai/health`, `undefined` on failure              |
| `stores/ai-request.svelte.ts` `AiRequestState`                                         | Per-mode loading, result, error and guard, with abort     |
| `stores/theme.store.ts` `theme`, `toggleTheme`, `initThemeFromStorage`                 | Light and dark mode                                       |

## Components: `ui/` (no data access, reuse first)

| Component               | What                                                  |
| ----------------------- | ----------------------------------------------------- |
| `BulletList.svelte`     | Muted bullet list of strings                          |
| `EntryHeader.svelte`    | Title (h1 or h2), subtitle and meta line of an entry  |
| `InlineNavLink.svelte`  | Link-styled button for in-map navigation              |
| `LinkList.svelte`       | Localised links with GitHub, LinkedIn or Lucide icons |
| `PanelEyebrow.svelte`   | Small uppercase label above a panel title             |
| `RelatedSection.svelte` | Bordered "related" block with a label and children    |
| `TagButton.svelte`      | Small tag-shaped button (stack and project chips)     |
| `Search.svelte`         | The map's search box with results and the shortcut    |

## Components: `layout/`

| Component              | What                                                    |
| ---------------------- | ------------------------------------------------------- |
| `Header.svelte`        | Skip link, search and `HeaderActions`                   |
| `HeaderActions.svelte` | `/ask` link, flatten, theme, GitHub link, locale select |
| `Footer.svelte`        | Copyright with `__BUILD_YEAR__`                         |
| `FlattenToggle.svelte` | Map to CV toggle (the CV page has the scatter one)      |
| `LocaleSelect.svelte`  | Locale `<select>` bound to the page locale              |
| `ThemeToggle.svelte`   | Light and dark switch                                   |
| `SkipToContent.svelte` | Skip link, visible on focus                             |

## Components: features

| Component                                                                     | What                                                  |
| ----------------------------------------------------------------------------- | ----------------------------------------------------- |
| `PortfolioApp.svelte`                                                         | The map's shell: URL state, locale, layout            |
| `graph/PortfolioGraph.svelte`                                                 | The map: hub, rings, selection, leaf card placement   |
| `graph/GraphHub.svelte`                                                       | Centre node with avatar; press and hold prints the CV |
| `graph/OrbitNode.svelte`                                                      | Category or leaf pill on a ring                       |
| `graph/GraphEdgesLive.svelte`                                                 | SVG edges that follow floating nodes                  |
| `panel/DetailPanel.svelte`                                                    | Side panel wrapping `PersonSummary`                   |
| `panel/PersonSummary.svelte`                                                  | Avatar, title, links, org highlights                  |
| `panel/LeafDetailCard.svelte`                                                 | Dispatches a leaf to its `*Detail.svelte`             |
| `panel/{Experience,Project,Technology,Education,Language,About}Detail.svelte` | One detail view per leaf kind                         |
| `cv/StaticCv.svelte`                                                          | The whole flat CV with head, JSON-LD and locale nav   |
| `ai/AskApp.svelte`                                                            | `/ask` shell: tabs, locale, health, protection rules  |
| `ai/AskMode.svelte`, `ai/FitMode.svelte`, `ai/DeckMode.svelte`                | One form and result per mode                          |
| `ai/DeckViewer.svelte`                                                        | Slide viewer for a `DeckResult`                       |
| `ai/RichText.svelte`                                                          | Safe render of model text: paragraphs, bullets, bold  |
| `ai/EvidenceChips.svelte`                                                     | Evidence ids as map links                             |
| `ai/RequestStatus.svelte`                                                     | A mode's thinking, guard or error note                |
| `ai/ErrorNote.svelte`                                                         | Localised message for an `AiErrorCode`                |
| `ai/GuardNote.svelte`                                                         | The off-topic or manipulation note with strikes left  |
| `ai/FieldCounter.svelte`                                                      | Characters left in a field                            |
| `ai/ThinkingIndicator.svelte`                                                 | Rotating "thinking" status                            |
| `icons/GithubIcon.svelte`, `icons/LinkedinIcon.svelte`                        | Brand marks Lucide does not ship                      |

## Styles

| Path                                 | What                                                        |
| ------------------------------------ | ----------------------------------------------------------- |
| `src/app.css`                        | Tailwind import, fonts, the colour and font `@theme` tokens |
| `src/lib/styles/theme-variables.css` | Light and dark CSS variables behind the tokens              |
| `src/lib/styles/portfolio-graph.css` | Graph keyframes and `animate-fade`                          |

## Server (`server/`)

| Export                                                   | What                                                     |
| -------------------------------------------------------- | -------------------------------------------------------- |
| `knowledge.ts` `KNOWLEDGE`                               | The portfolio as plain text with evidence ids            |
| `knowledge.ts` `EVIDENCE_IDS`                            | Every id the model may cite                              |
| `knowledge.ts` `BACKGROUND_NOTES`                        | `AI_PRIVATE_NOTES` normalised to bullets                 |
| `modes.ts` `SYSTEM_PROMPT`, `buildTurn`                  | Cached system prompt and the per-request user turn       |
| `modes.ts` `SCHEMAS`                                     | JSON schema per mode, guard fields first                 |
| `modes.ts` `cleanResult`, `readGuard`, `leaksNotes`      | Output clean-up, guard verdict, private-notes leak check |
| `cache.ts` `cacheKey`, `cacheGet`, `cachePut`, `Outcome` | The in-memory answer cache (6 hours, 500 entries)        |
| `fly-oidc.ts` `mintFlyIdentityToken`                     | OIDC token from the root helper's socket                 |
