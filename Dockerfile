# ventilii-graph image for Fly.io: the prerendered SvelteKit site served by
# nginx, plus the small Node API behind the AI version (/ask), which nginx
# proxies under /api/. Same pattern as the other personal projects'
# Dockerfile.web (scaven-family, toyfolio, ombrellone), except this repo is a
# single root-level app on npm, not a pnpm workspace.
#
# No build ARGs: the site is prerendered HTML, and the API reads its only
# secret (ANTHROPIC_API_KEY, a Fly secret) at runtime.
FROM node:24-slim AS build
WORKDIR /app

# Manifests first, so the dependency layer is cached across content-only edits.
# `--ignore-scripts` skips the `prepare` lifecycle here: `svelte-kit sync` needs
# svelte.config.js and src/, which are not in this layer yet. It runs below.
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund --ignore-scripts

COPY . .

# `npm run build` is `tsc --noEmit && vite build`, and tsconfig.json extends
# ./.svelte-kit/tsconfig.json — so the sync has to happen before the build,
# not as a side effect of it.
RUN npm run prepare && npm run build && npm run build:api

FROM nginx:alpine
# The API is one esbuild bundle with its dependencies inlined, so the runtime
# needs only a Node binary, not node_modules. su-exec drops it to the nginx user.
RUN apk add --no-cache nodejs su-exec
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/build-api/server.mjs /srv/api/server.mjs
COPY docker/start.sh /start.sh
EXPOSE 8080
# CMD, not ENTRYPOINT: the nginx image's own entrypoint still runs and execs
# this, and `docker run <image> nginx -t` (CI) still overrides it.
CMD ["/start.sh"]
