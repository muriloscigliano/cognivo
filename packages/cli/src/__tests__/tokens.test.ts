import { describe, expect, it } from 'vitest';
import { findTokens, tokenFor } from '../commands/tokens.js';

describe('cognivo tokens', () => {
  it('finds tokens by name substring', () => {
    const r = findTokens('surface');
    expect(r.exitCode).toBe(0);
    expect(r.text).toContain('--cg-');
  });

  it('suggests a token for a css property', () => {
    const r = tokenFor('color');
    expect(r.exitCode).toBe(0);
    expect(r.text).toContain('--cg-');
  });

  it('exit 2 when nothing matches', () => {
    expect(findTokens('zzz-no-such-token').exitCode).toBe(2);
  });

  describe('dense output', () => {
    it('findTokens dense: one `name value` line per token, no header', () => {
      const r = findTokens('surface', { dense: true });
      expect(r.exitCode).toBe(0);
      expect(r.text).not.toContain('Found');
      expect(r.text).not.toContain('|');
      const lines = r.text.split('\n');
      expect(lines.length).toBeGreaterThan(0);
      expect(lines.every((l) => /^--\S+ .+$/.test(l))).toBe(true);
    });

    it('findTokens dense: < 60% the byte length of non-dense', () => {
      const dense = findTokens('surface', { dense: true });
      const full = findTokens('surface');
      expect(Buffer.byteLength(dense.text)).toBeLessThan(0.6 * Buffer.byteLength(full.text));
    });

    it('tokenFor dense: one `name value` line per token, < 60% bytes', () => {
      const dense = tokenFor('color', { dense: true });
      const full = tokenFor('color');
      expect(dense.exitCode).toBe(0);
      expect(dense.text).not.toContain('|');
      expect(dense.text).not.toContain('[tier');
      const lines = dense.text.split('\n');
      expect(lines.every((l) => /^--\S+ .+$/.test(l))).toBe(true);
      expect(Buffer.byteLength(dense.text)).toBeLessThan(0.6 * Buffer.byteLength(full.text));
    });
  });
});
