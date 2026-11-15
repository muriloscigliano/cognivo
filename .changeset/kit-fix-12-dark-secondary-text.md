---
"@cognivo/tokens": patch
"@cognivo/components": patch
---

Readable secondary text in the dark theme.

- `--cg-color-on-surface-container-default` (the muted text on containers: table column headers, captions, hints) was an alias of the container's border colour, gray.600 on gray.900 — 2.29:1, failing WCAG AA. Dark now uses gray.400 (6.91:1). Light is unchanged (gray.500 on white, 4.83:1). No new hue.
- `cg-toaster`'s description painted the border token `--cg-color-surface-container-outlined` as text; it now uses `--cg-color-on-surface-container-default`.
- `validate-contrast` (runs on every tokens build) hard-gates both pairs — `table-header-text` and `toast-description` — in both themes.
