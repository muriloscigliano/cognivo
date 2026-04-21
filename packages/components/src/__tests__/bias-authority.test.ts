import { describe, it, expect, afterEach } from 'vitest';
import { BiasAuthority } from '../components/bias-authority/bias-authority.js';

if (!customElements.get('bias-authority')) {
  customElements.define('bias-authority', BiasAuthority);
}

describe('bias-authority', () => {
  let el: BiasAuthority;

  async function create(props?: Partial<BiasAuthority>): Promise<BiasAuthority> {
    el = document.createElement('bias-authority') as BiasAuthority;
    if (props) for (const [k, v] of Object.entries(props)) (el as any)[k] = v;
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => el?.remove());

  it('renders with shadow DOM', async () => {
    await create({ source: 'Wirecutter' });
    expect(el.shadowRoot!.querySelector('.badge')).not.toBeNull();
  });

  it('exposes biasId = authority-bias', () => {
    expect(BiasAuthority.biasId).toBe('authority-bias');
  });

  it('renders source name', async () => {
    await create({ source: 'Wirecutter' });
    expect(el.shadowRoot!.querySelector('.source')!.textContent).toBe('Wirecutter');
  });

  it('default kind is verified', async () => {
    await create({ source: 'X' });
    expect(el.getAttribute('kind')).toBe('verified');
  });

  it('reflects kind="certified"', async () => {
    await create({ source: 'ISO 27001', kind: 'certified' });
    expect(el.getAttribute('kind')).toBe('certified');
  });

  it('reflects kind="featured"', async () => {
    await create({ source: 'TechCrunch', kind: 'featured' });
    expect(el.getAttribute('kind')).toBe('featured');
  });

  it('renders as an anchor when href is set', async () => {
    await create({ source: 'X', href: 'https://example.com' });
    const anchor = el.shadowRoot!.querySelector('a.badge') as HTMLAnchorElement | null;
    expect(anchor).not.toBeNull();
    expect(anchor!.getAttribute('href')).toBe('https://example.com');
  });

  it('renders as a span when no href is set', async () => {
    await create({ source: 'X' });
    expect(el.shadowRoot!.querySelector('a.badge')).toBeNull();
    expect(el.shadowRoot!.querySelector('span.badge')).not.toBeNull();
  });

  it('badge has role="note" and kind-based aria-label', async () => {
    await create({ source: 'Wirecutter', kind: 'endorsed' });
    const badge = el.shadowRoot!.querySelector('.badge')!;
    expect(badge.getAttribute('role')).toBe('note');
    expect(badge.getAttribute('aria-label')).toBe('endorsed by Wirecutter');
  });

  it('renders an svg icon', async () => {
    await create({ source: 'X', kind: 'verified' });
    expect(el.shadowRoot!.querySelector('.icon')).not.toBeNull();
  });

  it('tooltip slot container exists', async () => {
    await create({ source: 'X' });
    expect(el.shadowRoot!.querySelector('.tip')).not.toBeNull();
  });
});
