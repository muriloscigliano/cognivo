# ai-data-preview — Improvement Plan

## Current State

### CSS Audit
| Property | Value | Token? | Issue |
|---|---|---|---|
| All spacing/padding | Uses tokens | Yes | Good |
| All font sizes | Uses tokens | Yes | Good |
| All colors | Uses tokens | Yes | Good |
| `.preview-area` max-height | `320px` | No | Magic number, should be tokenized or configurable |
| `.btn-confirm` hover | No hover style defined | No | Missing hover state for confirm button |
| `.btn-cancel:hover` background | `var(--cg-color-surface-hover)` | Partial | Token name `--cg-color-surface-hover` may not exist in token system |
| JSON syntax colors | Uses custom `--cg-json-*` tokens | Yes | OK, but should verify these exist |
| `pre` line-height | `1.6` | No | Should use `--cg-line-height-relaxed` |

### States Audit
| State | Implemented? | Notes |
|---|---|---|
| Default (JSON) | Yes | Syntax-highlighted JSON |
| Table format | Yes | Rendered as HTML table |
| CSV format | Yes | Parsed and shown as table |
| Truncated | Yes | Shows "Showing X of Y rows" message |
| Row hover | Yes | Subtle background on table rows |
| Empty | Yes | "No data" message in table |
| Loading | No | No loading/skeleton state |
| Error | No | No error state for invalid data |
| Focus-visible (buttons) | Yes | Outline ring |
| Disabled | No | No disabled state for buttons |
| Active/pressed | No | Missing :active state on buttons |

### Interaction Audit
- Confirm dispatches `ai-data-confirm` with data and format - OK
- Cancel dispatches `ai-data-cancel` - OK
- Buttons have `aria-label` and `tabindex="0"` - OK
- Preview area has `role="region"`, `aria-label`, and `tabindex="0"` for scroll focus - OK
- Table has `role="table"` and column scope headers - OK
- `maxRows` prop limits displayed rows - OK
- Data size calculation via Blob - OK

## Style Fixes Needed

1. **Tokenize preview-area max-height** — use a CSS custom property or make it configurable via prop
2. **Add hover state for `.btn-confirm`** — currently no visual feedback on hover
3. **Verify `--cg-color-surface-hover` token** exists in the token system for `.btn-cancel:hover`
4. **Tokenize `pre` line-height** to use `var(--cg-line-height-relaxed, 1.6)`
5. **Add `:active` press state** on both buttons

## Interaction Fixes Needed

1. **Add loading state** with skeleton or spinner for async data loading
2. **Add error handling UI** — show error message for invalid JSON/CSV data
3. **Add keyboard shortcut** — Escape key for cancel, Enter for confirm
4. **Sticky table headers** — headers already sticky but verify scroll behavior
5. **Add aria-live for data size** so screen readers announce data metadata

## Test Spec

### Unit Tests
- [ ] renders JSON format with syntax highlighting (keys, strings, numbers, booleans, null)
- [ ] renders table format from array of objects
- [ ] renders CSV format parsed into table
- [ ] truncates data at `maxRows` and shows count message
- [ ] calculates and displays correct data size (B, KB, MB)
- [ ] displays row count for array data
- [ ] renders title from prop
- [ ] format badge shows current format (json/csv/table)
- [ ] handles invalid JSON gracefully (falls back to String)
- [ ] handles empty data array

### Event Tests
- [ ] dispatches `ai-data-confirm` on confirm click with data and format
- [ ] dispatches `ai-data-cancel` on cancel click
- [ ] events bubble and are composed

### Accessibility Tests
- [ ] preview area has `role="region"` and `aria-label="Data preview"`
- [ ] table has `role="table"` and `aria-label="Data table"`
- [ ] table headers use `scope="col"`
- [ ] buttons have `aria-label` and `tabindex="0"`
- [ ] focus-visible outlines on both buttons

### Visual Regression Tests
- [ ] snapshot: JSON preview with syntax highlighting
- [ ] snapshot: table format preview
- [ ] snapshot: truncated data with row count message
- [ ] snapshot: small data (bytes display)
