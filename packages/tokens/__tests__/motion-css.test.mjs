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

test('every recipe has a reduced-motion collapse', () => {
  const reducedBlocks = MOTION_CSS.split('@media (prefers-reduced-motion: reduce)').slice(1);
  const reducedCss = reducedBlocks.join('\n');
  for (const recipe of RECIPES) {
    assert.match(
      reducedCss,
      new RegExp(`cg-motion-${recipe}`),
      `.cg-motion-${recipe} has no prefers-reduced-motion guard`,
    );
  }
});

test('transition: all is banned', () => {
  assert.doesNotMatch(MOTION_CSS, /transition:\s*all[\s;,]/);
});

test('no raw hex colors', () => {
  assert.doesNotMatch(MOTION_CSS, /#[0-9a-fA-F]{3,8}\b/);
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
