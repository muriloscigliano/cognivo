import type { AiClient, AiRequestOptions } from '../client/types.js';
import type { AiIntent } from '../intents/types.js';
import type { AiContext } from '../context/types.js';
import type { AiResult } from '../results/types.js';
import type { AiTracer, ObservableClientConfig } from './types.js';
import { InMemoryTracer } from './tracer.js';

/**
 * ObservableClient — Decorator that adds tracing/observability to any AiClient.
 *
 * Wraps every `runIntent` call in a span, recording timing, intent metadata,
 * and success/error status. Exposes the tracer for external inspection.
 *
 * Usage:
 * ```ts
 * const observable = new ObservableClient(myClient, {
 *   onComplete: (span) => console.log(`${span.name} took ${span.duration}ms`),
 * });
 * const result = await observable.runIntent(AiIntent.EXPLAIN, context);
 * console.log(observable.tracer.getSpans());
 * ```
 */
export class ObservableClient implements AiClient {
  private readonly inner: AiClient;
  private readonly _tracer: AiTracer;
  private readonly onComplete: ((span: import('./types.js').AiSpan) => void) | undefined;

  constructor(inner: AiClient, config?: ObservableClientConfig) {
    this.inner = inner;
    this._tracer = config?.tracer ?? new InMemoryTracer();
    this.onComplete = config?.onComplete ?? undefined;
  }

  /** Access the tracer for span inspection */
  get tracer(): AiTracer {
    return this._tracer;
  }

  async runIntent<T = unknown>(
    intent: AiIntent,
    context: AiContext<T>,
    options?: AiRequestOptions,
  ): Promise<AiResult> {
    const span = this._tracer.startSpan(`runIntent:${intent}`, {
      intent,
      model: options?.model,
      datasetSize: context.dataset.length,
    });
    span.intent = intent;

    try {
      const result = await this.inner.runIntent(intent, context, options);

      if (result.confidence !== undefined) {
        span.attributes.confidence = result.confidence;
      }
      this._tracer.endSpan(span, 'success');
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      this._tracer.endSpan(span, 'error', message);
      throw err;
    } finally {
      this.onComplete?.(span);
    }
  }

  /**
   * Stream an intent — delegates directly to the inner client with no span wrapping.
   * Streaming spans are complex (partial results over time) and out of scope
   * for the first iteration.
   */
  async *streamIntent<T = unknown>(
    intent: AiIntent,
    context: AiContext<T>,
    options?: AiRequestOptions,
  ): AsyncGenerator<Partial<AiResult>> {
    if (typeof this.inner.streamIntent !== 'function') {
      throw new Error('Inner client does not support streaming');
    }
    yield* this.inner.streamIntent(intent, context, options);
  }
}
