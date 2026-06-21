/**
 * Dynamic Software Interfaces — the GO/NO-GO gate runner.
 *
 * Plan: ../../plans/G1bcd-harness.md.
 *
 *   Dry run (no key, deterministic mock — verifies wiring):
 *     node_modules/.bin/vitest run ...   (the harness tests), or run this file
 *     with a TS loader for the mock summary.
 *
 *   LIVE GO/NO-GO (the make-or-break number — needs a real key + adapter shim):
 *     ANTHROPIC_API_KEY=… <ts-runner> docs/specs/dynamic-interfaces/engine/harness/cli.ts
 *
 * The live adapter shim (wrapping @cognivo/adapter-anthropic to the LlmClient
 * seam) + a real LLM judge are wired in the marked block when a key is present.
 * Without a key, this prints how to run and a mock dry-run summary — the number
 * is never faked.
 */

import { type DatasetEnvelope } from '../contracts.js';
import { MockLLM, type LlmClient } from '../llm.js';
import { type GenerateDeps } from '../generate.js';
import { type ComponentRegistry, type TokenValidator } from '../governance.js';
import { GOLDEN, INBOX_FIELDS } from '../golden/dataset.js';
import { runSelfConsistency } from './runner.js';
import { MockJudge, runFidelity, type Judge } from './judge.js';
import { runDelta } from './baseline.js';
import { evaluateGate } from './gate.js';
import { generateWithRepair } from '../repair.js';

// A dataset covering all golden-referenced fields (so the mock's trees govern).
const ENV: DatasetEnvelope = {
  schemaId: 'inbox.message.v1',
  fields: INBOX_FIELDS.map((key) => ({
    key,
    type: key === 'dueDate' || key === 'receivedAt' ? 'date' : key === 'unread' || key === 'hasAttachment' ? 'bool' : key === 'priority' ? 'enum' : 'text',
    label: key,
    ...(key === 'priority' ? { enumValues: ['low', 'normal', 'high', 'urgent'] } : {}),
  })) as DatasetEnvelope['fields'],
  items: [{ subject: 'Budget', priority: 'high', unread: true }],
};

// Real-adapter seam: when a key exists, wrap @cognivo/adapter-anthropic here to
// the LlmClient interface. Left as a documented seam — wired when we run live.
async function makeLiveClient(_apiKey: string): Promise<LlmClient> {
  // const { AnthropicClient } = await import('@cognivo/adapter-anthropic');
  // const client = new AnthropicClient({ apiKey });
  // return { name: 'anthropic', generate: async (req) => { /* call + parse to UiNode */ } };
  throw new Error('Live Anthropic adapter shim not yet wired — see G1b follow-up.');
}

async function main(): Promise<void> {
  const key = process.env.ANTHROPIC_API_KEY;

  const registry: ComponentRegistry = { getTagName: (t) => (['Stack', 'Row', 'Checkbox', 'Text'].includes(t) ? `cg-${t.toLowerCase()}` : undefined) };
  const validateTokens: TokenValidator = () => [];

  let client: LlmClient;
  let judge: Judge;

  if (!key) {
    console.log('── DRY RUN (no ANTHROPIC_API_KEY) — verifying harness wiring ──');
    console.log(`golden cases: ${GOLDEN.length}`);
    console.log('Set ANTHROPIC_API_KEY to run the LIVE GO/NO-GO measurement.\n');
    client = new MockLLM();
    judge = new MockJudge();
  } else {
    client = await makeLiveClient(key); // throws until the shim is wired
    judge = new MockJudge(); // replace with a real LLM judge when running live
  }

  const deps: GenerateDeps = { client, govern: { registry, validateTokens } };
  const samples = key ? 5 : 2;

  const consistency = await runSelfConsistency(GOLDEN, ENV, deps, { samples });

  // Collect accepted surfaces for fidelity scoring.
  const pairs = [];
  for (const c of GOLDEN) {
    const r = await generateWithRepair(c.intent, ENV, deps);
    if (r.final.ok) pairs.push({ caseDef: c, surface: r.final.tree });
  }
  const fidelity = await runFidelity(pairs, judge);
  const delta = await runDelta(GOLDEN, ENV, deps);
  const decision = evaluateGate(consistency, fidelity, delta);

  console.log('── REPORT ──');
  console.log(`worst-of-N govern rate: ${(consistency.worstOfNGovernRate * 100).toFixed(0)}%`);
  console.log(`fidelity median:        ${fidelity.median.toFixed(2)}`);
  console.log(`governance delta:       ${delta.delta.toFixed(3)} (${delta.governedBlockedUnsafe} saves, ${delta.firewallSaves} firewall)`);
  console.log(`\n${decision.go ? '✅ GO' : '❌ NO-GO'} — ${decision.reasons.join('; ')}`);
  if (!key) console.log('\n(Mock dry-run: numbers verify wiring, NOT the real model. Provide a key for the real gate.)');
}

main().catch((e) => {
  console.error(String(e));
  process.exitCode = 1;
});
