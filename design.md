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
| `--destructive` | `oklch(0.55 0.2 27)`    | Errors, crisis section          |

Semantic mapping: `background = cream`, `foreground = ink`, `primary = forest-deep`, `accent = terracotta`, `muted = bone`.

## Typography

Loaded via Google Fonts in `src/routes/__root.tsx`.

| Role                       | Family                        | CSS variable     |
| -------------------------- | ----------------------------- | ---------------- |
| Display / headings (h1–h3) | **Instrument Serif**          | `--font-display` |
| Body / UI                  | **Inter** (300–700)           | `--font-sans`    |
| Labels / meta              | **JetBrains Mono** (400, 500) | `--font-mono`    |

- Heading tracking: `letter-spacing: -0.02em`
- Body OpenType features: `ss01`, `cv11`
- `.label-mono` utility: uppercase, `0.18em` tracking, `0.7rem`, muted

## Radius

Base `--radius: 0.25rem`; scale `sm / md / lg / xl / 2xl / 3xl / 4xl` derived from it.

---

## Home Page Animation Strategy (GSAP + Framer Motion)

The home page leverages a combination of **GSAP** and **Framer Motion** to deliver a dynamic, premium feel without compromising on performance.

### 1. GSAP (Scroll, Sequence, and Layout)
GSAP is used for heavy-lifting, scroll-linked animations, and complex timelines.
- **Dynamic Reveals**: The `useHomeChapterReveal` hook now accepts variants (`fade-up`, `slide-right`, `slide-left`, `scale-up`, `3d-flip`) to break up the monotony of simple scroll reveals. For instance, the `PeopleChapter` slides in from the left, while `AppChapter` enters from the right.
- **Scroll Pinning**: The `InteractivePhoneApp` in `AppChapter` utilizes native CSS layout sticky pinning combined with GSAP entrance effects. This keeps the phone fixed in the viewport while the chapter text scrolls, providing a highly engaging scrub storytelling format.
- **Parallax Imagery**: The `AgriParkChapter` integrates `ScrollTrigger` with `scrub: true` to create a subtle parallax effect on the background image, adding depth to the large 17-acre farm imagery.

### 2. Framer Motion (Micro-Interactions & UI States)
Framer Motion handles React-state-driven micro-interactions, layout transitions, and drag effects, primarily isolated inside complex components like the `InteractivePhoneApp`.
- **Fluid State Transitions**: The `InteractivePhoneApp` relies on `<AnimatePresence>` and `<motion.div>` for switching between the Chat, Store, and Action views.
- **Spring Animations**: Chat messages pop in with realistic spring tension as the agronomist replies in real-time.
- **Stagger Effects**: The `MALL_PRODUCTS` in the Kisaan Mall tab use a staggered reveal (`delay: i * 0.1`) when they appear on screen.
- **Hover & Press States**: Key buttons in the simulated app have been upgraded with `whileHover={{ scale: 1.02 }}` and `whileTap={{ scale: 0.98 }}` for tactile feedback.

---

## Getting the full source code

The chat only lists files I touched. To browse or export everything:

1. **Code Editor View** — top-left of the editor, switch views to browse every file.
2. **GitHub** — click the **+** menu (bottom-left of the chat input) → **GitHub** → connect and transfer. You then own the full repo and can clone/zip it locally.
