# Lens Pack Ethics v0.1 — Implementation Plan

> **Spec:** [`2026-04-29-lens-pack-ethics-design.md`](../specs/2026-04-29-lens-pack-ethics-design.md). Q1 answered (b): add `packs` attribute to `<cg-lens>` in the same commit so the ethics pack is visible in the demo.
> **Outcome:** **one commit** at the end (`feat(lens-pack-ethics + lens-ui): v0.1 — 5 ethics rules + multi-pack <cg-lens> (C5)`).

---

## Phase 0 — Pre-flight

1. `pnpm --filter @cognivo/tokens --filter @cognivo/lens-core --filter @cognivo/lens-pack-core --filter @cognivo/lens-ui test` → 48 / 221 / 113 / 59 = 441 baseline.
2. Clean working tree.
3. Build lens-core + lens-pack-core dist (ethics tests will import from those).

---

## Phase A — Scaffold

`packages/lens-pack-ethics/` mirrors lens-pack-core's scaffold:
- `package.json` — peer deps: lens-core. Dev deps: typescript, vite, vitest, happy-dom.
- `tsconfig.{json,test.json}`, `vite.config.ts` (preserveModules per-rule chunks), `vitest.config.ts` (happy-dom).
- `src/index.ts` (default-export pack, named-export rules).
- `src/__tests__/smoke.test.ts` (verifies pack manifest shape, all 5 lazy rules resolve).

**Done when:** package builds, smoke test passes.

---

## Phase B — Five rules (TDD per rule)

Each rule:
1. Failing fixture-based test first.
2. Minimal impl.
3. Add edge cases (allow-list, false-positive avoidance).
4. Fixtures: ≥5 each (positive, negative, edge variations).

Order chosen by cleanest signal first:

### B.1 `ethics/dark-pattern/preselected-optional-checkbox` (strong, 85)
- Selector: `input[type=checkbox][checked]`
- Filter: nearby label or text matches optional-opt-in keyword pattern AND does NOT match allow-list (remember-me etc.)
- Helper: `findEnclosingLabelText(node, scene)` — walks parents for `<label>` text or sibling `<label for=>`.
- Allow-list: shared internal helper.

### B.2 `ethics/dark-pattern/asymmetric-action-buttons` (consider, 70)
- Selector: button pairs that share a parent. Walk all buttons grouped by parent id.
- Per pair: compute `scene.contrast(...)` for each button; flag if delta >= 3:1 AND one is < 3:1 absolute.
- Confidence boost (+10) when ancestor chain contains `[role=dialog]` or `<dialog>`.

### B.3 `ethics/dark-pattern/scarcity-claim` (consider, 65)
- Walk all visible nodes, regex on `node.text` against scarcity-patterns.ts.
- Skip nodes whose text is empty / inside `<code>` / inside `<style>` / inside `<noscript>`.

### B.4 `ethics/dark-pattern/countdown-without-anchor` (consider, 70)
- Walk visible nodes, regex on text for `\d{1,2}:\d{2}(:\d{2})?`.
- Filter: NO ancestor has `<time datetime>` or `[data-deadline]` attribute.

### B.5 `ethics/transparency/sponsored-without-label` (strong, 90)
- Selector: elements with class containing `sponsored`/`promo`/`ad-`/`promoted`, or `[data-sponsored]`/`[data-ad]`.
- Filter: visible text within element does NOT match `/(sponsored|advertisement|promoted|paid post|paid partnership|^ad$)/i`.

After each rule:
- `pnpm --filter @cognivo/lens-pack-ethics test` green.
- Type-check clean.

**Done when:** 5 rule files + 5 test files; ≥ 25 tests across the rules; all green.

---

## Phase C — Pack manifest + integration

1. `src/pack.ts` — `definePack({ id: '@cognivo/lens-pack-ethics', version: '0.1.0', intents: [], rules: [<5 lazy imports>] })`.
2. `src/index.ts` — default export the pack; named exports per rule.
3. `src/__tests__/integration/pack-end-to-end.test.ts`:
   - Inline DOM with seeded violations for each rule
   - Register pack with engine, evaluate, assert all 5 rule IDs surface
   - Co-register lens-pack-core, verify both packs evaluate without conflicts

**Done when:** integration test green, pack builds with 5 lazy chunks.

---

## Phase D — Multi-pack support in `<cg-lens>`

Tiny extension to lens-ui. Touch:
- `packages/lens-ui/src/internal/scan-controller.ts`:
  - `ScanControllerOptions.packs?: RulePack[]`. Default `[corePack]`.
  - Constructor registers each.
- `packages/lens-ui/src/cg-lens.ts`:
  - New attribute `pack-ids?: string` (comma-separated workspace package names) — wait, runtime dynamic-import of strings is fragile.
  - Alternative: programmatic only. `lens.packs = [corePack, ethicsPack]` before mount, OR a `data-packs` attribute holding rule-pack module paths.

**Decision: programmatic.** `<cg-lens>` exposes a `packs` property. Default = `[corePack]`. Consumers can set it before connectedCallback to override.

```ts
@property({ attribute: false }) packs?: RulePack[];
```

Updated lifecycle: ScanController consumes the configured packs. Demo page sets `lens.packs = [corePack, ethicsPack]` before `connectedCallback` (via inline script).

Tests:
- `cg-lens.test.ts`: assert default packs = corePack-only; setting custom packs registers both.
- bundle: lens-ui bundle delta < 0.5 KB.

**Done when:** lens-ui tests green (target ~62), still under bundle budget.

---

## Phase E — Demo page upgrade

`docs/src/pages/lens/demo.astro`:
1. Add ethics-violating markup to the audit target (5 violations, one per rule).
2. Inline script imports both packs and assigns `lens.packs = [corePack, ethicsPack]` before scan.
3. Update copy to mention multi-pack support.

`docs/package.json`: add `@cognivo/lens-pack-ethics` workspace dep.

**Done when:** `pnpm --filter @cognivo/docs build` succeeds; visiting `/lens/demo` shows findings from both packs.

---

## Phase F — Final sweep + roadmap update

1. `pnpm --filter @cognivo/tokens --filter @cognivo/lens-core --filter @cognivo/lens-pack-core --filter @cognivo/lens-ui --filter @cognivo/lens-pack-ethics --filter @cognivo/docs test type-check build`. All green.
2. Update `2026-04-29-lens-v1-roadmap.md`: mark C5 complete.
3. Mini playbook check on ethics: Pattern 17 (Tool Registry — pack registers like core), Pattern 21 (ACI — rule manifests carry citations + fixHints), Principle 10 (Communicate Limitations — confidence accurately scaled).

---

## Working principles

- **One commit at the end.** Internal phase checkpoints; ship as a coherent whole.
- **Honest confidence.** No rule above 90 in this pack — every rule is heuristic, value-laden, or uncertain. Confidence reflects that.
- **Allow-lists are first-class.** preselected-optional-checkbox needs an explicit allow-list for `remember me` patterns. The allow-list lives in `internal/`, alongside the matching keyword list.
- **Demo seeded but honest.** Demo violations exist to surface the rules visually. The page copy clarifies the rules are advisory.
- **Don't audit the lens.** ethics rules also subject to the "filter cg-lens descendants" rule from C2.2's ScanController. (Already implemented; verify still in effect.)
