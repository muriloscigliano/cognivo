import { describe, it, expect, vi } from 'vitest';
import { ExtendedThinkingClient } from '../patterns/extended-thinking-client.js';
import { AiIntent } from '../intents/types.js';
import type { AiClient, AiRequestOptions } from '../client/types.js';
import type { AiContext } from '../context/types.js';
import type { AiResult } from '../results/types.js';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeContext(): AiContext<{ v: number }> {
  return {
    dataset: [{ v: 1 }, { v: 2 }, { v: 3 }],
    meta: { dataType: 'revenue', timeframe: 'monthly' },
  };
}

function makeMockClient(overrides?: {
  thinkingResult?: AiResult;
  executeResult?: AiResult;
}): AiClient {
  const thinkingResult: AiResult = overrides?.thinkingResult ?? {
    explanation: 'Step 1: Analyze trends. Step 2: Identify patterns.',
    bullets: ['Trend is upward', 'Seasonality detected'],
  };

  const executeResult: AiResult = overrides?.executeResult ?? {
    explanation: 'Revenue will increase by 15%',
    confidence: 0.85,
    forecast: [
      { timestamp: '2024-04', value: 115, confidence: 0.85 },
    ],
  };

  let callCount = 0;
  return {
    runIntent: vi.fn().mockImplementation(() => {
      callCount++;
      // First call is the thinking step, second is the execution step
      return Promise.resolve(callCount === 1 ? thinkingResult : executeResult);
    }),
  };
}

function makePassthroughClient(result: AiResult): AiClient {
  return {
    runIntent: vi.fn().mockResolvedValue(result),
  };
}

function makeStreamClient(chunks: Partial<AiResult>[]): AiClient {
  return {
    runIntent: vi.fn().mockResolvedValue({ explanation: 'unused' }),
    async *streamIntent() {
      for (const chunk of chunks) {
        yield chunk;
      }
    },
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('ExtendedThinkingClient', () => {
  // -----------------------------------------------------------------------
  // Two-phase thinking for enabled intents
  // -----------------------------------------------------------------------

  describe('enabled intents (two-phase thinking)', () => {
    it('calls the inner client twice for an enabled intent', async () => {
      const inner = makeMockClient();
      const client = new ExtendedThinkingClient(inner);

      await client.runIntent(AiIntent.FORECAST, makeContext());

      expect(inner.runIntent).toHaveBeenCalledTimes(2);
    });

    it('uses EXPLAIN intent with thinking system prompt for the first call', async () => {
      const inner = makeMockClient();
      const client = new ExtendedThinkingClient(inner);
      const ctx = makeContext();

      await client.runIntent(AiIntent.FORECAST, ctx);

      const firstCall = (inner.runIntent as ReturnType<typeof vi.fn>).mock.calls[0]!;
      expect(firstCall[0]).toBe(AiIntent.EXPLAIN);
      expect(firstCall[2]?.systemPrompt).toContain('Think step-by-step');
    });

    it('uses the original intent for the second call', async () => {
      const inner = makeMockClient();
      const client = new ExtendedThinkingClient(inner);

      await client.runIntent(AiIntent.DETECT_ANOMALY, makeContext());

      const secondCall = (inner.runIntent as ReturnType<typeof vi.fn>).mock.calls[1]!;
      expect(secondCall[0]).toBe(AiIntent.DETECT_ANOMALY);
    });

    it('injects chainOfThought into the context meta for the second call', async () => {
      const thinkingResult: AiResult = {
        explanation: 'My reasoning about anomalies',
        bullets: ['Point A', 'Point B'],
      };
      const inner = makeMockClient({ thinkingResult });
      const client = new ExtendedThinkingClient(inner);

      await client.runIntent(AiIntent.DETECT_ANOMALY, makeContext());

      const secondCall = (inner.runIntent as ReturnType<typeof vi.fn>).mock.calls[1]!;
      const enrichedContext = secondCall[1] as AiContext<unknown>;
      expect(enrichedContext.meta?.chainOfThought).toBe('My reasoning about anomalies');
    });

    it('preserves existing meta fields in the enriched context', async () => {
      const inner = makeMockClient();
      const client = new ExtendedThinkingClient(inner);
      const ctx = makeContext();

      await client.runIntent(AiIntent.FORECAST, ctx);

      const secondCall = (inner.runIntent as ReturnType<typeof vi.fn>).mock.calls[1]!;
      const enrichedContext = secondCall[1] as AiContext<{ v: number }>;
      expect(enrichedContext.meta?.dataType).toBe('revenue');
      expect(enrichedContext.meta?.timeframe).toBe('monthly');
      expect(enrichedContext.dataset).toEqual(ctx.dataset);
    });

    it('passes through original options (except systemPrompt) to the second call', async () => {
      const inner = makeMockClient();
      const client = new ExtendedThinkingClient(inner);
      const options: AiRequestOptions = {
        model: 'gpt-4',
        temperature: 0.3,
        maxTokens: 500,
      };

      await client.runIntent(AiIntent.OPTIMIZE, makeContext(), options);

      const secondCall = (inner.runIntent as ReturnType<typeof vi.fn>).mock.calls[1]!;
      expect(secondCall[2]).toEqual(options);
    });
  });

  // -----------------------------------------------------------------------
  // Default enabled intents
  // -----------------------------------------------------------------------

  describe('default enabled intents', () => {
    it('enables FORECAST by default', async () => {
      const inner = makeMockClient();
      const client = new ExtendedThinkingClient(inner);
      await client.runIntent(AiIntent.FORECAST, makeContext());
      expect(inner.runIntent).toHaveBeenCalledTimes(2);
    });

    it('enables DETECT_ANOMALY by default', async () => {
      const inner = makeMockClient();
      const client = new ExtendedThinkingClient(inner);
      await client.runIntent(AiIntent.DETECT_ANOMALY, makeContext());
      expect(inner.runIntent).toHaveBeenCalledTimes(2);
    });

    it('enables OPTIMIZE by default', async () => {
      const inner = makeMockClient();
      const client = new ExtendedThinkingClient(inner);
      await client.runIntent(AiIntent.OPTIMIZE, makeContext());
      expect(inner.runIntent).toHaveBeenCalledTimes(2);
    });
  });

  // -----------------------------------------------------------------------
  // Passthrough for non-enabled intents
  // -----------------------------------------------------------------------

  describe('non-enabled intents (passthrough)', () => {
    it('calls the inner client only once for a non-enabled intent', async () => {
      const result: AiResult = { explanation: 'A summary', bullets: ['Key point'] };
      const inner = makePassthroughClient(result);
      const client = new ExtendedThinkingClient(inner);

      const output = await client.runIntent(AiIntent.SUMMARIZE, makeContext());

      expect(inner.runIntent).toHaveBeenCalledTimes(1);
      expect(output.explanation).toBe('A summary');
    });

    it('passes through EXPLAIN intent directly', async () => {
      const result: AiResult = { explanation: 'Explanation here' };
      const inner = makePassthroughClient(result);
      const client = new ExtendedThinkingClient(inner);

      await client.runIntent(AiIntent.EXPLAIN, makeContext());

      expect(inner.runIntent).toHaveBeenCalledTimes(1);
      expect((inner.runIntent as ReturnType<typeof vi.fn>).mock.calls[0]![0]).toBe(AiIntent.EXPLAIN);
    });

    it('passes through CLASSIFY intent directly', async () => {
      const inner = makePassthroughClient({ classifications: [] });
      const client = new ExtendedThinkingClient(inner);

      await client.runIntent(AiIntent.CLASSIFY, makeContext());

      expect(inner.runIntent).toHaveBeenCalledTimes(1);
    });

    it('passes through COMPARE intent directly', async () => {
      const inner = makePassthroughClient({ explanation: 'comparison' });
      const client = new ExtendedThinkingClient(inner);

      await client.runIntent(AiIntent.COMPARE, makeContext());

      expect(inner.runIntent).toHaveBeenCalledTimes(1);
    });

    it('passes through CLUSTER intent directly', async () => {
      const inner = makePassthroughClient({ explanation: 'clusters' });
      const client = new ExtendedThinkingClient(inner);

      await client.runIntent(AiIntent.CLUSTER, makeContext());

      expect(inner.runIntent).toHaveBeenCalledTimes(1);
    });
  });

  // -----------------------------------------------------------------------
  // Custom enabled intents
  // -----------------------------------------------------------------------

  describe('custom enabled intents', () => {
    it('uses custom enabledIntents when provided', async () => {
      const inner = makeMockClient();
      const client = new ExtendedThinkingClient(inner, {
        enabledIntents: [AiIntent.SUMMARIZE],
      });

      await client.runIntent(AiIntent.SUMMARIZE, makeContext());

      expect(inner.runIntent).toHaveBeenCalledTimes(2);
    });

    it('does not trigger thinking for default intents when overridden', async () => {
      const inner = makePassthroughClient({ explanation: 'forecast' });
      const client = new ExtendedThinkingClient(inner, {
        enabledIntents: [AiIntent.SUMMARIZE],
      });

      await client.runIntent(AiIntent.FORECAST, makeContext());

      // FORECAST is a default but has been overridden, so only one call
      expect(inner.runIntent).toHaveBeenCalledTimes(1);
    });
  });

  // -----------------------------------------------------------------------
  // Thinking metadata in result
  // -----------------------------------------------------------------------

  describe('includeThinkingInResult', () => {
    it('attaches thinking and thinkingBullets to metadata by default', async () => {
      const thinkingResult: AiResult = {
        explanation: 'Chain of thought reasoning here',
        bullets: ['Bullet 1', 'Bullet 2'],
      };
      const executeResult: AiResult = {
        explanation: 'Final answer',
        confidence: 0.9,
      };
      const inner = makeMockClient({ thinkingResult, executeResult });
      const client = new ExtendedThinkingClient(inner);

      const result = await client.runIntent(AiIntent.FORECAST, makeContext());

      expect(result.metadata?.thinking).toBe('Chain of thought reasoning here');
      expect(result.metadata?.thinkingBullets).toEqual(['Bullet 1', 'Bullet 2']);
    });

    it('preserves existing metadata from the execute result', async () => {
      const executeResult: AiResult = {
        explanation: 'Final answer',
        metadata: { model: 'gpt-4', latency: 250 },
      };
      const inner = makeMockClient({ executeResult });
      const client = new ExtendedThinkingClient(inner);

      const result = await client.runIntent(AiIntent.FORECAST, makeContext());

      expect(result.metadata?.model).toBe('gpt-4');
      expect(result.metadata?.latency).toBe(250);
      expect(result.metadata?.thinking).toBeDefined();
    });

    it('does NOT attach thinking metadata when includeThinkingInResult is false', async () => {
      const thinkingResult: AiResult = {
        explanation: 'This should not appear',
        bullets: ['Hidden'],
      };
      const executeResult: AiResult = {
        explanation: 'Final answer',
        confidence: 0.9,
      };
      const inner = makeMockClient({ thinkingResult, executeResult });
      const client = new ExtendedThinkingClient(inner, {
        includeThinkingInResult: false,
      });

      const result = await client.runIntent(AiIntent.FORECAST, makeContext());

      expect(result.explanation).toBe('Final answer');
      expect(result.metadata?.thinking).toBeUndefined();
      expect(result.metadata?.thinkingBullets).toBeUndefined();
    });
  });

  // -----------------------------------------------------------------------
  // Custom thinking system prompt
  // -----------------------------------------------------------------------

  describe('custom thinkingSystemPrompt', () => {
    it('uses the custom system prompt for the thinking step', async () => {
      const customPrompt = 'Analyze this financial data carefully before responding.';
      const inner = makeMockClient();
      const client = new ExtendedThinkingClient(inner, {
        thinkingSystemPrompt: customPrompt,
      });

      await client.runIntent(AiIntent.FORECAST, makeContext());

      const firstCall = (inner.runIntent as ReturnType<typeof vi.fn>).mock.calls[0]!;
      expect(firstCall[2]?.systemPrompt).toBe(customPrompt);
    });

    it('does not apply custom thinking prompt to the execute step', async () => {
      const customPrompt = 'Custom thinking prompt.';
      const inner = makeMockClient();
      const client = new ExtendedThinkingClient(inner, {
        thinkingSystemPrompt: customPrompt,
      });

      await client.runIntent(AiIntent.FORECAST, makeContext());

      const secondCall = (inner.runIntent as ReturnType<typeof vi.fn>).mock.calls[1]!;
      // The execute step should get the original options, not the thinking prompt
      expect(secondCall[2]?.systemPrompt).toBeUndefined();
    });
  });

  // -----------------------------------------------------------------------
  // streamIntent delegation
  // -----------------------------------------------------------------------

  describe('streamIntent', () => {
    it('delegates streaming directly to the inner client', async () => {
      const chunks: Partial<AiResult>[] = [
        { explanation: 'part 1' },
        { explanation: 'part 2' },
      ];
      const inner = makeStreamClient(chunks);
      const client = new ExtendedThinkingClient(inner);

      const collected: Partial<AiResult>[] = [];
      for await (const chunk of client.streamIntent!(AiIntent.FORECAST, makeContext())) {
        collected.push(chunk);
      }

      expect(collected).toEqual(chunks);
    });

    it('passes intent, context, and options to the inner stream', async () => {
      const streamSpy = vi.fn();
      const inner: AiClient = {
        runIntent: vi.fn().mockResolvedValue({ explanation: 'unused' }),
        async *streamIntent(intent, context, options) {
          streamSpy(intent, context, options);
          yield { explanation: 'chunk' };
        },
      };
      const client = new ExtendedThinkingClient(inner);
      const ctx = makeContext();
      const opts: AiRequestOptions = { model: 'gpt-4' };

      const gen = client.streamIntent!(AiIntent.FORECAST, ctx, opts);
      // Consume the generator
      for await (const _chunk of gen) {
        // consume
      }

      expect(streamSpy).toHaveBeenCalledWith(AiIntent.FORECAST, ctx, opts);
    });

    it('throws if the inner client does not support streaming', async () => {
      const inner: AiClient = {
        runIntent: vi.fn().mockResolvedValue({ explanation: 'no stream' }),
      };
      const client = new ExtendedThinkingClient(inner);

      const gen = client.streamIntent!(AiIntent.FORECAST, makeContext());
      await expect(gen.next()).rejects.toThrow('Inner client does not support streaming');
    });
  });

  // -----------------------------------------------------------------------
  // Edge cases
  // -----------------------------------------------------------------------

  describe('edge cases', () => {
    it('works when context has no meta', async () => {
      const inner = makeMockClient();
      const client = new ExtendedThinkingClient(inner);
      const ctx: AiContext<{ v: number }> = { dataset: [{ v: 1 }] };

      const result = await client.runIntent(AiIntent.FORECAST, ctx);

      // Should still enrich the context with chainOfThought
      const secondCall = (inner.runIntent as ReturnType<typeof vi.fn>).mock.calls[1]!;
      const enrichedContext = secondCall[1] as AiContext<unknown>;
      expect(enrichedContext.meta?.chainOfThought).toBeDefined();
      expect(result).toBeDefined();
    });

    it('works when thinking result has no explanation', async () => {
      const thinkingResult: AiResult = {
        bullets: ['Just bullets'],
      };
      const executeResult: AiResult = {
        explanation: 'Done',
        confidence: 0.7,
      };
      const inner = makeMockClient({ thinkingResult, executeResult });
      const client = new ExtendedThinkingClient(inner);

      const result = await client.runIntent(AiIntent.FORECAST, makeContext());

      expect(result.metadata?.thinking).toBeUndefined();
      expect(result.metadata?.thinkingBullets).toEqual(['Just bullets']);
    });

    it('works with empty enabledIntents (all intents pass through)', async () => {
      const inner = makePassthroughClient({ explanation: 'direct' });
      const client = new ExtendedThinkingClient(inner, {
        enabledIntents: [],
      });

      await client.runIntent(AiIntent.FORECAST, makeContext());

      expect(inner.runIntent).toHaveBeenCalledTimes(1);
    });

    it('merges thinking prompt options with existing options', async () => {
      const inner = makeMockClient();
      const client = new ExtendedThinkingClient(inner);
      const options: AiRequestOptions = {
        model: 'gpt-4',
        temperature: 0.5,
        systemPrompt: 'Original user prompt',
      };

      await client.runIntent(AiIntent.FORECAST, makeContext(), options);

      const firstCall = (inner.runIntent as ReturnType<typeof vi.fn>).mock.calls[0]!;
      // Thinking step should override systemPrompt but keep other options
      expect(firstCall[2]?.model).toBe('gpt-4');
      expect(firstCall[2]?.temperature).toBe(0.5);
      expect(firstCall[2]?.systemPrompt).toContain('Think step-by-step');
    });
  });
});
