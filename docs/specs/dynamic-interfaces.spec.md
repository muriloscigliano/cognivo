# Dynamic Software Interfaces — Feature Specification

> **Status:** Phase 1 built (glue + harness + playground) — awaiting the live G1 measurement (needs an API key).
> **Owner:** Murilo Scigliano
> **Date:** 2026-06-21
> **Reconciles against:** real exported APIs in `@cognivo/gen-ui`, `@cognivo/gen-ui-lit`, `@cognivo/theme-generator` (verified 2026-06-21, not docs/marketing).

> ### Phase 1 build status (2026-06-21)
> Artifacts (all under `docs/specs/dynamic-interfaces/` + the playground page):
> - `fixtures.mjs` — Scenario-A `INBOX_DATASET`, 10 fixed G1 prompts, 3 DSL few-shot examples (§11.1 mitigation), `evaluateGovernance()`.
> - `g1-harness.mjs` — runnable G1 measurement: NL prompt → `AnthropicClient` → `createParser().parse` → governance, with `--repair` and `--model` flags. **Dry-run verified** (wiring + system-prompt assembly, no key needed).
> - `docs/src/pages/playground/dynamic-interfaces.astro` — visual render + govern + bias-audit page. **Docs build passes** (207 pages, page emits a bundled client module).
> Verified working offline: the 3 DSL examples parse to valid `Stack` trees, 0 validation/0 token violations. `@cognivo/gen-ui` + `@cognivo/gen-ui-lit` added as `docs` workspace deps so the page resolves them.
>
> **Scenario A (one dataset → many surfaces) — BUILT & verified offline:**
> - `surfaces.mjs` — 4 deterministic generators `(DatasetEnvelope) → DSL`: `listSurface`, `taskListSurface`, `calendarSurface`, `summarySurface`. Each enforces the L1/L2 field firewall via `assertField()`.
> - From the single `INBOX_DATASET`: **all 4 surfaces parse → govern PASS → 0 violations**; bias audit fires (`tasks`/`summary` each engage 2 biases); the firewall **throws** when a surface references an undeclared field. This is the headline thesis ("shared data, radically different surfaces"), proven without an LLM.
> - The playground page renders all four side-by-side on load (the "One dataset → many surfaces" section) plus the editable DSL playground below it.
>
> **Scenario B (natural-language theming) — BUILT & verified offline:**
> - `theme.mjs` — `tokenOverrideToCssVars()` flattens a `generateTheme()` `TokenOverride` into `--cg-*` CSS custom properties (dot-path → `--cg-` + path joined by `-`); `applyThemeVars`/`clearThemeVars` re-skin a surface root in place.
> - Verified: 4 descriptions → 4 distinct palettes (ocean cyan / calm green / sunset gold / monochrome), `preferDark` flips to a dark base (`#0d1117`), 48 vars per theme, all valid `--cg-*` names.
> - Playground: a theme input + dark toggle re-skins the rendered surface **without re-rendering the tree** (re-skin, not re-layout). `@cognivo/theme-generator` added as a `docs` workspace dep.
> - Honest caveat (spec §4.3): this is a **deterministic curated palette pick, not LLM-synthesized** — "make it calmer" snaps to the nearest of ~30 palettes.
>
> **Layer 3 (per-user versioning) — BUILT & tested:** `spec-store.mjs` + `spec-store.test.mjs` (all checks pass). Immutable versioned specs, append-only rollback, re-validation on load. Playground has a live "Saved versions" panel (IndexedDB).
>
> **Open:** the actual G1 parse/govern *rate* over the 10 prompts — needs `ANTHROPIC_API_KEY`. This is the make-or-break number (§8) and the ONLY piece not yet measurable offline. Run: `ANTHROPIC_API_KEY=… node docs/specs/dynamic-interfaces/g1-harness.mjs --repair`.

---

## 0. One-sentence purpose

Ship **primitives, not a fixed UI**: each user's coding agent generates their own front-end against a constrained, token-governed component DSL, rendered safely in a per-user sandbox over a shared backend — so the same data renders as a task list for one user and a calendar for another.

---

## 1. The loop (what we are actually proving)

```
user intent ("make my inbox a task list")
   │
   ▼
[1] user's agent  ── emits ──▶  Cognivo component-DSL tree (text)
   │                                   │
   │                                   ▼
   │                            [2] PARSE  createStreamingParser(library.toJSONSchema())
   │                                   │  → ParseResult { root: ElementNode, meta: { tokenViolations, validationErrors } }
   │                                   ▼
   │                            [3] GOVERN  reject tree if tokenViolations / validationErrors
   │                                   │
   │                                   ▼
   │                            [4] RENDER  LitRenderer / <cg-generative-ui> → Web Components (Shadow DOM)
   │                                   │
   │                                   ▼
   │                            [5] AUDIT  suggestBiasesForTree(result, library) → BiasTreeSuggestion[]
   │                                   │
   ▼                                   ▼
[6] PERSIST + VERSION the per-user interface spec  ◀── (LAYER 3 — net-new)
```

Steps **2–5 already exist and work** in the repo. Steps **1 and 6** are the build.

---

## 2. Three-layer architecture & repo mapping

| Layer | Responsibility | User-modifiable? | Status in repo |
|---|---|---|---|
| **L1 — Backend / API** | Data + business logic. The shared source of truth. | **Never** | Out of scope — bring-your-own. Cognivo is the substrate, not the app. |
| **L2 — Component DSL + governance** | The constrained-but-expressive contract the agent writes against. | Via agent | **Exists.** `@cognivo/gen-ui` registry + parser + token governance + `@cognivo/gen-ui-lit` renderer. |
| **L3 — Per-user sandbox + versioning** | Safely execute, persist, version each custom interface. | Yes (sandboxed) | **Net-new.** Nothing in repo touches this. The "is it a company" part. |

**Design principle:** the agent may touch **L2 (visual + composition)** only. It may **never** touch L1 (data/middleware). v0 is *visual + layout only*. Data-binding contract is read-only against a fixed dataset shape.

---

## 3. The data contract (the part that must be locked before any code)

The whole idea hinges on: **shared data underneath, radically different surfaces on top.** That only works if the surface is decoupled from the data via a stable contract.

### 3.1 Dataset shape (L1 → L2 boundary)

The agent-generated interface renders over a dataset the agent does **not** define. v0 contract:

```ts
// Provided by the host app (L1). The agent's interface is a pure function of this.
interface DatasetEnvelope<T = Record<string, unknown>> {
  schemaId: string;        // e.g. "inbox.message.v1" — agent keys its layout off this
  items: T[];              // the rows/records
  fields: FieldDef[];      // declared, typed fields the surface may reference
  meta?: Record<string, unknown>;
}

interface FieldDef {
  key: string;             // "subject", "from", "dueDate"
  type: 'text' | 'date' | 'number' | 'bool' | 'enum' | 'url';
  label: string;
  enumValues?: string[];
}
```

**Rule:** an interface spec may reference a field **only if it exists in `fields[]`**. This is what keeps the agent from inventing data access — it can rearrange and re-skin `fields`, never fetch new ones. This rule is the L1/L2 firewall.

### 3.2 Interface spec (the per-user artifact, L2 → L3)

What the agent produces and what we version per user:

```ts
interface InterfaceSpec {
  specId: string;
  userId: string;
  schemaId: string;          // must match the DatasetEnvelope it renders
  version: number;           // monotonic; L3 owns this
  intent: string;            // the NL prompt that produced it ("make it a task list")
  tree: string;              // Cognivo component-DSL source (parser input)
  themeOverride?: TokenOverride;  // from theme-generator (curated palette → tier-2)
  createdAt: string;
  parentVersion?: number;    // lineage for rollback
}
```

> Note: `tree` is stored as **DSL source text**, not parsed JSON, because the parser is streaming and the source is the canonical, diffable, re-validatable form.

---

## 4. Real API surface (verified — copy-paste accurate)

### 4.1 Generate + parse (`@cognivo/gen-ui`)
```ts
import { cognivoLibrary, createStreamingParser, suggestBiasesForTree, formatBiasReport } from '@cognivo/gen-ui';
import { GenerativeUiClient } from '@cognivo/gen-ui'; // bridge over any LLM client

const parser = createStreamingParser(cognivoLibrary.toJSONSchema());
const result = parser.push(chunk);           // → ParseResult
// result.meta.tokenViolations / result.meta.validationErrors  ← governance gate
```

### 4.2 Render (`@cognivo/gen-ui-lit`)
```ts
import { LitRenderer } from '@cognivo/gen-ui-lit';
const renderer = new LitRenderer(cognivoLibrary);
renderer.render(result, container);          // imperative
// OR declarative:
// <cg-generative-ui .response=${text} .library=${cognivoLibrary} .isStreaming=${true}></cg-generative-ui>
```

### 4.3 Theme (`@cognivo/theme-generator`)
```ts
import { generateTheme } from '@cognivo/theme-generator';
const override: TokenOverride = generateTheme('calm task-focused dark');
// ⚠ DETERMINISTIC keyword → curated palette. NOT an LLM. ~30 palettes.
// "looks like a task list" picks NEAREST palette; it does not synthesize a novel theme.
```

### 4.4 Audit (`@cognivo/gen-ui`)
```ts
const suggestions = suggestBiasesForTree(result, cognivoLibrary); // BiasTreeSuggestion[]
console.log(formatBiasReport(suggestions));
```

---

## 5. Use-case scenarios (the "how it works" proof set)

These are the acceptance scenarios. v0 ships **one vertical** (Scenario A); B–E prove generality on paper and become the test matrix.

### Scenario A — Inbox, three surfaces over one dataset (THE v0 VERTICAL)
- **Shared L1 data:** `schemaId: "inbox.message.v1"`, fields: `subject, from, receivedAt(date), unread(bool), dueDate(date), priority(enum)`.
- **User 1 (power user):** "make my inbox a **task list**" → agent emits a `Stack` of rows grouped by `priority`, each a checkbox + subject + dueDate badge.
- **User 2 (student):** "show it as a **calendar** by dueDate" → agent emits a calendar surface keyed on `dueDate`.
- **User 3 (default):** no prompt → canonical list surface.
- **Proves:** same `DatasetEnvelope`, three `InterfaceSpec`s, zero backend change. **This is the headline demo.**

### Scenario B — Theming via natural language
- "make it calmer / more focused / dark" → `generateTheme()` returns a `TokenOverride`, applied as CSS vars on the sandbox root.
- **Proves:** re-skin without re-layout. **Caveat:** curated palette, not synthesized — set expectations.

### Scenario C — Governance rejection (the safety story)
- Agent emits a tree referencing a field not in `fields[]`, or a banned token / raw hex.
- Parser surfaces `validationErrors` / `tokenViolations` → tree **rejected before render**, agent gets the error to retry.
- **Proves:** the L1/L2 firewall and token governance actually block bad output. **Most important scenario for "is it safe."**

### Scenario D — Bias audit on a generated surface
- A generated "pricing" surface stacks scarcity + anchoring components → `suggestBiasesForTree` flags it with severity.
- **Proves:** the cognitive-design differentiator (no competitor has this on generated UI).

### Scenario E — Versioning & rollback (L3)
- User iterates 5 times; v3 is best. They roll back. Each version is a stored `InterfaceSpec` with `parentVersion`.
- **Proves:** L3 persistence/versioning — the company-shaped piece.

---

## 6. The sandbox (L3) — boundary definition

The genuinely hard, net-new part. Define the boundary *before* building.

| Concern | v0 decision | Rationale |
|---|---|---|
| **Execution model** | Render parsed `ElementNode` tree only — **no arbitrary JS eval.** The DSL is data, not code. | Eliminates the worst class of sandbox-escape risk for free. |
| **Isolation** | Shadow DOM per surface (already provided by Lit components). v0 = same-origin Shadow DOM; v1 = consider iframe if L1 calls are added. | DSL-only + Shadow DOM is a strong v0 boundary. |
| **What the agent may touch** | **Visual + composition + theme only.** No data fetching, no event handlers with side effects beyond L1-declared intents. | Keeps the firewall enforceable. |
| **Persistence** | `InterfaceSpec` rows keyed by `(userId, specId, version)`. Storage layer is host's choice. | Out of repo scope; define shape only. |
| **Versioning** | Monotonic `version` + `parentVersion` lineage. Immutable specs. | Cheap, gives rollback for free. |
| **Re-validation on load** | Stored DSL is **re-parsed + re-governed every load**, never trusted blindly. | Token rules / library can change; a once-valid spec may not be valid later. |

**Hard boundary:** if a scenario needs the agent to write data-fetching or middleware, it is **out of v0 scope** and triggers the "feature vs company" re-evaluation.

---

## 7. State matrix (the generative surface as a stateful thing)

| State | Required? | Behavior |
|---|---|---|
| Empty (no spec yet) | Required | Render canonical default surface for the `schemaId`. |
| Generating / streaming | Required | `<cg-generative-ui isStreaming>` shows `ai-thinking` placeholder; partial nodes shimmer. |
| Rendered (valid) | Required | Full surface, bias report available in side panel. |
| Rejected (governance fail) | Required | Do NOT render. Surface `validationErrors`/`tokenViolations` to the agent for retry. |
| Render error (valid parse, bad component) | Required | Fallback to last-good version; log. |
| Rolled back | Required | Load `parentVersion` spec, re-validate, render. |
| Data-empty (`items: []`) | Required | Surface's own empty state (component-level). |

---

## 8. The make-or-break risk (must measure before committing to L3)

**The DSL is a custom Cognivo expression language, NOT JSON.** Off-the-shelf LLMs have never seen it. The single biggest unknown:

> **Can a frontier LLM reliably emit parseable, governance-passing trees from a natural-language prompt + the library's system prompt?**

This is **gate G1** (§10). We measure **parse-success rate** and **governance-pass rate** over a fixed prompt set *before* building the sandbox. If models can't emit clean trees, the whole loop fails and no amount of L3 saves it.

Mitigations if rate is low: few-shot examples in `library.prompt()`, constrained decoding, a repair pass that feeds `validationErrors` back to the model, or a thin JSON-front DSL.

---

## 9. Out of scope (v0)

- L1 backend / data persistence of the actual domain data.
- Agent writing data-fetching, middleware, or side-effectful handlers.
- LLM-synthesized themes (we use curated `theme-generator` palettes).
- React/Vue rendering (gen-ui-lit is Lit/Web-Components; adapters exist separately if needed).
- Multi-tenant auth / sandbox-escape hardening beyond DSL-only + Shadow DOM.
- Real-time collaborative editing of a spec.

---

## 10. Build plan with go/no-go gates

> **Strict rule:** do not start a phase until the prior gate passes. Each gate is a measured number, not a vibe.

### Phase 0 — Spec sign-off (this doc)
- **Gate G0:** owner confirms data contract (§3), sandbox boundary (§6), and v0 vertical (Scenario A). **← we are here.**

### Phase 1 — Wire the existing loop (glue only, ~1 day)
- Build one playground page: prompt → `GenerativeUiClient.stream()` → `<cg-generative-ui>` → bias panel.
- Hardcode Scenario A dataset.
- **Gate G1 (make-or-break):** over a 10-prompt fixed set, measure **parse-success rate** and **governance-pass rate**.
  - ✅ ≥ 80% parseable AND ≥ 70% governance-pass → proceed.
  - ⚠ 40–80% → invest in prompt/few-shot/repair, re-measure.
  - ❌ < 40% → **STOP.** The DSL-emission risk killed it. Reconsider DSL format before any L3 work.

### Phase 2 — Three surfaces over one dataset (Scenario A complete)
- Prove list / task-list / calendar over identical `DatasetEnvelope`.
- Wire `generateTheme()` for Scenario B.
- **Gate G2:** all three surfaces render from NL prompts; the "same data, different surface" demo *feels magic* (owner judgment + a 3-user informal test).

### Phase 3 — L3 sandbox + versioning (the company part)
- Implement `InterfaceSpec` persistence, versioning, rollback, re-validation-on-load.
- **Gate G3:** Scenario E works end-to-end; stored specs re-validate on load.

### Phase 4 — Decide: feature or company
- With G1–G3 data in hand, make the strategic call. Not before.

---

## 11. Open questions (status after repo verification 2026-06-21)

1. **LLM provider for v0?** Repo has `adapter-anthropic` (v0.3.0) and `adapter-openai`. ✅ **RESOLVED (recommend):** Anthropic. Both `AnthropicClient` and `OpenAiClient` extend `BaseAiClient`, which already satisfies the `GenUiAiClient` interface — **pass either directly to `GenerativeUiClient`, no shim.** *Awaiting owner confirm of Anthropic vs OpenAI.*
2. **Where does the playground live?** *Recommend* `docs/src/pages/playground/` — existing Astro hot-reload, zero new infra. *Awaiting confirm.*
3. **Does `cognivoLibrary` contain the Scenario-A components?** ✅ **RESOLVED — YES, all exist, no new components needed:**
   - List/rows: `Stack` (`cg-stack`, children + direction/gap/align/justify), `List` (`cg-list`, `items[]`)
   - Calendar: `Calendar` (`cg-calendar`, `mode`, `value`, `min`/`max`)
   - Task-row: `Checkbox` (`cg-checkbox`, `label`/`checked`/`indeterminate`)
   - Status: `Badge` (`cg-badge`, `label`/`variant`/`size`)
   - Library registers **176 components** total (`cognivo-library.ts:2229`).
4. **Repair loop in v0?** *Recommend IN — and now higher priority (see G1 risk below).* Cheap, de-risks G1.
5. **Storage for `InterfaceSpec` in Phase 3** — *Recommend* IndexedDB for demo.

### 11.1 ⚠ NEW finding that raises G1 risk — `library.prompt()` ships NO examples by default
Verified in `packages/gen-ui/src/prompt/generator.ts:368-377`: the generated system prompt includes **syntax rules + component signatures** but **only emits worked DSL examples if you pass `options.examples`**. An LLM must otherwise learn the custom language cold.

**Mitigation (do this in Phase 1, not optional):** pass `library.prompt({ examples: [...] })` with 3–5 tested DSL strings. We already have known-good ones from the test suite, e.g.:
```
root = Stack([header, kpis], "column", "lg")
header = TextContent("Product Analytics", "large")
kpis = Stack([kpi1, kpi2, kpi3], "row")
kpi1 = MetricCard("Revenue", "$1.2M", "+12%")
```
The DSL grammar (confirmed from `parser.test.ts`): `name = Component(posArg1, posArg2, ...)`; arrays `[...]`; objects `{key: value}`; double-quoted strings; forward references / hoisting allowed; no operators/logic.

---

## 12. Why this fits THIS repo (the unfair advantage)

- **L2 is done.** Governed, composable, token-disciplined primitives with state matrices and bias metadata already exist — the part most teams spend a year on.
- **Governance is the contract.** `tokenViolations`/`validationErrors` *are* the "constrained-but-expressive" firewall, already enforced.
- **The bias audit is unique.** `suggestBiasesForTree` on generated UI is a differentiator no competitor (OpenUI/Thesys) has.
- **DSL-only execution** sidesteps the scariest sandbox risks for free.
- The only true net-new work is **L3** — and we don't build it until **G1 proves the magic is real.**
```
