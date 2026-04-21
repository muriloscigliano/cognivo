import { describe, it, expect, vi, beforeEach } from 'vitest';
import { lazy, lazyAll } from '../utils/lazy.js';

describe('lazy', () => {
  beforeEach(() => {
    // Reset the DOM between cases so observers from prior tests can't fire.
    document.body.innerHTML = '';
  });

  it('calls loader when tag is inserted into DOM', async () => {
    const loader = vi.fn(() =>
      Promise.resolve({ default: class extends HTMLElement {} }),
    );
    lazy('test-lazy-1', loader);

    expect(loader).not.toHaveBeenCalled();
    const el = document.createElement('test-lazy-1');
    document.body.appendChild(el);

    await new Promise((r) => setTimeout(r, 10));
    expect(loader).toHaveBeenCalledOnce();
  });

  it('skips loader when tag already registered', () => {
    customElements.define('test-lazy-2', class extends HTMLElement {});
    const loader = vi.fn();
    lazy('test-lazy-2', loader);
    expect(loader).not.toHaveBeenCalled();
  });

  it('lazyAll registers multiple components', async () => {
    const loaderA = vi.fn(() => Promise.resolve({}));
    const loaderB = vi.fn(() => Promise.resolve({}));
    lazyAll({
      'test-lazy-3': loaderA,
      'test-lazy-4': loaderB,
    });
    document.body.appendChild(document.createElement('test-lazy-3'));
    await new Promise((r) => setTimeout(r, 10));
    expect(loaderA).toHaveBeenCalled();
    // loaderB not triggered because test-lazy-4 never inserted.
    expect(loaderB).not.toHaveBeenCalled();
  });
});
