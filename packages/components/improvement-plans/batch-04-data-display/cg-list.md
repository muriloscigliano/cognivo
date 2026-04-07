# cg-list Improvement Plan

**Component**: `cg-list`
**Category**: Foundation
**File**: `src/components/cg-list/cg-list.ts`
**Priority**: P2-Medium

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. Magic numbers in `.num` (line 87: `width: 28px; height: 28px`), `.bullet` (line 101: `width: 6px; height: 6px`), and `.avatar` (line 109: `width: 40px; height: 40px`)
2. Missing `margin: 0 4px` token on `.bullet` (line 107) and `.subtitle` `margin-top: 2px` (line 135)
3. Missing `role="list"` on the overall container and `role="listitem"` on items when using list semantics

---

## 1. Functional Issues

- **Line 87-88**: `.num` uses `width: 28px; height: 28px` -- magic numbers, should use `var(--cg-spacing-28, 28px)` or nearest token.
- **Line 96**: `.num` `font-size: 0.75rem` -- should use `var(--cg-font-size-xs, 12px)`.
- **Line 101-102**: `.bullet` `width: 6px; height: 6px` -- magic numbers, should use `var(--cg-spacing-6, 6px)`.
- **Line 107**: `.bullet` `margin: 0 4px` -- magic number, should use `var(--cg-spacing-4, 4px)`.
- **Line 109-110**: `.avatar` `width: 40px; height: 40px` -- magic numbers, should use `var(--cg-spacing-40, 40px)`.
- **Line 135**: `.subtitle` `margin-top: 2px` -- magic number, should use `var(--cg-spacing-2, 2px)`.
- **Lines 217-241**: The list renders items directly without a wrapping container -- no `role="list"` on parent. Screen readers won't announce list semantics.
- **Line 228**: Image `alt=""` is used for decorative images -- good, but could use item title as alt when no other context is provided.

---

## 2. Interaction Issues

### 2.1 State Coverage
| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Default | Yes | Yes | |
| Hover (item) | Yes | Yes | Lines 68-69, 75-76 |
| Active | Yes | Yes | Line 78 for clickable items |
| Focus | Yes | Yes | Lines 81-83 |
| Disabled | No | N/A | No disabled state for items |
| Loading | No | N/A | No skeleton/loading state |
| Error | No | N/A | No error state |
| Empty | Yes | Yes | Line 213-215 |
| Selected | No | N/A | No selected/active item state |

### 2.2 Keyboard Navigation
- Clickable items have `tabindex="0"` and `@keydown` for Enter/Space -- good (lines 221-224).
- Action buttons are native `<button>` -- keyboard accessible.
- Action button has `@click` with `stopPropagation` to avoid triggering item click -- good (line 203).
- **Missing**: No arrow-key navigation between items.
- **Missing**: Action button lacks `@keydown` handler but is a `<button>` so Enter/Space work natively.

### 2.3 ARIA & Accessibility
- Clickable items have `role="button"` -- good (line 223).
- **Missing**: No `role="list"` on the wrapping element (list renders without a container).
- **Missing**: No `role="listitem"` on individual items.
- Action button uses focus-visible -- good.
- Image has `alt=""` and `loading="lazy"` -- good.
- **Missing**: When `variant="number"`, the number indicator should be `aria-hidden="true"` since it's decorative ordering.

---

### 2.4 Touch & Mobile
- Items have adequate padding for touch targets.
- `translateX(2px)` hover effect on line 176 is subtle -- good.
- Action button has adequate size.
- Stagger animation with `--stagger-index` -- nice UX.

---

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Suggested Token |
|------|-------|-----------------|
| 87 | `width: 28px; height: 28px` | `var(--cg-spacing-28, 28px)` |
| 96 | `font-size: 0.75rem` | `var(--cg-font-size-xs, 12px)` |
| 101 | `width: 6px; height: 6px` | `var(--cg-spacing-6, 6px)` |
| 107 | `margin: 0 4px` | `var(--cg-spacing-4, 4px)` |
| 109 | `width: 40px; height: 40px` | `var(--cg-spacing-40, 40px)` |
| 135 | `margin-top: 2px` | `var(--cg-spacing-2, 2px)` |
| 176 | `translateX(2px)` | `var(--cg-interaction-hover-shift, 2px)` or small token |

### 3.2 Raw Colors Found
No raw hex colors found -- all colors use tokens. Good.

### 3.3 Typography Issues
- `.num` uses `font-size: 0.75rem` -- should use `var(--cg-font-size-xs, 12px)` token.

### 3.4 Spacing Issues
- Multiple spacing values use raw pixels instead of tokens (see 3.1).

### 3.5 Modern Design Enhancements
- Add loading skeleton state.
- Add selected/active item state (e.g., for single/multi-select lists).
- Add drag-to-reorder capability.
- Add swipe actions for mobile (delete, archive).
- Wrap list in a container with `role="list"`.

---

## 4. Prioritized Fixes

### P0 - Critical
1. Add `role="list"` wrapper and `role="listitem"` on items for proper list semantics.

### P1 - High
2. Replace `.num` `width: 28px; height: 28px` with spacing tokens.
3. Replace `.bullet` `width: 6px; height: 6px; margin: 0 4px` with spacing tokens.
4. Replace `.avatar` `width: 40px; height: 40px` with spacing tokens.
5. Replace `.num` `font-size: 0.75rem` with `var(--cg-font-size-xs)`.
6. Add `aria-hidden="true"` to number indicator and bullet decorative elements.

### P2 - Medium
7. Replace `.subtitle` `margin-top: 2px` with spacing token.
8. Add loading skeleton state.
9. Add disabled item state.
10. Add selected/active item visual state.

### P3 - Low
11. Add arrow-key navigation between items.
12. Add drag-to-reorder capability.
13. Add swipe actions for mobile.
14. Consider making hover `translateX(2px)` use a token.
