// @vitest-environment node
/**
 * Size budget for the embeddable sign-up form: cg-input + cg-checkbox +
 * cg-button + Lit, bundled from the BUILT per-component entries (dist/) the
 * way a consumer's bundler sees them — esbuild, minified, tree-shaken.
 * The growth-kit spike measured 14.6 KB gzip for these three + Lit (16.4 KB
 * with its form code and tokens). Lit alone is 6.5 KB gzip, so the 10 KB goal
 * leaves 3.7 KB for all three components; today they take ~5.7 KB. The gate
 * holds the measured level (12.2 KB) with small headroom so it cannot regress;
 * reaching 10 KB needs a decision to move variants out of these components.
 * Requires `pnpm build` first (turbo runs build before test).
 */
import { describe, it, expect } from 'vitest';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { gzipSync } from 'node:zlib';
import { build } from 'esbuild';

const pkg = resolve(__dirname, '..', '..');
const entry = (t: string) => `./dist/components/${t}/${t}.js`;
const BUDGET_GZIP = 12.5 * 1024;

describe.skipIf(!existsSync(resolve(pkg, entry('cg-input'))))('per-component bundle size', () => {
  it('input + checkbox + button + Lit stays <= 12.5 KB gzip and carries no unused shared styles', async () => {
    const out = await build({
      stdin: { contents: ['cg-input', 'cg-checkbox', 'cg-button'].map((t) => `import '${entry(t)}';`).join('\n'), resolveDir: pkg },
      bundle: true,
      minify: true,
      treeShaking: true,
      format: 'esm',
      target: 'es2022',
      write: false,
      logLevel: 'silent',
    });
    const code = out.outputFiles[0]!.contents;
    const gzip = gzipSync(code, { level: 9 }).length;
    const text = Buffer.from(code).toString('utf8');
    // Sentinels from shared style exports none of the three components use.
    const sentinels = {
      menuListStyles: 'min-width: 200px',
      aiGlow: 'cg-ai-effect-glow',
      liquidFillHover: 'translateY(102%)',
      glassCard: 'backdrop-filter',
    };
    const leaked = Object.entries(sentinels).filter(([, s]) => text.includes(s)).map(([n]) => n);
    expect(leaked, 'unused shared styles bundled').toEqual([]);
    expect(gzip, `gzip ${gzip} B`).toBeLessThanOrEqual(BUDGET_GZIP);
  });
});

describe.skipIf(!existsSync(resolve(pkg, entry('cg-input'))))('package side effects', () => {
  it('importing only the validation helper (unused) bundles nothing', async () => {
    const out = await build({
      stdin: { contents: "import '@cognivo/components/validation';", resolveDir: pkg },
      bundle: true, minify: true, treeShaking: true, format: 'esm', write: false, logLevel: 'silent',
    });
    expect(out.outputFiles[0]!.text.trim()).toBe('');
  });
});
