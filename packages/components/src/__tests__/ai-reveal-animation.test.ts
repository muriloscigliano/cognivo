import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { AiRevealAnimation } from '../components/ai-reveal-animation/ai-reveal-animation.js';

if (!customElements.get('ai-reveal-animation')) {
  customElements.define('ai-reveal-animation', AiRevealAnimation);
}

function setReducedMotion(reduce: boolean) {
  vi.spyOn(window, 'matchMedia').mockImplementation((query: string) => ({
    matches: reduce && query.includes('prefers-reduced-motion'),
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }) as MediaQueryList);
}

describe('ai-reveal-animation', () => {
  let el: AiRevealAnimation;

  afterEach(() => {
    el?.remove();
    vi.restoreAllMocks();
  });

  it('renders content in the slotted wrapper', async () => {
    setReducedMotion(false);
    el = document.createElement('ai-reveal-animation') as AiRevealAnimation;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.wrapper')).toBeTruthy();
    expect(el.shadowRoot!.querySelector('slot')).toBeTruthy();
  });

  it('reveal-complete fires under reduced motion when visible is toggled AFTER connect (REVEAL-1)', async () => {
    setReducedMotion(true);
    el = document.createElement('ai-reveal-animation') as AiRevealAnimation;
    document.body.appendChild(el);
    await el.updateComplete;

    const done = new Promise<void>((resolve) =>
      el.addEventListener('ai-reveal-complete', () => resolve(), { once: true }),
    );
    el.visible = true;
    await el.updateComplete;
    await done; // resolves only if the reduced-motion short-circuit runs from updated()
    expect(el.shadowRoot!.querySelector('.wrapper')!.classList.contains('done')).toBe(true);
  });

  it('dispatches exactly one reveal-complete when connected with visible=true under reduced motion (no double dispatch)', async () => {
    setReducedMotion(true);
    el = document.createElement('ai-reveal-animation') as AiRevealAnimation;
    let count = 0;
    el.addEventListener('ai-reveal-complete', () => { count++; });
    el.visible = true;
    document.body.appendChild(el);
    await el.updateComplete;
    await new Promise((r) => requestAnimationFrame(() => r(null)));
    await new Promise((r) => requestAnimationFrame(() => r(null)));
    expect(count).toBe(1);
  });

  it('completes on animationend when motion is allowed', async () => {
    setReducedMotion(false);
    el = document.createElement('ai-reveal-animation') as AiRevealAnimation;
    el.visible = true;
    document.body.appendChild(el);
    await el.updateComplete;

    const done = new Promise<void>((resolve) =>
      el.addEventListener('ai-reveal-complete', () => resolve(), { once: true }),
    );
    el.shadowRoot!.querySelector('.wrapper')!.dispatchEvent(new Event('animationend'));
    await done;
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.wrapper')!.classList.contains('done')).toBe(true);
  });

  it('aria-hidden reflects visibility state', async () => {
    setReducedMotion(false);
    el = document.createElement('ai-reveal-animation') as AiRevealAnimation;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.wrapper')!.getAttribute('aria-hidden')).toBe('true');
  });
});
