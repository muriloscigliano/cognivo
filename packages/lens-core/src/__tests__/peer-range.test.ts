import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

/**
 * Same bug as the adapters' 0.5.0: `workspace:*` publishes as an EXACT pin
 * (`"@cognivo/core": "0.4.0"`), so installing a lens package next to any
 * newer patch of its Cognivo peers fails with ERESOLVE. `workspace:^`
 * publishes as `^<version>`.
 */
const __dirname = dirname(fileURLToPath(import.meta.url));
const read = (pkg: string) =>
  JSON.parse(readFileSync(resolve(__dirname, `../../../${pkg}/package.json`), 'utf8')) as {
    peerDependencies?: Record<string, string>;
  };

describe('lens-* peer ranges for @cognivo/* packages', () => {
  for (const pkg of ['lens-core', 'lens-pack-core', 'lens-pack-ethics', 'lens-ui']) {
    it(`${pkg} declares caret (workspace:^) ranges, never an exact pin`, () => {
      const peers = Object.entries(read(pkg).peerDependencies ?? {}).filter(([n]) => n.startsWith('@cognivo/'));
      expect(peers.length, `${pkg} has @cognivo peers`).toBeGreaterThan(0);
      for (const [name, range] of peers) expect(range, `${pkg} → ${name}`).toBe('workspace:^');
    });
  }
});
