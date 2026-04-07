# CG Separator Improvement Plan

**Component**: `cg-separator`
**Category**: Foundation
**File**: `src/components/cg-separator/cg-separator.ts`
**Priority**: P2-Medium

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. When `label` is provided, the `role="separator"` and `aria-orientation` are missing -- only the label-less path has them (line 81)
2. No color/variant prop -- separator is always the same gray, no accent or themed options
3. `letter-spacing: 0.05em` on line 65 is a raw value instead of using a token

---

## 1. Functional Issues
- **Lines 73-82**: When `label` is provided (line 74), the render returns two `.line` divs and a `<span class="label">` but without `role="separator"` on the container or any ARIA. The `role="separator"` only exists on the single `.line` div in the label-less path (line 81). A labeled separator should still announce as a separator.
- **No `decorative` option**: The separator always renders with `role="separator"`. Sometimes separators are purely decorative and should use `role="none"` or `aria-hidden="true"`.
- **Vertical spacing** (lines 55-57): Vertical orientation margin uses `margin: 0 var(--cg-spacing-*)` but the host already has `gap` set from the flex layout. The margin and the flex gap may conflict.

## 2. Interaction Issues

### 2.1 State Coverage
This is a decorative/structural element -- interaction states are not applicable.

| State | Supported | Notes |
|-------|-----------|-------|
| Default | Yes | Line renders |
| Horizontal | Yes | Default orientation |
| Vertical | Yes | Via `orientation="vertical"` |
| Labeled | Yes | When `label` prop is set |
| Spacing variants | Yes | none/sm/md/lg |

### 2.2 Keyboard Navigation
N/A -- separators are not interactive elements.

### 2.3 ARIA & Accessibility
- **Line 81**: `role="separator"` with `aria-orientation` on label-less variant -- good.
- **Lines 74-79**: Labeled variant is **missing** `role="separator"` -- the outer container should have it. Screen readers will not identify the labeled separator as a separator.
- **Missing `role="none"` option**: For purely decorative separators, `role="none"` should be available.

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Suggestion |
|------|-------|------------|
| 39 | `min-width: 16px` | Use `var(--cg-spacing-16, 16px)` |
| 45 | `min-height: 16px` | Same |
| 65 | `letter-spacing: 0.05em` | Use `var(--cg-letter-spacing-wide, 0.05em)` |

### 3.2 Raw Colors Found
No raw hex colors outside of token fallbacks -- good.

### 3.3 Spacing Issues
- All spacing properly tokenized via `var(--cg-spacing-*)` -- good.
- The gradient line uses `var(--cg-gray-700, #3f3f46)` which is appropriate.

### 3.4 Modern Design Enhancements
- Add color variants: `default`, `accent`, `subtle`, `strong`.
- Consider a dashed/dotted line variant.
- The gradient fade effect on the line is already a nice modern touch.
- Consider a `thickness` prop (thin/default/thick) for different visual weights.

## 4. Prioritized Fixes

### P0 - Critical
1. **Add `role="separator"` to labeled variant**: The container `<div>` wrapping the two lines and label should have `role="separator"` and `aria-orientation`.

### P1 - High
2. **Add the `role` to the host element** instead of the inner div, for both variants. Use `connectedCallback` to set `this.setAttribute('role', 'separator')` and update `aria-orientation` reactively.
3. **Add `decorative` prop**: When true, set `role="none"` and `aria-hidden="true"`.

### P2 - Medium
4. **Replace `letter-spacing: 0.05em`** (line 65) with `var(--cg-letter-spacing-wide)`.
5. **Replace `min-width: 16px` and `min-height: 16px`** (lines 39, 45) with spacing tokens.
6. **Add color variant prop**: `variant: 'default' | 'accent' | 'subtle' | 'strong'`.
7. **Add `thickness` prop**: `'thin' | 'default' | 'thick'` controlling line height/width.

### P3 - Low
8. **Add dashed/dotted line style variant**.
9. **Resolve potential margin/gap conflict** for vertical orientation.
10. **Consider `role="none"` as default** for purely visual separators, with opt-in semantic role.
