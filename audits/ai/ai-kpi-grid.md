## ai-kpi-grid — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 39 | animation duration | `--cg-transition-duration-fast` | ✓ | — |
| 39 | animation easing | `--cg-transition-easing-default` | ✓ | — |
| 43 | background | `--cg-color-surface-cards-background` | ✓ | — |
| 44 | border-width | `--cg-border-width-50` | ✓ | — |
| 44 | border-color | `--cg-color-surface-cards-border` | ✓ | — |
| 45 | border-radius | `--cg-component-card-radius` | ✓ (tier-3) | — |
| 49 | font-size | `--cg-font-size-xs` | ✓ token (see §2 a11y note) | — |
| 50 | font-weight | `--cg-font-weight-medium` | ✓ | — |
| 51 | color | `--cg-color-input-text-placeholder` | ✓ | — |
| 52 | padding | `--cg-spacing-16` / `-20` / `-8` | ✓ | — |
| 54 | letter-spacing | `--cg-letter-spacing-wide` | ✓ (real token, absent from vocab snapshot) | — |
| 60 | margin | `--cg-spacing-12` | ✓ | — |
| 61 | background | `--cg-overlay-dark-subtle` | ✓ (tier-1 overlay, allowed) | — |
| 62 | border | `--cg-border-width-50` / `--cg-color-surface-cards-border` | ✓ | — |
| 63 | border-radius | `--cg-border-radius-125` | ✓ (could be tier-3 — see §2) | — |
| 69 | padding | `--cg-spacing-16` / `-20` | ✓ | — |
| 71 | transition | `background-color --cg-transition-duration-fast --cg-transition-easing-default` | ✓ explicit prop | — |
| 73-75 | box-shadow border | `--cg-border-width-50` + `--cg-color-surface-cards-border` | ✓ | — |
| 77 | hover background | `--cg-color-action-secondary-background-hover` | ✓ | — |
| 80 | focus box-shadow spread | bare `2px` + `--cg-overlay-accent-strong` | ✗ magic px | replace `2px` → `var(--cg-border-width-100)` |
| 84 | box-shadow | `--cg-border-width-50` / `--cg-color-surface-cards-border` | ✓ | — |
| 90 | font-size | `--cg-font-size-xs` | ✓ token (a11y note §2) | — |
| 91 | font-weight | `--cg-font-weight-medium` | ✓ | — |
| 92 | color | `--cg-color-input-text-placeholder` | ✓ | — |
| 93 | margin-bottom | `--cg-spacing-4` | ✓ | — |
| 97 | font-size | `--cg-font-size-xl` | ✓ | — |
| 98 | font-weight | `--cg-font-weight-semibold` | ✓ | — |
| 99 | color | `--cg-color-surface-base-text` | ✓ | — |
| 100 | line-height | `--cg-line-height-tight` | ✓ | — |
| 101 | letter-spacing | `--cg-letter-spacing-tight` | ✓ (real token, absent from vocab snapshot) | — |
| 102 | margin-bottom | `--cg-spacing-4` | ✓ | — |
| 108 | gap | `--cg-spacing-4` | ✓ | — |
| 109 | font-size | `--cg-font-size-xs` | ✓ token (a11y note §2) | — |
| 110 | font-weight | `--cg-font-weight-medium` | ✓ | — |
| 112 | color (up) | `--cg-color-status-success-text-default` | ✓ | — |
| 113 | color (down) | `--cg-color-status-error-text-default` | ✓ | — |
| 114 | color (neutral) | `--cg-color-input-text-placeholder` | ✓ | — |
| 118 | padding | `--cg-spacing-16` / `-20` | ✓ | — |
| 121 | border-radius | `--cg-border-radius-50` | ✓ | — |
| 122-127 | skeleton gradient stops | `--cg-color-surface-container-background` / `--cg-color-surface-cards-border` | ✓ (gradient stops) | — |
| 131 | height / margin | `--cg-spacing-8` | ✓ (spacing as size) | — |
| 132 | height / margin | `--cg-spacing-20` / `--cg-spacing-6` | ✓ | — |
| 133 | height | `--cg-spacing-8` | ✓ | — |

All color tokens are tier-2 semantic (or allowed tier-1 overlays). No tier-1 palette colors, no raw hex/rgba, no comma-fallbacks.

### 2. Styling Audit
- **Border radius:** Card uses tier-3 `--cg-component-card-radius` (correct). Inner grid uses `--cg-border-radius-125` and skeleton lines `--cg-border-radius-50` — both real tier-1 radii; acceptable but the inner grid radius is a literal tier-1 value where a tier-3 would be ideal if one existed (none does for kpi-grid). No violation.
- **Spacing:** All from the spacing scale (`4/6/8/12/16/20`). Consistent vertical rhythm.
- **Font-size accessibility:** `--cg-font-size-xs` is used for card-title, kpi-label, and kpi-delta. xs typically resolves below 14px (the `--cg-font-size-sm` floor). The delta and labels are supporting/secondary text, but the convention flags body text under 14px. This is a **flag** (design/a11y judgment), not a token violation — labels and delta are arguably "caption" text. Worth confirming xs ≥ 12px and considering `--cg-font-size-sm` for the kpi-delta which conveys trend meaning.
- **Translucent vs solid borders:** Borders use solid semantic `--cg-color-surface-cards-border`; inset grid background uses translucent `--cg-overlay-dark-subtle` — appropriate for a recessed well.
- **Transitions:** Explicit (`background-color`), no `transition: all`. Motion tokens used. `reducedMotion` style imported and applied. Good.
- **Dark-theme suitability:** All surfaces/text from semantic tokens that flip with theme. Inset overlay + card surface read well dark-first. Strong.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | `.kpi` base styling | — |
| Hover | Yes | `.kpi:hover` → `action-secondary-background-hover` | — |
| Active/Press | No | — | No `:active` feedback on the clickable cell; minor — hover + focus cover most needs |
| Focus-visible | Yes | `.kpi:focus-visible` inset ring | Uses bare `2px` (fix) and `--cg-overlay-accent-strong` rather than `--cg-color-focus-ring`; acceptable but inconsistent with focus-ring token |
| Disabled | N/A | — | KPI cells are not a disable-able control by design |
| Loading | Yes | `_renderSkeleton()` + shimmer animation | Solid implementation; `aria-hidden` on skeleton cells |
| Error | N/A | — | No per-KPI error model; component renders provided data only |
| Success | N/A | — | "Success" expressed via trend `up` color, not a component state |

### 4. Interaction Audit
- **Keyboard:** `.kpi` has `tabindex="0"`, `role="button"`, and `@keydown` handling Enter + Space with `preventDefault()`. Correct activation semantics.
- **ARIA:** Card has `role="region"` + `aria-label` (falls back to "KPI Grid"). Each cell has `aria-label` composing label, value, and delta. Trend arrow glyph is `aria-hidden`. Skeleton cells `aria-hidden`. Well-labeled.
- **CustomEvents:** `ai-kpi-click` dispatched `bubbles: true, composed: true` with `detail: { label, value }` — matches the `@fires` JSDoc. Correct.
- **Touch targets:** Cell height = padding `16` top/bottom + ~`xl` value line + label + delta, comfortably ≥44px in practice. The focus ring is inset (won't clip). No dedicated min-height token enforces it though — a design consideration, not a violation.

### 5. Visual Design Check
Modern, sleek inset-grid treatment with box-shadow hairline dividers (avoids double borders) — a refined touch. Tier-3 card radius, generous padding, clear typographic hierarchy (uppercase caption title → semibold xl value → colored delta). Trend colors give instant scannability. Skeleton shimmer is polished. The only rough edges: xs-sized delta/labels push the lower a11y bound, and no active-press feedback. HeroUI/Vercel showcase-ready.
Verdict: **strong**

### 6. Fixes Needed
1. **Line 80** — focus-visible box-shadow uses a bare magic `2px`.
   - Current: `box-shadow: inset 0 0 0 2px var(--cg-overlay-accent-strong);`
   - Fixed: `box-shadow: inset 0 0 0 var(--cg-border-width-100) var(--cg-overlay-accent-strong);`
   - Why: Raw `px` is banned; `--cg-border-width-100` resolves to 2px and is the governed token for a 2px stroke/ring.

**Flags (not auto-fixed):**
- Lines 49/90/109 use `--cg-font-size-xs` for the title, kpi-label, and kpi-delta. Verify xs ≥ 12px; consider promoting the kpi-delta (which carries trend meaning) to `--cg-font-size-sm` for the 14px body floor. Design/a11y judgment, not a token violation.
- Line 80 focus color uses `--cg-overlay-accent-strong`; the system has a dedicated `--cg-color-focus-ring` for focus indication. Switching would improve consistency, but `--cg-color-focus-ring` currently resolves to the banned `--cg-brand-ai-accent`, so the overlay token is the safer choice today. No change recommended until focus-ring is re-pointed to a semantic value.

### Research-backed enhancements

Modern 2025-era KPI strips (Stripe, Linear, Vercel v0, shadcn statistics blocks) have converged on a tighter set of affordances than this component currently ships. Six concrete additions, each tied to a pattern source:

1. **Inline sparkline / trend mini-chart per cell.** Stripe's dashboard pairs every KPI number with a small inline sparkline next to the value, and shadcn's statistics blocks treat the micro-trend chart as a first-class element — not a separate widget ([Setproduct dashboard UI](https://www.setproduct.com/blog/dashboard-ui-design), [Shadcn Studio statistics](https://shadcnstudio.com/blocks/dashboard-and-application/statistics-component)). Add an optional `sparkline?: number[]` to the KPI model and render a `<svg>` polyline (Lit `svg` template — never `html` — per CLAUDE.md) baselined to the same trend color already computed for the delta. This turns the current text-only delta into a scannable shape with zero new color tokens.

2. **Sub-100ms hover lift + press feedback.** Linear's defining trait is that interaction quality (sub-100ms response, deliberate micro-motion) is treated as design, not engineering polish ([Art of Styleframe dashboard patterns](https://artofstyleframe.com/blog/dashboard-design-patterns-web-apps/)). The §3 audit already flagged the missing `:active` state. Add a `transform: translateY(-1px)` on `:hover` and `translateY(0)` on `:active`, transitioned on `transform` explicitly (not `transition: all`) with `--cg-transition-duration-fast`. Gate the lift behind the existing `reducedMotion` import so it degrades cleanly.

3. **Leading metric icon slot for visual differentiation.** Stripe's four-card strip and shadcn's KPI/metric widgets use a small icon or symbol per card so metrics are distinguishable at a glance rather than by reading the label ([Shadcn Store KPI widgets](https://shadcnstore.com/blocks/application/widgets)). Add an optional `icon?: string` (or named slot) rendered in a `--cg-color-surface-container-background` chip above or beside the value. Keep it optional so icon-less grids stay clean.

4. **CSS Grid `auto-fill` / `minmax` responsive density instead of a fixed column count.** The 2026 consensus layout is a metric strip that reflows via `repeat(auto-fill, minmax(...))` on a 12-column substrate, so 4 KPIs become 2x2 then 1-column as width shrinks ([AI Designer dashboard guide](https://www.aidesigner.ai/blog/how-to-design-a-dashboard-ui), [Setproduct](https://www.setproduct.com/blog/dashboard-ui-design)). If the inner grid is currently fixed-column, switch to `grid-template-columns: repeat(auto-fill, minmax(<token>, 1fr))` so the component is container-responsive without media queries — important for an embeddable AI-generated component that can't predict its container.

5. **Animated value count-up on first paint / data change.** v0 and modern statistics blocks animate the numeric value rolling up to its final figure on mount, reinforcing the "live data" perception ([Bitcot v0 components](https://www.bitcot.com/top-10-ui-components-you-can-create-with-v0-by-vercel/), [Shadcn Studio statistics](https://shadcnstudio.com/blocks/dashboard-and-application/statistics-component)). Add a brief count-up tween from 0 (or from the previous value on update) to the target, respecting `prefers-reduced-motion` by snapping instantly. This bridges the existing skeleton → loaded transition, which currently hard-cuts.

6. **Explicit empty state.** §3 lists Loading (skeleton) and a synthetic "success via trend color" but has no empty state; modern dashboard guidance treats the zero-data case as a required, designed state rather than a blank grid ([Art of Styleframe](https://artofstyleframe.com/blog/dashboard-design-patterns-web-apps/)). When `kpis` is empty, render a centered muted message (`--cg-color-input-text-placeholder`, `--cg-font-size-sm`) inside the same inset well, so an AI-generated grid awaiting data reads as intentional rather than broken.
