## ai-heatmap — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 27 | animation duration | `var(--cg-transition-duration-fast)` | ✅ | — |
| 27 | animation easing | `var(--cg-transition-easing-ease-out)` | ✅ | — |
| 31 | background | `var(--cg-color-surface-cards-background)` | ✅ | — |
| 32 | border width | `var(--cg-border-width-50)` | ✅ | — |
| 32 | border color | `var(--cg-color-surface-cards-border)` | ✅ | — |
| 33 | border-radius | `var(--cg-border-radius-150)` | ✅ | — |
| 34 | padding | `var(--cg-spacing-16)` | ✅ | — |
| 40 | font-size (title) | `var(--cg-font-size-sm)` | ✅ (14px min met) | — |
| 41 | font-weight | `var(--cg-font-weight-semibold)` | ✅ | — |
| 42 | color (title) | `var(--cg-color-surface-base-text)` | ✅ | — |
| 43 | margin-bottom | `var(--cg-spacing-12)` | ✅ | — |
| 50 | transition (opacity) | `var(--cg-transition-duration-fast)` + `var(--cg-transition-easing-default)` | ✅ (explicit, not `all`) | — |
| 52 | `.cell:hover` opacity | `0.85` | ✅ (unitless opacity) | — |
| 52 | `.cell:hover` stroke | `var(--cg-color-surface-base-text)` | ✅ | — |
| 52 | `.cell:hover` stroke-width | `1.5` | ✅ (SVG geometry) | — |
| 55 | focus stroke | `var(--cg-color-focus-ring)` | ✅ | — |
| 57 | focus stroke-width | `2` | ✅ (SVG geometry) | — |
| 60 | font-family (cell text) | `var(--cg-font-family-mono)` | ✅ | — |
| 65 | font-size (axis-label) | `var(--cg-font-size-xs)` | ✅ (decorative axis, exempt from 14px body min) | — |
| 66 | fill (axis-label) | `var(--cg-color-input-text-placeholder)` | ✅ (tier-2 semantic) | — |
| 72 | tooltip background | `var(--cg-color-surface-container-background)` | ✅ | — |
| 73 | tooltip border | `var(--cg-border-width-50)` + `var(--cg-color-surface-cards-border)` | ✅ | — |
| 74 | tooltip border-radius | `var(--cg-border-radius-100)` | ✅ | — |
| 75 | tooltip padding | `var(--cg-spacing-6) var(--cg-spacing-8)` | ✅ | — |
| 76 | tooltip font-size | `var(--cg-font-size-xs)` | ✅ (tooltip metadata, exempt) | — |
| 77 | tooltip color | `var(--cg-color-surface-base-text)` | ✅ | — |
| 83 | tooltip-value weight | `var(--cg-font-weight-bold)` | ✅ | — |
| 83 | tooltip-value color | `var(--cg-color-surface-base-text)` | ✅ | — |
| 89 | legend gap | `var(--cg-spacing-8)` | ✅ | — |
| 90 | legend margin-top | `var(--cg-spacing-12)` | ✅ | — |
| 91 | legend font-size | `var(--cg-font-size-xs)` | ✅ (legend labels, exempt) | — |
| 92 | legend color | `var(--cg-color-input-text-placeholder)` | ✅ | — |
| 95 | legend-bar height | `var(--cg-spacing-8)` | ✅ | — |
| 96 | legend-bar width | `var(--cg-spacing-80)` | ✅ | — |
| 97 | legend-bar radius | `var(--cg-border-radius-50)` | ✅ | — |
| 102 | empty padding | `var(--cg-spacing-24)` | ✅ | — |
| 103 | empty color | `var(--cg-color-input-text-placeholder)` | ✅ | — |
| 104 | empty font-size | `var(--cg-font-size-sm)` | ✅ | — |
| 108 | rounded=none radius | `0` | ✅ (0 allowed) | — |
| 109 | rounded=sm radius | `var(--cg-border-radius-50)` | ✅ | — |
| 110 | rounded=md radius | `var(--cg-border-radius-100)` | ✅ | — |
| 111 | rounded=lg radius | `var(--cg-border-radius-150)` | ✅ | — |

**JS-computed fills (lines 147–179):** `_getColor()` / `_getTextColor()` return raw `rgb(...)` strings (e.g. `rgb(39,39,42)`, `rgb(223,255,97)`, `rgb(0,0,0)`, `rgb(250,250,250)`) applied via the `fill` attribute on `<rect>`/`<text>`. These are algorithmic per-value gradient interpolations — exempt from the token rule under the gradient-stop / computed-value carve-out, and the inline comment (lines 142–146) documents the rationale. **Not token fixes**, but flagged in §6 as a design concern (the constants are hardcoded brand-palette values that drift if the palette changes).

**SVG inline `font-size="10"` (lines 228, 234, 251):** presentation attributes on `<text>`. Unitless SVG attribute, not a CSS declaration — not a token violation. Note that on axis labels it duplicates/overrides the `.axis-label { font-size: var(--cg-font-size-xs) }` CSS rule; harmless redundancy, flagged for cleanup only.

### 2. Styling Audit

- **Border radius:** All radii tokenized (`--cg-border-radius-50/100/150`) with a clean `rounded` variant matrix. Cell `rx="3"` is an SVG geometry attribute (unitless), acceptable.
- **Spacing:** Fully on the token scale (`--cg-spacing-6/8/12/16/24/80`). No magic px.
- **Font-size accessibility:** Body/title text uses `--cg-font-size-sm` (14px) — meets the 14px minimum. Axis labels, tooltip, and legend use `--cg-font-size-xs` — acceptable as these are chart-decorative metadata, not body copy.
- **Translucent vs solid borders:** Uses semantic `--cg-color-surface-cards-border` / `--cg-color-surface-container-background` — consistent with the dark-first surface system.
- **Transitions:** Explicit property (`transition: opacity ...`) — no `transition: all`. Motion tokens used for both duration and easing. `:host` entrance animation respects `reducedMotion` (imported and applied at line 25).
- **Dark-theme suitability:** Surfaces and text pull from tier-2 semantic tokens, so theme-adaptive. The one weakness: the heatmap gradient endpoints are hardcoded RGB in JS, so the data cells themselves do not adapt to a light theme.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | ✅ | `.cell` base fill from `_getColor()` | — |
| Hover | ✅ | `.cell:hover` opacity 0.85 + stroke; plus tooltip via `@mouseenter` | — |
| Active/Press | ⚠️ Partial | `@click` fires event but no `:active` visual press feedback | No pressed visual state |
| Focus-visible | ✅ | `.cell:focus-visible` stroke = `--cg-color-focus-ring`, width 2 | Solid, visible ring — good |
| Disabled | N/A | Chart visualization, no interactive disabled mode | — |
| Loading | N/A | Data is passed in synchronously; no async loading state | — |
| Error | N/A | No error rendering path; bad data would throw on `_min`/`_max` | Empty-data handled (line 208), but malformed rows not guarded |
| Success | N/A | Not an outcome-bearing component | — |
| Empty | ✅ (bonus) | `data.length === 0` → "No data provided" | Good |

### 4. Interaction Audit

- **Keyboard:** Cells are `tabindex="0"` and handle `Enter` (line 247) to trigger click. **Missing `Space`** — convention for activating a focused gridcell-like control is Enter *and* Space. Arrow-key grid navigation (expected for `role="grid"`) is absent; users must Tab through every cell.
- **ARIA:** `role="grid"` on `<svg>` with a descriptive `aria-label` (rows × cols). Each cell is `role="gridcell"` with a per-cell `aria-label` (row, col, value). Legend is `aria-hidden="true"` — appropriate. Note: a strict `grid` pattern also expects `role="row"` wrappers; cells are direct children of the grid, which is a minor a11y structural gap (not a token issue).
- **CustomEvents:** `ai-heatmap-cell-click` dispatched with `bubbles: true, composed: true` (crosses shadow boundary). Detail = `{ row, col, rowLabel, colLabel, value }`. Note the JSDoc `@fires` at line 17 documents detail as `{row, col, value}` — out of sync with the richer actual payload (includes `rowLabel`/`colLabel`). Doc drift, not a runtime bug.
- **Touch targets:** Cells are `_cellSize = 40` → ~39×39px (`cs - 1`). Below the 44px minimum. This is a sizing/design change (noted, not a token fix).

### 5. Visual Design Check

Modern and sleek: tokenized card surface, rounded variants, mono numerals, hover tooltip, and a min/max gradient legend give it a polished analytics-dashboard feel. Radius and breathing room are good (16px padding, 12px label gaps). Typography hierarchy is clear (semibold title → mono cells → xs muted axis/legend). Focus ring is crisp. Showcase-ready for a Vercel/HeroUI-style dashboard. Weak spot is purely structural-a11y (no grid arrow navigation, sub-44px targets) and the non-theme-adaptive hardcoded gradient, not visual polish.

**Verdict: strong**

### 6. Fixes Needed

No token-vocabulary fixes needed — every CSS declaration resolves to a real, in-vocab token and the tier hierarchy is respected. No comma-fallbacks, no `transition: all`, no raw hex/rgba in CSS rules, no tier-1 palette colors in CSS.

Non-token flags (described, not auto-fixable token swaps):

1. **Hardcoded RGB gradient constants (lines 147–179).** `_getColor()`/`_getTextColor()` bake brand-palette RGB endpoints (`rgb(39,39,42)`, `rgb(223,255,97)`, etc.) directly in JS. Excused by the gradient-computation carve-out and the inline comment, but they will drift if the token palette changes and they do not adapt to a light theme. Recommend reading the endpoints from CSS custom properties via `getComputedStyle` at render time so the heatmap follows the active theme. (No vocab token substitution is possible inline — left as a flag, not a fix.)
2. **Keyboard activation missing Space (line 247).** `@keydown` handles only `Enter`. Add `Space` to match standard activation semantics for grid cells.
3. **No arrow-key grid navigation.** `role="grid"` implies 2D arrow navigation; currently every cell is a Tab stop. Recommend roving-tabindex with Arrow keys for large matrices.
4. **Touch target < 44px.** `_cellSize = 40`, rendered cell `cs - 1` ≈ 39px. Below the 44px minimum. Sizing/design change — enlarge cell size or expand the interactive/focus area.
5. **JSDoc `@fires` drift (line 17).** Documented detail `{row, col, value}` omits the actual `rowLabel`/`colLabel` fields. Update the doc comment.
6. **No guard for malformed `data` rows.** `_min`/`_max` over `data.flat()` and `data[row]![col]!` non-null assertions will throw on ragged/empty rows. Empty-array case is handled; ragged data is not. Add validation or a defensive fallback.

### Research-backed enhancements

Modern 2025-era heatmap patterns (GitHub-contribution-style grids, shadcn/Recharts chart layer, Linear/Vercel dashboard aesthetics) suggest the following concrete upgrades for `ai-heatmap`:

1. **Theme-reactive gradient via CSS custom properties (shadcn/ui theming pattern).** The shadcn calendar heatmap derives its intensity ramp from the active theme's color tokens rather than baked-in RGB, so the same component reads correctly in light and dark and respects per-data-type color schemes. Replace the hardcoded `rgb()` endpoints in `_getColor()` (lines 147–179) with `getComputedStyle()` reads of two tier-2 token endpoints (e.g. `--cg-color-surface-cards-background` → `--cg-color-action-primary-default`), interpolated at render. This kills the palette-drift flag in §6.1 and makes the data cells theme-adaptive — the one remaining gap called out in §2 (Dark-theme suitability). Source: [The Anatomy of shadcn/ui Components — Vercel Academy](https://vercel.com/academy/shadcn-ui/extending-shadcn-ui-with-custom-components).

2. **Row/column cross-hair highlight on hover (Linear/Vercel dashboard density pattern).** Beyond the per-cell `opacity 0.85` hover, dim all cells outside the hovered cell's row and column (or stroke the active row/col axis labels) so the user can trace a value back to its coordinates at a glance. This is the dominant affordance in modern matrix heatmaps and directly addresses the "Tab through every cell" friction noted in §4 by giving spatial orientation. Implement as a `:host([data-hover-row][data-hover-col])` driven opacity rule on non-matching `.cell`s — explicit `transition: opacity` already exists (line 50), no new motion token needed. Source: [Heatmap Visualization Guide 2025 — ChartGen](https://chartgen.ai/resources/blog/heatmap-data-visualization-complete-guide-examples).

3. **Staggered cell entrance animation (animated-UI dashboard complement).** The 2026 shadcn chart stack pairs static charts with an "animated-UI complement for KPI cards and live-update dashboards." Replace the single `:host` fade with a per-cell entrance that staggers by grid index (`animation-delay: calc(var(--cell-index) * 12ms)`), reusing `--cg-transition-duration-fast` + `--cg-transition-easing-ease-out`. Must short-circuit to zero delay under the already-imported `reducedMotion` guard (line 25). Gives the polished "data populating in" feel of a Vercel analytics panel without new tokens. Source: [7 Best shadcn/ui Charts Templates 2026 — AdminLTE.IO](https://adminlte.io/blog/shadcn-ui-charts-templates/).

4. **Loading skeleton state (shadcn responsive/large-dataset pattern).** §3 marks Loading as N/A because data is synchronous, but the shadcn heatmap explicitly ships "performance optimizations for rendering large datasets" and a skeleton surface for async fetches — the expected pattern when a heatmap is fed from a streaming/AI source (relevant for an `ai-*` component). Add a `loading` boolean prop that renders a shimmer grid of empty `.cell` rects at the same `_cellSize` geometry, so the layout doesn't shift when real data arrives. Closes the missing Loading state for the AI data-feed use case. Source: [Shadcn Calendar Heatmap — shadcn.io](https://www.shadcn.io/template/gurbaaz27-shadcn-calendar-heatmap).

5. **Tooltip coordinate context + value rank (modern heatmap tooltip pattern).** Current tooltip shows the raw value; 2025 heatmap tooltips surface the cell's full context — row label, col label, and the value's position in the scale (e.g. "84 · 92nd percentile" or a mini inline gradient marker). Since the click event already carries `rowLabel`/`colLabel` (§4), thread the same fields into the tooltip render. Reuse existing `.tooltip-value` (`--cg-font-weight-bold`) for the figure and `--cg-color-input-text-placeholder` for the muted coordinate line — no new tokens. Source: [Heatmap Visualization Guide 2025 — ChartGen](https://chartgen.ai/resources/blog/heatmap-data-visualization-complete-guide-examples).
