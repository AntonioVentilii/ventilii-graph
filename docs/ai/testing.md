# Testing

There is no unit test runner in this repository today: no Vitest, no
Playwright, no `test` script. Behaviour is proved by the type checkers, the
build and the image probes in CI. Adding a test runner is a new dependency:
ask first.

## What proves a change

| Layer                  | How                                                                                       |
| ---------------------- | ----------------------------------------------------------------------------------------- |
| Types, Svelte, the API | `npm run check` (`svelte-check` on `src/`, `tsc -p server`)                               |
| Style and lint         | `npm run lint` (Prettier check, ESLint with the oisy config)                              |
| Prerender              | `npm run build`: every route renders to HTML or the build fails                           |
| The image              | The `docker` job in `.github/workflows/checks.yml`                                        |
| A page in the browser  | `npm run dev` (launch config `dev` in `.claude/launch.json`), then look at it             |
| The API locally        | `npm run dev:api` with `ANTHROPIC_API_KEY` in `.env`; `curl localhost:8787/api/ai/health` |

## The image probes

The `docker` job builds the `Dockerfile`, runs `nginx -t`, serves the image
and checks:

- every prerendered route returns 200 and an unknown path a real 404;
- `/api/ai/health` reports `configured: false` without a key, and `POST /api/ai`
  answers 503;
- a `text/plain` body and a `sec-fetch-site: cross-site` request get 403;
- the security headers are on a page, a hashed bundle, the 404 and the API.

A PR that adds a route adds its `check /path/ 200` line there. A PR that
changes how the API refuses a request adds or updates the probe that shows it.
Both are CI files, so say so in the PR body (see [governance.md](./governance.md)).

## Never

Skip, delete or weaken a probe to go green. If one fails, the change is wrong
or the probe needs a reasoned update the owner agrees to.
