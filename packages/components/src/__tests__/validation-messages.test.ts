import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

/** Validation texts must come from attributes / a locale map / the browser — never literals in components. */
describe('no hard-coded validation messages', () => {
  it('no component passes a string literal or template literal message to setValidity', () => {
    const root = join(__dirname, '..', 'components');
    const offenders: string[] = [];
    for (const dir of readdirSync(root)) {
      const full = join(root, dir);
      if (!statSync(full).isDirectory()) continue;
      for (const f of readdirSync(full).filter((n) => n.endsWith('.ts'))) {
        const src = readFileSync(join(full, f), 'utf8');
        for (const m of src.matchAll(/setValidity\(\s*\{[^}]*\}\s*,\s*(['"`][^'"`]*['"`])/g)) offenders.push(`${dir}/${f}: ${m[1]}`);
      }
    }
    expect(offenders).toEqual([]);
  });
});
