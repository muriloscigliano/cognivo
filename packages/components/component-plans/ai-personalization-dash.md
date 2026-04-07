# ai-personalization-dash — Improvement Plan

## Current State

### CSS Audit
- **Tokens**: All spacing, colors, fonts, radii, motion use `--cg-*` tokens. PASS.
- **Magic numbers**: `letter-spacing: 0.05em` in `.section-title` — should use `var(--cg-letter-spacing-wide)`.
- **Reduced motion**: PASS — disables host animation.
- **Issues**:
  - Slider track and thumb styles are well-tokenized. PASS.
  - No Firefox-specific focus-visible on slider (`::-moz-range-thumb` has no focus style).

### States Audit

| State | .pref-slider | .segment-pill | .reset-btn |
|---|---|---|---|
| Default | PASS | PASS | PASS |
| Hover | N/A (browser default) | N/A | PASS (error color) |
| Active | MISSING | MISSING | MISSING |
| Focus-visible | PASS (box-shadow) | N/A — MISSING | PASS (box-shadow) |
| Disabled | MISSING | MISSING | MISSING |
| Loading | MISSING | N/A | MISSING |
| Empty | No preferences shows nothing | N/A | N/A |

### Interaction Audit
- Slider `@input` fires `ai-personalization-change` with id/value. PASS.
- Reset button fires `ai-personalization-reset`. PASS.
- Slider has `aria-label`. PASS.
- **Issue**: Segments are purely display — no click/toggle interaction. Consider making them interactive.
- **Issue**: No confirmation dialog for reset action.
- **Issue**: Slider value display doesn't update reactively (relies on parent to re-pass preferences).
- **Issue**: No empty state for when `userName` is missing (shows "User" fallback — acceptable but could be better).

## Style Fixes Needed

1. Replace raw `letter-spacing: 0.05em` with `var(--cg-letter-spacing-wide, 0.05em)`.
2. Add `.segment-pill:focus-visible` styling for keyboard users.
3. Add `.pref-slider:active` thumb styling (slightly larger).
4. Add disabled state for sliders and reset button.
5. Add loading skeleton state.

## Interaction Fixes Needed

1. Make segments interactive (clickable to toggle active state) with `ai-segment-toggle` event.
2. Add confirmation step before reset (or at minimum a brief undo period).
3. Add `aria-valuetext` to sliders with human-readable descriptions.
4. Reactively update slider value display on `@input` (local state).
5. Add save/apply button for batch preference changes.
6. Add `role="group"` with `aria-label` on preferences and segments sections.

## Test Spec

| # | Test Case | Type |
|---|---|---|
| 1 | Renders profile avatar with user initial | render |
| 2 | Renders user name and "Updated" timestamp | render |
| 3 | Shows "User" when `userName` is empty | render |
| 4 | Renders all preference sliders with labels and values | render |
| 5 | Slider input fires `ai-personalization-change` with id and value | interaction |
| 6 | Slider respects `min` and `max` from preference config | render |
| 7 | Description text renders when provided on preference | render |
| 8 | Segments render with correct labels and colors | render |
| 9 | Active segments have `.active` class with colored border | render |
| 10 | Reset button fires `ai-personalization-reset` | interaction |
| 11 | Reset button hidden when `showReset=false` | render |
| 12 | Focus-visible ring on sliders and reset button | a11y |
| 13 | Sliders have correct `aria-label` attributes | a11y |
| 14 | Empty preferences section is not rendered | render |
