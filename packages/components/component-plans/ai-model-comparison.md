# ai-model-comparison — Improvement Plan

## Current State

### CSS Audit
- **Tokens**: Good coverage — spacing, colors, font sizes, border-radius all tokenized.
- **Magic numbers**: `font-weight: 700` on `th` (line 62) — should use `var(--cg-font-weight-bold, 700)`.
- **Sticky header**: `th` has `position: sticky; top: 0` — good for scroll.
- **Score bar tiers**: Color-coded by tier (low/mid/high/best) using status tokens.

### States Audit

| State | Supported | Notes |
|---|---|---|
| Default | Yes | Table renders with model columns |
| Hover | **Partial** | Select button has hover, but table rows do not |
| Focus-visible | Yes | Select button has focus ring |
| Empty | Yes | Returns `nothing` when no models |
| Loading | **No** | No loading/skeleton state |
| Error | **No** | No error handling |
| Disabled | **No** | No disabled state for select button |
| Responsive | **Partial** | `overflow-x: auto` wrapper, but no responsive breakpoints |

### Interaction Audit
- **Select button**: Fires `ai-comparison-select` with model detail.
- **Keyboard**: Select button is naturally focusable. No keyboard navigation for table cells.
- **ARIA**: `role="region"` on wrapper, `role="table"` on table, `aria-label` on select buttons.

## Style Fixes Needed

1. **Row hover** — Add hover highlight on `tr` for better scanability: `tr:hover { background: var(--cg-overlay-white-faint) }`.
2. **`th` font-weight** — Replace raw `700` with `var(--cg-font-weight-bold, 700)`.
3. **`th .model-name` font-weight** — Replace raw `700` with token.
4. **Metric label font-weight** — `font-weight: 600` should use `var(--cg-font-weight-semibold, 600)`.
5. **Score value font-weight** — `font-weight: 600` should use token.
6. **Rounded variants** — Missing `:host([rounded])` support; wrapper uses fixed `12px` radius.
7. **Best score highlighting** — Consider adding a subtle background glow to the best score cell, not just text color.

## Interaction Fixes Needed

1. **Keyboard table navigation** — Add arrow key navigation through score cells for screen reader users.
2. **Loading state** — Add `loading` property with skeleton rows.
3. **Sort by metric** — Allow clicking metric labels to sort models by that metric.
4. **Responsive stacking** — On narrow screens, consider stacking models vertically instead of horizontal scroll.
5. **Empty model scores** — When a model lacks a metric, show "N/A" instead of `0`.
6. **Highlight winner row** — Add a visual crown or highlight for the model with the most "best" scores.

## Test Spec

| # | Test Case | Type |
|---|---|---|
| 1 | Renders table with model columns from `.models` array | Unit |
| 2 | Displays all unique metrics as rows | Unit |
| 3 | Best score per metric gets `.best` class | Unit |
| 4 | Score bar width matches score percentage | Visual |
| 5 | Score tier classes applied correctly (low/mid/high/best) | Unit |
| 6 | Cost tier row shows costTier value in badge | Unit |
| 7 | Context window formatted correctly (K/M suffixes) | Unit |
| 8 | Select button fires `ai-comparison-select` with correct model | Unit |
| 9 | Select button hover changes to accent background | Visual |
| 10 | Focus-visible ring on select button | A11y |
| 11 | Returns nothing when models array is empty | Unit |
| 12 | Handles models with missing scores gracefully (shows 0) | Unit |
| 13 | Sticky header stays visible on scroll | Visual |
| 14 | `aria-label` set on region and select buttons | A11y |
| 15 | Wrapper allows horizontal scroll on overflow | Visual |
