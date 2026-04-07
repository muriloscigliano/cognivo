# ai-eval-scorecard Improvement Plan

**Component**: `ai-eval-scorecard`
**Category**: AI-Native
**File**: `src/components/ai-eval-scorecard/ai-eval-scorecard.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Fair
**Top 3 Issues**:
1. Raw hex colors returned from `_getBarColor()` (line 138-144) and `_getValueColor()` used in inline styles -- bypasses design tokens entirely
2. CSS syntax error: premature closing brace on line 116 causes `.empty` animation override to leak/break styles
3. Grade badge colors (lines 63-67) use raw hex with no token references for `.grade.B`, `.grade.C`, `.grade.D`, `.grade.F`

---

## 1. Functional Issues

- **CSS syntax error (lines 114-116)**: The `.empty` rule at line 114 is followed by `.explanation { animation: none; }` and a stray closing brace `}` at line 116. This is a malformed block -- the `.explanation` override appears to be inside `.empty` due to nesting, but Lit CSS is flat. The extra `}` closes the entire `css` template prematurely, which means lines 119-129 (`:focus-visible` and rounded variants) may not compile correctly.
- **Inline style colors bypass tokens (lines 183-185)**: `style="width: ${pct}%; background: ${this._getBarColor(...)}"` injects raw hex like `#4ade80` directly. This makes the component unthemable.
- **No empty handling for `grade` prop**: The grade class `${this.grade}` (line 167) is applied directly, which could produce invalid class names for unexpected inputs (e.g., `grade="A+"` produces `.A+` which is invalid CSS).
- **Grade class matching is fragile**: `.grade.A` (line 62) will match `grade="A"` but also `grade="A+"` or `grade="AB"` because the class check is a prefix match on the first character. The `this.grade` is used as-is for the class name.

## 2. Interaction Issues

### 2.1 State Coverage
| State | Supported | Notes |
|-------|-----------|-------|
| Default | Yes | |
| Hover | Yes | `.score-row:hover` (line 78) |
| Active | No | No `:active` style on clickable rows |
| Focus | Yes | `:focus-visible` (line 119) |
| Disabled | No | No disabled state |
| Loading | No | No skeleton/loading state for async score data |
| Error | No | No error display when score data is malformed |
| Empty | Yes | `.empty` state (line 114) when `scores.length === 0` |
| Expanded | Yes | `_expandedMetric` toggle on metric rows |

**Missing**: `:active`, disabled, loading, error states (4 missing).

### 2.2 Keyboard Navigation
- Score rows have `tabindex="0"` and `role="button"` (line 179) -- good.
- **Issue (line 180)**: Only `Enter` key is handled. Missing `Space` key support, which is required for `role="button"` per WAI-ARIA.
- **Missing**: Arrow key navigation between metric rows for efficient keyboard traversal.

### 2.3 ARIA & Accessibility
- Good: `role="figure"` with descriptive `aria-label` on the card (line 164).
- Good: `role="button"` on score rows (line 179).
- **Issue**: Score bar has no ARIA representation. The visual bar is purely decorative with no `role="meter"` or `aria-valuenow` to convey the value to screen readers.
- **Issue**: Expanded explanation (line 192) has no `aria-live` announcement.
- **Issue**: Color-only differentiation for bar fill (green/yellow/orange/red) with no text or icon fallback for colorblind users.

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Context | Suggested Token |
|------|-------|---------|-----------------|
| 56 | `0.05em` | `.header-title letter-spacing` | `var(--cg-letter-spacing-wide, 0.05em)` |
| 60 | `2px 12px` | `.grade padding` | `var(--cg-spacing-2, 2px) var(--cg-spacing-12, 12px)` |
| 81 | `100px` | `.score-label width` | `var(--cg-size-25, 100px)` or use `min-width` |
| 82 | `12px` | `.score-label font-size` | `var(--cg-font-size-xs, 12px)` |
| 86 | `6px` | `.score-bar-track height` | `var(--cg-spacing-6, 6px)` |
| 86 | `3px` | `.score-bar-track border-radius` | `var(--cg-border-radius-25, 3px)` |
| 90 | `3px` | `.score-bar-fill border-radius` | `var(--cg-border-radius-25, 3px)` |
| 95 | `40px` | `.score-value width` | Use `min-width` with token |
| 101 | `40px` | `.score-delta width` | Use `min-width` with token |
| 102 | `10px` | `.score-delta font-size` | `var(--cg-font-size-2xs, 10px)` |
| 108 | `112px` | `.explanation padding-left` | Calculate from label width + gap, or use token |
| 114 | `32px` | `.empty padding` | `var(--cg-spacing-32, 32px)` |
| 114 | `13px` | `.empty font-size` | `var(--cg-font-size-sm, 14px)` |

### 3.2 Raw Colors Found
| Line | Value | Context | Suggested Token |
|------|-------|---------|-----------------|
| 62 | `rgba(34, 197, 94, 0.12)` | `.grade.A background` | `var(--cg-color-status-success-bg)` |
| 63 | `rgba(34, 197, 94, 0.08)`, `#86efac` | `.grade.B` | Token needed |
| 64 | `rgba(245, 158, 11, 0.12)`, `#fbbf24` | `.grade.C` | `var(--cg-color-status-warning-*)` |
| 65 | `rgba(249, 115, 22, 0.12)`, `#fb923c` | `.grade.D` | Token needed |
| 66 | `rgba(239, 68, 68, 0.12)`, `#f87171` | `.grade.F` | `var(--cg-color-status-error-*)` |
| 78 | `rgba(255, 255, 255, 0.02)` | `.score-row:hover` | `var(--cg-color-surface-hover)` |
| 139-143 | `#4ade80`, `#fbbf24`, `#fb923c`, `#f87171` | `_getBarColor()` return values | Must use CSS custom properties |

### 3.3 Spacing Issues
- Padding and gap values mostly use tokens. The `.explanation` padding-left of `112px` (line 108) is a hardcoded alignment hack that will break if `.score-label` width changes.

### 3.4 Modern Design Enhancements
- **Animate bar fill on mount**: The transition exists (line 91) but bars render at full width immediately. Use an intersection observer or `firstUpdated` to trigger from 0.
- **Add score tooltips**: Hovering over the bar should show the exact value.
- **Improve grade badge**: Add a subtle glow or pulse animation for high grades.
- **Add color legend or icon**: For colorblind accessibility, pair colors with icons (checkmark for green, warning for yellow, X for red).

## 4. Prioritized Fixes

### P0 - Critical
1. **Fix CSS syntax error** at lines 114-116: Remove the stray closing brace and fix the `.explanation` animation override placement
2. **Replace inline style colors** from `_getBarColor()` / `_getValueColor()` with CSS custom properties set via `style` attribute using token names (e.g., `--_bar-color: var(--cg-green-400)`)

### P1 - High
3. Replace all raw hex in grade badge classes (lines 62-66) with semantic status tokens
4. Add `Space` key support to score row `@keydown` handler (line 180)
5. Add `role="meter"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax` to score bars
6. Replace `font-size: 12px` (line 82) with `var(--cg-font-size-xs, 12px)`

### P2 - Medium
7. Replace all magic number widths (`100px`, `40px`, `112px`) with tokens or CSS calc
8. Replace `font-size: 10px` (line 102) and `13px` (line 114) with tokens
9. Replace `6px`/`3px` bar dimensions with spacing/radius tokens
10. Add loading skeleton state for async data
11. Add disabled state support
12. Sanitize `this.grade` before using as CSS class (strip non-alphanumeric chars)

### P3 - Low
13. Add icon indicators alongside color for colorblind accessibility
14. Add initial bar-fill animation from 0 to actual value
15. Replace decorative `rgba()` values with design tokens
16. Replace `padding: 32px` (line 114) with `var(--cg-spacing-32, 32px)`
