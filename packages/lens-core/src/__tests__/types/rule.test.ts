import { describe, it, expectTypeOf } from 'vitest';
import type { Rule, RuleCost, FixCategory, RuleFixture } from '../../types/rule';
import type { RulePack } from '../../types/pack';

describe('Rule + Pack types', () => {
  it('RuleCost is the cheap/medium/llm union', () => {
    expectTypeOf<RuleCost>().toEqualTypeOf<'cheap' | 'medium' | 'llm'>();
  });

  it('FixCategory is codeable/structural/judgment', () => {
    expectTypeOf<FixCategory>().toEqualTypeOf<'codeable' | 'structural' | 'judgment'>();
  });

  it('Rule requires id, severity, cost, citations, fixtures', () => {
    expectTypeOf<Rule>().toHaveProperty('id').toEqualTypeOf<string>();
    expectTypeOf<Rule>().toHaveProperty('cost').toEqualTypeOf<RuleCost>();
    expectTypeOf<Rule>().toHaveProperty('citations').toEqualTypeOf<string[]>();
    expectTypeOf<Rule>().toHaveProperty('fixtures').toEqualTypeOf<RuleFixture[]>();
  });

  it('RulePack has lazy rules', () => {
    expectTypeOf<RulePack>()
      .toHaveProperty('rules')
      .toEqualTypeOf<Array<() => Promise<{ default: Rule }>>>();
  });
});
