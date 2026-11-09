# AGENTS.md

Entry point for every AI coding agent working in this repository (Claude Code,
Codex, Cursor, Copilot, and the rest). It is short on purpose: the detail lives
in [`docs/ai/`](./docs/ai/README.md).

## What this repo is

`ventilii-graph` is Antonio Ventilii's portfolio at
[ventilii.dev](https://ventilii.dev): an interactive career map, static CV pages
in three languages, and an AI version of the portfolio at `/ask`.

- `src/`: a prerendered SvelteKit 3 site (`adapter-static`, Svelte 5 runes,
  Tailwind 4). Every route is built to its own HTML file and served by nginx.
- `server/`: the only server code, a `node:http` API behind `/ask` that calls
  the Claude API through `@anthropic-ai/sdk`, its one runtime dependency. It reads the same portfolio data as the site.
- One image (`Dockerfile`, `nginx.conf`, `docker/start.sh`) on Fly.io, deployed
  by release-please tags.

How it is built and deployed, the AI API's limits and its env vars:
[`README.md`](./README.md). Do not restate it elsewhere; link it.

## Commands

| Command             | What it does                                        |
| ------------------- | --------------------------------------------------- |
| `npm ci`            | Install (Node version in `.node-version`)           |
| `npm run dev`       | Site on 5173, proxies `/api` to 8787                |
| `npm run dev:api`   | The AI API on 8787 (reads `.env`)                   |
| `npm run check`     | `svelte-check` on the site and `tsc` on `server/`   |
| `npm run lint`      | Prettier check and ESLint                           |
| `npm run format`    | Prettier write and ESLint fix                       |
| `npm run build`     | `tsc --noEmit` and the prerendered site in `build/` |
| `npm run build:api` | esbuild bundle of the API in `build-api/`           |
| `docker build .`    | Builds the image only; CI then runs and probes it   |

## Layout

```
src/lib/services/portfolio.services.ts   all portfolio content (the single source)
src/lib/types/                           portfolio and /ask contract types
src/lib/utils/                           pure helpers, copy tables, SEO constants
src/lib/services/                        content, graph layout, the /ask client
src/lib/stores/                          theme store, per-mode AI request state
src/lib/components/{graph,panel,layout,ui,icons,cv,ai}/
src/routes/                              /, /cv/, /cv/it/, /cv/pt/, /ask/
server/                                  the /ask API (index, modes, knowledge, OIDC)
static/                                  shipped as is (llms.txt, sitemap, CV PDF)
```

Full taxonomy and where new code goes: [`docs/ai/structure.md`](./docs/ai/structure.md).

## The standard

Every change follows the universal code standard:
**https://github.com/AntonioVentilii/officina/blob/main/standards/code.md**.
It is not copied here. This repository adds only:

1. **Content lives once.** Every fact about Antonio is in
   `src/lib/services/portfolio.services.ts`. The map, the CV pages and the AI
   (`server/knowledge.ts`) all read it. Never write portfolio facts into a
   component, a prompt or a test fixture.
2. **Three locales, always.** `Locale` is `'en' | 'it' | 'pt'`
   (`src/lib/types/portfolio.types.ts`). Content is `Localised` and read with
   `pickLocale`; UI copy is a `Record<Locale, string>` table. A new string ships
   in all three languages in the same PR.
3. **Imports in `src/` use `#lib/...`**, never `../`; ESLint enforces it.
   `server/` imports `../src/lib/...` with the `.ts` extension, because Node runs
   it from source.
4. **Object parameters.** Functions take one object (`({ text, locale })`), as
   the oisy ESLint config's `prefer-object-params` rule requires. Only a
   framework signature (`node:http` handlers) may disable it, with a reason.
5. **Every route is prerendered.** No SSR at runtime, no `+page.server.ts`, no
   form actions. Client-only state (locale via `?lang=`, theme) is read in
   `onMount`.
6. **The `/ask` API spends real money.** Never weaken a limit, the budget, the
   same-site check, the guard or the clean-up pass in `server/` without the
   owner saying so. See [`docs/ai/governance.md`](./docs/ai/governance.md).
7. **Writing.** No em or en dashes anywhere, the site's copy included (history:
   `e97b0d7`, `835b854`). Use a colon, a comma or a middot.

## You are about to... read first

| You are about to...                               | Read first                                                                     |
| ------------------------------------------------- | ------------------------------------------------------------------------------ |
| Open any PR                                       | [`docs/ai/pr-and-ci.md`](./docs/ai/pr-and-ci.md)                               |
| Add or move a file                                | [`docs/ai/structure.md`](./docs/ai/structure.md)                               |
| Add a component, util, constant or type           | [`docs/ai/reusability.md`](./docs/ai/reusability.md)                           |
| Write a store, a service, a component or API code | [`docs/ai/patterns.md`](./docs/ai/patterns.md)                                 |
| Change a project, a role or any portfolio fact    | [`docs/ai/workflows/update-content.md`](./docs/ai/workflows/update-content.md) |
| Change `/ask`: prompt, schema, limits, copy       | [`docs/ai/workflows/change-ask.md`](./docs/ai/workflows/change-ask.md)         |
| Add a page or a locale                            | [`docs/ai/workflows/add-route.md`](./docs/ai/workflows/add-route.md)           |
| Move a dependency to a new major version          | [`docs/ai/workflows/major-upgrade.md`](./docs/ai/workflows/major-upgrade.md)   |
| Touch `Dockerfile`, `nginx*.conf`, CI or release  | [`docs/ai/governance.md`](./docs/ai/governance.md)                             |
| Verify a change                                   | [`docs/ai/testing.md`](./docs/ai/testing.md)                                   |

## Truth hierarchy

Highest wins. On a contradiction, stop and ask.

1. Code (`src/**`, `server/**`).
2. CI (`.github/workflows/**`).
3. CODEOWNERS (none yet in this repo).
4. `docs/ai/**`.
5. This file.
6. Tool layers (`CLAUDE.md`, `.cursor/rules`, copilot instructions): pointers only.

## Meta-update rule

A PR that adds a pattern, a shared component or util, a naming convention, a
policy or a workflow updates the matching `docs/ai/**` page in the same PR.
Which page for which change: [`docs/ai/governance.md#meta-update-map`](./docs/ai/governance.md#meta-update-map).
