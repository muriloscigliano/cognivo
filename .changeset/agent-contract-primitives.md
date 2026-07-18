---
"@cognivo/core": minor
---

Add the Agent Interaction Contract foundation (Plan 01): grounding `Provenance`
(`tool_result | document | inference`), `Reversibility` classification, cumulative
`BlastRadius`, and the generalized `ActionProposal<T>` type with the
`isHardStop` rule (irreversible + inference-only never auto-executes). Additive
and non-breaking; self-reported `confidence` is now `@deprecated` in favour of
grounding provenance (removal scheduled for 2.0, Plan 05).
