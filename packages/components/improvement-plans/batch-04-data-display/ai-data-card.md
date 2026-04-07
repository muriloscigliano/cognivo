# ai-data-card Improvement Plan

**Component**: `ai-data-card`
**Category**: AI-Native
**File**: `src/components/ai-data-card/ai-data-card.ts`
**Priority**: P2-Medium

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. Raw rgba colors in badge/status backgrounds (lines 111-114, 209-213, 84) not using overlay tokens
2. Several magic numbers in header-icon background opacity and transitions
3. Missing keyboard support on rows that lack `copyable` or `url` (always emits row-click but only some rows are keyboard-focusable)

---

## 1. Functional Issues

- **Line 50**: `box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05)` -- raw rgba.
- **Line 54**: `background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), transparent)` -- raw rgba.
- **Line 84**: `background: rgba(223, 255, 97, 0.08)` -- raw rgba for header-icon bg.
- **Line 111**: `background: rgba(34, 197, 94, 0.12)` -- raw rgba for success badge.
- **Line 112**: `background: rgba(245, 158, 11, 0.12)` -- raw rgba for warning badge.
- **Line 113**: `background: rgba(239, 68, 68, 0.12)` -- raw rgba for error badge.
- **Line 114**: `background: rgba(59, 130, 246, 0.12)` -- raw rgba for info badge.
- **Line 134**: `background: rgba(255, 255, 255, 0.02)` -- raw rgba for row hover.
- **Line 209-213**: Same raw rgba pattern in `.val-badge` variants.
- **Line 255**: `background: rgba(255, 255, 255, 0.03)` -- raw rgba for action-btn hover.
- **Line 291**: `box-shadow: 0 0 0 1px rgba(223, 255, 97, 0.1)` -- raw rgba for highlighted state.
- **Lines 480-485**: All rows emit `row-click` on click, but only rows with `copyable || url` have `tabindex="0"`. This means clicking a row without these flags fires the event but is inaccessible via keyboard.

---

## 2. Interaction Issues

### 2.1 State Coverage
| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Default | Yes | Mostly | Some raw rgba |
| Hover (card) | Yes | Yes | Line 61-65 uses tokens |
| Hover (row) | Yes | No | Line 134 raw rgba |
| Hover (action) | Yes | No | Line 255 raw rgba |
| Active | No | N/A | No pressed state on buttons |
| Focus (row) | Yes | Yes | Line 140-142 |
| Focus (action) | Yes | Yes | Line 258-260 |
| Disabled | Yes | Yes | Line 262-264 on action buttons |
| Loading | Yes | Yes | Skeleton with shimmer (lines 294-310) |
| Error | No | N/A | No error display state |
| Empty | Yes | Yes | Line 312-317 |
| Highlighted | Yes | Partial | Line 289-292, raw rgba |
| Compact | Yes | Yes | Lines 279-286 |

### 2.2 Keyboard Navigation
- Action buttons are native `<button>` -- keyboard accessible.
- Copyable/linked rows have `tabindex="0"` and `@keydown` -- good.
- **Issue**: Non-copyable, non-linked rows still dispatch `row-click` on click but have `tabindex="-1"`.
- Copy button is keyboard accessible -- good.

### 2.3 ARIA & Accessibility
- Card has `role="region"` and `aria-label` -- good (line 462).
- Rows have `role="listitem"` and `aria-label` -- good.
- Row container has `role="list"` -- good (line 478).
- Copy button has `aria-label` -- good (line 492).
- Action buttons have `aria-label` -- good (line 509).
- Header icon has `aria-hidden="true"` -- good.
- Action icon has `aria-hidden="true"` -- good.

### 2.4 Touch & Mobile
- Compact mode with reduced padding -- good for mobile.
- Copy button and action buttons have adequate size.
- URL sanitization present -- good security practice (line 365-368).

---

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Suggested Token |
|------|-------|-----------------|
| 50 | `rgba(255, 255, 255, 0.05)` | `var(--cg-overlay-light-subtle)` |
| 54 | `rgba(255, 255, 255, 0.03)` | `var(--cg-overlay-light-minimal)` |
| 134 | `rgba(255, 255, 255, 0.02)` | `var(--cg-overlay-light-faint)` or nearest token |
| 255 | `rgba(255, 255, 255, 0.03)` | `var(--cg-overlay-light-minimal)` |

### 3.2 Raw Colors Found
| Line | Color | Suggested Token |
|------|-------|-----------------|
| 84 | `rgba(223, 255, 97, 0.08)` | `var(--cg-overlay-accent-faint)` |
| 111 | `rgba(34, 197, 94, 0.12)` | `var(--cg-overlay-success-subtle)` |
| 112 | `rgba(245, 158, 11, 0.12)` | `var(--cg-overlay-warning-subtle)` |
| 113 | `rgba(239, 68, 68, 0.12)` | `var(--cg-overlay-error-subtle)` |
| 114 | `rgba(59, 130, 246, 0.12)` | `var(--cg-overlay-info-subtle)` |
| 209-213 | Same pattern | Same tokens |
| 275 | `rgba(239, 68, 68, 0.08)` | `var(--cg-overlay-error-faint)` |
| 275 | `rgba(239, 68, 68, 0.3)` | Token needed |
| 291 | `rgba(223, 255, 97, 0.1)` | `var(--cg-overlay-accent-subtle)` |

### 3.3 Typography Issues
- All font sizes properly tokenized.
- Font family for mono values properly tokenized.

### 3.4 Spacing Issues
- All spacing values properly tokenized.

### 3.5 Modern Design Enhancements
- Add error state for data loading failures.
- Add transition animation for skeleton -> content.
- Consider drag-to-reorder rows capability.
- Add collapsed/expandable rows for complex data.

---

## 4. Prioritized Fixes

### P0 - Critical
None -- component is functional.

### P1 - High
1. Replace all raw rgba badge backgrounds (lines 111-114, 209-213) with overlay tokens.
2. Replace raw rgba `rgba(223, 255, 97, 0.08)` header-icon bg with token.
3. Fix keyboard inconsistency: either add `tabindex="0"` to all rows that emit click events, or only emit click for rows that are explicitly interactive.
4. Replace `box-shadow` and `background-image` raw rgba values with tokens.

### P2 - Medium
5. Replace row hover `rgba(255, 255, 255, 0.02)` with token.
6. Replace action button hover `rgba(255, 255, 255, 0.03)` with token.
7. Replace highlighted card `rgba(223, 255, 97, 0.1)` with token.
8. Replace danger button hover `rgba(239, 68, 68, 0.08)` with token.
9. Add error state for data load failures.

### P3 - Low
10. Add active/pressed state on action buttons.
11. Add skeleton -> content transition.
12. Add expandable rows for complex data.
13. Consider drag-to-reorder capability.
