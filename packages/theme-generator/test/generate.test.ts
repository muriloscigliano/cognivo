import { describe, it, expect } from 'vitest';
import { generateTheme } from '../src/index.js';
import { scoreDescription } from '../src/compose.js';
import { PALETTES } from '../src/palettes.js';

describe('theme-generator', () => {
  it('returns tokens for a simple description', () => {
    const theme = generateTheme('ocean professional') as any;
    expect(theme).toHaveProperty('color.action.primary.background.default');
    expect(typeof theme.color.action.primary.background.default).toBe('string');
    expect(theme.color.action.primary.background.default).toMatch(/^#[0-9a-f]{6}$/);
  });

  it('respects preferDark flag with raw output', () => {
    const theme = generateTheme({ description: 'anything', preferDark: true, raw: true });
    expect((theme as any).dark).toBe(true);
  });

  it('falls back to a default palette for empty description', () => {
    const theme = generateTheme('') as any;
    expect(theme).toHaveProperty('color.action.primary.background.default');
  });

  it('scores ocean descriptors higher for ocean palette', () => {
    const scored = scoreDescription('ocean blue corporate');
    expect(scored[0]!.key).toContain('ocean');
    expect(scored[0]!.score).toBeGreaterThan(0);
  });

  it('emits hover and active variants derived from primary', () => {
    const theme = generateTheme({ description: 'forest calm', raw: false }) as any;
    const { default: def, hover, active } = theme.color.action.primary.background;
    expect(hover).not.toBe(def);
    expect(active).not.toBe(def);
    expect(hover).not.toBe(active);
  });

  it('exposes surface, text, border, and accent groups', () => {
    const theme = generateTheme('slate professional') as any;
    expect(theme.color.surface.base.background).toMatch(/^#/);
    expect(theme.color.text.default).toMatch(/^#/);
    expect(theme.color.border.default).toMatch(/^#/);
    expect(theme.color.accent.background).toMatch(/^#/);
  });

  it('is deterministic — same input returns identical output', () => {
    const a = JSON.stringify(generateTheme('warm ocean professional'));
    const b = JSON.stringify(generateTheme('warm ocean professional'));
    expect(a).toBe(b);
  });

  it('preferDark promotes a dark palette when one matches', () => {
    const pal = generateTheme({ description: 'cyberpunk neon', preferDark: true, raw: true }) as any;
    expect(pal.dark).toBe(true);
    expect(pal.primary).toBe(PALETTES['cyberpunk-neon']!.primary);
  });

  it('accepts comma-separated descriptions', () => {
    const theme = generateTheme('warm, ocean, professional, minimalist') as any;
    expect(theme.color.action.primary.background.default).toMatch(/^#/);
  });

  it('has at least 80 palettes in the library', () => {
    expect(Object.keys(PALETTES).length).toBeGreaterThanOrEqual(80);
  });

  it('every palette has all required fields', () => {
    for (const [key, p] of Object.entries(PALETTES)) {
      expect(p.primary, `${key}.primary`).toMatch(/^#[0-9a-f]{6}$/);
      expect(p.secondary, `${key}.secondary`).toMatch(/^#[0-9a-f]{6}$/);
      expect(p.accent, `${key}.accent`).toMatch(/^#[0-9a-f]{6}$/);
      expect(p.background, `${key}.background`).toMatch(/^#[0-9a-f]{6}$/);
      expect(p.surface, `${key}.surface`).toMatch(/^#[0-9a-f]{6}$/);
      expect(p.text, `${key}.text`).toMatch(/^#[0-9a-f]{6}$/);
      expect(p.muted, `${key}.muted`).toMatch(/^#[0-9a-f]{6}$/);
      expect(p.border, `${key}.border`).toMatch(/^#[0-9a-f]{6}$/);
      expect(p.keywords.length, `${key}.keywords`).toBeGreaterThan(0);
    }
  });
});
