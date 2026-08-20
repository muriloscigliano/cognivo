import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { AiThinkingOrb } from '../components/ai-thinking-orb/ai-thinking-orb.js';
import { ORB_STATE_LABELS } from '../utils/orb-renderer.js';

if (!customElements.get('ai-thinking-orb')) {
  customElements.define('ai-thinking-orb', AiThinkingOrb);
}

describe('ai-thinking-orb', () => {
  let el: AiThinkingOrb;
  let rafSpy: ReturnType<typeof vi.spyOn>;

  async function create(props?: Partial<AiThinkingOrb>): Promise<AiThinkingOrb> {
    el = document.createElement('ai-thinking-orb') as AiThinkingOrb;
    if (props) {
      for (const [k, v] of Object.entries(props)) {
        (el as unknown as Record<string, unknown>)[k] = v;
      }
    }
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  beforeEach(() => {
    rafSpy = vi.spyOn(globalThis, 'requestAnimationFrame').mockImplementation(() => 1);
    vi.spyOn(globalThis, 'cancelAnimationFrame').mockImplementation(() => {});
  });

  afterEach(() => {
    el?.remove();
    vi.restoreAllMocks();
  });

  it('renders a canvas with role="img"', async () => {
    await create();
    const canvas = el.shadowRoot!.querySelector('canvas');
    expect(canvas).not.toBeNull();
    expect(canvas!.getAttribute('role')).toBe('img');
  });

  it('defaults to the thinking state with its aria label', async () => {
    await create();
    expect(el.state).toBe('thinking');
    const canvas = el.shadowRoot!.querySelector('canvas')!;
    expect(canvas.getAttribute('aria-label')).toBe(ORB_STATE_LABELS.thinking);
  });

  it('state changes update the aria label', async () => {
    await create({ state: 'searching' });
    const canvas = el.shadowRoot!.querySelector('canvas')!;
    expect(canvas.getAttribute('aria-label')).toBe(ORB_STATE_LABELS.searching);
  });

  it('label prop overrides the per-state default', async () => {
    await create({ state: 'searching', label: 'Custom label' });
    const canvas = el.shadowRoot!.querySelector('canvas')!;
    expect(canvas.getAttribute('aria-label')).toBe('Custom label');
  });

  it('invalid state falls back to thinking', async () => {
    await create({ state: 'nonsense' as never });
    const canvas = el.shadowRoot!.querySelector('canvas')!;
    expect(canvas.getAttribute('aria-label')).toBe(ORB_STATE_LABELS.thinking);
  });

  it('reflects size and maps sm/md/lg to pixel dimensions', async () => {
    await create({ size: 'lg' });
    expect(el.getAttribute('size')).toBe('lg');
    expect(el.pixelSize).toBe(64);
    el.size = 'sm';
    await el.updateComplete;
    expect(el.pixelSize).toBe(20);
    el.size = 'md';
    await el.updateComplete;
    expect(el.pixelSize).toBe(40);
  });

  it('starts the animation loop when connected and running', async () => {
    await create();
    expect(rafSpy).toHaveBeenCalled();
  });

  it('does not run the loop when paused', async () => {
    await create({ paused: true });
    expect(rafSpy).not.toHaveBeenCalled();
  });

  it('pausing after start cancels the scheduled frame', async () => {
    const pending: FrameRequestCallback[] = [];
    rafSpy.mockImplementation((cb: FrameRequestCallback) => {
      pending.push(cb);
      return pending.length;
    });
    await create();
    expect(cancelAnimationFrame).not.toHaveBeenCalled();
    el.paused = true;
    await el.updateComplete;
    expect(cancelAnimationFrame).toHaveBeenCalled();

    // A state change while paused announces (one rAF) but must NOT restart
    // the render loop: flushing every pending frame schedules nothing new.
    pending.length = 0;
    el.state = 'searching';
    await el.updateComplete;
    while (pending.length > 0) {
      pending.shift()!(0);
      await el.updateComplete;
    }
    expect(pending.length).toBe(0);
  });

  it('disconnect cancels the loop', async () => {
    await create();
    el.remove();
    expect(cancelAnimationFrame).toHaveBeenCalled();
  });

  it('renders a single static frame under prefers-reduced-motion', async () => {
    const mm = vi.spyOn(window, 'matchMedia').mockImplementation((query: string) => ({
      matches: query.includes('prefers-reduced-motion'),
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      onchange: null,
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList);
    await create();
    expect(rafSpy).not.toHaveBeenCalled();
    mm.mockRestore();
  });

  it('speed defaults to 1', async () => {
    await create();
    expect(el.speed).toBe(1);
  });

  it('announces state changes via the polite live region (not on first render)', async () => {
    const pending: FrameRequestCallback[] = [];
    rafSpy.mockImplementation((cb: FrameRequestCallback) => {
      pending.push(cb);
      return pending.length;
    });
    await create();
    const region = el.shadowRoot!.querySelector('[role="status"]')!;
    expect(region.getAttribute('aria-live')).toBe('polite');
    expect(region.textContent).toBe('');
    el.state = 'searching';
    await el.updateComplete;
    // _announce clears then re-fills on the next animation frame
    const announceFrame = pending.pop()!;
    announceFrame(0);
    await el.updateComplete;
    expect(region.textContent).toContain('searching');
  });

  function fakeContext() {
    return {
      canvas: { width: 40, height: 40 },
      clearRect: vi.fn(),
      beginPath: vi.fn(),
      arc: vi.fn(),
      fill: vi.fn(),
      save: vi.fn(),
      restore: vi.fn(),
      setTransform: vi.fn(),
      fillStyle: '',
      globalAlpha: 1,
    };
  }

  it('the loop actually runs: draws every frame, advances time, reschedules', async () => {
    const pending: FrameRequestCallback[] = [];
    rafSpy.mockImplementation((cb: FrameRequestCallback) => {
      pending.push(cb);
      return pending.length;
    });
    await create();
    const ctx = fakeContext();
    const canvas = el.shadowRoot!.querySelector('canvas')!;
    canvas.getContext = (() => ctx) as unknown as typeof canvas.getContext;

    expect(pending.length).toBe(1);
    pending.shift()!(1000);            // first tick: establishes the clock
    expect(ctx.clearRect).toHaveBeenCalledTimes(1);
    expect(ctx.arc.mock.calls.length).toBeGreaterThan(0);
    expect(pending.length).toBe(1);    // rescheduled itself

    const firstFrameArcs = ctx.arc.mock.calls.map((c) => c.slice(0, 2));
    pending.shift()!(1500);            // +0.5s: clock advanced, dots moved
    expect(ctx.clearRect).toHaveBeenCalledTimes(2);
    const secondFrameArcs = ctx.arc.mock.calls.slice(firstFrameArcs.length).map((c) => c.slice(0, 2));
    expect(secondFrameArcs).not.toEqual(firstFrameArcs);
    expect(pending.length).toBe(1);    // still looping
  });

  it('renders one static frame (no loop) under prefers-reduced-motion', async () => {
    const mm = vi.spyOn(window, 'matchMedia').mockImplementation((query: string) => ({
      matches: query.includes('prefers-reduced-motion'),
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      onchange: null,
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList);
    const ctx = fakeContext();
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = (() => ctx) as unknown as typeof original;
    try {
      await create();
      expect(rafSpy).not.toHaveBeenCalled();
      expect(ctx.clearRect).toHaveBeenCalled();   // the static frame drew
      expect(ctx.arc.mock.calls.length).toBeGreaterThan(0);
    } finally {
      HTMLCanvasElement.prototype.getContext = original;
      mm.mockRestore();
    }
  });

  it('going offscreen pauses the loop via IntersectionObserver', async () => {
    const observers: Array<(entries: Array<{ isIntersecting: boolean }>) => void> = [];
    vi.stubGlobal('IntersectionObserver', class {
      constructor(cb: (entries: Array<{ isIntersecting: boolean }>) => void) {
        observers.push(cb);
      }
      observe() {}
      unobserve() {}
      disconnect() {}
    });
    try {
      await create();
      expect(observers.length).toBe(1);
      expect(cancelAnimationFrame).not.toHaveBeenCalled();
      observers[0]!([{ isIntersecting: false }]);
      expect(cancelAnimationFrame).toHaveBeenCalled();
      rafSpy.mockClear();
      observers[0]!([{ isIntersecting: true }]);
      expect(rafSpy).toHaveBeenCalled();          // resumes when visible again
    } finally {
      vi.unstubAllGlobals();
    }
  });
});
