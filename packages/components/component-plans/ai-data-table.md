# ai-data-table — Improvement Plan

## Current State

### CSS Audit
| Property | Value | Token? | Issue |
|---|---|---|---|
| `:host` animation duration | `200ms` | No | Should use motion token |
| `thead th` letter-spacing | `0.05em` | No | Should use `--cg-letter-spacing-wide` |
| `thead th.sortable` transition | `color 150ms ease` | No | Duration not tokenized |
| `tbody tr` transition | `background 120ms ease` | No | Duration not tokenized |
| `.anomaly-high` overlay | Uses tokens | Yes | OK |
| `.anomaly-medium` overlay | Uses tokens | Yes | OK |
| `.anomaly-low` overlay | Uses tokens | Yes | OK |
| `.tooltip` border | Uses `#3f3f46` fallback | Yes | Token with fallback OK |
| All spacing/font tokens | Properly used | Yes | Good |

### States Audit
| State | Implemented? | Notes |
|---|---|---|
| Default | Yes | |
| Row hover | Yes | Subtle background |
| Column header hover | Yes | Accent color |
| Column header focus | Yes | Outline |
| Sorted column | Yes | Sort arrow indicator |
| Anomaly cells (high/medium/low) | Yes | Background + left border |
| Anomaly tooltip | Yes | Shows on hover |
| Empty (no data) | Yes | "No data available" |
| Empty (no columns) | Yes | "No columns defined" |
| Loading | No | No skeleton/loading state |
| Disabled | No | No disabled state |
| Selected row | No | No row selection |
| Active/pressed | No | Missing :active state |

### Interaction Audit
- Column sort dispatches `ai-data-sort` - OK
- Cell click dispatches `ai-data-cell-click` - OK
- Anomaly click dispatches `ai-data-anomaly-click` - OK
- Keyboard: Enter/Space on sortable headers - OK
- Tooltip on hover for anomaly cells - OK
- `role="table"` on container - but the actual `<table>` element is already semantic; double-role
- `role="row"` on `<tr>` and `role="columnheader"` on `<th>` - OK but redundant with native semantics
- Sort direction indicator uses `aria-sort` - OK

## Style Fixes Needed

1. **Tokenize animation duration** on `:host` to use `var(--cg-motion-duration-fast)`
2. **Tokenize letter-spacing** on `thead th` to use `var(--cg-letter-spacing-wide)`
3. **Tokenize transition durations** in th and tr hover states
4. **Add loading/skeleton state** CSS for shimmer rows

## Interaction Fixes Needed

1. **Add loading state** with skeleton rows
2. **Remove redundant `role="table"` on container div** — the native `<table>` element already has table semantics; container role conflicts
3. **Add row selection** — optional selected row(s) with highlight
4. **Add keyboard navigation within table** — arrow keys to navigate cells (WAI-ARIA grid pattern)
5. **Tooltip is inaccessible** — implemented via mouseenter/mouseleave only, not keyboard-accessible; consider using `aria-describedby` or a tooltip component
6. **Anomaly tooltip positioning** — uses absolute positioning relative to cell, can overflow container
7. **Add `:active` press state** on clickable cells

## Test Spec

### Unit Tests
- [ ] renders table with columns and data
- [ ] renders empty state when no columns defined
- [ ] renders empty state when no data provided
- [ ] sorts data ascending and descending on header click
- [ ] toggles sort direction on same column re-click
- [ ] highlights anomaly cells with correct severity class (high/medium/low)
- [ ] shows anomaly tooltip on hover
- [ ] renders anomaly icon with reason in aria-label
- [ ] handles object values by JSON-stringifying them
- [ ] handles null/undefined cell values gracefully

### Event Tests
- [ ] dispatches `ai-data-sort` on sortable header click with key and direction
- [ ] dispatches `ai-data-cell-click` on cell click with row index, column key, value
- [ ] dispatches `ai-data-anomaly-click` on anomaly cell click with anomaly details
- [ ] keyboard Enter/Space on header triggers sort

### Accessibility Tests
- [ ] table headers have `role="columnheader"` and `aria-sort` attribute
- [ ] sortable headers have `tabindex="0"`, non-sortable have `tabindex="-1"`
- [ ] anomaly icon has `aria-label` with reason text
- [ ] container `role="table"` does not conflict with native `<table>` semantics

### Visual Regression Tests
- [ ] snapshot: basic table with data
- [ ] snapshot: sorted table with sort arrow
- [ ] snapshot: table with high-severity anomaly cells
- [ ] snapshot: empty table state
