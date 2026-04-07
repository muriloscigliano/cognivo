# AI Confidence Slider Improvement Plan

**Component**: `ai-confidence-slider`
**Category**: AI-Native
**File**: `src/components/ai-confidence-slider/ai-confidence-slider.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Fair
**Top 3 Issues**:
1. Raw hex colors returned from `_getBarColor()` method (lines 158-162) -- `#f87171`, `#fbbf24`, `#4ade80` injected directly into inline styles, bypassing the token system entirely
2. Multiple magic numbers in slider thumb dimensions, distribution bar, presets, and value badge positioning (lines 60, 64-67, 80, 91-92, 104, 107, 118-119, 122)
3. CSS syntax error: orphaned closing brace on line 126, likely from a broken `@media` block

---

## 1. Functional Issues

- **Line 126**: Orphaned `}` closing brace after `.dist-bar.below` rule. This is a CSS parse issue that could cause subsequent rules to be ignored.
- **Line 157-162**: `_getBarColor()` returns raw hex strings that are injected as inline `style` attributes (line 203). This completely bypasses the design token system and makes theming impossible for distribution bars.
- **Line 61**: The slider gradient uses `#fbbf24` as the mid-point color (raw hex, not tokenized).
- **Line 87**: Same `#fbbf24` raw hex in the Firefox `::moz-range-track`.
- **Line 165**: `thumbPos` calculation does not account for edge cases where `max === min`, which would cause division by zero.

## 2. Interaction Issues

### 2.1 State Coverage
| State | Implemented | Notes |
|-------|------------|-------|
| Default | Yes | |
| Hover | Yes | `.preset-btn:hover` (line 113) |
| Focus-visible | Partial | Only on webkit slider thumb (line 74); missing on preset buttons |
| Active preset | Yes | `.preset-btn.active` (line 114) |
| Disabled | **No** | No disabled state for slider or presets |
| Loading | **No** | No loading state |
| Error | **No** | No error/validation state (e.g., invalid range) |
| Active/pressed | **No** | No `:active` on preset buttons |

**Missing states**: focus-visible on presets, disabled, loading, error, active/pressed (5 of 8+ required).

### 2.2 Keyboard Navigation
- The native `<input type="range">` is keyboard-accessible via arrow keys.
- **Preset buttons** are standard `<button>` elements and receive keyboard focus.
- **Missing**: No `aria-label` on preset buttons -- they have visible text but no additional context for screen readers about what "Low (30%)" means in the confidence context.

### 2.3 ARIA & Accessibility
- **Line 183**: The range input has good ARIA attributes (`aria-label`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`).
- **Line 197**: Distribution bars are properly `aria-hidden="true"`.
- **Preset buttons** (lines 188-191): Missing `aria-pressed` attribute to indicate which preset is active.
- **Line 179**: The value badge has no `role` and `aria-hidden` is not set; it's a visual duplicate of the slider value. Should be `aria-hidden="true"`.
- **Missing `focus-visible`** on preset buttons -- line 113 only has `:hover`.

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Property | Value | Suggested Token |
|------|----------|-------|-----------------|
| 43 | `font-size` | `11px` | `var(--cg-font-size-2xs, 11px)` |
| 47 | `font-size` | `12px` | `var(--cg-font-size-xs, 12px)` (already exists but not used) |
| 59 | `height` | `6px` | `var(--cg-spacing-6, 6px)` |
| 60 | `border-radius` | `3px` | `var(--cg-border-radius-25, 3px)` |
| 65-66 | `width/height` | `18px` | `var(--cg-spacing-18, 18px)` |
| 67 | `border-radius` | `50%` | OK (semantically correct) |
| 80 | `width/height` | `18px` | `var(--cg-spacing-18, 18px)` |
| 92 | `top` | `-24px` | `calc(-1 * var(--cg-spacing-24, 24px))` |
| 95 | `padding` | `2px` | `var(--cg-spacing-2, 2px)` |
| 104 | `margin-bottom` | `10px` | `var(--cg-spacing-10, 10px)` |
| 107 | `padding` | `5px 0` | `var(--cg-spacing-5, 5px) 0` |
| 118 | `gap` | `1px` | `var(--cg-spacing-1, 1px)` |
| 118 | `height` | `32px` | `var(--cg-spacing-32, 32px)` |
| 119 | `padding-top` | `8px` | `var(--cg-spacing-8, 8px)` (should use token) |
| 122 | `border-radius` | `2px 2px 0 0` | `var(--cg-border-radius-25, 2px)` |
| 122 | `min-height` | `2px` | `var(--cg-spacing-2, 2px)` |

### 3.2 Raw Colors Found
| Line | Value | Context | Suggested Token |
|------|-------|---------|-----------------|
| 35 | `rgba(255, 255, 255, 0.03)` | background gradient | `var(--cg-color-surface-gradient-start)` |
| 35 | `rgba(255, 255, 255, 0.05)` | box-shadow inset | `var(--cg-color-surface-highlight)` |
| 61 | `#fbbf24` | slider gradient mid-point | `var(--cg-yellow-400, #fbbf24)` |
| 87 | `#fbbf24` | Firefox range track gradient | `var(--cg-yellow-400, #fbbf24)` |
| 114 | `rgba(223, 255, 97, 0.06)` | `.preset-btn.active` | `var(--cg-brand-ai-accent-alpha-6)` |
| 159 | `'#f87171'` | JS: bar color low | Should use CSS custom property |
| 160 | `'#fbbf24'` | JS: bar color mid | Should use CSS custom property |
| 161 | `'#4ade80'` | JS: bar color high | Should use CSS custom property |

### 3.3 Spacing Issues
- The distribution bar area padding (line 119 `padding-top: 8px`) is not using the token format `var(--cg-spacing-8)`.
- The presets section `margin-bottom: 10px` (line 104) is a magic number.

### 3.4 Modern Design Enhancements
- The slider thumb could use a glow/shadow effect on hover for better affordance.
- Distribution bars could animate in with a staggered entrance.
- Consider adding tick marks along the slider track at 0%, 25%, 50%, 75%, 100%.
- The value badge could use a small arrow/caret pointing down to the thumb.

## 4. Prioritized Fixes

### P0 - Critical
1. **Fix CSS syntax error** -- orphaned `}` on line 126 must be removed or the broken media query must be completed.
2. **Replace `_getBarColor()` raw hex returns** with CSS custom properties or token references. The inline style injection on line 203 bypasses theming.

### P1 - High
3. **Replace raw `#fbbf24`** in slider gradient (lines 61, 87) with `var(--cg-yellow-400, #fbbf24)`.
4. **Replace all magic numbers** listed in 3.1 with design tokens.
5. **Add `focus-visible` styles** to preset buttons.
6. **Add disabled state** -- support disabling the slider and preset buttons.

### P2 - Medium
7. **Add `aria-pressed`** to preset buttons.
8. **Add `aria-hidden="true"`** to value badge (line 179).
9. **Add division-by-zero guard** in `thumbPos` calculation (line 165).
10. **Add loading state** with a skeleton or disabled appearance.
11. **Add error/validation state** (e.g., when value is out of range).

### P3 - Low
12. **Add `:active` pressed style** on preset buttons.
13. **Add tick marks** on slider track.
14. **Add staggered animation** for distribution bars.
15. **Add hover glow** effect to slider thumb.
