/**
 * CircuitBreakerClient — Decorator that wraps an AiClient with circuit breaker protection.
 *
 * When the inner client fails repeatedly, the circuit opens and rejects
 * further calls immediately (fail-fast), preventing cascading failures
 * and giving the backend time to recover.
 *
 * Usage:
 * ```ts
 * const protected = new CircuitBreakerClient(inner, {
 *   failureThreshold: 3,
 *   resetTimeout: 10_000,
 *   onStateChange: (from, to) => console.log(`Circuit: ${from} -> ${to}`),
 * });
 * ```
 */

import type { AiClient, AiRequestOptions } from '../client/types.js';
import type { AiIntent } from '../intents/types.js';
import type { AiContext } from '../context/types.js';
import type { AiResult } from '../results/types.js';
import type { CircuitBreakerConfig, CircuitState } from './types.js';
import { CircuitBreaker } from './circuit-breaker.js';

/**
 * Error thrown when the circuit is open and rejecting calls.
 */
export class CircuitOpenError extends Error {
  constructor(message: string = 'Circuit breaker is open — request rejected') {
    super(message);
    this.name = 'CircuitOpenError';
  }
}

export class CircuitBreakerClient implements AiClient {
  private readonly inner: AiClient;
  private readonly breaker: CircuitBreaker;

  constructor(inner: AiClient, config?: CircuitBreakerConfig) {
    this.inner = inner;
    this.breaker = new CircuitBreaker(config);
  }

  /** Expose the current circuit state for observability */
  get state(): CircuitState {
    return this.breaker.currentState;
  }

  async runIntent<T = unknown>(
    intent: AiIntent,
    context: AiContext<T>,
    options?: AiRequestOptions,
  ): Promise<AiResult> {
    if (!this.breaker.canExecute()) {
      throw new CircuitOpenError();
    }

    try {
      const result = await this.inner.runIntent(intent, context, options);
      this.breaker.recordSuccess();
      return result;
    } catch (error) {
      this.breaker.recordFailure();
      throw error;
    }
  }

  async *streamIntent<T = unknown>(
    intent: AiIntent,
    context: AiContext<T>,
    options?: AiRequestOptions,
  ): AsyncGenerator<Partial<AiResult>> {
    if (!this.breaker.canExecute()) {
      throw new CircuitOpenError();
    }

    if (!this.inner.streamIntent) {
      throw new Error('Inner client does not support streaming');
    }

    try {
      yield* this.inner.streamIntent(intent, context, options);
      this.breaker.recordSuccess();
    } catch (error) {
      this.breaker.recordFailure();
      throw error;
    }
  }
}
