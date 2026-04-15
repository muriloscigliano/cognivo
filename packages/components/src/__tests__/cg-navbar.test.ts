import { describe, it, expect, afterEach } from 'vitest';
import { CgNavbar } from '../components/cg-navbar/cg-navbar.js';

if (!customElements.get('cg-navbar')) {
  customElements.define('cg-navbar', CgNavbar);
}

describe('cg-navbar', () => {
  let el: CgNavbar;

  async function create(props?: Partial<CgNavbar>): Promise<CgNavbar> {
    el = document.createElement('cg-navbar') as CgNavbar;
    if (props) for (const [k, v] of Object.entries(props)) (el as any)[k] = v;
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => el?.remove());

  it('renders with shadow DOM', async () => {
    await create();
    expect(el.shadowRoot).toBeDefined();
    expect(el.shadowRoot!.querySelector('nav')).not.toBeNull();
  });

  it('nav has role="navigation"', async () => {
    await create();
    const nav = el.shadowRoot!.querySelector('nav')!;
    expect(nav.getAttribute('role')).toBe('navigation');
  });

  it('sticky reflects to attribute', async () => {
    await create({ sticky: true });
    expect(el.hasAttribute('sticky')).toBe(true);
  });

  it('bordered reflects to attribute', async () => {
    await create({ bordered: true });
    expect(el.hasAttribute('bordered')).toBe(true);
  });

  it('elevated reflects to attribute', async () => {
    await create({ elevated: true });
    expect(el.hasAttribute('elevated')).toBe(true);
  });

  it('variant reflects to attribute', async () => {
    await create({ variant: 'glass' });
    expect(el.getAttribute('variant')).toBe('glass');
  });

  it('navStyle reflects to nav-style attribute', async () => {
    await create({ navStyle: 'underline' });
    expect(el.getAttribute('nav-style')).toBe('underline');
  });

  it('mobileOpen reflects to mobile-open attribute', async () => {
    await create({ mobileOpen: true });
    expect(el.hasAttribute('mobile-open')).toBe(true);
  });

  it('menu button toggle dispatches cg-navbar-toggle', async () => {
    await create();
    let detail: any = null;
    el.addEventListener('cg-navbar-toggle', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);
    const btn = el.shadowRoot!.querySelector<HTMLButtonElement>('.menu-btn')!;
    btn.click();
    await el.updateComplete;
    expect(detail.open).toBe(true);
    expect(el.mobileOpen).toBe(true);
  });

  it('renders brand slot', async () => {
    await create();
    expect(el.shadowRoot!.querySelector('slot[name="brand"]')).not.toBeNull();
  });

  it('renders start, center, end slots', async () => {
    await create();
    expect(el.shadowRoot!.querySelector('slot[name="start"]')).not.toBeNull();
    expect(el.shadowRoot!.querySelector('slot[name="center"]')).not.toBeNull();
    expect(el.shadowRoot!.querySelector('slot[name="end"]')).not.toBeNull();
  });
});
