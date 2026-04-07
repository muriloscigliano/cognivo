# CgSwitch Improvement Plan

**Component**: `cg-switch`
**Category**: Foundation
**File**: `src/components/cg-switch/cg-switch.ts`
**Priority**: P2-Medium

---

## Executive Summary

**Overall Health**: Good
**Top 3 Issues**:
1. Extensive magic numbers — raw px for track/thumb dimensions, positioning, box-shadow values
2. No error, loading, or success states
3. Raw rgba colors in multiple box-shadow declarations

---

## 1. Functional Issues

- **Line 42**: `box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.15)` — raw rgba.
- **Line 50**: `box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.15), 0 0 12px -2px ...` — raw rgba and magic `12px -2px` values.
- **Line 62**: `box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2)` — raw rgba on thumb.
- **Line 71**: `box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2)` — repeated raw rgba.
- **Lines 76-80**: Active state uses `box-shadow: 0 1px 6px rgba(0, 0, 0, 0.3)` — more raw rgba.
- **No `name` property**: Switch is a form control but has no `name` for form submission.
- **No `value` property**: No value to submit with the form.
- **No form association**: Missing `ElementInternals`.

---

## 2. Interaction Issues

### 2.1 State Coverage

| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Default | ✅ | ✅ | Track and thumb with token colors |
| Hover | ✅ | ✅ | Lines 84-89 — track color changes on hover |
| Active | ✅ | Partial | Lines 75-80 — scale + shadow, but raw rgba shadows |
| Focus | ✅ | ✅ | Lines 92-96 — dual ring focus |
| Disabled | ✅ | ✅ | Line 33 — opacity + cursor |
| Loading | ❌ | ❌ | No loading state |
| Error | ❌ | ❌ | No error state |
| Success | ❌ | ❌ | No success state (checked IS the success metaphor, but explicit state missing) |

### 2.2 Keyboard Navigation
- Space and Enter: Both toggle (line 146) — correct
- Tab: Via `tabindex` on label (line 141)
- No issues — clean implementation

### 2.3 ARIA & Accessibility
- `role="switch"` on label (line 142) — correct
- `aria-checked` set (line 143) — correct
- `aria-disabled` set (line 144) — correct
- **Missing**: `aria-label` fallback when no label text provided
- **Missing**: `aria-describedby` for helper/description text
- **Missing**: `aria-required` for required switches

### 2.4 Touch & Mobile
- Track is 44x24 (md) which is adequate for touch
- sm variant track is 36x20 — borderline for touch target
- `-webkit-tap-highlight-color: transparent` is set (line 31) — good

---

## 3. Styling Issues

### 3.1 Magic Numbers Found

| Line | Value | Proposed Token |
|------|-------|----------------|
| 29 | `gap: 10px` | `var(--cg-spacing-10)` or `var(--cg-spacing-12)` |
| 38 | `width: 44px` track | `var(--cg-component-switch-track-width-md, 44px)` |
| 39 | `height: 24px` track | `var(--cg-component-switch-track-height-md, 24px)` |
| 40 | `border-radius: 9999px` | `var(--cg-border-radius-full)` |
| 42 | `rgba(0, 0, 0, 0.15)` shadow | `var(--cg-overlay-dark-subtle)` |
| 50 | `0 0 12px -2px` glow | Tokenize glow spread |
| 56 | `width: 18px; height: 18px` thumb | `var(--cg-component-switch-thumb-size-md, 18px)` |
| 60 | `top: 3px; left: 3px` thumb position | `var(--cg-component-switch-thumb-offset, 3px)` |
| 62 | `0 1px 3px rgba(0, 0, 0, 0.2)` thumb shadow | `var(--cg-shadow-sm)` |
| 70 | `translateX(20px)` checked offset | `var(--cg-component-switch-checked-offset-md, 20px)` |
| 76 | `0 1px 6px rgba(0, 0, 0, 0.3)` pressed shadow | `var(--cg-shadow-md)` |
| 109 | `font-size: 14px` label | `var(--cg-font-size-sm)` |
| 110 | `font-weight: 500` | `var(--cg-font-weight-medium)` |
| 115 | `width: 36px; height: 20px` sm track | Component tokens |
| 116 | `width: 14px; height: 14px` sm thumb | Component tokens |
| 117 | `translateX(16px)` sm checked | Component token |
| 119 | `width: 52px; height: 28px` lg track | Component tokens |
| 120 | `width: 22px; height: 22px` lg thumb | Component tokens |
| 121 | `translateX(24px)` lg checked | Component token |

### 3.2 Raw Colors Found

| Line | Value | Proposed Token |
|------|-------|----------------|
| 42 | `rgba(0, 0, 0, 0.15)` | `var(--cg-overlay-dark-subtle)` |
| 50 | `rgba(0, 0, 0, 0.15)` | `var(--cg-overlay-dark-subtle)` |
| 62 | `rgba(0, 0, 0, 0.2)` | `var(--cg-overlay-dark-medium)` |
| 71 | `rgba(0, 0, 0, 0.2)` | `var(--cg-overlay-dark-medium)` |
| 76 | `rgba(0, 0, 0, 0.3)` | `var(--cg-overlay-dark-strong)` |

### 3.3 Typography Issues
- Line 109: `font-size: 14px` — use `var(--cg-font-size-sm)`
- Line 110: `font-weight: 500` — use `var(--cg-font-weight-medium)`

### 3.4 Spacing Issues
- Line 29: `gap: 10px` — not on standard spacing scale
- Line 60: `top: 3px; left: 3px` — raw positioning values

### 3.5 Modern Design Enhancements
- Add subtle gradient on the checked track (from accent to a lighter tint)
- Add thumb shadow that changes based on position (lighter when off, colored when on)
- Add a subtle track texture (noise overlay or gradient)
- Consider a micro-icon inside the thumb (check/x) that fades in/out
- Add error state with red track color
- Add description text support below the switch label

---

## 4. Prioritized Fixes

### P0 - Critical
- [ ] Add `name` and `value` properties for form submission
- [ ] Add `aria-label` fallback when no label text is provided

### P1 - High
- [ ] Replace all raw `rgba()` shadow colors with overlay tokens (5 instances)
- [ ] Add error state with red track color
- [ ] Add loading state (pulsing or spinning indicator on thumb)
- [ ] Replace raw font-size and font-weight with tokens (lines 109-110)

### P2 - Medium
- [ ] Tokenize all track/thumb dimensions for each size variant (lines 38-39, 56, 115-121)
- [ ] Tokenize thumb positioning and checked offset (lines 60, 70, 117, 121)
- [ ] Tokenize label gap (line 29)
- [ ] Add `aria-describedby` support for description text
- [ ] Add `aria-required` support
- [ ] Implement `ElementInternals` for form participation

### P3 - Low
- [ ] Add description text slot below label
- [ ] Add gradient track on checked state
- [ ] Add thumb micro-icon (check/x)
- [ ] Add success state visual distinction
