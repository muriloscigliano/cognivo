# Design System Evals Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a CI-gated eval suite that verifies AI agents actually use Cognivo components/tokens correctly (per https://blog.murphytrueman.com/design-systems-need-evals/), and fix the grounding drift the evals depend on.

**Architecture:** New private package `@cognivo/evals` (packages/evals). Intent-level prompts (expected components hidden from the prompt) are run through an `AgentClient` seam — a deterministic `MockAgent` for offline CI, an `AnthropicAgent` for manual live runs. Each output is graded by three scorers: (1) deterministic, wrapping the existing `auditPage`/`validateUsage` from `@cognivo/mcp-server`; (2) hidden-expectation checks (did it reach for `cg-alert-dialog` over a hand-rolled div?); (3) a `Judge` seam with deterministic `MockJudge` offline and `AnthropicJudge` for rubrics live. Results aggregate worst-of-N (same philosophy as `docs/specs/dynamic-interfaces/engine/harness/runner.ts`) into a GO/NO-GO gate. Grounding fixes first: single source of truth for the component tag list, a registry drift check, root `AGENTS.md`.

**Decisions (confirmed with user):** Scope = evals + grounding fixes (not the dynamic-interfaces G1 live gate). Harness = promote existing patterns, no promptfoo. Live runs = offline CI gate + manual/scheduled live workflow, no per-PR API cost.

**Tech Stack:** TypeScript ESM, Vitest, pnpm workspaces, turbo, `@cognivo/mcp-server` (workspace), `@anthropic-ai/sdk` (live path only, dynamic import).

---

## File Structure

**Grounding fixes (Phase A):**
- `packages/mcp-server/src/scripts/generate-known-tags.ts` — NEW: emits `src/server/tools/_generated-tags.ts` from `catalog.json`
- `packages/mcp-server/src/server/tools/_shared.ts` — MODIFY: `KNOWN_COMPONENTS` sourced from generated file
- `packages/mcp-server/src/__tests__/known-tags-parity.test.ts` — NEW: generated tags == catalog.json tags
- `packages/mcp-server/package.json` — MODIFY: wire script into `build:catalog`; add `./audit`, `./validate`, `./catalog.json` subpath exports
- `AGENTS.md` — NEW (root): pointer to CLAUDE.md + satellite rule docs
- `scripts/check-registry-drift.mjs` — NEW: docs registry tags vs catalog tags
- `.github/workflows/ci.yml` — MODIFY: drift check + offline eval gate steps

**Evals package (Phase B):**
- `packages/evals/package.json`, `tsconfig.json`, `README.md` — NEW
- `packages/evals/src/types.ts` — NEW: EvalCase, SampleResult, CaseResult, EvalReport
- `packages/evals/src/dataset.ts` — NEW: 12 intent-level cases
- `packages/evals/src/agents/types.ts` — NEW: `AgentClient` interface
- `packages/evals/src/agents/mock-agent.ts` — NEW: deterministic canned outputs
- `packages/evals/src/agents/anthropic-agent.ts` — NEW: live agent (dynamic SDK import)
- `packages/evals/src/scorers/deterministic.ts` — NEW: wraps auditPage + validateUsage
- `packages/evals/src/scorers/expectations.ts` — NEW: hidden component-choice checks
- `packages/evals/src/scorers/judge.ts` — NEW: `Judge` seam, `MockJudge`, `AnthropicJudge`
- `packages/evals/src/runner.ts` — NEW: worst-of-N runner
- `packages/evals/src/gate.ts` — NEW: thresholds → GO/NO-GO
- `packages/evals/src/report.ts` — NEW: console + JSON report
- `packages/evals/src/baseline.ts` — NEW: record/replay of live outputs
- `packages/evals/src/cli.ts` — NEW: `run | live | replay` CLI
- `packages/evals/src/__tests__/*.test.ts` — NEW: unit tests per module
- `packages/evals/baselines/.gitkeep` — NEW

**CI + docs (Phase C):**
- `.github/workflows/evals-live.yml` — NEW: manual/scheduled live evals
- `package.json` (root) — MODIFY: `evals` / `evals:live` scripts
- `CLAUDE.md` — MODIFY: add evals to knowledge-base index

Conventions to follow: ESM (`"type": "module"`), `.js` suffix on relative imports, Vitest with tests in `src/__tests__/`, tsconfig extending root like `packages/mcp-server/tsconfig.json`, zod not needed here.

---

## Phase A — Grounding fixes

### Task 0: Save this plan into the repo

**Files:**
- Create: `docs/superpowers/plans/2026-07-27-design-system-evals.md`

- [ ] **Step 1: Copy this plan file**

```bash
cp "$PLAN_FILE" docs/superpowers/plans/2026-07-27-design-system-evals.md
```

(`$PLAN_FILE` = the session plan file this was approved from.)

- [ ] **Step 2: Commit**

```bash
git add docs/superpowers/plans/2026-07-27-design-system-evals.md
git commit -m "docs: add design-system evals implementation plan"
```

---

### Task 1: Single source of truth for known component tags

`packages/mcp-server/src/server/tools/_shared.ts` hand-maintains `KNOWN_COMPONENTS` (header says "182 tags as of wave-9") while `src/catalog/generate.ts` derives the truth from component source. Make the catalog the source; keep the generated file committed so fresh checkouts type-check without a build.

**Files:**
- Create: `packages/mcp-server/src/scripts/generate-known-tags.ts`
- Modify: `packages/mcp-server/src/server/tools/_shared.ts` (replace the hand-written array)
- Modify: `packages/mcp-server/package.json` (`build:catalog` script)
- Test: `packages/mcp-server/src/__tests__/known-tags-parity.test.ts`

- [ ] **Step 1: Write the failing parity test**

Create `packages/mcp-server/src/__tests__/known-tags-parity.test.ts`:

```typescript
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { KNOWN_COMPONENTS } from '../server/tools/_shared.js';

interface CatalogShape { components: Array<{ tag: string }> }

describe('known-tags parity', () => {
  it('KNOWN_COMPONENTS matches catalog.json tags exactly', () => {
    const catalog = JSON.parse(
      readFileSync(new URL('../catalog/catalog.json', import.meta.url), 'utf8'),
    ) as CatalogShape;
    const catalogTags = catalog.components.map((c) => c.tag).sort();
    const known = [...KNOWN_COMPONENTS].sort();
    expect(known).toEqual(catalogTags);
  });
});
```

- [ ] **Step 2: Run the catalog build, then the test, to verify it fails**

```bash
pnpm --filter @cognivo/mcp-server build:catalog
pnpm --filter @cognivo/mcp-server test -- known-tags-parity
```

Expected: FAIL if the hand-written list has drifted from the catalog (either direction). If it passes, the list happens to be current — continue anyway; the test guards future drift.

- [ ] **Step 3: Write the generator script**

Create `packages/mcp-server/src/scripts/generate-known-tags.ts`:

```typescript
#!/usr/bin/env node
/**
 * Emits src/server/tools/_generated-tags.ts from the built catalog so
 * KNOWN_COMPONENTS is derived from component source, not maintained by hand.
 * Runs as part of `build:catalog`; the output IS committed (fresh checkouts
 * must type-check without a build).
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const here = import.meta.dirname ?? '.';
const catalogPath = resolve(here, '../catalog/catalog.json');
const outPath = resolve(here, '../server/tools/_generated-tags.ts');

const catalog = JSON.parse(readFileSync(catalogPath, 'utf8')) as {
  components: Array<{ tag: string }>;
};
const tags = catalog.components.map((c) => c.tag).sort();

const body = `/**
 * GENERATED by src/scripts/generate-known-tags.ts from catalog.json.
 * Do not edit by hand — run \`pnpm build:catalog\`.
 */
export const KNOWN_COMPONENTS: readonly string[] = [
${tags.map((t) => `  '${t}',`).join('\n')}
];
`;

writeFileSync(outPath, body);
console.log(`Wrote ${tags.length} tags to ${outPath}`);
```

- [ ] **Step 4: Wire the generator into `build:catalog`**

In `packages/mcp-server/package.json`, change:

```json
"build:catalog": "node --import tsx src/scripts/build-catalog.ts && node --import tsx src/scripts/generate-known-tags.ts",
```

- [ ] **Step 5: Point `_shared.ts` at the generated list**

In `packages/mcp-server/src/server/tools/_shared.ts`, delete the entire hand-written `KNOWN_COMPONENTS` array and replace with:

```typescript
import { KNOWN_COMPONENTS } from './_generated-tags.js';

export { KNOWN_COMPONENTS };
```

Update the file-header comment line about KNOWN_COMPONENTS to: `KNOWN_COMPONENTS: generated from catalog.json by build:catalog (see _generated-tags.ts).` Keep `KNOWN_COMPONENT_SET`, `REQUIRED_PROPS`, `DEPRECATED_TAGS` and everything else unchanged.

- [ ] **Step 6: Regenerate, run test, verify pass**

```bash
pnpm --filter @cognivo/mcp-server build:catalog
pnpm --filter @cognivo/mcp-server test
```

Expected: parity test PASSES, all existing mcp-server tests PASS (`audit-page.test.ts`, `tools.test.ts`, etc.).

- [ ] **Step 7: Run mcp-server type-check and commit**

```bash
pnpm --filter @cognivo/mcp-server type-check
git add packages/mcp-server
git commit -m "feat(mcp-server): derive KNOWN_COMPONENTS from generated catalog"
```

---

### Task 2: Root AGENTS.md

Agents increasingly standardize on `AGENTS.md`; this repo only has `CLAUDE.md`. Add a thin pointer (no duplicated content to drift).

**Files:**
- Create: `AGENTS.md`

- [ ] **Step 1: Write the file**

```markdown
# Cognivo — Agent Guide

This repo's agent instructions live in `CLAUDE.md`. Read it first, then the
satellite rule docs it indexes:

- `CLAUDE.token-guardrails.md` — token tiers, banned tokens
- `CLAUDE.semantic-rules.md` — CSS rules the linter can't catch
- `CLAUDE.adding-tokens.md` — how to add tokens
- `CLAUDE.known-bugs.md`, `CLAUDE.audit-framework.md`

Key commands: `pnpm build`, `pnpm test`, `pnpm lint`, `pnpm type-check`.

When generating UI with this system: prefer `cg-*`/`ai-*` components over raw
HTML, never use raw hex/px values (use `var(--cg-*)` tokens), and validate
output with the `@cognivo/mcp-server` audit tools. The eval suite in
`packages/evals` regression-tests these behaviors — run `pnpm evals` before
changing `CLAUDE.md`, `packages/claude-code-skill/`, or the MCP catalog.
```

- [ ] **Step 2: Commit**

```bash
git add AGENTS.md
git commit -m "docs: add AGENTS.md pointer to agent instructions"
```

---

### Task 3: Docs registry drift check

`docs/src/data/registry.ts` (hand-written, 2261 lines) and the generated MCP catalog both describe the same 182 components. Add a CI gate that fails when they disagree on the tag set.

**Files:**
- Create: `scripts/check-registry-drift.mjs`
- Modify: `.github/workflows/ci.yml`

- [ ] **Step 1: Write the script**

```javascript
#!/usr/bin/env node
/**
 * Drift gate: docs registry (docs/src/data/registry.ts) must describe exactly
 * the same component tags as the generated MCP catalog. Run after build
 * (catalog.json is generated). Exit 1 on any drift, listing both directions.
 */
import { readFileSync } from 'node:fs';

const catalog = JSON.parse(
  readFileSync('packages/mcp-server/src/catalog/catalog.json', 'utf8'),
);
const catalogTags = new Set(catalog.components.map((c) => c.tag));

const registrySrc = readFileSync('docs/src/data/registry.ts', 'utf8');
const registryTags = new Set(
  [...registrySrc.matchAll(/tag:\s*'((?:cg|ai|bias)-[a-z0-9-]+)'/g)].map((m) => m[1]),
);

const undocumented = [...catalogTags].filter((t) => !registryTags.has(t)).sort();
const stale = [...registryTags].filter((t) => !catalogTags.has(t)).sort();

for (const t of stale) console.error(`STALE:        ${t} in docs registry but not in catalog`);
for (const t of undocumented) console.error(`UNDOCUMENTED: ${t} in catalog but missing from docs registry`);

if (stale.length || undocumented.length) {
  console.error(`\nDrift: ${stale.length} stale, ${undocumented.length} undocumented. Fix docs/src/data/registry.ts.`);
  process.exit(1);
}
console.log(`OK: docs registry and catalog agree on ${catalogTags.size} component tags.`);
```

- [ ] **Step 2: Run it locally to see current drift**

```bash
pnpm --filter @cognivo/mcp-server build:catalog
node scripts/check-registry-drift.mjs
```

Expected: either `OK` or a drift list. If drifted, fix `docs/src/data/registry.ts` (add/remove the listed tags) until the script passes — that fix is part of this task.

- [ ] **Step 3: Add the CI step**

In `.github/workflows/ci.yml`, after the `Run tests` step add:

```yaml
      - name: Registry drift check
        run: node scripts/check-registry-drift.mjs
```

(Catalog exists by then because `pnpm build` ran earlier in the job.)

- [ ] **Step 4: Commit**

```bash
git add scripts/check-registry-drift.mjs .github/workflows/ci.yml docs/src/data/registry.ts
git commit -m "ci: gate on docs registry vs MCP catalog drift"
```

---

## Phase B — The evals package

### Task 4: Scaffold `@cognivo/evals`

**Files:**
- Create: `packages/evals/package.json`
- Create: `packages/evals/tsconfig.json`
- Create: `packages/evals/baselines/.gitkeep`

- [ ] **Step 1: Write `packages/evals/package.json`**

```json
{
  "name": "@cognivo/evals",
  "version": "0.1.0",
  "private": true,
  "description": "Design-system evals — regression suite verifying AI agents use Cognivo components and tokens correctly.",
  "type": "module",
  "scripts": {
    "build": "tsc",
    "type-check": "tsc --noEmit",
    "test": "vitest run",
    "gate": "node --import tsx src/cli.ts run --mode mock",
    "live": "node --import tsx src/cli.ts live --record",
    "replay": "node --import tsx src/cli.ts replay"
  },
  "dependencies": {
    "@anthropic-ai/sdk": "^0.52.0",
    "@cognivo/mcp-server": "workspace:*"
  },
  "devDependencies": {
    "tsx": "^4.19.0",
    "typescript": "^5.7.0",
    "vitest": "^2.1.0"
  },
  "license": "MIT"
}
```

(Verify the `@anthropic-ai/sdk` version against `packages/adapter-anthropic/package.json` and match it.)

- [ ] **Step 2: Write `packages/evals/tsconfig.json`**

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "composite": false,
    "declaration": true,
    "declarationMap": false,
    "resolveJsonModule": true
  },
  "include": ["src"],
  "exclude": ["dist", "node_modules", "src/__tests__", "**/*.test.ts"]
}
```

- [ ] **Step 3: Expose the scorers' dependencies from mcp-server**

In `packages/mcp-server/package.json`, add subpath exports (keep everything else):

```json
  "exports": {
    ".": "./dist/index.js",
    "./audit": {
      "types": "./dist/server/tools/audit-page.d.ts",
      "import": "./dist/server/tools/audit-page.js"
    },
    "./validate": {
      "types": "./dist/server/tools/validate-usage.d.ts",
      "import": "./dist/server/tools/validate-usage.js"
    },
    "./catalog-types": {
      "types": "./dist/catalog/types.d.ts",
      "import": "./dist/catalog/types.js"
    },
    "./shared": {
      "types": "./dist/server/tools/_shared.d.ts",
      "import": "./dist/server/tools/_shared.js"
    },
    "./catalog.json": "./dist/catalog/catalog.json"
  },
```

- [ ] **Step 4: Install and verify the workspace resolves**

```bash
touch packages/evals/baselines/.gitkeep
pnpm install
pnpm --filter @cognivo/mcp-server build
```

Expected: install succeeds; mcp-server builds with catalog.

- [ ] **Step 5: Commit**

```bash
git add packages/evals packages/mcp-server/package.json pnpm-lock.yaml
git commit -m "feat(evals): scaffold @cognivo/evals package"
```

---

### Task 5: Types + eval dataset (intent-level prompts, hidden expectations)

Prompts read like real user asks — underspecified, intent-level. Expected components are never named in the prompt (Astryx-style: a pass proves the system steers the agent). All tags used below exist in `KNOWN_COMPONENTS` — verify against `packages/mcp-server/src/server/tools/_generated-tags.ts` when writing.

**Files:**
- Create: `packages/evals/src/types.ts`
- Create: `packages/evals/src/dataset.ts`
- Test: `packages/evals/src/__tests__/dataset.test.ts`

- [ ] **Step 1: Write `packages/evals/src/types.ts`**

```typescript
/** One rubric: a judgement call scored by a Judge. */
export interface Rubric {
  id: string;
  /** What the LLM judge scores, e.g. "Chose a confirmation dialog over a generic modal". */
  text: string;
  /**
   * Deterministic offline hints: MockJudge passes the rubric if ANY hint
   * (case-insensitive substring) appears in the output HTML. Omit for
   * live-judge-only rubrics.
   */
  offlineHints?: string[];
}

export interface Expectations {
  /** At least one tag from EACH group must appear (component-choice check). */
  anyOf?: string[][];
  /** All of these tags must appear. */
  mustUseTags?: string[];
  /** None of these tags may appear. */
  forbidTags?: string[];
}

export interface EvalCase {
  id: string;
  category: 'component-choice' | 'token-discipline' | 'a11y' | 'composition';
  /** Intent-level prompt. NEVER names the expected component. */
  prompt: string;
  expect: Expectations;
  rubrics: Rubric[];
}

export interface AgentOutput {
  html: string;
  raw?: string;
}

export interface SampleResult {
  caseId: string;
  sample: number;
  output: AgentOutput;
  deterministicPass: boolean;
  expectationsPass: boolean;
  rubricScores: Array<{ rubricId: string; score: number; reasoning: string }>;
  issues: string[];
  pass: boolean;
}

export interface CaseResult {
  caseId: string;
  category: EvalCase['category'];
  samples: SampleResult[];
  /** True only if EVERY sample passed (worst-of-N). */
  worstOfN: boolean;
  passRate: number;
}

export interface EvalReport {
  mode: 'mock' | 'live' | 'replay';
  agentName: string;
  judgeName: string;
  cases: CaseResult[];
  worstOfNPassRate: number;
  meanPassRate: number;
  startedAt: string;
}
```

- [ ] **Step 2: Write the failing dataset test**

Create `packages/evals/src/__tests__/dataset.test.ts`:

```typescript
import { describe, expect, it } from 'vitest';
import { KNOWN_COMPONENTS } from '@cognivo/mcp-server/shared';
import { EVAL_DATASET } from '../dataset.js';

const known = new Set(KNOWN_COMPONENTS);

describe('eval dataset', () => {
  it('has at least 10 cases with unique ids', () => {
    expect(EVAL_DATASET.length).toBeGreaterThanOrEqual(10);
    expect(new Set(EVAL_DATASET.map((c) => c.id)).size).toBe(EVAL_DATASET.length);
  });

  it('every expected tag exists in the catalog', () => {
    for (const c of EVAL_DATASET) {
      for (const group of c.expect.anyOf ?? [])
        for (const tag of group) expect(known.has(tag), `${c.id}: unknown tag ${tag}`).toBe(true);
      for (const tag of c.expect.mustUseTags ?? [])
        expect(known.has(tag), `${c.id}: unknown tag ${tag}`).toBe(true);
      for (const tag of c.expect.forbidTags ?? [])
        expect(known.has(tag), `${c.id}: unknown forbid tag ${tag}`).toBe(true);
    }
  });

  it('prompts never name an expected component (hidden-answer rule)', () => {
    for (const c of EVAL_DATASET) {
      const tags = [
        ...(c.expect.anyOf ?? []).flat(),
        ...(c.expect.mustUseTags ?? []),
      ];
      for (const tag of tags) {
        const bare = tag.replace(/^(cg|ai|bias)-/, '');
        expect(
          c.prompt.toLowerCase().includes(bare),
          `${c.id}: prompt leaks expected component "${tag}"`,
        ).toBe(false);
      }
    }
  });
});
```

(`KNOWN_COMPONENTS` comes from the `./shared` subpath export added in Task 4 Step 3.)

- [ ] **Step 3: Run test to verify it fails**

```bash
pnpm --filter @cognivo/evals test
```

Expected: FAIL — `../dataset.js` does not exist.

- [ ] **Step 4: Write `packages/evals/src/dataset.ts`**

```typescript
import type { EvalCase } from './types.js';

/**
 * Intent-level eval cases. Prompts read like real user asks and NEVER name
 * the expected component — a pass must reflect the system (skill, catalog,
 * MCP tools) steering the agent, not the prompt spelling out the answer.
 * Every tag referenced below must exist in the generated catalog (the
 * dataset test enforces this).
 */
export const EVAL_DATASET: EvalCase[] = [
  {
    id: 'delete-account-confirmation',
    category: 'component-choice',
    prompt: 'Add a confirmation before someone deletes their account.',
    expect: { anyOf: [['cg-alert-dialog', 'cg-modal']], mustUseTags: ['cg-button'] },
    rubrics: [
      {
        id: 'chose-confirmation-pattern',
        text: 'Reaches for the confirmation/alert dialog pattern over a generic modal or hand-rolled overlay.',
        offlineHints: ['cg-alert-dialog'],
      },
      {
        id: 'clear-cancel-path',
        text: 'Provides a clear cancel path alongside the destructive action.',
        offlineHints: ['cancel'],
      },
      {
        id: 'destructive-not-default-focused',
        text: 'Does not default-focus the destructive action.',
      },
    ],
  },
  {
    id: 'onboarding-flow',
    category: 'composition',
    prompt: 'Build a 3-step onboarding flow for a new workspace user.',
    expect: { anyOf: [['cg-steps', 'ai-onboarding', 'ai-progress-steps']] },
    rubrics: [
      {
        id: 'stepped-flow',
        text: 'Structures the flow as discrete steps with visible progress, not a flat wall of fields.',
        offlineHints: ['step'],
      },
    ],
  },
  {
    id: 'empty-dashboard',
    category: 'component-choice',
    prompt: 'Show what a new user sees on the analytics dashboard before any data exists.',
    expect: { anyOf: [['cg-empty-state', 'ai-empty-state']] },
    rubrics: [
      {
        id: 'helpful-empty-state',
        text: 'The empty state tells the user what to do next, not just that there is no data.',
        offlineHints: ['cg-empty-state', 'ai-empty-state'],
      },
    ],
  },
  {
    id: 'kpi-overview',
    category: 'component-choice',
    prompt: 'Create a KPI overview row with revenue, active users, and churn.',
    expect: { anyOf: [['cg-metric-card', 'ai-kpi-grid']] },
    rubrics: [
      {
        id: 'metric-cards',
        text: 'Each KPI is a distinct metric display with label and value, not loose text.',
        offlineHints: ['cg-metric-card', 'ai-kpi-grid'],
      },
    ],
  },
  {
    id: 'invoice-table',
    category: 'composition',
    prompt: 'Add a table of recent invoices with paging.',
    expect: { anyOf: [['cg-table', 'ai-data-table']], mustUseTags: ['cg-pagination'] },
    rubrics: [
      {
        id: 'real-table',
        text: 'Uses a real data table component rather than styled divs.',
        offlineHints: ['cg-table', 'ai-data-table'],
      },
    ],
  },
  {
    id: 'profile-settings-form',
    category: 'component-choice',
    prompt: 'Build a profile settings form with name, email, and a save button.',
    expect: { anyOf: [['cg-form']], mustUseTags: ['cg-input', 'cg-button'] },
    rubrics: [
      {
        id: 'labeled-inputs',
        text: 'Every input has a label association accessible to screen readers.',
        offlineHints: ['label', 'aria-label', 'name='],
      },
    ],
  },
  {
    id: 'upload-complete-notification',
    category: 'component-choice',
    prompt: 'Notify the user when their file upload completes.',
    expect: { anyOf: [['cg-toaster', 'ai-toast']] },
    rubrics: [
      {
        id: 'toast-pattern',
        text: 'Uses a transient toast notification, not a blocking dialog.',
        offlineHints: ['toast'],
      },
    ],
  },
  {
    id: 'report-loading-state',
    category: 'component-choice',
    prompt: 'Show a loading state while the report generates.',
    expect: { anyOf: [['cg-skeleton', 'cg-spinner', 'cg-progress-bar']] },
    rubrics: [
      {
        id: 'skeleton-over-spinner',
        text: 'Prefers a content-shaped placeholder for a report over a bare spinner where layout is known.',
      },
    ],
  },
  {
    id: 'dashboard-navigation',
    category: 'component-choice',
    prompt: 'Add navigation for a dashboard with Home, Reports, and Settings sections.',
    expect: { anyOf: [['cg-sidebar', 'cg-navbar', 'cg-navigation-menu', 'ai-sidebar']] },
    rubrics: [
      {
        id: 'nav-component',
        text: 'Uses a navigation component with real links, not a list of divs.',
        offlineHints: ['cg-sidebar', 'cg-navbar', 'cg-navigation-menu', 'ai-sidebar'],
      },
    ],
  },
  {
    id: 'signup-chart-with-summary',
    category: 'composition',
    prompt: 'Show monthly signups as a chart with a short generated summary of the trend.',
    expect: { anyOf: [['cg-chart', 'ai-analytics-chart']] },
    rubrics: [
      {
        id: 'chart-plus-summary',
        text: 'Pairs the visualization with a textual trend summary.',
        offlineHints: ['ai-chart-summary'],
      },
    ],
  },
  {
    id: 'docs-search',
    category: 'component-choice',
    prompt: 'Add search to the documentation page.',
    expect: { anyOf: [['ai-search', 'cg-input']] },
    rubrics: [
      {
        id: 'search-affordance',
        text: 'The search control is labeled and keyboard-accessible.',
        offlineHints: ['search', 'aria-label', 'label'],
      },
    ],
  },
  {
    id: 'token-discipline-card',
    category: 'token-discipline',
    prompt: 'Style a pricing highlight card that stands out from the page background.',
    expect: { anyOf: [['cg-card', 'ai-data-card']] },
    rubrics: [
      {
        id: 'no-hardcoded-colors',
        text: 'All colors and spacing resolve to design tokens — no raw hex, rgb, or px values.',
        offlineHints: ['var(--cg-'],
      },
    ],
  },
];
```

- [ ] **Step 5: Run the dataset test**

```bash
pnpm --filter @cognivo/evals test
```

Expected: PASS. If the hidden-answer test fails on a legit substring (e.g. "cancel"), adjust the hint, not the rule.

- [ ] **Step 6: Commit**

```bash
git add packages/evals
git commit -m "feat(evals): add eval types and intent-level dataset"
```

---

### Task 6: Agent seam + MockAgent

**Files:**
- Create: `packages/evals/src/agents/types.ts`
- Create: `packages/evals/src/agents/mock-agent.ts`
- Test: `packages/evals/src/__tests__/mock-agent.test.ts`

- [ ] **Step 1: Write `packages/evals/src/agents/types.ts`**

```typescript
import type { AgentOutput, EvalCase } from '../types.js';

export interface AgentClient {
  readonly name: string;
  /** Generate UI output for an intent prompt. `sample` varies output for self-consistency runs. */
  generate(caseDef: EvalCase, sample: number): Promise<AgentOutput>;
}
```

- [ ] **Step 2: Write the failing test**

Create `packages/evals/src/__tests__/mock-agent.test.ts`:

```typescript
import { describe, expect, it } from 'vitest';
import { MockAgent } from '../agents/mock-agent.js';
import { EVAL_DATASET } from '../dataset.js';

describe('MockAgent', () => {
  it('produces valid cg-tagged HTML for every dataset case', async () => {
    const agent = new MockAgent();
    for (const c of EVAL_DATASET) {
      const out = await agent.generate(c, 0);
      expect(out.html.length).toBeGreaterThan(0);
      expect(out.html).toMatch(/<(cg|ai)-[a-z0-9-]+/);
    }
  });

  it('varies output by sample index', async () => {
    const agent = new MockAgent();
    const c = EVAL_DATASET[0]!;
    const a = await agent.generate(c, 0);
    const b = await agent.generate(c, 1);
    expect(a.html).not.toBe(b.html);
  });

  it('is deterministic for the same case and sample', async () => {
    const agent = new MockAgent();
    const c = EVAL_DATASET[0]!;
    const a = await agent.generate(c, 0);
    const b = await agent.generate(c, 0);
    expect(a.html).toBe(b.html);
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

```bash
pnpm --filter @cognivo/evals test -- mock-agent
```

Expected: FAIL — module not found.

- [ ] **Step 4: Write `packages/evals/src/agents/mock-agent.ts`**

```typescript
import type { AgentOutput, EvalCase } from '../types.js';
import type { AgentClient } from './types.js';

/**
 * Deterministic agent for offline CI. Emits known-good cognivo HTML per case
 * (sample 0 and sample >= 2) plus one known-imperfect variant (sample 1:
 * same component choice, extra harmless wrapper) so self-consistency wiring
 * is exercised. Unit tests prove the gate bites using a BrokenMockAgent —
 * the default MockAgent must always pass the gate in CI.
 */
export class MockAgent implements AgentClient {
  readonly name = 'mock-agent';

  async generate(caseDef: EvalCase, sample: number): Promise<AgentOutput> {
    const pick = (group: string[]): string => group[sample % group.length]!;
    const chosen = (caseDef.expect.anyOf ?? []).map(pick);
    const required = caseDef.expect.mustUseTags ?? [];
    const all = [...new Set([...chosen, ...required])];

    const inner = all
      .map((tag) => `<${tag} label="${caseDef.id}" name="${caseDef.id}-field">cancel ${caseDef.id}</${tag}>`)
      .join('\n  ');
    const wrapper = sample === 1 ? '<cg-stack>\n  ' : '<section>\n  ';
    const closer = sample === 1 ? '</cg-stack>' : '</section>';

    return {
      html: `${wrapper}${inner}\n${closer}`,
      raw: `mock output for ${caseDef.id} sample ${sample}`,
    };
  }
}

/** Test-only agent that hand-rolls markup — the gate MUST fail on this. */
export class BrokenMockAgent implements AgentClient {
  readonly name = 'broken-mock-agent';
  async generate(caseDef: EvalCase, _sample: number): Promise<AgentOutput> {
    return { html: `<div style="color: #3b82f6; padding: 16px">${caseDef.prompt}</div>` };
  }
}
```

Note: `label`/`name` attributes above satisfy audit-page's a11y rules for `cg-button`/`cg-input`; `cancel` satisfies the offline rubric hints. If audit-page flags a specific tag pairing, adjust attributes in the mock — never weaken the scorer.

- [ ] **Step 5: Run test, verify pass, commit**

```bash
pnpm --filter @cognivo/evals test -- mock-agent
```

Expected: PASS.

```bash
git add packages/evals
git commit -m "feat(evals): add agent seam and deterministic mock agent"
```

---

### Task 7: Deterministic scorer (auditPage + validateUsage)

This is the article's "javascript check that knows your system" — wired to the validators the repo already maintains.

**Files:**
- Create: `packages/evals/src/scorers/deterministic.ts`
- Test: `packages/evals/src/__tests__/deterministic.test.ts`

- [ ] **Step 1: Write the failing test**

Create `packages/evals/src/__tests__/deterministic.test.ts`:

```typescript
import { describe, expect, it } from 'vitest';
import { scoreDeterministic } from '../scorers/deterministic.js';

describe('scoreDeterministic', () => {
  it('passes clean cognivo markup', () => {
    const r = scoreDeterministic('<cg-card><cg-button label="Save">Save</cg-button></cg-card>');
    expect(r.pass).toBe(true);
    expect(r.issues.filter((i) => i.includes('error'))).toHaveLength(0);
  });

  it('fails unknown components', () => {
    const r = scoreDeterministic('<cg-frobnicate label="x"></cg-frobnicate>');
    expect(r.pass).toBe(false);
  });

  it('fails raw hex in embedded styles', () => {
    const r = scoreDeterministic(
      '<cg-card><style>.x { color: #3b82f6; }</style><cg-button label="Go">Go</cg-button></cg-card>',
    );
    expect(r.pass).toBe(false);
  });

  it('fails unlabeled buttons', () => {
    const r = scoreDeterministic('<cg-button></cg-button>');
    expect(r.pass).toBe(false);
  });
});
```

- [ ] **Step 2: Run to verify it fails**

```bash
pnpm --filter @cognivo/evals test -- deterministic
```

Expected: FAIL — module not found.

- [ ] **Step 3: Write `packages/evals/src/scorers/deterministic.ts`**

```typescript
import { createRequire } from 'node:module';
import { auditPage } from '@cognivo/mcp-server/audit';
import { validateUsage } from '@cognivo/mcp-server/validate';
import type { CognivoCatalog } from '@cognivo/mcp-server/catalog-types';

export interface DeterministicScore {
  pass: boolean;
  /** Human-readable issue lines (severity-prefixed). */
  issues: string[];
}

// createRequire sidesteps tsconfig JSON-import-attribute config differences.
const require = createRequire(import.meta.url);
const catalog = require('@cognivo/mcp-server/catalog.json') as CognivoCatalog;

/**
 * The mechanical grader: generated output must pass the same audit/validate
 * rules the MCP server enforces for interactive agents. Errors fail the
 * sample; warnings are reported but tolerated (tune here if noise builds).
 */
export function scoreDeterministic(html: string): DeterministicScore {
  const issues: string[] = [];

  const audit = auditPage({ html, strict: false });
  for (const i of audit.issues) {
    issues.push(`${i.level}: [${i.rule}] <${i.tag}> ${i.message}`);
  }

  const usage = validateUsage(catalog, { html });
  if (!usage.startsWith('All clear')) {
    for (const line of usage.split('\n')) {
      const trimmed = line.replace(/^\d+\.\s*/, '').trim();
      if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('- Use')) {
        // validateUsage doesn't machine-tag severity; its "Errors" section
        // precedes "Warnings". Treat error-section lines as errors.
        issues.push(trimmed);
      }
    }
  }

  const hasError =
    audit.issues.some((i) => i.level === 'error') ||
    /### Errors \([1-9]/.test(usage);

  return { pass: !hasError, issues };
}
```

- [ ] **Step 4: Run test, verify pass**

```bash
pnpm --filter @cognivo/evals test -- deterministic
```

Expected: PASS. If `catalog.json` import fails, run `pnpm --filter @cognivo/mcp-server build` first (turbo `test` depends on `build`, so root `pnpm test` handles this).

- [ ] **Step 5: Commit**

```bash
git add packages/evals
git commit -m "feat(evals): deterministic scorer wrapping mcp audit/validate"
```

---

### Task 8: Hidden-expectation scorer

**Files:**
- Create: `packages/evals/src/scorers/expectations.ts`
- Test: `packages/evals/src/__tests__/expectations.test.ts`

- [ ] **Step 1: Write the failing test**

Create `packages/evals/src/__tests__/expectations.test.ts`:

```typescript
import { describe, expect, it } from 'vitest';
import { scoreExpectations } from '../scorers/expectations.js';
import type { Expectations } from '../types.js';

const ex: Expectations = {
  anyOf: [['cg-alert-dialog', 'cg-modal']],
  mustUseTags: ['cg-button'],
  forbidTags: ['cg-toaster'],
};

describe('scoreExpectations', () => {
  it('passes when a choice tag and required tags are present', () => {
    const r = scoreExpectations('<cg-alert-dialog><cg-button label="x">x</cg-button></cg-alert-dialog>', ex);
    expect(r.pass).toBe(true);
  });

  it('fails when no choice-group tag appears', () => {
    const r = scoreExpectations('<div><cg-button label="x">x</cg-button></div>', ex);
    expect(r.pass).toBe(false);
    expect(r.failures[0]).toContain('cg-alert-dialog');
  });

  it('fails when a required tag is missing', () => {
    const r = scoreExpectations('<cg-modal></cg-modal>', ex);
    expect(r.pass).toBe(false);
  });

  it('fails when a forbidden tag appears', () => {
    const r = scoreExpectations(
      '<cg-modal><cg-button label="x">x</cg-button><cg-toaster></cg-toaster></cg-modal>',
      ex,
    );
    expect(r.pass).toBe(false);
  });
});
```

- [ ] **Step 2: Run to verify it fails**

```bash
pnpm --filter @cognivo/evals test -- expectations
```

Expected: FAIL — module not found.

- [ ] **Step 3: Write `packages/evals/src/scorers/expectations.ts`**

```typescript
import type { Expectations } from '../types.js';

export interface ExpectationScore {
  pass: boolean;
  failures: string[];
  tagsFound: string[];
}

const TAG_RE = /<((?:cg|ai|bias)-[a-z0-9-]+)\b/g;

/**
 * Component-choice grading: did the agent reach for the right component
 * without being told which one? Hidden from the prompt by construction.
 */
export function scoreExpectations(html: string, expect: Expectations): ExpectationScore {
  const tagsFound = [...html.matchAll(TAG_RE)].map((m) => m[1]!);
  const found = new Set(tagsFound);
  const failures: string[] = [];

  for (const group of expect.anyOf ?? []) {
    if (!group.some((t) => found.has(t))) {
      failures.push(`none of [${group.join(', ')}] used — found: ${[...found].join(', ') || '(no cognivo tags)'}`);
    }
  }
  for (const tag of expect.mustUseTags ?? []) {
    if (!found.has(tag)) failures.push(`required <${tag}> not used`);
  }
  for (const tag of expect.forbidTags ?? []) {
    if (found.has(tag)) failures.push(`forbidden <${tag}> used`);
  }

  return { pass: failures.length === 0, failures, tagsFound };
}
```

- [ ] **Step 4: Run test, verify pass, commit**

```bash
pnpm --filter @cognivo/evals test -- expectations
```

Expected: PASS.

```bash
git add packages/evals
git commit -m "feat(evals): hidden-expectation scorer for component choice"
```

---

### Task 9: Judge seam (MockJudge + AnthropicJudge)

**Files:**
- Create: `packages/evals/src/scorers/judge.ts`
- Test: `packages/evals/src/__tests__/judge.test.ts`

- [ ] **Step 1: Write the failing test**

Create `packages/evals/src/__tests__/judge.test.ts`:

```typescript
import { describe, expect, it } from 'vitest';
import { MockJudge } from '../scorers/judge.js';
import { EVAL_DATASET } from '../dataset.js';

describe('MockJudge', () => {
  const deleteCase = EVAL_DATASET.find((c) => c.id === 'delete-account-confirmation')!;

  it('passes rubrics whose offline hints appear in the output', async () => {
    const judge = new MockJudge();
    const scores = await judge.score(
      deleteCase,
      '<cg-alert-dialog><cg-button label="Delete">Delete</cg-button><cg-button label="Cancel">Cancel</cg-button></cg-alert-dialog>',
    );
    const hintable = scores.filter((s) => s.rubricId !== 'destructive-not-default-focused');
    expect(hintable.every((s) => s.score === 1)).toBe(true);
  });

  it('fails rubrics whose hints are absent', async () => {
    const judge = new MockJudge();
    const scores = await judge.score(deleteCase, '<div>sure, deleted</div>');
    expect(scores.find((s) => s.rubricId === 'chose-confirmation-pattern')!.score).toBe(0);
  });

  it('scores 0.5 (abstain) for live-only rubrics offline', async () => {
    const judge = new MockJudge();
    const scores = await judge.score(deleteCase, '<cg-alert-dialog>cancel</cg-alert-dialog>');
    expect(scores.find((s) => s.rubricId === 'destructive-not-default-focused')!.score).toBe(0.5);
  });
});
```

- [ ] **Step 2: Run to verify it fails**

```bash
pnpm --filter @cognivo/evals test -- judge
```

Expected: FAIL — module not found.

- [ ] **Step 3: Write `packages/evals/src/scorers/judge.ts`**

```typescript
import type { EvalCase } from '../types.js';

export interface RubricScore {
  rubricId: string;
  score: number; // 0..1
  reasoning: string;
}

export interface Judge {
  readonly name: string;
  score(caseDef: EvalCase, html: string): Promise<RubricScore[]>;
}

/**
 * Deterministic offline judge: passes a rubric when any offlineHint appears
 * in the output; abstains (0.5) on rubrics with no hints, since judgement
 * calls can't be verified offline. Crude by design — the live judge is the
 * real grader; this exists so CI wiring is testable without a key.
 */
export class MockJudge implements Judge {
  readonly name = 'mock-judge';

  async score(caseDef: EvalCase, html: string): Promise<RubricScore[]> {
    const lower = html.toLowerCase();
    return caseDef.rubrics.map((r) => {
      if (!r.offlineHints?.length) {
        return { rubricId: r.id, score: 0.5, reasoning: 'no offline hints — abstain (live judge only)' };
      }
      const hit = r.offlineHints.find((h) => lower.includes(h.toLowerCase()));
      return hit
        ? { rubricId: r.id, score: 1, reasoning: `matched hint "${hit}"` }
        : { rubricId: r.id, score: 0, reasoning: `no hint matched (${r.offlineHints.join(', ')})` };
    });
  }
}

/**
 * Live rubric judge. Dynamic-imports the SDK so offline runs never need a key.
 * Scores each rubric 0 or 1 with one-sentence reasoning.
 */
export class AnthropicJudge implements Judge {
  readonly name = 'anthropic-judge';
  constructor(private model = 'claude-opus-4-8') {}

  async score(caseDef: EvalCase, html: string): Promise<RubricScore[]> {
    const { default: Anthropic } = await import('@anthropic-ai/sdk');
    const client = new Anthropic(); // ANTHROPIC_API_KEY from env
    const rubricList = caseDef.rubrics.map((r, i) => `${i + 1}. [${r.id}] ${r.text}`).join('\n');
    const res = await client.messages.create({
      model: this.model,
      max_tokens: 1024,
      system:
        'You grade generated UI code against rubrics. Reply with strict JSON only: ' +
        '[{"rubricId":"...","score":0|1,"reasoning":"one sentence"}]. Score 1 only when the output clearly satisfies the rubric.',
      messages: [
        {
          role: 'user',
          content: `Intent: ${caseDef.prompt}\n\nGenerated output:\n${html}\n\nRubrics:\n${rubricList}`,
        },
      ],
    });
    const text = res.content.filter((b) => b.type === 'text').map((b) => b.text).join('');
    const parsed = JSON.parse(text) as RubricScore[];
    return parsed.map((p) => ({ rubricId: p.rubricId, score: p.score ? 1 : 0, reasoning: p.reasoning }));
  }
}
```

- [ ] **Step 4: Run test, verify pass, commit**

```bash
pnpm --filter @cognivo/evals test -- judge
```

Expected: PASS.

```bash
git add packages/evals
git commit -m "feat(evals): judge seam with offline mock and live anthropic judge"
```

---

### Task 10: Runner + gate + report

Worst-of-N aggregation, ported philosophy from `docs/specs/dynamic-interfaces/engine/harness/runner.ts` and `gate.ts` (those stay put — the dynamic-interfaces engine keeps its own harness; this package is the productized, component-output sibling).

**Files:**
- Create: `packages/evals/src/runner.ts`
- Create: `packages/evals/src/gate.ts`
- Create: `packages/evals/src/report.ts`
- Test: `packages/evals/src/__tests__/runner.test.ts`

- [ ] **Step 1: Write the failing test**

Create `packages/evals/src/__tests__/runner.test.ts`:

```typescript
import { describe, expect, it } from 'vitest';
import { runEvals } from '../runner.js';
import { evaluateGate, DEFAULT_THRESHOLDS } from '../gate.js';
import { MockAgent, BrokenMockAgent } from '../agents/mock-agent.js';
import { MockJudge } from '../scorers/judge.js';
import { EVAL_DATASET } from '../dataset.js';

describe('runEvals + evaluateGate', () => {
  it('mock agent passes the gate offline', async () => {
    const report = await runEvals(EVAL_DATASET, new MockAgent(), new MockJudge(), {
      samples: 3,
      mode: 'mock',
    });
    expect(report.cases).toHaveLength(EVAL_DATASET.length);
    expect(report.worstOfNPassRate).toBe(1);
    const decision = evaluateGate(report);
    expect(decision.go, decision.reasons.join('; ')).toBe(true);
  });

  it('broken agent fails the gate', async () => {
    const report = await runEvals(EVAL_DATASET, new BrokenMockAgent(), new MockJudge(), {
      samples: 2,
      mode: 'mock',
    });
    expect(report.worstOfNPassRate).toBeLessThan(DEFAULT_THRESHOLDS.worstOfNPassRate);
    expect(evaluateGate(report).go).toBe(false);
  });

  it('worst-of-N: one bad sample fails the case', async () => {
    const report = await runEvals(EVAL_DATASET, new MockAgent(), new MockJudge(), {
      samples: 3,
      mode: 'mock',
    });
    for (const c of report.cases) {
      expect(c.worstOfN).toBe(c.samples.every((s) => s.pass));
    }
  });
});
```

- [ ] **Step 2: Run to verify it fails**

```bash
pnpm --filter @cognivo/evals test -- runner
```

Expected: FAIL — modules not found.

- [ ] **Step 3: Write `packages/evals/src/runner.ts`**

```typescript
import type { AgentClient } from './agents/types.js';
import type { Judge } from './scorers/judge.js';
import { scoreDeterministic } from './scorers/deterministic.js';
import { scoreExpectations } from './scorers/expectations.js';
import type { CaseResult, EvalCase, EvalReport, SampleResult } from './types.js';

export interface RunOptions {
  samples?: number; // default 3
  mode: EvalReport['mode'];
}

export const RUBRIC_PASS_MEAN = 0.6; // abstentions (0.5) don't sink a sample on their own

export async function runEvals(
  cases: EvalCase[],
  agent: AgentClient,
  judge: Judge,
  opts: RunOptions,
): Promise<EvalReport> {
  const samples = Math.max(1, opts.samples ?? 3);
  const caseResults: CaseResult[] = [];

  for (const c of cases) {
    const sampleResults: SampleResult[] = [];
    for (let s = 0; s < samples; s++) {
      const output = await agent.generate(c, s);
      const det = scoreDeterministic(output.html);
      const exp = scoreExpectations(output.html, c.expect);
      const rubricScores = await judge.score(c, output.html);
      const rubricMean =
        rubricScores.reduce((a, r) => a + r.score, 0) / (rubricScores.length || 1);

      const pass = det.pass && exp.pass && rubricMean >= RUBRIC_PASS_MEAN;
      sampleResults.push({
        caseId: c.id,
        sample: s,
        output,
        deterministicPass: det.pass,
        expectationsPass: exp.pass,
        rubricScores,
        issues: [...det.issues, ...exp.failures],
        pass,
      });
    }
    const okCount = sampleResults.filter((s) => s.pass).length;
    caseResults.push({
      caseId: c.id,
      category: c.category,
      samples: sampleResults,
      worstOfN: okCount === samples,
      passRate: okCount / samples,
    });
  }

  const worstOfNPassRate = caseResults.filter((c) => c.worstOfN).length / (caseResults.length || 1);
  const meanPassRate = caseResults.reduce((a, c) => a + c.passRate, 0) / (caseResults.length || 1);

  return {
    mode: opts.mode,
    agentName: agent.name,
    judgeName: judge.name,
    cases: caseResults,
    worstOfNPassRate,
    meanPassRate,
    startedAt: new Date().toISOString(),
  };
}
```

- [ ] **Step 4: Write `packages/evals/src/gate.ts`**

```typescript
import type { EvalReport } from './types.js';

export interface GateThresholds {
  worstOfNPassRate: number; // default 0.8 — like the G1 harness
  meanPassRate: number; // default 0.9
}

export const DEFAULT_THRESHOLDS: GateThresholds = {
  worstOfNPassRate: 0.8,
  meanPassRate: 0.9,
};

export interface GateDecision {
  go: boolean;
  reasons: string[];
}

export function evaluateGate(
  report: EvalReport,
  thresholds: GateThresholds = DEFAULT_THRESHOLDS,
): GateDecision {
  const reasons: string[] = [];

  if (report.worstOfNPassRate < thresholds.worstOfNPassRate) {
    reasons.push(
      `worst-of-N pass rate ${(report.worstOfNPassRate * 100).toFixed(0)}% < ${(thresholds.worstOfNPassRate * 100).toFixed(0)}%`,
    );
  }
  if (report.meanPassRate < thresholds.meanPassRate) {
    reasons.push(
      `mean pass rate ${(report.meanPassRate * 100).toFixed(0)}% < ${(thresholds.meanPassRate * 100).toFixed(0)}%`,
    );
  }

  const failing = report.cases.filter((c) => !c.worstOfN);
  for (const c of failing) {
    const worst = c.samples.find((s) => !s.pass);
    reasons.push(`case ${c.caseId} fails (${(c.passRate * 100).toFixed(0)}%): ${worst?.issues[0] ?? 'rubric mean below threshold'}`);
  }

  if (reasons.length === 0) reasons.push('all gate criteria met');
  return { go: reasons.length === 1 && reasons[0] === 'all gate criteria met', reasons };
}
```

- [ ] **Step 5: Write `packages/evals/src/report.ts`**

```typescript
import type { GateDecision } from './gate.js';
import type { EvalReport } from './types.js';

export function formatConsole(report: EvalReport, decision: GateDecision): string {
  const lines: string[] = [
    `\nCognivo design-system evals (${report.mode}, agent=${report.agentName}, judge=${report.judgeName})`,
    `worst-of-N: ${(report.worstOfNPassRate * 100).toFixed(0)}%   mean: ${(report.meanPassRate * 100).toFixed(0)}%`,
    '',
  ];
  for (const c of report.cases) {
    lines.push(`  ${c.worstOfN ? 'PASS' : 'FAIL'}  ${c.caseId} (${(c.passRate * 100).toFixed(0)}% of ${c.samples.length} samples)`);
    if (!c.worstOfN) {
      const bad = c.samples.find((s) => !s.pass);
      for (const issue of bad?.issues.slice(0, 3) ?? []) lines.push(`       ${issue}`);
    }
  }
  lines.push('', decision.go ? 'GATE: GO' : 'GATE: NO-GO');
  for (const r of decision.reasons) lines.push(`  - ${r}`);
  return lines.join('\n');
}
```

- [ ] **Step 6: Run test, verify pass, commit**

```bash
pnpm --filter @cognivo/evals test
```

Expected: all evals tests PASS.

```bash
git add packages/evals
git commit -m "feat(evals): worst-of-N runner, gate, and console report"
```

---

### Task 11: Live agent (AnthropicAgent)

The system prompt IS the grounding under test: assembled from the published skill files, exactly what an agent consumer would receive. Never hard-code the key; mirror `docs/specs/dynamic-interfaces/engine/harness/live-gate.ts`'s dotenv loading.

**Files:**
- Create: `packages/evals/src/agents/anthropic-agent.ts`

- [ ] **Step 1: Write the file**

```typescript
import { readFileSync } from 'node:fs';
import type { AgentOutput, EvalCase } from '../types.js';
import type { AgentClient } from './types.js';

/** Read repo-root .env without logging values (same approach as live-gate.ts). */
function loadDotEnv(): void {
  try {
    // packages/evals/src/agents/ → repo root is four levels up.
    const text = readFileSync(new URL('../../../../.env', import.meta.url), 'utf8');
    for (const raw of text.split('\n')) {
      const line = raw.trim();
      if (!line || line.startsWith('#')) continue;
      const eq = line.indexOf('=');
      if (eq < 0) continue;
      const k = line.slice(0, eq).trim();
      let v = line.slice(eq + 1).trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
      const existing = process.env[k];
      if (k && (existing === undefined || existing === '')) process.env[k] = v;
    }
  } catch {
    /* rely on the real environment */
  }
}

/**
 * The grounding under test, verbatim: the published claude-code-skill docs an
 * agent consumer would receive. If these files change, eval results change —
 * that is the point.
 */
function buildSystemPrompt(): string {
  // packages/evals/src/agents/ → packages/ is three levels up. The CLI runs
  // via tsx directly from src, so these relative paths are stable.
  const skillDir = new URL('../../../claude-code-skill/skill/', import.meta.url);
  const parts = ['SKILL.md', 'COMPONENTS.md', 'TOKENS.md', 'PATTERNS.md'].map((f) =>
    readFileSync(new URL(f, skillDir), 'utf8'),
  );
  return [
    'You are generating UI with the Cognivo design system. Follow these docs exactly.',
    'Respond with ONLY the HTML markup for the request — no markdown fences, no commentary.',
    ...parts,
  ].join('\n\n---\n\n');
}

export class AnthropicAgent implements AgentClient {
  readonly name = 'anthropic-agent';
  constructor(private model = 'claude-opus-4-8') {}

  async generate(caseDef: EvalCase, sample: number): Promise<AgentOutput> {
    loadDotEnv();
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error('ANTHROPIC_API_KEY is not set — live evals need a key (env or repo-root .env).');
    }
    const { default: Anthropic } = await import('@anthropic-ai/sdk');
    const client = new Anthropic();
    const res = await client.messages.create({
      model: this.model,
      max_tokens: 4096,
      system: buildSystemPrompt(),
      messages: [{ role: 'user', content: caseDef.prompt }],
      ...(sample > 0 ? { temperature: 1 } : { temperature: 0 }),
    });
    const html = res.content
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('')
      .replace(/^```(?:html)?\n?/, '')
      .replace(/\n?```$/, '')
      .trim();
    return { html, raw: html };
  }
}
```

Note: the CLI runs via `tsx` straight from `src/`, so `import.meta.url`-relative paths are stable (no dist indirection on this path).

- [ ] **Step 2: Smoke-test only with a key present (manual, optional now)**

```bash
ANTHROPIC_API_KEY=... node --import tsx -e "import('./packages/evals/src/agents/anthropic-agent.ts').then(async m => { const a = new m.AnthropicAgent(); const { EVAL_DATASET } = await import('./packages/evals/src/dataset.ts'); console.log((await a.generate(EVAL_DATASET[0], 0)).html.slice(0, 200)); })"
```

Expected: HTML snippet. Skip if no key — Task 13 covers the full live path.

- [ ] **Step 3: Commit**

```bash
git add packages/evals
git commit -m "feat(evals): live anthropic agent using published skill as system prompt"
```

---

### Task 12: Baseline record/replay + CLI

Live outputs are recorded to `baselines/<date>.json`; `replay` re-grades them offline — this catches scorer/validator drift in CI without API cost, and diffs live runs over time.

**Files:**
- Create: `packages/evals/src/baseline.ts`
- Create: `packages/evals/src/cli.ts`
- Test: `packages/evals/src/__tests__/baseline.test.ts`

- [ ] **Step 1: Write the failing test**

Create `packages/evals/src/__tests__/baseline.test.ts`:

```typescript
import { mkdtempSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { replayBaseline, writeBaseline } from '../baseline.js';
import { runEvals } from '../runner.js';
import { MockAgent } from '../agents/mock-agent.js';
import { MockJudge } from '../scorers/judge.js';
import { EVAL_DATASET } from '../dataset.js';

describe('baseline record/replay', () => {
  it('round-trips a report and re-grades it identically', async () => {
    const report = await runEvals(EVAL_DATASET.slice(0, 2), new MockAgent(), new MockJudge(), {
      samples: 2,
      mode: 'mock',
    });
    const dir = mkdtempSync(join(tmpdir(), 'evals-'));
    const path = writeBaseline(report, dir);
    expect(JSON.parse(readFileSync(path, 'utf8')).cases).toHaveLength(2);

    const replayed = await replayBaseline(path, EVAL_DATASET.slice(0, 2), new MockJudge());
    expect(replayed.worstOfNPassRate).toBe(report.worstOfNPassRate);
    expect(replayed.mode).toBe('replay');
  });
});
```

- [ ] **Step 2: Run to verify it fails**

```bash
pnpm --filter @cognivo/evals test -- baseline
```

Expected: FAIL — module not found.

- [ ] **Step 3: Write `packages/evals/src/baseline.ts`**

```typescript
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Judge } from './scorers/judge.js';
import { scoreDeterministic } from './scorers/deterministic.js';
import { scoreExpectations } from './scorers/expectations.js';
import { RUBRIC_PASS_MEAN } from './runner.js';
import type { CaseResult, EvalCase, EvalReport, SampleResult } from './types.js';

/** Persist a (usually live) report so its outputs can be re-graded offline. */
export function writeBaseline(report: EvalReport, dir: string): string {
  const stamp = report.startedAt.replace(/[:.]/g, '-');
  const path = join(dir, `baseline-${report.agentName}-${stamp}.json`);
  writeFileSync(path, JSON.stringify(report, null, 2));
  return path;
}

export function latestBaseline(dir: string): string | null {
  const files = readdirSync(dir).filter((f) => f.startsWith('baseline-') && f.endsWith('.json')).sort();
  return files.length ? join(dir, files[files.length - 1]!) : null;
}

/**
 * Re-grade recorded outputs through the CURRENT scorers. Catches validator
 * drift (audit-page rules changed, catalog renamed a tag) with no API cost.
 */
export async function replayBaseline(
  path: string,
  cases: EvalCase[],
  judge: Judge,
): Promise<EvalReport> {
  const recorded = JSON.parse(readFileSync(path, 'utf8')) as EvalReport;
  const byId = new Map(cases.map((c) => [c.id, c]));
  const caseResults: CaseResult[] = [];

  for (const rc of recorded.cases) {
    const caseDef = byId.get(rc.caseId);
    if (!caseDef) continue; // case removed from dataset — skip
    const samples: SampleResult[] = [];
    for (const s of rc.samples) {
      const det = scoreDeterministic(s.output.html);
      const exp = scoreExpectations(s.output.html, caseDef.expect);
      const rubricScores = await judge.score(caseDef, s.output.html);
      const rubricMean = rubricScores.reduce((a, r) => a + r.score, 0) / (rubricScores.length || 1);
      const pass = det.pass && exp.pass && rubricMean >= RUBRIC_PASS_MEAN;
      samples.push({ ...s, deterministicPass: det.pass, expectationsPass: exp.pass, rubricScores, issues: [...det.issues, ...exp.failures], pass });
    }
    const okCount = samples.filter((s) => s.pass).length;
    caseResults.push({ caseId: rc.caseId, category: rc.category, samples, worstOfN: okCount === samples.length, passRate: okCount / (samples.length || 1) });
  }

  const worstOfNPassRate = caseResults.filter((c) => c.worstOfN).length / (caseResults.length || 1);
  const meanPassRate = caseResults.reduce((a, c) => a + c.passRate, 0) / (caseResults.length || 1);
  return { mode: 'replay', agentName: recorded.agentName, judgeName: judge.name, cases: caseResults, worstOfNPassRate, meanPassRate, startedAt: new Date().toISOString() };
}
```

- [ ] **Step 4: Write `packages/evals/src/cli.ts`**

```typescript
#!/usr/bin/env node
/**
 * Cognivo design-system evals CLI.
 *   run --mode mock [--samples N]   offline gate (CI)
 *   live [--samples N] [--model M] [--record]   live run (needs ANTHROPIC_API_KEY)
 *   replay [baseline.json]          re-grade recorded outputs offline
 * Exit 0 on GO, 1 on NO-GO.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { EVAL_DATASET } from './dataset.js';
import { MockAgent } from './agents/mock-agent.js';
import { AnthropicAgent } from './agents/anthropic-agent.js';
import { MockJudge, AnthropicJudge } from './scorers/judge.js';
import { runEvals } from './runner.js';
import { evaluateGate } from './gate.js';
import { formatConsole } from './report.js';
import { latestBaseline, replayBaseline, writeBaseline } from './baseline.js';

const args = process.argv.slice(2);
const command = args[0] ?? 'run';
const flag = (name: string): string | undefined => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};
const has = (name: string): boolean => args.includes(`--${name}`);

const BASELINE_DIR = resolve(import.meta.dirname ?? '.', '../baselines');
mkdirSync(BASELINE_DIR, { recursive: true });

async function main(): Promise<number> {
  const samples = Number(flag('samples') ?? 3);

  if (command === 'replay') {
    const positional = args[1] && !args[1].startsWith('--') ? args[1] : undefined;
    const path = flag('file') ?? positional ?? latestBaseline(BASELINE_DIR);
    if (!path) {
      console.log('No baseline found — run `pnpm evals:live` first.');
      return 0;
    }
    const report = await replayBaseline(path, EVAL_DATASET, new MockJudge());
    const decision = evaluateGate(report);
    console.log(formatConsole(report, decision));
    return decision.go ? 0 : 1;
  }

  const live = command === 'live';
  const agent = live ? new AnthropicAgent(flag('model')) : new MockAgent();
  const judge = live ? new AnthropicJudge(flag('model')) : new MockJudge();

  const report = await runEvals(EVAL_DATASET, agent, judge, {
    samples,
    mode: live ? 'live' : 'mock',
  });

  if (has('record')) {
    const path = writeBaseline(report, BASELINE_DIR);
    console.log(`Baseline recorded: ${path}`);
  }
  if (has('json')) writeFileSync(flag('json') ?? 'eval-report.json', JSON.stringify(report, null, 2));

  const decision = evaluateGate(report);
  console.log(formatConsole(report, decision));
  return decision.go ? 0 : 1;
}

main().then(
  (code) => process.exit(code),
  (err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exit(1);
  },
);
```

(Fix during implementation if the flag parser misreads `--record`/other flags after the `replay` positional — the intent: explicit `--file`, else a positional path, else latest baseline.)

- [ ] **Step 5: Run test + the offline gate end to end**

```bash
pnpm --filter @cognivo/evals test
pnpm --filter @cognivo/evals gate
```

Expected: tests PASS; gate prints `GATE: GO` and exits 0.

- [ ] **Step 6: Commit**

```bash
git add packages/evals
git commit -m "feat(evals): baseline record/replay and CLI with GO/NO-GO exit"
```

---

## Phase C — CI wiring and docs

### Task 13: CI offline gate + manual live workflow

**Files:**
- Modify: `.github/workflows/ci.yml`
- Create: `.github/workflows/evals-live.yml`
- Modify: `package.json` (root)

- [ ] **Step 1: Root scripts**

Add to root `package.json` scripts:

```json
    "evals": "pnpm --filter @cognivo/evals gate",
    "evals:live": "pnpm --filter @cognivo/evals live",
    "evals:replay": "pnpm --filter @cognivo/evals replay"
```

- [ ] **Step 2: CI offline gate**

In `.github/workflows/ci.yml`, after the `Registry drift check` step (Task 3) add:

```yaml
      - name: Design-system evals (offline)
        run: pnpm evals
```

Turbo runs `build` before `test`/`gate` order is irrelevant here because the job already ran `pnpm build`; the mock-mode gate needs `catalog.json` + `_generated-tags.ts`, both products of the build.

- [ ] **Step 3: Live workflow (manual + weekly)**

Create `.github/workflows/evals-live.yml`:

```yaml
name: Evals (live)

on:
  workflow_dispatch:
    inputs:
      samples:
        description: 'Samples per case (N for worst-of-N)'
        default: '3'
      model:
        description: 'Model ID'
        default: 'claude-opus-4-8'
  schedule:
    - cron: '41 6 * * 1' # weekly, Monday ~06:41 UTC

jobs:
  live-evals:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - name: Run live evals
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: pnpm --filter @cognivo/evals live --record --json eval-report.json --samples ${{ github.event.inputs.samples || '3' }} --model ${{ github.event.inputs.model || 'claude-opus-4-8' }}
      - uses: actions/upload-artifact@v4
        with:
          name: eval-report
          path: |
            eval-report.json
            packages/evals/baselines/*.json
```

Add `ANTHROPIC_API_KEY` as a repo secret (manual step, do in GitHub settings — note it in the PR description).

- [ ] **Step 4: Verify the offline gate locally exactly as CI runs it**

```bash
pnpm build && pnpm evals
```

Expected: `GATE: GO`, exit 0.

- [ ] **Step 5: Commit**

```bash
git add .github/workflows package.json
git commit -m "ci: offline eval gate on every PR, manual/weekly live evals workflow"
```

---

### Task 14: Docs

**Files:**
- Create: `packages/evals/README.md`
- Modify: `CLAUDE.md` (knowledge-base index entry)

- [ ] **Step 1: Write `packages/evals/README.md`**

Cover: what it is (one paragraph citing the evals approach), the three scorers, why prompts hide expected components, commands (`pnpm evals`, `pnpm evals:live`, `pnpm evals:replay`), how to add a case (edit `src/dataset.ts`, tags must exist in catalog, prompt must not name them — the dataset test enforces both), how to read a NO-GO, and the tuning note (warnings tolerated, thresholds in `gate.ts`).

- [ ] **Step 2: Add CLAUDE.md index entry**

In `CLAUDE.md`'s package inventory / knowledge-base section, add one line: ``packages/evals` — design-system eval suite; run `pnpm evals` before changing CLAUDE.md, claude-code-skill, or the MCP catalog.`

- [ ] **Step 3: Commit**

```bash
git add packages/evals/README.md CLAUDE.md
git commit -m "docs: evals package readme and CLAUDE.md index entry"
```

---

## Verification (whole-plan)

1. `pnpm install && pnpm build` — clean
2. `pnpm test` — all packages green incl. new evals + mcp-server parity tests
3. `pnpm lint && pnpm type-check` — clean
4. `node scripts/check-registry-drift.mjs` — OK
5. `pnpm evals` — GATE: GO, exit 0
6. Optional with key: `pnpm evals:live` — real model run, baseline recorded, `pnpm evals:replay` re-grades offline

## Out of scope (explicit)

- Live run of the dynamic-interfaces G1 gate (`docs/specs/dynamic-interfaces/engine/harness/live-gate.ts`) — separate decision, needs its own key/budget conversation.
- Full codegen of `docs/src/data/registry.ts` from the catalog — the drift gate (Task 3) is the enforcement; consolidation can follow later.
- promptfoo adoption — custom harness chosen.
- Per-PR live evals in CI — manual/weekly only.

---

## Phase D — Unified `cognivo` CLI (added post-approval, user-requested)

The repo has three fragmented entry points (`cognivo-mcp`, `cognivo-theme`, `install-cognivo-skill`) and no unified CLI. Add `@cognivo/cli` with a `cognivo` bin, read-only subcommands wrapping what already exists. Scope decision (user-confirmed): read-only — no `init`, no machine-config changes.

**Architecture:** thin wrapper, zero new runtime deps beyond workspace packages. Argument parsing with `node:util` `parseArgs` (no commander/yargs). Commands:

- `cognivo audit <file|->` — run `auditPage` + `validateUsage` on an HTML file (or stdin), human + `--json` output. Reuses the exact scorers the eval suite uses.
- `cognivo components list [--category X]` / `cognivo components get <tag>` — query the generated catalog.
- `cognivo tokens find <query>` / `cognivo tokens for <css-property>` — search catalog tokens.
- `cognivo evals [run|live|replay] [flags]` — passthrough to `@cognivo/evals` runner (dynamic import; friendly error when the package isn't installed, e.g. consumer install).

**Files:**
- `packages/cli/package.json`, `tsconfig.json`, `README.md` — NEW
- `packages/cli/src/cli.ts` — NEW: entry (bin), arg parsing, dispatch, help
- `packages/cli/src/commands/audit.ts` — NEW
- `packages/cli/src/commands/components.ts` — NEW
- `packages/cli/src/commands/tokens.ts` — NEW
- `packages/cli/src/commands/evals.ts` — NEW
- `packages/cli/src/__tests__/audit.test.ts`, `components.test.ts`, `tokens.test.ts` — NEW
- Root `package.json` — MODIFY: nothing needed (bin resolves via workspace); CI smoke step optional

**Catalog shape reference** (`packages/mcp-server/src/catalog/types.ts`): `CognivoCatalog { components: ComponentEntry[], tokens: TokenEntry[], ... }`; `ComponentEntry { tag, className, category, description, properties: [{name,type,default,description}], events, slots, examples }`. Token entries have `name`/`value`/`category`-style fields — READ `types.ts` before writing the tokens command and use the real field names.

### Task 15: Scaffold `@cognivo/cli` + `audit` command

**Files:**
- Create: `packages/cli/package.json`
- Create: `packages/cli/tsconfig.json`
- Create: `packages/cli/src/cli.ts`
- Create: `packages/cli/src/commands/audit.ts`
- Test: `packages/cli/src/__tests__/audit.test.ts`

- [ ] **Step 1: Write `packages/cli/package.json`**

```json
{
  "name": "@cognivo/cli",
  "version": "0.1.0",
  "private": true,
  "description": "Cognivo CLI — audit generated UI, query the component/token catalog, run design-system evals.",
  "type": "module",
  "bin": {
    "cognivo": "./dist/cli.js"
  },
  "scripts": {
    "build": "tsc",
    "type-check": "tsc --noEmit",
    "test": "vitest run"
  },
  "dependencies": {
    "@cognivo/mcp-server": "workspace:*"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "tsx": "^4.19.0",
    "typescript": "^5.7.0",
    "vitest": "^2.1.0"
  },
  "license": "MIT"
}
```

- [ ] **Step 2: Write `packages/cli/tsconfig.json`** — same shape as `packages/evals/tsconfig.json` (extends `../../tsconfig.json`, outDir dist, rootDir src, resolveJsonModule, exclude tests).

- [ ] **Step 3: Write the failing test**

`packages/cli/src/__tests__/audit.test.ts`:

```typescript
import { describe, expect, it } from 'vitest';
import { runAudit } from '../commands/audit.js';

describe('cognivo audit', () => {
  it('passes clean cognivo markup', () => {
    const r = runAudit('<cg-card><cg-button label="Save">Save</cg-button></cg-card>');
    expect(r.exitCode).toBe(0);
    expect(r.text).toContain('OK');
  });

  it('fails unknown components with exit 1', () => {
    const r = runAudit('<cg-frobnicate></cg-frobnicate>');
    expect(r.exitCode).toBe(1);
    expect(r.text).toContain('cg-frobnicate');
  });

  it('fails raw hex with exit 1', () => {
    const r = runAudit('<cg-card><style>.x{color:#3b82f6}</style><cg-button label="a">a</cg-button></cg-card>');
    expect(r.exitCode).toBe(1);
  });

  it('emits machine-readable JSON with --json shape', () => {
    const r = runAudit('<cg-frobnicate></cg-frobnicate>', { json: true });
    const parsed = JSON.parse(r.text) as { valid: boolean; issues: unknown[] };
    expect(parsed.valid).toBe(false);
    expect(parsed.issues.length).toBeGreaterThan(0);
  });
});
```

Run: `pnpm --filter @cognivo/cli exec vitest run` — expect FAIL (module not found).

- [ ] **Step 4: Write `packages/cli/src/commands/audit.ts`**

```typescript
import { createRequire } from 'node:module';
import { auditPage } from '@cognivo/mcp-server/audit';
import { validateUsage } from '@cognivo/mcp-server/validate';
import type { CognivoCatalog } from '@cognivo/mcp-server/catalog-types';

const require = createRequire(import.meta.url);
const catalog = require('@cognivo/mcp-server/catalog.json') as CognivoCatalog;

export interface AuditResult {
  exitCode: number; // 0 = pass, 1 = violations
  text: string;
}

/** Shared with the eval suite's deterministic scorer — same rules, same truth. */
export function runAudit(html: string, opts: { json?: boolean } = {}): AuditResult {
  const audit = auditPage({ html, strict: false });
  const usage = validateUsage(catalog, { html });
  const usageHasErrors = /### Errors \([1-9]/.test(usage);
  const valid = audit.valid && !usageHasErrors;

  if (opts.json) {
    return {
      exitCode: valid ? 0 : 1,
      text: JSON.stringify({ valid, issues: audit.issues, usageReport: usage }, null, 2),
    };
  }

  const lines: string[] = [];
  for (const i of audit.issues) lines.push(`${i.level.toUpperCase().padEnd(7)} [${i.rule}] <${i.tag}> ${i.message}`);
  if (!usage.startsWith('All clear')) lines.push(usage);
  lines.push(valid ? 'OK: markup follows Cognivo rules.' : 'FAIL: violations found.');
  return { exitCode: valid ? 0 : 1, text: lines.join('\n') };
}
```

Run test — expect PASS.

- [ ] **Step 5: Write the `packages/cli/src/cli.ts` entry (audit only for now; other commands land in Task 16/17)**

```typescript
#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { parseArgs } from 'node:util';
import { runAudit } from './commands/audit.js';

const HELP = `cognivo — Cognivo design-system CLI

Usage:
  cognivo audit <file|-> [--json]   Audit HTML against Cognivo rules ('-' = stdin)
  cognivo components list [--category <id>]
  cognivo components get <tag> [--json]
  cognivo tokens find <query>
  cognivo tokens for <css-property>
  cognivo evals [run|live|replay] [flags]   (requires @cognivo/evals)
  cognivo help
`;

async function readStdin(): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const chunk of process.stdin) chunks.push(chunk as Buffer);
  return Buffer.concat(chunks).toString('utf8');
}

async function main(): Promise<number> {
  const [command, ...rest] = process.argv.slice(2);
  if (!command || command === 'help' || command === '--help') {
    console.log(HELP);
    return 0;
  }

  if (command === 'audit') {
    const { values, positionals } = parseArgs({
      args: rest,
      allowPositionals: true,
      options: { json: { type: 'boolean', default: false } },
    });
    const file = positionals[0];
    if (!file) {
      console.error('audit: missing <file|-> argument');
      return 2;
    }
    const html = file === '-' ? await readStdin() : readFileSync(file, 'utf8');
    const r = runAudit(html, { json: values.json });
    console.log(r.text);
    return r.exitCode;
  }

  console.error(`Unknown command: ${command}\n\n${HELP}`);
  return 2;
}

main().then(
  (code) => process.exit(code),
  (err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exit(1);
  },
);
```

- [ ] **Step 6: Verify end to end**

```bash
pnpm install
pnpm --filter @cognivo/cli build
echo '<cg-frobnicate></cg-frobnicate>' | node packages/cli/dist/cli.js audit -
echo '<cg-card><cg-button label="Ok">Ok</cg-button></cg-card>' | node packages/cli/dist/cli.js audit -
```

Expected: first exits 1 with `unknown-component`; second exits 0 with `OK`.

- [ ] **Step 7: Commit**

```bash
git add packages/cli pnpm-lock.yaml
git commit -m "feat(cli): scaffold @cognivo/cli with audit command"
```

### Task 16: `components` and `tokens` commands

**Files:**
- Create: `packages/cli/src/commands/components.ts`
- Create: `packages/cli/src/commands/tokens.ts`
- Modify: `packages/cli/src/cli.ts` (wire the commands)
- Test: `packages/cli/src/__tests__/components.test.ts`, `tokens.test.ts`

- [ ] **Step 1: Read `packages/mcp-server/src/catalog/types.ts` first** — use the real `ComponentEntry`/token entry field names; do not guess.

- [ ] **Step 2: Write failing tests**

`components.test.ts`:

```typescript
import { describe, expect, it } from 'vitest';
import { listComponents, getComponent } from '../commands/components.js';

describe('cognivo components', () => {
  it('lists all components with count', () => {
    const r = listComponents();
    expect(r.text).toContain('cg-button');
    expect(r.exitCode).toBe(0);
  });

  it('filters by category', () => {
    const all = listComponents().text.split('\n').length;
    const filtered = listComponents({ category: 'foundation' });
    expect(filtered.exitCode).toBe(0);
    expect(filtered.text.split('\n').length).toBeLessThan(all);
  });

  it('gets a single component with props', () => {
    const r = getComponent('cg-button');
    expect(r.exitCode).toBe(0);
    expect(r.text).toContain('cg-button');
  });

  it('exit 2 + suggestion on unknown tag', () => {
    const r = getComponent('cg-buttno');
    expect(r.exitCode).toBe(2);
    expect(r.text).toMatch(/did you mean|unknown/i);
  });
});
```

`tokens.test.ts`:

```typescript
import { describe, expect, it } from 'vitest';
import { findTokens, tokenFor } from '../commands/tokens.js';

describe('cognivo tokens', () => {
  it('finds tokens by name substring', () => {
    const r = findTokens('surface');
    expect(r.exitCode).toBe(0);
    expect(r.text).toContain('--cg-');
  });

  it('suggests a token for a css property', () => {
    const r = tokenFor('color');
    expect(r.exitCode).toBe(0);
    expect(r.text).toContain('--cg-');
  });

  it('exit 2 when nothing matches', () => {
    expect(findTokens('zzz-no-such-token').exitCode).toBe(2);
  });
});
```

Run — expect FAIL (modules not found).

- [ ] **Step 3: Implement both commands** (pure functions returning `{ exitCode, text }` like `runAudit`; load the catalog via the same `createRequire` pattern). `getComponent` prints tag, category, description, and a props table (name/type/default/description). Unknown tag: suggest the closest tag by substring/prefix match. `tokenFor(property)` maps common CSS properties (`color`, `background`, `spacing`, `gap`, `padding`, `font-size`, `radius`, `shadow`) to token name patterns and prints matches from the catalog. Keep it simple — substring filtering, no fuzzy library.

- [ ] **Step 4: Wire into `cli.ts`** — add `components` (sub: `list` with `--category`, `get <tag>` with `--json`) and `tokens` (sub: `find <query>`, `for <property>`) branches using `parseArgs` like the audit branch.

- [ ] **Step 5: Run tests + smoke**

```bash
pnpm --filter @cognivo/cli test
node packages/cli/dist/cli.js components list | head -5
node packages/cli/dist/cli.js tokens find surface | head -5
```

- [ ] **Step 6: Commit**

```bash
git add packages/cli
git commit -m "feat(cli): components and tokens catalog commands"
```

### Task 17: `evals` passthrough + docs

**Files:**
- Create: `packages/cli/src/commands/evals.ts`
- Modify: `packages/cli/src/cli.ts` (wire evals)
- Create: `packages/cli/README.md`
- Modify: `AGENTS.md` (mention the CLI), `CLAUDE.md` (package inventory line)

- [ ] **Step 1: Write `packages/cli/src/commands/evals.ts`**

```typescript
/** Passthrough to @cognivo/evals. The package is private/workspace-only, so
 *  resolve it dynamically and fail friendly when absent (consumer installs). */
export async function runEvalsPassthrough(argv: string[]): Promise<number> {
  let cliPath: string;
  try {
    cliPath = new URL(import.meta.resolve('@cognivo/evals/src/cli.ts')).pathname;
  } catch {
    console.error('cognivo evals: @cognivo/evals is not installed (it ships with the Cognivo repo, not the npm CLI).');
    return 2;
  }
  const { spawnSync } = await import('node:child_process');
  const r = spawnSync('node', ['--import', 'tsx', cliPath, ...argv], { stdio: 'inherit' });
  return r.status ?? 1;
}
```

(If `import.meta.resolve` of a TS path proves brittle, fall back to resolving `../evals/src/cli.ts` relative to the monorepo and erroring if absent. Verify by running `node packages/cli/dist/cli.js evals run --mode mock` — expect the eval gate output and exit 0.)

- [ ] **Step 2: Wire `evals` into `cli.ts`** — pass through `rest` verbatim: `return runEvalsPassthrough(rest);`

- [ ] **Step 3: Write `packages/cli/README.md`** — install (workspace), each command with an example, exit codes (0 pass / 1 violations / 2 usage error), and the note that `evals` requires the monorepo's evals package.

- [ ] **Step 4: Update `AGENTS.md` and `CLAUDE.md`** — one line each: `packages/cli` — unified `cognivo` CLI (`audit`, `components`, `tokens`, `evals`).

- [ ] **Step 5: Verify**

```bash
pnpm --filter @cognivo/cli build && pnpm --filter @cognivo/cli test
node packages/cli/dist/cli.js help
node packages/cli/dist/cli.js evals run --mode mock
```

Expected: help prints; evals passthrough prints the gate report, exit 0.

- [ ] **Step 6: Commit**

```bash
git add packages/cli AGENTS.md CLAUDE.md
git commit -m "feat(cli): evals passthrough command and docs"
```
