# Lens Agent Runtime — Design

> **Sub-project:** roadmap C6 — `lens-core` Phase 9 (originally deferred). Streaming `explain()` and structured `suggestFix()` against a finding, via dependency-injected `@cognivo/core` `AiClient`.
> **Status:** spec; v0.1 hereafter just called "the agent" or "agent runtime."
> **Parent:** [`2026-04-29-lens-v1-roadmap.md`](../plans/2026-04-29-lens-v1-roadmap.md).

---

## 1. What v0.1 must deliver

A `LensAgent` interface + reference implementation that:

1. **`explain(finding) → AsyncIterable<string>`** — streams a human-readable explanation of a finding, token by token, using the configured AiClient.
2. **`suggestFix(finding) → Promise<FixManifest>`** — returns a structured fix proposal for `codeable` findings.
3. **Privacy-respecting** — no network calls until a consumer explicitly hands the runtime an AiClient. Tier 0 (local-only) is the default.
4. **Cassette-tested** — every test path replays a recorded LLM response. Re-recording requires `pnpm test:llm:record`. CI never makes live calls.

That's the bar. Three things, one commit.

---

## 2. Scope cuts (v0.1)

| Cut | Why deferred | Lands in |
|---|---|---|
| Cassette recorder (capture real LLM responses to disk) | Cassette files in v0.1 are hand-authored. A recorder is a separate dev tool. | post-v1 |
| `<cg-lens>` agent drawer ("Explain this", "Suggest fix" buttons) | Own sub-project — adds UI surface, focus management, stream-rendering | follow-up after C6 |
| Multi-turn conversation (`agent.chat(finding, ...messages)`) | Spec §13.8 anti-pattern: "no memory before working tools." Single-shot only. | v0.2 |
| Streaming `suggestFix` (partial fix manifests as tokens arrive) | Adds JSON parsing complexity. Not user-visible since fix preview is gated on the full structure. | v0.2 |
| Multi-finding batched explain | One finding per call only. The UI parallelizes if needed. | post-v1 |
| Custom prompt overrides per consumer | Internal prompts are baked in. Custom prompts post-v1. | v0.2 |

---

## 3. Architecture

### 3.1 Module layout

```
packages/lens-core/src/agent/
├── index.ts                ← barrel: types + factory
├── types.ts                ← LensAgent + FixManifest + cassette format
├── ai-client-agent.ts      ← reference impl using @cognivo/core's AiClient
├── cassette-agent.ts       ← replay-only test impl
├── prompts.ts              ← system prompt + finding context formatter
└── parse-fix-manifest.ts   ← parses LLM output → typed FixManifest
```

### 3.2 Public API

```ts
import { createAgent, type LensAgent, type FixManifest } from '@cognivo/lens-core';

// Tier 0 (default): no network. The factory returns an agent whose calls
// throw `NoAgentConfiguredError` until you provide an AiClient.
const agent: LensAgent = createAgent();

// Tier 2/3: opt in by providing an AiClient.
import { createOpenAiClient } from '@cognivo/adapter-openai';
const aiClient = createOpenAiClient({ apiKey: ... });
const agent: LensAgent = createAgent({ aiClient });

// Streaming explain
for await (const chunk of agent.explain(finding)) {
  process.stdout.write(chunk);
}

// Structured fix
const fix: FixManifest = await agent.suggestFix(finding);
```

### 3.3 Type contracts

```ts
export interface LensAgent {
  /**
   * Stream a human-readable explanation of the finding. Yields tokens /
   * sentence fragments as they arrive from the LLM. Resolves when the LLM
   * stream ends.
   */
  explain(finding: Finding): AsyncIterable<string>;

  /**
   * Produce a structured fix manifest for the finding. Returns null when
   * the finding's `fixCategory` is `judgment` (no deterministic fix).
   */
  suggestFix(finding: Finding): Promise<FixManifest | null>;
}

export interface FixManifest {
  /** The finding this fix addresses. */
  findingId: string;
  /** Discriminated by the kind of change. */
  change: FixChange;
  /** One-line summary suitable for the UI's confirmation step. */
  summary: string;
  /** LLM rationale — stored for audit-trail display. */
  rationale: string;
  /** Confidence the LLM assigned to this fix (0–100). */
  confidence: number;
  /** When this manifest was produced. */
  generatedAt: string;
}

export type FixChange =
  | { kind: 'set-attribute'; selector: string; attribute: string; value: string }
  | { kind: 'replace-text'; selector: string; from: string; to: string }
  | { kind: 'set-style'; selector: string; declarations: Record<string, string> }
  | { kind: 'replace-token'; selector: string; property: string; from: string; to: string };
```

`FixManifest` is the structured output the LLM is constrained to produce. Parsing happens in `parse-fix-manifest.ts` — strict validation throws on malformed shapes.

### 3.4 AiClient integration

The `AiClientAgent` adapts the lens domain to `@cognivo/core`'s `AiClient` interface:

- For `explain`: calls `aiClient.runIntent(AiIntent.EXPLAIN, context, { ... })` with a synthetic `AiContext` whose `dataset` is `[finding]`. Streams via `streamIntent` when the adapter supports it; falls back to chunked yield from a single `runIntent` result otherwise.
- For `suggestFix`: calls `runIntent(AiIntent.OPTIMIZE, ...)` with the finding, then parses the result's `metadata` field for the FixManifest JSON. Falls back to extracting from `explanation` if metadata isn't structured.

We don't extend the `AiIntent` enum. Findings ride existing intents — the `systemPrompt` option carries lens-specific instructions.

**Why not extend the intent enum:** Spec §4.5 keeps `@cognivo/core` adapter-agnostic. New intents force every adapter (OpenAI, Anthropic) to update. Lens stays a pure consumer of the existing surface.

### 3.5 Cassette format

A cassette is a JSON file recording one or more LLM interactions:

```ts
export interface Cassette {
  /** The finding ids this cassette covers. */
  findings: string[];
  /** Map: { [callKey]: replay }. callKey = `${method}:${findingId}`. */
  responses: Record<string, CassetteResponse>;
  /** Human note for future-you. */
  recordedAt?: string;
  notes?: string;
}

export type CassetteResponse =
  | { kind: 'text'; chunks: string[] }       // for explain — yields each chunk
  | { kind: 'fix'; manifest: FixManifest }   // for suggestFix
  | { kind: 'error'; message: string };       // simulate LLM error
```

Cassettes live in `packages/lens-core/__fixtures__/cassettes/`. Tests load cassettes by name. Authoring is currently manual (write JSON by hand); a recorder ships in v0.2.

### 3.6 Privacy gate

The default `createAgent()` returns a **NoOpAgent** that throws `NoAgentConfiguredError` on every call. Consumers must explicitly pass an `AiClient` to get a working agent. This makes Tier 0 (no network) the default per spec §10.4 — opt-in is intentional.

When called with an AiClient, the agent emits an instrumentation event (`startSpan('lens:agent:explain')` + `'lens:agent:suggest-fix'`) for self-observability per Pattern 53.

---

## 4. Detection of which intent to use

| Finding | explain | suggestFix |
|---|---|---|
| `core/a11y/img-without-alt` (codeable) | streams text | returns FixChange of kind `set-attribute` |
| `core/a11y/heading-skipped-level` (structural) | streams text | returns null (judgment-shaped) |
| `core/tokens/tier1-palette-color` (codeable) | streams text | returns FixChange of kind `replace-token` |
| `ethics/dark-pattern/scarcity-claim` (judgment) | streams text | returns null |
| All others | streams text | depends on `fixCategory` |

`suggestFix` returns null when `finding.fixCategory === 'judgment'`. The LLM isn't asked — there's no deterministic answer.

---

## 5. Quality bar

- **Unit tests** for prompt formatting, fix-manifest parsing, error paths — pure functions, no AiClient.
- **Cassette tests** for `explain` streaming and `suggestFix` parsing — replay-only, deterministic.
- **Type-check strict** — `exactOptionalPropertyTypes` + `noUncheckedIndexedAccess`.
- **Bundle size** — `dist/agent/index.js` ≤ 8 KB / ≤ 3 KB gzip. The agent doesn't bundle `@cognivo/core` (peer dep).
- **Test target** — 30+ tests across unit + cassette layers.

---

## 6. Risks + mitigations

| Risk | Mitigation |
|---|---|
| AiClient adapters return non-streaming results | Detect `streamIntent` presence at construction time; fall back to chunking the `runIntent` result. |
| LLM produces malformed FixManifest JSON | Strict parser throws with the offending output included for debugging. |
| Cassettes go stale when `Finding` shape changes | Cassette schema version-pinned; mismatched versions throw "re-record cassette" error. |
| Agent runs in CI accidentally | NoOpAgent default + cassette tests. CI never receives an AiClient. |
| Custom prompts leak PII | v0.1 has no custom prompts. The internal prompt template never includes user data — only the structured Finding fields. |

---

## 7. Open question

### Q1. Where does the cassette format live?

**(a)** Inside `lens-core`. Cassettes ship in `__fixtures__/cassettes/`, the loader is `lens-core/src/agent/cassette-loader.ts`. Other packages that need LLM-tests import the loader.

**(b)** New package `@cognivo/lens-cassette`. Independent versioning. Adds a workspace package for ~200 LOC.

**My recommendation: (a).** v0.1 cassettes are scoped to lens-core's own tests. If lens-pack-ethics or lens-pack-conversion need cassettes for LLM-cost rules, they'd import the loader from lens-core. Extracting to a new package is premature.

---

## 8. If approved

Phases A–F per the implementation plan. Estimated 1.5 days. One commit at the end.

Cuts called out in §2 are non-negotiable for v0.1 — adding any of them makes the commit too big to review in one pass.
