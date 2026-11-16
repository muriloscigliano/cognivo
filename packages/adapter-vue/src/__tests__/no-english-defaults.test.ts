import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

/**
 * cg-* components translate their own text (`setMessages()` / the `messages`
 * attribute) and fall back to English only when a text prop is unset. A Vue
 * wrapper that defaults such a prop to English would always pass English in
 * and silently override the translation.
 */
const __dirname = dirname(fileURLToPath(import.meta.url));
const dir = resolve(__dirname, '../components');

describe('Vue wrappers do not hard-code English defaults for cg-* text', () => {
  it('no Cg* wrapper prop defaults to an English phrase', () => {
    const offenders: string[] = [];
    for (const f of readdirSync(dir).filter((n) => n.startsWith('Cg'))) {
      for (const m of readFileSync(resolve(dir, f), 'utf8').matchAll(/(\w+):\s*\{[^}]*default:\s*'([A-Z][a-z][^']*)'/g)) {
        offenders.push(`${f}: ${m[1]} = '${m[2]}'`);
      }
    }
    expect(offenders).toEqual([]);
  });
});
