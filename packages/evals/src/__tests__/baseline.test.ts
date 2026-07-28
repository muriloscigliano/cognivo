import { mkdtempSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { replayBaseline, writeBaseline } from '../baseline.js';
import { runEvals } from '../runner.js';
import { MockAgent } from '../agents/mock-agent.js';
import { MockJudge } from '../scorers/judge.js';
import { EVAL_DATASET } from '../dataset.js';

describe('baseline record/replay', () => {
  it('round-trips a report and re-grades it identically', async () => {
    const report = await runEvals(EVAL_DATASET.slice(0, 2), new MockAgent(), new MockJudge(), {
      samples: 2,
      mode: 'mock',
    });
    const dir = mkdtempSync(join(tmpdir(), 'evals-'));
    const path = writeBaseline(report, dir);
    expect(JSON.parse(readFileSync(path, 'utf8')).cases).toHaveLength(2);

    const replayed = await replayBaseline(path, EVAL_DATASET.slice(0, 2), new MockJudge());
    expect(replayed.worstOfNPassRate).toBe(report.worstOfNPassRate);
    expect(replayed.mode).toBe('replay');
  });
});
