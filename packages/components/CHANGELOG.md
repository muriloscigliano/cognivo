# @cognivo/components

## 1.0.0

### Major Changes

- # Cognivo 1.0

  The first stable release. Every one of the 180 library components has been through a deep, adversarially-verified accessibility, token-governance, and correctness audit, and the generative / adaptive-UI pipeline has been hardened for production.

  ## Components (all 180 audited)

  The full `cg-*` foundation set (89) and `ai-*` AI-native set (91) were audited across twelve waves — roughly 950 verified findings applied, backed by ~1,000 new test cases (2,450+ component tests total). Notable fixes:
  - **Correctness**: dead action buttons wired to a non-existent event; an entirely invisible chart (SVG rendered in the wrong template namespace — four such invisible-icon bugs found); a component that mutated reactive state during render; a delete event that reported the wrong field; a toast that fabricated a dismiss reason.
  - **Accessibility**: invalid ARIA roles corrected library-wide (grid/tree/listbox/tablist/radiogroup → valid structures), mouse-only controls made keyboard-operable, color-only states given non-color cues (WCAG 1.4.1), and focus rings made visible and tokenized (WCAG 2.4.7) — including a library-wide light-theme regression where the focus-ring tokens existed only in the dark theme.
  - **Token governance**: the recurring background-token-as-foreground pattern, bare-px values, and hand-rolled hover/opacity hacks were replaced with the correct semantic tokens throughout.

  ### BREAKING
  - **`ai-agent-card`**: the `role` property is renamed to `agentRole` (attribute `agent-role`). The old `role` prop overwrote the host element's ARIA `role`. Consumers using `role="..."` must switch to `agent-role="..."`. The React/Vue adapters and gen-ui schema are updated to match.

## 0.8.3

### Patch Changes

- 5ba2052: Polish pass on foundation components:
  - **cg-blockquote**: redesigned as an editorial pull-quote anchored by an oversized decorative quote glyph, replacing the generic left-border treatment. Three variants (default / accent / muted card), tokens only.
  - **cg-button**: route the four transition timing functions through `--cg-transition-easing-default` instead of the raw `ease` keyword, matching the motion-token convention used by sibling components.
