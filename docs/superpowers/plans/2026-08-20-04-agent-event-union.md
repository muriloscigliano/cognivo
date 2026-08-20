# Plan 04 — Agent Event Union (SSE contract) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the provider-neutral, discriminated `AgentEvent` union plus a typed emitter and a run-session glue helper in `@cognivo/core`, so agent runs stream `run.*` / `proposal.*` / `action.*` events instead of raw side-effects.

**Roadmap:** `docs/superpowers/plans/2026-07-13-agent-interaction-contract-roadmap.md` (Plan 04). Depends on Plans 01–03 (shipped in `packages/core/src/agent/`).

**Architecture:** Three new files in `src/agent/`: `events.ts` (the union + guards, pure types), `event-stream.ts` (a dependency-free push/pull emitter: `emit`/`on`/`close` + `AsyncIterable` bridge — core has no emitter today; the two in-repo precedents are `AsyncGenerator` clients and optional config callbacks, and this serves both), `run-session.ts` (glue: propose→gate→emit, resolve→ledger.record→emit, execute→toReceipt→emit, cumulative blast radius via `mergeBlastRadius` — correction #1 lives here). Exported through `src/agent/index.ts` → root barrel (`export * from './agent/index.js'` already public).

**Conventions (from shipped 01–03):** `.js` extensions in relative imports; caller-supplied `ts` — the engine NEVER calls `Date.now()`; fail-closed on invalid unions; NO `confidence` field anywhere; type-then-value export pairs in the sub-barrel; each test file ends with a "public API surface" root-barrel reachability describe. `exactOptionalPropertyTypes`: omit keys, never assign `undefined`.

**Scope decisions:**
- `run.checkpoint` carries `checkpoint: RunContext` — the shipped run-state shape. Plan 06 widens `RunContext` → `RunCheckpoint` without renaming the event field.
- `action.executed` carries the receipt for BOTH `executed` and `failed` receipt statuses — the receipt is the record of an execution *attempt*; `run.failed` is run-level abort. Documented on the type.
- **Adapters are OUT of scope** (roadmap listed them, deferred): no agent loop exists in adapter-openai/anthropic to translate yet; the union IS the contract they adopt when one lands. Noted for the roadmap.

---

### Task 1: `events.ts` — the union

**Files:** Create `packages/core/src/agent/events.ts`; Test `packages/core/src/__tests__/agent-events.test.ts`

- [ ] Failing tests: every event type constructible and narrowable via `switch (e.type)`; `isAgentEvent` accepts each, rejects junk (`null`, `{type:'nonsense'}`, missing runId/ts) — fail closed; `AGENT_EVENT_TYPES` lists all 8.
- [ ] Implement. Shape (roadmap-specified names, common envelope `{ type, runId, ts }`):

```ts
run.started       { goal: string }
step.started      { stepId: string; summary: string }
proposal.emitted  { proposal: ActionProposal; gate: Gate }
proposal.resolved { proposalId: string; decision: Decision; patch?: unknown }
action.executed   { receipt: ActionReceipt }
run.checkpoint    { checkpoint: RunContext }
run.failed        { stepId?: string; error: string; recoverable: boolean; partialRecovery?: string }
run.completed     { receipts: ActionReceipt[] }
```
Exports: `AgentEvent` (discriminated union on `type`), one named interface per event (`RunStartedEvent`, …), `AGENT_EVENT_TYPES` readonly tuple, `isAgentEvent(value: unknown): value is AgentEvent` (structural, fail-closed).
- [ ] Tests pass; commit.

### Task 2: `event-stream.ts` — typed emitter + AsyncIterable bridge

**Files:** Create `packages/core/src/agent/event-stream.ts`; Test in `agent-events.test.ts`

- [ ] Failing tests: `emit` before `subscribe` buffers for iterators created earlier only (define: iterator sees events emitted AFTER its creation); multiple `for await` consumers each get every subsequent event; `on()` listener called synchronously, unsubscribe stops; `close()` ends all iterators (loop exits) and makes further `emit` throw; listener errors don't break other listeners.
- [ ] Implement `AgentEventStream`: `emit(event: AgentEvent): void`, `on(listener): () => void`, `close(): void`, `[Symbol.asyncIterator](): AsyncIterator<AgentEvent>` via per-iterator queue + pending-promise resolution. No timers, no Date.now.
- [ ] Tests pass; commit.

### Task 3: `run-session.ts` — glue helper

**Files:** Create `packages/core/src/agent/run-session.ts`; Test `packages/core/src/__tests__/agent-run-session.test.ts`

- [ ] Failing tests: `startRun` emits `run.started`; `propose(p, ts)` computes gate from CURRENT cumulative context + ledger, emits `proposal.emitted`, returns the gate; `resolve(p, decision, ts)` records into the ledger (approved increments; edited/rejected reset — assert via gate graduation behavior) and emits `proposal.resolved`; `executed(p, outcome)` emits `action.executed` with `toReceipt`, merges the proposal's blast radius into the cumulative context, and emits `run.checkpoint` reflecting the merge (correction #1: a second proposal after an `external` action gates against the widened scope); `fail`/`complete` emit and close the stream; hard-stop proposals (`irreversible` + inference-only) still gate `confirm_typed` through the session with a maxed ledger.
- [ ] Implement `createAgentRun(opts: { runId: string; goal: string; ledger: TrustLedger; ts: number })` returning `{ events: AgentEventStream; propose; resolve; executed; checkpoint(): RunContext; fail; complete }`. All methods take caller-supplied `ts`. Internally: `emptyRunContext` + `mergeBlastRadius` + `gate` + `toReceipt`.
- [ ] Tests pass; commit.

### Task 4: barrel, docs, changeset

**Files:** Modify `packages/core/src/agent/index.ts` (type/value pairs for all Task 1–3 exports), `packages/core/src/index.ts` (update stale "Plan 01" comment to "Plans 01–04"); Create `.changeset/agent-event-union.md` (`@cognivo/core: minor`)

- [ ] Barrel-reachability describes in both test files (root import).
- [ ] Gates: `cd packages/core && npx vitest run` all green; `pnpm --filter @cognivo/core exec tsc --noEmit`; `pnpm --filter @cognivo/core build`; lint targeted files clean.
- [ ] Update roadmap file: mark Plan 04 shipped, note adapter-translation deferral.
- [ ] Commit.

## Self-review
- Roadmap event list covered 8/8; names verbatim. No `confidence`. `patch?`/`stepId?`/`partialRecovery?` optional-omitted, never `undefined`-assigned.
- Correction #1 (cumulative blast radius) is enforced in the session, tested via the widened-scope gate assertion.
- Nothing imports Plan-06 territory; `RunContext` reused, not extended.
