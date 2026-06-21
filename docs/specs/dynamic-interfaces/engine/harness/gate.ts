/**
 * Dynamic Software Interfaces — the GO/NO-GO gate decision.
 *
 * Plan: ../../plans/G1bcd-harness.md.  Combines the three reports into the
 * single strategic decision (vision §6). Thresholds are explicit and overridable.
 */

import { type ConsistencyReport } from './runner.js';
import { type FidelityReport } from './judge.js';
import { type DeltaReport } from './baseline.js';

export interface GateThresholds {
  worstOfNGovern: number; // default 0.80
  fidelityMedian: number; // default 0.70
  minDelta: number; // default > 0 (governance must matter)
}

export const DEFAULT_THRESHOLDS: GateThresholds = {
  worstOfNGovern: 0.8,
  fidelityMedian: 0.7,
  minDelta: 0.0001,
};

export interface GateDecision {
  go: boolean;
  reasons: string[];
  metrics: {
    worstOfNGovernRate: number;
    fidelityMedian: number;
    delta: number;
  };
}

export function evaluateGate(
  consistency: ConsistencyReport,
  fidelity: FidelityReport,
  delta: DeltaReport,
  thresholds: GateThresholds = DEFAULT_THRESHOLDS,
): GateDecision {
  const reasons: string[] = [];

  const okConsistency = consistency.worstOfNGovernRate >= thresholds.worstOfNGovern;
  if (!okConsistency)
    reasons.push(
      `worst-of-N govern rate ${(consistency.worstOfNGovernRate * 100).toFixed(0)}% < ${(thresholds.worstOfNGovern * 100).toFixed(0)}%`,
    );

  const okFidelity = fidelity.median >= thresholds.fidelityMedian;
  if (!okFidelity)
    reasons.push(`fidelity median ${fidelity.median.toFixed(2)} < ${thresholds.fidelityMedian}`);

  const okDelta = delta.delta >= thresholds.minDelta;
  if (!okDelta) reasons.push(`governance delta ${delta.delta.toFixed(3)} — governance adds no measurable value (no moat)`);

  const go = okConsistency && okFidelity && okDelta;
  if (go) reasons.push('all gate criteria met');

  return {
    go,
    reasons,
    metrics: {
      worstOfNGovernRate: consistency.worstOfNGovernRate,
      fidelityMedian: fidelity.median,
      delta: delta.delta,
    },
  };
}
