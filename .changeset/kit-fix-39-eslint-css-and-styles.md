---
"@cognivo/eslint-plugin": minor
---

`no-raw-hex` and `no-raw-rgba` now catch raw colours where apps actually write them, not only in Lit `css` templates:

- **React style objects:** `style={{ color: '#fff' }}` in JSX (string and template values, both branches of a ternary, nested objects) and object literals typed, `satisfies`-checked or cast as `CSSProperties` / `React.CSSProperties`. On with `recommended` for any file your config parses as JSX/TSX.
- **Plain `.css` files:** new `configs.css` (spread it: `...cognivo.configs.css`) — the new `@cognivo/css` processor hands each `.css` file to the two rules as one `css` template; messages map back to the file's own line and column. A processor rather than a Stylelint config, so one linter, one set of messages.
- Each raw colour is now reported at its exact line and column (it was the whole template).

Documented on the plugin's docs page (with examples); the plugin has its own test suite now (`pnpm --filter @cognivo/eslint-plugin test`).
