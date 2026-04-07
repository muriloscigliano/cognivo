# CG Stack Improvement Plan

**Component**: `cg-stack`
**Category**: Foundation
**File**: `src/components/cg-stack/cg-stack.ts`
**Priority**: P3-Low

---

## Executive Summary
**Overall Health**: Excellent
**Top 3 Issues**:
1. No `inline` display option -- component always uses `display: flex` (block-level)
2. Missing responsive breakpoint support mentioned in JSDoc (line 10) but not implemented
3. No padding/margin utility props for common layout needs

---

## 1. Functional Issues
- **Line 10**: JSDoc mentions "responsive breakpoint attrs (inline, not media queries)" but this feature is not implemented. The `direction`, `gap`, `align`, etc. do not accept responsive values.
- **Line 11**: JSDoc mentions "align-self on children via slot" but no `::slotted()` styles are present for child alignment.
- **No `inline` option**: Always renders as block-level flex. No `display: inline-flex` variant.
- **`wrap` property** (line 64): When `wrap` is `true` it adds `flex-wrap: wrap`, and when `wrap` is `"reverse"` it adds `wrap-reverse`. But since it's typed as `boolean`, setting `wrap="reverse"` as an attribute won't work as expected because `@property({ type: Boolean })` will coerce `"reverse"` to `true`.

## 2. Interaction Issues

### 2.1 State Coverage
This is a layout container -- interaction states are not applicable. N/A.

### 2.2 Keyboard Navigation
N/A -- layout container, not interactive.

### 2.3 ARIA & Accessibility
- **No ARIA role**: As a generic layout container, no role is needed -- correct.
- **Consider `role="group"`**: If the stack semantically groups related items, an optional `role` prop could be useful.
- **Slot content**: Children are projected via `<slot>`, which preserves their accessibility tree -- good.

## 3. Styling Issues

### 3.1 Magic Numbers Found
No magic numbers found -- all values use `var(--cg-spacing-*)` tokens. Excellent.

### 3.2 Raw Colors Found
No colors at all -- layout-only component. Correct.

### 3.3 Spacing Issues
All spacing is properly tokenized. No issues.

### 3.4 Modern Design Enhancements
- Could add `padding` prop with same scale as `gap` (none/xs/sm/md/lg/xl/2xl).
- Could add responsive breakpoint support via container queries or custom attributes.
- Consider adding `divider` slot/prop to insert separators between children automatically.

## 4. Prioritized Fixes

### P0 - Critical
None -- component is clean and well-implemented.

### P1 - High
1. **Fix `wrap` prop typing**: Change from `boolean` to a union type `boolean | 'reverse'` with proper attribute handling, or use a separate `wrapReverse` boolean.

### P2 - Medium
2. **Implement responsive breakpoint attrs** as documented in JSDoc (line 10), or remove the claim from documentation.
3. **Implement `::slotted()` align-self support** as documented (line 11), or remove the claim.
4. **Add `inline` prop** for `display: inline-flex` variant.

### P3 - Low
5. **Add `padding` prop** with the same token scale as `gap`.
6. **Add optional `role` prop** for semantic grouping.
7. **Consider auto-divider** between children (via `::slotted()` or observer).
