# ai-source-graph Improvement Plan

**Component**: `ai-source-graph`
**Category**: AI-Native
**File**: `src/components/ai-source-graph/ai-source-graph.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Fair
**Top 3 Issues**:
1. Hard-coded SVG dimensions and layout values (lines 141, 157-158, 175) -- graph does not respond to container size
2. Extensive raw hex colors for node types (lines 88-91, 121-122) and inline SVG attributes (lines 160, 165, 180) not using tokens
3. SVG elements use `tabindex` and `role="button"` (line 182) but SVG keyboard interaction doesn't work properly -- needs `focusable="true"` and proper keyboard event handlers

---

## 1. Functional Issues

- **Line 141**: Graph dimensions are hard-coded: `cx = 160, cy = 120, radius = 80, svgW = 320, svgH = 240`. The graph will not scale with container size. Should use `ResizeObserver` or `viewBox` with percentage-based layout.
- **Line 157-158**: Node position calculation uses fixed radius and center -- overlapping nodes when there are many sources (> 8-10 sources will crowd the circle).
- **Line 175**: `nodeR = 14 + s.weight * 8` mixes presentation logic into render. Node radius should be computed in a helper method.
- **Line 184**: Title truncation `s.title.length > 15 ? s.title.slice(0, 14) + '...'` uses a magic number 15/14 and ASCII ellipsis instead of `...` character.
- **Line 120-122**: Type colors and icons are hard-coded objects. Should be configurable or derived from tokens.
- **Line 180**: SVG `fill="${color}22"` appends hex alpha directly -- this is fragile and won't work with non-hex color values. Should use `opacity` attribute or rgba conversion.
- **Line 102-105**: `@keyframes fadeIn` is defined locally but the component doesn't import `fadeInKeyframes` from shared styles, creating a duplicate definition.
- **Missing**: No resize handling -- graph layout is fixed at 320x240 regardless of container.

## 2. Interaction Issues

### 2.1 State Coverage
Current states:
- Default (nodes displayed)
- Hover (node opacity change)
- Selected (node stroke-width change, detail panel shown)
- Empty state

Missing states:
- **Active/Pressed** on nodes -- no `:active` visual feedback
- **Focus** on nodes -- `tabindex="0"` is set but no focus ring style for SVG circles
- **Loading** -- no skeleton state while source data is loading
- **Error** -- no state for failed source attribution
- **Disabled** -- no disabled variant
- **Hover on detail panel** -- no interactive states on the detail panel
- **Multiple selection** -- cannot select multiple sources simultaneously
- **Animated transition** -- no transition when selecting/deselecting nodes

### 2.2 Keyboard Navigation
- **Line 182**: SVG circles have `tabindex="0"` and `role="button"` -- but SVG keyboard focus is unreliable across browsers without `focusable="true"`.
- **Missing**: No keyboard event handler on SVG circles -- only `@click` is bound. Need `@keydown` for Enter/Space.
- **Missing**: No arrow key navigation between source nodes.
- **Missing**: No Escape key to deselect / close detail panel.
- **Missing**: No Tab order management -- tab order follows DOM order, which may not match visual circular layout.
- **Missing**: Detail panel content is not keyboard-navigable.

### 2.3 ARIA & Accessibility
- **Line 148**: `role="figure"` with `aria-label="Source attribution graph"` on container -- good.
- **Line 182**: `role="button"` with `aria-label` on SVG circles -- good labeling.
- **Missing**: `aria-pressed` or `aria-selected` on the selected source node.
- **Missing**: The SVG itself should have `role="img"` or `role="graphics-document"` for proper screen reader handling.
- **Missing**: Detail panel has no `role` or `aria-label` -- should be `role="region"` or linked via `aria-controls`.
- **Missing**: Edge lines (source connections) convey weight information visually but have no accessible equivalent. Need a text summary of weights.
- **Missing**: `aria-hidden="true"` on decorative SVG elements (edges, center circle text).
- **Missing**: Color alone distinguishes node types -- violates WCAG 1.4.1. Need shape or pattern differentiation.

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Should Be |
|------|-------|-----------|
| 50 | `font-size: 12px` | `var(--cg-font-size-xs)` |
| 51 | `letter-spacing: 0.05em` | `var(--cg-letter-spacing-wide)` |
| 60 | `font-size: 10px` | `var(--cg-font-size-2xs)` |
| 85 | `font-size: 9px; padding: 2px` | Tokens |
| 86 | `border-radius: 3px` | `var(--cg-border-radius-25)` or `var(--cg-border-radius-50)` |
| 92 | `font-size: 13px` | `var(--cg-font-size-sm)` |
| 98 | `font-size: 12px; line-height: 1.4` | Tokens |
| 103 | `translateY(4px)` | `var(--cg-spacing-4)` |
| 107 | `padding: 32px; font-size: 13px` | Tokens |
| 141 | `cx=160, cy=120, radius=80` | Computed from container size |
| 157 | `strokeW = 1 + s.weight * 4` | Named constants |
| 175 | `nodeR = 14 + s.weight * 8` | Named constants |
| 184 | `15` / `14` (title truncation) | Named constant |

### 3.2 Raw Colors Found
| Line | Value | Should Be |
|------|-------|-----------|
| 44 | `rgba(255, 255, 255, 0.05)` | `var(--cg-color-surface-overlay-faint)` |
| 45 | `rgba(255, 255, 255, 0.03)` | `var(--cg-color-surface-overlay-subtle)` |
| 88 | `rgba(139, 92, 246, 0.12); color: #a78bfa` | `var(--cg-color-purple-container)` / `var(--cg-purple-400)` |
| 89 | `rgba(59, 130, 246, 0.12); color: #60a5fa` | `var(--cg-color-blue-container)` / `var(--cg-blue-400)` |
| 90 | `rgba(34, 197, 94, 0.12); color: #4ade80` | `var(--cg-color-success-container)` / `var(--cg-green-400)` |
| 91 | `rgba(245, 158, 11, 0.12); color: #fbbf24` | `var(--cg-color-amber-container)` / `var(--cg-amber-400)` |
| 121 | `'#a78bfa', '#60a5fa', '#4ade80', '#fbbf24'` | Tokens in JS |
| 160 | `opacity="${0.3 + s.weight * 0.5}"` (inline) | Named constants |
| 165 | `rgba(223, 255, 97, 0.12)` (inline SVG) | Token |
| 180 | `${color}22` (inline hex alpha) | Proper rgba or opacity |

### 3.3 Spacing Issues
- Container padding uses tokens (line 43: `var(--cg-spacing-16)`) -- good.
- Detail panel padding uses tokens (line 78: `var(--cg-spacing-12)`) -- good.
- Detail type badge padding (line 85: `2px var(--cg-spacing-6)`) has raw `2px`.
- Empty state padding (line 107: `32px`) is raw.
- Font sizes use a mix of tokens and raw values -- inconsistent.

### 3.4 Modern Design Enhancements
- Make the graph responsive using `ResizeObserver` and dynamic `viewBox`
- Add animated edge drawing on initial render (SVG `stroke-dasharray` animation)
- Add node pulse/glow animation when selected
- Add force-directed layout for better node distribution with many sources
- Add zoom/pan capability for complex graphs
- Add different node shapes per type (not just color) for WCAG compliance
- Add a legend explaining node types and weight scale
- Consider adding tooltips on hover instead of only click-to-expand

## 4. Prioritized Fixes

### P0 - Critical
1. Add keyboard event handlers (`@keydown` for Enter/Space) on SVG source nodes -- currently only `@click` works
2. Add `focusable="true"` to SVG circle elements for cross-browser keyboard support
3. Add non-color differentiation for node types (shapes or patterns) -- WCAG 1.4.1 violation

### P1 - High
4. Replace all raw hex colors with semantic tokens -- 10+ instances in CSS and 4 in JS
5. Replace all magic numbers with tokens or named constants (13+ instances)
6. Make SVG responsive to container size via `ResizeObserver`
7. Add `aria-selected` on the selected source node
8. Add `role` and `aria-label` to the detail panel
9. Add Escape key handler to close detail panel
10. Fix `${color}22` hex alpha pattern (line 180) -- use proper opacity handling

### P2 - Medium
11. Add focus ring style for SVG circles (`:focus-visible` equivalent)
12. Add arrow key navigation between source nodes
13. Remove duplicate `@keyframes fadeIn` -- use shared `fadeInKeyframes` import
14. Add `:active` state feedback on source nodes
15. Add `aria-hidden="true"` to decorative SVG elements
16. Add a text summary of source weights for screen readers
17. Add a legend for node types

### P3 - Low
18. Add animated edge drawing on render
19. Add zoom/pan capability
20. Add force-directed layout option for many sources
21. Add tooltip preview on node hover
22. Add multiple selection support
23. Make title truncation length configurable
