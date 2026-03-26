import type { AiClient } from '../client/types.js';

/**
 * Configuration for the FallbackClient
 *
 * Defines a chain of AI clients to try in order.
 * If the primary fails, the next one is attempted.
 */
export interface FallbackConfig {
  /** Ordered list of clients to try (first = primary) */
  clients: AiClient[];

  /**
   * Predicate to determine if an error should trigger fallback.
   * Return true to try the next client, false to throw immediately.
   * Default: always returns true (all errors trigger fallback).
   */
  shouldFallback?: (error: Error) => boolean;

  /**
   * Callback fired when a client fails and fallback is triggered.
   * @param error - The error from the failed client
   * @param clientIndex - Index of the client that failed (0-based)
   */
  onFallback?: (error: Error, clientIndex: number) => void;
}

/** State of a circuit breaker */
export type CircuitState = 'closed' | 'open' | 'half-open';

/**
 * Configuration for a circuit breaker wrapper
 */
export interface CircuitBreakerConfig {
  /** Number of consecutive failures before opening the circuit. Default: 5 */
  failureThreshold?: number;

  /** Time in ms before attempting to close an open circuit. Default: 30000 */
  resetTimeout?: number;

  /** Max attempts allowed in half-open state. Default: 1 */
  halfOpenMaxAttempts?: number;

  /** Callback fired when the circuit state changes */
  onStateChange?: (from: CircuitState, to: CircuitState) => void;
}
