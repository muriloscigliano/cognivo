# G0 — Schema-constrained generation + LLM seam

> **Phase:** G. **Depends on:** F1, F2, F3. **Blocks:** G1b, G1c, G1d, G1e.
> **Build principle:** no shortcuts. A narrow client seam both a deterministic mock and the real Anthropic adapter satisfy; generation is schema-constrained (P49), not free-text-and-hope.

## Purpose
Turn Maya's NL intent + a dataset into a **governed** UI tree, via an LLM that emits **structured** output (a typed DSL tree, P49). G0 builds:
1. the **client seam** so the whole pipeline is testable with a deterministic mock (no key) and swaps to the real model unchanged,
2. **prompt assembly** that composes F3 injection defense + system rules + few-shot examples,
3. the **generate()** orchestrator: assemble → call client → parse to `UiNode` → govern (F2) → return a structured result, with a place for the bounded repair loop (G1e) to hook in.

## The seam (future-proof)
- `LlmClient` interface: `generate(req: LlmRequest): Promise<LlmResponse>` where the response carries the structured tree (or raw content the parser turns into `UiNode`).
- `MockLLM implements LlmClient`: deterministic, rule-based — maps known intents to known-good trees, and supports scripted failure modes (unknown component, undeclared field, injection-followed) so tests can exercise governance + repair without a key.
- (Real adapter is a later thin shim in G1b that wraps `@cognivo/adapter-anthropic` to the same interface — NOT built here, but the seam is shaped for it.)

## Deliverables
- `engine/llm.ts`: `LlmClient`, `LlmRequest`, `LlmResponse` types; `MockLLM` with a small intent→tree map + scripted-failure hooks.
- `engine/prompt.ts`: `assemblePrompt(intent, env, opts)` → `{ system, user }`, composing:
  - the DSL grammar/system rules,
  - `DATA_INSTRUCTION_CLAUSE` + `wrapDataset(env)` from F3,
  - few-shot examples (passed in; a tuned asset later),
  - the declared `fields[]` (so the model knows what it may bind to).
- `engine/generate.ts`: `generate(intent, env, deps)` → `GenerateResult { tree, govern, prompt, flags }` where `govern` is F2's `GovernResult`. Pure orchestration; client + governance deps injected.
- Tests for each (MockLLM-driven):
  - happy path: known intent → governed tree, ok:true;
  - mock emits unknown component → govern ok:false (gate catches it);
  - mock emits undeclared field → govern ok:false (firewall catches it);
  - prompt assembly includes the injection clause + delimited data + fields + examples;
  - injection flag from F3 surfaces in the result.

## Done-criteria
- `tsc --strict` clean (source).
- All G0 tests pass with MockLLM (no key).
- `generate()` returns a governed result; a bad generation is caught by F2, not rendered.

## Out of scope
- The real Anthropic adapter (G1b shim), the eval harness (G1a/b/c/d), the repair loop body (G1e — G0 leaves the hook).

## Test command
`node_modules/.bin/vitest run docs/specs/dynamic-interfaces/engine/generate.test.ts docs/specs/dynamic-interfaces/engine/prompt.test.ts docs/specs/dynamic-interfaces/engine/llm.test.ts`
