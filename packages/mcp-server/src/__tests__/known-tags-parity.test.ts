import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { KNOWN_COMPONENTS } from '../server/tools/_shared.js';

interface CatalogShape { components: Array<{ tag: string }> }

describe('known-tags parity', () => {
  it('KNOWN_COMPONENTS matches catalog.json tags exactly', () => {
    const catalog = JSON.parse(
      readFileSync(new URL('../catalog/catalog.json', import.meta.url), 'utf8'),
    ) as CatalogShape;
    const catalogTags = catalog.components.map((c) => c.tag).sort();
    const known = [...KNOWN_COMPONENTS].sort();
    expect(known).toEqual(catalogTags);
  });
});
