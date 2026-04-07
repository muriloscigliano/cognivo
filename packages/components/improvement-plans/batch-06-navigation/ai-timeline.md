# ai-timeline Improvement Plan

**Component**: `ai-timeline`
**Category**: AI-Native
**File**: `src/components/ai-timeline/ai-timeline.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Fair
**Top 3 Issues**:
1. Extensive raw rgba colors (6 instances) for dot backgrounds and pulse keyframes -- none use overlay tokens
2. Multiple magic numbers: positioning values, sizes, transitions, indeterminate animation percentages
3. `_expandedIndex` is a plain class property (line 216) not a `@state()` decorator -- mutations don't reliably trigger re-renders (works only because `requestUpdate()` is called manually on line 233)

---

## 1. Functional Issues

- **Line 216**: `_expandedIndex` is declared as `private _expandedIndex: number = -1` without `@state()`. While `requestUpdate()` is called on line 233, this is fragile. If any code path modifies `_expandedIndex` without calling `requestUpdate()`, the UI won't update. Should use `@state()`.
- **Lines 62-65**: Vertical connecting line uses absolute positioning with `left: 11px` and `top: 32px` -- these are magic numbers that will break if dot size changes (e.g., in compact mode where dot is 18px). The `left` should be calculated as `(dot-width / 2) - 1px`.
- **Line 185**: `max-height: 150px` on detail panel is a magic number. Long details get scrolled, but the value should be configurable.
- **Lines 152-155**: Indeterminate animation uses `translateX(-100%)`, `translateX(100%)`, `translateX(300%)` and `width: 40%` -- all magic numbers defining the animation behavior.
- **Line 68**: Vertical line background uses `linear-gradient(to bottom, var(--cg-gray-700), var(--cg-gray-800))` -- good token usage but could be a single token.

## 2. Interaction Issues

### 2.1 State Coverage
| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Pending | Yes | Yes | Gray background/border from tokens |
| Active | Yes | Partial | Background uses raw `rgba(223, 255, 97, 0.15)` (line 92) |
| Complete | Yes | Partial | Background uses raw `rgba(34, 197, 94, 0.15)` (line 98) |
| Error | Yes | Partial | Background uses raw `rgba(239, 68, 68, 0.15)` (line 102) |
| Hover | No | N/A | No hover state on steps despite having `cursor: pointer` |
| Focus-visible | Yes | Yes | Double-ring focus (line 197-198) |
| Expanded | Yes | Yes | Detail panel with fade animation |
| Disabled | No | N/A | No disabled step state |
| Loading | Yes | Yes | Active status serves as loading with pulse and indeterminate bar |

### 2.2 Keyboard Navigation
- Steps have `tabindex="0"` (line 254) -- all individually tabbable
- Enter/Space toggle detail expansion (line 256)
- **Missing**: No arrow key navigation between timeline steps (roving tabindex pattern)
- **Missing**: No Home/End key support to jump to first/last step
- **Missing**: No Escape key to collapse expanded detail

### 2.3 ARIA & Accessibility
- Container has `role="list"` and `aria-label="Execution timeline"` (line 250) -- good
- Steps have `role="listitem"` (line 252) -- correct
- Active step has `aria-current="step"` (line 253) -- excellent
- **Missing**: Expanded/collapsed state not announced -- steps should have `aria-expanded` to indicate detail panel visibility
- **Missing**: No `aria-label` on individual steps (only the label text is visible)
- **Missing**: Duration and tool information is not accessible to screen readers in a structured way

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Suggested Token |
|------|-------|-----------------|
| 57 | `translateX(-8px)` (fadeIn) | `var(--cg-motion-distance-sm, 8px)` |
| 63 | `left: 11px` (vertical line) | Should be `calc(var(--cg-size-timeline-dot, 24px) / 2 - 1px)` |
| 64 | `top: 32px` (vertical line) | Should be `calc(var(--cg-size-timeline-dot, 24px) + var(--cg-spacing-8, 8px))` |
| 65 | `bottom: -2px` (vertical line) | `calc(-1 * var(--cg-spacing-2, 2px))` |
| 74-75 | `width: 24px; height: 24px` (dot) | `var(--cg-size-timeline-dot, 24px)` |
| 84 | `transition: all 200ms` | `var(--cg-motion-duration-fast, 200ms)` |
| 114 | `padding-top: 2px` (content) | `var(--cg-spacing-2, 2px)` |
| 137-138 | `height: 3px; border-radius: 2px` (duration bar) | `var(--cg-border-width-thick, 3px)` and `var(--cg-border-radius-025, 2px)` |
| 153-155 | `translateX(-100%)`, `translateX(100%)`, `translateX(300%)`, `width: 40%` | Animation magic numbers -- document or tokenize |
| 166 | `font-size: 10px` (tool-tag) | `var(--cg-font-size-2xs, 10px)` |
| 167 | `padding: 2px` (tool-tag) | `var(--cg-spacing-2, 2px)` |
| 185 | `max-height: 150px` (detail) | `var(--cg-timeline-detail-max-height, 150px)` |
| 192 | `width: 18px; height: 18px` (compact dot) | `var(--cg-size-timeline-dot-compact, 18px)` |
| 192 | `font-size: 9px` (compact dot) | `var(--cg-font-size-3xs, 9px)` |

### 3.2 Raw Colors Found
| Line | Value | Suggested Token |
|------|-------|-----------------|
| 42 | `rgba(255, 255, 255, 0.05)` | `var(--cg-overlay-white-subtle)` |
| 43 | `rgba(255, 255, 255, 0.03)` | `var(--cg-overlay-white-ultra-subtle)` |
| 92 | `rgba(223, 255, 97, 0.15)` (active dot bg) | `var(--cg-overlay-accent-subtle)` |
| 98 | `rgba(34, 197, 94, 0.15)` (complete dot bg) | `var(--cg-overlay-success-subtle)` |
| 102 | `rgba(239, 68, 68, 0.15)` (error dot bg) | `var(--cg-overlay-danger-subtle)` |
| 109 | `rgba(223, 255, 97, 0.2)` (pulse start) | `var(--cg-overlay-accent-medium)` |
| 110 | `rgba(223, 255, 97, 0)` (pulse end) | `transparent` |

### 3.3 Spacing Issues
- Step padding uses `var(--cg-spacing-10)` -- good
- Tool tag and detail padding use spacing tokens -- mostly good
- Content padding-top is raw `2px` (line 114)

### 3.4 Modern Design Enhancements
- Add hover state on steps (subtle background change)
- Add Escape key to collapse expanded detail
- Add connecting line color transitions as steps complete
- Consider adding a "retrying" substatus for error steps
- Add horizontal timeline variant for dashboard layouts

## 4. Prioritized Fixes

### P0 - Critical
1. Add `@state()` decorator to `_expandedIndex` (line 216) instead of relying on manual `requestUpdate()`
2. Replace all 7 raw rgba color values with overlay tokens
3. Add `aria-expanded` on steps to communicate detail panel state

### P1 - High
4. Replace all 14+ magic number values with design tokens
5. Fix vertical line positioning to be relative to dot size (not hard-coded `left: 11px`, `top: 32px`)
6. Add roving tabindex with arrow key navigation between steps
7. Add hover state on timeline steps

### P2 - Medium
8. Add Escape key to close expanded detail
9. Add Home/End keyboard shortcuts
10. Make detail `max-height` configurable via CSS custom property
11. Add `aria-label` on steps including status and duration

### P3 - Low
12. Add horizontal variant
13. Add "retrying" substatus
14. Add connecting line color transition animation
15. Consider grouping steps by status phase
