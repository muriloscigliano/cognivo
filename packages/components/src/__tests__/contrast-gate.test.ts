// @vitest-environment node
/**
 * The tokens contrast gate (packages/tokens/scripts/validate-contrast.mjs)
 * derives every text/background pair from these components' styles. It runs
 * on the tokens build; this test re-runs it whenever component styles change,
 * so a component that starts painting a failing pair fails here too.
 * Needs the tokens build (`pnpm --filter @cognivo/tokens build`).
 */
import { describe, it, expect } from 'vitest';
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';

const GATE = resolve(__dirname, '..', '..', '..', 'tokens', 'scripts', 'validate-contrast.mjs');

describe('contrast of the pairs component styles paint', () => {
  it('every derived pair passes WCAG AA in both themes (or is a known, listed failure)', () => {
    const run = spawnSync(process.execPath, [GATE], { encoding: 'utf8' });
    const failures = `${run.stdout.split('\n').filter((l) => /FAIL|STALE/.test(l)).join('\n')}\n${run.stderr}`;
    expect(run.stdout).toMatch(/component pairs: \d+ derived/);
    expect(run.status, failures).toBe(0);
  });
});
