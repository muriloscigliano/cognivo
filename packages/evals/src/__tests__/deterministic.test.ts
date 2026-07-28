import { describe, expect, it } from 'vitest';
import { scoreDeterministic } from '../scorers/deterministic.js';

describe('scoreDeterministic', () => {
  it('passes clean cognivo markup', () => {
    const r = scoreDeterministic('<cg-card><cg-button label="Save">Save</cg-button></cg-card>');
    expect(r.pass).toBe(true);
    expect(r.issues.filter((i) => i.includes('error'))).toHaveLength(0);
  });

  it('fails unknown components', () => {
    const r = scoreDeterministic('<cg-frobnicate label="x"></cg-frobnicate>');
    expect(r.pass).toBe(false);
  });

  it('fails raw hex in embedded styles', () => {
    const r = scoreDeterministic(
      '<cg-card><style>.x { color: #3b82f6; }</style><cg-button label="Go">Go</cg-button></cg-card>',
    );
    expect(r.pass).toBe(false);
  });

  it('fails unlabeled buttons', () => {
    const r = scoreDeterministic('<cg-button></cg-button>');
    expect(r.pass).toBe(false);
  });
});
