import { describe, expect, it } from 'vitest';
import { MockJudge } from '../scorers/judge.js';
import { EVAL_DATASET } from '../dataset.js';

describe('MockJudge', () => {
  const deleteCase = EVAL_DATASET.find((c) => c.id === 'delete-account-confirmation')!;

  it('passes rubrics whose offline hints appear in the output', async () => {
    const judge = new MockJudge();
    const scores = await judge.score(
      deleteCase,
      '<cg-alert-dialog><cg-button label="Delete">Delete</cg-button><cg-button label="Cancel">Cancel</cg-button></cg-alert-dialog>',
    );
    const hintable = scores.filter((s) => s.rubricId !== 'destructive-not-default-focused');
    expect(hintable.every((s) => s.score === 1)).toBe(true);
  });

  it('fails rubrics whose hints are absent', async () => {
    const judge = new MockJudge();
    const scores = await judge.score(deleteCase, '<div>sure, deleted</div>');
    expect(scores.find((s) => s.rubricId === 'chose-confirmation-pattern')!.score).toBe(0);
  });

  it('scores 0.5 (abstain) for live-only rubrics offline', async () => {
    const judge = new MockJudge();
    const scores = await judge.score(deleteCase, '<cg-alert-dialog>cancel</cg-alert-dialog>');
    expect(scores.find((s) => s.rubricId === 'destructive-not-default-focused')!.score).toBe(0.5);
  });
});
