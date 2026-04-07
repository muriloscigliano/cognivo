# cg-chip Improvement Plan

**Component**: `cg-chip`
**Category**: Foundation
**File**: `src/components/cg-chip/cg-chip.ts`
**Priority**: P2-Medium

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. Raw `rgba()` background and border colors across all 5 variants (lines 86-137)
2. CSS syntax error: orphaned closing brace from a misplaced `@media (prefers-reduced-motion: reduce)` block (lines 63-67)
3. Magic number padding, height, icon dimensions, and max-width (lines 50-58, 148-155, 162)

---

## 1. Functional Issues

- **CSS syntax error** (lines 63-67): There is a malformed block. Lines 61-62 define `.chip:active:not(.disabled)` with `transform: scale(...)`, then lines 63-67 appear to be a nested block (likely intended as `@media (prefers-reduced-motion: reduce)`) that resets `transform: none`. But there is no `@media` query wrapping it -- it's just a bare `.chip:active:not(.disabled)` block inside an orphaned `}`. This will cause CSS parsing issues, potentially breaking all rules that follow.
- **`role="option"` without `role="listbox"` parent** (line 237): The chip uses `role="option"` which requires a `role="listbox"` container. If used standalone, this is semantically incorrect. Should be `role="button"` for standalone chips, or document that the parent must provide `role="listbox"`.
- **`icon` property is a string** (line 209): The icon is rendered via `${this.icon}` as text content (line 251). This means only text/emoji icons work, not SVG or HTML. Consider using a slot for the icon instead.
- **`border-radius: 999px`** (line 32): Not using a token. Should be `var(--cg-border-radius-full, 99999px)`.

## 2. Interaction Issues

### 2.1 State Coverage

| State | Supported | Notes |
|-------|-----------|-------|
| Default | Yes | All 5 variants styled |
| Hover | Yes | Background lightens + scale(1.02) per variant |
| Active/Pressed | Partial | `transform: scale(0.97)` but CSS may be broken (lines 61-67) |
| Focus | Yes | Double box-shadow focus ring (lines 71-75) |
| Disabled | Yes | `opacity: 0.45; pointer-events: none; cursor: not-allowed` |
| Removable | Yes | Remove button with click handler + keyboard (Delete/Backspace) |
| Keyboard | Yes | Enter/Space for click, Delete/Backspace for remove |

- **Excellent interaction coverage**: Keyboard handling includes Delete/Backspace for removable chips (lines 244-247), which is a nice touch.
- **Press scale may not work due to CSS error**: The `@media (prefers-reduced-motion: reduce)` block that should disable the press scale appears malformed.

### 2.2 ARIA & Accessibility

- **`role="option"` is wrong for standalone use** (line 237): Should be `role="button"` or no role (using the native semantics of the `<span>`). `role="option"` implies it is inside a `role="listbox"`.
- **`aria-disabled` is correct** (line 238): Properly reflects the disabled state.
- **`aria-label` uses the label text** (line 239): Good.
- **Remove button has `aria-label="Remove ${this.label}"`** (line 256): Excellent.
- **Remove button has `tabindex="-1"`** (line 258): This means it cannot be focused independently. Users must focus the chip and use Delete/Backspace. This is acceptable but unconventional. Consider `tabindex="0"` for explicit remove button focus.

## 3. Styling Issues

### 3.1 Magic Numbers Found

| Line | Property | Value | Suggested Token |
|------|----------|-------|-----------------|
| 32 | border-radius | `999px` | `var(--cg-border-radius-full, 99999px)` |
| 50 | padding (sm) | `2px 8px` | `var(--cg-spacing-2, 2px) var(--cg-spacing-8, 8px)` |
| 52 | height (sm) | `24px` | `var(--cg-size-chip-sm, 24px)` |
| 54 | padding (md) | `4px 12px` | `var(--cg-spacing-4, 4px) var(--cg-spacing-12, 12px)` |
| 56 | height (md) | `30px` | `var(--cg-size-chip-md, 30px)` |
| 148 | icon width/height | `14px` | `var(--cg-size-icon-xs, 14px)` |
| 149 | icon font-size | `12px` | `var(--cg-font-size-xs, 12px)` |
| 162 | label max-width | `160px` | `var(--cg-size-chip-label-max, 160px)` |
| 169-170 | remove btn width/height | `16px` | `var(--cg-size-icon-sm, 16px)` |
| 171 | remove margin-left | `2px` | `var(--cg-spacing-2, 2px)` |
| 172 | remove margin-right | `-4px` | `var(--cg-spacing-4, 4px)` negated |

### 3.2 Raw Colors Found

| Line | Context | Value | Suggested Token |
|------|---------|-------|-----------------|
| 86 | default bg | `rgba(161, 161, 170, 0.12)` | `var(--cg-color-chip-background-default)` or `var(--cg-color-action-secondary-background-default)` |
| 91 | default hover bg | `rgba(161, 161, 170, 0.18)` | `var(--cg-color-chip-background-default-hover)` |
| 97 | success bg | `rgba(34, 197, 94, 0.12)` | `var(--cg-color-status-success-background-default)` |
| 99 | success border | `rgba(34, 197, 94, 0.25)` | `var(--cg-color-status-success-border-default)` |
| 101 | success hover bg | `rgba(34, 197, 94, 0.2)` | `var(--cg-color-status-success-background-hover)` |
| 108 | warning bg | `rgba(245, 158, 11, 0.12)` | `var(--cg-color-status-warning-background-default)` |
| 110 | warning border | `rgba(245, 158, 11, 0.25)` | `var(--cg-color-status-warning-border-default)` |
| 112 | warning hover bg | `rgba(245, 158, 11, 0.2)` | `var(--cg-color-status-warning-background-hover)` |
| 119 | error bg | `rgba(239, 68, 68, 0.12)` | `var(--cg-color-status-error-background-default)` |
| 121 | error border | `rgba(239, 68, 68, 0.25)` | `var(--cg-color-status-error-border-default)` |
| 123 | error hover bg | `rgba(239, 68, 68, 0.2)` | `var(--cg-color-status-error-background-hover)` |
| 130 | accent bg | `rgba(223, 255, 97, 0.12)` | `var(--cg-color-ai-accent-background-default)` |
| 132 | accent border | `rgba(223, 255, 97, 0.25)` | `var(--cg-color-ai-accent-border-default)` |
| 134 | accent hover bg | `rgba(223, 255, 97, 0.2)` | `var(--cg-color-ai-accent-background-hover)` |
| 188 | remove hover bg | `rgba(255, 255, 255, 0.1)` | `var(--cg-color-surface-glass-highlight)` |

**15 raw color values total** -- this is the highest count in this batch.

### 3.3 Modern Design Enhancements

- **Add subtle glass effect**: An `inset 0 1px 0 0 rgba(255,255,255,0.05)` box-shadow would add depth, consistent with other AI components.
- **Add background gradient overlay**: `linear-gradient(to bottom, rgba(255,255,255,0.03), transparent)` for modern feel.
- **Consider `selected` state**: Chips often have a selected/active toggle state with a filled background. Add a `selected` boolean property.
- **Animated remove**: When removable chip is removed, consider a shrink/fade-out animation via dispatching before removal.

## 4. Prioritized Fixes

### P0 - Critical
- **Fix CSS syntax error** (lines 63-67): The orphaned block with `.chip:active:not(.disabled) { transform: none; }` and its closing `}` is malformed. It appears to be a `prefers-reduced-motion` media query that lost its `@media` wrapper. Fix by properly wrapping in `@media (prefers-reduced-motion: reduce)` or moving into the `reducedMotion` shared style.

### P1 - High
- **Fix `role="option"` to `role="button"`** (line 237): Standalone chips should not use `role="option"`. Change to `role="button"` for interactive chips, or make the role configurable.
- **Replace 15 raw `rgba()` color values** with semantic status tokens or chip-specific tokens.
- **Fix `border-radius: 999px`** (line 32): Replace with `var(--cg-border-radius-full, 99999px)`.

### P2 - Medium
- **Tokenize padding values** (lines 50, 54): `2px 8px` and `4px 12px` -> spacing tokens.
- **Tokenize height values** (lines 52, 56): `24px`, `30px` -> chip size tokens.
- **Tokenize icon dimensions** (lines 148-149): `14px`, `12px` -> icon size tokens.
- **Tokenize label max-width** (line 162): `160px` -> component-specific token.
- **Tokenize remove button dimensions** (lines 169-172): `16px`, `2px`, `-4px` -> tokens.
- **Support HTML/slot icon**: Change `icon` from string rendering to a `<slot name="icon">` for SVG/HTML icon support.

### P3 - Low
- **Add `selected` state**: Boolean prop with filled background style for toggle chips.
- **Add animated removal**: Shrink/fade-out before dispatching remove event.
- **Add glass effects**: Inset shadow and gradient for consistency with AI components.
- **Make remove button tabindex configurable**: Allow `tabindex="0"` for explicit focus.
