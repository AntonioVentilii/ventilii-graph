# docs/ai

Agent docs for `ventilii-graph`. Start at [`AGENTS.md`](../../AGENTS.md); the
universal rules are in
[officina `standards/code.md`](https://github.com/AntonioVentilii/officina/blob/main/standards/code.md).
These pages only say what is true of this repository.

| Page                               | What it holds                                                 |
| ---------------------------------- | ------------------------------------------------------------- |
| [governance.md](./governance.md)   | Protected and generated paths, what needs asking, update map  |
| [structure.md](./structure.md)     | Folder taxonomy, where new code goes, dependency direction    |
| [patterns.md](./patterns.md)       | Patterns in use with examples, and the anti-patterns to avoid |
| [reusability.md](./reusability.md) | Catalog of every shared component, util, service, type        |
| [testing.md](./testing.md)         | How a change is verified, and the API's unit tests            |
| [pr-and-ci.md](./pr-and-ci.md)     | Title convention, body, local gates, what CI runs             |

Workflows, read off the git history:

| Recipe                                                       | When                                      |
| ------------------------------------------------------------ | ----------------------------------------- |
| [workflows/update-content.md](./workflows/update-content.md) | A project, role, skill or fact changes    |
| [workflows/change-ask.md](./workflows/change-ask.md)         | The `/ask` prompt, schema, limits or copy |
| [workflows/add-route.md](./workflows/add-route.md)           | A new page, or a new locale               |
| [workflows/major-upgrade.md](./workflows/major-upgrade.md)   | `build(deps): move to X N`                |

Project docs that these pages link and never restate: [`README.md`](../../README.md)
(build, deploy, the AI API and its env vars),
[`design/og-banners/README.md`](../../design/og-banners/README.md) (banner archive).
