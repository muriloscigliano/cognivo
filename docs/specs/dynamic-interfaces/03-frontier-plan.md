# 03 — Frontier Plan: from the safe wedge to Ankit's full vision

> **Why this exists.** A fit-check against Ankit Gupta's canonical YC essay found we built the *safe half*: strong fit on shared-primitives + multi-surface, but we (1) constrained the agent to a fixed DSL rather than "coding agent," (2) **banned middleware modification** — the frontier the essay calls "more interesting," and (3) never engaged the **software-delivery / agent-access** question. This plan bridges the gap honestly: keep the proven v1 engine, then climb toward the frontier in governed steps.
> **Stance:** we are the *safe on-ramp* to Dynamic Software Interfaces, with an explicit trajectory to the radical version — not the conservative thing pretending to be the radical thing.
> **Reads with:** 00-vision, 01-architecture, 02-build-plan-phase-S-W.

## The three frontier axes (what the essay demands, what we'll build)

| Axis | Essay | Today | Frontier target |
|---|---|---|---|
| **Agent capability** | user's *coding agent* = their own FDE | LLM fills a fixed component DSL | agent *proposes new governed components/compositions* under review |
| **Modification depth** | front-end **and middleware** | visual+layout only; data firewalled | agent composes a **vendor-declared safe data layer** (filter/sort/derive/join/group) |
| **Delivery / access** | how does the agent *reach into shipped software*? | we own the runtime (one workspace) | a **runtime + capability manifest** other vendors adopt so their app becomes agent-reshapeable |

## Governing principle (unchanged): govern the new power, don't ungovern

The whole reason our v1 is safe is the *constrain-then-compose* pattern: the agent picks from a vendor-declared, validated set, and a hard gate blocks anything outside it. We extend that **same pattern down a layer** to data/middleware — we do NOT switch to "let the agent write arbitrary code." That's how we reach the frontier without inheriting the chaos the essay's open questions imply.

---

## Phase M — Governed middleware (the "more interesting" frontier)

The agent gains *data power*, but only over a vendor-declared, validated operation set — the same governance philosophy as components, one layer down.

- **M0 — Data-operation contract.** Define `DataOp` (filter, sort, group, derive, aggregate, limit) as typed, declarable operations over `DatasetEnvelope.fields`. A vendor declares which ops are allowed per field. The agent composes a `DataPipeline` from them. Firewall: an op may only reference declared fields/ops.
- **M1 — Pipeline resolver + governance.** Execute a `DataPipeline` deterministically over live data (pure, no code-eval); govern it (unknown op, undeclared field, unsafe aggregate) before it runs. Fail-closed.
- **M2 — Bind templates to pipeline output.** A template can bind to a *derived collection* (e.g. "items grouped by priority", "overdue items") produced by a pipeline — so "show overdue tasks as a board" works without the agent touching raw data access.
- **M3 — Generation emits pipeline + template together.** The model emits `{ pipeline, template }`; both governed; the resolver runs pipeline → binds template → renders. This is where "modify middleware on the fly" becomes real *and safe*.
- **M4 — Wire into the page + tests.** Visible: "show only overdue, grouped by owner, as a board" — a middleware+visual transform, governed end to end.

## Phase D — Delivery / access (the essay's core open question)

Answer "how does a user's coding agent reach into shipped software?" with a concrete, adoptable surface.

- **D0 — Capability manifest.** A vendor publishes a `ReshapeManifest`: which components, tokens, fields, and data-ops are exposed to user agents, and the limits. This is the contract between "shipped software" and "the user's coding agent" — our answer to *source-code-vs-binary*: neither — you ship a **manifest + runtime**, not source.
- **D1 — Reshape runtime as an embeddable.** Package the engine (resolve + govern + reconcile) so a third-party app drops it in and becomes agent-reshapeable against its own manifest. We are the *runtime other vendors adopt*, not just one workspace.
- **D2 — MCP Apps boundary (promote from parked).** Export governed templates as MCP Apps (`ui://`, SEP-1865) so a user's agent in Claude/ChatGPT can drive reshaping of a manifest-exposed app. The standards-grade access path.

## Phase R — Agent toward FDE (mechanism grows past "DSL filler")

- **R0 — Component proposal under review.** When the registry can't express an intent, the agent proposes a *new composition* (a named, reusable template fragment) — governed, stored in the corpus, offered for reuse. The agent starts *authoring primitives*, not just arranging them.
- **R1 — Corpus-as-flywheel.** Use the per-user corpus (W2) as a personalization + proposal-ranking signal: the agent learns this user's accepted shapes and proposes accordingly. The moat becomes active, not passive.

## Phase E — The live gate (still the make-or-break, still needs the key)

- **E1 — Real Anthropic adapter** behind the template + pipeline seam (constrained/tool-call output). Built up to the edge; the live GO/NO-GO run needs `ANTHROPIC_API_KEY`. Not faked.

---

## Build order & orchestration
M0 → M1 → M2 → M3 → M4 (governed middleware, the headline frontier work) →
D0 → D1 → D2 (delivery/access — the unanswered question) →
R0 → R1 (agent toward FDE) →
E1 (real adapter, up to the key gate).

Each unit: own plan, own tests, committed. Hard design work (the DataOp contract, the manifest) gets a multi-agent design pass before code so we don't pick the wrong shape. Everything stays in the *constrain-then-compose* governance pattern — that's the through-line from the safe wedge to the frontier.

## Honest fit statement
With Phases M + D, we move from "fits the essay's illustration" to "engages the essay's hard questions": middleware modification becomes real (governed), and we take a concrete position on delivery/access (manifest + embeddable runtime + MCP). We remain the *safe* path to it — which is the defensible way to build the radical thing.
