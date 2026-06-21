# G1b/c/d — Eval harness (the GO/NO-GO gate)

> **Phase:** G (final unit). **Depends on:** G0, G1a, G1e. **Blocks:** Gate G.
> **Build principle:** no shortcuts. The harness is real, wired to the LlmClient seam, mock-tested now; the live measurement needs ANTHROPIC_API_KEY.
> **This unit is the GO/NO-GO gate.** Its number decides whether the product is buildable in this form.

## Purpose
Run the golden dataset (G1a) through generation (G0) + repair (G1e) and measure the three things the vision/playbook require:
- **G1b self-consistency (P16):** each case sampled N times; report worst-of-N validity + variance. A model that's 80% once but 40% on the next draw is NOT 80%.
- **G1c LLM-as-judge (P55):** score each accepted surface for fidelity vs the case's `expectedShape`. Validity ≠ fidelity.
- **G1d delta vs raw (the moat justification):** run the same cases with governance OFF (raw LLM) vs ON; measure the safety/coherence gap. No delta = no product.

All three are wired to the `LlmClient` seam → mock-testable now, live when a real client + judge are injected.

## Deliverables
- `engine/harness/runner.ts` (G1b):
  - `runSelfConsistency(cases, env, deps, { samples }) → ConsistencyReport`
  - per case: N samples via `generateWithRepair`, record ok per sample; compute `worstOfN`, `meanRate`, `variance`, `passedWorstOf`.
  - aggregate: parse-rate (worst-of-N), govern-rate, per-category breakdown.
- `engine/harness/judge.ts` (G1c):
  - `Judge` = an `LlmClient`-shaped scorer; `judgeFidelity(caseDef, resolvedSurface, judge) → { score 0..1, reasoning }`.
  - `MockJudge` for tests (deterministic: scores high when the surface references the case's `mustReferenceFields`, low otherwise).
  - `runFidelity(cases, results, judge) → FidelityReport` (median, per-category).
- `engine/harness/baseline.ts` (G1d):
  - `runDelta(cases, env, deps) → DeltaReport` — governed vs ungoverned on the same cases; measures how many ungoverned outputs would have rendered unsafe/undeclared-field/raw-token content that governance blocked.
- `engine/harness/gate.ts`:
  - `evaluateGate(consistency, fidelity, delta, thresholds) → { go: boolean; reasons[] }` — the GO/NO-GO decision (worst-of-N parse ≥80%, govern ≥70%, fidelity median ≥ threshold, positive delta).
- `engine/harness/cli.ts`:
  - a runnable entry: with `ANTHROPIC_API_KEY` → wires the real adapter (a thin shim to be added here) + a real judge; without → prints how to run + a MockLLM dry-run summary.
- Tests (mock, no key): runner aggregates worst-of-N correctly; judge scores fidelity; delta detects governed-vs-raw gap; gate decides go/no-go from synthetic reports.

## Done-criteria (build, not the live number)
- `tsc --strict` clean (source); all harness tests pass with mocks.
- `cli.ts` runs a mock dry-run end-to-end without a key and prints a structured report.
- **Live gate result is explicitly deferred to the user providing a key** — the harness is ready; the number is not faked.

## Out of scope
- The actual GO/NO-GO number (needs key — that's the user's run).
- Tuning the few-shot examples to improve the rate (a follow-up once we see the real number).

## Test command
`node_modules/.bin/vitest run docs/specs/dynamic-interfaces/engine/harness/`
Live: `ANTHROPIC_API_KEY=… node docs/specs/dynamic-interfaces/engine/harness/cli.ts`
