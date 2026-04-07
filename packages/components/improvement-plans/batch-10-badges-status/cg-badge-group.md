# cg-badge-group Improvement Plan

**Component**: `cg-badge-group`
**Category**: Foundation
**File**: `src/components/cg-badge-group/cg-badge-group.ts`
**Priority**: P2-Medium

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. Magic number `6px` gap for the `sm` variant not using a token (line 38)
2. Raw hex fallback colors in `.label` and `.overflow` (lines 25, 47)
3. Overflow pill padding uses magic numbers `2px 8px` (line 46)

---

## 1. Functional Issues

- **Overflow relies on external `total` prop** (line 63): The overflow count is calculated as `total - max`, but the component does not introspect its slotted children count. If `total` is not set, overflow never shows even when `max` is set. Consider using `slotchange` event to auto-count children.
- **No `max` enforcement on slotted content**: Setting `max=3` does not actually hide extra slotted badges. The consumer must manually limit slotted children. The component should hide overflow children via CSS (e.g., `::slotted(:nth-child(n+4)) { display: none }`).

## 2. Interaction Issues

### 2.1 State Coverage

| State | Supported | Notes |
|-------|-----------|-------|
| Default | Yes | Renders badges in flex-wrap |
| Empty | No | No empty state when 0 children are slotted |
| Overflow | Partial | Shows "+N" but doesn't hide excess children |
| Loading | No | No skeleton/placeholder state |

- **Missing empty state**: When no badges are present, the group renders an empty container with just the label.

### 2.2 ARIA & Accessibility

- **`role="group"` is correct** (line 70): Properly groups the badges.
- **`aria-label` fallback is good** (line 70): Falls back to "Badge group" if no label is provided.
- **Overflow indicator has no ARIA role**: The `+N` span (line 72) has a `title` attribute but no `role` or `aria-label`. Screen readers may not announce it clearly. Add `role="status"` and `aria-label="${overflowCount} additional items"`.
- **Label is not linked to group**: The `.label` div (line 69) is separate from the group. Use `aria-labelledby` to connect them, or use `aria-label` on the group referencing the label text.

## 3. Styling Issues

### 3.1 Magic Numbers Found

| Line | Property | Value | Suggested Token |
|------|----------|-------|-----------------|
| 27 | letter-spacing | `0.04em` | `var(--cg-letter-spacing-wide, 0.04em)` |
| 38 | gap (sm) | `6px` | `var(--cg-spacing-6, 6px)` |
| 46 | overflow padding | `2px 8px` | `var(--cg-spacing-2, 2px) var(--cg-spacing-8, 8px)` |

### 3.2 Raw Colors Found

| Line | Context | Value | Suggested Token |
|------|---------|-------|-----------------|
| 25 | .label color fallback | `#71717a` | Already wrapped in `--cg-gray-500`, acceptable as fallback |
| 47 | .overflow bg fallback | `#e4e4e7` | `--cg-gray-200` is a primitive token; should use semantic token like `--cg-color-badge-background-default` |

Note: `--cg-gray-200` (line 47) references a light-mode gray (`#e4e4e7`) which will look incorrect in dark mode. This should use a semantic surface token like `--cg-color-action-secondary-background-default`.

### 3.3 Modern Design Enhancements

- **Overflow badge needs dark-mode-aware styling**: The `--cg-gray-200` background is a light gray that won't work in Cognivo's dark-first theme. Replace with `var(--cg-color-action-secondary-background-default, #27272a)`.
- **Add subtle border to overflow pill**: Match the badge styling with a `1px solid var(--cg-color-surface-base-border)`.
- **Consider animated entrance for overflow**: Fade in the overflow indicator when it appears.
- **Label could use a divider or bottom border** for visual separation.

## 4. Prioritized Fixes

### P0 - Critical
- (None)

### P1 - High
- **Fix dark-mode overflow background** (line 47): `--cg-gray-200` with `#e4e4e7` fallback is a light-mode color. Replace with `var(--cg-color-action-secondary-background-default, #27272a)` and update text color to `var(--cg-color-surface-base-text, #fafafa)`.
- **Auto-count slotted children**: Listen for `slotchange` events to automatically compute overflow count instead of relying on external `total` prop, or at minimum hide overflowing children when `max` is set.

### P2 - Medium
- **Tokenize gap `6px`** (line 38): Replace with `var(--cg-spacing-6, 6px)`.
- **Tokenize overflow padding** (line 46): Replace `2px 8px` with spacing tokens.
- **Add `aria-label` to overflow indicator** (line 72): Add `aria-label="${overflowCount} additional items"` for screen reader clarity.
- **Link label to group via `aria-labelledby`**: Generate an ID for the label div and reference it.

### P3 - Low
- **Add empty state**: Render a placeholder message or hide entirely when no children are slotted.
- **Add entrance animation for overflow pill**: Fade/slide in.
- **Tokenize letter-spacing** (line 27): Replace `0.04em` with a typography token.
