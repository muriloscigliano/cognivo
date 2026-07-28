import { describe, expect, it } from 'vitest';
import { runEvals } from '../runner.js';
import { evaluateGate, DEFAULT_THRESHOLDS } from '../gate.js';
import { MockAgent, BrokenMockAgent } from '../agents/mock-agent.js';
import { MockJudge } from '../scorers/judge.js';
import { EVAL_DATASET } from '../dataset.js';

describe('runEvals + evaluateGate', () => {
  it('mock agent passes the gate offline', async () => {
    const report = await runEvals(EVAL_DATASET, new MockAgent(), new MockJudge(), {
      samples: 3,
      mode: 'mock',
    });
    expect(report.cases).toHaveLength(EVAL_DATASET.length);
    expect(report.worstOfNPassRate).toBe(1);
    const decision = evaluateGate(report);
    expect(decision.go, decision.reasons.join('; ')).toBe(true);
  });

  it('broken agent fails the gate', async () => {
    const report = await runEvals(EVAL_DATASET, new BrokenMockAgent(), new MockJudge(), {
      samples: 2,
      mode: 'mock',
    });
    expect(report.worstOfNPassRate).toBeLessThan(DEFAULT_THRESHOLDS.worstOfNPassRate);
    expect(evaluateGate(report).go).toBe(false);
  });

  it('worst-of-N: one bad sample fails the case', async () => {
    const report = await runEvals(EVAL_DATASET, new MockAgent(), new MockJudge(), {
      samples: 3,
      mode: 'mock',
    });
    for (const c of report.cases) {
      expect(c.worstOfN).toBe(c.samples.every((s) => s.pass));
    }
  });
});
