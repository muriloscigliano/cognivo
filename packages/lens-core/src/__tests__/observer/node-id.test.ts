import { describe, it, expect } from 'vitest';
import { computeNodeId, hashText } from '../../observer/node-id';

describe('computeNodeId', () => {
  it('produces same id for same shape', () => {
    const a = computeNodeId({ tag: 'div', position: '0:0:1', textHash: 'abc' });
    const b = computeNodeId({ tag: 'div', position: '0:0:1', textHash: 'abc' });
    expect(a).toBe(b);
  });

  it('produces different id when tag differs', () => {
    const a = computeNodeId({ tag: 'div', position: '0', textHash: 'abc' });
    const b = computeNodeId({ tag: 'span', position: '0', textHash: 'abc' });
    expect(a).not.toBe(b);
  });

  it('produces different id when position differs', () => {
    const a = computeNodeId({ tag: 'div', position: '0:0', textHash: 'abc' });
    const b = computeNodeId({ tag: 'div', position: '0:1', textHash: 'abc' });
    expect(a).not.toBe(b);
  });

  it('output is exactly 12 hex chars', () => {
    const id = computeNodeId({ tag: 'div', position: '0', textHash: '' });
    expect(id).toMatch(/^[0-9a-f]{12}$/);
  });

  it('handles unicode in tag/position without crashing', () => {
    const id = computeNodeId({ tag: 'cg-büttön', position: '0:€', textHash: '日本' });
    expect(id).toMatch(/^[0-9a-f]{12}$/);
  });
});

describe('hashText', () => {
  it('returns 8 zeros for empty / undefined', () => {
    expect(hashText('')).toBe('00000000');
    expect(hashText(undefined)).toBe('00000000');
  });

  it('returns 8 hex chars', () => {
    expect(hashText('hello world')).toMatch(/^[0-9a-f]{8}$/);
  });

  it('is deterministic', () => {
    expect(hashText('Sign up free')).toBe(hashText('Sign up free'));
  });

  it('distinguishes similar strings', () => {
    expect(hashText('Pay now')).not.toBe(hashText('Pay later'));
  });
});
