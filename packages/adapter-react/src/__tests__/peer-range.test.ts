import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

/**
 * 0.5.0 was published with `"@cognivo/components": "0.8.0"` (exact), so
 * `npm install @cognivo/adapter-react @cognivo/components@0.8.3` failed with
 * ERESOLVE. `workspace:^` publishes as `^<components version>`; `workspace:*`
 * or a literal version would publish an exact pin again.
 */
const __dirname = dirname(fileURLToPath(import.meta.url));
const read = (p: string) => JSON.parse(readFileSync(resolve(__dirname, p), 'utf8')) as {
  version: string;
  peerDependencies?: Record<string, string>;
};

describe('peer range of @cognivo/components', () => {
  for (const adapter of ['adapter-react', 'adapter-vue']) {
    it(`${adapter} declares a caret (workspace:^) range, never an exact pin`, () => {
      const peers = read(`../../../${adapter}/package.json`).peerDependencies ?? {};
      for (const [name, range] of Object.entries(peers).filter(([n]) => n.startsWith('@cognivo/'))) {
        expect(range, `${adapter} → ${name}`).toBe('workspace:^');
      }
      expect(peers['@cognivo/components']).toBe('workspace:^');
    });
  }
});
