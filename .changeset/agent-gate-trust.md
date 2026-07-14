---
"@cognivo/core": minor
---

Add the Agent Interaction Contract gate (Plan 02): `gate()` resolves each
`ActionProposal` to `auto | notify | confirm | confirm_typed`, and `TrustLedger`
graduates earned autonomy per `tool + blast-bucket`. Encodes the three safety
corrections: the gate escalates on the run's CUMULATIVE blast radius (not a
single proposal), trust is keyed so cheap approvals cannot pay for expensive
actions, and the irreversible+inference-only hard-stop overrides any earned
trust. Additive and non-breaking.
