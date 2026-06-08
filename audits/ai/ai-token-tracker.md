## ai-token-tracker — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 32 | animation duration | `--cg-transition-duration-fast` | Yes | — |
| 32 | animation easing | `--cg-transition-easing-default` | Yes | — |
| 39 | gap | `--cg-spacing-8` | Yes | — |
| 40 | padding | `--cg-spacing-4` / `--cg-spacing-12` | Yes | — |
| 41 | border-radius | `--cg-border-radius-100` | Yes | — |
| 42 | background | `--cg-color-surface-container-background` | Yes | — |
| 43 | border | `--cg-border-width-50` solid `--cg-color-surface-cards-border` | Yes | — |
| 44 | font-size | `--cg-font-size-xs` | Borderline | Body readout text < 14px — see §2 / flag |
| 45 | font-family | `--cg-font-family-mono` | Yes | — |
| 46 | color | `--cg-color-input-text-placeholder` | Yes | — |
| 47 | cursor | `pointer` (literal) | Yes | — |
| 48 | transition | border-color / transform, explicit props, `--cg-transition-duration-fast` + `--cg-transition-easing-default` | Yes | Explicit, not `all` |
| 50 | border-color (hover) | `--cg-color-input-border-hover` | Yes | — |
| 51 | transform (active) | `scale(var(--cg-interaction-press-scale))` | Yes | — |
| 52 | color (.sep) | `--cg-color-surface-cards-border` | Yes | — |
| 53 | color (.tokens) | `--cg-color-surface-base-text` | Yes | — |
| 53 | font-weight | `--cg-font-weight-bold` | Yes | — |
| 54 | color (.cost-val) | `--cg-color-status-success-text-default` | Yes | — |
| 55 | color (.latency-val) | `--cg-color-input-text-placeholder` | Yes | — |
| 59 | padding | `--cg-spacing-20` | Yes | — |
| 60 | background | `--cg-color-surface-cards-background` | Yes | — |
| 61 | border | `--cg-border-width-50` solid `--cg-color-surface-cards-border` | Yes | — |
| 62 | border-radius | `--cg-component-card-radius` | Yes (tier-3) | — |
| 63 | min-width | `320px` | No | Bare magic px — no matching token; flag (no verified replacement) |
| 70 | margin-bottom | `--cg-spacing-16` | Yes | — |
| 73 | font-size | `--cg-font-size-xs` | Yes (label) | — |
| 74 | font-weight | `--cg-font-weight-medium` | Yes | — |
| 75 | color | `--cg-color-input-text-placeholder` | Yes | — |
| 77 | letter-spacing | `--cg-letter-spacing-wide` | Yes | — |
| 80 | font-size | `--cg-font-size-xs` | Yes (badge) | — |
| 81 | padding | `--cg-spacing-2` / `--cg-spacing-8` | Yes | — |
| 82 | border-radius | `--cg-border-radius-full` | Yes | — |
| 83 | background | `--cg-overlay-accent-subtle` | Yes | — |
| 84 | color | `--cg-color-surface-base-text` | Yes | — |
| 85 | font-weight | `--cg-font-weight-medium` | Yes | — |
| 95 | gap | `--cg-spacing-2` | Yes | — |
| 96 | padding | `0` / `--cg-spacing-16` | Yes | — |
| 97 | border-right | `--cg-border-width-50` solid `--cg-color-surface-cards-border` | Yes | — |
| 102 | font-size | `--cg-font-size-xs` | Yes (label) | — |
| 103 | color | `--cg-color-input-text-placeholder` | Yes | — |
| 104 | font-weight | `--cg-font-weight-medium` | Yes | — |
| 107 | font-size | `--cg-font-size-lg` | Yes | — |
| 108 | font-weight | `--cg-font-weight-semibold` | Yes | — |
| 109 | font-family | `--cg-font-family-mono` | Yes | — |
| 110 | color | `--cg-color-surface-base-text` | Yes | — |
| 111 | letter-spacing | `--cg-letter-spacing-tight` | Yes | — |
| 113 | color (.green) | `--cg-color-status-success-text-default` | Yes | — |
| 117 | padding-top | `--cg-spacing-12` | Yes | — |
| 118 | border-top | `--cg-border-width-50` solid `--cg-color-surface-cards-border` | Yes | — |
| 123 | font-size | `--cg-font-size-xs` | Yes (label) | — |
| 124 | margin-bottom | `--cg-spacing-6` | Yes | — |
| 126 | color | `--cg-color-input-text-placeholder` | Yes | — |
| 127 | color | `--cg-color-surface-base-text`; weight `--cg-font-weight-semibold` | Yes | — |
| 129 | height | `--cg-spacing-6` | Acceptable (uses token, not magic px) | — |
| 130 | border-radius | `--cg-spacing-4` | Works but spacing-as-radius is a smell; valid token | Optional |
| 131 | background | `--cg-color-surface-container-background` | Yes | — |
| 135 | height | `100%` | Yes | — |
| 136 | border-radius | `--cg-spacing-4` | Same smell as 130; valid token | Optional |
| 137 | transition | width, explicit, `--cg-transition-duration-slow` + `--cg-transition-easing-default` | Yes | — |
| 139 | background (.ok) | `--cg-color-status-success-text-default` | Yes | — |
| 140 | background (.warning) | `--cg-color-status-warning-text-default` | Yes | — |
| 141 | background (.danger) | `--cg-color-status-error-text-default` | Yes | — |
| 144 | outline | `none` | Yes | — |
| 145 | box-shadow | `0 0 0 3px var(--cg-overlay-accent-strong)` | No | Bare magic `3px` ring width — replace with `var(--cg-focus-ring-width)` |

### 2. Styling Audit

- **Border radius:** Compact uses `--cg-border-radius-100`, detailed uses tier-3 `--cg-component-card-radius`, model badge uses `--cg-border-radius-full` (pill). Budget bar/fill use `--cg-spacing-4` as a radius — functional and tokenized, but conceptually a spacing token used for radius; a dedicated radius token (e.g. `--cg-border-radius-50`) would read cleaner. Minor.
- **Spacing:** All from the spacing scale (`2/4/6/8/12/16/20`). Consistent and clean.
- **Font-size accessibility (14px min body):** The compact-mode primary readout (line 44, `.compact`) is the component's main content and is set to `--cg-font-size-xs` (12px), below the 14px body minimum. The numeric tokens/labels inherit it. Metric labels, budget labels, title, and badge legitimately use `xs` (they are secondary/caption text), so the cleanest accessibility fix is bumping the `.compact` base to `--cg-font-size-sm`. Flagged.
- **Translucent vs solid borders:** Borders use `--cg-color-surface-cards-border` (solid semantic) — appropriate; dividers between metrics reuse the same token consistently.
- **Transitions explicit vs all:** All transitions enumerate explicit properties (`border-color`, `transform`, `width`). No `transition: all`. Durations/easings tokenized. Motion-safe via imported `reducedMotion`.
- **Dark-theme suitability:** All colors resolve through tier-2 semantic surface/status/input families — theme-adaptive. No raw hex/rgba. Good.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | `.compact` / `.detailed` base styles | — |
| Hover | Yes (compact) | `.compact:hover` border-color shift | Detailed card has no hover; acceptable (static readout) |
| Active/Press | Yes (compact) | `.compact:active` scale via `--cg-interaction-press-scale` | — |
| Focus-visible | Partial | `:focus-visible` box-shadow ring | Selector is unscoped (`:focus-visible` matches host context); compact div is clickable but NOT focusable (no `tabindex`/`role="button"`) — ring effectively unreachable by keyboard. See §4. |
| Disabled | N/A | No disabled concept — passive metrics display | — |
| Loading | N/A | Component renders final values only; streaming/loading is the parent's concern | — |
| Error | Partial | Budget `danger` state (over-budget) styled, but it is a budget threshold, not an AI error state | The tracker shows no AI lifecycle state; acceptable for a metrics readout |
| Success | Partial | Cost shown in success-green; budget `ok` | Color is decorative, not a real success state |

### 4. Interaction Audit

- **Keyboard:** Compact mode dispatches `ai-token-click` on `@click`, but the `.compact` element is a plain `<div>` with no `tabindex`, no `role="button"`, and no `keydown` (Enter/Space) handler. It is mouse-only — keyboard users cannot trigger the click event, and the `:focus-visible` ring on line 145 can never appear. This is a P1 a11y gap (described here, not a token fix).
- **ARIA:** Both modes set `role="status"` + `aria-live="polite"` with a descriptive `aria-label`. Good for screen-reader announcement of usage. However, a clickable element advertised as `role="status"` is semantically wrong — if it is interactive it should be `role="button"` (or a real `<button>`). Conflict between "live status" and "clickable" should be resolved (likely: keep status non-interactive, or split a button child).
- **CustomEvents:** `ai-token-click` is `bubbles: true, composed: true` (crosses shadow boundary) with a complete `detail` payload (inputTokens, outputTokens, cost, latency, model). Detail shape is correct and useful.
- **Touch targets:** Compact badge height is roughly `font-xs + spacing-4*2` (~20–24px) — below the 44px touch-target minimum for an interactive element. This is a sizing/design enlargement, noted here, not a token violation.

### 5. Visual Design Check

Modern and sleek: monospace numerics, pill model badge, subtle accent-overlay badge background, success-green cost, and a color-graded budget bar (ok/warning/danger) read as a polished telemetry chip. Radius is tokenized and consistent; metric dividers + uppercase tracked title give clean typographic hierarchy. Breathing room in detailed mode (`spacing-20` padding, `spacing-16` rhythm) is good. Weak spots: the clickable compact badge isn't keyboard/touch accessible and the focus ring is unreachable; `min-width: 320px` is a hardcoded px. These are functional/a11y issues more than visual ones. Showcase-ready visually. Verdict: **strong**.

### 6. Fixes Needed

1. **Line 145** — focus-ring width magic px.
   - Current: `box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);`
   - Fixed: `box-shadow: 0 0 0 var(--cg-focus-ring-width) var(--cg-overlay-accent-strong);`
   - Why: `3px` is a bare magic pixel value for the ring thickness; `--cg-focus-ring-width` is the dedicated tier-1 token for focus-ring width.

2. **Line 44** — compact-mode body readout below 14px minimum.
   - Current: `font-size: var(--cg-font-size-xs);`
   - Fixed: `font-size: var(--cg-font-size-sm);`
   - Why: `.compact` carries the component's primary content (token count / cost / latency). `xs` (12px) is below the 14px body-text accessibility minimum; `sm` is the smallest allowed body size. Secondary labels keep `xs` legitimately.

Flags (no token fix applied):
- **Line 63** `min-width: 320px;` — hardcoded magic pixel value. No matching width token exists in the vocab (no `--cg-component-ai-token-tracker-*` token), so no replacement is proposed; should be tokenized or moved to a tier-3 component token if one is added.
- **Interaction (lines 186–197, 143–146)** — the compact badge is clickable but not keyboard-focusable/operable and uses `role="status"` instead of `role="button"`; touch target < 44px. P1 a11y, design/structure change rather than a token fix.

### Research-backed enhancements

Modern 2025-era metric/usage cards (shadcn sparkline stat blocks, Vercel/Linear telemetry chips) converge on a tight pattern: label + big tabular number + a delta pill + an inline trend. The tracker currently shows only the current snapshot; the suggestions below close that gap.

1. **Add an inline cumulative-usage sparkline to detailed mode.** The shadcn "Stats Card with Sparkline" and Recharts AreaChart blocks make a small trend line (gradient fill keyed to direction) the default companion to any KPI number ([shadcn stats-sparkline](https://www.shadcn.io/blocks/stats-sparkline), [Shadcnblocks stats-card2](https://www.shadcnblocks.com/block/stats-card2)). For a token tracker, a ~40px-tall sparkline of tokens-per-turn (or cumulative spend) under the metric row turns a static readout into a session-trend chip. Render it with Lit's `svg` template (per the CLAUDE.md icon gotcha) and color the fill via `--cg-color-status-success-*` / `warning` to match the existing budget grading.

2. **Replace the success-green cost with a delta pill ("+$0.004 this turn ▲").** Every reference KPI card pairs the absolute value with a period-over-period change pill and an up/down arrow ([Dashboard Design Patterns 2026](https://artofstyleframe.com/blog/dashboard-design-patterns-web-apps/), [shadcnstore KPI widgets](https://shadcnstore.com/blocks/application/widgets)). A small pill showing the increment since the last turn (reusing `--cg-overlay-accent-subtle` like the model badge) gives users rate-of-change, not just a total — far more actionable for spend monitoring.

3. **Animate the numeric counters with a count-up tween, gated by reduced-motion.** Modern stat blocks ship with `motion/react`-driven value transitions so a changing number rolls rather than snaps ([shadcn stats-sparkline](https://www.shadcn.io/blocks/stats-sparkline)). Tween the token/cost readouts over `--cg-transition-duration-slow` on value change; the component already imports `reducedMotion`, so wrap the tween in the same motion-safe guard to keep it accessible.

4. **Adopt `font-variant-numeric: tabular-nums` on every numeric readout.** The shadcn/Recharts stat cards explicitly use tabular-nums so digits don't reflow as values update ([shadcn stats-sparkline](https://www.shadcn.io/blocks/stats-sparkline)). The mono font (`--cg-font-family-mono`) is already near-tabular, but adding `tabular-nums` to `.compact`, `.metric-value`, and `.cost-val` prevents horizontal jitter during the count-up animation above — a one-line, zero-token addition.

5. **Add a real loading/skeleton state.** Linear/Vercel telemetry chips render a shimmer placeholder while metrics resolve rather than collapsing to empty ([Dashboard Design Patterns 2026](https://artofstyleframe.com/blog/dashboard-design-patterns-web-apps/)). The §3 audit flagged loading as "N/A — parent's concern," but a self-contained `loading` attribute that swaps numerics for pulsing `--cg-color-surface-container-background` bars would make the streaming-UI use case (live token accrual) feel intentional instead of flickering in.

6. **Make the metric grid responsive instead of locking `min-width: 320px`.** The cited card-grid pattern uses CSS Grid with `auto-fit`/`minmax` so cards reflow rather than enforce a hard floor ([Dashboard Design Patterns 2026](https://artofstyleframe.com/blog/dashboard-design-patterns-web-apps/)). Replacing the hardcoded `min-width: 320px` (the §1/§6 flag) with a `minmax()` track also resolves the magic-px violation without inventing a new width token.

Sources:
- [React Stats Block Sparkline Card — shadcn.io](https://www.shadcn.io/blocks/stats-sparkline)
- [Stats Card 2: Metric Card with Sparkline — Shadcnblocks](https://www.shadcnblocks.com/block/stats-card2)
- [Dashboard Design Patterns for Modern Web Apps 2026 — Art of Styleframe](https://artofstyleframe.com/blog/dashboard-design-patterns-web-apps/)
- [Shadcn UI Dashboard Widgets: KPI & Metric Cards — ShadcnStore](https://shadcnstore.com/blocks/application/widgets)
