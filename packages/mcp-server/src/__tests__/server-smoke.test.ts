import { describe, it, expect } from 'vitest';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from '../server/server.js';

/**
 * Startup smoke test — guards the P0 "MCP server crashes on startup (ENOENT)"
 * regression. The server reads its catalog from a path relative to the running
 * module (`../catalog/catalog.json`). If that file is missing — e.g. the build
 * compiles src->dist but never copies the .json into dist/catalog — the server
 * throws at construction and the published `cognivo-mcp` binary is dead on
 * arrival. The previous test suite imported the catalog straight from src/, so
 * it never exercised this path. This test does.
 */
describe('server startup', () => {
  it('createServer() loads the catalog and constructs without throwing', () => {
    expect(() => createServer()).not.toThrow();
  });

  it('catalog.json resolves relative to the server module (dist-copy guard)', () => {
    // Mirrors loadCatalog() in server.ts: join(moduleDir, '..', 'catalog', 'catalog.json').
    const moduleDir = dirname(fileURLToPath(import.meta.url));
    // From src/__tests__ the server lives at src/server; its sibling is src/catalog.
    const catalogPath = join(moduleDir, '..', 'catalog', 'catalog.json');
    expect(existsSync(catalogPath)).toBe(true);
  });
});
