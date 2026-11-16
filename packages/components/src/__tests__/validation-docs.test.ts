import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * The validation helpers' own documentation must point at the side-effect
 * free `@cognivo/components/validation` subpath. The root import registers
 * every component (~200 custom elements) just to set a message map.
 */
describe('validation.ts documentation', () => {
  it('recommends the /validation subpath, never the package root', () => {
    const src = readFileSync(join(__dirname, '..', 'utils', 'validation.ts'), 'utf8');
    const doc = src.slice(0, src.indexOf('*/'));
    expect(doc).toContain("from '@cognivo/components/validation'");
    expect(doc).not.toMatch(/from '@cognivo\/components'/);
  });
});
