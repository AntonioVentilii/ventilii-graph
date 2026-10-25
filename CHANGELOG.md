# Changelog

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

* **ask:** honest AI version of the portfolio at /ask ([#40](https://github.com/AntonioVentilii/ventilii-graph/issues/40)) ([f074e86](https://github.com/AntonioVentilii/ventilii-graph/commit/f074e8646bd7647e4805e6448b63b674d6afc0dd))
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
