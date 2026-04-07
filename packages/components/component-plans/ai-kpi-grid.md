# ai-kpi-grid — Improvement Plan

## Current State

### CSS Audit
| Property | Value | Token? | Issue |
|---|---|---|---|
| `.card-title` font-weight | `600` | No | Should use `var(--cg-font-weight-semibold)` |
| `.card-title` letter-spacing | `0.04em` | No | Should use token or `--cg-letter-spacing-wide` |
| `.kpi` transition | `all 150ms ease` | No | Non-specific `all`, duration not tokenized |
| `.kpi-value` font-weight | `700` | No | Should use `var(--cg-font-weight-bold)` |
| `.kpi-label` font-weight | `500` | No | Should use `var(--cg-font-weight-medium)` |
| `.kpi-delta` font-weight | `600` | No | Should use `var(--cg-font-weight-semibold)` |
| `.kpi` border-radius | `var(--cg-border-radius-100, 10px)` | Partial | Fallback `10px` unusual, typically `8px` |
| Grid gap | Uses tokens | Yes | Good |
| All colors | Uses tokens | Yes | Good |
| All spacing | Uses tokens | Yes | Good |

### States Audit
| State | Implemented? | Notes |
|---|---|---|
| Default | Yes | Grid of KPI cells |
| Hover (cell) | Yes | Border shift + background change |
| Focus-visible (cell) | Yes | Accent outline |
| Loading | Yes | Skeleton shimmer cells |
| Empty (no kpis) | Partial | Renders empty grid, no explicit empty state |
| Disabled | No | No disabled state |
| Active/pressed | No | Missing :active state |
| Error | No | No error state |
| Trend: up | Yes | Green with up arrow |
| Trend: down | Yes | Red with down arrow |
| Trend: neutral | Yes | Gray with right arrow |

### Interaction Audit
- KPI cell click dispatches `ai-kpi-click` with label and value - OK
- Keyboard: Enter/Space on cells triggers click - OK
- Cells have `role="button"` and `tabindex="0"` - OK
- `aria-label` includes label, value, and delta - OK
- Grid columns via inline style `grid-template-columns` - OK
- Title rendered when present - OK

## Style Fixes Needed

1. **Tokenize font-weight values** — replace raw `500`, `600`, `700` with weight tokens
2. **Tokenize letter-spacing** `0.04em` to use `--cg-letter-spacing-wide` or similar
3. **Tokenize KPI transition** — replace `all 150ms ease` with specific properties and token duration
4. **Fix border-radius fallback** — `10px` should be `8px` to match standard radius scale
5. **Add `:active` press state** on KPI cells

## Interaction Fixes Needed

1. **Add explicit empty state** — when `kpis` array is empty and not loading, show empty message
2. **Add error state** for failed data fetch
3. **Add disabled state** with aria-disabled
4. **Add `aria-label` on grid container** — currently only on outer card
5. **Consider `role="listitem"` on cells** instead of `role="button"` if they are informational

## Test Spec

### Unit Tests
- [ ] renders grid with correct number of KPI cells
- [ ] renders title when provided
- [ ] renders label, value, delta, and trend arrow for each KPI
- [ ] renders icon when KPI has icon property
- [ ] applies correct trend color (green/red/gray) and arrow direction
- [ ] renders correct number of grid columns from `columns` prop
- [ ] renders loading skeleton with correct cell count (columns * 2)
- [ ] handles empty KPI array
- [ ] handles KPI without delta (no trend arrow shown)

### Event Tests
- [ ] dispatches `ai-kpi-click` on cell click with label and value
- [ ] dispatches `ai-kpi-click` on Enter/Space keypress
- [ ] events bubble and are composed

### Accessibility Tests
- [ ] outer card has `role="region"` and `aria-label` with title
- [ ] KPI cells have `role="button"` and `tabindex="0"`
- [ ] KPI cells have `aria-label` including label, value, and delta
- [ ] focus-visible outline on KPI cells
- [ ] icon has `aria-hidden="true"`

### Visual Regression Tests
- [ ] snapshot: 2-column grid with mixed trends
- [ ] snapshot: 3-column grid with icons
- [ ] snapshot: loading skeleton
- [ ] snapshot: single KPI cell
