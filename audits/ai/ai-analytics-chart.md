## ai-analytics-chart — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 43 | background | `var(--cg-color-surface-cards-background)` | Yes | Correct tier-2 card surface. |
| 44 | color | `var(--cg-color-surface-base-text)` | Yes | Correct tier-2 text. |
| 45 | border | `var(--cg-border-width-50) solid var(--cg-color-surface-cards-border)` | Yes | tier-1 width + tier-2 color, no fallback. |
| 46 | border-radius | `var(--cg-border-radius-150)` | Yes | Real tier-1 radius; card-radius tier-3 (`--cg-component-card-radius`) would be ideal but 150 is acceptable. |
| 47 | padding | `var(--cg-spacing-20)` | Yes | Real tier-1 spacing. |
| 48 | box-shadow | `var(--cg-elevation-1)` | Yes | Real elevation token. |
| 49 | animation | `var(--cg-transition-duration-fast) var(--cg-transition-easing-ease-out)` | Yes | Real motion tokens; named keyframe `fadeSlideIn` from shared styles. |
| 51 | display (hidden) | `none` | Yes | Keyword, fine. |
| 54-56 | flex layout | flex/space-between/flex-start | Yes | Layout keywords. |
| 57 | padding-bottom | `var(--cg-spacing-12)` | Yes | Real tier-1 spacing. |
| 58 | border-bottom | `var(--cg-border-width-50) solid var(--cg-color-surface-cards-divider)` | Yes | Correct divider token. |
| 59 | margin-bottom | `var(--cg-spacing-12)` | Yes | Real tier-1 spacing. |
| 63 | font-size | `var(--cg-font-size-sm)` | Yes | Title at sm (14px); acceptable for a card title. |
| 64 | font-weight | `var(--cg-font-weight-semibold)` | Yes | Real token. |
| 65 | color | `var(--cg-color-surface-base-text)` | Yes | Correct. |
| 71 | gap | `var(--cg-spacing-12)` | Yes | Real token. |
| 78 | gap | `var(--cg-spacing-4)` | Yes | Real token. |
| 79 | font-size | `var(--cg-font-size-xs)` | Yes | Legend is a label/caption, xs acceptable (non-body). |
| 80 | color | `var(--cg-color-input-text-placeholder)` | Borderline | Borrowing an input-domain token for legend muted text; a surface muted/secondary token is more semantically correct, but no generic "muted text" token exists in vocab — acceptable as a pragmatic muted color. |
| 84-85 | width/height | `var(--cg-spacing-8)` | Yes | Legend dot sizing from spacing scale; fine. |
| 86 | border-radius | `var(--cg-border-radius-full)` | Yes | Real token, correct for dot. |
| 97 | width | `100%` | Yes | Percentage, legitimate. |
| 103 | fill (.axis-label) | `var(--cg-color-input-text-placeholder)` | No | A dedicated chart token exists: `--cg-color-chart-axis`. Axis labels should use it, not an input token. |
| 107 | stroke (.grid-line) | `var(--cg-color-surface-cards-divider)` | No | A dedicated chart token exists: `--cg-color-chart-grid`. Grid lines should use it, not the card divider token. |
| 108 | stroke-width (.grid-line) | `0.5` | Yes | SVG geometry attribute (unitless user-space), legitimate for hairline grid; not a CSS spacing token. |
| 113 | stroke-width (.data-line) | `2` | Yes | SVG line geometry, legitimate. |
| 114-115 | stroke-linecap/join | `round` | Yes | Keywords. |
| 119 | transition | `opacity var(--cg-transition-duration-fast) var(--cg-transition-easing-default)` | Yes | Explicit property (not `all`), real motion tokens. |
| 124-126 | hit-area fill/stroke/stroke-width | `transparent` / `12` | Yes | transparent keyword + SVG geometry for the invisible hover hit target; legitimate. |
| 131 | background (.tooltip) | `var(--cg-color-surface-cards-emphasis)` | Yes | Real tier-2 token; good elevated-surface choice for tooltip. |
| 132 | border | `var(--cg-border-width-50) solid var(--cg-color-surface-cards-border)` | Yes | Correct. A dedicated `--cg-color-surface-tooltip-*` family exists and would be more precise, but cards-emphasis/border is acceptable. |
| 133 | border-radius | `var(--cg-border-radius-100)` | Yes | Real token, appropriate for a small tooltip. |
| 134 | box-shadow | `var(--cg-elevation-2)` | Yes | Real elevation token. |
| 135 | padding | `var(--cg-spacing-6) var(--cg-spacing-8)` | Yes | Real tier-1 spacing. |
| 136 | font-size | `var(--cg-font-size-xs)` | Yes | Tooltip is a micro-surface; xs acceptable. |
| 140 | transform | `translate(-50%, -100%)` | Yes | Percentages for positioning, legitimate. |
| 141 | margin-top | `calc(-1 * var(--cg-spacing-8))` | Yes | Token-driven calc, fine. |
| 146 | margin-bottom | `var(--cg-spacing-2)` | Yes | Real token. |
| 145 | color (.tooltip-label) | `var(--cg-color-input-text-placeholder)` | Borderline | Same muted-text borrow as line 80; acceptable but not ideal. |
| 150 | font-weight | `var(--cg-font-weight-semibold)` | Yes | Real token. |
| 154 | font-size (.y-label) | `var(--cg-font-size-xs)` | Yes | Axis label, acceptable. |
| 155 | fill (.y-label) | `var(--cg-color-input-text-placeholder)` | No | Should use `--cg-color-chart-axis` like the other axis labels. |
| 159 | outline | `none` | Yes | Replaced by box-shadow ring below. |
| 160 | box-shadow (focus) | `0 0 0 3px var(--cg-overlay-accent-strong)` | Borderline | Color token is real. The `3px` ring width is a raw magic px; prefer a border-width token. Also `--cg-color-focus-ring` exists in vocab and is the semantically correct focus color over a generic overlay. |

Summary: The file is mostly clean and token-governed. The real defects are that it ignores the dedicated `--cg-color-chart-axis` / `--cg-color-chart-grid` tokens (using input/surface tokens instead), and the focus ring uses a raw `3px` plus a generic overlay instead of `--cg-color-focus-ring`. All inline `s.color` usages and SVG geometry numbers are legitimate (JS data / SVG attributes), not violations.

### 2. Styling Audit
- **Border radius:** Card `--cg-border-radius-150` and tooltip `--cg-border-radius-100` are appropriately modern and proportional. Legend dot `--cg-border-radius-full` correct.
- **Spacing generosity:** Padding `--cg-spacing-20` on the card with `--cg-spacing-12` header rhythm is generous and consistent. Good breathing room.
- **Font-size accessibility:** Title is `sm` (14px). Legend/axis/tooltip text is `xs` (~12px), but these are labels/captions/data annotations, not body copy — acceptable under the 14px-body rule. No body paragraph drops below 14px.
- **Translucent vs solid borders:** Uses solid tier-2 card/divider borders. Consistent and dark-theme-safe.
- **Transitions:** Explicit (`opacity ...`), never `transition: all`. Uses real duration/easing tokens. Compliant. Honors reduced-motion via shared `reducedMotion` style.
- **Dark-theme background:** `--cg-color-surface-cards-background` with `surface-base-text` and `cards-emphasis` tooltip — all dark-first semantic surfaces. Suitable.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | Card with header/legend/SVG plot rendered | None. |
| Hover | Yes | `.hit-area` + r=10 invisible circles trigger `_onPointHover`; data-point dot fades in (opacity 0→1) and tooltip shows | Works on pointer; no keyboard equivalent (see §4). |
| Active/Press | N/A | Chart is a visualization, not a pressable control | Justified: no press semantics for a data plot. |
| Focus-visible | Partial | `:focus-visible` ring on focusable SVG (tabindex=0) | Ring uses raw 3px + generic overlay; SVG is focusable but exposes no per-point keyboard interaction. |
| Disabled | N/A | No disabled concept for a read-only chart | Justified: chart has no interactive disabled mode. |
| Loading | No | No skeleton/loading affordance | Minor gap — a streaming "ai-" chart could show a loading/streaming state, but not required by spec. |
| Error | No | No error/render-failure state | Minor gap; not a hard violation. |
| Success/Empty | Partial | Header hidden when no title/series (lines 261-273); but the SVG still renders empty axes with no "no data" message | Minor: an empty-state message would be friendlier, but it degrades gracefully. |

### 4. Interaction Audit
- **Keyboard:** SVG has `tabindex="0"` and `role="img"`, so it is focusable, but there is **no keyboard handler** — arrow keys do not move between data points and there is no keyboard path to reveal tooltips. Hover/tooltip is mouse-only (`@mouseenter`). This is an accessibility gap for an interactive chart, though as a `role="img"` it is at least announced as a single labelled image.
- **ARIA:** `role="img"` + `aria-label` on the SVG (line 275) is correct. Legend uses `role="list"` / `role="listitem"` with `aria-label="Chart legend"` (lines 264-266) — correct and well-formed. No misused or invalid ARIA states.
- **CustomEvents:** `ai-analytics-point-hover` fired with `{ bubbles: true, composed: true }` and `detail: { series, x, y }` (lines 242-245). Detail shape matches the documented `@fires` JSDoc (line 14). Correct.
- **Touch targets:** Hover hit targets are an r=10 circle (~20px) plus a stroke-width-12 path hit-area. Below the 44px guideline, but these are data-point hover affordances on a dense plot, not primary tap controls — acceptable for a chart, though touch users get no tap-to-inspect with adequate target size.

### 5. Visual Design Check
Modern and sleek: clean card with elevation, divider-separated header, wrap-friendly legend with full-round dots, hairline grid, rounded line caps/joins, and an elevated tooltip with a colored value. Radius and spacing are tasteful and consistent. Typography hierarchy (semibold title → muted xs legend/axis) reads well on dark. Dividers are present where needed (header underline, grid lines). It would comfortably pass a HeroUI/Vercel-style showcase. The only polish items are the borrowed muted/chart tokens and the raw focus-ring width. Verdict: **strong**.

### 6. Fixes Needed
1. **Line 103** — Axis labels use an input-domain token instead of the dedicated chart token.
   - Current: `fill: var(--cg-color-input-text-placeholder);`
   - Fixed: `fill: var(--cg-color-chart-axis);`
   - Why: `--cg-color-chart-axis` is the purpose-built tier-2 token for chart axis text; borrowing `--cg-color-input-text-placeholder` couples chart styling to input theming and will drift.
2. **Line 107** — Grid lines use the card divider token instead of the dedicated chart grid token.
   - Current: `stroke: var(--cg-color-surface-cards-divider);`
   - Fixed: `stroke: var(--cg-color-chart-grid);`
   - Why: `--cg-color-chart-grid` exists specifically for chart gridlines; using it keeps grid contrast tunable independently of card dividers.
3. **Line 155** — Y-axis label uses the input placeholder token instead of the chart axis token.
   - Current: `fill: var(--cg-color-input-text-placeholder);`
   - Fixed: `fill: var(--cg-color-chart-axis);`
   - Why: Same as fix 1 — axis text should resolve from `--cg-color-chart-axis` for consistency across both axis label classes.
4. **Line 160** — Focus ring uses a generic overlay color and a raw magic `3px` width.
   - Current: `box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);`
   - Fixed: `box-shadow: 0 0 0 var(--cg-border-width-300) var(--cg-color-focus-ring);`
   - Why: `--cg-color-focus-ring` is the semantic focus token (vocab line 117); `--cg-border-width-300` replaces the bare `3px` so the ring thickness is token-governed.

### Research-backed enhancements

- **Crosshair + synchronized hover tooltip** — On pointer move, snap a vertical crosshair guide to the nearest data point and float a card-style tooltip showing all series values at that x (multi-series, formatted units, delta vs. prior point). This is the shadcn/Recharts `ChartTooltip` pattern and is now the baseline expectation, not a nicety ([shadcn/ui charts](https://ui.shadcn.com/charts/area), [Shadcn Studio](https://shadcnstudio.com/blocks/dashboard-and-application/charts-component)). Drive it from tier-2 tokens (`--cg-color-surface-overlay`, `--cg-color-border-subtle`) so it inherits the dark-first theme.
- **Animated draw-in on mount + streaming append** — Animate the line/area path with a left-to-right reveal (clip-path or stroke-dashoffset) on first render, and for AI-streamed data points, ease-in only the newly appended segment rather than re-animating the whole series. Tremor/Recharts treat enter animations as standard feedback that "an action was registered" ([Tremor](https://www.tremor.so/), [Medium: 2025 dashboard principles](https://medium.com/@allclonescript/20-best-dashboard-ui-ux-design-principles-you-need-in-2025-30b661f2f795)). Enumerate transition properties (no `transition: all`).
- **Gradient area fill under the line** — Replace flat fills with a vertical token-driven gradient fading to near-transparent at the baseline (the signature Vercel/Tremor/shadcn area aesthetic). Use a `--cg-color-chart-series-1` accent at ~15% top opacity → 0% bottom for the sleek modern look.
- **Skeleton + empty + error states** — Add a shimmer skeleton (axis ghost lines + pulsing plot area) for the loading/streaming-pending state, a centered empty state with a muted prompt when no data, and an inline error affordance with retry. AI charts especially need a distinct "generating" state since data arrives asynchronously; missing states are the most common gap flagged in 2025 dashboard reviews.
- **Brush / range-select interaction** — Let users click-drag across the plot to zoom a time window, with a thin overview "brush" strip beneath for context and reset. This real-time interactivity is now an expected affordance for analytics, not optional ([Medium: 2025 dashboard principles](https://medium.com/@allclonescript/20-best-dashboard-ui-ux-design-principles-you-need-in-2025-30b661f2f795)).
- **Interactive legend as series toggles** — Make legend chips clickable to mute/solo series, with the active chip carrying a filled dot in its series color and inactive chips dropping to reduced opacity. Pair with subtle 150ms opacity/scale micro-transitions on hover so the chart reads as responsive and direct-manipulable ([Shadcn Store charts](https://shadcnstore.com/blocks/application/charts)).

### Playground proposal

Keep a multi-series example to show the legend and overlapping lines, but use realistic distinct series so the legend and tooltip color-coding read clearly. Suggested defaults: title="Latency (ms)", yLabel="ms", series=[{name:'p50', color:'#4ade80', data:[{x:'Mon',y:120},{x:'Tue',y:98},{x:'Wed',y:110},{x:'Thu',y:90},{x:'Fri',y:105}]},{name:'p99', color:'#f59e0b', data:[{x:'Mon',y:320},{x:'Tue',y:290},{x:'Wed',y:340},{x:'Thu',y:280},{x:'Fri',y:300}]}], height=220. This exercises legend wrapping, two-series grid scaling, and hover tooltips. No structural change needed to the registry beyond richer sample data.

---
*cleanliness: needs-work | fixes proposed: 4*
