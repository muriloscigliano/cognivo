/**
 * Dynamic Software Interfaces — G1a: golden dataset loader + integrity validator.
 *
 * Plan: ../../plans/G1a-golden-dataset.md. The dataset must be internally
 * consistent before the G1 harness trusts it (P54).
 */

import { GOLDEN, INBOX_FIELDS, type GoldenCase, type GoldenCategory } from './dataset.js';

const CATEGORIES: GoldenCategory[] = [
  'list', 'task', 'calendar', 'summary', 'board', 'filter', 'theme', 'adversarial',
];
const FIELD_SET = new Set<string>(INBOX_FIELDS);

export interface GoldenIssue {
  id: string;
  problem: string;
}

export function loadGolden(): GoldenCase[] {
  return GOLDEN;
}

/** Assert the dataset is internally consistent. Returns the list of issues (empty = valid). */
export function validateGolden(cases: GoldenCase[] = GOLDEN): GoldenIssue[] {
  const issues: GoldenIssue[] = [];
  const seen = new Set<string>();

  for (const c of cases) {
    if (seen.has(c.id)) issues.push({ id: c.id, problem: 'duplicate id' });
    seen.add(c.id);

    if (!c.intent || c.intent.trim() === '') issues.push({ id: c.id, problem: 'empty intent' });
    if (!CATEGORIES.includes(c.category)) issues.push({ id: c.id, problem: `bad category "${c.category}"` });
    if (!c.expectedShape || c.expectedShape.trim() === '') issues.push({ id: c.id, problem: 'empty expectedShape' });

    // Non-adversarial referenced fields must be real declared fields.
    if (c.category !== 'adversarial') {
      for (const f of c.mustReferenceFields ?? []) {
        if (!FIELD_SET.has(f)) issues.push({ id: c.id, problem: `references undeclared field "${f}"` });
      }
    }

    // Adversarial cases must carry a guard (either a forbidden-reference set or
    // an explicit expectShouldGovern:false), or they aren't testing anything.
    if (c.category === 'adversarial') {
      const guards = (c.mustNotReference?.length ?? 0) > 0 || c.expectShouldGovern === false;
      if (!guards) issues.push({ id: c.id, problem: 'adversarial case has no guard (mustNotReference or expectShouldGovern:false)' });
    }
  }
  return issues;
}

/** Counts per category (for coverage assertions / reporting). */
export function categoryCoverage(cases: GoldenCase[] = GOLDEN): Record<string, number> {
  const out: Record<string, number> = {};
  for (const c of cases) out[c.category] = (out[c.category] ?? 0) + 1;
  return out;
}
