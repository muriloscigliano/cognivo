# Lens-pack-core v0.1.0 — AI Playbook Check

> **Purpose.** Cross-check the engine + first rule pack against the AI Playbook patterns, anti-patterns, and design principles cited in [`docs/superpowers/specs/2026-04-28-cognivo-lens-design.md`](../specs/2026-04-28-cognivo-lens-design.md). Audit trail before commit.
>
> **Scope.** Only items relevant to the engine + rule pack layer. UX-tier patterns (P1–P7) and most §13 anti-patterns belong to the UI sub-project (Phase 4) and are deferred.
>
> **Result.** 1 real gap surfaced — Pattern 53 (Observability Spans) — fixed during the audit.

---

## 1. Pattern Map (engine-relevant subset)

From spec Appendix A, the patterns that apply to what we shipped:

| # | Pattern | Where it should land | Where it actually lands | Status |
|---|---|---|---|---|
| 4 | Processor Pipeline | Spec §3 — engine: scan → classify → evaluate → score | `lens-core/src/index.ts` exports each stage; `RuleEngine.evaluate()` is the rules stage | ✓ honored — pipeline composable, each stage independent |
| 17 | Tool Registry + Validation | Spec §4 — `definePack` registers rules; runtime validation | `define-rule.ts` validates id/fixtures/intentScope/applies/detect at registration; `define-pack.ts` validates id/version/rules/intents | ✓ honored — engine throws on malformed rule at import time |
| 21 | ACI Tool Design | Spec §4 — each rule like a tool: clear name, schema, side-effect-free | Every rule manifest has `id`, `title`, `category`, `severity`, `cost`, `intentScope`, `citations`, `defaultEnabled`, `fixCategory`, `applies`, `detect`, `fixtures` | ✓ honored — manifest is the public contract |
| 36 | Workflow Patterns (Chain + Route + Parallelize) | Spec §3 — engine chains stages, routes by cost class | `RuleEngine.planRules()` filters + sorts by cost; cheap before medium before llm; routes via `costAllowlist` | ✓ honored — chain (scan→eval→score) + route (cost class) implemented; parallelize deferred to Phase 10 (worker hand-off) |
| 46 | Cost Routing | Spec §4.1, §7 — `cost: cheap \| medium \| llm` controls scheduling | `Rule.cost` typed union; `RuleEngineConfig.costAllowlist` gates which costs run; pack-core v0.1 is all `cheap` | ✓ honored — pack-core v0.1 carries no LLM cost; engine respects allowlist |
| 49 | Structured Outputs | Spec §3, §4, §6 — Findings, FixHints, Score are typed structured artifacts | `Finding`, `FixHint` (5-arm discriminated union), `LensScore` are TS interfaces; engine stamps fields | ✓ honored — no string-blob outputs anywhere on the rules path |
| 53 | Observability Spans | Spec §3, §7.8 — `performance.measure('lens:rules:evaluate', …)` etc. | `instrumentation/spans.ts` exports `startSpan`, `withSpan`, `withSpanAsync` — but `RuleEngine.evaluate()` does NOT wrap itself in a span | ✗ **GAP** — see §4 below |
| 54 | Golden Dataset Testing | Spec §11.3 — fixtures required for every rule | `defineRule()` throws at import time if `fixtures.length === 0`; pack-core ships ~75 fixtures across 14 rules | ✓ honored — type-level + runtime enforcement |
| 66 | Streaming Tool Orchestration | Spec §3.5 — findings stream from engine as produced | Current engine returns `Finding[]` synchronously (cheap rules complete in one pass); streaming reserved for the agent runtime (Phase 6) | ✓ honored at this layer — synchronous return is correct for a pure-cheap-rule pack; streaming earns its keep when LLM rules land |
| 74 | Skills System | Spec §4 — packs are like skills, lazy + composable | `definePack` accepts lazy `() => import('…')` rules; vite `preserveModules: true` ships each rule as its own chunk; consumer disables a rule = its code is tree-shaken | ✓ honored — verified against built artifacts (17 chunks in `dist/`) |

**Patterns explicitly out of scope for this audit:**
- 9 (ReAct), 13 (CRITIC), 20 (Suspend/Resume), 50 (Guardrails), 60 (MCP), 64 (Multi-Layer Permissions), 70 (Denial Tracking) — apply to fix-flow + agent runtime + MCP, none of which are in pack-core v0.1.
- 33 (Adaptive RAG) — applies to classifier, not rule pack.
- 47 (Semantic Caching) — applies to LLM rules' input, not in pack-core v0.1.
- 71 (Cost Gating) — engine has cost allowlist; runtime cost cap is a Phase 6/7 concern.

---

## 2. Anti-pattern Check (spec §13)

Most are agent-design anti-patterns. Items applicable to the engine + rule pack layer:

| # | Anti-pattern | Applies? | Status |
|---|---|---|---|
| 1 | Multi-agent before single-agent works | engine: yes | ✓ honored — no agent at all in pack-core; runtime is deferred to Phase 6 |
| 4 | Skipping permissions because internal | partial | ✓ honored — engine has `costAllowlist` + `ruleOverrides`; users can disable any rule before publish |
| 5 | Loading the full playbook into context | yes | ✓ honored — rules cite patterns by ID, never embed prose |
| 10 | False Certainty | yes | ✓ honored — every Finding carries `confidence: 0–100`; rules emit calibrated values (80–100) |
| 11 | Stealth Updates | partial | ✓ honored — semver on packs; `lens.config.ts` pins versions; no auto-update in pack-core |
| 12 | No Exit | N/A | UI concern (Phase 4) |

UX anti-patterns 9 (Blank Prompt Trap), 12 (No Exit) are deferred to lens-ui — they have no engine surface to violate.

---

## 3. Design Principle Check (spec Appendix B)

Engine-relevant subset. The rest fire when the UI lands.

| # | Principle | Engine surface | Status |
|---|---|---|---|
| 4 | Confidence Signal | `Finding.confidence` field | ✓ honored — required at type level |
| 10 | Communicate Limitations | rule `why` field; pack README documents deferred rules | ✓ honored — README §"Deferred to later versions" lists all 5 token-rule + 3 a11y-edge-case cuts with reasons |
| 13 | Accountability Visible | `Finding.ruleId`, `citations[]`, `detectedAt` | ✓ honored — every finding traceable to a specific rule + WCAG/WAI-ARIA citation + ISO timestamp |

Principles 2, 3, 9, 11, 17 — UI concerns. Audit them at Phase 4.

---

## 4. Gap found: Pattern 53 (Observability Spans)

**Symptom.** Spec §7.8 explicitly requires:
```
performance.measure('lens:rules:evaluate', ...)
```

`packages/lens-core/src/instrumentation/spans.ts` exposes `withSpan(name, fn)` exactly for this. `RuleEngine.evaluate()` does not call it. Result: when a slow rule shows up, devtools' User Timing track is silent — operator has no signal to diagnose.

**Fix.** Wrap `RuleEngine.evaluate()` in `withSpan('rules:evaluate', …)` and each per-rule `detect()` call in `withSpan('rules:rule:<id>', …)`. The per-rule span lets operators answer "which rule got slow on this page?" without re-instrumenting.

**Cost.** Spans are no-ops when `performance` is unavailable. Hot-path overhead is a `performance.now()` pair per rule — single-digit microseconds. Negligible vs. detect() cost.

**Status.** **Fixed during audit.** See diff in `packages/lens-core/src/rules/engine.ts` and new test in `packages/lens-core/src/__tests__/rules/engine.test.ts`.

---

## 5. Result

**Pre-audit:** 9 patterns honored, 1 gap (Pattern 53).
**Post-audit:** 10/10 engine-relevant patterns honored. 0 gaps remain. All 4 anti-patterns and 3 principles relevant to the engine layer pass.

**What this audit explicitly did NOT check:**
- UX patterns P1–P7 (lens-ui, Phase 4)
- Anti-patterns about agent design (no agent in pack-core v0.1)
- Pattern 9 ReAct, Pattern 50 Guardrails, Pattern 60 MCP (Phases 6–8)
- Patterns about persona modulation (Phase 4 + future personas package)

**Re-audit triggers.** Re-run this checklist when:
- Adding LLM-cost rules (re-check Pattern 46, Pattern 71, anti-pattern #3 "Optimizing cost before proving value")
- Shipping the agent runtime (re-check Patterns 9, 13, 17, 50, 60, 70)
- Shipping lens-ui (run the UX-pattern check separately)
