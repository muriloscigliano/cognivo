## ai-reward-signal — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 23 | background | `--cg-color-surface-cards-background` | ✅ | — |
| 24 | border-width | `--cg-border-width-50` | ✅ | — |
| 24 | border-color | `--cg-color-surface-cards-border` | ✅ | — |
| 25 | border-radius | `--cg-border-radius-200` | ✅ | — |
| 26 | padding | `--cg-spacing-20` | ✅ | — |
| 27 | color | `--cg-color-surface-base-text` | ✅ | — |
| 28 | cursor | `pointer` | ✅ | — (keyword) |
| 29-31 | transition | explicit props + `--cg-transition-duration-fast` / `--cg-transition-easing-default` | ✅ | — (explicit, not `all`) |
| 34 | border-color (hover) | `--cg-color-input-border-hover` | ⚠️ | Works, but a card uses an input border token; `--cg-color-surface-cards-hover-border` is the on-family token (see §6, flag — not auto-fixed since both are real). |
| 37 | outline | `none` | ✅ | — (focus handled via box-shadow ring) |
| 38-40 | box-shadow (focus) | `0 0 0 2px var(--cg-color-surface-base-background)`, `0 0 0 4px var(--cg-color-focus-ring)` | ⚠️ | Colors are valid tier-2. The `2px`/`4px` spread are bare magic px — flag (no verified box-shadow-spread token; see §6). |
| 47 | margin-bottom | `--cg-spacing-16` | ✅ | — |
| 53 | gap | `--cg-spacing-8` | ✅ | — |
| 56 | font-size | `--cg-font-size-3xl` | ✅ | — |
| 57 | font-weight | `--cg-font-weight-extrabold` | ✅ | — |
| 58 | line-height | `1` | ✅ | — (unitless) |
| 59 | color | `--cg-color-surface-base-text` | ✅ | — |
| 62 | font-size | `--cg-font-size-sm` | ✅ | — (14px floor met) |
| 63 | color | `--cg-color-input-text-placeholder` | ✅ | — (real token; muted secondary text) |
| 69 | gap | `--cg-spacing-4` | ✅ | — |
| 70 | font-size | `--cg-font-size-xs` | ✅ | — (badge/pill label, not body copy) |
| 71 | font-weight | `--cg-font-weight-bold` | ✅ | — |
| 72 | padding | `--cg-spacing-4` `--cg-spacing-8` | ✅ | — |
| 73 | border-radius | `--cg-border-radius-full` | ✅ | — |
| 76 | background (trend.up) | `--cg-color-status-success-background-default` | ✅ | — (trend direction, not AI lifecycle state) |
| 77 | color (trend.up) | `--cg-color-status-success-text-default` | ✅ | — |
| 80 | background (trend.down) | `--cg-color-status-error-background-default` | ✅ | — |
| 81 | color (trend.down) | `--cg-color-status-error-text-default` | ✅ | — |
| 84 | background (trend.stable) | `--cg-overlay-dark-subtle` | ✅ | — (verified real) |
| 85 | color (trend.stable) | `--cg-color-input-text-placeholder` | ✅ | — |
| 90 | height | `--cg-spacing-6` | ✅ | — (track thickness from spacing scale) |
| 91 | background | `--cg-color-surface-cards-divider` | ✅ | — |
| 92 | border-radius | `--cg-border-radius-50` | ✅ | — |
| 94 | margin-bottom | `--cg-spacing-16` | ✅ | — |
| 97 | height | `100%` | ✅ | — |
| 98 | border-radius | `--cg-border-radius-50` | ✅ | — |
| 99 | background | `--cg-color-action-primary-background-default` | ✅ | — |
| 100 | transition | `width` + `--cg-transition-duration-slow` / `--cg-transition-easing-default` | ✅ | — (explicit) |
| 104 | margin-bottom | `--cg-spacing-16` | ✅ | — |
| 107 | height (svg) | `--cg-spacing-40` | ✅ | — |
| 112 | stroke | `--cg-color-action-primary-background-default` | ✅ | — |
| 114 | stroke-width | `1.5` | ✅ | — (unitless SVG geometry) |
| 118 | fill (spark-area) | `--cg-overlay-accent-subtle` | ✅ | — (verified real) |
| 123 | font-size (label) | `--cg-font-size-base` | ✅ | — |
| 124 | font-weight | `--cg-font-weight-semibold` | ✅ | — |
| 125 | margin-bottom | `--cg-spacing-4` | ✅ | — |
| 129 | color (description) | `--cg-color-input-text-placeholder` | ✅ | — |
| 130 | line-height | `--cg-line-height-relaxed` | ✅ | — |
| 134 | border-radius (rounded=none) | `0` | ✅ | — |
| 135 | border-radius (rounded=sm) | `--cg-border-radius-50` | ✅ | — |
| 136 | border-radius (rounded=md) | `--cg-border-radius-100` | ✅ | — |
| 137 | border-radius (rounded=lg) | `--cg-border-radius-200` | ✅ | — |
| 140-141 | transition (reduced-motion) | `none` | ✅ | — |

No comma-fallbacks, no raw hex/rgba, no tier-1 palette colors, no `transition: all`, no made-up tokens. Every `var()` resolves to a token confirmed in the vocab.

### 2. Styling Audit

- **Border radius:** Token-driven throughout (`--cg-border-radius-200` default, `-50`/`-100` variants, `-full` for the trend pill). `rounded="none"` uses literal `0`, which is acceptable. Consistent and tokenized.
- **Spacing:** All from the spacing scale (`-4`/`-6`/`-8`/`-16`/`-20`/`-40`). No magic numbers.
- **Font-size accessibility:** Body/description use `--cg-font-size-sm` (14px floor met). Label uses `--cg-font-size-base`. Score uses `3xl`. The trend pill uses `--cg-font-size-xs` — acceptable for a chip label, not body copy. No body text below 14px.
- **Translucent vs solid borders:** Container border uses solid `--cg-color-surface-cards-border` at `--cg-border-width-50`. Trend backgrounds use semantic status fills; stable uses the `--cg-overlay-dark-subtle` translucent overlay — appropriate for a neutral chip.
- **Transitions explicit vs all + motion tokens:** Both transitions enumerate properties (`border-color`/`box-shadow`, and `width`) with duration + easing tokens. No `transition: all`. A `@media (prefers-reduced-motion: reduce)` block plus the imported `reducedMotion` style disables motion. Solid.
- **Dark-theme suitability:** All colors come from tier-2 semantic surface/status/action families that adapt to theme. Dark-first compatible.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | ✅ | `.container` base styles | — |
| Hover | ✅ | `.container:hover` border-color change | Uses `--cg-color-input-border-hover` on a card surface; the on-family token is `--cg-color-surface-cards-hover-border` (cosmetic/semantic nit, see §6 flag). |
| Active/Press | ❌ | None | No `:active` press feedback (e.g., scale or border-active). Card is a `role="button"` so a press state would improve affordance. Design suggestion only — `--cg-interaction-press-scale` exists if added. |
| Focus-visible | ✅ | `.container:focus-visible` dual box-shadow ring with `--cg-color-focus-ring` | Visible and uses the focus-ring token. Ring spread uses bare `2px`/`4px` (flag, §6). |
| Disabled | N/A | — | Component is a read-only signal/metric card with no disabled concept. |
| Loading | N/A | — | No async fetch inside the component; data is passed via props. |
| Error | N/A | — | No error surface; the metric is always renderable. `trend.down` covers negative direction, not error. |
| Success | Partial | `.trend.up` styled with status-success | Represents positive trend, not a discrete success state. Reasonable. |

### 4. Interaction Audit

- **Keyboard:** `tabindex="0"` makes the card focusable; `@keydown` handles `Enter` and `Space` (with `preventDefault`) to fire detail. Correct activation keys for a `role="button"`.
- **ARIA roles/labels/states:** Container has `role="button"` and a descriptive `aria-label` interpolating label/score/maxScore/trend. The progress track has `role="progressbar"` with `aria-valuenow`/`aria-valuemin`/`aria-valuemax`. The sparkline SVG is correctly `aria-hidden="true"`. Solid coverage.
- **CustomEvents + detail correctness:** `ai-reward-detail` fires with `detail: { score, trend }`, `bubbles: true`, `composed: true` — crosses the shadow boundary correctly. Matches the `@fires` JSDoc.
- **Touch targets ≥44px:** The whole card is the interactive target, comfortably ≥44px. No sub-44px controls. ✅

### 5. Visual Design Check

Clean, modern metric card: large extrabold score, pill-shaped trend chip with semantic color, full-width progress bar, and an area-filled sparkline. Good radius (`-200`), generous padding (`-20`), and consistent `-16` rhythm between sections. Typography hierarchy is clear (3xl score → base label → sm description). Focus ring is a polished dual-ring. No hard dividers, but the section spacing carries the layout. Sparkline area fill via `--cg-overlay-accent-subtle` is a nice touch. HeroUI/Vercel showcase-ready.

One-word verdict: **strong**

### 6. Fixes Needed

No token-substitution fixes are auto-applied — every `var()` already resolves to a real token and there are no comma-fallbacks, raw hex, tier-1 palette colors, or `transition: all`. The following are flags (not in the fixes array):

1. **Line 34 — hover border token family.** `.container:hover { border-color: var(--cg-color-input-border-hover); }` borrows an *input* border token for a *card* surface. The on-family token `--cg-color-surface-cards-hover-border` (verified in vocab) is semantically correct. Both resolve, so this is a semantic-consistency nit rather than a hard violation; recommend swapping to `--cg-color-surface-cards-hover-border`. (Left out of the fixes array because it is a semantic preference, not a broken/invalid token.)

2. **Lines 38-40 — bare px in focus-ring box-shadow.** The dual ring uses `0 0 0 2px` and `0 0 0 4px` spread values. These are magic px. There is no verified box-shadow-spread token in the vocab (`--cg-outline-width-default`/`-thick` exist but apply to the `outline` property, not box-shadow spread, and substituting them would change rendering). Not auto-fixed to avoid inventing/misapplying a token; recommend a design-system decision on a canonical focus-ring token.

3. **No active/press state (design suggestion).** The card is `role="button"` but has no `:active` feedback. Consider a subtle press treatment using `--cg-interaction-press-scale`. This is a design enhancement, not a token violation.

### Research-backed enhancements

Sourced from current (2025-2026) metric-card / KPI patterns at shadcn/ui, Vercel, and Linear-style dashboards.

1. **Count-up animation on the score, gated by reduced-motion.** Modern KPI cards animate the headline number ticking up to its value on mount/in-view rather than snapping in — this is the canonical "reward" affordance ([shadcn.io stats-sparkline block](https://www.shadcn.io/blocks/stats-sparkline) builds counters with `motion/react`). For this component, animate the `3xl` score with a short eased count-up driven by JS (respecting the existing `prefers-reduced-motion` block, which should jump straight to the final value). This is exactly the "reward signal" the component name promises and is currently missing.

2. **`tabular-nums` / `font-variant-numeric` on the score and trend pill.** The de-facto standard in shadcn/Vercel KPI cards is `tabular-nums` so digits don't reflow/jitter as values update or animate ([shadcn.io stats-sparkline](https://www.shadcn.io/blocks/stats-sparkline) explicitly notes "tabular-nums current values"). Add `font-variant-numeric: tabular-nums;` to `.score` and `.trend` — critical once the count-up in (1) lands, otherwise the layout shifts every frame.

3. **Self-drawing sparkline with a gradient area fill.** The reference pattern wraps a Recharts `AreaChart` with a `linearGradient` fill and a draw-on-load stroke animation ([Shadcnblocks Dashboard 3 — Revenue with Sparklines](https://www.shadcnblocks.com/block/dashboard3)). The component already has the SVG + `--cg-overlay-accent-subtle` area fill; add a `stroke-dasharray`/`stroke-dashoffset` line-draw transition on the spark path (reduced-motion: render fully drawn). Pair the flat fill with a top-to-transparent vertical gradient for the modern "glow under the line" look.

4. **Make the trend pill a true delta vs. a prior period.** Current KPI cards show "value + delta vs. previous comparable period + directional arrow" as three distinct signals ([artofstyleframe — Dashboard Patterns 2026](https://artofstyleframe.com/blog/dashboard-design-patterns/), [aidesigner — Dashboard UI Guide 2026](https://www.aidesigner.ai/blog/how-to-design-a-dashboard-ui)). The pill currently encodes only direction (up/down/stable). Add an explicit `delta` prop rendered as a signed percentage (e.g. `+12%`) inside the pill alongside the existing semantic color, so the chip carries quantitative meaning, not just hue.

5. **Subtle hover lift on the card surface.** Linear/Vercel-style interactive cards respond to hover with a small elevation/translate, not only a border-color change ([How-To-Dashboard visual guide](https://how-to-dashboard.vercel.app/)). Since this card is `role="button"`, add a `transform: translateY(-1px)` plus a shadow on `:hover` (enumerated transition, reduced-motion exempt) to reinforce that it is actionable — complementing the press-scale enhancement already noted above.

6. **Restraint guardrail: keep motion meaningful, not decorative.** The same sources caution that sparklines that "wiggle on hover" and gratuitous draw-ins don't help users decide and should be avoided ([aidesigner — Dashboard UI Guide 2026](https://www.aidesigner.ai/blog/how-to-design-a-dashboard-ui)). Scope the animations in (1) and (3) to first-mount / value-change only — not idle or hover loops — so the "reward" reads as confirmation of a real change rather than ambient noise.
