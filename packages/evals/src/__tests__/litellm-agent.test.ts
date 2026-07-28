import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { LiteLLMAgent } from '../agents/litellm-agent.js';
import { EVAL_DATASET } from '../dataset.js';

describe('LiteLLMAgent', () => {
  const savedKey = process.env.LITELLM_API_KEY;

  beforeEach(() => {
    delete process.env.LITELLM_API_KEY;
  });

  afterEach(() => {
    if (savedKey !== undefined) process.env.LITELLM_API_KEY = savedKey;
  });

  it('has the litellm-agent name', () => {
    expect(new LiteLLMAgent().name).toBe('litellm-agent');
  });

  it('throws the missing-key error when LITELLM_API_KEY is unset', async () => {
    const agent = new LiteLLMAgent();
    await expect(agent.generate(EVAL_DATASET[0]!, 0)).rejects.toThrow(/LITELLM_API_KEY is not set/);
  });
});
