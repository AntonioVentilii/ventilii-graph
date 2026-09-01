# OG banner archive

Design options for the social-share banner (`static/images/og-banner.jpg`), kept for
future reuse. Nothing in this folder is deployed — only `static/` ships to the site.

| File            | Design                                        |
| --------------- | --------------------------------------------- |
| `og-opt-01.jpg` | Minimal + teal glow and accent rule           |
| `og-opt-02.jpg` | Flat minimal (chosen design, see note below)  |
| `og-opt-03.jpg` | Terminal session (`whoami` / `cat stack.txt`) |
| `og-opt-04.jpg` | TypeScript object literal                     |
| `og-opt-05.jpg` | Light theme                                   |
| `og-opt-06.jpg` | Accent split panel                            |
| `og-opt-07.jpg` | Giant AV monogram                             |
| `og-opt-08.jpg` | Blueprint grid                                |
| `og-opt-09.jpg` | Duotone full-height photo                     |
| `og-opt-10.jpg` | Centered layout with curly braces             |
| `og-sheet.jpg`  | Contact sheet of all ten                      |

The live banner is `og-opt-02` regenerated with `Python` added to the stack line.

Regenerate with Pillow (macOS, uses Menlo) from the repo root:

```bash
python3 design/og-banners/generate-banner.py   # the live banner -> static/images/og-banner.jpg
python3 design/og-banners/generate-options.py  # all ten options + contact sheet (outputs beside the script)
```

Rule of thumb from picking these: public-facing assets stay minimal and legible to
non-technical viewers; the developer-culture designs (03, 04) suit dev-only surfaces
like a GitHub profile README.
