import { describe, it, expect, afterEach } from 'vitest';
import { CgSidebar } from '../components/cg-sidebar/cg-sidebar.js';

if (!customElements.get('cg-sidebar')) {
  customElements.define('cg-sidebar', CgSidebar);
}

describe('cg-sidebar', () => {
  let el: CgSidebar;

  async function create(props?: Partial<CgSidebar>): Promise<CgSidebar> {
    el = document.createElement('cg-sidebar') as CgSidebar;
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

  it('nav has role="navigation" and aria-label', async () => {
    await create();
    const nav = el.shadowRoot!.querySelector('nav')!;
    expect(nav.getAttribute('role')).toBe('navigation');
    expect(nav.getAttribute('aria-label')).toBe('Primary navigation');
  });

  it('default side is left', async () => {
    await create();
    expect(el.side).toBe('left');
    expect(el.getAttribute('side')).toBe('left');
  });

  it('collapsed attribute reflects', async () => {
    await create({ collapsed: true });
    expect(el.hasAttribute('collapsed')).toBe(true);
  });

  it('shows toggle button when collapsible', async () => {
    await create({ collapsible: true });
    expect(el.shadowRoot!.querySelector('.toggle')).not.toBeNull();
  });

  it('no toggle button when not collapsible', async () => {
    await create();
    expect(el.shadowRoot!.querySelector('.toggle')).toBeNull();
  });

  it('toggle button dispatches cg-sidebar-toggle with detail', async () => {
    await create({ collapsible: true });
    let captured: any = null;
    el.addEventListener('cg-sidebar-toggle', (e) => {
      captured = (e as CustomEvent).detail;
    });
    (el.shadowRoot!.querySelector('.toggle') as HTMLButtonElement).click();
    expect(captured).toEqual({ collapsed: true });
    expect(el.collapsed).toBe(true);
  });

  it('toggle button updates aria-expanded', async () => {
    await create({ collapsible: true });
    const btn = el.shadowRoot!.querySelector('.toggle') as HTMLButtonElement;
    expect(btn.getAttribute('aria-expanded')).toBe('true');
    el.collapsed = true;
    await el.updateComplete;
    expect(btn.getAttribute('aria-expanded')).toBe('false');
  });

  it('has header, default, and footer slots', async () => {
    await create();
    expect(el.shadowRoot!.querySelector('slot[name="header"]')).not.toBeNull();
    expect(el.shadowRoot!.querySelector('slot:not([name])')).not.toBeNull();
    expect(el.shadowRoot!.querySelector('slot[name="footer"]')).not.toBeNull();
  });

  it('sticky reflects', async () => {
    await create({ sticky: true });
    expect(el.hasAttribute('sticky')).toBe(true);
  });
});
