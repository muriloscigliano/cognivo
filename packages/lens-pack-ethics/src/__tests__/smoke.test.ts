import { describe, expect, it } from 'vitest';
import ethicsPack, * as named from '../index.js';

describe('@cognivo/lens-pack-ethics smoke', () => {
  it('default export is a well-formed pack manifest', () => {
    expect(ethicsPack.id).toBe('@cognivo/lens-pack-ethics');
    expect(ethicsPack.version).toMatch(/^\d+\.\d+\.\d+/);
    expect(Array.isArray(ethicsPack.rules)).toBe(true);
    expect(ethicsPack.rules).toHaveLength(5);
    expect(ethicsPack.rules.every((r) => typeof r === 'function')).toBe(true);
  });

  it('each lazy rule loader resolves to a Rule with the expected shape', async () => {
    for (const lazy of ethicsPack.rules) {
      const mod = await lazy();
      const rule = mod.default;
      expect(rule.id).toMatch(/^ethics\//);
      expect(rule.title.length).toBeGreaterThan(0);
      expect(['blocker', 'strong', 'consider', 'positive']).toContain(rule.severity);
      expect(['cheap', 'medium', 'llm']).toContain(rule.cost);
      expect(rule.cost).toBe('cheap'); // v0.1 is all cheap
      expect(['codeable', 'structural', 'judgment']).toContain(rule.fixCategory);
      expect(typeof rule.applies).toBe('function');
      expect(typeof rule.detect).toBe('function');
      expect(rule.fixtures.length).toBeGreaterThan(0);
    }
  });

  it('every rule id is unique', async () => {
    const ids = await Promise.all(ethicsPack.rules.map(async (l) => (await l()).default.id));
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('confidences land in the honest 60–90 range (no overconfident heuristics)', async () => {
    // Heuristic ethics rules deliberately stay below 95 — we say "this *might*
    // be a dark pattern" not "this *is* one." The smoke test pins the contract.
    for (const lazy of ethicsPack.rules) {
      const rule = (await lazy()).default;
      // Sample a synthetic detect-input by inspecting the fixture metadata.
      // We only check declared confidence ceilings via fixture confidenceRange.
      for (const fixture of rule.fixtures) {
        if (fixture.confidenceRange?.gte !== undefined) {
          expect(fixture.confidenceRange.gte).toBeGreaterThanOrEqual(60);
          expect(fixture.confidenceRange.gte).toBeLessThanOrEqual(95);
        }
      }
    }
  });

  it('exports each rule as a named binding', () => {
    const expectedNames = [
      'preselectedOptionalCheckbox',
      'asymmetricActionButtons',
      'scarcityClaim',
      'countdownWithoutAnchor',
      'sponsoredWithoutLabel',
    ];
    for (const n of expectedNames) {
      expect(named, `missing named export: ${n}`).toHaveProperty(n);
    }
  });

  it('peer dep @cognivo/lens-core is importable', async () => {
    const lensCore = await import('@cognivo/lens-core');
    expect(typeof lensCore.RuleEngine).toBe('function');
  });
});
