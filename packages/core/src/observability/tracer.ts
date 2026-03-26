import type { AiSpan, AiTracer } from './types.js';

/**
 * InMemoryTracer — Simple in-process tracer for AI operations.
 *
 * Stores spans in memory and fires an optional callback when a span ends.
 * Primarily useful for debugging, testing, and lightweight observability.
 * For production, plug in a custom AiTracer that forwards to your APM.
 */
export class InMemoryTracer implements AiTracer {
  private spans: AiSpan[] = [];
  private counter = 0;

  /** Optional callback fired when any span ends */
  onSpanEnd?: (span: AiSpan) => void;

  /**
   * Start a new span.
   *
   * @param name - Human-readable operation name
   * @param attributes - Arbitrary key-value pairs to attach
   * @returns A new AiSpan in 'pending' status
   */
  startSpan(name: string, attributes: Record<string, unknown> = {}): AiSpan {
    this.counter++;
    const span: AiSpan = {
      id: `span_${this.counter}`,
      name,
      startTime: Date.now(),
      status: 'pending',
      attributes: { ...attributes },
    };
    this.spans.push(span);
    return span;
  }

  /**
   * End a span, computing its duration and setting its final status.
   *
   * @param span - The span to finalize (mutated in place)
   * @param status - Final status ('success' or 'error')
   * @param error - Optional error message when status is 'error'
   */
  endSpan(span: AiSpan, status: 'success' | 'error', error?: string): void {
    span.endTime = Date.now();
    span.duration = span.endTime - span.startTime;
    span.status = status;
    if (error !== undefined) {
      span.error = error;
    }
    this.onSpanEnd?.(span);
  }

  /**
   * Get all recorded spans as a readonly array.
   */
  getSpans(): readonly AiSpan[] {
    return [...this.spans];
  }

  /**
   * Clear all recorded spans and reset the counter.
   */
  clear(): void {
    this.spans = [];
    this.counter = 0;
  }
}
