# cg-button-group Improvement Plan

**Component**: `cg-button-group`
**Category**: Foundation
**File**: `src/components/cg-button-group/cg-button-group.ts`
**Priority**: P2-Medium

---

## Executive Summary

**Overall Health**: Fair
**Top 3 Issues**:
1. Layout styles target `:host` but the actual layout container is a `<div>` -- flex properties on `:host` have no effect since the template renders `<div role="group"><slot></slot></div>` but all flex rules target `:host` instead of the inner div
2. Magic numbers `-1px` in attached mode margin overrides (lines 41, 57) and `border-radius: 0` without token
3. No keyboard roving tabindex -- attached button groups should support arrow key navigation per WAI-ARIA toolbar pattern

---

## 1. Functional Issues

### 1.1 Flex styles applied to wrong element
- **Lines 19-20, 23-31**: All flex rules (`flex-direction`, `gap`, `justify-content`) target `:host`, but the rendered DOM is:
  ```html
  <div role="group"><slot></slot></div>
  ```
  Since `:host` has `display: inline-flex` from `hostBase`, the slotted children are inside the `<div>`, not directly inside `:host`. The `<div>` has no display rule, so it defaults to `display: block`, making all flex layout on `:host` irrelevant to the slotted content.
- **Fix**: Either (a) remove the wrapper `<div>` and put `role="group"` on `:host`, or (b) target the inner div with rules like `div { display: flex; flex-direction: row; }` and move all flex properties to the div selector.

### 1.2 `::slotted(*)` border-radius override may not penetrate Shadow DOM
- **Lines 39, 43-44, 47-48**: `::slotted(*)` sets `border-radius: 0` on the slotted `<cg-button>` host, but the actual visible border-radius is on the inner `<button>` inside `cg-button`'s shadow DOM. `::slotted` can only style the direct slotted element (the outer host), not its shadow children. This means attached mode border-radius merging may not work visually.
- **Fix**: `cg-button` should inherit border-radius from a CSS custom property (e.g., `--cg-button-radius`) that `cg-button-group` can override via `::slotted`. Or use CSS parts: `cg-button` exports `part="button"` and `cg-button-group` uses `::slotted(cg-button)::part(button)` -- but note `::slotted()::part()` is not valid. The best approach is for `cg-button` to read `border-radius` from a custom property and for the group to set that property.

### 1.3 No `aria-label` on the group
- **Line 74**: The `<div role="group">` has no `aria-label` or `aria-labelledby`. Screen readers will announce "group" with no context.
- **Fix**: Add an `ariaLabel` property and bind it: `<div role="group" aria-label=${this.ariaLabel || nothing}>`.

### 1.4 Column attached mode missing `:only-child` rule
- **Lines 55-65**: Horizontal attached mode has a `:only-child` rule (line 49-52) but vertical attached mode does not. A single child in a vertical attached group gets no border-radius.
- **Fix**: Add `:host([attached][direction="column"]) ::slotted(*:only-child) { border-radius: var(--cg-border-radius-150, 12px); margin-top: 0; }`.

---

## 2. Interaction Issues

### 2.1 State Coverage
| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Default | Yes | Yes | Layout renders correctly when flex fix is applied |
| Hover | N/A | N/A | Group itself has no hover; children handle it |
| Active | N/A | N/A | Group itself has no active state |
| Focus | No | N/A | No focus management -- group is not focusable |
| Disabled | No | N/A | No disabled prop to disable all children at once |
| Loading | No | N/A | No group-level loading state |
| Error | No | N/A | No group-level error state |
| Success | No | N/A | No group-level success state |

Note: For a layout/grouping component, most states are delegated to children. However, a `disabled` prop that propagates to children is a standard pattern.

### 2.2 Keyboard Navigation
- **Critical gap**: No roving tabindex or arrow key navigation. WAI-ARIA toolbar pattern (which attached button groups resemble) requires:
  - Only one button in the group is in the tab order at a time
  - Arrow keys move focus between buttons
  - Home/End jump to first/last button
- **Fix**: Implement a `_handleKeyDown` listener on the group that manages focus across slotted `<cg-button>` children using `ArrowLeft`/`ArrowRight` (row) or `ArrowUp`/`ArrowDown` (column).

### 2.3 ARIA & Accessibility
- **Line 74**: `role="group"` is correct for non-toolbar groups.
- **Missing**: `aria-label` attribute (see 1.3).
- **Enhancement**: For attached mode, consider `role="toolbar"` instead of `role="group"` since attached buttons behave as a toolbar.
- **Enhancement**: Add `aria-orientation` based on `direction` property (`horizontal` for row, `vertical` for column).

### 2.4 Touch & Mobile
- No touch-specific concerns for a layout container. Children handle their own touch interactions.
- **Enhancement**: In column mode with `width: 100%`, ensure the group respects safe area insets on mobile: `padding-inline: env(safe-area-inset-left) env(safe-area-inset-right)` as an opt-in.

---

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Context | Suggested Token |
|------|-------|---------|-----------------|
| 36 | `0` | `gap: 0` in attached mode | Acceptable (zero value) |
| 39 | `border-radius: 0` | Attached children reset | `var(--cg-border-radius-none, 0)` |
| 41 | `-1px` | Negative margin for border collapse | `calc(-1 * var(--cg-border-width-sm, 1px))` |
| 57 | `-1px` | Vertical negative margin | `calc(-1 * var(--cg-border-width-sm, 1px))` |

### 3.2 Raw Colors Found
- None. This component has no color declarations.

### 3.3 Typography Issues
- None. This is a layout-only component.

### 3.4 Spacing Issues
- Gap values (lines 23-26) are properly tokenized with `--cg-spacing-*`.
- **Missing**: No `lg` gap option. Consider adding `:host([gap="lg"]) { gap: var(--cg-spacing-16, 16px); }`.

### 3.5 Modern Design Enhancements
- **Attached mode dividers**: Add subtle 1px divider lines between attached buttons using `::slotted(*):not(:first-child)::before` -- however, `::slotted` only allows one pseudo-selector, so this must be done via a CSS custom property or by injecting divider elements.
- **Attached mode subtle shadow**: Add a shared `box-shadow` on the group container for depth: `box-shadow: var(--cg-elevation-low)`.
- **Transition on layout changes**: If `direction` changes dynamically, animate the transition with `transition: flex-direction` (not directly animatable, but gap and dimensions can transition).

---

## 4. Prioritized Fixes

### P0 - Critical
1. **Fix flex layout target**: Move all flex properties from `:host` selectors to the inner `<div>` element, or remove the wrapper div and apply `role="group"` to `:host`. Without this fix, the component layout is broken.

### P1 - High
2. **Fix `::slotted` border-radius penetration**: `cg-button` needs to accept an overridable `--cg-button-border-radius` custom property so the group can control child border-radius through the shadow boundary.
3. **Add `aria-label` property**: Bind to the group element for screen reader context.
4. **Add vertical `:only-child` rule**: Missing border-radius handling for single-child vertical attached groups.

### P2 - Medium
5. **Implement roving tabindex**: Arrow key navigation for attached mode groups following WAI-ARIA toolbar pattern.
6. **Replace magic `-1px` with token expression**: Use `calc(-1 * var(--cg-border-width-sm, 1px))`.
7. **Add `disabled` propagation**: A group-level `disabled` property that sets `disabled` on all slotted children.
8. **Add `aria-orientation`**: Set based on `direction` property.
9. **Consider `role="toolbar"` for attached mode**: More semantically accurate.

### P3 - Low
10. **Add `gap="lg"` option**: Extend the gap scale.
11. **Add attached mode visual dividers**: Subtle separator lines between buttons.
12. **Add shared elevation shadow**: Depth effect on the group container.
