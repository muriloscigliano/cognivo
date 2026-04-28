import type { Finding } from '../types/findings.js';
import type { PageIntent } from '../types/classifier.js';
import type { Rule, RuleCost } from '../types/rule.js';
import type { RulePack } from '../types/pack.js';
import type { SceneGraph } from '../types/scene-graph.js';
import { createSceneQuery } from '../helpers/scene-query.js';
import { createRuleHelpers } from '../helpers/index.js';
import { clamp01to100 } from '../helpers/math.js';
import { computeFindingHash } from './finding-hash.js';

export interface RuleEngineConfig {
  /** Skip rules whose cost class is not in this set. Default: all costs. */
  costAllowlist?: ReadonlySet<RuleCost>;
  /** Specific rule overrides — turn off rules or change severity. */
  ruleOverrides?: Record<string, { severity?: Rule['severity']; enabled?: boolean }>;
}

/**
 * Synchronous, in-memory rule engine.
 *
 * Lifecycle:
 *   1. `register(pack)` — eagerly resolves the pack's lazy rules (one-time cost).
 *   2. `evaluate(scene, intent)` — runs all applicable rules, returns Findings.
 *
 * Scheduling (Spec §4.1):
 *   - cheap rules run first (deterministic order: pack registration, then rule index)
 *   - medium rules next
 *   - llm rules last — and ONLY if the cost allowlist permits them
 *
 * The `applies()` gate prunes rules per-call without paying their `detect()` cost.
 */
export class RuleEngine {
  private rules: Rule[] = [];

  constructor(private readonly config: RuleEngineConfig = {}) {}

  /**
   * Register a pack — resolves all lazy rules eagerly. Returns a Promise so
   * callers can `await engine.register(pack)` once at startup.
   */
  async register(pack: RulePack): Promise<void> {
    for (const lazy of pack.rules) {
      const mod = await lazy();
      this.rules.push(mod.default);
    }
  }

  /** Synchronous variant for already-resolved rules. */
  registerSync(rules: Rule[]): void {
    this.rules.push(...rules);
  }

  /** Number of registered rules — useful for diagnostics. */
  size(): number {
    return this.rules.length;
  }

  /**
   * Evaluate all registered rules against a scene + intent. Returns Findings
   * sorted by severity (blockers first), then by confidence.
   */
  evaluate(scene: SceneGraph, intent: PageIntent): Finding[] {
    const sceneQuery = createSceneQuery(scene);
    const helpers = createRuleHelpers();
    const detectedAt = new Date().toISOString();
    const findings: Finding[] = [];

    const planned = this.planRules(intent);
    for (const rule of planned) {
      const ctx = { scene: sceneQuery, intent, helpers };
      let appliesResult = false;
      try {
        appliesResult = rule.applies(ctx);
      } catch {
        // Defensive: a buggy rule's applies() should not crash the whole engine.
        continue;
      }
      if (!appliesResult) continue;

      let detections;
      try {
        detections = rule.detect(ctx);
      } catch {
        continue;
      }
      if (!detections || detections.length === 0) continue;

      const overrideSeverity = this.config.ruleOverrides?.[rule.id]?.severity;
      const severity = overrideSeverity ?? rule.severity;

      for (const det of detections) {
        const id = computeFindingHash({
          ruleId: rule.id,
          targetNodeId: det.targetNodeId,
          message: det.message,
        });
        findings.push({
          id,
          ruleId: rule.id,
          severity,
          confidence: clamp01to100(det.confidence),
          targetNodeId: det.targetNodeId,
          category: rule.category,
          message: det.message,
          why: det.why,
          citations: rule.citations,
          detectedAt,
          ...(det.fixHint !== undefined && { fixHint: det.fixHint }),
        });
      }
    }

    return sortFindings(findings);
  }

  /** Plan the rules to run for a given intent: filter + sort by cost. */
  private planRules(intent: PageIntent): Rule[] {
    const allowed = this.config.costAllowlist;
    const overrides = this.config.ruleOverrides ?? {};
    return this.rules
      .filter((rule) => {
        const override = overrides[rule.id];
        if (override?.enabled === false) return false;
        if (allowed && !allowed.has(rule.cost)) return false;
        if (rule.intentScope.length > 0 && !rule.intentScope.includes(intent)) return false;
        return true;
      })
      .sort((a, b) => costRank(a.cost) - costRank(b.cost));
  }
}

function costRank(cost: RuleCost): number {
  if (cost === 'cheap') return 0;
  if (cost === 'medium') return 1;
  return 2;
}

function severityRank(s: Finding['severity']): number {
  if (s === 'blocker') return 0;
  if (s === 'strong') return 1;
  if (s === 'consider') return 2;
  return 3; // positive
}

function sortFindings(findings: Finding[]): Finding[] {
  return [...findings].sort((a, b) => {
    const sev = severityRank(a.severity) - severityRank(b.severity);
    if (sev !== 0) return sev;
    return b.confidence - a.confidence;
  });
}
