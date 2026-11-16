// The contrast gate audits every text/background pair the components paint,
// derived from their Lit `css` templates, not only a hand list. Runs against
// dist/index.css (`pnpm build` first) and packages/components/src.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { pairsFromCss, cssTemplates } from '../scripts/component-pairs.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const has = (pairs, fg, bg) => pairs.some((p) => p.fg === fg && p.bg === bg);

test('a rule that sets colour and background is a pair', () => {
  const pairs = pairsFromCss('.chip { color: var(--cg-color-a); background: var(--cg-color-b); }');
  assert.ok(has(pairs, 'color-a', 'color-b'));
});

test('a state rule borrows the other side from the same element (hover background + resting text)', () => {
  const pairs = pairsFromCss(`
    .btn { color: var(--cg-color-text); background: var(--cg-color-bg); }
    .btn:not(:disabled):hover { background: var(--cg-color-bg-hover); }
  `);
  assert.ok(has(pairs, 'color-text', 'color-bg-hover'));
});

test('text with no background sits on the page surfaces, or on the host background when the host paints one', () => {
  const page = pairsFromCss('.hint { color: var(--cg-color-muted); }');
  for (const bg of ['color-surface-base-background', 'color-surface-cards-background', 'color-surface-container-background']) {
    assert.ok(has(page, 'color-muted', bg), bg);
  }
  const hosted = pairsFromCss(':host { background: var(--cg-color-panel); } .hint { color: var(--cg-color-muted); }');
  assert.ok(has(hosted, 'color-muted', 'color-panel'));
  assert.ok(!has(hosted, 'color-muted', 'color-surface-base-background'));
});

test('disabled states and non-token values are not audited; icons are held to 3:1, text to 4.5:1', () => {
  const pairs = pairsFromCss(`
    button:disabled { color: var(--cg-color-x); background: var(--cg-color-y); }
    .a { color: var(--cg-color-text-disable); background: var(--cg-color-y); }
    .b { color: currentColor; background: var(--cg-color-y); }
    .c { color: var(--cg-color-chip-icon); background: var(--cg-color-y); }
    .d { color: var(--cg-color-chip-text); background: var(--cg-color-y); }
  `);
  assert.equal(pairs.length, 2);
  assert.equal(pairs.find((p) => p.fg === 'color-chip-icon').min, 3);
  assert.equal(pairs.find((p) => p.fg === 'color-chip-text').min, 4.5);
});

test('a `:not(:disabled)` hover state is still audited', () => {
  const pairs = pairsFromCss(`
    .b { color: var(--cg-color-on-danger); background: var(--cg-color-danger); }
    .b:not(:disabled):hover { background: var(--cg-color-danger-hover); }
  `);
  assert.ok(has(pairs, 'color-on-danger', 'color-danger-hover'));
});

test('a `contrast:` comment names a background set by an ancestor, or marks a decorative glyph', () => {
  const pairs = pairsFromCss(`
    .kw { color: var(--cg-color-code-keyword); /* contrast: on --cg-color-code-background */ }
    q::before { color: var(--cg-color-divider-x); /* contrast: decorative */ }
  `);
  assert.deepEqual(pairs.map((p) => `${p.fg} ${p.bg}`), ['color-code-keyword color-code-background']);
  assert.throws(() => pairsFromCss('.x { color: var(--cg-color-a); /* contrast: maybe */ }'), /unknown contrast annotation/);
});

test('css templates are read from TS sources with interpolations removed', () => {
  const src = 'static styles = [x, css`\n  .a { color: var(--cg-color-a); ${unsafeCSS(y)} }\n`];';
  assert.deepEqual(cssTemplates(src).map((t) => t.trim()), ['.a { color: var(--cg-color-a);  }']);
});

const run = spawnSync(process.execPath, [`${root}scripts/validate-contrast.mjs`], { encoding: 'utf8' });

test('the gate audits the derived component pairs, in both themes', () => {
  const m = run.stdout.match(/component pairs: (\d+) derived/);
  assert.ok(m, `no component-pair audit in output:\n${run.stdout}`);
  assert.ok(Number(m[1]) > 100, `only ${m[1]} component pairs derived`);
});

test('pairs reported from a real dashboard pass AA: muted text and accent text on the light page, muted text on dark cards, danger button text', () => {
  for (const label of [
    'light color-input-text-placeholder on color-surface-base-background',
    'light color-surface-container-outlined on color-surface-base-background',
    'light color-accent-text on color-surface-base-background',
    'dark color-surface-container-outlined on color-surface-cards-background',
    'light color-status-error-text-inverse on color-status-error-text-default',
    'dark color-status-error-text-inverse on color-status-error-text-default',
  ]) {
    const [theme, pair] = [label.slice(0, label.indexOf(' ')), label.slice(label.indexOf(' ') + 1)];
    assert.match(run.stdout, new RegExp(`${theme}\\s+${pair}\\s+[0-9.]+\\s+PASS`), `${label} not audited or failing`);
  }
});

test('the contrast gate passes', () => {
  assert.equal(run.status, 0, `${run.stdout.slice(-4000)}\n${run.stderr}`);
});
