# G1e — Bounded self-refine (repair loop)

> **Phase:** G. **Depends on:** G0, F2. **Blocks:** G1b/c/d (they run with repair on).
> **Build principle:** no shortcuts. A real bounded loop with a hard cap AND convergence detection — never an unbounded "keep trying" (playbook: Infinite Loop of Doom).

## Purpose
When a generation fails governance (F2), feed the structured rejections back to the model and ask for a corrected tree (playbook P12 Self-Refine + P13 CRITIC, where the "critic tool" is our own `govern()`). This recovers many near-misses without a human. It MUST be bounded.

## Guarantees (the no-shortcuts part)
1. **Hard cap:** at most `maxIterations` client calls (default small, e.g. 3). Never unbounded.
2. **Convergence detection:** stop early if a retry does not reduce the rejection count (no progress → bail; don't burn iterations).
3. **Monotonic-or-bail:** keep the best (fewest-rejection) result seen; never return a worse tree than an earlier attempt.
4. **Deterministic + observable:** returns the full attempt history (each attempt's rejection codes) so G1b can report repair success-rate and iterations-to-converge.

## Deliverables
- `engine/repair.ts`:
  - `generateWithRepair(intent, env, deps, opts?): RepairResult`
    - wraps `generate()` (G0); on `!ok`, re-calls the client with a repair message that includes the prior rejections, up to the cap, with convergence detection.
    - `RepairResult = { final: GenerateResult; attempts: AttemptRecord[]; converged: boolean; iterations: number }`
    - `AttemptRecord = { iteration; ok; rejectionCodes: string[] }`
  - `buildRepairUser(intent, priorRejections): string` — the fed-back message (the CRITIC signal).
  - `RepairOptions = { maxIterations?: number }` (default 3).
- Extend `MockLLM` (in llm.ts) with a **repair-aware** mode: an optional `repairAfter` so a scripted failure is fixed on the Nth retry — lets us test convergence + cap + best-result-kept without a key.
- `engine/repair.test.ts`:
  - first attempt passes → 1 iteration, converged, no extra calls;
  - fails then fixed on retry → converged true, iterations recorded, final ok;
  - never converges → stops at cap, converged false, returns best attempt (not worse);
  - no-progress (same rejections each time) → bails early via convergence detection (fewer than cap calls);
  - attempt history reflects the rejection codes per iteration.

## Done-criteria
- `tsc --strict` clean (source).
- All repair tests pass with MockLLM (no key).
- The loop provably cannot exceed `maxIterations` and bails on non-progress.

## Out of scope
- The live model (G1b wires the real adapter); the judge (G1c). G1e is the loop mechanics, mock-tested.

## Test command
`node_modules/.bin/vitest run docs/specs/dynamic-interfaces/engine/repair.test.ts`
