# AI Permission Gate Improvement Plan

**Component**: `ai-permission-gate`
**Category**: AI-Native
**File**: `src/components/ai-permission-gate/ai-permission-gate.ts`
**Priority**: P2-Medium

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. Raw hex color `#09090b` on line 87 for `.feature-row` background, `#22c55e` on lines 105 and 170 for allowed status
2. Several magic numbers in status-icon dimensions, margin-top, padding-top (lines 94-95, 122, 124, 129, 157)
3. Feature rows are not keyboard-focusable -- only the "Request Access" button is interactive

---

## 1. Functional Issues

- **Line 87**: `.feature-row` uses raw `background: #09090b` instead of a token. This is one of the darkest background values and should map to `var(--cg-color-surface-base-background, #09090b)`.
- **Lines 105, 170**: Raw `#22c55e` used for allowed status icon color and summary dot. Should use `var(--cg-color-status-success-text-default, #22c55e)`.
- **Line 185-188**: `_relevantPermissions` filters by `currentRole` but uses strict equality. If `currentRole` has leading/trailing whitespace, no permissions will match. Consider trimming.
- **No pagination or grouping**: If there are many permissions, the list can become very long. Consider grouping by allowed/denied or adding a search.

## 2. Interaction Issues

### 2.1 State Coverage
| State | Implemented | Notes |
|-------|------------|-------|
| Default | Yes | |
| Hover | Yes | `.feature-row:hover` (line 91) |
| Focus-visible | Yes | `.request-btn:focus-visible` (line 150) |
| Allowed | Yes | Green checkmark (line 104) |
| Denied | Yes | Red X with request button (line 109) |
| Empty | Yes | `.empty-state` (line 219) |
| Disabled | **No** | No disabled state for the request button |
| Loading | **No** | No loading/skeleton state |
| Error | **No** | No error state |
| Active/pressed | **No** | No `:active` on request button |
| Pending request | **No** | No visual state for "request pending" |

**Missing states**: disabled, loading, error, active/pressed, pending request (5 of 8+ required).

### 2.2 Keyboard Navigation
- **Request Access buttons** are standard `<button>` elements with `tabindex="0"` and `focus-visible`.
- **Feature rows** are `div` elements with `role="listitem"` but no `tabindex`. They are not keyboard-navigable.
- **Missing**: Arrow-key navigation between permission rows.

### 2.3 ARIA & Accessibility
- **Line 210**: `role="region"` with `aria-label="Permission gate"` -- good.
- **Line 221**: `role="list"` with `aria-label` -- good.
- **Line 223**: `role="listitem"` -- good.
- **Line 224**: Status icon uses `aria-hidden="true"` -- good.
- **Line 219**: `role="status"` on empty state -- good.
- **Line 225**: Unicode characters `\u2713` and `\u2717` are used for check/cross marks; since they are `aria-hidden`, this is fine.
- **Missing**: `aria-live` on the summary section so changes are announced.

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Property | Value | Suggested Token |
|------|----------|-------|-----------------|
| 94 | `width` | `22px` | `var(--cg-spacing-22, 22px)` or component token |
| 95 | `height` | `22px` | `var(--cg-spacing-22, 22px)` or component token |
| 122 | `margin-top` | `2px` | `var(--cg-spacing-2, 2px)` |
| 124 | `.feature-role margin-top` | `2px` | `var(--cg-spacing-2, 2px)` |
| 129 | `.feature-reason margin-top` | `2px` | `var(--cg-spacing-2, 2px)` |
| 157 | `padding-top` | `12px` | `var(--cg-spacing-12, 12px)` |

### 3.2 Raw Colors Found
| Line | Value | Context | Suggested Token |
|------|-------|---------|-----------------|
| 48 | `rgba(255, 255, 255, 0.05)` | box-shadow inset | `var(--cg-color-surface-highlight)` |
| 49 | `rgba(255, 255, 255, 0.03)` | background gradient | `var(--cg-color-surface-gradient-start)` |
| 87 | `#09090b` | `.feature-row` background | `var(--cg-color-surface-base-background, #09090b)` |
| 104 | `rgba(34, 197, 94, 0.15)` | `.status-icon.allowed` bg | `var(--cg-color-status-success-bg)` |
| 105 | `#22c55e` | `.status-icon.allowed` color | `var(--cg-color-status-success-text-default, #22c55e)` |
| 108 | `rgba(239, 68, 68, 0.15)` | `.status-icon.denied` bg | `var(--cg-color-status-error-bg)` |
| 170 | `#22c55e` | `.dot-green` color | `var(--cg-color-status-success-text-default, #22c55e)` |

### 3.3 Spacing Issues
- Summary `padding-top: 12px` (line 157) should use `var(--cg-spacing-12, 12px)`.
- Status icon dimensions (22x22) are not on the standard spacing scale.

### 3.4 Modern Design Enhancements
- Add a "pending" state for permissions where access has been requested.
- Consider grouping permissions into "Allowed" and "Denied" sections with headers.
- Add a permission count badge next to the role badge.
- The request button could show a confirmation state after clicking ("Requested").
- Consider adding a tooltip on denied permissions explaining the restriction.

## 4. Prioritized Fixes

### P0 - Critical
(No P0 issues -- component is structurally sound.)

### P1 - High
1. **Replace raw hex `#09090b`** on line 87 with `var(--cg-color-surface-base-background, #09090b)`.
2. **Replace raw hex `#22c55e`** on lines 105, 170 with `var(--cg-color-status-success-text-default, #22c55e)`.
3. **Replace all `rgba()` literals** with semantic tokens.
4. **Replace magic numbers** listed in 3.1 with design tokens.

### P2 - Medium
5. **Add "pending request" state** -- after clicking "Request Access", show a visual indicator that the request is pending.
6. **Make feature rows focusable** -- add `tabindex="0"` and keyboard handlers.
7. **Add disabled state** for the request button (e.g., when request is already pending).
8. **Add loading/skeleton state**.
9. **Add `aria-live="polite"`** to the summary section.

### P3 - Low
10. **Add `:active` pressed style** on request button.
11. **Add permission grouping** (allowed/denied sections).
12. **Add search/filter** for large permission sets.
13. **Trim `currentRole`** in `_relevantPermissions` getter.
