/**
 * G1a golden dataset integrity test. Plan: ../../plans/G1a-golden-dataset.md.
 * Run: node_modules/.bin/vitest run docs/specs/dynamic-interfaces/engine/golden/golden.test.ts
 */
import { describe, it, expect } from 'vitest';
import { GOLDEN, INBOX_FIELDS } from './dataset.js';
import { loadGolden, validateGolden, categoryCoverage } from './loader.js';

describe('G1a — dataset size + integrity', () => {
  it('has at least 50 cases (P54 floor)', () => {
    expect(loadGolden().length).toBeGreaterThanOrEqual(50);
  });

  it('all ids are unique', () => {
    const ids = GOLDEN.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('passes integrity validation with zero issues', () => {
    const issues = validateGolden();
    if (issues.length) console.error(issues); // surface in CI on failure
    expect(issues).toEqual([]);
  });
});

describe('G1a — fidelity ground truth is real', () => {
  it('every non-adversarial referenced field is a declared inbox field', () => {
    const fields = new Set<string>(INBOX_FIELDS);
    for (const c of GOLDEN) {
      if (c.category === 'adversarial') continue;
      for (const f of c.mustReferenceFields ?? []) {
        expect(fields.has(f), `${c.id} references ${f}`).toBe(true);
      }
    }
  });

  it('every adversarial case carries a guard', () => {
    for (const c of GOLDEN.filter((x) => x.category === 'adversarial')) {
      const guarded = (c.mustNotReference?.length ?? 0) > 0 || c.expectShouldGovern === false;
      expect(guarded, `${c.id} guarded`).toBe(true);
    }
  });
});

describe('G1a — category coverage', () => {
  it('all eight shape categories are represented', () => {
    const cov = categoryCoverage();
    for (const cat of ['list', 'task', 'calendar', 'summary', 'board', 'filter', 'theme', 'adversarial']) {
      expect(cov[cat] ?? 0, `category ${cat}`).toBeGreaterThan(0);
    }
  });

  it('has a meaningful adversarial set (≥ 5)', () => {
    expect(categoryCoverage().adversarial).toBeGreaterThanOrEqual(5);
  });
});
