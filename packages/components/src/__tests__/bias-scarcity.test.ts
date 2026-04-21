import { describe, it, expect, afterEach, vi } from 'vitest';
import { BiasScarcity } from '../components/bias-scarcity/bias-scarcity.js';

if (!customElements.get('bias-scarcity')) {
  customElements.define('bias-scarcity', BiasScarcity);
}

describe('bias-scarcity', () => {
  let el: BiasScarcity;

  async function create(props?: Partial<BiasScarcity>): Promise<BiasScarcity> {
    el = document.createElement('bias-scarcity') as BiasScarcity;
    if (props) for (const [k, v] of Object.entries(props)) (el as any)[k] = v;
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => {
    el?.remove();
    vi.useRealTimers();
  });

  it('renders with shadow DOM', async () => {
    await create({ type: 'stock', remaining: 5 });
    expect(el.shadowRoot!.querySelector('.pill')).not.toBeNull();
  });

  it('exposes biasId = scarcity-bias', () => {
    expect(BiasScarcity.biasId).toBe('scarcity-bias');
  });

  it('stock type renders "Only N left"', async () => {
    await create({ type: 'stock', remaining: 7 });
    const pill = el.shadowRoot!.querySelector('.pill')!;
    expect(pill.textContent).toContain('Only 7 left');
  });

  it('critical stock (<3) sets data-critical attribute', async () => {
    await create({ type: 'stock', remaining: 2 });
    expect(el.hasAttribute('data-critical')).toBe(true);
  });

  it('threshold-warning stock sets data-warning attribute', async () => {
    await create({ type: 'stock', remaining: 5, threshold: 10 });
    expect(el.hasAttribute('data-warning')).toBe(true);
    expect(el.hasAttribute('data-critical')).toBe(false);
  });

  it('safe stock (>threshold) sets neither warning nor critical', async () => {
    await create({ type: 'stock', remaining: 20, threshold: 10 });
    expect(el.hasAttribute('data-critical')).toBe(false);
    expect(el.hasAttribute('data-warning')).toBe(false);
  });

  it('popularity type renders "Viewed N times today"', async () => {
    await create({ type: 'popularity', remaining: 23 });
    const pill = el.shadowRoot!.querySelector('.pill')!;
    expect(pill.textContent).toContain('Viewed 23 times today');
  });

  it('time type with future deadline renders countdown', async () => {
    const future = new Date(Date.now() + 2 * 3_600_000 + 15 * 60_000).toISOString();
    await create({ type: 'time', deadline: future });
    const pill = el.shadowRoot!.querySelector('.pill')!;
    expect(pill.textContent).toMatch(/Ends in \d+h/);
  });

  it('time type with past deadline renders "Ended"', async () => {
    const past = new Date(Date.now() - 60_000).toISOString();
    await create({ type: 'time', deadline: past });
    const pill = el.shadowRoot!.querySelector('.pill')!;
    expect(pill.textContent).toContain('Ended');
  });

  it('pill has role="status"', async () => {
    await create({ type: 'stock', remaining: 5 });
    const pill = el.shadowRoot!.querySelector('.pill')!;
    expect(pill.getAttribute('role')).toBe('status');
  });

  it('time type sets aria-live=polite for live countdowns', async () => {
    const future = new Date(Date.now() + 3_600_000).toISOString();
    await create({ type: 'time', deadline: future });
    const pill = el.shadowRoot!.querySelector('.pill')!;
    expect(pill.getAttribute('aria-live')).toBe('polite');
  });

  it('pulse attribute reflects and renders a pulse dot', async () => {
    await create({ type: 'stock', remaining: 2, pulse: true });
    expect(el.hasAttribute('pulse')).toBe(true);
    expect(el.shadowRoot!.querySelector('.dot')).not.toBeNull();
  });

  it('clears interval timer on disconnect', async () => {
    await create({ type: 'stock', remaining: 5 });
    const timerBefore = (el as any)._timer;
    expect(timerBefore).not.toBe(0);
    el.remove();
    expect((el as any)._timer).toBe(0);
  });
});
