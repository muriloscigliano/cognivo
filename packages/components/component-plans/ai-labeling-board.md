# ai-labeling-board — Improvement Plan

## Current State

### CSS Audit
- **Tokens**: All spacing, colors, fonts, radii, motion use `--cg-*` tokens. PASS.
- **Magic numbers**: None found — all values tokenized. PASS.
- **Reduced motion**: PASS — disables host animation.
- **Issues**:
  - `.item-label-pill` background uses `${label.color}20` hex suffix — fragile for non-hex color values (same issue as detection-canvas).
  - `.item-row:hover` background uses `rgba(39, 39, 42, 0.5)` — should use `var(--cg-color-surface-hover-background)` with opacity token.

### States Audit

| State | .palette-btn | .item-row | .label-select | .remove-btn |
|---|---|---|---|---|
| Default | PASS | PASS | PASS | PASS |
| Hover | PASS (border) | PASS (bg) | N/A | PASS (error color) |
| Active/Selected | PASS (label color) | N/A | N/A | N/A |
| Focus-visible | PASS (box-shadow) | N/A — MISSING | PASS (box-shadow) | N/A — MISSING |
| Disabled | MISSING | MISSING | MISSING | MISSING |
| Unlabeled | PASS (opacity 0.5) | N/A | N/A | N/A |
| Loading | MISSING | MISSING | MISSING | MISSING |
| Empty | Renders empty items div | N/A | N/A | N/A |

### Interaction Audit
- Click mode: select label from palette, click items to assign. PASS.
- List mode: select from dropdown per item. PASS.
- Remove button fires `ai-label-remove` with `stopPropagation`. PASS.
- Custom label creation fires `ai-label-create`. PASS.
- Keyboard Enter/Space on items in click mode. PASS.
- Stats show per-label counts. PASS.
- **Issue**: `.item-row` in click mode has no `focus-visible` styling.
- **Issue**: `.remove-btn` has no `focus-visible` styling.
- **Issue**: `_createLabel` uses hardcoded name "New Label" — should prompt user or accept input.
- **Issue**: No undo for label assignments.
- **Issue**: Palette button toggle (click same label to deselect) works but has no visual deselect transition.

## Style Fixes Needed

1. Fix `${label.color}20` hex suffix — use `color-mix()` or CSS custom property overlay.
2. Replace `rgba(39, 39, 42, 0.5)` in `.item-row:hover` with proper token.
3. Add `.item-row:focus-visible` styling.
4. Add `.remove-btn:focus-visible` styling.
5. Add loading skeleton state.
6. Add empty state with guidance (no items message).

## Interaction Fixes Needed

1. Add `focus-visible` to item rows and remove buttons.
2. Improve custom label creation — add inline input or modal for name/color.
3. Add undo support for label assignments (or confirmation for bulk changes).
4. Add drag-and-drop support for labeling (drag label pill to item).
5. Add `aria-label` to stats section.
6. Add keyboard shortcut for label assignment (number keys for label palette).

## Test Spec

| # | Test Case | Type |
|---|---|---|
| 1 | Renders header with correct labeled/total count | render |
| 2 | Palette renders in click mode with all label buttons | render |
| 3 | Palette hidden in list mode | render |
| 4 | Clicking palette button sets active label | interaction |
| 5 | Clicking same palette button deselects it | interaction |
| 6 | Click mode: clicking item fires `ai-label-assign` with active label | interaction |
| 7 | List mode: select change fires `ai-label-assign` | interaction |
| 8 | Remove button fires `ai-label-remove` without bubbling | interaction |
| 9 | Labeled items show colored pill with label name | render |
| 10 | Unlabeled items have `.unlabeled` class with reduced opacity | render |
| 11 | Stats section shows per-label counts and unlabeled count | render |
| 12 | Custom label button fires `ai-label-create` when `allowCustomLabels=true` | interaction |
| 13 | Custom label button hidden when `allowCustomLabels=false` | render |
| 14 | Keyboard Enter/Space on item in click mode assigns label | a11y |
| 15 | Items have correct `role` based on mode (button vs listitem) | a11y |
