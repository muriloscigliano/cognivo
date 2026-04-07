# cg-label Improvement Plan

**Component**: `cg-label`
**Category**: Foundation
**File**: `src/components/cg-label/cg-label.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Fair
**Top 3 Issues**:
1. Magic number `2px` for margin-top on hint/error text (lines 48, 55)
2. Bare line-height `1.4` without token (lines 49, 56)
3. Missing `aria-describedby` linkage between label and hint/error text

---

## 1. Functional Issues

- **`htmlFor` does not cross shadow DOM** (line 69): The `for` attribute on `<label>` only works within the same DOM tree. Since this component uses Shadow DOM, the `for` attribute will not associate with an input outside the shadow root. Consumers must use `<slot>` composition or `aria-labelledby` on the target input instead. This is a fundamental limitation that should be documented or worked around.
- **`nothing` imported but not needed as standalone**: `nothing` is used correctly on lines 71, 75, 78.
- **No `id` generation for hint/error**: The hint and error `<div>` elements have no `id`, so external inputs cannot use `aria-describedby` to reference them.

## 2. Interaction Issues

### 2.1 State Coverage
| State | Supported | Notes |
|-------|-----------|-------|
| Default | Yes | Base styling |
| Disabled | Yes | Opacity 0.5, cursor not-allowed (line 34-37) |
| Error | Yes | Red error text replaces hint (line 74) |
| Required | Yes | Red asterisk (line 71) |
| Focused | No | No focus indicator on label itself |

- **Missing hover state**: Labels are clickable (`cursor: pointer` on line 31) but have no hover feedback.

### 2.2 ARIA & Accessibility
- **Good**: Required asterisk has `aria-hidden="true"` (line 71).
- **Good**: Error text has `role="alert"` (line 75) for screen reader announcement.
- **Issue**: No `id` on hint div for `aria-describedby` association. Consumers need a way to link the hint text to the associated input.
- **Issue**: When `disabled`, the label should not have `cursor: pointer` -- but it correctly changes to `not-allowed`. However, there is no `aria-disabled` on the label itself.
- **Issue**: The `for` attribute inside shadow DOM does not work cross-boundary. The component should either document this limitation clearly or provide an alternative mechanism.

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Context | Suggested Token |
|------|-------|---------|-----------------|
| 48 | `2px` | margin-top on .hint | `var(--cg-spacing-2, 2px)` |
| 55 | `2px` | margin-top on .error-text | `var(--cg-spacing-2, 2px)` |
| 36 | `0.5` | opacity for disabled | `var(--cg-opacity-disabled, 0.5)` |
| 49 | `1.4` | line-height on .hint | `var(--cg-line-height-snug, 1.4)` |
| 56 | `1.4` | line-height on .error-text | `var(--cg-line-height-snug, 1.4)` |

### 3.2 Raw Colors Found
All hex values are used as fallbacks within `var()` -- acceptable pattern.

| Line | Value | Context | Status |
|------|-------|---------|--------|
| 30 | `#fafafa` | fallback for surface-base-text | Acceptable |
| 40 | `#ef4444` | fallback for text-danger | Acceptable |
| 46 | `#71717a` | fallback for gray-500 | Acceptable |
| 53 | `#ef4444` | fallback for text-danger | Acceptable |

### 3.3 Typography Token Usage
- Font size: Properly uses `--cg-font-size-sm` (label) and `--cg-font-size-xs` (hint/error).
- Font weight: Properly uses `--cg-font-weight-medium` and `--cg-font-weight-bold`.
- Line height: Bare `1.4` values on lines 49 and 56 need tokenization.

### 3.4 Modern Design Enhancements
- **Transition for error state**: Add a smooth transition when switching between hint and error text (opacity/transform).
- **Error icon**: Consider prepending a small warning icon to the error text for visual clarity (not just color -- important for color-blind users).
- **Optional badge**: Add an "optional" text variant as counterpart to the required asterisk.
- **Character count slot**: Modern form labels often include a character counter -- could be a slot.

## 4. Prioritized Fixes

### P0 - Critical
1. **Document or fix shadow DOM `for` limitation**: The `for` attribute does not work cross-shadow-boundary. Either add documentation, remove the misleading `for` attribute, or implement a JS-based click handler that finds and focuses the target input.

### P1 - High
2. **Add `id` attributes to hint/error divs**: Generate unique IDs (e.g., using `this.htmlFor + '-hint'`) so external inputs can reference them via `aria-describedby`.
3. **Tokenize `margin-top: 2px`** on lines 48, 55 to `var(--cg-spacing-2, 2px)`.
4. **Tokenize `line-height: 1.4`** on lines 49, 56 to `var(--cg-line-height-snug, 1.4)`.
5. **Tokenize `opacity: 0.5`** on line 36 to `var(--cg-opacity-disabled, 0.5)`.

### P2 - Medium
6. **Add error state transition**: Animate the switch between hint and error text for polish.
7. **Add error icon prefix**: Prepend a small icon to error text for accessibility (not relying on color alone).
8. **Expose `aria-describedby` helper**: Provide a method or property that returns the hint/error element ID for consumers.

### P3 - Low
9. **Add `optional` prop**: Display "(optional)" text as counterpart to required asterisk.
10. **Add font-smoothing** for dark-mode rendering consistency.
