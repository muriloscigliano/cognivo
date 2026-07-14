import { describe, it, expect } from 'vitest';
import { mergeBlastRadius, blastBucket } from '../agent/reversibility.js';
import type { BlastRadius } from '../agent/reversibility.js';

describe('BlastRadius', () => {
  const selfSmall: BlastRadius = {
    scope: 'self',
    entities: ['draft-1'],
    irreversibleSideEffects: [],
  };
  const externalBig: BlastRadius = {
    scope: 'external',
    entities: ['contact-a', 'contact-b'],
    irreversibleSideEffects: ['email.send'],
  };

  it('merges scope to the widest of the two (external > workspace > self)', () => {
    expect(mergeBlastRadius(selfSmall, externalBig).scope).toBe('external');
  });

  it('unions entities without duplicates', () => {
    const a: BlastRadius = { scope: 'self', entities: ['x', 'y'], irreversibleSideEffects: [] };
    const b: BlastRadius = { scope: 'self', entities: ['y', 'z'], irreversibleSideEffects: [] };
    expect(mergeBlastRadius(a, b).entities.sort()).toEqual(['x', 'y', 'z']);
  });

  it('unions irreversible side effects — cumulative damage is visible', () => {
    // The whole point of correction #1: ten reversible actions can compose into
    // an irreversible one. Merging must accumulate the irreversible effects.
    const merged = mergeBlastRadius(selfSmall, externalBig);
    expect(merged.irreversibleSideEffects).toContain('email.send');
  });

  it('buckets by scope + entity-count magnitude + side-effect axis for ledger keying', () => {
    // correction #2: ledger key must include a blast bucket, not just the tool.
    // Magnitude is order-of-magnitude of entity count (m0..m4); side-effect axis
    // is x1 when any irreversibleSideEffect is present, else x0.
    expect(blastBucket(selfSmall)).toBe('self:m1:x0'); // 1 entity, no side effect
    expect(blastBucket(externalBig)).toBe('external:m1:x1'); // 2 entities, email.send
    const huge: BlastRadius = {
      scope: 'external',
      entities: Array.from({ length: 5000 }, (_, i) => `c${i}`),
      irreversibleSideEffects: ['email.send'],
    };
    expect(blastBucket(huge)).toBe('external:m4:x1'); // 1000+ collapses to m4
  });

  it('does NOT collapse a cheap harmless action and an expensive side-effecting one into the same bucket', () => {
    // HIGH-2: the whole guarantee. A 1-entity no-side-effect action and a
    // 99-entity + email.send action on the SAME scope must NOT share a ledger
    // bucket — otherwise cheap approvals graduate the dangerous one.
    const cheap: BlastRadius = { scope: 'external', entities: ['x'], irreversibleSideEffects: [] };
    const expensive: BlastRadius = {
      scope: 'external',
      entities: Array.from({ length: 99 }, (_, i) => `c${i}`),
      irreversibleSideEffects: ['email.send'],
    };
    expect(blastBucket(cheap)).not.toBe(blastBucket(expensive));
  });

  it('buckets by order-of-magnitude of entity count (m0..m4) at the boundaries', () => {
    const at = (n: number): string =>
      blastBucket({ scope: 'self', entities: Array.from({ length: n }, (_, i) => `e${i}`), irreversibleSideEffects: [] });
    expect(at(0)).toBe('self:m0:x0'); // zero entities
    expect(at(9)).toBe('self:m1:x0'); // 1-9 → m1
    expect(at(10)).toBe('self:m2:x0'); // 10 crosses into m2
    expect(at(99)).toBe('self:m2:x0'); // 99 → still m2
    expect(at(100)).toBe('self:m3:x0'); // 100 crosses into m3
    expect(at(999)).toBe('self:m3:x0'); // 999 → still m3
    expect(at(1000)).toBe('self:m4:x0'); // 1000+ → m4
    expect(at(50000)).toBe('self:m4:x0'); // capped at m4
  });

  it('the side-effect axis separates x0 from x1 on an otherwise identical radius', () => {
    const base = { scope: 'self' as const, entities: ['e1'] };
    expect(blastBucket({ ...base, irreversibleSideEffects: [] })).toBe('self:m1:x0');
    expect(blastBucket({ ...base, irreversibleSideEffects: ['email.send'] })).toBe('self:m1:x1');
    expect(blastBucket({ ...base, irreversibleSideEffects: [] })).not.toBe(
      blastBucket({ ...base, irreversibleSideEffects: ['email.send'] }),
    );
  });
});
