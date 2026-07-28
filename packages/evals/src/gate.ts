import type { EvalReport } from './types.js';

export interface GateThresholds {
  worstOfNPassRate: number; // default 0.8 — like the G1 harness
  meanPassRate: number; // default 0.9
}

export const DEFAULT_THRESHOLDS: GateThresholds = {
  worstOfNPassRate: 0.8,
  meanPassRate: 0.9,
};

export interface GateDecision {
  go: boolean;
  reasons: string[];
}

export function evaluateGate(
  report: EvalReport,
  thresholds: GateThresholds = DEFAULT_THRESHOLDS,
): GateDecision {
  const reasons: string[] = [];

  if (report.worstOfNPassRate < thresholds.worstOfNPassRate) {
    reasons.push(
      `worst-of-N pass rate ${(report.worstOfNPassRate * 100).toFixed(0)}% < ${(thresholds.worstOfNPassRate * 100).toFixed(0)}%`,
    );
  }
  if (report.meanPassRate < thresholds.meanPassRate) {
    reasons.push(
      `mean pass rate ${(report.meanPassRate * 100).toFixed(0)}% < ${(thresholds.meanPassRate * 100).toFixed(0)}%`,
    );
  }

  const failing = report.cases.filter((c) => !c.worstOfN);
  for (const c of failing) {
    const worst = c.samples.find((s) => !s.pass);
    reasons.push(`case ${c.caseId} fails (${(c.passRate * 100).toFixed(0)}%): ${worst?.issues[0] ?? 'rubric mean below threshold'}`);
  }

  if (reasons.length === 0) reasons.push('all gate criteria met');
  return { go: reasons.length === 1 && reasons[0] === 'all gate criteria met', reasons };
}
