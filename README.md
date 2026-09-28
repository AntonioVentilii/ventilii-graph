# ventilii-graph

Portfolio: interactive career map, live at [ventilii.dev](https://ventilii.dev),
plus an AI version of it at [/ask](https://ventilii.dev/ask/).

Prerendered SvelteKit (`adapter-static`): every route is built to its own HTML
file, served by nginx on [Fly.io](https://fly.io). The only server code is the
small API behind `/ask`, in `server/`.

## Commands

| Command             | Action                                     |
| ------------------- | ------------------------------------------ |
| `npm run dev`       | Start dev server (proxies `/api` to 8787)  |
| `npm run dev:api`   | Start the AI API on 8787 (reads `.env`)    |
| `npm run build`     | Production build to `build/`               |
| `npm run build:api` | Bundle the AI API to `build-api/`          |
| `npm run preview`   | Preview the production build               |
| `npm run check`     | Type-check the site and the API            |
| `npm run quality`   | Format, then lint                          |

Content lives in `src/lib/services/portfolio.services.ts`. Projects carry their
`dates` and `status` (live, in private use, prototype, archived), so a
weeks-old experiment is never read as a product; `limits` lists known gaps.

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
- In the image, esbuild bundles it to one file and `docker/entrypoint.sh` runs
  it next to nginx, which proxies `/api/`.

It needs `ANTHROPIC_API_KEY` (`fly secrets set ANTHROPIC_API_KEY=...`, or a
`.env` locally). Without it the site works and `/ask` says it is offline.
Tuning via env: `AI_MODEL` (default `claude-opus-5`), `AI_EFFORT` (`medium`),
`AI_DAILY_LIMIT` (300), `AI_PER_IP_PER_10_MIN` (6), `AI_PER_IP_PER_DAY` (25).

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
