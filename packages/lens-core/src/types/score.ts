/**
 * Date-pinned formula version (Spec §6.8). New formulas ship at most twice a year.
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
