## ai-model-comparison — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 35 | animation duration | `--cg-transition-duration-default` | ✅ | — |
| 35 | animation easing | `--cg-transition-easing-ease-out` | ✅ | — |
| 37 | display | `none` | ✅ | keyword |
| 41 | border width | `--cg-border-width-50` | ✅ | — |
| 41 | border color | `--cg-color-surface-cards-border` | ✅ | tier-2 |
| 42 | border-radius | `--cg-border-radius-150` | ✅ | — |
| 43 | background | `--cg-color-surface-cards-background` | ✅ | tier-2 |
| 44 | box-shadow | `--cg-elevation-1` | ✅ | — |
| 48 | border-radius | `0` | ✅ | keyword |
| 49 | border-radius | `--cg-border-radius-50` | ✅ | — |
| 50 | border-radius | `--cg-border-radius-100` | ✅ | — |
| 51 | border-radius | `--cg-border-radius-150` | ✅ | — |
| 52 | border-radius | `--cg-border-radius-full` | ✅ | — |
| 57 | font-size | `--cg-font-size-sm` | ✅ | 14px min OK |
| 61 | padding | `--cg-spacing-12` / `--cg-spacing-16` | ✅ | — |
| 63 | border-bottom | `--cg-border-width-50` + `--cg-color-surface-cards-border` | ✅ | — |
| 67 | background (hover) | `--cg-overlay-dark-subtle` | ✅ | tier-1 overlay, valid |
| 70 | color | `--cg-color-surface-container-outlined` | ✅ | tier-2 |
| 71 | font-size | `--cg-font-size-xs` | ✅ | header label, OK |
| 72 | font-weight | `--cg-font-weight-bold` | ✅ | — |
| 74 | letter-spacing | `--cg-letter-spacing-wide` | ✅ | confirmed valid |
| 80 | gradient stops | `--cg-overlay-dark-subtle` ×2 | ✅ | composited over solid |
| 81 | background base | `--cg-color-surface-cards-background` | ✅ | — |
| 82 | border-bottom | `--cg-border-width-50` + `--cg-color-surface-cards-border` | ✅ | — |
| 91 | background | `--cg-color-surface-cards-background` | ✅ | — |
| 96 | gradient stops | `--cg-overlay-dark-subtle` ×2 | ✅ | — |
| 97 | background base | `--cg-color-surface-cards-background` | ✅ | — |
| 101 | background (hover) | `--cg-color-surface-cards-hover-background` | ✅ | tier-2 |
| 106 | min-width | `--cg-spacing-128` | ✅ | — |
| 110 | color | `--cg-color-surface-base-text` | ✅ | tier-2 |
| 111 | font-weight | `--cg-font-weight-bold` | ✅ | — |
| 113 | font-size | `--cg-font-size-sm` | ✅ | — |
| 116 | color | `--cg-color-surface-container-outlined` | ✅ | tier-2 |
| 117 | font-size | `--cg-font-size-xs` | ✅ | secondary label OK |
| 121 | color | `--cg-color-surface-base-text` | ✅ | — |
| 122 | font-weight | `--cg-font-weight-semibold` | ✅ | — |
| 135 | gap | `--cg-spacing-4` | ✅ | — |
| 141 | gap | `--cg-spacing-6` | ✅ | — |
| 145 | width | `--cg-spacing-64` | ✅ | — |
| 146 | height | `--cg-spacing-6` | ✅ | — |
| 147 | background (track) | `--cg-color-surface-cards-border` | ✅ | tier-2 |
| 148 | border-radius | `--cg-border-radius-50` | ✅ | — |
| 155 | border-radius | `--cg-border-radius-50` | ✅ | — |
| 156 | transition | `width` + `--cg-transition-duration-slow` + `--cg-transition-easing-default` | ✅ | explicit |
| 157 | transition-delay | `var(--bar-delay, 0ms)` | ⚠️ | runtime var default — see §2 |
| 159 | background (low fill) | `--cg-color-status-error-text-default` | ⚠️ | exists, but `-text` token used as fill; background variant preferred — see §6 |
| 161–163 | gradient (mid fill) | `--cg-color-status-warning-text-default` → `--cg-color-status-success-text-default` | ⚠️ | same `-text`-as-fill note |
| 165 | background (high fill) | `--cg-color-status-success-text-default` | ⚠️ | same note |
| 166 | background (best fill) | `--cg-color-action-primary-background-default` | ✅ | tier-2 |
| 169 | font-size | `--cg-font-size-xs` | ✅ | numeric value OK |
| 170 | font-weight | `--cg-font-weight-semibold` | ✅ | — |
| 171 | color | `--cg-color-surface-base-text` | ✅ | — |
| 178 | padding | `0 --cg-spacing-6` | ✅ | — |
| 179 | height | `--cg-spacing-16` | ✅ | — |
| 180 | border-radius | `--cg-border-radius-full` | ✅ | — |
| 181 | font-size | `10px` | ❌ | **raw magic px** → `--cg-font-size-xs` |
| 182 | font-weight | `--cg-font-weight-bold` | ✅ | — |
| 183 | letter-spacing | `--cg-letter-spacing-wide` | ✅ | — |
| 185 | background | `--cg-color-action-primary-background-default` | ✅ | — |
| 186 | color | `--cg-color-action-primary-text-default` | ✅ | — |
| 191 | color | `--cg-color-surface-container-outlined` | ✅ | — |
| 193 | font-size | `--cg-font-size-xs` | ✅ | — |
| 197 | padding | `--cg-spacing-2` / `--cg-spacing-8` | ✅ | — |
| 198 | border-radius | `--cg-border-radius-50` | ✅ | — |
| 199 | font-size | `--cg-font-size-xs` | ✅ | — |
| 201 | background | `--cg-color-surface-container-background` | ✅ | tier-2 |
| 202 | border | `--cg-border-width-50` + `--cg-color-surface-cards-border` | ✅ | — |
| 203 | color | `--cg-color-surface-base-text` | ✅ | — |
| 210 | min-height | `--cg-spacing-40` | ✅ | 40px (see §4 touch target) |
| 211 | margin | `--cg-spacing-4` | ✅ | — |
| 212 | padding | `--cg-spacing-8` / `--cg-spacing-16` | ✅ | — |
| 213 | border-radius | `--cg-border-radius-100` | ✅ | — |
| 214 | border | `--cg-border-width-50` + `--cg-color-surface-cards-border` | ✅ | — |
| 215 | background | `transparent` | ✅ | keyword |
| 216 | color | `--cg-color-surface-base-text` | ✅ | — |
| 217 | font-size | `--cg-font-size-xs` | ✅ | — |
| 218 | font-weight | `--cg-font-weight-semibold` | ✅ | — |
| 221–224 | transition | `background`/`color`/`border-color` + `--cg-transition-duration-fast` + `--cg-transition-easing-default` | ✅ | explicit |
| 227–229 | hover bg/color/border | `--cg-color-action-primary-background-default` / `-text-default` | ✅ | — |
| 231 | transform scale | `--cg-interaction-press-scale` | ✅ | — |
| 234 | box-shadow (focus) | `0 0 0 3px --cg-overlay-accent-strong` | ❌ | **raw magic `3px`** + outline:none — see §6 |

### 2. Styling Audit

- **Border radius**: Fully tokenized and configurable via the `rounded` attribute (none/sm/md/lg/full → `--cg-border-radius-{50,100,150,full}`). Inner elements use `--cg-border-radius-50`/`-full`. Consistent and modern.
- **Spacing**: All padding/gap/margins from the `--cg-spacing-*` scale. No magic spacing values.
- **Font-size accessibility**: Body table text is `--cg-font-size-sm` (14px) — meets the 14px minimum. Secondary/meta labels and the score value use `--cg-font-size-xs` (sub-label/numeric — acceptable). **The "Best" pill uses a raw `10px`** (line 181), which is both a hard token violation and below the xs scale; it should be `--cg-font-size-xs`.
- **Translucent vs solid borders**: All borders are solid semantic surface tokens. Sticky header/column correctly composite a translucent `--cg-overlay-dark-subtle` gradient over a solid `--cg-color-surface-cards-background` so the sticky layers stay opaque on scroll — good technique, well-commented.
- **Transitions explicit vs all**: No `transition: all`. Both the bar-fill (line 156) and select button (lines 221–224) enumerate properties with duration + easing tokens. Compliant.
- **Motion tokens**: Entrance uses `fadeSlideIn` with `--cg-transition-duration-default`; `reducedMotion` shared style is imported and applied, so the staggered animation respects `prefers-reduced-motion`. Good.
- **Dark-theme suitability**: Surface/cards/container semantic tokens are dark-first by design; status and action-primary fills provide contrast. Suitable.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | ✅ | Table renders rows, score bars animate from width:0 to score% | — |
| Hover | ✅ | `tbody tr.data-row:hover` row tint + sticky-col hover bg; `.select-btn:hover` swaps to primary | — |
| Active/Press | ✅ | `.select-btn:active` → `scale(--cg-interaction-press-scale)` | Only on the button; rows/cells have no press state (acceptable — rows aren't actionable) |
| Focus-visible | ⚠️ | `.select-btn:focus-visible` uses `outline:none` + `box-shadow: 0 0 0 3px` | Magic `3px`; bypasses `--cg-color-focus-ring` / `--cg-focus-ring-width` tokens — see §6 |
| Disabled | N/A | No disabled concept for a comparison table or Select button | Reasonable |
| Loading | N/A | Component is data-driven; streaming/loading handled by parent. No skeleton | Could add a skeleton, but not required |
| Error | N/A | Pure presentation of provided model data; no fetch | Reasonable |
| Success | N/A | No async submit | Reasonable |
| Empty | ✅ (bonus) | `if (!this.models.length) return nothing` (line 273) | Renders nothing — acceptable but a friendly empty state would be stronger |

### 4. Interaction Audit

- **Keyboard**: The only interactive element is the native `<button class="select-btn">` — natively focusable and Enter/Space activatable. No custom key handling needed. Table itself is non-interactive (scroll only). Good.
- **ARIA roles/labels/states**:
  - `role="region"` + `aria-label="Model comparison table"` on the wrapper (line 277).
  - `<th scope="col">` for model headers; `scope="row"` on the metric label cell.
  - Score bars: `role="progressbar"` with `aria-valuenow`/`aria-valuemin`/`aria-valuemax` and an `aria-label` combining model + metric (line 307). Strong.
  - "Best" pill has `aria-label="Best in {metric}"` (color-blind-safe + announced).
  - Select button: `aria-label="Select {name}"` (line 333). Good.
  - Note: `scope="row"` is placed on a `<td>` (lines 295, 318, 324) rather than a `<th scope="row">`; `scope` is technically only valid on `<th>`. Minor semantic nit — converting the metric label cell to `<th scope="row">` would be more correct, but this is an HTML-semantics refinement, not a token violation.
- **CustomEvents**: `ai-comparison-select` dispatched with `detail: { model }`, `bubbles: true`, `composed: true` (lines 266–269) — correct shape, crosses shadow boundary, matches the documented `@fires` JSDoc. Correct.
- **Touch targets**: Select button `min-height: --cg-spacing-40` (40px) — below the 44px AA target. Width is content-driven (padding 8/16). This is a sizing enlargement recommendation (design change), not a token violation — flagged here, excluded from fixes.

### 5. Visual Design Check

- **Modern/sleek?** Yes — sticky header + sticky first column, animated score bars, color-coded tiers, color-blind-safe "Best" pill, tabular-nums for score alignment. Reads as a polished comparison surface.
- **Radius?** Tokenized and user-configurable via `rounded`.
- **Breathing room?** 12/16 cell padding gives comfortable density without feeling sparse.
- **Dividers?** Row `border-bottom` from `--cg-color-surface-cards-border`; sticky layers cleanly separated by composited overlays.
- **Typography hierarchy?** Uppercase xs bold headers → sm bold model names → xs muted providers → sm semibold metric labels → numeric score values. Clear hierarchy.
- **HeroUI/Vercel showcase-ready?** Yes, after fixing the `10px` pill font and the focus-ring magic number. The progressbar a11y and color-blind-safe best indicator exceed typical showcase quality.
- **Verdict: strong**

### 6. Fixes Needed

1. **Line 181** — `.best-pill` `font-size: 10px;` → `font-size: var(--cg-font-size-xs);`
   Why: raw magic px is a hard token violation; the `xs` scale token is the smallest sanctioned font size and visually equivalent.

2. **Line 234** — `.select-btn:focus-visible` `box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);` contains a raw magic `3px`.
   Recommended fix (token-verified pieces): `box-shadow: 0 0 0 var(--cg-focus-ring-width) var(--cg-color-focus-ring);` — both `--cg-focus-ring-width` and `--cg-color-focus-ring` exist in the vocab and align the focus ring with the design-system focus token instead of the generic accent overlay. (Flagged rather than auto-applied because it changes two values at once — the `3px`→token and the overlay→focus-ring color; reviewer should confirm the intended focus color.)

3. **Lines 159, 161–163, 165 (flag, not auto-fix)** — score-bar fills use `--cg-color-status-{error,warning,success}-text-default` as solid backgrounds. The matching `-background-default` variants (`--cg-color-status-error-background-default`, `-warning-`, `-success-`) all exist and are the semantically correct token for a filled bar. However, status `-background` tokens are typically low-contrast tints unsuitable for a saturated score bar, so swapping may reduce visual punch. Recommend a design review rather than a mechanical swap — describing here as a flag, not placing in the verified-fix array.

**Auto-fixable verified defect:** Fix #1 (line 181) — replacement token `--cg-font-size-xs` confirmed in vocab.

### Research-backed enhancements

Modern 2025-era comparison surfaces (shadcn/TanStack data tables, Vercel v0 output, Linear/HeroUI aesthetics) have converged on a handful of affordances this component is missing. Concrete, scoped suggestions:

1. **Sortable column headers (shadcn/TanStack pattern).** shadcn's data table — built on TanStack Table, the same engine behind Linear and Notion tables — makes every metric header a click-to-sort control with a directional caret that rotates on toggle. For a model-comparison table this is the single highest-value interaction: let users click a metric header (e.g. "Latency", "Cost") to re-rank the model columns by that dimension. Add `aria-sort="ascending|descending|none"` to the sorted `<th>` and a rotating chevron driven by `--cg-transition-duration-fast`. This turns a static readout into an exploratory tool. (Source: [shadcn Data Table](https://www.shadcn.io/ui/data-table), [shadcn/ui Data Table docs](https://ui.shadcn.com/docs/components/radix/data-table).)

2. **Winner-column emphasis, not just a per-row "Best" pill (Linear/HeroUI highlight pattern).** Linear and HeroUI comparison layouts lift the recommended/winning option out of the grid with a subtle full-column treatment — a tinted column background plus a slightly stronger border — rather than relying on a small per-cell pill. Promote the best-overall model column with a `--cg-color-surface-cards-hover-background` tint and a 1px `--cg-color-action-primary-background-default` left/right rule, so the eye lands on the recommendation before reading a single number. The existing color-blind-safe pills stay as the per-metric signal; this adds the missing aggregate signal.

3. **Animated count-up on score values to match the bar-fill motion (Vercel/HeroUI micro-animation).** The score bars already animate width 0→score% on entrance, but the numeric labels snap to final value instantly, creating a perceptual mismatch. Vercel- and HeroUI-style dashboards tween the number in lockstep with the bar (a short `requestAnimationFrame` count-up gated behind the same `prefers-reduced-motion` check already imported via `reducedMotion`). Reuse the existing `--bar-delay` stagger so number and bar finish together. Low effort, high polish.

4. **Skeleton loading state for streaming model data (shadcn/v0 default).** §3 marks Loading as N/A, but every shadcn/v0-generated data table ships a shimmer skeleton because comparison data is frequently fetched or LLM-streamed — exactly Cognivo's gen-ui use case. Add a `loading` boolean that renders placeholder rows: token-driven bars at a fixed width pulsing via a `--cg-color-surface-cards-border` → `--cg-color-surface-cards-hover-background` keyframe. This removes layout shift when the parent streams models in. (Source: [The Anatomy of shadcn/ui Components, Vercel Academy](https://vercel.com/academy/shadcn-ui/extending-shadcn-ui-with-custom-components).)

5. **Sticky-column scroll-shadow affordance (Linear/shadcn horizontal-scroll cue).** The first column is sticky, but on a wide table with many models there's no signal that more columns exist off-screen to the right. Modern horizontally-scrolling tables (Linear, shadcn) fade in a thin inset shadow on the sticky column's trailing edge only while content is scrolled, using a scroll-position-driven opacity on the existing composited overlay. This is a discoverability cue, not decoration — without it users miss columns. Reuse the already-present `--cg-overlay-dark-subtle` gradient and toggle its opacity on a scroll listener.

6. **Friendly empty state instead of `return nothing` (v0/HeroUI convention).** §3 notes the empty case renders nothing. v0 and HeroUI never ship a bare-empty table; they render a centered, low-emphasis placeholder ("No models to compare yet") inside the bordered region so the component still occupies its slot and communicates state. A single centered `<div>` using `--cg-color-surface-container-outlined` text inside the existing `role="region"` wrapper preserves layout and reads as intentional rather than broken.

Sources: [shadcn/ui](https://ui.shadcn.com/), [shadcn Data Table](https://www.shadcn.io/ui/data-table), [shadcn/ui Data Table docs](https://ui.shadcn.com/docs/components/radix/data-table), [The Anatomy of shadcn/ui Components — Vercel Academy](https://vercel.com/academy/shadcn-ui/extending-shadcn-ui-with-custom-components), [Why shadcn/ui is Different — Vercel Academy](https://vercel.com/academy/shadcn-ui/why-shadcn-ui-is-different).
