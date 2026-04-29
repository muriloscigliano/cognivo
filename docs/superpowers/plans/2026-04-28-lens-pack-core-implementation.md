# Lens Pack Core — Implementation Plan

> **Spec:** [`2026-04-28-lens-pack-core-design.md`](../specs/2026-04-28-lens-pack-core-design.md)
> **Engine:** `@cognivo/lens-core` (164 tests, 26 KB build, on `main` as of commit `eed595f`)
> **Pattern:** TDD per rule — failing test → minimal impl → passing test. Commit at clean phase milestones, only when user asks.

---

## Phase 0 — Scaffold + Observer enhancement

**Goal:** new package compiles, tests run, builds. Observer captures `transition` so H1 can fire later.

Tasks:
1. Create `packages/lens-pack-core/package.json` (mirror `lens-core/package.json`; bump only the entry-points and remove the `worker` + `fixtures` subpath exports — this pack is one module).
2. Create `packages/lens-pack-core/tsconfig.json`, `tsconfig.test.json`, `vite.config.ts`, `vitest.config.ts` (mirror lens-core).
3. Create `packages/lens-pack-core/src/index.ts` (empty barrel) and `src/__tests__/smoke.test.ts` (single passing test asserting the package loads).
4. Edit `packages/lens-core/src/observer/scan.ts` — add `'transition'`, `'transition-property'` to `DEFAULT_RELEVANT_PROPERTIES`. Add a test in `lens-core/src/__tests__/observer/scan.test.ts` asserting these properties appear in `node.computedStyle` when set inline.
5. `pnpm install` (workspace re-link).
6. `pnpm --filter @cognivo/lens-pack-core test type-check build` — green.
7. `pnpm --filter @cognivo/lens-core test type-check build` — green (164 + 1 new = 165).

**Done when:** both packages build, both test suites green.

---

## Phase 1 — First rule end-to-end (`core/a11y/img-without-alt`)

**Goal:** prove the whole authoring pattern (rule + fixtures + test) works with the simplest rule. This is the template every other rule follows.

Tasks:
1. Write `src/__tests__/a11y/img-without-alt.test.ts`:
   - Import `runFixture` from `@cognivo/lens-core/fixtures` and `fixture` from same.
   - Import the rule (doesn't exist yet — test will fail to compile).
   - 3 fixtures: positive (`<img src="x.jpg">` → finding), negative (`<img src="x.jpg" alt="A cat">` → no finding), edge (`<img src="x.jpg" alt="">` decorative → no finding).
   - For each, `runFixture(rule, spec)` and assert `result.passed === true` with helpful diagnostic on failure.
2. Write `src/rules/a11y/img-without-alt.ts`:
   - `defineRule({ id: 'core/a11y/img-without-alt', title, category: 'accessibility', severity: 'blocker', cost: 'cheap', intentScope: [], fixCategory: 'codeable', defaultEnabled: true, citations: ['wcag/2.1/SC1.1.1'], applies, detect, fixtures: [...names...] })`.
   - `applies({ scene })`: returns `scene.find('img').length > 0`.
   - `detect({ scene })`: walks images, finds those without `alt` attribute, emits one DetectionInput per offender with `confidence: 95`, message + why + `fixHint: { kind: 'attribute-set', attribute: 'alt', value: '', reason: 'Mark as decorative or supply alt text.' }`.
   - `fixtures: [{ name: 'img-with-alt', expect: 'no-finding' }, { name: 'img-without-alt', expect: 'finding' }, { name: 'img-with-empty-alt', expect: 'no-finding' }]`.
3. Test passes.
4. **Validate the pattern.** If anything in the engine API was awkward to use, note it now and consider whether to fix in lens-core before doing the next 13 rules.

**Done when:** test passes, type-check clean. Pattern validated.

---

## Phase 2 — A11y name rules (5)

**Goal:** ship A1, A3, A4, A5, A6 (rules whose detect logic = "find element of type T missing accessible-name signals").

These share enough logic to consider a tiny helper, but **not yet** — implement first, extract on the third repetition (rule of three).

Tasks (one TDD cycle per rule):
1. **A3 `core/a11y/button-without-name`** (severity: blocker)
   - Targets: `<button>`, elements with `role="button"`.
   - Negative-name signals: empty visible text AND no `aria-label` AND no `aria-labelledby`.
   - Be careful: a button containing only an `<svg>` (icon-only) has empty text — that's a positive case (the rule should fire) unless it has aria-label.
2. **A4 `core/a11y/link-without-name`** (severity: blocker)
   - Targets: `<a>` (any href).
   - Same name signal as A3.
3. **A1 `core/a11y/landmark-without-name`** (severity: strong)
   - Targets: `[role=region|navigation|complementary|banner|contentinfo|search|form]`.
   - Note: scene-query selector grammar supports `[role=region]` but **not comma-OR within a single element** — use `scene.find('*[role=region], *[role=navigation], ...')` (comma-separated alternatives ARE supported per scene-query.ts:55).
4. **A5 `core/a11y/input-without-label`** (severity: blocker)
   - Targets: `<input>` of type text/email/password/search/tel/url/number (and inputs with no `type` attribute, which default to text).
   - Has-label signal: `aria-label`, `aria-labelledby`, OR a `<label>` somewhere in the scene whose `for=` matches the input's `id`.
   - Cross-node lookup needed — walk `scene.find('label')` once, build a Set of referenced ids, then check each input.
5. **A6 `core/a11y/dialog-without-name`** (severity: strong)
   - Targets: `<dialog>`, `[role=dialog]`, `[role=alertdialog]`.
   - Same name signal as A1.

Each rule: 1 file, 1 test file, ≥3 fixtures (positive, negative, edge).

**Done when:** all 5 rules + 5 test files green. ~25–30 fixtures total.

**Possible refactor checkpoint:** if `hasAccessibleName(node)` appears in 4+ rules, extract to `src/internal/accessible-name.ts` (NOT exported from package barrel — internal helper).

---

## Phase 3 — A11y structural rules (4)

Tasks:
1. **A7 `core/a11y/heading-skipped-level`** (consider)
   - Walk `h1..h6` in document order. Track previous level. If current > previous + 1 (and previous wasn't 0), emit finding on current.
   - Edge: starting heading should be `h1`, but lots of pages legitimately start at h2 inside a section — be lenient on first heading. Ship the strict check; add a fixture proving "h1 then h3" fires and "h2 then h3" doesn't.
2. **A8 `core/a11y/positive-tabindex`** (strong)
   - Walk all nodes with `tabindex` attribute. Parse to int. If > 0, fire.
   - Trivial detect; emphasis on fixtures (negative for tabindex=0, tabindex=-1, no tabindex; positive for tabindex=1, tabindex=99).
3. **A9 `core/a11y/aria-hidden-focusable`** (blocker)
   - Walk `[aria-hidden=true]`. For each, check if it's focusable: focusable tag (`a[href]`, `button`, `input`, `select`, `textarea`, `[tabindex]` with int >= 0).
   - Note: should also fire on aria-hidden ancestors of focusable descendants. **v1 cuts this** — only check the aria-hidden element itself. Document the limitation in the rule's `why`.
4. **A10 `core/a11y/duplicate-id`** (strong)
   - Walk all nodes with `id` attribute. Build Map<id, count>. For each id with count > 1, emit a finding **on each duplicate** (not on the first occurrence).

**Done when:** all 4 rules + tests green.

---

## Phase 4 — Focus + system-health (4)

Tasks:
1. **F1 `core/focus/disabled-with-tabindex`** (strong)
   - Walk nodes with `disabled` attribute or `aria-disabled="true"`. Check `tabindex` attr exists and parses to int >= 0.
2. **H1 `core/system-health/transition-all`** (consider)
   - Walk all nodes. Read `node.computedStyle['transition']` and `node.computedStyle['transition-property']`. If either contains `\ball\b` (word-boundary), fire.
   - **Depends on Phase 0 Observer change.**
3. **H2 `core/system-health/closed-shadow-root-unauditable`** (consider)
   - Walk all nodes. If `node.hasClosedShadowRoot === true`, fire. Confidence 100.
4. **H3 `core/system-health/cg-component-no-manifest`** (consider)
   - Walk all nodes whose tag starts with `cg-` or `ai-`. If `node.componentManifest === undefined`, fire.

**Done when:** all 4 rules + tests green.

---

## Phase 5 — Pack manifest + index + integration test

Tasks:
1. Write `src/pack.ts`:
   ```ts
   export default definePack({
     id: '@cognivo/lens-pack-core',
     version: '0.1.0',
     title: 'Cognivo Lens — Core Pack',
     description: 'Foundational a11y + system-health rules. On by default.',
     intents: [],  // applies to all intents
     rules: [
       () => import('./rules/a11y/img-without-alt.js'),
       () => import('./rules/a11y/button-without-name.js'),
       // ... all 14
     ],
   });
   ```
2. Write `src/index.ts`:
   ```ts
   export { default } from './pack.js';
   export { default as imgWithoutAlt } from './rules/a11y/img-without-alt.js';
   // ... named exports for every rule
   ```
3. Write `src/__tests__/integration/pack-end-to-end.test.ts`:
   - Construct a fixture HTML page violating ~5 rules at once (img w/o alt, button w/o name, positive tabindex, transition: all, duplicate id).
   - Build a SceneGraph via `scan(...)`.
   - Construct `RuleEngine`, `await engine.register(corePack)`.
   - `engine.evaluate(graph, 'unknown')`.
   - Assert: at least 5 distinct findings; assert specific rule IDs present; assert findings are sorted blocker-first.

**Done when:** integration test green. Bundle size check: `pnpm --filter @cognivo/lens-pack-core build` reports < 20 KB / < 6 KB gzip for the eager portion.

---

## Phase 6 — Final sweep + handoff

Tasks:
1. From the repo root: `pnpm --filter @cognivo/lens-core --filter @cognivo/lens-pack-core test type-check build`. All green.
2. Run `pnpm --filter @cognivo/lens-core test` once standalone to confirm we didn't break the engine (target: 165 tests — original 164 + the Observer-enhancement test from Phase 0).
3. Run `pnpm --filter @cognivo/lens-pack-core test` standalone to confirm pack tests pass (target: ~50 tests — 14 rules × ~3 fixtures + integration + smoke).
4. Author a short `packages/lens-pack-core/README.md` (under 80 lines) — install snippet, rule list table, link to spec.
5. Wait for the user to say "commit" before staging anything. Suggest a 2-commit split if the diff is large: (1) lens-core Observer enhancement; (2) lens-pack-core scaffold + rules.

---

## Working principles (carried forward from lens-core)

- **One responsibility per file.** Rules don't share files.
- **Comments explain WHY, not WHAT.** Identifiers do the WHAT.
- **No defensive try/catch in rule detect()** — the engine already wraps `applies()` and `detect()` in try/catch (engine.ts:73, 82). Re-catching inside the rule swallows useful errors during dev.
- **No mocking the engine in tests.** `runFixture` is the real engine running real DOM through real scan + real evaluate. Bugs surface where users will see them.
- **Fixtures are first-class.** A rule with 5 fixtures is more valuable than 5 rules with 1 fixture each.
- **Stop and reconsider after Phase 1.** If the engine API was awkward, fix it before doing 13 more rules.

## Risk register

| Risk | Mitigation |
|---|---|
| `runFixture` calls `document.body.innerHTML = ...` — in happy-dom, computed styles for shadow-rooted components may not match real browsers. | Use plain HTML in fixtures (no shadow DOM); reserve component-level testing for the components package. The core pack rules check attributes + roles, not styles. |
| The scene-query selector grammar doesn't support attribute-OR within a clause — `[role=region|navigation]` is invalid. | Use comma-OR: `*[role=region], *[role=navigation]`. Confirmed supported by scene-query.ts:55. |
| Adding `transition` to default scan properties grows every SceneNode by 2 entries. | Negligible — happy path is empty strings; cost is < 1%. |
| Some rules emit findings on the same node, creating noise. | The engine dedups by `(ruleId, targetNodeId, message)` hash — different rules on the same node are *intentional* signals, not noise. UI groups them later. |
| 14 rules × 3+ fixtures = 50+ tests. Some may be flaky in happy-dom. | Use simple HTML; avoid timing-dependent assertions; if a fixture fails inconsistently, switch the test to a hand-crafted SceneGraph (skip the runner). |
