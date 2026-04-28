/**
 * Self-observability spans (Spec §7.8). Every measured pipeline stage emits a
 * `User Timing` entry visible in DevTools, plus returns a duration in ms for
 * programmatic logging.
 *
 * Falls back to no-op when `performance` is unavailable (some Workers, older Node).
 */

const PERFORMANCE: Performance | undefined =
  typeof performance !== 'undefined' ? performance : undefined;

export interface SpanScope {
  /** End the span; returns elapsed milliseconds. */
  end(): number;
  /** Span name (without the lens: prefix). */
  readonly name: string;
}

/**
 * Start a span. Always pair with `.end()`; otherwise the User Timing entry
 * never lands.
 */
export function startSpan(name: string): SpanScope {
  const start = PERFORMANCE?.now() ?? Date.now();
  const markStart = `lens:${name}:start`;
  const markEnd = `lens:${name}:end`;
  if (PERFORMANCE && typeof PERFORMANCE.mark === 'function') {
    try {
      PERFORMANCE.mark(markStart);
    } catch {
      /* some envs disallow custom marks; fall through */
    }
  }
  return {
    name,
    end() {
      const elapsed = (PERFORMANCE?.now() ?? Date.now()) - start;
      if (PERFORMANCE && typeof PERFORMANCE.mark === 'function') {
        try {
          PERFORMANCE.mark(markEnd);
        } catch {
          /* ignore */
        }
      }
      if (PERFORMANCE && typeof PERFORMANCE.measure === 'function') {
        try {
          PERFORMANCE.measure(`lens:${name}`, markStart, markEnd);
        } catch {
          /* mark may not exist */
        }
      }
      return elapsed;
    },
  };
}

/**
 * Run `fn` inside a span, returning both the value and the elapsed time.
 * Convenience for wrapping single-call stages.
 */
export function withSpan<T>(name: string, fn: () => T): { value: T; ms: number } {
  const span = startSpan(name);
  const value = fn();
  const ms = span.end();
  return { value, ms };
}

/** Async variant. */
export async function withSpanAsync<T>(
  name: string,
  fn: () => Promise<T>
): Promise<{ value: T; ms: number }> {
  const span = startSpan(name);
  const value = await fn();
  const ms = span.end();
  return { value, ms };
}
