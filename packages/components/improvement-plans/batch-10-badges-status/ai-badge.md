# ai-badge Improvement Plan

**Component**: `ai-badge`
**Category**: AI-Native
**File**: `src/components/ai-badge/ai-badge.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Fair
**Top 3 Issues**:
1. Extensive raw `rgba()` colors for backgrounds and borders across all confidence levels (lines 97-115)
2. CSS syntax error: extra closing brace on line 180 (orphan `}` after `.tooltip-explanation`)
3. Numerous magic numbers throughout: gap, font-size, sparkline dimensions, tooltip arrow border size

---

## 1. Functional Issues

- **CSS syntax error** (line 180): There is an extra closing brace `}` that does not match any opening brace. This is immediately after `.tooltip-explanation` block (line 179) and before the closing template literal. This could cause browser CSS parsing to drop subsequent rules.
- **`_showTooltip` state is declared but never used** (line 203): The `@state()` decorator creates a reactive property, but tooltip visibility is handled purely via CSS `:hover`/`:focus`. This unused state should be removed.
- **Default score of `0.85`** (line 183): The default score is `0.85`, which means an un-configured badge shows "85% high confidence". A default of `0` or `0.5` would be more neutral and not mislead.
- **No score clamping**: If `score` is set to a value > 1 or < 0, the percentage display will show invalid values (e.g., "150%" or "-20%"). Add `Math.max(0, Math.min(1, this.score))`.

## 2. Interaction Issues

### 2.1 State Coverage

| State | Supported | Notes |
|-------|-----------|-------|
| Default | Yes | Shows badge with score |
| Hover | Yes | `filter: brightness(1.15)` on hover (line 48) |
| Focus | Yes | Focus-visible ring (lines 44-47) |
| Active/Click | Yes | Fires `ai-badge-click` event |
| Keyboard | Yes | Enter/Space handling (lines 225-229) |
| Disabled | No | No disabled state |
| Loading | No | No loading/skeleton state while score is being computed |
| Error | No | No visual for invalid/unavailable score |

- **Missing disabled state**: No way to show a non-interactive confidence badge.
- **Missing loading state**: AI scores often arrive asynchronously; a skeleton or shimmer would be valuable.

### 2.2 ARIA & Accessibility

- **Good `aria-label`** (lines 273, 298): `"AI confidence: ${pct}%, ${level}"` is descriptive.
- **`role="status"` is appropriate** for a confidence indicator that may update.
- **Tooltip uses `role="tooltip"`** (line 254): Correct, but it is not linked to the badge via `aria-describedby`. The tooltip content is redundant with the `aria-label`, so this is low priority.
- **Sparkline is properly `aria-hidden`** (line 242): Good.
- **SVG icons lack `aria-hidden`** in `_getIcon()` (lines 213-215): The icon SVGs rendered inline should have `aria-hidden="true"` to prevent screen readers from trying to announce the paths.

## 3. Styling Issues

### 3.1 Magic Numbers Found

| Line | Property | Value | Suggested Token |
|------|----------|-------|-----------------|
| 36 | .badge gap | `5px` | `var(--cg-spacing-4, 4px)` or `var(--cg-spacing-6, 6px)` |
| 41 | box-shadow rgba | `rgba(255, 255, 255, 0.05)` | `var(--cg-color-surface-glass-highlight)` |
| 55 | font-weight | `700` | `var(--cg-font-weight-bold, 700)` |
| 56 | gap (sm) | `3px` | `var(--cg-spacing-4, 4px)` |
| 58 | .icon font-size (sm) | `9px` | Define a token or use `var(--cg-font-size-2xs)` |
| 65 | font-weight (md) | `700` | `var(--cg-font-weight-bold, 700)` |
| 76 | min-width (lg) | `140px` | Should use a component-specific token |
| 84 | bar height | `4px` | `var(--cg-spacing-4, 4px)` |
| 85 | bar border-radius | `2px` | `var(--cg-border-radius-25, 2px)` |
| 90 | bar-fill border-radius | `2px` | Same as above |
| 118 | letter-spacing | `0.02em` | `var(--cg-letter-spacing-normal, 0.02em)` |
| 126 | sparkline gap | `1px` | `var(--cg-spacing-1, 1px)` |
| 127 | sparkline height | `16px` | `var(--cg-spacing-16, 16px)` |
| 128 | sparkline margin-left | `6px` | `var(--cg-spacing-6, 6px)` |
| 130 | spark-bar width | `2px` | `var(--cg-spacing-2, 2px)` |
| 131 | spark-bar border-radius | `1px` | `var(--cg-border-radius-25, 2px)` |
| 154 | z-index | `100` | `var(--cg-z-index-tooltip, 100)` |
| 163 | tooltip arrow border | `5px solid transparent` | Should use a token |
| 171 | tooltip-score margin-left | `4px` | `var(--cg-spacing-4, 4px)` |
| 178 | max-width | `220px` | Component-specific token |

### 3.2 Raw Colors Found

| Line | Context | Value | Suggested Token |
|------|---------|-------|-----------------|
| 41 | box-shadow | `rgba(255, 255, 255, 0.05)` | `var(--cg-color-surface-glass-highlight)` |
| 42 | background-image | `rgba(255, 255, 255, 0.03)` | `var(--cg-color-surface-glass-gradient-start)` |
| 86 | bar-track bg | `rgba(255, 255, 255, 0.08)` | `var(--cg-color-surface-container-background)` or a track token |
| 97 | .high background | `rgba(34, 197, 94, 0.12)` | `var(--cg-color-status-success-background-default)` |
| 99 | .high border | `rgba(34, 197, 94, 0.2)` | `var(--cg-color-status-success-border-default)` |
| 104 | .medium background | `rgba(245, 158, 11, 0.12)` | `var(--cg-color-status-warning-background-default)` |
| 106 | .medium border | `rgba(245, 158, 11, 0.2)` | `var(--cg-color-status-warning-border-default)` |
| 111 | .low background | `rgba(239, 68, 68, 0.12)` | `var(--cg-color-status-error-background-default)` |
| 113 | .low border | `rgba(239, 68, 68, 0.2)` | `var(--cg-color-status-error-border-default)` |
| 106-107 | ai-presence status dots | `#22c55e`, `#eab308` | See ai-presence plan |

### 3.3 Modern Design Enhancements

- **Glass effect is partially applied** (lines 41-42): The inset shadow and gradient are good but use raw colors.
- **Sparkline could use smoother rendering**: Consider using an SVG `<polyline>` instead of individual divs for better anti-aliasing.
- **Tooltip could have a subtle entrance animation**: Currently fades in with opacity, which is fine, but a `translateY` shift would add polish.
- **Bar fill should have a glow effect**: Add `box-shadow: 0 0 4px currentColor` for a modern neon/glow look matching the AI theme.

## 4. Prioritized Fixes

### P0 - Critical
- **Fix CSS syntax error** (line 180): Remove the orphan closing brace `}` that could break CSS parsing of subsequent rules.

### P1 - High
- **Replace all raw `rgba()` backgrounds with status tokens** (lines 97-115): Use `--cg-color-status-{success|warning|error}-background-default` and `--cg-color-status-{success|warning|error}-border-default`.
- **Clamp score to 0-1 range**: Add `const s = Math.max(0, Math.min(1, this.score))` at the top of render and use `s` throughout.
- **Remove unused `_showTooltip` state** (line 203).
- **Tokenize `font-weight: 700`** (lines 55, 65): Use `var(--cg-font-weight-bold, 700)`.

### P2 - Medium
- **Tokenize all magic number gaps and dimensions**: `5px`, `3px`, `9px`, `140px`, `4px` bar height, `16px` sparkline height, `2px` bar widths.
- **Add `aria-hidden="true"` to icon SVGs** in `_getIcon()` method.
- **Change default score from `0.85` to `0`** (line 183): Avoid misleading defaults.
- **Replace raw glass-effect colors** (lines 41-42) with surface glass tokens.

### P3 - Low
- **Add loading state**: Skeleton shimmer while score is pending.
- **Add disabled state**: Reduced opacity, no pointer events.
- **Enhance sparkline with SVG polyline** for smoother rendering.
- **Add bar-fill glow effect** for modern AI aesthetic.
