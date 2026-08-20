import { describe, it, expect } from 'vitest';
import { createAgentRun } from '../agent/run-session.js';
import { InMemoryTrustLedger } from '../agent/trust-ledger.js';
import type { ActionProposal } from '../agent/proposal.js';
import type { AgentEvent } from '../agent/events.js';

function proposal(over: Partial<ActionProposal> = {}): ActionProposal {
  return {
    id: 'p1', runId: 'r1', tool: 'invoice.create', input: {},
    summary: 's', rationale: 'why',
    reversibility: 'reversible',
    blastRadius: { scope: 'self', entities: ['x'], irreversibleSideEffects: [] },
    provenance: [{ kind: 'tool_result', toolCallId: 'c1' }],
    ...over,
  };
}

function makeRun() {
  const ledger = new InMemoryTrustLedger();
  const run = createAgentRun({ runId: 'r1', goal: 'reconcile invoices', ledger, ts: 1 });
  const events: AgentEvent[] = [];
  run.events.on((e) => events.push(e));
  return { run, ledger, events };
}

describe('createAgentRun', () => {
  it('emits run.started on creation with the caller timestamp', () => {
    const ledger = new InMemoryTrustLedger();
    const seen: AgentEvent[] = [];
    const run = createAgentRun({ runId: 'r1', goal: 'g', ledger, ts: 42 });
    run.events.on((e) => seen.push(e));
    // run.started was emitted before we could subscribe — it must be
    // retrievable from the session's receipts path instead? No: the session
    // buffers nothing. Instead startedEvent is exposed for late subscribers.
    expect(run.startedEvent).toEqual({ type: 'run.started', runId: 'r1', ts: 42, goal: 'g' });
  });

  it('startStep emits step.started', () => {
    const { run, events } = makeRun();
    run.startStep('s1', 'first step', 2);
    expect(events).toEqual([
      { type: 'step.started', runId: 'r1', ts: 2, stepId: 's1', summary: 'first step' },
    ]);
  });

  it('propose computes the gate and emits proposal.emitted', () => {
    const { run, events } = makeRun();
    const g = run.propose(proposal(), 3);
    expect(g).toBe('auto'); // reversible + grounded + contained run
    expect(events[0]).toMatchObject({ type: 'proposal.emitted', ts: 3, gate: 'auto' });
  });

  it('resolve records into the ledger and emits proposal.resolved (patch omitted unless given)', () => {
    const { run, events } = makeRun();
    const p = proposal({ reversibility: 'compensable', compensation: { tool: 'invoice.void', input: {} } });
    run.resolve(p, 'approved', 4);
    expect(events[0]).toEqual({
      type: 'proposal.resolved', runId: 'r1', ts: 4, proposalId: 'p1', decision: 'approved',
    });
    expect('patch' in events[0]!).toBe(false);
    run.resolve(p, 'edited', 5, { amount: 10 });
    expect(events[1]).toMatchObject({ decision: 'edited', patch: { amount: 10 } });
  });

  it('ledger graduation works through the session: 10 clean approvals relax compensable to notify', () => {
    const { run } = makeRun();
    const p = proposal({ reversibility: 'compensable', compensation: { tool: 'invoice.void', input: {} } });
    expect(run.propose(p, 1)).toBe('confirm');
    for (let i = 0; i < 10; i++) run.resolve(p, 'approved', 10 + i);
    expect(run.propose(p, 30)).toBe('notify');
    // an edit resets earned trust
    run.resolve(p, 'edited', 31, {});
    expect(run.propose(p, 32)).toBe('confirm');
  });

  it('executed emits action.executed + run.checkpoint and accumulates blast radius (correction #1)', () => {
    const { run, events } = makeRun();
    const damaging = proposal({
      id: 'p-dmg',
      reversibility: 'compensable',
      compensation: { tool: 'invoice.void', input: {} },
      blastRadius: { scope: 'workspace', entities: ['db:invoices'], irreversibleSideEffects: ['sent email'] },
    });
    const receipt = run.executed(damaging, { status: 'executed', ts: 6 });
    expect(receipt.proposalId).toBe('p-dmg');
    expect(events[0]).toMatchObject({ type: 'action.executed', ts: 6 });
    expect(events[1]).toMatchObject({
      type: 'run.checkpoint',
      ts: 6,
      checkpoint: {
        runId: 'r1',
        cumulativeBlastRadius: {
          scope: 'workspace',
          entities: ['db:invoices'],
          irreversibleSideEffects: ['sent email'],
        },
      },
    });
    // A cheap reversible grounded step must now gate 'confirm', not 'auto':
    // the RUN has already caused irreversible effects.
    expect(run.propose(proposal({ id: 'p-next' }), 7)).toBe('confirm');
    expect(run.checkpoint().cumulativeBlastRadius.irreversibleSideEffects).toEqual(['sent email']);
  });

  it('a FAILED action still accumulates blast radius (fail closed: assume damage)', () => {
    const { run } = makeRun();
    run.executed(
      proposal({ blastRadius: { scope: 'external', entities: ['api'], irreversibleSideEffects: [] } }),
      { status: 'failed', ts: 6, error: 'timeout' },
    );
    expect(run.checkpoint().cumulativeBlastRadius.scope).toBe('external');
  });

  it('hard-stop stays confirm through the session even with a maxed ledger', () => {
    const { run } = makeRun();
    const hard = proposal({
      id: 'p-hard',
      reversibility: 'irreversible',
      provenance: [{ kind: 'inference' }],
    });
    for (let i = 0; i < 50; i++) run.resolve(hard, 'approved', i);
    expect(run.propose(hard, 99)).toBe('confirm');
  });

  it('complete emits run.completed with all receipts and closes the stream', () => {
    const { run, events } = makeRun();
    const r1 = run.executed(proposal({ id: 'a' }), { status: 'executed', ts: 2 });
    const r2 = run.executed(proposal({ id: 'b' }), { status: 'failed', ts: 3, error: 'x' });
    run.complete(4);
    const completed = events.find((e) => e.type === 'run.completed');
    expect(completed).toMatchObject({ ts: 4, receipts: [r1, r2] });
    expect(run.events.closed).toBe(true);
  });

  it('fail emits run.failed (optional fields omitted) and closes the stream', () => {
    const { run, events } = makeRun();
    run.fail('provider exploded', false, 9);
    expect(events[0]).toEqual({
      type: 'run.failed', runId: 'r1', ts: 9, error: 'provider exploded', recoverable: false,
    });
    expect(run.events.closed).toBe(true);

    const second = makeRun();
    second.run.fail('partial', true, 10, { stepId: 's2', partialRecovery: 'rolled back drafts' });
    expect(second.events[0]).toMatchObject({ stepId: 's2', partialRecovery: 'rolled back drafts' });
  });
});

describe('public API surface — run session', () => {
  it('re-exports createAgentRun from the package root', async () => {
    const mod = await import('../index.js');
    expect(typeof mod.createAgentRun).toBe('function');
  });
});
