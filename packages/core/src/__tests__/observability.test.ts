import { describe, it, expect, vi, beforeEach } from 'vitest';
import { InMemoryTracer } from '../observability/tracer.js';
import { ObservableClient } from '../observability/observable-client.js';
import { AiIntent } from '../intents/types.js';
import type { AiClient } from '../client/types.js';
import type { AiContext } from '../context/types.js';
import type { AiResult } from '../results/types.js';
import type { AiSpan } from '../observability/types.js';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeContext(): AiContext<{ v: number }> {
  return { dataset: [{ v: 1 }, { v: 2 }, { v: 3 }] };
}

function makeClient(result: AiResult, delay = 0): AiClient {
  return {
    runIntent: vi.fn().mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve(result), delay)),
    ),
  };
}

function makeFailingClient(error: Error, delay = 0): AiClient {
  return {
    runIntent: vi.fn().mockImplementation(
      () => new Promise((_, reject) => setTimeout(() => reject(error), delay)),
    ),
  };
}

// ---------------------------------------------------------------------------
// InMemoryTracer
// ---------------------------------------------------------------------------

describe('InMemoryTracer', () => {
  let tracer: InMemoryTracer;

  beforeEach(() => {
    tracer = new InMemoryTracer();
  });

  it('creates spans with sequential IDs and correct attributes', () => {
    const span1 = tracer.startSpan('op1', { foo: 'bar' });
    const span2 = tracer.startSpan('op2', { baz: 42 });

    expect(span1.id).toBe('span_1');
    expect(span1.name).toBe('op1');
    expect(span1.status).toBe('pending');
    expect(span1.attributes.foo).toBe('bar');
    expect(span1.startTime).toBeGreaterThan(0);

    expect(span2.id).toBe('span_2');
    expect(span2.name).toBe('op2');
    expect(span2.attributes.baz).toBe(42);
  });

  it('endSpan sets duration, status, and optional error', () => {
    const span = tracer.startSpan('test');

    // Simulate a small delay so duration > 0 is possible but not guaranteed.
    tracer.endSpan(span, 'success');

    expect(span.status).toBe('success');
    expect(span.endTime).toBeDefined();
    expect(span.duration).toBeDefined();
    expect(span.duration!).toBeGreaterThanOrEqual(0);
    expect(span.error).toBeUndefined();
  });

  it('endSpan records error message when status is error', () => {
    const span = tracer.startSpan('failing');
    tracer.endSpan(span, 'error', 'something broke');

    expect(span.status).toBe('error');
    expect(span.error).toBe('something broke');
  });

  it('getSpans returns all recorded spans', () => {
    tracer.startSpan('a');
    tracer.startSpan('b');
    tracer.startSpan('c');

    const spans = tracer.getSpans();
    expect(spans).toHaveLength(3);
    expect(spans.map((s) => s.name)).toEqual(['a', 'b', 'c']);
  });

  it('getSpans returns a copy, not the internal array', () => {
    tracer.startSpan('x');
    const spans1 = tracer.getSpans();
    const spans2 = tracer.getSpans();

    expect(spans1).not.toBe(spans2);
    expect(spans1).toEqual(spans2);
  });

  it('clear removes all spans and resets counter', () => {
    tracer.startSpan('a');
    tracer.startSpan('b');
    tracer.clear();

    expect(tracer.getSpans()).toHaveLength(0);

    // After clear, counter resets so next span is span_1 again.
    const span = tracer.startSpan('c');
    expect(span.id).toBe('span_1');
  });

  it('fires onSpanEnd callback when a span ends', () => {
    const callback = vi.fn();
    tracer.onSpanEnd = callback;

    const span = tracer.startSpan('tracked');
    tracer.endSpan(span, 'success');

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'span_1', status: 'success' }),
    );
  });

  it('does not throw when onSpanEnd is not set', () => {
    const span = tracer.startSpan('no-callback');
    expect(() => tracer.endSpan(span, 'error', 'oops')).not.toThrow();
  });
});

// ---------------------------------------------------------------------------
// ObservableClient
// ---------------------------------------------------------------------------

describe('ObservableClient', () => {
  it('creates a span with success status on successful call', async () => {
    const inner = makeClient({ explanation: 'ok', confidence: 0.85 }, 5);
    const client = new ObservableClient(inner);

    const result = await client.runIntent(AiIntent.EXPLAIN, makeContext());

    expect(result.explanation).toBe('ok');

    const spans = client.tracer.getSpans();
    expect(spans).toHaveLength(1);

    const span = spans[0]!;
    expect(span.name).toBe('runIntent:explain');
    expect(span.status).toBe('success');
    expect(span.intent).toBe(AiIntent.EXPLAIN);
    expect(span.duration).toBeDefined();
    expect(span.duration!).toBeGreaterThanOrEqual(0);
    expect(span.error).toBeUndefined();
  });

  it('creates a span with error status on failed call', async () => {
    const inner = makeFailingClient(new Error('LLM timeout'));
    const client = new ObservableClient(inner);

    await expect(
      client.runIntent(AiIntent.FORECAST, makeContext()),
    ).rejects.toThrow('LLM timeout');

    const spans = client.tracer.getSpans();
    expect(spans).toHaveLength(1);

    const span = spans[0]!;
    expect(span.status).toBe('error');
    expect(span.error).toBe('LLM timeout');
  });

  it('records span attributes: intent, model, datasetSize', async () => {
    const inner = makeClient({ explanation: 'classified' });
    const client = new ObservableClient(inner);

    await client.runIntent(AiIntent.CLASSIFY, makeContext(), {
      model: 'gpt-4o',
    });

    const span = client.tracer.getSpans()[0]!;
    expect(span.attributes.intent).toBe(AiIntent.CLASSIFY);
    expect(span.attributes.model).toBe('gpt-4o');
    expect(span.attributes.datasetSize).toBe(3);
  });

  it('records confidence in span attributes when present in result', async () => {
    const inner = makeClient({ explanation: 'done', confidence: 0.92 });
    const client = new ObservableClient(inner);

    await client.runIntent(AiIntent.SUMMARIZE, makeContext());

    const span = client.tracer.getSpans()[0]!;
    expect(span.attributes.confidence).toBe(0.92);
  });

  it('does not set confidence attribute when result has no confidence', async () => {
    const inner = makeClient({ explanation: 'no conf' });
    const client = new ObservableClient(inner);

    await client.runIntent(AiIntent.EXPLAIN, makeContext());

    const span = client.tracer.getSpans()[0]!;
    expect(span.attributes.confidence).toBeUndefined();
  });

  it('fires onComplete callback on success', async () => {
    const onComplete = vi.fn();
    const inner = makeClient({ explanation: 'ok' });
    const client = new ObservableClient(inner, { onComplete });

    await client.runIntent(AiIntent.EXPLAIN, makeContext());

    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(onComplete).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'success' }),
    );
  });

  it('fires onComplete callback on error', async () => {
    const onComplete = vi.fn();
    const inner = makeFailingClient(new Error('fail'));
    const client = new ObservableClient(inner, { onComplete });

    await expect(
      client.runIntent(AiIntent.EXPLAIN, makeContext()),
    ).rejects.toThrow('fail');

    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(onComplete).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'error', error: 'fail' }),
    );
  });

  it('uses a custom tracer when provided', async () => {
    const customTracer = new InMemoryTracer();
    const inner = makeClient({ explanation: 'custom' });
    const client = new ObservableClient(inner, { tracer: customTracer });

    await client.runIntent(AiIntent.EXPLAIN, makeContext());

    // The custom tracer should have the span.
    expect(customTracer.getSpans()).toHaveLength(1);
    // And client.tracer should be the same instance.
    expect(client.tracer).toBe(customTracer);
  });

  it('delegates streamIntent to inner client', async () => {
    const chunks: Partial<AiResult>[] = [
      { explanation: 'chunk 1' },
      { explanation: 'chunk 2' },
    ];
    const inner: AiClient = {
      runIntent: vi.fn().mockResolvedValue({ explanation: 'unused' }),
      async *streamIntent() {
        for (const chunk of chunks) {
          yield chunk;
        }
      },
    };

    const client = new ObservableClient(inner);
    const collected: Partial<AiResult>[] = [];

    for await (const chunk of client.streamIntent!(AiIntent.EXPLAIN, makeContext())) {
      collected.push(chunk);
    }

    expect(collected).toEqual(chunks);
  });

  it('throws when inner client does not support streaming', async () => {
    const inner: AiClient = {
      runIntent: vi.fn().mockResolvedValue({ explanation: 'ok' }),
    };

    const client = new ObservableClient(inner);
    const gen = client.streamIntent!(AiIntent.EXPLAIN, makeContext());

    await expect(gen.next()).rejects.toThrow(
      'Inner client does not support streaming',
    );
  });
});
