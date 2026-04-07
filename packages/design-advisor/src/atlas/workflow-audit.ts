/**
 * Workflow Audit Engine
 *
 * Pure logic engine that audits a set of Cognivo component tags
 * against the Atlas interaction taxonomy. Calculates pattern coverage,
 * layer coverage, bias risks, gaps, and an overall score.
 *
 * @module @cognivo/design-advisor/atlas/workflow-audit
 */

import type {
  AtlasPatternCard,
  AtlasLayer,
  ImplementationStatus,
} from './types.js';
import { atlasRegistry } from './atlas-registry.js';
import { COMPONENT_PATTERN_MAP } from './mappings/component-pattern-map.js';
import { BIAS_PATTERN_MAP } from './mappings/bias-pattern-map.js';

// ---------------------------------------------------------------------------
// Public interfaces
// ---------------------------------------------------------------------------

export interface WorkflowAuditInput {
  /** Component tags present in the workflow (e.g. ["ai-chat", "ai-feedback"]). */
  componentTags: string[];
  /** Optional human-readable workflow name. */
  workflowName?: string;
}

export interface BiasRisk {
  biasId: string;
  biasName: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  triggeredBy: string[]; // pattern IDs
  reasoning: string;
}

export interface AtlasGap {
  pattern: AtlasPatternCard;
  importance: 'critical' | 'recommended' | 'nice-to-have';
  suggestion: string;
}

export interface WorkflowAuditResult {
  workflowName: string;
  componentCount: number;
  patternsCovered: AtlasPatternCard[];
  layerCoverage: Record<AtlasLayer, { count: number; total: number; percentage: number }>;
  biasRisks: BiasRisk[];
  gaps: AtlasGap[];
  recommendations: string[];
  overallScore: number; // 0-100
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

const LAYERS: AtlasLayer[] = ['inbound', 'internal', 'outbound', 'interactive'];

/** Human-readable labels for bias IDs (best-effort). */
function humanizeBiasId(biasId: string): string {
  return biasId
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

/**
 * Calculate severity from the number of patterns that trigger the same bias.
 * More triggering patterns = higher risk of compounding effects.
 */
function scoreSeverity(triggerCount: number): BiasRisk['severity'] {
  if (triggerCount >= 4) return 'critical';
  if (triggerCount >= 3) return 'high';
  if (triggerCount >= 2) return 'medium';
  return 'low';
}

/**
 * Classify gap importance based on pattern status and layer.
 * Implemented patterns that are missing are critical; planned ones are nice-to-have.
 */
function classifyGapImportance(pattern: AtlasPatternCard): AtlasGap['importance'] {
  if (pattern.status === 'implemented') return 'critical';
  if (pattern.status === 'partial') return 'recommended';
  return 'nice-to-have';
}

/**
 * Generate a human-readable suggestion for a gap.
 */
function suggestForGap(pattern: AtlasPatternCard): string {
  const components = pattern.cognivoComponents;
  if (components.length > 0) {
    const tags = components.slice(0, 3).map(c => `<${c}>`).join(', ');
    return `Add ${tags} to cover the "${pattern.name}" pattern (${pattern.layer} layer).`;
  }
  return `The "${pattern.name}" pattern (${pattern.layer} layer) has no implementing component yet — consider building one.`;
}

// ---------------------------------------------------------------------------
// Main audit function
// ---------------------------------------------------------------------------

/**
 * Audit a workflow's component tags against the Atlas taxonomy.
 *
 * 1. Resolves each tag to its Atlas patterns via the component-pattern map.
 * 2. Calculates layer coverage (% of each layer covered).
 * 3. Collects bias risks from covered patterns via the bias-pattern map.
 * 4. Identifies gaps — important patterns with no implementing component in the workflow.
 * 5. Generates plain-English recommendations.
 * 6. Calculates an overall score (0-100).
 */
export function auditWorkflow(input: WorkflowAuditInput): WorkflowAuditResult {
  const { componentTags, workflowName = 'Unnamed Workflow' } = input;

  // 1. Resolve component tags -> pattern IDs -> pattern cards
  const coveredPatternIds = new Set<string>();
  for (const tag of componentTags) {
    const patternIds = COMPONENT_PATTERN_MAP[tag];
    if (patternIds) {
      for (const pid of patternIds) {
        coveredPatternIds.add(pid);
      }
    }
  }

  const allPatterns = atlasRegistry.getAll();
  const patternsCovered = allPatterns.filter(p => coveredPatternIds.has(p.id));

  // 2. Layer coverage
  const layerCoverage = {} as Record<AtlasLayer, { count: number; total: number; percentage: number }>;
  for (const layer of LAYERS) {
    const totalInLayer = allPatterns.filter(p => p.layer === layer).length;
    const coveredInLayer = patternsCovered.filter(p => p.layer === layer).length;
    layerCoverage[layer] = {
      count: coveredInLayer,
      total: totalInLayer,
      percentage: totalInLayer > 0 ? Math.round((coveredInLayer / totalInLayer) * 100) : 0,
    };
  }

  // 3. Bias risks — aggregate all biases from covered patterns
  const biasToPatterns: Record<string, string[]> = {};
  for (const pid of coveredPatternIds) {
    const biases = BIAS_PATTERN_MAP[pid];
    if (biases) {
      for (const biasId of biases) {
        if (!biasToPatterns[biasId]) biasToPatterns[biasId] = [];
        biasToPatterns[biasId].push(pid);
      }
    }
  }

  const biasRisks: BiasRisk[] = Object.entries(biasToPatterns)
    .map(([biasId, triggeringPatterns]) => ({
      biasId,
      biasName: humanizeBiasId(biasId),
      severity: scoreSeverity(triggeringPatterns.length),
      triggeredBy: triggeringPatterns,
      reasoning: `Triggered by ${triggeringPatterns.length} pattern${triggeringPatterns.length > 1 ? 's' : ''}: ${triggeringPatterns.join(', ')}. Compounding exposure increases risk.`,
    }))
    .sort((a, b) => {
      const order: Record<string, number> = { critical: 0, high: 1, medium: 2, low: 3 };
      return (order[a.severity] ?? 4) - (order[b.severity] ?? 4);
    });

  // 4. Identify gaps — actionable patterns not covered by the workflow
  const actionableStatuses: ImplementationStatus[] = ['implemented', 'partial', 'planned'];
  const gaps: AtlasGap[] = allPatterns
    .filter(p => !coveredPatternIds.has(p.id) && actionableStatuses.includes(p.status))
    .map(p => ({
      pattern: p,
      importance: classifyGapImportance(p),
      suggestion: suggestForGap(p),
    }))
    .sort((a, b) => {
      const order: Record<string, number> = { critical: 0, recommended: 1, 'nice-to-have': 2 };
      return (order[a.importance] ?? 3) - (order[b.importance] ?? 3);
    });

  // 5. Generate recommendations
  const recommendations: string[] = [];

  // Layer-level recommendations
  for (const layer of LAYERS) {
    const cov = layerCoverage[layer];
    if (cov.percentage < 25 && cov.total > 0) {
      recommendations.push(
        `The ${layer} layer has only ${cov.percentage}% coverage (${cov.count}/${cov.total}). Consider adding components to address this gap.`,
      );
    }
  }

  // Bias-level recommendations
  const criticalBiases = biasRisks.filter(b => b.severity === 'critical');
  if (criticalBiases.length > 0) {
    recommendations.push(
      `${criticalBiases.length} critical bias risk${criticalBiases.length > 1 ? 's' : ''} detected: ${criticalBiases.slice(0, 3).map(b => b.biasName).join(', ')}. Add guardrails or explicit mitigation.`,
    );
  }

  // Gap-level recommendations
  const criticalGaps = gaps.filter(g => g.importance === 'critical');
  if (criticalGaps.length > 0) {
    recommendations.push(
      `${criticalGaps.length} critical pattern gap${criticalGaps.length > 1 ? 's' : ''}: ${criticalGaps.slice(0, 3).map(g => g.pattern.name).join(', ')}. These patterns have implemented components you are not using.`,
    );
  }

  if (componentTags.length === 0) {
    recommendations.push('No component tags provided. Add components to receive meaningful audit results.');
  }

  if (recommendations.length === 0) {
    recommendations.push('Good coverage across layers and patterns. Monitor bias risks as the workflow evolves.');
  }

  // 6. Overall score (weighted: layer coverage 40%, pattern coverage 30%, bias mitigation 30%)
  const avgLayerCoverage =
    LAYERS.reduce((sum, l) => sum + layerCoverage[l].percentage, 0) / LAYERS.length;

  const totalActionable = allPatterns.filter(p => actionableStatuses.includes(p.status)).length;
  const patternCoveragePercent =
    totalActionable > 0 ? (patternsCovered.length / totalActionable) * 100 : 0;

  // Bias mitigation score: fewer critical/high biases = better
  const criticalAndHigh = biasRisks.filter(b => b.severity === 'critical' || b.severity === 'high').length;
  const biasMitigationScore = Math.max(0, 100 - criticalAndHigh * 8);

  const overallScore = Math.round(
    avgLayerCoverage * 0.4 +
    patternCoveragePercent * 0.3 +
    biasMitigationScore * 0.3,
  );

  return {
    workflowName,
    componentCount: componentTags.length,
    patternsCovered,
    layerCoverage,
    biasRisks,
    gaps,
    recommendations,
    overallScore: Math.min(100, Math.max(0, overallScore)),
  };
}
