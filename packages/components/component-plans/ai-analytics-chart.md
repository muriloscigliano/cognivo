# ai-analytics-chart — Improvement Plan

## Current State

### CSS Audit
| Property | Value | Token? | Issue |
|---|---|---|---|
| `:host` animation duration | `200ms` | No | Should use motion token |
| `.legend-dot` width/height | `8px` | No | Should use `var(--cg-spacing-8)` |
| `.legend-dot` border-radius | `50%` | OK | Standard circle |
| `.data-line` stroke-width | `2` | No | Not tokenized but SVG-specific, acceptable |
| `.hit-area` stroke-width | `12` | No | SVG-specific, acceptable |
| `.tooltip` margin-top | `calc(-1 * var(--cg-spacing-8))` | Yes | Good token usage |
| All colors | Uses tokens | Yes | Good |
| All spacing | Uses tokens | Yes | Good |
| All border-radius | Uses tokens | Yes | Good |
| Focus-visible | Double ring pattern | Yes | Good |

### States Audit
| State | Implemented? | Notes |
|---|---|---|
| Default | Yes | Multi-series line chart |
| Hover (point) | Yes | Circle appears, tooltip shows |
| Empty (no title, no series) | Partial | Header hidden, but no explicit empty state |
| Mouse leave | Yes | Tooltip dismissed |
| Focus-visible | Yes | On SVG element |
| Loading | No | No loading/skeleton state |
| Error | No | No error state |
| Disabled | No | No disabled state |
| Responsive resize | Yes | ResizeObserver updates width |

### Interaction Audit
- Point hover dispatches `ai-analytics-point-hover` - OK
- Mouse leave clears hover state - OK
- Legend rendered for each series - OK
- SVG has `role="img"` and `aria-label` - OK
- SVG has `tabindex="0"` for focus - OK
- ResizeObserver for responsive width - OK, with cleanup in disconnectedCallback
- Hit area circles for easier hover targeting - OK
- No click event on data points
- Y-axis label rotation - OK
- X-axis label filtering for large datasets - OK

## Style Fixes Needed

1. **Tokenize animation duration** on `:host` to `var(--cg-motion-duration-fast)`
2. **Tokenize legend-dot dimensions** to `var(--cg-spacing-8, 8px)`
3. **Add explicit empty state** when no series data provided
4. **Add loading skeleton** for chart area

## Interaction Fixes Needed

1. **Add click event on data points** — `ai-analytics-point-click` for drill-down
2. **Add keyboard navigation** — arrow keys to traverse data points when SVG focused
3. **Add ARIA description of chart data** — consider `aria-describedby` or structured data summary for screen readers
4. **Add loading state** with skeleton placeholder
5. **Add error state** for invalid data
6. **Tooltip positioning** — can overflow container; add boundary detection
7. **Series toggle** — allow showing/hiding individual series by clicking legend items
8. **Add point click handler** for drill-down into specific data points

## Test Spec

### Unit Tests
- [ ] renders SVG chart with correct viewBox dimensions
- [ ] renders data lines for each series with correct stroke color
- [ ] renders legend items matching series names and colors
- [ ] renders Y-axis labels and grid lines
- [ ] renders X-axis labels (filtered when > 12 points)
- [ ] renders Y-axis label when `yLabel` prop set
- [ ] shows tooltip on point hover with series name and value
- [ ] hides tooltip on mouse leave
- [ ] scales Y-axis correctly for data range
- [ ] handles single data point (centered)
- [ ] handles empty series array

### Event Tests
- [ ] dispatches `ai-analytics-point-hover` on data point hover with series, x, y
- [ ] events bubble and are composed

### Accessibility Tests
- [ ] SVG has `role="img"` and `aria-label` with title
- [ ] SVG has `tabindex="0"` for keyboard focus
- [ ] legend has `role="list"` with `role="listitem"` items
- [ ] focus-visible double ring on SVG

### Visual Regression Tests
- [ ] snapshot: single series line chart
- [ ] snapshot: multi-series chart with legend
- [ ] snapshot: chart with Y-axis label
- [ ] snapshot: chart with many X-axis labels (filtered)
