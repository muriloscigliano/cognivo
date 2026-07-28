import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

/** Passthrough to @cognivo/evals. The package is private/workspace-only with no
 *  exports map, so resolve it relative to this file (same depth from
 *  src/commands/ and dist/commands/) and fail friendly when absent. */

export const EVALS_NOT_FOUND_MESSAGE =
  'cognivo evals: @cognivo/evals was not found — it ships with the Cognivo monorepo, not the npm CLI. Run this command from a Cognivo workspace checkout.';

/** Absolute path to packages/evals/src/cli.ts, or null when absent. */
export function resolveEvalsCli(): string | null {
  const cliPath = fileURLToPath(new URL('../../../evals/src/cli.ts', import.meta.url));
  return existsSync(cliPath) ? cliPath : null;
}

export async function runEvalsPassthrough(
  argv: string[],
  resolve: () => string | null = resolveEvalsCli,
): Promise<number> {
  const cliPath = resolve();
  if (!cliPath) {
    console.error(EVALS_NOT_FOUND_MESSAGE);
    return 2;
  }
  const r = spawnSync('node', ['--import', 'tsx', cliPath, ...argv], { stdio: 'inherit' });
  return r.status ?? 1;
}
