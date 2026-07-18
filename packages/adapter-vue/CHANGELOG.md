# @cognivo/adapter-vue

## 1.1.0

### Minor Changes

- b6010a8: Add the Agent Interaction Contract receipt (Plan 03): `ActionReceipt` +
  `toReceipt()` in core capture what an executed action touched and its SPECIFIC
  compensating affordance (not a global undo — compensation reverses effect, it
  does not erase history). New `<ai-action-receipt>` component renders it with
  text status labels (WCAG 1.4.1, never color alone) and a keyboard-focusable
  compensation button. Additive and non-breaking.

### Patch Changes

- Updated dependencies [b6010a8]
  - @cognivo/components@1.1.0

## 1.0.0

### Major Changes

- # Adapters — 1.0

  The React and Vue wrappers are re-generated against the audited component set and migrate the `ai-agent-card` `role` prop to `agentRole` (attribute `agent-role`) — see the components changeset for rationale. `@cognivo/adapter-react` also catches up: the npm release had fallen behind the source.

### Patch Changes

- Updated dependencies
  - @cognivo/components@1.0.0

## 1.0.0

### Patch Changes

- Re-generate the React and Vue wrappers against the audited `@cognivo/components` release, and migrate the `ai-agent-card` `role` prop to `agentRole` in both wrappers (see the components changeset for the rationale). Also brings `@cognivo/adapter-react` up to date on npm — the published version had fallen behind the local source.
- Updated dependencies
  - @cognivo/components@1.0.0
