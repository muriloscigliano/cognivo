# Cognivo Lens — Design Spec

> **Status:** Draft v1 · **Date:** 2026-04-28 · **Owner:** dev@murilo.design
>
> **One-line:** *DevTools for cognitive UX.* A live in-page agent that watches the rendered site, scores its persuasive power, accessibility, and design-system health, draws highlight overlays on problem areas, and ships fixes back to the codebase.

This spec is a **construction manual** grounded in `muriloscigliano/ai-playbook`. Each section cites the playbook patterns it inherits from. The Pattern Map (Appendix A) is the canonical cross-reference.

---

## Table of Contents

1. [Vision & Positioning](#1-vision--positioning)
2. [Goals & Non-Goals](#2-goals--non-goals)
3. [Architecture](#3-architecture)
4. [Rule Pack Format & Plugin API](#4-rule-pack-format--plugin-api)
5. [Page-Intent Classifier](#5-page-intent-classifier)
6. [Lens Score Formula](#6-lens-score-formula)
7. [Performance Budget](#7-performance-budget)
8. [Persona Simulator](#8-persona-simulator)
9. [Closed-Loop Fix Flow](#9-closed-loop-fix-flow)
10. [Distribution, Versioning, Privacy, Telemetry](#10-distribution-versioning-privacy-telemetry)
11. [Testing Strategy](#11-testing-strategy)
12. [Rollout — 5 Phases](#12-rollout--5-phases)
13. [Anti-Patterns We Won't Fall Into](#13-anti-patterns-we-wont-fall-into)
14. Appendix A — [Pattern Map](#appendix-a--pattern-map)
15. Appendix B — [Design Principle Map](#appendix-b--design-principle-map)
16. Appendix C — [Open Questions & Deferred Decisions](#appendix-c--open-questions--deferred-decisions)

---

## 1. Vision & Positioning

### 1.1 The product

> *Cognivo Lens — the world's first cognitive-UX observer. It watches your interface, scores its persuasive power, accessibility, and design-system health — live — and ships fixes back to your codebase.*

The "Lens Score" (0–100) is the public, screenshotable artifact that gives the product its GTM hook, modeled on Lighthouse's score-as-product strategy.

### 1.2 What makes it Cognivo-defensible

Cognivo already owns three datasets that, individually, exist nowhere else in combination:

| Asset | Owned by | What it enables in Lens |
|---|---|---|
| 181 cognitive bias cards across 7 categories | `@cognivo/design-advisor` | Bias coverage rules + dark-pattern detection |
| 2,630 CSS variables, 3-tier token graph, `validateTokenUsage()` | `@cognivo/tokens` | Token compliance rules + token-aware fix suggestions |
| 183 components with manifests + `engagedBiasIds[]` | `@cognivo/components` | Component-aware bias detection (knows which biases each component engages) |
| Streaming + guardrails + caching + routing | `@cognivo/core` | Backbone for the Lens Agent and verifier |
| MCP server | `@cognivo/mcp-server` | The fix-flow bridge to Claude Code / Cursor / Windsurf |

**Lens is the connective tissue that turns these into a single product surface end users interact with.** It's not a new dataset; it's the missing UX over an existing one.

### 1.3 Competitive posture

| Tool | Audits perf? | Audits a11y? | Audits cognitive UX? | Closes the loop to code? |
|---|---|---|---|---|
| Lighthouse | ✅ | ✅ | ❌ | ❌ |
| axe-core | ❌ | ✅ | ❌ | ❌ |
| Galileo / v0 / Thesys | ❌ | ❌ | ❌ (generates UI; doesn't critique it) | ❌ |
| **Cognivo Lens** | partial | ✅ | ✅ (181 biases + dark patterns) | ✅ (preview → diff → MCP → PR) |

The defensible whitespace is the cognitive-UX dimension and the closed loop. Both are uniquely possible because Cognivo's other packages already exist.

### 1.4 Business model (summary; full details in §10)

- **Free OSS (Lens):** web component, observer, score, core rule packs. Drives adoption.
- **Pro:** custom rule packs, persona library, MCP fix flow, private projects.
- **Cloud:** team dashboards, score history, multiplayer, regression detection, SSO, audit logs.

Lens Score itself is *always free* — that's the GTM engine. Workflow around the score is the paid surface.

---

## 2. Goals & Non-Goals

### 2.1 Goals (what v1 must deliver)

1. **Live, in-page observation** of any rendered web page (with first-class support for Cognivo's shadow-DOM components).
2. **A defensible Lens Score** — public, mathematically transparent, date-pinned formula.
3. **Cognitive-UX critique no other tool offers** — bias coverage gaps, dark patterns, choice overload.
4. **Closed loop from observation to suggested code change**, gated by a deterministic verifier.
5. **Privacy-first defaults** — zero network calls in OSS unless user-configured.
6. **Performance discipline that lets Lens audit Lens** — strict bundle/CPU/memory budgets, CI-enforced.
7. **A platform-shaped plugin model** — rule packs and personas are versioned, distributable, community-extensible.

### 2.2 Non-goals (explicit cuts for v1)

- ❌ Browser extension (post-v1)
- ❌ Multiplayer / comments / team ownership (Cloud feature)
- ❌ Heatmap / session replay (post-v1; Persona Simulator covers 80% of "see it through their eyes" value)
- ❌ Auto-apply fixes (every fix is human-confirmed in v1)
- ❌ Auto-PR creation (manual confirmation only; auto in Cloud post-v1)
- ❌ Multi-agent or sub-agent architecture (one agent, with tools — playbook anti-pattern #1)
- ❌ Aesthetic / brand / taste judgment (we score structure, not subjectivity)
- ❌ Conversion-rate prediction (correlated, not equal — we say so explicitly)

### 2.3 Quality bar

- Classifier top-1 accuracy: ≥95% on `pricing/checkout/signup/signin`, ≥90% elsewhere
- Lens Stack mounts in <15ms p95 on host main thread
- Bundle size: ≤50KB gzipped (target 35KB)
- Audit pass: ≤200ms p95 on a 30-fixture page
- Privacy: zero outbound network calls in OSS by default (Playwright-asserted)
- Calibration: every PR shows score-impact on the golden set

---

## 3. Architecture

> Cites: Pattern 4 (Processor Pipeline), Pattern 36 (Workflow Patterns: Chain + Route + Parallelize), Pattern 76 (Bridge Pattern), Pattern 53 (Observability Spans).

### 3.1 Package layout — 4 packages from day one

```
packages/
├── lens-core/              # Pure logic: observer, classifier, rule API, scorer, agent runtime.
│                             Zero DOM-rendering deps. Testable in Node.
├── lens-ui/                # <cg-lens> web component, overlay, toolbar, agent drawer.
│                             Lit 3, Shadow DOM, depends on lens-core + tokens.
├── lens-rules/             # Bundled default rule packs (core / ethics / conversion / onboarding).
│                             Each pack is a folder; depends on lens-core types only.
└── lens-personas/          # Persona library + simulator runtime.
                              Re-scores findings through persona lenses.
```

Boundaries justified:

| Boundary | Why it's real |
|---|---|
| `core` ↔ `ui` | Engine must run headlessly (CI, MCP, Node tests). UI is a consumer. |
| `core` ↔ `rules` | Rules are *content*, engine is *runtime*. Different release cadence; community-authored without touching engine. |
| `core` ↔ `personas` | Personas are score *modifiers*, not rule authors. Different abstraction. |
| `ui` ↔ everything | UI deps are heavy (Lit, Floating UI). Headless consumers must not pull them. |

Not split for v1 (YAGNI):
- No separate `lens-overlay` / `lens-toolbar` / `lens-agent` packages — internal modules of `lens-ui`.
- No separate `lens-mcp` package — extends `@cognivo/mcp-server` with new tool registrations.
- No separate `lens-cloud-client` — ships when Cloud ships (post-v1).

### 3.2 The 6 internal modules

```
┌─────────────────────────────────────────────────────────────────┐
│                       <cg-lens> (lens-ui)                        │
│  ┌──────────────┐  ┌────────────────┐  ┌──────────────────────┐ │
│  │   Toolbar    │  │   Overlay      │  │   Agent Drawer       │ │
│  │ (score+modes)│  │ (highlights)   │  │ (chat + diffs)       │ │
│  └──────┬───────┘  └────────┬───────┘  └──────────┬───────────┘ │
│         └───────────────────┴──────────────────────┘             │
│                             │                                    │
│                       Lens Engine API                            │
└─────────────────────────────┼────────────────────────────────────┘
                              │
┌─────────────────────────────┼────────────────────────────────────┐
│                       Lens Engine (lens-core)                    │
│                                                                  │
│   ┌──────────┐    ┌────────────┐    ┌───────────────────────┐   │
│   │ Observer │ ─→ │ Classifier │ ─→ │   Rule Engine         │   │
│   │ (DOM →   │    │ (scene →   │    │ (scene + intent →     │   │
│   │  scene)  │    │  intent)   │    │  findings[])          │   │
│   └──────────┘    └────────────┘    └────────────┬──────────┘   │
│                                                  │              │
│                          ┌────────────┐    ┌─────▼──────────┐   │
│                          │  Personas  │ ─→ │   Scorer       │   │
│                          │  (modifies │    │ (findings →    │   │
│                          │  weights)  │    │  Lens Score)   │   │
│                          └────────────┘    └────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ▲
                              │
                ┌─────────────┴────────────┐
                │  Rule Packs (lens-rules) │
                │  Personas (lens-personas)│
                └──────────────────────────┘
```

Module contracts (TypeScript interfaces):

```ts
// 1. OBSERVER — DOM → SceneGraph
interface Observer {
  scan(root: Document | ShadowRoot): SceneGraph;
  watch(root: Document, onChange: (g: SceneGraph) => void): Disposable;
}

// 2. CLASSIFIER — SceneGraph → PageIntent
interface Classifier {
  classify(scene: SceneGraph): { intent: PageIntent; confidence: number; signals: ClassifierSignal[] };
}

// 3. RULE ENGINE — SceneGraph + Intent + Packs → Findings
interface RuleEngine {
  register(pack: RulePack): void;
  evaluate(scene: SceneGraph, intent: PageIntent): Finding[];
}

// 4. PERSONAS — Findings + Persona → re-weighted Findings
interface PersonaSimulator {
  simulate(findings: Finding[], persona: Persona): Finding[];
}

// 5. SCORER — Findings → LensScore (+ sub-scores)
interface Scorer {
  score(findings: Finding[], intent: PageIntent): LensScore;
}

// 6. AGENT — Findings → streaming suggestions / diffs
interface Agent {
  explain(finding: Finding): AsyncIterable<string>;
  suggestFix(finding: Finding, scene: SceneGraph): AsyncIterable<FixDiff>;
}
```

Data model:

```ts
type SceneGraph = { nodes: SceneNode[]; root: SceneNode };
type SceneNode = {
  id: string;                    // stable hash for dedup
  tag: string;
  componentManifest?: ComponentManifest;
  role?: AriaRole;
  text?: string;
  rect: DOMRect;
  computedStyle: Record<string, string>;
  tokenUsage: TokenUsage[];
  children: string[];
  shadowRoot?: SceneGraph;       // recursive (pierced)
};

type Finding = {
  id: string;
  ruleId: string;
  severity: 'blocker' | 'strong' | 'consider' | 'positive';
  confidence: number;            // 0..100
  targetNodeId: string;
  message: string;
  why: string;
  citations: string[];           // bias card IDs, WCAG refs
  fixHint?: FixHint;
};
```

### 3.3 Three architectural bets

**Bet 1 — Engine runs in a Worker, not the main thread.**
The rule engine evaluates 50–500+ rules across thousands of nodes. We post the scene graph to a Web Worker, evaluate there, post findings back. Overlay rendering stays on main thread. Trade-off: structured-clone cost (mitigated with diffed scene graphs). Long-term win: same engine binary runs in browser, Node (CI), and MCP server. *Cites Pattern 76 (Bridge Pattern).*

**Bet 2 — Rules are *data* with *predicates*, not just code.**
A rule is a manifest with `applies()` (cheap gate), `detect()` (full check), `cost` (`cheap | medium | llm`), `intentScope`, `citations`, and `fixtures[]`. The engine *plans* — skipping LLM-cost rules when intent confidence is low, running cheap rules first. Rules become inspectable, lintable, and packageable. *Cites Pattern 46 (Model Routing) and Pattern 49 (Structured Outputs).*

**Bet 3 — Local-first, privacy-first by default.**
The observer runs entirely in-browser. No network calls unless the user opens the agent drawer or opts into Cloud telemetry. "Lens never sees your DOM" is a positioning *and* technical commitment. Reduces GDPR/SOC2 surface area until Cloud. *Cites Principle 11 (Continuous Consent).*

### 3.4 Shadow DOM piercing — non-negotiable v1 feature

Cognivo components are shadow-rooted. Most observation tools miss shadow content. We pierce intentionally:

- `Observer.scan()` walks `element.shadowRoot` recursively; produces nested `SceneGraph` per shadow boundary.
- Closed shadow roots (`mode: 'closed'`) cannot be pierced — we mark them and emit a `cant-observe` finding rather than failing silently.
- Computed styles read across shadow boundaries; token resolution walks up via `host`.
- Bounding rects reported in *page* coordinates so the overlay draws correctly.

This is where most competitors fail. Doing it right on day one is what makes Lens uniquely capable on Cognivo's own component library.

### 3.5 Streaming everywhere

Findings stream from the engine as produced — not batched. UI starts drawing overlays for cheap-rule blockers in <100ms while expensive rules continue arriving over seconds. Same model as `@cognivo/core`'s existing streaming. Agent text streams. Fix diffs stream. *Cites Pattern 66 (Streaming Tool Orchestration).*

---

## 4. Rule Pack Format & Plugin API

> Cites: Pattern 17 (Tool Registry + Validation), Pattern 21 (ACI Tool Design), Pattern 49 (Structured Outputs), Pattern 74 (Skills System).

### 4.1 The unit: a Rule

A rule is a TypeScript module exporting a manifest. No DSL, no JSON config — TypeScript gives autocomplete, type-safety, and lets rules import from `@cognivo/design-advisor`, `@cognivo/tokens`, `@cognivo/core` natively.

```ts
import { defineRule } from '@cognivo/lens-core';
import { anchoringBias } from '@cognivo/design-advisor/biases/anchoring-bias';

export default defineRule({
  id: 'cog/anchoring/missing-on-pricing',
  title: 'Pricing page is missing a high-anchor option',
  category: 'cognitive',
  severity: 'strong',
  intentScope: ['pricing'],
  cost: 'cheap',
  citations: [anchoringBias.id],
  defaultEnabled: true,

  applies: ({ scene, intent }) =>
    intent === 'pricing' && scene.find('cg-pricing-card').length >= 2,

  detect: ({ scene, helpers }) => {
    const cards = scene.find('cg-pricing-card');
    const prices = cards.map(c => helpers.parsePrice(c.text));
    const max = Math.max(...prices);
    const ratio = max / Math.min(...prices);

    if (ratio < 1.8) {
      return [{
        targetNodeId: cards[0].id,
        confidence: 78,
        message: 'Highest tier is < 1.8× cheapest — anchor effect is weak.',
        why: 'Anchoring works when the high option creates contrast. Industry benchmark is 2.5–4× spread.',
        fixHint: { kind: 'restructure', summary: 'Add an Enterprise tier or raise highest tier price.' },
      }];
    }
  },

  fixtures: [
    { name: 'three-tier-with-good-spread', expect: 'no-finding' },
    { name: 'three-tier-with-flat-prices', expect: 'finding' },
  ],
});
```

Why this shape:
- `applies()` is the **cheap gate** — pure function, runs in <1ms over thousands of nodes. The engine skips rules whose gate returns false. *(Pattern 46.)*
- `cost: 'cheap' | 'medium' | 'llm'` lets the engine plan: cheap rules sync, llm rules opt-in only.
- `citations` are IDs into design-advisor — clicking the finding opens the bias card.
- `fixtures` are required (enforced at type level) — rule + tests = one PR. *(Pattern 54.)*

### 4.2 The unit above: a Pack

```ts
export default definePack({
  id: '@cognivo/lens-pack-conversion',
  version: '1.0.0',
  title: 'Conversion Psychology',
  intents: ['pricing', 'checkout', 'onboarding'],
  rules: [
    () => import('./anchoring/missing-on-pricing'),
    () => import('./social-proof/missing-on-pricing'),
    () => import('./scarcity/dark-pattern-fake-urgency'),
  ],
  config: z.object({
    minAnchorRatio: z.number().default(1.8),
  }),
});
```

Packs are **lazy** (rules `() => import(...)` chunks per rule). 500 rules = 500 lazy chunks; only enabled rules are loaded.

### 4.3 The four v1 packs (~67 curated rules)

| Pack | Rules | Cost mix | v1 ship status |
|---|---|---|---|
| `@cognivo/lens-pack-core` | tokens, a11y, state coverage, focus | ~25 cheap | **on by default** |
| `@cognivo/lens-pack-ethics` | dark patterns | ~12 cheap, 3 LLM | **on by default** |
| `@cognivo/lens-pack-conversion` | anchoring, social proof, decoy, framing | ~15 cheap, 2 LLM | **on by default** |
| `@cognivo/lens-pack-onboarding` | progress disclosure, IKEA effect, peak-end | ~10 cheap | **off by default** |

**67 curated rules, not 181.** Calibration > coverage. Each rule ships with ≥3 positive + ≥3 negative + ≥1 edge fixture.

### 4.4 Rule-authoring helpers (the ergonomic moat)

`lens-core` exports a scene-query language so rules don't write raw DOM walks:

```ts
scene.find('cg-button[variant=primary]:visible:not(:disabled)')
scene.find('cg-pricing-card').first()
scene.tokenViolations({ tier: 1, exclude: ['--cg-spacing-*'] })
scene.contrast(node, { against: 'background', wcag: 'AA-large' })
scene.intentSignals()
scene.persona()
scene.componentManifest('cg-button')
```

Plus a fixtures DSL:

```ts
fixture('three-tier-with-flat-prices')
  .render(html`<cg-pricing-card>...</cg-pricing-card>...`)
  .withIntent('pricing')
  .expectFinding({ ruleId: 'cog/anchoring/missing-on-pricing', confidence: { gte: 60 } });
```

Every rule's fixtures run in CI. Calibration regressions are caught before they ship.

### 4.5 Third-party packs — the platform play

Packs are npm packages matching `lens-pack-*` or declaring `cognivoLens.pack` in `package.json`:

```ts
// lens.config.ts
import core from '@cognivo/lens-pack-core';
import myCompanyPack from '@acme/lens-pack-acme-design';

export default {
  packs: [core, myCompanyPack],
  rules: {
    'cog/anchoring/missing-on-pricing': { severity: 'consider' },  // override
    'a11y/contrast/below-AA': 'off',
  },
};
```

ESLint-shaped config — zero learning curve.

### 4.6 Sandbox & security

Third-party rules execute on the user's page. Security stance for v1:

- Rules run in the **same Worker** as the engine — isolated from main-thread JS. Scene graph is a *snapshot*, not a live DOM reference.
- Rules cannot make network calls except through `helpers.fetch()` (logged + rate-limited).
- LLM calls go through `@cognivo/core` only — never raw `fetch`.
- Rule packs are version-pinned in `lens.config.ts`. New versions require explicit upgrade.
- **Post-v1:** sandbox each pack in its own Worker; capability-based helper API; verified/community/unverified pack tiers.

### 4.7 Versioning

| Thing | Versioning | Why |
|---|---|---|
| Engine (`lens-core`) | semver | Breaking the rule API requires a major bump. |
| Rule packs | semver | Tightening a threshold = minor (might fail more). Removing a rule = major. |
| Lens Score formula | dated (`v2026.04`) | Score changes are user-visible. Pin by date; bumping is a deliberate event with a changelog. |

---

## 5. Page-Intent Classifier

> Cites: Pattern 33 (Adaptive RAG — classify complexity → route), Pattern 49 (Structured Outputs), Pattern 54 (Golden Dataset Testing), Principle 4 (Confidence Signal).

### 5.1 The 12-intent taxonomy

| Intent | Signals | Rules that activate |
|---|---|---|
| `pricing` | `<cg-pricing-card>×2+`, currency tokens, `/pricing` URL | anchoring, decoy, social proof, framing, scarcity |
| `checkout` | "Pay now" CTA, total summary, billing form | loss aversion, default effect, friction, trust signals |
| `onboarding` | `<cg-stepper>`, "Step N of M", first-run flags | progressive disclosure, IKEA effect, peak-end |
| `signup` | email + password fields, "Create account", OAuth | friction, social proof, default effect |
| `signin` | email + password, "Sign in", "Forgot password" | friction, fail states |
| `landing` | hero + features + CTA, marketing copy | mere exposure, fluency, anchoring |
| `dashboard` | data viz, KPI cards, navigation chrome | choice overload, info density, scanning patterns |
| `settings` | toggle stack, save/discard, sectioned forms | default effect, status quo bias |
| `content` | article, blog, doc | reading rhythm, peak-end, fluency |
| `form` | generic form not in above | friction, completion psychology |
| `empty-state` | "no results", "get started", zero data | priming, action bias |
| `error` | 4xx/5xx, "something went wrong" | recoverability, blame attribution |

Plus `unknown` — fires only intent-agnostic rules. Better to under-fire than mis-fire.

### 5.2 The 3-stage cascade

```
Stage 1: Developer override  →  Stage 2: Heuristic  →  Stage 3: LLM (opt-in)
(<cg-lens intent="...">)         (signals + softmax)    (fallback when conf<60)
confidence: 100                  confidence: 0–95       confidence: 0–99
```

**Stage 2 (Heuristic — workhorse):** pure-function, <5ms, no network. Weighted feature vector → softmax over 12 intents:

```ts
const signals = [
  urlPattern,          // /pricing, /checkout, /onboarding...
  metaTags,            // <meta name="page-type">
  componentManifest,   // cg-pricing-card → +0.7 pricing
  ariaLandmarks,
  textNgrams,          // "per month" / "complete purchase"
  dominantStructure,
  formShape,
  dataDensity,
  errorSignals,
];
```

**Stage 3 (LLM — opt-in fallback):** when heuristic conf < 60 AND user opted in. Sends trimmed text + structural signals (no styles, no images) to `@cognivo/core` with structured-output schema. 200-token budget. Cached aggressively.

### 5.3 Multi-intent

```ts
type IntentClassification = {
  primary: { intent: PageIntent; confidence: number };
  secondary: Array<{ intent: PageIntent; nodeIds: string[]; confidence: number }>;
};
```

Heuristic classifier runs over full scene **and** each landmark region. Sub-regions with high local confidence become secondary intents. Rules can scope to either.

### 5.4 Calibration loop

1. **Golden fixture set** — 200 hand-labeled real pages in `lens-core/fixtures/intents/`. Each: `{ html, expectedIntent, expectedSecondary[] }`. CI runs all 200 every PR. *(Pattern 54.)*
2. **Accuracy gates** — main must hold ≥90% top-1, ≥95% on `pricing/checkout/signup/signin`. PRs that drop accuracy block.
3. **User feedback loop** — every classification shows "wrong intent?" link → opens override + (opt-in) submits to feedback bucket.
4. **Confidence-distribution monitoring** — if >X% of pages classify with <60 confidence, coverage gap. Telemetry tracks this.

### 5.5 UI transparency

```
Lens · Pricing  (87% confident)    ⚙
  ↳ also: form (62%, region: signup)
  ↳ wrong? override →
```

Showing classifier confidence is **non-negotiable**. Hiding the classifier behind certainty is what kills design-AI tools. *(Principle 2 — Metacognition as Interface.)*

### 5.6 Conservative-firing principle

If a high-stakes intent (pricing, checkout) classifies below the floor, **silently fall back to `unknown`** and run only intent-agnostic rules. **When in doubt, shut up.**

Floors:
- `pricing/checkout/signup/signin`: floor 75
- `onboarding/landing/dashboard/error`: floor 70
- `settings/form/content/empty-state`: floor 65

---

## 6. Lens Score Formula

> Cites: Pattern 49 (Structured Outputs — score is a structured artifact), Principle 3 (Transparent Thinking Partner), Principle 13 (Make Accountability Visible).

### 6.1 Four sub-scores

```
LensScore = composite of:
  ┌──────────────────────┬──────────────────────────────────────┐
  │ Cognitive Clarity    │ load, friction, choice architecture  │
  │ Persuasive Integrity │ bias coverage − dark-pattern penalty │
  │ Accessibility        │ WCAG conformance + beyond            │
  │ System Health        │ token compliance, state coverage     │
  └──────────────────────┴──────────────────────────────────────┘
```

### 6.2 Per sub-score formula

```
subScore = 100
         − Σ (severity_weight × confidence_factor × DR) for negatives
         + Σ (positive_weight × confidence_factor × DR) for positives
         clamped to [0, 100]
```

| Severity | Weight | Rationale |
|---|---|---|
| `blocker` | −20 | Categorical (broken focus, raw hex). Few should exist; each is loud. |
| `strong` | −7 | High-confidence issue but fixable. |
| `consider` | −2 | Soft suggestion; small impact. |
| `positive` | +1.5 | Reinforcement bonus, bounded. |

**Confidence factor:** `findingConfidence / 100`. A 50%-confident strong finding contributes −3.5.

**Diminishing returns (DR):** `weight × (1 / (1 + 0.15 × n))` where `n` is the count of same-rule findings on the page. Prevents one systemic bug from producing a score of 0; prevents gaming via positive-spam.

### 6.3 Composite formula

Weighted arithmetic mean with floor cap:

```
composite_raw = 0.30 × cognitive_clarity
              + 0.25 × persuasive_integrity
              + 0.25 × accessibility
              + 0.20 × system_health

LensScore = composite_raw
            capped at 70 if any sub-score < 40
            capped at 50 if any sub-score < 25
```

Why arithmetic-with-cap (not geometric mean): geometric over-punishes any zero. Arithmetic-with-cap gives a calmer, honest number while preventing hiding.

### 6.4 Stability

- **Hash-based dedup** — same `findingHash` counts once until DOM signature changes meaningfully.
- **EWMA smoothing in Watch mode** — displayed score = `0.7 × current + 0.3 × previous`. Audit mode shows raw.
- **Snapshot mode for sharing** — screenshotable badge always uses Audit-mode snapshot.

### 6.5 Score breakdown UI

```
Lens Score · 74                    [How is this calculated?]
─────────────────────────────────
Cognitive Clarity      82 ▔▔▔▔▔▔▁
Persuasive Integrity   61 ▔▔▔▔▁▁▁  ← biggest opportunity
Accessibility          88 ▔▔▔▔▔▔▔▁
System Health          72 ▔▔▔▔▔▁▁

Top deductions:
  −20  Anchoring weak on /pricing  (cog/anchoring/weak-spread, 78%)
  −14  Two contrast failures        (a11y/contrast/below-AA × 2, 95%)
  −7   Missing focus state          (state-coverage/focus, cg-button)

Top wins:
  +6   Dark patterns absent (clean across 4 ethics rules)
  +4   Tier-3 token compliance 96%
```

Every point movement is traceable. *(Principle 3, Principle 13.)*

### 6.6 Lens Index — site-level rollup

```
LensIndex = Σ(pageScore × intentWeight × trafficWeight) / Σ(weights)
```

A page has a Score. A site has an Index. Different consumer (designer vs. exec).

### 6.7 Anti-gaming protections

| Attempt | Defence |
|---|---|
| Fake "positive" elements | Diminishing returns + per-rule positive cap |
| `display: none` to hide problems | Observer scans `display: none` separately as *cloaking* meta-finding |
| Closed shadow roots to hide | `cant-observe` finding can't contribute positively |
| Override `<cg-lens intent="content">` to disable rules | Override logged in breakdown |
| Tune to formula vN, never re-audit | Score timestamped + formula-version-stamped |

### 6.8 Date-pinned formula

Badge: `Cognivo Lens Score: 74 · Formula v2026.04`

Old scores stay valid against their formula. Comparing across versions requires re-audit. **Formula revision policy:** at most twice a year, 90-day deprecation overlap. Locked between revisions.

### 6.9 What the score *cannot* tell you

Surfaced in the explainer:
- Brand resonance, taste, aesthetic
- Conversion rate (correlated, not equal)
- Technical performance / Core Web Vitals (use Lighthouse — we link to it)
- Content quality (we don't read copy for substance)

This humility is part of credibility. *(Principle 10.)*

---

## 7. Performance Budget

> Cites: Pattern 53 (Observability Spans), Pattern 71 (Runtime Cost Gating), Pattern 47 (Semantic Caching), Pattern 78 (Tool Result Budget — applied as Finding deduplication).

### 7.1 Hard budgets

| Budget | Target | Hard ceiling | Measured by |
|---|---|---|---|
| Bundle (lens-ui + lens-core, gzipped) | 35 KB | **50 KB** | `pnpm size` (extended) |
| Mount-time blocking work | 8 ms | **15 ms** | `benchmarks/lens/` |
| Watch-mode ambient cost (4× CPU-throttled) | <1% main thread | **<3%** | JS Self-Profiling API |
| Memory footprint | <12 MB | **<25 MB** | `performance.measureUserAgentSpecificMemory()` |

CI-gated. Targets warn; ceilings fail.

### 7.2 Mount-time discipline

Between `<cg-lens>` insertion and host first-paint, Lens does almost nothing:
1. Register custom element (~0.5 ms)
2. Reserve fixed-size container
3. Render placeholder badge (~1 ms)
4. **Defer everything else** to `requestIdleCallback`

Observer scan, classifier, rules, overlay — all in idle time and Worker. Score lights up *after* page is interactive.

### 7.3 Worker hand-off

```
[main thread]                              [Lens Worker]
─────────────                              ─────────────
host load
  ↓
<cg-lens> mounted (defer everything)
  ↓
requestIdleCallback fires
  ↓
observer.scan() (~3-15ms)
  ↓
postMessage(sceneGraph)         ───────→   classify (1-3ms)
                                              ↓
                                            rule engine (5-40ms)
                                              ↓
                                            score (<1ms)
                                              ↓
                                ←───────   postMessage(findings + score)
overlay.draw(viewport-windowed)
```

Three perf-saving designs:
1. **Diffed scene graphs** — MutationObserver buffers, debounces 200ms, sends only changed subtrees.
2. **Viewport-windowed overlay** — IntersectionObserver gates which findings render.
3. **Backpressure** — new scan replaces queued one; no buildup.

### 7.4 Cooperative-degradation ladder

When the host is under pressure, Lens steps down — never the other way.

| Step | Behavior | Trigger |
|---|---|---|
| **0 — Full** | Full pipeline, watch + audit + agent | default |
| **1 — Lazy** | Watch pauses; audit on demand only | idle deadlines missed twice in 10s |
| **2 — Light** | Cheap rules only, no LLM, no agent, viewport-only overlay | low memory or battery |
| **3 — Score-only** | No overlay, no rule eval, last cached score | sustained main-thread pressure |
| **4 — Self-suspend** | Lens unmounts, console message | host frame budget < 30fps for 5s |

Public commitment in the README. *(Principle 17 — Exit as Sacred Right; applied to graceful exit.)*

### 7.5 LLM/network budget *(Pattern 71)*

| Tier | LLM calls per audit | Token budget per call | Cache TTL |
|---|---|---|---|
| Free OSS | 0 (LLM rules disabled) | n/a | n/a |
| Pro | ≤5 (intent fallback + on-demand agent) | 200 in / 600 out | 1h |
| Cloud | ≤20 (full LLM rule pack + agent + fix suggestions) | 200 in / 600 out | 1h |

Caching keyed on `(URL + sceneHash + ruleId + intent)`. **Per-tab budget enforced client-side; per-account budget server-side.** Hard caps; soft caps warn.

### 7.6 Semantic caching *(Pattern 47)*

For pages with repeated structures (e.g., 100 product cards with the same shape), the rule engine caches verdicts by **structural signature hash**, not by exact node. One eval is reused for N similar nodes. Expected savings: 30–60% rule-eval reduction on data-heavy pages.

### 7.7 Telemetry budget (Cloud only)

| Event | Frequency | Bytes | Why |
|---|---|---|---|
| `score-snapshot` | per audit, max 1/min | ~400 B | dashboards |
| `finding-feedback` | user-initiated | ~200 B | calibration |
| `intent-override` | user-initiated | ~100 B | classifier training |
| `engine-perf-self-report` | per session, max 1/5min | ~250 B | regression detection |

Aggressively batched, sent on `visibilitychange: hidden` via `sendBeacon`. Zero impact on critical path.

### 7.8 Self-observability *(Pattern 53)*

```
performance.measure('lens:scan', ...)
performance.measure('lens:classify', ...)
performance.measure('lens:rules:evaluate', ...)
performance.measure('lens:overlay:draw', ...)
```

User Timing track in DevTools. `?lens:debug` query param dumps full timing report. Hidden diagnostic panel (`Cmd+Shift+L`×2) shows engine latency, finding count, queue depth, memory.

### 7.9 CI perf-regression gate

Every PR runs:
1. Bundle-size check
2. Mount-time microbenchmark (50 runs, p95)
3. Audit-pass benchmark (full audit, p95 < 200ms)
4. Watch-mode ambient profile (5-min idle)

>10% regression requires PR-description acknowledgment. >25% is a hard fail.

---

## 8. Persona Simulator

> Cites: Pattern 23 (Working Memory — active persona is structured state), Pattern 6 (Context Engineering), Principle 1 (Preserve Struggle When Delegation Is Effortless), Principle 5 (Safeguard Meaning-Making).

### 8.1 What a persona is

A **functional heuristic** — named bundle of perceptual constraints, attentional patterns, and rule-weight modulations. **Not** a demographic, not a "user," not a substitute for real research.

```ts
type Persona = {
  id: string;
  title: string;
  framing: string;               // copy shown in UI; sets expectations
  constraints: PerceptualConstraint[];
  attention: AttentionModel;
  ruleWeights: Record<RuleId, number>;
  activatesRules: RuleId[];
  citations: string[];
  evidenceLevel: 'strong' | 'directional' | 'experimental';
};
```

`evidenceLevel` is non-negotiable. Every persona surfaces its evidence level in UI.

### 8.2 The 3 v1 personas

#### **Persona 1 — "First-Time Mobile" (Strong evidence)**

| Field | Value |
|---|---|
| Framing | "A new visitor on a mid-tier Android over 3G. No context, no patience, no second chances." |
| Constraints | viewport 360×640, network simulated for visualization, CPU 4× indicator |
| Attention | 7-second dwell, F-pattern, above-the-fold weighted heavily |
| Rule weights | `mobile/tap-target/<44px` ×3, `friction/extra-fields/signup` ×2, `cog/anchoring` ×0.5 |
| Activates rules | `mobile/horizontal-overflow`, `mobile/font-size-<14`, `mobile/orientation-lock` |
| Citations | NN/g mobile UX, WCAG 2.5.5, Google Mobile UX |

Visualization: page reframed inside phone-shaped overlay; above-fold highlighted, below dimmed.

#### **Persona 2 — "Cognitively-Loaded" (Directional evidence)**

| Field | Value |
|---|---|
| Framing | "A distracted user. Multitasking, scanning not reading. Will not parse anything that requires deliberation." |
| Constraints | reading speed −60%, complex-sentence parsing fails, visual-noise penalty doubles |
| Attention | scan-only; dwells on high-contrast/isolation; ignores mid-density |
| Rule weights | `cog/choice-overload` ×2, `cog/decision-fatigue` ×2.5, `friction/copy/cognitive-load-score` ×3 |
| Activates rules | `cog/scan-pattern/heading-density`, `cog/copy/sentence-length-mean`, `cog/contrast/figure-ground` |
| Citations | Sweller CLT, Krug "Don't Make Me Think", NN/g scanning |

Visualization: non-isolated regions blur; CTAs and high-contrast stay sharp. Designer sees "what registers" vs. "what gets ignored."

#### **Persona 3 — "Keyboard / Screen-Reader" (Strong evidence)**

| Field | Value |
|---|---|
| Framing | "A user navigating exclusively by keyboard, hearing the page as a linearized stream from a screen reader." |
| Constraints | visuals hidden; rendering is the linearized accessibility tree |
| Attention | sequential, focus-driven |
| Rule weights | all `a11y/*` ×3; `cog/*` ×0.3; `state-coverage/focus-visible` ×5 |
| Activates rules | `a11y/focus-order/illogical`, `a11y/landmark/missing`, `a11y/heading-hierarchy/skip`, `a11y/aria/redundant`, `a11y/keyboard-trap` |
| Citations | WCAG 2.1 AA, WAI-ARIA Authoring Practices, WebAIM screen-reader user surveys |

Visualization: page replaced with linearized accessibility tree as vertical stream of focusable rows. Simulated focus walks via Tab. **The clip that gets shared.**

### 8.3 How a persona modulates the engine

```
Active persona = N
  ↓
1. Activate persona rules → added to active rule set
  ↓
2. Multiply finding severity by ruleWeights[ruleId]
  ↓
3. Re-score with persona-weighted findings
  ↓
4. Apply visualization layer to overlay
  ↓
Persona Score (separate from base Lens Score)
```

### 8.4 UX principle: scores are separate

```
Lens Score      74
First-Time Mobile  61   ← when persona is active
```

The base score is shareable; persona scores are diagnostic. The **gap** is the insight. Compare strip:

```
┌─────────────────────────────────────────┐
│  Lens 74  │ Mobile 61  │ Loaded 58  │ A11y 49 │
└─────────────────────────────────────────┘
```

A11y 49 with Lens 74 = a designer hiding behind a sighted experience. *That revelation is the product.*

### 8.5 Persona-authoring API (Pro)

```ts
import { definePersona } from '@cognivo/lens-core';

export default definePersona({
  id: 'anxious-converter',
  title: 'Anxious converter',
  framing: 'A user evaluating commitment under uncertainty.',
  evidenceLevel: 'directional',
  constraints: [],
  attention: { reReadProbability: 0.4, dwellsOnTrustSignals: 'high' },
  ruleWeights: {
    'cog/loss-aversion/pricing-uncertainty': 3,
    'ethics/dark-pattern/hidden-costs': 5,
  },
  activatesRules: ['anxious/refund-policy/missing'],
  citations: ['Cialdini 2006', 'Baymard checkout research'],
});
```

Same plugin pattern as rule packs. Pro tier exposes the API; Cloud ships an *org persona library*.

**Synthetic personas (Cloud, post-v1):** describe a persona in natural language → LLM proposes constraints + rule weights → human approves → saved to org library.

### 8.6 Three ethical guardrails (data-model-enforced)

1. **No demographic personas.** Functional states only (first-time, loaded, keyboard-only). Not identities (age, gender, ethnicity, ability *as identity*). "Screen-reader user" is a *task context*, not a person category.
2. **Evidence required.** No persona ships without citations — the authoring UI requires at least one citation.
3. **Framing visible.** Every persona's `framing` text appears prominently in the UI when active.

These are enforced *in the data model*, not just policy.

### 8.7 What persona simulator is *not*

In the explainer:

> Personas are not real users. They are calibrated heuristics that surface different failure modes. They cannot replace usability testing, accessibility audits with real assistive-tech users, or analytics. Use them to **find** problems faster, not to **conclude** that problems are solved.

---

## 9. Closed-Loop Fix Flow

> Cites: Pattern 9 (ReAct Loop — agent's core), Pattern 13 (CRITIC — verifier), Pattern 17 (Tool Registry + Validation), Pattern 20 (Tool Suspend/Resume — preview gate), Pattern 21 (ACI Tool Design), Pattern 49 (Structured Outputs — FixManifest), Pattern 50 (Guardrail Processors — verifier), Pattern 60 (MCP), Pattern 64 (Multi-Layer Permissions), Pattern 70 (Denial Tracking), Principle 4 (Preserve Creative Interpretation), Principle 13 (Accountability Visible), UX P1 (Intent Preview), UX P5 (Action Audit & Undo).

### 9.1 The 7-stage pipeline

```
[Finding]
   ↓
1. Fix-classifier → category (codeable / structural / judgment)
   ↓
2. Fix-builder → FixManifest (deterministic OR LLM-with-verifier)
   ↓
3. In-page preview (sandboxed style/attribute injection)
   ↓
4. User decision: dismiss / save-for-later / apply
   ↓
5. Diff renderer → unified-diff string + file path resolution
   ↓
6. Apply mechanism: Copy / Patch / IDE-MCP / PR
   ↓
7. Telemetry (opt-in): outcome → calibration loop
```

No stage skips human review in v1. *(Pattern 20 gate.)*

### 9.2 Fix categories

| Category | What we can do | UI affordance |
|---|---|---|
| **Codeable** | Generate deterministic or LLM-verified diff | "Preview & apply" |
| **Structural** | Suggest higher-level change; cannot auto-write code | "Show suggestion" with mockup |
| **Judgment** | Surface tradeoffs; require human decision | "Open discussion" with pros/cons |

Rules declare their `fixCategory`. Engine refuses to load rules that lie about it.

### 9.3 FixManifest

```ts
type FixManifest = {
  ruleId: string;
  findingId: string;
  confidence: number;
  origin: 'deterministic' | 'llm-verified';

  changes: FileChange[];

  preview: {
    cssOverrides?: string;
    attributeChanges?: AttributeChange[];
    notes?: string;
  };

  rollbackable: true;
  reviewRequired: boolean;
  citations: string[];
};
```

Serializable → can be sent to MCP, posted to backend, replayed in CI.

### 9.4 Verifier *(Pattern 13 + Pattern 50)*

LLM-suggested fixes **never** show raw. They run through deterministic checks:

| Check | What it enforces |
|---|---|
| Token validity | Suggested CSS uses only `var(--cg-*)` — no raw hex, no banned tier-1 |
| Component manifest compliance | Attribute changes match component's declared API |
| Schema validity | ARIA values valid; role attributes in WAI-ARIA enum |
| Determinism | Same input run 3× produces same output |
| No regression | Re-run rules on simulated post-fix scene → no new findings |

Failure → fix downgraded to "suggestion text" finding. **The verifier is what makes LLM fixes shippable.**

### 9.5 In-page preview (the magic moment)

CSS-only fixes: scoped Constructable Stylesheet injected. Toggle ON applies; OFF reverts.

Attribute fixes: `MutationObserver`-aware proxy virtually applies attribute, visually re-renders, doesn't persist.

Structural fixes: side-by-side mockup using actual token registry + Lit renderer. Looks on-brand, not generic.

The toggle is **the moment that converts skeptics.** Designers see the fix work *before* trusting Lens to write code.

### 9.6 Four apply mechanisms (escalating commitment) *(Pattern 64)*

```
Lowest trust          Highest trust
───────────────────────────────────────────────
Copy diff   →   Download patch   →   Open in IDE   →   Open PR
(clipboard)     (.patch file)        (via MCP)         (Cloud only)
```

1. **Copy diff** — universal, zero install. Unified diff to clipboard. *OSS workflow.*
2. **Download patch** — `.patch` file. `git apply lens-fix.patch`. Useful for batch.
3. **Open in IDE via MCP** — *the killer flow.* `@cognivo/mcp-server` exposes `lens.openFix`. Claude Code / Cursor / Windsurf renders the diff in their inline-diff UI. *(Pattern 60.)*
4. **Open PR (Cloud)** — manual confirmation only in v1. Repo connected via GitHub App; user reviews and confirms.

**No auto-apply in v1.** *(Anti-pattern: skipping permissions.)*

### 9.7 Source-map resolution cascade

1. **`data-cg-source` attributes** (build-time, via `@cognivo/lens-vite` plugin). 100% accurate.
2. **Component manifest lookup** (cg-* / ai-* tags → source path). Resolves to file, not call site.
3. **LLM-assisted resolution** (raw HTML / non-Cognivo components). Lower confidence; always confirms.

Production-only mode (no source maps): fix flow degrades to suggestion-only.

### 9.8 MCP tool surface *(Pattern 17 + Pattern 60 + Pattern 21)*

`@cognivo/mcp-server` gains four tools:

```
lens.scan(url) → SceneGraph + Findings + LensScore
lens.explain(findingId) → human-readable rationale + citations
lens.suggestFix(findingId) → FixManifest
lens.applyFix(findingId, target) → Result
```

Tools designed per ACI principles: few, high-signal, clear errors.

Developer flow:
1. "Claude, scan localhost:3000 with Lens."
2. "Show me the top 3 strong-severity findings."
3. "Apply fixes for the codeable ones."

Three messages, three commits' worth of cleanup. **The developer-facing demo.**

### 9.9 Audit trail *(P5 + Principle 13)*

Every applied fix writes to `.cognivo-lens.audit.jsonl` (gitignored by default):

```json
{"ts":"2026-04-28T10:32Z","ruleId":"tokens/raw-hex-in-component","findingHash":"...","origin":"deterministic","applied":"ide-mcp","user":"<git-config-name>"}
```

Calibration loop needs ground truth ("which suggestions did real users accept?"). Anonymized aggregates (Cloud) feed rule tuning.

### 9.10 Denial tracking *(Pattern 70)*

If a user dismisses the same rule 3+ times in a project, escalate: offer to disable the rule for this project (with one click). Calibration loop that *respects* the user. Dismissals feed the calibration bucket.

### 9.11 Explicit non-goals for v1

- ❌ Auto-apply (any confidence)
- ❌ Multi-file refactors (≤2 files per fix)
- ❌ LLM-only fixes without verifier
- ❌ Fixes that can't express as git diffs
- ❌ Codeable fixes for `structural` or `judgment` category

---

## 10. Distribution, Versioning, Privacy, Telemetry

> Cites: Pattern 60 (MCP), Pattern 76 (Bridge Pattern), Pattern 71 (Runtime Cost Gating), Pattern 74 (Skills System — rule packs), Principle 11 (Continuous Consent), Principle 13 (Make Accountability Visible), Principle 16 (Make Power Legible in Infrastructure), Principle 17 (Design Exit as Sacred Right).

### 10.1 Four v1 distribution shapes

| Shape | Package | Audience | Use case |
|---|---|---|---|
| **Web component** | `<cg-lens>` from `@cognivo/lens-ui` | designer auditing staging | "see Lens on my page" |
| **Vite plugin** | `@cognivo/lens-vite` | dev team, local-dev | always-on with full source resolution |
| **CLI** | `cognivo-lens` from `@cognivo/lens-cli` | CI, batch audit, headless | scoring deploys, regressions |
| **MCP tools** | extension to `@cognivo/mcp-server` | Claude Code / Cursor users | ask AI about your live page |

Cut for post-v1: browser extension, Next/Astro/SvelteKit plugins (Vite-plugin wrappers), Storybook addon, VS Code panel.

### 10.2 Three independent versioning axes

```
┌─────────────────────────────────────────────────────────────┐
│  Engine version   →  semver on lens-core                     │
│  Pack versions    →  semver per pack (independent)           │
│  Formula version  →  date-pinned (vYYYY.MM)                  │
└─────────────────────────────────────────────────────────────┘
```

User config = lockfile of design intent:

```ts
export default {
  engineVersion: '^1.0.0',
  formulaVersion: 'v2026.04',
  packs: {
    '@cognivo/lens-pack-core': '^1.2.0',
    '@cognivo/lens-pack-ethics': '^1.0.0',
    '@cognivo/lens-pack-conversion': '^1.1.0',
  },
};
```

Compatibility rules:
- `lens-core@1.x` accepts rules built against `^1.0.0` peerDeps.
- Each pack declares the formula versions it tunes against.
- CLI prints **Lens Stack summary** on every run for reproducibility.

### 10.3 Update model — pull, not push

We **never auto-update rules without consent.** Silent score changes are the cardinal sin (ESLint learned this).

- CLI/toolbar surfaces updates with changelog summary.
- `lens.config.ts` pins versions; CI uses lockfile.
- Cloud teams get a **staging channel** — run new rule packs against your audit history, see your scores' deltas before upgrading.

### 10.4 Four-tier privacy model *(Principle 11)*

**Tier 0 — Local-only (default for OSS)**
- All in-browser. No data leaves.
- `localStorage` per origin. Audit log to `.cognivo-lens.audit.jsonl`.
- **The DOM never leaves the browser.**

**Tier 1 — User-configured LLM (opt-in, per-call)**
- Agent drawer + LLM rules call user-configured LLM via `@cognivo/core`.
- Payload: trimmed text + structural signals only. Never raw HTML/images/stylesheets.
- User controls provider + key. We never proxy.
- Visible "phoning home" indicator on whenever LLM in flight. *(Honesty by UX.)*

**Tier 2 — Pro telemetry (opt-in, account-bound)**
- Score snapshots, finding feedback, intent overrides → Lens Cloud.
- Strict allowlist: no DOM, no URL query strings, only origin + path.
- Aggregates feed calibration loop.

**Tier 3 — Cloud team data (explicit, contracted)**
- Team dashboards, history, multiplayer.
- DPA, EU/US residency, GDPR delete-on-request.
- SOC2 Type II target: 12 months after Cloud GA.

Defaults skew private. Telemetry is opt-in, never on-by-default.

### 10.5 Telemetry event shape (Tier 2/3 only)

```ts
type LensTelemetryEvent =
  | { kind: 'score-snapshot';   sessionId; origin; pagePath; intent; lensScore; subScores; engineVer; formulaVer; packs[]; sampledAt }
  | { kind: 'finding-feedback'; sessionId; ruleId; userVerdict; confidence; intent; engineVer }
  | { kind: 'intent-override';  sessionId; pagePath; predicted; corrected; engineVer }
  | { kind: 'engine-perf';      sessionId; mountMs; auditMs; memMb; engineVer; deviceClass };
```

Notable absences: DOM snapshots, URL query params, UA strings (only `deviceClass`), IP (terminated at edge).

Public **Lens Telemetry Schema** page lists what's sent, with examples. Cloud customers can subscribe like an API contract.

### 10.6 Authentication

For OSS v1: **none.** Zero account, zero login, zero email.

For Pro/Cloud (post-OSS): OAuth (GitHub + Google + magic-link), API keys for CI, SSO+SCIM for Enterprise, Stripe for billing.

OSS architecture must not preclude Cloud — but anonymous local Lens never collects an identifier the Cloud version then needs to backfill. Clean slate at signup.

### 10.7 Open-source license

- `lens-core`, `lens-ui`, `lens-rules`, `lens-personas` → **MIT** (frictionless adoption)
- `lens-pack-cloud-personas` (paid Cloud pack) → proprietary
- Rule packs are dataset moat even MIT — community contributions feed our packs

Open source is the GTM, not a threat to monetization. Closed product nobody can verify is the threat.

### 10.8 Compliance-readiness checklist (v1 ships these)

- ✅ `PRIVACY.md` at repo root
- ✅ `SECURITY.md` with disclosure policy + PGP key
- ✅ A11y conformance statement for the toolbar UI
- ✅ Telemetry schema page (public, even though OSS sends nothing)
- ✅ DPA template (boilerplate, ready for Cloud)
- ✅ Subprocessor list

3 days at v1 saves 3 weeks during enterprise deals.

### 10.9 Lens Wire — public changelog as product surface

Single page at `/lens/changelog`. Every release: engine, packs, formula, classifier accuracy stats. RSS-fed. Opt-in email digest.

Entries call out:
- Engine bug fixes
- Pack additions/threshold-tightenings ("your scores may move ±2 points on pricing pages")
- Formula revisions ("rebalanced sub-score weights based on 6-month feedback")
- Classifier accuracy updates ("top-1 91.2% (+1.8). New fixtures: 12 ecommerce checkout patterns.")

**GTM in the form of transparency.** Designers who care about rigor will read it.

### 10.10 What we explicitly don't ship in v1

- ❌ Accounts in OSS
- ❌ Usage-metered LLM proxy (BYO key)
- ❌ Autodiscovery / "phone home" updates
- ❌ Closed-source rules
- ❌ Cross-origin user tracking

---

## 11. Testing Strategy

> Cites: Pattern 54 (Golden Dataset Testing), Pattern 55 (LLM-as-Judge), Pattern 53 (Observability Spans).

### 11.1 The seven test surfaces

```
1. Unit tests             — pure logic (Vitest)
2. Rule fixture tests     — one rule, many HTML inputs
3. Classifier golden set  — 200 hand-labeled real pages
4. Calibration regression — score-shift detection across PRs
5. Visual regression      — overlay renders pixel-stable
6. E2E flows              — toolbar, persona switch, fix preview
7. Performance benchmarks — bundle, mount, audit, ambient
```

Each surface has clear ownership, tooling choice, CI gate. Lean on Cognivo's existing Vitest + Playwright + Turborepo cache.

### 11.2 Surface 1 — Unit tests

Pure-function logic via Vitest:
- `Scorer` math (severity weights, DR, cap formulas) — table-driven, ~50 cases
- `Classifier` signal extractors — pure functions, ~80 cases
- `SceneGraph` builder (DOM → scene with shadow piercing) — jsdom + happy-dom mix
- `RuleEngine` orchestration (cost-based scheduling, applies-gating)
- `Verifier` — every check is a unit test

Coverage gate: 90% line, 85% branch, ratcheted.

### 11.3 Surface 2 — Rule fixture tests

Every rule ships fixtures. Type-enforced via `defineRule()`.

```ts
fixture('three-tier-pricing-flat-prices')
  .render(html`...`)
  .withIntent('pricing')
  .expectFinding({
    ruleId: 'cog/anchoring/weak-spread',
    confidence: { gte: 60, lte: 90 },
  });

fixture('three-tier-pricing-good-spread')
  .render(html`...`)
  .withIntent('pricing')
  .expectNoFinding('cog/anchoring/weak-spread');
```

Each rule's PR includes ≥3 positive + ≥3 negative + ≥1 edge fixture.

### 11.4 Surface 3 — Classifier golden set *(Pattern 54)*

200 hand-labeled real-world page snapshots in `lens-core/fixtures/intents/`:
- 30+ pricing, 30+ checkout, 25+ onboarding
- 20+ signup/signin, 20+ landing, 20+ dashboards
- 15+ settings/forms, 15+ error/empty
- 25+ content

CI gates: ≥95% on `pricing/checkout/signup/signin`, ≥90% elsewhere. PRs that drop accuracy fail. Confusion matrix published per release in Lens Wire.

### 11.5 Surface 4 — Calibration regression tests

The hardest, most important surface.

Every rule pack carries a **Calibration Snapshot**:

```json
{
  "ruleId": "cog/anchoring/weak-spread",
  "version": "1.2.0",
  "scoreImpactOnGoldenSet": {
    "p50": -2.1,
    "p95": -8.3,
    "max": -14.2,
    "fixturesAffected": 23
  },
  "lastCalibrated": "v2026.04",
  "lastReviewer": "..."
}
```

PR changes a rule's predicate → CI re-runs against golden set, computes new impact distribution. **Impact shifts >2 points at p50 OR >5 points at p95** → blocked until snapshot is explicitly updated *and* changelog summarizes user-visible impact.

**Score drift solved here, in CI, by design.**

### 11.6 Surface 5 — Visual regression

Playwright + image diffs:
- Overlay rectangles across viewports (320/768/1280/1920)
- Overlay survives scroll, sticky, transformed, zoomed elements
- Persona visualizations stable (mobile frame, blurred regions, screen-reader linearization)
- Toolbar UI across themes (Cognivo is dark-first; both tested)

Snapshots committed; updates require explicit `pnpm test:visual:update`.

### 11.7 Surface 6 — E2E flows

Playwright against `apps/docs/` + fixture host pages:

| Flow | Covers |
|---|---|
| Mount + first scan | element inserts, scan completes, score appears, no console errors |
| Persona switch | mobile → score updates, viewport visualizes; a11y → linearization renders |
| Fix preview toggle | drawer opens, ON applies override, OFF reverts |
| MCP fix flow | server returns FixManifest, IDE-open dispatched correctly |
| Performance degradation | low memory → Lens steps to Light; observable in diagnostic panel |
| Closed shadow handling | host has closed-shadow → `cant-observe` finding, no crash |
| **Privacy: zero-network in OSS** | mount, 60s activity, assert *zero* outbound calls |

That last one *proves the privacy claim* in CI.

### 11.8 Surface 7 — Performance benchmarks

`benchmarks/lens/`, self-hosted runner:

| Bench | Metric | Ceiling | Failure |
|---|---|---|---|
| `bundle-size.bench` | gzipped bytes | 50 KB | hard fail |
| `mount-time.bench` | p95 main-thread ms | 15 ms | hard fail |
| `audit-pass.bench` | p95 ms over 30 fixtures | 200 ms | hard fail |
| `ambient.bench` | CPU % over 5min idle | 3% | hard fail |
| `worker-roundtrip.bench` | p95 postMessage latency | 5 ms | warn |

50× per CI pass with p50/p95/p99 reporting.

### 11.9 LLM-involved tests — recorded cassettes only

Cassette pattern (VCR/Polly-style). **No live LLM calls in CI.** Re-record requires explicit opt-in (`pnpm test:llm:record`).

### 11.10 The meta-test — Lens audits itself

Quarterly: Lens runs on Cognivo's own docs site **and the Lens toolbar**. Both must score ≥85. Regression is a release blocker.

Dogfooding turned into a CI artifact.

### 11.11 Test stack

| Layer | Tool | Existing? |
|---|---|---|
| Unit | Vitest | ✅ |
| Component | Vitest + jsdom + lit-helpers | ✅ |
| E2E | Playwright | ✅ |
| Visual regression | Playwright snapshots | ✅ |
| Bench | tinybench + custom harness | ✅ |
| LLM cassettes | New utility (~200 LOC) | new |
| Classifier accuracy | Vitest harness | new |
| Calibration snapshots | Custom CI step | new |

Three new test utilities; everything else reuses existing infrastructure.

### 11.12 PR template

- Score impact on golden set (auto-filled by CI)
- Calibration snapshot updated? (yes/no/n/a)
- Privacy-impacting change? (yes/no — flagged for security review)
- Lens Wire entry? (yes/no — for user-visible changes)

The "score impact" auto-fill is the most-load-bearing piece: every contributor sees what their change does to real users' scores.

---

## 12. Rollout — 5 Phases

> Cites: AI Playbook Phased Launch Sequencing.

| Lens release | Playbook phase | What ships | Autonomy |
|---|---|---|---|
| **Internal alpha (4 weeks)** | Phase 1 — Shadow | Run Lens on Cognivo's docs internally; tune rule packs; no user impact | None |
| **OSS v1.0** | Phase 2 — Suggestion | Observer + Score + suggestions visible. No auto-apply. **This spec.** | L1 + L2 |
| **OSS v1.5 + Pro launch** | Phase 3 — Draft | Fix-preview + IDE-MCP integration. User edits drafts. | L2 + L3 |
| **Cloud GA** | Phase 4 — Supervised | Cloud teams get auto-PR on highest-confidence deterministic fixes (still confirmation-required) | L3 |
| **Lens v3+** | Phase 5 — Autonomous | Earned only after 8 weeks of <2% undo rate per task type. Most rules never qualify. | L4 (limited) |

Phase exit criteria per playbook:
- Phase 1: accuracy >90%, no harmful outputs in 1,000 samples, latency in budget
- Phase 2: >70% suggestion acceptance, <5% negative feedback, stable error rate
- Phase 3: <20% edit rate, >80% commit rate, <5% undo rate
- Phase 4: >90% approval, <2% undo, stable trust metrics
- Phase 5: 8+ weeks of Phase 4 with <2% undo per task type

**Most fix categories will stop at Phase 3 or 4.** Phase 5 is earned through data, not assumed.

---

## 13. Anti-Patterns We Won't Fall Into

From the AI Playbook anti-pattern list:

1. **Building multi-agent before single-agent works.** v1 has *one* Lens Agent with tools. No sub-agents (Pattern 43) until single-agent is proven.
2. **Adding memory before working tools.** Tools (scan, classify, suggest, apply) ship before any cross-session memory.
3. **Optimizing cost before proving value.** v1 ships LLM verifier even though it's expensive per call. Optimization comes after adoption.
4. **Skipping permissions because internal.** Verifier + permission ladder ship in v1, not "added later for enterprise."
5. **Loading the full playbook into context.** This spec cites patterns by number; the engine never bloats system prompts with playbook prose.
6. **Custom orchestration before trying ReAct.** The Lens Agent is ReAct (Pattern 9). Graph/Crew patterns are post-v1, only if data demands.
7. **Tree of Thoughts for simple tasks.** Fix suggestion for codeable findings is deterministic where possible; ToT-style exploration only for `judgment`-category findings, post-v1.
8. **Implementing every memory type.** v1 uses only Working Memory (Pattern 23) for the active persona + audit-log. No semantic recall, no MemGPT.

Plus from your AI_DESIGN_PRINCIPLES anti-patterns:

9. **The Blank Prompt Trap.** The agent drawer never opens with "How can I help?" — it always opens with **contextual starters** based on the active findings ("Explain this finding", "Suggest a fix", "Show similar findings on this page").
10. **False Certainty.** Confidence is always shown. No finding is presented as "right" — it's "78% confident."
11. **Stealth Updates.** Every rule-pack update prompts the user; nothing changes silently.
12. **No Exit.** Lens unmounts cleanly with one click. `localStorage` clears. No lingering footprint.

---

## Appendix A — Pattern Map

Cross-reference for the construction phase. Implementation plan should cite these explicitly.

| Section | Patterns Used | Why |
|---|---|---|
| §3 Architecture | 4, 36, 76, 53, 66 | Processor pipeline, workflow patterns, bridge, observability, streaming |
| §4 Rule Packs | 17, 21, 49, 74 | Tool registry, ACI design, structured outputs, skills system |
| §5 Classifier | 33, 49, 54 | Adaptive routing, structured outputs, golden dataset |
| §6 Score Formula | 49 | Structured outputs (score is structured artifact) |
| §7 Performance | 47, 53, 71, 78 | Semantic caching, observability spans, runtime cost gating, result budget |
| §8 Personas | 23, 6 | Working memory (active persona), context engineering |
| §9 Fix Flow | 9, 13, 17, 20, 21, 49, 50, 60, 64, 70 | ReAct, CRITIC, tool registry, suspend/resume, ACI, structured outputs, guardrails, MCP, multi-layer permissions, denial tracking |
| §10 Distribution | 60, 76, 71, 74 | MCP, bridge, cost gating, skills system |
| §11 Testing | 53, 54, 55 | Observability spans, golden dataset, LLM-as-judge |
| §12 Rollout | (Playbook 5-phase launch sequencing) | Phased autonomy progression |

### Patterns explicitly *not* used in v1

| Pattern | Why deferred |
|---|---|
| 10 (Reflexion) | No cross-session learning in v1 |
| 11 (Tree of Thoughts) | Anti-pattern for simple tasks; deferred to post-v1 judgment-category fixes |
| 24 (Semantic Recall) | No memory beyond Working Memory in v1 |
| 26 (MemGPT) | Same |
| 30–35 (RAG family) | No retrieval — rule packs are loaded, not retrieved |
| 37 (Agent-as-Tool) | One agent, no sub-agents in v1 |
| 38 (Swarm Handoffs) | Same |
| 39 (Graph Orchestration) | Anti-pattern: orchestration before ReAct proves insufficient |
| 40 (Role-Based Crews) | Same |
| 41 (Multi-Agent Debate) | Same |
| 42 (Mixture-of-Agents) | Same |
| 43 (Sub-Agent Architecture) | Anti-pattern #1: single-agent first |
| 67 (Fork-Based Isolation) | No worktrees in v1 — fixes are local to one repo |
| 75 (Coordinator-Worker) | Single-agent only |

---

## Appendix B — Design Principle Map

The 8 of 17 design principles that govern Lens UX:

| # | Principle | Where it lands |
|---|---|---|
| 2 | Metacognition as Interface | Toolbar shows classifier confidence + active rule pack + active formula. Lens thinks visibly. |
| 3 | Transparent Thinking Partner | Score breakdown traces every point movement to a rule + confidence. |
| 4 | Preserve Creative Interpretation | Lens *suggests*, never *decides*. Designer chooses. |
| 9 | Enhance Human Work | Critic + suggester, not generator. Designer keeps authorship. |
| 10 | Communicate Limitations | "What Lens can't tell you" panel (§6.9). |
| 11 | Continuous Consent | Tier 0/1/2/3 privacy model. Each step asks once, persists per-session. |
| 13 | Accountability Visible | Audit log + Lens Wire changelog + formula version on every badge. |
| 17 | Design Exit as Sacred | Disabling Lens = one click. Exporting data = one click. No lock-in. |

The 7 UX patterns (all 7 used):

| UX Pattern | Where it lands |
|---|---|
| P1 — Intent Preview | Fix preview toggle (§9.5) |
| P2 — Autonomy Dial | The 4 modes: Watch / Audit / Coach / Simulate |
| P3 — Explainable Rationale | Score breakdown panel + per-finding "why" + bias citations |
| P4 — Confidence Signal | Confidence-tiered findings (90+/70-90/40-70/positives) |
| P5 — Action Audit & Undo | `.cognivo-lens.audit.jsonl` + git rollback |
| P6 — Escalation Pathway | "Wrong intent?" override + rule-feedback loop |
| P7 — Empathic Error Recovery | Cooperative-degradation ladder (§7.4) |

---

## Appendix C — Open Questions & Deferred Decisions

These are intentionally not resolved in v1 — they need data we don't have yet, or they belong to a later phase:

### Deferred to v2

1. **Browser extension UX** — exact toolbar embedding semantics for cross-origin shadow piercing.
2. **Auto-apply policy** — which fix categories qualify for auto-apply, with what confidence thresholds, after how many calibration weeks.
3. **Persona library expansion** — beyond the v1 three, which axes warrant new personas. Decided by user requests + telemetry.
4. **Heatmap mode** — needed if Persona Simulator alone doesn't cover the "see it through their eyes" demand.
5. **Lens Cloud architecture** — backend infra, residency strategy, multi-tenant isolation.

### Open for v1 design polish (not blockers)

6. **Toolbar exact visual language** — owned by design phase post-spec; this spec dictates *what's* in the toolbar, not *how it looks*.
7. **Lens Wire URL + hosting** — TBD; likely subdomain on cognivo.dev.
8. **Default rule-pack subset for "Lens Lite"** — if we ship a smaller default for resource-constrained sites (Cloudflare Workers as host?).
9. **Pricing for Pro/Cloud** — open until end-of-phase-2 data tells us willingness-to-pay.
10. **MCP tool permissions model** — how Claude Code's existing permission model interacts with Lens's permission ladder.

### Locked in (despite hand-wavy public details)

- Naming: **Cognivo Lens** ✓
- Free OSS includes the public Lens Score; paid is the workflow ✓
- 12-intent taxonomy ✓
- Three v1 personas: First-Time Mobile, Cognitively-Loaded, Screen-Reader ✓
- Date-pinned formula with 90-day overlap on revisions ✓
- Privacy Tier 0 = zero network calls in OSS ✓
- 67 curated rules across 4 packs (not 181) ✓
- Single-agent (no sub-agents) ✓
- Human-in-the-loop on every fix in v1 ✓

---

*End of spec.*
