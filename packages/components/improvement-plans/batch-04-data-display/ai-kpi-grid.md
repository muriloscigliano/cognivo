# ai-kpi-grid Improvement Plan

**Component**: `ai-kpi-grid`
**Category**: AI-Native
**File**: `src/components/ai-kpi-grid/ai-kpi-grid.ts`
**Priority**: P2-Medium

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. CSS syntax error -- misplaced closing brace on line 146 (inside `@media` for reduced-motion, breaks skeleton animation override)
2. Magic number `gap: 3px` in `.kpi-delta` (line 116) not from token scale
3. Missing error state and empty state for when `kpis` array is empty and not loading

---

## 1. Functional Issues

- **Line 47**: `box-shadow` uses raw `rgba(0,0,0,0.3)` and `rgba(0,0,0,0.2)` as fallbacks, plus `rgba(255, 255, 255, 0.05)` for inset -- raw rgba values.
- **Line 48**: `background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), transparent)` -- raw rgba.
- **Line 116**: `.kpi-delta` `gap: 3px` -- not in token scale.
- **Line 142-146**: The skeleton reduced-motion override block has a misplaced closing brace structure. Line 145 `.skel-line { animation: none; ... }` appears after the closing `}` of `.skel-delta` on line 144, suggesting it's meant to be inside a `@media (prefers-reduced-motion)` block but the structure is broken.
- **Line 175**: Skeleton renders `this.columns * 2` cells -- this is a reasonable heuristic but could mislead users about actual data count.
- No empty state: when `kpis` is empty and `loading` is false, the grid renders empty with just the title.

---

## 2. Interaction Issues

### 2.1 State Coverage
| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Default | Yes | Yes | Good token usage |
| Hover | Yes | Yes | Line 77-79 |
| Active | No | N/A | No pressed/active state on KPI cells |
| Focus | Yes | Yes | Line 80-83 |
| Disabled | No | N/A | No disabled state for cells |
| Loading | Yes | Yes | Skeleton shimmer (lines 125-146) |
| Error | No | N/A | No error state |
| Empty | No | N/A | No empty state when kpis=[] |
| Compact | No | N/A | No compact mode |

### 2.2 Keyboard Navigation
- KPI cells have `role="button"`, `tabindex="0"`, and `@keydown` handler (Enter/Space) -- good (lines 192-197).
- No arrow-key navigation between grid cells.
- No roving tabindex pattern for grid navigation.

### 2.3 ARIA & Accessibility
- Container has `role="region"` and `aria-label` -- good (line 187).
- KPI cells have `aria-label` with value and delta -- good (line 195).
- KPI icon has `aria-hidden="true"` -- good (line 200).
- Trend arrow has `aria-hidden="true"` -- good (line 206).
- Skeleton has `aria-hidden="true"` -- good (line 177).

### 2.4 Touch & Mobile
- Grid responds to `columns` prop -- can be set for mobile.
- No responsive breakpoint handling (CSS-level).
- KPI cells have adequate padding for touch targets.

---

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Suggested Token |
|------|-------|-----------------|
| 47 | `rgba(0,0,0,0.3), rgba(0,0,0,0.2)` | Already in elevation token fallback -- acceptable |
| 47 | `rgba(255, 255, 255, 0.05)` | `var(--cg-overlay-light-subtle)` |
| 48 | `rgba(255, 255, 255, 0.03)` | `var(--cg-overlay-light-minimal)` |
| 59 | `letter-spacing: 0.04em` | `var(--cg-letter-spacing-normal, 0.04em)` |
| 116 | `gap: 3px` | Not in token scale -- use `var(--cg-spacing-4, 4px)` or define 3px token |

### 3.2 Raw Colors Found
| Line | Color | Suggested Token |
|------|-------|-----------------|
| 47 | `rgba(255, 255, 255, 0.05)` | `var(--cg-overlay-light-subtle)` |
| 48 | `rgba(255, 255, 255, 0.03)` | `var(--cg-overlay-light-minimal)` |

All other colors properly use tokens.

### 3.3 Typography Issues
- No issues -- font sizes and weights properly tokenized.

### 3.4 Spacing Issues
- `.kpi-delta` `gap: 3px` (line 116) -- not from token scale.

### 3.5 Modern Design Enhancements
- Add sparkline mini-chart in KPI cells for trend visualization.
- Add responsive grid that auto-adjusts columns based on container width.
- Add empty state message when no KPIs provided.
- Consider adding comparison mode (vs previous period).

---

## 4. Prioritized Fixes

### P0 - Critical
1. Fix CSS structure issue around lines 142-146 -- the `.skel-line` override for reduced motion appears to be at the wrong nesting level.

### P1 - High
2. Add empty state when `kpis` array is empty and not loading.
3. Replace `rgba(255, 255, 255, 0.05/0.03)` with overlay tokens.
4. Add error state for failed data load.

### P2 - Medium
5. Replace `gap: 3px` with nearest spacing token.
6. Add active/pressed state on KPI cells.
7. Add responsive breakpoint handling for grid columns.
8. Replace `letter-spacing: 0.04em` with token.

### P3 - Low
9. Add arrow-key grid navigation (roving tabindex).
10. Add sparkline mini-charts.
11. Add compact mode variant.
12. Add comparison mode (vs previous period).
