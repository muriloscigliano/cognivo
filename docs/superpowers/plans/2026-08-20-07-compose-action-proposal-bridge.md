# Plan 07 — Compose ActionProposal Bridge (Weft wedge) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wrap a compose `CompositionDiff` as a core `ActionProposal<CompositionDiff>` so governed UI composition rides the Agent Interaction Contract — linter as the structural gate, ghost renderer as the preview, `StaleDiffError` as the concurrency guard.

**Roadmap:** Plan 07 in `docs/superpowers/plans/2026-07-13-agent-interaction-contract-roadmap.md`. Depends on Plans 01–02 (shipped) — and 04's session consumes the result.

**Architecture:** New `packages/compose/src/bridge/action-proposal.ts` (compose gains a `@cognivo/core: workspace:*` dependency — scout verified zero circularity; core references compose only in a doc comment). The bridge is pure: given base tree + diff + grammar it returns `{ proposal, candidate, violations }`. The candidate comes from `apply(base, diff)` (throws `StaleDiffError` — surfaced, not swallowed); violations from `lint(candidate, grammar)` — the gate evaluates the RESULT tree, not the ops. `compose-lit`'s `<cg-compose-canvas>.proposeModify` additionally emits the proposal as a `composition-proposal` CustomEvent.

**The two-provenance-axis invariant (roadmap, DO NOT VIOLATE):** the proposal's `provenance` is core's GROUNDING axis — `[{ kind: 'document', docId: 'tree:'+baseHash }, { kind: 'inference' }]` (honest: the diff is grounded in the base tree it rewrites; the layout choices are model inference). Compose's `ProvenanceEntry` lineage log is untouched and stays the commit-time record. Never mix the types.

**Key mappings:**
- `tool`: exported const `COMPOSITION_MODIFY_TOOL = 'composition.modify'`.
- `reversibility`: `'reversible'` — base tree + `discard()` is a perfect undo; no compensation needed (passes `assertWellFormed`).
- `blastRadius`: `{ scope: 'self', entities: touchedEntities(diff), irreversibleSideEffects: [] }` — a composition changes one UI surface. Entities are human-legible: `add ComponentType @ path`, `setProp key @ path`, etc., via compose's `formatPath`.
- `summary`: `summarizeDiff(diff)` — op-count + leading op kinds, one line.
- `rationale`: the user prompt that produced the diff.
- No timestamps in proposals (ActionProposal carries none); ids/runIds caller-supplied.

---

### Task 1: bridge module in `@cognivo/compose`

**Files:** Create `packages/compose/src/bridge/action-proposal.ts`; Modify `packages/compose/package.json` (add dep `"@cognivo/core": "workspace:*"`); Test `packages/compose/src/__tests__/bridge.test.ts`

- [ ] `pnpm add` the dep (edit package.json + `pnpm install`).
- [ ] Failing tests (reuse `el` from `./fixtures.js`, grammar fixture shape from `grammar.test.ts`):
  - `summarizeDiff`: empty ops → `'no changes'`; mixed ops → mentions counts/kinds; one-liner (no `\n`).
  - `touchedEntities`: add/replace name the node type + path; setProp names key + path; move names from→to; remove names path; deduped.
  - `proposeComposition` happy path: returns proposal passing core's `assertWellFormed`; `tool === COMPOSITION_MODIFY_TOOL`; `reversibility === 'reversible'`; grounding provenance = document(tree:baseHash) + inference (NOT inference-only — assert via core's `isInferenceOnly` → false); `input` IS the diff; candidate deep-equals `apply(base, diff)`; violations `[]` on a clean result.
  - Violating diff (e.g. adds a 3rd MetricCard against `max-instances: 2`): violations non-empty, proposal still returned (the caller/UI decides what to show).
  - Stale diff (wrong baseHash): `proposeComposition` throws `StaleDiffError`.
  - Gate integration: a clean composition proposal through core's `gate()` with empty context + fresh ledger → `'auto'` (reversible + grounded); after the run context carries irreversible side effects → `'confirm'` (correction #1 reaches compositions too).
- [ ] Implement:

```ts
export const COMPOSITION_MODIFY_TOOL = 'composition.modify';
export interface CompositionProposalInput {
  id: string; runId: string;
  /** The user prompt that produced the diff — becomes the rationale. */
  prompt: string;
  baseTree: ElementNode; diff: CompositionDiff; grammar: LayoutGrammar;
}
export interface CompositionProposalResult {
  proposal: ActionProposal<CompositionDiff>;
  /** apply(baseTree, diff) — the tree the linter judged and the ghost previews. */
  candidate: ElementNode;
  /** Structural gate: non-empty means the candidate breaks the layout grammar. */
  violations: GrammarViolation[];
}
export function summarizeDiff(diff: CompositionDiff): string
export function touchedEntities(diff: CompositionDiff): string[]
export function proposeComposition(input: CompositionProposalInput): CompositionProposalResult
```
- [ ] Tests pass; type-check; commit.

### Task 2: barrel + doc corrections

**Files:** Modify `packages/compose/src/index.ts` (new `// ─── Agent-contract bridge ───` section: values `proposeComposition`, `summarizeDiff`, `touchedEntities`, `COMPOSITION_MODIFY_TOOL`; types `CompositionProposalInput`, `CompositionProposalResult`), fix the stale "Zero deps beyond @cognivo/gen-ui and zod" header comment.

- [ ] Barrel-reachability test appended to `bridge.test.ts`. Commit.

### Task 3: `<cg-compose-canvas>` emits the proposal

**Files:** Modify `packages/compose-lit/src/cg-compose-canvas.ts`; Test additions in `packages/compose-lit/src/__tests__/canvas.test.ts`

- [ ] Failing tests: after `proposeModify` succeeds, a `composition-proposal` CustomEvent (bubbles, composed) fired with `detail: { proposal, violations: [] }`; proposal ids are deterministic per canvas (`p0`, `p1`, …) and `runId` comes from the new optional `runId` prop (default `'compose-canvas'`); on a lint-rejected modify the event carries the non-empty violations and the proposal (UI can show WHY it was blocked); stale diffs still surface `StaleDiffError` behavior unchanged.
- [ ] Implement: canvas builds the proposal via `proposeComposition` inside `proposeModify` (replacing its inline apply+lint? NO — `previewDiff` must still drive the ghost; call `proposeComposition` for the proposal/violations and keep `renderer.previewDiff(diff)` for the DOM, asserting both use the same candidate logic — simplest: use bridge for proposal + violations, keep existing preview/discard flow keyed off `violations.length`). Private `_proposalSeq = 0` counter; `@property() runId = 'compose-canvas'`.
- [ ] Tests pass (jsdom); type-check both packages; commit.

### Task 4: changeset, roadmap, gates

- [ ] `.changeset/compose-action-proposal-bridge.md`: `@cognivo/compose: minor`, `@cognivo/compose-lit: minor` (both private → check changesets `privatePackages` handling; config has `privatePackages: false`? verify — if changesets ignores private packages, skip the changeset and note it).
- [ ] Roadmap: mark Plan 07 shipped; note the modify-retry loop gap explicitly deferred (needs a `feedback` param on `ComposeClient.modify` — client-seam change, own decision).
- [ ] Gates: compose + compose-lit + core test suites, tsc, workspace `pnpm test`, lint. Commit.

## Self-review
- Linter-as-gate: violations computed on the applied candidate ✓; blocked proposals still constructed so `proposal.emitted`/UI can carry the rejection ✓.
- Ghost-as-preview: untouched `GhostRenderer` reused ✓. StaleDiffError propagates ✓.
- Grounding vs lineage axes kept separate ✓ (bridge never touches `ProvenanceLog`).
- No `Date.now()`, no randomness; ids deterministic/caller-supplied ✓.
