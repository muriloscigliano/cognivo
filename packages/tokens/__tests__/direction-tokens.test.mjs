// Tokens a dashboard built to the growth-kit direction needed and had to
// fake with calc() or borrowed tokens (2026-11-16):
//  - type steps 13, 15, 34 and 47 px (between Cognivo's 12/14/16 and 36/48);
//  - a link colour (the tip link borrowed status-info-text), neutral in the
//    neutral preset;
//  - the app shell panel's top gap when there is no top bar.
// Runs against dist/, so `pnpm build` must run first.
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

test('type scale has the 13, 15, 34 and 47 px steps', () => {
  const { light } = themes(tokens);
  for (const px of [13, 15, 34, 47]) assert.equal(light.get(`--cg-font-size-${px}`), `${px}px`);
});

test('link colour: text and hover tokens in both themes; the default is the accent text', () => {
  const { light, dark } = themes(tokens);
  for (const t of [light, dark]) {
    assert.equal(t.get('--cg-color-link-text'), 'var(--cg-color-accent-text)');
    assert.equal(t.get('--cg-color-link-hover'), 'var(--cg-color-state-text)');
  }
});

test('neutral preset: links are neutral (the near-black / white state text), in both themes', () => {
  const { light, dark } = themes(preset);
  for (const t of [light, dark]) assert.equal(t.get('--cg-color-link-text'), 'var(--cg-color-state-text)');
});

test('app shell panel: a top-gap token (used when there is no top bar), the panel inset by default', () => {
  const { light } = themes(tokens);
  assert.equal(light.get('--cg-component-app-shell-panel-top'), 'var(--cg-component-app-shell-panel-inset)');
});
