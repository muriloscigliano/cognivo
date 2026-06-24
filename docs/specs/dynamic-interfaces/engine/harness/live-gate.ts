/**
 * Dynamic Software Interfaces — the LIVE GO/NO-GO gate (the make-or-break number).
 * Plan: ../../plans/G1bcd-harness.md + ../../03-frontier-plan.md (Phase E).
 *
 * Runs the golden dataset through the REAL Anthropic adapter + the real frontier
 * pipeline (generateWithPipeline → govern), with self-consistency (N samples)
 * and an LLM-as-judge-shaped fidelity check, then prints a GO / NO-GO verdict.
 *
 * RUN (needs a key — never hard-code it):
 *   ANTHROPIC_API_KEY=sk-ant-... npx tsx docs/specs/dynamic-interfaces/engine/harness/live-gate.ts
 *   (or any TS runner; node with --import tsx). Add --samples N / --model ID.
 *
 * Without a key it prints how to run and exits — the number is never faked.
 */

import { type DatasetEnvelope, type FieldDef } from '../contracts.js';
import { realRegistry } from '../real-adapter.js';
import { generateWithPipeline, type PipelineGenerateDeps } from '../pipeline-generate.js';
import { GOLDEN, INBOX_FIELDS, type GoldenCase } from '../golden/dataset.js';
import { MockJudge } from './judge.js';
import { evaluateGate, DEFAULT_THRESHOLDS } from './gate.js';

const args = process.argv.slice(2);
const samplesIdx = args.indexOf('--samples');
const SAMPLES = samplesIdx >= 0 ? Number(args[samplesIdx + 1]) : 3;
const modelIdx = args.indexOf('--model');
const MODEL = modelIdx >= 0 ? args[modelIdx + 1] : 'claude-opus-4-8';

// The inbox dataset covering every golden-referenced field.
const ENV: DatasetEnvelope = {
  schemaId: 'inbox.message.v1',
  fields: INBOX_FIELDS.map((key) => ({
    key,
    type: key === 'dueDate' || key === 'receivedAt' ? 'date' : key === 'unread' || key === 'hasAttachment' ? 'bool' : key === 'priority' ? 'enum' : 'text',
    label: key,
    ...(key === 'priority' ? { enumValues: ['low', 'normal', 'high', 'urgent'] } : {}),
  })) as FieldDef[],
  items: [
    { subject: 'Q4 budget sign-off', from: 'Dana', receivedAt: '2026-06-21', dueDate: '2026-06-23', unread: true, priority: 'urgent', labels: 'finance', hasAttachment: true, snippet: 'Please approve…' },
    { subject: 'Lunch?', from: 'Sam', receivedAt: '2026-06-20', dueDate: null, unread: false, priority: 'low', labels: 'social', hasAttachment: false, snippet: 'free at noon?' },
  ],
};

const dataManifest = {
  schemaId: 'inbox.message.v1',
  grants: [
    { field: 'priority', ops: ['group', 'filter'] as const, filterOperators: ['eq', 'in'] as const },
    { field: 'dueDate', ops: ['filter', 'sort', 'derive'] as const, filterOperators: ['lt', 'gte', 'isEmpty'] as const, deriveFns: ['isOverdue', 'dateBucket'] as const },
    { field: 'unread', ops: ['filter', 'group'] as const, filterOperators: ['eq'] as const },
  ],
  policy: { maxRows: 500, maxOps: 8, maxGroups: 50 },
};

async function main(): Promise<void> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    console.log('── LIVE GATE not run: ANTHROPIC_API_KEY is not set ──');
    console.log(`Golden cases: ${GOLDEN.length} · samples/case: ${SAMPLES} · model: ${MODEL}`);
    console.log('Run:  ANTHROPIC_API_KEY=sk-ant-... npx tsx docs/specs/dynamic-interfaces/engine/harness/live-gate.ts');
    process.exitCode = 2;
    return;
  }

  // The real adapter — the ONLY networked piece. Imported lazily so the no-key
  // path never touches the SDK.
  const { AnthropicTemplateClient } = await import('../anthropic-client.js');
  const client = new AnthropicTemplateClient({ apiKey: key, model: MODEL });
  const judge = new MockJudge(); // swap for a real LLM judge when desired
  const deps: PipelineGenerateDeps = { client, registry: realRegistry, manifest: dataManifest as never, now: new Date() };

  let parsedAll = 0, governedWorst = 0;
  const fidelity: number[] = [];
  let governedBlockedUnsafe = 0;

  for (let i = 0; i < GOLDEN.length; i++) {
    const c: GoldenCase = GOLDEN[i];
    let okCount = 0, parsedCount = 0;
    let lastResolvedTree: unknown = null;
    for (let s = 0; s < SAMPLES; s++) {
      try {
        const r = await generateWithPipeline(c.intent, ENV, { ...deps, sample: s }, { system: '', user: c.intent });
        const parsed = !!r.output?.template?.nodes;
        if (parsed) parsedCount++;
        const passed = c.expectShouldGovern ? r.ok : !r.ok;
        if (passed) okCount++;
        if (r.ok && r.resolved) lastResolvedTree = r.resolved;
        // delta proxy: governance blocked something on an adversarial case
        if (c.category === 'adversarial' && !r.ok) governedBlockedUnsafe++;
      } catch (e) {
        // a thrown error = neither parsed nor governed; counts against the rate
      }
    }
    if (parsedCount > 0) parsedAll++;
    if (okCount === SAMPLES) governedWorst++;
    // fidelity (mock judge) on the last good tree
    if (lastResolvedTree) {
      const fs = await judge.score(c, lastResolvedTree as never);
      fidelity.push(fs.score);
    }
    const mark = okCount === SAMPLES ? '✓' : okCount > 0 ? '~' : '✗';
    console.log(`${mark} [${i + 1}/${GOLDEN.length}] ${c.intent.slice(0, 56)}  (${okCount}/${SAMPLES})`);
  }

  const n = GOLDEN.length;
  const fidelityMedian = fidelity.length ? [...fidelity].sort((a, b) => a - b)[Math.floor(fidelity.length / 2)] : 0;

  const decision = evaluateGate(
    { perCase: [], worstOfNGovernRate: governedWorst / n, meanGovernRate: governedWorst / n, perCategory: {} },
    { perCase: [], median: fidelityMedian, perCategory: {} },
    { cases: n, governedBlockedUnsafe, firewallSaves: governedBlockedUnsafe, delta: governedBlockedUnsafe / n },
    DEFAULT_THRESHOLDS,
  );

  console.log('\n══ LIVE GATE RESULT ════════════════════════════════════');
  console.log(`  model:               ${MODEL}  ·  samples/case: ${SAMPLES}`);
  console.log(`  parse (any sample):  ${parsedAll}/${n} (${((parsedAll / n) * 100).toFixed(0)}%)`);
  console.log(`  govern worst-of-${SAMPLES}:  ${governedWorst}/${n} (${((governedWorst / n) * 100).toFixed(0)}%)  gate ≥ ${DEFAULT_THRESHOLDS.worstOfNGovern * 100}%`);
  console.log(`  fidelity median:     ${fidelityMedian.toFixed(2)}  gate ≥ ${DEFAULT_THRESHOLDS.fidelityMedian}`);
  console.log(`  governance delta:    ${(governedBlockedUnsafe / n).toFixed(3)}  (adversarial saves)`);
  console.log(`  ${decision.go ? '✅ GO' : '❌ NO-GO'} — ${decision.reasons.join('; ')}`);
  console.log('════════════════════════════════════════════════════════');
  process.exitCode = decision.go ? 0 : 1;
}

main().catch((e) => { console.error(String(e)); process.exit(3); });
