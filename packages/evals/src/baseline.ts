import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Judge } from './scorers/judge.js';
import { scoreDeterministic } from './scorers/deterministic.js';
import { scoreExpectations } from './scorers/expectations.js';
import { RUBRIC_PASS_MEAN } from './runner.js';
import type { CaseResult, EvalCase, EvalReport, SampleResult } from './types.js';

/** Persist a (usually live) report so its outputs can be re-graded offline. */
export function writeBaseline(report: EvalReport, dir: string): string {
  const stamp = report.startedAt.replace(/[:.]/g, '-');
  const path = join(dir, `baseline-${report.agentName}-${stamp}.json`);
  writeFileSync(path, JSON.stringify(report, null, 2));
  return path;
}

export function latestBaseline(dir: string): string | null {
  const files = readdirSync(dir)
    .filter((f) => f.startsWith('baseline-') && f.endsWith('.json'))
    .sort();
  return files.length ? join(dir, files[files.length - 1]!) : null;
}

/**
 * Re-grade recorded outputs through the CURRENT scorers. Catches validator
 * drift (audit-page rules changed, catalog renamed a tag) with no API cost.
 */
export async function replayBaseline(
  path: string,
  cases: EvalCase[],
  judge: Judge,
): Promise<EvalReport> {
  const recorded = JSON.parse(readFileSync(path, 'utf8')) as EvalReport;
  const byId = new Map(cases.map((c) => [c.id, c]));
  const caseResults: CaseResult[] = [];

  for (const rc of recorded.cases) {
    const caseDef = byId.get(rc.caseId);
    if (!caseDef) continue; // case removed from dataset — skip
    const samples: SampleResult[] = [];
    for (const s of rc.samples) {
      const det = scoreDeterministic(s.output.html);
      const exp = scoreExpectations(s.output.html, caseDef.expect);
      const rubricScores = await judge.score(caseDef, s.output.html);
      const rubricMean =
        rubricScores.reduce((a, r) => a + r.score, 0) / (rubricScores.length || 1);
      const pass = det.pass && exp.pass && rubricMean >= RUBRIC_PASS_MEAN;
      samples.push({
        ...s,
        deterministicPass: det.pass,
        expectationsPass: exp.pass,
        rubricScores,
        issues: [...det.issues, ...exp.failures],
        pass,
      });
    }
    const okCount = samples.filter((s) => s.pass).length;
    caseResults.push({
      caseId: rc.caseId,
      category: rc.category,
      samples,
      worstOfN: okCount === samples.length,
      passRate: okCount / (samples.length || 1),
    });
  }

  const worstOfNPassRate = caseResults.filter((c) => c.worstOfN).length / (caseResults.length || 1);
  const meanPassRate = caseResults.reduce((a, c) => a + c.passRate, 0) / (caseResults.length || 1);
  return {
    mode: 'replay',
    agentName: recorded.agentName,
    judgeName: judge.name,
    cases: caseResults,
    worstOfNPassRate,
    meanPassRate,
    startedAt: new Date().toISOString(),
  };
}
