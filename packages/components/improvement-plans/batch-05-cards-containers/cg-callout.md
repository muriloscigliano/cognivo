# cg-callout Improvement Plan

**Component**: `cg-callout`
**Category**: Foundation
**File**: `src/components/cg-callout/cg-callout.ts`
**Priority**: P2-Medium

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. Magic numbers in `.icon` (line 70: `margin-top: 1px`), `.dismiss` (line 101: `padding: 2px`), and `.title` (line 82: `margin-bottom: 2px`)
2. Raw `rgba()` colors in box-shadow and gradient overlay (lines 32-33)
3. Missing `disabled` state and no `aria-live` region for dynamic content

---

## 1. Functional Issues

- **Dismiss animation timing hardcoded**: Line 115 uses `200ms` in the `calloutExit` keyframe and line 153 uses `window.setTimeout(() => {...}, 200)`. If the animation duration changes, the timeout must be manually synced. Use `animationend` event instead.
- **No auto-dismiss/timeout feature**: Common callout pattern to auto-dismiss after N seconds. No `timeout` property.
- **SVG icons are simplistic**: The SVG path data in `_iconPaths` (lines 138-142) produces incomplete/rough icons -- e.g., the success icon path `M12 2a10 10 0 100 20 10 10 0 000-20zm-2 10l2 2 4-4` combines circle and checkmark in one path element without proper rendering (no fill/stroke distinction).
- **`role="alert"` always set**: Line 166 -- `role="alert"` causes screen readers to announce every render. For non-urgent info/neutral variants, `role="status"` would be more appropriate.

---

## 2. Interaction Issues

### 2.1 State Coverage
| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Default | Yes | Yes | 5 semantic variants all token-based |
| Hover | **No** | N/A | No hover state on the callout container |
| Active | N/A | N/A | Not interactive as a whole |
| Focus | Partial | Yes | Only dismiss button has focus-visible (line 107) |
| Disabled | **No** | N/A | Missing entirely |
| Dismissing | Yes | Yes | Exit animation with opacity+translate |
| Dismissed | Yes | N/A | Hidden via `setAttribute('hidden')` |
| Loading | **No** | N/A | No loading/skeleton state |

### 2.2 Keyboard Navigation
- Dismiss button is keyboard accessible with focus-visible styling (line 107). Good.
- No keyboard shortcut to dismiss (e.g., Escape key when focused).
- Callout itself is not focusable -- acceptable since it's not interactive beyond dismiss.

### 2.3 ARIA & Accessibility
- `role="alert"` on line 166 is too aggressive for `info` and `neutral` variants. Use `role="status"` or `role="note"` for non-urgent messages.
- No `aria-live` attribute -- screen readers may miss dynamically inserted callouts.
- Dismiss button has proper `aria-label="Dismiss"` (line 181). Good.

---

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Suggested Token |
|------|-------|----------------|
| 30 | `border: 1px solid` | Use `--cg-border-width-50` token |
| 66 | `width: 20px; height: 20px` | Use `--cg-spacing-20` token |
| 70 | `margin-top: 1px` | Use `--cg-spacing-1` or remove |
| 73 | `width: 18px; height: 18px` | Use `--cg-icon-size-sm` or `--cg-spacing-18` |
| 82 | `margin-bottom: 2px` | Use `--cg-spacing-2` token |
| 101 | `padding: 2px` | Use `--cg-spacing-2` token |
| 103 | `border-radius: 4px` | Use `--cg-border-radius-50` token |
| 108 | `width: 16px; height: 16px` | Use `--cg-spacing-16` token |

### 3.2 Raw Colors Found
| Line | Color | Suggested Token |
|------|-------|----------------|
| 32 | `rgba(255, 255, 255, 0.05)` | `--cg-color-surface-overlay-subtle` |
| 33 | `rgba(255, 255, 255, 0.03)` | `--cg-color-surface-overlay-faint` |
| 104 | `100ms` in transition | Use `--cg-motion-duration-fast` (already used elsewhere as 200ms -- verify scale) |

### 3.3 Typography Issues
- `.title` font-size uses `--cg-font-size-sm` token. Good.
- `.description` font-size uses `--cg-font-size-sm` token. Good.
- `.description` uses `opacity: 0.9` (line 88) instead of a semantic color token for secondary text.

### 3.4 Spacing Issues
- `.callout` gap and padding use tokens. Good.
- `.actions` margin-top uses token. Good.

### 3.5 Modern Design Enhancements
- Add subtle left-border accent (like `ai-alert-card`) as an alternative visual treatment.
- Add `compact` size variant for inline/toast usage.
- Consider animated icon entrance for attention-drawing variants (warning, danger).

---

## 4. Prioritized Fixes

### P0 - Critical
(None -- component is functional)

### P1 - High
1. **Fix `role` attribute**: Use `role="status"` for `info`/`neutral` variants, `role="alert"` only for `warning`/`danger`.
2. **Replace magic number sizing** in `.icon` (lines 66, 70, 73), `.dismiss` (lines 101, 103, 108) with design tokens.
3. **Replace raw `rgba()` overlay colors** (lines 32-33) with design tokens.
4. **Use `animationend` event** instead of hardcoded `setTimeout(200)` for dismiss timing (line 153).

### P2 - Medium
5. **Replace `opacity: 0.9`** on `.description` (line 88) with a semantic text color token.
6. **Add `auto-dismiss` timeout property** for transient notifications.
7. **Add `aria-live` attribute** to the callout container for dynamic insertion support.
8. **Replace hardcoded `border: 1px solid`** on line 30 with `--cg-border-width-50` token.

### P3 - Low
9. **Fix SVG icon quality** -- the combined path strings produce visually inconsistent icons. Use separate path elements or proper icon components.
10. **Add Escape key** dismiss handler when callout/dismiss button is focused.
11. **Add `compact` size variant** for inline/toast contexts.
