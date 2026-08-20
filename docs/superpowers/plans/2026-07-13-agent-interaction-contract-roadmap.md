# Agent Interaction Contract — Roadmap

> **For agentic workers:** This is the ROADMAP, not an executable plan. It sequences six sub-plans. Execute them in order via their own plan files. Each sub-plan produces working, shippable software on its own.

**Goal:** Turn agent output across Cognivo from raw side-effects into *governed proposals* carrying honest grounding provenance, a reversibility classification, a runtime gate, receipts, a streaming event contract, and interruptible-resumable runs.

**Why this shape:** The critique of the "agentic UX" deck established four correct load-bearing ideas and three corrections. The load-bearing net-new primitive is **grounding provenance** (`tool_result | document | inference`) — the honest label for "the model made this up" — because every other primitive reads from it. Everything else is either net-new structure (`Reversibility`, `TrustLedger`, receipts, event union) or the exposure of already-shipped `@cognivo/compose` seams (ghost preview, stale-diff guard, governance linter, lineage provenance).

**The two-provenance-axis invariant (do not violate):** `@cognivo/compose` already ships *lineage* provenance (`ProvenanceEntry`: prompt→diff→treeHash — "how did this tree come to be"). This roadmap adds *grounding* provenance ("what did this action's content rest on"). They are different axes. A proposal carries BOTH. Never collapse them into one type.

---

## Current-state ground truth (verified 2026-07-13)

| Primitive | Nearest shipped code | Verdict |
|---|---|---|
| `ActionProposal` | `lens-core` `AgentFixProposal` (`packages/lens-core/src/agent/types.ts:34`) — has `summary`/`rationale`/`confidence`/`generatedAt` | Generalize; drop `confidence`, add provenance+reversibility+blastRadius |
| Approval gate UI | `ai-action-preview` (`packages/components/src/components/ai-action-preview/ai-action-preview.ts`) — display `severity`, countdown, confirm/cancel events | Extend; swap display-severity for computed blast radius |
| Ghost preview | compose `GhostRenderer` (`packages/compose-lit/src/ghost-renderer.ts:63`) | Reuse as-is |
| Stale-under-you guard | compose `StaleDiffError` (`packages/compose/src/diff/apply.ts:20`, baseHash) | Reuse — doubles as resume-safety |
| Governance gate | compose linter (min-span/region/max-instances) | Generalize to action gate |
| Lineage provenance | compose `ProvenanceEntry` (`packages/compose/src/provenance/types.ts:12`) | Reuse — SEPARATE axis |
| **Grounding provenance** | ❌ nothing | **BUILD (Plan 01)** |
| `Reversibility` + gate | ❌ nothing (only prose `ai-action-preview.ts:3`) | **BUILD (Plan 01 + 02)** |
| `TrustLedger` | ❌ nothing | **BUILD (Plan 02)** |
| `ActionReceipt` + compensation | ❌ nothing | **BUILD (Plan 03)** |
| SSE `run.*/proposal.*/action.*` union | ❌ nothing — only `streamIntent → Partial<AiResult>` (`packages/core/src/client/types.ts:60`) | **BUILD (Plan 04)** |
| Checkpoint/resume | `core/patterns` step loop + `stopWhen` (`packages/core/src/patterns/types.ts`) | Extend (Plan 06) |
| `AiResult.confidence` | present + spread across `AiDriver`/`AiAnomaly`/`AiForecast`/`AiClassification` (`packages/core/src/results/types.ts`) | Deprecate (Plan 01) → remove (Plan 05) |

---

## The three corrections (bake into every gate/ledger task)

1. **Blast radius is cumulative over a run, not per-proposal.** Ten individually-reversible actions can compose into an irreversible mailshot. The gate reads the run checkpoint, not just the single proposal.
2. **TrustLedger keys on `tool + blastBucket`, never `tool` alone.** Ten $50 invoices earning autonomy must not graduate a $50k invoice to a new external entity. Same tool, different blast bucket → different ledger key.
3. **`irreversible + inference-only ⇒ hard stop`, unconditionally.** No earned trust, no autonomy level, no "allow always" overrides this. This single rule kills the catastrophic tail.

And one a11y house rule (WCAG 1.4.1): **provenance is never encoded in colour/texture alone.** Visual texture is the anti-cry-wolf default, but it MUST be backed by a programmatic text label / `aria`.

---

## Sub-plan sequence

Each is its own plan file under `docs/superpowers/plans/`. Dependencies are strict — later plans import types from earlier ones.

| # | Plan | Package(s) | Ships | Breaking? | Depends on |
|---|---|---|---|---|---|
| **01** | Grounding-provenance + Reversibility primitives | `@cognivo/core` | The `Provenance` union, `Reversibility` type, `ActionProposal<T>` type, `blastRadius`; `confidence` marked `@deprecated` | No (additive) | — |
| **02** | Gate + TrustLedger | `@cognivo/core` | `gate(proposal, checkpoint, ledger)`, `TrustLedger` (tool+bucket keyed), the 3 corrections encoded | No | 01 |
| **03** | ActionReceipt + compensation | `@cognivo/core` | `ActionReceipt`, `compensation` resolution, `<ai-action-receipt>` component | No | 01 |
| **04** | Run/proposal/action event union (SSE contract) — **SHIPPED 2026-08-20** (`src/agent/events.ts` + `event-stream.ts` + `run-session.ts`; adapter translation deferred until an adapter grows an agent loop) | `@cognivo/core` | Discriminated `AgentEvent` union + typed emitter + `createAgentRun` session | No | 01, 02, 03 |
| **05** | Kill `confidence` → provenance migration | `@cognivo/core` + adapters + `ai-*` | Remove `confidence` from public API; codemod; MAJOR bump | **Yes** | 01–04 |
| **06** | Checkpoint/resume (fork-not-restart) | `@cognivo/core` | `RunCheckpoint`, `resume(cp, {correction})`, fork semantics on `patterns` loop | No | 04 |
| **07** | `ActionProposal<UISpec>` compose bridge (Weft wedge) — **SHIPPED 2026-08-20** (`compose/src/bridge/action-proposal.ts`; `<cg-compose-canvas>` emits `composition-proposal`; no changeset — both packages private. Deferred: bounded modify-retry loop needs a `feedback` param on `ComposeClient.modify`) | `@cognivo/compose(-lit)` | Wrap a compose `CompositionDiff` as an `ActionProposal`; linter = gate; ghost = preview | No | 01, 02 |

**Ship boundary:** Plans 01–04 + 06–07 are all additive and can land in a 1.x minor. Plan 05 is the only breaking change and gates the 2.0 major. Recommendation: ship 01–04 and 07 first (immediate value, non-breaking), run 05 as the 2.0 milestone once at least one product (Weft) consumes the additive path and proves the shape.

---

## Plan 01 is written in full below (this file's companion)

The executable, task-by-task Plan 01 lives at:
`docs/superpowers/plans/2026-07-13-01-grounding-provenance-primitives.md`

Plans 02–07 are specced at roadmap level here and get their own executable files when their predecessor lands (writing them now would bake in assumptions about types 01 hasn't finalized — YAGNI).

### Plan 02 spec (Gate + TrustLedger)
- `Gate = 'auto' | 'notify' | 'confirm' | 'confirm_typed'`
- `gate(proposal, checkpoint, ledger): Gate` — pure function. Reads cumulative blast radius off `checkpoint`, not just `proposal`.
- `TrustLedger`: `autoApprovals(key: string): number`, `record(key, decision)`, decay. Key = `\`${tool}:${blastBucket}\``.
- Encode the 3 corrections as explicit, separately-tested branches. The `irreversible + inference-only ⇒ confirm` branch gets its own test asserting it ignores a maxed-out ledger.

### Plan 03 spec (Receipt + compensation)
- `ActionReceipt`: what executed, what it touched (`blastRadius` snapshot), the specific compensation affordance (NOT a global undo). Compensating action ≠ undo — a voided invoice still exists; the receipt says so.
- `<ai-action-receipt>` component: extends nothing; new. Renders the per-action compensate CTA. Tier-2 tokens only.

### Plan 04 spec (Event union)
```
run.started      { runId, goal }
step.started     { stepId, summary }
proposal.emitted { proposal, gate }
proposal.resolved{ proposalId, decision: 'approved'|'edited'|'rejected', patch? }
action.executed  { receipt }
run.checkpoint   { checkpoint }
run.failed       { stepId, error, recoverable, partialRecovery? }
run.completed    { receipts[] }
```
Discriminated union on a `type` field. Provider-neutral. Adapters translate SDK stream → this union.

### Plan 05 spec (Kill confidence — BREAKING)
- Remove `confidence` from `AiResult`, `AiDriver`, `AiAnomaly`, `AiForecast`, `AiClassification`.
- Provide a codemod / migration note: `confidence` → nearest `Provenance`. Where a number is genuinely wanted, it must come from a *calibrated* source, not model self-report.
- MAJOR version bump. Changeset `major`. Update `ai-*` components that render confidence.

### Plan 06 spec (Checkpoint/resume)
- `RunCheckpoint { runId, step, goal, completedActions: ActionReceipt[], agentState }`.
- `resume(checkpoint, { correction })` — fork, not kill. Build on `core/patterns` step loop.
- Invariant: a "Pause" button that can't resume is a lie. Test that resume replays completed receipts without re-executing them.

### Plan 07 spec (compose bridge)
- `ActionProposal<UISpec>` where `UISpec` = a compose `CompositionDiff`.
- The compose linter result populates the proposal's gate. `StaleDiffError`/`baseHash` becomes the proposal's "tree changed under you" guard. `GhostRenderer` renders the preview. This is ~60% shipped — a wrap-and-expose, not a rebuild.

---

## Self-review notes
- **Spec coverage:** all deck primitives mapped to a numbered plan; the 3 corrections + a11y rule are cross-cutting constraints repeated in each relevant plan.
- **Sequencing:** additive-first (01–04, 06, 07) before breaking (05) — correct 1.0-public-API discipline.
- **Type consistency:** `ActionProposal`, `Provenance`, `Reversibility`, `Gate`, `TrustLedger`, `ActionReceipt`, `RunCheckpoint`, `AgentEvent` are the canonical names used identically across all plans.
