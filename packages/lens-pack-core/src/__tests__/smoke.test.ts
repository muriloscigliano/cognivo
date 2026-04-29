import { describe, expect, it } from 'vitest';
import corePack, * as named from '../index.js';

describe('@cognivo/lens-pack-core smoke', () => {
  it('default export is a well-formed pack manifest', () => {
    expect(corePack.id).toBe('@cognivo/lens-pack-core');
    expect(corePack.version).toMatch(/^\d+\.\d+\.\d+/);
    expect(Array.isArray(corePack.rules)).toBe(true);
    expect(corePack.rules).toHaveLength(20);
    expect(corePack.rules.every((r) => typeof r === 'function')).toBe(true);
  });

  it('each lazy rule loader resolves to a Rule with the expected shape', async () => {
    for (const lazy of corePack.rules) {
      const mod = await lazy();
      const rule = mod.default;
      expect(rule.id).toMatch(/^core\//);
      expect(rule.title.length).toBeGreaterThan(0);
      expect(['blocker', 'strong', 'consider', 'positive']).toContain(rule.severity);
      expect(['cheap', 'medium', 'llm']).toContain(rule.cost);
      expect(['codeable', 'structural', 'judgment']).toContain(rule.fixCategory);
      expect(typeof rule.applies).toBe('function');
      expect(typeof rule.detect).toBe('function');
      expect(rule.fixtures.length).toBeGreaterThan(0);
    }
  });

  it('every rule id is unique', async () => {
    const ids = await Promise.all(corePack.rules.map(async (lazy) => (await lazy()).default.id));
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('exports each rule as a named binding', () => {
    const expectedNames = [
      'imgWithoutAlt',
      'buttonWithoutName',
      'linkWithoutName',
      'landmarkWithoutName',
      'inputWithoutLabel',
      'dialogWithoutName',
      'headingSkippedLevel',
      'positiveTabindex',
      'ariaHiddenFocusable',
      'duplicateId',
      'disabledWithTabindex',
      'transitionAll',
      'closedShadowRootUnauditable',
      'cgComponentNoManifest',
      'textContrastBelowAa',
      'tier1PaletteColor',
      'tier1BrandColor',
      'rawColorNoToken',
      'backgroundAsForeground',
      'missingComponentTier3Token',
    ];
    for (const n of expectedNames) {
      expect(named, `missing named export: ${n}`).toHaveProperty(n);
    }
  });

  it('peer dep @cognivo/lens-core is importable', async () => {
    const lensCore = await import('@cognivo/lens-core');
    expect(typeof lensCore.defineRule).toBe('function');
    expect(typeof lensCore.definePack).toBe('function');
    expect(typeof lensCore.RuleEngine).toBe('function');
  });
});
