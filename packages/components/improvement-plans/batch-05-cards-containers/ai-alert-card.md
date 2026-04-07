# ai-alert-card Improvement Plan

**Component**: `ai-alert-card`
**Category**: AI-Native
**File**: `src/components/ai-alert-card/ai-alert-card.ts`
**Priority**: P2-Medium

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. Raw `rgba()` colors in action button backgrounds (lines 125-138) -- 8 raw rgba values for 4 urgency variants
2. No keyboard handler on the card itself -- `tabindex="0"` set but no `@keydown` for Enter/Space
3. No dismiss animation -- card just fires event, no exit transition like `cg-callout` has

---

## 1. Functional Issues

- **No visual dismiss**: Dismiss button fires `ai-alert-dismiss` event (line 207) but the card remains visible. Unlike `cg-callout`, there's no exit animation or hidden state.
- **No auto-dismiss timeout**: For info-level alerts, auto-dismiss after a configurable duration would be useful.
- **`pulse-glow` animation uses raw rgba**: Lines 172-175 define `@keyframes pulse-glow` with raw `rgba(248, 113, 113, 0.2)` and `rgba(248, 113, 113, 0)`.
- **Action button for `critical` uses `filter: brightness`**: Line 143 -- `filter: brightness(0.9)` on hover is a non-standard approach. Should darken via a token-based hover color.
- **No loading state**: No skeleton/loading placeholder.

---

## 2. Interaction Issues

### 2.1 State Coverage
| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Default | Yes | Yes | 4 urgency variants with token-based left border |
| Hover | Yes | Partial | Card hover with shadow/transform, but action btn hovers use raw rgba |
| Active/Pressed | **No** | N/A | No press feedback on card or action button |
| Focus | Yes | Yes | `--cg-brand-ai-accent` outline on action btn and dismiss |
| Disabled | **No** | N/A | Missing entirely |
| Loading | **No** | N/A | Missing entirely |
| Critical pulse | Yes | Partial | `pulse-glow` animation uses raw rgba values |
| Dismissed | **No** | N/A | No visual exit -- only event |

### 2.2 Keyboard Navigation
- Card has `tabindex="0"` (line 219) but **no `@keydown` handler**. Keyboard users can focus but not interact with the card itself.
- Action button and dismiss button are `<button>` elements -- natively keyboard accessible. Good.
- **Missing**: No way to dismiss via Escape key when card is focused.

### 2.3 ARIA & Accessibility
- `role="alert"` with descriptive `aria-label`. Good for urgent content.
- Deadline badge has `aria-label`. Good.
- Dismiss button has `aria-label="Dismiss alert"`. Good.
- Clock icon in deadline has `aria-hidden="true"`. Good.
- **Suggestion**: For `info` urgency, `role="status"` would be more appropriate than `role="alert"`.

---

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Suggested Token |
|------|-------|----------------|
| 40 | Left padding `--cg-spacing-20` | Good usage |
| 45 | `border-left: 4px solid` | Use `--cg-border-width-200` or dedicated token |
| 46 | `transition: box-shadow 150ms ease, transform 150ms ease` | `--cg-motion-duration-normal`, `--cg-motion-easing-default` |
| 47 | `inset 0 1px 0 0 rgba(255, 255, 255, 0.05)` | `--cg-shadow-inner-subtle` |
| 96 | `rgba(255, 255, 255, 0.06)` | `--cg-color-surface-overlay-subtle` |
| 118 | `transition: all 150ms ease` | `--cg-motion-duration-normal` |
| 173 | `box-shadow: 0 0 0 0 rgba(248, 113, 113, 0.2)` | Should use `--cg-red-400` with opacity token |
| 174 | `box-shadow: 0 0 0 6px rgba(248, 113, 113, 0)` | Same |

### 3.2 Raw Colors Found
| Line | Color | Suggested Token |
|------|-------|----------------|
| 47 | `rgba(255, 255, 255, 0.05)` | `--cg-color-surface-overlay-subtle` |
| 96 | `rgba(255, 255, 255, 0.06)` | `--cg-color-surface-overlay-subtle` |
| 125 | `rgba(96, 165, 250, 0.12)` | `--cg-color-status-info-bg` |
| 128 | `rgba(96, 165, 250, 0.2)` | `--cg-color-status-info-bg-hover` |
| 130 | `rgba(245, 158, 11, 0.12)` | `--cg-color-status-warning-bg` |
| 133 | `rgba(245, 158, 11, 0.2)` | `--cg-color-status-warning-bg-hover` |
| 135 | `rgba(249, 115, 22, 0.12)` | `--cg-color-status-urgent-bg` |
| 138 | `rgba(249, 115, 22, 0.2)` | `--cg-color-status-urgent-bg-hover` |
| 173-174 | `rgba(248, 113, 113, 0.2/0)` | Derive from `--cg-red-400` |

### 3.3 Typography Issues
- All font sizes use `--cg-font-size-*` tokens. Good.
- Font-weight `700` and `600` used directly -- should be `--cg-font-weight-bold` and `--cg-font-weight-semibold`.

### 3.4 Spacing Issues
- All spacing values use `--cg-spacing-*` tokens. Good.

### 3.5 Modern Design Enhancements
- Add countdown/deadline progress bar that visually counts down.
- Add slide-in entrance animation per urgency level (more dramatic for critical).
- Add urgency-specific background tint.

---

## 4. Prioritized Fixes

### P0 - Critical
(None -- component is functional)

### P1 - High
1. **Replace 8 raw `rgba()` action button colors** (lines 125-138) with semantic status tokens.
2. **Add dismiss animation** -- exit transition similar to `cg-callout`'s `calloutExit` keyframe.
3. **Add `@keydown` handler or remove `tabindex="0"`** on the card -- currently focusable but not keyboard-interactive.
4. **Replace `role="alert"` with `role="status"` for `info` urgency** level.

### P2 - Medium
5. **Replace raw `rgba()` in `pulse-glow` animation** (lines 173-174) with token-derived values.
6. **Replace overlay `rgba()` colors** (lines 47, 96) with design tokens.
7. **Add loading/skeleton state**.
8. **Add active/pressed state** on action button.
9. **Tokenize transition durations** (lines 46, 118) with `--cg-motion-*` tokens.
10. **Replace `filter: brightness(0.9)`** on critical hover (line 143) with explicit hover color token.

### P3 - Low
11. **Tokenize font-weight values** with `--cg-font-weight-*`.
12. **Add auto-dismiss timeout** property.
13. **Add Escape key dismiss** when card is focused.
14. **Tokenize `border-left: 4px`** width.
