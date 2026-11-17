// @vitest-environment node
/**
 * Dashboard swap onto Cognivo, 2026-11-18: `createWrapper(…)` calls at the
 * top of the adapter had no pure annotation, so a bundler had to keep all
 * ~200 wrappers (≈ 7 KB gzip) even when the app imported one; the dashboard
 * marked the call pure in its own vite config to work around it.
 *
 * Now every wrapper is `/* @__PURE__ *\/ createWrapper(…)` in the BUILT
 * adapter: bundling `dist/index.js` for one wrapper (esbuild, minified,
 * tree-shaken, React and the components external) keeps that wrapper and
 * drops every unused one. Requires `pnpm build` first (turbo runs build
 * before test).
 */
import { describe, it, expect } from 'vitest';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { gzipSync } from 'node:zlib';
import { build } from 'esbuild';

const pkg = resolve(__dirname, '..', '..');
const DIST = resolve(pkg, 'dist', 'index.js');

async function bundle(imports: string): Promise<{ text: string; gzip: number }> {
  const out = await build({
    stdin: { contents: `import { ${imports} } from './dist/index.js'; console.log(${imports});`, resolveDir: pkg },
    bundle: true,
    minify: true,
    treeShaking: true,
    format: 'esm',
    target: 'es2022',
    write: false,
    logLevel: 'silent',
    external: ['react', 'react/jsx-runtime', '@cognivo/components', '@cognivo/components/*'],
  });
  const code = out.outputFiles[0]!.contents;
  return { text: Buffer.from(code).toString('utf8'), gzip: gzipSync(code, { level: 9 }).length };
}

describe.skipIf(!existsSync(DIST))('React adapter tree-shaking (built dist)', () => {
  it('one wrapper imported: it ships, the unused wrappers drop out', async () => {
    const { text, gzip } = await bundle('CgButton');
    expect(text).toContain('"cg-button"');
    const unused = ['cg-chart', 'cg-table', 'cg-date-time-picker', 'ai-chat', 'cg-timeline'].filter((t) => text.includes(`"${t}"`));
    expect(unused, 'unused wrappers bundled').toEqual([]);
    // createWrapper + one wrapper; the whole adapter is ~10 KB gzip.
    expect(gzip, `gzip ${gzip} B`).toBeLessThanOrEqual(1536);
  });

  it('two wrappers imported: both ship, nothing else', async () => {
    const { text } = await bundle('CgButton, CgChart');
    expect(text).toContain('"cg-button"');
    expect(text).toContain('"cg-chart"');
    expect(text).not.toContain('"cg-table"');
  });
});
