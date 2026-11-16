// Native controls (date picker icon, scrollbars, select popups) draw from the
// page's `color-scheme`, not from our tokens. The theme blocks must set it, or
// the dark theme gets dark-on-dark native chrome. Runs against dist/index.css,
// so `pnpm build` must run first.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const css = readFileSync(`${root}dist/index.css`, 'utf8');

// Body of every top-level block opened by exactly `selector {`.
function blocks(selector) {
  const out = [];
  const open = `${selector} {`;
  let i = css.indexOf(open);
  while (i !== -1) {
    const start = i + open.length;
    out.push(css.slice(start, css.indexOf('}', start)));
    i = css.indexOf(open, start);
  }
  return out;
}

test('light theme (:root) sets color-scheme: light', () => {
  const rootBlocks = blocks(':root');
  assert.ok(rootBlocks.length > 0, 'no :root block');
  assert.ok(rootBlocks.some((b) => /^\s*color-scheme:\s*light;/m.test(b)), 'no color-scheme: light in :root');
});

test('dark theme ([data-theme="dark"]) sets color-scheme: dark', () => {
  const dark = blocks('[data-theme="dark"]');
  assert.ok(dark.length > 0, 'no [data-theme="dark"] block');
  for (const b of dark) assert.match(b, /^\s*color-scheme:\s*dark;/m);
});

test('every prefers-color-scheme: dark media block sets color-scheme: dark', () => {
  const re = /@media[^{]*prefers-color-scheme:\s*dark[^{]*\{([\s\S]*?)\}\s*\}/g;
  for (const m of css.matchAll(re)) assert.match(m[1], /^\s*color-scheme:\s*dark;/m);
});
