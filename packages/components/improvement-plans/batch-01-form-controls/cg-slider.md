# CgSlider Improvement Plan

**Component**: `cg-slider`
**Category**: Foundation
**File**: `src/components/cg-slider/cg-slider.ts`
**Priority**: P1-High

---

## Executive Summary

**Overall Health**: Fair
**Top 3 Issues**:
1. Raw rgba color in focus-visible thumb (line 36) and multiple box-shadow values not tokenized
2. No ARIA attributes — missing `role="slider"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-label`
3. No error, success, loading, or disabled visual states beyond native input:disabled

---

## 1. Functional Issues

- **Line 36**: `box-shadow: 0 0 0 4px rgba(223, 255, 97, 0.25)` — raw rgba color not tokenized.
- **Line 23**: `box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.2)` — raw rgba.
- **Line 21**: `height: 6px` track height — raw px, should be `var(--cg-component-slider-track-height-md)`.
- **Line 22**: `border-radius: 3px` — raw px, should be derived from track height or use token.
- **Lines 28-31**: Thumb dimensions `20px`, border `3px` — raw px values.
- **No filled track**: The slider does not show a filled portion of the track indicating the current value — this is a major UX gap. Most modern sliders fill the track from min to current value.
- **No tooltip**: JSDoc mentions "value tooltip" but no tooltip is rendered on hover/drag.
- **No ARIA on the native input**: While native `<input type="range">` has implicit ARIA, the component wraps it without an accessible label.
- **No error/success states**: No visual states for form validation.

---

## 2. Interaction Issues

### 2.1 State Coverage

| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Default | ✅ | Partial | Track background uses token, but track height/radius are raw |
| Hover | ✅ | ✅ | Line 34 — thumb scales on hover |
| Active | ✅ | ✅ | Line 35 — thumb uses press scale token |
| Focus | ✅ | Partial | Line 36 — focus ring uses raw rgba color |
| Disabled | ✅ | Partial | Line 25 — opacity 0.5, cursor not-allowed (raw opacity) |
| Loading | ❌ | ❌ | No loading state |
| Error | ❌ | ❌ | No error state |
| Success | ❌ | ❌ | No success state |

### 2.2 Keyboard Navigation
- Arrow keys: Handled natively by `<input type="range">`
- Page Up/Down: Native support for larger steps
- Home/End: Native support to jump to min/max
- Tab: Works natively
- Keyboard support is adequate via native element

### 2.3 ARIA & Accessibility
- Native `<input type="range">` provides implicit role and value semantics
- **Missing**: `aria-label` on the input (line 83-91) — label text exists visually but is not linked
- **Missing**: `aria-describedby` for helper text or range labels
- **Missing**: `aria-orientation` (horizontal assumed)
- Label text in `.header` is not connected to input via `for`/`id` or `aria-labelledby`

### 2.4 Touch & Mobile
- Thumb at `20px` (line 28) may be small for touch — minimum 44px touch target recommended
- sm thumb at `16px` (line 49) is significantly below touch target
- No touch-specific enhancements (drag gesture library, touch area expansion)

---

## 3. Styling Issues

### 3.1 Magic Numbers Found

| Line | Value | Proposed Token |
|------|-------|----------------|
| 21 | `height: 6px` track | `var(--cg-component-slider-track-height-md, 6px)` |
| 22 | `border-radius: 3px` | `calc(var(--cg-component-slider-track-height-md) / 2)` |
| 23 | `rgba(0, 0, 0, 0.2)` inset shadow | `var(--cg-overlay-dark-medium)` |
| 28 | `width: 20px; height: 20px` thumb | `var(--cg-component-slider-thumb-size-md, 20px)` |
| 30 | `border: 3px solid` thumb border | `var(--cg-border-width-150, 3px)` |
| 36 | `0 0 0 4px rgba(223, 255, 97, 0.25)` focus | `var(--cg-overlay-accent-strong)` |
| 39 | `width: 20px; height: 20px` moz thumb | Same token |
| 40 | `border: 3px solid` moz border | Same token |
| 48 | `height: 4px` sm track | `var(--cg-component-slider-track-height-sm, 4px)` |
| 49 | `width: 16px; height: 16px` sm thumb | `var(--cg-component-slider-thumb-size-sm, 16px)` |
| 50 | `width: 16px; height: 16px` sm moz | Same token |
| 52 | `height: 8px` lg track | `var(--cg-component-slider-track-height-lg, 8px)` |
| 53 | `width: 24px; height: 24px` lg thumb | `var(--cg-component-slider-thumb-size-lg, 24px)` |
| 54 | `width: 24px; height: 24px` lg moz | Same token |

### 3.2 Raw Colors Found

| Line | Value | Proposed Token |
|------|-------|----------------|
| 23 | `rgba(0, 0, 0, 0.2)` | `var(--cg-overlay-dark-medium)` |
| 36 | `rgba(223, 255, 97, 0.25)` | `var(--cg-overlay-accent-strong)` |

### 3.3 Typography Issues

No raw typography values — all text uses tokens correctly.

### 3.4 Spacing Issues

No raw spacing values outside of component-specific dimensions.

### 3.5 Modern Design Enhancements
- **Filled track**: Add a CSS gradient or pseudo-element to show filled portion from min to current value
- **Value tooltip**: Add a floating tooltip that appears on hover/drag showing the current value
- **Track gradient**: Use a subtle gradient on the filled portion
- **Tick marks**: Add optional tick marks at intervals
- **Dual thumb**: Support range selection with two thumbs (min-max)
- **Step markers**: Visual dots at each step position

---

## 4. Prioritized Fixes

### P0 - Critical
- [ ] Add `aria-label` or `aria-labelledby` connecting the label text to the range input
- [ ] Add filled track visual (CSS gradient based on value percentage)

### P1 - High
- [ ] Replace raw rgba focus ring color (line 36) with overlay token
- [ ] Replace raw rgba inset shadow (line 23) with overlay token
- [ ] Add error state with red track/thumb
- [ ] Add success state
- [ ] Add loading state
- [ ] Add value tooltip on hover/drag

### P2 - Medium
- [ ] Tokenize all thumb and track dimensions (lines 21-54)
- [ ] Tokenize thumb border width (lines 30, 40)
- [ ] Increase touch target size for sm variant (expand hit area with transparent padding)
- [ ] Add `aria-describedby` for range labels
- [ ] Add disabled visual refinement beyond opacity

### P3 - Low
- [ ] Add optional tick marks
- [ ] Add dual-thumb range mode
- [ ] Add track gradient on filled portion
- [ ] Add step marker dots
