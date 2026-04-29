import { describe, it, expect, afterEach } from 'vitest';
import { CgNavbar, type NavItem } from '../components/cg-navbar/cg-navbar.js';

if (!customElements.get('cg-navbar')) {
  customElements.define('cg-navbar', CgNavbar);
}

const sampleItems: NavItem[] = [
  { value: 'docs', label: 'Docs', href: '/docs' },
  { value: 'components', label: 'Components', href: '/components' },
  { value: 'tokens', label: 'Tokens', href: '/tokens', badge: 'New' },
  { value: 'pricing', label: 'Pricing', href: '/pricing', disabled: true },
];

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

  it('nav has role="navigation" with default aria-label', async () => {
    await create();
    const nav = el.shadowRoot!.querySelector('nav')!;
    expect(nav.getAttribute('role')).toBe('navigation');
    expect(nav.getAttribute('aria-label')).toBe('Main navigation');
  });

  it('sticky / bordered / compact-on-scroll / mobile-open reflect to attributes', async () => {
    await create({ sticky: true, bordered: true, compactOnScroll: true, mobileOpen: true });
    expect(el.hasAttribute('sticky')).toBe(true);
    expect(el.hasAttribute('bordered')).toBe(true);
    expect(el.hasAttribute('compact-on-scroll')).toBe(true);
    expect(el.hasAttribute('mobile-open')).toBe(true);
  });

  it('variant defaults to "solid" and reflects', async () => {
    await create();
    expect(el.variant).toBe('solid');
    await create({ variant: 'glass' });
    expect(el.getAttribute('variant')).toBe('glass');
    await create({ variant: 'floating' });
    expect(el.getAttribute('variant')).toBe('floating');
  });

  it('renders items as tablist with sliding indicator', async () => {
    await create({ items: sampleItems, active: 'docs' });
    const list = el.shadowRoot!.querySelector('.items')!;
    expect(list.getAttribute('role')).toBe('tablist');
    expect(list.querySelectorAll('.item').length).toBe(4);
    expect(list.querySelector('.indicator')).not.toBeNull();
  });

  it('marks the active item with aria-selected and tabindex=0', async () => {
    await create({ items: sampleItems, active: 'components' });
    const items = el.shadowRoot!.querySelectorAll<HTMLAnchorElement>('.item');
    expect(items[0]!.getAttribute('aria-selected')).toBe('false');
    expect(items[1]!.getAttribute('aria-selected')).toBe('true');
    expect(items[1]!.getAttribute('tabindex')).toBe('0');
    expect(items[0]!.getAttribute('tabindex')).toBe('-1');
  });

  it('disabled items get aria-disabled', async () => {
    await create({ items: sampleItems, active: 'docs' });
    const items = el.shadowRoot!.querySelectorAll<HTMLAnchorElement>('.item');
    expect(items[3]!.getAttribute('aria-disabled')).toBe('true');
  });

  it('renders item badge when present', async () => {
    await create({ items: sampleItems, active: 'docs' });
    const items = el.shadowRoot!.querySelectorAll<HTMLAnchorElement>('.item');
    const badge = items[2]!.querySelector('.item-badge');
    expect(badge?.textContent).toBe('New');
  });

  it('clicking an item fires cg-navbar-select', async () => {
    await create({ items: sampleItems, active: 'docs' });
    let detail: { value: string; item: NavItem } | null = null;
    el.addEventListener('cg-navbar-select', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);
    const items = el.shadowRoot!.querySelectorAll<HTMLAnchorElement>('.item');
    items[1]!.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true, cancelable: true }));
    await el.updateComplete;
    expect(detail).toBeTruthy();
    expect(detail!.value).toBe('components');
    expect(el.active).toBe('components');
  });

  it('clicking a disabled item does NOT change active', async () => {
    await create({ items: sampleItems, active: 'docs' });
    const items = el.shadowRoot!.querySelectorAll<HTMLAnchorElement>('.item');
    items[3]!.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true, cancelable: true }));
    await el.updateComplete;
    expect(el.active).toBe('docs');
  });

  it('menu button toggle dispatches cg-navbar-toggle', async () => {
    await create();
    let detail: { open: boolean } | null = null;
    el.addEventListener('cg-navbar-toggle', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);
    const btn = el.shadowRoot!.querySelector<HTMLButtonElement>('.menu-btn')!;
    btn.click();
    await el.updateComplete;
    expect(detail!.open).toBe(true);
    expect(el.mobileOpen).toBe(true);
  });

  it('closeMobileMenu() closes the panel and fires the event', async () => {
    await create({ mobileOpen: true });
    let detail: { open: boolean } | null = null;
    el.addEventListener('cg-navbar-toggle', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);
    el.closeMobileMenu();
    await el.updateComplete;
    expect(el.mobileOpen).toBe(false);
    expect(detail!.open).toBe(false);
  });

  it('menu button has aria-controls linking to mobile panel id', async () => {
    await create();
    const btn = el.shadowRoot!.querySelector<HTMLButtonElement>('.menu-btn')!;
    const panel = el.shadowRoot!.querySelector('.mobile-panel')!;
    expect(btn.getAttribute('aria-controls')).toBe(panel.id);
    expect(panel.id).toBeTruthy();
  });

  it('renders brand / center / end slots', async () => {
    await create();
    expect(el.shadowRoot!.querySelector('slot[name="brand"]')).not.toBeNull();
    expect(el.shadowRoot!.querySelector('slot[name="center"]')).not.toBeNull();
    expect(el.shadowRoot!.querySelector('slot[name="end"]')).not.toBeNull();
  });

  it('brand becomes a link when brandHref is set', async () => {
    await create({ brandHref: '/' });
    const brand = el.shadowRoot!.querySelector('.brand')!;
    expect(brand.tagName).toBe('A');
    expect(brand.getAttribute('href')).toBe('/');
  });

  it('renders mobile items inside the mobile-panel when items present', async () => {
    await create({ items: sampleItems, active: 'docs' });
    const mobileItems = el.shadowRoot!.querySelectorAll('.mobile-item');
    expect(mobileItems.length).toBe(4);
  });
});
