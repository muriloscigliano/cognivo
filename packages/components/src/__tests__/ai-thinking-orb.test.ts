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

  it('pausing after start stops scheduling', async () => {
    await create();
    rafSpy.mockClear();
    el.paused = true;
    await el.updateComplete;
    const callsAfterPause = rafSpy.mock.calls.length;
    expect(callsAfterPause).toBe(0);
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
});
