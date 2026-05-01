# Lens Agent Runtime — Implementation Plan

> **Spec:** [`2026-04-29-lens-agent-runtime-design.md`](../specs/2026-04-29-lens-agent-runtime-design.md). Q1 answered (a) — cassette loader inside lens-core.
> **Outcome:** **one commit** (`feat(lens-core): agent runtime — explain stream + suggestFix structured (C6)`).

---

## Phase 0 — Pre-flight

1. Baseline: tokens 48 / lens-core 221 / lens-pack-core 113 / lens-pack-ethics 44 / lens-ui 61 = 487 tests.
2. Clean working tree.
3. Read `packages/core/src/client/types.ts` and the OpenAI / Anthropic adapter shapes to confirm streaming fits the design.

---

## Phase A — `LensAgent` types + interface

`packages/lens-core/src/agent/types.ts`:
- `LensAgent` interface (explain + suggestFix)
- `FixManifest` + `FixChange` discriminated union
- `Cassette` + `CassetteResponse` types
- `NoAgentConfiguredError` class
- `AgentOptions { aiClient?: AiClient; instrumentationName?: string }`

`packages/lens-core/src/agent/index.ts`:
- Export everything above
- Export `createAgent(options?)` factory
- Re-export from public lens-core barrel

Tests: type-only — minimal smoke that types compile + factory returns the expected shape.

**Done when:** `import { createAgent } from '@cognivo/lens-core'` works; calling without options returns a NoOpAgent.

---

## Phase B — `AiClientAgent`

`packages/lens-core/src/agent/ai-client-agent.ts`:

```ts
export class AiClientAgent implements LensAgent {
  constructor(private readonly client: AiClient) {}

  async *explain(finding: Finding): AsyncIterable<string> { … }
  async suggestFix(finding: Finding): Promise<FixManifest | null> { … }
}
```

- Wraps `client.runIntent(AiIntent.EXPLAIN, ...)` for explain. If `client.streamIntent` exists, use it and yield each chunk. Else single-shot then chunk by sentence.
- `suggestFix` returns `null` immediately when `finding.fixCategory === 'judgment'`. Otherwise calls `runIntent(AiIntent.OPTIMIZE, ...)`, parses the result's metadata into a FixManifest.
- Each call wrapped in `withSpan('lens:agent:explain')` / `'lens:agent:suggest-fix'`.

`packages/lens-core/src/agent/prompts.ts`:
- `buildExplainPrompt(finding)` — system prompt instructing the LLM to explain in plain language
- `buildSuggestFixPrompt(finding)` — system prompt with strict JSON schema for FixManifest

`packages/lens-core/src/agent/parse-fix-manifest.ts`:
- `parseFixManifest(rawJson, finding)` — validates + returns FixManifest; throws on malformed

Tests: ~12
- Pure-function tests for `buildExplainPrompt` (snapshot the structure)
- Pure-function tests for `parseFixManifest` (valid + 5 invalid shapes)
- Stub AiClient (vitest mock) + verify runIntent called with right args
- Stub streamIntent + verify chunks yielded

**Done when:** AiClientAgent works against a mock AiClient.

---

## Phase C — `CassetteAgent` + cassette loader

`packages/lens-core/src/agent/cassette-agent.ts`:
- Constructor takes a `Cassette` object
- `explain(finding)` looks up `cassette.responses[explain:${finding.id}]`. If kind=text, yields each chunk with a microtask delay (simulate streaming). If kind=error, throws.
- `suggestFix(finding)` looks up `cassette.responses[suggestFix:${finding.id}]`. If kind=fix, returns the manifest. If kind=error, throws.

`packages/lens-core/src/agent/cassette-loader.ts`:
- `loadCassette(path)` — reads + JSON.parses + validates schema version

`packages/lens-core/__fixtures__/cassettes/`:
- `img-without-alt.json` — explain text + suggestFix manifest for the img-without-alt example
- `judgment-finding.json` — explain text only, suggestFix returns null
- `streaming-explain.json` — multi-chunk explain to test streaming

Tests: ~10
- CassetteAgent.explain yields all chunks in order
- CassetteAgent.suggestFix returns the manifest verbatim
- Missing-cassette key throws clear error
- Schema version mismatch throws

**Done when:** CassetteAgent replays real cassettes.

---

## Phase D — Integration tests using cassettes

`packages/lens-core/src/__tests__/agent/`:
- `agent.test.ts` — full pipeline: build cassette, instantiate agent, walk through findings, verify outputs
- 6+ scenarios across the 3 cassette fixtures

**Done when:** integration tests green; cassette fixtures committed.

---

## Phase E — Wire into lens-core public API

- `packages/lens-core/src/index.ts` — add `export * from './agent/index.js';`
- `packages/lens-core/vite.config.ts` — add `agent/index` as a build entry. The agent ships at `@cognivo/lens-core/agent` subpath:
  ```json
  "exports": {
    ".": "...",
    "./agent": { "types": "./dist/agent/index.d.ts", "import": "./dist/agent/index.js" }
  }
  ```
- Document in lens-core's README

**Done when:** `import { createAgent } from '@cognivo/lens-core/agent'` works from lens-pack-core / lens-ui / docs.

---

## Phase F — Sweep + roadmap update

1. `pnpm --filter @cognivo/tokens --filter @cognivo/lens-core --filter @cognivo/lens-pack-core --filter @cognivo/lens-pack-ethics --filter @cognivo/lens-ui --filter @cognivo/docs test type-check build`. All green.
2. Update `2026-04-29-lens-v1-roadmap.md`: mark C6 complete.
3. Mini playbook check: Pattern 9 (ReAct — single-turn here, deferred multi-turn), Pattern 49 (Structured Outputs — FixManifest), Pattern 50 (Guardrails — note that cassettes are deterministic, real-LLM guardrails come from @cognivo/core), Pattern 53 (Observability — withSpan).

---

## Working principles

- **Cassettes are first-class.** Cassette format is part of the public API of lens-core's agent. Versioned. Mismatched versions fail loud.
- **NoOpAgent is the default.** `createAgent()` without an AiClient returns the NoOpAgent. Calling its methods throws `NoAgentConfiguredError` — never silently returns empty. Privacy by default.
- **No live LLM in CI.** `pnpm test` never makes network calls. `pnpm test:llm:record` (post-v0.1) opts in.
- **No custom prompts in v0.1.** The internal templates ship as constants. Customization is a v0.2 concern when actual users ask for it.
- **Fail loud on parse errors.** A malformed FixManifest from the LLM throws; we never silently produce a half-valid one.

---

## Estimated effort

| Phase | Time |
|---|---|
| Phase A — types + factory | 1 hour |
| Phase B — AiClientAgent | 4 hours |
| Phase C — CassetteAgent + cassettes | 3 hours |
| Phase D — integration tests | 1 hour |
| Phase E — wiring | 30 min |
| Phase F — sweep + roadmap | 30 min |
| **Total** | **~10 hours / 1.5 days** |

Test target: 30+ across all phases (12 prompt/parse + 10 cassette + 6 integration + 2 type-smoke = ~30).
