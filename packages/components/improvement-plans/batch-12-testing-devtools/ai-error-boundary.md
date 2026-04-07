# ai-error-boundary Improvement Plan

**Component**: `ai-error-boundary`
**Category**: AI-Native
**File**: `src/components/ai-error-boundary/ai-error-boundary.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Fair
**Top 3 Issues**:
1. Raw hex colors throughout: `#7f1d1d` border (line 32), `#fca5a5` text (lines 65, 75), plus non-standard token names (`--cg-color-bg-primary`, `--cg-color-bg-secondary`, `--cg-color-text-primary`, `--cg-color-border-primary`)
2. CSS syntax error: extra closing brace on line 159 prematurely closes the style block
3. Missing loading/retrying state -- after clicking Retry, there's no visual feedback that the retry is in progress

---

## 1. Functional Issues

- **CSS syntax error (line 159)**: An extra `}` after `.dismiss-btn:hover` closes the entire css template prematurely. Any styles that might follow would be excluded. While currently there are no styles after this, it indicates sloppy template closing.
- **No retry-in-progress state**: Clicking "Retry" (line 199) fires the `ai-error-retry` event but provides no visual indication that a retry is happening. The button remains clickable for repeated clicks.
- **No retry count / backoff**: The component has no concept of retry attempts. After multiple failures, it still shows the same "Retry" button with no escalation UI.
- **Non-standard token names**: Several CSS custom properties don't follow the `--cg-color-surface-*` / `--cg-color-status-*` naming convention used elsewhere:
  - `--cg-color-bg-primary` (line 32) -- should be `--cg-color-surface-container-background`
  - `--cg-color-bg-secondary` (lines 110, 154) -- should be `--cg-color-surface-overlay`
  - `--cg-color-text-primary` (lines 101, 155) -- should be `--cg-color-surface-base-text`
  - `--cg-color-text-secondary` (lines 83, 93, 112) -- should be `--cg-color-text-secondary` (may exist)
  - `--cg-color-border-primary` (line 156) -- should be `--cg-color-surface-container-border`
- **SVG icon hardcoded (line 178)**: Inline SVG with `width="16" height="16"` but the icon container has `font-size: 24px`. The sizes don't match, which may cause layout inconsistency.
- **No auto-dismiss**: For non-critical errors, there's no auto-dismiss timer option.

## 2. Interaction Issues

### 2.1 State Coverage
| State | Supported | Notes |
|-------|-----------|-------|
| Default | Yes | Error card displayed |
| Hover | Yes | `.retry-btn:hover`, `.dismiss-btn:hover`, `.details-toggle:hover` |
| Active | No | No `:active` press style |
| Focus | Yes | `:focus-visible` on all buttons (lines 103, 138) |
| Disabled | Partial | `.btn:disabled` styled (line 142) but never set by the component logic |
| Loading/Retrying | No | No spinner or loading state after retry click |
| Error (nested) | No | No handling if retry itself fails again |
| Empty | Yes | Returns `nothing` when `!this.error` (line 173) |
| Details expanded | Yes | `_showDetails` toggle (line 190) |

**Missing**: `:active`, retrying/loading, retry-failure escalation (3 missing).

### 2.2 Keyboard Navigation
- All interactive elements are native `<button>` elements -- good.
- Details toggle, retry, and dismiss buttons are all keyboard accessible.
- **Missing**: `Escape` key to dismiss the error.
- **Missing**: Auto-focus on the error card when it appears (since `role="alert"` with `aria-live="assertive"` is used, screen readers will announce it, but keyboard focus doesn't move to it).

### 2.3 ARIA & Accessibility
- Good: `role="alert"` with `aria-live="assertive"` on the error card (line 176) -- this will announce the error immediately to screen readers.
- Good: `aria-expanded` on details toggle (line 189).
- Good: `aria-hidden="true"` on the icon (line 178).
- **Issue**: The SVG icon `<span class="icon">` has no explicit `role="img"` or `role="presentation"`. The `aria-hidden="true"` is on the span, which is correct, but the SVG inside has `stroke="currentColor"` which inherits the `#fca5a5` raw color from `.icon` (not styled -- it inherits from `.title` color).
- **Issue**: Retry and dismiss buttons have no `aria-label`. The text content ("Retry", "Dismiss") is sufficient for screen readers, but adding context like "Retry failed request" would improve clarity.

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Context | Suggested Token |
|------|-------|---------|-----------------|
| 72 | `2px` | `.code-badge padding` | `var(--cg-spacing-2, 2px)` |
| 79 | `0.5px` | `.code-badge letter-spacing` | `var(--cg-letter-spacing-wide, 0.05em)` |
| 99 | `2px` | `.details-toggle text-underline-offset` | Acceptable browser rendering value |

### 3.2 Raw Colors Found
| Line | Value | Context | Suggested Token |
|------|-------|---------|-----------------|
| 32 | `#7f1d1d` | `.error-card border` | `var(--cg-color-status-error-border, #7f1d1d)` |
| 65 | `#fca5a5` | `.title color` | `var(--cg-color-status-error-text-default, #f87171)` or `var(--cg-red-300)` |
| 75 | `#fca5a5` | `.code-badge color` | Same as above |
| 74 | `rgba(239, 68, 68, 0.15)` | `.code-badge background` | `var(--cg-color-status-error-bg)` |
| 32 | `#18181b` fallback | `--cg-color-bg-primary` | Already has token but wrong name |
| 110 | `#27272a` fallback | `--cg-color-bg-secondary` | Should be `--cg-color-surface-overlay` |
| 155 | `#fafafa` fallback | `--cg-color-text-primary` | Should be `--cg-color-surface-base-text` |

### 3.3 Spacing Issues
- Most spacing uses tokens. Padding values are well-tokenized.

### 3.4 Modern Design Enhancements
- **Animated entrance**: The `fadeSlideIn` animation is good. Consider adding a subtle red glow/pulse on the border for urgency.
- **Retry spinner**: Show an inline spinner on the retry button during retry attempts.
- **Error severity levels**: Support `severity="warning" | "error" | "critical"` with different border colors and icons.
- **Collapsible error**: Allow the entire error card to be collapsed to a single-line banner.
- **Copy error details**: Add a "Copy" button to copy the error + details for bug reports.

## 4. Prioritized Fixes

### P0 - Critical
1. **Fix CSS syntax error** (line 159): Remove the extra closing brace after `.dismiss-btn:hover`
2. **Replace raw hex `#7f1d1d`** (line 32) with `var(--cg-color-status-error-border)`
3. **Replace raw hex `#fca5a5`** (lines 65, 75) with `var(--cg-color-status-error-text-default)` or appropriate red token

### P1 - High
4. Normalize non-standard token names: Replace `--cg-color-bg-primary` with `--cg-color-surface-container-background`, `--cg-color-bg-secondary` with `--cg-color-surface-overlay`, `--cg-color-text-primary` with `--cg-color-surface-base-text`, `--cg-color-border-primary` with `--cg-color-surface-container-border`
5. Replace `rgba(239, 68, 68, 0.15)` (line 74) with `var(--cg-color-status-error-bg)`
6. Add retrying/loading state: `@state() private _retrying = false` with spinner on retry button
7. Fix SVG icon size mismatch: Change `width="16" height="16"` to match `.icon` font-size or use `width="1em" height="1em"`

### P2 - Medium
8. Add `:active` press styles on buttons
9. Add `Escape` key to dismiss the error
10. Add `aria-label` context on retry and dismiss buttons
11. Replace `letter-spacing: 0.5px` (line 79) with `var(--cg-letter-spacing-wide)`
12. Replace `padding: 2px` (line 72) with `var(--cg-spacing-2, 2px)`
13. Add disabled state management: Disable retry button after max retries

### P3 - Low
14. Add error severity levels (`warning`, `error`, `critical`) with different visual treatments
15. Add copy-to-clipboard for error details
16. Add auto-dismiss timer option for non-critical errors
17. Add subtle red border glow animation for visual urgency
18. Consider auto-focus management when the error appears
