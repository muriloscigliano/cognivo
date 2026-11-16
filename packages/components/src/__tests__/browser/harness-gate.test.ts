// @vitest-environment node
/**
 * Issue: the browser suites skipped silently when Chromium was missing — and
 * CI never installed it, so ElementInternals / implicit submission / focus
 * behaviour was never exercised in CI. In CI a missing Chromium must FAIL.
 */
import { describe, it, expect } from 'vitest';
import { browserGate } from './harness.js';

describe('browser harness gate', () => {
  it('runs when Chromium is installed', () => {
    expect(browserGate({}, true)).toBe(true);
    expect(browserGate({ CI: 'true' }, true)).toBe(true);
  });

  it('skips locally when Chromium is missing', () => {
    expect(browserGate({}, false)).toBe(false);
    expect(browserGate({ CI: '' }, false)).toBe(false);
    expect(browserGate({ CI: 'false' }, false)).toBe(false);
  });

  it('fails (throws) in CI when Chromium is missing', () => {
    expect(() => browserGate({ CI: 'true' }, false)).toThrow(/playwright install/);
    expect(() => browserGate({ CI: '1' }, false)).toThrow(/Chromium/);
  });
});
