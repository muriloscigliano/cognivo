/**
 * G1e repair-loop tests (MockLLM, no key). Plan: ../plans/G1e-repair.md.
 * Run: node_modules/.bin/vitest run docs/specs/dynamic-interfaces/engine/repair.test.ts
 */
import { describe, it, expect } from 'vitest';
import { type DatasetEnvelope } from './contracts.js';
import { MockLLM } from './llm.js';
import { generateWithRepair, buildRepairUser } from './repair.js';
import { type ComponentRegistry, type TokenValidator } from './governance.js';
import { type GenerateDeps } from './generate.js';

// Declares the fields the MockLLM's default trees bind to (subject + priority),
// so a healed/happy tree passes the firewall — the firewall is doing its job.
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
const governDeps = { registry, validateTokens: noTokens };

const deps = (client: MockLLM): GenerateDeps => ({ client, govern: governDeps });

describe('G1e — happy path', () => {
  it('passes on first attempt → 1 iteration, converged, no extra calls', async () => {
    const r = await generateWithRepair('show a list', ENV, deps(new MockLLM()));
    expect(r.converged).toBe(true);
    expect(r.iterations).toBe(1);
    expect(r.final.ok).toBe(true);
  });
});

describe('G1e — fails then heals', () => {
  it('converges after the scripted failure heals on retry', async () => {
    // fail on call 0, heal from call 1 onward
    const client = new MockLLM({ forceFailure: 'unknown-component', repairAfter: 1 });
    const r = await generateWithRepair('show a list', ENV, deps(client), { maxIterations: 3 });
    expect(r.converged).toBe(true);
    expect(r.final.ok).toBe(true);
    expect(r.iterations).toBe(2); // one failure + one healed
    expect(r.attempts[0].ok).toBe(false);
    expect(r.attempts[1].ok).toBe(true);
  });
});

describe('G1e — hard cap (Infinite Loop of Doom prevention)', () => {
  it('never exceeds maxIterations when it never heals', async () => {
    // forceFailure with NO repairAfter → never heals. But the SAME failure each
    // time means no progress → convergence detection bails before the cap.
    const client = new MockLLM({ forceFailure: 'unknown-component' });
    const r = await generateWithRepair('x', ENV, deps(client), { maxIterations: 5 });
    expect(r.converged).toBe(false);
    expect(r.iterations).toBeLessThanOrEqual(5);
    expect(r.final.ok).toBe(false);
  });

  it('caps even when each attempt differs but never passes', async () => {
    // heal far beyond the cap so it never converges within it.
    const client = new MockLLM({ forceFailure: 'undeclared-field', repairAfter: 99 });
    const r = await generateWithRepair('x', ENV, deps(client), { maxIterations: 3 });
    expect(r.converged).toBe(false);
    // identical failure each call → no-progress bail → 2 calls (initial + 1 retry that shows no progress)
    expect(r.iterations).toBeLessThanOrEqual(3);
  });
});

describe('G1e — no-progress bails early', () => {
  it('stops before the cap when rejections do not shrink', async () => {
    const client = new MockLLM({ forceFailure: 'unknown-component' }); // same rejection forever
    const r = await generateWithRepair('x', ENV, deps(client), { maxIterations: 10 });
    // initial attempt + one retry that shows no progress → bail at 2, far under 10
    expect(r.iterations).toBe(2);
    expect(r.converged).toBe(false);
  });
});

describe('G1e — best-result-kept', () => {
  it('final is never worse than an earlier attempt', async () => {
    const client = new MockLLM({ forceFailure: 'unknown-component' });
    const r = await generateWithRepair('x', ENV, deps(client), { maxIterations: 3 });
    const finalCount = r.final.govern.rejections.length;
    for (const a of r.attempts) {
      if (a.ok) continue;
      // final's rejection count <= any attempt's count
      expect(finalCount).toBeLessThanOrEqual(a.rejectionCodes.length);
    }
  });
});

describe('G1e — buildRepairUser', () => {
  it('includes the prior rejection reasons (the critic signal)', () => {
    const msg = buildRepairUser('show a list', [{ code: 'unknown-component', message: 'Unknown component "X"' }]);
    expect(msg).toContain('REJECTED');
    expect(msg).toContain('unknown-component');
    expect(msg).toContain('Unknown component "X"');
  });
});
