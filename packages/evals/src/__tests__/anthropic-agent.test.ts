import { describe, expect, it } from 'vitest';
import { AnthropicAgent } from '../agents/anthropic-agent.js';
import { EVAL_DATASET } from '../dataset.js';

describe('AnthropicAgent', () => {
  it('exists and is named anthropic-agent', () => {
    const agent = new AnthropicAgent();
    expect(agent.name).toBe('anthropic-agent');
  });

  it('throws a clear error when ANTHROPIC_API_KEY is unset', async () => {
    // No repo-root .env exists, so deleting the env var guarantees no key.
    delete process.env.ANTHROPIC_API_KEY;
    const agent = new AnthropicAgent();
    await expect(agent.generate(EVAL_DATASET[0]!, 0)).rejects.toThrow(/ANTHROPIC_API_KEY is not set/);
  });
});
