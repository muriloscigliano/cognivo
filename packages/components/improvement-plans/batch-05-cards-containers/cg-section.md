# cg-section Improvement Plan

**Component**: `cg-section`
**Category**: Foundation
**File**: `src/components/cg-section/cg-section.ts`
**Priority**: P2-Medium

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. Magic numbers in `.description` (`margin-top: 2px`, line 77), `.badge` (`font-size: 0.65rem`, `padding: 2px 7px`, lines 81-85), `.chevron` (`width/height: 16px`, line 91)
2. Content collapse uses `max-height: 3000px` hack (line 108) instead of proper animation technique
3. Badge styling uses light-mode colors by default (`--cg-gray-200` background, line 83) that look wrong on dark backgrounds

---

## 1. Functional Issues

- **`max-height: 3000px` animation hack**: Lines 103-111 -- using `max-height` for open/close animation is a known CSS antipattern. It causes timing issues (animation speed depends on actual content height vs 3000px) and creates a delay before the animation appears to start. Should use `grid` row animation or `offsetHeight` measurement.
- **No streaming awareness**: JSDoc mentions "streaming awareness" and "auto-open during streaming" but no `streaming` property or auto-open logic exists in the implementation.
- **Badge uses light-mode palette**: Line 83 -- `background: var(--cg-gray-200, #e4e4e7)` with `color: var(--cg-gray-600, #52525b)` are light-mode colors that look wrong on dark backgrounds. Should use dark-friendly tokens.
- **`_open` internal state duplicates `open` prop**: The component has both `@property() open` and `@state() _open`. The `willUpdate` syncs `open -> _open` but external changes to `open` after initial render only work one way.
- **Duplicate header hover styles**: Lines 117-118 define `.header:hover { color: ... }` which conflicts with the foldable-specific hover on line 44-46.

---

## 2. Interaction Issues

### 2.1 State Coverage
| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Default (closed) | Yes | Yes | Border and padding tokenized |
| Default (open) | Yes | Yes | Content visible, chevron rotated |
| Hover | Yes | Yes | Title color changes to accent |
| Active/Pressed | **No** | N/A | No press feedback on header |
| Focus | Yes | Partial | `--cg-focus-ring-color` used but `border-radius: 4px` is hardcoded |
| Disabled | **No** | N/A | Missing -- no way to disable folding |
| Loading | **No** | N/A | No skeleton state |
| Bordered | Yes | Yes | Alternate visual with border/padding |

### 2.2 Keyboard Navigation
- Header has `tabindex="0"` (when foldable) with `role="button"` and `@keydown` handler. Good.
- `aria-expanded` is set correctly based on `_open` state. Good.
- Non-foldable variant uses `role="heading"` without `tabindex`. Appropriate.

### 2.3 ARIA & Accessibility
- Correct use of `role="button"` / `role="heading"` based on foldable state. Good.
- `aria-expanded` properly toggles. Good.
- **Missing `aria-level`**: When `role="heading"` is used, `aria-level` should be set (default to 3 or make configurable).
- **Missing content `id` for `aria-controls`**: The header button should reference the content panel via `aria-controls`.

---

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Suggested Token |
|------|-------|----------------|
| 52 | `border-radius: 4px` in focus-visible | `--cg-border-radius-50` |
| 77 | `margin-top: 2px` | `--cg-spacing-2` |
| 81 | `font-size: 0.65rem` | `--cg-font-size-2xs` or nearest token |
| 85 | `padding: 2px 7px` | `--cg-spacing-2`, `--cg-spacing-8` |
| 91-92 | `width: 16px; height: 16px` | `--cg-spacing-16` or `--cg-icon-size-sm` |
| 103-104 | `max-height: 0` / `transition: max-height 0.25s ease-out, opacity 0.2s ease` | Use motion tokens |
| 108 | `max-height: 3000px` | Replace with proper technique |
| 110 | `transition: max-height 0.4s ease-in, opacity 0.2s ease` | Use `--cg-motion-duration-*` tokens |

### 3.2 Raw Colors Found
| Line | Color | Suggested Token |
|------|-------|----------------|
| 23 | `rgba(255, 255, 255, 0.05)` | `--cg-color-surface-overlay-subtle` |
| 83 | `--cg-gray-200, #e4e4e7` | Wrong palette -- should use dark-friendly `--cg-gray-700` or `--cg-gray-800` |
| 84 | `--cg-gray-600, #52525b` | Wrong contrast -- should use `--cg-gray-300` or lighter |

### 3.3 Typography Issues
- Title uses `--cg-font-size-sm` and `--cg-font-weight-semibold`. Good.
- Description uses `--cg-font-size-xs`. Good.
- **Badge `font-size: 0.65rem`** (line 81) is not on any token scale.

### 3.4 Spacing Issues
- Header padding uses `--cg-spacing-16`. Good.
- Content inner padding uses `--cg-spacing-16`. Good.
- `margin-top: 2px` (line 77) and `padding: 2px 7px` (line 85) should use tokens.

### 3.5 Modern Design Enhancements
- Replace `max-height` animation with CSS `grid-template-rows: 0fr/1fr` technique for smooth height transitions.
- Add subtle background highlight on the header during hover.
- Add section count badge with variant colors (e.g., warning count in orange).

---

## 4. Prioritized Fixes

### P0 - Critical
(None -- component is functional)

### P1 - High
1. **Fix badge color palette** -- replace `--cg-gray-200` / `--cg-gray-600` (lines 83-84) with dark-theme-appropriate tokens (`--cg-gray-700` bg, `--cg-gray-300` text).
2. **Replace `max-height: 3000px` hack** with CSS `grid-template-rows` technique or JS-measured height.
3. **Add `aria-controls` to header** referencing the content panel `id`.
4. **Add `aria-level` to heading** role (non-foldable mode).

### P2 - Medium
5. **Tokenize all magic numbers** -- `border-radius: 4px`, `margin-top: 2px`, `padding: 2px 7px`, `font-size: 0.65rem`, `width/height: 16px`.
6. **Tokenize transition durations** (lines 103-104, 110) with `--cg-motion-duration-*` values.
7. **Remove duplicate header hover** -- reconcile lines 44-46 with lines 117-118.
8. **Implement streaming auto-open** or remove from JSDoc.
9. **Add disabled state** for non-interactive sections.

### P3 - Low
10. **Add active/pressed state** on foldable header.
11. **Add section skeleton/loading** state.
12. **Replace `inset 0 1px 0 0 rgba(...)` shadow** with design token.
13. **Simplify `open`/`_open` dual state** -- use a single reactive property.
