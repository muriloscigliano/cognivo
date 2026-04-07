# AI API Key Manager Improvement Plan

**Component**: `ai-api-key-manager`
**Category**: AI-Native
**File**: `src/components/ai-api-key-manager/ai-api-key-manager.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. CSS syntax error: orphaned `}` on line 205 after `.empty` block
2. Several magic numbers in action button dimensions, status badge padding, key-meta font-size, margin/padding values (lines 126, 138, 165-166, 196)
3. Security concern: `_onCopy()` copies only the prefix (line 235), but the method name and UX suggest copying the full key; the `key.prefix` value may not be useful to the user

---

## 1. Functional Issues

- **Line 205**: Orphaned closing `}` brace after `.empty` block. This is a CSS parse error.
- **Lines 232-238**: `_onCopy()` copies `key.prefix` to the clipboard. The `prefix` field by definition is only a partial key (e.g., `sk-abc`). Copying just the prefix is not useful for API key usage. The component should either accept a full key value (masked in display) or clearly communicate that only the prefix is copied.
- **Line 236**: `setTimeout` callback clears `_copiedId` after 2000ms. If the component is disconnected before the timeout fires, this will throw or update a disconnected element. Should clear the timeout on `disconnectedCallback`.
- **Line 237**: Empty `catch` block silently swallows clipboard errors. Should provide user feedback (e.g., "Copy failed").
- **Line 284**: The delete icon uses Unicode `&#x1f5d1;` (wastebasket emoji), which may not render consistently across platforms. Should use an SVG icon.

## 2. Interaction Issues

### 2.1 State Coverage
| State | Implemented | Notes |
|-------|------------|-------|
| Default | Yes | |
| Hover | Yes | `.action-btn:hover` (line 178) |
| Focus-visible | Yes | `.action-btn:focus-visible` (line 182), `.create-btn:focus-visible` (line 82) |
| Active status | Yes | `.status-active` (line 145) |
| Revoked status | Yes | `.status-revoked` (line 150) |
| At key limit | Yes | Create button disabled (line 249) |
| Empty | Yes | `.empty` (line 199) |
| Disabled | Partial | Only create button has disabled state (line 87) |
| Loading | **No** | No loading/skeleton state |
| Error | **No** | No error state |
| Active/pressed | **No** | No `:active` on action buttons |
| Copy feedback | Yes | `.copied-toast` (line 193) |

**Missing states**: loading, error, active/pressed (3 of 8+ required).

### 2.2 Keyboard Navigation
- All buttons have `tabindex="0"` and are natively focusable.
- **Missing**: No keyboard shortcut for common actions (e.g., Ctrl+C to copy when a key row is focused).
- **Missing**: No arrow-key navigation between key list items.

### 2.3 ARIA & Accessibility
- **Line 259**: `role="list"` with `aria-label="API keys"` -- good.
- **Line 261**: `role="listitem"` -- good.
- **Line 251-253**: Create button has `aria-label="Create new API key"` -- good.
- **Line 275**: Copy button `aria-label="Copy key prefix"` -- good.
- **Line 279**: Revoke button `aria-label="Revoke key ${k.name}"` -- good.
- **Line 283**: Delete button `aria-label="Delete key ${k.name}"` -- good.
- **Missing**: The `.copied-toast` (line 265) is not announced to screen readers. Should use `role="status"` or `aria-live="polite"`.
- **Missing**: Confirmation dialog before revoke/delete actions (dangerous operations).

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Property | Value | Suggested Token |
|------|----------|-------|-----------------|
| 126 | `font-size` | `10px` | `var(--cg-font-size-2xs, 10px)` |
| 138 | `padding` | `2px` | `var(--cg-spacing-2, 2px)` |
| 138 | `font-size` | `10px` | `var(--cg-font-size-2xs, 10px)` |
| 116 | `margin-bottom` | `2px` | `var(--cg-spacing-2, 2px)` |
| 165 | `width` | `28px` | Component-specific token |
| 166 | `height` | `28px` | Component-specific token |
| 196 | `margin-left` | `4px` | `var(--cg-spacing-4, 4px)` |
| 196 | `font-size` | `10px` | `var(--cg-font-size-2xs, 10px)` |

### 3.2 Raw Colors Found
| Line | Value | Context | Suggested Token |
|------|-------|---------|-----------------|
| 37 | `rgba(255, 255, 255, 0.03)` | background gradient | `var(--cg-color-surface-gradient-start)` |
| 42 | `rgba(255, 255, 255, 0.05)` | box-shadow inset | `var(--cg-color-surface-highlight)` |
| 146 | `rgba(34, 197, 94, 0.15)` | `.status-active` bg | `var(--cg-color-status-success-bg)` |
| 151 | `rgba(239, 68, 68, 0.15)` | `.status-revoked` bg | `var(--cg-color-status-error-bg)` |
| 188 | `rgba(239, 68, 68, 0.15)` | `.action-btn.danger:hover` bg | `var(--cg-color-status-error-bg)` |

### 3.3 Spacing Issues
- Action button dimensions (28x28) are not on the standard spacing scale.
- `margin-left: 4px` on `.copied-toast` (line 196) should use token syntax.

### 3.4 Modern Design Enhancements
- Add a "Show full key" toggle or a masked key display (`sk-abc...xxxx`) with reveal-on-click.
- Add confirmation dialogs for revoke and delete operations.
- Consider adding "Last used" timestamp formatting (relative time like "2 hours ago").
- Add a visual security indicator (lock icon) for active keys.
- The create button could animate to show a "Creating..." state.

## 4. Prioritized Fixes

### P0 - Critical
1. **Fix CSS syntax error** -- remove orphaned `}` on line 205.
2. **Add confirmation for revoke/delete** -- these are destructive operations and should have a confirmation step.

### P1 - High
3. **Replace all `rgba()` literals** with semantic tokens.
4. **Replace all magic numbers** listed in 3.1 with design tokens.
5. **Add `role="status"` or `aria-live="polite"`** to the copied toast.
6. **Clear timeout on disconnectedCallback** (line 236).
7. **Replace emoji icon** `&#x1f5d1;` on line 284 with an SVG icon for cross-platform consistency.

### P2 - Medium
8. **Add loading/skeleton state** for when keys are being fetched.
9. **Add error state** for API failures.
10. **Clarify copy behavior** -- if only prefix is copied, label the button "Copy prefix" and provide feedback. Or accept a full key value.
11. **Add error feedback** when clipboard copy fails (line 237).
12. **Add `:active` pressed style** on action buttons.

### P3 - Low
13. **Add arrow-key navigation** between key list items.
14. **Add relative time formatting** for `createdAt` and `lastUsed`.
15. **Add security lock icon** for active keys.
16. **Add creation animation** for newly added keys.
