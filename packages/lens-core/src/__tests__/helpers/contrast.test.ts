import { describe, it, expect } from 'vitest';
import type { SceneNode } from '../../types/scene-graph';
import { computeContrast } from '../../helpers/contrast';

const ZERO_RECT = { x: 0, y: 0, width: 0, height: 0, top: 0, left: 0, right: 0, bottom: 0 };

function makeNode(color: string, bg?: string): SceneNode {
  const computedStyle: Record<string, string> = { color };
  if (bg !== undefined) computedStyle['background-color'] = bg;
  return {
    id: 'n',
    tag: 'div',
    attributes: {},
    rect: ZERO_RECT,
    computedStyle,
    tokenUsage: [],
    children: [],
    visible: true,
  };
}

function bgNode(bg: string): SceneNode {
  return {
    id: 'bg',
    tag: 'div',
    attributes: {},
    rect: ZERO_RECT,
    computedStyle: { 'background-color': bg },
    tokenUsage: [],
    children: [],
    visible: true,
  };
}

describe('computeContrast — black/white sanity', () => {
  it('black on white = 21:1 (WCAG max)', () => {
    const r = computeContrast(makeNode('#000'), [bgNode('#fff')], 'AA');
    expect(r.ratio).toBe(21);
    expect(r.passes).toBe(true);
  });

  it('white on white = 1:1 (fails everything)', () => {
    const r = computeContrast(makeNode('#fff'), [bgNode('#fff')], 'AA');
    expect(r.ratio).toBe(1);
    expect(r.passes).toBe(false);
  });

  it('symmetric: white on black = same as black on white', () => {
    const a = computeContrast(makeNode('#000'), [bgNode('#fff')], 'AA').ratio;
    const b = computeContrast(makeNode('#fff'), [bgNode('#000')], 'AA').ratio;
    expect(a).toBe(b);
  });
});

describe('computeContrast — known WebAIM-published reference values (±0.1)', () => {
  // Reference values from WebAIM's contrast checker
  it('#777 on #fff → 4.48:1', () => {
    const r = computeContrast(makeNode('#777'), [bgNode('#fff')], 'AA');
    expect(r.ratio).toBeGreaterThanOrEqual(4.4);
    expect(r.ratio).toBeLessThanOrEqual(4.6);
  });

  it('#767676 on #fff → ≈4.54:1 (just-passes AA)', () => {
    const r = computeContrast(makeNode('#767676'), [bgNode('#fff')], 'AA');
    expect(r.ratio).toBeGreaterThanOrEqual(4.5);
    expect(r.passes).toBe(true);
  });

  it('#7a7a7a on #fff → ≈4.34:1 (just-fails AA)', () => {
    const r = computeContrast(makeNode('#7a7a7a'), [bgNode('#fff')], 'AA');
    expect(r.ratio).toBeLessThan(4.5);
    expect(r.passes).toBe(false);
  });

  it('#0000ff on #fff → ≈8.59:1', () => {
    const r = computeContrast(makeNode('#0000ff'), [bgNode('#fff')], 'AA');
    expect(r.ratio).toBeGreaterThan(8);
    expect(r.ratio).toBeLessThan(9);
  });

  it('#ff0000 on #fff → ≈4.0:1 (fails AA)', () => {
    const r = computeContrast(makeNode('#ff0000'), [bgNode('#fff')], 'AA');
    expect(r.ratio).toBeGreaterThan(3.9);
    expect(r.ratio).toBeLessThan(4.1);
    expect(r.passes).toBe(false);
  });
});

describe('computeContrast — WCAG levels', () => {
  it('AA threshold = 4.5', () => {
    const r = computeContrast(makeNode('#777'), [bgNode('#fff')], 'AA');
    expect(r.threshold).toBe(4.5);
  });

  it('AA-large threshold = 3.0', () => {
    const r = computeContrast(makeNode('#888'), [bgNode('#fff')], 'AA-large');
    expect(r.threshold).toBe(3.0);
    expect(r.passes).toBe(true); // #888 on white = ~3.5:1, passes large
  });

  it('AAA threshold = 7.0', () => {
    const r = computeContrast(makeNode('#666'), [bgNode('#fff')], 'AAA');
    expect(r.threshold).toBe(7.0);
  });

  it('AAA-large threshold = 4.5', () => {
    const r = computeContrast(makeNode('#777'), [bgNode('#fff')], 'AAA-large');
    expect(r.threshold).toBe(4.5);
  });

  it('passes at AA but fails at AAA for mid-gray', () => {
    const aa = computeContrast(makeNode('#666'), [bgNode('#fff')], 'AA');
    const aaa = computeContrast(makeNode('#666'), [bgNode('#fff')], 'AAA');
    expect(aa.passes).toBe(true);
    expect(aaa.passes).toBe(false);
  });
});

describe('computeContrast — ancestor walk', () => {
  it('uses nearest non-transparent ancestor', () => {
    const r = computeContrast(
      makeNode('#000'),
      [bgNode('transparent'), bgNode('#fff')],
      'AA'
    );
    expect(r.ratio).toBe(21);
    expect(r.inferredBackground).toBe(false);
  });

  it('walks past multiple transparent ancestors', () => {
    const r = computeContrast(
      makeNode('#000'),
      [bgNode('transparent'), bgNode('rgba(0, 0, 0, 0)'), bgNode('#fff')],
      'AA'
    );
    expect(r.ratio).toBe(21);
  });

  it('defaults to white when all ancestors are transparent', () => {
    const r = computeContrast(makeNode('#000'), [bgNode('transparent')], 'AA');
    expect(r.inferredBackground).toBe(true);
    expect(r.background).toBe('rgb(255, 255, 255)');
    expect(r.ratio).toBe(21);
  });

  it('defaults to white when ancestor chain is empty', () => {
    const r = computeContrast(makeNode('#000'), [], 'AA');
    expect(r.inferredBackground).toBe(true);
    expect(r.ratio).toBe(21);
  });
});

describe('computeContrast — color formats', () => {
  it('hex 6-digit, hex 3-digit, rgb(), rgba() all give the same result', () => {
    const a = computeContrast(makeNode('#000000'), [bgNode('#ffffff')], 'AA').ratio;
    const b = computeContrast(makeNode('#000'), [bgNode('#fff')], 'AA').ratio;
    const c = computeContrast(makeNode('rgb(0, 0, 0)'), [bgNode('rgb(255, 255, 255)')], 'AA').ratio;
    const d = computeContrast(makeNode('rgba(0, 0, 0, 1)'), [bgNode('rgba(255, 255, 255, 1)')], 'AA').ratio;
    expect(a).toBe(b);
    expect(b).toBe(c);
    expect(c).toBe(d);
  });

  it('handles rgba foreground by compositing over background', () => {
    // 50% black over white → mid-gray-ish; ratio should be lower than full black/white
    const fullBlack = computeContrast(makeNode('#000'), [bgNode('#fff')], 'AA').ratio;
    const halfBlack = computeContrast(makeNode('rgba(0, 0, 0, 0.5)'), [bgNode('#fff')], 'AA').ratio;
    expect(halfBlack).toBeLessThan(fullBlack);
    expect(halfBlack).toBeGreaterThan(1);
  });
});

describe('computeContrast — degenerate inputs', () => {
  it('unparseable foreground returns ratio 0', () => {
    const r = computeContrast(makeNode('garbage-color'), [bgNode('#fff')], 'AA');
    expect(r.ratio).toBe(0);
    expect(r.passes).toBe(false);
  });

  it('empty foreground returns ratio 0', () => {
    const r = computeContrast(makeNode(''), [bgNode('#fff')], 'AA');
    expect(r.ratio).toBe(0);
  });

  it('passes / threshold are always populated even on failure', () => {
    const r = computeContrast(makeNode('garbage'), [bgNode('#fff')], 'AAA');
    expect(r.threshold).toBe(7.0);
    expect(r.passes).toBe(false);
  });
});

describe('computeContrast — result shape', () => {
  it('foreground and background are canonical rgb()/rgba() strings', () => {
    const r = computeContrast(makeNode('#000'), [bgNode('#fff')], 'AA');
    expect(r.foreground).toMatch(/^rgb\(/);
    expect(r.background).toMatch(/^rgb\(/);
  });

  it('ratio is always rounded to two decimals', () => {
    const r = computeContrast(makeNode('#777'), [bgNode('#fff')], 'AA');
    // toFixed(2) representation should not introduce more decimals
    expect(r.ratio.toString()).toMatch(/^\d+(\.\d{1,2})?$/);
  });
});
