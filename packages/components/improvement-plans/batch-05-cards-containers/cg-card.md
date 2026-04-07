# cg-card Improvement Plan

**Component**: `cg-card`
**Category**: Foundation
**File**: `src/components/cg-card/cg-card.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. Multiple raw `rgba()` colors in box-shadow and gradient overlays (lines 41-42, 75-76)
2. Missing `disabled` state and `loading` skeleton state entirely
3. Clickable card missing Enter/Space keyboard handler -- only `role="button"` and `tabindex` set but no `@keydown`

---

## 1. Functional Issues

- **No loading/skeleton state**: Unlike `cg-metric-card`, there is no `loading` property or skeleton UI. Cards frequently wrap async content and should support a loading placeholder.
- **No disabled state**: No `disabled` property. A clickable card should support being disabled (greyed out, no pointer events, `aria-disabled`).
- **Empty slots always render**: Lines 166-168 -- `.header`, `.body`, `.footer` divs always render even when their slots have no content, producing empty DOM containers with padding. Should use `slotchange` to conditionally hide empty slot wrappers.
- **footer-divider class unused**: Line 130 defines `.footer-divider` but the template (line 168) only uses `.footer`. Dead CSS.

---

## 2. Interaction Issues

### 2.1 State Coverage
| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Default | Yes | Yes | Background uses token with fallback |
| Hover | Yes (clickable only) | Partial | Hover shadow uses tokens, but gradient uses raw `rgba(129, 140, 248, 0.5)` on line 76 |
| Active/Pressed | Yes (clickable only) | Yes | translateY(0) and shadow reset |
| Focus | Yes (clickable only) | Partial | `focus-within` on line 94 uses `--cg-focus-ring-color` but generic `:focus-visible` on line 134 uses raw box-shadow with `0 0 0 2px` / `0 0 0 4px` |
| Disabled | **No** | N/A | Missing entirely |
| Loading | **No** | N/A | Missing entirely |
| Error | **No** | N/A | No error visual variant |
| Selected | **No** | N/A | No selected/checked state for selectable card grids |

### 2.2 Keyboard Navigation
- **Critical gap**: Clickable card sets `role="button"` and `tabindex="0"` (lines 163-164) but has **no `@keydown` handler** for Enter/Space. Users cannot activate the card via keyboard.
- Fix: Add `@keydown` handler that calls `_handleClick()` on Enter or Space.

### 2.3 ARIA & Accessibility
- Missing `aria-disabled` when disabled state is added.
- No `aria-busy` for loading state.
- No `aria-label` or `aria-labelledby` -- relies on slot content which may not provide accessible name.

---

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Suggested Token |
|------|-------|----------------|
| 41 | `inset 0 1px 0 0` | Use `--cg-shadow-inner-*` tokens or remove if decorative |
| 42 | `rgba(255, 255, 255, 0.03)` | `--cg-color-surface-overlay-subtle` or new token |
| 76 | `rgba(129, 140, 248, 0.5)` | `--cg-color-brand-secondary` or semantic token |
| 77 | `0.05` opacity | `--cg-opacity-subtle` token |
| 78 | `102%` translateY | `--cg-motion-offset-full` or token |
| 79 | `300ms cubic-bezier(0.4, 0, 0.2, 1)` | Use `--cg-motion-duration-normal` and `--cg-motion-easing-default` |
| 40 | `150ms ease` | Use `--cg-motion-duration-normal` and `--cg-motion-easing-default` |

### 3.2 Raw Colors Found
| Line | Color | Suggested Token |
|------|-------|----------------|
| 41 | `rgba(255, 255, 255, 0.05)` | `--cg-color-surface-overlay-subtle` |
| 42 | `rgba(255, 255, 255, 0.03)` | `--cg-color-surface-overlay-faint` |
| 75 | `rgba(129, 140, 248, 0.5)` | `--cg-color-brand-indigo-50` or similar |
| 49, 56 | Fallback `#18181b` | Already token-based, fallbacks are acceptable |
| 95 | Fallback `#c8e650` | Already uses `--cg-focus-ring-color` token |

### 3.3 Typography Issues
- No typography tokens used directly (card is a container) -- acceptable.

### 3.4 Spacing Issues
- All padding values use `--cg-spacing-*` tokens -- good.
- Line 113: `.header` padding uses `0` for bottom -- acceptable as structural.

### 3.5 Modern Design Enhancements
- Add subtle border glow on hover for elevated variant (similar to ai-insight-card pattern).
- Add `backdrop-filter: blur()` option for glassmorphism variant.
- Consider adding `orientation="horizontal"` for side-by-side header/body layout.

---

## 4. Prioritized Fixes

### P0 - Critical
1. **Add `@keydown` handler for clickable cards** -- keyboard users cannot activate the card. Add Enter/Space handler calling `_handleClick()`.

### P1 - High
2. **Add `disabled` state** -- property, styling (opacity, pointer-events: none), and `aria-disabled`.
3. **Add `loading` skeleton state** -- shimmer skeleton matching card dimensions.
4. **Replace raw `rgba(129, 140, 248, 0.5)`** on line 76 with a semantic token.
5. **Replace raw `rgba()` overlay colors** on lines 41-42 with design tokens.

### P2 - Medium
6. **Conditionally render slot wrappers** -- hide `.header`/`.footer` divs when slots are empty.
7. **Remove dead `.footer-divider` CSS** (line 128-131) or wire it into template.
8. **Add `selected` state** for card grid selection patterns.
9. **Unify focus styles** -- lines 94-97 and 134-137 define two different focus ring approaches. Pick one.

### P3 - Low
10. **Add `orientation` prop** for horizontal card layout.
11. **Consolidate transition values** to use motion tokens consistently (line 40 uses raw `150ms ease`).
12. **Add glassmorphism variant** with `backdrop-filter`.
