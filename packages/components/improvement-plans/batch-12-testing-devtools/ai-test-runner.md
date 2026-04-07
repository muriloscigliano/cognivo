# ai-test-runner Improvement Plan

**Component**: `ai-test-runner`
**Category**: AI-Native
**File**: `src/components/ai-test-runner/ai-test-runner.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Fair
**Top 3 Issues**:
1. Extensive raw hex colors: `#4ade80` (lines 103, 118, 170, 214), `#f87171` (lines 104, 125, 171, 215), `#facc15` (lines 105, 172, 221) used without any token reference
2. Many magic number padding/gap values throughout (lines 67, 94, 130, 145, 197, 204, 207, 211)
3. Missing disabled, error, and empty states

---

## 1. Functional Issues

- **No empty state**: When `tests` array is empty, the component renders an empty `test-list` div with no content or guidance message.
- **No error handling**: If `tests` array contains malformed entries (missing `name` or `status`), the component will render broken rows with no graceful fallback.
- **Division by zero guarded (line 266)**: `const total = this.tests.length || 1` prevents NaN but silently shows 0% progress for empty tests, which is misleading.
- **`_expanded` Set reactivity**: Using `new Set(this._expanded)` in `_toggle` (line 240) is correct for Lit reactivity, but the Set is not serializable, which could cause issues with SSR or debugging.
- **No "Run All" disabled state during execution**: The Run All button (line 273) remains active even when tests are already running, potentially triggering duplicate runs.

## 2. Interaction Issues

### 2.1 State Coverage
| State | Supported | Notes |
|-------|-----------|-------|
| Default | Yes | |
| Hover | Yes | `.test-header:hover` (line 156) |
| Active | No | No `:active` press style |
| Focus | Yes | `:focus-visible` on buttons (lines 79, 160) |
| Disabled | No | No disabled state for Run All or test items |
| Loading/Running | Partial | Spinner for running tests (line 217-225), but no disabled Run All |
| Error | No | No error display state |
| Empty | No | No empty state when `tests.length === 0` |
| Expanded | Yes | `_expanded` set toggle per test (line 239) |

**Missing**: `:active`, disabled, error, empty states (4 missing).

### 2.2 Keyboard Navigation
- Test headers are `<button>` elements with native keyboard support -- good.
- Run All button is also a `<button>` -- good.
- Redundant `tabindex="0"` on native buttons (lines 274, 293).
- **Missing**: Arrow key navigation in the test list for quick traversal.
- **Missing**: Keyboard shortcut for "Run All" (e.g., `Ctrl+Shift+R`).

### 2.3 ARIA & Accessibility
- Good: `role="list"` with `aria-label="Tests"` on test list (line 288).
- Good: `role="listitem"` on each test (line 290).
- Good: `aria-expanded` on test headers (line 293).
- Good: `role="status"` on summary bar (line 278).
- Good: `aria-label="Run all tests"` on button (line 274).
- **Issue**: The spinner (line 260) has `role="status"` but no visible text alternative in the DOM context -- `aria-label="Running"` is good but the parent status icon span is missing `role`.
- **Issue**: Progress bar (line 284) is `aria-hidden="true"` which is fine, but the pass/fail percentages are not announced elsewhere. Consider adding visually-hidden text.

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Context | Suggested Token |
|------|-------|---------|-----------------|
| 67 | `4px` | `.run-btn gap` | `var(--cg-spacing-4, 4px)` |
| 72 | `6px 14px` | `.run-btn padding` | `var(--cg-spacing-6, 6px) var(--cg-spacing-14, 14px)` |
| 94 | `4px` | `.summary-item gap` | `var(--cg-spacing-4, 4px)` |
| 98 | `8px` | `.dot width/height` | `var(--cg-spacing-8, 8px)` |
| 109 | `4px` | `.progress-bar height` | `var(--cg-spacing-4, 4px)` |
| 110 | `2px` | `.progress-bar border-radius` | `var(--cg-border-radius-25, 2px)` |
| 130 | `4px` | `.test-list gap` | `var(--cg-spacing-4, 4px)` |
| 144 | `8px` | `.test-header gap` | `var(--cg-spacing-8, 8px)` |
| 145 | `8px 12px` | `.test-header padding` | `var(--cg-spacing-8, 8px) var(--cg-spacing-12, 12px)` |
| 166 | `14px` | `.status-icon font-size` | `var(--cg-font-size-sm, 14px)` |
| 197 | `8px 12px 12px 32px` | `.test-details padding` | Use spacing tokens |
| 204 | `8px` | `.detail-row gap` | `var(--cg-spacing-8, 8px)` |
| 205 | `4px` | `.detail-row margin-bottom` | `var(--cg-spacing-4, 4px)` |
| 210 | `64px` | `.detail-label min-width` | Use token or auto-sizing |
| 218 | `14px` | `.spinner width/height` | `var(--cg-spacing-14, 14px)` |
| 220 | `2px` | `.spinner border` | Use token |

### 3.2 Raw Colors Found
| Line | Value | Context | Suggested Token |
|------|-------|---------|-----------------|
| 103 | `#4ade80` | `.dot-pass` | `var(--cg-color-status-success-text-default, #4ade80)` |
| 104 | `#f87171` | `.dot-fail` | `var(--cg-color-status-error-text-default, #f87171)` |
| 105 | `#facc15` | `.dot-running` | `var(--cg-color-status-warning-text-default, #facc15)` |
| 118 | `#4ade80` | `.progress-pass` | `var(--cg-color-status-success-text-default, #4ade80)` |
| 125 | `#f87171` | `.progress-fail` | `var(--cg-color-status-error-text-default, #f87171)` |
| 170 | `#4ade80` | `.icon-pass` | `var(--cg-color-status-success-text-default, #4ade80)` |
| 171 | `#f87171` | `.icon-fail` | `var(--cg-color-status-error-text-default, #f87171)` |
| 172 | `#facc15` | `.icon-running` | `var(--cg-color-status-warning-text-default, #facc15)` |
| 214 | `#4ade80` | `.detail-expected` | `var(--cg-color-status-success-text-default, #4ade80)` |
| 215 | `#f87171` | `.detail-actual` | `var(--cg-color-status-error-text-default, #f87171)` |
| 221 | `#facc15` | `.spinner border` | `var(--cg-color-status-warning-text-default, #facc15)` |

### 3.3 Spacing Issues
- Most outer spacing uses tokens, but inner element paddings/gaps are almost all hardcoded pixel values (see magic numbers table above).

### 3.4 Modern Design Enhancements
- **Animated progress bar**: Consider a shimmer/pulse on the progress bar during running state.
- **Staggered list animation**: Use `fadeSlideIn` with staggered delays on test items for a polished entrance.
- **Hover elevation**: Add subtle `box-shadow` on `.test-item:hover` for depth.
- **Running indicator glow**: The running dot could pulse with a `@keyframes` animation.

## 4. Prioritized Fixes

### P0 - Critical
1. **Replace all 11 raw hex colors** with semantic status tokens (`--cg-color-status-success-*`, `--cg-color-status-error-*`, `--cg-color-status-warning-*`)

### P1 - High
2. Replace all 16+ magic number pixel values with `--cg-spacing-*` and `--cg-border-radius-*` tokens
3. Add empty state rendering when `tests.length === 0`
4. Disable "Run All" button when tests are currently running (`_runningCount > 0`)
5. Add `:active` press states for buttons

### P2 - Medium
6. Add loading skeleton state for the whole component (before test data arrives)
7. Add error state for malformed test data
8. Remove redundant `tabindex="0"` from native `<button>` elements (lines 274, 293)
9. Add visually-hidden text for progress bar pass/fail percentages
10. Add pulse animation on running status dots

### P3 - Low
11. Add arrow key navigation within test list
12. Add staggered entrance animation for test items
13. Add hover elevation (`box-shadow`) on test items
14. Consider keyboard shortcut for Run All
