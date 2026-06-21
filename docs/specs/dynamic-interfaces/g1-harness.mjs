/**
 * Dynamic Software Interfaces — Gate G1 harness.
 *
 * The make-or-break measurement (spec §8, §10 Phase 1):
 *   Can a frontier LLM reliably emit parseable, governance-passing DSL trees
 *   from a natural-language prompt + the library system prompt?
 *
 * Runs the 10 fixed prompts through:  LLM -> parse -> govern  (+ optional repair)
 * and prints parse-success and governance-pass rates vs the gate thresholds.
 *
 * Usage (run from the REPO ROOT — relative dist paths resolve there):
 *   ANTHROPIC_API_KEY=sk-... node docs/specs/dynamic-interfaces/g1-harness.mjs
 *   ANTHROPIC_API_KEY=sk-... node docs/specs/dynamic-interfaces/g1-harness.mjs --repair
 *   ANTHROPIC_API_KEY=sk-... node docs/specs/dynamic-interfaces/g1-harness.mjs --model claude-sonnet-4-6
 *
 * Without an API key it prints the resolved system prompt and exits (dry run),
 * so the wiring is verifiable offline.
 *
 * Imports the BUILT dist entry points by relative path (docs/ doesn't depend on
 * these packages, and we avoid mutating package.json for a prototype).
 */

import { createParser, validateTokenUsage, cognivoLibrary } from '../../../packages/gen-ui/dist/index.js';
import { AnthropicClient } from '../../../packages/adapter-anthropic/dist/index.js';
import {
  INBOX_DATASET,
  G1_PROMPTS,
  DSL_EXAMPLES,
  evaluateGovernance,
} from './fixtures.mjs';

// ─── Gate thresholds (spec §10 Phase 1, Gate G1) ──────────────────────────────
const GATE = { parse: 0.8, govern: 0.7 };

const args = process.argv.slice(2);
const REPAIR = args.includes('--repair');
const modelIdx = args.indexOf('--model');
const MODEL = modelIdx >= 0 ? args[modelIdx + 1] : 'claude-sonnet-4-6';

// The dataset envelope is injected into the prompt so the model knows which
// fields it may reference (the L1/L2 firewall, spec §3.1).
const datasetPreamble = [
  'You are generating a UI surface over a FIXED dataset. You may ONLY reference',
  'these fields (do not invent data):',
  JSON.stringify(INBOX_DATASET.fields, null, 2),
  `There are ${INBOX_DATASET.items.length} items. schemaId: ${INBOX_DATASET.schemaId}.`,
].join('\n');

// Build the system prompt with the §11.1 examples mitigation baked in.
const systemPrompt = cognivoLibrary.prompt({
  preamble: datasetPreamble,
  examples: DSL_EXAMPLES,
  tokenGovernance: true,
});

// createParser compiles the schema once; reuse it across all prompts.
const parser = createParser(cognivoLibrary.toJSONSchema());

function runOnce(content) {
  const parseResult = parser.parse(content);
  parseResult.meta.tokenViolations = validateTokenUsage(parseResult.root);
  return parseResult;
}

function describeFailures(gov) {
  const ve = gov.validationErrors.map((e) => e.message ?? JSON.stringify(e));
  const tv = gov.tokenViolations.map((v) => v.message ?? JSON.stringify(v));
  return [...ve, ...tv].slice(0, 5).join('; ');
}

async function callModel(client, userPrompt, priorContent, priorFailures) {
  const repairNote = priorContent
    ? `\n\nYour previous output FAILED governance with: ${priorFailures}\nHere was your output:\n${priorContent}\nReturn a corrected version. Output ONLY component-lang code.`
    : '';
  const res = await client.runIntent(
    'generate_ui',
    { dataset: [{ prompt: userPrompt + repairNote }] },
    { systemPrompt, model: MODEL },
  );
  return res.content;
}

async function main() {
  const key = process.env.ANTHROPIC_API_KEY;

  if (!key) {
    console.log('── DRY RUN (no ANTHROPIC_API_KEY) ─────────────────────────────');
    console.log(`Model would be: ${MODEL}`);
    console.log(`Prompts: ${G1_PROMPTS.length}  |  Repair loop: ${REPAIR}`);
    console.log(`Examples injected: ${DSL_EXAMPLES.length}`);
    console.log('\n── Resolved system prompt (first 1800 chars) ──────────────────');
    console.log(systemPrompt.slice(0, 1800));
    console.log(`\n… [${systemPrompt.length} chars total]`);
    console.log('\nSet ANTHROPIC_API_KEY to run the real G1 measurement.');
    return;
  }

  const client = new AnthropicClient({ apiKey: key, defaultModel: MODEL });
  const rows = [];

  for (let i = 0; i < G1_PROMPTS.length; i++) {
    const prompt = G1_PROMPTS[i];
    let content, gov, repaired = false;
    try {
      content = await callModel(client, prompt);
      gov = evaluateGovernance(runOnce(content), cognivoLibrary);

      if (REPAIR && !gov.governancePass) {
        const fixed = await callModel(client, prompt, content, describeFailures(gov));
        const gov2 = evaluateGovernance(runOnce(fixed), cognivoLibrary);
        if (gov2.governancePass || (gov2.parsed && !gov.parsed)) {
          content = fixed;
          gov = gov2;
          repaired = true;
        }
      }
    } catch (err) {
      gov = { parsed: false, governancePass: false, validationErrors: [{ message: String(err) }], tokenViolations: [] };
    }

    rows.push({ i: i + 1, prompt, gov, repaired });
    const mark = gov.governancePass ? '✓' : gov.parsed ? '~' : '✗';
    console.log(`${mark} [${i + 1}/${G1_PROMPTS.length}]${repaired ? ' (repaired)' : ''} ${prompt.slice(0, 60)}`);
    if (!gov.governancePass) console.log(`    ${describeFailures(gov) || '(parse failed)'}`);
  }

  const n = rows.length;
  const parsed = rows.filter((r) => r.gov.parsed).length;
  const governed = rows.filter((r) => r.gov.governancePass).length;
  const parseRate = parsed / n;
  const governRate = governed / n;

  console.log('\n══ GATE G1 RESULT ════════════════════════════════════════════');
  console.log(`  Model:            ${MODEL}`);
  console.log(`  Repair loop:      ${REPAIR ? 'on' : 'off'}`);
  console.log(`  Parse success:    ${parsed}/${n}  (${(parseRate * 100).toFixed(0)}%)   gate ≥ ${GATE.parse * 100}%`);
  console.log(`  Governance pass:  ${governed}/${n}  (${(governRate * 100).toFixed(0)}%)   gate ≥ ${GATE.govern * 100}%`);

  const pass = parseRate >= GATE.parse && governRate >= GATE.govern;
  const partial = parseRate >= 0.4;
  console.log('  ─────────────────────────────────────────────────────────────');
  if (pass) console.log('  ✅ GREEN — proceed to Phase 2 (three surfaces).');
  else if (partial) console.log('  ⚠ AMBER — invest in prompt/few-shot/repair, re-measure.');
  else console.log('  ❌ RED — DSL-emission risk killed it. Reconsider DSL before any L3 work.');
  console.log('══════════════════════════════════════════════════════════════');

  process.exitCode = pass ? 0 : 1;
}

main().catch((e) => { console.error(e); process.exit(2); });
