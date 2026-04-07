# AI Context Window Improvement Plan

**Component**: `ai-context-window`
**Category**: AI-Native
**File**: `src/components/ai-context-window/ai-context-window.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Fair
**Top 3 Issues**:
1. Raw hex colors used as default segment colors in `_defaultColors` array (line 136) -- `#a78bfa`, `#60a5fa`, `#14b8a6`, `#fbbf24`, `#f87171` injected into inline styles, completely bypassing tokens
2. Multiple magic numbers in segment border-radius, tooltip font-size, legend dot size, cache row padding (lines 78-79, 94, 104, 109, 119)
3. CSS structure issue: orphaned `}` on line 124 and misplaced `:focus-visible` rule on lines 127-130 outside the main style block

---

## 1. Functional Issues

- **Lines 124-131**: CSS has an orphaned closing `}` on line 124 after `.cache-icon`, followed by a bare `:focus-visible` rule at line 127. The `:focus-visible` is outside any scoped selector, applying to all focusable elements in the shadow DOM. This creates unpredictable focus styling.
- **Line 136**: `_defaultColors` is a hard-coded array of raw hex colors. These are injected into inline `style` attributes (lines 178, 190), making theming and token compliance impossible.
- **Line 175-184**: Segments are clickable (`@click`) but have no visual affordance indicating interactivity (no cursor change, no focus ring, no tabindex).
- **Line 160**: When `total <= 0`, the component returns `nothing`. Should display an error or configuration message instead.

## 2. Interaction Issues

### 2.1 State Coverage
| State | Implemented | Notes |
|-------|------------|-------|
| Default | Yes | |
| OK status | Yes | `.total.ok` (line 60) |
| Warning status | Yes | `.total.warning` (line 61) |
| Danger status | Yes | `.total.danger` (line 62) |
| Hover | Partial | Tooltip on segment hover (lines 82-97), but no visual hover state on segments |
| Focus-visible | Broken | `:focus-visible` on line 127 is misplaced |
| Disabled | **No** | No disabled state |
| Loading | **No** | No loading/skeleton state |
| Error | **No** | No error state |

**Missing states**: proper focus-visible, disabled, loading, error (4 of 8+ required).

### 2.2 Keyboard Navigation
- **Segments are not keyboard accessible**: They use `@click` but have no `tabindex`, `role`, or keyboard event handlers. Screen reader users cannot interact with segments.
- **Legend items** have `cursor: pointer` (line 106) but no click handler, tabindex, or role.

### 2.3 ARIA & Accessibility
- **Line 165**: `role="figure"` with `aria-label` is reasonable for the container.
- **Segments** (lines 179-183): No `role`, no `aria-label`, no `tabindex`. The CSS tooltip via `::after` pseudo-element is not accessible to screen readers.
- **Legend items** should include `aria-label` or be wrapped in a descriptive list.
- **Cache row** (lines 206-209): The SVG icon has no `aria-hidden="true"`.

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Property | Value | Suggested Token |
|------|----------|-------|-----------------|
| 66 | `height` | `12px` | `var(--cg-spacing-12, 12px)` |
| 78 | `border-radius` | `6px 0 0 6px` | `var(--cg-border-radius-75, 6px)` |
| 79 | `border-radius` | `0 6px 6px 0` | `var(--cg-border-radius-75, 6px)` |
| 85 | `bottom` | `calc(100% + 6px)` | `calc(100% + var(--cg-spacing-6, 6px))` |
| 91 | `padding` | `3px` | `var(--cg-spacing-3, 3px)` |
| 94 | `font-size` | `10px` | `var(--cg-font-size-2xs, 10px)` |
| 104 | `gap` | `5px` | `var(--cg-spacing-5, 5px)` |
| 105 | `font-size` | `11px` | `var(--cg-font-size-2xs, 11px)` |
| 109 | `width/height` | `8px` | `var(--cg-spacing-8, 8px)` |
| 109 | `border-radius` | `3px` | `var(--cg-border-radius-25, 3px)` |
| 119 | `padding-top` | `8px` | `var(--cg-spacing-8, 8px)` |
| 121 | `font-size` | `11px` | `var(--cg-font-size-2xs, 11px)` |

### 3.2 Raw Colors Found
| Line | Value | Context | Suggested Token |
|------|-------|---------|-----------------|
| 41 | `rgba(255, 255, 255, 0.03)` | background gradient | `var(--cg-color-surface-gradient-start)` |
| 45 | `rgba(255, 255, 255, 0.05)` | box-shadow inset | `var(--cg-color-surface-highlight)` |
| 136 | `'#a78bfa'` | JS: default segment color | `var(--cg-purple-400)` |
| 136 | `'#60a5fa'` | JS: default segment color | `var(--cg-blue-400)` |
| 136 | `'#14b8a6'` | JS: default segment color | `var(--cg-teal-500)` |
| 136 | `'#fbbf24'` | JS: default segment color | `var(--cg-yellow-400)` |
| 136 | `'#f87171'` | JS: default segment color | `var(--cg-red-400)` |

### 3.3 Spacing Issues
- Legend dot `gap: 5px` (line 104) is not on the standard spacing scale.
- Cache row `padding-top: 8px` (line 119) should use token syntax `var(--cg-spacing-8, 8px)`.

### 3.4 Modern Design Enhancements
- Add animated segment transitions when token counts change (grow/shrink with easing).
- Add a danger threshold animation (pulsing red glow when usage exceeds 95%).
- Consider an "Optimize" suggestion when context window is nearly full.
- Segment tooltip should be a proper tooltip component rather than a `::after` pseudo-element (better accessibility and positioning).

## 4. Prioritized Fixes

### P0 - Critical
1. **Fix CSS structure** -- remove orphaned `}` on line 124 and properly scope the `:focus-visible` rule on line 127.
2. **Make segments keyboard accessible** -- add `tabindex="0"`, `role="button"`, `aria-label`, and keyboard event handlers to segments.

### P1 - High
3. **Replace `_defaultColors` raw hex** with CSS custom property references or token-backed values.
4. **Replace all magic numbers** listed in 3.1 with design tokens.
5. **Add proper tooltip implementation** instead of CSS `::after` pseudo-elements (inaccessible).
6. **Add `aria-hidden="true"`** to decorative SVG icons.

### P2 - Medium
7. **Add disabled state** for the component.
8. **Add loading/skeleton state**.
9. **Add error state** when `total <= 0` instead of returning `nothing`.
10. **Add visual hover affordance** on segments (cursor, background highlight).
11. **Tokenize cache row padding** on line 119.

### P3 - Low
12. **Add danger animation** when usage exceeds 95%.
13. **Add segment transition animations** on value changes.
14. **Consider making legend items interactive** (click to highlight a segment).
