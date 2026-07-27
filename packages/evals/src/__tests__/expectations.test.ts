import { describe, expect, it } from 'vitest';
import { scoreExpectations } from '../scorers/expectations.js';
import type { Expectations } from '../types.js';

const ex: Expectations = {
  anyOf: [['cg-alert-dialog', 'cg-modal']],
  mustUseTags: ['cg-button'],
  forbidTags: ['cg-toaster'],
};

describe('scoreExpectations', () => {
  it('passes when a choice tag and required tags are present', () => {
    const r = scoreExpectations('<cg-alert-dialog><cg-button label="x">x</cg-button></cg-alert-dialog>', ex);
    expect(r.pass).toBe(true);
  });

  it('fails when no choice-group tag appears', () => {
    const r = scoreExpectations('<div><cg-button label="x">x</cg-button></div>', ex);
    expect(r.pass).toBe(false);
    expect(r.failures[0]).toContain('cg-alert-dialog');
  });

  it('fails when a required tag is missing', () => {
    const r = scoreExpectations('<cg-modal></cg-modal>', ex);
    expect(r.pass).toBe(false);
  });

  it('fails when a forbidden tag appears', () => {
    const r = scoreExpectations(
      '<cg-modal><cg-button label="x">x</cg-button><cg-toaster></cg-toaster></cg-modal>',
      ex,
    );
    expect(r.pass).toBe(false);
  });
});
