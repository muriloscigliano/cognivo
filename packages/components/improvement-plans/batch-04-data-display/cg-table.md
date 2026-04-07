# cg-table Improvement Plan

**Component**: `cg-table`
**Category**: Foundation
**File**: `src/components/cg-table/cg-table.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Fair
**Top 3 Issues**:
1. No keyboard navigation for sortable column headers (no tabindex, no keydown handler)
2. Magic numbers in CSS (line 56: `box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05)`, line 62: `width: 14px; margin-left: 4px`, line 71: `border-bottom: 1px solid`)
3. Missing ARIA role on sortable `<th>` elements (no `role="columnheader"` or `tabindex`)

---

## 1. Functional Issues

- **Line 56**: `box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05);` uses raw rgba. Should use `var(--cg-overlay-light-subtle, ...)`.
- **Line 62**: `.sort-icon` uses `width: 14px; margin-left: 4px;` -- magic numbers, should use `var(--cg-spacing-14, 14px)` and `var(--cg-spacing-4, 4px)`.
- **Line 71**: `td` border uses raw `1px solid` without token for border-width: should be `var(--cg-border-width-50, 1px)`.
- **Line 96**: Focus-visible uses raw `rgba` in box-shadow instead of token.
- **Line 103**: `rows` is typed as `unknown[][]` -- no type safety for cell rendering. Should accept `Record<string, unknown>[]` or generic.
- **Lines 146-157**: Sortable `<th>` has no `tabindex="0"` and no `@keydown` handler, making sorting keyboard-inaccessible.
- **Line 152**: `aria-sort` uses `nothing` for unsorted columns; should use `'none'` for proper ARIA semantics.

---

## 2. Interaction Issues

### 2.1 State Coverage
| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Default | Yes | Yes | Base table rendering |
| Hover (row) | Yes | Partial | Line 80 uses token, line 99 uses `var(--cg-overlay-accent-subtle)` |
| Hover (th) | Yes | Yes | Line 61 |
| Active | No | N/A | No active/pressed state on sortable headers |
| Focus | Yes | Partial | Line 93-96 uses raw rgba in box-shadow |
| Disabled | No | N/A | No disabled state for table or columns |
| Loading | No | N/A | No skeleton/loading state |
| Error | No | N/A | No error state |
| Empty | Yes | Yes | Line 86-90 |
| Sorted | Yes | Yes | Line 63 |

### 2.2 Keyboard Navigation
- **Critical**: Sortable column headers have no `tabindex` attribute -- they cannot receive keyboard focus.
- **Critical**: No `@keydown` handler on `<th>` elements -- Enter/Space cannot trigger sort.
- No arrow-key navigation between columns.
- No Escape key to clear sort.

### 2.3 ARIA & Accessibility
- `role="table"` is present (line 143) -- good.
- Missing `role="columnheader"` on `<th>` elements (native HTML provides this, but should be explicit for Shadow DOM).
- `aria-sort` falls back to `nothing` instead of `'none'` for unsorted columns (line 152).
- No `aria-label` on the table or wrapper for screen reader context.
- Sort icons use inline SVGs with no `aria-hidden="true"`.

### 2.4 Touch & Mobile
- Horizontal scroll wrapper is present -- good.
- No touch-specific optimizations (e.g., larger tap targets for sort headers on mobile).
- No responsive font-size scaling.

---

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Suggested Token |
|------|-------|-----------------|
| 56 | `inset 0 1px 0 0 rgba(255, 255, 255, 0.05)` | `var(--cg-overlay-light-subtle)` for color, `var(--cg-border-width-50)` for width |
| 62 | `width: 14px` | `var(--cg-spacing-14, 14px)` |
| 62 | `margin-left: 4px` | `var(--cg-spacing-4, 4px)` |
| 62 | `opacity: 0.4` | `var(--cg-opacity-muted, 0.4)` |
| 71 | `1px solid` (border-bottom on td) | `var(--cg-border-width-50, 1px)` |

### 3.2 Raw Colors Found
| Line | Color | Suggested Token |
|------|-------|-----------------|
| 56 | `rgba(255, 255, 255, 0.05)` | `var(--cg-overlay-light-subtle)` |
| 95 | `rgba(223, 255, 97, 0.04)` in box-shadow and row hover | Already uses `--cg-overlay-accent-subtle` on line 99 but not on line 95 |

### 3.3 Typography Issues
- No issues -- font-size, font-weight properly tokenized.

### 3.4 Spacing Issues
- Sort icon spacing (line 62) uses raw `4px` instead of `var(--cg-spacing-4, 4px)`.

### 3.5 Modern Design Enhancements
- Add subtle row selection/highlight state.
- Add loading skeleton state with shimmer animation.
- Consider adding column resize handles.
- Add row click event for interactive tables.

---

## 4. Prioritized Fixes

### P0 - Critical
1. Add `tabindex="0"` and `@keydown` handler (Enter/Space) to sortable `<th>` elements for keyboard accessibility.
2. Add `aria-sort="none"` to unsorted columns instead of `nothing`.

### P1 - High
3. Replace raw `rgba(255, 255, 255, 0.05)` on line 56 with `var(--cg-overlay-light-subtle)`.
4. Replace magic number `1px solid` on line 71 with border-width token.
5. Add `aria-label` to the table wrapper.
6. Add `aria-hidden="true"` to sort icon SVGs.

### P2 - Medium
7. Add loading/skeleton state.
8. Add disabled state support.
9. Replace `width: 14px; margin-left: 4px` on line 62 with spacing tokens.
10. Add active/pressed state on sortable headers.

### P3 - Low
11. Add arrow-key navigation between sortable columns.
12. Add row selection/highlight feature.
13. Add column resize handles.
14. Consider accepting `Record<string, unknown>[]` for rows instead of `unknown[][]`.
