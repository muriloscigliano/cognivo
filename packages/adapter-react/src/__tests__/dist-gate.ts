/**
 * Whether a test of the BUILT adapter (`dist/`) runs: `true` when it is
 * built; `false` (skip) when it is missing locally; throws when it is missing
 * in CI, so such a test can never pass there without testing anything.
 */
export function distGate(env: Record<string, string | undefined>, built: boolean): boolean {
  if (built) return true;
  const ci = env.CI;
  if (ci && ci !== 'false' && ci !== '0') {
    throw new Error('This test reads the built adapter (dist/), and it is missing. Run `pnpm build` before the test step (turbo runs build before test).');
  }
  return false;
}
