# cg-breadcrumbs Improvement Plan

**Component**: `cg-breadcrumbs`
**Category**: Foundation
**File**: `src/components/cg-breadcrumbs/cg-breadcrumbs.ts`
**Priority**: P2-Medium

---

## Executive Summary
**Overall Health**: Excellent
**Top 3 Issues**:
1. Magic numbers in size variant values (lines 163-171) -- raw px values for font-size, padding, and separators
2. `max-width: 200px` and `max-width: 120px` (lines 83, 184) are hard-coded limits -- should be configurable or use a token
3. Minor: icon dimensions use raw `14px`/`16px` (lines 128-129) instead of icon size tokens

---

## 1. Functional Issues

- **Line 83**: `max-width: 200px` on breadcrumb links is hard-coded. Long labels get truncated with ellipsis which is good, but the value should be a CSS custom property for consumer override.
- **Line 184**: Responsive breakpoint `max-width: 120px` further restricts on small screens -- also hard-coded.
- **Line 174**: `@media (max-width: 640px)` -- magic breakpoint. Should use a design token like `var(--cg-breakpoint-sm, 640px)` if available, though CSS media queries cannot use custom properties. Consider documenting this value.
- The `_expanded` state resets on re-render if `maxVisible` or `items` change -- this is acceptable behavior.
- No `updated()` or `willUpdate()` logic issues -- clean reactivity.

## 2. Interaction Issues

### 2.1 State Coverage
| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Default (link) | Yes | Yes | `--cg-color-text-secondary` |
| Current (last) | Yes | Yes | `--cg-color-text-primary` with semibold weight |
| Hover | Yes | Yes | Background overlay + text color change |
| Active/Pressed | Yes | Yes | Scale transform with `--cg-interaction-press-scale` |
| Focus-visible | Yes | Yes | Double-ring focus with brand accent |
| Disabled | No | N/A | No disabled breadcrumb link state |
| Loading | No | N/A | No skeleton/loading state |
| Overflow/Collapsed | Yes | Yes | Ellipsis button with expand |

### 2.2 Keyboard Navigation
- All breadcrumb links and ellipsis button are natively focusable (`<a>` and `<button>` elements)
- Tab order follows DOM order -- correct for breadcrumbs
- **Missing**: No arrow key navigation between crumbs (not required by WAI-ARIA breadcrumb pattern -- Tab is sufficient)
- Ellipsis button is keyboard-accessible with click handler -- good
- `<a>` links prevent default and fire custom event (line 234) -- this means the `href` is purely decorative. Consider using `<button>` instead or allowing native navigation

### 2.3 ARIA & Accessibility
- `<nav aria-label="Breadcrumb">` on container (line 290) -- correct
- `<ol>` for ordered list -- correct semantics
- `aria-current="page"` on last item (line 222) -- correct
- Separator has `aria-hidden="true"` (line 258) -- correct
- Ellipsis has `aria-label="Show all breadcrumb items"` (line 269) -- good
- **All ARIA is solid** -- this is the best ARIA implementation in the batch

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Suggested Token |
|------|-------|-----------------|
| 83 | `max-width: 200px` | `var(--cg-breadcrumb-max-width, 200px)` |
| 88 | `line-height: 1.4` | `var(--cg-line-height-snug, 1.4)` |
| 122 | `line-height: 1.4` | Same token |
| 128 | `font-size: 14px` (icon) | `var(--cg-font-size-sm, 14px)` |
| 129-130 | `width: 16px; height: 16px` | `var(--cg-size-icon-sm, 16px)` |
| 147 | `letter-spacing: 2px` | `var(--cg-letter-spacing-wide, 2px)` |
| 163 | `font-size: 12px` (sm link) | `var(--cg-font-size-xs, 12px)` |
| 163 | `padding: 2px 6px` (sm) | `var(--cg-spacing-2) var(--cg-spacing-6)` |
| 164 | `font-size: 12px` (sm current) | Same |
| 165 | `padding: 0 4px` (sm sep) | `var(--cg-spacing-4)` |
| 165 | `font-size: 10px` (sm sep) | `var(--cg-font-size-2xs, 10px)` |
| 166 | `font-size: 12px` (sm ellipsis) | Same |
| 166 | `padding: 2px 4px` | `var(--cg-spacing-2) var(--cg-spacing-4)` |
| 168 | `font-size: 16px` (lg link) | `var(--cg-font-size-base, 16px)` |
| 168 | `padding: 6px 12px` (lg) | `var(--cg-spacing-6) var(--cg-spacing-12)` |
| 170 | `padding: 0 8px` (lg sep) | Already uses 8px -- could use `var(--cg-spacing-8)` |
| 170 | `font-size: 14px` (lg sep) | `var(--cg-font-size-sm, 14px)` |
| 171 | `padding: 4px 8px` (lg ellipsis) | `var(--cg-spacing-4) var(--cg-spacing-8)` |
| 184 | `max-width: 120px` (responsive) | `var(--cg-breadcrumb-max-width-sm, 120px)` |

### 3.2 Raw Colors Found
No raw hex or rgba colors found outside of token fallbacks. All colors properly tokenized.

### 3.3 Spacing Issues
- Size variant styles (lines 163-171) are the main offenders -- all raw px values
- The responsive media query uses raw values that should ideally match tokens

### 3.4 Modern Design Enhancements
- Add subtle chevron SVG separator option (in addition to text separator)
- Add breadcrumb item icon support with proper sizing tokens
- Consider adding a `compact` mode that shows only the last 2 items with a back arrow
- Add hover underline animation on links for visual polish

## 4. Prioritized Fixes

### P0 - Critical
None -- ARIA and keyboard support are solid.

### P1 - High
1. Replace all 18+ magic number values in size variants with design tokens
2. Make `max-width` on crumb links configurable via CSS custom property

### P2 - Medium
3. Add `line-height` tokens for consistency
4. Add `letter-spacing` token for ellipsis
5. Consider SVG chevron separator option for modern look
6. Add disabled state for non-interactive breadcrumbs

### P3 - Low
7. Add skeleton/loading state for async breadcrumbs
8. Add hover underline animation
9. Add compact back-arrow mode for mobile
10. Document the `640px` media query breakpoint
