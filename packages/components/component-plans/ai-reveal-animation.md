# ai-reveal-animation — Improvement Plan

## Current State

### CSS Audit
- **Tokens**: Uses custom properties `--_duration` and `--_delay` set via inline style. No `--cg-*` token issues.
- **Magic numbers**:
  - `translateY(24px)` in slide-up — should use `var(--cg-spacing-24)`.
  - `scale(0.85)` — acceptable for animation origin.
  - `perspective(600px)` — acceptable for 3D transform.
  - `rotateX(-15deg)` — acceptable for animation.
- **Reduced motion**: PASS — checks `prefers-reduced-motion` in JS and skips animation, marking `_done` immediately.
- **Issues**:
  - `will-change: transform, opacity` on wrapper is set initially — should only be set during animation (currently cleaned up in `_onAnimEnd`). PASS architecture.
  - `.wrapper.done` sets `animation: none` — correctly stops after completion.

### States Audit

| State | .wrapper | Animation |
|---|---|---|
| Hidden (not visible) | opacity: 0 | None |
| Visible (animating) | Animation plays | Type-specific keyframes |
| Done | opacity: 1, transform: none | None |
| Reduced motion | Immediately done | Skipped |

### Interaction Audit
- `visible` property triggers animation. PASS.
- `animationend` listener marks `_done` and dispatches `ai-reveal-complete`. PASS.
- AbortController cleans up listeners. PASS.
- Reduced motion detection skips animation. PASS.
- `aria-hidden` toggles based on visibility state. PASS.
- **Issue**: This is a wrapper/utility component — no interactive elements. Correct.
- **Issue**: Setting `visible=false` after `done` resets to hidden — but no exit animation.
- **Issue**: No `once` option used on animation listener — but signal abort handles cleanup. PASS.
- **Issue**: `will-change` is set statically in CSS — could cause layer promotion overhead when many instances exist.

## Style Fixes Needed

1. Replace `translateY(24px)` with `translateY(var(--cg-spacing-24, 24px))`.
2. Consider removing static `will-change` from CSS and setting it dynamically only during animation.
3. Add exit animation variants (fade-out, slide-down, scale-down, flip-out).
4. Add `--_easing` custom property for configurable easing per type.

## Interaction Fixes Needed

1. Add exit animation support (reverse of entrance when `visible` set to false).
2. Add `once` option — auto-set `_done` and don't re-animate if `visible` toggles.
3. Add IntersectionObserver option for scroll-triggered reveal.
4. Add stagger support for lists (delay based on child index).
5. Fire `ai-reveal-start` event when animation begins.
6. Consider adding `play()` and `reset()` public methods.

## Test Spec

| # | Test Case | Type |
|---|---|---|
| 1 | Wrapper starts with `opacity: 0` when not visible | render |
| 2 | Setting `visible=true` adds `visible` class and triggers animation | render |
| 3 | Fade animation applies `reveal-fade` keyframes | render |
| 4 | Slide-up animation applies `reveal-slide-up` keyframes | render |
| 5 | Scale animation applies `reveal-scale` keyframes | render |
| 6 | Flip animation applies `reveal-flip` keyframes | render |
| 7 | `_done` class is added after animation completes | render |
| 8 | `ai-reveal-complete` fires on animation end | interaction |
| 9 | Delay property applies as CSS `--_delay` | render |
| 10 | Duration property applies as CSS `--_duration` | render |
| 11 | Reduced motion skips animation and sets done immediately | a11y |
| 12 | `will-change` is reset to `auto` after animation | render |
| 13 | `aria-hidden` is `true` when not visible and not done | a11y |
| 14 | Slot content is rendered inside wrapper | render |
| 15 | AbortController cleans up on disconnect | lifecycle |
