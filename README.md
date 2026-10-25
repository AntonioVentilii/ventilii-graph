# ventilii-graph

Portfolio: interactive career map, live at [ventilii.dev](https://ventilii.dev),
plus an AI version of it at [/ask](https://ventilii.dev/ask/).

Prerendered SvelteKit (`adapter-static`): every route is built to its own HTML
file, served by nginx on [Fly.io](https://fly.io). The only server code is the
small API behind `/ask`, in `server/`.

## Commands

| Command             | Action                                    |
| ------------------- | ----------------------------------------- |
| `npm run dev`       | Start dev server (proxies `/api` to 8787) |
| `npm run dev:api`   | Start the AI API on 8787 (reads `.env`)   |
| `npm run build`     | Production build to `build/`              |
| `npm run build:api` | Bundle the AI API to `build-api/`         |
| `npm run preview`   | Preview the production build              |
| `npm run check`     | Type-check the site and the API           |
| `npm run quality`   | Format, then lint                         |

Content lives in `src/lib/services/portfolio.services.ts`. Projects carry their
`dates` and `status` (live, in private use, prototype, archived) wherever the
repository history shows them, so a weeks-old experiment is never read as a
product; older entries without that evidence leave them unset rather than guess,
and the AI sees them as "not recorded". `limits` lists known gaps.

## The AI version (`/ask`)

A page where a visitor asks about Antonio, pastes a job posting for a fit check
(matches, gaps, interview questions), or gets a short tailored slide deck.

- `server/knowledge.ts` renders the same portfolio data as plain text for the
  model, so the AI can never drift from the site. Every item carries its map id.
- `server/modes.ts` holds the system prompt (honesty rules + the portfolio,
  prompt-cached), one JSON schema per mode (structured outputs), and a clean-up
  pass that drops any evidence id the portfolio does not contain.
- `server/index.ts` is a dependency-free `node:http` server: input limits,
  per-IP and daily caps, an answer cache (cached answers are free), and
  `GET /api/ai/health` so the page can show an offline note.
- In the image, esbuild bundles it to one file and `docker/start.sh` runs
  it next to nginx, which proxies `/api/`.

Locally it needs `ANTHROPIC_API_KEY` in a `.env`. On Fly it holds no key: it
uses Workload Identity Federation (`server/fly-oidc.ts`). The machine mints a
short-lived OIDC token and the SDK exchanges it for a Claude access token.
Fly's agent socket (`/.fly/api`) is the whole Machines API, so the API never
touches it: `server/oidc-helper.ts`, a root process that only mints tokens for
Anthropic's audience, answers on `/run/oidc/oidc.sock`, open to the API's own
`api` user and not to nginx (`docker/start.sh`). The token says:

```
iss  https://oidc.fly.io/<fly-org>
sub  <fly-org>:ventilii-graph:<machine>
aud  https://api.anthropic.com
```

One-time setup in the Claude Console (Settings → Workload identity → Connect
workload → Custom OIDC): issuer `https://oidc.fly.io/<fly-org>`, subject prefix
`<fly-org>:ventilii-graph:*`, audience `https://api.anthropic.com`, the
workspace that carries the spend limit, scope `workspace:developer` (the lowest
the Console offers; the other is `org:admin`), token lifetime 1 hour. Then the
four public ids on the app:

```sh
fly secrets set -a ventilii-graph \
  ANTHROPIC_FEDERATION_RULE_ID=fdrl_... ANTHROPIC_ORGANIZATION_ID=... \
  ANTHROPIC_SERVICE_ACCOUNT_ID=svac_... ANTHROPIC_WORKSPACE_ID=wrkspc_...
```

`GET /api/ai/health` reports `"auth":"federation"` once they are in; a key, if
set, always wins. Without either the site works and `/ask` says it is offline.
Facts that sharpen the AI's answers but should not live in this public repo
(career details, internal figures) go in the `AI_PRIVATE_NOTES` secret, one
`- ` line each; the server appends them to the known limits.
Tuning via env: `AI_MODEL` (default `claude-opus-5`), `AI_EFFORT` (`medium`),
`AI_DAILY_BUDGET_USD` (5, measured from real token usage: the hard ceiling,
since per-IP limits can be dodged by rotating addresses), `AI_DAILY_LIMIT`
(300 requests), `AI_PER_IP_PER_10_MIN` (6), `AI_PER_IP_PER_DAY` (25), and
`AI_PRICE_IN_PER_MTOK` / `AI_PRICE_OUT_PER_MTOK` (the configured model's prices; Opus 5.5, Opus 5 and Opus 4.8 are built in, so set them for another model or to correct a listed one).
Each mode also caps its output tokens, so a prompt that talks the model into a
long translation or essay is cut off early.

## Deployment

`release-please` owns versions and tags: when its release PR merges it cuts a
`vX.Y.Z` tag, and that tag push runs `.github/workflows/deploy.yml`, which
builds `Dockerfile` on Fly's remote builder and ships it. Nothing deploys off
`main` directly, and versions are never hand-bumped.

Checks build the image and probe the served routes on every PR
(`.github/workflows/checks.yml`), so a broken `Dockerfile` or `nginx.conf` fails
before a tag exists.

### First-time setup

```bash
fly launch --no-deploy   # or `fly apps create ventilii-graph`
fly tokens create deploy # -> repo secret FLY_API_TOKEN
```

Then add the custom domain and point DNS at the app with the records Fly prints:

```bash
fly certs add ventilii.dev
fly certs add www.ventilii.dev
```

The canonical origin is `SITE_ORIGIN` in `src/lib/utils/seo.utils.ts`; keep it,
`static/sitemap.xml` and `static/robots.txt` in sync.

## Local image

```bash
docker build -t ventilii-graph . && docker run --rm -p 8080:8080 ventilii-graph
```
