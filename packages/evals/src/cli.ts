#!/usr/bin/env node
/**
 * Cognivo design-system evals CLI.
 *   run --mode mock [--samples N]   offline gate (CI)
 *   live [--samples N] [--model M] [--record]   live run (needs ANTHROPIC_API_KEY)
 *   replay [baseline.json]          re-grade recorded outputs offline
 * Exit 0 on GO, 1 on NO-GO.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { EVAL_DATASET } from './dataset.js';
import { MockAgent } from './agents/mock-agent.js';
import { AnthropicAgent } from './agents/anthropic-agent.js';
import { MockJudge, AnthropicJudge } from './scorers/judge.js';
import { runEvals } from './runner.js';
import { evaluateGate } from './gate.js';
import { formatConsole } from './report.js';
import { latestBaseline, replayBaseline, writeBaseline } from './baseline.js';

const args = process.argv.slice(2);
const command = args[0] ?? 'run';
const flag = (name: string): string | undefined => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};
const has = (name: string): boolean => args.includes(`--${name}`);

const BASELINE_DIR = resolve(import.meta.dirname ?? '.', '../baselines');
mkdirSync(BASELINE_DIR, { recursive: true });

async function main(): Promise<number> {
  const samples = Number(flag('samples') ?? 3);

  if (command === 'replay') {
    // Explicit --file, else a positional non-flag arg, else latest baseline.
    let path: string | null | undefined = flag('file');
    if (!path) {
      const positional = args[1] && !args[1].startsWith('--') ? args[1] : undefined;
      path = positional;
    }
    if (!path) {
      path = latestBaseline(BASELINE_DIR);
    }
    if (!path) {
      console.log('No baseline found — run `pnpm evals:live` first.');
      return 0;
    }
    const report = await replayBaseline(path, EVAL_DATASET, new MockJudge());
    const decision = evaluateGate(report);
    console.log(formatConsole(report, decision));
    return decision.go ? 0 : 1;
  }

  const live = command === 'live';
  const agent = live ? new AnthropicAgent(flag('model')) : new MockAgent();
  const judge = live ? new AnthropicJudge(flag('model')) : new MockJudge();

  const report = await runEvals(EVAL_DATASET, agent, judge, {
    samples,
    mode: live ? 'live' : 'mock',
  });

  if (has('record')) {
    const path = writeBaseline(report, BASELINE_DIR);
    console.log(`Baseline recorded: ${path}`);
  }
  if (has('json')) writeFileSync(flag('json') ?? 'eval-report.json', JSON.stringify(report, null, 2));

  const decision = evaluateGate(report);
  console.log(formatConsole(report, decision));
  return decision.go ? 0 : 1;
}

main().then(
  (code) => process.exit(code),
  (err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exit(1);
  },
);
