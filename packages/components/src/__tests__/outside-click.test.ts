import { describe, it, expect, vi, afterEach } from 'vitest';
import { bindOutsideClick } from '../utils/outside-click.js';

describe('bindOutsideClick', () => {
  let host: HTMLDivElement;
  let outside: HTMLDivElement;
  const disposers: Array<() => void> = [];

  function setup(): void {
    host = document.createElement('div');
    host.id = 'host';
    const inner = document.createElement('button');
    inner.id = 'inner';
    host.appendChild(inner);

    outside = document.createElement('div');
    outside.id = 'outside';

    document.body.appendChild(host);
    document.body.appendChild(outside);
  }

  afterEach(() => {
    while (disposers.length) disposers.pop()?.();
    host?.remove();
    outside?.remove();
  });

  function flush(): Promise<void> {
    // The listener is attached on a macrotask (setTimeout 0).
    return new Promise((r) => setTimeout(r, 0));
  }

  it('does not fire when the click target is inside the host', async () => {
    setup();
    const cb = vi.fn();
    disposers.push(bindOutsideClick(host, cb));
    await flush();

    const inner = host.querySelector<HTMLElement>('#inner')!;
    inner.click();
    expect(cb).not.toHaveBeenCalled();
  });

  it('fires when the click target is outside the host', async () => {
    setup();
    const cb = vi.fn();
    disposers.push(bindOutsideClick(host, cb));
    await flush();

    outside.click();
    expect(cb).toHaveBeenCalledOnce();
  });

  it('disposer stops the listener from firing', async () => {
    setup();
    const cb = vi.fn();
    const dispose = bindOutsideClick(host, cb);
    await flush();

    dispose();
    outside.click();
    expect(cb).not.toHaveBeenCalled();
  });

  it('calling the disposer before attach prevents attaching at all', async () => {
    setup();
    const cb = vi.fn();
    const dispose = bindOutsideClick(host, cb);
    // Dispose synchronously — before the setTimeout(0) fires.
    dispose();
    await flush();

    outside.click();
    expect(cb).not.toHaveBeenCalled();
  });
});
