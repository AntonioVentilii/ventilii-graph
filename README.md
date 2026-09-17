# ventilii-graph

Static portfolio: interactive career map, live at [ventilii.dev](https://ventilii.dev).

Prerendered SvelteKit (`adapter-static`) with no backend — every route is built
to its own HTML file, served by nginx on [Fly.io](https://fly.io).

## Commands

| Command           | Action                       |
| ----------------- | ---------------------------- |
| `npm run dev`     | Start dev server             |
| `npm run build`   | Production build to `build/` |
| `npm run preview` | Preview the production build |
| `npm run quality` | Format, then lint            |

Content lives in `src/lib/services/portfolio.services.ts`.

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
