# ai-confidence-slider — Improvement Plan

## Current State

### CSS Audit
- **Tokens**: Excellent coverage — spacing, colors, font sizes, border-radius, motion all tokenized.
- **Magic numbers**: `line-height: 1.4` in `.label` area is unitless (acceptable). Distribution bar uses inline `height` in JS.
- **Cross-browser**: Both WebKit and Firefox slider thumb/track styled.
- **Gradient track**: Red-yellow-green gradient for confidence visualization.

### States Audit

| State | Supported | Notes |
|---|---|---|
| Default | Yes | Slider at value with badge |
| Hover | Yes | Preset buttons have hover states |
| Focus-visible | Yes | Slider thumb has focus ring (WebKit only) |
| Active preset | Yes | `.preset-btn.active` with accent border/color |
| Disabled | **No** | No disabled state for the slider |
| Loading | **No** | No loading state |
| Error | **No** | No validation error state |
| Distribution | Yes | Optional histogram below slider |

### Interaction Audit
- **Slider input**: `@input` fires `ai-confidence-change` with value.
- **Presets**: Click sets value and fires same event.
- **Value badge**: Positioned absolutely above thumb using CSS custom property `--thumb-pos`.
- **Distribution bars**: Color-coded by position, dim below threshold.
- **ARIA**: `role="group"`, `aria-label`, `aria-valuemin/max/now` on range input.

## Style Fixes Needed

1. **Firefox focus-visible** — No `:focus-visible` style for Firefox range thumb (`::-moz-range-thumb`).
2. **Preset focus-visible** — Missing `:focus-visible` on `.preset-btn`.
3. **Disabled state** — Add `:host([disabled])` styles with reduced opacity, `pointer-events: none`.
4. **Distribution border** — `.distribution` border-top uses `--cg-color-surface-container-background` which is the same as the background — effectively invisible. Should use `--cg-color-surface-container-border`.
5. **Value badge z-index** — No z-index on `.value-badge`, may clip behind other elements.
6. **Rounded variants** — Missing `:host([rounded])` support on container.

## Interaction Fixes Needed

1. **Disabled property** — Add `disabled` boolean that prevents interaction and grays out the component.
2. **Step increment** — No `step` attribute on range input; defaults to 1. Consider exposing as a property.
3. **Min/max labels** — No visible labels at the ends of the slider track.
4. **Keyboard on presets** — Preset buttons lack arrow key navigation between them.
5. **Live region** — Value changes are not announced to screen readers. Add `aria-live="polite"` on the count display.
6. **Touch target size** — Slider thumb at 18px is below the 44px WCAG minimum touch target.

## Test Spec

| # | Test Case | Type |
|---|---|---|
| 1 | Renders slider at initial `value` | Unit |
| 2 | Value badge shows current percentage | Unit |
| 3 | Dragging slider fires `ai-confidence-change` | Interaction |
| 4 | Preset buttons set value and fire event | Unit |
| 5 | Active preset button gets `.active` class | Unit |
| 6 | Distribution bars render with correct heights | Visual |
| 7 | Bars below threshold get `.below` class (dimmed) | Unit |
| 8 | Bar colors match position (red/yellow/green) | Visual |
| 9 | Count display shows `resultCount` of `totalCount` | Unit |
| 10 | Count hidden when `totalCount` is 0 | Unit |
| 11 | `min` and `max` properties respected | Unit |
| 12 | Focus-visible ring on slider thumb | A11y |
| 13 | ARIA attributes (`aria-valuenow`, etc.) update with value | A11y |
| 14 | Value badge position tracks thumb position | Visual |
| 15 | Distribution hidden when array is empty | Unit |
