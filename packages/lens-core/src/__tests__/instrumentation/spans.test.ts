import { describe, it, expect } from 'vitest';
import { startSpan, withSpan, withSpanAsync } from '../../instrumentation/spans';

describe('startSpan', () => {
  it('returns a span with name and end()', () => {
    const span = startSpan('test-stage');
    expect(span.name).toBe('test-stage');
    const elapsed = span.end();
    expect(typeof elapsed).toBe('number');
    expect(elapsed).toBeGreaterThanOrEqual(0);
  });

  it('measures elapsed time for synchronous work', () => {
    const span = startSpan('sync-work');
    let sum = 0;
    for (let i = 0; i < 1000; i++) sum += i;
    void sum;
    const elapsed = span.end();
    expect(elapsed).toBeGreaterThanOrEqual(0);
  });
});

describe('withSpan', () => {
  it('returns value + ms', () => {
    const { value, ms } = withSpan('compute', () => 42);
    expect(value).toBe(42);
    expect(typeof ms).toBe('number');
  });
});

describe('withSpanAsync', () => {
  it('awaits the promise and returns value + ms', async () => {
    const { value, ms } = await withSpanAsync('async-compute', async () => {
      await new Promise((resolve) => setTimeout(resolve, 10));
      return 'done';
    });
    expect(value).toBe('done');
    expect(ms).toBeGreaterThanOrEqual(0);
  });
});
