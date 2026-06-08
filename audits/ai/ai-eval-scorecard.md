## ai-eval-scorecard — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 22 | min-width | `320px` | ⚠️ bare px | Sizing magic number. No tier-3 width token exists for this component; leave as-is (flagged, not fixed). |
| 26 | background | `--cg-color-surface-cards-background` | ✅ | — |
| 27 | border-width | `--cg-border-width-50` | ✅ | — |
| 27 | border-color | `--cg-color-surface-cards-border` | ✅ | — |
| 28 | border-radius | `--cg-border-radius-150` | ✅ | — |
| 35 | padding | `--cg-spacing-20` / `--cg-spacing-24` | ✅ | — |
| 38 | gap | `--cg-spacing-2` | ✅ | — |
| 41 | font-size | `--cg-font-size-sm` | ✅ | — |
| 41 | font-weight | `--cg-font-weight-semibold` | ✅ | — |
| 42 | color | `--cg-color-surface-base-text` | ✅ | — |
| 45 | font-size | `--cg-font-size-xs` | ✅ (caption/meta, not body) | — |
| 46 | color | `--cg-color-surface-container-outlined` | ❌ outline token used as text | Use `--cg-color-surface-container-text` |
| 51 | gap | `--cg-spacing-6` | ✅ | — |
| 52 | font-size | `--cg-font-size-sm` | ✅ | — |
| 52 | font-weight | `--cg-font-weight-bold` | ✅ | — |
| 53 | font-family | `--cg-font-family-mono` | ✅ | — |
| 57 | width/height | `--cg-spacing-8` | ✅ (acceptable as small dot sizing) | — |
| 58 | border-radius | `--cg-border-radius-full` | ✅ | — |
| 60 | background | `--cg-color-status-success-text-default` | ✅ semantic status | — |
| 61 | background | `--cg-color-status-warning-text-default` | ✅ | — |
| 62 | background | `--cg-color-status-error-text-default` | ✅ | — |
| 63–65 | color | status success/warning/error `-text-default` | ✅ | — |
| 69 | padding | `--cg-spacing-4` / `-16` | ✅ | — |
| 73 | padding | `--cg-spacing-16` / `-12` | ✅ | — |
| 74 | border-radius | `--cg-border-radius-100` | ✅ | — |
| 75 | border-width | `--cg-border-width-50` | ✅ | — |
| 75 | border-color | `transparent` | ✅ allowed | — |
| 77 | transition | `background ... fast`, `border-color ... fast` (explicit, tokenized) | ✅ | — |
| 79 | background (hover) | `--cg-overlay-dark-subtle` | ✅ tier-1 overlay | — |
| 79 | border-color (hover) | `--cg-color-surface-cards-border` | ✅ | — |
| 80 | outline | `none` | ✅ | — |
| 80 | box-shadow | `0 0 0 3px var(--cg-overlay-accent-strong)` | ❌ wrong color token + bare `3px` | Use `--cg-color-focus-ring` for the focus indicator color (see Fixes) |
| 84 | gap | `--cg-spacing-12` | ✅ | — |
| 85 | margin-bottom | `--cg-spacing-8` | ✅ | — |
| 89 | font-size | `--cg-font-size-sm` | ✅ | — |
| 89 | font-weight | `--cg-font-weight-medium` | ✅ | — |
| 90 | color | `--cg-color-surface-base-text` | ✅ | — |
| 93 | font-size | `--cg-font-size-sm` | ✅ | — |
| 93 | font-weight | `--cg-font-weight-semibold` | ✅ | — |
| 94 | font-family | `--cg-font-family-mono` | ✅ | — |
| 95 | color | `--cg-color-surface-base-text` | ✅ | — |
| 98 | font-size | `--cg-font-size-xs` | ✅ (numeric delta meta) | — |
| 98 | font-weight | `--cg-font-weight-medium` | ✅ | — |
| 99 | font-family | `--cg-font-family-mono` | ✅ | — |
| 101 | color (delta-up) | `--cg-color-status-success-text-default` | ✅ | — |
| 102 | color (delta-down) | `--cg-color-status-error-text-default` | ✅ | — |
| 106 | height | `--cg-spacing-4` | ✅ (bar thickness) | — |
| 106 | border-radius | `--cg-border-radius-full` | ✅ | — |
| 107 | background (track) | `--cg-color-surface-cards-border` | ✅ | — |
| 110 | border-radius | `--cg-border-radius-full` | ✅ | — |
| 111 | background (fill) | `--cg-color-action-primary-background-default` | ✅ | — |
| 112 | opacity | `0.6` | ✅ unitless opacity allowed | — |
| 113 | transition | `width ... slow ... default` (explicit, tokenized) | ✅ | — |
| 118 | margin-top | `--cg-spacing-8` | ✅ | — |
| 119 | font-size | `--cg-font-size-xs` | ⚠️ body-like explanation text below 14px (see §2) | Flagged — no fix forced |
| 120 | color | `--cg-color-surface-container-outlined` | ❌ outline token as text | Use `--cg-color-surface-container-text` |
| 121 | line-height | `--cg-line-height-snug` | ✅ | — |
| 125 | padding | `--cg-spacing-48` / `-24` | ✅ | — |
| 126 | color | `--cg-color-surface-container-outlined` | ❌ outline token as text | Use `--cg-color-surface-container-text` |
| 127 | font-size | `--cg-font-size-sm` | ✅ | — |
| 131 | border-radius (none) | `0` | ✅ allowed | — |
| 132 | border-radius (sm) | `--cg-border-radius-50` | ✅ | — |
| 133 | border-radius (md) | `--cg-border-radius-100` | ✅ | — |
| 134 | border-radius (lg) | `--cg-border-radius-150` | ✅ | — |

### 2. Styling Audit

- **Border radius:** Card uses `--cg-border-radius-150` with a full `rounded` variant matrix (none/sm/md/lg) all token-backed. Consistent, no magic radii. Good.
- **Spacing:** All padding/gap/margins come from the `--cg-spacing-*` scale. No raw px spacing. Good.
- **Font-size accessibility:** Header title, metric label, metric value, and empty state all use `--cg-font-size-sm` (≥14px). However the **metric explanation** (line 119) uses `--cg-font-size-xs` for what is effectively readable body copy ("expandable explanations"). Header subtitle and delta are meta/caption text where xs is defensible, but the explanation paragraph should arguably be `--cg-font-size-sm`. Flagged as a readability concern; not forced into fixes because xs is a legitimate token and the call is borderline.
- **Translucent vs solid borders:** Card and metric borders use solid semantic surface-border tokens. Hover uses `--cg-overlay-dark-subtle` background overlay — appropriate translucent layering for a dark-first surface. Good.
- **Transitions explicit vs all:** No `transition: all`. Both transitions (lines 77, 113) enumerate properties and use `--cg-transition-duration-*` + `--cg-transition-easing-default`. `reducedMotion` style is imported and applied. Excellent.
- **Dark-theme suitability:** All colors resolve through tier-2 semantic surface/status tokens and tier-1 overlays — fully theme-adaptive. Strong dark-first posture.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | ✅ | Card + metric rows render with tokenized surface/text | None |
| Hover | ✅ | `.metric:hover` overlay bg + border-color (line 79) | None |
| Active/Press | ❌ | No `:active` styling on metric rows | Minor: pressable `role="button"` rows give no press feedback |
| Focus-visible | ⚠️ | `.metric:focus-visible` box-shadow ring (line 80) | Uses `--cg-overlay-accent-strong` instead of `--cg-color-focus-ring`; bare `3px` magic spread |
| Disabled | N/A | Component is a read-only data display; no disabled concept | — |
| Loading | N/A | Scores are passed in synchronously; no async loading state in this component | — |
| Error | N/A | No error surface; grade "F" is data, not component error | — |
| Success | N/A | Grade A/B is data semantics, not a component success state | — |
| Empty | ✅ (bonus) | `.empty` "No evaluation data" when `scores.length === 0` (line 151) | None |

### 4. Interaction Audit

- **Keyboard:** Metric rows are `tabindex="0"` and handle `Enter` and `Space` (line 172) with `preventDefault()`. Good. Note: the keydown handler toggles `_expandedMetric` but does **not** dispatch `ai-eval-metric-click`, whereas the `@click` handler (line 171) both toggles and dispatches. Keyboard activation therefore does not fire the public event — an inconsistency worth flagging (behavioral, not a token fix).
- **ARIA:** Card has `role="figure"` with `aria-label` combining title + grade (line 154) — reasonable for a labeled data graphic. Metric rows have `role="button"`. Missing `aria-expanded` on the expandable metric rows despite toggling an explanation panel — accessibility gap (flagged, not a token fix). Grade badge conveys status by color/letter; letter text is present so not color-only.
- **CustomEvents:** `ai-eval-metric-click` fires with `{ bubbles: true, composed: true, detail: { metric } }` — correct shape, escapes shadow DOM, matches `@fires` JSDoc. Good (but only on pointer click, not keyboard — see above).
- **Touch targets:** Metric rows have generous padding (`--cg-spacing-16` vertical) so effective height comfortably exceeds 44px. Good.

### 5. Visual Design Check

Clean, modern eval card: rounded container, mono-typeset numeric values, color-coded grade dot, and a subtle progress bar per metric with a slow fill transition. Breathing room is good via the spacing scale; the grade badge + avg summary reads like a polished analytics widget. Weaknesses: explanation text at xs is a touch small, focus ring uses an accent overlay rather than the dedicated focus-ring token, and the muted text leans on an outline token (slightly off-semantic). Dividers are implied by spacing rather than rules — acceptable for this density. Showcase-ready with the small text/semantic fixes.

One-word verdict: **strong**

### 6. Fixes Needed

1. **Line 46** — header-subtitle muted text uses an outline token.
   - Current: `color: var(--cg-color-surface-container-outlined);`
   - Fixed: `color: var(--cg-color-surface-container-text);`
   - Why: `-outlined` is a border/outline semantic token; muted secondary **text** should use the container **text** token.

2. **Line 80** — focus-visible ring uses an accent overlay instead of the dedicated focus token.
   - Current: `.metric:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong); }`
   - Fixed: `.metric:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--cg-color-focus-ring); }`
   - Why: Focus indicators must use the dedicated `--cg-color-focus-ring` tier-2 token for consistent, theme-correct focus affordance. (The bare `3px` spread is a common focus-ring convention with no matching token and is left as-is.)

3. **Line 120** — metric-explanation text uses an outline token.
   - Current: `color: var(--cg-color-surface-container-outlined);`
   - Fixed: `color: var(--cg-color-surface-container-text);`
   - Why: Same as #1 — readable explanation text should use the container text token, not the outline token.

4. **Line 126** — empty-state text uses an outline token.
   - Current: `text-align: center; color: var(--cg-color-surface-container-outlined);`
   - Fixed: `text-align: center; color: var(--cg-color-surface-container-text);`
   - Why: Same as #1 — empty-state message is text and should resolve to the container text token.

**Non-token flags (described, not in fixes array):**
- Keyboard activation toggles expansion but does not dispatch `ai-eval-metric-click`; pointer and keyboard behavior diverge.
- Expandable metric rows lack `aria-expanded`.
- No `:active` press state on the pressable metric rows.
- `min-width: 320px` (line 22) is a bare sizing magic number with no matching tier-3 token.
- Metric explanation at `--cg-font-size-xs` is borderline small for body-like copy; consider `--cg-font-size-sm`.

### Research-backed enhancements

Drawn from current shadcn/ui, Vercel v0, and Linear/HeroUI-era stat-card conventions. Each maps to a concrete change in *this* component.

1. **Animated count-up on the metric value + average grade.** Modern KPI/stat cards (shadcn Statistics blocks, v0-generated metric cards) animate the prominent numeric from 0 → final on mount/in-view rather than hard-rendering. For `ai-eval-scorecard`, drive `.metric-value` and the avg summary with a short count-up (respecting the already-imported `reducedMotion` guard — skip the tween when reduced motion is set). This makes the "prominent numeric value" land as the focal point the pattern intends. ([shadcn Statistics blocks](https://shadcnstudio.com/blocks/dashboard-and-application/statistics-component))

2. **Delta as a pill with a directional glyph, not bare colored text.** The dominant stat-card convention pairs the percentage change with an up/down arrow inside a tinted pill so direction is dual-encoded (shape + color), not color-only — which also closes the WCAG color-reliance gap. Replace the plain `.delta-up`/`.delta-down` text colors with a small rounded `--cg-border-radius-full` chip using `--cg-color-status-success-background` / `-error-background` tints plus an inline `svg` arrow (use Lit's `svg` template per CLAUDE.md, never `html`). ([Shadcn statistics component anatomy — "percentage increases or decreases with icons"](https://horizon-ui.com/docs-boilerplate/shadcn-components/statistics))

3. **Expand affordance + smooth height/opacity reveal with `aria-expanded`.** The card already toggles `_expandedMetric` but gives no visual hint and no `aria-expanded` (flagged in §4). Add a chevron that rotates on expand (transition `transform` only — explicit property, no `transition: all`) and animate the explanation panel's reveal via `grid-template-rows: 0fr → 1fr` (the modern shadcn collapsible technique that avoids fixed `max-height` magic numbers). Wire `aria-expanded` to `_expandedMetric` so the disclosure is announced. ([shadcn/ui composition patterns](https://vercel.com/academy/shadcn-ui/extending-shadcn-ui-with-custom-components))

4. **Add the missing `:active` press state and unify keyboard event dispatch.** Pressable rows in Linear/Vercel surfaces give an immediate press response (a subtle `transform: translateY(1px)` or a deeper overlay). Add `.metric:active` using `--cg-overlay-dark-strong`, and — per the §4 behavioral flag — have the keydown handler dispatch `ai-eval-metric-click` so keyboard activation is not a second-class affordance. ([shadcn/ui interaction baseline](https://ui.shadcn.com/docs))

5. **Gradient/sheen progress fill instead of flat 0.6-opacity bar.** v0 and HeroUI stat bars favor a subtle gradient or a thin leading highlight on the fill so the meter reads as a deliberate data-viz element rather than a muted rule. Keep it token-driven: layer `--cg-color-action-primary-background-default` with a tier-1 overlay highlight at the leading edge, and drop the flat `opacity: 0.6` in favor of the tinted track already in place. ([v0 metric component patterns](https://www.bitcot.com/top-10-ui-components-you-can-create-with-v0-by-vercel/))

6. **Tighten density with an optional `compact` variant.** Linear-style dashboards expose a denser row rhythm for at-a-glance scanning. Add a `compact` boolean that swaps the row padding from `--cg-spacing-16` to `--cg-spacing-12`/`--cg-spacing-8` and the value to `--cg-font-size-sm`, keeping the 44px touch target only in the default (comfortable) mode. This serves power users reviewing many evals without forcing the small text on the default presentation. ([scalable stats-card layouts](https://shadcnspace.com/components/card))

**Sources**
- [shadcn/ui — Card / docs](https://ui.shadcn.com/docs)
- [shadcn Statistics blocks](https://shadcnstudio.com/blocks/dashboard-and-application/statistics-component)
- [Shadcn UI Statistics Card (Horizon UI)](https://horizon-ui.com/docs-boilerplate/shadcn-components/statistics)
- [Extending shadcn/ui with custom components — Vercel Academy](https://vercel.com/academy/shadcn-ui/extending-shadcn-ui-with-custom-components)
- [Top UI components with v0 by Vercel](https://www.bitcot.com/top-10-ui-components-you-can-create-with-v0-by-vercel/)
- [Shadcn card components & variants](https://shadcnspace.com/components/card)
