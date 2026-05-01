import {
  RuleEngine,
  computeLensScore,
  scan,
  type Finding,
  type LensScore,
  type RulePack,
  type SceneGraph,
  type SceneNode,
} from '@cognivo/lens-core';
import corePack from '@cognivo/lens-pack-core';

export interface ScanResult {
  findings: Finding[];
  score: LensScore;
  graph: SceneGraph;
  durationMs: number;
}

export interface ScanControllerOptions {
  /** Rule IDs to disable. Passed through to the engine's ruleOverrides. */
  disabledRules?: readonly string[];
  /**
   * Rule packs to register. When omitted, the engine registers
   * `@cognivo/lens-pack-core` only — the v0.1 default. Pass an explicit
   * array to add additional packs (e.g. `[corePack, ethicsPack]`).
   */
  packs?: readonly RulePack[];
}

/**
 * Coordinator between the lens engine and the UI. Lazy-registers the
 * configured packs on first use; subsequent runs reuse the same engine.
 *
 * Findings whose target node is a descendant of any `<cg-lens>` element on
 * the page are filtered out — we don't audit our own UI as if it were the
 * page being audited. (The dogfood meta-test audits the chrome separately,
 * scoped to the lens's own shadow root.)
 */
export class ScanController {
  private readonly engine: RuleEngine;
  private readonly registration: Promise<void>;

  constructor(options: ScanControllerOptions = {}) {
    const ruleOverrides: Record<string, { enabled: false }> = {};
    for (const id of options.disabledRules ?? []) ruleOverrides[id] = { enabled: false };
    const engine = new RuleEngine({ ruleOverrides });
    this.engine = engine;
    const packs = options.packs ?? [corePack];
    this.registration = (async () => {
      for (const pack of packs) await engine.register(pack);
    })();
  }

  async run(target: Element): Promise<ScanResult> {
    await this.registration;
    const t0 = nowMs();
    const graph = scan(target);
    const rawFindings = this.engine.evaluate(graph, 'unknown');
    const findings = filterOwnFindings(rawFindings, graph);
    const score = computeLensScore(findings);
    return { findings, score, graph, durationMs: nowMs() - t0 };
  }
}

function nowMs(): number {
  return typeof performance !== 'undefined' ? performance.now() : Date.now();
}

/**
 * Drop findings whose target node sits inside a `<cg-lens>` subtree. The
 * lens chrome lives in shadow DOM, so this filter is a belt-and-suspenders
 * guard against the rare case where a consumer light-DOM-portals our
 * elements (e.g. a Vue / React adapter that flattens shadow contents into
 * the host page).
 */
function filterOwnFindings(findings: Finding[], graph: SceneGraph): Finding[] {
  if (findings.length === 0) return findings;
  const byId = new Map<string, SceneNode>();
  for (const node of graph.nodes) byId.set(node.id, node);
  return findings.filter((f) => !ancestorIsLens(byId, f.targetNodeId));
}

function ancestorIsLens(byId: Map<string, SceneNode>, nodeId: string): boolean {
  let cur = byId.get(nodeId);
  while (cur) {
    if (cur.tag === 'cg-lens') return true;
    if (cur.parent === undefined) return false;
    cur = byId.get(cur.parent);
  }
  return false;
}
