import { describe, expect, it } from 'vitest';
import { KNOWN_COMPONENTS } from '@cognivo/mcp-server/shared';
import { EVAL_DATASET } from '../dataset.js';

const known = new Set(KNOWN_COMPONENTS);

describe('eval dataset', () => {
  it('has at least 10 cases with unique ids', () => {
    expect(EVAL_DATASET.length).toBeGreaterThanOrEqual(10);
    expect(new Set(EVAL_DATASET.map((c) => c.id)).size).toBe(EVAL_DATASET.length);
  });

  it('every expected tag exists in the catalog', () => {
    for (const c of EVAL_DATASET) {
      for (const group of c.expect.anyOf ?? [])
        for (const tag of group) expect(known.has(tag), `${c.id}: unknown tag ${tag}`).toBe(true);
      for (const tag of c.expect.mustUseTags ?? [])
        expect(known.has(tag), `${c.id}: unknown tag ${tag}`).toBe(true);
      for (const tag of c.expect.forbidTags ?? [])
        expect(known.has(tag), `${c.id}: unknown forbid tag ${tag}`).toBe(true);
    }
  });

  it('prompts never name an expected component (hidden-answer rule)', () => {
    for (const c of EVAL_DATASET) {
      const tags = [
        ...(c.expect.anyOf ?? []).flat(),
        ...(c.expect.mustUseTags ?? []),
      ];
      for (const tag of tags) {
        const bare = tag.replace(/^(cg|ai|bias)-/, '');
        expect(
          c.prompt.toLowerCase().includes(bare),
          `${c.id}: prompt leaks expected component "${tag}"`,
        ).toBe(false);
      }
    }
  });
});
