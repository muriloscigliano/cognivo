# cg-pagination Improvement Plan

**Component**: `cg-pagination`
**Category**: Foundation
**File**: `src/components/cg-pagination/cg-pagination.ts`
**Priority**: P2-Medium

---

## Executive Summary
**Overall Health**: Excellent
**Top 3 Issues**:
1. Magic numbers in size variant font-sizes and dimensions (lines 118-122)
2. No keyboard shortcut for jumping to a specific page (e.g., typing a number)
3. Missing `aria-label` on the pagination list element (`<ul>`) for better screen reader context

---

## 1. Functional Issues

- **Line 167-168**: `_getPages()` logic is solid for basic cases but when `showFirst=false` and `showLast=false` are both set, the function still pushes `1` and `total` -- the conditional checks on lines 179 and 205 guard this correctly. Clean logic.
- **Line 68**: Hover uses `--cg-color-surface-base-border, #3f3f46` -- this is a different token than the default `--cg-color-surface-base-border, #27272a`. The hover fallback `#3f3f46` is correct for a lighter border, but both use the same token name which means the hover border won't actually change unless the consumer overrides the token. This is a token naming conflict.
- **Line 124**: Responsive `@media (max-width: 480px)` uses a magic breakpoint.
- The `_goToPage` method (line 153) correctly prevents out-of-range and same-page clicks. No edge case issues.

## 2. Interaction Issues

### 2.1 State Coverage
| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Default | Yes | Yes | Border, text, background all tokenized |
| Hover | Yes | Yes | Background overlay, text primary, border change, scale 1.02 |
| Active/Pressed | Yes | Yes | Scale with `--cg-interaction-press-scale` |
| Active Page | Yes | Yes | Accent background, black text |
| Focus-visible | Yes | Yes | Double-ring focus with brand accent |
| Disabled (prev/next) | Yes | Partial | `opacity: 0.35` on line 83 is magic -- should use token |
| Loading | No | N/A | No loading/skeleton state |
| Error | No | N/A | No error state |

### 2.2 Keyboard Navigation
- All page buttons are natively focusable `<button>` elements
- Tab order is natural left-to-right through prev, pages, next
- **Missing**: No arrow key navigation between page buttons (roving tabindex pattern)
- **Missing**: No Home/End shortcuts to jump to first/last page
- **Missing**: No way to type a page number for large page counts

### 2.3 ARIA & Accessibility
- `<nav aria-label="Pagination">` (line 216) -- correct
- `<ul>` as ordered list with `<li>` items -- correct
- `aria-label="Previous page"` / `"Next page"` on arrows (lines 223, 257) -- good
- `aria-label="Page {n}"` on each page button (line 241) -- good
- `aria-current="page"` on active page (line 243) -- correct
- Ellipsis has `aria-hidden="true"` (line 236) -- correct
- **All ARIA is solid.**

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Suggested Token |
|------|-------|-----------------|
| 41 | `min-width: 36px` | `var(--cg-size-pagination-btn, 36px)` |
| 42 | `height: 36px` | Same |
| 69 | `transform: scale(1.02)` | `var(--cg-interaction-hover-scale, 1.02)` |
| 83 | `opacity: 0.35` | `var(--cg-opacity-disabled, 0.35)` |
| 100 | `min-width: 36px; height: 36px` (ellipsis) | Same token as page-btn |
| 113 | `width: 16px; height: 16px` (arrow icon) | `var(--cg-size-icon-sm, 16px)` |
| 118 | `min-width: 28px; height: 28px` (sm) | `var(--cg-size-pagination-btn-sm, 28px)` |
| 118 | `font-size: 12px` (sm) | `var(--cg-font-size-xs, 12px)` |
| 119 | `min-width: 28px; height: 28px` (sm ellipsis) | Same |
| 119 | `font-size: 12px` (sm ellipsis) | Same |
| 120 | `min-width: 44px; height: 44px` (lg) | `var(--cg-size-pagination-btn-lg, 44px)` |
| 120 | `font-size: 16px` (lg) | `var(--cg-font-size-base, 16px)` |
| 121 | `min-width: 44px; height: 44px` (lg ellipsis) | Same |
| 121 | `font-size: 16px` (lg ellipsis) | Same |
| 126 | `min-width: 32px; height: 32px` (responsive) | Token or responsive override |
| 133 | `min-width: 24px; height: 32px` (responsive ellipsis) | Token |

### 3.2 Raw Colors Found
No raw hex or rgba colors found -- all properly tokenized. Excellent token coverage.

### 3.3 Spacing Issues
- All spacing uses `var(--cg-spacing-*)` tokens -- clean
- Responsive breakpoint `480px` is a magic value (line 124)

### 3.4 Modern Design Enhancements
- Add subtle page-change animation (fade/slide between page numbers)
- Consider a "compact" variant showing only prev/current/next
- Add "jump to page" input field for large page counts
- Add page count summary text (e.g., "Page 5 of 20") as optional feature

## 4. Prioritized Fixes

### P0 - Critical
None -- functionality and ARIA are solid.

### P1 - High
1. Replace all 16+ magic number dimension/font-size values with design tokens
2. Replace `opacity: 0.35` with `var(--cg-opacity-disabled)` token
3. Fix hover border token name conflict (line 68) -- use a distinct `--cg-color-surface-hover-border` token

### P2 - Medium
4. Add roving tabindex with arrow key navigation between page buttons
5. Add Home/End keyboard shortcuts for first/last page
6. Add `transform: scale(1.02)` as a hover scale token

### P3 - Low
7. Add compact variant (prev/current/next only)
8. Add "jump to page" input for large page sets
9. Add page count summary text option
10. Document the `480px` responsive breakpoint
