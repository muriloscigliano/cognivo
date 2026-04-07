# cg-link Improvement Plan

**Component**: `cg-link`
**Category**: Foundation
**File**: `src/components/cg-link/cg-link.ts`
**Priority**: P2-Medium

---

## Executive Summary

**Overall Health**: Good
**Top 3 Issues**:
1. Missing loading, error, and success states -- only default/hover/focus/disabled are implemented
2. Several magic numbers: `150ms ease` transition (line 27), `-1px` underline position (line 33), `1px` underline height (line 35), `3px` underline offset (line 72), focus ring widths `2px`/`4px` (lines 50-51)
3. `<a>` without `href` is not keyboard accessible -- when `href` is empty, the anchor is not natively focusable by tab, but `tabindex` is always set (line 118), which partially mitigates this

---

## 1. Functional Issues

### 1.1 Empty `href` renders a non-semantic anchor
- **Line 113-114**: When `href` is an empty string (default), `href` is not rendered (via `nothing`), producing `<a>` without an `href`. An anchor without `href` is technically not a link per HTML spec. It will not appear in link lists for assistive technology.
- **Fix**: If no `href` is provided, render a `<button>` styled as a link instead, or require `href` as a mandatory prop.

### 1.2 `disabled` prevents click but link is still navigable
- **Lines 77-81, 103-108**: `pointer-events: none` blocks mouse clicks, and `_onClick` calls `preventDefault()`. However, `tabindex` is set to `-1` when disabled (line 118) which correctly removes it from tab order. But a user could still navigate to the link via "browse links" in a screen reader, and the `href` is still present and functional.
- **Fix**: Also remove `href` from the anchor when disabled: `href=${this.disabled ? nothing : (this.href || nothing)}`.

### 1.3 No `rel` attribute for non-external links
- **Line 116**: `rel` is only set for external links. Consider allowing a `rel` property for general use (e.g., `nofollow`, `sponsored`).

### 1.4 Event fires even when disabled (edge case)
- **Lines 103-108**: `_onClick` checks `this.disabled` and returns early, which is correct. However, if a screen reader user activates the link through an accessibility API bypass, the event still fires because `preventDefault()` stops navigation but the `cg-link-click` event is not dispatched (returns before line 108). This is actually correct behavior -- no issue here.

### 1.5 Missing `download` attribute support
- The component has no `download` property for file download links. This is a common link feature.
- **Fix**: Add `@property() download = '';` and bind to the anchor.

---

## 2. Interaction Issues

### 2.1 State Coverage
| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Default | Yes | Yes | All variants use semantic tokens |
| Hover | Yes | Yes | Color change + underline animation from center |
| Active | No | N/A | No `:active` style -- link has no press feedback |
| Focus | Yes | Yes | Dual-ring focus via `--cg-brand-ai-accent` |
| Disabled | Yes | Partial | `opacity: 0.5` is a magic number |
| Loading | No | N/A | No loading indicator for links that trigger async actions |
| Error | No | N/A | No error state for broken/invalid links |
| Success | No | N/A | No success state |

### 2.2 Keyboard Navigation
- **Good**: `tabindex` is managed (line 118) -- `0` normally, `-1` when disabled.
- **Missing**: No `:active` state means keyboard Enter press has no visual feedback.
- **Missing**: No `keydown` handler to prevent activation when disabled (native `<a>` with `tabindex=-1` should prevent this, but defense-in-depth is advisable).
- **Enhancement**: Add `a:active { color: var(--cg-text-accent-active); }` for visual press feedback.

### 2.3 ARIA & Accessibility
- **Good**: `aria-disabled` is set when disabled (line 117).
- **Good**: External links have `rel="noopener noreferrer"` (line 116).
- **Missing**: External links should also have an accessible indicator. The external icon is `aria-hidden="true"` (line 123) which is correct for visual users, but screen readers get no indication the link opens in a new tab.
- **Fix**: Add `aria-label` or append "(opens in new tab)" to the accessible name for external links.
- **Missing**: No `aria-current` support for navigation use cases (e.g., `aria-current="page"`).

### 2.4 Touch & Mobile
- **Missing**: No touch target size enforcement. Small link text with `size="sm"` may have a touch target smaller than 44x44px.
- **Fix**: Add `min-height: 44px; min-width: 44px;` (or equivalent token) as a touch target minimum, at least on mobile via media query.
- **Missing**: No `-webkit-tap-highlight-color: transparent`.

---

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Context | Suggested Token |
|------|-------|---------|-----------------|
| 27 | `150ms ease` | Color transition | `var(--cg-motion-duration-normal, 150ms) var(--cg-motion-easing-default)` |
| 33 | `-1px` | Underline `bottom` position | `calc(-1 * var(--cg-border-width-sm, 1px))` |
| 35 | `1px` | Underline height | `var(--cg-border-width-sm, 1px)` |
| 50 | `2px` | Focus ring inner width | `var(--cg-border-width-focus-inner, 2px)` |
| 51 | `4px` | Focus ring outer width | `var(--cg-border-width-focus-outer, 4px)` |
| 72 | `3px` | `text-underline-offset` | `var(--cg-spacing-3, 3px)` or a dedicated underline token |
| 79 | `0.5` | Disabled opacity | `var(--cg-opacity-disabled, 0.5)` |
| 88-89 | `0.85em` | External icon width/height | `var(--cg-icon-size-inline, 0.85em)` |

### 3.2 Raw Colors Found
- None. All color values use `var(--cg-*)` tokens with hex fallbacks. Clean.

### 3.3 Typography Issues
- **Line 25**: `font-weight: var(--cg-font-weight-medium, 500)` -- properly tokenized.
- Font sizes (lines 55-57) properly use `--cg-font-size-*` tokens.
- No issues.

### 3.4 Spacing Issues
- **Line 21**: `gap: var(--cg-spacing-4, 4px)` -- properly tokenized.
- No other spacing concerns.

### 3.5 Modern Design Enhancements
- **Underline animation**: The grow-from-center animation (lines 29-42) is already quite polished and modern.
- **Enhancement**: Add a subtle glow effect on hover for the accent variant: `text-shadow: 0 0 8px var(--cg-brand-ai-accent-glow)`.
- **Enhancement**: Add smooth color transition on the underline pseudo-element -- currently the color snaps because `background: currentColor` inherits the transition, but an explicit `transition: background` on the pseudo would ensure it.
- **Enhancement**: Add a visited state for non-external links: `:host([variant="default"]) a:visited { color: var(--cg-color-text-muted); }`.

---

## 4. Prioritized Fixes

### P0 - Critical
- None

### P1 - High
1. **Add `:active` state**: Links currently have no press/active feedback. Add `a:active { opacity: 0.8; }` or a color shift for all variants.
2. **Add screen reader announcement for external links**: Append "(opens in new tab)" via `aria-label` or visually-hidden text to inform screen readers.
3. **Fix disabled link still having `href`**: Remove `href` from anchor when disabled to prevent assistive technology navigation.
4. **Add `aria-current` support**: Essential for navigation link use cases.

### P2 - Medium
5. **Replace magic numbers with tokens**: 8 instances listed in section 3.1.
6. **Add loading state**: For links that trigger async actions (e.g., SPA navigation), show a subtle loading indicator.
7. **Add minimum touch target size**: Ensure 44x44px minimum for touch devices.
8. **Add `download` property**: Support file download links.
9. **Handle empty `href` semantically**: Render as `<button>` when no `href` is provided.

### P3 - Low
10. **Add visited state**: Visual distinction for previously visited links.
11. **Add hover glow for accent variant**: `text-shadow` glow effect.
12. **Tokenize disabled opacity**: Replace `0.5` with `var(--cg-opacity-disabled)`.
13. **Add error state**: Visual indicator for broken/unreachable links.
14. **Add `-webkit-tap-highlight-color: transparent`**: Mobile polish.
