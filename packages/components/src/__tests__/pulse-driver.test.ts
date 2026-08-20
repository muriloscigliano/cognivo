import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { subscribePulse, _pulseDriverInternals } from '../utils/pulse-driver.js';

/**
 * The driver runs a single module-level rAF loop shared by all subscribers,
 * gated to ~30fps. Tests drive it manually by stubbing rAF + performance.now.
 */
describe('pulse-driver', () => {
  let rafCallbacks: Array<FrameRequestCallback>;
  let now: number;
  let rafId: number;

  function flushFrame(advanceMs: number): void {
    now += advanceMs;
    const cbs = rafCallbacks;
    rafCallbacks = [];
    for (const cb of cbs) cb(now);
  }

  beforeEach(() => {
    rafCallbacks = [];
    now = 0;
    rafId = 0;
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
      rafCallbacks.push(cb);
      return ++rafId;
    });
    vi.stubGlobal('cancelAnimationFrame', (id: number) => {
      void id;
      rafCallbacks = [];
    });
    vi.spyOn(performance, 'now').mockImplementation(() => now);
  });

  afterEach(() => {
    _pulseDriverInternals.reset();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('schedules a rAF loop on first subscribe', () => {
    expect(rafCallbacks.length).toBe(0);
    const unsub = subscribePulse(1000, () => {});
    expect(rafCallbacks.length).toBe(1);
    unsub();
  });

  it('delivers phase in [0, 1) advancing with time', () => {
    const phases: number[] = [];
    const unsub = subscribePulse(1000, (p) => phases.push(p));
    flushFrame(250);
    flushFrame(250);
    flushFrame(250);
    expect(phases.length).toBe(3);
    expect(phases[0]!).toBeCloseTo(0.25, 5);
    expect(phases[1]!).toBeCloseTo(0.5, 5);
    expect(phases[2]!).toBeCloseTo(0.75, 5);
    for (const p of phases) {
      expect(p).toBeGreaterThanOrEqual(0);
      expect(p).toBeLessThan(1);
    }
    unsub();
  });

  it('wraps phase past the period', () => {
    const phases: number[] = [];
    const unsub = subscribePulse(400, (p) => phases.push(p));
    flushFrame(500);
    expect(phases[0]!).toBeCloseTo(0.25, 5);
    unsub();
  });

  it('skips frames faster than the ~30fps gate', () => {
    const phases: number[] = [];
    const unsub = subscribePulse(1000, (p) => phases.push(p));
    flushFrame(40); // first delivered frame
    flushFrame(10); // < 33ms since last delivery — gated out
    flushFrame(10); // still gated
    flushFrame(20); // now 40ms since last delivery — delivered
    expect(phases.length).toBe(2);
    unsub();
  });

  it('stops delivering after unsubscribe and cancels the loop when empty', () => {
    const phases: number[] = [];
    const unsub = subscribePulse(1000, (p) => phases.push(p));
    flushFrame(100);
    expect(phases.length).toBe(1);
    unsub();
    expect(_pulseDriverInternals.subscriberCount()).toBe(0);
    flushFrame(100);
    flushFrame(100);
    expect(phases.length).toBe(1);
    // loop is asleep: no pending rAF callbacks remain
    expect(rafCallbacks.length).toBe(0);
  });

  it('supports multiple subscribers with independent periods', () => {
    const a: number[] = [];
    const b: number[] = [];
    const unsubA = subscribePulse(1000, (p) => a.push(p));
    const unsubB = subscribePulse(500, (p) => b.push(p));
    flushFrame(250);
    expect(a[0]!).toBeCloseTo(0.25, 5);
    expect(b[0]!).toBeCloseTo(0.5, 5);
    unsubA();
    flushFrame(250);
    expect(a.length).toBe(1);
    expect(b.length).toBe(2);
    unsubB();
  });

  it('unsubscribing twice is a no-op', () => {
    const unsub = subscribePulse(1000, () => {});
    unsub();
    expect(() => unsub()).not.toThrow();
    expect(_pulseDriverInternals.subscriberCount()).toBe(0);
  });
});
