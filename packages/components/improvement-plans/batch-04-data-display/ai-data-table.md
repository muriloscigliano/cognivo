# ai-data-table Improvement Plan

**Component**: `ai-data-table`
**Category**: AI-Native
**File**: `src/components/ai-data-table/ai-data-table.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Fair
**Top 3 Issues**:
1. Multiple raw hex colors in CSS (lines 65, 97, 101-102, 108-109, 115-119, 138)
2. CSS syntax error -- extra closing brace on line 154 before the style close
3. Missing loading/skeleton state despite being an AI-native component

---

## 1. Functional Issues

- **Line 50**: `box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05)` -- raw rgba, should use overlay token.
- **Line 51**: `background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), transparent)` -- raw rgba.
- **Line 65**: `background: #09090b` -- raw hex, should use `var(--cg-color-surface-base-background, #09090b)`.
- **Line 97**: `tbody tr:hover { background: rgba(223, 255, 97, 0.04); }` -- raw rgba, should use `var(--cg-overlay-accent-subtle)`.
- **Line 101**: `border-bottom: 1px solid #1e1e21` -- raw hex `#1e1e21` not in token system.
- **Line 102**: `color: #d4d4d8` -- raw hex, should use `var(--cg-gray-300, #d4d4d8)`.
- **Line 109**: `background: rgba(239, 68, 68, 0.15)` -- raw rgba, should use `var(--cg-overlay-error-subtle)` or similar token.
- **Line 115**: `border-left: 3px solid #eab308` -- raw hex, should use `var(--cg-color-status-warning-text-default, #eab308)`.
- **Line 118**: `background: rgba(59, 130, 246, 0.10)` and `border-left: 3px solid #3b82f6` -- raw colors.
- **Line 136**: `background: #09090b` in tooltip -- raw hex.
- **Line 138**: `color: #e4e4e7` in tooltip -- raw hex, should use `var(--cg-gray-200, #e4e4e7)`.
- **Line 154**: Extra closing brace `}` before the style template literal close -- **CSS syntax error** that may cause parsing issues.
- **Line 80**: Sort transition uses `150ms ease` -- should use motion tokens.
- **Line 95**: Row transition uses `120ms ease` -- should use `var(--cg-motion-duration-fast)`.

---

## 2. Interaction Issues

### 2.1 State Coverage
| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Default | Yes | Partial | Multiple raw colors |
| Hover (row) | Yes | No | Raw rgba on line 97 |
| Hover (th) | Yes | Yes | Line 82 uses token |
| Active | No | N/A | No active/pressed state |
| Focus | Yes | Yes | Line 83-85 on sortable th |
| Disabled | No | N/A | No disabled state for table/rows |
| Loading | No | N/A | No skeleton state -- major gap for AI component |
| Error | No | N/A | No error display state |
| Empty | Yes | Partial | Line 148-153 |
| Anomaly | Yes | Partial | Lines 108-122, some raw colors |

### 2.2 Keyboard Navigation
- Sortable headers have `tabindex` and `@keydown` handler -- good (lines 227-230).
- Individual cells lack `tabindex` despite being clickable.
- No arrow-key navigation between cells.
- Anomaly cells have no keyboard-specific interaction (tooltip only on hover).

### 2.3 ARIA & Accessibility
- Table has `role="table"` and `aria-label` -- good (line 218).
- Rows have `role="row"` -- good.
- `aria-sort` is properly applied to sorted columns (line 228).
- Anomaly icon has `aria-label` -- good (line 254).
- Missing: cells with anomalies should announce the anomaly reason to screen readers.
- Tooltip is positioned absolutely but not connected via `aria-describedby`.

### 2.4 Touch & Mobile
- Tooltip relies on `mouseenter/mouseleave` -- not touch-friendly.
- Table wrapper has horizontal scroll -- good.
- No responsive adjustments for small screens.

---

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Suggested Token |
|------|-------|-----------------|
| 50 | `rgba(255, 255, 255, 0.05)` | `var(--cg-overlay-light-subtle)` |
| 51 | `rgba(255, 255, 255, 0.03)` | `var(--cg-overlay-light-minimal)` |
| 89 | `font-size: 10px` | `var(--cg-font-size-2xs, 10px)` |
| 92 | `margin-left: 4px` | `var(--cg-spacing-4, 4px)` |
| 110 | `border-left: 3px solid` | `var(--cg-border-width-150, 3px)` |
| 126 | `margin-left: 6px` | `var(--cg-spacing-6, 6px)` |

### 3.2 Raw Colors Found
| Line | Color | Suggested Token |
|------|-------|-----------------|
| 65 | `#09090b` | `var(--cg-color-surface-base-background)` |
| 97 | `rgba(223, 255, 97, 0.04)` | `var(--cg-overlay-accent-subtle)` |
| 101 | `#1e1e21` | Not in token system -- needs new token or map to nearest (`--cg-gray-800`) |
| 102 | `#d4d4d8` | `var(--cg-gray-300)` |
| 109 | `rgba(239, 68, 68, 0.15)` | `var(--cg-overlay-error-subtle)` |
| 115 | `#eab308` | `var(--cg-color-status-warning-text-default)` |
| 118-119 | `rgba(59, 130, 246, 0.10)`, `#3b82f6` | `var(--cg-overlay-info-subtle)`, `var(--cg-color-status-info-text-default)` |
| 136 | `#09090b` | `var(--cg-color-surface-base-background)` |
| 138 | `#e4e4e7` | `var(--cg-gray-200)` |

### 3.3 Typography Issues
- Sort arrow uses `font-size: 10px` (line 89) -- should use token.
- Anomaly icon uses `font-size` from token -- good.

### 3.4 Spacing Issues
- Anomaly icon `margin-left: 6px` (line 126) -- should use `var(--cg-spacing-6, 6px)`.

### 3.5 Modern Design Enhancements
- Add loading skeleton state with shimmer animation.
- Add row selection with checkbox support.
- Add column pinning for horizontal scroll.
- Consider adding cell-level focus management for data exploration.

---

## 4. Prioritized Fixes

### P0 - Critical
1. Fix CSS syntax error: remove extra `}` on line 154.
2. Replace raw hex `#09090b` on line 65 with `var(--cg-color-surface-base-background)`.
3. Replace raw hex `#1e1e21` on line 101 and `#d4d4d8` on line 102 with tokens.

### P1 - High
4. Replace all raw rgba colors (lines 50, 51, 97, 109, 118) with overlay tokens.
5. Replace raw hex colors in anomaly styles (lines 115, 119) with status tokens.
6. Replace tooltip raw colors (lines 136, 138) with tokens.
7. Add loading/skeleton state for AI component parity.
8. Add `tabindex` to clickable cells for keyboard access.

### P2 - Medium
9. Replace transition raw timing values with motion tokens.
10. Replace `font-size: 10px` and `margin-left` magic numbers with tokens.
11. Add touch-friendly tooltip trigger.
12. Connect anomaly tooltip with `aria-describedby`.

### P3 - Low
13. Add arrow-key cell navigation.
14. Add row selection support.
15. Add column pinning.
16. Add error display state.
