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

// A light rule with zero specificity, so a consumer's own
// `html { color-scheme: ... }` (or `:root`) wins over ours.
test('light theme: `:where(:root) { color-scheme: light }` (zero specificity), never a plain :root rule', () => {
  const light = blocks(':where(:root)');
  assert.equal(light.length, 1, 'expected exactly one :where(:root) block');
  assert.match(light[0], /^\s*color-scheme:\s*light;\s*$/);
  for (const b of blocks(':root')) assert.doesNotMatch(b, /color-scheme/, 'color-scheme in a plain :root block would beat html { color-scheme }');
});

test('dark theme: `[data-theme="dark"]` sets color-scheme: dark', () => {
  const dark = blocks('[data-theme="dark"]');
  assert.ok(dark.length > 0, 'no [data-theme="dark"] block');
  assert.ok(dark.some((b) => /^\s*color-scheme:\s*dark;/m.test(b)), 'no color-scheme: dark in [data-theme="dark"]');
});

test('no prefers-color-scheme block is generated today (dark is opt-in via data-theme)', () => {
  // If one is ever added, it must also set color-scheme: dark; replace this
  // test with that check then.
  assert.equal([...css.matchAll(/prefers-color-scheme/g)].length, 0);
});
