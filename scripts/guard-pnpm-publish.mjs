#!/usr/bin/env node
/**
 * guard-pnpm-publish.mjs — per-package publish guard (runs from `prepublishOnly`).
 *
 * WHY THIS EXISTS: Twice now (2026-07-01, 2026-07-03) a package was published
 * with plain `npm publish`, which ships `"@cognivo/core": "workspace:*"`
 * VERBATIM into the registry manifest. Consumers then hit
 * `EUNSUPPORTEDPROTOCOL "Unsupported URL Type workspace:"` on install.
 *
 * `pnpm publish` (and changesets) rewrite `workspace:*` → the real version at
 * pack time; `npm publish` does NOT. The root `verify-publish.mjs` preflight
 * only runs via the `release`/`publish-packages` scripts — a DIRECT
 * `npm publish <pkg>` bypasses it. `prepublishOnly` is the only hook that fires
 * on a direct publish, so the guard must live here.
 *
 * Behaviour:
 *   - Publishing under pnpm  → pass silently.
 *   - Publishing under npm/yarn while the package declares any `workspace:`
 *     dependency → HARD FAIL with a plain-English fix.
 *   - No workspace: deps at all → pass (nothing npm could mangle).
 *
 * Detection uses $npm_config_user_agent, which every package manager sets to
 * its own name (`pnpm/...`, `npm/...`, `yarn/...`) when it spawns lifecycle
 * scripts. Read-only; no network.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const ua = process.env.npm_config_user_agent || '';
const isPnpm = ua.startsWith('pnpm');

// Read the package.json of the package being published (cwd during prepublishOnly).
let pkg;
try {
  pkg = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf8'));
} catch {
  // Can't read manifest — don't block on something unexpected.
  process.exit(0);
}

const allDeps = {
  ...pkg.dependencies,
  ...pkg.peerDependencies,
  ...pkg.optionalDependencies,
};
const workspaceDeps = Object.entries(allDeps)
  .filter(([, spec]) => typeof spec === 'string' && (spec.startsWith('workspace:') || spec.startsWith('link:')))
  .map(([name, spec]) => `${name}@${spec}`);

if (isPnpm || workspaceDeps.length === 0) {
  process.exit(0);
}

const name = pkg.name || '(this package)';
console.error(`
✖ Refusing to publish ${name} with "${ua.split(' ')[0] || 'npm'}".

  This package has workspace-protocol dependencies that ONLY pnpm rewrites to
  real versions at publish time:

    ${workspaceDeps.join('\n    ')}

  Plain \`npm publish\` ships \`workspace:*\` verbatim → consumers hit
  EUNSUPPORTEDPROTOCOL on install. (This has broken clients twice.)

  Publish with pnpm instead:

    pnpm publish --tag <tag> --no-git-checks

  Or run the guarded release script from the repo root:

    pnpm release
`);
process.exit(1);
