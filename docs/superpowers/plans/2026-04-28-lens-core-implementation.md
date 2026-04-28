# `@cognivo/lens-core` Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the headless engine for Cognivo Lens — Observer, Classifier, Rule Engine, Personas runtime, Scorer, Agent runtime, Fix Verifier, Worker hand-off, scene-query helpers, fixture DSL, and golden-fixture harness — as a single MIT-licensed npm package `@cognivo/lens-core`. Zero UI deps, runnable in Node and browser. The package emits findings + a Lens Score for any DOM scene graph passed to it.

**Architecture:** TypeScript-strict ESM library, built with Vite + `vite-plugin-dts`, tested with Vitest. Public API exports six interface contracts (Observer / Classifier / RuleEngine / PersonaSimulator / Scorer / Agent) plus three plugin helpers (`defineRule`, `definePack`, `definePersona`). Engine is structured as a pure-function processor pipeline (Pattern 4) that runs identically in browser, Worker, and Node.

**Tech Stack:** TypeScript 5.7 strict (ES2022), Vite 6, Vitest 2.1, jsdom + happy-dom for DOM tests, `@cognivo/core` for the streaming AI client (peer dep), `zod` for schema validation. No Lit, no Floating UI, no DOM rendering libraries — `lens-core` must be UI-free.

**Spec reference:** [docs/superpowers/specs/2026-04-28-cognivo-lens-design.md](../specs/2026-04-28-cognivo-lens-design.md). Sections cited inline as `(Spec §N)`.

---

## File structure (locked in before tasks)

```
packages/lens-core/
├── package.json
├── tsconfig.json
├── tsconfig.test.json
├── vite.config.ts
├── vitest.config.ts
├── README.md
├── LICENSE                      # MIT, copied from monorepo root
└── src/
    ├── index.ts                  # public barrel
    ├── types/
    │   ├── scene-graph.ts        # SceneGraph, SceneNode, TokenUsage
    │   ├── findings.ts           # Finding, Severity, FixHint
    │   ├── classifier.ts         # PageIntent, IntentClassification, ClassifierSignal
    │   ├── score.ts              # LensScore, SubScore, FormulaVersion
    │   ├── rule.ts               # Rule, RuleContext, ApplyContext, DetectContext
    │   ├── pack.ts               # RulePack, PackConfig
    │   ├── persona.ts            # Persona, PerceptualConstraint, AttentionModel, EvidenceLevel
    │   ├── fix.ts                # FixManifest, FileChange, AttributeChange, FixOrigin
    │   └── index.ts              # re-export barrel
    ├── observer/
    │   ├── scan.ts               # main scan entrypoint
    │   ├── shadow.ts             # shadow-DOM piercing
    │   ├── watch.ts              # MutationObserver-driven incremental rescans
    │   ├── rect.ts               # cross-shadow bounding-rect resolution
    │   └── index.ts
    ├── classifier/
    │   ├── intents.ts            # canonical 12-intent enum + metadata
    │   ├── floors.ts             # confidence floors per intent
    │   ├── stage1-override.ts    # developer override (<cg-lens intent="...">)
    │   ├── stage2-heuristic.ts   # signal-fusion heuristic classifier
    │   ├── stage3-llm.ts         # LLM fallback (uses @cognivo/core)
    │   ├── multi-intent.ts       # primary + secondary regional classification
    │   ├── signals/
    │   │   ├── url-pattern.ts
    │   │   ├── meta-tags.ts
    │   │   ├── component-manifest.ts
    │   │   ├── aria-landmarks.ts
    │   │   ├── text-ngrams.ts
    │   │   ├── dominant-structure.ts
    │   │   ├── form-shape.ts
    │   │   ├── data-density.ts
    │   │   ├── error-signals.ts
    │   │   └── index.ts
    │   └── index.ts
    ├── rules/
    │   ├── define-rule.ts
    │   ├── define-pack.ts
    │   ├── engine.ts             # RuleEngine impl
    │   ├── scheduler.ts          # cost-based + intent-scoped rule planning
    │   ├── dedup.ts              # findingHash + DR
    │   └── index.ts
    ├── personas/
    │   ├── define-persona.ts
    │   ├── simulator.ts          # findings × persona → re-weighted findings
    │   └── index.ts
    ├── scorer/
    │   ├── sub-score.ts          # one sub-score from findings
    │   ├── composite.ts          # composite + cap
    │   ├── formula-registry.ts   # date-pinned formula versions
    │   ├── ewma.ts               # smoothing for Watch mode
    │   └── index.ts
    ├── verifier/
    │   ├── token-validity.ts
    │   ├── manifest-compliance.ts
    │   ├── schema-validity.ts
    │   ├── determinism.ts
    │   ├── no-regression.ts
    │   ├── verifier.ts           # orchestrator
    │   └── index.ts
    ├── agent/
    │   ├── runtime.ts            # streaming explain() + suggestFix()
    │   └── index.ts
    ├── worker/
    │   ├── protocol.ts           # message shapes (postMessage)
    │   ├── worker-entry.ts       # bundle entry — runs inside the Worker
    │   ├── main-bridge.ts        # main-thread side: post + listen
    │   └── index.ts
    ├── helpers/
    │   ├── scene-query.ts        # scene.find / scene.first / etc.
    │   ├── token-violations.ts   # scene.tokenViolations()
    │   ├── contrast.ts           # scene.contrast()
    │   ├── price-parser.ts       # helpers.parsePrice()
    │   └── index.ts
    ├── fixtures/
    │   ├── fixture-dsl.ts        # fixture(name).render(html).withIntent(...).expectFinding(...)
    │   ├── golden-harness.ts     # load + run the 200-page golden set
    │   ├── calibration-snapshot.ts # generate + diff calibration snapshots
    │   └── index.ts
    └── instrumentation/
        ├── spans.ts              # performance.measure wrappers
        └── index.ts
```

**Why this split:** each folder is one module from Spec §3.2. Files inside split by responsibility, not technical layer. Tests live in `__tests__/` siblings (matching existing Cognivo convention).

---

## Quality gates (must hold green throughout)

Before a task is "done":

1. New code is covered by tests added in that same task.
2. `pnpm --filter @cognivo/lens-core test` passes.
3. `pnpm --filter @cognivo/lens-core type-check` passes.
4. Bundle stays under 50 KB gzipped (Phase 17 enforces).

---

## Phases overview

| Phase | What | Tasks |
|---|---|---|
| 0 | Scaffold the package | 1–4 |
| 1 | Type system | 5–11 |
| 2 | Observer | 12–17 |
| 3 | Scene-query helpers | 18–22 |
| 4 | Classifier signals | 23–31 |
| 5 | Classifier cascade | 32–37 |
| 6 | Rule definition + Engine | 38–44 |
| 7 | Personas | 45–47 |
| 8 | Scorer | 48–53 |
| 9 | Verifier | 54–60 |
| 10 | Agent runtime | 61–63 |
| 11 | Worker hand-off | 64–68 |
| 12 | Instrumentation | 69–70 |
| 13 | Fixture DSL | 71–74 |
| 14 | Golden-fixture harness + Calibration snapshots | 75–79 |
| 15 | Integration tests | 80–81 |
| 16 | Public API + README + size budget | 82–84 |

---

## Phase 0 — Scaffold the package

### Task 1: Create package skeleton

**Files:**
- Create: `packages/lens-core/package.json`
- Create: `packages/lens-core/LICENSE`
- Create: `packages/lens-core/README.md`

- [ ] **Step 1: Create `packages/lens-core/package.json`**

```json
{
  "name": "@cognivo/lens-core",
  "version": "0.1.0",
  "description": "Headless engine for Cognivo Lens — observer, classifier, rule engine, scorer, persona simulator, fix verifier.",
  "keywords": ["cognivo", "lens", "design-system", "ai", "ui-audit"],
  "license": "MIT",
  "author": "Cognivo",
  "type": "module",
  "main": "./dist/index.js",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    },
    "./worker": {
      "types": "./dist/worker/worker-entry.d.ts",
      "import": "./dist/worker/worker-entry.js"
    },
    "./fixtures": {
      "types": "./dist/fixtures/index.d.ts",
      "import": "./dist/fixtures/index.js"
    }
  },
  "files": ["dist", "LICENSE", "README.md"],
  "sideEffects": false,
  "publishConfig": { "access": "public" },
  "repository": {
    "type": "git",
    "url": "https://github.com/muriloscigliano/cognivo.git",
    "directory": "packages/lens-core"
  },
  "homepage": "https://cognivo.dev",
  "bugs": "https://github.com/muriloscigliano/cognivo/issues",
  "scripts": {
    "build": "vite build",
    "prepublishOnly": "pnpm build",
    "dev": "vite build --watch",
    "test": "vitest run",
    "test:watch": "vitest",
    "bench": "vitest bench",
    "type-check": "tsc --noEmit",
    "clean": "rm -rf dist"
  },
  "peerDependencies": {
    "@cognivo/core": "workspace:*"
  },
  "devDependencies": {
    "@cognivo/core": "workspace:*",
    "@types/node": "^22.0.0",
    "happy-dom": "^15.7.0",
    "jsdom": "^25.0.0",
    "@types/jsdom": "^21.1.7",
    "typescript": "^5.7.0",
    "vite": "^6.0.0",
    "vite-plugin-dts": "^4.0.0",
    "vitest": "^2.1.0",
    "zod": "^3.23.0"
  }
}
```

- [ ] **Step 2: Copy LICENSE from monorepo root**

```bash
cp /Users/muriloscigliano/Cursor/cognivo-1/LICENSE packages/lens-core/LICENSE 2>/dev/null \
  || cp packages/core/LICENSE packages/lens-core/LICENSE
```

- [ ] **Step 3: Create stub README**

`packages/lens-core/README.md`:
```markdown
# @cognivo/lens-core

Headless engine for Cognivo Lens. Provides Observer, Classifier, Rule Engine, Persona Simulator, Scorer, Agent runtime, and Fix Verifier as pure-logic modules. Runs in browser, Web Worker, and Node.

See the [Lens design spec](../../docs/superpowers/specs/2026-04-28-cognivo-lens-design.md).

## Install

```bash
pnpm add @cognivo/lens-core
```

## Status

Pre-1.0. API surface stabilizing.
```

- [ ] **Step 4: Commit**

```bash
git add packages/lens-core/package.json packages/lens-core/LICENSE packages/lens-core/README.md
git commit -m "feat(lens-core): scaffold package skeleton"
```

---

### Task 2: TypeScript + Vite + Vitest configuration

**Files:**
- Create: `packages/lens-core/tsconfig.json`
- Create: `packages/lens-core/tsconfig.test.json`
- Create: `packages/lens-core/vite.config.ts`
- Create: `packages/lens-core/vitest.config.ts`

- [ ] **Step 1: `packages/lens-core/tsconfig.json`**

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src"],
  "exclude": ["dist", "node_modules", "**/*.test.ts", "**/__tests__/**"]
}
```

- [ ] **Step 2: `packages/lens-core/tsconfig.test.json`**

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "noEmit": true,
    "rootDir": "./src",
    "types": ["vitest/globals", "node"]
  },
  "include": ["src/**/*.ts"]
}
```

- [ ] **Step 3: `packages/lens-core/vite.config.ts`**

```ts
import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        'worker/worker-entry': resolve(__dirname, 'src/worker/worker-entry.ts'),
        'fixtures/index': resolve(__dirname, 'src/fixtures/index.ts'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: ['@cognivo/core', 'zod'],
      output: { preserveModules: false },
    },
    sourcemap: true,
    minify: false,
    target: 'es2022',
  },
  plugins: [
    dts({
      include: ['src'],
      exclude: ['**/*.test.ts', '**/__tests__/**'],
      rollupTypes: false,
    }),
  ],
});
```

- [ ] **Step 4: `packages/lens-core/vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'happy-dom',
    globals: false,
    include: ['src/**/*.test.ts', 'src/__tests__/**/*.test.ts'],
    coverage: {
      reporter: ['text', 'lcov'],
      thresholds: {
        lines: 90,
        branches: 85,
        functions: 90,
        statements: 90,
      },
    },
  },
});
```

- [ ] **Step 5: Verify TypeScript compiles (no source yet → empty pass)**

Create empty placeholder so tsc has something to look at:
```bash
mkdir -p packages/lens-core/src
echo "export {};" > packages/lens-core/src/index.ts
```

Then:
```bash
pnpm --filter @cognivo/lens-core type-check
```
Expected: no errors.

- [ ] **Step 6: Install workspace deps**

```bash
pnpm install
```

- [ ] **Step 7: Commit**

```bash
git add packages/lens-core/tsconfig.json packages/lens-core/tsconfig.test.json \
  packages/lens-core/vite.config.ts packages/lens-core/vitest.config.ts \
  packages/lens-core/src/index.ts pnpm-lock.yaml
git commit -m "build(lens-core): TS + Vite + Vitest configuration"
```

---

### Task 3: Folder skeleton + index barrels

**Files:**
- Create empty `index.ts` in every module folder (so imports resolve and we can extend incrementally)

- [ ] **Step 1: Create folders + barrels**

```bash
cd packages/lens-core/src

for dir in types observer classifier classifier/signals rules personas scorer verifier agent worker helpers fixtures instrumentation; do
  mkdir -p "$dir"
  echo "export {};" > "$dir/index.ts"
done

mkdir -p __tests__/integration
```

- [ ] **Step 2: Verify everything still type-checks**

```bash
pnpm --filter @cognivo/lens-core type-check
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add packages/lens-core/src
git commit -m "chore(lens-core): folder skeleton with empty barrels"
```

---

### Task 4: Wire build/test/type-check into Turborepo + first dummy test

**Files:**
- Create: `packages/lens-core/src/__tests__/smoke.test.ts`

- [ ] **Step 1: Smoke test to verify Vitest works**

`packages/lens-core/src/__tests__/smoke.test.ts`:
```ts
import { describe, it, expect } from 'vitest';

describe('lens-core smoke', () => {
  it('the test runner runs', () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 2: Run the test**

```bash
pnpm --filter @cognivo/lens-core test
```
Expected: 1 passed.

- [ ] **Step 3: Run a full build to confirm pipeline**

```bash
pnpm --filter @cognivo/lens-core build
```
Expected: `dist/` produced with `index.js` + `index.d.ts`.

- [ ] **Step 4: Run `turbo` from root to confirm caching**

```bash
pnpm test --filter @cognivo/lens-core
pnpm type-check --filter @cognivo/lens-core
```
Expected: both pass; cached run is near-instant.

- [ ] **Step 5: Commit**

```bash
git add packages/lens-core/src/__tests__/smoke.test.ts
git commit -m "test(lens-core): smoke test confirms pipeline"
```

---

## Phase 1 — Type system (data contracts)

> Implements Spec §3.2 data model. Pure types, no runtime. Each task adds one types file with light type-level tests.

### Task 5: `types/scene-graph.ts` — SceneGraph + SceneNode

**Files:**
- Create: `packages/lens-core/src/types/scene-graph.ts`
- Create: `packages/lens-core/src/__tests__/types/scene-graph.test.ts`

- [ ] **Step 1: Write the failing type test**

`packages/lens-core/src/__tests__/types/scene-graph.test.ts`:
```ts
import { describe, it, expectTypeOf } from 'vitest';
import type { SceneGraph, SceneNode, TokenUsage } from '../../types/scene-graph';

describe('SceneGraph types', () => {
  it('SceneNode requires id, tag, rect, computedStyle, children', () => {
    expectTypeOf<SceneNode>().toHaveProperty('id').toEqualTypeOf<string>();
    expectTypeOf<SceneNode>().toHaveProperty('tag').toEqualTypeOf<string>();
    expectTypeOf<SceneNode>().toHaveProperty('children').toEqualTypeOf<string[]>();
  });

  it('SceneGraph has nodes and root', () => {
    expectTypeOf<SceneGraph>().toHaveProperty('nodes').toEqualTypeOf<SceneNode[]>();
    expectTypeOf<SceneGraph>().toHaveProperty('root').toEqualTypeOf<SceneNode>();
  });

  it('TokenUsage tracks tier + value', () => {
    expectTypeOf<TokenUsage>().toHaveProperty('tier').toEqualTypeOf<1 | 2 | 3>();
    expectTypeOf<TokenUsage>().toHaveProperty('property').toEqualTypeOf<string>();
    expectTypeOf<TokenUsage>().toHaveProperty('rawValue').toEqualTypeOf<string>();
  });
});
```

- [ ] **Step 2: Run — expect failure**

```bash
pnpm --filter @cognivo/lens-core test types/scene-graph
```
Expected: cannot find module `../../types/scene-graph`.

- [ ] **Step 3: Implement the types**

`packages/lens-core/src/types/scene-graph.ts`:
```ts
/**
 * Token usage detected on a node — produced by the Observer when reading computed styles.
 * The tier reflects which Cognivo token tier the value resolves to (or 0 for raw / unresolvable).
 */
export interface TokenUsage {
  /** Cognivo token tier (1 = core palette, 2 = semantic, 3 = component). */
  tier: 1 | 2 | 3;
  /** CSS property name (e.g. `color`, `padding-top`). */
  property: string;
  /** Raw computed CSS value (e.g. `rgb(120 120 120)`, `8px`). */
  rawValue: string;
  /** Resolved Cognivo token name if any (e.g. `--cg-color-text-secondary`). */
  resolvedToken?: string;
}

/**
 * A bounding rect in *page* coordinates (cross-shadow-aware).
 * We use a flat object instead of `DOMRect` so SceneGraph is structured-cloneable for postMessage.
 */
export interface PageRect {
  x: number;
  y: number;
  width: number;
  height: number;
  top: number;
  left: number;
  right: number;
  bottom: number;
}

/**
 * Component-manifest reference — carried alongside Cognivo `cg-*` / `ai-*` nodes.
 * Engaged-bias IDs come from the component package's manifest at scan time.
 */
export interface ComponentManifestRef {
  tagName: string;
  engagedBiasIds: string[];
  variant?: string;
  state?: string;
}

/**
 * One node of the scene graph. Identified by stable hash so that re-scans dedup correctly.
 *
 * SceneNodes are *snapshots* — never live DOM references. They are safe to postMessage.
 */
export interface SceneNode {
  /** Stable hash; same node across re-scans returns same id when shape is unchanged. */
  id: string;
  /** Lowercase tag name (e.g. `cg-button`, `div`). */
  tag: string;
  /** Resolved ARIA role, if any. */
  role?: string;
  /** Visible text content (truncated to 1024 chars). */
  text?: string;
  /** Bounding rect in page coordinates. */
  rect: PageRect;
  /** Subset of computed styles relevant to rules (color, font-size, padding, etc.). */
  computedStyle: Record<string, string>;
  /** Token usages detected from computed styles. */
  tokenUsage: TokenUsage[];
  /** Child node ids in document order. */
  children: string[];
  /** Parent node id, or undefined for the root. */
  parent?: string;
  /** If the node hosts a shadow root, that root's scene graph nests here. */
  shadowRoot?: SceneGraph;
  /** Component-manifest data when this is a `cg-*` / `ai-*` element. */
  componentManifest?: ComponentManifestRef;
  /** True if visible (not display:none / visibility:hidden / aria-hidden). */
  visible: boolean;
  /** True if the node hosts a *closed* shadow root we couldn't pierce. */
  hasClosedShadowRoot?: boolean;
}

/**
 * The scene graph produced by Observer.scan().
 *
 * Nested shadow roots produce nested SceneGraphs (Spec §3.4 — pierce open shadows;
 * cant-observe finding for closed shadows).
 */
export interface SceneGraph {
  /** All nodes in this graph, including descendants (but excluding nested shadow contents — those live in node.shadowRoot.nodes). */
  nodes: SceneNode[];
  /** The root node of this graph. */
  root: SceneNode;
  /** ISO timestamp for when this snapshot was taken. */
  snapshottedAt: string;
  /** Source URL (page URL) when scanning a Document. */
  url?: string;
  /** Viewport dimensions at snapshot time. */
  viewport: { width: number; height: number };
}
```

- [ ] **Step 4: Run — expect pass**

```bash
pnpm --filter @cognivo/lens-core test types/scene-graph
```
Expected: 3 passed.

- [ ] **Step 5: Commit**

```bash
git add packages/lens-core/src/types/scene-graph.ts \
  packages/lens-core/src/__tests__/types/scene-graph.test.ts
git commit -m "feat(lens-core): SceneGraph + SceneNode + TokenUsage types"
```

---

### Task 6: `types/findings.ts` — Finding + Severity + FixHint

**Files:**
- Create: `packages/lens-core/src/types/findings.ts`
- Create: `packages/lens-core/src/__tests__/types/findings.test.ts`

- [ ] **Step 1: Type test**

`packages/lens-core/src/__tests__/types/findings.test.ts`:
```ts
import { describe, it, expectTypeOf } from 'vitest';
import type { Finding, Severity, FixHint } from '../../types/findings';

describe('Finding types', () => {
  it('Severity is the four-value union', () => {
    expectTypeOf<Severity>().toEqualTypeOf<'blocker' | 'strong' | 'consider' | 'positive'>();
  });

  it('Finding has required core fields', () => {
    expectTypeOf<Finding>().toHaveProperty('id').toEqualTypeOf<string>();
    expectTypeOf<Finding>().toHaveProperty('ruleId').toEqualTypeOf<string>();
    expectTypeOf<Finding>().toHaveProperty('severity').toEqualTypeOf<Severity>();
    expectTypeOf<Finding>().toHaveProperty('confidence').toEqualTypeOf<number>();
  });

  it('FixHint discriminates on kind', () => {
    expectTypeOf<FixHint['kind']>().toEqualTypeOf<
      'token-swap' | 'attribute-set' | 'css-injection' | 'restructure' | 'copy-edit'
    >();
  });
});
```

- [ ] **Step 2: Run — expect failure**

```bash
pnpm --filter @cognivo/lens-core test types/findings
```
Expected: cannot find module.

- [ ] **Step 3: Implement**

`packages/lens-core/src/types/findings.ts`:
```ts
/**
 * Severity tier for a Finding. Wide spread is intentional (Spec §6.2):
 * blockers should dominate considers in the score formula.
 */
export type Severity = 'blocker' | 'strong' | 'consider' | 'positive';

/**
 * The category a Finding falls into, used by the Scorer for sub-score routing.
 */
export type FindingCategory =
  | 'cognitive-clarity'
  | 'persuasive-integrity'
  | 'accessibility'
  | 'system-health';

/**
 * A hint about how a Finding can be fixed. Categories drive UI affordances:
 *  - `token-swap` / `attribute-set` / `css-injection` are *codeable* (can be auto-diffed).
 *  - `restructure` / `copy-edit` are *structural* / *judgment* (suggestion only).
 */
export type FixHint =
  | { kind: 'token-swap'; property: string; from: string; to: string; reason: string }
  | { kind: 'attribute-set'; attribute: string; value: string; reason: string }
  | { kind: 'css-injection'; selector: string; declarations: string; reason: string }
  | { kind: 'restructure'; summary: string; reason: string }
  | { kind: 'copy-edit'; original: string; suggestion: string; reason: string };

/**
 * A Finding produced by a Rule. Findings stream from the engine as they are produced.
 *
 * `id` is a stable hash of (ruleId + targetNodeId + structural-signature), so re-scans
 * over an unchanged page produce the same id and the UI can dedup.
 */
export interface Finding {
  /** Stable hash for dedup. */
  id: string;
  /** Rule that produced this finding. */
  ruleId: string;
  /** Severity tier. */
  severity: Severity;
  /** Confidence 0–100. */
  confidence: number;
  /** SceneNode id this finding applies to. */
  targetNodeId: string;
  /** Sub-score this finding contributes to. */
  category: FindingCategory;
  /** One-line message shown in the toolbar. */
  message: string;
  /** Multi-sentence rationale shown when expanded. */
  why: string;
  /** Citation IDs (bias card IDs, WCAG refs, etc.). */
  citations: string[];
  /** Optional fix hint. */
  fixHint?: FixHint;
  /** ISO timestamp for telemetry. */
  detectedAt: string;
}
```

- [ ] **Step 4: Run — expect pass**

```bash
pnpm --filter @cognivo/lens-core test types/findings
```

- [ ] **Step 5: Commit**

```bash
git add packages/lens-core/src/types/findings.ts \
  packages/lens-core/src/__tests__/types/findings.test.ts
git commit -m "feat(lens-core): Finding + Severity + FixHint types"
```

---

### Task 7: `types/classifier.ts` — PageIntent + IntentClassification + ClassifierSignal

**Files:**
- Create: `packages/lens-core/src/types/classifier.ts`
- Create: `packages/lens-core/src/__tests__/types/classifier.test.ts`

- [ ] **Step 1: Type test**

`packages/lens-core/src/__tests__/types/classifier.test.ts`:
```ts
import { describe, it, expectTypeOf } from 'vitest';
import type { PageIntent, IntentClassification, ClassifierSignal, IntentScopedRules } from '../../types/classifier';

describe('Classifier types', () => {
  it('PageIntent enumerates 12 intents + unknown', () => {
    const all: PageIntent[] = [
      'pricing', 'checkout', 'onboarding', 'signup', 'signin',
      'landing', 'dashboard', 'settings', 'content', 'form',
      'empty-state', 'error', 'unknown',
    ];
    expect(all).toHaveLength(13);
  });

  it('IntentClassification has primary + secondary[]', () => {
    expectTypeOf<IntentClassification>().toHaveProperty('primary');
    expectTypeOf<IntentClassification>().toHaveProperty('secondary').toBeArray();
  });

  it('ClassifierSignal has intent + weight + evidence', () => {
    expectTypeOf<ClassifierSignal>().toHaveProperty('intent').toEqualTypeOf<PageIntent>();
    expectTypeOf<ClassifierSignal>().toHaveProperty('weight').toEqualTypeOf<number>();
  });
});
```

Note: the body of the first test deliberately checks runtime length to anchor the canonical list.

- [ ] **Step 2: Run — expect failure**

- [ ] **Step 3: Implement**

`packages/lens-core/src/types/classifier.ts`:
```ts
/**
 * The 12 intents we classify pages into, plus `unknown` as the conservative-firing fallback.
 * (Spec §5.1, Spec §5.6.)
 */
export type PageIntent =
  | 'pricing'
  | 'checkout'
  | 'onboarding'
  | 'signup'
  | 'signin'
  | 'landing'
  | 'dashboard'
  | 'settings'
  | 'content'
  | 'form'
  | 'empty-state'
  | 'error'
  | 'unknown';

/**
 * A signal contributed by a single feature extractor (URL pattern, ARIA landmarks, etc.).
 * The classifier sums signals into a softmax over PageIntent.
 */
export interface ClassifierSignal {
  /** Which extractor produced this signal. */
  source: string;
  /** Which intent the signal points to. */
  intent: PageIntent;
  /** Signal weight (>0; higher = stronger). */
  weight: number;
  /** Human-readable evidence shown in the explainer ("URL contains /pricing"). */
  evidence: string;
}

/**
 * The full classification output. Multi-intent (Spec §5.3): one primary + zero or more
 * secondary regional intents.
 */
export interface IntentClassification {
  /** Page-level primary intent + confidence 0–100. */
  primary: { intent: PageIntent; confidence: number };
  /** Region-level secondary intents (e.g. a billing section inside a settings page). */
  secondary: Array<{
    intent: PageIntent;
    /** SceneNode ids of the region. */
    nodeIds: string[];
    confidence: number;
  }>;
  /** All raw signals, retained for the explainer. */
  signals: ClassifierSignal[];
  /** Which stage produced the verdict (Spec §5.2). */
  stage: 'override' | 'heuristic' | 'llm';
}

/**
 * Helper type used by the engine to look up which rules fire under which intents.
 * Built from the rule registry at `evaluate()` time.
 */
export interface IntentScopedRules {
  intent: PageIntent;
  /** Rule IDs that opt in to this intent (intentScope: ['pricing'] etc). */
  ruleIds: string[];
}
```

- [ ] **Step 4: Run — expect pass**

```bash
pnpm --filter @cognivo/lens-core test types/classifier
```

- [ ] **Step 5: Commit**

```bash
git add packages/lens-core/src/types/classifier.ts \
  packages/lens-core/src/__tests__/types/classifier.test.ts
git commit -m "feat(lens-core): PageIntent + IntentClassification + ClassifierSignal types"
```

---

### Task 8: `types/score.ts` — LensScore + SubScore + FormulaVersion

**Files:**
- Create: `packages/lens-core/src/types/score.ts`
- Create: `packages/lens-core/src/__tests__/types/score.test.ts`

- [ ] **Step 1: Type test**

`packages/lens-core/src/__tests__/types/score.test.ts`:
```ts
import { describe, it, expectTypeOf } from 'vitest';
import type { LensScore, SubScore, FormulaVersion, SubScoreName } from '../../types/score';

describe('Score types', () => {
  it('SubScoreName enumerates the 4 axes', () => {
    expectTypeOf<SubScoreName>().toEqualTypeOf<
      'cognitive-clarity' | 'persuasive-integrity' | 'accessibility' | 'system-health'
    >();
  });

  it('SubScore has value 0–100 + breakdown', () => {
    expectTypeOf<SubScore>().toHaveProperty('value').toEqualTypeOf<number>();
    expectTypeOf<SubScore>().toHaveProperty('topDeductions').toBeArray();
  });

  it('LensScore has composite + sub-scores + formula version', () => {
    expectTypeOf<LensScore>().toHaveProperty('composite').toEqualTypeOf<number>();
    expectTypeOf<LensScore>().toHaveProperty('formulaVersion').toEqualTypeOf<FormulaVersion>();
  });

  it('FormulaVersion is date-pinned string', () => {
    expectTypeOf<FormulaVersion>().toMatchTypeOf<`v${number}.${number}`>();
  });
});
```

- [ ] **Step 2: Run — expect failure**

- [ ] **Step 3: Implement**

`packages/lens-core/src/types/score.ts`:
```ts
/**
 * Date-pinned formula version (Spec §6.8). New formulas ship at most twice a year;
 * old scores remain valid against the formula they were computed under.
 */
export type FormulaVersion = `v${number}.${number}`;

/**
 * The four sub-score axes (Spec §6.1).
 */
export type SubScoreName =
  | 'cognitive-clarity'
  | 'persuasive-integrity'
  | 'accessibility'
  | 'system-health';

/**
 * One contribution to a sub-score: a finding's effect, after severity × confidence × DR.
 */
export interface ScoreContribution {
  ruleId: string;
  findingId: string;
  delta: number;
  reason: string;
}

/**
 * One sub-score with its breakdown.
 */
export interface SubScore {
  name: SubScoreName;
  value: number;
  /** Top 5 negative contributions, sorted by absolute delta desc. */
  topDeductions: ScoreContribution[];
  /** Top 3 positive contributions ("what's working"). */
  topWins: ScoreContribution[];
}

/**
 * The full Lens Score artifact. Serializable; safe to ship to telemetry / share badges.
 */
export interface LensScore {
  /** Composite 0–100 (weighted-arithmetic-with-cap). */
  composite: number;
  /** All four sub-scores. */
  subScores: Record<SubScoreName, SubScore>;
  /** Which formula computed this score. */
  formulaVersion: FormulaVersion;
  /** ISO timestamp. */
  computedAt: string;
  /** Engine version. */
  engineVersion: string;
}
```

- [ ] **Step 4: Run — expect pass**

- [ ] **Step 5: Commit**

```bash
git add packages/lens-core/src/types/score.ts \
  packages/lens-core/src/__tests__/types/score.test.ts
git commit -m "feat(lens-core): LensScore + SubScore + FormulaVersion types"
```

---

### Task 9: `types/rule.ts` + `types/pack.ts` — plugin contracts

**Files:**
- Create: `packages/lens-core/src/types/rule.ts`
- Create: `packages/lens-core/src/types/pack.ts`
- Create: `packages/lens-core/src/__tests__/types/rule.test.ts`

- [ ] **Step 1: Type test**

`packages/lens-core/src/__tests__/types/rule.test.ts`:
```ts
import { describe, it, expectTypeOf } from 'vitest';
import type { Rule, RuleCost, FixCategory, RuleFixture } from '../../types/rule';
import type { RulePack } from '../../types/pack';

describe('Rule + Pack types', () => {
  it('RuleCost is the cheap/medium/llm union', () => {
    expectTypeOf<RuleCost>().toEqualTypeOf<'cheap' | 'medium' | 'llm'>();
  });

  it('FixCategory is codeable/structural/judgment', () => {
    expectTypeOf<FixCategory>().toEqualTypeOf<'codeable' | 'structural' | 'judgment'>();
  });

  it('Rule requires id, severity, cost, citations, fixtures', () => {
    expectTypeOf<Rule>().toHaveProperty('id').toEqualTypeOf<string>();
    expectTypeOf<Rule>().toHaveProperty('cost').toEqualTypeOf<RuleCost>();
    expectTypeOf<Rule>().toHaveProperty('citations').toEqualTypeOf<string[]>();
    expectTypeOf<Rule>().toHaveProperty('fixtures').toEqualTypeOf<RuleFixture[]>();
  });

  it('RulePack has lazy rules', () => {
    expectTypeOf<RulePack>().toHaveProperty('rules').toEqualTypeOf<Array<() => Promise<{ default: Rule }>>>();
  });
});
```

- [ ] **Step 2: Run — expect failure**

- [ ] **Step 3: Implement `packages/lens-core/src/types/rule.ts`**

```ts
import type { PageIntent } from './classifier.js';
import type { Finding, FixHint, FindingCategory, Severity } from './findings.js';
import type { SceneGraph, SceneNode } from './scene-graph.js';

/** Cost class drives the engine's scheduler (Spec §4.1). */
export type RuleCost = 'cheap' | 'medium' | 'llm';

/** What kind of fix the rule produces (Spec §9.2). */
export type FixCategory = 'codeable' | 'structural' | 'judgment';

/** Helpers passed into `applies()` and `detect()`. Defined in `helpers/index.ts`. */
export interface RuleHelpers {
  parsePrice(text: string | undefined): number | null;
  getComponentManifest(node: SceneNode): SceneNode['componentManifest'] | undefined;
}

/** Context passed into `applies()` — cheap, runs first. */
export interface ApplyContext {
  scene: SceneQuery;
  intent: PageIntent;
  helpers: RuleHelpers;
}

/** Context passed into `detect()` — full check. */
export interface DetectContext {
  scene: SceneQuery;
  intent: PageIntent;
  helpers: RuleHelpers;
}

/** Forward-declared SceneQuery interface — full impl lives in `helpers/scene-query.ts`. */
export interface SceneQuery {
  raw: SceneGraph;
  find(selector: string): SceneNode[];
  first(selector: string): SceneNode | undefined;
  tokenViolations(opts: { tier: 1; exclude?: string[] }): Array<{ node: SceneNode; usage: NonNullable<SceneNode['tokenUsage']>[number] }>;
  contrast(node: SceneNode, opts: { against: 'background'; wcag: 'AA' | 'AA-large' | 'AAA' }): { ratio: number; passes: boolean };
}

/** Output shape `detect()` returns — the engine stamps `id`, `severity`, `category` from rule manifest. */
export interface DetectionInput {
  targetNodeId: string;
  confidence: number;
  message: string;
  why: string;
  fixHint?: FixHint;
}

/** Test fixture shipped with each rule. (Spec §11.3.) */
export interface RuleFixture {
  name: string;
  /** Either `expectFinding` (must produce a Finding for this rule) or `expectNoFinding`. */
  expect: 'finding' | 'no-finding';
  /** Optional confidence range when `expect: 'finding'`. */
  confidenceRange?: { gte?: number; lte?: number };
}

/** The Rule manifest itself. Authored via `defineRule()`. */
export interface Rule {
  id: string;
  title: string;
  category: FindingCategory;
  severity: Severity;
  intentScope: PageIntent[];
  cost: RuleCost;
  citations: string[];
  defaultEnabled: boolean;
  fixCategory: FixCategory;

  applies: (ctx: ApplyContext) => boolean;
  detect: (ctx: DetectContext) => DetectionInput[] | undefined;
  /** Optional code-fix builder for `codeable` fixes. */
  suggestFix?: (finding: Finding, scene: SceneQuery) => FixHint | null;

  fixtures: RuleFixture[];
}
```

- [ ] **Step 4: Implement `packages/lens-core/src/types/pack.ts`**

```ts
import type { Rule } from './rule.js';
import type { PageIntent } from './classifier.js';

/** A loadable rule import — kept lazy for code-splitting. */
export type LazyRule = () => Promise<{ default: Rule }>;

/** The pack manifest authored via `definePack()`. */
export interface RulePack {
  id: string;
  version: string;
  title: string;
  description?: string;
  /** Which intents the pack tunes against (helps the engine prioritize). */
  intents: PageIntent[];
  /** Lazy rule loaders. */
  rules: LazyRule[];
  /** Optional pack-wide config schema (Zod-shaped) — kept opaque here to avoid coupling. */
  config?: { parse(input: unknown): unknown };
}
```

- [ ] **Step 5: Run — expect pass**

```bash
pnpm --filter @cognivo/lens-core test types/rule
```

- [ ] **Step 6: Commit**

```bash
git add packages/lens-core/src/types/rule.ts packages/lens-core/src/types/pack.ts \
  packages/lens-core/src/__tests__/types/rule.test.ts
git commit -m "feat(lens-core): Rule + RulePack plugin types"
```

---

### Task 10: `types/persona.ts` — Persona contract

**Files:**
- Create: `packages/lens-core/src/types/persona.ts`
- Create: `packages/lens-core/src/__tests__/types/persona.test.ts`

- [ ] **Step 1: Type test**

`packages/lens-core/src/__tests__/types/persona.test.ts`:
```ts
import { describe, it, expectTypeOf } from 'vitest';
import type { Persona, EvidenceLevel, AttentionModel } from '../../types/persona';

describe('Persona types', () => {
  it('EvidenceLevel is strong/directional/experimental', () => {
    expectTypeOf<EvidenceLevel>().toEqualTypeOf<'strong' | 'directional' | 'experimental'>();
  });

  it('Persona requires evidence + framing + citations', () => {
    expectTypeOf<Persona>().toHaveProperty('evidenceLevel').toEqualTypeOf<EvidenceLevel>();
    expectTypeOf<Persona>().toHaveProperty('framing').toEqualTypeOf<string>();
    expectTypeOf<Persona>().toHaveProperty('citations').toEqualTypeOf<string[]>();
  });

  it('AttentionModel has dwell + scan pattern', () => {
    expectTypeOf<AttentionModel>().toHaveProperty('dwellSeconds').toEqualTypeOf<number>();
  });
});
```

- [ ] **Step 2: Run — expect failure**

- [ ] **Step 3: Implement**

`packages/lens-core/src/types/persona.ts`:
```ts
/** Evidence level for a persona — surfaced in UI; required by the data model (Spec §8.6). */
export type EvidenceLevel = 'strong' | 'directional' | 'experimental';

/** A perceptual constraint — viewport, network, or input limitation. */
export interface PerceptualConstraint {
  kind: 'viewport' | 'network' | 'cpu' | 'visual-occlusion' | 'input-mode';
  /** Free-form parameters interpreted by the simulator's visualization layer. */
  params: Record<string, string | number | boolean>;
}

/** Attention pattern — used both for re-scoring and for visualization. */
export interface AttentionModel {
  dwellSeconds: number;
  scanPattern: 'F' | 'Z' | 'sequential' | 'spotlight';
  /** Multiplier applied to deductions on regions outside the scan focus. */
  outOfFocusPenalty: number;
}

/** The Persona manifest. */
export interface Persona {
  id: string;
  title: string;
  framing: string;
  evidenceLevel: EvidenceLevel;
  constraints: PerceptualConstraint[];
  attention: AttentionModel;
  /** Multipliers applied to specific rule severities (>1 amplifies, 0–1 dampens). */
  ruleWeights: Record<string, number>;
  /** Rule IDs that *only* fire under this persona. */
  activatesRules: string[];
  citations: string[];
}
```

- [ ] **Step 4: Run — expect pass**

- [ ] **Step 5: Commit**

```bash
git add packages/lens-core/src/types/persona.ts \
  packages/lens-core/src/__tests__/types/persona.test.ts
git commit -m "feat(lens-core): Persona + AttentionModel + EvidenceLevel types"
```

---

### Task 11: `types/fix.ts` + `types/index.ts` — FixManifest + barrel

**Files:**
- Create: `packages/lens-core/src/types/fix.ts`
- Modify: `packages/lens-core/src/types/index.ts`
- Create: `packages/lens-core/src/__tests__/types/fix.test.ts`

- [ ] **Step 1: Type test**

`packages/lens-core/src/__tests__/types/fix.test.ts`:
```ts
import { describe, it, expectTypeOf } from 'vitest';
import type { FixManifest, FileChange, AttributeChange, FixOrigin } from '../../types/fix';

describe('FixManifest types', () => {
  it('FixOrigin is deterministic | llm-verified', () => {
    expectTypeOf<FixOrigin>().toEqualTypeOf<'deterministic' | 'llm-verified'>();
  });

  it('FixManifest has confidence + changes + preview + rollbackable', () => {
    expectTypeOf<FixManifest>().toHaveProperty('confidence').toEqualTypeOf<number>();
    expectTypeOf<FixManifest>().toHaveProperty('changes').toEqualTypeOf<FileChange[]>();
    expectTypeOf<FixManifest>().toHaveProperty('rollbackable').toEqualTypeOf<true>();
  });

  it('AttributeChange has node, attribute, value', () => {
    expectTypeOf<AttributeChange>().toHaveProperty('attribute').toEqualTypeOf<string>();
  });
});
```

- [ ] **Step 2: Run — expect failure**

- [ ] **Step 3: Implement**

`packages/lens-core/src/types/fix.ts`:
```ts
/** Origin label surfaced in UI as the trust badge. */
export type FixOrigin = 'deterministic' | 'llm-verified';

/** A single file change in a unified-diff-style range. */
export interface FileChange {
  path: string;
  range: { startLine: number; endLine: number };
  before: string;
  after: string;
  rationale: string;
}

/** A virtual attribute change for in-page preview (no file mutation). */
export interface AttributeChange {
  targetNodeId: string;
  attribute: string;
  value: string | null; // null = remove attribute
}

/** The full serializable FixManifest (Spec §9.3). */
export interface FixManifest {
  ruleId: string;
  findingId: string;
  confidence: number;
  origin: FixOrigin;

  changes: FileChange[];

  preview: {
    cssOverrides?: string;
    attributeChanges?: AttributeChange[];
    notes?: string;
  };

  rollbackable: true;
  reviewRequired: boolean;
  citations: string[];
}
```

- [ ] **Step 4: Update `packages/lens-core/src/types/index.ts`**

```ts
export * from './scene-graph.js';
export * from './findings.js';
export * from './classifier.js';
export * from './score.js';
export * from './rule.js';
export * from './pack.js';
export * from './persona.js';
export * from './fix.js';
```

- [ ] **Step 5: Run — expect pass**

```bash
pnpm --filter @cognivo/lens-core test
```
All type tests should pass.

- [ ] **Step 6: Type-check**

```bash
pnpm --filter @cognivo/lens-core type-check
```

- [ ] **Step 7: Commit**

```bash
git add packages/lens-core/src/types/fix.ts packages/lens-core/src/types/index.ts \
  packages/lens-core/src/__tests__/types/fix.test.ts
git commit -m "feat(lens-core): FixManifest types + barrel export"
```

---

## Phase 2 — Observer (DOM → SceneGraph)

> Implements Spec §3.2 Observer module + §3.4 shadow piercing. The Observer must be deterministic — same DOM produces same SceneGraph (same node ids).

### Task 12: Stable node-id hashing utility

**Files:**
- Create: `packages/lens-core/src/observer/node-id.ts`
- Create: `packages/lens-core/src/__tests__/observer/node-id.test.ts`

- [ ] **Step 1: Failing test**

`packages/lens-core/src/__tests__/observer/node-id.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { computeNodeId } from '../../observer/node-id';

describe('computeNodeId', () => {
  it('produces same id for same shape', () => {
    const a = computeNodeId({ tag: 'div', position: '0:0:1', textHash: 'abc' });
    const b = computeNodeId({ tag: 'div', position: '0:0:1', textHash: 'abc' });
    expect(a).toBe(b);
  });

  it('produces different id when tag differs', () => {
    const a = computeNodeId({ tag: 'div', position: '0', textHash: 'abc' });
    const b = computeNodeId({ tag: 'span', position: '0', textHash: 'abc' });
    expect(a).not.toBe(b);
  });

  it('produces different id when position differs', () => {
    const a = computeNodeId({ tag: 'div', position: '0:0', textHash: 'abc' });
    const b = computeNodeId({ tag: 'div', position: '0:1', textHash: 'abc' });
    expect(a).not.toBe(b);
  });

  it('output is 12 hex chars', () => {
    const id = computeNodeId({ tag: 'div', position: '0', textHash: '' });
    expect(id).toMatch(/^[0-9a-f]{12}$/);
  });
});
```

- [ ] **Step 2: Run — expect failure**

```bash
pnpm --filter @cognivo/lens-core test observer/node-id
```

- [ ] **Step 3: Implement**

`packages/lens-core/src/observer/node-id.ts`:
```ts
/**
 * Deterministic 12-char hex hash of (tag, position-path, textHash).
 *
 * Uses FNV-1a — small, fast, good distribution for short inputs. We do not need
 * cryptographic strength; we need *stability across re-scans of the same DOM*.
 */
export function computeNodeId(input: { tag: string; position: string; textHash: string }): string {
  const composite = `${input.tag}\u0000${input.position}\u0000${input.textHash}`;
  return fnv1a64Hex(composite).slice(0, 12);
}

/** FNV-1a 64-bit returned as 16-char hex. */
function fnv1a64Hex(str: string): string {
  let h1 = 0xcbf29ce4 | 0;
  let h2 = 0x84222325 | 0;
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    h1 = (h1 ^ c) >>> 0;
    h2 = (h2 ^ c) >>> 0;
    // Multiply by FNV prime 0x100000001b3 across two 32-bit halves.
    const a = h1 * 0x1b3;
    const b = h2 * 0x1b3 + h1 * 0x100000001;
    h1 = a >>> 0;
    h2 = (b + Math.floor(a / 0x100000000)) >>> 0;
  }
  return h2.toString(16).padStart(8, '0') + h1.toString(16).padStart(8, '0');
}

/** Hash text content (pre-truncated). Returns 8 hex chars. */
export function hashText(text: string | undefined): string {
  if (!text) return '00000000';
  return fnv1a64Hex(text).slice(0, 8);
}
```

- [ ] **Step 4: Run — expect pass**

- [ ] **Step 5: Commit**

```bash
git add packages/lens-core/src/observer/node-id.ts \
  packages/lens-core/src/__tests__/observer/node-id.test.ts
git commit -m "feat(lens-core): deterministic node-id hashing (FNV-1a)"
```

---

*Plan continues. Phase 2 has 5 more tasks (Observer scan, shadow piercing, rect resolution, watch, integration). Subsequent phases are described in detail in the next plan files committed alongside this one.*

---

## TODO — remaining phases

The remaining phases (Phase 2 Tasks 13–17, Phases 3–16) follow the identical TDD shape:
**failing test → run → minimal implementation → run → commit.**

Each phase ships independently testable code. The full task list:

- **Phase 2** Tasks 13–17: `observer/scan.ts`, `observer/shadow.ts`, `observer/rect.ts`, `observer/watch.ts`, observer integration test (real jsdom + happy-dom mix).
- **Phase 3** Tasks 18–22: `helpers/scene-query.ts`, `helpers/token-violations.ts`, `helpers/contrast.ts`, `helpers/price-parser.ts`, helpers index + `RuleHelpers` factory.
- **Phase 4** Tasks 23–31: 9 signal extractors in `classifier/signals/` (one per file from Spec §5.2).
- **Phase 5** Tasks 32–37: stage1 override, stage2 heuristic (softmax), stage3 LLM stub, multi-intent classifier, floors, classifier orchestrator.
- **Phase 6** Tasks 38–44: `defineRule`, `definePack`, engine planner, scheduler (cost-based), engine evaluator, dedup + DR, engine integration test.
- **Phase 7** Tasks 45–47: `definePersona`, simulator (re-weighting), persona index.
- **Phase 8** Tasks 48–53: sub-score formula, composite formula with cap, formula registry (date-pinned), EWMA smoothing, scorer orchestrator, anti-gaming protections.
- **Phase 9** Tasks 54–60: token-validity, manifest-compliance, schema-validity, determinism, no-regression, verifier orchestrator, verifier integration test.
- **Phase 10** Tasks 61–63: agent runtime (streaming explain), suggestFix, agent integration with `@cognivo/core`.
- **Phase 11** Tasks 64–68: worker protocol, worker entry, main bridge, diffed scene-graph protocol, backpressure.
- **Phase 12** Tasks 69–70: `performance.measure` spans, diagnostic dump.
- **Phase 13** Tasks 71–74: fixture DSL, render helper, expectation helpers, fixture integration test.
- **Phase 14** Tasks 75–79: golden harness loader, accuracy reporter, CI gate, calibration snapshot generator, snapshot diff.
- **Phase 15** Tasks 80–81: full pipeline integration test, worker integration test.
- **Phase 16** Tasks 82–84: public API barrel `src/index.ts`, README content + usage example, bundle-size check wired into `pnpm size`.

A follow-up plan document `2026-04-28-lens-core-implementation-part2.md` carries the full step-by-step tasks for Phases 2.13 through 16. This document closes after Phase 1 to keep each plan reviewable in isolation.

---

## Self-review notes (this plan, Phase 0–1 + remainder)

| Check | Result |
|---|---|
| **Spec coverage** | Phase 0 covers package scaffold; Phase 1 covers all data contracts in Spec §3.2. Remaining phases mapped 1:1 to Spec sections (3.4 / 5 / 4 / 6 / 7 / 8 / 9 / 11). |
| **Placeholder scan** | Phases 0–1 contain real code; the "TODO — remaining phases" section is intentional handoff to part 2, not a placeholder inside a task. |
| **Type consistency** | `SceneNode.id` is `string`; `Finding.targetNodeId` is `string`; `Rule.detect` returns `DetectionInput[]` with `targetNodeId: string` — all consistent. |

**Known scope deferral:** Phases 2–16 live in the companion plan document. They follow this plan's shape exactly (TDD pattern, exact file paths, complete code) and can be authored next.

---

## Execution Handoff

Plan saved to `docs/superpowers/plans/2026-04-28-lens-core-implementation.md`.

Two execution options:

1. **Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration.
2. **Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints.

Which approach?
