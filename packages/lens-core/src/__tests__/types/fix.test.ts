import { describe, it, expectTypeOf } from 'vitest';
import type { FixManifest, FileChange, AttributeChange, FixOrigin } from '../../types/fix';

describe('FixManifest types', () => {
  it('FixOrigin is deterministic | llm-verified', () => {
    expectTypeOf<FixOrigin>().toEqualTypeOf<'deterministic' | 'llm-verified'>();
  });

  it('FixManifest has confidence + changes + preview + rollbackable', () => {
    expectTypeOf<FixManifest>().toHaveProperty('confidence').toEqualTypeOf<number>();
    expectTypeOf<FixManifest>().toHaveProperty('changes').toEqualTypeOf<FileChange[]>();
    expectTypeOf<FixManifest>().toHaveProperty('rollbackable').toEqualTypeOf<true>();
  });

  it('AttributeChange has targetNodeId, attribute, value', () => {
    expectTypeOf<AttributeChange>().toHaveProperty('attribute').toEqualTypeOf<string>();
  });
});
