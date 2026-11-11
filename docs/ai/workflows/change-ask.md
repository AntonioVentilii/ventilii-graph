# Change the AI version (`/ask`)

The most frequent kind of change in the history (`fix(ask): ...`,
`feat(ai): ...`). Models: `8c74010` (output clean-up only), `30c5011` (limits
only), `27d9837` (a new response kind end to end).

## Decide which layer owns the change

| Change                                  | Owner                                                                                                  |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| What the model is told, its rules       | `SYSTEM_PROMPT`, the `*_TASK` texts in `server/modes.ts`                                               |
| The shape of an answer                  | the mode's schema in `server/modes.ts`, the result type in `src/lib/types/ai.types.ts`                 |
| Trimming or dropping parts of an answer | the `clean*` functions in `server/modes.ts`                                                            |
| What the model knows                    | the content ([update-content.md](./update-content.md)) or `server/knowledge.ts` for how it is rendered |
| Limits, budget, transport, status codes | `server/index.ts`                                                                                      |
| The answer cache (lifetime, size, key)  | `server/cache.ts`                                                                                      |
| An input limit                          | `AI_INPUT_LIMITS` in `ai.types.ts` (server and form both read it)                                      |
| Any string on the page                  | `ASK_COPY` and friends in `src/lib/utils/ask-copy.utils.ts`                                            |
| How a result is shown                   | `src/lib/components/ai/`                                                                               |

## Steps

1. **Contract first.** A new field, mode or error code goes in `ai.types.ts`
   before either side uses it. A new `AiErrorCode` needs its copy in `ASK_COPY`
   and a case in `ErrorNote.svelte`.
2. **Server.** Keep the schema, the `clean*` pass and the type in step. Every
   field the model writes is trimmed to a maximum; every id is filtered through
   `EVIDENCE_IDS`. Keep the system prompt identical across requests (it is
   prompt-cached): anything per request goes in `buildTurn`.
3. **Guards are one-way.** Limits, budget, strikes, `isSameSite`, `leaksNotes`
   and `attemptIsSafe` may get stricter, never looser, without the owner
   (see [../governance.md](../governance.md)).
4. **Client.** Read state from `AiRequestState`; render model text through
   `RichText.svelte` and ids through `EvidenceChips.svelte`. Copy in all three
   locales.
5. **Docs.** A new env var, limit or behaviour visitors can see goes in the
   `/ask` section of `README.md`. A new or changed refusal path gets a probe in
   the `docker` job ([../testing.md](../testing.md)).
6. **Verify.** The local gates; then `npm run dev:api` with a key and
   `npm run dev`, and try the mode in all three locales.
