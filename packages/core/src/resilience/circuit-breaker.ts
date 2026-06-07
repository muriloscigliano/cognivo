/**
 * CircuitBreaker — Standalone state machine for the circuit breaker pattern.
 *
 * This is NOT an AiClient. It manages state transitions independently
 * and is consumed by CircuitBreakerClient (the decorator).
 *
 * States:
 * - **closed**: Normal operation. Failures are counted.
 * - **open**: Calls are rejected. After resetTimeout, transitions to half-open.
 * - **half-open**: A limited number of trial calls are allowed.
 *   Success returns to closed; failure returns to open.
 */

import type { CircuitState, CircuitBreakerConfig } from './types.js';

const DEFAULT_FAILURE_THRESHOLD = 5;
const DEFAULT_RESET_TIMEOUT = 30_000;
const DEFAULT_HALF_OPEN_MAX_ATTEMPTS = 1;

export class CircuitBreaker {
  private state: CircuitState = 'closed';
  private failureCount = 0;
  private lastFailureTime = 0;
  private halfOpenAttempts = 0;

  private readonly failureThreshold: number;
  private readonly resetTimeout: number;
  private readonly halfOpenMaxAttempts: number;
  private readonly onStateChange: ((from: CircuitState, to: CircuitState) => void) | undefined;

  constructor(config?: CircuitBreakerConfig) {
    this.failureThreshold = config?.failureThreshold ?? DEFAULT_FAILURE_THRESHOLD;
    this.resetTimeout = config?.resetTimeout ?? DEFAULT_RESET_TIMEOUT;
    this.halfOpenMaxAttempts = config?.halfOpenMaxAttempts ?? DEFAULT_HALF_OPEN_MAX_ATTEMPTS;
    this.onStateChange = config?.onStateChange;
  }

  /** Current circuit state */
  get currentState(): CircuitState {
    return this.state;
  }

  /**
   * Check whether the circuit allows execution.
   *
   * - closed: always allows
   * - open: allows if resetTimeout has elapsed (transitions to half-open)
   * - half-open: allows if under the max attempt limit
   */
  canExecute(): boolean {
    switch (this.state) {
      case 'closed':
        return true;

      case 'open': {
        const elapsed = Date.now() - this.lastFailureTime;
        if (elapsed >= this.resetTimeout) {
          // Recovery window opens. Transition, then fall through to the
          // half-open accounting below so this call consumes the first
          // trial slot rather than being a free pass.
          this.transition('half-open');
          return this.grantHalfOpenSlot();
        }
        return false;
      }

      case 'half-open':
        return this.grantHalfOpenSlot();
    }
  }

  /**
   * Grant a half-open trial slot if any remain. Each grant consumes one
   * slot so a burst of concurrent callers can't all stampede a recovering
   * backend; recordSuccess/recordFailure release the slots by leaving
   * half-open.
   */
  private grantHalfOpenSlot(): boolean {
    if (this.halfOpenAttempts < this.halfOpenMaxAttempts) {
      this.halfOpenAttempts += 1;
      return true;
    }
    return false;
  }

  /**
   * Record a successful call. Resets the breaker to closed state.
   */
  recordSuccess(): void {
    if (this.state !== 'closed') {
      this.transition('closed');
    }
    this.failureCount = 0;
    this.halfOpenAttempts = 0;
  }

  /**
   * Record a failed call.
   *
   * - In closed: increments failure count, opens if threshold reached.
   * - In half-open: immediately reopens the circuit.
   */
  recordFailure(): void {
    this.failureCount += 1;
    this.lastFailureTime = Date.now();

    if (this.state === 'half-open') {
      this.transition('open');
      return;
    }

    if (this.state === 'closed' && this.failureCount >= this.failureThreshold) {
      this.transition('open');
    }
  }

  /**
   * Force the breaker back to closed state. Useful for manual recovery.
   */
  reset(): void {
    this.failureCount = 0;
    this.halfOpenAttempts = 0;
    this.lastFailureTime = 0;
    if (this.state !== 'closed') {
      this.transition('closed');
    }
  }

  /**
   * Transition to a new state, firing the onStateChange callback.
   */
  private transition(to: CircuitState): void {
    const from = this.state;
    this.state = to;

    // Reset half-open attempts when entering half-open so a fresh recovery
    // window starts with the full trial-call budget.
    if (to === 'half-open') {
      this.halfOpenAttempts = 0;
    }

    this.onStateChange?.(from, to);
  }
}
