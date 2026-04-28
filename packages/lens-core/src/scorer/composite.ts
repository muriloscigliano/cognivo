import type { SubScore, SubScoreName } from '../types/score.js';
import type { FormulaCoefficients } from './formula-registry.js';
import { clamp01to100 } from '../helpers/math.js';

/**
 * Compute the composite Lens Score from its four sub-scores.
 *
 * Formula (Spec §6.3):
 *   composite_raw = Σ (subScore × weight)
 *   capped at the most restrictive cap when any sub-score is critically low.
 */
export function computeComposite(
  subScores: Record<SubScoreName, SubScore>,
  formula: FormulaCoefficients
): number {
  const weights = formula.subScoreWeights;

  let raw = 0;
  const subScoreNames = Object.keys(weights) as SubScoreName[];
  for (const name of subScoreNames) {
    raw += subScores[name].value * weights[name];
  }

  // Apply caps in ascending threshold order so the most restrictive cap wins.
  const sortedCaps = [...formula.caps].sort(
    (a, b) => a.ifAnySubScoreBelow - b.ifAnySubScoreBelow
  );

  let capped = raw;
  for (const cap of sortedCaps) {
    const anyBelow = subScoreNames.some((name) => subScores[name].value < cap.ifAnySubScoreBelow);
    if (anyBelow && capped > cap.capCompositeAt) {
      capped = cap.capCompositeAt;
    }
  }

  return clamp01to100(capped);
}
