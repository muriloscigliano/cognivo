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
});
