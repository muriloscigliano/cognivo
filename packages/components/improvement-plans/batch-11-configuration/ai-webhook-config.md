# AI Webhook Config Improvement Plan

**Component**: `ai-webhook-config`
**Category**: AI-Native
**File**: `src/components/ai-webhook-config/ai-webhook-config.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. Inline styles with raw hex on the Delete button (line 419) -- `style="color:#f87171;border-color:#f87171"` completely bypasses the token system
2. No URL validation on webhook creation -- `_onCreate()` only checks if URL is non-empty (line 329)
3. Multiple magic numbers in toggle dimensions, event chip padding, form spacing (lines 221-222, 246, 249, 128)

---

## 1. Functional Issues

- **Line 419**: The Delete button uses inline `style="color:#f87171;border-color:#f87171"`. This raw hex in an inline style is completely immune to theming and violates the token system. Should use a CSS class instead.
- **Line 329**: `_onCreate()` only checks `if (!this._newUrl) return;`. No URL format validation. Invalid URLs (e.g., "not a url") would be dispatched to the parent.
- **Line 328**: Creating a webhook with no selected events is allowed. Should validate that at least one event is selected.
- **Lines 316-320**: `_toggleForm()` resets state when toggling the form. If the user accidentally clicks "Cancel", all entered data is lost. Consider a confirmation.

## 2. Interaction Issues

### 2.1 State Coverage
| State | Implemented | Notes |
|-------|------------|-------|
| Default | Yes | |
| Hover | Yes | `.add-btn:hover` (line 78), `.btn-sm:hover` (line 167) |
| Focus-visible | Yes | Multiple elements have `:focus-visible` |
| Active webhook | Yes | Toggle checked styling (line 254) |
| Form visible | Yes | `_showForm` state (line 312) |
| Empty | Yes | `.empty` (line 300) |
| Disabled | **No** | No disabled state on form inputs or buttons |
| Loading | **No** | No loading state during webhook test/create |
| Error | **No** | No error state for failed tests or invalid URLs |
| Active/pressed | **No** | No `:active` on buttons |
| Test in progress | **No** | No visual feedback during webhook test |

**Missing states**: disabled, loading, error, active/pressed, test-in-progress (5 of 8+ required).

### 2.2 Keyboard Navigation
- **All buttons** have `tabindex="0"` and are natively focusable.
- **Event chips** have `tabindex="0"` and `focus-visible` -- good.
- **URL input** is natively focusable with `focus-visible` -- good.
- **Toggle switches** are native checkboxes with `focus-visible` -- good.
- **Missing**: No keyboard shortcut to toggle form (e.g., pressing "N" to add new).
- **Missing**: No arrow-key navigation between webhook items.
- **Missing**: No Escape key to close the form.

### 2.3 ARIA & Accessibility
- **Line 369**: `role="form"` with `aria-label="New webhook form"` -- good.
- **Line 376**: Event selection chips use `role="group"` with `aria-label` -- good.
- **Line 379**: Event chips use `aria-pressed` -- excellent.
- **Line 395**: `role="list"` with `aria-label` -- good.
- **Line 397**: `role="listitem"` -- good.
- **Line 402**: Toggle `aria-label="Toggle webhook ${wh.url}"` -- good.
- **Missing**: Test and delete buttons should have more descriptive `aria-label` that includes the webhook URL.

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Property | Value | Suggested Token |
|------|----------|-------|-----------------|
| 128 | `padding` | `3px` | `var(--cg-spacing-3, 3px)` |
| 132 | `font-size` | `10px` | `var(--cg-font-size-2xs, 10px)` |
| 221 | `width` | `32px` | Component-specific token |
| 222 | `height` | `18px` | Component-specific token |
| 246 | `width` | `12px` | `var(--cg-spacing-12, 12px)` |
| 247 | `height` | `12px` | `var(--cg-spacing-12, 12px)` |
| 249 | `top` | `2px` | `var(--cg-spacing-2, 2px)` |
| 250 | `left` | `2px` | `var(--cg-spacing-2, 2px)` |
| 260 | `transform: translateX(14px)` | `14px` | `var(--cg-spacing-14, 14px)` |
| 237 | `border-radius` | `9px` | `var(--cg-border-radius-100, 9px)` |
| 277 | `padding` | `2px` | `var(--cg-spacing-2, 2px)` |
| 280 | `font-size` | `10px` | `var(--cg-font-size-2xs, 10px)` |
| 291 | `font-size` | `10px` | `var(--cg-font-size-2xs, 10px)` |

### 3.2 Raw Colors Found
| Line | Value | Context | Suggested Token |
|------|-------|---------|-----------------|
| 42 | `rgba(255, 255, 255, 0.05)` | box-shadow inset | `var(--cg-color-surface-highlight)` |
| 43 | `rgba(255, 255, 255, 0.03)` | background gradient | `var(--cg-color-surface-gradient-start)` |
| 144 | `rgba(223, 255, 97, 0.15)` | `.event-chip[aria-pressed="true"]` bg | `var(--cg-brand-ai-accent-alpha-15)` |
| 255 | `rgba(223, 255, 97, 0.2)` | toggle checked bg | `var(--cg-brand-ai-accent-alpha-20)` |
| 278 | `rgba(223, 255, 97, 0.1)` | `.event-tag` bg | `var(--cg-brand-ai-accent-alpha-10)` |
| 419 | `#f87171` (inline style) | Delete button color | `var(--cg-red-400, #f87171)` via CSS class |

### 3.3 Spacing Issues
- Toggle switch dimensions (32x18) and thumb (12x12) should be component-level CSS custom properties.
- Event chip padding `3px 8px` mixes magic number with token.

### 3.4 Modern Design Enhancements
- Add a webhook status indicator (green dot for recently successful, red for failing).
- Add a "test in progress" spinner or animation on the test button.
- Consider a delivery log/history section for each webhook.
- Form could validate URL format in real-time and show inline validation feedback.
- Add a "Copy URL" button on each webhook item.

## 4. Prioritized Fixes

### P0 - Critical
1. **Remove inline style** on Delete button (line 419) -- replace with a `.btn-sm.danger` CSS class using tokens.

### P1 - High
2. **Add URL validation** in `_onCreate()` -- check for valid URL format before dispatching.
3. **Add event selection validation** -- require at least one event before creating.
4. **Replace all `rgba()` literals** with semantic tokens.
5. **Replace all magic numbers** listed in 3.1 with design tokens.

### P2 - Medium
6. **Add loading/test-in-progress state** -- show spinner on test button during webhook test.
7. **Add error state** for failed tests or creation errors.
8. **Add disabled state** for form elements during submission.
9. **Add Escape key** to close the form.
10. **Improve delete/test button `aria-label`** to include webhook URL.
11. **Add `:active` pressed style** on buttons.

### P3 - Low
12. **Add webhook status indicator** (success/failure visual).
13. **Add delivery log** section.
14. **Add URL copy button** for each webhook.
15. **Add confirmation before delete**.
16. **Add arrow-key navigation** between webhook items.
