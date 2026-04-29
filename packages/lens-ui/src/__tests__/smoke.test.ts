import { describe, it, expect } from 'vitest';

describe('@cognivo/lens-ui smoke', () => {
  it('barrel registers <cg-lens>', async () => {
    await import('../index.js');
    expect(customElements.get('cg-lens')).toBeDefined();
  });

  it('peer deps are importable from this workspace', async () => {
    const lensCore = await import('@cognivo/lens-core');
    const corePack = await import('@cognivo/lens-pack-core');
    expect(typeof lensCore.RuleEngine).toBe('function');
    expect(corePack.default.id).toBe('@cognivo/lens-pack-core');
  });
});
