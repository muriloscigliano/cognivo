import { describe, it, expect, afterEach } from 'vitest';
import { BiasSocialProof } from '../components/bias-social-proof/bias-social-proof.js';

if (!customElements.get('bias-social-proof')) {
  customElements.define('bias-social-proof', BiasSocialProof);
}

describe('bias-social-proof', () => {
  let el: BiasSocialProof;

  async function create(props?: Partial<BiasSocialProof>): Promise<BiasSocialProof> {
    el = document.createElement('bias-social-proof') as BiasSocialProof;
    if (props) for (const [k, v] of Object.entries(props)) (el as any)[k] = v;
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => el?.remove());

  it('renders with shadow DOM', async () => {
    await create({ count: 3, type: 'viewing' });
    expect(el.shadowRoot!.querySelector('.strip')).not.toBeNull();
  });

  it('exposes biasId = social-proof', () => {
    expect(BiasSocialProof.biasId).toBe('social-proof');
  });

  it('renders count value', async () => {
    await create({ count: 23, type: 'viewing' });
    const strip = el.shadowRoot!.querySelector('.strip')!;
    expect(strip.textContent).toContain('23');
  });

  it('compact format shows "count type"', async () => {
    await create({ count: 1284, type: 'purchased', format: 'compact' });
    const strip = el.shadowRoot!.querySelector('.strip')!;
    expect(strip.textContent).toContain('1.3K');
    expect(strip.textContent).toContain('purchased');
  });

  it('full format shows verbose label', async () => {
    await create({ count: 5, type: 'viewing', format: 'full' });
    const strip = el.shadowRoot!.querySelector('.strip')!;
    expect(strip.textContent).toContain('people');
    expect(strip.textContent).toContain('viewing');
  });

  it('formats 1M+ numbers compactly', async () => {
    await create({ count: 2_500_000, type: 'subscribed', format: 'compact' });
    const strip = el.shadowRoot!.querySelector('.strip')!;
    expect(strip.textContent).toContain('2.5M');
  });

  it('strip has role="status" with aria-label', async () => {
    await create({ count: 23, type: 'viewing' });
    const strip = el.shadowRoot!.querySelector('.strip')!;
    expect(strip.getAttribute('role')).toBe('status');
    const label = strip.getAttribute('aria-label') || '';
    expect(label).toContain('23');
    expect(label).toContain('viewing');
  });

  it('renders avatars when avatars prop is provided', async () => {
    await create({ count: 3, type: 'viewing', avatars: ['/a.png', '/b.png', '/c.png'] });
    const avatars = el.shadowRoot!.querySelectorAll('.avatar');
    expect(avatars.length).toBe(3);
  });

  it('caps avatars at 3 even if more are passed', async () => {
    await create({ count: 10, type: 'viewing', avatars: ['/a.png', '/b.png', '/c.png', '/d.png', '/e.png'] });
    const avatars = el.shadowRoot!.querySelectorAll('.avatar');
    expect(avatars.length).toBe(3);
  });

  it('interval="today" adds today suffix', async () => {
    await create({ count: 10, type: 'purchased', interval: 'today' });
    const label = el.shadowRoot!.querySelector('.strip')!.getAttribute('aria-label') || '';
    expect(label).toContain('today');
  });
});
