# ventilii-graph image for Fly.io: the prerendered SvelteKit site served by
# nginx, plus the small Node API behind the AI version (/ask), which nginx
# proxies under /api/. Same pattern as the other personal projects'
# Dockerfile.web (scaven-family, toyfolio, ombrellone), except this repo is a
# single root-level app on npm, not a pnpm workspace.
#
# No build ARGs: the site is prerendered HTML, and the API reads its
# credentials (workload identity ids, or a key) from Fly secrets at runtime.
FROM node:26-slim@sha256:36793bcbb160a6a16cede1e62b93f84e26b78a972a8a4c0b879c1c12f22761ec AS build
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

# Only the Node binary is taken from here: Alpine's own `nodejs` package lags
# behind (24 on Alpine 3.24), while the site builds and the API runs on 26. Both
# images are on the same Alpine release, so the binary links against the same
# musl; Dependabot moves the two digests.
FROM node:26-alpine@sha256:c6ad9e9c1d80f6eb607c26b4b0a132ff7a2344fad1c78ea3baa2a7d4c8de6d94 AS node

FROM nginx:alpine@sha256:a3554c0d0b48177b1413c26e01f695334428020d9df01243fbae3e11cfd17417
# The API is one esbuild bundle with its dependencies inlined, so the runtime
# needs only a Node binary (plus the C++ runtime it links), not node_modules.
# su-exec drops it to its own `api` user, apart from nginx, so only the API can
# reach the OIDC helper's socket.
RUN apk add --no-cache libstdc++ libgcc su-exec \
	&& addgroup -S api && adduser -S -D -H -G api api
COPY --from=node /usr/local/bin/node /usr/local/bin/node
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx-security-headers.conf /etc/nginx/snippets/security-headers.conf
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/build-api/server.mjs /app/build-api/oidc-helper.mjs /srv/api/
COPY docker/start.sh /start.sh
EXPOSE 8080
# CMD, not ENTRYPOINT: the nginx image's own entrypoint still runs and execs
# this, and `docker run <image> nginx -t` (CI) still overrides it.
CMD ["/start.sh"]
