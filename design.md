# Agaate Farm Tech — Design System

## Colors (OKLCH, defined in `src/styles.css`)

| Token           | Value                   | Usage                           |
| --------------- | ----------------------- | ------------------------------- |
| `--cream`       | `oklch(0.965 0.018 90)` | Page background                 |
| `--bone`        | `oklch(0.94 0.018 88)`  | Secondary surfaces, muted areas |
| `--ink`         | `oklch(0.18 0.012 130)` | Primary text                    |
| `--forest`      | `oklch(0.36 0.06 155)`  | Focus rings, brand green        |
| `--forest-deep` | `oklch(0.24 0.05 155)`  | Primary buttons, dark headings  |
| `--moss`        | `oklch(0.55 0.09 145)`  | Secondary accents, growth cues  |
| `--terracotta`  | `oklch(0.62 0.14 45)`   | Accent, CTAs, highlights        |
| `--pine`        | `oklch(0.16 0.025 150)` | Deep dark section bands         |
| `--destructive` | `oklch(0.55 0.2 27)`    | Errors, crisis section          |

Semantic mapping: `background = cream`, `foreground = ink`, `primary = forest-deep`, `accent = terracotta`, `muted = bone`.

Hero primary CTA uses lime `#a3e635` on `#0f2d25` text — the page signature accent for primary actions.

## Typography

Loaded via Google Fonts in `src/routes/__root.tsx`.

| Role                       | Family                        | CSS variable     |
| -------------------------- | ----------------------------- | ---------------- |
| Display / headings (h1–h3) | **Manrope** (300–700)         | `--font-display` |
| Body / UI                  | **Manrope** (300–700)         | `--font-sans`    |
| Labels / meta              | **JetBrains Mono** (400, 500) | `--font-mono` / `--font-jet` |

- Heading tracking: `letter-spacing: -0.035em` (display), weight light–medium
- Title accents: italic `text-forest` / `text-moss` (CropWorld pattern)
- Eyebrow: hairline + uppercase mono, `0.1em` tracking, `text-forest`
- `.label-mono` utility: uppercase, `0.18em` tracking, `0.7rem`, muted

## Radius

Base `--radius: 0.25rem`; scale `sm / md / lg / xl / 2xl / 3xl / 4xl` derived from it.

## Getting the full source code

The chat only lists files I touched. To browse or export everything:

1. **Code Editor View** — top-left of the editor, switch views to browse every file.
2. **GitHub** — click the **+** menu (bottom-left of the chat input) → **GitHub** → connect and transfer. You then own the full repo and can clone/zip it locally.
