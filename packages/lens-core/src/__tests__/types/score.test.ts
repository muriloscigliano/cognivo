import { describe, it, expectTypeOf } from 'vitest';
import type {
  LensScore,
  SubScore,
  FormulaVersion,
  SubScoreName,
} from '../../types/score';

describe('Score types', () => {
  it('SubScoreName enumerates the 4 axes', () => {
    expectTypeOf<SubScoreName>().toEqualTypeOf<
      | 'cognitive-clarity'
      | 'persuasive-integrity'
      | 'accessibility'
      | 'system-health'
    >();
  });

  it('SubScore has value 0–100 + breakdown', () => {
    expectTypeOf<SubScore>().toHaveProperty('value').toEqualTypeOf<number>();
    expectTypeOf<SubScore>().toHaveProperty('topDeductions').toBeArray();
  });

  it('LensScore has composite + sub-scores + formula version', () => {
    expectTypeOf<LensScore>().toHaveProperty('composite').toEqualTypeOf<number>();
    expectTypeOf<LensScore>()
      .toHaveProperty('formulaVersion')
      .toEqualTypeOf<FormulaVersion>();
  });

  it('FormulaVersion is date-pinned template literal', () => {
    expectTypeOf<FormulaVersion>().toMatchTypeOf<`v${number}.${number}`>();
  });
});
