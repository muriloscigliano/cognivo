/**
 * Invariant suite for the hand-authored motion recipe layer (css/motion.css).
 * Parses the stylesheet as text and enforces the house motion rules:
 *  - every recipe collapses under prefers-reduced-motion
 *  - no `transition: all`
 *  - no raw hex colors
 *  - every non-knob --cg-* reference exists in the built token CSS
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const PKG_ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const MOTION_CSS = fs.readFileSync(path.join(PKG_ROOT, 'css/motion.css'), 'utf8');

const RECIPES = [
  'card-resize',
  'panel-reveal',
  'modal',
  'dropdown',
  'page-nav',
  'text-swap',
  'text-reveal',
  'number-flip',
  'icon-swap',
  'badge-pop',
  'success-confirm',
  'error-shake',
  'avatar-group',
  'stagger',
];

test('all fourteen recipes are present', () => {
  for (const recipe of RECIPES) {
    assert.match(
      MOTION_CSS,
      new RegExp(`\\.cg-motion-${recipe}[\\s{:.,\\[-]`),
      `missing recipe .cg-motion-${recipe}`,
    );
  }
});

function stripComments(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, '');
}

/** Extract the brace-matched contents of every matching @media block. */
function extractMediaBlocks(css, query) {
  const blocks = [];
  let idx = 0;
  while ((idx = css.indexOf(query, idx)) !== -1) {
    const open = css.indexOf('{', idx);
    let depth = 1;
    let i = open + 1;
    while (i < css.length && depth > 0) {
      if (css[i] === '{') depth += 1;
      else if (css[i] === '}') depth -= 1;
      i += 1;
    }
    blocks.push(css.slice(open + 1, i - 1));
    idx = i;
  }
  return blocks;
}

test('every recipe has a reduced-motion collapse (selector-level, comments ignored)', () => {
  const reducedCss = stripComments(
    extractMediaBlocks(MOTION_CSS, '@media (prefers-reduced-motion: reduce)').join('\n'),
  );
  assert.ok(reducedCss.length > 0, 'no prefers-reduced-motion block found');
  for (const recipe of RECIPES) {
    // Must appear as an actual rule selector inside the block, not a comment
    // or a knob custom-property name.
    assert.match(
      reducedCss,
      new RegExp(`\\.cg-motion-${recipe}(--[a-z-]+)?[^{};]*\\{`),
      `.cg-motion-${recipe} has no rule inside the prefers-reduced-motion block`,
    );
  }
});

test('transition: all is banned in every form', () => {
  const css = stripComments(MOTION_CSS);
  assert.doesNotMatch(css, /transition\s*:[^;{}]*\ball\b/);
  assert.doesNotMatch(css, /transition-property\s*:\s*[^;{}]*\ball\b/);
});

test('no raw hex or rgb()/rgba() colors', () => {
  const css = stripComments(MOTION_CSS);
  assert.doesNotMatch(css, /#[0-9a-fA-F]{3,8}\b/);
  assert.doesNotMatch(css, /\brgba?\(/);
});

test('every referenced token exists (knobs excluded)', () => {
  const distCss = fs.readFileSync(path.join(PKG_ROOT, 'dist/index.css'), 'utf8');
  const defined = new Set([...distCss.matchAll(/(--cg-[a-z0-9-]+)\s*:/g)].map((m) => m[1]));
  const knobsDefined = new Set([...MOTION_CSS.matchAll(/(--cg-motion-[a-z0-9-]+)\s*:/g)].map((m) => m[1]));
  const referenced = [...MOTION_CSS.matchAll(/var\((--cg-[a-z0-9-]+)/g)].map((m) => m[1]);
  for (const token of referenced) {
    assert.ok(
      defined.has(token) || knobsDefined.has(token),
      `token ${token} is referenced but defined neither in dist/index.css nor as a local knob`,
    );
  }
});

test('build copies motion.css into dist', () => {
  const distMotion = path.join(PKG_ROOT, 'dist/motion.css');
  assert.ok(fs.existsSync(distMotion), 'dist/motion.css missing — run pnpm build');
  assert.equal(fs.readFileSync(distMotion, 'utf8'), MOTION_CSS);
});
