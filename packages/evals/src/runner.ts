import type { AgentClient } from './agents/types.js';
import type { Judge } from './scorers/judge.js';
import { scoreDeterministic } from './scorers/deterministic.js';
import { scoreExpectations } from './scorers/expectations.js';
import type { CaseResult, EvalCase, EvalReport, SampleResult } from './types.js';

export interface RunOptions {
  samples?: number; // default 3
  mode: EvalReport['mode'];
}

export const RUBRIC_PASS_MEAN = 0.6; // abstentions (0.5) don't sink a sample on their own

export async function runEvals(
  cases: EvalCase[],
  agent: AgentClient,
  judge: Judge,
  opts: RunOptions,
): Promise<EvalReport> {
  const samples = Math.max(1, opts.samples ?? 3);
  const caseResults: CaseResult[] = [];

  for (const c of cases) {
    const sampleResults: SampleResult[] = [];
    for (let s = 0; s < samples; s++) {
      const output = await agent.generate(c, s);
      const det = scoreDeterministic(output.html);
      const exp = scoreExpectations(output.html, c.expect);
      const rubricScores = await judge.score(c, output.html);
      const rubricMean =
        rubricScores.reduce((a, r) => a + r.score, 0) / (rubricScores.length || 1);

      const pass = det.pass && exp.pass && rubricMean >= RUBRIC_PASS_MEAN;
      sampleResults.push({
        caseId: c.id,
        sample: s,
        output,
        deterministicPass: det.pass,
        expectationsPass: exp.pass,
        rubricScores,
        issues: [...det.issues, ...exp.failures],
        pass,
      });
    }
    const okCount = sampleResults.filter((s) => s.pass).length;
    caseResults.push({
      caseId: c.id,
      category: c.category,
      samples: sampleResults,
      worstOfN: okCount === samples,
      passRate: okCount / samples,
    });
  }

  const worstOfNPassRate = caseResults.filter((c) => c.worstOfN).length / (caseResults.length || 1);
  const meanPassRate = caseResults.reduce((a, c) => a + c.passRate, 0) / (caseResults.length || 1);

  return {
    mode: opts.mode,
    agentName: agent.name,
    judgeName: judge.name,
    cases: caseResults,
    worstOfNPassRate,
    meanPassRate,
    startedAt: new Date().toISOString(),
  };
}
