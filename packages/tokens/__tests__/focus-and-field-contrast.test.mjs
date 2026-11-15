// Guards the light theme against shipping without a visible focus ring, and
// form-field labels against unreadable contrast. Runs against dist/index.css,
// so `pnpm build` must run first (turbo's `test` depends on `build`).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { parseCss } from '../scripts/manifest-lib.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const css = readFileSync(`${root}dist/index.css`, 'utf8');
const { themes } = parseCss(css);

const REQUIRED = ['--cg-color-focus-ring', '--cg-color-focus-ring-offset', '--cg-color-accent-text'];

test('light theme (:root) defines the focus-ring and accent-text tokens', () => {
  for (const name of REQUIRED) assert.ok(themes[':root'][name], `${name} missing from :root`);
});

test('dark theme defines the focus-ring and accent-text tokens', () => {
  const dark = themes['[data-theme="dark"]'] ?? {};
  for (const name of REQUIRED) assert.ok(dark[name] ?? themes[':root'][name], `${name} missing in dark`);
});

test('contrast gate passes: focus ring >= 3:1, resting field label, table header and toast description >= 4.5:1, both themes', () => {
  const run = spawnSync(process.execPath, [`${root}scripts/validate-contrast.mjs`], { encoding: 'utf8' });
  for (const label of ['input-label-resting', 'table-header-text', 'toast-description', 'focus-ring-on-page', 'focus-ring-on-field', 'focus-ring-on-offset']) {
    assert.match(run.stdout, new RegExp(`light\\s+${label}`), `${label} not audited (light)`);
    assert.match(run.stdout, new RegExp(`dark\\s+${label}`), `${label} not audited (dark)`);
  }
  assert.equal(run.status, 0, `${run.stdout}\n${run.stderr}`);
});
