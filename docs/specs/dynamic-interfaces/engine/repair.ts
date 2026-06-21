/**
 * Dynamic Software Interfaces — G1e: bounded self-refine (repair loop).
 *
 * Plan: ../plans/G1e-repair.md.  Build principle: no shortcuts — a real bounded
 * loop with a HARD cap AND convergence detection. Never unbounded (playbook:
 * Infinite Loop of Doom). On governance failure, feed the structured rejections
 * back to the model (P12 Self-Refine; the "critic" is our own govern(), P13).
 */

import { type DatasetEnvelope } from './contracts.js';
import { generate, type GenerateDeps, type GenerateResult } from './generate.js';

export interface RepairOptions {
  /** Hard cap on total client calls. Default 3. Always finite. */
  maxIterations?: number;
}

export interface AttemptRecord {
  iteration: number;
  ok: boolean;
  rejectionCodes: string[];
}

export interface RepairResult {
  /** Best result seen (fewest rejections; ok if any attempt passed). */
  final: GenerateResult;
  attempts: AttemptRecord[];
  /** True if an attempt passed governance within the cap. */
  converged: boolean;
  /** Number of client calls actually made. */
  iterations: number;
}

/** The fed-back critic message: prior failure + its reasons. */
export function buildRepairUser(intent: string, priorRejections: { code: string; message: string }[]): string {
  const reasons = priorRejections.map((r) => `- [${r.code}] ${r.message}`).join('\n');
  return [
    `Intent: ${intent}`,
    '',
    'Your previous attempt was REJECTED by the governance gate for these reasons:',
    reasons,
    '',
    'Produce a corrected component tree that fixes every issue above. Bind only to',
    'declared fields, use only known components, and give interactive components a label.',
  ].join('\n');
}

function rejectionCodes(r: GenerateResult): string[] {
  return r.govern.rejections.map((x) => x.code);
}

/**
 * Generate with a bounded repair loop.
 * - At most `maxIterations` client calls.
 * - Stops as soon as an attempt passes governance.
 * - Convergence detection: if a retry does not REDUCE the rejection count,
 *   bail early (no progress) rather than burning the remaining cap.
 * - Keeps the best (fewest-rejection) attempt; never returns a worse tree.
 */
export async function generateWithRepair(
  intent: string,
  env: DatasetEnvelope,
  deps: GenerateDeps,
  opts: RepairOptions = {},
): Promise<RepairResult> {
  const maxIterations = Math.max(1, opts.maxIterations ?? 3);
  const attempts: AttemptRecord[] = [];

  // First attempt: the normal intent.
  let result = await generate(intent, env, { ...deps, sample: deps.sample });
  let best = result;
  let bestCount = result.govern.rejections.length;
  attempts.push({ iteration: 1, ok: result.ok, rejectionCodes: rejectionCodes(result) });

  let iteration = 1;
  while (!result.ok && iteration < maxIterations) {
    const priorCount = result.govern.rejections.length;
    const repairUser = buildRepairUser(intent, result.govern.rejections);

    iteration++;
    // Re-run generation with the critic message as the intent (the client sees
    // the fed-back rejections). The dataset + governance deps are unchanged.
    result = await generate(repairUser, env, { ...deps, sample: deps.sample });
    attempts.push({ iteration, ok: result.ok, rejectionCodes: rejectionCodes(result) });

    const count = result.govern.rejections.length;
    if (count < bestCount) {
      best = result;
      bestCount = count;
    }

    // Convergence detection: stop if no progress (didn't reduce rejections).
    if (!result.ok && count >= priorCount) break;
  }

  // If the latest passed, it's the best by definition.
  if (result.ok) best = result;

  return {
    final: best,
    attempts,
    converged: best.ok,
    iterations: attempts.length,
  };
}
