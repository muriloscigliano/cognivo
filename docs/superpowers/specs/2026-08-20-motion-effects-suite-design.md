# Motion & Effects Suite — Design Spec

**Date:** 2026-08-20
**Status:** Approved (user confirmed "build")
**Inspiration:** github.com/Jakubantalik/Libraries (border-beam, liquid-gooey, thinking-orbs) and github.com/Jakubantalik/transitions.dev. All code is original Cognivo implementations of the same visual concepts — no source is copied.

## Goal

Add a motion/effects layer to Cognivo:

1. Four new Lit components in `@cognivo/components`: `cg-border-beam`, `cg-liquid`, `cg-liquid-item`, `ai-thinking-orb`.
2. A pure-CSS motion recipe stylesheet exported as `@cognivo/tokens/motion.css` (~14 recipes).
3. One portable markdown report, `docs/EFFECTS-AND-MOTION.md`, self-contained so it can be dropped into any other repo and used as the integration guide (vanilla / React / Vue).

## Non-goals (v1)

- Liquid "dissolve" displacement mode (Safari-fragile, niche).
- Retrofitting existing components (cg-modal, cg-dropdown…) with the motion recipes — follow-up project.
- CLI / Pro tier / refine tool from transitions.dev — distribution is npm + the MD guide.
- Color-variant props (ocean/sunset…) — theming is the token system's job.

## 1. `cg-border-beam`

Wrapper: `<cg-border-beam><any-content/></cg-border-beam>` (default slot).

**Technique:** absolutely-positioned overlay div inside the shadow root (not host pseudo-elements). A conic-gradient rotates via animated CSS `@property --cg-beam-angle`, masked to a border ring with `mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); mask-composite: exclude`. Base variant is pure CSS animation; no rAF.

**API:**
- `variant`: `beam` (default) | `line` | `pulse`
- `intensity`: number 0–1 (default 1) — drives opacity/glow strength
- `duration`: number ms (default per variant)
- `active`: boolean, reflected (default true)
- `radius`: number px; falls back to `--cg-component-border-beam-radius` → `--cg-component-card-radius`
- Events: `cg-border-beam-activate`, `cg-border-beam-deactivate`

**Tokens (new tier-3):** `--cg-component-border-beam-color` (default → `--cg-color-action-primary-background`), `--cg-component-border-beam-width`, `--cg-component-border-beam-radius`.

**Pulse variant:** driven by shared `src/utils/pulse-driver.ts` — one module-level rAF loop for all subscribers, ~30fps cap, sleeps when no subscribers; instances unsubscribe via `IntersectionObserver` (offscreen) and `document.visibilitychange`.

**Reduced motion:** static border highlight (gradient at fixed angle), no rotation, no pulse.

**States:** active, inactive, reduced-motion, offscreen(paused). Non-interactive (no focus/hover states of its own; content unaffected).

## 2. `cg-liquid` + `cg-liquid-item`

**Technique (dual layer):** `cg-liquid` renders an SVG silhouette layer positioned behind its default slot. One blob (`<rect rx>`) per registered item. The goo filter applies ONLY to the SVG layer: `feGaussianBlur stdDeviation={blur}` → `feColorMatrix` alpha contrast (`0 0 0 {contrast} {-(contrast-1)/2 …}` style slope). Slotted content stays crisp on top with transparent backgrounds.

**Registration:** `cg-liquid-item` finds its `cg-liquid` ancestor in `connectedCallback` (closest() through light DOM) and registers; unregisters in `disconnectedCallback`. Items report layout via `ResizeObserver` + position reads; group mirrors each item's rect + border-radius into its blob. Group re-syncs on its own resize.

**Motion:**
- `effect="morph"`: blob undulates — animated rx/ry + subtle scale oscillation (CSS animations on the SVG blob).
- `effect="move"`: item translates to `x`/`y`/`scale`; silhouette follows with spring trailing.
- Springs: `src/utils/spring.ts` — pure function sampling a closed-form damped harmonic oscillator into a CSS `linear()` easing string + duration. Presets: `snappy`, `smooth`, `bouncy`.

**API:**
- Group: `blur` (default 6), `contrast` (default 18), `fill` (default `var(--cg-color-surface-cards-background)`), `shadow` (box-shadow string, optional)
- Item: `effect` (`morph` | `move`, default `morph`), `x`, `y`, `scale` (numbers), `transition` (`snappy` | `smooth` | `bouncy`, default `smooth`), `radius` (number px)

**Reduced motion:** goo merge remains (static visual); morph animation off; moves become near-instant (duration → `--cg-transition-duration-fast`).

**States:** idle, morphing, moving, reduced-motion, empty (no items → SVG layer hidden).

## 3. `ai-thinking-orb`

Canvas-based dotted orb agent-status indicator. Sibling of `ai-thinking` (which keeps its dots/spinner/skeleton variants).

**Technique:** 2D canvas, DPR capped at 2, no WebGL/filters. Renderer is a pure module `src/utils/orb-renderer.ts`: `renderOrbFrame(ctx-like, state, t, sizePx, color)` computing dot positions/radii/alphas per state — deterministic given `t` (testable without pixels). Nine original state animations named for Cognivo's agent vocabulary:
`thinking`, `searching`, `solving`, `listening`, `connecting`, `streaming`, `composing`, `idle`, `done`.

**API:**
- `state`: one of the nine (default `thinking`)
- `size`: `sm` (20px inline) | `md` (40px) | `lg` (64px avatar) — sm uses a simplified dot layout
- `speed`: number multiplier (default 1)
- `paused`: boolean (default false)
- `label`: string, overrides per-state aria-label defaults

**Theming:** dot color resolved from computed `--cg-color-surface-base-text` at render time (canvas can't read CSS vars); re-resolved on theme attribute changes via MutationObserver on `document.documentElement` (matching how other Cognivo components detect theme, if a shared util exists — reuse it).

**Lifecycle:** rAF loop per instance gated by `IntersectionObserver` + `visibilitychange`; `prefers-reduced-motion: reduce` → one static frame. Canvas: `role="img"`, `aria-label` from state map.

**States matrix:** 9 animation states × (running | paused | offscreen | reduced-motion).

## 4. Motion recipe layer — `@cognivo/tokens/motion.css`

Hand-authored source at `packages/tokens/src/motion/motion.css`, copied to `dist/motion.css` by the tokens build; new package export `"./motion.css"`.

**Catalog (~14 recipes, 3 families):**
- Container: `card-resize`, `panel-reveal`, `modal` (enter/exit), `dropdown`, `page-nav`
- Content: `text-swap`, `text-reveal`, `number-flip`, `icon-swap`
- Feedback: `badge-pop`, `success-confirm`, `error-shake`, `avatar-group`

**Convention:** base class + state modifier, e.g. `.cg-motion-modal` / `.cg-motion-modal--open`. Per-recipe knobs are custom properties (`--cg-motion-modal-distance` etc.) defaulting to `--cg-transition-*` / `--cg-spacing-*` tokens. Rules: explicit property lists (never `transition: all`), every recipe has a `@media (prefers-reduced-motion: reduce)` block collapsing to opacity-only or none, no raw hex, no bare px except inside `var(…, fallback)` defaults for knobs.

**New tokens (tier 1, via adding-tokens flow):** `--cg-transition-duration-slower: 500ms`; motion distance scale `--cg-motion-distance-{sm,md,lg}`.

## 5. Registration & governance

- All 4 components registered in the gen-ui generative library (parity test enforces 196 → 200).
- Manifests include `engagedBiasIds`: thinking-orb → labor illusion / operational transparency; border-beam → salience / attentional bias; liquid → aesthetic-usability; motion recipes documented (not manifested — CSS has no manifest).
- All CSS follows tier 3 → 2 → 1; banned tokens absent.

## 6. Testing

- Vitest, happy-dom. Per component: render, attribute reflection, state matrix, event firing, pause/reduced-motion wiring (matchMedia stubbed), registration/unregistration (liquid), aria labels.
- Pure-function suites: `spring.ts` (easing string well-formed, endpoints 0→1, preset convergence), `orb-renderer.ts` (deterministic frames, all 9 states produce dots in bounds, sm vs lg layouts differ).
- `motion.css` invariant suite: parse the file; assert reduced-motion guard per recipe, no `transition: all`, token discipline.
- Focus assertions (if any) via `focus()`+`activeElement` (happy-dom gotcha).
- Full gates per task: package tests + `pnpm type-check` (exactOptionalPropertyTypes gotcha) + lint.

## 7. Docs & report

- Docs playground pages: `docs/src/pages/components/` entries for border-beam, liquid, thinking-orb; `docs/src/pages/patterns/motion.astro` showing all recipes live.
- **`docs/EFFECTS-AND-MOTION.md`** — the single portable report: overview, install (`@cognivo/components`, `@cognivo/tokens`), full API tables (props/events/tokens) for the 4 components, the motion recipe catalog with copy-paste HTML+CSS per recipe, usage examples for vanilla HTML, React (adapter or direct custom-element), and Vue, theming-via-tokens notes, a11y/reduced-motion notes. No links to Cognivo-internal files, so it works standalone in another repo.

## 8. Delivery waves

1. **Wave 1:** `cg-border-beam` + pulse-driver + tokens + tests.
2. **Wave 2:** `ai-thinking-orb` + orb-renderer + tests.
3. **Wave 3:** `cg-liquid` / `cg-liquid-item` + spring + tests.
4. **Wave 4:** `motion.css` + tokens build wiring + invariant tests.
5. **Wave 5:** gen-ui registration + parity, docs pages, `EFFECTS-AND-MOTION.md`, changeset.
