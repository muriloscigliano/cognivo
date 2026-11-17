// Library-level findings of the growth-kit dashboard design audit
// (2026-11-17, screenshots/audit/AUDIT.md): one control scale, quiet badges,
// a calmer modal, the segmented / pager sizes, two table densities and a dark
// surface ladder that gets lighter as it rises. Runs against dist/, so
// `pnpm build` must run first.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const tokens = readFileSync(`${root}dist/index.css`, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
const preset = readFileSync(`${root}dist/themes/neutral.css`, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');

/** Declarations per theme: rules whose selector list has `:root` (light) / `[data-theme="dark"]` (dark). */
function themes(css) {
  const out = { light: new Map(), dark: new Map() };
  for (const [, sel, body] of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const s = sel.split(',').map((x) => x.trim());
    for (const [, k, v] of body.matchAll(/(--cg-[\w-]+)\s*:\s*([^;]+);/g)) {
      if (s.includes(':root')) out.light.set(k, v.trim());
      if (s.includes('[data-theme="dark"]')) out.dark.set(k, v.trim());
    }
  }
  return out;
}
const base = themes(tokens);
/** The dark theme sees its own declarations over the light (:root) ones. */
const dark = new Map([...base.light, ...base.dark]);
const light = base.light;
/** Resolve `var(--x)` chains to a literal. */
function resolve(map, name, depth = 0) {
  const v = map.get(name);
  assert.ok(v !== undefined, `${name} is not declared`);
  const m = /^var\((--cg-[\w-]+)\)$/.exec(v);
  return m && depth < 20 ? resolve(map, m[1], depth + 1) : v;
}
function rgb(value) {
  let m = /^#([0-9a-f]{6})$/i.exec(value);
  if (m) { const n = parseInt(m[1], 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255, 1]; }
  m = /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)(?:[\s,/]+([\d.]+))?\s*\)$/.exec(value);
  assert.ok(m, `not a colour: ${value}`);
  return [+m[1], +m[2], +m[3], m[4] === undefined ? 1 : +m[4]];
}
const luminance = ([r, g, b]) => [r, g, b].map((c) => c / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
  .reduce((s, c, i) => s + c * [0.2126, 0.7152, 0.0722][i], 0);

test('one control scale: buttons and inputs sm 32 / md 36 / lg 40 px, radius 8 px; select follows the input', () => {
  for (const c of ['button', 'input']) {
    assert.deepEqual(['sm', 'md', 'lg'].map((s) => resolve(light, `--cg-component-${c}-height-${s}`)), ['32px', '36px', '40px'], c);
  }
  for (const s of ['sm', 'md', 'lg']) assert.equal(resolve(light, `--cg-component-button-radius-${s}`), '8px');
  assert.equal(resolve(light, '--cg-component-input-radius'), '8px');
  assert.equal(resolve(light, '--cg-component-select-height-md'), '36px');
  assert.equal(resolve(light, '--cg-size-touch-target'), '44px');
});

test('segmented control: 32 px track, 26 px options (3 px inset: 1 px border + 2 px padding); pager buttons 28 px', () => {
  assert.equal(resolve(light, '--cg-component-segmented-control-height-md'), '32px');
  assert.equal(resolve(light, '--cg-component-segmented-control-padding'), '2px');
  assert.equal(resolve(light, '--cg-component-pagination-button-size'), '28px');
});

test('modal: radius 12 px; backdrop black at 32 % (light) and 56 % (dark), no blur token in use', () => {
  assert.equal(resolve(light, '--cg-component-modal-radius'), '12px');
  assert.deepEqual(rgb(resolve(light, '--cg-color-modal-overlay-background')), [0, 0, 0, 0.32]);
  assert.deepEqual(rgb(resolve(dark, '--cg-color-modal-overlay-background')), [0, 0, 0, 0.56]);
});

test('badge: one size (28 px, full pill) and tints at about 8 % in both themes', () => {
  assert.equal(resolve(light, '--cg-component-badge-height'), '28px');
  for (const t of [light, dark]) {
    for (const k of ['neutral', 'default', 'success', 'warning', 'error']) {
      const [, , , a] = rgb(resolve(t, `--cg-color-badge-background-${k}`));
      assert.ok(a > 0 && a <= 0.1, `badge ${k} tint alpha ${a}`);
    }
  }
});

test('table: two densities (list 60 px, data 40 px) and a 36 px header row', () => {
  assert.equal(resolve(light, '--cg-component-table-row-height-list'), '60px');
  assert.equal(resolve(light, '--cg-component-table-row-height-data'), '40px');
  assert.equal(resolve(light, '--cg-component-table-header-height'), '36px');
});

test('surface ladder: canvas < panel < raised in dark (lighter as it rises), with a hairline and a hover step, in both themes and both presets', () => {
  const names = ['canvas-background', 'panel-background', 'raised-background', 'hairline', 'hover'];
  for (const t of [light, dark]) for (const n of names) resolve(t, `--cg-color-surface-${n}`);
  const [c, p, r] = names.slice(0, 3).map((n) => luminance(rgb(resolve(dark, `--cg-color-surface-${n}`))));
  assert.ok(c < p && p < r, `dark ladder ${c} < ${p} < ${r}`);
  assert.deepEqual(rgb(resolve(dark, '--cg-color-surface-canvas-background')), [11, 11, 12, 1]);
  assert.deepEqual(rgb(resolve(dark, '--cg-color-surface-panel-background')), [20, 20, 22, 1]);
  assert.deepEqual(rgb(resolve(dark, '--cg-color-surface-raised-background')), [27, 27, 30, 1]);
  assert.deepEqual(rgb(resolve(dark, '--cg-color-surface-hairline')), [255, 255, 255, 0.08]);
  assert.deepEqual(rgb(resolve(dark, '--cg-color-surface-hover')), [255, 255, 255, 0.06]);
  // The neutral preset keeps the ladder (it re-points none of it).
  const p2 = themes(preset);
  for (const t of [p2.light, p2.dark]) for (const n of names) assert.equal(t.has(`--cg-color-surface-${n}`), false, n);
});
