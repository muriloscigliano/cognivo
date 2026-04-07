# cg-button Improvement Plan

**Component**: `cg-button`
**Category**: Foundation
**File**: `src/components/cg-button/cg-button.ts`
**Priority**: P1-High

---

## Executive Summary

**Overall Health**: Good
**Top 3 Issues**:
1. Missing success and error visual states -- only default/hover/active/focus/disabled/loading are implemented
2. Several magic numbers in transition durations and spinner dimensions (lines 44, 56, 59, 180-185)
3. No keyboard event handling -- relies entirely on native `<button>` behavior with no `keydown` interceptor for custom logic

---

## 1. Functional Issues

### 1.1 No `full` width behavior in CSS
- **Line 198**: Property `full` is declared as a boolean with `reflect: true`, but there is zero CSS targeting `:host([full])`. The property has no effect.
- **Fix**: Add `:host([full]) { width: 100%; }` and `:host([full]) button { width: 100%; }`.

### 1.2 Spinner inherits wrong color for danger variant
- **Lines 187-189**: Loading spinner colors are defined for primary, secondary, and tertiary, but there is no rule for `:host([loading][type="danger"]) .spinner`. When a danger button is loading, the spinner gets the primary black color, which is invisible against a red-tinted background.
- **Fix**: Add `:host([loading][type="danger"]) .spinner { color: var(--cg-text-danger, #ef4444); }` and `:host([loading][type="danger"][variant="primary"]) .spinner { color: var(--cg-gray-white, #ffffff); }`.

### 1.3 No form participation
- The button never sets `type="button"` or `type="submit"` on the inner `<button>`. Consumers cannot use it inside forms for submission without workarounds.
- **Fix**: Add a `formType` property (`'button' | 'submit' | 'reset'`) defaulting to `'button'` and bind it to the inner element.

### 1.4 `role="button"` is redundant on `<button>`
- Minor, but worth noting: the native `<button>` already has an implicit button role. No action needed unless the element changes to a `<div>`.

---

## 2. Interaction Issues

### 2.1 State Coverage
| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Default | Yes | Yes | All three variants use `--cg-color-action-*` tokens |
| Hover | Yes | Yes | Background shift via semantic tokens |
| Active | Yes | Yes | Press scale via `--cg-interaction-press-scale` + ripple pseudo |
| Focus | Yes | Yes | Dual-ring via `--cg-brand-ai-accent` and surface background |
| Disabled | Yes | Partial | `opacity: 0.5` is a magic number; should be `var(--cg-opacity-disabled, 0.5)` |
| Loading | Yes | Partial | Spinner dimensions `16px` and border `2px` are magic numbers (lines 180-181) |
| Error | No | N/A | No visual error state (e.g., red shake animation, error ring) |
| Success | No | N/A | No visual success state (e.g., green flash, check icon) |

### 2.2 Keyboard Navigation
- **Adequate for basic use**: Native `<button>` provides Enter/Space activation out of the box.
- **Missing**: No `keydown` handler to prevent action during loading state. A user can still trigger the button via keyboard even when `loading` is true because `pointer-events: none` only blocks mouse events. The `disabled` attribute on the inner button (line 204) does cover this -- confirmed OK.
- **Enhancement**: Consider an explicit keyboard trap that calls `preventDefault()` when loading, as a defense-in-depth measure.

### 2.3 ARIA & Accessibility
- **Good**: `aria-busy` is set during loading (line 205).
- **Good**: `aria-label` is conditionally rendered (line 206).
- **Missing**: No `aria-disabled` attribute. When `disabled` is true, screen readers get it from the native attribute, but when `loading` is true, the semantic meaning is "busy" not "disabled" -- this is correct.
- **Enhancement**: Add `role="status"` or `aria-live="polite"` to the spinner so screen readers announce loading.

### 2.4 Touch & Mobile
- **Good**: Press scale feedback (line 70-72) provides tactile response.
- **Missing**: No explicit `-webkit-tap-highlight-color: transparent` to suppress the blue flash on iOS.
- **Missing**: No `touch-action: manipulation` to prevent 300ms delay on mobile.

---

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Context | Suggested Token |
|------|-------|---------|-----------------|
| 33 | `1px solid transparent` | Border width | `var(--cg-border-width-sm, 1px)` |
| 37 | `1` | `line-height: 1` | `var(--cg-line-height-none, 1)` |
| 44 | `150ms` | `box-shadow` transition duration | `var(--cg-motion-duration-normal, 150ms)` |
| 48 | `0px` | Initial box-shadow offset | Acceptable (zero value) |
| 56 | `rgba(255, 255, 255, 0.15)` | Ripple gradient color | `var(--cg-overlay-light-subtle, rgba(255,255,255,0.15))` |
| 59 | `400ms` | Ripple transition duration | `var(--cg-motion-duration-slow, 400ms)` or a dedicated ripple token |
| 64 | `2.5` | Ripple scale factor | `var(--cg-interaction-ripple-scale, 2.5)` |
| 77 | `2px`, `4px` | Focus ring widths | `var(--cg-border-width-sm, 2px)`, `var(--cg-border-width-md, 4px)` |
| 163 | `brightness(0.95)` | Danger hover filter | `var(--cg-interaction-hover-brightness, 0.95)` |
| 180 | `16px` | Spinner width/height | `var(--cg-icon-size-sm, 16px)` |
| 181 | `2px` | Spinner border width | `var(--cg-border-width-sm, 2px)` |
| 185 | `0.6s` | Spinner animation duration | `var(--cg-motion-duration-spinner, 600ms)` |

### 3.2 Raw Colors Found
| Line | Value | Context | Suggested Token |
|------|-------|---------|-----------------|
| 56 | `rgba(255, 255, 255, 0.15)` | Ripple gradient | `var(--cg-overlay-light-subtle)` |
| 56 | `transparent` | Gradient end | Acceptable |

All other color values are already wrapped in `var(--cg-*)` tokens with fallbacks. The fallback values themselves are raw hex, which is acceptable as fallback behavior.

### 3.3 Typography Issues
- **Line 37**: `line-height: 1` should use token `var(--cg-line-height-none, 1)`.
- **Line 35**: `font-family: inherit` is fine -- inherited from `:host` base.

### 3.4 Spacing Issues
- Spacing values on lines 84, 90, 96 are properly tokenized. No issues.

### 3.5 Modern Design Enhancements
- **Glassmorphism**: Add subtle `backdrop-filter: blur()` for tertiary/ghost variant when overlaying content.
- **Gradient sheen**: Add a subtle `background-image: linear-gradient(to bottom, rgba(255,255,255,0.05), transparent)` on primary variant for glass-like depth.
- **Micro-interactions**: The ripple effect (lines 52-66) is good. Consider adding a shimmer/shine animation on the primary variant idle state for premium feel.
- **Elevation on hover**: Add `box-shadow` lift on hover (e.g., `0 2px 8px rgba(0,0,0,0.3)`) for depth.

---

## 4. Prioritized Fixes

### P0 - Critical
- None

### P1 - High
1. **Add error and success states**: Implement `:host([state="error"])` and `:host([state="success"])` with appropriate colors, icons, and ARIA announcements. Add a `state` property (`'idle' | 'loading' | 'error' | 'success'`).
2. **Fix `full` property having no CSS**: Add width: 100% rules for `:host([full])` and its inner button (line 198 declares the property but no styles exist).
3. **Fix spinner color for danger variant**: Add missing CSS rules for danger loading state.

### P2 - Medium
4. **Replace all magic numbers with tokens**: Address the 12 magic number instances listed in section 3.1.
5. **Add `aria-live` to spinner**: Wrap spinner in a live region for screen reader announcements.
6. **Add mobile touch optimizations**: `-webkit-tap-highlight-color: transparent` and `touch-action: manipulation`.
7. **Add form participation**: Introduce `formType` property to enable submit/reset behavior.

### P3 - Low
8. **Add glassmorphism/gradient sheen**: Enhance visual depth for modern design language.
9. **Add hover elevation shadow**: Subtle lift effect on hover.
10. **Tokenize disabled opacity**: Replace `0.5` with `var(--cg-opacity-disabled, 0.5)`.
11. **Add shimmer animation**: Optional idle shimmer for primary CTA buttons.
