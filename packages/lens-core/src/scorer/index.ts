import type { Finding } from '../types/findings.js';
import type {
  FormulaVersion,
  LensScore,
  SubScore,
  SubScoreName,
} from '../types/score.js';
import type { Persona } from '../types/persona.js';
import { computeSubScore } from './sub-score.js';
import { computeComposite } from './composite.js';
import { DEFAULT_FORMULA_VERSION, getFormula } from './formula-registry.js';
import { applyPersonaWeights } from '../personas/simulator.js';

export interface ScoreOptions {
  formulaVersion?: FormulaVersion;
  /** When provided, persona-modulated scoring (Spec §8.4). */
  persona?: Persona;
  /** Engine version, recorded on the LensScore for reproducibility. */
  engineVersion?: string;
}

const SUB_SCORE_NAMES: readonly SubScoreName[] = [
  'cognitive-clarity',
  'persuasive-integrity',
  'accessibility',
  'system-health',
];

/**
 * Compute the LensScore from a Findings array. Pure function — same input
 * produces same output (modulo `computedAt` timestamp).
 */
export function computeLensScore(findings: Finding[], options?: ScoreOptions): LensScore {
  const version = options?.formulaVersion ?? DEFAULT_FORMULA_VERSION;
  const formula = getFormula(version);

  const adjustedFindings = options?.persona
    ? applyPersonaWeights(findings, options.persona)
    : findings;

  const subScores: Record<SubScoreName, SubScore> = {
    'cognitive-clarity': computeSubScore('cognitive-clarity', adjustedFindings, formula),
    'persuasive-integrity': computeSubScore(
      'persuasive-integrity',
      adjustedFindings,
      formula
    ),
    accessibility: computeSubScore('accessibility', adjustedFindings, formula),
    'system-health': computeSubScore('system-health', adjustedFindings, formula),
  };

  const composite = computeComposite(subScores, formula);

  return {
    composite,
    subScores,
    formulaVersion: version,
    computedAt: new Date().toISOString(),
    engineVersion: options?.engineVersion ?? '0.1.0',
  };
}

export { computeSubScore } from './sub-score.js';
export { computeComposite } from './composite.js';
export { ScoreEwma } from './ewma.js';
export {
  DEFAULT_FORMULA_VERSION,
  getFormula,
  listFormulaVersions,
  type FormulaCoefficients,
} from './formula-registry.js';
export { SUB_SCORE_NAMES };
