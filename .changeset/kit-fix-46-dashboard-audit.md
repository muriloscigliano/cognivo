---
"@cognivo/tokens": major
"@cognivo/components": major
---

Library-level findings of the growth-kit dashboard design audit (2026-11-17), each with a test (token values in `node --test`, behaviour and computed styles in real Chromium).

- **One control scale (tokens).** Buttons and inputs are `sm` 32 / `md` 36 / `lg` 40 px (were 32 / 48 / 56), radius 8 px at every size (`--cg-component-button-radius-*`, `--cg-component-input-radius`); `cg-select` follows the input. `--cg-size-touch-target` (44 px) is the phone target size.
- **Dark surface ladder (tokens, both presets).** `--cg-color-surface-canvas-background` < `-panel-background` < the new `-raised-background`, lighter as it rises in dark (`#0b0b0c` / `#141416` / `#1b1b1e`), plus `--cg-color-surface-hairline` (white 8 %) and `--cg-color-surface-hover` (white 6 %). Light: grey-100 canvas, white panel, grey-50 raised, grey-200 hairline. Text, muted text and links on the raised step and muted text on the panel are in the contrast gate.
- **Quieter tints and dialogs (tokens).** Badge backgrounds are about 8 % of their hue (dark 10 %), with a new neutral tint (`--cg-color-badge-background-neutral`, `--cg-color-badge-text-neutral`); the dialog backdrop is black at 32 % (dark 56 %); `--cg-component-modal-radius` is 12 px.
- **Sizes (tokens).** `--cg-component-badge-height` 28 px; `--cg-component-segmented-control-height-md` 32 px with a 2 px padding (26 px options, 3 px inset with the border); `--cg-component-pagination-button-size` 28 px; table densities `--cg-component-table-row-height-list` (60 px) / `-data` (40 px), `--cg-component-table-header-height` (36 px) and `--cg-component-table-fade-size`; `--cg-component-input-label-gap` (6 px).

**2.0.0 migration notes (visual):**

- Default control sizes changed: a `cg-button` / `cg-input` / `cg-select` without `size` is 36 px tall (was 48), `size="lg"` 40 px (was 56), and the default corner is 8 px (was 16 / 12). To keep the old scale, set `--cg-component-button-height-md: 48px`, `--cg-component-input-height-md: 48px` and the radius tokens at `:root`.
- Dark theme: the canvas is `#0b0b0c` (was grey-950 `#09090b`) and the panel `#141416` (was grey-900 `#18181b`); the panel border is `--cg-color-surface-hairline`.
- Badge and dialog backdrop colours are lighter; the segmented control's track is 32 px (was 40) and pager buttons 28 px (were 36).
