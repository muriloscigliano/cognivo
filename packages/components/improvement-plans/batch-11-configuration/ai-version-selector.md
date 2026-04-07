# AI Version Selector Improvement Plan

**Component**: `ai-version-selector`
**Category**: AI-Native
**File**: `src/components/ai-version-selector/ai-version-selector.ts`
**Priority**: P2-Medium

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. Raw hex colors for canary (`#facc15`) and deprecated (`#f87171`) status badges (lines 148, 153)
2. Several magic numbers in radio dot dimensions, status badge padding, promote button padding, margin values (lines 92-93, 107-108, 132, 140, 51, 103, 217)
3. Missing `selected` property update in `_onSelect` -- the component dispatches an event but never updates its own `selected` state

---

## 1. Functional Issues

- **Lines 238-243**: `_onSelect()` dispatches the `ai-version-select` event but does not update `this.selected`. The UI relies on `v.id === this.selected` (line 266) for visual selection, so the selected version will not update unless the parent explicitly sets it back. This is a valid "uncontrolled" pattern but is inconsistent -- the component should either be fully controlled (never update self) or update locally.
- **Lines 245-250**: `_onRolloutChange()` dispatches the event but does not update the version's `rolloutPercent` locally. The slider thumb will snap back to the original position on re-render unless the parent updates the data. Consider local state tracking.
- **Line 51**: `margin: 0 0 12px 0` on `.title` uses a magic `12px` not wrapped in a token.

## 2. Interaction Issues

### 2.1 State Coverage
| State | Implemented | Notes |
|-------|------------|-------|
| Default | Yes | |
| Hover | Yes | `.version-item:hover` (line 72) |
| Focus-visible | Yes | `.version-item:focus-visible` (line 80) |
| Selected | Yes | `aria-selected="true"` styling (line 78) |
| Deprecated | Yes | Warning message (line 280) |
| Disabled | **No** | Deprecated versions can still be selected |
| Loading | **No** | No skeleton state |
| Error | **No** | No error display |
| Active/pressed | **No** | No `:active` style on version items |

**Missing states**: disabled (deprecated should arguably be non-selectable), loading, error, active/pressed (4 of 8+ required).

### 2.2 Keyboard Navigation
- **Enter/Space** handled on version items (line 273).
- **Missing arrow-key navigation** for `role="radiogroup"`. Per WAI-ARIA radio group pattern, ArrowUp/ArrowDown should move focus and selection between radio items.
- **Rollout slider** is a native range input and is keyboard-accessible.
- **Promote button** is a standard `<button>` with focus-visible (line 224).

### 2.3 ARIA & Accessibility
- **Line 264**: `role="radiogroup"` is correct.
- **Line 268**: `role="radio"` on div is correct, but uses `aria-selected` instead of `aria-checked`. For `role="radio"`, the correct attribute is `aria-checked`.
- **Line 270**: `aria-label` includes status, which is good.
- **Line 281**: `role="alert"` on deprecation warning is good for announcing.
- **Range input** (line 288): Has `aria-label` -- good.

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Property | Value | Suggested Token |
|------|----------|-------|-----------------|
| 51 | `margin` | `0 0 12px 0` | `0 0 var(--cg-spacing-12, 12px) 0` |
| 92 | `width` | `16px` | `var(--cg-spacing-16, 16px)` |
| 93 | `height` | `16px` | `var(--cg-spacing-16, 16px)` |
| 107 | `width` | `8px` | `var(--cg-spacing-8, 8px)` |
| 108 | `height` | `8px` | `var(--cg-spacing-8, 8px)` |
| 132 | `padding` | `2px` | `var(--cg-spacing-2, 2px)` |
| 134 | `font-size` | `10px` | `var(--cg-font-size-2xs, 10px)` |
| 140 | `rgba(34, 197, 94, 0.15)` | background | See 3.2 |
| 145 | `rgba(250, 204, 21, 0.15)` | background | See 3.2 |
| 152 | `rgba(239, 68, 68, 0.15)` | background | See 3.2 |
| 163 | `rgba(239, 68, 68, 0.08)` | background | See 3.2 |
| 175 | `min-width` | `56px` | Consider a token |
| 184 | `height` | `4px` | `var(--cg-spacing-4, 4px)` |
| 186 | `border-radius` | `2px` | `var(--cg-border-radius-25, 2px)` |
| 190 | `width/height` | `14px` | `var(--cg-spacing-14, 14px)` |
| 217 | `padding` | `3px` | `var(--cg-spacing-3, 3px)` |

### 3.2 Raw Colors Found
| Line | Value | Context | Suggested Token |
|------|-------|---------|-----------------|
| 42 | `rgba(255, 255, 255, 0.05)` | box-shadow inset | `var(--cg-color-surface-highlight)` |
| 43 | `rgba(255, 255, 255, 0.03)` | background gradient | `var(--cg-color-surface-gradient-start)` |
| 141 | `rgba(34, 197, 94, 0.15)` | `.status-active` bg | `var(--cg-color-status-success-bg)` |
| 145 | `rgba(250, 204, 21, 0.15)` | `.status-canary` bg | `var(--cg-color-status-warning-bg)` |
| 148 | `#facc15` | `.status-canary` color | `var(--cg-yellow-400, #facc15)` |
| 152 | `rgba(239, 68, 68, 0.15)` | `.status-deprecated` bg | `var(--cg-color-status-error-bg)` |
| 153 | `#f87171` | `.status-deprecated` color | `var(--cg-red-400, #f87171)` |
| 160 | `#f87171` | `.deprecation-warning` color | `var(--cg-red-400, #f87171)` |
| 163 | `rgba(239, 68, 68, 0.08)` | `.deprecation-warning` bg | `var(--cg-color-status-error-bg-subtle)` |
| 229 | `rgba(223, 255, 97, 0.1)` | `.promote-btn:hover` bg | `var(--cg-brand-ai-accent-alpha-10)` |

### 3.3 Spacing Issues
- Spacing is generally well-tokenized throughout. The main gaps are small values (`2px`, `3px`, `4px`) that lack token wrapping.

### 3.4 Modern Design Enhancements
- Add a visual rollout progress indicator (mini bar) next to the percentage.
- Consider color-coding the rollout slider track (green near 100%, yellow near 50%, etc.).
- Add a confirmation dialog or warning before promoting to 100%.
- Version items could animate on status change.

## 4. Prioritized Fixes

### P0 - Critical
1. **Fix `aria-checked` vs `aria-selected`** -- `role="radio"` requires `aria-checked`, not `aria-selected` (line 269).

### P1 - High
2. **Replace raw hex colors** `#facc15` (line 148), `#f87171` (lines 153, 160) with token references.
3. **Replace all `rgba()` literals** with semantic status tokens.
4. **Add arrow-key navigation** for the radiogroup pattern.
5. **Replace magic numbers** listed in 3.1 with design tokens.

### P2 - Medium
6. **Add disabled state** -- deprecated versions should ideally be non-selectable or show a disabled appearance.
7. **Add loading state** with skeleton items.
8. **Add `:active` pressed style** on version items.
9. **Consider local state tracking** for `selected` and `rolloutPercent` to avoid UI jank.

### P3 - Low
10. **Add rollout progress mini-bar** for visual clarity.
11. **Add version transition animations**.
12. **Add confirmation for "Promote to 100%"**.
