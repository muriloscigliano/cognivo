import { describe, it, expect } from 'vitest';
import { toReceipt } from '../agent/receipt.js';
import type { ActionProposal } from '../agent/proposal.js';

function proposal(over: Partial<ActionProposal> = {}): ActionProposal {
  return {
    id: 'p1', runId: 'r1', tool: 'invoice.create', input: { amount: 50 },
    summary: 'Create invoice INV-1', rationale: 'user asked',
    reversibility: 'compensable',
    blastRadius: { scope: 'workspace', entities: ['INV-1'], irreversibleSideEffects: [] },
    provenance: [{ kind: 'tool_result', toolCallId: 'c1' }],
    compensation: { tool: 'invoice.void', input: { id: 'INV-1' } },
    ...over,
  };
}

describe('toReceipt', () => {
  it('snapshots what executed and what it touched', () => {
    const r = toReceipt(proposal(), { status: 'executed', ts: 1000 });
    expect(r.proposalId).toBe('p1');
    expect(r.tool).toBe('invoice.create');
    expect(r.summary).toBe('Create invoice INV-1');
    expect(r.touched).toEqual(['INV-1']);
    expect(r.status).toBe('executed');
    expect(r.ts).toBe(1000);
  });

  it('carries the SPECIFIC compensation for this action (not a global undo)', () => {
    const r = toReceipt(proposal(), { status: 'executed', ts: 1 });
    expect(r.compensation).toEqual({ tool: 'invoice.void', input: { id: 'INV-1' } });
  });

  it('records that a compensable action is not truly undone (voided ≠ deleted)', () => {
    // Compensation ≠ undo. A voided invoice still exists; the receipt must say so.
    const r = toReceipt(proposal(), { status: 'executed', ts: 1 });
    expect(r.reversibility).toBe('compensable');
    expect(r.compensationIsDestructiveUndo).toBe(false);
  });

  it('has no compensation for a reversible action', () => {
    // Build inline WITHOUT a compensation key (do not pass `compensation:
    // undefined` — `exactOptionalPropertyTypes: true` forbids explicit undefined
    // on an optional property, and a Partial override cannot remove a base key).
    const reversible: ActionProposal = {
      id: 'p2', runId: 'r1', tool: 'contact.tag', input: {},
      summary: 'Tag contact', rationale: 'user asked',
      reversibility: 'reversible',
      blastRadius: { scope: 'self', entities: ['tag-1'], irreversibleSideEffects: [] },
      provenance: [{ kind: 'tool_result', toolCallId: 'c1' }],
    };
    const r = toReceipt(reversible, { status: 'executed', ts: 1 });
    expect(r.compensation).toBeUndefined();
  });

  it('preserves a failure outcome with its error', () => {
    const r = toReceipt(proposal(), { status: 'failed', ts: 5, error: 'gateway down' });
    expect(r.status).toBe('failed');
    expect(r.error).toBe('gateway down');
  });
});

describe('public API surface — receipt', () => {
  it('re-exports toReceipt from the package root', async () => {
    const mod = await import('../index.js');
    expect(typeof mod.toReceipt).toBe('function');
  });
});
