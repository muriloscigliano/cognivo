# cg-chart — Improvement Plan

## Current State

### CSS Audit
| Property | Current | Issue |
|---|---|---|
| `.tooltip` padding | `6px 10px` | Should use spacing tokens |
| `.tooltip` border-radius | `var(--cg-border-radius-150)` | OK |
| `.tooltip` font-size | `var(--cg-font-size-xs)` | OK |
| `.tooltip` margin-top | `-8px` | Magic number |
| `.axis-label` font-size | `10px` | Magic number — no matching token |
| `.axis-value` font-size | `9px` | Magic number — no matching token |
| `.bar-value` font-size | `9px` | Magic number |
| `.legend` gap | `var(--cg-spacing-12)` | OK |
| `.legend-item` gap | `6px` | Should use `var(--cg-spacing-6, 6px)` |
| `.legend-dot` size | `10px` | Should use `var(--cg-spacing-10, 10px)` |
| `.legend-dot` border-radius | `3px` | Magic number — should use `var(--cg-border-radius-50, 4px)` or similar |
| `.empty` min-height | `120px` | Magic number |
| `.pie-slice:hover` filter | Missing closing paren | CSS syntax error: `drop-shadow(0 2px 4px var(...)` |
| `.subtitle` margin-top | `-8px` | Magic number |
| Bar animation delay | Hardcoded per nth-child (max 6) | Only handles up to 6 bars |
| Line path dasharray | `1000` | Arbitrary large number |

### States Audit
| State | Supported | Notes |
|---|---|---|
| Bar chart | Yes | Vertical bars |
| Horizontal bar | Yes | Horizontal bars |
| Line chart | Yes | Connected dots |
| Area chart | Yes | Filled line |
| Pie chart | Yes | Full circle |
| Donut chart | Yes | Pie with center hole |
| Empty | Yes | "No data available" message |
| Tooltip hover | Yes | Shows label + value |
| Legend | Yes | Toggleable via prop |
| Grid lines | Yes | Toggleable via prop |
| Value labels | Yes | On bars, toggleable |
| Loading | No | Missing loading state |
| Error | No | Missing error state |

### Interaction Audit
| Feature | Status | Notes |
|---|---|---|
| Hover tooltip | OK | Shows on mouseenter, hides on mouseleave |
| Bar hover | OK | Opacity/brightness change |
| Pie slice hover | Partial | CSS has syntax error in filter |
| Line dot hover | OK | Radius increases |
| Click events | Missing | No click handler for data points |
| Responsive | Partial | SVG viewBox scales but fixed heights |

### Accessibility Audit
| Item | Status | Notes |
|---|---|---|
| Chart title | Partial | Title rendered but no aria association |
| SVG `aria-label` | Missing | No label on SVG elements |
| Data table alternative | Missing | No table fallback for screen readers |
| Tooltip keyboard access | Missing | Only mouse-triggered |
| Color contrast | Depends | Palette colors not verified for contrast |

## Style Fixes Needed
1. Fix CSS syntax error in `.pie-slice:hover` — missing closing paren on `drop-shadow`
2. Tokenize tooltip padding to `var(--cg-spacing-6) var(--cg-spacing-10)`
3. Tokenize axis label/value font sizes (add `--cg-font-size-3xs: 10px` or use closest)
4. Tokenize `.legend-item` gap and `.legend-dot` dimensions
5. Replace tooltip margin-top magic number with spacing token
6. Remove bar animation nth-child limit — use CSS custom property for stagger
7. Tokenize `.empty` min-height

## Interaction Fixes Needed
1. Fix `.pie-slice:hover` CSS syntax error (missing closing paren)
2. Add click events on data points (dispatch `cg-chart-select`)
3. Add keyboard navigation for data points (arrow keys to move between bars/dots)
4. Add `role="img"` and `aria-label` on SVG elements
5. Add visually-hidden data table for screen reader access
6. Add loading state
7. Add error state
8. Consider making tooltip keyboard-accessible (focus on data points)

## Test Spec

### Unit Tests
- `it('renders bar chart with correct number of bars')`
- `it('renders horizontal bar chart')`
- `it('renders line chart with connected points')`
- `it('renders area chart with filled region')`
- `it('renders pie chart with slices')`
- `it('renders donut chart with center hole')`
- `it('renders empty state when data is empty')`
- `it('shows tooltip on bar hover')`
- `it('hides tooltip on mouse leave')`
- `it('renders legend when showLegend is true')`
- `it('hides legend when showLegend is false')`
- `it('renders value labels when showValues is true')`
- `it('renders grid lines when showGrid is true')`
- `it('formats large numbers (K, M suffixes)')`
- `it('resolves palette colors from CSS custom properties')`
- `it('uses custom color from data item when provided')`
- `it('renders title and subtitle')`

### Visual Regression
- Bar chart with 6 items
- Line chart with tooltip visible
- Pie chart with percentage labels
- Donut chart with total center
- Horizontal bar chart
- Empty state
