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

  it('buckets by scope + entity-count magnitude for ledger keying', () => {
    // correction #2: ledger key must include a blast bucket, not just the tool.
    expect(blastBucket(selfSmall)).toBe('self:sm');
    expect(blastBucket(externalBig)).toBe('external:sm');
    const huge: BlastRadius = {
      scope: 'external',
      entities: Array.from({ length: 5000 }, (_, i) => `c${i}`),
      irreversibleSideEffects: ['email.send'],
    };
    expect(blastBucket(huge)).toBe('external:lg');
  });
});
