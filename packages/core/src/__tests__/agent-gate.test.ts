import { describe, it, expect } from 'vitest';
import { gate, emptyRunContext } from '../agent/gate.js';
import type { RunContext } from '../agent/gate.js';
import { InMemoryTrustLedger } from '../agent/trust-ledger.js';
import type { ActionProposal } from '../agent/proposal.js';

function proposal(over: Partial<ActionProposal> = {}): ActionProposal {
  return {
    id: 'p', runId: 'r', tool: 'invoice.create', input: {},
    summary: 's', rationale: 'why',
    reversibility: 'reversible',
    blastRadius: { scope: 'self', entities: ['x'], irreversibleSideEffects: [] },
    provenance: [{ kind: 'tool_result', toolCallId: 'c1' }],
    ...over,
  };
}
const ctx = (over: Partial<RunContext> = {}): RunContext => ({ ...emptyRunContext('r'), ...over });

describe('gate — reversibility baseline', () => {
  it('reversible + grounded → auto', () => {
    expect(gate(proposal(), ctx(), new InMemoryTrustLedger())).toBe('auto');
  });

  it('irreversible + external → confirm_typed', () => {
    const p = proposal({
      reversibility: 'irreversible',
      blastRadius: { scope: 'external', entities: ['a'], irreversibleSideEffects: ['email.send'] },
      provenance: [{ kind: 'tool_result', toolCallId: 'c1' }],
    });
    expect(gate(p, ctx(), new InMemoryTrustLedger())).toBe('confirm_typed');
  });

  it('irreversible + non-external → confirm', () => {
    const p = proposal({
      reversibility: 'irreversible',
      blastRadius: { scope: 'workspace', entities: ['a'], irreversibleSideEffects: ['delete.row'] },
      provenance: [{ kind: 'tool_result', toolCallId: 'c1' }],
    });
    expect(gate(p, ctx(), new InMemoryTrustLedger())).toBe('confirm');
  });
});

describe('gate — correction #3: hard-stop overrides earned trust', () => {
  it('irreversible + inference-only → confirm even with a maxed ledger', () => {
    const p = proposal({
      reversibility: 'irreversible',
      blastRadius: { scope: 'workspace', entities: ['a'], irreversibleSideEffects: ['delete.row'] },
      provenance: [{ kind: 'inference' }],
    });
    const ledger = new InMemoryTrustLedger();
    for (let i = 0; i < 100; i++) ledger.record(p, 'approved'); // try to buy autonomy
    expect(gate(p, ctx(), ledger)).toBe('confirm'); // ledger ignored
  });
});

describe('gate — inference-only escalates', () => {
  it('reversible but inference-only → confirm (not auto)', () => {
    const p = proposal({ reversibility: 'reversible', provenance: [{ kind: 'inference' }] });
    expect(gate(p, ctx(), new InMemoryTrustLedger())).toBe('confirm');
  });
});

describe('gate — compensable graduates via ledger', () => {
  it('compensable with < 10 clean approvals → confirm', () => {
    const p = proposal({ reversibility: 'compensable', compensation: { tool: 'invoice.void', input: {} } });
    const ledger = new InMemoryTrustLedger();
    for (let i = 0; i < 9; i++) ledger.record(p, 'approved');
    expect(gate(p, ctx(), ledger)).toBe('confirm');
  });

  it('compensable with >= 10 clean approvals → notify (earned autonomy)', () => {
    const p = proposal({ reversibility: 'compensable', compensation: { tool: 'invoice.void', input: {} } });
    const ledger = new InMemoryTrustLedger();
    for (let i = 0; i < 10; i++) ledger.record(p, 'approved');
    expect(gate(p, ctx(), ledger)).toBe('notify');
  });
});

describe('gate — correction #1: cumulative run blast radius escalates', () => {
  it('a reversible action escalates to confirm when the RUN has already accrued external irreversible reach', () => {
    // Each step is individually reversible/self, but the run so far already sent
    // an email (external, irreversible). The gate sees the cumulative radius and
    // refuses to keep acting freely.
    const p = proposal({ reversibility: 'reversible' });
    const context = ctx({
      cumulativeBlastRadius: { scope: 'external', entities: ['x'], irreversibleSideEffects: ['email.send'] },
    });
    expect(gate(p, context, new InMemoryTrustLedger())).toBe('confirm');
  });
});

describe('public API surface — gate + ledger', () => {
  it('re-exports gate, emptyRunContext, ledgerKey, InMemoryTrustLedger from root', async () => {
    const mod = await import('../index.js');
    expect(typeof mod.gate).toBe('function');
    expect(typeof mod.emptyRunContext).toBe('function');
    expect(typeof mod.ledgerKey).toBe('function');
    expect(typeof mod.InMemoryTrustLedger).toBe('function');
  });
});
