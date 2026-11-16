// @vitest-environment node
/**
 * Disabled is 40% everywhere: every component rule whose selector is a
 * disabled state (`:disabled`, `[disabled]`, `.disabled`, `[aria-disabled="true"]`,
 * `.disabled-day`, …) and dims with `opacity` uses `var(--cg-opacity-40)`.
 * Hidden (`0`) and restored (`1`) values are not dimming and are ignored, as
 * are `:not(:disabled)` selectors (they style the enabled state).
 */
import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';

const src = resolve(__dirname, '..');

function tsFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
    d.isDirectory() ? (d.name === '__tests__' ? [] : tsFiles(join(dir, d.name))) : d.name.endsWith('.ts') && !d.name.endsWith('.test.ts') ? [join(dir, d.name)] : [],
  );
}

describe('disabled opacity', () => {
  it('every disabled-state rule that dims uses var(--cg-opacity-40)', () => {
    const off: string[] = [];
    for (const file of tsFiles(src)) {
      for (const m of readFileSync(file, 'utf8').matchAll(/\bcss`([^`]*)`/g)) {
        const css = m[1]!.replace(/\/\*[\s\S]*?\*\//g, '');
        for (const r of css.matchAll(/([^{};]+)\{([^{}]*)\}/g)) {
          const selectors = r[1]!.split(',').map((s) => s.replace(/:not\((?:[^()]|\([^()]*\))*\)/g, ''));
          if (!selectors.some((s) => /disabled/.test(s))) continue;
          const o = r[2]!.match(/(?:^|;|\s)opacity\s*:\s*([^;]+)/);
          if (!o) continue;
          const v = o[1]!.trim().replace(/\s*!important$/, '');
          if (v === '0' || v === '1' || v === 'var(--cg-opacity-40)') continue;
          off.push(`${file.slice(src.length + 1)}: ${r[1]!.trim().replace(/\s+/g, ' ')} { opacity: ${v} }`);
        }
      }
    }
    expect(off).toEqual([]);
  });
});
