# ai-heatmap — Improvement Plan

## Current State

### CSS Audit
| Property | Value | Token? | Issue |
|---|---|---|---|
| `:host` animation duration | `200ms` | No | Should use motion token |
| `.cell` transition | `opacity 150ms` | No | Duration not tokenized |
| `.cell:hover` stroke-width | `1.5` | No | SVG-specific, acceptable |
| `.axis-label` font-size | `var(--cg-font-size-xs, 12px)` | Yes | Good |
| `.legend-bar` width | `80px` | No | Magic number |
| `.cell-text` font-size | `10` (SVG attr) | No | Hardcoded in SVG |
| All colors | Uses tokens | Yes | Good |
| All spacing | Uses tokens | Yes | Good |
| All border-radius | Uses tokens | Yes | Good |

### States Audit
| State | Implemented? | Notes |
|---|---|---|
| Default | Yes | Colored matrix with cell values |
| Hover (cell) | Yes | Reduced opacity + stroke highlight |
| Focus-visible (cell) | Yes | Accent outline |
| Tooltip | Yes | Shows on hover with row/col/value |
| Empty | Yes | "No data provided" message |
| Sequential color scale | Yes | Dark to lime gradient |
| Diverging color scale | Yes | Red through neutral to green |
| Loading | No | No loading/skeleton state |
| Error | No | No error state |
| Disabled | No | No disabled state |
| Active/pressed | No | Missing :active/click feedback |

### Interaction Audit
- Cell click dispatches `ai-heatmap-cell-click` with row, col, labels, value - OK
- Cell hover shows tooltip - OK
- Cell keyboard Enter triggers click - OK
- Cells have `tabindex="0"` and `role="gridcell"` - OK
- SVG has `role="grid"` and `aria-label` - OK
- Cells have `aria-label` with row/col/value - OK
- Legend bar with min/max labels - OK
- Color calculation for sequential and diverging scales - OK

## Style Fixes Needed

1. **Tokenize animation duration** on `:host` to `var(--cg-motion-duration-fast)`
2. **Tokenize cell transition** duration to `var(--cg-motion-duration-fast)`
3. **Tokenize legend-bar width** or make configurable
4. **Tokenize SVG font-size** for cell text (use CSS class instead of inline attribute)
5. **Cell size should be configurable** — currently hardcoded `_cellSize = 40`
6. **Label margins hardcoded** — `_labelMarginLeft = 80`, `_labelMarginTop = 40`

## Interaction Fixes Needed

1. **Add loading state** with skeleton grid
2. **Add error state** for malformed data
3. **Add keyboard navigation** — arrow keys to navigate between cells in the grid
4. **Tooltip positioning** — uses absolute positioning, can overflow; add boundary clamping
5. **Cell size should be responsive** — calculate based on container width / number of columns
6. **Add Space key handler** on cells (currently only Enter)
7. **Legend needs role** — `role="img"` with `aria-label` describing the scale
8. **Show values toggle** should reflect in aria — when `showValues=false`, cell aria-label still includes value (OK)

## Test Spec

### Unit Tests
- [ ] renders grid with correct number of rows and columns
- [ ] renders cell colors using sequential scale (dark to lime)
- [ ] renders cell colors using diverging scale (red through neutral to green)
- [ ] renders cell values when `showValues=true`
- [ ] hides cell values when `showValues=false`
- [ ] renders row and column labels
- [ ] renders legend bar with min/max values
- [ ] shows tooltip on cell hover with row/col/value
- [ ] renders empty state when data is empty
- [ ] handles non-integer values with decimal formatting
- [ ] calculates correct text color (dark on light cells, light on dark)

### Event Tests
- [ ] dispatches `ai-heatmap-cell-click` on cell click with row, col, labels, value
- [ ] dispatches click on Enter key
- [ ] events bubble and are composed

### Accessibility Tests
- [ ] SVG has `role="grid"` and `aria-label`
- [ ] cells have `role="gridcell"`, `tabindex="0"`, and descriptive `aria-label`
- [ ] focus-visible outline on cells
- [ ] title rendered as heading when provided

### Visual Regression Tests
- [ ] snapshot: sequential heatmap with values
- [ ] snapshot: diverging heatmap
- [ ] snapshot: heatmap without values
- [ ] snapshot: tooltip on hover
- [ ] snapshot: empty state
