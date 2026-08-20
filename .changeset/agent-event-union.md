---
"@cognivo/core": minor
---

Agent Interaction Contract Plan 04: the provider-neutral `AgentEvent` union.

- `AgentEvent` — discriminated union of 8 run/proposal/action events (`run.started`, `step.started`, `proposal.emitted`, `proposal.resolved`, `action.executed`, `run.checkpoint`, `run.failed`, `run.completed`) with a fail-closed runtime guard `isAgentEvent` and `AGENT_EVENT_TYPES`
- `AgentEventStream` — dependency-free typed emitter serving both synchronous listeners (`on`) and `for await…of` iteration; `close()` ends all consumers
- `createAgentRun` — run-session glue wiring gate + trust ledger + receipts to the event stream, accumulating cumulative blast radius across executed actions (correction #1) so later proposals gate against the whole run
- All timestamps caller-supplied; no `confidence` fields anywhere in the contract
