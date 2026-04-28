import type { FormulaVersion, SubScoreName } from '../types/score.js';
import type { Severity } from '../types/findings.js';

/**
 * One formula version's coefficients. New formulas ship at most twice a year
 * (Spec §6.8). Old scores remain valid against the formula they were computed
 * under — we keep all formulas in this registry so historic scores can be
 * recomputed if needed.
 */
export interface FormulaCoefficients {
  /** Per-severity weight (negative for deductions, positive for wins). */
  severityWeight: Record<Severity, number>;
  /** Diminishing-returns factor: subsequent same-rule findings contribute less. */
  drCoefficient: number;
  /** Sub-score weights for the composite (must sum to 1.0). */
  subScoreWeights: Record<SubScoreName, number>;
  /** Composite caps when any sub-score is critically low. */
  caps: Array<{ ifAnySubScoreBelow: number; capCompositeAt: number }>;
}

const FORMULAS: Record<FormulaVersion, FormulaCoefficients> = {
  'v2026.04': {
    severityWeight: {
      blocker: -20,
      strong: -7,
      consider: -2,
      positive: 1.5,
    },
    drCoefficient: 0.15,
    subScoreWeights: {
      'cognitive-clarity': 0.3,
      'persuasive-integrity': 0.25,
      accessibility: 0.25,
      'system-health': 0.2,
    },
    caps: [
      { ifAnySubScoreBelow: 25, capCompositeAt: 50 },
      { ifAnySubScoreBelow: 40, capCompositeAt: 70 },
    ],
  },
};

export const DEFAULT_FORMULA_VERSION: FormulaVersion = 'v2026.04';

export function getFormula(version: FormulaVersion): FormulaCoefficients {
  const formula = FORMULAS[version];
  if (!formula) {
    throw new Error(`lens-core: unknown formula version "${version}".`);
  }
  return formula;
}

export function listFormulaVersions(): FormulaVersion[] {
  return Object.keys(FORMULAS) as FormulaVersion[];
}
