import { describe, it, expect } from 'vitest';
import { AiIntent } from '@cognivo/core';
import { schemas } from '../schemas.js';
import { buildPrompt, SYSTEM_PROMPT } from '../prompts.js';

describe('schemas', () => {
  it('has a schema for every AiIntent', () => {
    for (const intent of Object.values(AiIntent)) {
      expect(schemas[intent]).toBeDefined();
      expect(schemas[intent].type).toBe('object');
      expect(schemas[intent].required).toContain('confidence');
    }
  });

  it('EXPLAIN schema requires explanation and confidence', () => {
    const s = schemas[AiIntent.EXPLAIN];
    expect(s.required).toContain('explanation');
    expect(s.required).toContain('confidence');
  });

  it('FORECAST schema requires forecast array', () => {
    const s = schemas[AiIntent.FORECAST];
    expect(s.required).toContain('forecast');
    expect(s.properties.forecast.type).toBe('array');
  });
});

describe('buildPrompt', () => {
  const baseContext = {
    dataset: [{ month: 'Jan', value: 100 }],
    meta: { timeframe: 'monthly', unit: 'USD' },
  };

  it('builds an EXPLAIN prompt with dataset', () => {
    const prompt = buildPrompt(AiIntent.EXPLAIN, baseContext);
    expect(prompt).toContain('Jan');
    expect(prompt).toContain('100');
    expect(prompt).toContain('monthly');
  });

  it('includes user question when provided', () => {
    const prompt = buildPrompt(AiIntent.EXPLAIN, {
      ...baseContext,
      meta: { ...baseContext.meta, userQuestion: 'Why is revenue down?' },
    });
    expect(prompt).toContain('Why is revenue down?');
  });

  it('builds prompt for every intent without throwing', () => {
    for (const intent of Object.values(AiIntent)) {
      expect(() => buildPrompt(intent, baseContext)).not.toThrow();
    }
  });

  it('throws for an unknown intent', () => {
    expect(() => buildPrompt('bad_intent' as AiIntent, baseContext)).toThrow(
      'Unknown intent'
    );
  });

  it('includes selection when provided', () => {
    const prompt = buildPrompt(AiIntent.COMPARE, {
      ...baseContext,
      selection: [{ month: 'Feb', value: 200 }],
    });
    expect(prompt).toContain('Feb');
    expect(prompt).toContain('200');
  });
});

describe('SYSTEM_PROMPT', () => {
  it('is a non-empty string', () => {
    expect(typeof SYSTEM_PROMPT).toBe('string');
    expect(SYSTEM_PROMPT.length).toBeGreaterThan(0);
  });

  it('mentions JSON format', () => {
    expect(SYSTEM_PROMPT).toContain('JSON');
  });
});
