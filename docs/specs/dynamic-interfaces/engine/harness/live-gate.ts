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

import { readFileSync } from 'node:fs';
import { type DatasetEnvelope, type FieldDef } from '../contracts.js';
import { realRegistry } from '../real-adapter.js';

// Load .env ourselves (Node's --env-file is finicky about comment lines on some
// versions). Reads repo-root .env, ignores comments/blanks, sets any var not
// already in the environment. Never logs values.
function loadDotEnv(): void {
  try {
    const text = readFileSync(new URL('../../../../../.env', import.meta.url), 'utf8');
    for (const raw of text.split('\n')) {
      const line = raw.trim();
      if (!line || line.startsWith('#')) continue;
      const eq = line.indexOf('=');
      if (eq < 0) continue;
      const k = line.slice(0, eq).trim();
      let v = line.slice(eq + 1).trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
      // Set if unset, empty, or a leftover placeholder — an empty exported var
      // ("" from a prior shell command) must NOT shadow the real .env value.
      const existing = process.env[k];
      if (k && (existing === undefined || existing === '' || existing.includes('YOUR-KEY') || existing.includes('REPLACE'))) {
        process.env[k] = v;
      }
    }
  } catch {
    /* no .env — rely on the real environment */
  }
}
loadDotEnv();
import { generateWithPipeline, type PipelineGenerateDeps } from '../pipeline-generate.js';

// The real components the model may compose from (must resolve in the registry).
const COMPONENTS = ['Stack', 'Card', 'TextContent', 'Badge', 'Checkbox', 'MetricCard', 'Avatar'] as const;

/** System prompt that teaches the EXACT engine shape: flat nodes, real components,
 *  declared fields, binding grammar. Without this the model invents components the
 *  registry rejects. */
function buildSystem(env: DatasetEnvelope): string {
  const fields = env.fields.filter((f) => f.key !== 'items').map((f) => `- ${f.key} (${f.type})${f.enumValues ? ` one of [${f.enumValues.join(', ')}]` : ''}`).join('\n');
  // A COMPLETE, VALID example — the model copies this exact shape. Every node has
  // an "id" matching its map key; every prop value is {kind:"field"|"literal"};
  // a repeat renders one subtree per item.
  const example = JSON.stringify({
    schemaId: 'inbox.message.v1',
    root: 'root',
    nodes: {
      root: { id: 'root', type: 'Stack', props: { direction: { kind: 'literal', value: 'column' }, gap: { kind: 'literal', value: 'sm' } }, children: ['row'] },
      row: { id: 'row', type: 'Stack', props: { direction: { kind: 'literal', value: 'row' }, gap: { kind: 'literal', value: 'md' } }, children: ['subject', 'badge'] },
      subject: { id: 'subject', type: 'TextContent', props: { text: { kind: 'field', key: 'item.subject' }, size: { kind: 'literal', value: 'medium' } } },
      badge: { id: 'badge', type: 'Badge', props: { label: { kind: 'field', key: 'item.priority' }, variant: { kind: 'literal', value: 'neutral' } } },
    },
    repeats: { row: { over: { kind: 'field', key: 'items' }, as: 'item' } },
  });
  // A valid pipeline example (filter + group) — teaches the data layer shape.
  const pipelineExample = JSON.stringify({
    ops: [
      { kind: 'filter', field: 'unread', operator: 'eq', value: { kind: 'literal', value: true } },
      { kind: 'group', by: 'priority', keyAs: 'p', countAs: 'n' },
    ],
    outputSchema: [{ key: 'p', type: 'text', label: 'Priority' }, { key: 'n', type: 'number', label: 'Count' }],
  });
  return [
    'Generate a UI by emitting the emit_surface tool with { template, pipeline? }.',
    '',
    'TEMPLATE — HARD RULES (breaking any → REJECTED):',
    '1. Every node object MUST include an "id" equal to its key in the nodes map.',
    '2. Use ONLY these component types: ' + COMPONENTS.join(', ') + '. No "list","heading","row"(as a type),"container".',
    '3. Children are an array of node IDs (strings), never nested objects.',
    '4. EVERY prop value MUST be {"kind":"field","key":"<field>"} or {"kind":"literal","value":<v>}. Never a bare value.',
    '5. One node per record: add "repeats": {"<nodeId>":{"over":{"kind":"field","key":"items"},"as":"item"}} and bind {"kind":"field","key":"item.<field>"}.',
    '6. Bind ONLY the declared fields below. Never invent fields or hard-code data.',
    '7. Literals: direction=column|row; gap/size=xs|sm|md|lg; Badge variant=neutral|info|success|warning|danger.',
    'TEMPLATE EXAMPLE:',
    example,
    '',
    'PIPELINE (optional "pipeline" key) — use it whenever the request needs to FILTER, SORT, GROUP, or COUNT data (e.g. "only unread", "overdue", "group by priority", "board by X", "summary/counts", "newest first", "this week"):',
    '- Shape: { "ops": [ ...DataOp ], "outputSchema"?: [ {key,type,label} ] }.',
    '- "ops" MUST be an array (this is the #1 mistake — never omit it).',
    '- DataOp kinds: filter {field,operator,value:{kind:"literal",value}} (operators: eq,neq,lt,lte,gt,gte,in,nin,isEmpty,isNotEmpty); sort {field,direction:"asc"|"desc"}; group {by,keyAs,countAs}; derive {fn,from,as} (fn: isOverdue|dateBucket); limit {count}.',
    '- For filter/sort/limit you may OMIT outputSchema (shape unchanged). For group/derive you MUST provide outputSchema describing the new fields, and the template then binds those new fields (e.g. item.p, item.n).',
    '- IMPORTANT: after a "group" op the ONLY fields that exist are the group\'s keyAs and countAs — the original fields (subject, from, etc.) are GONE. outputSchema must list exactly those new fields, and the template must bind only them. "derive" ADDS a field (keep the originals in outputSchema plus the new one).',
    '- If you only need to display records as-is (a plain list/checklist with no filtering or grouping), DO NOT emit a pipeline at all — just the template with a repeat over items.',
    'PIPELINE EXAMPLE (filter unread, then group by priority → board over groups):',
    pipelineExample,
    '',
    'Declared fields you may bind / filter / sort / group:',
    fields,
  ].join('\n');
}
import { GOLDEN, INBOX_FIELDS, type GoldenCase } from '../golden/dataset.js';
import { MockJudge } from './judge.js';
import { evaluateGate, DEFAULT_THRESHOLDS } from './gate.js';

const args = process.argv.slice(2);
const samplesIdx = args.indexOf('--samples');
const SAMPLES = samplesIdx >= 0 ? Number(args[samplesIdx + 1]) : 3;
const modelIdx = args.indexOf('--model');
// Default to the CHEAPEST model — this is a bulk eval harness (51 cases × N
// samples), not production. Opt into a stronger model explicitly with --model.
const MODEL = modelIdx >= 0 ? args[modelIdx + 1] : 'claude-haiku-4-5';

// Rough per-million-token prices for a pre-run cost estimate (input/output USD).
const PRICES: Record<string, [number, number]> = {
  'claude-haiku-4-5': [1, 5],
  'claude-sonnet-4-6': [3, 15],
  'claude-opus-4-8': [5, 25],
};
const sleepTop = (ms: number) => new Promise((r) => setTimeout(r, ms));
const MOCK = args.includes('--mock'); // free full dry-run with the deterministic MockLLM (no API, no credits)

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

// The vendor grants sensible, safe operations across the inbox fields. (A real
// vendor authors this once; the gate failures showed the demo manifest was too
// narrow — the model wanted legitimate ops the vendor hadn't declared.)
const ALL_FILTER_OPS = ['eq', 'neq', 'lt', 'lte', 'gt', 'gte', 'in', 'nin', 'contains', 'isEmpty', 'isNotEmpty'] as const;
const dataManifest = {
  schemaId: 'inbox.message.v1',
  grants: [
    { field: 'subject', ops: ['filter', 'sort'] as const, filterOperators: ['contains', 'eq', 'isEmpty', 'isNotEmpty'] as const },
    { field: 'from', ops: ['filter', 'sort', 'group'] as const, filterOperators: ['eq', 'contains', 'in'] as const },
    { field: 'to', ops: ['filter', 'group'] as const, filterOperators: ['eq', 'contains'] as const },
    { field: 'receivedAt', ops: ['filter', 'sort', 'derive'] as const, filterOperators: ['lt', 'lte', 'gt', 'gte', 'isEmpty', 'isNotEmpty'] as const, deriveFns: ['dateBucket'] as const },
    { field: 'dueDate', ops: ['filter', 'sort', 'derive'] as const, filterOperators: ALL_FILTER_OPS, deriveFns: ['isOverdue', 'dateBucket'] as const },
    { field: 'unread', ops: ['filter', 'group'] as const, filterOperators: ['eq', 'neq'] as const },
    { field: 'priority', ops: ['filter', 'sort', 'group'] as const, filterOperators: ['eq', 'in', 'nin'] as const },
    { field: 'labels', ops: ['filter', 'group'] as const, filterOperators: ['eq', 'contains', 'in'] as const },
    { field: 'hasAttachment', ops: ['filter', 'group'] as const, filterOperators: ['eq', 'neq'] as const },
    // derived buckets the model creates (e.g. dateBucket → "bucket") are filterable/groupable
    { field: 'bucket', ops: ['filter', 'group'] as const, filterOperators: ['eq', 'in'] as const },
    { field: 'overdue', ops: ['filter', 'group'] as const, filterOperators: ['eq', 'neq'] as const },
  ],
  policy: { maxRows: 500, maxOps: 8, maxGroups: 50 },
};

async function main(): Promise<void> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!MOCK && !key) {
    console.log('── LIVE GATE not run: ANTHROPIC_API_KEY is not set ──');
    console.log(`Golden cases: ${GOLDEN.length} · samples/case: ${SAMPLES} · model: ${MODEL}`);
    console.log('Run live:  node_modules/.bin/tsx docs/specs/dynamic-interfaces/engine/harness/live-gate.ts');
    console.log('Free dry-run (no API/credits):  add --mock');
    process.exitCode = 2;
    return;
  }

  // Client: real Anthropic adapter, OR the deterministic MockLLM for a free
  // full dry-run (--mock) that exercises the whole gate without spending credits.
  let client;
  if (MOCK) {
    const { MockPipelineTemplateLLM } = await import('../pipeline-mock.js');
    client = new MockPipelineTemplateLLM();
    console.log('── MOCK MODE: deterministic generator, no API calls, no credits ──\n');
  } else {
    const { AnthropicTemplateClient } = await import('../anthropic-client.js');
    client = new AnthropicTemplateClient({ apiKey: key!, model: MODEL });
    // Cost estimate up front so a live run is never a surprise bill.
    const [inP, outP] = PRICES[MODEL] ?? [5, 25];
    const calls = GOLDEN.length * SAMPLES * 1.3; // ×1.3 for occasional repair retries
    const estIn = (calls * 2500) / 1e6, estOut = (calls * 700) / 1e6;
    const estUsd = estIn * inP + estOut * outP;
    console.log(`── LIVE RUN · model ${MODEL} · ${GOLDEN.length} cases × ${SAMPLES} samples ──`);
    console.log(`   est. ~${Math.round(calls)} calls, ~$${estUsd.toFixed(2)} (rough). Ctrl-C now to cancel.\n`);
    await sleepTop(1500); // brief window to abort before spending
  }
  const judge = new MockJudge(); // swap for a real LLM judge when desired
  const deps: PipelineGenerateDeps = { client, registry: realRegistry, manifest: dataManifest as never, now: new Date() };

  let parsedAll = 0, governedWorst = 0;
  const fidelity: number[] = [];
  let governedBlockedUnsafe = 0;
  const errorCounts = new Map<string, number>(); // surface failure causes (never silent)
  const sys = buildSystem(ENV);
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  for (let i = 0; i < GOLDEN.length; i++) {
    const c: GoldenCase = GOLDEN[i];
    let okCount = 0, parsedCount = 0;
    let lastTemplate: unknown = null;
    let lastReason = '';
    for (let s = 0; s < SAMPLES; s++) {
      try {
        const r = await generateWithPipeline(c.intent, ENV, { ...deps, sample: s }, { system: sys, user: c.intent });
        const parsed = !!r.output?.template?.nodes;
        if (parsed) parsedCount++;
        const passed = c.expectShouldGovern ? r.ok : !r.ok;
        if (passed) okCount++;
        else lastReason = r.rejections[0]?.message ?? '(no rejection msg)';
        // Fidelity is judged on the TEMPLATE (which still has field bindings),
        // not the resolved tree (bindings already replaced by values).
        if (r.ok && r.output?.template) lastTemplate = r.output.template;
        // delta proxy: governance blocked something on an adversarial case
        if (c.category === 'adversarial' && !r.ok) governedBlockedUnsafe++;
      } catch (e) {
        // Surface the cause — a thrown error (rate limit, network, API) is NOT
        // the same as a govern failure, and must never be swallowed silently.
        const err = e as { status?: number; message?: string; error?: { error?: { message?: string } } };
        const body = err.error?.error?.message ?? err.message ?? String(e);
        // Account-level errors (no credits, bad key) won't recover across 51
        // cases — abort immediately with the real message instead of grinding.
        if (/credit balance is too low|insufficient|quota|authentication|invalid x-api-key/i.test(body)) {
          console.log(`\n⛔ ABORTING — account/API error, not a model failure:\n   ${body}\n   Fix this (add credits / check the key at console.anthropic.com), then re-run.`);
          process.exitCode = 4;
          return;
        }
        const tag = err.status ? `HTTP ${err.status}` : body.slice(0, 40);
        errorCounts.set(tag, (errorCounts.get(tag) ?? 0) + 1);
        lastReason = `THREW: ${tag}`;
      }
      await sleep(250); // gentle pacing to avoid rate-limit bursts across 51 cases
    }
    if (parsedCount > 0) parsedAll++;
    if (okCount === SAMPLES) governedWorst++;
    // Fidelity: judge the template's bound nodes. Wrap the flat nodes in a
    // synthetic root so the judge's collectFieldBindings can walk the bindings.
    if (lastTemplate) {
      const tpl = lastTemplate as { nodes: Record<string, { type: string; props: unknown }> };
      const synthetic = { type: 'Group', props: { children: Object.values(tpl.nodes).map((nd) => ({ type: nd.type, props: nd.props })) } };
      const fs = await judge.score(c, synthetic as never);
      fidelity.push(fs.score);
    }
    const mark = okCount === SAMPLES ? '✓' : okCount > 0 ? '~' : '✗';
    const why = okCount < SAMPLES && lastReason ? `  — ${lastReason}` : '';
    console.log(`${mark} [${i + 1}/${GOLDEN.length}] ${c.intent.slice(0, 50)}  (${okCount}/${SAMPLES})${why}`);
  }

  if (errorCounts.size) {
    console.log('\n── thrown errors (NOT govern failures) ──');
    for (const [tag, count] of errorCounts) console.log(`  ${count}× ${tag}`);
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
  if (MOCK) {
    console.log('  (MOCK mode: the deterministic generator never fabricates forbidden data,');
    console.log('   so "governance delta" is always 0 here — that metric is only meaningful');
    console.log('   on a live run, where a real model may attempt unsafe output. Parse +');
    console.log('   govern + fidelity above DO validate the full harness.)');
  }
  console.log('════════════════════════════════════════════════════════');
  // In mock mode, ignore the delta criterion (unmeasurable) for the exit code.
  const go = MOCK ? decision.metrics.worstOfNGovernRate >= DEFAULT_THRESHOLDS.worstOfNGovern && decision.metrics.fidelityMedian >= DEFAULT_THRESHOLDS.fidelityMedian : decision.go;
  process.exitCode = go ? 0 : 1;
}

main().catch((e) => { console.error(String(e)); process.exit(3); });
