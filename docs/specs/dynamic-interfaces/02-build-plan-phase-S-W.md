# 02 — Build Plan: Product Feel + Interop (Phases S, W, X)

> **Reads with:** [`01-architecture.md`](01-architecture.md). The future-proof core (A1–A6) is built. This plan covers everything else that's buildable WITHOUT an API key, plus wiring the real adapter up to the edge of the live gate.
> **Principle:** no shortcuts; each unit shipped with tests; one source of truth.
> **Parked (needs key):** the live G1 GO/NO-GO measurement. We build the real adapter so it runs the instant a key exists — but we do not fake the number.

## The gap this plan closes
The core is correct but the surfaces still read as "bare component stacks," not a shipped app (the review's "blind-realness" failure). And nothing animates, persists, or explains itself to the user yet. This plan delivers the *product feel* on top of the proven engine.

## Units (run in order; each tested, each committed)

### Phase S — surfaces that look like a real app
- **S1 — Rich surface components.** A small set of composite components that read as shipped UI: a message row with sender + time + unread dot + priority, a board column with a header + count, a day-group header. Built from real `cg-*` primitives (or as thin new components if a primitive is missing). Govern-clean.
- **S2 — Richer dataset + richer templates.** Extend the inbox dataset (sender, time, labels, attachment) and the mock templates to bind them, so surfaces have real density. The golden dataset already references these fields.
- **S3 — Semantic-fit guardrail.** "Calendar over data with ~0 dated items looks empty → suggest a list instead." A fit check in the generate path that surfaces a metacognitive note instead of silently rendering a poor-fit surface (playbook P50 / vision §5.3).

### Phase W — the workspace (the product, not a diagnostic)
- **W1 — Morph animation on reconcile.** FLIP-style transition so moved/added/removed nodes animate instead of snapping. The reconciler already preserves identity (A3); this animates the position deltas. Honors the "transforms in place" magic-moment requirement.
- **W2 — First-class undo + version history.** Persist each generated template per user (reuse the L3 store concept, now over `InterfaceTemplate`); one-click undo; "back to previous shape" restores via the same reconcile (no hard cut). The corpus = the moat.
- **W3 — Legibility layer.** One-line "what changed" summary after each generate; human refusal messages (already partly done); an optional dev-details view (off by default). Enforce the "only surface + prompt + one note in the user's view" allowlist.
- **W4 — Workspace shell.** Assemble S+W into one full-bleed workspace page that replaces the diagnostic playground as the product demo. No plumbing in the user's view.

### Phase X — interop + the real adapter (up to the gate)
- **X1 — Real Anthropic adapter (behind the TemplateLlmClient seam).** Wrap `@cognivo/adapter-anthropic` so it emits templates via constrained/tool-call output. Reads the key from env. Ships a dry-run that proves wiring without calling the API. **The live run is the user's `ANTHROPIC_API_KEY` call — parked, not faked.**
- **X2 — MCP Apps export adapter.** Convert a governed template → an MCP Apps (`ui://`, SEP-1865) resource so generated UIs embed in Claude/ChatGPT. Avoids the silo (research §4). Tested on shape, not on a live host.

## Done = the skeptic-proof demo (vision §9)
One full-bleed workspace: type three intents, watch ONE interface morph in place into three real-looking apps — each governed, each undoable, each explained — no plumbing visible. Plus: the real adapter is one key away from the live GO/NO-GO number, and templates export to MCP Apps.

## Order
S1 → S2 → S3 → W1 → W2 → W3 → W4 → X1 → X2. Then the only thing left is the user's key for the live gate.
