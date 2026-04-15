import { describe, it, expect, afterEach } from 'vitest';
import { CgContextMenu } from '../components/cg-context-menu/cg-context-menu.js';

if (!customElements.get('cg-context-menu')) {
  customElements.define('cg-context-menu', CgContextMenu);
}

describe('cg-context-menu', () => {
  let el: CgContextMenu;

  async function create(props?: Partial<CgContextMenu>): Promise<CgContextMenu> {
    el = document.createElement('cg-context-menu') as CgContextMenu;
    if (props) for (const [k, v] of Object.entries(props)) (el as any)[k] = v;
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => el?.remove());

  it('renders with shadow DOM', async () => {
    await create();
    expect(el.shadowRoot).toBeDefined();
    expect(el.shadowRoot!.querySelector('.menu')).not.toBeNull();
  });

  it('is closed by default', async () => {
    await create();
    expect(el.open).toBe(false);
  });

  it('menu has role="menu"', async () => {
    await create();
    const menu = el.shadowRoot!.querySelector('.menu')!;
    expect(menu.getAttribute('role')).toBe('menu');
  });

  it('renders items', async () => {
    await create({
      items: [
        { id: 'a', label: 'Copy' },
        { id: 'b', label: 'Delete', danger: true },
      ],
    });
    const items = el.shadowRoot!.querySelectorAll('.item');
    expect(items.length).toBe(2);
  });

  it('renders separators as role="separator"', async () => {
    await create({
      items: [
        { id: 'a', label: 'Copy' },
        { id: 'sep', label: '', separator: true },
        { id: 'b', label: 'Paste' },
      ],
    });
    const sep = el.shadowRoot!.querySelector('[role="separator"]');
    expect(sep).not.toBeNull();
  });

  it('dispatches cg-context-menu-open on contextmenu event', async () => {
    await create({ items: [{ id: 'a', label: 'Copy' }] });
    let fired = false;
    el.addEventListener('cg-context-menu-open', () => { fired = true; });
    el.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, clientX: 10, clientY: 10, cancelable: true }));
    await el.updateComplete;
    expect(fired).toBe(true);
    expect(el.open).toBe(true);
  });

  it('dispatches cg-context-menu-select and closes on item click', async () => {
    await create({ items: [{ id: 'cut', label: 'Cut' }] });
    el.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, clientX: 10, clientY: 10, cancelable: true }));
    await el.updateComplete;
    let closed = false;
    el.addEventListener('cg-context-menu-close', () => { closed = true; });
    const btn = el.shadowRoot!.querySelector<HTMLButtonElement>('.item')!;
    btn.click();
    await el.updateComplete;
    expect(closed).toBe(true);
  });

  it('clicking item dispatches cg-context-menu-select with id', async () => {
    await create({
      open: true,
      items: [{ id: 'copy', label: 'Copy' }],
    });
    let detail: any = null;
    el.addEventListener('cg-context-menu-select', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);
    const btn = el.shadowRoot!.querySelector<HTMLButtonElement>('.item')!;
    btn.click();
    await el.updateComplete;
    expect(detail).not.toBeNull();
    expect(detail.id).toBe('copy');
  });

  it('disabled prop reflects to attribute', async () => {
    await create({ disabled: true });
    expect(el.hasAttribute('disabled')).toBe(true);
  });

  it('applies danger class on danger items', async () => {
    await create({
      items: [{ id: 'd', label: 'Delete', danger: true }],
    });
    const btn = el.shadowRoot!.querySelector('.item')!;
    expect(btn.classList.contains('danger')).toBe(true);
  });
});
