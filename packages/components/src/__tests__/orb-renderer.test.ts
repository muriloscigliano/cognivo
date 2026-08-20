import { describe, it, expect, vi } from 'vitest';
import {
  ORB_STATES,
  ORB_STATE_LABELS,
  computeOrbDots,
  drawOrbFrame,
  type OrbDot,
} from '../utils/orb-renderer.js';

describe('orb-renderer', () => {
  it('exposes the nine agent states', () => {
    expect(ORB_STATES).toEqual([
      'thinking', 'searching', 'solving', 'listening', 'connecting',
      'streaming', 'composing', 'idle', 'done',
    ]);
  });

  it('has an aria label for every state', () => {
    for (const state of ORB_STATES) {
      expect(typeof ORB_STATE_LABELS[state]).toBe('string');
      expect(ORB_STATE_LABELS[state].length).toBeGreaterThan(0);
    }
  });

  it('keeps every dot inside the canvas bounds for all states and times', () => {
    for (const state of ORB_STATES) {
      for (const t of [0, 0.25, 0.7, 3.9, 42.42]) {
        for (const size of [20, 40, 64]) {
          const dots = computeOrbDots(state, t, size);
          expect(dots.length).toBeGreaterThan(0);
          for (const dot of dots) {
            expect(dot.x - dot.r).toBeGreaterThanOrEqual(-0.001);
            expect(dot.x + dot.r).toBeLessThanOrEqual(size + 0.001);
            expect(dot.y - dot.r).toBeGreaterThanOrEqual(-0.001);
            expect(dot.y + dot.r).toBeLessThanOrEqual(size + 0.001);
            expect(dot.alpha).toBeGreaterThanOrEqual(0);
            expect(dot.alpha).toBeLessThanOrEqual(1);
            expect(dot.r).toBeGreaterThan(0);
          }
        }
      }
    }
  });

  it('is deterministic — same inputs produce identical dots', () => {
    const a = computeOrbDots('searching', 1.234, 64);
    const b = computeOrbDots('searching', 1.234, 64);
    expect(a).toEqual(b);
  });

  it('small sizes get a simplified dot layout', () => {
    const sm = computeOrbDots('thinking', 0.5, 20);
    const lg = computeOrbDots('thinking', 0.5, 64);
    expect(sm.length).toBeLessThanOrEqual(8);
    expect(lg.length).toBeGreaterThanOrEqual(12);
  });

  it('states animate — dots differ across time', () => {
    for (const state of ORB_STATES.filter((s) => s !== 'done')) {
      const a = computeOrbDots(state, 0, 64);
      const b = computeOrbDots(state, 0.5, 64);
      expect(a, `state ${state} should move over time`).not.toEqual(b);
    }
  });

  it('done state settles to a stable arrangement', () => {
    const a = computeOrbDots('done', 10, 64);
    const b = computeOrbDots('done', 11, 64);
    for (let i = 0; i < a.length; i++) {
      expect(Math.abs(a[i]!.x - b[i]!.x)).toBeLessThan(0.5);
      expect(Math.abs(a[i]!.y - b[i]!.y)).toBeLessThan(0.5);
    }
  });

  it('drawOrbFrame clears then draws one arc per dot', () => {
    const calls: string[] = [];
    const ctx = {
      canvas: { width: 128, height: 128 },
      clearRect: vi.fn(() => calls.push('clear')),
      beginPath: vi.fn(),
      arc: vi.fn(() => calls.push('arc')),
      fill: vi.fn(),
      save: vi.fn(),
      restore: vi.fn(),
      setTransform: vi.fn(),
      fillStyle: '',
      globalAlpha: 1,
    } as unknown as CanvasRenderingContext2D;

    const dots: OrbDot[] = [
      { x: 10, y: 10, r: 2, alpha: 1 },
      { x: 20, y: 20, r: 3, alpha: 0.5 },
    ];
    drawOrbFrame(ctx, dots, 'rgb(255 255 255)', 2);
    expect(calls[0]).toBe('clear');
    expect(calls.filter((c) => c === 'arc').length).toBe(2);
  });
});
