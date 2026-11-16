---
"@cognivo/tokens": minor
"@cognivo/components": minor
"@cognivo/adapter-react": minor
---

Dashboard layout, natively: a canvas with the sidebar on it and one raised content panel, in a designed light and dark theme.

- **Tokens (existing palette only):** `--cg-color-surface-canvas-background` (light gray.100, dark gray.950 — near-black), `--cg-color-surface-panel-background` (white / gray.900, one step lighter than the dark canvas), `--cg-color-surface-panel-border` (gray.200 / white at 8% — a low-opacity hairline). `--cg-color-surface-sidebar-background` now *is* the canvas in both themes. Tier 3: `--cg-component-app-shell-panel-radius` (16px) and `--cg-component-app-shell-panel-inset` (8px).
- **`cg-app-shell` `panel`** (opt-in attribute / property): the header and sidebar sit on the canvas; the content is one raised panel with a 16px radius, a hairline border and an 8px inset, separated by surfaces instead of divider lines. Without `panel` the layout is unchanged.
- **`cg-sidebar`:** paints the sidebar surface tokens (it sits on the canvas); the active item (`aria-current` / `.active`) is a subtle filled pill (`--cg-color-surface-sidebar-selected-background`) instead of a green left bar with accent text, also in the collapsed rail; items marked `data-sub` are indented under their parent with a thin guide line (hidden in the collapsed rail). Its footer sits at the bottom of the shell's viewport-height column (kit-fix-32).
- Every new pair is covered by the derived contrast gate (all pass AA in both themes). React: `<CgAppShell panel>`.

*Visual change:* `cg-sidebar` is on the canvas colour (was the white/gray.900 container surface) and its active item is a pill, not a bar.
