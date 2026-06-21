/**
 * Dynamic Software Interfaces — G1b: self-consistency runner (P16).
 *
 * Plan: ../../plans/G1bcd-harness.md.  Each golden case is sampled N times; we
 * report worst-of-N (a model that's 80% once but 40% next is NOT 80%) plus
 * variance. Wired to the LlmClient seam → mock now, live with a real client.
 */

import { type DatasetEnvelope } from '../contracts.js';
import { generateWithRepair, type RepairResult } from '../repair.js';
import { type GenerateDeps } from '../generate.js';
import { type GoldenCase } from '../golden/dataset.js';

export interface CaseConsistency {
  id: string;
  category: string;
  samples: number;
  okCount: number;
  meanRate: number;
  worstOfN: boolean; // did EVERY sample pass governance?
  variance: number;
}

export interface ConsistencyReport {
  perCase: CaseConsistency[];
  /** worst-of-N parse/govern rate: fraction of cases where ALL samples passed. */
  worstOfNGovernRate: number;
  /** mean govern rate across all samples of all cases. */
  meanGovernRate: number;
  perCategory: Record<string, { cases: number; worstOfNPass: number }>;
}

export interface RunOptions {
  samples?: number; // N, default 5
}

function variance(values: number[]): number {
  if (values.length === 0) return 0;
  const m = values.reduce((a, b) => a + b, 0) / values.length;
  return values.reduce((a, b) => a + (b - m) ** 2, 0) / values.length;
}

export async function runSelfConsistency(
  cases: GoldenCase[],
  env: DatasetEnvelope,
  deps: GenerateDeps,
  opts: RunOptions = {},
): Promise<ConsistencyReport> {
  const samples = Math.max(1, opts.samples ?? 5);
  const perCase: CaseConsistency[] = [];
  const perCategory: Record<string, { cases: number; worstOfNPass: number }> = {};

  for (const c of cases) {
    const oks: number[] = [];
    for (let s = 0; s < samples; s++) {
      const r: RepairResult = await generateWithRepair(c.intent, env, { ...deps, sample: s });
      // For adversarial cases that should NOT govern, "ok" means it was correctly rejected.
      const passed = c.expectShouldGovern ? r.final.ok : !r.final.ok;
      oks.push(passed ? 1 : 0);
    }
    const okCount = oks.reduce((a, b) => a + b, 0);
    const worstOfN = okCount === samples;
    perCase.push({
      id: c.id,
      category: c.category,
      samples,
      okCount,
      meanRate: okCount / samples,
      worstOfN,
      variance: variance(oks),
    });
    const cat = (perCategory[c.category] ??= { cases: 0, worstOfNPass: 0 });
    cat.cases++;
    if (worstOfN) cat.worstOfNPass++;
  }

  const worstOfNGovernRate = perCase.filter((x) => x.worstOfN).length / (perCase.length || 1);
  const meanGovernRate =
    perCase.reduce((a, x) => a + x.meanRate, 0) / (perCase.length || 1);

  return { perCase, worstOfNGovernRate, meanGovernRate, perCategory };
}
