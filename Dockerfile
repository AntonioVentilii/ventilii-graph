# ventilii-graph (prerendered SvelteKit site) image for Fly.io. Builds the
# adapter-static output and serves it with nginx. Same pattern as the other
# personal projects' Dockerfile.web (scaven-family, toyfolio, ombrellone),
# except this repo is a single root-level app on npm, not a pnpm workspace.
#
# The site has no backend and no runtime configuration: it is a fully
# prerendered set of HTML files, so there are no build ARGs to bake in.
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
RUN npm run prepare && npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 8080
