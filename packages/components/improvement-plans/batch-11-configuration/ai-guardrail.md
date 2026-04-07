# AI Guardrail Improvement Plan

**Component**: `ai-guardrail`
**Category**: AI-Native
**File**: `src/components/ai-guardrail/ai-guardrail.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Fair
**Top 3 Issues**:
1. CSS structure issues: orphaned `}` on line 142, misplaced bare `:focus-visible` rule on lines 145-148, and multiple raw `rgba()` colors throughout status and severity classes
2. Raw hex colors `#fbbf24` (lines 64, 119), `#fb923c` (line 65), `#f87171` (lines 55, 66, 96) not wrapped in tokens
3. Blocked content reveal mechanism (click-to-unblur) has no keyboard accessibility -- the `div` is not focusable and has no role

---

## 1. Functional Issues

- **Lines 142-148**: Orphaned `}` on line 142 closes a block prematurely. Then a bare `:focus-visible` rule on lines 145-148 exists outside proper scoping. This is structurally broken CSS.
- **Lines 218-228**: The blocked content div uses `@click` to toggle reveal, but it has no `tabindex`, no `role`, and no keyboard handler. It is completely inaccessible via keyboard.
- **Line 106**: `filter: blur(3px)` -- the blur value is a magic number. Also, CSS `filter: blur()` can cause performance issues on large content blocks.
- **Line 231**: The override section renders whenever `status !== 'safe'` OR `allowOverride` is true. If `allowOverride` is true and `status === 'safe'`, only the "Report Issue" button shows, which is confusing -- why report an issue when everything passed?

## 2. Interaction Issues

### 2.1 State Coverage
| State | Implemented | Notes |
|-------|------------|-------|
| Safe | Yes | `.status-bar.safe` (line 53) |
| Flagged | Yes | `.status-bar.flagged` (line 54) |
| Blocked | Yes | `.status-bar.blocked` (line 55) |
| Severity levels | Yes | low/medium/high/critical (lines 63-66) |
| Content hidden | Yes | `filter: blur(3px)` (line 106) |
| Content revealed | Yes | `.blocked-content.revealed` (line 110) |
| Focus-visible | Broken | Misplaced `:focus-visible` on line 145 |
| Disabled | **No** | No disabled state on override/report buttons |
| Loading | **No** | No loading state while checks run |
| Error | **No** | No error state for check failures |
| Active/pressed | **No** | No `:active` on buttons |

**Missing states**: proper focus-visible, disabled, loading, error, active/pressed (5 of 8+ required).

### 2.2 Keyboard Navigation
- **Override and Report buttons** are standard `<button>` elements and are keyboard-accessible.
- **Blocked content reveal** (line 218-228) is not keyboard-accessible. Users cannot tab to it or activate it with Enter/Space.
- **Missing**: Focus management -- when content is revealed, focus should be managed appropriately.
- **Missing**: `focus-visible` styles on override and report buttons (the misplaced rule applies to all elements).

### 2.3 ARIA & Accessibility
- **Line 194**: `role="alert"` with `aria-live="polite"` and `aria-atomic="true"` -- excellent for announcing safety status changes.
- **Line 194**: `aria-label="Safety filter: ${this.status}"` -- good.
- **Blocked content** (lines 218-228): No `role`, no `aria-label`, no `tabindex`. The content is completely invisible to assistive technology in its blurred state.
- **Policy checks** (lines 201-213): No `role="list"` wrapper for the check items.
- **Missing**: The severity badge should have `aria-label` explaining what the severity level means.

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Property | Value | Suggested Token |
|------|----------|-------|-----------------|
| 60 | `font-size` | `10px` | `var(--cg-font-size-2xs, 10px)` |
| 60 | `padding` | `2px` | `var(--cg-spacing-2, 2px)` |
| 71 | `font-size` | `11px` | `var(--cg-font-size-2xs, 11px)` |
| 82 | `margin-top` | `1px` | `var(--cg-spacing-1, 1px)` |
| 87 | `font-size` | `13px` | `var(--cg-font-size-sm, 13px)` |
| 88 | `font-size` | `11px` | `var(--cg-font-size-2xs, 11px)` |
| 88 | `margin-top` | `2px` | `var(--cg-spacing-2, 2px)` |
| 100 | `padding` | `10px 12px` | `var(--cg-spacing-10) var(--cg-spacing-12)` |
| 106 | `filter` | `blur(3px)` | `var(--cg-blur-sm, 3px)` |
| 111 | `font-size` | `11px` | `var(--cg-font-size-2xs, 11px)` |
| 123 | `padding` | `5px 14px` | `var(--cg-spacing-5) var(--cg-spacing-14)` |
| 132 | `font-size` | `11px` | `var(--cg-font-size-2xs, 11px)` |
| 136 | `padding` | `5px 14px` | `var(--cg-spacing-5) var(--cg-spacing-14)` |

### 3.2 Raw Colors Found
| Line | Value | Context | Suggested Token |
|------|-------|---------|-----------------|
| 43 | `rgba(255, 255, 255, 0.05)` | box-shadow inset | `var(--cg-color-surface-highlight)` |
| 44 | `rgba(255, 255, 255, 0.03)` | background gradient | `var(--cg-color-surface-gradient-start)` |
| 53 | `rgba(34, 197, 94, 0.08)` | `.status-bar.safe` bg | `var(--cg-color-status-success-bg-subtle)` |
| 53 | `rgba(34, 197, 94, 0.15)` | `.status-bar.safe` border | `var(--cg-color-status-success-border)` |
| 54 | `rgba(245, 158, 11, 0.08)` | `.status-bar.flagged` bg | `var(--cg-color-status-warning-bg-subtle)` |
| 54 | `rgba(245, 158, 11, 0.15)` | `.status-bar.flagged` border | `var(--cg-color-status-warning-border)` |
| 55 | `rgba(239, 68, 68, 0.08)` | `.status-bar.blocked` bg | `var(--cg-color-status-error-bg-subtle)` |
| 55 | `rgba(239, 68, 68, 0.15)` | `.status-bar.blocked` border | `var(--cg-color-status-error-border)` |
| 63 | `rgba(34, 197, 94, 0.12)` | `.severity.low` bg | `var(--cg-color-status-success-bg)` |
| 64 | `rgba(245, 158, 11, 0.12)` | `.severity.medium` bg | `var(--cg-color-status-warning-bg)` |
| 64 | `#fbbf24` | `.severity.medium` color | `var(--cg-yellow-400, #fbbf24)` |
| 65 | `rgba(249, 115, 22, 0.12)` | `.severity.high` bg | `var(--cg-color-status-warning-bg)` |
| 65 | `#fb923c` | `.severity.high` color | `var(--cg-orange-400, #fb923c)` |
| 66 | `rgba(239, 68, 68, 0.12)` | `.severity.critical` bg | `var(--cg-color-status-error-bg)` |
| 66 | `#f87171` | `.severity.critical` color | `var(--cg-red-400, #f87171)` |
| 96 | `#f87171` | `.blocked-label` color | `var(--cg-red-400, #f87171)` |
| 101 | `rgba(239, 68, 68, 0.06)` | `.blocked-content` bg | `var(--cg-color-status-error-bg-subtle)` |
| 102 | `rgba(239, 68, 68, 0.15)` | `.blocked-content` border | `var(--cg-color-status-error-border)` |
| 124 | `rgba(239, 68, 68, 0.3)` | `.override-btn` border | `var(--cg-color-status-error-border-strong)` |
| 125 | `rgba(239, 68, 68, 0.08)` | `.override-btn` bg | `var(--cg-color-status-error-bg-subtle)` |
| 130 | `rgba(239, 68, 68, 0.15)` | `.override-btn:hover` bg | `var(--cg-color-status-error-bg)` |

### 3.3 Spacing Issues
- The component has the highest density of raw `rgba()` colors in this batch -- 20+ instances.
- Button padding `5px 14px` (lines 123, 136) is not on the standard spacing scale.

### 3.4 Modern Design Enhancements
- Add animated status bar transitions when status changes (e.g., safe to flagged).
- The blocked content could use a pattern overlay (diagonal stripes) instead of just blur.
- Add a "severity meter" visual (like a gauge) in addition to the text badge.
- Consider adding a timeline of check events for audit logging.
- The override flow should have a multi-step confirmation (type "OVERRIDE" to confirm).

## 4. Prioritized Fixes

### P0 - Critical
1. **Fix CSS structure** -- remove orphaned `}` on line 142 and properly scope `:focus-visible` on lines 145-148.
2. **Make blocked content keyboard accessible** -- add `tabindex="0"`, `role="button"`, `aria-label`, and Enter/Space handler to the blocked content div.

### P1 - High
3. **Replace all raw hex colors** (`#fbbf24`, `#fb923c`, `#f87171`) with token references.
4. **Replace all `rgba()` literals** (20+ instances) with semantic status tokens.
5. **Replace all magic numbers** listed in 3.1 with design tokens.
6. **Add `focus-visible` styles** to override and report buttons.
7. **Add `role="list"`** wrapper around policy checks.

### P2 - Medium
8. **Add loading state** for when policy checks are running.
9. **Add disabled state** for override/report buttons.
10. **Fix override section logic** (line 231) -- don't show "Report Issue" when status is safe unless there's a good reason.
11. **Add `aria-label`** to severity badge explaining the level.
12. **Add `:active` pressed style** on buttons.

### P3 - Low
13. **Add status transition animation**.
14. **Add multi-step override confirmation**.
15. **Add pattern overlay** for blocked content (in addition to blur).
16. **Consider audit log timeline** for policy checks.
