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
});
