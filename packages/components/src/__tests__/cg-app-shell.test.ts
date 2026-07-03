import { describe, it, expect, afterEach, vi } from 'vitest';
import { CgAppShell } from '../components/cg-app-shell/cg-app-shell.js';

if (!customElements.get('cg-app-shell')) {
  customElements.define('cg-app-shell', CgAppShell);
}

describe('cg-app-shell', () => {
  let el: CgAppShell;

  async function create(props?: Partial<CgAppShell>): Promise<CgAppShell> {
    el = document.createElement('cg-app-shell') as CgAppShell;
    if (props) for (const [k, v] of Object.entries(props)) (el as any)[k] = v;
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => el?.remove());

  it('renders header, aside, main, footer landmarks', async () => {
    await create();
    const sr = el.shadowRoot!;
    expect(sr.querySelector('header')).not.toBeNull();
    expect(sr.querySelector('aside')).not.toBeNull();
    expect(sr.querySelector('main')).not.toBeNull();
    expect(sr.querySelector('footer')).not.toBeNull();
  });

  it('reflects sidebar-position', async () => {
    await create({ sidebarPosition: 'end' });
    expect(el.getAttribute('sidebar-position')).toBe('end');
  });

  it('sets sidebar-width custom property', async () => {
    await create({ sidebarWidth: '320px' });
    expect(el.style.getPropertyValue('--_cg-shell-sidebar-w')).toBe('320px');
  });

  it('sets header-height custom property', async () => {
    await create({ headerHeight: '64px' });
    expect(el.style.getPropertyValue('--_cg-shell-header-h')).toBe('64px');
  });

  it('aside is aria-hidden when collapsed', async () => {
    await create({ sidebarCollapsed: true });
    expect(el.shadowRoot!.querySelector('aside')!.getAttribute('aria-hidden')).toBe('true');
  });

  it('toggleSidebar flips state and fires event', async () => {
    await create();
    const spy = vi.fn();
    el.addEventListener('cg-app-shell-toggle', spy);
    el.toggleSidebar();
    await el.updateComplete;
    expect(el.sidebarCollapsed).toBe(true);
    expect(spy).toHaveBeenCalledOnce();
    expect((spy.mock.calls[0][0] as CustomEvent).detail.collapsed).toBe(true);
  });

  it('sticky-header defaults to true and reflects', async () => {
    await create();
    expect(el.hasAttribute('sticky-header')).toBe(true);
  });
});
