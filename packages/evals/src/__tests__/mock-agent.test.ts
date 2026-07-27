import { describe, expect, it } from 'vitest';
import { MockAgent } from '../agents/mock-agent.js';
import { EVAL_DATASET } from '../dataset.js';

describe('MockAgent', () => {
  it('produces valid cg-tagged HTML for every dataset case', async () => {
    const agent = new MockAgent();
    for (const c of EVAL_DATASET) {
      const out = await agent.generate(c, 0);
      expect(out.html.length).toBeGreaterThan(0);
      expect(out.html).toMatch(/<(cg|ai)-[a-z0-9-]+/);
    }
  });

  it('varies output by sample index', async () => {
    const agent = new MockAgent();
    const c = EVAL_DATASET[0]!;
    const a = await agent.generate(c, 0);
    const b = await agent.generate(c, 1);
    expect(a.html).not.toBe(b.html);
  });

  it('is deterministic for the same case and sample', async () => {
    const agent = new MockAgent();
    const c = EVAL_DATASET[0]!;
    const a = await agent.generate(c, 0);
    const b = await agent.generate(c, 0);
    expect(a.html).toBe(b.html);
  });
});
