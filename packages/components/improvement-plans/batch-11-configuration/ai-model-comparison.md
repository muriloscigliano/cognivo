# AI Model Comparison Improvement Plan

**Component**: `ai-model-comparison`
**Category**: AI-Native
**File**: `src/components/ai-model-comparison/ai-model-comparison.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Fair
**Top 3 Issues**:
1. Raw hex color `#eab308` on line 119 (`.score-bar-fill.mid`) -- not wrapped in any token
2. Multiple magic numbers: `120px` min-width (line 73), `60px` score bar width (line 106), `6px` height (line 107), `3px` border-radius (lines 109, 115-116), `0.5px` letter-spacing (line 65), `4px` margin (line 151), `2px` padding (lines 140, 151)
3. CSS syntax error: orphaned closing brace and misplaced `.select-btn` rule at lines 172-173 (inside a `@media (prefers-reduced-motion)` block that was never opened)

---

## 1. Functional Issues

- **Line 172-173**: A `.select-btn { transition: none; }` rule followed by a closing brace appears after the `.select-btn:focus-visible` block. This appears to be a stray fragment of a `@media (prefers-reduced-motion)` block. The rule is syntactically broken -- the closing `}` on line 173 closes the entire `css` template prematurely, meaning the `reducedMotion` shared style may not properly cover this component's transitions.
- **Line 187**: `_bestScore()` will return `-Infinity` if called with a metric that no model has. While unlikely, a defensive `Math.max(0, ...)` guard would be safer.
- **No empty state**: When `models` is empty, `render()` returns `nothing` (line 211), which leaves the component invisible with no feedback. A meaningful empty state message would be better UX.

## 2. Interaction Issues

### 2.1 State Coverage
| State | Implemented | Notes |
|-------|------------|-------|
| Default | Yes | |
| Hover | Yes | `.select-btn:hover` (line 163) |
| Focus-visible | Yes | `.select-btn:focus-visible` (line 168) |
| Selected | **No** | No visual indicator for which model was selected |
| Disabled | **No** | No disabled state for the select buttons |
| Loading | **No** | No loading/skeleton state |
| Error | **No** | No error state display |
| Active/pressed | **No** | No `:active` style |

**Missing states**: selected (post-click), disabled, loading, error, active/pressed (5 of 8+ required).

### 2.2 Keyboard Navigation
- Select buttons are standard `<button>` elements and receive keyboard focus natively.
- **Missing**: No keyboard-navigable way to move between table columns or rows. Consider adding `tabindex` to cells for AT users or providing a description of the comparison via `aria-describedby`.

### 2.3 ARIA & Accessibility
- **Line 215**: `role="table"` on `<table>` is redundant since `<table>` has implicit table semantics. Remove it.
- **Line 214**: The wrapper `role="region"` with `aria-label` is good.
- **Score bars** (lines 240-242): The visual score bars have no text alternative. Screen readers only get the score number, which is fine, but the bars themselves should have `aria-hidden="true"`.
- **Line 65**: `letter-spacing: 0.5px` -- should be tokenized.

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Property | Value | Suggested Token |
|------|----------|-------|-----------------|
| 65 | `letter-spacing` | `0.5px` | `var(--cg-letter-spacing-wide, 0.5px)` |
| 73 | `min-width` | `120px` | `var(--cg-size-model-header-min, 120px)` |
| 106 | `width` | `60px` | `var(--cg-size-score-bar-width, 60px)` |
| 107 | `height` | `6px` | `var(--cg-spacing-6, 6px)` |
| 109 | `border-radius` | `3px` | `var(--cg-border-radius-25, 3px)` |
| 115-116 | `border-radius` | `3px` | `var(--cg-border-radius-25, 3px)` |
| 140 | `padding` | `2px` | `var(--cg-spacing-2, 2px)` |
| 151 | `margin` | `4px auto 0` | `var(--cg-spacing-4, 4px) auto 0` |

### 3.2 Raw Colors Found
| Line | Value | Context | Suggested Token |
|------|-------|---------|-----------------|
| 44 | `rgba(255, 255, 255, 0.05)` | box-shadow inset | `var(--cg-color-surface-highlight)` |
| 45 | `rgba(255, 255, 255, 0.03)` | background gradient | `var(--cg-color-surface-gradient-start)` |
| 119 | `#eab308` | `.score-bar-fill.mid` | `var(--cg-yellow-500, #eab308)` |

### 3.3 Spacing Issues
- Table padding is consistent at `8px 12px` using tokens (line 55) -- good.
- The `4px auto 0` margin on `.select-btn` (line 151) uses a magic `4px`.

### 3.4 Modern Design Enhancements
- Add a "winner" highlight column or row for the model with the best aggregate score.
- Consider sticky first column (metric labels) for horizontal scroll scenarios.
- Add hover highlight on table rows for better scanability.
- Score bars could animate on initial render for visual interest.
- Add responsive behavior -- on narrow screens, consider a card-based layout instead of a table.

## 4. Prioritized Fixes

### P0 - Critical
1. **Fix CSS syntax error** at lines 172-173 -- the orphaned `.select-btn { transition: none; }` block is malformed and may break reduced-motion handling.

### P1 - High
2. **Replace raw hex `#eab308`** on line 119 with `var(--cg-yellow-500, #eab308)` or a semantic token.
3. **Replace all magic numbers** listed in 3.1 with design tokens.
4. **Add `aria-hidden="true"`** to score bar track/fill elements for screen readers.
5. **Add disabled state** for select buttons.

### P2 - Medium
6. **Add selected state visual** -- after clicking "Select", show which model column is selected (highlighted border, checkmark, etc.).
7. **Add loading state** -- skeleton table while model data is being fetched.
8. **Add empty state** -- replace `nothing` return with a user-friendly message.
9. **Remove redundant `role="table"`** from `<table>` element.
10. **Add row hover highlight** for better scanability.

### P3 - Low
11. **Add `:active` pressed state** on select buttons.
12. **Consider responsive card layout** for narrow viewports.
13. **Add winner highlight** for best-performing model column.
14. **Tokenize `letter-spacing: 0.5px`**.
