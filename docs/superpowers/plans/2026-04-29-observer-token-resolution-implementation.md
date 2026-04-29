# Observer Token Resolution — Implementation Plan

> **Spec:** [`2026-04-29-observer-token-resolution-design.md`](../specs/2026-04-29-observer-token-resolution-design.md) — Approach **D** (reverse-map). User confirmed all 5 recommendations from §8 with the explicit nudge: **"best, not easiest."** Plan is written to that bar.
>
> **Outcome.** Three commits at clean checkpoints:
> - **C2.1** `feat(tokens): typed manifest export with drift gate`
> - **C2.2** `feat(lens-core): observer token resolution + contrast helper`
> - **C2.3** `feat(lens-pack-core): six token + contrast rules (v0.2.0)`

---

## Phase 0 — Pre-flight

Run first, in order. If any fail, stop and fix before touching code.

1. `pnpm --filter @cognivo/tokens build` — confirm `dist/index.css` is present and current.
2. `pnpm --filter @cognivo/lens-core --filter @cognivo/lens-pack-core test` — confirm both green from C0/C1 baseline (167 + 86).
3. `git status --short` — confirm clean working tree.
4. Inspect `packages/tokens/dist/index.css` for any token forms our resolver will need to handle: `var()`, `hsl()`, `oklch()`, `color-mix()`, `calc()`, named colors, named system colors. Document anything beyond `var()` chains pointing at hex values, since those need handling in the manifest builder.

---

## Phase 1 — `@cognivo/tokens` manifest (C2.1)

### 1.1 Build-script

New file `packages/tokens/scripts/build-manifest.mjs`. Inputs: `dist/index.css`. Outputs: `dist/manifest.json` + `dist/manifest.js` + `dist/manifest.d.ts`.

Algorithm:
1. Read CSS, extract every `--cg-*: <value>;` declaration. Concatenate by name (CSS cascade — last wins).
2. Build name → raw-value map.
3. Recursively resolve `var()` chains. Detect cycles (throw). Track full chain for each token.
4. Classify each token by tier (1 / 2 / 3) using **explicit pattern table**, not heuristics.
5. Classify each token by category (`color | spacing | radius | font-size | font-weight | font-family | line-height | border-width | opacity | icon-size | transition-duration | shadow | other-color | other-numeric`). **Pattern table is exhaustive — unknown patterns throw with the offending token name.**
6. Normalize color values: hex → `rgb(R, G, B)` or `rgba(R, G, B, A)`. Hand-rolled.
7. Emit JSON sorted by tier ascending, then by name. Stable order = stable diffs.
8. Emit TS file that re-exports the JSON as typed.

Tier classification table:
```ts
const TIER_RULES = [
  // Tier 3 (most specific)
  { match: /^--cg-component-/, tier: 3 },
  // Tier 2 (semantic)
  { match: /^--cg-color-(action|surface|status|input|focus-ring|overlay)-/, tier: 2 },
  { match: /^--cg-shadow-/, tier: 2 },
  { match: /^--cg-overlay-/, tier: 2 },
  { match: /^--cg-(border-radius-component|component-)/, tier: 2 },
  // Tier 1 (primitives + brand)
  { match: /^--cg-(gray|red|orange|amber|yellow|lime|green|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|brown|stone|neutral|zinc|slate)-/, tier: 1 },
  { match: /^--cg-brand-/, tier: 1 },
  { match: /^--cg-(spacing|font-size|font-weight|font-family|line-height|border-width|border-radius|opacity|icon-size|transition-duration|letter-spacing)-/, tier: 1 },
  { match: /^--cg-(motion|easing)-/, tier: 1 },
];

function classifyTier(name: string): 1 | 2 | 3 {
  for (const rule of TIER_RULES) {
    if (rule.match.test(name)) return rule.tier;
  }
  throw new Error(`Unknown token tier for "${name}". Add a TIER_RULES entry or fix the token name.`);
}
```

Manifest type:
```ts
export interface TokenEntry {
  name: string;
  tier: 1 | 2 | 3;
  category: TokenCategory;
  resolvedValue: string;   // normalized
  varChain: string[];      // [name, intermediate1, ..., leaf-name]
  rawDeclaration: string;  // 'var(--cg-brand-primary-500)' — what the CSS actually said
}

export type TokenCategory =
  | 'color'
  | 'spacing'
  | 'radius'
  | 'font-size'
  | 'font-weight'
  | 'font-family'
  | 'line-height'
  | 'border-width'
  | 'opacity'
  | 'icon-size'
  | 'transition-duration'
  | 'letter-spacing'
  | 'shadow'
  | 'gradient'
  | 'easing';

export const tokenManifest: readonly TokenEntry[];
export const tokenByName: ReadonlyMap<string, TokenEntry>;
export const tokensByValue: ReadonlyMap<string, readonly TokenEntry[]>;  // reverse map
export const manifestHash: string;  // content hash, for cache invalidation
```

### 1.2 Color normalizer

`packages/tokens/scripts/normalize-color.mjs`. Hand-rolled, ~80 lines. Handles:
- Hex `#rgb` / `#rrggbb` / `#rgba` / `#rrggbbaa`
- `rgb()` / `rgba()` (any whitespace, comma OR space syntax)
- `hsl()` / `hsla()` → convert via standard formula
- 17 named CSS colors that appear in our tokens (audit `dist/index.css` first; throw on any other named color)
- Strips alpha when α=1 (so `rgba(0,0,0,1)` → `rgb(0,0,0)`)

Output canonical form: `rgb(R, G, B)` or `rgba(R, G, B, A.AAA)`.

### 1.3 Drift gate

New file `packages/tokens/scripts/check-manifest-drift.mjs`. CI-only. Re-runs the build-manifest pipeline in-memory and diffs against the committed `dist/manifest.json`. Exits non-zero if mismatch. Hook into `pnpm --filter @cognivo/tokens build` AND a top-level `pnpm size` step.

### 1.4 Tests

`packages/tokens/__tests__/build-manifest.test.mjs` — pure-Node tests, no DOM:
- Tier classification: every category × every tier × edge cases — **30+ assertions**
- Var-chain resolution: 1-deep, 2-deep, 3-deep, cycle (must throw)
- Color normalizer: 8 input formats × normal + alpha + edge cases — **25+ assertions**
- Manifest output: deterministic order, hash stability across runs, JSON shape valid, every entry's varChain[0] === entry.name

Target: **50+ tests** (raised from spec's 30+).

### 1.5 Package wiring

`packages/tokens/package.json`:
```json
"exports": {
  ".": "./dist/index.css",
  "./manifest": {
    "types": "./dist/manifest.d.ts",
    "import": "./dist/manifest.js",
    "default": "./dist/manifest.json"
  }
}
```

### 1.6 Done when

- `pnpm --filter @cognivo/tokens build` regenerates manifest deterministically
- `pnpm --filter @cognivo/tokens test` ≥ 50 passing
- Manifest committed to repo (`dist/manifest.{json,js,d.ts}`)
- Drift gate runs in CI and fails on mismatch
- `import { tokenManifest, tokensByValue } from '@cognivo/tokens/manifest'` works from another workspace package

**Commit C2.1** at this milestone.

---

## Phase 2 — `@cognivo/lens-core` token resolution + contrast (C2.2)

### 2.1 Token resolution module

New file `packages/lens-core/src/observer/token-resolution.ts`. Exports:
```ts
export function resolveTokenUsage(
  computedStyle: Record<string, string>,
  properties: readonly string[]
): TokenUsage[];
```

Implementation:
1. Import `tokensByValue` from `@cognivo/tokens/manifest`. Already a `Map<normalizedValue, TokenEntry[]>`.
2. For each property in `properties`, normalize the value with the same normalizer used to build the manifest. (Re-export the normalizer from `@cognivo/tokens/manifest`? Or duplicate? Re-export — single source of truth.)
3. Look up in `tokensByValue`. If hit:
   - Sort matches by tier ascending, then by name length descending (most specific name first within a tier).
   - Emit `{ tier: bestMatch.tier, property, rawValue: normalized, resolvedToken: bestMatch.name, candidates: matches.map(m => m.name) }`.
4. If miss AND the property is in the colors-or-numeric set:
   - Emit `{ tier: 0, property, rawValue: normalized, resolvedToken: undefined, candidates: [] }`. (`tier: 0` = "off-grid". Update `TokenUsage` type to allow tier `0 | 1 | 2 | 3`.)

### 2.2 Update `TokenUsage` type

`packages/lens-core/src/types/scene-graph.ts`:
```ts
export interface TokenUsage {
  tier: 0 | 1 | 2 | 3;
  property: string;
  rawValue: string;       // normalized canonical form
  resolvedToken?: string; // best match (lowest tier, longest name)
  candidates: string[];   // ALL matching tokens, lowest tier first
}
```

`tier: 0` is the new "value lands off the design system entirely" signal — used by `raw-color-no-token`.

### 2.3 Wire into `scan()`

`packages/lens-core/src/observer/scan.ts`:
```ts
const node: SceneNode = {
  // ...
  tokenUsage: resolveTokenUsage(computedStyle, opts.computedStyleProperties),
  // ...
};
```

Replaces the hardcoded `tokenUsage: []`.

### 2.4 Implement `scene.tokenViolations()`

`packages/lens-core/src/helpers/scene-query.ts`:
```ts
tokenViolations: (opts) => {
  const out: Array<{ node: SceneNode; usage: TokenUsage }> = [];
  for (const node of walkAll(graph)) {
    for (const usage of node.tokenUsage) {
      if (usage.tier !== opts.tier) continue;
      if (opts.exclude?.some(p => usage.property.startsWith(p.replace('*', '')))) continue;
      out.push({ node, usage });
    }
  }
  return out;
};
```

The selector-style `exclude: ['--cg-spacing-*']` matches the prefix and strips the `*`. Document this in JSDoc.

### 2.5 Contrast helper

New file `packages/lens-core/src/helpers/contrast.ts`. Exports:
```ts
export type WcagLevel = 'AA' | 'AAA' | 'AA-large' | 'AAA-large';

export interface ContrastResult {
  ratio: number;
  passes: boolean;
  threshold: number;       // 4.5 / 3.0 / 7.0 / 4.5 by level
  foreground: string;      // resolved color used
  background: string;      // resolved color used after ancestor walk
}

export function computeContrast(
  node: SceneNode,
  ancestorChain: SceneNode[],
  level: WcagLevel
): ContrastResult;
```

Algorithm (W3C-compliant, not 80%-version):
1. Resolve foreground from `node.computedStyle.color`. Normalize.
2. Resolve background by walking `ancestorChain` from nearest to root, skipping any node whose `background-color` is transparent (alpha 0) or computed as `transparent`. First non-transparent wins. If all transparent, default to `rgb(255, 255, 255)` (white) and flag `inferredBackground: true`.
3. Compute relative luminance for each color (sRGB → linear → luminance, per WCAG 2.1).
4. Compute ratio: `(L_lighter + 0.05) / (L_darker + 0.05)`.
5. Threshold per level: AA = 4.5, AA-large = 3.0, AAA = 7.0, AAA-large = 4.5.
6. Return all info — let rules decide what to do.

Wire `scene.contrast()`:
```ts
contrast: (node, opts) => {
  // Build ancestor chain by walking parent ids back to root.
  const chain: SceneNode[] = [];
  let cur = node.parent ? graph.nodes.find(n => n.id === node.parent) : undefined;
  while (cur) {
    chain.push(cur);
    cur = cur.parent ? graph.nodes.find(n => n.id === cur!.parent) : undefined;
  }
  const result = computeContrast(node, chain, opts.wcag);
  return { ratio: result.ratio, passes: result.passes };
}
```

(Lookup-by-id is O(N); better to build the lookup once per scene-query if we end up using it more.)

### 2.6 Tests

Three test files, raised target counts:

**`__tests__/observer/token-resolution.test.ts`** — unit tests for `resolveTokenUsage`:
- Single match: every tier (3 cases)
- Multi match: same value matches tier 1 + tier 2 → returns lowest-tier as `resolvedToken`, both in `candidates`
- No match: tier 0, candidates empty
- Property not in our list: not in output
- Color normalization round-trip: `#dfff61` input → matches `--cg-brand-primary-500`
- Empty computed style: empty output
- Missing manifest entries (synthetic): handled
- Target: **25+ tests**

**`__tests__/integration/token-resolution-integration.test.ts`** — full pipeline (DOM → scan → tokenUsage):
- Real-DOM injected `<style>` blocks with `--cg-*` custom props applied to elements
- Inline style with var() reference
- Inheritance through nested elements
- Shadow-root scoped tokens (open shadow root)
- Target: **15+ tests**

**`__tests__/helpers/contrast.test.ts`** — WCAG 2.1 conformance:
- Black on white: 21:1, passes all
- White on white: 1:1, fails all
- WebAIM-published reference values for at least 5 known color pairs
- All four WCAG levels with values just-above and just-below threshold
- Transparent foreground over colored bg: inherit from ancestor
- Transparent ALL the way up: defaults to white, sets inferredBackground flag
- Hex / rgb / rgba inputs all work
- Target: **20+ tests**

Total Phase 2 tests: **60+ new tests** in lens-core.

### 2.7 Performance check

After tests pass, add a microbenchmark to `packages/lens-core/src/__tests__/integration/token-resolution-integration.test.ts`:
- Build a synthetic scene with 5000 nodes
- Time `scan(root)` 50× and assert p95 < 50ms (Spec §7.1)

### 2.8 Done when

- All token-resolution + contrast tests pass
- `pnpm --filter @cognivo/lens-core test` ≥ 227 (167 baseline + 60 new)
- `tier: 0` flows through to `tokenUsage[]` for off-grid values
- `scene.tokenViolations()` and `scene.contrast()` no longer throw
- Performance microbenchmark passes
- `pnpm --filter @cognivo/lens-core build` succeeds; bundle size delta logged

**Commit C2.2** at this milestone.

---

## Phase 3 — `@cognivo/lens-pack-core` v0.2.0 (C2.3)

### 3.1 Six new rules

Each follows the established pattern (defineRule, RULE_ID export, fixtures, test). Group by area:

**Tokens (5)**
1. `core/tokens/tier1-palette-color` — fires when `tokenUsage.tier === 1` AND property ∈ (color, background-color, border-color, outline-color, fill, stroke) AND `resolvedToken` matches `^--cg-(gray|red|orange|...)-`. Severity: strong. Confidence: 95.
2. `core/tokens/tier1-brand-color` — same shape but matches `^--cg-brand-`. Severity: strong. Confidence: 95.
3. `core/tokens/raw-color-no-token` — fires when `tokenUsage.tier === 0` AND property is in the color set AND `rawValue` is not transparent / inherit / currentColor / a system color. Severity: consider. Confidence: 88. (Lower confidence because some raw colors are intentional — e.g., scrollbar overrides.)
4. `core/tokens/background-as-foreground` — fires when property ∈ (color, border-color, outline-color, fill, stroke) AND `resolvedToken?.includes('-background-')`. CLAUDE Semantic Rule 1. Severity: strong. Confidence: 92.
5. `core/tokens/missing-component-tier3-token` — fires when property is in (border-radius, height, padding-*, min-height, max-height) AND a tier-3 token exists for the (component-tag, property) pair AND `resolvedToken` is not that tier-3 token. Advisory only. Severity: consider. Confidence: 75.

**Contrast (1)**
6. `core/a11y/text-contrast-below-AA` — fires when text node's `scene.contrast(node, { against: 'background', wcag: 'AA' })` returns `passes: false` AND the text is non-empty. Includes ratio in `message`. Severity: blocker. Confidence: 90.

### 3.2 Test bar

Each rule ≥ 5 fixtures (positive + negative + edge × 2 minimum). Plus integration test verifying all 6 fire on a multi-violation page.

Target: **30+ new fixture tests** in lens-pack-core. Total: 86 + 30 = **116+**.

### 3.3 Pack version + barrel

- Bump `packages/lens-pack-core/package.json` to `0.2.0`
- Add 6 lazy imports in `pack.ts`
- Add 6 named exports in `index.ts`
- Update README rule table + remove the "Deferred to later versions" entries that just landed

### 3.4 Done when

- All new rule tests + integration test pass
- `pnpm --filter @cognivo/lens-pack-core test` ≥ 116
- Bundle still healthy: 23 chunks (was 17), each rule own file
- Pack-end-to-end integration test surfaces all 6 new rule IDs on the multi-violation fixture
- Demo page (`docs/src/pages/lens/demo.astro`) re-runs and shows the new findings without code change (zero-coupling proof)

**Commit C2.3** at this milestone.

---

## Phase 4 — Cross-package sweep + roadmap update

After all 3 commits land:

1. `pnpm --filter "@cognivo/tokens" --filter "@cognivo/lens-core" --filter "@cognivo/lens-pack-core" --filter "@cognivo/docs" test type-check build` — everything green simultaneously.
2. Fire up `pnpm --filter @cognivo/docs dev`, visit `/lens/demo`, take a screenshot for the audit log. Verify the new token findings appear.
3. Update [`docs/superpowers/plans/2026-04-29-lens-v1-roadmap.md`](2026-04-29-lens-v1-roadmap.md) to mark C2 + C3 complete.
4. Run a mini playbook check on the new code (Pattern 53 spans should already be inherited; new things to check: Pattern 49 structured outputs on contrast result, Principle 10 communicate-limitations on tier-3 advisory rule).

Optional: write a follow-up audit doc if any new gap surfaces.

---

## Working principles for this sub-project

- **Best, not easiest.** The user's explicit nudge. Where I have a choice, pick the path that reads better six months from now, even if it costs more code today.
- **TDD per phase.** Failing test first, even for the manifest builder.
- **Commit at clean checkpoints, not faster.** Three commits, three coherent units. Don't squash.
- **No silent fallbacks in the manifest builder.** Unknown token names throw at build time. Invalid color forms throw. The build is the place to fail loudly.
- **Cross-env honesty.** Tests run under happy-dom + jsdom. If a feature only works in real browsers, document it; don't pretend otherwise.
- **No new runtime dependencies.** Color normalization, var-chain resolution, contrast math: all hand-rolled. (Build-time scripts may use Node stdlib only.)
- **Honest deferrals.** `color-mix()`, `oklch()`, `calc()` — if not in current tokens, document as a known gap; don't preemptively support.

---

## Estimated effort

| Phase | Work | Tests | Time |
|---|---|---|---|
| Phase 1 (tokens manifest) | ~400 lines build script + normalizer + drift gate | 50+ | 0.5 day |
| Phase 2 (lens-core resolution + contrast) | ~500 lines (resolution module, contrast helper, scene-query wiring) | 60+ | 1.0 day |
| Phase 3 (pack-core 6 rules) | ~600 lines (6 rules + fixtures + tests) | 30+ | 0.5 day |
| Phase 4 (sweep + roadmap update) | docs only | — | 0.25 day |
| **Total** | ~1500 lines code, 140+ new tests | | **~2.25 days** |

Slightly higher than the spec's "~2 days" estimate because the upgrades to "best" (typed manifest + drift gate + exhaustive tier classifier + full WCAG levels + raised test counts) cost ~25% more.

---

## What this plan explicitly does NOT cover

- Provenance tracking (Approach E in the spec). Defer; design doc + code stay extension-friendly.
- `oklch()` / `color-mix()` resolution. Defer until tokens use them.
- Contrast for non-text elements (focus rings on icon buttons, etc.). v1 is text contrast only. Document as known gap.
- Cross-origin stylesheets. Approach D doesn't read stylesheets; moot.
- Browser extension auto-injection of tokens CSS. Demo page imports `@cognivo/tokens/dist/index.css` directly via the existing docs build chain.
