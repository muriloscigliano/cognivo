/**
 * Dynamic Software Interfaces — G0: the generate() orchestrator.
 *
 * Plan: ../plans/G0-generation.md.  Pure orchestration: assemble prompt (F3 +
 * examples + fields) → call the LLM client → govern the structured tree (F2).
 * Client + governance deps are injected, so this is testable with MockLLM and
 * swaps to the real adapter unchanged. The bounded repair loop (G1e) hooks in
 * at the marked seam.
 */

import { type DatasetEnvelope } from './contracts.js';
import { type UiNode } from './resolver.js';
import { govern, type GovernDeps, type GovernResult } from './governance.js';
import { type LlmClient } from './llm.js';
import { assemblePrompt, type AssembleOptions, type AssembledPrompt } from './prompt.js';
import { type InjectionFlag } from './injection-defense.js';

export interface GenerateDeps {
  client: LlmClient;
  govern: GovernDeps;
  assemble?: AssembleOptions;
  /** Sampling index passed to the client (self-consistency, G1b). */
  sample?: number;
}

export interface GenerateResult {
  tree: UiNode;
  govern: GovernResult;
  prompt: AssembledPrompt;
  /** True only if generation produced a renderable, governed tree. */
  ok: boolean;
  /** Injection flags from the dataset (observability). */
  flags: InjectionFlag[];
}

/**
 * Generate a governed UI surface from an intent + dataset.
 * Never returns a renderable tree that failed governance — `ok` reflects F2.
 */
export async function generate(
  intent: string,
  env: DatasetEnvelope,
  deps: GenerateDeps,
): Promise<GenerateResult> {
  const prompt = assemblePrompt(intent, env, deps.assemble);
  const res = await deps.client.generate({
    system: prompt.system,
    user: prompt.user,
    sample: deps.sample,
  });

  // ── repair-loop seam (G1e): if !governResult.ok, a bounded refine pass will
  //    re-call the client with the rejections fed back. G0 leaves the hook. ──
  const governResult = govern(res.tree, env, deps.govern);

  return {
    tree: res.tree,
    govern: governResult,
    prompt,
    ok: governResult.ok,
    flags: prompt.flags,
  };
}
