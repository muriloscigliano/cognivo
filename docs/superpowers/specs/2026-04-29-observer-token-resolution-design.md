# Observer Token Resolution — Design

> **Sub-project:** roadmap C2 — populate `SceneNode.tokenUsage[]` so the deferred token rules in `@cognivo/lens-pack-core` can fire.
> **Status:** brainstorm + spec (pre-implementation). Awaiting user direction on Approach (§4).
> **Parent:** [`2026-04-29-lens-v1-roadmap.md`](../plans/2026-04-29-lens-v1-roadmap.md).

---

## 1. Problem statement

Today, `lens-core/src/observer/scan.ts:131` hardcodes:
```ts
tokenUsage: [], // Token detection lands in a later phase.
```

5 rules in pack-core are deferred behind that line:
- `core/tokens/tier1-palette-color`
- `core/tokens/tier1-brand-color`
- `core/tokens/raw-color-no-token`
- `core/tokens/background-as-foreground` (CLAUDE Semantic Rule 1)
- `core/tokens/missing-component-tier3-token`

Plus `scene.tokenViolations()` and `scene.contrast()` currently throw — they're API stubs that need backing.

Without this work, Cognivo Lens can't actually flag the design-system violations that are arguably its core differentiator vs generic a11y linters. Spec §1.2 says exactly this: "Token-governed → a11y is table-stakes; *token tier governance* is the moat."

---

## 2. What the rules actually need

A useful first principle, because it changes the shape of what we build.

### 2.1 The naive read of the requirement
"Detect when a developer wrote `var(--cg-gray-500)` in component CSS." That's syntax-level — what you'd write an ESLint rule for. (And in fact `eslint-plugin-cognivo` already does that.)

### 2.2 The actual read
Lens runs against the **rendered page**, not source. `getComputedStyle()` returns *resolved* values — `rgb(113, 113, 122)`, never `var(--cg-gray-500)`. By the time Lens sees it, the var-chain has been collapsed.

So the rule's real question is:
> "Does this rendered property's value sit at the right tier of the token graph?"

Reframed:
- `tier1-palette-color` fires when `color: rgb(113, 113, 122)` matches the resolved value of `--cg-gray-500` AND that value is *not* the resolved value of any tier-2 semantic token (`--cg-color-*`) AND not a tier-3 component token (`--cg-component-*`). Translation: the value lands directly on a tier-1 palette primitive, skipping the semantic layer.
- `raw-color-no-token` fires when `color: rgb(255, 0, 0)` matches **no** token's resolved value. Translation: it's a magic number.
- `background-as-foreground` fires when the resolved value of `color:` matches a token whose name contains `-background-`. We don't need to know the original `var()` — we just need the value-to-token reverse map.

**Conclusion: rules want a value-to-token reverse-map plus a tier classification per token.** They do NOT need to know which `var()` the developer wrote. This re-frames the problem from "stylesheet-walk and selector-matching" (which is a nightmare across shadow DOM) to "compute reverse-maps once, look up rendered values per element" (which is straightforward).

### 2.3 The exception: tier-3 component tokens

`missing-component-tier3-token` is different. It fires when a `cg-button` has `border-radius: 8px` written raw (or via a tier-1 token like `--cg-border-radius-100`) when a tier-3 token exists (`--cg-component-button-radius-md`). For this rule we need to know:
1. Does this element have a tier-3 token defined for this property?
2. Was that token used?

Both questions are answerable from the reverse-map approach: if the resolved value matches the tier-3 token's value, it was effectively used. The rule can be advisory ("you got the right value, but consider the tier-3 token name for clarity") rather than strict.

---

## 3. Candidate approaches

Five distinct shapes, with honest pros/cons.

### Approach A — Style-attribute scan
Read `el.getAttribute('style')`, regex for `var(--cg-*)` patterns.

- ✓ Trivial code, trivial cost.
- ✗ Misses 99% of real usage. Cognivo components apply tokens via shadow `<style>` blocks, never inline `style`. Inline `style` is for runtime overrides.
- **Verdict:** Insufficient by itself.

### Approach B — Custom-property introspection
For each element, query each known `--cg-*` custom property with `getComputedStyle(el).getPropertyValue('--cg-…')` to learn its resolved value in scope.

- ✓ Reliable across browsers (real DOM); resolves the full var() chain for each token.
- ✓ Cheap once you know the list of tokens (one `getComputedStyle()` call already exists per element).
- ✗ Tells you what's *available* in scope, not what's *consumed* by which property. Doesn't directly answer "which token did `color:` resolve to."
- **Verdict:** Useful as a complement (gives token-value resolution per element) but doesn't solve the core question.

### Approach C — Full stylesheet walk + cascade match
Iterate `document.styleSheets` + each shadow root's `adoptedStyleSheets` and `<style>` children. For each rule, get the selector, check element matches, parse declarations to extract `var(--cg-*)` references.

- ✓ Authoritative — answers exactly which token was consumed by which property.
- ✗ ~400 lines of complex code. Cross-origin stylesheets throw on `cssRules` access. Selector matching across shadow boundaries is non-trivial. Cost: O(elements × declarations) — a Cognivo page has thousands of declarations.
- ✗ Real browser only. jsdom + happy-dom partially support `cssRules` but flake on shadow `adoptedStyleSheets`.
- **Verdict:** The "right" answer if we needed exact var-chain provenance. We don't. (See §2.)

### Approach D — Hybrid (B + reverse-map lookup)
Build a reverse-map at engine init: `Map<resolvedValue, tokenName[]>` from a global token table (sourced from `@cognivo/tokens`). For each element, query computed `color`, `background-color`, `border-color`, etc., look up in the reverse-map.

- ✓ Cheap. Once-per-engine setup; per-element cost is just map lookups.
- ✓ Works in jsdom + happy-dom + real browser identically — `getComputedStyle` is widely supported.
- ✓ Doesn't care which `var()` the author wrote — answers the rule's actual question (§2.2).
- ✗ Ambiguous when a value matches multiple tokens. E.g., `--cg-color-action-primary-background-default` and `--cg-brand-primary-500` resolve to the same `#dfff61`. We surface BOTH and let the rule pick the strongest (lowest-tier) match.
- ✗ Doesn't catch case where author wrote `color: #71717a` directly vs. `color: var(--cg-gray-500)`. Both produce the same value. **But this is a feature, not a bug** — the rule about tier discipline is about WHERE THE VALUE LANDS, not how the author wrote it. (See §2.2 again.)
- **Verdict:** This is the recommendation.

### Approach E — Approach D + selective Approach C
Hybrid, but layer in Approach C only for the rules that genuinely need provenance (none in pack-core v0.1, but the conversion + ethics packs may surface some). Keep it as a deferred capability: a `scene.tokensProvenance(node, prop)` helper that, when called, walks stylesheets just for that one element-property pair.

- **Verdict:** Yes — D for now, E as a future extension. No code change needed today; just leave the door open with an unimplemented helper.

---

## 4. Recommended approach: D (hybrid B + reverse-map)

### 4.1 Pieces

1. **Token table** — sourced from `@cognivo/tokens`. A flat list of every `--cg-*` token with:
   - `name` (e.g., `--cg-color-action-primary-background-default`)
   - `tier` (1 / 2 / 3, derived from the name pattern)
   - `category` (`color` / `spacing` / `radius` / `font-size` / etc., derived from name)
   - `resolvedValue` — the leaf value after all `var()` chains resolve

2. **Reverse-map builder** — runs once at engine init or on `scan()` first call:
   - `Map<normalizedValue, TokenEntry[]>` indexed by resolved value (e.g., `rgb(223, 255, 97)` → `[--cg-color-action-primary-background-default, --cg-brand-primary-500]`)
   - Sorted within each bucket by tier (lower tier first), so callers get the most-specific match.

3. **Per-element token-usage walker** — runs inside `scan()`:
   - For each property in the existing `DEFAULT_RELEVANT_PROPERTIES` list, normalize the computed value and look up in the reverse-map.
   - Emit a `TokenUsage` entry: `{ tier, property, rawValue, resolvedToken? }`.

4. **`scene.tokenViolations({ tier })` and `scene.contrast()` wiring**:
   - `tokenViolations({ tier: 1 })` → walk all nodes, return entries whose `tokenUsage[].tier === 1` AND whose property is in the colors set.
   - `contrast(node, { against, wcag })` → compute WCAG ratio between `color` and `background-color` (resolved values), cross-check against `wcag` threshold, return `{ ratio, passes }`.

### 4.2 Where the token table comes from

`@cognivo/tokens` already ships [packages/tokens/dist/index.css](../../packages/tokens/dist/index.css) — 2,688 `--cg-*` declarations in a single CSS file. We have two options to derive the table:

**Option 1 — Parse the CSS at build time.** Add a small `packages/tokens/src/manifest.ts` script that parses `dist/index.css`, builds the JSON manifest, exports it from a new `@cognivo/tokens/manifest` subpath. Lens-core consumes that.

**Option 2 — Resolve at runtime via Approach B.** On engine init, query `getComputedStyle(document.documentElement)` for each known token name. Trade-off: needs the list of token names from somewhere. Could ship that list in the manifest while resolved values come from runtime.

**Recommendation: Option 1.** Static manifest. Predictable, testable, doesn't depend on the page having loaded `@cognivo/tokens/dist/index.css`. A small content-hash on the manifest tells consumers when to invalidate the reverse-map cache.

The manifest shape:
```ts
export interface TokenEntry {
  name: string;           // '--cg-color-action-primary-background-default'
  tier: 1 | 2 | 3;        // derived from name pattern
  category: 'color' | 'spacing' | 'radius' | 'font-size' | 'border-width' | 'opacity' | 'line-height' | 'icon-size' | 'transition' | 'shadow' | 'other';
  resolvedValue: string;  // 'rgb(223, 255, 97)' — color values stored normalized
  varChain: string[];     // ['--cg-color-action-primary-background-default', '--cg-brand-primary-500']
}

export const tokenManifest: TokenEntry[] = [...];
```

`tier` derivation:
- `^--cg-component-` → tier 3
- `^--cg-color-` (followed by purpose+state) → tier 2
- `^--cg-shadow-`, `^--cg-overlay-` → tier 2 (semantic shadows/overlays)
- everything else (`--cg-gray-*`, `--cg-spacing-*`, `--cg-brand-*`, etc.) → tier 1

`category` derivation: regex on prefix.

`resolvedValue` requires resolving `var()` chains — small recursive function during parse.

### 4.3 Color value normalization

Browsers serialize colors differently (`rgb(0, 0, 0)`, `rgb(0,0,0)`, `#000000`, `#000`, `black`). We normalize to `rgb(R, G, B)` or `rgba(R, G, B, A)` before lookup. Small helper, ~30 lines, no library.

### 4.4 What lands on each `SceneNode`

Per existing `TokenUsage` type (already in `scene-graph.ts`):
```ts
interface TokenUsage {
  tier: 1 | 2 | 3;
  property: string;       // 'color', 'background-color', etc.
  rawValue: string;       // normalized computed value
  resolvedToken?: string; // best matching token name (lowest tier)
}
```

We populate this for each property in `DEFAULT_RELEVANT_PROPERTIES` whose value matches a known token. **Properties whose value matches no token also emit an entry, with `resolvedToken: undefined`** — that's how `raw-color-no-token` finds them.

---

## 5. Risks and mitigations

| Risk | Likelihood | Mitigation |
|---|---|---|
| `@cognivo/tokens` doesn't export a manifest yet | certain | Create one in this sub-project. Small added scope. |
| happy-dom doesn't load the tokens CSS, so `getComputedStyle()` returns blank for `color` etc. | high | Engine doesn't depend on `@cognivo/tokens` being loaded into the page. The manifest is bundled; reverse-map works without the CSS file being present at scan time. |
| Same value matches multiple tokens (`--cg-brand-primary-500` and `--cg-color-action-primary-background-default` both resolve to `#dfff61`) | certain | TokenEntry array sorted by tier ascending; we report the most-specific (lowest-tier) match as `resolvedToken`, but keep all matches in a `candidates[]` field if rules need it. |
| Color-mix and CSS calculations (`color-mix(in oklch, …)`, `calc(8px + 2px)`) | medium | v1: skip — these don't appear in current tokens. Document as a known gap. v2: pre-resolve in the manifest builder. |
| Token table goes stale when `@cognivo/tokens` updates | low | Manifest is regenerated on `pnpm --filter @cognivo/tokens build`. lens-core peer-deps on tokens; semver bump cascades. |
| Performance: per-element reverse-map lookup × 28 properties × 5000 nodes = 140k lookups | low | Map lookup is O(1). Total cost: single-digit milliseconds on a 5k-node page. Within Spec §7.1's 50ms p95 budget. |
| Selector matching across shadow boundaries (Approach C concern) | N/A | Approach D dodges this entirely. |

---

## 6. Sub-tasks (rough plan, formal plan after this is approved)

1. **`@cognivo/tokens` — add manifest export**
   - New `packages/tokens/src/build-manifest.cjs` (or .mjs): parses `dist/index.css`, builds manifest, writes `dist/manifest.json` + `dist/manifest.js` + `dist/manifest.d.ts`.
   - Hook into existing build script.
   - Add `manifest` subpath to `package.json` `exports`.

2. **`@cognivo/lens-core` — token-resolution module**
   - `src/observer/token-resolution.ts`: reverse-map builder + per-element lookup.
   - `src/helpers/scene-query.ts`: implement `tokenViolations()` (currently throws).
   - `src/helpers/contrast.ts`: WCAG ratio + `scene.contrast()` impl.
   - Wire into `scan()` → populate `tokenUsage[]`.
   - Tests: 30+ for the reverse-map builder, ~15 for the per-element walker, ~10 for `contrast()`.

3. **`@cognivo/lens-pack-core` — uncomment the deferred rules**
   - Add the 5 token rules + 1 contrast rule (already specified in pack-core v0.2 design intent).
   - Bump pack-core to 0.2.0.
   - Tests: ~30 fixture tests.

Each sub-task is its own commit boundary.

---

## 7. Out of scope for this sub-project

Explicit cuts so we don't drift:

- **Provenance tracking** (which `var()` the author wrote). Defer to Approach E if the conversion or ethics packs need it.
- **`color-mix()`, `calc()`, dynamic gradients.** Not present in current tokens. Add when they land in `@cognivo/tokens`.
- **Cross-origin stylesheets.** Approach D doesn't read stylesheets at all; this is moot.
- **The `scene.first()` / `*[role=…]` API gap fixes** — already shipped in C0.
- **The 5 rules themselves.** This sub-project ends when `tokenUsage` is populated and `scene.tokenViolations()` + `scene.contrast()` work. Adding the rules is the C3 commit.

---

## 8. Open questions for the user

These need an answer before I start coding. Each is a fork in the road:

### Q1. Tokens manifest location

**(a)** New file `packages/tokens/src/build-manifest.mjs`, hook into `pnpm --filter @cognivo/tokens build`. Adds `dist/manifest.{json,js,d.ts}` + new subpath export.
**(b)** Generate the manifest inside lens-core at engine boot by fetching the tokens CSS file. Slower start, no tokens-package change.

**My recommendation: (a).** Static is testable. (b) couples lens-core to runtime CSS loading.

### Q2. Color normalization strategy

When a token resolves to `#dfff61`, browsers may compute `rgb(223, 255, 97)` or keep the hex form depending on context (CSS Custom Properties use the longest-form output). We normalize before reverse-lookup.

**(a)** Small ~30-line normalizer that handles `#rgb`, `#rrggbb`, `#rgba`, `#rrggbbaa`, `rgb()`, `rgba()`, `hsl()`, `hsla()`, named colors. Hand-rolled.
**(b)** Use `culori` (small npm package) for parse-and-normalize.

**My recommendation: (a).** Hand-rolled is ~30 lines, no new dep, fits in lens-core's "zero deps except @cognivo/core peer" stance. `culori` is overkill for our 8 input formats.

### Q3. Multi-match ambiguity reporting

When `rgb(223, 255, 97)` matches both `--cg-brand-primary-500` (tier 1) AND `--cg-color-action-primary-background-default` (tier 2):

**(a)** Report only the lowest-tier match as `resolvedToken`. Cleanest. Loses information.
**(b)** Add a `candidates: string[]` field to `TokenUsage` for all matches; `resolvedToken` is still the best one. Slightly heavier per-node payload.

**My recommendation: (b).** The rule for `tier1-palette-color` needs to know "is this *also* a tier-1 match?" because that's what makes it a violation. Without `candidates`, we'd lose that info. Cost is small — typically 1-3 tokens per value.

### Q4. Where does the contrast helper live?

`scene.contrast()` is currently a method on the `SceneQuery`. Internally it needs:
- Computed `color` of the node
- Computed `background-color` of the node OR the nearest ancestor with a non-transparent background
- WCAG ratio formula

**(a)** Implement directly in `helpers/scene-query.ts`. Adds ~80 lines.
**(b)** New file `helpers/contrast.ts` exporting `computeContrast(node, ancestorChain)`; `scene.contrast()` is a thin wrapper.

**My recommendation: (b).** Contrast logic is non-trivial (WCAG formula, ancestor walk, transparency handling). Separate file is clearer.

### Q5. Scope: is contrast in C2 or deferred to C3?

Phase 3 (C3 — token rules in pack-core v0.2) lists `core/a11y/text-contrast-below-AA` as a candidate. That rule needs `scene.contrast()`. Either:

**(a)** Land contrast helper in C2 (this sub-project) so `scene.contrast()` no longer throws. Adds ~150 lines to C2.
**(b)** Defer contrast to C3 alongside the rule that uses it. Keeps C2 focused.

**My recommendation: (a).** The roadmap lists it as part of C2 scope, and the contrast helper is a natural sibling to token resolution (both are "what value did this property actually land on?"). Keeping them together simplifies the spec for C3.

---

## 9. If approved, what changes

Once the user picks answers to Q1–Q5, I'll write the formal implementation plan as `docs/superpowers/plans/2026-04-29-observer-token-resolution-implementation.md` (TDD-phased), then start coding.

**Estimated effort given the recommendations above:**
- C2.1 (tokens manifest): ~half day
- C2.2 (lens-core resolution + contrast): ~1 day
- C2.3 (`scene.tokenViolations` + `scene.contrast` wiring): ~half day
- Total: **~2 days** for C2 as a unit.

C3 (the rules themselves) lands on top in another half-day.

---

*This is a brainstorm doc — its job is to make the trade-offs visible, not to prescribe. The real work doesn't start until §8 is answered.*
