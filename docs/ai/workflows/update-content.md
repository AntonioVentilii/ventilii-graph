# Update portfolio content

For a new or changed project, role, technology, degree, language or fact.
Title: `feat(content): ...` (or `fix(content): ...` for a correction). Model:
`209ed21`.

1. **Edit the data, only there.** `src/lib/services/portfolio.services.ts`.
   Write every string with `L.en(en, it, pt)`: all three languages, no em
   dash and no en dash used as a break (a range like `2019–2024` is fine). Ids are lower-case kebab or snake and never change once
   published: they are in URLs (`?item=project:<id>`) and in the AI's evidence.
2. **Projects carry evidence, not guesses.** Set `dates` and `status`
   (`production`, `in-use`, `prototype`, `archived`) only where the repository
   history shows them; otherwise leave them unset (see `README.md`). A known
   gap goes in `limits`, which only the AI reads.
3. **Link what relates.** `stackIds` on projects and experiences,
   `projectIds` on experiences, `relatedProjectIds` on technologies, using
   ids that exist.
4. **A new field?** Add it to `src/lib/types/portfolio.types.ts`, then render it
   in every renderer that should show it: the panel (`components/panel/*Detail.svelte`),
   `components/cv/StaticCv.svelte`, and `server/knowledge.ts` for the AI. A label
   table for a new enum goes next to its helper (see `project.utils.ts`).
5. **Sync the hand-written copies** (until they are generated):
   `static/llms.txt` (nginx serves it as `/llm.txt` too), and
   `SITE_MODIFIED_TIME` in `src/lib/utils/seo.utils.ts` (the sitemap's `<lastmod>`
   is built from it).
   If the headline skills changed, `PERSON_KNOWS_ABOUT` in the same file.
6. **Never** put private facts here: they go in the `AI_PRIVATE_NOTES` secret.
   The CV PDF is supplied by the owner (`chore: update CV PDF`).
7. **Verify.** The local gates in [../pr-and-ci.md](../pr-and-ci.md), then
   `npm run dev`: open the item on the map, on `/cv/`, `/cv/it/` and `/cv/pt/`.
