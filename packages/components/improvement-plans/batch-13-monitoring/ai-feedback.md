# AI Feedback Improvement Plan

**Component**: `ai-feedback`
**Category**: AI-Native
**File**: `src/components/ai-feedback/ai-feedback.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Fair
**Top 3 Issues**:
1. CSS syntax error -- stray closing brace on line 171 breaks the stylesheet; rounded variants (lines 173-178) may not apply
2. Raw hex `#000` on line 152 for submit button text color
3. `showComment` property is mutated internally (lines 210, 215, 220) -- breaks unidirectional data flow

---

## 1. Functional Issues
- **Line 171**: Stray closing brace `}` after `.submitted-icon` rule. This closes the `css` template literal prematurely, making the rounded variant rules (lines 173-178) fall outside the styles and not apply.
- **Lines 210, 215, 220**: `this.showComment = true` mutates a `@property` from inside the component. This violates Lit best practices for unidirectional data flow. If a parent sets `showComment` to `false`, the component will override it. Should use an internal `@state` for auto-show logic.
- **Line 36**: `.container` styles reference `var(--cg-elevation-1, ...)` but the container has no explicit `background`, `padding`, `border`, or `border-radius` set. The container is missing fundamental card styling -- it relies on the rounded variants to add `border-radius` but those are broken by the CSS error.
- **No reset mechanism**: Once submitted (`_submitted = true`), there's no way to reset the feedback widget for another submission without full component re-creation.

## 2. Interaction Issues

### 2.1 State Coverage
| State | Supported | Notes |
|-------|-----------|-------|
| Default | Yes | Rating row shown |
| Hover | Yes | Thumb, star, emoji, tag buttons all have hover |
| Active/Pressed | No | No `:active` state on any button |
| Focus | Yes | All buttons have `:focus-visible` |
| Disabled | Partial | Submit button has `:disabled` styling (line 159), but individual rating/tag buttons have no disabled state |
| Loading | No | No loading state during submission |
| Error | No | No error state for failed submissions |
| Submitted | Yes | Line 252-258 |
| Selected | Yes | Thumbs, stars, emojis, tags have selected states |

**Missing**: active, loading, error states (3 of 8+ missing).

### 2.2 Keyboard Navigation
- **Thumb buttons** (line 266-267): Standard `<button>` elements -- natively accessible.
- **Star buttons** (line 271-277): Standard `<button>` elements -- good. But `@mouseenter`/`@mouseleave` for hover preview has no keyboard equivalent.
- **Emoji buttons** (line 281-285): Standard `<button>` -- good.
- **Tag buttons** (line 291-294): Standard `<button>` -- good.
- **No arrow key navigation** between rating options within a group. Stars especially would benefit from left/right arrow navigation (radiogroup pattern).

### 2.3 ARIA & Accessibility
- **Line 262**: `role="group"` with `aria-label="Rate this response"` -- good.
- **Line 290**: Tags group has `role="group"` with `aria-label="Select issues"` -- good.
- **Line 254**: Submitted state has `aria-live="polite"` and `role="status"` -- good.
- **Missing**: Stars should use `role="radiogroup"` with `role="radio"` on each star and `aria-checked`.
- **Missing**: Thumbs should use `role="radiogroup"` pattern since only one can be selected.
- **Missing**: `aria-pressed` on tag buttons (they are toggles).
- **Emoji buttons**: Have good `aria-label` with index and name (line 283) -- good.

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Suggestion |
|------|-------|------------|
| 49 | `margin-right: 4px` | Use `var(--cg-spacing-4, 4px)` |
| 54 | `width: 32px; height: 32px` | Use `var(--cg-size-400, 32px)` |
| 79 | `padding: 2px` | Use `var(--cg-spacing-2, 2px)` |
| 88 | `width: 36px; height: 36px` | Use `var(--cg-size-450, 36px)` |
| 128 | `min-height: 60px` | Use `var(--cg-size-750, 60px)` |

### 3.2 Raw Colors Found
| Line | Color | Replacement |
|------|-------|------------|
| 152 | `color: #000` | Use `var(--cg-color-surface-container-background, #18181b)` or a proper text-on-accent token |

### 3.3 Spacing Issues
- The `.container` (line 31) is missing `padding` and `border-radius` base styles. It only gets border-radius from the rounded variants (which are broken).
- Transition durations on lines 66, 80, 83, 96, 98, 132, 139, 157 use raw ms values.

### 3.4 Modern Design Enhancements
- Star hover preview could show a tooltip with the rating label ("Poor", "Fair", "Good", etc.).
- Submitted state could have a brief confetti or checkmark animation.
- Consider a slide transition when tags section appears after negative rating.
- Submit button could show a brief loading spinner before transitioning to submitted state.

## 4. Prioritized Fixes

### P0 - Critical
1. **Fix stray CSS brace** (line 171) -- rounded variants are broken.
2. **Add missing `.container` base styles** -- padding, border, border-radius, background.
3. **Replace raw `#000`** (line 152) with a proper token.

### P1 - High
4. **Fix `showComment` mutation** -- use internal `@state` property for auto-show, keep `showComment` prop as initial value only.
5. **Add `role="radiogroup"`** and `aria-checked` to star and thumb rating groups.
6. **Add `aria-pressed`** to tag toggle buttons.
7. **Add loading state** during submission (between click and confirmed submission).
8. **Add error state** for failed submissions.
9. **Add `:active` press state** to all interactive buttons.

### P2 - Medium
10. **Replace all magic number sizes** (lines 54, 79, 88, 128) with design tokens.
11. **Replace transition durations** with motion tokens.
12. **Add keyboard arrow navigation** for star/thumb rating groups.
13. **Add keyboard equivalent for star hover preview** (show preview on focus).
14. **Add reset mechanism** -- public method or property to reset submission state.

### P3 - Low
15. **Add submission animation** -- checkmark or transition effect.
16. **Add slide transition** when tags section appears.
17. **Consider star rating tooltip** on hover/focus.
