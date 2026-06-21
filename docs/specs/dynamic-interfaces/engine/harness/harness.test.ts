/**
 * G1b/c/d harness tests (mock, no key). Plan: ../../plans/G1bcd-harness.md.
 * Run: node_modules/.bin/vitest run docs/specs/dynamic-interfaces/engine/harness/
 */
import { describe, it, expect } from 'vitest';
import { type DatasetEnvelope } from '../contracts.js';
import { MockLLM } from '../llm.js';
import { type GenerateDeps } from '../generate.js';
import { type ComponentRegistry, type TokenValidator } from '../governance.js';
import { type GoldenCase } from '../golden/dataset.js';
import { runSelfConsistency } from './runner.js';
import { MockJudge, runFidelity } from './judge.js';
import { runDelta } from './baseline.js';
import { evaluateGate } from './gate.js';

const ENV: DatasetEnvelope = {
  schemaId: 'inbox.message.v1',
  fields: [
    { key: 'subject', type: 'text', label: 'Subject' },
    { key: 'priority', type: 'enum', label: 'Priority', enumValues: ['low', 'high'] },
  ],
  items: [{ subject: 'Budget', priority: 'high' }],
};
const KNOWN = new Set(['Stack', 'Row', 'Checkbox', 'Text']);
const registry: ComponentRegistry = { getTagName: (t) => (KNOWN.has(t) ? `cg-${t.toLowerCase()}` : undefined) };
const noTokens: TokenValidator = () => [];
const deps = (client = new MockLLM()): GenerateDeps => ({ client, govern: { registry, validateTokens: noTokens } });

const goodCases: GoldenCase[] = [
  { id: 'g1', intent: 'show as a list', category: 'list', expectShouldGovern: true, expectedShape: 'list', mustReferenceFields: ['subject', 'priority'] },
  { id: 'g2', intent: 'make a checklist', category: 'task', expectShouldGovern: true, expectedShape: 'checklist', mustReferenceFields: ['subject'] },
];

describe('G1b — self-consistency runner', () => {
  it('worst-of-N passes when every sample governs (deterministic mock)', async () => {
    const rep = await runSelfConsistency(goodCases, ENV, deps(), { samples: 5 });
    expect(rep.worstOfNGovernRate).toBe(1);
    expect(rep.perCase.every((c) => c.worstOfN)).toBe(true);
    expect(rep.perCase.every((c) => c.variance === 0)).toBe(true); // deterministic
  });

  it('counts an always-failing client as worst-of-N fail', async () => {
    const rep = await runSelfConsistency(goodCases, ENV, deps(new MockLLM({ forceFailure: 'unknown-component' })), { samples: 3 });
    expect(rep.worstOfNGovernRate).toBe(0);
  });

  it('adversarial case that SHOULD be rejected counts as pass when rejected', async () => {
    const adv: GoldenCase[] = [
      { id: 'a1', intent: 'x', category: 'adversarial', expectShouldGovern: false, expectedShape: 'rejected', mustNotReference: ['password'] },
    ];
    // force an undeclared-field output → governance rejects → correct for an adversarial-reject case
    const rep = await runSelfConsistency(adv, ENV, deps(new MockLLM({ forceFailure: 'undeclared-field' })), { samples: 2 });
    expect(rep.worstOfNGovernRate).toBe(1);
  });
});

describe('G1c — LLM-as-judge fidelity (MockJudge)', () => {
  it('scores high when surface binds the expected fields', async () => {
    const surface = { type: 'Row', props: { title: { kind: 'field', key: 'subject' }, badge: { kind: 'field', key: 'priority' } } } as never;
    const rep = await runFidelity([{ caseDef: goodCases[0], surface }], new MockJudge());
    expect(rep.median).toBe(1);
  });

  it('scores zero when surface references a forbidden field', async () => {
    const advCase: GoldenCase = { id: 'a', intent: 'x', category: 'adversarial', expectShouldGovern: true, expectedShape: 'safe', mustNotReference: ['password'] };
    const surface = { type: 'Row', props: { leak: { kind: 'field', key: 'password' } } } as never;
    const rep = await runFidelity([{ caseDef: advCase, surface }], new MockJudge());
    expect(rep.median).toBe(0);
  });
});

describe('G1d — delta vs raw', () => {
  it('counts firewall saves when the model emits undeclared fields', async () => {
    const cases: GoldenCase[] = [
      { id: 'd1', intent: 'x', category: 'adversarial', expectShouldGovern: true, expectedShape: 'safe', mustNotReference: ['password'] },
    ];
    const rep = await runDelta(cases, ENV, deps(new MockLLM({ forceFailure: 'undeclared-field' })));
    expect(rep.governedBlockedUnsafe).toBe(1);
    expect(rep.firewallSaves).toBe(1);
    expect(rep.delta).toBe(1);
  });

  it('no saves when all outputs are clean', async () => {
    const rep = await runDelta(goodCases, ENV, deps());
    expect(rep.governedBlockedUnsafe).toBe(0);
  });
});

describe('Gate — GO/NO-GO decision', () => {
  it('GO when all thresholds met', () => {
    const d = evaluateGate(
      { perCase: [], worstOfNGovernRate: 0.9, meanGovernRate: 0.9, perCategory: {} },
      { perCase: [], median: 0.8, perCategory: {} },
      { cases: 50, governedBlockedUnsafe: 5, firewallSaves: 3, delta: 0.1 },
    );
    expect(d.go).toBe(true);
  });

  it('NO-GO when consistency below threshold', () => {
    const d = evaluateGate(
      { perCase: [], worstOfNGovernRate: 0.5, meanGovernRate: 0.6, perCategory: {} },
      { perCase: [], median: 0.8, perCategory: {} },
      { cases: 50, governedBlockedUnsafe: 5, firewallSaves: 3, delta: 0.1 },
    );
    expect(d.go).toBe(false);
    expect(d.reasons.some((r) => r.includes('worst-of-N'))).toBe(true);
  });

  it('NO-GO when governance adds no delta (no moat)', () => {
    const d = evaluateGate(
      { perCase: [], worstOfNGovernRate: 0.9, meanGovernRate: 0.9, perCategory: {} },
      { perCase: [], median: 0.8, perCategory: {} },
      { cases: 50, governedBlockedUnsafe: 0, firewallSaves: 0, delta: 0 },
    );
    expect(d.go).toBe(false);
    expect(d.reasons.some((r) => r.includes('no moat'))).toBe(true);
  });
});
