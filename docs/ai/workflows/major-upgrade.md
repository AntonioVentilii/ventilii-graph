# Move a dependency to a new major version

A run of these in the history: `build(deps): move to TypeScript 6`,
`... to Vite 8 and vite-plugin-svelte 7`, `... to SvelteKit 3 and adapter-static 4`,
`... to ESLint 10 and oisy-wallet config 0.5`, `... to Anthropic SDK 1.x`.
Minor and patch bumps come from Dependabot and need none of this.

1. **One family per PR.** A package and the packages that must move with it
   (Vite and its Svelte plugin; SvelteKit and its adapter). Title:
   `build(deps): move to <name> <major>`.
2. **Read the migration guide** of the new major and apply what it requires,
   nothing else: no refactor on the side. A config file that the new version
   drops is deleted in the same PR (SvelteKit 3 removed `svelte.config.js`;
   its config now lives in `vite.config.ts`).
3. **Install with npm**, never by editing `package-lock.json`. Keep the
   `overrides` in `package.json` in step (Tailwind is pinned to one exact
   version across its packages; the oisy config's `typescript` follows ours).
4. **Node** is pinned in `.node-version` and the `Dockerfile` base image by
   digest. A Node move changes both (`59a4636`, `bad648f`).
5. **The Anthropic SDK** also fixes the API version: check `server/index.ts`
   (`client.beta.messages.create`, betas, `fallbacks`) and
   `server/fly-oidc.ts` against the new SDK, and run `npm run build:api`.
6. **Verify** with all the local gates, `npm run build:api`, and a
   `docker build`; say in the body which changes the guide forced.
