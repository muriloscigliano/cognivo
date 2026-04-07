# ai-segmentation-viewer — Improvement Plan

## Current State

### CSS Audit
- **Tokens**: All spacing, colors, fonts, radii, motion use `--cg-*` tokens. PASS.
- **Magic numbers**: `letter-spacing: 0.05em` in `.legend-title` — should use token.
- **Reduced motion**: PASS — disables host animation.
- **Issues**:
  - Mask overlay uses inline `background` and `opacity` styles — correct for dynamic coloring.
  - `.mask-overlay.selected` uses `outline-offset: -2px` — acceptable.
  - Opacity slider thumb lacks `:focus-visible` styling.

### States Audit

| State | .legend-item | .mask-overlay | .opacity-slider |
|---|---|---|---|
| Default | PASS | PASS | PASS |
| Hover | PASS (border) | N/A (pointer-events none) | N/A |
| Selected | PASS (accent border) | PASS (outline) | N/A |
| Hidden | PASS (opacity 0.4) | Hidden via filter | N/A |
| Focus-visible | PASS (box-shadow) | N/A | MISSING |
| Disabled | MISSING | MISSING | MISSING |
| Loading | MISSING | MISSING | MISSING |
| Empty | No image / no masks — renders empty | N/A | N/A |

### Interaction Audit
- Legend item click fires `ai-segment-select`. PASS.
- Toggle button fires `ai-segment-toggle`. PASS.
- Opacity slider updates `opacity`. PASS.
- Legend items have keyboard support. PASS.
- **Issue**: Mask overlays are not positioned per-segment — they cover the full canvas. This is a simplified representation (no actual mask polygon data).
- **Issue**: Multiple mask labels would overlap if `showLabels` is true (all positioned at top-left).
- **Issue**: No empty state guidance when no image or masks provided.
- **Issue**: Opacity slider lacks `focus-visible` styling.
- **Issue**: Toggle button inside legend-item may cause double-click issues (click on legend selects, click on toggle within it toggles — `stopPropagation` handles this).

## Style Fixes Needed

1. Replace `letter-spacing: 0.05em` with `var(--cg-letter-spacing-wide, 0.05em)`.
2. Add `.opacity-slider:focus-visible` styling.
3. Add loading skeleton state.
4. Add empty state with guidance text.
5. Stagger mask label positions to avoid overlap when `showLabels` is true.

## Interaction Fixes Needed

1. Add loading state with skeleton overlay.
2. Add empty state rendering (no image or no masks).
3. Fix label positioning overlap — use per-mask label placement or legend-only display.
4. Add keyboard arrow navigation between legend items.
5. Add `aria-label` to opacity slider (currently has it — PASS).
6. Consider adding mask polygon data support for accurate overlay positioning.

## Test Spec

| # | Test Case | Type |
|---|---|---|
| 1 | Renders image with correct src | render |
| 2 | Mask overlays render for visible masks | render |
| 3 | Hidden masks do not render overlays | render |
| 4 | Opacity slider controls mask overlay opacity | interaction |
| 5 | Selected mask overlay has `.selected` class | render |
| 6 | Legend renders when `showLegend=true` | render |
| 7 | Legend item click fires `ai-segment-select` | interaction |
| 8 | Toggle button fires `ai-segment-toggle` and doesn't bubble select | interaction |
| 9 | Legend items show correct swatch colors | render |
| 10 | Hidden legend items have `.hidden` class with reduced opacity | render |
| 11 | Keyboard Enter/Space on legend item selects mask | a11y |
| 12 | Toggle icon switches between eye/eye-off | render |
| 13 | Opacity value display updates on slider change | render |
| 14 | Focus-visible ring on legend items | a11y |
