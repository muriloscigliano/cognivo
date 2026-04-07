# AI Usage Meter Improvement Plan

**Component**: `ai-usage-meter`
**Category**: AI-Native
**File**: `src/components/ai-usage-meter/ai-usage-meter.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. Raw hex `#eab308` on line 72 for warning color with no token fallback
2. Multiple magic numbers for SVG dimensions and font sizes
3. Missing active, disabled, loading, and error states

---

## 1. Functional Issues
- **Line 152**: `Math.round` for percentage causes a jump from 99% to 100% -- consider showing decimal for values near thresholds (e.g., 99.5% rounds to 100% even though quota isn't fully used).
- **No `limit` validation**: If `limit` is set to a negative number, `pct` calculation at line 152 will produce 0 but no error feedback is provided.
- **Upgrade button always hidden below 80%**: No way for the host to force-show the upgrade CTA regardless of usage percentage.

## 2. Interaction Issues

### 2.1 State Coverage
| State | Supported | Notes |
|-------|-----------|-------|
| Default | Yes | Normal tier rendering |
| Hover | Partial | Only on upgrade button (line 133) |
| Active/Pressed | No | No `:active` state on upgrade button |
| Focus | Partial | Only upgrade button has `:focus-visible` |
| Disabled | No | No disabled state on component or button |
| Loading | No | No skeleton/loading state |
| Error | No | No error state when data fetch fails |
| Warning | Yes | 80-95% tier |
| Danger | Yes | 95%+ tier |

**Missing**: active, disabled, loading, error states (4 of 8+ missing).

### 2.2 Keyboard Navigation
- **Upgrade button** (line 184): Standard `<button>` element, natively keyboard accessible -- good.
- **Overall component**: The meter itself is not focusable. For a dashboard widget, consider making the ring wrapper focusable for screen reader announcement.

### 2.3 ARIA & Accessibility
- **Line 159**: `role="meter"` with `aria-valuemin`, `aria-valuemax`, `aria-valuenow` -- excellent use of the meter role.
- **Line 162**: SVG has `aria-hidden="true"` -- correct since decorative.
- **Missing**: No `aria-describedby` linking the meter to the reset date or detail text.
- **Upgrade button** (line 184): No `aria-label` -- the visible text "Upgrade Plan" is sufficient, but adding context about current usage would help.

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Suggestion |
|------|-------|------------|
| 42 | `min-width: 180px` | Use `var(--cg-size-2250, 180px)` or a component-level token |
| 49 | `width: 100px` | Use `var(--cg-size-1200, 100px)` |
| 50 | `height: 100px` | Same |
| 55 | `width: 100px` | Same |
| 56 | `height: 100px` | Same |
| 63 | `stroke-width: 8` | Consider a CSS custom property `--ring-stroke-width` |
| 66 | `stroke-width: 8` | Same |
| 93 | `font-size: 10px` | Use `var(--cg-font-size-2xs, 10px)` |
| 95 | `letter-spacing: 0.5px` | Use `var(--cg-letter-spacing-wide, 0.05em)` |
| 118 | `margin-top: 2px` | Use `var(--cg-spacing-2, 2px)` |

### 3.2 Raw Colors Found
| Line | Color | Replacement |
|------|-------|------------|
| 72 | `#eab308` | `var(--cg-color-status-warning-text-default)` |

### 3.3 Spacing Issues
- Line 43-44: `box-shadow` and `background-image` use raw `rgba()` values for the glass effect. These should be abstracted to shared tokens or mixins.
- Line 69: Transition uses raw `500ms ease, 300ms ease` -- should use `var(--cg-motion-duration-moderate)` and `var(--cg-motion-easing-standard)`.

### 3.4 Modern Design Enhancements
- SVG ring could have a subtle drop shadow or glow at the stroke tip for a premium feel.
- The ring fill could animate on first render with a sweep animation.
- Consider adding a pulsing animation on the ring when in danger tier.
- The upgrade button could use a gradient or shimmer effect to draw attention.

## 4. Prioritized Fixes

### P0 - Critical
1. **Replace raw `#eab308`** on line 72 with `var(--cg-color-status-warning-text-default, #eab308)`.

### P1 - High
2. **Add loading skeleton state** -- show a shimmer ring while data loads.
3. **Add disabled state** -- dim the component and disable the upgrade button.
4. **Add `:active` press state** to upgrade button.
5. **Replace `font-size: 10px`** (line 93) with `var(--cg-font-size-2xs, 10px)`.
6. **Replace SVG dimension magic numbers** (lines 49-56) with CSS custom properties.

### P2 - Medium
7. **Add `aria-describedby`** linking meter to reset date info.
8. **Replace transition durations** with motion tokens.
9. **Replace `min-width: 180px`** (line 42) and other pixel literals with tokens.
10. **Add error state** for failed data scenarios.

### P3 - Low
11. **Add ring sweep animation** on first render for visual polish.
12. **Add danger-tier pulse animation** for urgency.
13. **Add `letter-spacing` token** on line 95.
14. **Consider force-show upgrade CTA** via a `showUpgrade` boolean prop.
