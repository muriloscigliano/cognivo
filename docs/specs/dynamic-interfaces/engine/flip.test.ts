/**
 * W1 — FLIP geometry tests (pure, no DOM). Plan: ../02-build-plan-phase-S-W.md.
 * Run: node_modules/.bin/vitest run docs/specs/dynamic-interfaces/engine/flip.test.ts
 *
 * The DOM application (measure/playFlip) is proven in the page; the geometry math
 * — the part that can be wrong — is tested here.
 */
import { describe, it, expect } from 'vitest';
import { computeFlip, type Rect } from './flip.js';

const map = (entries: Array<[string, Rect]>) => new Map(entries);

describe('W1 — computeFlip', () => {
  it('an element that moved down produces an upward inverse delta', () => {
    const first = map([['a', { x: 0, y: 0 }]]);
    const last = map([['a', { x: 0, y: 40 }]]); // moved down 40
    const [d] = computeFlip(first, last);
    expect(d.id).toBe('a');
    expect(d.dy).toBe(-40); // inverse: render at old position (40 above new)
    expect(d.isNew).toBe(false);
  });

  it('an unmoved element produces no delta', () => {
    const first = map([['a', { x: 10, y: 10 }]]);
    const last = map([['a', { x: 10, y: 10 }]]);
    expect(computeFlip(first, last)).toEqual([]);
  });

  it('a new element (no first rect) is marked isNew with zero delta', () => {
    const first = map([['a', { x: 0, y: 0 }]]);
    const last = map([['a', { x: 0, y: 0 }], ['b', { x: 0, y: 40 }]]);
    const deltas = computeFlip(first, last);
    const b = deltas.find((d) => d.id === 'b')!;
    expect(b.isNew).toBe(true);
    expect(b.dx).toBe(0);
    expect(b.dy).toBe(0);
  });

  it('handles horizontal + vertical movement', () => {
    const first = map([['a', { x: 100, y: 50 }]]);
    const last = map([['a', { x: 20, y: 90 }]]);
    const [d] = computeFlip(first, last);
    expect(d.dx).toBe(80); // 100 - 20
    expect(d.dy).toBe(-40); // 50 - 90
  });

  it('a removed element (gone from last) is simply absent — no delta', () => {
    const first = map([['a', { x: 0, y: 0 }], ['gone', { x: 0, y: 40 }]]);
    const last = map([['a', { x: 0, y: 0 }]]);
    const deltas = computeFlip(first, last);
    expect(deltas.find((d) => d.id === 'gone')).toBeUndefined();
  });
});
