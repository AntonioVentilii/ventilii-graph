# Changelog

## [1.7.0](https://github.com/AntonioVentilii/ventilii-graph/compare/v1.6.5...v1.7.0) (2026-11-12)


### Features

* the map's search also finds the languages spoken and the about items, a change visitors see ([#106](https://github.com/AntonioVentilii/ventilii-graph/issues/106)) ([01ce89b](https://github.com/AntonioVentilii/ventilii-graph/commit/01ce89be593b3942e24f269cf5e99a6d2b434d76))


### Bug Fixes

* **ask:** accept only low, medium or high for AI_EFFORT, else keep the default ([#109](https://github.com/AntonioVentilii/ventilii-graph/issues/109)) ([2ee5b57](https://github.com/AntonioVentilii/ventilii-graph/commit/2ee5b57fbfeba037cde6d07997eef0559e801864))


### Documentation

* point the agent docs at the current lines and list env.ts among the API files ([#112](https://github.com/AntonioVentilii/ventilii-graph/issues/112)) ([21bfdac](https://github.com/AntonioVentilii/ventilii-graph/commit/21bfdac353d7c72f4c42a5679f9317c70997b6e4))
* point the agent docs at the current lines and say knip ignores nothing ([#116](https://github.com/AntonioVentilii/ventilii-graph/issues/116)) ([1a6dc6f](https://github.com/AntonioVentilii/ventilii-graph/commit/1a6dc6f8b75f335ced83bdc99cc8a3c499a8c870))


### Miscellaneous Chores

* drop the StaticCv line pin now the file is under the limit ([#113](https://github.com/AntonioVentilii/ventilii-graph/issues/113)) ([52cec6c](https://github.com/AntonioVentilii/ventilii-graph/commit/52cec6cb34c05d72f9ef1b87048d1fd49b6cefd3))


### Code Refactoring

* **ask:** one component for what sits under each mode's form ([#114](https://github.com/AntonioVentilii/ventilii-graph/issues/114)) ([dc1ec6b](https://github.com/AntonioVentilii/ventilii-graph/commit/dc1ec6b866fb5ebeef4300b0693f0c6c2a716163))
* **map:** one markup for both kinds of orbit node ([#108](https://github.com/AntonioVentilii/ventilii-graph/issues/108)) ([bd6b3b5](https://github.com/AntonioVentilii/ventilii-graph/commit/bd6b3b5c2f3beeb0810d3b10813f87eb42a81063))
* one component for the head tags the map and the CV share ([#110](https://github.com/AntonioVentilii/ventilii-graph/issues/110)) ([e9ea842](https://github.com/AntonioVentilii/ventilii-graph/commit/e9ea842a7ddf6445b9c04d06463d3364d1f6c9b5))


### Build System

* build the sitemap from the site's constants instead of a hand-kept file ([#107](https://github.com/AntonioVentilii/ventilii-graph/issues/107)) ([4103ead](https://github.com/AntonioVentilii/ventilii-graph/commit/4103ead24141edd293bbdf8cf21bfc88740aeb95))
* fail the clone check on any clone now the code has none ([#115](https://github.com/AntonioVentilii/ventilii-graph/issues/115)) ([0ef9562](https://github.com/AntonioVentilii/ventilii-graph/commit/0ef95629356423391c201f69d4b3aece28c73899))

## [1.6.5](https://github.com/AntonioVentilii/ventilii-graph/compare/v1.6.4...v1.6.5) (2026-11-12)


### Bug Fixes

* **ask:** accept only finite positive numbers for the numeric API settings ([#104](https://github.com/AntonioVentilii/ventilii-graph/issues/104)) ([7bd53cd](https://github.com/AntonioVentilii/ventilii-graph/commit/7bd53cdf94b5f7198e810c0e8f4150486defb8f6))


### Documentation

* **ai:** point the PR rules to rules 2 and 3 of the standard ([#97](https://github.com/AntonioVentilii/ventilii-graph/issues/97)) ([79dd8dd](https://github.com/AntonioVentilii/ventilii-graph/commit/79dd8ddfbef9f302abcc7628c3fc9d05e7825002))


### Miscellaneous Chores

* drop the ZERO_LITERAL lint rule ([#103](https://github.com/AntonioVentilii/ventilii-graph/issues/103)) ([d127ea9](https://github.com/AntonioVentilii/ventilii-graph/commit/d127ea97141d5b42a686aacbe9cd7a03a9dee018))


### Code Refactoring

* **ask:** move the Claude client and its credentials out of server/index.ts ([#99](https://github.com/AntonioVentilii/ventilii-graph/issues/99)) ([5b6e6ba](https://github.com/AntonioVentilii/ventilii-graph/commit/5b6e6bafb8b1b080f2b01e090abae21096ab6402))
* one component for the related-projects list of the detail panels ([#101](https://github.com/AntonioVentilii/ventilii-graph/issues/101)) ([8de610c](https://github.com/AntonioVentilii/ventilii-graph/commit/8de610c65aa738c488cf513414126733f1d5157e))
* one helper for the prefers-reduced-motion query ([#100](https://github.com/AntonioVentilii/ventilii-graph/issues/100)) ([ae1ab4b](https://github.com/AntonioVentilii/ventilii-graph/commit/ae1ab4b16c98eaa3c836004076f2be7c9a303635))
* search the leaves through LEAF_ITEMS instead of one loop per kind ([#98](https://github.com/AntonioVentilii/ventilii-graph/issues/98)) ([b0ca5ef](https://github.com/AntonioVentilii/ventilii-graph/commit/b0ca5efca24b08798d1921d4ac67ef8079aa022c))


### Tests

* **ask:** cover the spend and limit code with Vitest in CI ([#105](https://github.com/AntonioVentilii/ventilii-graph/issues/105)) ([d3dd40c](https://github.com/AntonioVentilii/ventilii-graph/commit/d3dd40c91b993aacd3b80e38cb744487bb0a2104))

## [1.6.4](https://github.com/AntonioVentilii/ventilii-graph/compare/v1.6.3...v1.6.4) (2026-11-12)


### Code Refactoring

* **ask:** one submit button for the three modes ([#94](https://github.com/AntonioVentilii/ventilii-graph/issues/94)) ([aca9a43](https://github.com/AntonioVentilii/ventilii-graph/commit/aca9a431d71f118ae203dd9e797443919e507089))
* read every locale list and mapping from LOCALES ([#93](https://github.com/AntonioVentilii/ventilii-graph/issues/93)) ([151ff6a](https://github.com/AntonioVentilii/ventilii-graph/commit/151ff6aca332b9a3b7dea2af2e3c72fa3b2964b7))


### Build System

* serve llm.txt from llms.txt instead of a hand-kept copy ([#95](https://github.com/AntonioVentilii/ventilii-graph/issues/95)) ([bbbd3bf](https://github.com/AntonioVentilii/ventilii-graph/commit/bbbd3bf188b1eebf5a9a9582bf2f83fec4848c75))

## [1.6.3](https://github.com/AntonioVentilii/ventilii-graph/compare/v1.6.2...v1.6.3) (2026-11-12)


### Documentation

* **ai:** ban the em dash and the en dash used as a break, keep en dash ranges ([#92](https://github.com/AntonioVentilii/ventilii-graph/issues/92)) ([ab579f9](https://github.com/AntonioVentilii/ventilii-graph/commit/ab579f9e367212d93d1416371a54fdf741006445))


### Code Refactoring

* move the map and CV copy into copy modules ([#87](https://github.com/AntonioVentilii/ventilii-graph/issues/87)) ([b8d0467](https://github.com/AntonioVentilii/ventilii-graph/commit/b8d0467d581e5ece61ad02b58d5e27238db97f41))
* one component each for the banner meta tags every page repeats ([#89](https://github.com/AntonioVentilii/ventilii-graph/issues/89)) ([9bce753](https://github.com/AntonioVentilii/ventilii-graph/commit/9bce753f7cccaa9e979e74b3406ce3589c7766a3))


### Build System

* **deps:** remove the devDependencies nothing uses ([#90](https://github.com/AntonioVentilii/ventilii-graph/issues/90)) ([2150e40](https://github.com/AntonioVentilii/ventilii-graph/commit/2150e40657bd5959333130ae2bcb0b1eddcc3aad))

## [1.6.2](https://github.com/AntonioVentilii/ventilii-graph/compare/v1.6.1...v1.6.2) (2026-11-11)


### Documentation

* **ai:** add AGENTS.md and docs/ai agent docs ([#79](https://github.com/AntonioVentilii/ventilii-graph/issues/79)) ([5eafba9](https://github.com/AntonioVentilii/ventilii-graph/commit/5eafba9ce7468424ba12cc3fcac02f7c1b5f4b85))


### Code Refactoring

* **ask:** move the answer cache out of server/index.ts ([#86](https://github.com/AntonioVentilii/ventilii-graph/issues/86)) ([152e979](https://github.com/AntonioVentilii/ventilii-graph/commit/152e979a3f84aa8fa12ca50636ebc0c010b9303a))
* **ask:** one status component for the three modes ([#88](https://github.com/AntonioVentilii/ventilii-graph/issues/88)) ([d486b69](https://github.com/AntonioVentilii/ventilii-graph/commit/d486b69cafbce254ece3c6cff1a464dc983d1d47))
* check the stored theme instead of casting it ([#84](https://github.com/AntonioVentilii/ventilii-graph/issues/84)) ([204baa8](https://github.com/AntonioVentilii/ventilii-graph/commit/204baa83cabf2abe395297d694a7d0c3c2fcf297))
* keep the leaf kinds and the kind:id format in one place ([#83](https://github.com/AntonioVentilii/ventilii-graph/issues/83)) ([2c1d105](https://github.com/AntonioVentilii/ventilii-graph/commit/2c1d105d3ee602be842b8c8c820832aa5391d968))
* remove code nothing uses ([#82](https://github.com/AntonioVentilii/ventilii-graph/issues/82)) ([5095ba0](https://github.com/AntonioVentilii/ventilii-graph/commit/5095ba077a797378e7255e723ee3f291cc23b52e))


### Build System

* add a quality gate at today's baseline ([#80](https://github.com/AntonioVentilii/ventilii-graph/issues/80)) ([daa6cf7](https://github.com/AntonioVentilii/ventilii-graph/commit/daa6cf72c6dd27047181e35f7b8b5a8c2c2b34c7))
* drop the knip baseline entries the dead code removal cleared ([#85](https://github.com/AntonioVentilii/ventilii-graph/issues/85)) ([27b46c5](https://github.com/AntonioVentilii/ventilii-graph/commit/27b46c56e77b748ee1eb3be78a9a71a3800dc5f0))

## [1.6.1](https://github.com/AntonioVentilii/ventilii-graph/compare/v1.6.0...v1.6.1) (2026-11-05)


### Bug Fixes

* **ai:** judge disguised requests by what they would produce ([#77](https://github.com/AntonioVentilii/ventilii-graph/issues/77)) ([c62b49b](https://github.com/AntonioVentilii/ventilii-graph/commit/c62b49b18a3bdfca71847251adb85a82ac5a0265))

## [1.6.0](https://github.com/AntonioVentilii/ventilii-graph/compare/v1.5.5...v1.6.0) (2026-11-05)


### Features

* **ai:** answer credit-burning requests with a guard note and a challenge ([#76](https://github.com/AntonioVentilii/ventilii-graph/issues/76)) ([27d9837](https://github.com/AntonioVentilii/ventilii-graph/commit/27d98379882e639019e15046807467b46fa90b09))


### Miscellaneous Chores

* update CV PDF ([#66](https://github.com/AntonioVentilii/ventilii-graph/issues/66)) ([ee82286](https://github.com/AntonioVentilii/ventilii-graph/commit/ee82286e6c8ff326fa7d2afdf5e61640cc4c1352))


### Build System

* **deps:** move from lucide-svelte to @lucide/svelte 1 ([#74](https://github.com/AntonioVentilii/ventilii-graph/issues/74)) ([5d4ed4a](https://github.com/AntonioVentilii/ventilii-graph/commit/5d4ed4ac2a51fcb36113a92da65a20faf16f9b95))
* **deps:** move to Anthropic SDK 1.x (API version 2026-10-21) ([#75](https://github.com/AntonioVentilii/ventilii-graph/issues/75)) ([a0a023c](https://github.com/AntonioVentilii/ventilii-graph/commit/a0a023c61a6ae1e24c59a5678f5a2a1130cc8a18))
* **deps:** move to ESLint 10 and oisy-wallet config 0.5 ([#72](https://github.com/AntonioVentilii/ventilii-graph/issues/72)) ([e7299fa](https://github.com/AntonioVentilii/ventilii-graph/commit/e7299fa8d66f8838a5a9c326982341c1481ac1c8))
* **deps:** move to prettier-plugin-svelte 4 and prettier-plugin-tailwindcss 0.8 ([#73](https://github.com/AntonioVentilii/ventilii-graph/issues/73)) ([e6fcbe0](https://github.com/AntonioVentilii/ventilii-graph/commit/e6fcbe0bbd7d1145e5577fbd71a7e8c748d3aafc))
* **deps:** move to TypeScript 6 ([#68](https://github.com/AntonioVentilii/ventilii-graph/issues/68)) ([0011d53](https://github.com/AntonioVentilii/ventilii-graph/commit/0011d537515c0573a392b7e3ae4f0b2008b84597))
* **deps:** move to Vite 8 and vite-plugin-svelte 7 ([#69](https://github.com/AntonioVentilii/ventilii-graph/issues/69)) ([da85c7d](https://github.com/AntonioVentilii/ventilii-graph/commit/da85c7d6054a9bcf5ee8034a545cb78f42932b8c))
* run on Node 26 ([#67](https://github.com/AntonioVentilii/ventilii-graph/issues/67)) ([59a4636](https://github.com/AntonioVentilii/ventilii-graph/commit/59a4636ca557a622bce1664dada693dd10942c24))

## [1.5.5](https://github.com/AntonioVentilii/ventilii-graph/compare/v1.5.4...v1.5.5) (2026-11-03)


### Documentation

* **changelog:** remove a dead pull request link ([#64](https://github.com/AntonioVentilii/ventilii-graph/issues/64)) ([4e01794](https://github.com/AntonioVentilii/ventilii-graph/commit/4e017949c64dac3e946196a027ce15a21d7e4cd7))

## [1.5.4](https://github.com/AntonioVentilii/ventilii-graph/compare/v1.5.3...v1.5.4) (2026-11-02)


### Documentation

* **changelog:** drop the link to a deleted PR ([#62](https://github.com/AntonioVentilii/ventilii-graph/issues/62)) ([97da0c3](https://github.com/AntonioVentilii/ventilii-graph/commit/97da0c32c4f9dc0970207f00b785ad4b46c5fa53))

## [1.5.3](https://github.com/AntonioVentilii/ventilii-graph/compare/v1.5.2...v1.5.3) (2026-10-29)


### Bug Fixes

* **ask:** state background facts plainly instead of attributing them ([#60](https://github.com/AntonioVentilii/ventilii-graph/issues/60)) ([dd1ee10](https://github.com/AntonioVentilii/ventilii-graph/commit/dd1ee10f7d61c47a775f035300d9157b67799900))

## [1.5.2](https://github.com/AntonioVentilii/ventilii-graph/compare/v1.5.1...v1.5.2) (2026-10-25)


### Bug Fixes

* **ask:** keep evidence ids out of the answer text ([#54](https://github.com/AntonioVentilii/ventilii-graph/issues/54)) ([8c74010](https://github.com/AntonioVentilii/ventilii-graph/commit/8c74010dd1bb93301ffb6954b29dcfd898a7819d))
* **ask:** key the per-IP limits on the /64 for IPv6 visitors ([#53](https://github.com/AntonioVentilii/ventilii-graph/issues/53)) ([30c5011](https://github.com/AntonioVentilii/ventilii-graph/commit/30c5011ab0425c90564620eab43a4243d6b4736b))


### Build System

* **deps:** bump node from 24-slim to 26-slim ([#56](https://github.com/AntonioVentilii/ventilii-graph/issues/56)) ([bad648f](https://github.com/AntonioVentilii/ventilii-graph/commit/bad648f55eeba11293897160c0c56c4c0e3560ee))
* pin the base images by digest and let Dependabot move them ([#52](https://github.com/AntonioVentilii/ventilii-graph/issues/52)) ([c51d283](https://github.com/AntonioVentilii/ventilii-graph/commit/c51d2830ae9826de649ff3a2948527af55f09bcc))


### Continuous Integration

* **deps:** bump actions/checkout from 6.0.2 to 7.0.1 ([#58](https://github.com/AntonioVentilii/ventilii-graph/issues/58)) ([323b05d](https://github.com/AntonioVentilii/ventilii-graph/commit/323b05d567d86199df79d6f47932facc424072cc))
* **deps:** bump actions/create-github-app-token from 3.2.0 to 3.3.0 ([#57](https://github.com/AntonioVentilii/ventilii-graph/issues/57)) ([9f598df](https://github.com/AntonioVentilii/ventilii-graph/commit/9f598dfa14bfbd2016795aa7ab721b0d2813bd64))
* **deps:** bump actions/setup-node from 4.3.0 to 7.1.0 in /.github/actions/prepare ([#59](https://github.com/AntonioVentilii/ventilii-graph/issues/59)) ([581c8d2](https://github.com/AntonioVentilii/ventilii-graph/commit/581c8d2be5818130685f11264c6f0872304f08f6))

## [1.5.1](https://github.com/AntonioVentilii/ventilii-graph/compare/v1.5.0...v1.5.1) (2026-10-25)


### Bug Fixes

* **ask:** let the background notes supply figures, in the terms they set ([#50](https://github.com/AntonioVentilii/ventilii-graph/issues/50)) ([faa9448](https://github.com/AntonioVentilii/ventilii-graph/commit/faa94489b1899bdfac03dc63f9e20d3225116891))

## [1.5.0](https://github.com/AntonioVentilii/ventilii-graph/compare/v1.4.0...v1.5.0) (2026-10-25)


### Features

* **ask:** authenticate with Fly workload identity instead of an API key ([#41](https://github.com/AntonioVentilii/ventilii-graph/issues/41)) ([d940b86](https://github.com/AntonioVentilii/ventilii-graph/commit/d940b867ecd0156b6fc05167b572e3f8bebf34ff))


### Bug Fixes

* **ask:** count every attempt's spend at the price of the model that ran it ([#44](https://github.com/AntonioVentilii/ventilii-graph/issues/44)) ([4b2b4a6](https://github.com/AntonioVentilii/ventilii-graph/commit/4b2b4a6f57a54ef71bcffa206c3ad6efa74c928a))
* **ask:** make the privacy note true and label every AI answer ([#47](https://github.com/AntonioVentilii/ventilii-graph/issues/47)) ([3bf59aa](https://github.com/AntonioVentilii/ventilii-graph/commit/3bf59aad235e13737085f3331f5066736d09c593))
* **ask:** privacy note, hiring-decision framing, AI label on slides, security headers ([#42](https://github.com/AntonioVentilii/ventilii-graph/issues/42)) ([d112993](https://github.com/AntonioVentilii/ventilii-graph/commit/d11299302e1ffd46dbb0f54446199cebb15b5380))
* **ask:** refuse cross-site requests, count failed attempts, keep the budget alive ([#46](https://github.com/AntonioVentilii/ventilii-graph/issues/46)) ([13f41ae](https://github.com/AntonioVentilii/ventilii-graph/commit/13f41ae2571e28d6fe8509ca2b2a398de0bb073a))


### Miscellaneous Chores

* drop unused actions, hide the nginx version, ignore local Claude settings ([#48](https://github.com/AntonioVentilii/ventilii-graph/issues/48)) ([c7921b5](https://github.com/AntonioVentilii/ventilii-graph/commit/c7921b5f53b5dffa8ec204a51f8861b141535a3c))
* update CV PDF ([#49](https://github.com/AntonioVentilii/ventilii-graph/issues/49)) ([6df6dd6](https://github.com/AntonioVentilii/ventilii-graph/commit/6df6dd601fb50b5e5d069399f8c854fba0b25158))


### Build System

* **deps:** npm audit fix for build-time advisories ([#45](https://github.com/AntonioVentilii/ventilii-graph/issues/45)) ([67290da](https://github.com/AntonioVentilii/ventilii-graph/commit/67290dad96e83305b011532d26c99b6ee25e47ff))

## [1.4.0](https://github.com/AntonioVentilii/ventilii-graph/compare/v1.3.0...v1.4.0) (2026-10-24)


### Features

* **ask:** honest AI version of the portfolio at /ask ([f074e86](https://github.com/AntonioVentilii/ventilii-graph/commit/f074e8646bd7647e4805e6448b63b674d6afc0dd))
* **content:** add Officina and recent projects, with dates and status ([#38](https://github.com/AntonioVentilii/ventilii-graph/issues/38)) ([209ed21](https://github.com/AntonioVentilii/ventilii-graph/commit/209ed21dcf500ba4b1672c9022b7d48468c4f813))


### Miscellaneous Chores

* update CV PDF ([#37](https://github.com/AntonioVentilii/ventilii-graph/issues/37)) ([5cc0096](https://github.com/AntonioVentilii/ventilii-graph/commit/5cc0096f50585972a52e6d3b24c68a438d880920))

## [1.3.0](https://github.com/AntonioVentilii/ventilii-graph/compare/v1.2.5...v1.3.0) (2026-09-17)


### Features

* **hosting:** serve on Fly.io with nginx instead of Juno ([#34](https://github.com/AntonioVentilii/ventilii-graph/issues/34)) ([ee55651](https://github.com/AntonioVentilii/ventilii-graph/commit/ee55651b027370d04992f7f13770cd65f2e12f01))


### Build System

* **deps-dev:** bump js-yaml from 4.3.1 to 4.3.2 in the npm_and_yarn group across 1 directory ([#33](https://github.com/AntonioVentilii/ventilii-graph/issues/33)) ([e6cc4b7](https://github.com/AntonioVentilii/ventilii-graph/commit/e6cc4b7fdb6f7ffb95e1d42a70efaf5a16befa60))

## [1.2.5](https://github.com/AntonioVentilii/ventilii-graph/compare/v1.2.4...v1.2.5) (2026-09-03)


### Build System

* **deps:** bump the npm_and_yarn group across 1 directory with 3 updates ([#31](https://github.com/AntonioVentilii/ventilii-graph/issues/31)) ([c7a1121](https://github.com/AntonioVentilii/ventilii-graph/commit/c7a112135a74e5e8eebe8064c46e154e13fc34c4))

## [1.2.4](https://github.com/AntonioVentilii/ventilii-graph/compare/v1.2.3...v1.2.4) (2026-09-02)


### Continuous Integration

* pin release-please-action to the real v5.0.0 tag ([#29](https://github.com/AntonioVentilii/ventilii-graph/issues/29)) ([2d7bc1e](https://github.com/AntonioVentilii/ventilii-graph/commit/2d7bc1e8cc2c9cc5b7c7e220b929ec1b3cb09c7b))

## [1.2.3](https://github.com/AntonioVentilii/ventilii-graph/compare/v1.2.2...v1.2.3) (2026-09-02)


### Bug Fixes

* **seo:** add author and publish date metadata ([#26](https://github.com/AntonioVentilii/ventilii-graph/issues/26)) ([09c85e3](https://github.com/AntonioVentilii/ventilii-graph/commit/09c85e34630693151018696615f1bf860f882556))
* **seo:** serve the AI-crawler summary at the standard /llms.txt path ([#23](https://github.com/AntonioVentilii/ventilii-graph/issues/23)) ([3f2133a](https://github.com/AntonioVentilii/ventilii-graph/commit/3f2133adb2c0566fca2030d389fb1207b129b90d))


### Miscellaneous Chores

* **cv:** refresh downloadable CV PDF ([#25](https://github.com/AntonioVentilii/ventilii-graph/issues/25)) ([cbc0d23](https://github.com/AntonioVentilii/ventilii-graph/commit/cbc0d2357a8849e6976b5ef660eb70c79f0fb8f4))
* update CV PDF ([#28](https://github.com/AntonioVentilii/ventilii-graph/issues/28)) ([e2313a5](https://github.com/AntonioVentilii/ventilii-graph/commit/e2313a54cd1b8ed0e20119bd2b3847bfbf4d4cab))


### Continuous Integration

* cut release PRs with the release bot app instead of GITHUB_TOKEN ([#27](https://github.com/AntonioVentilii/ventilii-graph/issues/27)) ([2c829fe](https://github.com/AntonioVentilii/ventilii-graph/commit/2c829fe6d9661ec82d76d3e3ae9ecfc567bb65a6))

## [1.2.2](https://github.com/AntonioVentilii/ventilii-graph/compare/v1.2.1...v1.2.2) (2026-09-01)


### Bug Fixes

* **seo:** replace em dash with middot in alt text and banner archive ([#21](https://github.com/AntonioVentilii/ventilii-graph/issues/21)) ([835b854](https://github.com/AntonioVentilii/ventilii-graph/commit/835b854ef440f28ab4e642d103d8e809c99bd486))

## [1.2.1](https://github.com/AntonioVentilii/ventilii-graph/compare/v1.2.0...v1.2.1) (2026-09-01)


### Bug Fixes

* **seo:** dedicated 1600x838 social-share banner as og:image ([#20](https://github.com/AntonioVentilii/ventilii-graph/issues/20)) ([8248494](https://github.com/AntonioVentilii/ventilii-graph/commit/82484940b5e42e3646d9166ced540ae689183be7))


### Build System

* **deps:** bump esbuild from 0.27.7 to 0.28.2 in the npm_and_yarn group across 1 directory ([#18](https://github.com/AntonioVentilii/ventilii-graph/issues/18)) ([1a0585c](https://github.com/AntonioVentilii/ventilii-graph/commit/1a0585c237e02c98193382bb5f384e6f3068f045))

## [1.2.0](https://github.com/AntonioVentilii/ventilii-graph/compare/v1.1.1...v1.2.0) (2026-09-01)


### Features

* **seo:** static CV pages (EN/IT/PT-BR) with flatten/scatter toggle ([#15](https://github.com/AntonioVentilii/ventilii-graph/issues/15)) ([af0bb1d](https://github.com/AntonioVentilii/ventilii-graph/commit/af0bb1d0493365ba0e55713ae0c9e12435121276))


### Bug Fixes

* **seo:** absolute og:image URL and Person JSON-LD on the homepage ([#16](https://github.com/AntonioVentilii/ventilii-graph/issues/16)) ([66783a7](https://github.com/AntonioVentilii/ventilii-graph/commit/66783a7a13bcdea07b05d468db69ed844e44668e))

## [1.1.1](https://github.com/AntonioVentilii/ventilii-graph/compare/v1.1.0...v1.1.1) (2026-08-27)


### Bug Fixes

* **seo:** point canonical URLs at ventilii.dev ([#13](https://github.com/AntonioVentilii/ventilii-graph/issues/13)) ([a32dd4b](https://github.com/AntonioVentilii/ventilii-graph/commit/a32dd4b07989a2fa100c7969cb9e83f851f30117))


### Build System

* **deps:** bump the npm_and_yarn group across 1 directory with 2 updates ([#10](https://github.com/AntonioVentilii/ventilii-graph/issues/10)) ([a64db2f](https://github.com/AntonioVentilii/ventilii-graph/commit/a64db2f0039e36b97e37f63fc10a7afac8b5c749))

## [1.1.0](https://github.com/AntonioVentilii/ventilii-graph/compare/v1.0.6...v1.1.0) (2026-08-27)


### Features

* New projects, overlap-free graph layout, visual polish (v1.1.0) ([#8](https://github.com/AntonioVentilii/ventilii-graph/issues/8)) ([4ecb19a](https://github.com/AntonioVentilii/ventilii-graph/commit/4ecb19a879f6eeaea0b5b781f438834bd76d6f11))


### Build System

* **deps-dev:** bump vite from 7.3.1 to 7.3.2 in the npm_and_yarn group across 1 directory ([#1](https://github.com/AntonioVentilii/ventilii-graph/issues/1)) ([bfda4c1](https://github.com/AntonioVentilii/ventilii-graph/commit/bfda4c1b781689c5a05eddb8a3743c68b317d97d))
* **deps:** bump the npm_and_yarn group across 1 directory with 7 updates ([#7](https://github.com/AntonioVentilii/ventilii-graph/issues/7)) ([3f1b431](https://github.com/AntonioVentilii/ventilii-graph/commit/3f1b4314d25336360b508a4ea8495518de3a7c2d))


### Continuous Integration

* align release-please with the fleet pattern ([#11](https://github.com/AntonioVentilii/ventilii-graph/issues/11)) ([571c7de](https://github.com/AntonioVentilii/ventilii-graph/commit/571c7dead4b21238d16a7370a00b24566ac06cb6))
* release-please automation + PR checks ([#9](https://github.com/AntonioVentilii/ventilii-graph/issues/9)) ([52ded40](https://github.com/AntonioVentilii/ventilii-graph/commit/52ded40477f9b41f75ebf29b07404d669e915387))
