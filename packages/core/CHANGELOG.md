# @cognivo/core

## 1.1.0

### Minor Changes

- b6010a8: Add the Agent Interaction Contract receipt (Plan 03): `ActionReceipt` +
  `toReceipt()` in core capture what an executed action touched and its SPECIFIC
  compensating affordance (not a global undo — compensation reverses effect, it
  does not erase history). New `<ai-action-receipt>` component renders it with
  text status labels (WCAG 1.4.1, never color alone) and a keyboard-focusable
  compensation button. Additive and non-breaking.
- 6e0afbb: Add the Agent Interaction Contract foundation (Plan 01): grounding `Provenance`
  (`tool_result | document | inference`), `Reversibility` classification, cumulative
  `BlastRadius`, and the generalized `ActionProposal<T>` type with the
  `isHardStop` rule (irreversible + inference-only never auto-executes). Additive
  and non-breaking; self-reported `confidence` is now `@deprecated` in favour of
  grounding provenance (removal scheduled for 2.0, Plan 05).
- a679598: Add the Agent Interaction Contract gate (Plan 02): `gate()` resolves each
  `ActionProposal` to `auto | notify | confirm | confirm_typed`, and `TrustLedger`
  graduates earned autonomy per `tool + blast-bucket`. Encodes the three safety
  corrections: the gate escalates on the run's CUMULATIVE blast radius (not a
  single proposal), trust is keyed so cheap approvals cannot pay for expensive
  actions, and the irreversible+inference-only hard-stop overrides any earned
  trust. Additive and non-breaking.
