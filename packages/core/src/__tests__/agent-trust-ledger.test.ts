import { describe, it, expect } from 'vitest';
import { InMemoryTrustLedger, ledgerKey } from '../agent/trust-ledger.js';
import type { ActionProposal } from '../agent/proposal.js';

function proposal(over: Partial<ActionProposal> = {}): ActionProposal {
  return {
    id: 'p', runId: 'r', tool: 'invoice.create', input: {},
    summary: 's', rationale: 'why',
    reversibility: 'compensable',
    blastRadius: { scope: 'self', entities: ['inv-1'], irreversibleSideEffects: [] },
    provenance: [{ kind: 'tool_result', toolCallId: 'c1' }],
    compensation: { tool: 'invoice.void', input: {} },
    ...over,
  };
}

describe('ledgerKey', () => {
  it('combines tool and blast bucket so cheap trust cannot pay for expensive actions', () => {
    const cheap = proposal();
    const pricey = proposal({
      blastRadius: { scope: 'external', entities: Array.from({ length: 200 }, (_, i) => `c${i}`), irreversibleSideEffects: [] },
    });
    expect(ledgerKey(cheap)).toBe('invoice.create:self:m1:x0');
    expect(ledgerKey(pricey)).toBe('invoice.create:external:m3:x0');
    expect(ledgerKey(cheap)).not.toBe(ledgerKey(pricey));
  });
});

describe('InMemoryTrustLedger', () => {
  it('counts clean approvals per key', () => {
    const l = new InMemoryTrustLedger();
    const p = proposal();
    l.record(p, 'approved');
    l.record(p, 'approved');
    expect(l.autoApprovals(p)).toBe(2);
  });

  it('an edit RESETS a real non-zero counter (proves demotion, not a no-op)', () => {
    const l = new InMemoryTrustLedger();
    const p = proposal();
    l.record(p, 'approved');
    l.record(p, 'approved');
    expect(l.autoApprovals(p)).toBe(2);   // <-- prove it was non-zero FIRST
    l.record(p, 'edited'); // human changed it → trust demotes to zero
    expect(l.autoApprovals(p)).toBe(0);
  });

  it('a rejection also resets the counter', () => {
    const l = new InMemoryTrustLedger();
    const p = proposal();
    l.record(p, 'approved');
    l.record(p, 'approved');
    expect(l.autoApprovals(p)).toBe(2);
    l.record(p, 'rejected');
    expect(l.autoApprovals(p)).toBe(0);
  });

  it('tracks keys independently', () => {
    const l = new InMemoryTrustLedger();
    const cheap = proposal();
    const pricey = proposal({
      blastRadius: { scope: 'external', entities: Array.from({ length: 200 }, (_, i) => `c${i}`), irreversibleSideEffects: [] },
    });
    l.record(cheap, 'approved');
    l.record(cheap, 'approved');
    expect(l.autoApprovals(cheap)).toBe(2);
    expect(l.autoApprovals(pricey)).toBe(0); // different key, no spillover
  });
});
