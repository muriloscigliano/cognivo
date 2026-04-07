# ai-ab-test Improvement Plan

**Component**: `ai-ab-test`
**Category**: AI-Native
**File**: `src/components/ai-ab-test/ai-ab-test.ts`
**Priority**: P2-Medium

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. Magic number `font-size: 12px` used without token on lines 124 and 149
2. Missing disabled, loading, and error states for vote buttons
3. `min-height: 80px` magic number on line 86 for `.variant`

---

## 1. Functional Issues

- **No loading state**: When a vote is cast or comparison is triggered, there is no visual feedback indicating an async operation is in progress. The `_vote` method (line 173) immediately sets `_winner` but the consumer might need time to process. Consider adding a `loading` property.
- **No error state**: If the vote submission fails, there is no mechanism to display an error or revert the selection.
- **No disabled support**: The component cannot be set to a read-only or disabled mode to prevent voting after results are finalized. Vote buttons at lines 224-241 have no `:disabled` handling.
- **Swap resets vote (line 184)**: `_swap()` sets `_winner = null`, which silently discards the user's vote without confirmation. This could be unexpected behavior.

## 2. Interaction Issues

### 2.1 State Coverage
| State | Supported | Notes |
|-------|-----------|-------|
| Default | Yes | |
| Hover | Yes | `.vote-btn:hover`, `.swap-btn:hover` |
| Active/Pressed | Partial | `aria-pressed` used, but no CSS `:active` style |
| Focus | Yes | `:focus-visible` on buttons |
| Disabled | No | No disabled state for buttons or component |
| Loading | No | No loading/spinner state after vote cast |
| Error | No | No error display mechanism |
| Selected | Yes | `.selected` class on vote buttons |
| Empty | No | No handling when `variantA` or `variantB` is empty string |

**Missing**: `:active` press state, disabled, loading, error, empty content states (5 missing).

### 2.2 Keyboard Navigation
- Buttons are natively focusable; redundant `tabindex="0"` on `<button>` elements (lines 207, 228, 233, 238, 242) is harmless but unnecessary.
- **Missing**: Arrow key navigation between vote buttons in the action group. The vote buttons act as a radio-like group but don't support Left/Right arrow keys.
- **Missing**: Escape key to deselect current vote.

### 2.3 ARIA & Accessibility
- Good: `role="group"` with `aria-label` on container (line 204) and actions (line 223).
- Good: `aria-pressed` on vote buttons (lines 227, 233, 238).
- Good: `aria-label="Swap variants"` on swap button (line 207).
- **Issue**: Vote buttons with `aria-pressed` should ideally use `role="toggle"` or be within a `role="radiogroup"` since they are mutually exclusive selections.
- **Issue**: No `aria-live` region to announce the vote result to screen readers after selection.

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Context | Suggested Token |
|------|-------|---------|-----------------|
| 86 | `80px` | `.variant { min-height: 80px }` | `var(--cg-size-20, 80px)` or remove |
| 95 | `0.05em` | `.variant-label { letter-spacing }` | `var(--cg-letter-spacing-wide, 0.05em)` |
| 124 | `12px` | `.vote-btn { font-size: 12px }` | `var(--cg-font-size-xs, 12px)` |
| 149 | `12px` | `.compare-btn { font-size: 12px }` | `var(--cg-font-size-xs, 12px)` |

### 3.2 Raw Colors Found
| Line | Value | Context | Suggested Token |
|------|-------|---------|-----------------|
| 34 | `rgba(255, 255, 255, 0.03)` | `.container background-image` | `var(--cg-color-surface-container-glare)` |
| 39 | `rgba(255, 255, 255, 0.05)` | `.container box-shadow inset` | `var(--cg-color-surface-highlight)` |

Note: Most colors already use tokens with hex fallbacks, which is acceptable. The `rgba()` values in decorative gradients are the main offenders.

### 3.3 Spacing Issues
- Spacing values consistently use `--cg-spacing-*` tokens. No issues found.

### 3.4 Modern Design Enhancements
- **Add subtle backdrop-filter**: Consider `backdrop-filter: blur()` on the container for glassmorphism depth.
- **Add active press state**: `.vote-btn:active { transform: scale(0.97); }` for tactile feedback.
- **Add transition on variant border**: The `.variant` border-color transition (line 85) is good; consider adding a subtle glow on the winning variant: `box-shadow: 0 0 0 1px var(--cg-brand-ai-accent)`.
- **Responsive layout**: The two-column grid (line 75) does not stack on narrow viewports. Add a media query or `min-width` constraint.

## 4. Prioritized Fixes

### P0 - Critical
(none)

### P1 - High
1. Replace magic `font-size: 12px` on lines 124 and 149 with `var(--cg-font-size-xs, 12px)`
2. Add disabled state: `@property disabled` + `:host([disabled])` styles + button `?disabled` binding
3. Add `aria-live="polite"` region to announce vote results to screen readers

### P2 - Medium
4. Replace `min-height: 80px` (line 86) with a token or CSS custom property
5. Replace `letter-spacing: 0.05em` (line 95) with `var(--cg-letter-spacing-wide, 0.05em)`
6. Add loading state with spinner on vote buttons during async operations
7. Add `:active` press style for vote and compare buttons
8. Add empty content handling when `variantA`/`variantB` are empty strings
9. Add responsive stacking for narrow viewports (single-column below ~480px)

### P3 - Low
10. Remove redundant `tabindex="0"` from native `<button>` elements
11. Add arrow key navigation within the vote button group
12. Replace inline `rgba()` decorative values with design tokens
13. Consider adding a subtle glow effect on the winning variant card
