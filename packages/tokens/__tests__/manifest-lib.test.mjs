import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  parseCss,
  normalizeColor,
  classifyTier,
  classifyCategory,
  resolveVarChain,
  buildManifest,
  buildReverseMap,
} from '../scripts/manifest-lib.mjs';

// ---------------------------------------------------------------------------
// parseCss
// ---------------------------------------------------------------------------

test('parseCss extracts a single :root block', () => {
  const { themes } = parseCss(`:root {
    --cg-gray-500: #71717a;
    --cg-spacing-8: 8px;
  }`);
  assert.equal(themes[':root']['--cg-gray-500'], '#71717a');
  assert.equal(themes[':root']['--cg-spacing-8'], '8px');
});

test('parseCss merges multiple :root blocks', () => {
  const { themes } = parseCss(`
    :root { --cg-a: 1; }
    :root { --cg-b: 2; }
  `);
  assert.equal(themes[':root']['--cg-a'], '1');
  assert.equal(themes[':root']['--cg-b'], '2');
});

test('parseCss captures [data-theme] block separately', () => {
  const { themes, selectors } = parseCss(`
    :root { --cg-x: light; }
    [data-theme="dark"] { --cg-x: dark; }
  `);
  assert.equal(themes[':root']['--cg-x'], 'light');
  assert.equal(themes['[data-theme="dark"]']['--cg-x'], 'dark');
  assert.deepEqual(selectors, [':root', '[data-theme="dark"]']);
});

test('parseCss ignores non-cg declarations', () => {
  const { themes } = parseCss(`:root { --cg-a: 1; --other: ignore; color: red; }`);
  assert.deepEqual(Object.keys(themes[':root']), ['--cg-a']);
});

test('parseCss handles values with var() and commas', () => {
  const { themes } = parseCss(
    `:root { --cg-a: var(--cg-b); --cg-c: 0 1px 2px rgba(0, 0, 0, 0.1); }`
  );
  assert.equal(themes[':root']['--cg-a'], 'var(--cg-b)');
  assert.equal(themes[':root']['--cg-c'], '0 1px 2px rgba(0, 0, 0, 0.1)');
});

// ---------------------------------------------------------------------------
// normalizeColor
// ---------------------------------------------------------------------------

test('normalizeColor: 6-digit hex', () => {
  assert.equal(normalizeColor('#71717a'), 'rgb(113, 113, 122)');
  assert.equal(normalizeColor('#000000'), 'rgb(0, 0, 0)');
  assert.equal(normalizeColor('#ffffff'), 'rgb(255, 255, 255)');
});

test('normalizeColor: 3-digit hex expanded', () => {
  assert.equal(normalizeColor('#000'), 'rgb(0, 0, 0)');
  assert.equal(normalizeColor('#fff'), 'rgb(255, 255, 255)');
  assert.equal(normalizeColor('#abc'), 'rgb(170, 187, 204)');
});

test('normalizeColor: 8-digit hex (RRGGBBAA)', () => {
  assert.equal(normalizeColor('#000000ff'), 'rgb(0, 0, 0)');
  assert.equal(normalizeColor('#00000080'), 'rgba(0, 0, 0, 0.502)');
  assert.equal(normalizeColor('#00000000'), 'rgba(0, 0, 0, 0)');
});

test('normalizeColor: 4-digit hex (RGBA)', () => {
  assert.equal(normalizeColor('#000f'), 'rgb(0, 0, 0)');
  assert.equal(normalizeColor('#0008'), 'rgba(0, 0, 0, 0.533)');
});

test('normalizeColor: rgb()', () => {
  assert.equal(normalizeColor('rgb(113, 113, 122)'), 'rgb(113, 113, 122)');
  assert.equal(normalizeColor('rgb(113,113,122)'), 'rgb(113, 113, 122)');
  assert.equal(normalizeColor('rgb( 113 , 113 , 122 )'), 'rgb(113, 113, 122)');
});

test('normalizeColor: rgba()', () => {
  assert.equal(normalizeColor('rgba(0, 0, 0, 0.1)'), 'rgba(0, 0, 0, 0.1)');
  assert.equal(normalizeColor('rgba(0, 0, 0, 1)'), 'rgb(0, 0, 0)');
  assert.equal(normalizeColor('rgba(0, 0, 0, 0)'), 'rgba(0, 0, 0, 0)');
});

test('normalizeColor: transparent → rgba(0,0,0,0)', () => {
  assert.equal(normalizeColor('transparent'), 'rgba(0, 0, 0, 0)');
});

test('normalizeColor: currentColor / inherit → null (caller handles)', () => {
  assert.equal(normalizeColor('currentColor'), null);
  assert.equal(normalizeColor('inherit'), null);
});

test('normalizeColor: non-color values → null', () => {
  assert.equal(normalizeColor('8px'), null);
  assert.equal(normalizeColor('1.5'), null);
  assert.equal(normalizeColor('100ms'), null);
  assert.equal(normalizeColor('"Inter", sans-serif'), null);
});

test('normalizeColor: malformed hex throws', () => {
  assert.throws(() => normalizeColor('#1'), /malformed hex/);
  assert.throws(() => normalizeColor('#12'), /malformed hex/);
  assert.throws(() => normalizeColor('#1234567'), /malformed hex/);
  assert.throws(() => normalizeColor('#123456789'), /malformed hex/);
});

test('normalizeColor: malformed rgb() throws', () => {
  assert.throws(() => normalizeColor('rgb(1, 2)'), /3.4 components/);
  assert.throws(() => normalizeColor('rgba(1, 2, 3, 4, 5)'), /3.4 components/);
});

// ---------------------------------------------------------------------------
// classifyTier
// ---------------------------------------------------------------------------

test('classifyTier: tier 3 components', () => {
  assert.equal(classifyTier('--cg-component-button-radius-md'), 3);
  assert.equal(classifyTier('--cg-component-input-height-sm'), 3);
  assert.equal(classifyTier('--cg-component-card-padding-md'), 3);
});

test('classifyTier: tier 2 semantic colors', () => {
  assert.equal(classifyTier('--cg-color-action-primary-background-default'), 2);
  assert.equal(classifyTier('--cg-color-surface-base-text'), 2);
  assert.equal(classifyTier('--cg-color-status-error-text-default'), 2);
  assert.equal(classifyTier('--cg-color-input-border-hover'), 2);
});

test('classifyTier: tier 2 shadows + overlays + interaction', () => {
  assert.equal(classifyTier('--cg-shadow-elevation-md'), 2);
  assert.equal(classifyTier('--cg-overlay-accent-strong'), 2);
  assert.equal(classifyTier('--cg-focus-ring-offset'), 2);
  assert.equal(classifyTier('--cg-interaction-press-scale'), 2);
});

test('classifyTier: tier 1 palette', () => {
  assert.equal(classifyTier('--cg-gray-500'), 1);
  assert.equal(classifyTier('--cg-red-400'), 1);
  assert.equal(classifyTier('--cg-blue-100'), 1);
  assert.equal(classifyTier('--cg-purple-900'), 1);
});

test('classifyTier: tier 1 brand', () => {
  assert.equal(classifyTier('--cg-brand-primary-500'), 1);
  assert.equal(classifyTier('--cg-brand-ai-accent'), 1);
});

test('classifyTier: tier 1 primitives', () => {
  assert.equal(classifyTier('--cg-spacing-8'), 1);
  assert.equal(classifyTier('--cg-font-size-md'), 1);
  assert.equal(classifyTier('--cg-font-weight-medium'), 1);
  assert.equal(classifyTier('--cg-border-radius-100'), 1);
  assert.equal(classifyTier('--cg-border-width-50'), 1);
  assert.equal(classifyTier('--cg-line-height-normal'), 1);
  assert.equal(classifyTier('--cg-icon-size-100'), 1);
  assert.equal(classifyTier('--cg-transition-duration-fast'), 1);
  assert.equal(classifyTier('--cg-letter-spacing-wide'), 1);
});

test('classifyTier: throws on unknown pattern', () => {
  assert.throws(() => classifyTier('--cg-unknown-thing'), /unknown tier/);
  assert.throws(() => classifyTier('--not-cg-thing'), /unknown tier/);
});

// ---------------------------------------------------------------------------
// classifyCategory
// ---------------------------------------------------------------------------

test('classifyCategory: color from hex / rgb / rgba / transparent', () => {
  assert.equal(classifyCategory('--cg-x', '#71717a'), 'color');
  assert.equal(classifyCategory('--cg-x', 'rgb(0, 0, 0)'), 'color');
  assert.equal(classifyCategory('--cg-x', 'rgba(0, 0, 0, 0.5)'), 'color');
  assert.equal(classifyCategory('--cg-x', 'transparent'), 'color');
});

test('classifyCategory: numeric — px / rem / unitless / time', () => {
  assert.equal(classifyCategory('--cg-x', '8px'), 'numeric');
  assert.equal(classifyCategory('--cg-x', '0.5rem'), 'numeric');
  assert.equal(classifyCategory('--cg-x', '1.5'), 'numeric');
  assert.equal(classifyCategory('--cg-x', '500'), 'numeric');
  assert.equal(classifyCategory('--cg-x', '100ms'), 'numeric');
  assert.equal(classifyCategory('--cg-x', '2s'), 'numeric');
});

test('classifyCategory: compound — shadow specs', () => {
  assert.equal(
    classifyCategory('--cg-x', '0 1px 2px rgba(0, 0, 0, 0.1)'),
    'compound'
  );
  assert.equal(
    classifyCategory('--cg-x', '0 0 0 2px var(--cg-color-focus-ring)'),
    'compound'
  );
});

test('classifyCategory: easing — cubic-bezier + ease-* + steps', () => {
  assert.equal(classifyCategory('--cg-x', 'cubic-bezier(0.4, 0, 0.2, 1)'), 'easing');
  assert.equal(classifyCategory('--cg-x', 'ease-in-out'), 'easing');
  assert.equal(classifyCategory('--cg-x', 'linear'), 'easing');
  assert.equal(classifyCategory('--cg-x', 'steps(4, end)'), 'easing');
});

test('classifyCategory: keyword — cursor / inherit / font stack', () => {
  assert.equal(classifyCategory('--cg-x', 'pointer'), 'keyword');
  assert.equal(classifyCategory('--cg-x', 'not-allowed'), 'keyword');
  assert.equal(classifyCategory('--cg-x', '"Inter", sans-serif'), 'keyword');
});

test('classifyCategory: throws on empty', () => {
  assert.throws(() => classifyCategory('--cg-x', ''), /empty resolved value/);
  assert.throws(() => classifyCategory('--cg-x', '   '), /empty resolved value/);
});

// ---------------------------------------------------------------------------
// resolveVarChain
// ---------------------------------------------------------------------------

test('resolveVarChain: leaf token (no var)', () => {
  const decls = { '--cg-a': '#fff' };
  const r = resolveVarChain('--cg-a', decls);
  assert.equal(r.resolvedValue, '#fff');
  assert.deepEqual(r.varChain, ['--cg-a']);
});

test('resolveVarChain: 1 hop', () => {
  const decls = { '--cg-a': 'var(--cg-b)', '--cg-b': '#fff' };
  const r = resolveVarChain('--cg-a', decls);
  assert.equal(r.resolvedValue, '#fff');
  assert.deepEqual(r.varChain, ['--cg-a', '--cg-b']);
});

test('resolveVarChain: 3 hops', () => {
  const decls = {
    '--cg-a': 'var(--cg-b)',
    '--cg-b': 'var(--cg-c)',
    '--cg-c': 'var(--cg-d)',
    '--cg-d': '#fff',
  };
  const r = resolveVarChain('--cg-a', decls);
  assert.equal(r.resolvedValue, '#fff');
  assert.deepEqual(r.varChain, ['--cg-a', '--cg-b', '--cg-c', '--cg-d']);
});

test('resolveVarChain: cycle throws', () => {
  const decls = { '--cg-a': 'var(--cg-b)', '--cg-b': 'var(--cg-a)' };
  assert.throws(() => resolveVarChain('--cg-a', decls), /cycle/);
});

test('resolveVarChain: undefined token throws', () => {
  assert.throws(() => resolveVarChain('--cg-missing', {}), /undefined token/);
});

test('resolveVarChain: unresolvable var() with no fallback throws', () => {
  const decls = { '--cg-a': 'var(--cg-missing)' };
  assert.throws(() => resolveVarChain('--cg-a', decls), /no fallback/);
});

test('resolveVarChain: var() with fallback uses fallback when target missing', () => {
  const decls = { '--cg-a': 'var(--cg-missing, #fff)' };
  const r = resolveVarChain('--cg-a', decls);
  assert.equal(r.resolvedValue, '#fff');
});

test('resolveVarChain: compound shadow value not walked into', () => {
  const decls = {
    '--cg-shadow-thing': '0 1px 2px var(--cg-color)',
    '--cg-color': '#000',
  };
  const r = resolveVarChain('--cg-shadow-thing', decls);
  // The compound value contains var() but is not a pure var() reference, so
  // resolveVarChain returns it as-is. Runtime is responsible for handling
  // shadow specs as opaque strings in v1.
  assert.equal(r.resolvedValue, '0 1px 2px var(--cg-color)');
  assert.deepEqual(r.varChain, ['--cg-shadow-thing']);
});

// ---------------------------------------------------------------------------
// buildManifest
// ---------------------------------------------------------------------------

const SAMPLE_CSS = `
:root {
  --cg-gray-500: #71717a;
  --cg-gray-800: #27272a;
  --cg-spacing-8: 8px;
  --cg-color-surface-base-text: var(--cg-gray-800);
  --cg-component-button-radius-md: var(--cg-border-radius-100);
  --cg-border-radius-100: 8px;
  --cg-shadow-elevation-md: 0 4px 6px rgba(0, 0, 0, 0.1);
}
[data-theme="dark"] {
  --cg-color-surface-base-text: var(--cg-gray-500);
}
`;

test('buildManifest: produces entries for every name', () => {
  const m = buildManifest(parseCss(SAMPLE_CSS));
  const names = m.entries.map((e) => e.name);
  assert.ok(names.includes('--cg-gray-500'));
  assert.ok(names.includes('--cg-component-button-radius-md'));
  assert.ok(names.includes('--cg-color-surface-base-text'));
});

test('buildManifest: sorted by tier ascending then name', () => {
  const m = buildManifest(parseCss(SAMPLE_CSS));
  for (let i = 1; i < m.entries.length; i++) {
    const prev = m.entries[i - 1];
    const cur = m.entries[i];
    assert.ok(
      prev.tier < cur.tier || (prev.tier === cur.tier && prev.name <= cur.name),
      `entries out of order at index ${i}: ${prev.name} (t${prev.tier}) before ${cur.name} (t${cur.tier})`
    );
  }
});

test('buildManifest: theme block carries override resolved value', () => {
  const m = buildManifest(parseCss(SAMPLE_CSS));
  const text = m.entries.find((e) => e.name === '--cg-color-surface-base-text');
  assert.equal(text.themes.default.resolvedValue, 'rgb(39, 39, 42)');
  assert.equal(text.themes.dark.resolvedValue, 'rgb(113, 113, 122)');
});

test('buildManifest: hash is stable across runs', () => {
  const a = buildManifest(parseCss(SAMPLE_CSS));
  const b = buildManifest(parseCss(SAMPLE_CSS));
  assert.equal(a.hash, b.hash);
  assert.equal(a.hash.length, 8);
});

test('buildManifest: hash changes when a value changes', () => {
  const a = buildManifest(parseCss(SAMPLE_CSS));
  const b = buildManifest(parseCss(SAMPLE_CSS.replace('#71717a', '#727272')));
  assert.notEqual(a.hash, b.hash);
});

test('buildManifest: every color entry is normalized', () => {
  const m = buildManifest(parseCss(SAMPLE_CSS));
  const gray500 = m.entries.find((e) => e.name === '--cg-gray-500');
  assert.equal(gray500.themes.default.resolvedValue, 'rgb(113, 113, 122)');
});

test('buildManifest: varChain captures the full chain', () => {
  const m = buildManifest(parseCss(SAMPLE_CSS));
  const radius = m.entries.find((e) => e.name === '--cg-component-button-radius-md');
  assert.deepEqual(radius.themes.default.varChain, [
    '--cg-component-button-radius-md',
    '--cg-border-radius-100',
  ]);
});

// ---------------------------------------------------------------------------
// buildReverseMap
// ---------------------------------------------------------------------------

test('buildReverseMap: indexes by resolved value', () => {
  const m = buildManifest(parseCss(SAMPLE_CSS));
  const rm = buildReverseMap(m.entries);
  const list = rm.get('rgb(113, 113, 122)');
  assert.ok(list);
  assert.ok(list.includes('--cg-gray-500'));
});

test('buildReverseMap: dark theme value also indexed', () => {
  // text-base resolves to gray-800 in default + gray-500 in dark.
  // gray-500 has rgb(113, 113, 122) in both themes (same primitive).
  const m = buildManifest(parseCss(SAMPLE_CSS));
  const rm = buildReverseMap(m.entries);
  // text-base in the dark theme produces rgb(113, 113, 122), so it joins
  // gray-500's bucket.
  const list = rm.get('rgb(113, 113, 122)');
  assert.ok(list.includes('--cg-gray-500'));
  assert.ok(list.includes('--cg-color-surface-base-text'));
});

test('buildReverseMap: lower-tier sorts first within a bucket', () => {
  const m = buildManifest(parseCss(SAMPLE_CSS));
  const rm = buildReverseMap(m.entries);
  const list = rm.get('rgb(113, 113, 122)');
  // gray-500 (tier 1) comes before color-surface-base-text (tier 2)
  const gIdx = list.indexOf('--cg-gray-500');
  const sIdx = list.indexOf('--cg-color-surface-base-text');
  assert.ok(gIdx < sIdx);
});

test('buildReverseMap: spacing values index too', () => {
  const m = buildManifest(parseCss(SAMPLE_CSS));
  const rm = buildReverseMap(m.entries);
  const list = rm.get('8px');
  assert.ok(list.includes('--cg-spacing-8'));
  assert.ok(list.includes('--cg-border-radius-100'));
});
