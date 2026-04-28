import { describe, it, expect } from 'vitest';
import { FixVerifier, checkTokenValidity, checkSchemaValidity } from '../../verifier';
import type { FixManifest } from '../../types/fix';

function manifest(overrides: Partial<FixManifest>): FixManifest {
  return {
    ruleId: 'test/rule',
    findingId: 'test-finding',
    confidence: 90,
    origin: 'llm-verified',
    changes: [],
    preview: {},
    rollbackable: true,
    reviewRequired: true,
    citations: [],
    ...overrides,
  };
}

describe('checkTokenValidity', () => {
  it('passes for tokenized CSS', () => {
    const m = manifest({
      preview: { cssOverrides: ':host { color: var(--cg-color-text-primary); }' },
    });
    expect(checkTokenValidity(m).passed).toBe(true);
  });

  it('fails on raw hex values', () => {
    const m = manifest({
      preview: { cssOverrides: ':host { color: #888; }' },
    });
    const result = checkTokenValidity(m);
    expect(result.passed).toBe(false);
    expect(result.reason).toMatch(/hex/);
  });

  it('fails on raw rgb() values', () => {
    const m = manifest({
      preview: { cssOverrides: ':host { color: rgb(120 120 120); }' },
    });
    expect(checkTokenValidity(m).passed).toBe(false);
  });

  it('fails on banned tier-1 tokens', () => {
    const m = manifest({
      preview: { cssOverrides: ':host { color: var(--cg-gray-500); }' },
    });
    const result = checkTokenValidity(m);
    expect(result.passed).toBe(false);
    expect(result.reason).toMatch(/--cg-gray-/);
  });

  it('fails on banned brand tokens', () => {
    const m = manifest({
      preview: { cssOverrides: ':host { color: var(--cg-brand-ai-accent); }' },
    });
    expect(checkTokenValidity(m).passed).toBe(false);
  });
});

describe('checkSchemaValidity', () => {
  it('passes when no attribute changes are present', () => {
    expect(checkSchemaValidity(manifest({})).passed).toBe(true);
  });

  it('passes for valid ARIA roles', () => {
    const m = manifest({
      preview: {
        attributeChanges: [{ targetNodeId: 'n', attribute: 'role', value: 'button' }],
      },
    });
    expect(checkSchemaValidity(m).passed).toBe(true);
  });

  it('fails for invalid ARIA roles', () => {
    const m = manifest({
      preview: {
        attributeChanges: [{ targetNodeId: 'n', attribute: 'role', value: 'fancybutton' }],
      },
    });
    const result = checkSchemaValidity(m);
    expect(result.passed).toBe(false);
    expect(result.reason).toMatch(/role/);
  });

  it('passes for valid aria-hidden boolean', () => {
    const m = manifest({
      preview: {
        attributeChanges: [{ targetNodeId: 'n', attribute: 'aria-hidden', value: 'true' }],
      },
    });
    expect(checkSchemaValidity(m).passed).toBe(true);
  });

  it('fails for invalid aria-hidden value', () => {
    const m = manifest({
      preview: {
        attributeChanges: [{ targetNodeId: 'n', attribute: 'aria-hidden', value: 'maybe' }],
      },
    });
    expect(checkSchemaValidity(m).passed).toBe(false);
  });

  it('passes for valid aria-pressed tristate', () => {
    const m = manifest({
      preview: {
        attributeChanges: [{ targetNodeId: 'n', attribute: 'aria-pressed', value: 'mixed' }],
      },
    });
    expect(checkSchemaValidity(m).passed).toBe(true);
  });

  it('fails for invalid aria-pressed value', () => {
    const m = manifest({
      preview: {
        attributeChanges: [{ targetNodeId: 'n', attribute: 'aria-pressed', value: 'yes' }],
      },
    });
    expect(checkSchemaValidity(m).passed).toBe(false);
  });

  it('passes for null (attribute removal)', () => {
    const m = manifest({
      preview: {
        attributeChanges: [{ targetNodeId: 'n', attribute: 'role', value: null }],
      },
    });
    expect(checkSchemaValidity(m).passed).toBe(true);
  });
});

describe('FixVerifier orchestrator', () => {
  it('passes a clean manifest', () => {
    const m = manifest({
      preview: { cssOverrides: ':host { color: var(--cg-color-text-primary); }' },
    });
    const verifier = new FixVerifier();
    const verdict = verifier.verify(m);
    expect(verdict.passed).toBe(true);
    expect(verdict.results.every((r) => r.passed)).toBe(true);
  });

  it('fails when token validity fails', () => {
    const m = manifest({
      preview: { cssOverrides: ':host { color: #888; }' },
    });
    const verifier = new FixVerifier();
    const verdict = verifier.verify(m);
    expect(verdict.passed).toBe(false);
    const tokenResult = verdict.results.find((r) => r.checkId === 'token-validity');
    expect(tokenResult!.passed).toBe(false);
  });

  it('reports each check independently', () => {
    const m = manifest({
      preview: {
        cssOverrides: ':host { color: #888; }',
        attributeChanges: [{ targetNodeId: 'n', attribute: 'role', value: 'fancybutton' }],
      },
    });
    const verifier = new FixVerifier();
    const verdict = verifier.verify(m);
    expect(verdict.passed).toBe(false);
    const failed = verdict.results.filter((r) => !r.passed);
    expect(failed.length).toBeGreaterThanOrEqual(2);
  });

  it('skipChecks omits a default check', () => {
    const m = manifest({
      preview: { cssOverrides: ':host { color: #888; }' },
    });
    const verifier = new FixVerifier({ skipChecks: ['token-validity'] });
    const verdict = verifier.verify(m);
    expect(verdict.passed).toBe(true);
    expect(verdict.results.find((r) => r.checkId === 'token-validity')).toBeUndefined();
  });
});
