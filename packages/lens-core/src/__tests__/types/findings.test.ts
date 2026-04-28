import { describe, it, expectTypeOf } from 'vitest';
import type { Finding, Severity, FixHint } from '../../types/findings';

describe('Finding types', () => {
  it('Severity is the four-value union', () => {
    expectTypeOf<Severity>().toEqualTypeOf<'blocker' | 'strong' | 'consider' | 'positive'>();
  });

  it('Finding has required core fields', () => {
    expectTypeOf<Finding>().toHaveProperty('id').toEqualTypeOf<string>();
    expectTypeOf<Finding>().toHaveProperty('ruleId').toEqualTypeOf<string>();
    expectTypeOf<Finding>().toHaveProperty('severity').toEqualTypeOf<Severity>();
    expectTypeOf<Finding>().toHaveProperty('confidence').toEqualTypeOf<number>();
  });

  it('FixHint discriminates on kind', () => {
    expectTypeOf<FixHint['kind']>().toEqualTypeOf<
      'token-swap' | 'attribute-set' | 'css-injection' | 'restructure' | 'copy-edit'
    >();
  });
});
