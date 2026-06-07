import { describe, it, expect, vi } from 'vitest';
import { FallbackClient } from '../resilience/fallback-client.js';
import { AiIntent } from '../intents/types.js';
import type { AiClient } from '../client/types.js';
import type { AiContext } from '../context/types.js';
import type { AiResult } from '../results/types.js';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeContext(): AiContext<{ v: number }> {
  return { dataset: [{ v: 1 }, { v: 2 }] };
}

function makeClient(result: AiResult): AiClient {
  return {
    runIntent: vi.fn().mockResolvedValue(result),
  };
}

function makeFailingClient(error: Error): AiClient {
  return {
    runIntent: vi.fn().mockRejectedValue(error),
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

function makeFailingStreamClient(error: Error): AiClient {
  return {
    runIntent: vi.fn().mockResolvedValue({ explanation: 'unused' }),
    async *streamIntent() {
      throw error;
    },
  };
}

/** Yields the given chunks, then throws — simulates a mid-stream failure. */
function makePartialThenFailStreamClient(
  chunks: Partial<AiResult>[],
  error: Error,
): AiClient {
  return {
    runIntent: vi.fn().mockResolvedValue({ explanation: 'unused' }),
    async *streamIntent() {
      for (const chunk of chunks) {
        yield chunk;
      }
      throw error;
    },
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('FallbackClient', () => {
  // -----------------------------------------------------------------------
  // Construction
  // -----------------------------------------------------------------------

  it('throws if no clients are provided', () => {
    expect(() => new FallbackClient({ clients: [] })).toThrow(
      'FallbackClient requires at least one client',
    );
  });

  // -----------------------------------------------------------------------
  // runIntent
  // -----------------------------------------------------------------------

  it('returns the primary client result when it succeeds', async () => {
    const primary = makeClient({ explanation: 'primary', confidence: 0.95 });
    const secondary = makeClient({ explanation: 'secondary', confidence: 0.7 });

    const client = new FallbackClient({ clients: [primary, secondary] });
    const result = await client.runIntent(AiIntent.EXPLAIN, makeContext());

    expect(result.explanation).toBe('primary');
    expect(result.confidence).toBe(0.95);
    expect(primary.runIntent).toHaveBeenCalledTimes(1);
    expect(secondary.runIntent).not.toHaveBeenCalled();
  });

  it('falls back to secondary when primary fails', async () => {
    const primary = makeFailingClient(new Error('primary down'));
    const secondary = makeClient({ explanation: 'secondary', confidence: 0.8 });

    const client = new FallbackClient({ clients: [primary, secondary] });
    const result = await client.runIntent(AiIntent.SUMMARIZE, makeContext());

    expect(result.explanation).toBe('secondary');
    expect(result.confidence).toBe(0.8);
    expect(primary.runIntent).toHaveBeenCalledTimes(1);
    expect(secondary.runIntent).toHaveBeenCalledTimes(1);
  });

  it('throws the last error when all clients fail', async () => {
    const first = makeFailingClient(new Error('first failed'));
    const second = makeFailingClient(new Error('second failed'));

    const client = new FallbackClient({ clients: [first, second] });

    await expect(
      client.runIntent(AiIntent.DETECT_ANOMALY, makeContext()),
    ).rejects.toThrow('second failed');
  });

  it('does not fallback when shouldFallback returns false', async () => {
    const primary = makeFailingClient(new Error('non-retryable'));
    const secondary = makeClient({ explanation: 'secondary' });

    const client = new FallbackClient({
      clients: [primary, secondary],
      shouldFallback: () => false,
    });

    await expect(
      client.runIntent(AiIntent.EXPLAIN, makeContext()),
    ).rejects.toThrow('non-retryable');

    expect(secondary.runIntent).not.toHaveBeenCalled();
  });

  it('calls onFallback with the correct error and client index', async () => {
    const primary = makeFailingClient(new Error('boom'));
    const secondary = makeClient({ explanation: 'ok' });
    const onFallback = vi.fn();

    const client = new FallbackClient({
      clients: [primary, secondary],
      onFallback,
    });

    await client.runIntent(AiIntent.CLASSIFY, makeContext());

    expect(onFallback).toHaveBeenCalledTimes(1);
    expect(onFallback).toHaveBeenCalledWith(expect.any(Error), 0);
    expect(onFallback.mock.calls[0]![0]!.message).toBe('boom');
  });

  it('cascades through three clients: first fails, second fails, third succeeds', async () => {
    const first = makeFailingClient(new Error('first'));
    const second = makeFailingClient(new Error('second'));
    const third = makeClient({ explanation: 'third', confidence: 0.6 });
    const onFallback = vi.fn();

    const client = new FallbackClient({
      clients: [first, second, third],
      onFallback,
    });

    const result = await client.runIntent(AiIntent.FORECAST, makeContext());

    expect(result.explanation).toBe('third');
    expect(onFallback).toHaveBeenCalledTimes(2);
    expect(onFallback).toHaveBeenNthCalledWith(1, expect.objectContaining({ message: 'first' }), 0);
    expect(onFallback).toHaveBeenNthCalledWith(2, expect.objectContaining({ message: 'second' }), 1);
  });

  // -----------------------------------------------------------------------
  // streamIntent
  // -----------------------------------------------------------------------

  it('streams from the primary client when it succeeds', async () => {
    const chunks: Partial<AiResult>[] = [
      { explanation: 'part 1' },
      { explanation: 'part 2' },
    ];
    const primary = makeStreamClient(chunks);
    const secondary = makeStreamClient([{ explanation: 'fallback' }]);

    const client = new FallbackClient({ clients: [primary, secondary] });
    const collected: Partial<AiResult>[] = [];

    for await (const chunk of client.streamIntent!(AiIntent.EXPLAIN, makeContext())) {
      collected.push(chunk);
    }

    expect(collected).toEqual(chunks);
  });

  it('falls back to the next streaming client when primary stream fails', async () => {
    const primary = makeFailingStreamClient(new Error('stream error'));
    const secondary = makeStreamClient([{ explanation: 'recovered' }]);
    const onFallback = vi.fn();

    const client = new FallbackClient({
      clients: [primary, secondary],
      onFallback,
    });

    const collected: Partial<AiResult>[] = [];
    for await (const chunk of client.streamIntent!(AiIntent.SUMMARIZE, makeContext())) {
      collected.push(chunk);
    }

    expect(collected).toEqual([{ explanation: 'recovered' }]);
    expect(onFallback).toHaveBeenCalledTimes(1);
  });

  it('does NOT replay another client after a mid-stream failure', async () => {
    // Primary emits two chunks, then fails. Because those chunks are already
    // downstream, the secondary's stream must NOT be spliced in after them —
    // that would corrupt the output with a duplicated/garbled sequence.
    const primary = makePartialThenFailStreamClient(
      [{ explanation: 'p1' }, { explanation: 'p2' }],
      new Error('mid-stream boom'),
    );
    const secondary = makeStreamClient([{ explanation: 's1' }, { explanation: 's2' }]);
    const onFallback = vi.fn();

    const client = new FallbackClient({ clients: [primary, secondary], onFallback });

    const collected: Partial<AiResult>[] = [];
    await expect(
      (async () => {
        for await (const chunk of client.streamIntent!(AiIntent.SUMMARIZE, makeContext())) {
          collected.push(chunk);
        }
      })(),
    ).rejects.toThrow('mid-stream boom');

    // Only the primary's partial output — no secondary chunks appended.
    expect(collected).toEqual([{ explanation: 'p1' }, { explanation: 'p2' }]);
    expect(onFallback).not.toHaveBeenCalled();
  });

  it('skips clients without streamIntent and falls back', async () => {
    // Client without streamIntent
    const noStream: AiClient = {
      runIntent: vi.fn().mockResolvedValue({ explanation: 'no-stream' }),
    };
    const withStream = makeStreamClient([{ explanation: 'streamed' }]);
    const onFallback = vi.fn();

    const client = new FallbackClient({
      clients: [noStream, withStream],
      onFallback,
    });

    const collected: Partial<AiResult>[] = [];
    for await (const chunk of client.streamIntent!(AiIntent.CLUSTER, makeContext())) {
      collected.push(chunk);
    }

    expect(collected).toEqual([{ explanation: 'streamed' }]);
    expect(onFallback).toHaveBeenCalledTimes(1);
  });

  it('throws when no client supports streaming', async () => {
    const noStream: AiClient = {
      runIntent: vi.fn().mockResolvedValue({ explanation: 'nope' }),
    };

    const client = new FallbackClient({ clients: [noStream] });

    const gen = client.streamIntent!(AiIntent.EXPLAIN, makeContext());
    await expect(gen.next()).rejects.toThrow('No client supports streaming');
  });
});
