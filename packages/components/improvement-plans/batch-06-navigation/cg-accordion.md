# cg-accordion Improvement Plan

**Component**: `cg-accordion`
**Category**: Foundation
**File**: `src/components/cg-accordion/cg-accordion.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. Magic numbers in size variants (lines 175-179) and raw rgba hover background (line 172)
2. No keyboard navigation between accordion items (arrow keys to move between triggers)
3. Missing `aria-labelledby` on region panels; `content` div role="region" has no accessible name

---

## 1. Functional Issues

- **Line 239**: The `role="region"` on `.content` div has `id="panel-{value}"` but the trigger button references `aria-controls="panel-{value}"` -- this pairing is correct. However, the region lacks `aria-labelledby` pointing back to the trigger button, so screen readers cannot announce the panel's label.
- **Line 159**: `line-height: 1.65` is a magic number -- should use `var(--cg-line-height-relaxed, 1.65)` or nearest token.
- **Line 52**: Card variant has `box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05)` -- this raw rgba should use `var(--cg-overlay-white-subtle)` or a dedicated inset highlight token.
- **Line 172**: `.header:hover` uses `rgba(255, 255, 255, 0.03)` -- should use `var(--cg-overlay-white-ultra-subtle)` or similar token.
- Content is passed as a string in the `AccordionItem` interface. This limits usage to plain text. Consider supporting slotted content or `TemplateResult`.

## 2. Interaction Issues

### 2.1 State Coverage
| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Default (collapsed) | Yes | Yes | Proper border and text colors |
| Open/Expanded | Yes | Yes | Indicator bar, chevron rotation, accent color |
| Hover | Yes | Partial | Text hover uses token; background hover uses raw rgba (line 172) |
| Disabled | Yes | Partial | `opacity: 0.4` on line 106 is magic -- needs `--cg-opacity-disabled` |
| Focus-visible | Yes | Yes | Double-ring focus style (lines 98-103) |
| Pressed/Active | No | N/A | No `:active` press feedback on trigger |
| Loading | No | N/A | No skeleton/loading state for content |
| Error | No | N/A | No error state for accordion items |

### 2.2 Keyboard Navigation
- Enter/Space toggle is handled natively by the `<button>` element -- correct
- **Missing**: No arrow key navigation between accordion triggers. WAI-ARIA accordion pattern recommends:
  - `ArrowDown` / `ArrowUp` to move focus between triggers
  - `Home` / `End` to move to first/last trigger
- **Missing**: No `@keydown` handler on the accordion container for inter-item navigation

### 2.3 ARIA & Accessibility
- `aria-expanded` on trigger buttons (line 228) -- correct
- `aria-controls` pointing to panel ID (line 229) -- correct
- `role="region"` on content panel (line 239) -- correct
- **Missing**: Trigger buttons need `id="trigger-{value}"` for `aria-labelledby` on regions
- **Missing**: `aria-labelledby` on `role="region"` pointing to the trigger
- **Missing**: No `role` on the accordion container (should be implicit or explicitly a group)

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Suggested Token |
|------|-------|-----------------|
| 112 | `width: 3px` | `var(--cg-border-width-thick, 3px)` |
| 113 | `height: 16px` | `var(--cg-size-icon-sm, 16px)` |
| 114 | `border-radius: 2px` | `var(--cg-border-radius-025, 2px)` |
| 130 | `width: 16px; height: 16px` | `var(--cg-size-icon-sm, 16px)` |
| 159 | `line-height: 1.65` | `var(--cg-line-height-relaxed, 1.65)` |
| 163 | `200ms` in animation | `var(--cg-motion-duration-fast, 200ms)` |
| 175 | `font-size: 13px` (sm trigger) | `var(--cg-font-size-sm, 13px)` or `var(--cg-font-size-xs, 12px)` |
| 175 | `padding: 8px 12px` (sm) | `var(--cg-spacing-8, 8px) var(--cg-spacing-12, 12px)` |
| 176 | `font-size: 13px` (sm content) | Same token as trigger |
| 178 | `font-size: 16px` (lg trigger) | `var(--cg-font-size-base, 16px)` |
| 178 | `padding: 16px 20px` (lg) | `var(--cg-spacing-16, 16px) var(--cg-spacing-20, 20px)` |
| 179 | `font-size: 16px` (lg content) | `var(--cg-font-size-base, 16px)` |

### 3.2 Raw Colors Found
| Line | Value | Suggested Token |
|------|-------|-----------------|
| 52 | `rgba(255, 255, 255, 0.05)` | `var(--cg-overlay-white-subtle)` |
| 172 | `rgba(255, 255, 255, 0.03)` | `var(--cg-overlay-white-ultra-subtle)` |

### 3.3 Spacing Issues
- Size variant paddings on lines 175-179 use raw pixel values instead of spacing tokens
- Inconsistent: default variant trigger uses `padding: 16px 0` while card/bordered uses `padding: 16px` -- intentional but could be more explicit via a `--_trigger-padding-inline` internal token

### 3.4 Modern Design Enhancements
- Add `:active` scale on trigger: `transform: scale(var(--cg-interaction-press-scale, 0.97))`
- Add subtle left-border glow on open items for card variant
- Consider adding a `ghost` variant with no borders, just spacing (minimal style)
- Add transition on the indicator bar height for a smoother "grow in" effect

## 4. Prioritized Fixes

### P0 - Critical
1. Add `id` on trigger buttons and `aria-labelledby` on `role="region"` panels
2. Implement arrow key navigation between accordion triggers (Up/Down/Home/End)

### P1 - High
3. Replace all 12 magic number values with design tokens
4. Replace raw rgba colors on lines 52 and 172 with overlay tokens
5. Replace `opacity: 0.4` with disabled opacity token

### P2 - Medium
6. Add `:active` press feedback on trigger buttons
7. Support `TemplateResult` content (not just strings) in AccordionItem
8. Add loading/skeleton state for async content

### P3 - Low
9. Add `ghost` variant (no borders, minimal)
10. Add indicator bar grow animation on open
11. Consider `collapsible: false` option to keep at least one item open
