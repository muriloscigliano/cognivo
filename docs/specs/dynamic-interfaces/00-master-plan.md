# 00 — Master Plan: Dynamic Software Interfaces

> **Reads against:** [`00-vision.md`](00-vision.md) (v0.2). Build principle: **no shortcuts — solid + future-proof over easy + fast.**
> **What this is:** the full decomposition into units. Each unit gets its own self-contained plan file in `plans/NN-*.md`, written so an agent executes it cold. We run them **one at a time**, finishing and verifying each before starting the next, so context never mixes.
> **What this is NOT:** code. No implementation until you sign off on this plan.

---

## Principles that govern the whole build

1. **Foundations before features.** The §8 hollow foundations (fake firewall, warnings-not-blocks) are rebuilt *first*, as real units. Nothing sits on a hollow base.
2. **G1 gate before product polish.** We prove the LLM→DSL core works (and beats a raw call) before building the polished workspace. If G1 fails, we learn it cheap.
3. **Every unit is independently shippable + tested.** Each has a contract, a done-criterion, and its own test. No unit is "done" without a passing test.
4. **Contracts are written down before code.** Shared types (`DatasetEnvelope`, `InterfaceSpec`, the field-binding node) are frozen in a contract file so units don't drift.
5. **Run sequentially, clean context.** One unit per agent run; verify against its plan; then the next. Parallel only where units are genuinely independent (marked ‖).

---

## The unit tree

Grouped into 4 phases. Phase gates are hard — we don't cross a gate until its units pass.

### Phase F — Foundations (rebuild the hollow base, properly)
*These fix the verified §8 gaps. They are the "no shortcuts" core. Nothing else is trustworthy until these land.*

| Unit | Title | Why it exists | Depends on |
|---|---|---|---|
| **F0** | **Contracts & types** | Freeze `DatasetEnvelope`, `FieldDef`, `InterfaceSpec`, and the new **typed field-binding node** as one source-of-truth contract file. Everything references it. | — |
| **F1** | **Real field-binding + resolver** | Replace "field is an opaque string" with a typed `{ field: 'subject' }` binding node the resolver validates against `fields[]`. This makes the firewall *real on the LLM path*. (Vision §8.1) | F0 |
| **F2** | **Governance as a hard engine gate** | Move governance from demo glue into the engine: violations (token, unknown component, undeclared field, a11y) **block render** and return a structured rejection. (Vision §8.2) | F0, F1 |
| **F3** | **Prompt-injection defense layer** | Delimit untrusted dataset content; instruct the model it's display-data-not-instructions; classify. (P51, Vision §8.3) | F0 |

**Gate F:** firewall rejects undeclared-field LLM output (not just scripted); governance blocks (not warns); injection string in data can't alter the surface. All tested.

---

### Phase G — The G1 gate (prove the core, measure the delta)
*Prove the LLM can emit faithful, governed DSL — and that our governance beats a raw call. Build the eval harness the right way (no n=10 vibe check).*

| Unit | Title | Why it exists | Depends on |
|---|---|---|---|
| **G0** | **Schema-constrained generation** | Emit DSL via tool-call / constrained output, not free text. (P49) Default, not fallback. | F1, F2 |
| **G1a** | **Golden dataset** | ≥50 labeled `(prompt → expected shape / govern outcome)` pairs, committed, CI-runnable. (P54) | F2 |
| **G1b** | **Self-consistency runner** | Each prompt sampled N=5; report worst-of-5 + variance, not mean. (P16) | G0, G1a |
| **G1c** | **LLM-as-judge (fidelity)** | Score each surface for intent-match / data-fit / legibility — the §5.1 fidelity metric. (P55) | G1a |
| **G1d** | **Raw-LLM baseline + delta** | Run the same prompts with no governance; measure the safety/coherence delta. This is the moat justification. | G0, G1a |
| **G1e** | **Bounded self-refine** | Repair loop with max-iteration cap + convergence detection. (P12) | G0, F2 |

**Gate G (GO/NO-GO):** worst-of-5 parse ≥80%, govern ≥70%, judge-fidelity median ≥ threshold, positive delta over raw baseline. **If this fails, STOP and rethink the DSL/approach before any product build.** (Needs the API key.)

---

### Phase S — Surfaces that look like a real app (kill the wireframe problem)
*Make generated surfaces pass the blind "is this a shipped app?" check. The Phase-1 surfaces were primitive stacks; these are real.*

| Unit | Title | Why it exists | Depends on |
|---|---|---|---|
| **S0** | **Realistic inbox dataset + chrome contract** | Real-feeling data (avatars, real timestamps, sender identity) and the "app chrome" components a surface needs to not look like a wireframe. | F0 |
| **S1** | **Production-grade surface components** ‖ | The components (rich row, board column, day-group, etc.) that make a surface read as shipped. Use/extend the cg-* library properly. | S0 |
| **S2** | **Semantic-fit guardrail** ‖ | "Calendar over undated data looks empty → suggest list instead." (P50, Vision §5.3) | F2, S0 |
| **S3** | **Blind-realness eval** | The §5.1 test: blind raters judge "shipped app vs wireframe." Gate for the surface set. | S1 |

**Gate S:** the surface set passes blind-realness ≥ threshold; semantic-fit guardrail fires on poor-fit transforms.

---

### Phase W — The workspace (the product Maya actually uses)
*One coherent, full-bleed workspace. Plumbing hidden. In-place morph. This is where it stops being a diagnostic.*

| Unit | Title | Why it exists | Depends on |
|---|---|---|---|
| **W0** | **In-place morph engine** | FLIP/shared-element transitions; the surface root is never cleared between states; shared data elements animate old→new. Version-restore uses the same morph. (Vision §4, §8.6) | S1 |
| **W1** | **Ambient prompt + contextual starters** | No blank box: data-derived suggestions; an ambient/summoned prompt affordance (not a labeled REPL). (Anti-pattern #10, Vision §4) | S0 |
| **W2** | **First-class recover** | Persistent one-click undo on the version lineage; first-time-shape "proceed?" intent preview. (Vision §5.4) | W0, existing L3 store |
| **W3** | **Legibility surface** | One-line "what changed" summary; human-readable refusal messages; optional dev-details view (off by default). | W0 |
| **W4** | **The workspace shell** | Assembles W0–W3 into the single full-bleed workspace. Enforces the positive allowlist (only surface + prompt affordance + one transient note in Maya's view). | W0, W1, W2, W3 |

**Gate W (v1 done):** the §9 skeptic-proof demo — one workspace, three intents, morphs in place, looks real, undoable, explained. No plumbing in Maya's view.

---

## Run order (sequential; ‖ = may run alongside the prior)

```
F0 → F1 → F2 → F3
   → G0 → G1a → G1b → G1c → G1d → G1e   ── GATE G (GO/NO-GO, needs API key)
   → S0 → (S1 ‖ S2) → S3                ── GATE S
   → W0 → W1 → W2 → W3 → W4             ── GATE W (v1 done)
```

We execute **one unit per agent run**, verify against its `plans/NN-*.md`, commit, then start the next. I report back at each **phase gate** for your sign-off.

---

## What I need from you to start

1. **Sign off on this decomposition** (or tell me what to re-cut).
2. **The API key** is needed at **Gate G** (G1b/G1c/G1d run live). Everything in Phase F and units G0/G1a can be built + unit-tested *without* it. So we can build a long way before the key is required — tell me whether the key will be available by then, or I'll build a mock-LLM seam so Phase F→G0→G1a aren't blocked.
3. Nothing else. Once you sign off, I write the per-unit plan files (`plans/F0`, `plans/F1`, …) and we start with **F0 — Contracts & types.**
