import { describe, it, expect } from 'vitest';
import { resolveTokenUsage } from '../../observer/token-resolution';

// These tests exercise resolveTokenUsage against the real tokens manifest
// imported from @cognivo/tokens/manifest/runtime, so they pin the contract
// that the manifest's reverse map and our normalization stay in sync. If the
// manifest changes (e.g. someone retunes --cg-gray-500 to a new hex), these
// tests will catch the mismatch.

describe('resolveTokenUsage — color matches against the real manifest', () => {
  it('matches a known tier-1 palette color', () => {
    // --cg-gray-500 = #71717a → rgb(113, 113, 122)
    const usage = resolveTokenUsage({ color: 'rgb(113, 113, 122)' });
    const colorEntry = usage.find((u) => u.property === 'color');
    expect(colorEntry).toBeDefined();
    expect(colorEntry!.tier).toBe(1);
    expect(colorEntry!.candidates).toContain('--cg-gray-500');
  });

  it('matches the same value via hex input (normalized internally)', () => {
    const usage = resolveTokenUsage({ color: '#71717a' });
    const colorEntry = usage.find((u) => u.property === 'color');
    expect(colorEntry?.tier).toBe(1);
    expect(colorEntry?.resolvedToken).toBe('--cg-gray-500');
  });

  it('matches a known tier-2 semantic token', () => {
    // --cg-color-action-primary-background-default → --cg-brand-primary-500 → #dfff61
    const usage = resolveTokenUsage({ 'background-color': '#dfff61' });
    const bg = usage.find((u) => u.property === 'background-color');
    expect(bg).toBeDefined();
    // Lowest-tier match: --cg-brand-primary-500 (tier 1) sorts before action-primary-* (tier 2).
    // Both should appear in candidates.
    expect(bg!.candidates).toContain('--cg-brand-primary-500');
    expect(bg!.tier).toBe(1);
  });
});

describe('resolveTokenUsage — off-grid values (tier 0)', () => {
  it('returns tier:0 when no token matches', () => {
    const usage = resolveTokenUsage({ color: '#123456' });
    const c = usage.find((u) => u.property === 'color');
    expect(c?.tier).toBe(0);
    expect(c?.candidates).toEqual([]);
    expect(c?.resolvedToken).toBeUndefined();
  });

  it('still emits an entry so off-grid rules can find it', () => {
    const usage = resolveTokenUsage({ color: 'rgb(1, 2, 3)' });
    expect(usage.some((u) => u.property === 'color' && u.tier === 0)).toBe(true);
  });
});

describe('resolveTokenUsage — multi-match candidates', () => {
  it('candidates list is sorted lowest-tier-first', () => {
    // #dfff61 is the value of --cg-brand-primary-500 (tier 1) and several
    // tier-2 semantic tokens that point at it. Tier 1 must come first.
    const usage = resolveTokenUsage({ 'background-color': '#dfff61' });
    const bg = usage.find((u) => u.property === 'background-color');
    expect(bg?.candidates.length).toBeGreaterThan(0);
    expect(bg?.candidates[0]).toBe('--cg-brand-primary-500');
  });
});

describe('resolveTokenUsage — property coverage', () => {
  it('tokenizes color properties: color, background-color, border-color', () => {
    const usage = resolveTokenUsage({
      color: '#000',
      'background-color': '#000',
      'border-color': '#000',
    });
    expect(usage.find((u) => u.property === 'color')).toBeDefined();
    expect(usage.find((u) => u.property === 'background-color')).toBeDefined();
    expect(usage.find((u) => u.property === 'border-color')).toBeDefined();
  });

  it('tokenizes numeric properties: padding, margin, border-radius, font-size', () => {
    const usage = resolveTokenUsage({
      'padding-top': '8px',
      'margin-left': '16px',
      'border-radius': '8px',
      'font-size': '14px',
    });
    expect(usage.find((u) => u.property === 'padding-top')?.rawValue).toBe('8px');
    expect(usage.find((u) => u.property === 'margin-left')?.rawValue).toBe('16px');
    expect(usage.find((u) => u.property === 'border-radius')?.rawValue).toBe('8px');
    expect(usage.find((u) => u.property === 'font-size')?.rawValue).toBe('14px');
  });

  it('matches numeric properties against the manifest (8px → spacing-8)', () => {
    const usage = resolveTokenUsage({ 'padding-top': '8px' });
    const p = usage.find((u) => u.property === 'padding-top');
    expect(p).toBeDefined();
    expect(p!.candidates).toContain('--cg-spacing-8');
  });
});

describe('resolveTokenUsage — value sanitization', () => {
  it('skips inherit / unset / initial / empty', () => {
    const usage = resolveTokenUsage({
      color: 'inherit',
      'background-color': 'unset',
      'border-color': 'initial',
      'padding-top': '',
    });
    expect(usage.length).toBe(0);
  });

  it('treats transparent as a valid color', () => {
    const usage = resolveTokenUsage({ color: 'transparent' });
    const c = usage.find((u) => u.property === 'color');
    expect(c).toBeDefined();
    expect(c?.rawValue).toBe('rgba(0, 0, 0, 0)');
  });

  it('returns empty for empty input', () => {
    expect(resolveTokenUsage({})).toEqual([]);
  });

  it('skips properties that are not in the tokenable list', () => {
    const usage = resolveTokenUsage({
      'will-change': 'transform',
      'pointer-events': 'auto',
      cursor: 'pointer',
    });
    expect(usage.length).toBe(0);
  });
});

describe('resolveTokenUsage — rawValue normalization', () => {
  it('normalizes hex input to canonical rgb()', () => {
    const usage = resolveTokenUsage({ color: '#71717A' });
    expect(usage[0]?.rawValue).toBe('rgb(113, 113, 122)');
  });

  it('normalizes whitespace variants of rgb() to canonical form', () => {
    const a = resolveTokenUsage({ color: 'rgb(0,0,0)' })[0]?.rawValue;
    const b = resolveTokenUsage({ color: 'rgb( 0 , 0 , 0 )' })[0]?.rawValue;
    expect(a).toBe('rgb(0, 0, 0)');
    expect(a).toBe(b);
  });

  it('numeric raw values are preserved as-is (trimmed)', () => {
    const usage = resolveTokenUsage({ 'padding-top': '  8px  ' });
    expect(usage[0]?.rawValue).toBe('8px');
  });

  it('skips colors with unparseable values (returns no entry)', () => {
    const usage = resolveTokenUsage({ color: 'oklch(0.5 0.2 200)' });
    expect(usage.find((u) => u.property === 'color')).toBeUndefined();
  });
});
