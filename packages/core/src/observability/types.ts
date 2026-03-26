import type { AiIntent } from '../intents/types.js';

/**
 * A trace span representing a single AI operation
 */
export interface AiSpan {
  /** Unique span identifier (e.g., 'span_1', 'span_2') */
  id: string;

  /** Human-readable name for this span */
  name: string;

  /** The AI intent being executed, if applicable */
  intent?: AiIntent;

  /** Timestamp when the span started (ms since epoch) */
  startTime: number;

  /** Timestamp when the span ended (ms since epoch) */
  endTime?: number;

  /** Duration of the span in milliseconds */
  duration?: number;

  /** Current status of the span */
  status: 'pending' | 'success' | 'error';

  /** Error message if status is 'error' */
  error?: string;

  /** Arbitrary key-value attributes attached to this span */
  attributes: Record<string, unknown>;
}

/**
 * Tracer interface for recording AI operation spans
 */
export interface AiTracer {
  /** Start a new span with an optional set of attributes */
  startSpan(name: string, attributes?: Record<string, unknown>): AiSpan;

  /** End a span, setting its final status and optional error message */
  endSpan(span: AiSpan, status: 'success' | 'error', error?: string): void;

  /** Get all recorded spans (readonly) */
  getSpans(): readonly AiSpan[];

  /** Clear all recorded spans */
  clear(): void;

  /** Optional callback fired when a span ends */
  onSpanEnd?: (span: AiSpan) => void;
}

/**
 * Configuration for the ObservableClient wrapper
 */
export interface ObservableClientConfig {
  /** Custom tracer implementation. If not provided, an InMemoryTracer is used. */
  tracer?: AiTracer;

  /** Callback fired when an AI operation completes (success or error) */
  onComplete?: (span: AiSpan) => void;
}
