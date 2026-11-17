// @vitest-environment node
/**
 * Independent review, 2026-11-18: the tree-shake test skipped whenever
 * `dist/` was missing — in CI too, so it could pass without testing anything.
 * Like the browser-suite gate: skip locally, FAIL in CI.
 */
import { describe, it, expect } from 'vitest';
import { distGate } from './dist-gate.js';

describe('built-dist gate', () => {
  it('runs when dist is built', () => {
    expect(distGate({}, true)).toBe(true);
    expect(distGate({ CI: 'true' }, true)).toBe(true);
  });

  it('skips locally when dist is missing', () => {
    expect(distGate({}, false)).toBe(false);
    expect(distGate({ CI: 'false' }, false)).toBe(false);
    expect(distGate({ CI: '0' }, false)).toBe(false);
  });

  it('fails (throws) in CI when dist is missing', () => {
    expect(() => distGate({ CI: 'true' }, false)).toThrow(/pnpm build/);
    expect(() => distGate({ CI: '1' }, false)).toThrow(/dist/);
  });
});
