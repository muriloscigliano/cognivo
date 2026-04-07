# ai-heatmap Improvement Plan

**Component**: `ai-heatmap`
**Category**: AI-Native
**File**: `src/components/ai-heatmap/ai-heatmap.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Fair
**Top 3 Issues**:
1. `_getColor()` method (lines 137-165) computes colors via raw RGB math instead of using design tokens -- generates runtime colors that bypass the token system entirely
2. `_getTextColor()` (lines 167-170) uses raw hex `#000` and `#fafafa` instead of tokens
3. CSS syntax error -- extra closing brace on line 104 before style close

---

## 1. Functional Issues

- **Line 36**: `box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05)` -- raw rgba.
- **Line 37**: `background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), transparent)` -- raw rgba.
- **Line 89**: `.legend` `font-size: 10px` -- magic number.
- **Line 94**: `.legend-bar` `height: 8px; width: 80px` -- magic numbers.
- **Line 104**: Extra closing brace `}` -- **CSS syntax error**.
- **Line 127**: `_cellSize = 40` -- hardcoded, not configurable via property.
- **Line 128**: `_labelMarginLeft = 80` -- hardcoded.
- **Line 129**: `_labelMarginTop = 40` -- hardcoded.
- **Lines 137-165**: `_getColor()` computes colors using raw RGB interpolation with hardcoded values like `#27272a` decomposed to `rgb(39, 39, 42)`, `#f87171` -> `rgb(248, 113, 113)`, etc. This completely bypasses the token system. The heatmap colors should use CSS custom properties or a tokenized palette.
- **Lines 167-170**: `_getTextColor()` returns raw `#000` or `#fafafa` based on a threshold -- should use `var(--cg-gray-black)` and `var(--cg-color-surface-base-text)`.
- **Line 221**: Column label `font-size="10"` -- hardcoded SVG attribute.
- **Line 226**: Row label `font-size="10"` -- hardcoded SVG attribute.
- **Line 243**: Cell text `font-size="10"` -- hardcoded SVG attribute.
- **Line 235**: Cell `rx="3"` -- hardcoded border radius in SVG.

---

## 2. Interaction Issues

### 2.1 State Coverage
| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Default | Yes | Partial | Container good, cells bypass tokens |
| Hover (cell) | Yes | Yes | Line 53 |
| Active | No | N/A | No active/pressed state |
| Focus | Yes | Yes | Line 54 |
| Disabled | No | N/A | No disabled state |
| Loading | No | N/A | No loading/skeleton state |
| Error | No | N/A | No error state |
| Empty | Yes | Yes | Line 200-201 |
| Tooltip | Yes | Yes | Lines 67-81 |

### 2.2 Keyboard Navigation
- Cells have `tabindex="0"` and `@keydown` (Enter) -- good (lines 231-239).
- **Missing**: No arrow-key navigation between cells (grid navigation pattern).
- **Missing**: No Escape to dismiss tooltip.
- **Missing**: `@keydown` only handles Enter, not Space key for `role="gridcell"`.

### 2.3 ARIA & Accessibility
- SVG has `role="grid"` and `aria-label` -- good (line 216).
- Cells have `role="gridcell"` and `aria-label` with row/col/value -- good (lines 231-232).
- **Missing**: No `role="row"` grouping for grid semantics.
- **Missing**: No `role="columnheader"` / `role="rowheader"` for labels.
- **Missing**: Color-only information -- cells convey meaning through color alone, which is not accessible to colorblind users. `showValues` mitigates this but is optional.

### 2.4 Touch & Mobile
- Tooltip uses mouse positioning -- not touch-friendly.
- Cell size of 40px is reasonable for touch.
- No pinch-to-zoom for large matrices.

---

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Suggested Token |
|------|-------|-----------------|
| 36 | `rgba(255, 255, 255, 0.05)` | `var(--cg-overlay-light-subtle)` |
| 37 | `rgba(255, 255, 255, 0.03)` | `var(--cg-overlay-light-minimal)` |
| 89 | `font-size: 10px` | `var(--cg-font-size-2xs, 10px)` |
| 94 | `height: 8px; width: 80px` | Tokens |
| 127 | `_cellSize = 40` | Should be configurable property with token default |
| 128 | `_labelMarginLeft = 80` | Should be configurable |
| 129 | `_labelMarginTop = 40` | Should be configurable |
| 221, 226, 243 | `font-size="10"` in SVG | Class-based styling |
| 235 | `rx="3"` | Token |

### 3.2 Raw Colors Found
| Line | Color | Suggested Token |
|------|-------|-----------------|
| 143 | `#27272a` decomposed to RGB | Should use tokenized color scale |
| 148-149 | Interpolated RGB values for negative range | Token-based palette |
| 152-154 | Interpolated RGB values for positive range | Token-based palette |
| 159-162 | Sequential palette interpolation | Token-based palette |
| 170 | `#000` and `#fafafa` | `var(--cg-gray-black)` and `var(--cg-color-surface-base-text)` |

### 3.3 Typography Issues
- Multiple hardcoded `font-size="10"` attributes in SVG elements.

### 3.4 Spacing Issues
- Cell size, label margins all hardcoded as class properties.

### 3.5 Modern Design Enhancements
- Make cell size, label margins configurable via properties.
- Add loading skeleton state.
- Use CSS custom properties for color scale instead of JS interpolation.
- Add zoom controls for large matrices.
- Add row/column highlighting on hover.
- Default `showValues` to true for accessibility.

---

## 4. Prioritized Fixes

### P0 - Critical
1. Fix CSS syntax error: remove extra `}` on line 104.
2. Replace `_getTextColor()` raw hex `#000` / `#fafafa` with tokens -- these are applied as SVG fill attributes, so need to resolve token values at runtime or use CSS variables.
3. Default `showValues` to `true` -- color-only heatmap is inaccessible.

### P1 - High
4. Refactor `_getColor()` to use a tokenized color scale rather than raw RGB interpolation.
5. Add `role="row"` grouping, `role="columnheader"`, `role="rowheader"` for proper grid semantics.
6. Add Space key handling in cell `@keydown`.
7. Replace raw rgba overlay values with tokens.
8. Make `_cellSize`, `_labelMarginLeft`, `_labelMarginTop` configurable properties.

### P2 - Medium
9. Replace `font-size: 10px` and `font-size="10"` with token references.
10. Add loading skeleton state.
11. Add touch-friendly tooltip trigger.
12. Replace legend `height: 8px; width: 80px` with tokens.

### P3 - Low
13. Add arrow-key grid navigation.
14. Add row/column highlighting on hover.
15. Add zoom controls for large matrices.
16. Add error state for malformed data.
