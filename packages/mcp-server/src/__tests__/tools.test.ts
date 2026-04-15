import { describe, it, expect } from 'vitest';
import type { CognivoCatalog } from '../catalog/types.js';
import catalogJson from '../catalog/catalog.json' with { type: 'json' };

import { findTokens, findTokensSchema } from '../server/tools/find-tokens.js';
import { getBias, getBiasSchema } from '../server/tools/get-bias.js';
import { getComponent, getComponentSchema } from '../server/tools/get-component.js';
import { getPattern, getPatternSchema } from '../server/tools/get-pattern.js';
import { getTokenFor, getTokenForSchema } from '../server/tools/get-token-for.js';
import { listComponents, listComponentsSchema } from '../server/tools/list-components.js';
import { recommendComponent, recommendComponentSchema } from '../server/tools/recommend-component.js';
import { suggestBiases, suggestBiasesSchema } from '../server/tools/suggest-biases.js';
import { validateUsage, validateUsageSchema } from '../server/tools/validate-usage.js';

const catalog = catalogJson as unknown as CognivoCatalog;

describe('catalog fixture', () => {
  it('is loaded with components, tokens, biases, patterns', () => {
    expect(catalog.components.length).toBeGreaterThan(0);
    expect(catalog.tokens.length).toBeGreaterThan(0);
    expect(catalog.biases.length).toBeGreaterThan(0);
    expect(Array.isArray(catalog.patterns)).toBe(true);
  });
});

describe('list_components', () => {
  it('returns components with default args', () => {
    const input = listComponentsSchema.parse({});
    const out = listComponents(catalog, input);
    expect(out).toMatch(/Found \d+/);
  });

  it('filters by category=ai', () => {
    const input = listComponentsSchema.parse({ category: 'ai', limit: 5 });
    const out = listComponents(catalog, input);
    expect(out).toMatch(/ai/);
  });

  it('returns no-results message for unknown search', () => {
    const input = listComponentsSchema.parse({ search: 'zzz-no-such-thing-zzz' });
    const out = listComponents(catalog, input);
    expect(out).toMatch(/No components found/);
  });

  it('rejects limit out of range', () => {
    expect(() => listComponentsSchema.parse({ limit: 999 })).toThrow();
  });
});

describe('get_component', () => {
  it('returns details for an existing tag', () => {
    const tag = catalog.components[0].tag;
    const input = getComponentSchema.parse({ tag });
    const out = getComponent(catalog, input);
    expect(out).toContain(tag);
  });

  it('handles unknown tag gracefully', () => {
    const out = getComponent(catalog, { tag: 'cg-does-not-exist' });
    expect(typeof out).toBe('string');
    expect(out.length).toBeGreaterThan(0);
  });

  it('requires tag', () => {
    expect(() => getComponentSchema.parse({})).toThrow();
  });
});

describe('find_tokens', () => {
  it('returns tokens with default args', () => {
    const input = findTokensSchema.parse({});
    const out = findTokens(catalog, input);
    expect(typeof out).toBe('string');
    expect(out.length).toBeGreaterThan(0);
  });

  it('filters by tier', () => {
    const input = findTokensSchema.parse({ tier: '1', limit: 5 });
    const out = findTokens(catalog, input);
    expect(typeof out).toBe('string');
  });

  it('rejects invalid tier', () => {
    expect(() => findTokensSchema.parse({ tier: '4' })).toThrow();
  });
});

describe('get_token_for', () => {
  it('recommends a token for a CSS property', () => {
    const input = getTokenForSchema.parse({ cssProperty: 'background', component: 'button', variant: 'primary' });
    const out = getTokenFor(catalog, input);
    expect(typeof out).toBe('string');
    expect(out.length).toBeGreaterThan(0);
  });

  it('requires cssProperty', () => {
    expect(() => getTokenForSchema.parse({})).toThrow();
  });
});

describe('get_bias', () => {
  it('returns summary for an existing id', () => {
    const id = catalog.biases[0].id;
    const input = getBiasSchema.parse({ id });
    const out = getBias(catalog, input);
    expect(out).toContain(catalog.biases[0].name);
  });

  it('searches by query', () => {
    const input = getBiasSchema.parse({ search: 'anchor' });
    const out = getBias(catalog, input);
    expect(typeof out).toBe('string');
  });
});

describe('suggest_biases', () => {
  it('returns suggestions for a scenario', () => {
    const input = suggestBiasesSchema.parse({ scenario: 'pricing page with three tiers', limit: 3 });
    const out = suggestBiases(catalog, input);
    expect(typeof out).toBe('string');
    expect(out.length).toBeGreaterThan(0);
  });

  it('requires scenario', () => {
    expect(() => suggestBiasesSchema.parse({})).toThrow();
  });

  it('rejects limit > 10', () => {
    expect(() => suggestBiasesSchema.parse({ scenario: 'x', limit: 99 })).toThrow();
  });
});

describe('get_pattern', () => {
  it('returns string for category filter', () => {
    const input = getPatternSchema.parse({ category: 'form' });
    const out = getPattern(catalog, input);
    expect(typeof out).toBe('string');
  });
});

describe('validate_usage', () => {
  it('accepts an html snippet', () => {
    const input = validateUsageSchema.parse({ html: '<cg-button variant="primary">Go</cg-button>' });
    const out = validateUsage(catalog, input);
    expect(typeof out).toBe('string');
  });

  it('returns error string when neither html nor css provided', () => {
    const input = validateUsageSchema.parse({});
    const out = validateUsage(catalog, input);
    expect(typeof out).toBe('string');
    expect(out.length).toBeGreaterThan(0);
  });
});

describe('recommend_component', () => {
  it('classifies a chat message scenario', () => {
    const input = recommendComponentSchema.parse({
      content: 'Hello, how can I help you today?',
      context: 'chat message',
    });
    const out = recommendComponent(catalog, input);
    expect(out).toContain('Recommended Component');
  });

  it('requires content', () => {
    expect(() => recommendComponentSchema.parse({})).toThrow();
  });
});
