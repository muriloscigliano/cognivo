import type { PageIntent } from './classifier.js';
import type { Finding, FixHint, FindingCategory, Severity } from './findings.js';
import type { SceneGraph, SceneNode } from './scene-graph.js';

/** Cost class drives the engine's scheduler (Spec §4.1). */
export type RuleCost = 'cheap' | 'medium' | 'llm';

/** What kind of fix the rule produces (Spec §9.2). */
export type FixCategory = 'codeable' | 'structural' | 'judgment';

/** Helpers passed into `applies()` and `detect()`. */
export interface RuleHelpers {
  parsePrice(text: string | undefined): number | null;
  getComponentManifest(node: SceneNode): SceneNode['componentManifest'] | undefined;
}

/** Forward-declared SceneQuery interface — full impl lives in `helpers/scene-query.ts`. */
export interface SceneQuery {
  raw: SceneGraph;
  find(selector: string): SceneNode[];
  first(selector: string): SceneNode | undefined;
  /**
   * Find all (node, usage) pairs whose `usage.tier === opts.tier`.
   * Tier 0 = "off-grid" (value matches no known token).
   * `exclude` is a list of property name prefixes to skip; pattern is plain
   * prefix match, NOT glob — `'padding'` matches `padding-top`, `padding-left`,
   * etc. Case sensitive, matches the property name string Observer captured.
   */
  tokenViolations(opts: { tier: 0 | 1 | 2 | 3; exclude?: readonly string[] }): Array<{
    node: SceneNode;
    usage: SceneNode['tokenUsage'][number];
  }>;
  contrast(
    node: SceneNode,
    opts: { against: 'background'; wcag: 'AA' | 'AA-large' | 'AAA' | 'AAA-large' }
  ): { ratio: number; passes: boolean };
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

/** Output shape `detect()` returns — engine stamps `id`, `severity`, `category` from manifest. */
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
  expect: 'finding' | 'no-finding';
  confidenceRange?: { gte?: number; lte?: number };
}

/** The Rule manifest. Authored via `defineRule()`. */
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
