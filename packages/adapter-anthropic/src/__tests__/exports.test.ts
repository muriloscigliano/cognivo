import { describe, it, expect } from 'vitest';
import { AiIntent } from '@cognivo/core';
import { tools } from '../schemas.js';
import { buildPrompt, SYSTEM_PROMPT } from '../prompts.js';

describe('tools', () => {
  it('has a tool definition for every AiIntent', () => {
    for (const intent of Object.values(AiIntent)) {
      expect(tools[intent]).toBeDefined();
      expect(tools[intent].name).toBeDefined();
      expect(tools[intent].description).toBeDefined();
      expect(tools[intent].input_schema).toBeDefined();
    }
  });

  it('every tool input_schema is an object type', () => {
    for (const intent of Object.values(AiIntent)) {
      expect(tools[intent].input_schema.type).toBe('object');
    }
  });

  it('every tool input_schema requires confidence', () => {
    for (const intent of Object.values(AiIntent)) {
      const required = tools[intent].input_schema.required;
      expect(Array.isArray(required)).toBe(true);
      expect(required).toContain('confidence');
    }
  });

  it('EXPLAIN tool requires explanation and confidence', () => {
    const t = tools[AiIntent.EXPLAIN];
    expect(t.input_schema.required).toContain('explanation');
    expect(t.input_schema.required).toContain('confidence');
  });

  it('FORECAST tool requires forecast array', () => {
    const t = tools[AiIntent.FORECAST];
    expect(t.input_schema.required).toContain('forecast');
    const properties = t.input_schema.properties as Record<string, Record<string, unknown>>;
    expect(properties.forecast.type).toBe('array');
  });

  it('DETECT_ANOMALY tool requires anomalies array', () => {
    const t = tools[AiIntent.DETECT_ANOMALY];
    expect(t.input_schema.required).toContain('anomalies');
  });

  it('CLASSIFY tool requires classifications array', () => {
    const t = tools[AiIntent.CLASSIFY];
    expect(t.input_schema.required).toContain('classifications');
  });

  it('OPTIMIZE tool requires recommendations array', () => {
    const t = tools[AiIntent.OPTIMIZE];
    expect(t.input_schema.required).toContain('recommendations');
  });

  it('each tool has a unique name', () => {
    const names = Object.values(tools).map(t => t.name);
    const uniqueNames = new Set(names);
    expect(uniqueNames.size).toBe(names.length);
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
