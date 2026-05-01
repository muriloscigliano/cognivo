import { describe, it, expect } from 'vitest';
import { parseFixManifest, ParseFixManifestError } from '../../agent/parse-fix-manifest';

const VALID = {
  findingId: 'f1',
  change: {
    kind: 'set-attribute',
    selector: 'img',
    attribute: 'alt',
    value: 'desc',
  },
  summary: 'Set alt',
  rationale: 'because',
  confidence: 70,
  generatedAt: '2026-04-29T00:00:00.000Z',
};

describe('parseFixManifest', () => {
  it('accepts a fully-formed manifest', () => {
    const m = parseFixManifest(VALID);
    expect(m.findingId).toBe('f1');
    expect(m.change.kind).toBe('set-attribute');
  });

  it('honors the expectedFindingId guard', () => {
    expect(() => parseFixManifest(VALID, 'f1')).not.toThrow();
    expect(() => parseFixManifest(VALID, 'OTHER')).toThrow(/findingId mismatch/);
  });

  it('rejects non-object input', () => {
    expect(() => parseFixManifest(null)).toThrow(ParseFixManifestError);
    expect(() => parseFixManifest('string')).toThrow(ParseFixManifestError);
    expect(() => parseFixManifest(123)).toThrow(ParseFixManifestError);
  });

  it('rejects missing findingId / summary / rationale / generatedAt', () => {
    expect(() => parseFixManifest({ ...VALID, findingId: undefined })).toThrow(/findingId/);
    expect(() => parseFixManifest({ ...VALID, summary: '' })).toThrow(/summary/);
    expect(() => parseFixManifest({ ...VALID, rationale: 42 })).toThrow(/rationale/);
    expect(() => parseFixManifest({ ...VALID, generatedAt: '' })).toThrow(/generatedAt/);
  });

  it('rejects out-of-range confidence', () => {
    expect(() => parseFixManifest({ ...VALID, confidence: -1 })).toThrow(/confidence/);
    expect(() => parseFixManifest({ ...VALID, confidence: 101 })).toThrow(/confidence/);
    expect(() => parseFixManifest({ ...VALID, confidence: 'high' })).toThrow(/confidence/);
  });

  it('rejects unknown change.kind', () => {
    expect(() =>
      parseFixManifest({ ...VALID, change: { ...VALID.change, kind: 'invent-something' } })
    ).toThrow(/change.kind/);
  });

  it('parses replace-text correctly', () => {
    const m = parseFixManifest({
      ...VALID,
      change: { kind: 'replace-text', selector: 'span', from: 'old', to: 'new' },
    });
    if (m.change.kind !== 'replace-text') throw new Error('bad kind');
    expect(m.change.from).toBe('old');
    expect(m.change.to).toBe('new');
  });

  it('parses set-style correctly with declarations object', () => {
    const m = parseFixManifest({
      ...VALID,
      change: {
        kind: 'set-style',
        selector: 'div',
        declarations: { color: 'rgb(0, 0, 0)', 'background-color': '#fff' },
      },
    });
    if (m.change.kind !== 'set-style') throw new Error('bad kind');
    expect(m.change.declarations['color']).toBe('rgb(0, 0, 0)');
  });

  it('rejects set-style with non-string declaration values', () => {
    expect(() =>
      parseFixManifest({
        ...VALID,
        change: { kind: 'set-style', selector: 'div', declarations: { color: 42 } },
      })
    ).toThrow(/declarations/);
  });

  it('parses replace-token correctly', () => {
    const m = parseFixManifest({
      ...VALID,
      change: {
        kind: 'replace-token',
        selector: 'cg-button',
        property: 'color',
        from: '--cg-gray-500',
        to: '--cg-color-text',
      },
    });
    if (m.change.kind !== 'replace-token') throw new Error('bad kind');
    expect(m.change.property).toBe('color');
  });

  it('rejects change without selector', () => {
    expect(() =>
      parseFixManifest({
        ...VALID,
        change: { kind: 'set-attribute', attribute: 'alt', value: '' },
      })
    ).toThrow(/selector/);
  });

  it('preserves the offending raw input on the thrown error', () => {
    try {
      parseFixManifest({ ...VALID, confidence: 200 });
      throw new Error('expected throw');
    } catch (err) {
      expect(err).toBeInstanceOf(ParseFixManifestError);
      const e = err as ParseFixManifestError;
      expect(e.raw).toBeDefined();
    }
  });
});
