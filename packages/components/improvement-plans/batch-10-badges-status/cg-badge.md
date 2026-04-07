# cg-badge Improvement Plan

**Component**: `cg-badge`
**Category**: Foundation
**File**: `src/components/cg-badge/cg-badge.ts`
**Priority**: P2-Medium

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. Magic number padding values across all three size variants (lines 44, 49, 54)
2. Raw hex fallback colors in variant definitions (lines 61-89)
3. Magic number dimensions on `.dot` (6px) and `.remove` button (14px, 10px)

---

## 1. Functional Issues

- **Default score not reflected via attribute**: The `variant` defaults to `'neutral'` but the neutral variant selector uses `:host([variant="neutral"])` (line 60). On first render without an explicit `variant` attribute, the neutral styles may not apply because `reflect: true` is set, but the initial render may race with attribute reflection. This is minor since Lit handles reflected properties, but worth verifying in tests.
- **No validation on `label`**: If `label` is empty and no slot content is provided, the badge renders an empty `<span class="text">` with no visual content, producing a tiny pill with no accessible text.

## 2. Interaction Issues

### 2.1 State Coverage

| State | Supported | Notes |
|-------|-----------|-------|
| Default | Yes | |
| Hover | No | No hover styles on the badge itself |
| Active/Pressed | No | Not applicable for a status badge |
| Disabled | No | No disabled state defined |
| Focus | Partial | Only on `.remove` button, not on the badge |
| Loading | No | Could show dot pulse as loading indicator |
| Removable | Yes | Remove button with click handler |

- **Missing hover state on badge**: A subtle hover brightness or border change would add polish.
- **No disabled visual state**: If badge is used in interactive contexts (e.g., filter badges), a disabled state is needed.

### 2.2 ARIA & Accessibility

- **`role="status"` on every badge (line 153)**: This causes every badge to be announced as a live region. If multiple badges exist, screen readers will announce all of them on mount. Only badges that convey dynamic status changes should use `role="status"`. Static labels should use no role or a generic container.
- **No `aria-label` on the badge**: Screen readers only get the text content, which is fine for simple labels, but the dot indicator is purely visual with no accessible alternative text (e.g., "Active - pulsing indicator").
- **Remove button is good**: Properly labeled with `aria-label="Remove ${this.label}"` (line 157). Focus-visible ring is present (lines 126-129).

## 3. Styling Issues

### 3.1 Magic Numbers Found

| Line | Property | Value | Suggested Token |
|------|----------|-------|-----------------|
| 44 | padding (sm) | `1px 6px` | `var(--cg-spacing-2, 2px) var(--cg-spacing-6, 6px)` |
| 49 | padding (md) | `2px 8px` | `var(--cg-spacing-2, 2px) var(--cg-spacing-8, 8px)` |
| 54 | padding (lg) | `4px 12px` | `var(--cg-spacing-4, 4px) var(--cg-spacing-12, 12px)` |
| 45 | font-size (sm) | `0.65rem` | `var(--cg-font-size-2xs, 10px)` or a token equivalent |
| 100 | .dot width/height | `6px` | `var(--cg-spacing-6, 6px)` |
| 113 | .remove width/height | `14px` | `var(--cg-size-icon-sm, 14px)` or `var(--cg-spacing-14, 14px)` |
| 131 | .remove svg | `10px` | `var(--cg-size-icon-xs, 10px)` |
| 128 | outline-offset | `1px` | `var(--cg-spacing-1, 1px)` |

### 3.2 Raw Colors Found

| Line | Context | Value | Suggested Token |
|------|---------|-------|-----------------|
| 61 | neutral bg fallback | `rgba(59, 130, 246, 0.12)` | `var(--cg-color-badge-background-default)` (no raw fallback) |
| 62 | neutral text fallback | `#60a5fa` | Already token-wrapped, but fallback is raw hex |
| 63 | neutral border fallback | `#27272a` | Already using `--cg-color-surface-base-border` |
| 67 | info bg fallback | `rgba(59, 130, 246, 0.12)` | Token fallbacks should reference a simpler token |
| 71 | success bg fallback | `rgba(34, 197, 94, 0.12)` | Same pattern |
| 76 | warning bg fallback | `rgba(245, 158, 11, 0.12)` | Same pattern |
| 81 | danger bg fallback | `rgba(239, 68, 68, 0.12)` | Same pattern |
| 87 | accent text fallback | `#e5ff6b` | Should use `--cg-brand-ai-accent` |

All variant backgrounds use raw `rgba()` as fallbacks. These should be replaced with semantic token references or the fallbacks should be simplified to a single neutral fallback.

### 3.3 Modern Design Enhancements

- **Add subtle box-shadow / glass effect**: A `box-shadow: inset 0 1px 0 0 rgba(255,255,255,0.05)` for depth.
- **Add background-image gradient**: `linear-gradient(to bottom, rgba(255,255,255,0.03), transparent)` for modern glass feel.
- **Hover micro-interaction**: Slight `transform: scale(1.02)` and brightness shift on hover.
- **Transition the dot pulse**: Consider using `--cg-motion-*` tokens for the pulse animation timing.

## 4. Prioritized Fixes

### P0 - Critical
- (None)

### P1 - High
- **Fix `role="status"` misuse** (line 153): Use `role="status"` only when the badge conveys live-updating information. For static labels, remove the role or use a neutral element. This generates excessive screen reader announcements.
- **Tokenize all padding values** (lines 44, 49, 54): Replace `1px 6px`, `2px 8px`, `4px 12px` with spacing tokens.

### P2 - Medium
- **Replace `0.65rem` font-size** (line 45): Use `var(--cg-font-size-2xs)` or define a badge-specific size token.
- **Tokenize `.dot` dimensions** (line 100): `6px` -> `var(--cg-spacing-6, 6px)`.
- **Tokenize `.remove` dimensions** (lines 113, 131): `14px` and `10px` -> icon size tokens.
- **Add hover state** for the badge container for interactive contexts.
- **Add empty label guard**: If `label` is empty and slot is empty, consider hiding or showing a minimum-width badge.

### P3 - Low
- **Add disabled state** with `opacity: 0.45; pointer-events: none`.
- **Add modern glass effects**: Inset shadow and gradient overlay for depth.
- **Simplify raw rgba fallbacks**: Use a single neutral fallback or remove fallbacks entirely if tokens are guaranteed.
