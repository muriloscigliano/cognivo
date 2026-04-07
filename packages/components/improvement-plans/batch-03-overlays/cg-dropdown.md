# cg-dropdown Improvement Plan

**Component**: `cg-dropdown`
**Category**: Foundation
**File**: `src/components/cg-dropdown/cg-dropdown.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. Raw `rgba()` colors throughout (box-shadow, background-image, hover background, active background -- lines 64-67, 156, 162)
2. Magic numbers in CSS (z-index `1000`, min/max-width `180px`/`320px`, scale `0.95`/`1.01`, icon size `16px`/`14px`, line-height `1.4`)
3. Outside click handler registered on `connectedCallback` even when dropdown is closed, causing unnecessary event processing

---

## 1. Functional Issues

1. **Outside click handler always active** (lines 224-227): The document-level click listener is bound in `connectedCallback` regardless of open state. For a page with many dropdowns, this creates unnecessary event processing.
   - **Fix**: Only add the listener when opening; remove when closing.

2. **`_focusActiveItem` queries by CSS class** (lines 331-338): `querySelectorAll('.menu-item:not(.disabled)')` may not match the correct index if dividers change the DOM order, since dividers are rendered between items.
   - **Current**: Items and dividers are interleaved in the DOM, but `_enabledItems` doesn't account for divider DOM nodes.
   - **Fix**: Use `data-index` attributes on menu items and query by that.

3. **No typeahead / character search** (entire keyboard handler): Standard menu behavior includes typing a character to jump to the first item starting with that letter.
   - **Fix**: Add a character buffer with debounce that matches against item labels.

4. **No cancelable close event**: Like the modal and drawer, there's no way to prevent the dropdown from closing.
   - **Minor** for dropdowns, but useful for confirmation menus.

5. **Trigger element has `role="button"` and `tabindex="0"`** (lines 350-351): This wraps the slotted trigger in another button-like element, creating a nested interactive element if the trigger is already a button.
   - **Fix**: Use `role="combobox"` or pass ARIA attributes through to the slotted element, or detect if the slotted child is already interactive.

6. **No sub-menu support**: Nested dropdown menus are not possible. Items with children can't expand.
   - **Lower priority** but common in production menu systems.

---

## 2. Interaction Issues

### 2.1 State Coverage

| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Default (closed) | ✅ | ✅ | Menu hidden via opacity + pointer-events |
| Default (open) | ✅ | ✅ | Scale + fade entrance |
| Hover (item) | ✅ | ✅ | Background change + subtle scale |
| Active (item) | ✅ | ✅ | Press scale via `--cg-interaction-press-scale` |
| Focus (item) | ✅ | ✅ | Focus-visible ring via tokens |
| Disabled (item) | ✅ | ✅ | Reduced opacity + disabled color token |
| Loading | ❌ | N/A | No loading state for async menu items |
| Error | ❌ | N/A | No error state for failed item loading |
| Success | ❌ | N/A | No success indicator after selection |

### 2.2 Keyboard Navigation
- **Enter / Space / ArrowDown**: Opens menu and focuses first item (lines 276-285).
- **ArrowDown / ArrowUp**: Cycles through enabled items with wrapping (lines 297-305).
- **Enter / Space**: Selects active item (lines 306-313).
- **Escape**: Closes menu and returns focus to trigger (lines 291-294).
- **Home / End**: Jumps to first/last item (lines 314-323).
- **Tab**: Closes menu (line 325-327).
- **Missing**: Typeahead character search.
- **Good**: Comprehensive keyboard support overall.

### 2.3 Focus Management
- **On open**: Focus moves to first item via `_focusActiveItem()` (lines 280-283).
- **On close**: Focus returns to trigger via `_focusTrigger()` (lines 340-345).
- **Good**: Both directions of focus management are handled.

### 2.4 ARIA & Accessibility
- Trigger: `role="button"`, `aria-haspopup="menu"`, `aria-expanded` (lines 351-354).
- Menu: `role="menu"` (line 363).
- Items: `role="menuitem"`, `aria-disabled` (lines 374-375).
- **Issue**: `aria-label="Dropdown menu"` (line 364) is generic. Should reflect the trigger label or be configurable.
- **Issue**: Nested `role="button"` with `tabindex="0"` wrapping a slotted button creates double interactive element.
- **Missing**: `aria-activedescendant` pattern (alternative to moving focus to items).

### 2.5 Touch & Mobile
- Click to toggle works (line 355).
- **Missing**: No viewport-aware repositioning. If the dropdown is at the bottom of the viewport, it may render off-screen.
- **Missing**: No mobile-friendly full-width mode or action sheet pattern.

---

## 3. Styling Issues

### 3.1 Magic Numbers Found

| Line | Value | Suggested Token |
|------|-------|-----------------|
| 56 | `z-index: 1000` | `var(--cg-z-index-dropdown, 1000)` |
| 57 | `min-width: 180px` | `var(--cg-dropdown-min-width, 180px)` |
| 58 | `max-width: 320px` | `var(--cg-dropdown-max-width, 320px)` |
| 71 | `transform: scale(0.95)` | `var(--cg-motion-scale-enter, 0.95)` |
| 114 | `scale(0.95)` in keyframes | Same token |
| 142 | `line-height: 1.4` | `var(--cg-line-height-snug, 1.375)` |
| 157 | `transform: scale(1.01)` | `var(--cg-interaction-hover-scale, 1.01)` |
| 184 | `width: 16px; height: 16px` | `var(--cg-size-icon-sm, 16px)` |
| 188 | `font-size: 14px` | `var(--cg-font-size-sm, 14px)` (already used elsewhere) |

### 3.2 Raw Colors Found

| Line | Color | Suggested Token |
|------|-------|-----------------|
| 64 | `rgba(255, 255, 255, 0.05)` | `var(--cg-color-surface-glass-highlight)` |
| 65 | `rgba(0, 0, 0, 0.3)` | Elevation token |
| 66 | `rgba(0, 0, 0, 0.4)` | Elevation token |
| 67 | `rgba(255, 255, 255, 0.03)` | `var(--cg-color-surface-glass-gradient)` |
| 162 | `rgba(255, 255, 255, 0.08)` | `var(--cg-color-surface-active-background)` |

### 3.3 Typography Issues
- Menu item `line-height: 1.4` (line 142) should use `--cg-line-height-snug` (1.375).
- Icon `font-size: 14px` (line 188) should use `var(--cg-font-size-sm)`.

### 3.4 Spacing Issues
- All spacing values use tokens correctly via `--cg-spacing-*`.
- No issues found.

### 3.5 Modern Design Enhancements
- Background gradient overlay present -- good.
- Stagger entrance animation with `--stagger-index` -- very polished.
- **Add**: Glassmorphism `backdrop-filter: blur()` on the menu for depth.
- **Add**: Viewport-aware repositioning so the menu flips when near viewport edges.
- **Add**: Custom scrollbar styling if the menu has many items and scrolls.

---

## 4. Prioritized Fixes

### P0 - Critical
1. **Fix nested interactive element** -- Trigger wrapper with `role="button"` and `tabindex="0"` wrapping a slotted `<cg-button>` creates double-tap / double-activation for assistive technology users.

### P1 - High
2. **Replace all raw `rgba()` colors with semantic tokens** -- 5 instances.
3. **Replace magic numbers with tokens** -- z-index, min/max-width, scale values, line-height, icon sizing.
4. **Only register outside click handler when open** -- Performance optimization for pages with many dropdowns.
5. **Add viewport-aware repositioning** -- Menu renders off-screen if trigger is at viewport bottom/right.

### P2 - Medium
6. **Add configurable `aria-label`** for the menu (currently hardcoded "Dropdown menu").
7. **Add typeahead character search** for keyboard navigation.
8. **Fix `_focusActiveItem` index mismatch** when dividers are present in the DOM.
9. **Add loading state** for async item loading (skeleton items).
10. **Add glassmorphism backdrop-filter** to menu.

### P3 - Low
11. **Add sub-menu support** for nested menu hierarchies.
12. **Add mobile action sheet mode** that presents items as a bottom sheet on small screens.
13. **Add custom scrollbar styling** for long menus.
14. **Add success indicator** (brief checkmark animation after selection).
