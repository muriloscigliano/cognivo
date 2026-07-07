# @cognivo/tokens

## 1.0.0

### Major Changes

- # Generative pipeline & tokens — 1.0

  **@cognivo/gen-ui** — The component registry now covers all 196 registered components (previously missing the 6 `bias-*` wrappers — the product's core differentiator — plus 10 layout primitives and 4 others), with a parity test that makes registry↔components drift impossible. `validateTokenUsage()` now suggests only tokens that exist in the shipped set; a dangling registry entry was removed.

  **@cognivo/gen-ui-lit** (first stable release) — The renderer that turns LLM output into live components is now production-hardened: HTML-injection sinks, inline `on*` handlers, and `javascript:`/`data:text` URLs are refused at prop-assignment time (previously a live XSS vector); streaming updates reconcile the DOM in place so element state, focus, and animations survive each chunk (was a full teardown per chunk); and tree depth is capped so a hallucinated recursive tree cannot blow the stack.

  **@cognivo/tokens** — Light-theme parity: the focus-ring and accent tokens (`--cg-color-focus-ring`, `--cg-color-focus-ring-offset`, `--cg-color-accent-text`, `--cg-color-accent-background`) now exist in both themes (they were dark-only, making every focus ring invisible in light mode — a WCAG 2.4.7 failure). The `--cg-opacity-*` tokens no longer generate as invalid CSS; new `--cg-size-touch-target` (44px), a tier-3 tooltip max-width, and a danger `hover-strong` token round out the set.

## 1.0.0

### Patch Changes

- Add the focus-ring and accent tokens to the **light** theme. `--cg-color-focus-ring`, `--cg-color-focus-ring-offset`, `--cg-color-accent-text`, and `--cg-color-accent-background` previously existed only in the dark theme block, so in light mode every dual-layer focus ring resolved to an undefined variable (invisible / browser-default — a WCAG 2.4.7 failure) and accent text lost its color. Light values are theme-appropriate: the accessible green (`#16a34a`) for the ring and accent text (the brand lime is invisible on white), a white inner-ring gap, and an 8% green accent tint. Also fixes the `--cg-opacity-*` tokens, which were generated as invalid CSS (`50rem`), and adds `--cg-size-touch-target` (44px) plus a tier-3 tooltip max-width and a danger `hover-strong` token.
