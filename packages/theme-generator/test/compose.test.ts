import { describe, it, expect } from 'vitest';
import { composePalette, scoreDescription } from '../src/compose.js';
import { emitTokens } from '../src/emit.js';
import { PALETTES } from '../src/palettes.js';
import { darken, hexToRgb, lighten, mix, readableOn } from '../src/color-utils.js';

describe('compose', () => {
  it('ranks palettes by keyword match count', () => {
    const scored = scoreDescription('warm sunset friendly');
    expect(scored[0]!.score).toBeGreaterThan(0);
  });

  it('returns fallback when no descriptors match', () => {
    const pal = composePalette({ description: 'xyzpdq nonsense' });
    expect(pal).toBeTruthy();
    expect(pal.primary).toBeTruthy();
    expect(pal).toBe(PALETTES['ocean-professional']);
  });

  it('returns dark fallback when preferDark and no match', () => {
    const pal = composePalette({ description: 'xyzpdq nonsense', preferDark: true });
    expect(pal).toBe(PALETTES['midnight-tech']);
  });

  it('matches specific palette keys via key-contains bonus', () => {
    const scored = scoreDescription('scandinavian');
    expect(scored[0]!.key).toContain('scandinavian');
  });
});

describe('color-utils', () => {
  it('hexToRgb parses 6-digit hex', () => {
    expect(hexToRgb('#ff00aa')).toEqual([255, 0, 170]);
  });

  it('hexToRgb parses 3-digit shorthand', () => {
    expect(hexToRgb('#abc')).toEqual([170, 187, 204]);
  });

  it('hexToRgb falls back to black on invalid input', () => {
    expect(hexToRgb('not-a-color')).toEqual([0, 0, 0]);
  });

  it('lighten moves a color toward white', () => {
    const lighter = lighten('#333333', 0.3);
    expect(lighter).not.toBe('#333333');
    const [r1] = hexToRgb('#333333');
    const [r2] = hexToRgb(lighter);
    expect(r2).toBeGreaterThan(r1);
  });

  it('darken moves a color toward black', () => {
    const darker = darken('#cccccc', 0.3);
    const [r1] = hexToRgb('#cccccc');
    const [r2] = hexToRgb(darker);
    expect(r2).toBeLessThan(r1);
  });

  it('mix interpolates between two colors', () => {
    expect(mix('#000000', '#ffffff', 0.5)).toBe('#808080');
    expect(mix('#000000', '#ffffff', 0)).toBe('#000000');
    expect(mix('#000000', '#ffffff', 1)).toBe('#ffffff');
  });

  it('readableOn returns dark text for light bg, light text for dark bg', () => {
    expect(readableOn('#ffffff')).toBe('#0a0a0a');
    expect(readableOn('#000000')).toBe('#ffffff');
  });
});

describe('emit', () => {
  it('produces distinct hover and default for primary', () => {
    const t = emitTokens(PALETTES['ocean-professional']!);
    expect(t.color.action.primary.background.hover).not.toBe(
      t.color.action.primary.background.default,
    );
  });

  it('respects dark palettes — hover is lighter than default', () => {
    const t = emitTokens(PALETTES['midnight-tech']!);
    const def = hexToRgb(t.color.action.primary.background.default);
    const hov = hexToRgb(t.color.action.primary.background.hover);
    // average brightness of hover > default for a dark palette
    const defAvg = (def[0] + def[1] + def[2]) / 3;
    const hovAvg = (hov[0] + hov[1] + hov[2]) / 3;
    expect(hovAvg).toBeGreaterThan(defAvg);
  });

  it('produces valid hex strings everywhere', () => {
    const t = emitTokens(PALETTES['sunset-warm']!);
    const json = JSON.stringify(t);
    // only hex colors or the literal "transparent"
    const matches = json.match(/"[^"]+"/g) ?? [];
    for (const m of matches) {
      const val = m.slice(1, -1);
      // keys are strings too, so only validate values that look like colors
      if (val.startsWith('#')) {
        expect(val, `${val} should be 6-digit hex`).toMatch(/^#[0-9a-f]{6}$/);
      }
    }
  });
});
