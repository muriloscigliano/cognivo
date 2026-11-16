---
"@cognivo/tokens": patch
---

The theme CSS now sets `color-scheme`: `:where(:root) { color-scheme: light }` and `color-scheme: dark` in `[data-theme="dark"]`. Native controls (the date field's calendar icon, scrollbars, select popups) now draw for the active theme instead of dark-on-dark; pages no longer need to set it themselves (README note removed). The light rule has zero specificity, so a page's own `html { color-scheme: ... }` (or `:root`) still wins; under `data-theme="dark"` ours applies unless the page targets that selector too. No `prefers-color-scheme` rule is generated (dark is opt-in through `data-theme`).
