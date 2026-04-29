# Cognivo Lens — v1 Roadmap

> **Why this exists.** We have an engine + first rule pack on disk. Spec [`2026-04-28-cognivo-lens-design.md`](../specs/2026-04-28-cognivo-lens-design.md) describes the full v1, but it's written end-state-first. This doc orders the remaining sub-projects, names the dependencies, and sets commit checkpoints — so we don't drift, half-build two things at once, or rebuild what's already proven.
>
> **The pattern.** Each sub-project still gets its own brainstorm → spec → plan → implement cycle when its turn comes. This roadmap is the meta-layer above those.

---

## State as of 2026-04-29 (uncommitted)

| Package | Version | Tests | Build | Status |
|---|---|---|---|---|
| `@cognivo/lens-core` | 0.1.0 | 166 / 166 | 26.22 KB / 7.59 KB gzip | engine: complete; agent runtime + worker hand-off + golden harness deferred |
| `@cognivo/lens-pack-core` | 0.1.0 | 86 / 86 | 17 lazy chunks, largest 1.02 KB gzip | 14 rules; 5 token rules deferred until Observer ships token resolution |

Everything below assumes these are committed first (see Phase 0).

---

## Sub-project dependency graph

```
                            ┌───────────────────────────────────┐
                            │ Phase 0: Commit current work      │
                            └──────────────────┬────────────────┘
                                               │
                            ┌──────────────────▼────────────────┐
                            │ Phase 1: Demo integration (docs)  │
                            │   sanity check, ~1 hour           │
                            └──────────────────┬────────────────┘
                                               │
                            ┌──────────────────▼────────────────┐
                            │ Phase 2: Observer token resolution│
                            │   (lens-core)                     │
                            └──────────────────┬────────────────┘
                                               │
                            ┌──────────────────▼────────────────┐
                            │ Phase 3: Token rules in pack-core │
                            │   v0.2 — fills the deferred 5     │
                            └──────────────────┬────────────────┘
                                               │
                            ┌──────────────────▼────────────────┐
                            │ Phase 4: @cognivo/lens-ui v0.1    │
                            │   <cg-lens> overlay + toolbar     │
                            └─────────┬─────────────┬───────────┘
                                      │             │
        ┌─────────────────────────────▼──┐  ┌───────▼─────────────────────────┐
        │ Phase 5: lens-pack-ethics      │  │ Phase 6: lens-core agent runtime│
        │ v0.1 (cheap rules only)        │  │ (deferred Phase 9 of lens-core) │
        └────────────────────────────────┘  └────────────────┬────────────────┘
                                                             │
                                            ┌────────────────▼────────────────┐
                                            │ Phase 7: LLM rules in ethics    │
                                            │ + @cognivo/lens-pack-conversion │
                                            └────────────────┬────────────────┘
                                                             │
                                            ┌────────────────▼────────────────┐
                                            │ Phase 8: MCP server integration │
                                            │ (lens.scan / explain / suggest) │
                                            └────────────────┬────────────────┘
                                                             │
                                            ┌────────────────▼────────────────┐
                                            │ Phase 9: lens-vite + lens-cli   │
                                            │ (final v1 distribution shapes)  │
                                            └─────────────────────────────────┘
```

Phases 5 and 6 can run in parallel — they don't share files.

---

## Phase-by-phase

### Phase 0 — Commit current work

**Why first:** No further work until this is durable. A laptop reboot would cost 6+ hours of high-leverage code.

**Action:** Two commits, in order.
1. `feat(lens-core): scene-query role lookup + observer transition capture` — touches `packages/lens-core/src/{observer/scan.ts,helpers/scene-query.ts}` + their tests.
2. `feat(lens-pack-core): foundational a11y/focus/health rule pack — 14 rules` — adds the whole `packages/lens-pack-core/` tree + spec + plan.

**Done when:** both commits land cleanly, tests still green, working tree clean for the lens slice.

---

### Phase 1 — Demo integration in docs/

**Why next:** Smallest possible end-to-end consumer. Catches integration bugs (peer-dep resolution, build-graph ordering, dist paths) that unit tests can't see. Builds confidence that the ESM + workspace setup works under a real bundler.

**Scope:** Add a single Astro page at `docs/src/pages/lens/demo.astro`. The page runs `scan(document)` + the core pack on its own DOM, then renders findings as a plain HTML list (severity badge, message, why, citations).

**No design yet.** No overlay, no pin, no toolbar. Just `JSON.stringify`-ish output that proves the pipeline works.

**Stretch:** add a "force violations" mode that injects test markup (img without alt, button without name, etc.) so the demo always shows interesting findings.

**Done when:** Astro dev server renders the page, findings appear, no console errors, CI build still green.

**Estimated effort:** 1–2 hours.

---

### Phase 2 — Observer token resolution

**Why now:** Five rules in pack-core are deferred waiting on this — and three of the four bundled distribution channels (UI overlay, MCP, CLI) are most valuable when the engine actually flags token violations, since that's where Cognivo's design-systems story lives.

**Scope:** Implement token detection in `lens-core/src/observer/scan.ts`. For each scanned element, walk shadow stylesheets + author stylesheets, pattern-match `var(--cg-*)` references, populate `node.tokenUsage[]` with `{ tier, property, rawValue, resolvedToken }`.

**Strategy:**
- Use `getComputedStyle(el).getPropertyValue('--cg-…')` for inherited custom properties (gives resolved values; identifies which `--cg-` variables are in scope).
- Walk inline `style="…"` attribute for direct `var(--cg-…)` usage.
- Cross-reference against `@cognivo/tokens` to classify tier (tier 1 / 2 / 3) by name pattern.
- Wire `scene.tokenViolations()` and `scene.contrast()` (currently throw) — these are the helpers the deferred rules will consume.

**Risks:**
- Shadow stylesheets in jsdom/happy-dom may not expose `cssRules` reliably. May need a real-browser test path (Playwright).
- Selector → element matching across shadow boundaries is non-trivial.

**Done when:** `scene.tokenViolations({ tier: 1 })` returns offenders for a fixture page; `scene.contrast(node, { against: 'background', wcag: 'AA' })` returns sane ratios; lens-core tests + new resolver tests green.

**Estimated effort:** 1–2 days. **Substantial.** Own brainstorm + spec.

---

### Phase 3 — Token rules in pack-core v0.2

**Why now:** Phase 2 unlocks them and the API was already proven by v0.1.

**Scope:** Add the 5 deferred rules to `@cognivo/lens-pack-core` and bump to 0.2.0:
1. `core/tokens/tier1-palette-color`
2. `core/tokens/tier1-brand-color`
3. `core/tokens/raw-color-no-token`
4. `core/tokens/background-as-foreground` (CLAUDE Semantic Rule 1)
5. `core/tokens/missing-component-tier3-token`

Plus revisit:
- `core/focus/missing-visible-focus-ring` (now possible with reliable `:focus-visible` style introspection)
- One contrast rule (`core/a11y/text-contrast-below-AA`) using `scene.contrast()`

**Done when:** ~7 new rules + tests; pack-core v0.2 builds + ships; integration test still green; total rule count ≈ 21.

**Estimated effort:** half a day after Phase 2 lands.

---

### Phase 4 — `@cognivo/lens-ui` v0.1

**Why now:** Engine and core pack are content-complete. UI turns the work into a product the user can demo to anyone in 30 seconds.

**Scope:** New package `@cognivo/lens-ui`. Lit web component `<cg-lens>` that:
- Mounts as a sibling to the page root
- Runs the engine + a configured pack
- Draws an overlay with finding pins (rect from `node.rect`, color by severity)
- Bottom-right toolbar with: rule count by severity, current Lens Score, dismiss
- Click pin → side drawer with finding's why, citations, fixHint, "Apply" / "Dismiss"
- All v1 styles use Cognivo tokens (dogfood)
- Keyboard navigable, screen-reader-safe (`role="region"` + label, focus trap in drawer)

**Hard cuts for v0.1:**
- No agent drawer ("Explain this", "Suggest fix"). That ships in Phase 6 once agent runtime exists.
- No fix application — preview-only buttons that copy the proposed change to clipboard.
- No persona switcher.
- No Cloud connection.

**Done when:** `<cg-lens>` works on Cognivo's docs site (Phase 1's demo page upgrades to use it); visual regression suite for the overlay; keyboard nav passes axe-core.

**Estimated effort:** 3–5 days. Largest sub-project on this roadmap.

**Dependencies:** Lens-core (done), pack-core (done), `@cognivo/components` for primitives if useful.

---

### Phase 5 — `@cognivo/lens-pack-ethics` v0.1 (cheap rules)

**Why now:** Second pack proves the multi-pack story. Ethics rules are mostly cheap (selector + attribute checks) so they don't need agent runtime yet.

**Scope:** ~9 cheap dark-pattern rules per spec §4.3:
- `ethics/dark-pattern/fake-urgency` (countdown that resets, "X bought in last Y minutes" w/o source)
- `ethics/dark-pattern/forced-continuity` (no easy cancel)
- `ethics/dark-pattern/disguised-ad` (sponsored without label)
- `ethics/dark-pattern/preselected-upsell` (checkbox checked by default for paid item)
- `ethics/dark-pattern/confirmshaming` (decline-link copy with negative loading)
- `ethics/dark-pattern/visual-interference` (low-contrast decline button)
- `ethics/dark-pattern/misdirection` (primary action steers to upsell)
- `ethics/dark-pattern/hard-to-cancel` (subscription cancel buried > 3 clicks deep)
- `ethics/transparency/missing-disclosure` (data collection without notice)

**Out of scope for v0.1:** the 3 LLM-cost rules (require Phase 6).

**Done when:** pack-ethics ships at 0.1.0; both packs co-evaluate cleanly; demo page renders findings from both; integration test verifies pack composition.

**Estimated effort:** 2–3 days.

**Can run in parallel with Phase 6.**

---

### Phase 6 — lens-core agent runtime (Phase 9 of original lens-core plan)

**Why now:** Unblocks streaming `explain()` / `suggestFix()` in lens-ui (Phase 4 stretch goal) and the LLM-cost rules in ethics + conversion packs.

**Scope:** Implement `packages/lens-core/src/agent/runtime.ts`:
- Streaming `explain(finding): AsyncIterable<string>` — calls `@cognivo/core`'s AiClient with the finding context, streams text
- Structured `suggestFix(finding): Promise<FixManifest>` — uses structured output for `codeable` fixes
- Cassette pattern for tests (record real LLM responses, replay deterministically per spec §11.9)
- Respect spec §10.4 privacy tiers (Tier 0 = local only; agent calls only fire when explicitly enabled)

**Done when:** explain() streams; suggestFix() returns valid FixManifest; cassette tests pass; lens-core gains another ~30 tests.

**Estimated effort:** 2 days.

**Can run in parallel with Phase 5.**

---

### Phase 7 — LLM rules in ethics + `@cognivo/lens-pack-conversion`

**Why now:** Agent runtime ready (Phase 6); ethics pack established (Phase 5).

**Scope:** Add to ethics:
- `ethics/dark-pattern/llm-confirmshaming-detector` — LLM judges decline-link copy tone
- `ethics/dark-pattern/llm-misleading-claim` — LLM checks for unsubstantiated superlatives
- `ethics/transparency/llm-disclosure-completeness` — LLM checks if disclosures cover all data uses

New pack: `@cognivo/lens-pack-conversion` (~17 rules per spec §4.3) — anchoring, social proof, decoy, framing, scarcity. ~15 cheap + 2 LLM.

**Done when:** Both packs ship; LLM tests use cassettes; total rule count ≈ 50.

**Estimated effort:** 3–4 days.

---

### Phase 8 — MCP server integration

**Why now:** All four content surfaces (UI, packs, agent) ready. MCP exposes Lens to AI IDEs (Claude Code, Cursor) — high-leverage distribution.

**Scope:** Extend `@cognivo/mcp-server` with four tools per spec §9.8:
- `lens.scan({ url? })` — returns findings JSON
- `lens.explain({ findingId })` — streaming text
- `lens.suggestFix({ findingId })` — returns FixManifest
- `lens.applyFix({ findingId, manifestSignature })` — applies a verified fix (gated)

**Done when:** Tools work via Claude Code; integration test in mcp-server's suite; spec §9.8 audit-trail requirements met.

**Estimated effort:** 2 days.

---

### Phase 9 — `@cognivo/lens-vite` + `@cognivo/lens-cli`

**Why last:** Distribution polish. Both are thin wrappers over the engine — most cost is in good ergonomics, not new logic.

**Scope:**
- `@cognivo/lens-vite`: dev-server plugin. Auto-injects `<cg-lens>` into the page in dev mode. Source-map cascade per spec §9.7.
- `@cognivo/lens-cli`: headless audit binary `cognivo-lens audit ./public --pack core --json out.json`. Exit code by severity threshold for CI gating.

**Done when:** Both packages ship; the docs site uses lens-vite in dev; a CI job runs lens-cli on staging and posts results.

**Estimated effort:** 2–3 days combined.

---

## Checkpoints (commit boundaries)

| Checkpoint | What's committed | Why this is a coherent unit |
|---|---|---|
| **C0** | Phase 0 — current pack-core + lens-core fixes | Where we are now |
| **C1** | Phase 1 demo | Validates integration; tiny standalone change |
| **C2** | Phase 2 token resolution | Standalone lens-core enhancement; tests gated |
| **C3** | Phase 3 token rules in pack-core | New rules + bump pack-core to 0.2.0 |
| **C4** | Phase 4 lens-ui v0.1 | New package; first visible product surface |
| **C5** | Phase 5 lens-pack-ethics v0.1 | New package; multi-pack proof |
| **C6** | Phase 6 lens-core agent runtime | Lens-core 0.2.0 with streaming agent |
| **C7** | Phase 7 LLM ethics + lens-pack-conversion | Two packs at LLM level |
| **C8** | Phase 8 MCP integration | mcp-server gains 4 lens tools |
| **C9** | Phase 9 lens-vite + lens-cli | v1 distribution complete |

---

## What's NOT in this roadmap

Explicit cuts so we don't scope-creep:

- **Browser extension** — spec §10.1 cuts this from v1.
- **Storybook addon, VS Code panel** — same.
- **Personas** (`@cognivo/lens-pack-personas`) — deferred until lens-ui has a working baseline. Personas modulate rule weights, which is meaningless without a UI to display the modulation.
- **Cloud / Pro features** — Tier 1+ privacy modes, telemetry, staging channel. Per spec §12 these are post-OSS-v1.0.
- **Auto-PR fixes** (Playbook Phase 4) — ships as Cloud GA, not v1.
- **Worker hand-off** (lens-core deferred Phase 10) — performance optimization. Real workloads don't exist yet; defer until a page hits the 50ms p95 budget.
- **Golden fixture harness** (lens-core deferred Phase 13) — needs the ~200 hand-labeled fixtures, which is a content sub-project, not engine work.

These reappear in v1.1 / v2.0 planning, not here.

---

## Working principles (carried forward from prior sessions)

- **One sub-project at a time.** Don't half-build two phases simultaneously. Phases 5 + 6 are explicitly the only allowed parallelism, and only because they share zero files.
- **Brainstorm → spec → plan → implement** per sub-project. The spec for *Lens itself* is enough cover for the small phases; the big sub-projects (Phase 2, Phase 4, Phase 7) get their own design spec.
- **TDD per task.** Failing test → minimal impl → passing test → commit (only when user asks).
- **Commit at clean milestones.** Each checkpoint above is a commit boundary. Mid-phase work stays uncommitted.
- **Run the simplify skill at the end of each big phase.** The Phase 4 simplify pass on lens-pack-core caught a real correctness bug and a 50% perf win — that's the bar.
- **No emojis in code or docs unless asked.**
- **Honest deferrals beat shipping dead code.** When a rule depends on infrastructure that doesn't exist yet, defer it visibly (as we did with the 5 token rules in pack-core v0.1).

---

## How to use this doc in a future session

If a fresh chat opens and the user says "continue lens":
1. Read this roadmap.
2. Run `git log --oneline -10` to see which checkpoints landed.
3. Find the lowest unchecked checkpoint above the current HEAD; that's the next phase.
4. Start that phase's brainstorm → spec → plan cycle. The spec sometimes already exists (the Lens design spec covers most rule packs); the implementation plan is per-phase.
5. Don't skip phases — Phase 4 lens-ui without Phase 2 token resolution would surface only ~14/21 findings and look weak in demo.

---

*This roadmap is a living document. Update it when reality teaches us the order is wrong.*
