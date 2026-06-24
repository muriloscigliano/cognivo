/**
 * Dynamic Software Interfaces — G1c: LLM-as-judge fidelity (P55).
 *
 * Plan: ../../plans/G1bcd-harness.md.  Validity (it governs) is not fidelity
 * (it's the surface Maya meant). The judge scores each accepted surface against
 * the case's expectedShape + mustReferenceFields. A real judge is an LlmClient;
 * MockJudge is deterministic for tests.
 */

import { type GoldenCase } from '../golden/dataset.js';
import { collectFieldBindings, type UiNode } from '../resolver.js';

export interface FidelityScore {
  id: string;
  score: number; // 0..1
  reasoning: string;
}

export interface Judge {
  readonly name: string;
  score(caseDef: GoldenCase, surface: UiNode): Promise<FidelityScore>;
}

/**
 * Deterministic mock judge: rewards a surface that binds the fields a faithful
 * answer should reference, and penalizes referencing forbidden data. Good enough
 * to test the harness wiring without a key; a real LLM judge replaces it live.
 */
export class MockJudge implements Judge {
  readonly name = 'mock-judge';
  async score(caseDef: GoldenCase, surface: UiNode): Promise<FidelityScore> {
    // Bindings may carry a repeat-alias prefix (e.g. "item.subject"); compare on
    // the bare field name so expected fields match regardless of the alias.
    const bound = new Set(collectFieldBindings(surface).map((k) => (k.includes('.') ? k.split('.').pop()! : k)));
    const must = caseDef.mustReferenceFields ?? [];
    const mustNot = caseDef.mustNotReference ?? [];

    let score = 1;
    const notes: string[] = [];

    if (must.length) {
      const hit = must.filter((f) => bound.has(f)).length;
      const frac = hit / must.length;
      score *= frac;
      if (frac < 1) notes.push(`missing ${must.length - hit}/${must.length} expected fields`);
    }
    for (const bad of mustNot) {
      if (bound.has(bad)) {
        score = 0;
        notes.push(`references forbidden "${bad}"`);
      }
    }
    return {
      id: caseDef.id,
      score: Math.max(0, Math.min(1, score)),
      reasoning: notes.length ? notes.join('; ') : `binds expected fields for "${caseDef.expectedShape}"`,
    };
  }
}

export interface FidelityReport {
  perCase: FidelityScore[];
  median: number;
  perCategory: Record<string, number>; // median per category
}

function median(xs: number[]): number {
  if (!xs.length) return 0;
  const s = [...xs].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

/** Score fidelity for a set of (case, accepted-surface) pairs. */
export async function runFidelity(
  pairs: Array<{ caseDef: GoldenCase; surface: UiNode }>,
  judge: Judge,
): Promise<FidelityReport> {
  const perCase: FidelityScore[] = [];
  const byCat: Record<string, number[]> = {};
  for (const { caseDef, surface } of pairs) {
    const s = await judge.score(caseDef, surface);
    perCase.push(s);
    (byCat[caseDef.category] ??= []).push(s.score);
  }
  const perCategory: Record<string, number> = {};
  for (const [cat, xs] of Object.entries(byCat)) perCategory[cat] = median(xs);
  return { perCase, median: median(perCase.map((x) => x.score)), perCategory };
}
