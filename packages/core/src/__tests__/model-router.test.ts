import { describe, it, expect, vi } from 'vitest';
import { ModelRouterClient } from '../routing/model-router.js';
import { AiIntent } from '../intents/types.js';
import type { AiClient, AiRequestOptions } from '../client/types.js';
import type { AiContext } from '../context/types.js';
import type { AiResult } from '../results/types.js';
import type { ModelRouterConfig } from '../routing/types.js';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeContext(size: number = 2): AiContext<{ v: number }> {
  return { dataset: Array.from({ length: size }, (_, i) => ({ v: i })) };
}

function makeClient(result: AiResult = { explanation: 'ok' }): AiClient & { runIntent: ReturnType<typeof vi.fn> } {
  return {
    runIntent: vi.fn().mockResolvedValue(result),
  };
}

function makeStreamClient(chunks: Partial<AiResult>[]): AiClient & { runIntent: ReturnType<typeof vi.fn> } {
  return {
    runIntent: vi.fn().mockResolvedValue({ explanation: 'unused' }),
    async *streamIntent() {
      for (const chunk of chunks) {
        yield chunk;
      }
    },
  };
}

const baseConfig: ModelRouterConfig = {
  routes: [
    { intents: [AiIntent.SUMMARIZE, AiIntent.EXPLAIN], model: 'gpt-4o-mini', temperature: 0.3 },
    { intents: [AiIntent.FORECAST, AiIntent.DETECT_ANOMALY], model: 'gpt-4o', temperature: 0.1, maxTokens: 4096 },
  ],
  defaultModel: 'gpt-3.5-turbo',
  defaultTemperature: 0.5,
  complexityThreshold: 100,
  complexityModel: 'gpt-4o',
};

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('ModelRouterClient', () => {
  // -----------------------------------------------------------------------
  // Intent-based routing
  // -----------------------------------------------------------------------

  it('routes SUMMARIZE to the configured model', async () => {
    const inner = makeClient();
    const router = new ModelRouterClient(inner, baseConfig);

    await router.runIntent(AiIntent.SUMMARIZE, makeContext());

    expect(inner.runIntent).toHaveBeenCalledTimes(1);
    const passedOptions = inner.runIntent.mock.calls[0]![2] as AiRequestOptions;
    expect(passedOptions.model).toBe('gpt-4o-mini');
  });

  it('routes FORECAST to a different model', async () => {
    const inner = makeClient();
    const router = new ModelRouterClient(inner, baseConfig);

    await router.runIntent(AiIntent.FORECAST, makeContext());

    const passedOptions = inner.runIntent.mock.calls[0]![2] as AiRequestOptions;
    expect(passedOptions.model).toBe('gpt-4o');
  });

  it('falls back to defaultModel for unmatched intents', async () => {
    const inner = makeClient();
    const router = new ModelRouterClient(inner, baseConfig);

    await router.runIntent(AiIntent.CLUSTER, makeContext());

    const passedOptions = inner.runIntent.mock.calls[0]![2] as AiRequestOptions;
    expect(passedOptions.model).toBe('gpt-3.5-turbo');
  });

  // -----------------------------------------------------------------------
  // Per-request overrides
  // -----------------------------------------------------------------------

  it('per-request options.model overrides the route', async () => {
    const inner = makeClient();
    const router = new ModelRouterClient(inner, baseConfig);

    await router.runIntent(AiIntent.SUMMARIZE, makeContext(), { model: 'claude-3-opus' });

    const passedOptions = inner.runIntent.mock.calls[0]![2] as AiRequestOptions;
    expect(passedOptions.model).toBe('claude-3-opus');
  });

  // -----------------------------------------------------------------------
  // Complexity-based routing
  // -----------------------------------------------------------------------

  it('uses complexityModel when dataset exceeds threshold', async () => {
    const inner = makeClient();
    const router = new ModelRouterClient(inner, baseConfig);

    // Route would normally pick gpt-4o-mini for SUMMARIZE, but 200 items > 100 threshold
    await router.runIntent(AiIntent.SUMMARIZE, makeContext(200));

    const passedOptions = inner.runIntent.mock.calls[0]![2] as AiRequestOptions;
    expect(passedOptions.model).toBe('gpt-4o');
  });

  it('uses regular route model when dataset is below threshold', async () => {
    const inner = makeClient();
    const router = new ModelRouterClient(inner, baseConfig);

    await router.runIntent(AiIntent.SUMMARIZE, makeContext(50));

    const passedOptions = inner.runIntent.mock.calls[0]![2] as AiRequestOptions;
    expect(passedOptions.model).toBe('gpt-4o-mini');
  });

  // -----------------------------------------------------------------------
  // Temperature and maxTokens
  // -----------------------------------------------------------------------

  it('applies temperature and maxTokens from route', async () => {
    const inner = makeClient();
    const router = new ModelRouterClient(inner, baseConfig);

    await router.runIntent(AiIntent.FORECAST, makeContext());

    const passedOptions = inner.runIntent.mock.calls[0]![2] as AiRequestOptions;
    expect(passedOptions.temperature).toBe(0.1);
    expect(passedOptions.maxTokens).toBe(4096);
  });

  it('applies defaultTemperature when route has no temperature', async () => {
    const inner = makeClient();
    const config: ModelRouterConfig = {
      routes: [{ intents: [AiIntent.CLASSIFY], model: 'gpt-4o' }],
      defaultModel: 'gpt-3.5-turbo',
      defaultTemperature: 0.7,
    };
    const router = new ModelRouterClient(inner, config);

    await router.runIntent(AiIntent.CLASSIFY, makeContext());

    const passedOptions = inner.runIntent.mock.calls[0]![2] as AiRequestOptions;
    expect(passedOptions.temperature).toBe(0.7);
  });

  // -----------------------------------------------------------------------
  // streamIntent
  // -----------------------------------------------------------------------

  it('streamIntent delegates with routing applied', async () => {
    const inner = makeStreamClient([{ explanation: 'chunk1' }, { explanation: 'chunk2' }]);
    const router = new ModelRouterClient(inner, baseConfig);

    const collected: Partial<AiResult>[] = [];
    for await (const chunk of router.streamIntent!(AiIntent.SUMMARIZE, makeContext())) {
      collected.push(chunk);
    }

    expect(collected).toEqual([{ explanation: 'chunk1' }, { explanation: 'chunk2' }]);
  });

  it('streamIntent throws when inner client does not support streaming', async () => {
    const inner = makeClient(); // No streamIntent method
    const router = new ModelRouterClient(inner, baseConfig);

    const gen = router.streamIntent!(AiIntent.EXPLAIN, makeContext());
    await expect(gen.next()).rejects.toThrow('Inner client does not support streaming');
  });
});
