import { describe, it, expect, vi } from 'vitest';
import { SelfRefineClient } from '../patterns/self-refine-client';
import { AiIntent } from '../intents/types';
import type { AiClient } from '../client/types';
import type { AiResult } from '../results/types';
import type { AiContext } from '../context/types';
import type { RefinementTrace, SelfRefineConfig } from '../patterns/types';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function createMockClient(
  ...results: AiResult[]
): AiClient & { runIntent: ReturnType<typeof vi.fn> } {
  const fn = vi.fn();
  for (const result of results) {
    fn.mockResolvedValueOnce(result);
  }
  return { runIntent: fn };
}

const sampleContext: AiContext<{ value: number }> = {
  dataset: [{ value: 1 }, { value: 2 }],
  meta: { dataType: 'test' },
};

// ---------------------------------------------------------------------------
// Default config
// ---------------------------------------------------------------------------

describe('SelfRefineClient — defaults', () => {
  it('uses maxIterations=2 by default', async () => {
    // All results have low confidence so stopWhen never fires
    const inner = createMockClient(
      { explanation: 'gen', confidence: 0.3 },
      { explanation: 'critique-1', confidence: 0.3 },
      { explanation: 'refine-1', confidence: 0.4 },
      { explanation: 'critique-2', confidence: 0.4 },
      { explanation: 'refine-2', confidence: 0.5 }
    );
    const client = new SelfRefineClient(inner);

    const result = await client.runIntent(AiIntent.EXPLAIN, sampleContext);

    // 1 generate + 2 * (critique + refine) = 5 calls
    expect(inner.runIntent).toHaveBeenCalledTimes(5);
    expect(result.explanation).toBe('refine-2');
  });

  it('uses default stopWhen: confidence >= 0.9', async () => {
    const inner = createMockClient(
      { explanation: 'gen', confidence: 0.5 },
      { explanation: 'critique', confidence: 0.5 },
      { explanation: 'refined', confidence: 0.95 }
    );
    const client = new SelfRefineClient(inner);

    const result = await client.runIntent(AiIntent.EXPLAIN, sampleContext);

    // Should stop after first refine because confidence >= 0.9
    expect(inner.runIntent).toHaveBeenCalledTimes(3);
    expect(result.explanation).toBe('refined');
  });
});

// ---------------------------------------------------------------------------
// No refinement needed (initial result satisfies stopWhen)
// ---------------------------------------------------------------------------

describe('SelfRefineClient — skip refinement', () => {
  it('returns initial result when stopWhen is satisfied on generate', async () => {
    const inner = createMockClient(
      { explanation: 'already great', confidence: 0.95 }
    );
    const client = new SelfRefineClient(inner);

    const result = await client.runIntent(AiIntent.EXPLAIN, sampleContext);

    // Only 1 call (generate), no critique or refine
    expect(inner.runIntent).toHaveBeenCalledTimes(1);
    expect(result.explanation).toBe('already great');

    const trace = result.metadata?.['refinementTrace'] as RefinementTrace;
    expect(trace).toBeDefined();
    expect(trace.totalIterations).toBe(0);
    expect(trace.stoppedEarly).toBe(true);
    expect(trace.steps).toHaveLength(1);
    expect(trace.steps[0]!.phase).toBe('generate');
  });

  it('returns initial result when custom stopWhen is immediately true', async () => {
    const inner = createMockClient(
      { explanation: 'instant', confidence: 0.1 }
    );
    const config: SelfRefineConfig = {
      stopWhen: () => true, // always satisfied
    };
    const client = new SelfRefineClient(inner, config);

    const result = await client.runIntent(AiIntent.EXPLAIN, sampleContext);

    expect(inner.runIntent).toHaveBeenCalledTimes(1);
    expect(result.explanation).toBe('instant');
  });
});

// ---------------------------------------------------------------------------
// Single iteration
// ---------------------------------------------------------------------------

describe('SelfRefineClient — single iteration', () => {
  it('performs one critique→refine cycle and stops when stopWhen returns true', async () => {
    const inner = createMockClient(
      { explanation: 'initial', confidence: 0.5 },
      { explanation: 'needs work on X', bullets: ['fix X', 'add Y'], confidence: 0.5 },
      { explanation: 'improved', confidence: 0.92 }
    );
    const client = new SelfRefineClient(inner, { maxIterations: 3 });

    const result = await client.runIntent(AiIntent.EXPLAIN, sampleContext);

    expect(inner.runIntent).toHaveBeenCalledTimes(3);
    expect(result.explanation).toBe('improved');

    const trace = result.metadata?.['refinementTrace'] as RefinementTrace;
    expect(trace.totalIterations).toBe(1);
    expect(trace.stoppedEarly).toBe(true);
    expect(trace.steps).toHaveLength(3);
    expect(trace.steps[0]!.phase).toBe('generate');
    expect(trace.steps[1]!.phase).toBe('critique');
    expect(trace.steps[2]!.phase).toBe('refine');
  });
});

// ---------------------------------------------------------------------------
// Multiple iterations
// ---------------------------------------------------------------------------

describe('SelfRefineClient — multiple iterations', () => {
  it('performs two iterations when first refine does not satisfy stopWhen', async () => {
    const inner = createMockClient(
      { explanation: 'gen', confidence: 0.3 },
      { explanation: 'critique-1', confidence: 0.3 },
      { explanation: 'refine-1', confidence: 0.6 },
      { explanation: 'critique-2', confidence: 0.6 },
      { explanation: 'refine-2', confidence: 0.95 }
    );
    const client = new SelfRefineClient(inner, { maxIterations: 3 });

    const result = await client.runIntent(AiIntent.EXPLAIN, sampleContext);

    expect(inner.runIntent).toHaveBeenCalledTimes(5);
    expect(result.explanation).toBe('refine-2');

    const trace = result.metadata?.['refinementTrace'] as RefinementTrace;
    expect(trace.totalIterations).toBe(2);
    expect(trace.stoppedEarly).toBe(true); // maxIterations was 3
    expect(trace.steps).toHaveLength(5);
  });
});

// ---------------------------------------------------------------------------
// Max iterations reached
// ---------------------------------------------------------------------------

describe('SelfRefineClient — max iterations', () => {
  it('stops at maxIterations even when stopWhen never returns true', async () => {
    const inner = createMockClient(
      { explanation: 'gen', confidence: 0.2 },
      { explanation: 'c1', confidence: 0.2 },
      { explanation: 'r1', confidence: 0.3 }
    );
    const config: SelfRefineConfig = {
      maxIterations: 1,
      stopWhen: () => false, // never satisfied
    };
    const client = new SelfRefineClient(inner, config);

    const result = await client.runIntent(AiIntent.EXPLAIN, sampleContext);

    expect(inner.runIntent).toHaveBeenCalledTimes(3);
    expect(result.explanation).toBe('r1');

    const trace = result.metadata?.['refinementTrace'] as RefinementTrace;
    expect(trace.totalIterations).toBe(1);
    expect(trace.stoppedEarly).toBe(false);
  });

  it('sets stoppedEarly=false when exactly maxIterations are used', async () => {
    const inner = createMockClient(
      { explanation: 'gen', confidence: 0.2 },
      { explanation: 'c1', confidence: 0.2 },
      { explanation: 'r1', confidence: 0.4 },
      { explanation: 'c2', confidence: 0.4 },
      { explanation: 'r2', confidence: 0.6 }
    );
    const config: SelfRefineConfig = {
      maxIterations: 2,
      stopWhen: () => false,
    };
    const client = new SelfRefineClient(inner, config);

    const result = await client.runIntent(AiIntent.EXPLAIN, sampleContext);

    const trace = result.metadata?.['refinementTrace'] as RefinementTrace;
    expect(trace.totalIterations).toBe(2);
    expect(trace.stoppedEarly).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Critique injects previousResult in meta
// ---------------------------------------------------------------------------

describe('SelfRefineClient — critique step context', () => {
  it('passes previousResult as stringified JSON in meta for critique', async () => {
    const inner = createMockClient(
      { explanation: 'initial analysis', confidence: 0.5 },
      { explanation: 'critique feedback', confidence: 0.5 },
      { explanation: 'refined', confidence: 0.95 }
    );
    const client = new SelfRefineClient(inner);

    await client.runIntent(AiIntent.EXPLAIN, sampleContext);

    // Second call is the critique — check its context
    const critiqueCall = inner.runIntent.mock.calls[1]!;
    const critiqueContext = critiqueCall[1] as AiContext<unknown>;

    expect(critiqueContext.meta?.['previousResult']).toBe(
      JSON.stringify({ explanation: 'initial analysis', confidence: 0.5 })
    );
  });

  it('uses critiqueSystemPrompt in options for critique call', async () => {
    const inner = createMockClient(
      { explanation: 'gen', confidence: 0.5 },
      { explanation: 'critique', confidence: 0.5 },
      { explanation: 'refined', confidence: 0.95 }
    );
    const customPrompt = 'Be extra harsh in your critique.';
    const client = new SelfRefineClient(inner, {
      critiqueSystemPrompt: customPrompt,
    });

    await client.runIntent(AiIntent.EXPLAIN, sampleContext);

    const critiqueCall = inner.runIntent.mock.calls[1]!;
    const critiqueOptions = critiqueCall[2] as { systemPrompt?: string };
    expect(critiqueOptions.systemPrompt).toBe(customPrompt);
  });

  it('uses default critique prompt when none specified', async () => {
    const inner = createMockClient(
      { explanation: 'gen', confidence: 0.5 },
      { explanation: 'critique', confidence: 0.5 },
      { explanation: 'refined', confidence: 0.95 }
    );
    const client = new SelfRefineClient(inner);

    await client.runIntent(AiIntent.EXPLAIN, sampleContext);

    const critiqueCall = inner.runIntent.mock.calls[1]!;
    const critiqueOptions = critiqueCall[2] as { systemPrompt?: string };
    expect(critiqueOptions.systemPrompt).toContain('critic reviewing');
  });
});

// ---------------------------------------------------------------------------
// Refine injects critique in meta
// ---------------------------------------------------------------------------

describe('SelfRefineClient — refine step context', () => {
  it('passes both previousResult and critique in meta for refine', async () => {
    const inner = createMockClient(
      { explanation: 'initial', confidence: 0.5 },
      { explanation: 'You should improve X and Y', confidence: 0.5 },
      { explanation: 'improved', confidence: 0.95 }
    );
    const client = new SelfRefineClient(inner);

    await client.runIntent(AiIntent.EXPLAIN, sampleContext);

    // Third call is the refine — check its context
    const refineCall = inner.runIntent.mock.calls[2]!;
    const refineContext = refineCall[1] as AiContext<unknown>;

    expect(refineContext.meta?.['previousResult']).toBe(
      JSON.stringify({ explanation: 'initial', confidence: 0.5 })
    );
    expect(refineContext.meta?.['critique']).toBe(
      'You should improve X and Y'
    );
  });

  it('uses refineSystemPrompt in options for refine call', async () => {
    const inner = createMockClient(
      { explanation: 'gen', confidence: 0.5 },
      { explanation: 'critique', confidence: 0.5 },
      { explanation: 'refined', confidence: 0.95 }
    );
    const customPrompt = 'Refine with special instructions.';
    const client = new SelfRefineClient(inner, {
      refineSystemPrompt: customPrompt,
    });

    await client.runIntent(AiIntent.EXPLAIN, sampleContext);

    const refineCall = inner.runIntent.mock.calls[2]!;
    const refineOptions = refineCall[2] as { systemPrompt?: string };
    expect(refineOptions.systemPrompt).toBe(customPrompt);
  });

  it('uses default refine prompt when none specified', async () => {
    const inner = createMockClient(
      { explanation: 'gen', confidence: 0.5 },
      { explanation: 'critique', confidence: 0.5 },
      { explanation: 'refined', confidence: 0.95 }
    );
    const client = new SelfRefineClient(inner);

    await client.runIntent(AiIntent.EXPLAIN, sampleContext);

    const refineCall = inner.runIntent.mock.calls[2]!;
    const refineOptions = refineCall[2] as { systemPrompt?: string };
    expect(refineOptions.systemPrompt).toContain('refining an AI analysis');
  });
});

// ---------------------------------------------------------------------------
// RefinementTrace attached to metadata
// ---------------------------------------------------------------------------

describe('SelfRefineClient — refinement trace', () => {
  it('attaches refinementTrace to final result metadata', async () => {
    const inner = createMockClient(
      { explanation: 'gen', confidence: 0.5 },
      { explanation: 'critique', confidence: 0.5 },
      { explanation: 'refined', confidence: 0.95 }
    );
    const client = new SelfRefineClient(inner);

    const result = await client.runIntent(AiIntent.EXPLAIN, sampleContext);

    const trace = result.metadata?.['refinementTrace'] as RefinementTrace;
    expect(trace).toBeDefined();
    expect(trace.steps).toHaveLength(3);
    expect(trace.steps[0]!.phase).toBe('generate');
    expect(trace.steps[0]!.iteration).toBe(0);
    expect(trace.steps[1]!.phase).toBe('critique');
    expect(trace.steps[1]!.iteration).toBe(1);
    expect(trace.steps[2]!.phase).toBe('refine');
    expect(trace.steps[2]!.iteration).toBe(1);
  });

  it('preserves existing metadata on the result', async () => {
    const inner = createMockClient(
      { explanation: 'gen', confidence: 0.95, metadata: { custom: 'value' } }
    );
    const client = new SelfRefineClient(inner);

    const result = await client.runIntent(AiIntent.EXPLAIN, sampleContext);

    expect(result.metadata?.['custom']).toBe('value');
    expect(result.metadata?.['refinementTrace']).toBeDefined();
  });

  it('records correct step results in the trace', async () => {
    const genResult: AiResult = { explanation: 'gen', confidence: 0.4, bullets: ['a'] };
    const critiqueResult: AiResult = { explanation: 'needs improvement', confidence: 0.4 };
    const refineResult: AiResult = { explanation: 'better', confidence: 0.92, bullets: ['a', 'b'] };

    const inner = createMockClient(genResult, critiqueResult, refineResult);
    const client = new SelfRefineClient(inner);

    const result = await client.runIntent(AiIntent.EXPLAIN, sampleContext);

    const trace = result.metadata?.['refinementTrace'] as RefinementTrace;
    expect(trace.steps[0]!.result.explanation).toBe('gen');
    expect(trace.steps[0]!.result.bullets).toEqual(['a']);
    expect(trace.steps[1]!.result.explanation).toBe('needs improvement');
    expect(trace.steps[2]!.result.explanation).toBe('better');
    expect(trace.steps[2]!.result.bullets).toEqual(['a', 'b']);
  });
});

// ---------------------------------------------------------------------------
// streamIntent delegates to inner
// ---------------------------------------------------------------------------

describe('SelfRefineClient — streamIntent', () => {
  it('delegates streamIntent to inner client', () => {
    async function* mockStream(): AsyncGenerator<Partial<AiResult>> {
      yield { explanation: 'partial' };
    }

    const inner: AiClient = {
      runIntent: vi.fn().mockResolvedValue({ explanation: 'ok' }),
      streamIntent: vi.fn().mockReturnValue(mockStream()),
    };

    const client = new SelfRefineClient(inner);
    const stream = client.streamIntent!(AiIntent.EXPLAIN, sampleContext);

    expect(stream).toBeDefined();
    expect(inner.streamIntent).toHaveBeenCalledWith(
      AiIntent.EXPLAIN,
      sampleContext,
      undefined
    );
  });

  it('throws when inner client does not support streaming', () => {
    const inner: AiClient = {
      runIntent: vi.fn().mockResolvedValue({ explanation: 'ok' }),
    };

    const client = new SelfRefineClient(inner);

    expect(() => client.streamIntent!(AiIntent.EXPLAIN, sampleContext)).toThrow(
      'Inner client does not support streaming'
    );
  });

  it('passes options through to inner streamIntent', () => {
    async function* mockStream(): AsyncGenerator<Partial<AiResult>> {
      yield { explanation: 'chunk' };
    }

    const inner: AiClient = {
      runIntent: vi.fn().mockResolvedValue({ explanation: 'ok' }),
      streamIntent: vi.fn().mockReturnValue(mockStream()),
    };

    const client = new SelfRefineClient(inner);
    const opts = { model: 'gpt-4', temperature: 0.5 };
    client.streamIntent!(AiIntent.SUMMARIZE, sampleContext, opts);

    expect(inner.streamIntent).toHaveBeenCalledWith(
      AiIntent.SUMMARIZE,
      sampleContext,
      opts
    );
  });
});

// ---------------------------------------------------------------------------
// Options forwarding
// ---------------------------------------------------------------------------

describe('SelfRefineClient — options forwarding', () => {
  it('forwards original options to the generate call', async () => {
    const inner = createMockClient(
      { explanation: 'gen', confidence: 0.95 }
    );
    const client = new SelfRefineClient(inner);
    const opts = { model: 'gpt-4', temperature: 0.3 };

    await client.runIntent(AiIntent.EXPLAIN, sampleContext, opts);

    const generateCall = inner.runIntent.mock.calls[0]!;
    expect(generateCall[2]).toEqual(opts);
  });

  it('preserves non-systemPrompt options in critique and refine calls', async () => {
    const inner = createMockClient(
      { explanation: 'gen', confidence: 0.5 },
      { explanation: 'critique', confidence: 0.5 },
      { explanation: 'refined', confidence: 0.95 }
    );
    const client = new SelfRefineClient(inner);
    const opts = { model: 'gpt-4', temperature: 0.3 };

    await client.runIntent(AiIntent.EXPLAIN, sampleContext, opts);

    // Critique call should have model + temperature + systemPrompt
    const critiqueOpts = inner.runIntent.mock.calls[1]![2] as Record<string, unknown>;
    expect(critiqueOpts['model']).toBe('gpt-4');
    expect(critiqueOpts['temperature']).toBe(0.3);
    expect(critiqueOpts['systemPrompt']).toBeDefined();

    // Refine call should also have model + temperature + systemPrompt
    const refineOpts = inner.runIntent.mock.calls[2]![2] as Record<string, unknown>;
    expect(refineOpts['model']).toBe('gpt-4');
    expect(refineOpts['temperature']).toBe(0.3);
    expect(refineOpts['systemPrompt']).toBeDefined();
  });
});

// ---------------------------------------------------------------------------
// Context preservation
// ---------------------------------------------------------------------------

describe('SelfRefineClient — context preservation', () => {
  it('preserves original dataset and selection in critique and refine contexts', async () => {
    const contextWithSelection: AiContext<{ value: number }> = {
      dataset: [{ value: 10 }, { value: 20 }],
      selection: [{ value: 10 }],
      meta: { category: 'test', unit: 'USD' },
    };

    const inner = createMockClient(
      { explanation: 'gen', confidence: 0.5 },
      { explanation: 'critique', confidence: 0.5 },
      { explanation: 'refined', confidence: 0.95 }
    );
    const client = new SelfRefineClient(inner);

    await client.runIntent(AiIntent.EXPLAIN, contextWithSelection);

    // All three calls should preserve dataset and selection
    for (let i = 0; i < 3; i++) {
      const ctx = inner.runIntent.mock.calls[i]![1] as AiContext<{ value: number }>;
      expect(ctx.dataset).toEqual([{ value: 10 }, { value: 20 }]);
      expect(ctx.selection).toEqual([{ value: 10 }]);
    }

    // Critique and refine should also have original meta fields
    const critiqueMeta = (inner.runIntent.mock.calls[1]![1] as AiContext<unknown>).meta;
    expect(critiqueMeta?.['category']).toBe('test');
    expect(critiqueMeta?.['unit']).toBe('USD');

    const refineMeta = (inner.runIntent.mock.calls[2]![1] as AiContext<unknown>).meta;
    expect(refineMeta?.['category']).toBe('test');
    expect(refineMeta?.['unit']).toBe('USD');
  });
});

// ---------------------------------------------------------------------------
// stopWhen receives iteration number
// ---------------------------------------------------------------------------

describe('SelfRefineClient — stopWhen iteration parameter', () => {
  it('passes the correct iteration number to stopWhen', async () => {
    const stopWhen = vi.fn().mockReturnValue(false);

    const inner = createMockClient(
      { explanation: 'gen', confidence: 0.3 },
      { explanation: 'c1', confidence: 0.3 },
      { explanation: 'r1', confidence: 0.5 }
    );
    const client = new SelfRefineClient(inner, {
      maxIterations: 1,
      stopWhen,
    });

    await client.runIntent(AiIntent.EXPLAIN, sampleContext);

    // stopWhen called twice: once after generate (iteration 0), once after refine (iteration 1)
    expect(stopWhen).toHaveBeenCalledTimes(2);
    expect(stopWhen).toHaveBeenNthCalledWith(
      1,
      { explanation: 'gen', confidence: 0.3 },
      0
    );
    expect(stopWhen).toHaveBeenNthCalledWith(
      2,
      { explanation: 'r1', confidence: 0.5 },
      1
    );
  });
});

// ---------------------------------------------------------------------------
// Intent forwarding
// ---------------------------------------------------------------------------

describe('SelfRefineClient — intent forwarding', () => {
  it('forwards the same intent to all inner client calls', async () => {
    const inner = createMockClient(
      { explanation: 'gen', confidence: 0.5 },
      { explanation: 'critique', confidence: 0.5 },
      { explanation: 'refined', confidence: 0.95 }
    );
    const client = new SelfRefineClient(inner);

    await client.runIntent(AiIntent.FORECAST, sampleContext);

    for (let i = 0; i < 3; i++) {
      expect(inner.runIntent.mock.calls[i]![0]).toBe(AiIntent.FORECAST);
    }
  });
});
