# Governance

What an agent may change on its own, what it must ask about, and which doc to
update for which change. The universal rules are in
[officina `standards/code.md`](https://github.com/AntonioVentilii/officina/blob/main/standards/code.md).

## Generated and owned paths: never hand-edit

| Path                                            | Owner                                                   |
| ----------------------------------------------- | ------------------------------------------------------- |
| `CHANGELOG.md`, `.release-please-manifest.json` | release-please (also in `.prettierignore`)              |
| `"version"` in `package.json`                   | release-please; never bump it by hand                   |
| `package-lock.json`                             | `npm install`; never edit it as text                    |
| `.svelte-kit/`, `build/`, `build-api/`          | `svelte-kit sync`, `vite build`, `esbuild` (gitignored) |
| `design/og-banners/*.jpg`                       | the scripts in that folder; nothing there is deployed   |

The release PR (`chore(release): vX.Y.Z`) is opened by the release bot. Merging
it cuts a tag that deploys to production: never merge it, and never merge any
PR, without the owner's explicit go-ahead. Merges are squash only.

## Ask before changing

- `Dockerfile`, `docker/start.sh`, `nginx.conf`, `nginx-security-headers.conf`,
  `fly.toml`: the production image, its users and its security headers.
- `.github/workflows/**`, `.github/actions/**`, `.github/dependabot.yml`,
  `release-please-config.json`: CI, deploy and release.
- `server/fly-oidc.ts`, `server/oidc-helper.ts`: workload identity. The helper
  runs as root and must only ever mint tokens for Anthropic's audience.
- Any cost or abuse guard in `server/index.ts` or `server/cost-guard.ts`
  (per-IP and daily limits, `DAILY_BUDGET_USD`, `MAX_OUTPUT_TOKENS`, strikes,
  the worst-case reservation, `limitKey`, `isSameSite`, the body size)
  and the leak and guard checks in `server/modes.ts` (`leaksNotes`,
  `attemptIsSafe`). Making one stricter is fine; making one looser is not.
- `static/.well-known/security.txt`, `static/robots.txt`, `SITE_ORIGIN`.
- A new dependency, or a new top-level folder.
- `static/Antonio_Ventilii_CV.pdf`: only the owner supplies a new PDF.

## Free to change (still through a PR and the gates)

`src/**` and `server/{index,claude,modes,knowledge}.ts` outside the guards above,
`static/llms.txt` when content changes, `README.md`, and
`docs/ai/**`.

## Never

- Put a secret, an API key or a private fact in the repo. Private career facts
  go in the `AI_PRIVATE_NOTES` Fly secret (see `README.md`), never in
  `portfolio.services.ts`, a prompt or a fixture.
- Write another PR's number into a PR title or commit subject: release-please
  turns it into a `CHANGELOG.md` link, and some early PRs were deleted on
  purpose.
- Add AI attribution lines to commits, PRs or code.
- Silence ESLint, `svelte-check` or `tsc` to go green. The few existing
  `eslint-disable` lines each carry a reason; a new one needs the same and the
  owner's agreement. The same holds for the quality gate's baselines
  (`BASELINE` in `eslint.config.js`, the lists in `knip.json`, the `threshold`
  in `.jscpd.json`): lower them freely, never raise them without the owner.

## Meta-update map

A PR that changes one of these updates the page next to it in the same PR.

| You changed...                                                                        | Update                                                     |
| ------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| A shared component, util, store, service, constant or type                            | [reusability.md](./reusability.md)                         |
| A folder, or where a kind of code goes                                                | [structure.md](./structure.md)                             |
| How state, data, errors, copy or components are written                               | [patterns.md](./patterns.md)                               |
| A CI job, a gate, a script in `package.json`, the title rule, a quality-gate baseline | [pr-and-ci.md](./pr-and-ci.md), [testing.md](./testing.md) |
| A recurring change done a new way                                                     | the matching [workflows/](./workflows/) recipe             |
| A protected path or a permission                                                      | this page                                                  |
| A command, the layout or a repo-specific rule                                         | [`AGENTS.md`](../../AGENTS.md)                             |
| Build, deploy, the API's env vars or limits                                           | [`README.md`](../../README.md)                             |
