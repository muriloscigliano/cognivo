import { describe, expect, it, vi } from 'vitest';
import { EVALS_NOT_FOUND_MESSAGE, resolveEvalsCli, runEvalsPassthrough } from '../commands/evals.js';

describe('cognivo evals', () => {
  it('resolves the monorepo evals CLI', () => {
    const p = resolveEvalsCli();
    expect(p).not.toBeNull();
    expect(p).toMatch(/packages\/evals\/src\/cli\.ts$/);
  });

  it('passthrough runs the mock gate and exits 0', async () => {
    const code = await runEvalsPassthrough(['run', '--mode', 'mock']);
    expect(code).toBe(0);
  }, 30_000);

  it('exit 2 with a friendly error when the evals CLI is absent', async () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const code = await runEvalsPassthrough(['run'], () => null);
    expect(code).toBe(2);
    expect(spy).toHaveBeenCalledWith(EVALS_NOT_FOUND_MESSAGE);
    spy.mockRestore();
  });
});
