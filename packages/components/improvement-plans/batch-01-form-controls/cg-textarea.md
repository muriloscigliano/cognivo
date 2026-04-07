# CgTextarea Improvement Plan

**Component**: `cg-textarea`
**Category**: Foundation
**File**: `src/components/cg-textarea/cg-textarea.ts`
**Priority**: P2-Medium

---

## Executive Summary

**Overall Health**: Good
**Top 3 Issues**:
1. Extensive magic numbers — raw px padding in size variants and floating label offsets
2. No loading state implemented
3. Size variant styles (lines 170-171) override floating label padding, creating conflicts

---

## 1. Functional Issues

- **Lines 170-171**: Size variant styles `font-size: 12px; padding: 6px 8px;` (sm) and `font-size: 16px; padding: 10px 16px;` (lg) are declared AFTER the floating label padding overrides (lines 66-77), which means these size variants clobber the floating label offsets. The CSS specificity is equal so declaration order wins — the floating label padding from `:host([label][size="sm"])` on line 70 competes with `:host([size="sm"])` on line 170.
- **Line 48**: `box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1)` — raw rgba, not tokenized.
- **Line 152**: `margin-top: 4px` in footer — raw px.
- **No form association**: Missing `ElementInternals` for native form participation.
- **Autoresize**: The autoresize logic (line 211-212) sets `height: 'auto'` then immediately reads `scrollHeight`. This causes a layout thrash on every keystroke and can appear janky. Should use `requestAnimationFrame` or a content-visibility approach.

---

## 2. Interaction Issues

### 2.1 State Coverage

| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Default | ✅ | ✅ | Standard border/background tokens |
| Hover | ✅ | ✅ | Line 60 — border-color on hover |
| Active | ❌ | ❌ | No active/pressed state visual |
| Focus | ✅ | ✅ | Line 61 — focus ring with box-shadow |
| Disabled | ✅ | ✅ | Line 62 — opacity 0.5, not-allowed cursor |
| Loading | ❌ | ❌ | No loading state |
| Error | ✅ | ✅ | Lines 79-83 — error border and focus ring |
| Success | ✅ | ✅ | Lines 85-89 — success border and focus ring |

### 2.2 Keyboard Navigation
- Tab: Works via native `<textarea>`
- No Escape handler
- No Ctrl+Enter or Cmd+Enter for form submission signal
- Textarea naturally handles Enter for newlines

### 2.3 ARIA & Accessibility
- `aria-invalid` set correctly (line 232)
- `aria-label` set from label prop (line 233)
- `aria-describedby` links to helper (line 234)
- Missing `aria-required` support
- Missing live region for character count (screen readers won't announce count changes)

### 2.4 Touch & Mobile
- Touch target adequate for md/lg sizes
- No resize handle styling customization (native resize handle may look inconsistent)

---

## 3. Styling Issues

### 3.1 Magic Numbers Found

| Line | Value | Proposed Token |
|------|-------|----------------|
| 47 | `min-height: 80px` | `var(--cg-component-textarea-min-height-md, 80px)` |
| 48 | `rgba(0, 0, 0, 0.1)` inset shadow | `var(--cg-overlay-dark-subtle)` |
| 61 | `rgba(0, 0, 0, 0.1)` inset shadow | `var(--cg-overlay-dark-subtle)` |
| 61 | `0 0 0 3px` focus ring spread | Token or consistent with dual-ring pattern |
| 67 | `padding-top: 22px` | `var(--cg-component-textarea-label-offset-md)` |
| 68 | `padding-bottom: 6px` | `var(--cg-spacing-6)` |
| 71 | `padding-top: 18px` | `var(--cg-component-textarea-label-offset-sm)` |
| 72 | `padding-bottom: 4px` | `var(--cg-spacing-4)` |
| 75 | `padding-top: 26px` | `var(--cg-component-textarea-label-offset-lg)` |
| 76 | `padding-bottom: 8px` | `var(--cg-spacing-8)` |
| 97 | `top: 18px` floating label | Component token |
| 115 | `left: 8px; top: 14px` sm label | Spacing tokens |
| 116 | `left: 16px; top: 22px` lg label | Spacing tokens |
| 120 | `top: 4px` floated label | `var(--cg-spacing-4)` |
| 122 | `font-size: 10px` floated label | `var(--cg-font-size-2xs)` |
| 126 | `top: 2px` sm floated | `var(--cg-spacing-2)` |
| 127 | `font-size: 9px` sm floated | Token or `var(--cg-font-size-3xs)` |
| 130 | `top: 6px` lg floated | `var(--cg-spacing-6)` |
| 131 | `font-size: 11px` lg floated | Token |
| 152 | `margin-top: 4px` footer | `var(--cg-spacing-4)` |
| 162 | `font-size: 12px` helper | `var(--cg-font-size-xs)` |
| 164 | `padding: 4px 12px 0` helper | `var(--cg-spacing-4) var(--cg-spacing-12) 0` |
| 170 | `font-size: 12px; padding: 6px 8px; min-height: 60px` sm | All should be tokens |
| 171 | `font-size: 16px; padding: 10px 16px; min-height: 100px` lg | All should be tokens |

### 3.2 Raw Colors Found

| Line | Value | Proposed Token |
|------|-------|----------------|
| 48 | `rgba(0, 0, 0, 0.1)` | `var(--cg-overlay-dark-subtle)` |
| 61 | `rgba(0, 0, 0, 0.1)` | `var(--cg-overlay-dark-subtle)` |

### 3.3 Typography Issues
- Lines 122, 127, 131: Floating label font sizes are raw px (10px, 9px, 11px)
- Lines 162, 170, 171: Helper and size variant font sizes are raw px

### 3.4 Spacing Issues
- Lines 67-76: All floating label padding offsets are raw px
- Lines 115-116: Size variant label positions use raw px
- Lines 152, 164: Footer/helper spacing is raw px

### 3.5 Modern Design Enhancements
- Add subtle inner glow on focus
- Add glassmorphism option with `backdrop-filter`
- Add character count with progress ring visual (circular progress indicator)
- Consider animated resize handle or custom grip dots

---

## 4. Prioritized Fixes

### P0 - Critical
- [ ] Fix CSS specificity conflict: size variant styles (lines 170-171) override floating label padding (lines 66-77) — reorder or increase specificity

### P1 - High
- [ ] Add loading state (pulse animation or overlay)
- [ ] Add active/pressed state
- [ ] Replace raw `rgba()` shadows with overlay tokens (lines 48, 61)
- [ ] Add `aria-required` support
- [ ] Add `aria-live="polite"` to character count for screen reader announcements

### P2 - Medium
- [ ] Tokenize all floating label offset padding (lines 67-76)
- [ ] Tokenize floating label position values (lines 97, 115-116, 120, 126, 130)
- [ ] Tokenize floating label font sizes (lines 122, 127, 131)
- [ ] Tokenize helper and footer styling (lines 152, 162, 164)
- [ ] Tokenize size variant values (lines 170-171)
- [ ] Optimize autoresize with `requestAnimationFrame` to avoid layout thrash

### P3 - Low
- [ ] Implement `ElementInternals` for form participation
- [ ] Add glassmorphism background option
- [ ] Add animated character count visual
- [ ] Custom resize handle styling
