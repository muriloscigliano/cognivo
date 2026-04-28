import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { watch } from '../../observer/watch';
import type { SceneGraph } from '../../types/scene-graph';

/**
 * MutationObserver in happy-dom delivers via microtasks; mixing fake timers with
 * MO scheduling is fragile. We use *real* timers with a small debounce window
 * and explicit waits.
 */

const wait = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

describe('watch() — MutationObserver-driven rescans', () => {
  beforeEach(() => {
    document.body.innerHTML = '<main><div id="root"></div></main>';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('does not fire onChange synchronously on attach', () => {
    const cb = vi.fn();
    const handle = watch(document.getElementById('root')!, cb, { debounceMs: 30 });
    expect(cb).not.toHaveBeenCalled();
    handle.disconnect();
  });

  it('fires onChange after a DOM mutation, debounced', async () => {
    const root = document.getElementById('root')!;
    const cb = vi.fn();
    const handle = watch(root, cb, { debounceMs: 30 });

    root.appendChild(document.createElement('span'));

    await wait(80);

    expect(cb).toHaveBeenCalledTimes(1);
    const graph = cb.mock.calls[0]![0] as SceneGraph;
    expect(graph.nodes.find((n) => n.tag === 'span')).toBeDefined();

    handle.disconnect();
  });

  it('coalesces rapid mutations into a single rescan (backpressure)', async () => {
    const root = document.getElementById('root')!;
    const cb = vi.fn();
    const handle = watch(root, cb, { debounceMs: 30 });

    for (let i = 0; i < 10; i++) {
      const el = document.createElement('span');
      el.textContent = `child-${i}`;
      root.appendChild(el);
    }

    await wait(80);

    expect(cb).toHaveBeenCalledTimes(1);
    handle.disconnect();
  });

  it('flush() forces an immediate rescan and cancels pending timer', async () => {
    const root = document.getElementById('root')!;
    const cb = vi.fn();
    const handle = watch(root, cb, { debounceMs: 1000 });

    root.appendChild(document.createElement('span'));
    await wait(10); // let the MutationObserver microtask deliver

    handle.flush();

    expect(cb).toHaveBeenCalledTimes(1);

    // Wait past the original debounce — no second call should arrive.
    await wait(50);
    expect(cb).toHaveBeenCalledTimes(1);

    handle.disconnect();
  });

  it('disconnect() prevents future rescans', async () => {
    const root = document.getElementById('root')!;
    const cb = vi.fn();
    const handle = watch(root, cb, { debounceMs: 30 });

    handle.disconnect();

    root.appendChild(document.createElement('span'));
    await wait(80);

    expect(cb).not.toHaveBeenCalled();
  });

  it('disconnect() is idempotent', () => {
    const cb = vi.fn();
    const handle = watch(document.getElementById('root')!, cb);
    handle.disconnect();
    expect(() => handle.disconnect()).not.toThrow();
  });
});
