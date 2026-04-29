# Lens Pack Core — v1 Design

> **Sub-project:** `@cognivo/lens-pack-core` — the first rule pack consumed by `@cognivo/lens-core`.
> **Parent spec:** [`2026-04-28-cognivo-lens-design.md`](2026-04-28-cognivo-lens-design.md) §4.3.
> **Status:** spec.

---

## 1. Purpose

Ship the foundational rule pack that the Lens engine evaluates by default — the rules everyone gets without opting in to anything. This is the pack that turns `lens-core` from "an engine that evaluates zero rules" into "an engine that produces real findings on real pages."

Two outcomes:
1. **End-user value.** A site running Lens with the core pack alone surfaces a useful baseline of accessibility + system-health findings.
2. **API validation.** Authoring 14 rules against the existing `defineRule` / `definePack` / `RuleEngine` surfaces every ergonomic gap. Anything awkward gets fixed in `lens-core` while the engine is still malleable.

## 2. Scope discipline (what changed from the parent spec)

The parent spec promised "~25 cheap rules: tokens, a11y, state coverage, focus" for this pack. The honest v1 scope is **14 rules** that all fire end-to-end today, plus a small Observer enhancement.

**Why the cut:**

The parent spec's token rules (tier-1 palette, raw-color-no-token, background-as-foreground, etc.) all depend on `SceneNode.tokenUsage` being populated. Today, `Observer.scan()` in `lens-core/src/observer/scan.ts:131` hardcodes `tokenUsage: []` with the comment "Token detection lands in a later phase." Shipping rules whose detect() always returns nothing is worse than shipping fewer rules — it's dead code that gives users false confidence.

**Deferred to v1.1** (own sub-project, after Observer ships token resolution):
- `core/tokens/tier1-palette-color`
- `core/tokens/tier1-brand-color`
- `core/tokens/raw-color-no-token`
- `core/tokens/background-as-foreground` (Semantic Rule 1)
- `core/tokens/missing-component-tier3-token`
- `core/focus/missing-visible-focus-ring` (needs reliable computed-style introspection of `:focus-visible` styles)
- "State coverage" rules (most are build-time concerns better encoded as ESLint rules in `eslint-plugin-cognivo`, not runtime page audits)

**Kept in v1** because they fire today on the data Observer already produces:
- 10 a11y rules (read `attributes`, `role`, `text`, `visible`, `tag`)
- 1 focus rule (reads `attributes`)
- 3 system-health rules (one of which requires a 1-line Observer change to also capture `transition` in default computed-style properties)

## 3. Architecture

### 3.1 Package layout

```
packages/lens-pack-core/
├── package.json
├── tsconfig.json
├── tsconfig.test.json
├── vite.config.ts
├── vitest.config.ts
├── README.md
└── src/
    ├── index.ts             ← barrel: exports pack + every rule
    ├── pack.ts              ← definePack(...) with lazy rule imports
    ├── rules/
    │   ├── a11y/
    │   │   ├── landmark-without-name.ts
    │   │   ├── img-without-alt.ts
    │   │   ├── button-without-name.ts
    │   │   ├── link-without-name.ts
    │   │   ├── input-without-label.ts
    │   │   ├── dialog-without-name.ts
    │   │   ├── heading-skipped-level.ts
    │   │   ├── positive-tabindex.ts
    │   │   ├── aria-hidden-focusable.ts
    │   │   └── duplicate-id.ts
    │   ├── focus/
    │   │   └── disabled-with-tabindex.ts
    │   └── system-health/
    │       ├── transition-all.ts
    │       ├── closed-shadow-root-unauditable.ts
    │       └── cg-component-no-manifest.ts
    └── __tests__/
        ├── smoke.test.ts
        ├── a11y/
        │   └── (one .test.ts per rule)
        ├── focus/
        │   └── disabled-with-tabindex.test.ts
        ├── system-health/
        │   └── (one .test.ts per rule)
        └── integration/
            └── pack-end-to-end.test.ts
```

**Why one file per rule, not one big file**: rules ship as `() => import('...')` lazy chunks. One file per rule means one chunk per rule, so disabling rules in `lens.config.ts` truly skips that code from the bundle.

### 3.2 Public API

```ts
// Default export: the pack itself, ready for engine.register()
import corePack from '@cognivo/lens-pack-core';
import { RuleEngine } from '@cognivo/lens-core';

const engine = new RuleEngine();
await engine.register(corePack);

// Named exports: individual rules for testing or composition
import { imgWithoutAlt } from '@cognivo/lens-pack-core';
```

### 3.3 Dependencies

- **Peer:** `@cognivo/lens-core` (workspace) — engine + `defineRule` / `definePack` / types
- **Dev:** TypeScript, vite, vitest, happy-dom, vite-plugin-dts
- **Runtime:** zero — pack manifest + rule modules, all written in TypeScript with no runtime libs

### 3.4 Observer enhancement (Phase 0 of plan)

Add `transition` and `transition-property` to `DEFAULT_RELEVANT_PROPERTIES` in `packages/lens-core/src/observer/scan.ts`. Required by `core/system-health/transition-all`. No other Observer changes; token-resolution stays deferred.

## 4. Rule inventory (14 rules)

### Conventions

- **id format:** `core/{category}/{kebab-case-name}` — matches the spec's `cog/anchoring/...` pattern
- **citations:** WCAG SC IDs (`wcag/2.1/SC1.1.1`), Semantic Rule numbers (`cognivo/semantic-rule-1`), or Cognivo principle IDs (`cognivo/principle-9`)
- **fixCategory:** mostly `codeable` (attribute-set) or `judgment` (a heading skip can't be auto-fixed without a content decision)
- **defaultEnabled:** `true` for everything — this pack is "on by default"
- **intentScope:** `[]` (empty = applies to all intents)
- **cost:** all `cheap`

### A — Accessibility (10)

| # | Rule id | Severity | What it detects | Fix kind |
|---|---|---|---|---|
| A1 | `core/a11y/landmark-without-name` | strong | `role` ∈ {region, navigation, complementary, banner, contentinfo, search, form} AND no `aria-label` / `aria-labelledby` | attribute-set |
| A2 | `core/a11y/img-without-alt` | blocker | `<img>` without an `alt` attribute (empty `alt=""` is allowed — it's the decorative-image opt-out) | attribute-set |
| A3 | `core/a11y/button-without-name` | blocker | `<button>` or `[role=button]` with empty visible text AND no `aria-label` / `aria-labelledby` | attribute-set |
| A4 | `core/a11y/link-without-name` | blocker | `<a>` (visible) with empty visible text AND no `aria-label` / `aria-labelledby` | attribute-set |
| A5 | `core/a11y/input-without-label` | blocker | `<input>` of type text/email/password/search/tel/url/number AND no `aria-label`, no `aria-labelledby`, no enclosing/associated `<label>` | restructure |
| A6 | `core/a11y/dialog-without-name` | strong | `<dialog>` or `[role=dialog]`/`[role=alertdialog]` without a name | attribute-set |
| A7 | `core/a11y/heading-skipped-level` | consider | `h{N}` appears in document order without a preceding `h{N-1}` (e.g., h3 with no h2 before it in scope) | restructure |
| A8 | `core/a11y/positive-tabindex` | strong | Any element with `tabindex` parsing to integer > 0 | attribute-set |
| A9 | `core/a11y/aria-hidden-focusable` | blocker | `aria-hidden="true"` AND (a focusable tag OR `tabindex >= 0`) | attribute-set |
| A10 | `core/a11y/duplicate-id` | strong | Two or more elements share the same `id` value | attribute-set |

### F — Focus (1)

| # | Rule id | Severity | What it detects | Fix kind |
|---|---|---|---|---|
| F1 | `core/focus/disabled-with-tabindex` | strong | Element with `disabled` or `aria-disabled="true"` AND `tabindex >= 0` (disabled controls must not be tabbable) | attribute-set |

### H — System health (3)

| # | Rule id | Severity | What it detects | Fix kind |
|---|---|---|---|---|
| H1 | `core/system-health/transition-all` | consider | `computedStyle.transition` or `transition-property` includes `all` (CLAUDE.md ban — enumerate properties) | css-injection |
| H2 | `core/system-health/closed-shadow-root-unauditable` | consider | `hasClosedShadowRoot === true` (engine cannot audit closed shadow roots) | judgment |
| H3 | `core/system-health/cg-component-no-manifest` | consider | tag matches `cg-*` or `ai-*` AND `componentManifest === undefined` (component published without a manifest) | judgment |

## 5. Quality bar

- **Every rule has ≥1 positive fixture (expects finding) + ≥1 negative fixture (expects no finding).** Edge fixtures where the rule has nuance.
- **All rules:** TS strict (`exactOptionalPropertyTypes` + `noUncheckedIndexedAccess`) clean.
- **All rules:** test passes via `runFixture(rule, fixtureSpec)` from `@cognivo/lens-core/fixtures`.
- **Pack-level integration test:** registers pack, evaluates a multi-violation fixture, asserts findings appear with correct rule IDs and severities.
- **Bundle size ceiling:** ≤ 20 KB minified (≤ 6 KB gzip) for the pack manifest + all eagerly-loaded code. Lazy chunks add per-rule cost only when enabled.

## 6. Citations strategy

| Citation prefix | Source | Example |
|---|---|---|
| `wcag/2.1/SC{N.N.N}` | W3C WCAG 2.1 Success Criterion | `wcag/2.1/SC1.1.1` (Non-text Content) |
| `wai-aria/{role}` | WAI-ARIA Authoring Practices | `wai-aria/button` |
| `cognivo/semantic-rule-{N}` | `CLAUDE.semantic-rules.md` rule N | `cognivo/semantic-rule-9` (landmarks need names) |
| `cognivo/token-guardrails` | `CLAUDE.token-guardrails.md` | (used by H1) |

Citations are opaque strings to the engine; the UI maps them to URLs / explainers later.

## 7. Non-goals (v1)

- **No LLM rules.** All rules are `cost: 'cheap'`. (LLM rules ship in `lens-pack-conversion`.)
- **No bias-engagement rules.** That's the conversion + ethics packs.
- **No fix application.** Rules emit `fixHint`s (suggestions); applying them is the job of `lens-ui` + MCP, not this pack.
- **No persona modulation.** Personas live in `lens-pack-personas` and apply weight overrides at the engine level.
- **No `tokenUsage`-dependent rules.** Deferred until Observer ships token resolution.
- **No contrast rules.** Needs `scene.contrast()` (currently throws) — depends on color-resolution helpers in `@cognivo/tokens`.

## 8. Versioning

- Pack version starts at `0.1.0` (matches lens-core's pre-release line).
- Bump rules: tightening a threshold = minor; removing a rule or breaking a citation = major.
- Engine compatibility: pack peer-depends on `@cognivo/lens-core@workspace:*` during dev; on publish, pin to `^0.1.0` of the engine.

## 9. Out of scope for this spec (explicit)

- Documentation for individual rules in the docs site — that's a docs sub-project.
- Translation strings for `message` / `why` — v1 is English-only.
- Telemetry from the pack — that's an engine concern, not the pack's.
- Configuration schema (`pack.config`) — no per-pack config in v1; rule overrides via `lens.config.ts` are sufficient.
