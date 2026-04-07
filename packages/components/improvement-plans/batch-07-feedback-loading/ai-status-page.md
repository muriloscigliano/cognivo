# AI Status Page Improvement Plan

**Component**: `ai-status-page`
**Category**: AI-Native
**File**: `src/components/ai-status-page/ai-status-page.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Fair
**Top 3 Issues**:
1. Extensive use of raw hex colors `#22c55e`, `#eab308`, `#3b82f6` without semantic tokens (lines 79-87, 162-164)
2. Multiple raw `rgba()` colors for status backgrounds (lines 79-82)
3. Magic numbers for widths, heights, letter-spacing, and min-widths (lines 57-58, 77, 151, 170, 177)

---

## 1. Functional Issues

- **Inconsistent token naming**: Line 39 uses `--cg-color-bg-primary` and line 53 uses `--cg-color-border-primary`, while most other components use `--cg-color-surface-container-background` and `--cg-color-surface-container-border`. This suggests the component may be using outdated or non-standard token names.
- **No empty state**: If `services` is an empty array, the component renders an empty `.service-list` div with no helpful message. Should show "No services configured" or similar.
- **No refresh/polling mechanism**: A status page typically auto-refreshes. Consider adding a `refreshInterval` property and emitting a `refresh` event, or at least a manual refresh button.
- **Latency bar width formula**: Line 236 uses `(svc.latency / 1000) * 100` which caps at 1000ms for 100%. Latencies above 1000ms show a full bar. Consider making the max configurable.

## 2. Interaction Issues

### 2.1 State Coverage
- **States present**: Operational, degraded, down, maintenance for each service. Overall status derived from worst service.
- **Missing**: No "loading" state while fetching service data.
- **Missing**: No "unknown" status for services that fail to report.
- **Missing**: Service items have `cursor: pointer` and click handler but no visual indication they are interactive (no chevron, no underline, no hover arrow).

### 2.2 ARIA & Live Regions
- Line 213: `role="region"` with `aria-label="System status"` is correct.
- Line 220: `role="list"` on service list and `role="listitem"` on buttons. However, using `<button>` with `role="listitem"` is unusual -- the implicit `role="button"` is overridden. Consider using `<div role="listitem">` containing a `<button>`.
- **Issue**: Status changes are not announced. If a service transitions from operational to down, there is no `aria-live` region to announce the change.
- **Issue**: The overall status badge has no `aria-live` region.

### 2.3 Motion & prefers-reduced-motion
- The component imports `reducedMotion` and uses `fadeSlideIn` entry animation.
- **Issue**: No locally defined animations exist besides the entry animation, which is covered by the shared mixin. However, the `transition: background 150ms ease` on `.service-item:hover` (line 108) should use a motion token.
- The component is relatively static (no ongoing animations), so motion support is mostly adequate.

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Code | Should Be |
|------|------|-----------|
| 52 | `padding-bottom: 16px` | `var(--cg-spacing-16, 16px)` |
| 57 | `width: 12px; height: 12px` | `var(--cg-spacing-12, 12px)` |
| 58 | `height: 12px` | `var(--cg-spacing-12, 12px)` |
| 77 | `letter-spacing: 0.3px` | Should use a letter-spacing token if available |
| 92 | `gap: 2px` | `var(--cg-spacing-2, 2px)` |
| 108 | `transition: background 150ms ease` | `var(--cg-motion-duration-fast, 150ms)` |
| 120 | `width: 8px; height: 8px` | `var(--cg-spacing-8, 8px)` |
| 151 | `width: 40px` | `var(--cg-spacing-40, 40px)` |
| 152 | `height: 4px` | `var(--cg-spacing-4, 4px)` |
| 153 | `border-radius: 2px` | `var(--cg-border-radius-025, 2px)` |
| 159 | `border-radius: 2px` | `var(--cg-border-radius-025, 2px)` |
| 170 | `min-width: 52px` | Consider using a token or auto width |
| 177 | `min-width: 90px` | Consider using a token or auto width |

### 3.2 Raw Colors Found
| Line | Code | Should Be |
|------|------|-----------|
| 79 | `rgba(34,197,94,0.15); color: #22c55e` | Use `--cg-color-status-success-*` tokens |
| 80 | `rgba(234,179,8,0.15); color: #eab308` | Use `--cg-color-status-warning-*` tokens |
| 81 | `rgba(239,68,68,0.15)` | Use `color-mix()` with error token |
| 82 | `rgba(59,130,246,0.15); color: #3b82f6` | Use `--cg-color-status-info-*` tokens |
| 84 | `background: #22c55e` | `var(--cg-color-status-success-text-default, #22c55e)` |
| 85 | `background: #eab308` | `var(--cg-color-status-warning-text-default, #eab308)` |
| 87 | `background: #3b82f6` | `var(--cg-color-status-info-text-default, #3b82f6)` |
| 162 | `background: #22c55e` (fast) | `var(--cg-color-status-success-text-default, #22c55e)` |
| 163 | `background: #eab308` (mid) | `var(--cg-color-status-warning-text-default, #eab308)` |

### 3.3 Animation Token Usage
- Line 34: Entry animation uses `--cg-motion-duration-fast` and `--cg-motion-easing-color` tokens correctly.
- Line 108: `transition: background 150ms ease` -- should use `var(--cg-motion-duration-fast, 150ms) var(--cg-motion-easing-default)`.
- Line 160: `transition: width 300ms ease` -- should use `var(--cg-motion-duration-normal, 300ms)`.

### 3.4 Modern Design Enhancements
- Add animated pulse dot for "down" status services (red pulsing dot).
- Add a last-updated timestamp display at the bottom.
- Consider adding micro-charts (sparklines) for latency history.
- The overall status section could have a subtle animated gradient background matching the status color.
- Add hover cards on service items showing detailed info (uptime history, latency graph).

## 4. Prioritized Fixes

### P0 - Critical
- None

### P1 - High
- Replace all raw hex colors (`#22c55e`, `#eab308`, `#3b82f6`) with semantic status tokens (13+ instances across lines 79-87, 162-164)
- Replace all raw `rgba()` status backgrounds with `color-mix()` expressions using semantic tokens
- Standardize token naming: replace `--cg-color-bg-primary` and `--cg-color-border-primary` with the standard `--cg-color-surface-*` tokens used elsewhere
- Add `aria-live="polite"` region for status changes

### P2 - Medium
- Replace magic number widths, heights, gaps, and border-radii with spacing/radius tokens (~13 instances)
- Replace transition duration/easing with motion tokens
- Fix `<button role="listitem">` semantic issue -- use proper list structure
- Add empty state when no services provided
- Add loading state

### P3 - Low
- Add animated pulse for down status dots
- Add last-updated timestamp
- Add refresh mechanism (property + event)
- Make latency bar max configurable
- Add visual interaction affordance (chevron/arrow) on service items
