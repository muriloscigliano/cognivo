# 00 — Vision: Dynamic Software Interfaces

> **Status:** v0.2 — revised after a 4-lens adversarial review + an ai-playbook cross-check. The five "must change" findings and the playbook's eval/safety patterns are folded in. This is now safe to build a master plan on.
> **Decision lineage:** Q1 = Product (YC "Dynamic Software Interfaces" thesis). Q2 = a knowledge worker ("Maya") who reshapes software by describing it. Q3 = the magic moment is REAL (words → interface). **Moat = the per-user interface-version corpus** (decided; §2). G1 is the first gate and measures the *delta our governance adds over a raw LLM call* (§6).
> **This file answers ONE question:** *what are we building, for whom, and how do we know it's right?* Not how — that's the master plan.
>
> **Build principle (owner-set, non-negotiable):** no shortcuts. Choose the solid, future-proof, correct construction over the easier/faster one, even when it takes longer. The hollow foundations in §8 get rebuilt *properly* as real units — not patched. Demo glue is not carried forward. Every unit ships with its own test.

---

## 1. The thesis

Software ships one interface for everyone. The next generation ships **shared primitives** and lets each user **reshape their own interface with prompts** — while the app stays **coherent**, **production-safe**, and **legible**.

We build the **workspace** where that happens. Wedge = **interface transformation**.

**Honesty about the three properties:** coherent + safe + legible are the **quality bar**, not the moat. They are hard for a hacker, cheap for a funded incumbent. They are necessary but not defensible. The moat is §2.

**One sentence:** *A workspace where a knowledge worker reshapes their UI by describing it — the result is always coherent, safe, and explainable, and every reshape makes her workspace more hers.*

---

## 2. The moat (what compounds regardless of model quality)

**The per-user interface-version corpus.**

Every interface Maya shapes, keeps, reverts, and refines is stored as an immutable, versioned `InterfaceSpec` with lineage. This corpus compounds in two ways no incumbent and no model vendor gets for free:

1. **It's why she comes back.** Her workspace is *hers* — accumulated, personal, and increasingly tuned to how she works. Switching cost grows with every reshape.
2. **It's proprietary training signal.** Thousands of `(intent → accepted/rejected/edited transform)` pairs are a dataset for making generation better *for our component contract specifically* — a flywheel a raw-LLM competitor cannot replicate without our usage history.

The frontier LLM is a **commodity input**, not the moat. If it's weak, our governance + few-shot + repair layer salvages it; if it's strong, our corpus + governed contract is still what makes *our* output safe, on-brand, and personal. **G1 must therefore measure the delta our system adds over a raw LLM call** — no measurable delta = no product (§6).

---

## 3. The user (one human, named)

**Maya** — a PM/analyst/ops lead drowning in tools that almost fit. She thinks in tasks; her email thinks in threads. She is **not** a developer and will **never** open a 40-toggle settings panel. She can say *"show this as a board grouped by owner"* and expects it to happen, look right, and persist.

**Priorities:** (1) it fits her head, (2) it never loses her data or breaks, (3) she can see what changed and undo it, (4) it's instant.

**Maya is NOT:** a developer, a designer, or a power-user who wants raw config. Require any of those → wrong product.

---

## 4. The magic moment

> Maya is looking at her inbox. The system already shows her **2–3 ambient suggestions** drawn from her actual data ("Group by sender", "Show this week as a checklist") — she never faces a blank box. She picks one or types *"I only care about what's due this week — show it as a checklist by day."* The inbox **morphs in place** — rows reflow and regroup with motion, the same messages visibly moving to their new positions; it is **not** cleared and repainted. The result **looks like a shipped feature of a real app** (sender, time, density, hover), not a wireframe. A single transient note: *"Reshaped to a checklist · undo."* She says *"back to a list"* and it **flows back** the same way.

**Binding rules this moment imposes (these are testable, see §5):**
- **Continuity:** the surface root is never `innerHTML=''`-cleared between states; shared data elements animate from old position to new (FLIP/shared-element morph). Version-restore is a *separate* mechanism and must use the same morph, never a hard cut.
- **No blank box:** an input affordance always offers data-derived starters (playbook anti-pattern #10).
- **Looks real:** the rendered surface passes a *blind* "is this a shipped app?" check (§5.1).

**Anti-magic (the Phase-1 failure, banned):** a DSL textarea, a governance/audit panel, version internals, or a side-by-side grid of variant surfaces in Maya's view. The demo is **one** workspace reshaped sequentially A→B→C in place — never a grid.

---

## 5. Success criteria — fidelity FIRST, plumbing as guardrail

The prior demo passed every plumbing check and still felt like a debug tool. So the **primary** gate is fidelity; correctness is demoted to a guardrail that must hold but is not the headline.

### 5.1 PRIMARY — Fidelity (does it feel like the real app Maya meant?)
- **Blind realness:** a viewer shown *only* the rendered surface (no prompt box, no labels, no audit) reads it as *"a feature of a shipped product."* *Test: ≥ [threshold]% of blind raters say "shipped app," not "wireframe/demo," across the surface set.*
- **Intent fidelity:** a non-developer who issued the prompt rates the result *"this is what I meant."* *Test: ≥ [threshold]% "yes" over N realistic prompts (this is the G1 judge metric, §6).*
- **Continuity:** transform is a visible in-place morph, not a repaint. *Test: surface root is not cleared between states; first-visible-change within a time budget; shared elements animate.*

### 5.2 GUARDRAIL — Coherent (must hold; not the headline)
- Transformed surface uses only governed components + tier-2 tokens. *Test: 0 token violations on every accepted transform — and violations BLOCK render (today they're warnings; that's a bug to fix, §8).* 
- Accessibility is a **generation constraint**, not a feature: every accepted surface is keyboard-navigable with required ARIA. *Test: a11y check is part of governance, not a later pass.*

### 5.3 GUARDRAIL — Production-safe
- DSL is **data, not code** — no eval in the render chain. *Test: no eval path exists.*
- **Field firewall is REAL, not a prompt sentence** (§8 — this is currently unbuilt). A transform that binds a field not in `fields[]` is rejected by the resolver. *Test: LLM output referencing an undeclared field is rejected before render — verified on the LLM path, not just the scripted path.*
- **Input is untrusted:** dataset content (subjects, senders) is delimited and the model is told it is display-data, not instructions (playbook P51). *Test: an item whose content contains an injection string does not alter the generated surface.*
- **Semantic-fit guardrail:** a transform that is valid but a poor fit for the data is not rendered silently. *Test: "calendar over data with ~0 dated items" triggers a metacognitive prompt ("this will look empty — list instead?"), not a confident empty calendar (playbook P50/Principle 2).*

### 5.4 GUARDRAIL — Legible & recoverable
- Every accepted transform yields a one-line plain-language summary of what changed.
- **Recover is first-class** (playbook: "if you build one step, build Recover"): persistent, one-click undo backed by the version lineage; a first-time-for-a-new-shape "proceed?" intent preview.
- A refused transform explains *why* in human terms, not error codes.

---

## 6. The critical gate — G1, redesigned as a real eval harness

The product assumes a frontier LLM can turn Maya's words into a **valid, governed, faithful** DSL tree, and that **our governance adds measurable value over a raw call.** G1 measures exactly that. The prior G1 (10 prompts, one draw, validity-only) is a vibe check; this replaces it (playbook P54+P16+P55+P12).

| Layer | Pattern | Measures | Gate |
|---|---|---|---|
| **Golden dataset** | P54 | validity (parse + govern) | ≥ 50 labeled prompts, in CI, **per-prompt** regression tracking |
| **Self-consistency** | P16 | reliability | each prompt sampled N=5; gate on **worst-of-5**, not mean |
| **LLM-as-judge** | P55 | **fidelity** (intent-match, data-fit, legibility) | median judge score ≥ threshold — this is the §5.1 intent metric |
| **Delta vs. raw LLM** | — | **moat justification** | governed pipeline must beat a raw-LLM-no-governance baseline on safety + coherence by a measurable margin |
| **Bounded self-refine** | P12 | recoverability | repair converges within ≤ K iterations (cap enforced) |

**Generation method:** emit the DSL via **schema-constrained / tool-call output (playbook P49)**, not free text — this is the default, not a fallback. Few-shot DSL examples (playbook P6) are a tuned, versioned asset measured against the golden set.

**Go/no-go:** proceed only if worst-of-5 parse ≥ 80%, govern ≥ 70%, judge-fidelity median ≥ threshold, **and** a positive delta over the raw-LLM baseline. Mean-of-one is banned.

---

## 7. Scope boundaries (v1)

**In:** one vertical — a **personal inbox/task workspace** over a fixed dataset shape; prompt → in-place transform → coherent/safe/legible/faithful surface, persisted per user; an open-ended set of shapes *within* the governed component set; contextual starters; first-class undo.

**Out (so no one builds them):** real email/data backend (fixed dataset for v1); the agent touching data-fetch/middleware (visual+layout+composition only); multi-user/real-time co-editing; LLM-*synthesized* themes (curated palettes, stated honestly); a general builder for arbitrary apps (one vertical, excellently, first); auth/billing/multi-tenant hardening (prototype isolation in v1).

**Named open question (not a v1 blocker):** is inbox the most convincing wedge, or is there a vertical where the static UI is *painfully* wrong for half of users? Decide by that criterion later; a fixed known schema is what makes v1's safety claims demonstrable, so we keep inbox for v1.

---

## 8. Known gaps in the CURRENT code that the plan must fix (verified, not theoretical)

The review verified these against source — they are load-bearing and currently hollow:

1. **Field firewall is fake on the real path.** `assertField()` runs only in the hand-written `surfaces.mjs`; on the LLM path it's only a prompt sentence and `evaluateGovernance()` never inspects field bindings (the parser has no field-binding concept). **Fix: a typed field-binding node the resolver validates against `fields[]`.** Until then, §5.3's firewall claim is aspirational.
2. **Governance violations are warnings, not blocks.** `validateTokenUsage` returns violations but the demo's 30 lines of glue decide whether to render. **Fix: governance is a hard gate in the engine.**
3. **No prompt-injection defense** (P51) — input side is wide open.
4. **No semantic-fit / metacognition** (P50) — coherent-but-useless renders silently.
5. **No real eval harness** (P54/P16/P55) — G1 is n=10, one draw.
6. **Transform is a hard repaint**, not a morph — kills the magic moment as a "refresh."

---

## 9. What "done" looks like for v1 (the skeptic-proof demo)

One full-bleed inbox workspace where a non-developer types three different intents and watches their **single** interface **morph in place** into three genuinely different, real-looking apps — each coherent, safe, undoable, and explained in one line, with all plumbing hidden behind an optional dev view. It should make someone say *"wait — it just did that?"*, and a blind viewer should mistake each state for a shipped product. No textareas. No audit panels in Maya's face. No grid of variants.
