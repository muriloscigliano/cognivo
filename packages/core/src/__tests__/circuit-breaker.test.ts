import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { CircuitBreaker } from '../resilience/circuit-breaker.js';
import { CircuitBreakerClient, CircuitOpenError } from '../resilience/circuit-breaker-client.js';
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

function makeClient(result: AiResult = { explanation: 'ok' }): AiClient & { runIntent: ReturnType<typeof vi.fn> } {
  return {
    runIntent: vi.fn().mockResolvedValue(result),
  };
}

function makeFailingClient(error: Error = new Error('boom')): AiClient & { runIntent: ReturnType<typeof vi.fn> } {
  return {
    runIntent: vi.fn().mockRejectedValue(error),
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

function makeFailingStreamClient(error: Error): AiClient & { runIntent: ReturnType<typeof vi.fn> } {
  return {
    runIntent: vi.fn().mockResolvedValue({ explanation: 'unused' }),
    async *streamIntent() {
      throw error;
    },
  };
}

// ---------------------------------------------------------------------------
// CircuitBreaker (standalone state machine)
// ---------------------------------------------------------------------------

describe('CircuitBreaker', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts in closed state', () => {
    const breaker = new CircuitBreaker();
    expect(breaker.currentState).toBe('closed');
  });

  it('stays closed when failures are below threshold', () => {
    const breaker = new CircuitBreaker({ failureThreshold: 5 });

    breaker.recordFailure();
    breaker.recordFailure();
    breaker.recordFailure();
    breaker.recordFailure();

    expect(breaker.currentState).toBe('closed');
    expect(breaker.canExecute()).toBe(true);
  });

  it('opens after reaching the failure threshold', () => {
    const breaker = new CircuitBreaker({ failureThreshold: 3 });

    breaker.recordFailure();
    breaker.recordFailure();
    breaker.recordFailure();

    expect(breaker.currentState).toBe('open');
  });

  it('rejects execution when open (canExecute returns false)', () => {
    const breaker = new CircuitBreaker({ failureThreshold: 2, resetTimeout: 30_000 });

    breaker.recordFailure();
    breaker.recordFailure();

    expect(breaker.currentState).toBe('open');
    expect(breaker.canExecute()).toBe(false);
  });

  it('transitions to half-open after resetTimeout elapses', () => {
    const breaker = new CircuitBreaker({ failureThreshold: 2, resetTimeout: 10_000 });

    breaker.recordFailure();
    breaker.recordFailure();
    expect(breaker.currentState).toBe('open');

    vi.advanceTimersByTime(10_000);

    expect(breaker.canExecute()).toBe(true);
    expect(breaker.currentState).toBe('half-open');
  });

  it('returns to closed on success in half-open state', () => {
    const breaker = new CircuitBreaker({ failureThreshold: 2, resetTimeout: 5_000 });

    breaker.recordFailure();
    breaker.recordFailure();

    vi.advanceTimersByTime(5_000);
    breaker.canExecute(); // transitions to half-open

    breaker.recordSuccess();
    expect(breaker.currentState).toBe('closed');
  });

  it('returns to open on failure in half-open state', () => {
    const breaker = new CircuitBreaker({ failureThreshold: 2, resetTimeout: 5_000 });

    breaker.recordFailure();
    breaker.recordFailure();

    vi.advanceTimersByTime(5_000);
    breaker.canExecute(); // transitions to half-open

    breaker.recordFailure();
    expect(breaker.currentState).toBe('open');
  });

  it('fires onStateChange on every transition', () => {
    const onChange = vi.fn();
    const breaker = new CircuitBreaker({
      failureThreshold: 2,
      resetTimeout: 5_000,
      onStateChange: onChange,
    });

    breaker.recordFailure();
    breaker.recordFailure();
    // closed -> open
    expect(onChange).toHaveBeenCalledWith('closed', 'open');

    vi.advanceTimersByTime(5_000);
    breaker.canExecute();
    // open -> half-open
    expect(onChange).toHaveBeenCalledWith('open', 'half-open');

    breaker.recordSuccess();
    // half-open -> closed
    expect(onChange).toHaveBeenCalledWith('half-open', 'closed');

    expect(onChange).toHaveBeenCalledTimes(3);
  });

  it('reset() forces back to closed', () => {
    const onChange = vi.fn();
    const breaker = new CircuitBreaker({
      failureThreshold: 2,
      onStateChange: onChange,
    });

    breaker.recordFailure();
    breaker.recordFailure();
    expect(breaker.currentState).toBe('open');

    breaker.reset();
    expect(breaker.currentState).toBe('closed');
    expect(breaker.canExecute()).toBe(true);
    // closed->open, open->closed
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it('half-open allows only halfOpenMaxAttempts trial calls (default 1)', () => {
    const breaker = new CircuitBreaker({
      failureThreshold: 2,
      resetTimeout: 5_000,
      halfOpenMaxAttempts: 1,
    });

    breaker.recordFailure();
    breaker.recordFailure();

    vi.advanceTimersByTime(5_000);

    // First call in half-open — allowed, consumes the single trial slot.
    expect(breaker.canExecute()).toBe(true);
    expect(breaker.currentState).toBe('half-open');

    // A second concurrent trial (before the first resolves) must be rejected,
    // otherwise a burst of callers all stampede a recovering backend.
    expect(breaker.canExecute()).toBe(false);
    expect(breaker.canExecute()).toBe(false);

    // Recording the trial's outcome leaves half-open and frees the slot.
    breaker.recordSuccess();
    expect(breaker.currentState).toBe('closed');
  });

  it('half-open honors a halfOpenMaxAttempts greater than 1', () => {
    const breaker = new CircuitBreaker({
      failureThreshold: 2,
      resetTimeout: 5_000,
      halfOpenMaxAttempts: 2,
    });

    breaker.recordFailure();
    breaker.recordFailure();
    vi.advanceTimersByTime(5_000);

    // Two trial calls allowed, third rejected.
    expect(breaker.canExecute()).toBe(true); // transitions to half-open + slot 1
    expect(breaker.canExecute()).toBe(true); // slot 2
    expect(breaker.canExecute()).toBe(false); // exhausted
    expect(breaker.currentState).toBe('half-open');
  });
});

// ---------------------------------------------------------------------------
// CircuitBreakerClient
// ---------------------------------------------------------------------------

describe('CircuitBreakerClient', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('passes through successful calls', async () => {
    const inner = makeClient({ explanation: 'success', confidence: 0.9 });
    const client = new CircuitBreakerClient(inner, { failureThreshold: 3 });

    const result = await client.runIntent(AiIntent.EXPLAIN, makeContext());

    expect(result.explanation).toBe('success');
    expect(inner.runIntent).toHaveBeenCalledTimes(1);
    expect(client.state).toBe('closed');
  });

  it('passes through errors and records failure', async () => {
    const inner = makeFailingClient(new Error('backend down'));
    const client = new CircuitBreakerClient(inner, { failureThreshold: 3 });

    await expect(
      client.runIntent(AiIntent.EXPLAIN, makeContext()),
    ).rejects.toThrow('backend down');

    expect(client.state).toBe('closed'); // Only 1 failure, threshold is 3
  });

  it('opens the circuit after reaching failure threshold', async () => {
    const inner = makeFailingClient(new Error('fail'));
    const client = new CircuitBreakerClient(inner, { failureThreshold: 3 });

    for (let i = 0; i < 3; i++) {
      await expect(
        client.runIntent(AiIntent.EXPLAIN, makeContext()),
      ).rejects.toThrow('fail');
    }

    expect(client.state).toBe('open');
  });

  it('throws CircuitOpenError when the circuit is open', async () => {
    const inner = makeFailingClient(new Error('fail'));
    const client = new CircuitBreakerClient(inner, { failureThreshold: 2 });

    // Open the circuit
    await expect(client.runIntent(AiIntent.EXPLAIN, makeContext())).rejects.toThrow();
    await expect(client.runIntent(AiIntent.EXPLAIN, makeContext())).rejects.toThrow();

    expect(client.state).toBe('open');

    // Next call should be rejected immediately
    await expect(
      client.runIntent(AiIntent.EXPLAIN, makeContext()),
    ).rejects.toThrow(CircuitOpenError);

    // Inner client should not have been called a 3rd time
    expect(inner.runIntent).toHaveBeenCalledTimes(2);
  });

  it('CircuitOpenError has the correct name and message', async () => {
    const error = new CircuitOpenError();
    expect(error.name).toBe('CircuitOpenError');
    expect(error.message).toBe('Circuit breaker is open — request rejected');
    expect(error).toBeInstanceOf(Error);
  });

  it('allows a trial call after resetTimeout (half-open recovery)', async () => {
    const callCount = { n: 0 };
    const inner: AiClient = {
      runIntent: vi.fn().mockImplementation(() => {
        callCount.n += 1;
        if (callCount.n <= 2) {
          return Promise.reject(new Error('fail'));
        }
        return Promise.resolve({ explanation: 'recovered' });
      }),
    };
    const client = new CircuitBreakerClient(inner, {
      failureThreshold: 2,
      resetTimeout: 10_000,
    });

    // Open the circuit
    await expect(client.runIntent(AiIntent.EXPLAIN, makeContext())).rejects.toThrow();
    await expect(client.runIntent(AiIntent.EXPLAIN, makeContext())).rejects.toThrow();
    expect(client.state).toBe('open');

    // Advance past reset timeout
    vi.advanceTimersByTime(10_000);

    // This should be allowed (half-open trial)
    const result = await client.runIntent(AiIntent.EXPLAIN, makeContext());
    expect(result.explanation).toBe('recovered');
    expect(client.state).toBe('closed');
  });

  it('streamIntent delegates successfully', async () => {
    const inner = makeStreamClient([{ explanation: 'chunk1' }, { explanation: 'chunk2' }]);
    const client = new CircuitBreakerClient(inner, { failureThreshold: 3 });

    const collected: Partial<AiResult>[] = [];
    for await (const chunk of client.streamIntent!(AiIntent.EXPLAIN, makeContext())) {
      collected.push(chunk);
    }

    expect(collected).toEqual([{ explanation: 'chunk1' }, { explanation: 'chunk2' }]);
    expect(client.state).toBe('closed');
  });

  it('streamIntent throws CircuitOpenError when circuit is open', async () => {
    const inner = makeFailingClient(new Error('fail'));
    const client = new CircuitBreakerClient(inner, { failureThreshold: 2 });

    // Open the circuit
    await expect(client.runIntent(AiIntent.EXPLAIN, makeContext())).rejects.toThrow();
    await expect(client.runIntent(AiIntent.EXPLAIN, makeContext())).rejects.toThrow();

    const gen = client.streamIntent!(AiIntent.EXPLAIN, makeContext());
    await expect(gen.next()).rejects.toThrow(CircuitOpenError);
  });

  it('streamIntent records failure on stream error', async () => {
    const inner = makeFailingStreamClient(new Error('stream fail'));
    const client = new CircuitBreakerClient(inner, { failureThreshold: 2 });

    const gen = client.streamIntent!(AiIntent.EXPLAIN, makeContext());
    await expect(gen.next()).rejects.toThrow('stream fail');

    // One failure recorded
    expect(client.state).toBe('closed');
  });
});
