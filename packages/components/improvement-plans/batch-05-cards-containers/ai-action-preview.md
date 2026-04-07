# ai-action-preview Improvement Plan

**Component**: `ai-action-preview`
**Category**: AI-Native
**File**: `src/components/ai-action-preview/ai-action-preview.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Fair
**Top 3 Issues**:
1. CSS syntax error on lines 177-179 -- `@media (prefers-reduced-motion)` block is malformed, contains `button { transition: none; }` followed by a stray `}` that breaks the stylesheet
2. Raw `rgba()` colors in severity badge backgrounds (lines 76-90) -- 4 variants with raw colors
3. Auto-confirm countdown fires without requiring explicit user consent -- dangerous for critical/destructive actions

---

## 1. Functional Issues

- **CSS syntax error**: Lines 177-179 -- there's a stray `button { transition: none; }` followed by an extra `}` after the `@keyframes pulse-border` block. This appears to be a broken reduced-motion media query that was incorrectly closed.
- **Auto-confirm on countdown expiry is dangerous**: Lines 216-219 -- when `_remaining <= 0`, `_handleConfirm()` is called automatically. For `critical` severity actions ("Delete training data"), auto-confirming without explicit user consent is a severe UX anti-pattern.
- **`_confirmed` guard not reset**: Line 225 -- `_confirmed` is set to `true` on first confirm but never reset. If the component is reused (e.g., in a list), it cannot confirm again.
- **No Escape key handler**: Users expect Escape to cancel a confirmation dialog (`role="alertdialog"`), but no keyboard handler exists beyond the cancel button.
- **Countdown doesn't pause on focus**: If a user is reading the details, the countdown continues, potentially auto-confirming while they're reviewing.

---

## 2. Interaction Issues

### 2.1 State Coverage
| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Default | Yes | Yes | Token-based background/border |
| Hover | Partial | Partial | Cancel button hover tokenized; confirm uses `filter: brightness` |
| Active/Pressed | **No** | N/A | No press state on buttons |
| Focus | Yes | Yes | `--cg-brand-ai-accent` outline |
| Disabled | **No** | N/A | Missing -- buttons should disable during countdown or after confirm |
| Loading | **No** | N/A | No loading state for async confirmation |
| Critical pulse | Yes | Partial | `pulse-border` animation uses raw `rgba()` |
| Countdown | Yes | Yes | Timer with branded accent number |
| Confirmed | Partial | N/A | Event fires but no visual confirmation state |

### 2.2 Keyboard Navigation
- Card has `tabindex="0"` (line 259). Good for initial focus.
- **Missing Escape key handler**: `role="alertdialog"` semantically requires Escape to dismiss/cancel.
- Buttons are `<button>` elements -- natively keyboard accessible. Good.
- **Focus trap missing**: An `alertdialog` should trap focus within itself. Currently focus can leave the component.

### 2.3 ARIA & Accessibility
- `role="alertdialog"` with `aria-label`. Correct for confirmation dialogs.
- Severity badge has `aria-label="Severity: {level}"`. Good.
- Countdown has `aria-live="polite"`. Good.
- Details list uses `role="list"` and `role="listitem"`. Good.
- **Missing `aria-describedby`**: The `alertdialog` should reference the description/details for screen readers.
- **Missing focus management**: On mount, focus should move to the cancel button (safest default) per alertdialog pattern.

---

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Suggested Token |
|------|-------|----------------|
| 32 | `animation: fadeSlideIn 200ms` | Use `--cg-motion-duration-fast` token |
| 42 | `inset 0 1px 0 0 rgba(255, 255, 255, 0.05)` | `--cg-shadow-inner-subtle` |
| 68 | `padding: 3px` | `--cg-spacing-4` (nearest) |
| 69 | `border-radius: 99px` | `--cg-border-radius-full` |
| 73 | `letter-spacing: 0.04em` | `--cg-letter-spacing-wide` |
| 96 | `line-height: 1.5` | `--cg-line-height-normal` |
| 175 | `box-shadow: 0 0 0 0 rgba(248, 113, 113, 0.3)` | Token-derived |
| 176 | `box-shadow: 0 0 0 6px rgba(248, 113, 113, 0)` | Token-derived |

### 3.2 Raw Colors Found
| Line | Color | Suggested Token |
|------|-------|----------------|
| 36 | `rgba(255, 255, 255, 0.03)` | `--cg-color-surface-overlay-faint` |
| 42 | `rgba(255, 255, 255, 0.05)` | `--cg-color-surface-overlay-subtle` |
| 76 | `rgba(34, 197, 94, 0.12)` | `--cg-color-status-success-bg` |
| 80 | `rgba(245, 158, 11, 0.12)` | `--cg-color-status-warning-bg` |
| 84 | `rgba(249, 115, 22, 0.12)` | `--cg-color-status-urgent-bg` |
| 88 | `rgba(239, 68, 68, 0.15)` | `--cg-color-status-error-bg` |
| 175 | `rgba(248, 113, 113, 0.3)` | Derive from `--cg-red-400` |

### 3.3 Typography Issues
- All font sizes use `--cg-font-size-*` tokens. Good.
- Font-weight `700`, `600`, `500` used directly -- should use `--cg-font-weight-bold`, `--cg-font-weight-semibold`, `--cg-font-weight-medium`.

### 3.4 Spacing Issues
- Most spacing values use `--cg-spacing-*` tokens. Good.
- `padding: 3px` (line 68) not on the spacing scale.

### 3.5 Modern Design Enhancements
- Add visual countdown progress bar (circular or linear) instead of just text.
- Add shake animation on critical severity for emphasis.
- Add confirmation checkmark animation after confirming.
- Add backdrop overlay option for modal usage.

---

## 4. Prioritized Fixes

### P0 - Critical
1. **Fix CSS syntax error** on lines 177-179 -- properly close the reduced-motion media query block.
2. **Remove or guard auto-confirm on countdown expiry** -- for `critical` and `high` severity, require explicit click. Auto-confirm only for `low`/`medium`.
3. **Add Escape key handler** to cancel -- required by `alertdialog` pattern.

### P1 - High
4. **Add focus management** -- auto-focus the cancel button on mount for safety.
5. **Add focus trap** within the alertdialog.
6. **Replace 7 raw `rgba()` severity colors** (lines 76-88) with semantic status tokens.
7. **Add `aria-describedby`** pointing to description and details for screen reader context.
8. **Reset `_confirmed` flag** when component properties change or on reconnect.

### P2 - Medium
9. **Replace raw overlay `rgba()` values** (lines 36, 42) with design tokens.
10. **Add disabled state** for buttons -- disable confirm during countdown or after confirmation.
11. **Add visual confirmation state** -- checkmark/success feedback after confirming.
12. **Replace `filter: brightness(0.9)`** (line 168) with explicit hover color token.
13. **Tokenize font-weight values** and `letter-spacing`.
14. **Pause countdown on focus/hover** to prevent accidental auto-confirm.

### P3 - Low
15. **Add visual countdown progress bar** (circular/linear).
16. **Add loading state** for async confirmation.
17. **Tokenize `padding: 3px`** to nearest spacing token.
18. **Tokenize `border-radius: 99px`** to `--cg-border-radius-full`.
