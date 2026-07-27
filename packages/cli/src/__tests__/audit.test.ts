import { describe, expect, it } from 'vitest';
import { runAudit } from '../commands/audit.js';

describe('cognivo audit', () => {
  it('passes clean cognivo markup', () => {
    const r = runAudit('<cg-card><cg-button label="Save">Save</cg-button></cg-card>');
    expect(r.exitCode).toBe(0);
    expect(r.text).toContain('OK');
  });

  it('fails unknown components with exit 1', () => {
    const r = runAudit('<cg-frobnicate></cg-frobnicate>');
    expect(r.exitCode).toBe(1);
    expect(r.text).toContain('cg-frobnicate');
  });

  it('fails raw hex with exit 1', () => {
    const r = runAudit('<cg-card><style>.x{color:#3b82f6}</style><cg-button label="a">a</cg-button></cg-card>');
    expect(r.exitCode).toBe(1);
  });

  it('emits machine-readable JSON with --json shape', () => {
    const r = runAudit('<cg-frobnicate></cg-frobnicate>', { json: true });
    const parsed = JSON.parse(r.text) as { valid: boolean; issues: unknown[] };
    expect(parsed.valid).toBe(false);
    expect(parsed.issues.length).toBeGreaterThan(0);
  });
});
