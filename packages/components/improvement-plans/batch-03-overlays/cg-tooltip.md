# cg-tooltip Improvement Plan

**Component**: `cg-tooltip`
**Category**: Foundation
**File**: `src/components/cg-tooltip/cg-tooltip.ts`
**Priority**: P2-Medium

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. Magic numbers throughout CSS: padding `6px 10px`, arrow size `8px`, margins `8px`/`-4px`, max-width `280px`, scale `0.92`, z-index `10000`
2. Raw `rgba()` colors in box-shadow (lines 55-57)
3. Missing Escape key handler to dismiss tooltip, and no `aria-live` for dynamic content

---

## 1. Functional Issues

1. **No Escape key dismissal** (entire file): When a tooltip is shown via focus, there is no way to dismiss it without moving focus away. WCAG 2.1 SC 1.4.13 (Content on Hover or Focus) requires Escape to dismiss.
   - **Fix**: Add a `keydown` listener for Escape on the trigger that calls `_hide()`.

2. **Viewport adjustment is one-directional** (lines 214-236): `_adjustPosition()` only flips the tooltip to the opposite side. If the tooltip overflows on both top AND the sides, it won't correct for horizontal overflow.
   - **Fix**: Add horizontal overflow detection and add an offset or shift the tooltip left/right.

3. **`_visible` is reflected as an attribute** (line 192): `_visible` is a private internal state but is reflected as `_visible` attribute on the host element. This is unusual -- it uses the attribute for CSS selectors, but it leaks internal state.
   - **Fix**: Use `:host` CSS with a class on the tooltip container instead of reflecting private state.

4. **Timer leak on rapid hover/unhover** (lines 238-269): While timeouts are cleared in `disconnectedCallback`, rapid hover/unhover could cause the `_hideTimeout` and `_showTimeout` to interact in unexpected ways if the component is re-attached to the DOM mid-animation.
   - **Minor**: Current implementation handles this reasonably, but could be cleaner with AbortController.

5. **Tooltip can appear behind other positioned elements**: `z-index: 10000` is inline magic; stacking context collisions are possible.
   - **Fix**: Use a CSS custom property `--cg-z-index-tooltip`.

---

## 2. Interaction Issues

### 2.1 State Coverage

| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Default (hidden) | ✅ | ✅ | `opacity: 0`, `pointer-events: none` |
| Default (visible) | ✅ | ✅ | Scale + fade animation |
| Hover (trigger) | ✅ | ✅ | Shows tooltip on mouseenter |
| Active | N/A | N/A | Not applicable for tooltip |
| Focus (trigger) | ✅ | ✅ | Shows tooltip on focusin |
| Disabled | ✅ | ✅ | `disabled` prop prevents show (line 239) |
| Loading | ❌ | N/A | No loading state for async tooltip content |
| Error | ❌ | N/A | Not applicable (tooltips don't error) |
| Success | ❌ | N/A | Not applicable |

### 2.2 Keyboard Navigation
- **Focus trigger**: Tooltip appears on `focusin` (line 287).
- **Focus away**: Tooltip hides on `focusout` (line 288).
- **Missing**: No Escape key to dismiss while tooltip is visible (WCAG 1.4.13 violation).

### 2.3 Focus Management
- No focus trap needed (tooltip is not interactive).
- **Issue**: If the tooltip contains interactive content via the `content` slot, users cannot reach it because `pointer-events: none` (line 53) blocks interaction.
  - **Fix**: For rich tooltips, consider a separate "popover" mode where `pointer-events` are enabled and the tooltip stays open while hovered.

### 2.4 ARIA & Accessibility
- `role="tooltip"` present (line 296).
- `aria-describedby` correctly links trigger to tooltip via `_tooltipId` (line 289).
- `aria-hidden` toggles based on visibility (line 297).
- **Missing**: Escape key dismissal per WCAG 1.4.13.
- **Good**: Tooltip content is accessible via `aria-describedby`.

### 2.5 Touch & Mobile
- **Missing**: No touch support. `mouseenter`/`mouseleave` don't fire on touch devices.
  - **Fix**: Add `touchstart` handler that shows tooltip, and a `touchend`/`click` elsewhere that hides it.
- **Missing**: No long-press-to-show pattern for mobile.

---

## 3. Styling Issues

### 3.1 Magic Numbers Found

| Line | Value | Suggested Token |
|------|-------|-----------------|
| 43 | `z-index: 10000` | `var(--cg-z-index-tooltip, 10000)` |
| 44 | `padding: 6px 10px` | `var(--cg-spacing-6, 6px) var(--cg-spacing-10, 10px)` |
| 52 | `max-width: 280px` | `var(--cg-tooltip-max-width, 280px)` |
| 61 | `transform: scale(0.92)` | `var(--cg-motion-scale-tooltip, 0.92)` |
| 79-80 | `scale(0.92)` in keyframes | Same token |
| 96-97 | `width: 8px; height: 8px` | `var(--cg-tooltip-arrow-size, 8px)` |
| 107, 127, 145, 165 | `margin-bottom/top/right/left: 8px` | `var(--cg-spacing-8, 8px)` |
| 117-118, 135-136, 153-154, 173-174 | `bottom/top/right/left: -4px; margin-*: -4px` | Derived from arrow size: `calc(var(--cg-tooltip-arrow-size) / -2)` |

### 3.2 Raw Colors Found

| Line | Color | Suggested Token |
|------|-------|-----------------|
| 55 | `rgba(255, 255, 255, 0.05)` | `var(--cg-color-surface-glass-highlight)` |
| 56 | `rgba(0, 0, 0, 0.3)` | Elevation token |
| 57 | `rgba(0, 0, 0, 0.2)` | Elevation token |

### 3.3 Typography Issues
- All font properties use tokens correctly.
- No issues found.

### 3.4 Spacing Issues
- Padding `6px 10px` (line 44) should use spacing tokens.
- Arrow positioning uses hardcoded `8px` and `-4px`.

### 3.5 Modern Design Enhancements
- Scale + fade animation is already polished.
- **Add**: Subtle backdrop-filter blur for glassmorphism consistency with modal/drawer.
- **Add**: Thin border with gradient for a more premium look.
- **Add**: Optional max-width override via CSS custom property for wider tooltips.

---

## 4. Prioritized Fixes

### P0 - Critical
1. **Add Escape key dismissal** -- WCAG 1.4.13 requires that content shown on hover/focus can be dismissed via Escape without moving pointer or focus.

### P1 - High
2. **Replace raw `rgba()` colors with tokens** -- 3 instances in box-shadow.
3. **Replace magic numbers with tokens** -- z-index, padding, max-width, arrow sizing, margins.
4. **Add touch support** -- Tooltip is completely unusable on mobile touch devices.

### P2 - Medium
5. **Improve viewport detection** to handle edge cases (horizontal overflow, corner positions).
6. **Stop reflecting `_visible` as a host attribute** -- Use internal CSS class instead.
7. **Add rich tooltip interactive mode** where pointer-events are enabled for links/buttons inside tooltip content slot.

### P3 - Low
8. **Add glassmorphism backdrop-filter** for visual consistency with other overlay components.
9. **Add subtle gradient border** for premium feel.
10. **Add CSS custom property** for max-width override.
11. **Add long-press-to-show** gesture for mobile accessibility.
