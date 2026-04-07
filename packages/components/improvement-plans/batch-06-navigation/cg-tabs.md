# cg-tabs Improvement Plan

**Component**: `cg-tabs`
**Category**: Foundation
**File**: `src/components/cg-tabs/cg-tabs.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. Multiple magic numbers in padding, font-size, gap, and border-radius values across size variants and pills variant
2. Missing `aria-labelledby` on tabpanel; no unique `id` per tab for panel association
3. No loading, error, or skeleton states for tab content panels

---

## 1. Functional Issues

- **Line 219**: The `tabpanel` div lacks a unique `id` and `aria-labelledby` attribute linking it to the active tab button. Each tab panel should have a corresponding `id="panel-{value}"` and `aria-labelledby="tab-{value}"`.
- **Line 149**: `willUpdate` always resets `_active` when `value` or `tabs` change. If the consumer does not pass `value`, every re-render from `tabs` changing will reset to the first tab, potentially losing user state.
- No handling for empty `tabs` array -- renders an empty tablist with no fallback.
- The indicator position is computed in `updated()` which runs after every render. If the component is hidden or off-screen, `offsetLeft`/`offsetWidth` will be 0, causing a collapsed indicator on reveal.

## 2. Interaction Issues

### 2.1 State Coverage
| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Default | Yes | Yes | `--cg-gray-500` for inactive text |
| Hover | Yes | Partial | Background uses token but `border-radius: var(--cg-border-radius-100, 8px)` only on hover -- good |
| Active/Selected | Yes | Yes | `--cg-text-accent` |
| Disabled | Yes | Partial | Opacity 0.4 is a magic number (line 82) -- should use `--cg-opacity-disabled` |
| Focus-visible | Yes | Partial | `border-radius: 4px` on line 88 is a magic number |
| Loading | No | N/A | No loading/skeleton state for tab content |
| Error | No | N/A | No error state for tab content |
| Pressed/Active | No | N/A | No `:active` press feedback |
| Dragging | No | N/A | No reorderable tabs support |

### 2.2 Keyboard Navigation
- Arrow keys (Left/Right/Up/Down) work correctly with wrapping (lines 181-186)
- Home/End keys supported (lines 184-185)
- Focus management via `requestAnimationFrame` is solid (line 193)
- **Missing**: No `aria-orientation` on the tablist -- should be `"horizontal"` (default) or `"vertical"` based on layout
- **Missing**: The `btns` query on line 194 uses `.tab:not(.disabled)` but the index `next` is based on the filtered `enabled` array, which may mismatch if disabled tabs exist between enabled tabs

### 2.3 ARIA & Accessibility
- `role="tablist"` present on container (line 201)
- `role="tab"` with `aria-selected` on each tab button (lines 205-207)
- `role="tabpanel"` on content panel (line 219)
- **Missing**: Tab buttons need `id="tab-{value}"` for `aria-labelledby` on panels
- **Missing**: Panels need `id="panel-{value}"` and `aria-labelledby="tab-{value}"`
- **Missing**: `aria-controls` on each tab pointing to its panel
- **Missing**: Icon tabs have no `aria-label` (line 211 only renders `tab.label` as text, but if an icon-only tab existed it would be unlabelled)

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Suggested Token |
|------|-------|-----------------|
| 66 | `gap: 6px` | `var(--cg-spacing-6, 6px)` |
| 67 | `padding: 10px` (vertical) | `var(--cg-spacing-10, 10px)` |
| 88 | `border-radius: 4px` | `var(--cg-border-radius-050, 4px)` |
| 96 | `font-size: 0.65rem` | `var(--cg-font-size-2xs, 0.65rem)` or `10px` token |
| 97 | `padding: 1px 6px` | `var(--cg-spacing-2, 2px) var(--cg-spacing-6, 6px)` |
| 113 | `border-radius: 6px` | `var(--cg-border-radius-075, 6px)` |
| 114 | `padding: ... 14px` (right) | `var(--cg-spacing-14, 14px)` or `var(--cg-spacing-16, 16px)` |
| 129 | `font-size: 12px` | `var(--cg-font-size-xs, 12px)` |
| 129 | `padding: 6px 12px` | `var(--cg-spacing-6, 6px) var(--cg-spacing-12, 12px)` |
| 132 | `font-size: 16px` | `var(--cg-font-size-base, 16px)` |
| 132 | `padding: 10px 20px` | `var(--cg-spacing-10, 10px) var(--cg-spacing-20, 20px)` |
| 133 | `height: 3px` | `var(--cg-border-width-thick, 3px)` |

### 3.2 Raw Colors Found
| Line | Value | Suggested Token |
|------|-------|-----------------|
| 51 | `#27272a` fallback | Already tokenized as fallback -- OK |
| 58 | `#c8e650` fallback | Already tokenized as fallback -- OK |

All colors use CSS custom properties with fallbacks, which is correct.

### 3.3 Spacing Issues
- Inconsistent padding approach: vertical padding uses raw `10px` while horizontal uses `var(--cg-spacing-16)` (line 67)
- Panel padding `16px 0` on line 125 -- the `0` horizontal padding is intentional but the `16px` should reference `var(--cg-spacing-16)`... it does. OK.

### 3.4 Modern Design Enhancements
- Add subtle backdrop-filter blur to pills variant background for glass-morphism effect
- Add `:active` press scale on tab buttons: `transform: scale(var(--cg-interaction-press-scale, 0.97))`
- Consider adding a subtle gradient underline for the active indicator instead of solid color
- Add `scroll-padding` to the tab list so arrow-key navigation scrolls smoothly for overflowing tabs

## 4. Prioritized Fixes

### P0 - Critical
1. Add `id` and `aria-labelledby`/`aria-controls` to tabs and panels for proper ARIA association
2. Fix keyboard focus index mismatch when disabled tabs exist between enabled tabs (line 194)

### P1 - High
3. Replace all magic number paddings/font-sizes with design tokens (12 instances listed above)
4. Replace `opacity: 0.4` with `var(--cg-opacity-disabled)` token
5. Add `aria-orientation` to tablist

### P2 - Medium
6. Add loading/skeleton state for tab panel content
7. Add `:active` press feedback on tab buttons
8. Add `scroll-padding-inline` for smooth keyboard scroll in overflowing tab lists
9. Handle edge case where component is initially hidden (indicator at 0,0)

### P3 - Low
10. Add glass-morphism backdrop-filter to pills variant
11. Consider icon-only tab support with proper `aria-label`
12. Add tab reorder via drag-and-drop
