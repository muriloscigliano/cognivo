import { describe, it, expect } from 'vitest';
import { BaseAiClient } from '../client/base';
import { AiIntent } from '../intents/types';
import type { AiContext } from '../context/types';
import type { AiResult } from '../results/types';
import type { AiRequestOptions } from '../client/types';

class MockClient extends BaseAiClient {
  protected async executeIntent<T>(
    _intent: AiIntent,
    _context: AiContext<T>,
    _options?: AiRequestOptions
  ): Promise<AiResult> {
    return { explanation: 'mock result', confidence: 0.9 };
  }
}

describe('BaseAiClient', () => {
  const client = new MockClient();

  it('runs a valid intent', async () => {
    const result = await client.runIntent(AiIntent.EXPLAIN, {
      dataset: [{ v: 1 }],
      meta: {},
    });
    expect(result.explanation).toBe('mock result');
    expect(result.confidence).toBe(0.9);
  });

  it('throws on invalid intent', async () => {
    await expect(
      client.runIntent('invalid' as any, { dataset: [1], meta: {} })
    ).rejects.toThrow('Invalid intent');
  });

  it('throws on missing dataset', async () => {
    await expect(
      client.runIntent(AiIntent.EXPLAIN, { dataset: null as any, meta: {} })
    ).rejects.toThrow('Context must include a dataset array');
  });

  it('throws on empty dataset', async () => {
    await expect(
      client.runIntent(AiIntent.EXPLAIN, { dataset: [], meta: {} })
    ).rejects.toThrow('Dataset cannot be empty');
  });
});
