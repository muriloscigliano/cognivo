# ai-sidebar Improvement Plan

**Component**: `ai-sidebar`
**Category**: AI-Native
**File**: `src/components/ai-sidebar/ai-sidebar.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Fair
**Top 3 Issues**:
1. Uses non-standard token names throughout -- `--cg-color-surface`, `--cg-color-border`, `--cg-color-text-secondary`, `--cg-color-text-primary`, `--cg-color-accent` (lines 57-58, 76, 83, 85, 141, etc.) instead of the project's `--cg-color-surface-*` / `--cg-gray-*` naming
2. Raw `rgba()` colors in hover, active, and badge backgrounds (lines 135, 141, 161, 168)
3. Missing keyboard navigation -- no arrow key support for item navigation, no Escape to collapse, no Home/End

---

## 1. Functional Issues

- **Non-standard token names**: The component uses token names like `--cg-color-surface`, `--cg-color-border`, `--cg-color-text-secondary`, `--cg-color-text-primary`, `--cg-color-accent`, `--cg-color-bg-secondary`, `--cg-color-border-primary`, `--cg-color-text-tertiary` which don't match the project's token naming convention (`--cg-color-surface-base-*`, `--cg-color-surface-container-*`, `--cg-gray-*`, `--cg-brand-ai-accent`). These tokens likely don't exist and always fall back to hardcoded values.
- **No `role="menuitem"` keyboard pattern**: Items use `role="menuitem"` (line 213) but the parent container doesn't have `role="menu"`. Menu pattern requires arrow key navigation, which is not implemented.
- **Sidebar width hardcoded**: Line 58 -- `width: 240px` and line 65 -- `width: 56px` are magic numbers. Should be configurable or use tokens.
- **Section titles hidden via `opacity: 0; height: 0`**: Lines 106-109 in collapsed mode -- this approach may cause layout shifts. Use `display: none` or proper transition.

---

## 2. Interaction Issues

### 2.1 State Coverage
| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Default (expanded) | Yes | Partial | Uses non-standard tokens with fallbacks |
| Default (collapsed) | Yes | Yes | Width transitions, labels hidden |
| Hover | Yes | Partial | `rgba(255, 255, 255, 0.05)` raw color |
| Active/Current | Yes | Partial | `rgba(223, 255, 97, 0.08)` raw color |
| Focus | Yes | Partial | Uses non-standard `--cg-color-accent` token |
| Disabled | **No** | N/A | No disabled items |
| Loading | **No** | N/A | No skeleton state |
| Error | **No** | N/A | No error state |
| Pressed | **No** | N/A | No active/pressed feedback |

### 2.2 Keyboard Navigation
- Collapse button is a `<button>` -- natively keyboard accessible. Good.
- Items are `<button>` elements with `tabindex="0"`. Good.
- **Missing arrow key navigation**: `role="menuitem"` requires Up/Down arrow keys per WAI-ARIA menu pattern.
- **Missing Escape key**: Should collapse the sidebar when focused.
- **Missing Home/End**: Should jump to first/last item.
- **Missing roving tabindex**: All items have `tabindex="0"` -- should use roving tabindex pattern for menu (only active item gets `tabindex="0"`, rest get `tabindex="-1"`).

### 2.3 ARIA & Accessibility
- `role="navigation"` with `aria-label="Sidebar navigation"` on `<nav>`. Good.
- Items use `role="menuitem"` but parent doesn't use `role="menu"`. Inconsistent.
- `aria-current` used for active item. Good.
- Collapse button has dynamic `aria-label`. Good.
- **Missing `role="menu"` / `role="menubar"`** on the items container.
- **Items use `aria-current="false"`** explicitly -- should omit the attribute when false rather than set it to "false" for cleaner markup.

---

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Suggested Token |
|------|-------|----------------|
| 58 | `width: 240px` | `--cg-sidebar-width-expanded` or configurable prop |
| 60 | `transition: width 200ms ease` | `--cg-motion-duration-fast`, `--cg-motion-easing-default` |
| 61 | `inset 0 1px 0 0 rgba(255, 255, 255, 0.05)` | `--cg-shadow-inner-subtle` |
| 62 | `rgba(255, 255, 255, 0.03)` | `--cg-color-surface-overlay-faint` |
| 65 | `width: 56px` | `--cg-sidebar-width-collapsed` or configurable prop |
| 100 | `letter-spacing: 0.05em` | `--cg-letter-spacing-wide` |
| 148 | `width: 18px` | `--cg-spacing-20` or `--cg-icon-size-sm` |
| 163 | `padding: 1px 6px` | `--cg-spacing-2`, `--cg-spacing-6` |
| 164 | `font-size: 10px` | `--cg-font-size-2xs` or smallest token |

### 3.2 Raw Colors Found
| Line | Color | Suggested Token |
|------|-------|----------------|
| 57 | `--cg-color-surface, #18181b` | Should be `--cg-color-surface-container-background` |
| 58 | `--cg-color-border, #27272a` | Should be `--cg-color-surface-container-border` |
| 76 | `--cg-color-text-secondary, #a1a1aa` | Should be `--cg-gray-400` or `--cg-gray-500` |
| 83 | `--cg-color-text-primary, #fafafa` | Should be `--cg-color-surface-base-text` |
| 85 | `--cg-color-accent, #dfff61` | Should be `--cg-brand-ai-accent` |
| 101 | `--cg-color-text-tertiary, #71717a` | Should be `--cg-gray-500` |
| 135 | `rgba(255, 255, 255, 0.05)` | `--cg-color-surface-overlay-subtle` |
| 141 | `rgba(223, 255, 97, 0.08)` | `--cg-color-brand-ai-bg-faint` |
| 161 | `inset 0 1px 0 0 rgba(...)` already noted |
| 168 | `rgba(223, 255, 97, 0.15)` | `--cg-color-brand-ai-bg-subtle` |

### 3.3 Typography Issues
- Font sizes mostly use `--cg-font-size-*` tokens except badge `font-size: 10px` (line 164).
- Font-weight `600` used directly (lines 99, 165) -- should use `--cg-font-weight-semibold`.

### 3.4 Spacing Issues
- Most spacing uses `--cg-spacing-*` tokens.
- Badge `padding: 1px 6px` (line 163) uses non-token values.
- Icon width `18px` (line 148) not on token scale.

### 3.5 Modern Design Enhancements
- Add resize handle for custom width.
- Add drag-and-drop item reordering.
- Add nested/collapsible section groups.
- Add tooltip on hover in collapsed mode showing label.

---

## 4. Prioritized Fixes

### P0 - Critical
1. **Fix all non-standard token names** -- replace `--cg-color-surface`, `--cg-color-border`, `--cg-color-text-secondary`, `--cg-color-text-primary`, `--cg-color-accent`, `--cg-color-bg-secondary`, `--cg-color-border-primary`, `--cg-color-text-tertiary` with project-standard tokens (`--cg-color-surface-container-background`, `--cg-color-surface-container-border`, `--cg-gray-*`, `--cg-brand-ai-accent`, etc.). Current tokens likely don't resolve.

### P1 - High
2. **Implement WAI-ARIA menu pattern** -- add `role="menu"` to items container, implement arrow key navigation, roving tabindex, Home/End.
3. **Replace raw `rgba()` colors** (lines 135, 141, 168) with design tokens.
4. **Add tooltip in collapsed mode** showing item label on hover.
5. **Tokenize sidebar widths** -- replace `240px` and `56px` with design tokens or CSS custom properties.

### P2 - Medium
6. **Omit `aria-current` when false** instead of setting `aria-current="false"`.
7. **Add disabled item state** with reduced opacity and `pointer-events: none`.
8. **Add skeleton/loading state** for async section data.
9. **Add Escape key** to collapse sidebar.
10. **Tokenize all magic number spacings** -- badge padding, icon width, font sizes.

### P3 - Low
11. **Add active/pressed state** on items.
12. **Add nested collapsible sections**.
13. **Add resize handle** for custom width.
14. **Tokenize transition durations** and letter-spacing.
