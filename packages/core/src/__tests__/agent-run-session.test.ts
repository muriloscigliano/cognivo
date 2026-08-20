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

const compensable = (over: Partial<ActionProposal> = {}): ActionProposal => proposal({
  reversibility: 'compensable',
  compensation: { tool: 'invoice.void', input: {} },
  ...over,
});

function makeRun() {
  const ledger = new InMemoryTrustLedger();
  const run = createAgentRun({ runId: 'r1', goal: 'reconcile invoices', ledger, ts: 1 });
  const events: AgentEvent[] = [];
  run.events.on((e) => events.push(e));
  return { run, ledger, events };
}

describe('createAgentRun', () => {
  it('exposes run.started as a property — the live stream has no replay, so it is not dispatched', () => {
    const { run, events } = makeRun();
    expect(run.startedEvent).toEqual({ type: 'run.started', runId: 'r1', ts: 1, goal: 'reconcile invoices' });
    expect(events).toEqual([]);
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

  it('resolve emits proposal.resolved (patch omitted unless given)', () => {
    const { run, events } = makeRun();
    const p = compensable();
    run.propose(p, 3);
    run.resolve(p, 'approved', 4);
    expect(events[1]).toEqual({
      type: 'proposal.resolved', runId: 'r1', ts: 4, proposalId: 'p1', decision: 'approved',
    });
    expect('patch' in events[1]!).toBe(false);
    run.propose(p, 5);
    run.resolve(p, 'edited', 6, { amount: 10 });
    expect(events[3]).toMatchObject({ decision: 'edited', patch: { amount: 10 } });
  });

  it('resolve on a never-proposed proposal throws (no trust minting)', () => {
    const { run, ledger } = makeRun();
    const p = compensable();
    expect(() => run.resolve(p, 'approved', 2)).toThrow(/never proposed/);
    expect(ledger.autoApprovals(p)).toBe(0);
  });

  it('double-resolve throws (a double-click cannot double-count)', () => {
    const { run, ledger } = makeRun();
    const p = compensable();
    run.propose(p, 2);
    run.resolve(p, 'approved', 3);
    expect(() => run.resolve(p, 'approved', 4)).toThrow(/already resolved/);
    expect(ledger.autoApprovals(p)).toBe(1);
  });

  it('graduation needs 10 propose→approve cycles at a confirm gate; an edit resets', () => {
    const { run } = makeRun();
    const p = compensable();
    for (let i = 0; i < 10; i++) {
      expect(run.propose(p, i)).toBe('confirm');
      run.resolve(p, 'approved', i);
    }
    expect(run.propose(p, 30)).toBe('notify');
    run.resolve(p, 'edited', 31, {});
    expect(run.propose(p, 32)).toBe('confirm');
  });

  it("auto-gated approvals never mint graduation trust (correction #2's session half)", () => {
    const { run, ledger } = makeRun();
    // Reversible → gates 'auto'; an integrator recording every outcome as
    // 'approved' must not graduate anything.
    const auto = proposal();
    for (let i = 0; i < 15; i++) {
      run.propose(auto, i);
      run.resolve(auto, 'approved', i);
    }
    expect(ledger.autoApprovals(auto)).toBe(0);
    // And the reversibility-aware ledger key keeps reversible trust away from
    // the compensable shape of the same tool regardless.
    expect(run.propose(compensable({ id: 'p-comp' }), 99)).toBe('confirm');
  });

  it('rejections at ANY gate still record (they only reduce trust)', () => {
    const { run, ledger } = makeRun();
    const p = compensable();
    for (let i = 0; i < 10; i++) { run.propose(p, i); run.resolve(p, 'approved', i); }
    expect(run.propose(p, 20)).toBe('notify');
    run.resolve(p, 'rejected', 21); // notify-gated, not humanGated — but rejection records
    expect(ledger.autoApprovals(p)).toBe(0);
    expect(run.propose(p, 22)).toBe('confirm');
  });

  it('executed emits action.executed + run.checkpoint and accumulates blast radius (correction #1)', () => {
    const { run, events } = makeRun();
    const damaging = compensable({
      id: 'p-dmg',
      blastRadius: { scope: 'workspace', entities: ['db:invoices'], irreversibleSideEffects: ['sent email'] },
    });
    run.propose(damaging, 5);
    const receipt = run.executed(damaging, { status: 'executed', ts: 6 });
    expect(receipt.proposalId).toBe('p-dmg');
    expect(events[1]).toMatchObject({ type: 'action.executed', ts: 6 });
    expect(events[2]).toMatchObject({
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
    // A cheap reversible grounded step must now gate 'confirm', not 'auto'.
    expect(run.propose(proposal({ id: 'p-next' }), 7)).toBe('confirm');
    expect(run.checkpoint().cumulativeBlastRadius.irreversibleSideEffects).toEqual(['sent email']);
  });

  it('a listener reacting to action.executed already sees the post-damage gate (no stale window)', () => {
    const { run } = makeRun();
    const damaging = compensable({
      id: 'p-dmg',
      blastRadius: { scope: 'workspace', entities: ['db'], irreversibleSideEffects: ['sent email'] },
    });
    let gateInsideListener: string | null = null;
    run.events.on((e) => {
      if (e.type === 'action.executed' && gateInsideListener === null) {
        gateInsideListener = run.propose(proposal({ id: 'p-reactive' }), 99);
      }
    });
    run.propose(damaging, 5);
    run.executed(damaging, { status: 'executed', ts: 6 });
    expect(gateInsideListener).toBe('confirm');
  });

  it('executed on a never-proposed proposal throws', () => {
    const { run } = makeRun();
    expect(() => run.executed(proposal(), { status: 'executed', ts: 2 })).toThrow(/never proposed/);
  });

  it('a FAILED action still accumulates blast radius (fail closed: assume damage)', () => {
    const { run } = makeRun();
    const p = proposal({ blastRadius: { scope: 'external', entities: ['api'], irreversibleSideEffects: [] } });
    run.propose(p, 5);
    run.executed(p, { status: 'failed', ts: 6, error: 'timeout' });
    expect(run.checkpoint().cumulativeBlastRadius.scope).toBe('external');
  });

  it('checkpoint() returns a copy — mutating it does not corrupt the run', () => {
    const { run } = makeRun();
    const cp = run.checkpoint();
    cp.cumulativeBlastRadius.irreversibleSideEffects.push('injected');
    expect(run.checkpoint().cumulativeBlastRadius.irreversibleSideEffects).toEqual([]);
  });

  it('session methods work detached (destructured into event glue)', () => {
    const { run } = makeRun();
    const { propose, executed, checkpoint } = run;
    const p = proposal();
    propose(p, 2);
    executed(p, { status: 'executed', ts: 3 });
    expect(checkpoint().cumulativeBlastRadius.entities).toEqual(['x']);
  });

  it('hard-stop stays confirm through the session even after many approvals', () => {
    const { run } = makeRun();
    const hard = proposal({
      id: 'p-hard',
      reversibility: 'irreversible',
      provenance: [{ kind: 'inference' }],
    });
    for (let i = 0; i < 20; i++) {
      expect(run.propose(hard, i)).toBe('confirm');
      run.resolve(hard, 'approved', i);
    }
    expect(run.propose(hard, 99)).toBe('confirm');
  });

  it('complete emits run.completed with all receipts and closes the stream', () => {
    const { run, events } = makeRun();
    const a = proposal({ id: 'a' });
    const b = proposal({ id: 'b' });
    run.propose(a, 1);
    run.propose(b, 1);
    const r1 = run.executed(a, { status: 'executed', ts: 2 });
    const r2 = run.executed(b, { status: 'failed', ts: 3, error: 'x' });
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
