// The neutral theme preset (`@cognivo/tokens/themes/neutral.css`) is a token
// override file loaded after the tokens. It may only re-point tokens the
// tokens already declare, in both themes, using tokens that exist — and it
// ships: built into dist/ and exported. Runs against dist/, so `pnpm build`
// must run first. Computed colours in both presets are covered by the
// components' browser suite (theme-presets.browser.test.ts).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const tokens = readFileSync(`${root}dist/index.css`, 'utf8');
const presetPath = `${root}dist/themes/neutral.css`;
const preset = existsSync(presetPath) ? readFileSync(presetPath, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '') : '';

const declared = (css) => new Set([...css.matchAll(/(--cg-[\w-]+)\s*:/g)].map((m) => m[1]));
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

test('neutral preset is built into dist/themes/neutral.css and exported as ./themes/neutral.css', () => {
  assert.ok(existsSync(presetPath), 'dist/themes/neutral.css missing (copy-static)');
  const pkg = JSON.parse(readFileSync(`${root}package.json`, 'utf8'));
  assert.equal(pkg.exports['./themes/neutral.css'], './dist/themes/neutral.css');
});

test('neutral preset overrides only existing tokens, the same set in light and dark, and references only existing tokens', () => {
  const known = declared(tokens);
  const { light, dark } = themes(preset);
  assert.ok(light.size > 0, 'no light overrides');
  assert.deepEqual([...light.keys()].sort(), [...dark.keys()].sort(), 'light and dark must override the same tokens (a dark element re-declares every token)');
  for (const k of light.keys()) assert.ok(known.has(k), `${k} is not a token`);
  for (const v of [...light.values(), ...dark.values()]) {
    for (const [, ref] of v.matchAll(/var\((--cg-[\w-]+)/g)) assert.ok(known.has(ref), `${ref} is not a token`);
    assert.doesNotMatch(v, /#|rgb|hsl/, `raw colour in the preset: ${v}`);
  }
});

test('neutral preset: primary is near-black on white text in light, white on near-black in dark; selection uses the state tokens', () => {
  const { light, dark } = themes(preset);
  assert.equal(light.get('--cg-color-action-primary-background-default'), 'var(--cg-gray-950)');
  assert.equal(light.get('--cg-color-action-primary-text-default'), 'var(--cg-gray-white)');
  assert.equal(dark.get('--cg-color-action-primary-background-default'), 'var(--cg-gray-white)');
  assert.equal(dark.get('--cg-color-action-primary-text-default'), 'var(--cg-gray-950)');
  for (const t of [light, dark]) {
    assert.equal(t.get('--cg-color-selected-background'), 'var(--cg-color-state-selected)');
    assert.equal(t.get('--cg-color-current-indicator'), 'var(--cg-color-state-text)');
  }
});
