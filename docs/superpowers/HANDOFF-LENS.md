# Cognivo Lens — Continuation Handoff

> **Paste this prompt into a fresh Claude Code chat to continue building Cognivo Lens. The previous session reached the context-window limit after shipping `@cognivo/lens-core` (the headless engine).**

---

## Copy-paste prompt for the next chat

```
We're continuing the Cognivo Lens build from a fresh chat (context-window
handoff). Read these files in order before doing anything else:

1. CLAUDE.md  — project conventions (tokens, naming, semantic rules, lit gotchas)
2. CLAUDE.token-guardrails.md — banned tier-1 tokens, transition: all bans
3. CLAUDE.semantic-rules.md — 11 component-CSS rules
4. docs/superpowers/specs/2026-04-28-cognivo-lens-design.md — the v1 spec (architecture, formula, classifier, personas, fix flow, distribution, testing, rollout, Pattern Map)
5. docs/superpowers/plans/2026-04-28-lens-core-implementation.md — Phase 0–1 plan (the engineering pattern we follow)
6. The most recent two commits on main:
     git log --oneline -2
   They are:
     - "feat(lens-core): scaffold package + types + Observer (Phase 0–2)"
     - "feat(lens-core): full engine — ... (Phase 3–14)"

Memory:
   The auto-memory system at ~/.claude/projects/-Users-muriloscigliano-Cursor-cognivo-1/memory/
   has user/feedback/project memories. Read MEMORY.md and load any entries you need.

Hard rules from CLAUDE.md:
- NEVER commit unless I explicitly say "commit". I review work first.
- TDD: failing test → minimal impl → passing test. Tests live in __tests__/ siblings.
- TS strict: exactOptionalPropertyTypes + noUncheckedIndexedAccess are on.
- Each new file ≤ one responsibility. Files that change together live together.
- No emojis in code or docs unless I ask.
- All component CSS uses --cg-* tokens via tier-3 → tier-2 → tier-1 priority.

Status — what's already on disk and committed:
- @cognivo/lens-core ships at packages/lens-core/
  - 8 type files (SceneGraph, Finding, PageIntent, LensScore, Rule, Pack, Persona, Fix)
  - Observer: scan() with shadow piercing, watch() with debounce/backpressure, page-coord rects
  - Helpers: parsePrice, scene-query (CSS-subset selector engine, walks shadow trees), component-manifest, walkAll/collectAllText, clamp01to100/softmax, RuleHelpers factory
  - Classifier: 12 intents + unknown, floors, 4 signal extractors (URL, component, form-shape, text-ngrams), stage-1 override, stage-2 heuristic with softmax + conservative-firing
  - Rule engine: defineRule, definePack, RuleEngine (cost scheduling + intent gating + dedup hash), finding-hash
  - Personas: definePersona with ethics-guardrail enforcement, applyPersonaWeights
  - Scorer: sub-score formula, weighted-composite-with-cap, EWMA, date-pinned formula registry (v2026.04)
  - Verifier: token-validity, schema-validity (WAI-ARIA), manifest-compliance scaffold, FixVerifier orchestrator with static checkId
  - Instrumentation: startSpan/withSpan
  - Fixture DSL: fluent builder + runner
  - Tests: 164 passing, type-check clean, build 27 KB / 7.83 KB gzip (16% of 50 KB ceiling)

Deferred phases that still need doing in `lens-core`:
- Phase 9 — Agent runtime: streaming explain() + suggestFix() that calls @cognivo/core's AiClient. Stub interface exists in src/agent/index.ts (empty barrel). Needs:
    * agent/runtime.ts implementing streaming text + structured fix output
    * Test using cassette pattern (recorded LLM responses) per Spec §11.9
- Phase 10 — Worker hand-off: real Web Worker postMessage protocol. Needs:
    * worker/protocol.ts (message shapes — request/response/error)
    * worker/worker-entry.ts (today: stub) — receives SceneGraph, runs engine, posts findings
    * worker/main-bridge.ts — main-thread side: post + listen + diffed scene-graph protocol + backpressure
    * Test using `new Worker(new URL(...))` or jsdom shim
- Phase 13 — Golden fixture harness: loader for ~200 hand-labeled real-world page snapshots. Needs:
    * fixtures/golden-harness.ts — load .json or .html files from a fixtures dir
    * fixtures/calibration-snapshot.ts — generate + diff calibration snapshots per rule
    * CI gate that fails if classifier accuracy drops or rule score-impact shifts >2 p50 / >5 p95
    * The actual 200 fixtures are content work — out of scope for the engine, separate sub-project

After lens-core is fully complete, the next sub-projects (each its own brainstorm → plan → implement cycle) are:
1. @cognivo/lens-rules (the actual rule packs: core, ethics, conversion, onboarding — ~67 curated rules)
2. @cognivo/lens-personas (the 3 v1 personas: First-Time Mobile, Cognitively-Loaded, Screen-Reader)
3. @cognivo/lens-ui (<cg-lens> web component, overlay, toolbar, agent drawer — Lit 3, Shadow DOM, depends on lens-core + tokens)
4. MCP integration extending @cognivo/mcp-server with lens.scan / lens.explain / lens.suggestFix / lens.applyFix tools
5. @cognivo/lens-vite (dev plugin) and @cognivo/lens-cli (CI binary)

Working principle the previous session established (carry forward):
- Every code/test batch ends with: pnpm --filter @cognivo/lens-core test && type-check && build
- Tests use happy-dom env (vitest config). For real-DOM behavior, fall back to jsdom.
- Cross-environment duck typing in observer/ (works in real DOM, jsdom, happy-dom, Node).
- Data structures are structured-cloneable (postMessage-safe).
- Comments explain WHY, not WHAT. Identifiers do the WHAT.
- Defensive try/catch only at engine boundaries (rule errors mustn't crash); not in inner loops.

Your starting move:
Read CLAUDE.md and the spec sections you'll touch. Confirm test+type-check+build are green
on main (they are as of the last commit). Then ask me which deferred phase or next sub-project
to tackle. Recommend which one based on what unlocks the most downstream value.
```

---

## What's already shipped (TL;DR for the new chat)

**Spec + plan committed:**
- `docs/superpowers/specs/2026-04-28-cognivo-lens-design.md` — full v1 design (~1,250 lines, 13 sections + 3 appendices)
- `docs/superpowers/plans/2026-04-28-lens-core-implementation.md` — Phase 0–1 plan with TDD pattern

**Package shipped at `packages/lens-core/`:**

| Module | Files | Tests | What it does |
|---|---|---|---|
| `types/` | 8 | 24 | Data contracts (SceneGraph, Finding, Rule, Persona, FixManifest, etc.) |
| `observer/` | 4 | 43 | DOM → SceneGraph with shadow piercing + MutationObserver watch |
| `helpers/` | 6 | 26 | Scene-query selector engine, parsePrice, walk, math (clamp01to100, softmax) |
| `classifier/` | 9 | 8 | 12-intent classification with override + heuristic cascade |
| `rules/` | 4 | 10 | defineRule, definePack, RuleEngine with scheduling + dedup |
| `personas/` | 2 | (folded) | definePersona with ethics enforcement, applyPersonaWeights |
| `scorer/` | 4 | 15 | Sub-score formula, composite with floor caps, EWMA, formula registry |
| `verifier/` | 5 | 16 | Fix manifest verification (token, ARIA schema, manifest compliance) |
| `instrumentation/` | 1 | 4 | performance.measure spans |
| `fixtures/` | 2 | 8 | Fluent DSL + runner for rule fixtures |
| `__tests__/integration/` | 2 | 9 | Observer + full-pipeline end-to-end |

**Quality bar:** 164 tests passing · TS strict (`exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`) clean · 27 KB build / 7.83 KB gzip (well under 50 KB ceiling).

**What's still TODO inside `lens-core`:** agent runtime (Phase 9), worker hand-off (Phase 10), golden fixture harness (Phase 13). The empty barrels are in place — `agent/index.ts`, `worker/index.ts`, `fixtures/golden-harness.ts` (TODO).

**What's TODO outside `lens-core`:** rule packs, persona content, UI component, MCP tools, dev plugins. Each is its own sub-project with its own brainstorm → plan → implement cycle.

---

## How the new chat should think about it

The pattern that worked in this session:

1. **One sub-project at a time.** Don't try to ship `lens-core` + `lens-rules` + `lens-ui` in the same plan.
2. **Brainstorm → spec → plan → implement.** Don't skip layers. The spec for Lens itself was committed before any code ran.
3. **Commit at clean milestones.** Phase 0–2 was its own commit; Phase 3–14 was its own commit. Each commit's test suite is green.
4. **Review before committing.** The simplify skill (3 parallel reviewers — reuse, quality, efficiency) caught real issues. Use it.
5. **TDD per task.** Failing test → minimal impl → passing test → commit (only when user asks).
6. **The user pushes pace ("keep going"). Keep momentum, but never skip green tests or type-check.**

---

## File you'll want open in the new chat

- `CLAUDE.md` (project root)
- `docs/superpowers/specs/2026-04-28-cognivo-lens-design.md`
- `packages/lens-core/src/index.ts` (public API barrel — shows what's exported)
- `packages/lens-core/src/types/index.ts` (the type contracts)

Open these and you have the full picture.
