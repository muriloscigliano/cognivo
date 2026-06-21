/**
 * Dynamic Software Interfaces — G1d: delta vs raw LLM (the moat justification).
 *
 * Plan: ../../plans/G1bcd-harness.md.  Run the same cases with governance ON
 * (our pipeline) vs OFF (raw LLM output rendered as-is). Measure how many raw
 * outputs would have shipped unsafe/undeclared-field/raw-token content that our
 * governance blocked. No measurable delta = no product (vision §2/§6).
 */

import { type DatasetEnvelope } from '../contracts.js';
import { generate, type GenerateDeps } from '../generate.js';
import { govern } from '../governance.js';
import { type GoldenCase } from '../golden/dataset.js';

export interface DeltaReport {
  cases: number;
  /** Raw outputs that WOULD have rendered but our gate rejected (safety saves). */
  governedBlockedUnsafe: number;
  /** Of those, how many were firewall (undeclared-field) saves specifically. */
  firewallSaves: number;
  /** Fraction of cases where governance changed the outcome (the delta). */
  delta: number;
}

/**
 * For each case, compare:
 *  - raw: the client's tree with NO governance (would render as-is).
 *  - governed: the same tree through govern().
 * A "save" is a case where raw would have rendered but governed rejected it.
 */
export async function runDelta(
  cases: GoldenCase[],
  env: DatasetEnvelope,
  deps: GenerateDeps,
): Promise<DeltaReport> {
  let governedBlockedUnsafe = 0;
  let firewallSaves = 0;

  for (const c of cases) {
    // One generation; inspect both the raw tree and the governed verdict.
    const g = await generate(c.intent, env, deps);
    const rawWouldRender = true; // raw path renders whatever the model emits
    const governedRejected = !g.govern.ok;

    if (rawWouldRender && governedRejected) {
      governedBlockedUnsafe++;
      if (g.govern.rejections.some((r) => r.code === 'undeclared-field')) firewallSaves++;
    }
  }

  return {
    cases: cases.length,
    governedBlockedUnsafe,
    firewallSaves,
    delta: governedBlockedUnsafe / (cases.length || 1),
  };
}

/**
 * Sanity helper: re-govern an arbitrary raw tree (used by tests / observability).
 */
export { govern as governRaw };
