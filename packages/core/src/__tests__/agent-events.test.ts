import { describe, it, expect, vi } from 'vitest';
import {
  AGENT_EVENT_TYPES,
  isAgentEvent,
  type AgentEvent,
} from '../agent/events.js';
import { AgentEventStream } from '../agent/event-stream.js';
import type { ActionProposal } from '../agent/proposal.js';
import { toReceipt } from '../agent/receipt.js';
import { emptyRunContext } from '../agent/gate.js';

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

function sampleEvents(): AgentEvent[] {
  const p = proposal();
  const receipt = toReceipt(p, { status: 'executed', ts: 5 });
  return [
    { type: 'run.started', runId: 'r1', ts: 1, goal: 'do the thing' },
    { type: 'step.started', runId: 'r1', ts: 2, stepId: 's1', summary: 'first step' },
    { type: 'proposal.emitted', runId: 'r1', ts: 3, proposal: p, gate: 'notify' },
    { type: 'proposal.resolved', runId: 'r1', ts: 4, proposalId: 'p1', decision: 'approved' },
    { type: 'action.executed', runId: 'r1', ts: 5, receipt },
    { type: 'run.checkpoint', runId: 'r1', ts: 6, checkpoint: emptyRunContext('r1') },
    { type: 'run.failed', runId: 'r1', ts: 7, error: 'boom', recoverable: true },
    { type: 'run.completed', runId: 'r1', ts: 8, receipts: [receipt] },
  ];
}

describe('AgentEvent union', () => {
  it('lists all eight event types', () => {
    expect([...AGENT_EVENT_TYPES]).toEqual([
      'run.started', 'step.started', 'proposal.emitted', 'proposal.resolved',
      'action.executed', 'run.checkpoint', 'run.failed', 'run.completed',
    ]);
  });

  it('every event narrows through a switch on type', () => {
    const seen: string[] = [];
    for (const e of sampleEvents()) {
      switch (e.type) {
        case 'run.started': seen.push(e.goal); break;
        case 'step.started': seen.push(e.stepId); break;
        case 'proposal.emitted': seen.push(e.proposal.id + e.gate); break;
        case 'proposal.resolved': seen.push(e.proposalId + e.decision); break;
        case 'action.executed': seen.push(e.receipt.tool); break;
        case 'run.checkpoint': seen.push(e.checkpoint.runId); break;
        case 'run.failed': seen.push(e.error + String(e.recoverable)); break;
        case 'run.completed': seen.push(String(e.receipts.length)); break;
      }
    }
    expect(seen.length).toBe(8);
  });

  it('isAgentEvent accepts every sample event', () => {
    for (const e of sampleEvents()) {
      expect(isAgentEvent(e), `should accept ${e.type}`).toBe(true);
    }
  });

  it('isAgentEvent fails closed on junk', () => {
    expect(isAgentEvent(null)).toBe(false);
    expect(isAgentEvent(undefined)).toBe(false);
    expect(isAgentEvent('run.started')).toBe(false);
    expect(isAgentEvent({})).toBe(false);
    expect(isAgentEvent({ type: 'nonsense', runId: 'r', ts: 1 })).toBe(false);
    expect(isAgentEvent({ type: 'run.started', ts: 1, goal: 'g' })).toBe(false);      // no runId
    expect(isAgentEvent({ type: 'run.started', runId: 'r', goal: 'g' })).toBe(false); // no ts
    expect(isAgentEvent({ type: 'run.started', runId: 'r', ts: '1', goal: 'g' })).toBe(false);
  });
});

describe('AgentEventStream', () => {
  const started = (ts: number): AgentEvent => ({ type: 'run.started', runId: 'r1', ts, goal: 'g' });

  it('listeners registered via on() receive events synchronously; unsubscribe stops them', () => {
    const stream = new AgentEventStream();
    const seen: number[] = [];
    const off = stream.on((e) => seen.push(e.ts));
    stream.emit(started(1));
    expect(seen).toEqual([1]);
    off();
    stream.emit(started(2));
    expect(seen).toEqual([1]);
    stream.close();
  });

  it('a throwing listener does not break the others', () => {
    const stream = new AgentEventStream();
    const seen: number[] = [];
    stream.on(() => { throw new Error('bad listener'); });
    stream.on((e) => seen.push(e.ts));
    expect(() => stream.emit(started(1))).not.toThrow();
    expect(seen).toEqual([1]);
    stream.close();
  });

  it('async iterators see events emitted after their creation, in order', async () => {
    const stream = new AgentEventStream();
    const collected: number[] = [];
    const consumer = (async () => {
      for await (const e of stream) collected.push(e.ts);
    })();
    stream.emit(started(1));
    stream.emit(started(2));
    stream.close();
    await consumer;
    expect(collected).toEqual([1, 2]);
  });

  it('multiple concurrent iterators each receive every event', async () => {
    const stream = new AgentEventStream();
    const a: number[] = [];
    const b: number[] = [];
    const ca = (async () => { for await (const e of stream) a.push(e.ts); })();
    const cb = (async () => { for await (const e of stream) b.push(e.ts); })();
    stream.emit(started(1));
    stream.emit(started(2));
    stream.close();
    await Promise.all([ca, cb]);
    expect(a).toEqual([1, 2]);
    expect(b).toEqual([1, 2]);
  });

  it('close() ends iteration and further emit() throws', async () => {
    const stream = new AgentEventStream();
    const consumer = (async () => {
      const seen: AgentEvent[] = [];
      for await (const e of stream) seen.push(e);
      return seen;
    })();
    stream.close();
    expect(await consumer).toEqual([]);
    expect(() => stream.emit(started(1))).toThrow();
  });

  it('iterator waiting on an empty queue resolves when the next event arrives', async () => {
    const stream = new AgentEventStream();
    const iterator = stream[Symbol.asyncIterator]();
    const pending = iterator.next();
    stream.emit(started(7));
    const { value, done } = await pending;
    expect(done).toBe(false);
    expect((value as AgentEvent).ts).toBe(7);
    stream.close();
  });

  it('emit rejects non-events (fail closed)', () => {
    const stream = new AgentEventStream();
    const spy = vi.fn();
    stream.on(spy);
    expect(() => stream.emit({ type: 'nonsense' } as unknown as AgentEvent)).toThrow();
    expect(spy).not.toHaveBeenCalled();
    stream.close();
  });
});

describe('public API surface — events', () => {
  it('re-exports the union tools from the package root', async () => {
    const mod = await import('../index.js');
    expect(typeof mod.isAgentEvent).toBe('function');
    expect(Array.isArray(mod.AGENT_EVENT_TYPES)).toBe(true);
    expect(typeof mod.AgentEventStream).toBe('function');
  });
});
