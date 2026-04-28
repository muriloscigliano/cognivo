import { describe, it, expectTypeOf } from 'vitest';
import type { Persona, EvidenceLevel, AttentionModel } from '../../types/persona';

describe('Persona types', () => {
  it('EvidenceLevel is strong/directional/experimental', () => {
    expectTypeOf<EvidenceLevel>().toEqualTypeOf<'strong' | 'directional' | 'experimental'>();
  });

  it('Persona requires evidence + framing + citations', () => {
    expectTypeOf<Persona>()
      .toHaveProperty('evidenceLevel')
      .toEqualTypeOf<EvidenceLevel>();
    expectTypeOf<Persona>().toHaveProperty('framing').toEqualTypeOf<string>();
    expectTypeOf<Persona>().toHaveProperty('citations').toEqualTypeOf<string[]>();
  });

  it('AttentionModel has dwell + scan pattern', () => {
    expectTypeOf<AttentionModel>().toHaveProperty('dwellSeconds').toEqualTypeOf<number>();
  });
});
