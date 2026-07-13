import { describe, it, expect } from 'vitest';
import { isHardStop } from '../agent/proposal.js';
import type { ActionProposal } from '../agent/proposal.js';

function makeProposal(over: Partial<ActionProposal> = {}): ActionProposal {
  return {
    id: 'p1',
    runId: 'r1',
    tool: 'email.send',
    input: {},
    summary: 'Send the launch email to 3 recipients',
    rationale: 'User asked to notify the team',
    reversibility: 'irreversible',
    blastRadius: { scope: 'external', entities: ['a', 'b', 'c'], irreversibleSideEffects: ['email.send'] },
    provenance: [{ kind: 'inference' }],
    ...over,
  };
}

describe('ActionProposal hard-stop rule', () => {
  it('is a HARD STOP when irreversible AND inference-only', () => {
    // The single rule that kills the catastrophic tail. No autonomy level,
    // no earned trust, may ever auto-execute this.
    expect(isHardStop(makeProposal())).toBe(true);
  });

  it('is NOT a hard stop when irreversible but grounded in a tool result', () => {
    expect(isHardStop(makeProposal({
      provenance: [{ kind: 'tool_result', toolCallId: 'c1' }],
    }))).toBe(false);
  });

  it('is NOT a hard stop when inference-only but reversible', () => {
    expect(isHardStop(makeProposal({
      reversibility: 'reversible',
      provenance: [{ kind: 'inference' }],
    }))).toBe(false);
  });

  it('requires a compensation when reversibility is compensable', () => {
    // Type-level intent enforced at runtime: a compensable proposal without a
    // compensation is malformed.
    const p = makeProposal({ reversibility: 'compensable' });
    expect(() => assertWellFormed(p)).toThrow(/compensation/i);
  });
});

// local import kept at bottom to keep the happy-path readable
import { assertWellFormed } from '../agent/proposal.js';

describe('public API surface', () => {
  it('re-exports the agent contract from the package root', async () => {
    const mod = await import('../index.js');
    expect(typeof mod.isHardStop).toBe('function');
    expect(typeof mod.isInferenceOnly).toBe('function');
    expect(typeof mod.mergeBlastRadius).toBe('function');
  });
});
