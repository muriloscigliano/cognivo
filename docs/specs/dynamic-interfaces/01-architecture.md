# 01 — Future-Proof Architecture: Dynamic Software Interfaces

> **Status:** v1 — grounded in a 2025-26 state-of-the-art review (sources at bottom). This supersedes the inlined-data model in the prototype engine. Build principle: no shortcuts; solid + future-proof.
> **Reads with:** [`00-vision.md`](00-vision.md), [`00-master-plan.md`](00-master-plan.md).

## Why this rewrite exists

The current engine (F0–G1e + FIX-1/2/3) is correct but has a structural ceiling: it **inlines data into the generated tree** (`TextContent("Q4 budget…")`). The SOTA review confirmed that is the wrong model for a workspace whose interfaces persist and re-render against live data. Two root changes make the architecture future-proof; everything else we already do is validated as correct.

## Verdict from the SOTA review (what to keep / change)

| Decision | Verdict | Evidence |
|---|---|---|
| Constrained component DSL (registry + token governance) | **KEEP** | The deliberate choice of every governance-focused vendor (Thesys C1, tambo, assistant-ui, Vercel AI SDK). Code-gen is reserved for build-time only. |
| Web-component renderer | **KEEP** | RSC `streamUI` is being abandoned by Vercel itself; framework-agnostic (Google A2UI supports Lit, json-render) is the trend. |
| Bounded self-refine repair loop | **KEEP** | Matches the field's answer to hallucinated components. |
| Per-user interface corpus as moat | **KEEP + double down** | Persistence is commodity; **corpus-as-moat + personalization-from-corpus is unclaimed**. Our contrarian bet. |
| **Inlined data** | **CHANGE → data bindings** | Inlining = a snapshot; new data forces LLM regeneration (cost, latency, drift, fabrication). Bindings re-render live data deterministically, for free. |
| **Nested generated tree** | **CHANGE → flat adjacency-list + tolerant parse** | Flat + stable IDs is streaming-resilient (Google A2UI's explicit rationale); nested trees remount badly mid-stream. |

**Net:** two changes, one root cause — *inlined data in a nested snapshot* → **structure + bindings over a flat, stable-ID tree.**

## The future-proof architecture (4 layers)

```
L1  Data store (live)         ── the source of truth; the agent never authors values
        │  bindings resolve against this at render
L2  Interface Template        ── flat adjacency-list of governed components with
        │  {bind:"field"} refs ── STABLE IDs. Generated ONCE per intent. No data baked in.
        │  governed (tokens, a11y, unknown-component, binding-validity) BEFORE store
L3  Render runtime            ── resolves bindings → live values; keyed/idempotent
        │  re-render on data change (NO LLM in the hot path); morph in place
L4  Corpus + personalization  ── every template versioned per user; the corpus is the
                                  moat AND the personalization signal (learn from history)
```

### L2 — the Interface Template (the core change)

A template is **structure, not a snapshot**. Two new contract constructs:

```ts
// A node in the FLAT tree. No nesting — children referenced by id.
interface TemplateNode {
  id: string;                         // STABLE — survives re-render, focus, streaming
  type: string;                       // governed component, e.g. "RichRow"
  props: Record<string, BoundValue>;  // each value is a binding OR a literal
  children?: string[];                // child node IDs (adjacency list), not inline
}

interface InterfaceTemplate {
  schemaId: string;                   // which DatasetEnvelope it binds against
  root: string;                       // root node id
  nodes: Record<string, TemplateNode>; // flat map id -> node
  // repeat: a node may map over a collection binding (list/board rows)
  repeats?: Record<string, { over: FieldBinding; as: string }>;
}
```

- **`BoundValue`** (already in F0) = `FieldBinding{kind:'field',key}` | `LiteralValue`. Now it does real work: the LLM emits `{bind:"subject"}`, never the literal value. **This finally makes the field firewall real by construction** (you cannot bind a field that isn't declared — F1 already enforces this; now it's the *only* way data enters the tree).
- **Flat adjacency-list** with stable IDs → streaming-resilient, keyed re-render, no remount flicker.
- **`repeats`** → "one row per message" without inlining N rows; the runtime expands the repeat against the live collection.

### L3 — the render runtime (no LLM in the hot path)

`render(template, dataStore)`:
1. expand `repeats` against live collections,
2. resolve every `FieldBinding` against the store (fabrication impossible — values come only from data),
3. keyed/idempotent reconcile into real `cg-*` components (stable IDs → focus/inputs survive),
4. on data change → re-resolve + reconcile. **The LLM is never called for a data change** — only for an *intent* change.

### L4 — corpus + personalization (the moat, made first-class)

Every generated `InterfaceTemplate` is versioned per user (we have the L3 store from the prototype). New: the corpus is **fed back as a personalization signal** — preferences learned from the user's *own* accepted/rejected/edited templates. This is the unclaimed bet; it's only defensible if users *reuse* templates (which bindings enable — a template stays useful as data changes).

## Interop & standards (avoid the silo)

- **Keep the internal engine** (flat template + bindings, A2UI/json-render-shaped).
- **Add an MCP Apps export adapter** (later phase): MCP Apps / SEP-1865 is the official, Anthropic+OpenAI+MCP-UI–unified standard (`ui://` resources, sandboxed iframes). Our Lit + Declarative Shadow DOM compiles cleanly to it. This makes our generated UIs embeddable in Claude/ChatGPT instead of trapped in our app.
- Do **not** bet on remote-DOM (not in the official MVP).

## Guardrails to add from day one (from the failure-mode review)

1. **Guided / schema-constrained decoding** so invalid props can't be emitted (often faster, too).
2. **Semantic cache** of generated templates for similar intents (kills latency + cost; bindings already kill regenerate-for-data).
3. **Deterministic fallback** — on generation failure/timeout, render the last-good template or a static default; never a white screen.
4. **a11y as a build-time invariant** in registry components (F2 already checks it at govern time).

## Migration from the current engine (no throwaway)

We do NOT discard F0–G1e. We evolve them:
- `contracts.ts` already has `FieldBinding`/`BoundValue` — **promote them to the only way data enters props.**
- `resolver.ts` already resolves bindings + enforces the firewall — **extend to the flat template + repeats.**
- `governance.ts` already gates — **add binding-validity + flat-tree walks.**
- `render.ts` — **evolve from snapshot render to keyed/idempotent reconcile.**
- The real adapter (FIX-1) — **parse real DSL into a flat template, not a nested snapshot.**

## Decisions log (so we don't relitigate)

- Inlined data → **bindings** (CHANGE). Nested tree → **flat adjacency-list** (CHANGE). Everything else (DSL, web components, repair loop, corpus moat, guardrails) → **KEEP**.

## Sources
SOTA review (2025-26): Vercel AI SDK generative UI + RSC-deprecation; Google A2UI v0.9 (flat adjacency-list, Lit); Microsoft Adaptive Cards templating (data/layout separation); vercel-labs json-render (`$state` bindings); Thesys C1 ("intent as data, not code"); MCP Apps / SEP-1865 (Anthropic+OpenAI+MCP-UI unified standard); GenUI Study (arXiv 2501.13145); NN/g generative UI; Ink & Switch malleable software / Patchwork. Full URL list in the research record.
