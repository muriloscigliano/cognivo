---
"@cognivo/tokens": major
"@cognivo/components": major
---

Gaps a dashboard built to the growth-kit direction had to work around, closed in Cognivo (each with a real-browser test).

- **`cg-dropdown` is a WAI-ARIA menu button (axe passes).** `aria-haspopup="menu"` and `aria-expanded` are on the slotted trigger (they were on a role-less wrapper: axe critical `aria-allowed-attr`); slot a native `<button>`. The closed menu leaves the accessibility tree; items are `tabindex="-1"` and focus moves into the menu on open (click / Enter / Space / ArrowDown: first item; ArrowUp: last); ArrowUp / ArrowDown / Home / End move, a letter jumps to the next item starting with it, Enter / Space choose and return focus to the trigger, Escape closes and returns focus (and is consumed), Tab closes. New `label` names the menu (default: the trigger's text). No `aria-controls`: an id cannot point into the shadow root and Chromium drops `ariaControlsElements` across it; the pattern does not require it.
- **`cg-input`:** the placeholder is visible whenever no floating label stands in for it (it was transparent until focus); `affix="plain"` draws prefix / suffix content inside the field with no grey box or divider; `size="sm"` is the 32 px toolbar height (`--cg-component-input-height-sm`). Form bundle 13,296 B (gate 13,312).
- **`cg-table`:** `variant="plain"` draws flat rows with full-width hairlines (no inset body card); the default `"inset"` is unchanged. When the table is wider than its box, the scroll box is a tab stop and, if the table has a name, a region named after it (axe `scrollable-region-focusable`).
- **`cg-sidebar`:** the outer edge and the sub-item guide line have their own tokens, `--cg-color-surface-sidebar-edge` and `--cg-color-surface-sidebar-guide` (both default to `--cg-color-surface-sidebar-border`), so the edge can be `transparent` on the canvas while the guide stays.
- **`cg-popover` / `cg-dropdown` `block`:** the element is a block and the slotted trigger spans its width.
- **`cg-segmented-control`:** options never wrap or shrink below their label; in a narrow space the track scrolls sideways and the host stays inside its container. An option's `ariaLabel` names it when it should differ from the visible text ("12m" → "12 months").
- **Tokens:** type steps `--cg-font-size-13`, `-15`, `-34`, `-47`; link colour `--cg-color-link-text` (the accent text; the neutral state text in the neutral preset) and `--cg-color-link-hover` (state text), gated on the page, panel and canvas in both themes and both presets.
- **`cg-app-shell` `panel` without a top bar:** an empty header slot takes no space and the panel sits `--cg-component-app-shell-panel-top` (default: the panel inset) from the window top. With a header nothing changes.

**2.0.0 migration notes:**

- `cg-dropdown`: the popup state moved from the internal wrapper to the slotted trigger element; a click now moves focus to the first item, and choosing an item with the mouse returns focus to the trigger.
- `cg-sidebar`: its edge and guide line read `--cg-color-surface-sidebar-edge` / `-guide`. Those default to the border token at `:root`, so overriding `--cg-color-surface-sidebar-border` on the element itself no longer recolours them — override the new tokens (or the border at `:root`).
- `cg-input`: an input without a `label` shows its placeholder at rest; `aria-required` is no longer set by hand (the native `required` exposes it). An empty `label` no longer adds the floating-label padding.
- `cg-segmented-control`: options keep their natural width (`flex: 1 0 auto`) instead of shrinking; a control wider than its container scrolls instead of squeezing.
