# ai-embedding-viz Improvement Plan

**Component**: `ai-embedding-viz`
**Category**: AI-Native
**File**: `src/components/ai-embedding-viz/ai-embedding-viz.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Fair
**Top 3 Issues**:
1. `CLUSTER_COLORS` array (lines 31-34) contains 10 raw hex colors that bypass the token system entirely
2. Tooltip uses raw hex colors `#09090b` and `#e4e4e7` (lines 102-103) instead of tokens
3. CSS syntax error -- extra closing brace on line 149 before style close

---

## 1. Functional Issues

- **Lines 31-34**: `CLUSTER_COLORS` array contains raw hex colors: `#dfff61, #3b82f6, #f472b6, #22c55e, #eab308, #a78bfa, #f97316, #06b6d4, #ef4444, #84cc16`. These should be resolved from `--cg-color-chart-*` tokens at runtime (similar to how `cg-chart` uses `PALETTE_TOKENS`).
- **Line 50**: `box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05)` -- raw rgba.
- **Line 51**: `background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), transparent)` -- raw rgba.
- **Line 96**: `.point-label { font-size: 9px }` -- magic number.
- **Line 102**: `.tooltip { background: #09090b; }` -- raw hex.
- **Line 103**: `.tooltip { color: #e4e4e7; }` -- raw hex.
- **Line 113**: `.tooltip { margin-top: -10px; }` -- magic number.
- **Line 149**: Extra closing brace `}` -- **CSS syntax error**.
- **Line 162**: Fallback color `'#dfff61'` -- raw hex, should use a resolved token value.
- **Line 173-174**: `_normalize()` uses hardcoded `margin = 30`, `w = 500`, `h = 300` -- all magic numbers.
- **Line 225**: `_clusterColorMap.clear()` called in `render()` -- rebuilds color map every render, which means colors could change if cluster order changes between renders.

---

## 2. Interaction Issues

### 2.1 State Coverage
| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Default | Yes | Partial | Container tokens OK, colors bypass system |
| Hover (point) | Yes | No | CSS `r: 7` on line 89 -- raw value |
| Active | No | N/A | No pressed state |
| Focus | Yes | Yes | Line 91-93 on points |
| Disabled | No | N/A | No disabled state |
| Loading | No | N/A | No loading/skeleton state |
| Error | No | N/A | No error state |
| Empty | Yes | Yes | Line 221 |
| Tooltip | Yes | Partial | Raw hex colors |
| Selected | No | N/A | No selected point state |

### 2.2 Keyboard Navigation
- Points have `tabindex="0"` and `@keydown` (Enter/Space) -- good (lines 248-250).
- **Missing**: No arrow-key navigation between points.
- **Missing**: No Escape to dismiss tooltip.
- With many points, tab navigation becomes impractical -- needs grouped/roving tabindex.

### 2.3 ARIA & Accessibility
- Container has `role="region"` and `aria-label` -- good (line 228).
- SVG has `role="img"` and `aria-label` with point count -- good (line 235).
- Points have `role="button"` and `aria-label` with label and cluster -- good (lines 245-246).
- Legend has `role="list"` with `role="listitem"` -- good (line 266).
- **Missing**: No summary description of clusters/distribution for screen readers.
- **Missing**: Color-only cluster differentiation -- no shape variation for colorblind users.

### 2.4 Touch & Mobile
- Points have `r="5"` base radius -- may be too small for touch (10px diameter).
- Tooltip uses mouse positioning -- not touch-friendly.
- SVG viewBox `500x300` is fixed -- responsive but aspect ratio locked.

---

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Suggested Token |
|------|-------|-----------------|
| 50 | `rgba(255, 255, 255, 0.05)` | `var(--cg-overlay-light-subtle)` |
| 51 | `rgba(255, 255, 255, 0.03)` | `var(--cg-overlay-light-minimal)` |
| 82 | `height: 300px` | Should be configurable property |
| 89 | `r: 7` | Token or configurable |
| 96 | `font-size: 9px` | `var(--cg-font-size-2xs, 10px)` |
| 113 | `margin-top: -10px` | `calc(-1 * var(--cg-spacing-10))` |
| 173-174 | `margin = 30, w = 500, h = 300` | Constants or configurable props |

### 3.2 Raw Colors Found
| Line | Color | Suggested Token |
|------|-------|-----------------|
| 31-34 | 10 raw hex cluster colors | Should use `--cg-color-chart-*` tokens resolved at runtime |
| 102 | `#09090b` | `var(--cg-color-surface-base-background)` |
| 103 | `#e4e4e7` | `var(--cg-gray-200)` |
| 162 | `'#dfff61'` (fallback in JS) | Resolve from `--cg-brand-ai-accent` |

### 3.3 Typography Issues
- `.point-label` `font-size: 9px` -- not in token scale.

### 3.4 Spacing Issues
- Tooltip `margin-top: -10px` -- should use token.

### 3.5 Modern Design Enhancements
- Add loading state with placeholder visualization.
- Add zoom/pan controls for dense point clouds.
- Add different point shapes per cluster for colorblind accessibility.
- Add lasso/box selection for multiple points.
- Add density contour overlay option.
- Make chart height configurable via property.

---

## 4. Prioritized Fixes

### P0 - Critical
1. Fix CSS syntax error: remove extra `}` on line 149.
2. Replace `CLUSTER_COLORS` hardcoded array with token-resolved palette (follow `cg-chart`'s `PALETTE_TOKENS` pattern).
3. Replace tooltip raw hex `#09090b` and `#e4e4e7` with tokens.

### P1 - High
4. Replace raw rgba overlay values with tokens.
5. Replace JS fallback color `'#dfff61'` with runtime-resolved token.
6. Add loading/skeleton state.
7. Stabilize `_clusterColorMap` -- don't clear on every render; only rebuild when `points` property changes.
8. Add different point shapes per cluster for colorblind users.

### P2 - Medium
9. Replace `font-size: 9px` with token.
10. Replace `margin-top: -10px` with token.
11. Make chart height, SVG viewBox dimensions configurable via properties.
12. Add touch-friendly tooltip trigger.
13. Increase point touch target size.

### P3 - Low
14. Add zoom/pan controls.
15. Add lasso/box selection.
16. Add arrow-key navigation (or cluster-based tab groups).
17. Add density contour overlay.
