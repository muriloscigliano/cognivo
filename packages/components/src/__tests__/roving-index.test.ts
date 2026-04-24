import { describe, it, expect, vi } from 'vitest';
import { handleRovingKey } from '../utils/roving-index.js';

interface MenuItem {
  id: string;
  separator?: boolean;
  disabled?: boolean;
}

const isSkippable = (i: MenuItem): boolean => Boolean(i.separator || i.disabled);

function key(k: string): KeyboardEvent {
  return new KeyboardEvent('keydown', { key: k, cancelable: true });
}

describe('handleRovingKey', () => {
  const items: MenuItem[] = [
    { id: 'a' },
    { id: 'sep', separator: true },
    { id: 'b' },
    { id: 'c', disabled: true },
    { id: 'd' },
  ];
  // selectable: a (0), b (1), d (2)

  it('ArrowDown advances one and wraps at the end', () => {
    const r0 = handleRovingKey(key('ArrowDown'), { items, activeIndex: 0, isSkippable });
    expect(r0).toEqual({ index: 1, handled: true });

    const r1 = handleRovingKey(key('ArrowDown'), { items, activeIndex: 2, isSkippable });
    expect(r1).toEqual({ index: 0, handled: true });
  });

  it('ArrowUp recedes one and wraps at the start', () => {
    const r0 = handleRovingKey(key('ArrowUp'), { items, activeIndex: 2, isSkippable });
    expect(r0).toEqual({ index: 1, handled: true });

    const r1 = handleRovingKey(key('ArrowUp'), { items, activeIndex: 0, isSkippable });
    expect(r1).toEqual({ index: 2, handled: true });
  });

  it('Home jumps to first selectable index', () => {
    const r = handleRovingKey(key('Home'), { items, activeIndex: 2, isSkippable });
    expect(r).toEqual({ index: 0, handled: true });
  });

  it('End jumps to last selectable index', () => {
    const r = handleRovingKey(key('End'), { items, activeIndex: 0, isSkippable });
    expect(r).toEqual({ index: 2, handled: true });
  });

  it('Enter calls onSelect with the active selectable item', () => {
    const onSelect = vi.fn();
    const r = handleRovingKey(key('Enter'), { items, activeIndex: 1, isSkippable, onSelect });
    expect(onSelect).toHaveBeenCalledWith({ id: 'b' }, 1);
    expect(r.handled).toBe(true);
    expect(r.index).toBe(1);
  });

  it('Space also calls onSelect', () => {
    const onSelect = vi.fn();
    handleRovingKey(key(' '), { items, activeIndex: 2, isSkippable, onSelect });
    expect(onSelect).toHaveBeenCalledWith({ id: 'd' }, 2);
  });

  it('Escape calls onEscape and marks handled', () => {
    const onEscape = vi.fn();
    const r = handleRovingKey(key('Escape'), { items, activeIndex: 1, isSkippable, onEscape });
    expect(onEscape).toHaveBeenCalled();
    expect(r.handled).toBe(true);
  });

  it('skips separators and disabled items (selectable length is 3, not 5)', () => {
    // Wrapping from the last selectable (index 2) with ArrowDown should return 0,
    // not 3 — proving the separator/disabled entries were filtered out.
    const r = handleRovingKey(key('ArrowDown'), { items, activeIndex: 2, isSkippable });
    expect(r.index).toBe(0);
  });

  it('unhandled keys return the same index with handled=false', () => {
    const r = handleRovingKey(key('a'), { items, activeIndex: 1, isSkippable });
    expect(r).toEqual({ index: 1, handled: false });
  });
});
