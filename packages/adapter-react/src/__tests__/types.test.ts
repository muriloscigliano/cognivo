import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

/**
 * The published 0.5.0 shipped 18 of ~200 wrapper declaration files and no
 * create-wrapper.d.ts, so consumers got `any` for most wrappers. These tests
 * run against dist/ (turbo runs `build` before `test`).
 */
const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = resolve(__dirname, '../..');
const dist = resolve(pkg, 'dist');

describe('published type declarations', () => {
  it('dist/index.d.ts and a .d.ts for every re-exported wrapper exist', () => {
    const index = readFileSync(resolve(dist, 'index.d.ts'), 'utf8');
    const refs = [...index.matchAll(/from '\.\/([\w/-]+)\.js'/g)].map((m) => m[1]!);
    expect(refs.length).toBeGreaterThan(190);
    const missing = [...new Set(refs)].filter((r) => !existsSync(resolve(dist, `${r}.d.ts`)));
    expect(missing).toEqual([]);
  });

  it('a consumer probe type-checks: valid usage compiles, every @ts-expect-error fires', () => {
    const tsc = resolve(pkg, 'node_modules/typescript/bin/tsc');
    const run = spawnSync(process.execPath, [tsc, '-p', resolve(__dirname, 'types/tsconfig.json')], { encoding: 'utf8' });
    expect(run.stdout + run.stderr).toBe('');
    expect(run.status).toBe(0);
  }, 120_000);
});
