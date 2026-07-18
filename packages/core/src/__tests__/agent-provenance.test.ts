import { describe, it, expect } from 'vitest';
import { isInferenceOnly } from '../agent/provenance.js';
import type { Provenance } from '../agent/provenance.js';

describe('Provenance', () => {
  it('flags a proposal whose grounding is entirely inference', () => {
    const p: Provenance[] = [{ kind: 'inference' }];
    expect(isInferenceOnly(p)).toBe(true);
  });

  it('does NOT flag when at least one source is grounded', () => {
    const p: Provenance[] = [
      { kind: 'inference' },
      { kind: 'tool_result', toolCallId: 'call_42' },
    ];
    expect(isInferenceOnly(p)).toBe(false);
  });

  it('treats an empty provenance list as inference-only (honest default)', () => {
    // No stated grounding is not the same as "grounded". Absence of evidence
    // must fail closed, not open.
    expect(isInferenceOnly([])).toBe(true);
  });

  it('recognizes document grounding as grounded', () => {
    const p: Provenance[] = [{ kind: 'document', docId: 'doc_1', span: [10, 40] }];
    expect(isInferenceOnly(p)).toBe(false);
  });

  // FIX 3 (MED-1): unknown provenance kinds must FAIL CLOSED. A deserialized
  // proposal can carry a kind the type doesn't allow; treating it as "grounded"
  // would let an ungrounded action read as grounded.
  it('treats an unknown provenance kind as ungrounded (fails closed)', () => {
    const p = [{ kind: 'bogus' } as unknown as Provenance];
    expect(isInferenceOnly(p)).toBe(true);
  });

  it('treats a mix of unknown + inference as ungrounded', () => {
    const p = [{ kind: 'bogus' } as unknown as Provenance, { kind: 'inference' } as Provenance];
    expect(isInferenceOnly(p)).toBe(true);
  });

  it('still reads as grounded when a real tool_result sits beside an unknown kind', () => {
    const p = [
      { kind: 'bogus' } as unknown as Provenance,
      { kind: 'tool_result', toolCallId: 'c1' } as Provenance,
    ];
    expect(isInferenceOnly(p)).toBe(false);
  });
});
