# @cognivo/gen-ui-lit

## 1.0.0

### Major Changes

- # Generative pipeline & tokens — 1.0

  **@cognivo/gen-ui** — The component registry now covers all 196 registered components (previously missing the 6 `bias-*` wrappers — the product's core differentiator — plus 10 layout primitives and 4 others), with a parity test that makes registry↔components drift impossible. `validateTokenUsage()` now suggests only tokens that exist in the shipped set; a dangling registry entry was removed.

  **@cognivo/gen-ui-lit** (first stable release) — The renderer that turns LLM output into live components is now production-hardened: HTML-injection sinks, inline `on*` handlers, and `javascript:`/`data:text` URLs are refused at prop-assignment time (previously a live XSS vector); streaming updates reconcile the DOM in place so element state, focus, and animations survive each chunk (was a full teardown per chunk); and tree depth is capped so a hallucinated recursive tree cannot blow the stack.

  **@cognivo/tokens** — Light-theme parity: the focus-ring and accent tokens (`--cg-color-focus-ring`, `--cg-color-focus-ring-offset`, `--cg-color-accent-text`, `--cg-color-accent-background`) now exist in both themes (they were dark-only, making every focus ring invisible in light mode — a WCAG 2.4.7 failure). The `--cg-opacity-*` tokens no longer generate as invalid CSS; new `--cg-size-touch-target` (44px), a tier-3 tooltip max-width, and a danger `hover-strong` token round out the set.

### Patch Changes

- Updated dependencies
  - @cognivo/gen-ui@1.0.0

## 1.0.0

### Minor Changes

- Harden the generative / adaptive-UI pipeline for production.

  **@cognivo/gen-ui**
  - The component registry now covers all 196 library components (was missing the 6 `bias-*` wrappers — the product's core differentiator — plus the 10 Astryx-parity layout primitives and 4 others). A registry↔components parity test now makes silent drift impossible.
  - Removed an orphaned `Section` registry entry that pointed at a deleted component.
  - `validateTokenUsage()` suggestions now name only tokens that actually exist in the shipped token set.

  **@cognivo/gen-ui-lit** (first published release)
  - **Untrusted-input hardening**: the render tree is LLM output, so HTML-injection sinks (`innerHTML`/`outerHTML`/`srcdoc`/`style`), inline `on*` event handlers, and `javascript:`/`data:text` URLs are now refused at prop-assignment time. Previously every prop was set verbatim as both property and attribute — a live XSS vector.
  - **Streaming-stable updates**: `update()` now reconciles the DOM in place instead of tearing it down each chunk, so element state, focus, and animations survive a streaming render.
  - **Depth cap** (32) so a hallucinated/recursive tree cannot blow the stack.

### Patch Changes

- Updated dependencies
  - @cognivo/gen-ui@1.0.0
