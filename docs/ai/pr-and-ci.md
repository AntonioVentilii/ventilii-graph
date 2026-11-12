# PRs and CI

## Title

A Conventional Commit, enforced by the `pr-title` job in
`.github/workflows/checks.yml`:

```
type(scope)!: description
```

`type` is one of `feat fix perf deps revert docs style chore refactor test build ci`.
PRs are squash merged, so the title becomes the commit on `main` and the
`CHANGELOG.md` line (sections in `release-please-config.json`). `feat` and `fix`
cut a release; write the description for a reader of the changelog, in the
present tense, lower case.

Scopes the history uses: `ai`, `ask`, `content`, `seo`, `hosting`, `deps`,
`changelog`. Examples:

- `fix(ask): key the per-IP limits on the /64 for IPv6 visitors`
- `feat(content): add Officina and recent projects, with dates and status`
- `build(deps): move to SvelteKit 3 and adapter-static 4`

Never write another PR's number in a title (see [governance.md](./governance.md)).

## Body

No template file exists. Write a short body: why the change, what changed, how
it was verified (the gates run, a route checked in the browser, a probe added).
Never start a line with `Test:` or `Fix:`. No AI attribution lines.

## Local gates, before every PR

```bash
npm run format
npm run lint
npm run check
npm run build
```

Touching `Dockerfile`, `nginx*.conf` or `docker/`: also build and run the image
(`README.md`, "Local image").

## The quality gate

`npm run lint` (the CI `lint` job) runs, after Prettier:

- **ESLint** (`eslint.config.js`): the oisy config (no explicit `any`, object
  params, `#lib/` imports) plus `complexity` 15, `max-depth` 4 and `max-lines`
  400 (blank lines and comments not counted), and `no-restricted-imports`
  boundaries that enforce the direction in [structure.md](./structure.md).
  Files over a limit today are pinned at their current value in `BASELINE`.
- **knip** (`knip.json`): unused files, exports and dependencies. The ones that
  exist today are listed in the config.
- **jscpd** (`.jscpd.json`): copy-paste in `src/` and `server/`, failing above
  the duplicated-line share of today (`threshold`).

The baselines only move down. A change that brings a pinned file under its pin,
removes a listed unused piece or removes a clone lowers or drops that entry in
the same PR. Raising a pin, listing a new unused piece or raising the threshold
needs the owner.

## What CI runs on a PR

`.github/workflows/checks.yml`: `pr-title`, `lint`, `check`, `build`, and
`docker` (build, `nginx -t`, route and API probes, security headers). All must
pass. `release-please.yml` opens the release PR on `main`; `deploy.yml` runs
only on a `v*` tag.

## One change per PR

One purpose per PR, each opened from an up to date `main` so they merge in any
order: rules [2, scoped](https://github.com/AntonioVentilii/officina/blob/main/standards/code.md#2-scoped)
and [3, parallel, not stacked](https://github.com/AntonioVentilii/officina/blob/main/standards/code.md#3-parallel-not-stacked)
of the universal standard.

The history is the model: a content change, an `/ask` fix and a dependency
move are three PRs, never one. A docs-only change to `docs/ai/**` is `docs(ai): ...`.
