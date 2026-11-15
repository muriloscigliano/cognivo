import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

/**
 * Every CustomEvent a component dispatches must be reachable from React as an
 * `on*` prop. The spike had to fall back to `oncg-combobox-change` /
 * `oncg-modal-close` because the wrappers mapped no events at all.
 */
const __dirname = dirname(fileURLToPath(import.meta.url));
const componentsDir = resolve(__dirname, '../../../components/src/components');
const wrappersDir = resolve(__dirname, '../components');
const pascal = (k: string) => k.split('-').map((s) => s[0]!.toUpperCase() + s.slice(1)).join('');

describe('React adapter event coverage', () => {
  it('every dispatched CustomEvent is mapped by its wrapper', () => {
    const missing: string[] = [];
    for (const tag of readdirSync(componentsDir)) {
      const src = resolve(componentsDir, tag, `${tag}.ts`);
      const wrapper = resolve(wrappersDir, `${pascal(tag)}.ts`);
      if (!existsSync(src) || !existsSync(wrapper)) continue;
      const dispatched = new Set(
        [...readFileSync(src, 'utf8').matchAll(/new CustomEvent(?:<[^>]*>)?\(\s*['"`]([a-z][\w-]*)['"`]/g)].map((m) => m[1]!),
      );
      const mapped = new Set([...readFileSync(wrapper, 'utf8').matchAll(/:\s*['"]([a-z][\w-]*)['"]/g)].map((m) => m[1]!));
      for (const ev of dispatched) if (!mapped.has(ev)) missing.push(`${tag}: ${ev}`);
    }
    expect(missing).toEqual([]);
  });
});
