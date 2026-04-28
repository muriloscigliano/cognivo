import { describe, it, expect, expectTypeOf } from 'vitest';
import type {
  PageIntent,
  IntentClassification,
  ClassifierSignal,
} from '../../types/classifier';

describe('Classifier types', () => {
  it('PageIntent enumerates 12 intents + unknown', () => {
    const all: PageIntent[] = [
      'pricing',
      'checkout',
      'onboarding',
      'signup',
      'signin',
      'landing',
      'dashboard',
      'settings',
      'content',
      'form',
      'empty-state',
      'error',
      'unknown',
    ];
    expect(all).toHaveLength(13);
  });

  it('IntentClassification has primary + secondary[]', () => {
    expectTypeOf<IntentClassification>().toHaveProperty('primary');
    expectTypeOf<IntentClassification>().toHaveProperty('secondary').toBeArray();
  });

  it('ClassifierSignal has intent + weight + evidence', () => {
    expectTypeOf<ClassifierSignal>().toHaveProperty('intent').toEqualTypeOf<PageIntent>();
    expectTypeOf<ClassifierSignal>().toHaveProperty('weight').toEqualTypeOf<number>();
  });
});
