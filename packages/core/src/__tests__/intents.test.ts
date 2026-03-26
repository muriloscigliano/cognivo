import { describe, it, expect } from 'vitest';
import { AiIntent, isAiIntent } from '../intents/types';
import { validateIntent } from '../utils/validators';
import { validateConfidence } from '../utils/validators';

describe('AiIntent', () => {
  it('has all 8 intents', () => {
    const intents = Object.values(AiIntent);
    expect(intents).toHaveLength(8);
    expect(intents).toContain('explain');
    expect(intents).toContain('summarize');
    expect(intents).toContain('forecast');
    expect(intents).toContain('detect_anomaly');
    expect(intents).toContain('classify');
    expect(intents).toContain('optimize');
    expect(intents).toContain('compare');
    expect(intents).toContain('cluster');
  });
});

describe('isAiIntent', () => {
  it('returns true for valid intents', () => {
    expect(isAiIntent('explain')).toBe(true);
    expect(isAiIntent('forecast')).toBe(true);
    expect(isAiIntent('cluster')).toBe(true);
  });

  it('returns false for invalid intents', () => {
    expect(isAiIntent('invalid')).toBe(false);
    expect(isAiIntent('')).toBe(false);
    expect(isAiIntent(null)).toBe(false);
    expect(isAiIntent(42)).toBe(false);
    expect(isAiIntent(undefined)).toBe(false);
  });
});

describe('validateIntent', () => {
  it('validates valid intents', () => {
    expect(validateIntent(AiIntent.EXPLAIN)).toBe(true);
    expect(validateIntent('summarize')).toBe(true);
  });

  it('rejects invalid intents', () => {
    expect(validateIntent('nope')).toBe(false);
    expect(validateIntent(123)).toBe(false);
  });
});

describe('validateConfidence', () => {
  it('accepts valid confidence scores', () => {
    expect(validateConfidence(0)).toBe(true);
    expect(validateConfidence(0.5)).toBe(true);
    expect(validateConfidence(1)).toBe(true);
  });

  it('rejects out-of-range values', () => {
    expect(validateConfidence(-0.1)).toBe(false);
    expect(validateConfidence(1.1)).toBe(false);
  });

  it('rejects non-numbers', () => {
    expect(validateConfidence('0.5')).toBe(false);
    expect(validateConfidence(null)).toBe(false);
    expect(validateConfidence(undefined)).toBe(false);
  });
});
