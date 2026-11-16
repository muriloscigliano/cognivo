// The contrast gate audits every text/background pair the components paint,
// derived from their Lit `css` templates, not only a hand list. Runs against
// dist/index.css (`pnpm build` first) and packages/components/src.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { pairsFromCss, cssTemplates, deriveComponentPairs } from '../scripts/component-pairs.mjs';
import { checkBaseline } from '../scripts/contrast-baseline.mjs';

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

// ---- coverage: !important, fallbacks, hover-only text, shared style modules ----

test('`!important` colours are audited', () => {
  const pairs = pairsFromCss('.x { color: var(--cg-color-a) !important; background: var(--cg-color-b) !important; }');
  assert.ok(has(pairs, 'color-a', 'color-b'));
});

test('fallback colours are audited: a token fallback, and the token behind a private custom property', () => {
  const pairs = pairsFromCss(`
    .x { color: var(--cg-color-a, var(--cg-color-a2)); background: var(--cg-color-b); }
    .y { color: var(--_cg-tint, var(--cg-color-c)); background: var(--cg-color-d, #fff); }
  `);
  assert.ok(has(pairs, 'color-a', 'color-b'));
  assert.ok(has(pairs, 'color-a2', 'color-b'));
  assert.ok(has(pairs, 'color-c', 'color-d'));
});

test('text set only on hover is checked against its own element: the hover background if it sets one, else its resting background', () => {
  const resting = pairsFromCss(`
    .item { color: var(--cg-color-text); background: var(--cg-color-bg); }
    .item:hover { color: var(--cg-color-text-hover); }
  `);
  assert.ok(has(resting, 'color-text-hover', 'color-bg'));
  assert.ok(!has(resting, 'color-text-hover', 'color-surface-base-background'));
  const hovered = pairsFromCss(`
    .item { color: var(--cg-color-text); background: var(--cg-color-bg); }
    .item:hover { color: var(--cg-color-text-hover); }
    .item:hover { background: var(--cg-color-bg-hover); }
  `);
  assert.ok(has(hovered, 'color-text-hover', 'color-bg-hover'));
  assert.ok(!has(hovered, 'color-text-hover', 'color-bg'));
});

test('shared style modules (src/styles, e.g. menu.css.ts) are audited too', () => {
  const pairs = deriveComponentPairs(new URL('../../components/src/components', import.meta.url).pathname);
  assert.ok(pairs.some((p) => p.usedBy.some((u) => u.startsWith('styles/menu.css '))), 'no pair from styles/menu.css.ts');
});

// ---- baseline: can only shrink; entries keyed by component + selector + theme + pair, with the measured ratio ----

const row = (theme, fg, bg, ratio, usedBy, min = 4.5) => ({ theme, label: `${fg} on ${bg}`, ratio, status: ratio >= min ? 'PASS' : 'FAIL', pair: { fg, bg, min, usedBy, component: true } });
const KEY = 'light color-a on color-b @ ai-x .tag';

test('a listed failure at its recorded ratio is known; the same pair on another selector is a new failure', () => {
  const baseline = { maxEntries: 1, entries: { [KEY]: { ratio: 2.1, reason: 'r' } } };
  const ok = checkBaseline([row('light', 'color-a', 'color-b', 2.1, ['ai-x .tag'])], baseline);
  assert.deepEqual(ok.errors, []);
  const other = checkBaseline([row('light', 'color-a', 'color-b', 2.1, ['ai-x .tag', 'ai-x .other'])], baseline);
  assert.equal(other.errors.length, 1);
  assert.match(other.errors[0], /ai-x \.other/);
});

test('a listed pair that gets worse fails, naming the recorded and measured ratios', () => {
  const baseline = { maxEntries: 1, entries: { [KEY]: { ratio: 2.1, reason: 'r' } } };
  const { errors } = checkBaseline([row('light', 'color-a', 'color-b', 1.9, ['ai-x .tag'])], baseline);
  assert.equal(errors.length, 1);
  assert.match(errors[0], /worse.*2\.10.*1\.90/);
});

test('the number of entries can only go down: above the stored count fails; below it asks to lower the count', () => {
  const entries = { [KEY]: { ratio: 2.1, reason: 'r' }, 'dark color-a on color-b @ ai-x .tag': { ratio: 2, reason: 'r' } };
  const rows = [row('light', 'color-a', 'color-b', 2.1, ['ai-x .tag']), row('dark', 'color-a', 'color-b', 2, ['ai-x .tag'])];
  assert.match(checkBaseline(rows, { maxEntries: 1, entries }).errors.join('\n'), /2 entries.*at most 1/);
  assert.match(checkBaseline(rows.slice(0, 1), { maxEntries: 2, entries: { [KEY]: entries[KEY] } }).errors.join('\n'), /lower maxEntries to 1/);
});

test('a listed entry that passes now, or is no longer painted, is stale', () => {
  const baseline = { maxEntries: 1, entries: { [KEY]: { ratio: 2.1, reason: 'r' } } };
  assert.match(checkBaseline([row('light', 'color-a', 'color-b', 5, ['ai-x .tag'])], baseline).errors.join('\n'), /STALE/);
  assert.match(checkBaseline([], baseline).errors.join('\n'), /STALE/);
});
