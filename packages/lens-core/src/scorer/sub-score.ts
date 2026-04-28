import type { Finding } from '../types/findings.js';
import type { SubScore, SubScoreName, ScoreContribution } from '../types/score.js';
import type { FormulaCoefficients } from './formula-registry.js';
import { clamp01to100 } from '../helpers/math.js';

/**
 * Compute one sub-score from findings whose `category` matches.
 * (Spec §6.2 formula.)
 */
export function computeSubScore(
  name: SubScoreName,
  findings: Finding[],
  formula: FormulaCoefficients
): SubScore {
  const relevant = findings.filter((f) => f.category === name);

  // Group by ruleId so we can apply diminishing returns per-rule.
  const groups = new Map<string, Finding[]>();
  for (const f of relevant) {
    const list = groups.get(f.ruleId) ?? [];
    list.push(f);
    groups.set(f.ruleId, list);
  }

  let value = 100;
  const negatives: ScoreContribution[] = [];
  const positives: ScoreContribution[] = [];

  for (const [ruleId, group] of groups) {
    // Sort within a group by confidence desc so the highest-confidence finding
    // gets the full weight and subsequent ones decay.
    const sorted = [...group].sort((a, b) => b.confidence - a.confidence);
    sorted.forEach((finding, idx) => {
      const baseWeight = formula.severityWeight[finding.severity];
      const confidenceFactor = finding.confidence / 100;
      const dr = 1 / (1 + formula.drCoefficient * idx);
      const contribution = baseWeight * confidenceFactor * dr;
      value += contribution;

      const record: ScoreContribution = {
        ruleId,
        findingId: finding.id,
        delta: round2(contribution),
        reason: finding.message,
      };
      if (contribution < 0) negatives.push(record);
      else if (contribution > 0) positives.push(record);
    });
  }

  // Sort top deductions / wins for the breakdown UI
  const topDeductions = [...negatives]
    .sort((a, b) => a.delta - b.delta) // most negative first
    .slice(0, 5);
  const topWins = [...positives]
    .sort((a, b) => b.delta - a.delta) // most positive first
    .slice(0, 3);

  return {
    name,
    value: clamp01to100(value),
    topDeductions,
    topWins,
  };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
