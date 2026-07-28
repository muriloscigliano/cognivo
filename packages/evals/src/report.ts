import type { GateDecision } from './gate.js';
import type { EvalReport } from './types.js';

export function formatConsole(report: EvalReport, decision: GateDecision): string {
  const lines: string[] = [
    `\nCognivo design-system evals (${report.mode}, agent=${report.agentName}, judge=${report.judgeName})`,
    `worst-of-N: ${(report.worstOfNPassRate * 100).toFixed(0)}%   mean: ${(report.meanPassRate * 100).toFixed(0)}%`,
    '',
  ];
  for (const c of report.cases) {
    lines.push(`  ${c.worstOfN ? 'PASS' : 'FAIL'}  ${c.caseId} (${(c.passRate * 100).toFixed(0)}% of ${c.samples.length} samples)`);
    if (!c.worstOfN) {
      const bad = c.samples.find((s) => !s.pass);
      for (const issue of bad?.issues.slice(0, 3) ?? []) lines.push(`       ${issue}`);
    }
  }
  lines.push('', decision.go ? 'GATE: GO' : 'GATE: NO-GO');
  for (const r of decision.reasons) lines.push(`  - ${r}`);
  return lines.join('\n');
}
