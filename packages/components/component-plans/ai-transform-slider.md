# ai-transform-slider — Improvement Plan

## Current State

### CSS Audit
- **Tokens**: All spacing, colors, radii, motion use `--cg-*` tokens. PASS.
- **Magic numbers**: `width: 2px` on divider line — acceptable for a thin separator.
- **Reduced motion**: Missing explicit `@media (prefers-reduced-motion)` block — relies on shared `reducedMotion` for host only.
- **Issues**:
  - Placeholder `height: 200px` — should use a token or CSS custom property.
  - `.container` uses `touch-action: none` — correct for drag, but no fallback for non-pointer devices.

### States Audit

| State | .handle | .container | Images |
|---|---|---|---|
| Default | PASS | PASS | PASS |
| Hover | No hover state on handle | N/A (cursor set) | N/A |
| Active/Dragging | No visual drag indicator | N/A | N/A |
| Focus-visible | PASS (box-shadow) | N/A | N/A |
| Disabled | MISSING | MISSING | MISSING |
| Loading | MISSING | N/A | N/A |
| Error | MISSING (broken image) | N/A | MISSING |
| Empty | Shows placeholder text | N/A | N/A |

### Interaction Audit
- Pointer events: pointerdown/move/up/cancel. PASS.
- Keyboard: ArrowLeft/Right (horizontal), ArrowUp/Down (vertical) with 2% step. PASS.
- `role="slider"` with `aria-valuemin/max/now`. PASS.
- **Issue**: Handle has no hover state — should show a subtle highlight.
- **Issue**: No active/dragging visual state — handle should scale or change color while dragging.
- **Issue**: No `disabled` property — component always interactive.
- **Issue**: Missing image `onerror` handling — broken images show nothing.
- **Issue**: `setPointerCapture` is called on `e.target` which may not be the container, causing missed moves.

## Style Fixes Needed

1. Add `.handle:hover` state with scale transform or border highlight.
2. Add `.handle.dragging` state with visual feedback (slight scale-up, stronger border).
3. Add disabled state styling (reduced opacity, no cursor).
4. Replace `height: 200px` in placeholder with token `var(--cg-spacing-200, 200px)`.
5. Add `@media (prefers-reduced-motion)` to disable divider/handle transitions.

## Interaction Fixes Needed

1. Move `setPointerCapture` to the container element instead of `e.target`.
2. Add a `disabled` property that prevents all interaction.
3. Add `aria-label` to container for screen readers.
4. Add image error handling (onerror fallback or error state).
5. Add Shift+Arrow for larger step increments (10% jumps).
6. Consider adding touch feedback (haptic-style visual pulse on touch start).

## Test Spec

| # | Test Case | Type |
|---|---|---|
| 1 | Renders placeholder when `beforeSrc` or `afterSrc` is empty | render |
| 2 | Renders both images with correct `src` and `alt` attributes | render |
| 3 | Clip-path on after-layer matches position for horizontal | render |
| 4 | Clip-path on after-layer matches position for vertical orientation | render |
| 5 | Divider line positioned at correct percentage | render |
| 6 | Handle has `role="slider"` with correct ARIA attributes | a11y |
| 7 | Pointer drag updates position and fires `ai-transform-change` | interaction |
| 8 | ArrowLeft/Right keys adjust position by 2% in horizontal mode | interaction |
| 9 | ArrowUp/Down keys adjust position by 2% in vertical mode | interaction |
| 10 | Position is clamped between 0 and 100 | interaction |
| 11 | Before/After labels render correctly | render |
| 12 | Focus-visible ring appears on handle | a11y |
| 13 | Cursor changes to `ew-resize` (horizontal) or `ns-resize` (vertical) | render |
| 14 | Handle icon switches between horizontal and vertical variants | render |
