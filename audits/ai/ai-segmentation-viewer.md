## ai-segmentation-viewer — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 23 | `.panel` background | `--cg-color-surface-cards-background` | Yes | — |
| 24 | `.panel` border-width | `--cg-border-width-50` | Yes | — |
| 24 | `.panel` border-color | `--cg-color-surface-cards-border` | Yes | — |
| 25 | `.panel` border-radius | `--cg-border-radius-150` | Yes | — |
| 26 | `.panel` overflow | `hidden` | Yes (keyword) | — |
| 30 | `.header` padding | `--cg-spacing-16` `--cg-spacing-24` | Yes | — |
| 33 | `.header-title` font-size | `--cg-font-size-sm` | Yes (14px min OK) | — |
| 33 | `.header-title` font-weight | `--cg-font-weight-semibold` | Yes | — |
| 34 | `.header-title` color | `--cg-color-surface-base-text` | Yes | — |
| 40 | `.canvas-wrap` background | `--cg-color-surface-base-background` | Yes | — |
| 42 | `img` width/height | `100%` / `auto` | Yes (keywords) | — |
| 44 | `.mask-overlay` inset | `0` | Yes | — |
| 45 | `.mask-overlay` transition | `opacity --cg-transition-duration-fast --cg-transition-easing-default` | Yes (explicit) | — |
| 48 | `.mask-overlay.selected` outline-width | `--cg-border-width-100` | Yes | — |
| 48 | outline-color | `--cg-color-action-primary-background-default` | Yes | — |
| 49 | outline-offset | `calc(-1 * --cg-spacing-2)` | Yes | — |
| 54 | `.opacity-row` padding | `--cg-spacing-4` `--cg-spacing-16` | Yes | — |
| 59 | `.legend` padding | `--cg-spacing-16` `--cg-spacing-24` | Yes | — |
| 60 | `.legend` gap | `--cg-spacing-12` | Yes | — |
| 63 | `.legend-title` font-size | `--cg-font-size-xs` | Label/eyebrow (uppercase), acceptable | — |
| 63 | `.legend-title` font-weight | `--cg-font-weight-semibold` | Yes | — |
| 64 | `.legend-title` color | `--cg-color-surface-container-outlined` | Real token, but semantic misuse (outline color used as text). See §2 | Flag |
| 65 | letter-spacing | `--cg-letter-spacing-wide` | Yes (valid per brief) | — |
| 67 | `.legend-items` gap | `--cg-spacing-8` | Yes | — |
| 69 | `.legend-item` gap | `--cg-spacing-8` | Yes | — |
| 70 | `.legend-item` padding | `--cg-spacing-6` `--cg-spacing-16` | Yes | — |
| 71 | border-radius | `--cg-border-radius-full` | Yes | — |
| 72 | border-width | `--cg-border-width-50` | Yes | — |
| 72 | border-color | `--cg-color-surface-cards-border` | Yes | — |
| 73 | background | `transparent` | Yes (keyword) | — |
| 74 | font-size | `--cg-font-size-xs` | Pill chip control label; <14px but acceptable | — |
| 74 | font-weight | `--cg-font-weight-medium` | Yes | — |
| 75 | color | `--cg-color-surface-container-outlined` | Real token, semantic misuse as text color | Flag |
| 77 | transition | `border-color … , color …` (explicit) | Yes | — |
| 79 | `:hover` border-color | `--cg-color-surface-cards-hover-border` | Yes | — |
| 79 | `:hover` color | `--cg-color-surface-base-text` | Yes | — |
| 80 | `.selected` border-color | `--cg-color-action-primary-background-default` | Yes | — |
| 80 | `.selected` color | `--cg-color-surface-base-text` | Yes | — |
| 81 | `.hidden` opacity | `0.4` | Yes (unitless opacity) | — |
| 82 | `:focus-visible` box-shadow | `0 0 0 3px var(--cg-overlay-accent-strong)` | Bare magic `3px` spread | Flag (no clean token swap) |
| 83 | `.legend-swatch` width/height | `--cg-spacing-8` | Yes (decorative dot) | — |
| 83 | `.legend-swatch` border-radius | `--cg-border-radius-full` | Yes | — |
| 85 | `.legend-toggle` padding | `0` | Yes | — |
| 88 | `.legend-toggle svg` width/height | `--cg-spacing-12` | Yes (icon sized via spacing; acceptable) | — |
| 91 | `:host([rounded=none])` radius | `0` | Yes | — |
| 92 | `rounded=sm` radius | `--cg-border-radius-50` | Yes | — |
| 93 | `rounded=md` radius | `--cg-border-radius-100` | Yes | — |
| 94 | `rounded=lg` radius | `--cg-border-radius-150` | Yes | — |
| 130 | inline mask `background`/`opacity` | `${m.color}` / `${this.opacity}` | Runtime data (user-provided), not a token target | — |
| 157 | inline swatch `background` | `${m.color}` | Runtime data | — |

### 2. Styling Audit

- **Border radius:** Consistent tier-1 scale (`--cg-border-radius-150` default, full for pills/swatches). Rounded variants map cleanly to 50/100/150. No raw radius except `0` (legitimate `none`). Good.
- **Spacing:** All from the tier-1 scale (4/6/8/12/16/24). No magic numbers. Good.
- **Font-size accessibility:** `.header-title` uses `--cg-font-size-sm` (14px) which meets the body minimum. `.legend-title` and `.legend-item` use `--cg-font-size-xs` (<14px) — an uppercase eyebrow label and a pill-chip control label, not body copy, so acceptable; the clickable chips border on small.
- **Translucent vs solid borders:** Borders use solid semantic surface tokens (`surface-cards-border`, `-hover-border`). Selected outline uses an action color. Good.
- **Transitions:** Both transitions enumerate explicit properties (`opacity`; `border-color`, `color`) with duration + easing tokens. No `transition: all`. `reducedMotion` style is imported and applied. Good.
- **Dark-theme suitability:** Colors resolve through theme-aware tier-2 surface/action tokens. The `--cg-color-surface-container-outlined` token used for legend text (lines 64, 75) is semantically an outline/divider color, not a text color — its contrast as foreground text is not guaranteed to meet AA on the card surface. Recommend `--cg-color-surface-cards-text`.
- **Focus ring (line 82):** Hard-coded `3px` spread. The codebase exposes `--cg-color-focus-ring` / `--cg-color-focus-ring-offset` and `--cg-outline-width-*`; no token represents a box-shadow spread, so not a 1:1 swap. Recommend reworking focus to `outline: var(--cg-outline-width-thick) solid var(--cg-color-focus-ring); outline-offset: var(--cg-outline-offset-default);` to remove the magic px.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | `.panel`, `.legend-item`, `.mask-overlay` base styles | None |
| Hover | Yes | `.legend-item:hover` (border + text color shift) | Mask overlays have no hover affordance |
| Active/Press | No | — | No `:active` press feedback on legend chips or toggle button |
| Focus-visible | Partial | `.legend-item:focus-visible` box-shadow ring | `.legend-toggle` button has no `:focus-visible` style — keyboard focus invisible |
| Disabled | N/A | No disabled prop/state | Legitimate — viewer is not a form control |
| Loading | No | — | `src` image load / async masks have no loading/skeleton state |
| Error | No | — | No broken-image / failed-load error state |
| Success/Complete | N/A | Not an AI-lifecycle status component | No AI state to represent; no ai-* token needed |
| Empty | No | — | No empty state when `masks` is `[]` and `src` is empty (renders empty panel) |

### 4. Interaction Audit

- **Keyboard:** Legend chips are `tabindex="0" role="button"` with `keydown` handling Enter and Space (`preventDefault`). The nested `.legend-toggle` is a real `<button>` inside a focusable `role="button"` chip — a nested-interactive anti-pattern and a double tab stop.
- **ARIA:** Chips use `role="button"` but have no `aria-pressed`/`aria-selected` to convey selection to AT (selection is visual-only). The toggle button has a dynamic `aria-label` ("Hide/Show {label}") — good. Eye SVGs are decorative inside a labeled button. The `<img>` has a static `alt="Segmentation source"`.
- **CustomEvents:** `ai-segment-select` → `{ id, label }`; `ai-segment-toggle` → `{ id, visible }`. Both `bubbles: true, composed: true`. Detail shapes match the JSDoc `@fires`. Toggle handler calls `e.stopPropagation()` to avoid triggering select — correct.
- **Touch targets:** `.legend-item` chip is ~28px tall; `.legend-toggle` icon button is ~12px with `padding: 0` — both below 44px. Sizing/design changes (noted here, not in fixes array).

### 5. Visual Design Check

- **Modern/sleek:** Adequate. Pill chips with swatch dots and eye toggles are a clean, recognizable pattern.
- **Radius:** Consistent and intentional (full pills, 150 panel).
- **Breathing room:** Reasonable padding (16/24) and gaps (8/12).
- **Dividers:** No divider between header / canvas / opacity row / legend — sections blend; a `--cg-color-surface-cards-divider` hairline would sharpen hierarchy.
- **Typography hierarchy:** Thin — header (sm/semibold) vs legend eyebrow (xs/uppercase/wide) vs chip labels (xs/medium); the legend-title color token weakens it.
- **Showcase-ready:** Close, but missing empty/loading/error states, invisible toggle focus, and the semantic text-color token hold it back.
- **Verdict:** adequate.

### 6. Fixes Needed

1. **Line 64** — legend title uses an outline/divider color as text color.
   - Current: `color: var(--cg-color-surface-container-outlined);`
   - Fixed: `color: var(--cg-color-surface-cards-text);`
   - Why: `--cg-color-surface-container-outlined` is an outline/border-purpose token; using it as foreground text risks failing AA contrast on the card surface. `--cg-color-surface-cards-text` is the correct tier-2 text token for content on a card surface.

2. **Line 75** — legend chip label uses the same outline token as text color.
   - Current: `color: var(--cg-color-surface-container-outlined);`
   - Fixed: `color: var(--cg-color-surface-cards-text);`
   - Why: Same semantic misuse; chip labels are foreground text and must use a text-purpose token.

**Flags (no token-verified swap — described, not auto-fixed):**

- **Line 82** — `box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);` contains a bare magic `3px`. No token represents a box-shadow spread width, so not a 1:1 swap. Recommend replacing with `outline: var(--cg-outline-width-thick) solid var(--cg-color-focus-ring); outline-offset: var(--cg-outline-offset-default);` to remove the magic px and use dedicated focus tokens.
- **`.legend-toggle` missing `:focus-visible`** — keyboard focus on the show/hide button is invisible; add a focus ring.
- **Nested interactive controls** — a `<button>` inside a `role="button"` chip is an ARIA anti-pattern and double tab stop; restructure so selection and visibility-toggle are siblings.
- **Missing `aria-pressed`/`aria-selected`** on selectable legend chips — selection state is visual-only.
- **Missing empty / loading / error states** — expected for an AI media viewer.
- **Touch targets** — legend chip (~28px) and toggle button (~12px) are below 44px (design change, not a token fix).

### Research-backed enhancements

Drawn from 2025-era patterns in the [shadcn/ui design system](https://ui.shadcn.com/), [Vercel Academy's anatomy of shadcn/ui components](https://vercel.com/academy/shadcn-ui/extending-shadcn-ui-with-custom-components), and [shadcn's 2025 component direction](https://medium.com/@hashbyt/blog-shadcn-new-ui-components-2025-modern-frontend-design-d3621786855e). Each maps to a gap surfaced in §3–§5 above.

1. **Reciprocal canvas↔legend hover linking (mask spotlight).** Today hover only lives on legend chips (§3) and masks have no hover affordance. Adopt the Linear/Vercel "hover-to-highlight" cross-reference pattern: hovering a legend chip raises its mask's opacity toward 1 and dims sibling masks (e.g. to ~0.25), and hovering a mask region reciprocally elevates its chip. Implement as a single `--mask-dim` custom property toggled on the canvas wrapper plus a `data-hover-id` attribute so the highlight is one DOM write, not per-mask style thrash. This turns a static legend into a spatial navigator and resolves the "masks have no hover affordance" finding.

2. **Skeleton-shimmer load + broken-image error state.** §3 flags missing loading and error states. Follow the shadcn `Skeleton` convention: while the `<img>` `src` is decoding (gate on the `load`/`error` events, not a timer), render a shimmer placeholder sized to the canvas aspect ratio using `--cg-color-surface-base-background` with an animated linear-gradient sweep (respecting the already-imported `reducedMotion`). On `error`, swap to a centered broken-image glyph + "Couldn't load segmentation source" using `--cg-color-status-danger-*`. Prevents the empty-flash and the silent-failure paths.

3. **Toolbar-style segmented control for opacity instead of a bare row.** The opacity row (§1, line 54) is unstyled. shadcn's 2025 components lean on compact inline `ToggleGroup`/segmented controls. Replace the raw range with a small segmented quick-set (`0% · 50% · 100%`) sitting beside the slider, so the most common values are one click — a density/affordance win that matches the Vercel toolbar idiom and gives the slider discrete keyboard stops.

4. **Selection as a real pressed control with `aria-pressed`, plus 44px hit area.** §4 flags visual-only selection and sub-44px targets. Per shadcn/Radix toggle semantics, make each chip a single `<button aria-pressed>` (eliminating the nested-button anti-pattern from §4 simultaneously), give it `min-height: var(--cg-spacing-44)` (or padding to reach it), and drive the selected ring from the existing focus/action tokens. One restructure closes three findings: nested interactive, missing `aria-pressed`, and touch target.

5. **Hairline section dividers + count badge on the legend header.** §5 notes sections blend with no dividers and thin hierarchy. Add a `--cg-color-surface-cards-divider` 1px rule between header / canvas / opacity / legend (the Linear panel idiom of crisp 1px separators), and append a muted count badge to the legend title (e.g. "Layers · 6") using `--cg-color-surface-cards-text`. Sharpens hierarchy and gives the viewer the "instrument panel" density of modern layer UIs.

6. **Bulk "solo / show-all / hide-all" affordances in the legend header.** Per-mask toggles exist but there's no fast way to isolate one mask — the standard "solo" gesture in layer/segmentation viewers (Figma/Photoshop-class, echoed in modern web layer panels). Add a small header control cluster: Show all, Hide all, and Alt-click-a-chip = solo (hide all others). Emits the existing `ai-segment-toggle` events in a batch. High-leverage for viewers with many overlapping masks.

Sources:
- [shadcn/ui — design system foundation](https://ui.shadcn.com/)
- [Vercel Academy — anatomy of shadcn/ui components](https://vercel.com/academy/shadcn-ui/extending-shadcn-ui-with-custom-components)
- [How shadcn's new components redefine modern UI design (2025)](https://medium.com/@hashbyt/blog-shadcn-new-ui-components-2025-modern-frontend-design-d3621786855e)
