---
"@cognivo/tokens": patch
---

The theme CSS now sets `color-scheme`: `light` in the `:root` block and `dark` in `[data-theme="dark"]`. Native controls (the date field's calendar icon, scrollbars, select popups) now draw for the active theme instead of dark-on-dark; pages no longer need to set it themselves (README note removed).
