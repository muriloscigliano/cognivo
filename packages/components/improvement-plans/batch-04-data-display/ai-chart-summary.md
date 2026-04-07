# ai-chart-summary Improvement Plan

**Component**: `ai-chart-summary`
**Category**: AI-Native
**File**: `src/components/ai-chart-summary/ai-chart-summary.ts`
**Priority**: P2-Medium

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. Raw rgba colors in badge backgrounds (lines 90-93) and trend hover (line 145)
2. CSS syntax error -- extra closing brace on line 183 before the style close
3. Missing keyboard handler on trend chips (has `tabindex` and `role="button"` but no `@keydown`)

---

## 1. Functional Issues

- **Line 46**: `box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05)` -- raw rgba.
- **Line 41**: `background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), transparent)` -- raw rgba.
- **Line 84**: `.type-badge` `font-size: 10px; padding: 1px` -- magic numbers not from token scale.
- **Line 90**: `.type-badge.summary` `background: rgba(59, 130, 246, 0.12)` -- raw rgba.
- **Line 91**: `.type-badge.anomaly` `background: rgba(239, 68, 68, 0.12)` -- raw rgba.
- **Line 92**: `.type-badge.forecast` `background: rgba(223, 255, 97, 0.12)` -- raw rgba.
- **Line 93**: `.type-badge.comparison` `background: rgba(139, 92, 246, 0.12); color: #a78bfa` -- raw rgba AND raw hex `#a78bfa`.
- **Line 139**: `.trend` `padding: 3px` -- magic number.
- **Line 145**: `.trend:hover` `background: rgba(255, 255, 255, 0.04)` -- raw rgba.
- **Line 80**: `.label` `letter-spacing: 0.5px` -- magic number.
- **Line 183**: Extra closing brace `}` before style close -- **CSS syntax error**.
- **Lines 259-260**: Trend chips have `role="button"` and `tabindex="0"` but no `@keydown` handler -- keyboard users can focus but not activate.

---

## 2. Interaction Issues

### 2.1 State Coverage
| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Default | Yes | Mostly | Good token usage for main styles |
| Hover (trend) | Yes | No | Raw rgba on line 145 |
| Hover (icon-btn) | Yes | Yes | Line 117 |
| Active | No | N/A | No pressed state on buttons/trends |
| Focus | Yes | Yes | Line 186-189 |
| Disabled | No | N/A | No disabled state |
| Loading | Yes | Yes | Lines 172-182 -- shimmer skeleton |
| Error | No | N/A | No error state for failed insight fetch |
| Empty | Yes | Yes | Returns `nothing` when no summary |
| Collapsed | Yes | Yes | Lines 154-155 |
| Compact | Yes | Yes | Lines 168-170 |

### 2.2 Keyboard Navigation
- Icon buttons (refresh, collapse) are `<button>` elements -- natively keyboard accessible.
- **Missing**: Trend chips (lines 259-260) have `role="button"` and `tabindex="0"` but no `@keydown` handler -- keyboard users cannot activate them with Enter/Space.
- Collapse toggle has `aria-expanded` -- good.

### 2.3 ARIA & Accessibility
- Container has `role="complementary"` and `aria-label` -- good.
- Refresh and collapse buttons have `aria-label` -- good.
- Collapse button has `aria-expanded` -- good.
- Trend chips have `aria-label` with direction info -- good.
- **Missing**: `@keydown` on trend chips for keyboard activation.
- AI dot has `aria-hidden="true"` -- good.

### 2.4 Touch & Mobile
- Compact mode reduces padding -- good for mobile.
- Button sizes (24x24) may be too small for touch targets (recommended 44x44).

---

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Suggested Token |
|------|-------|-----------------|
| 46 | `rgba(255, 255, 255, 0.05)` | `var(--cg-overlay-light-subtle)` |
| 41 | `rgba(255, 255, 255, 0.03)` | `var(--cg-overlay-light-minimal)` |
| 80 | `letter-spacing: 0.5px` | Should use `var(--cg-letter-spacing-wide, 0.05em)` |
| 84 | `font-size: 10px; padding: 1px` | `var(--cg-font-size-2xs, 10px)`, `var(--cg-spacing-1, 1px)` |
| 107 | `width: 24px; height: 24px` | `var(--cg-spacing-24, 24px)` |
| 139 | `padding: 3px` | `var(--cg-spacing-3, 3px)` or nearest token |

### 3.2 Raw Colors Found
| Line | Color | Suggested Token |
|------|-------|-----------------|
| 90 | `rgba(59, 130, 246, 0.12)` | `var(--cg-overlay-info-subtle)` |
| 91 | `rgba(239, 68, 68, 0.12)` | `var(--cg-overlay-error-subtle)` |
| 92 | `rgba(223, 255, 97, 0.12)` | `var(--cg-overlay-accent-subtle)` |
| 93 | `rgba(139, 92, 246, 0.12); color: #a78bfa` | Need token for purple overlay and text |
| 145 | `rgba(255, 255, 255, 0.04)` | `var(--cg-overlay-light-minimal)` |

### 3.3 Typography Issues
- `.type-badge` uses `font-size: 10px` -- should use token.
- `.time-range` uses `font-size: 10px` -- should use token.

### 3.4 Spacing Issues
- `.trend` padding uses `3px` -- not in standard spacing scale.
- `.type-badge` padding uses `1px` -- not in standard spacing scale.

### 3.5 Modern Design Enhancements
- Add error state for when AI insight generation fails.
- Consider adding a "confidence meter" visual (progress arc or bar).
- Add transition animation when collapsing/expanding.

---

## 4. Prioritized Fixes

### P0 - Critical
1. Add `@keydown` handler to trend chips (Enter/Space) for keyboard accessibility.
2. Fix CSS syntax error: remove extra `}` on line 183.

### P1 - High
3. Replace raw hex `#a78bfa` on line 93 with a token.
4. Replace all raw rgba badge backgrounds (lines 90-93) with overlay tokens.
5. Replace raw rgba hover background (line 145) with token.
6. Replace `rgba(255, 255, 255, 0.05/0.03)` with overlay tokens.

### P2 - Medium
7. Replace `font-size: 10px` instances with `var(--cg-font-size-2xs)`.
8. Replace `padding: 1px` and `padding: 3px` with nearest spacing tokens.
9. Add error state for failed insight generation.
10. Increase icon button touch target size for mobile.

### P3 - Low
11. Add collapse/expand transition animation.
12. Add confidence meter visual.
13. Replace `letter-spacing: 0.5px` with token.
14. Add active/pressed state on interactive elements.
