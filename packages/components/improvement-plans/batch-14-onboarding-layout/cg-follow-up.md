# CG Follow-Up Improvement Plan

**Component**: `cg-follow-up`
**Category**: Foundation
**File**: `src/components/cg-follow-up/cg-follow-up.ts`
**Priority**: P2-Medium

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. Pervasive magic numbers in CSS -- nearly all padding, gap, font-size, and border-radius values are raw pixels
2. `_showAll` is a plain boolean (line 171) not a `@state()` property, but `requestUpdate()` is called manually -- should use `@state()`
3. Card and button variant styles use raw pixel values for border-radius and padding (lines 97-115)

---

## 1. Functional Issues
- **Line 171**: `_showAll` is declared as a plain boolean, not decorated with `@state()`. The manual `requestUpdate()` on line 192 works but is not idiomatic Lit. Should be `@state() private _showAll = false;` for proper reactive updates.
- **Line 204**: `shimmerWidths` array is hardcoded to 5 items `[150, 190, 130, 170, 120]`. When `maxVisible` is larger than 5, shimmers will be sliced but never show more than 5 patterns.
- **Line 73**: Animation delay uses `calc(var(--item-index, 0) * 60ms)` -- raw `60ms` should use a motion token.
- **No item limit validation**: If `items` is empty and not loading, the component renders an empty group with just the label. No empty state messaging.

## 2. Interaction Issues

### 2.1 State Coverage
| State | Supported | Notes |
|-------|-----------|-------|
| Default | Yes | Chips rendered |
| Hover | Yes | Border/color change (line 83) |
| Active/Pressed | Yes | `transform: scale()` (line 87) |
| Focus | Yes | `:focus-visible` outline (line 89) |
| Disabled | Yes | `opacity: 0.4; cursor: not-allowed` (line 92) |
| Loading | Yes | Shimmer placeholders (line 217-219) |
| Error | No | No error state |
| Empty | No | No empty state when items array is empty |

**Missing**: error and empty states (2 of 8+ missing). Overall very good state coverage.

### 2.2 Keyboard Navigation
- **Buttons** (lines 226-234): Standard `<button>` elements -- natively keyboard accessible.
- **More badge** (line 238): Standard `<button>` -- accessible.
- **No arrow key navigation**: For a chip group, horizontal arrow key navigation would be ideal but not strictly required.

### 2.3 ARIA & Accessibility
- **Line 216**: `role="group"` with `aria-label` set to the label text -- good.
- **Line 229**: Each button has `aria-label="Suggestion: ${text}"` -- good, though redundant since the visible text is already the button content. Could use `aria-label` only if the text is truncated.
- **Shimmer** (line 219): No `aria-busy` or `aria-label` on the loading state. Screen readers don't know content is loading.
- **Missing**: `aria-busy="true"` on the container during loading.

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Suggestion |
|------|-------|------------|
| 33 | `gap: 4px` | Use `var(--cg-spacing-4, 4px)` |
| 34 | `margin-bottom: 10px` | Use `var(--cg-spacing-10, 10px)` |
| 37 | `width: 14px; height: 14px` | Use `var(--cg-size-175, 14px)` |
| 43 | `font-size: 11px` | Use `var(--cg-font-size-2xs, 10px)` or define 11px token |
| 52 | `gap: 8px` | Use `var(--cg-spacing-8, 8px)` |
| 57 | `padding: 8px 16px` | Use `var(--cg-spacing-8) var(--cg-spacing-16)` |
| 58 | `border-radius: 99999px` | Use `var(--cg-border-radius-full, 99999px)` |
| 63 | `font-size: 13px` | Use `var(--cg-font-size-sm, 14px)` |
| 69 | `gap: 6px` | Use `var(--cg-spacing-6, 6px)` |
| 74 | `60ms` in calc | Use a motion token for stagger delay |
| 94 | `font-size: 14px` | Use `var(--cg-font-size-sm, 14px)` |
| 98 | `border-radius: 10px` | Use `var(--cg-border-radius-125, 10px)` |
| 99 | `padding: 12px 16px` | Use `var(--cg-spacing-12) var(--cg-spacing-16)` |
| 102 | `min-width: 140px` | Use CSS custom property |
| 103 | `gap: 4px` | Use `var(--cg-spacing-4, 4px)` |
| 107 | `font-size: 18px` | Use `var(--cg-font-size-lg, 18px)` |
| 111 | `border-radius: 8px` | Use `var(--cg-border-radius-100, 8px)` |
| 112 | `padding: 6px 14px` | Use `var(--cg-spacing-6) var(--cg-spacing-14, 14px)` |
| 113 | `font-size: 12px` | Use `var(--cg-font-size-xs, 12px)` |
| 119 | `padding: 8px 14px` | Use `var(--cg-spacing-8) var(--cg-spacing-14, 14px)` |
| 120 | `border-radius: 99999px` | Use `var(--cg-border-radius-full, 99999px)` |
| 126 | `font-size: 12px` | Use `var(--cg-font-size-xs, 12px)` |
| 137 | `height: 36px; border-radius: 99999px` | Use `var(--cg-size-450, 36px)` and `var(--cg-border-radius-full)` |

### 3.2 Raw Colors Found
No raw hex colors outside of token fallbacks -- good.

### 3.3 Spacing Issues
- Nearly every spacing value is a raw pixel -- this component needs a comprehensive token pass.
- Shimmer widths (line 204, `[150, 190, 130, 170, 120]`) are magic numbers.

### 3.4 Modern Design Enhancements
- Chips could have a subtle gradient background on hover.
- Consider a spring animation for stagger entrance instead of linear fadeIn.
- "+N more" badge could have a count-up animation.
- Card variant could have a subtle hover lift effect.

## 4. Prioritized Fixes

### P0 - Critical
None -- component is functional.

### P1 - High
1. **Replace all magic number spacing** (lines 33, 34, 52, 57, 69, 99, 112, 119) with `var(--cg-spacing-*)` tokens.
2. **Replace all magic number font-sizes** (lines 43, 63, 94, 107, 113, 126) with `var(--cg-font-size-*)` tokens.
3. **Replace all magic number border-radii** (lines 58, 98, 111, 120, 137) with `var(--cg-border-radius-*)` tokens.
4. **Convert `_showAll` to `@state()`** (line 171) and remove manual `requestUpdate()`.
5. **Add `aria-busy="true"`** to container during loading state.

### P2 - Medium
6. **Add empty state** for when items array is empty (not loading).
7. **Add error state** for failed suggestion fetch.
8. **Fix shimmerWidths** to dynamically generate based on `maxVisible`.
9. **Replace stagger delay `60ms`** (line 74) with a motion token variable.
10. **Add icon size tokens** (lines 37, 94, 107).

### P3 - Low
11. **Add spring animation** for entrance stagger.
12. **Consider hover lift** for card variant.
13. **Remove redundant `aria-label`** on buttons where visible text is sufficient.
