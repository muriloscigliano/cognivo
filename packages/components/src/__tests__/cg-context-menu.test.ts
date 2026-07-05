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
    const items = el.shadowRoot!.querySelectorAll('.menu-item');
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
    const btn = el.shadowRoot!.querySelector<HTMLButtonElement>('.menu-item')!;
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
    const btn = el.shadowRoot!.querySelector<HTMLButtonElement>('.menu-item')!;
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
    const btn = el.shadowRoot!.querySelector('.menu-item')!;
    expect(btn.classList.contains('danger')).toBe(true);
  });

  // ── Focus model (W3C APG menu pattern) ──────────────────────────────

  /** Flush Lit render + the updateComplete.then() focus microtask chain. */
  async function flush(): Promise<void> {
    await el.updateComplete;
    await new Promise(r => setTimeout(r, 0));
    await el.updateComplete;
  }

  function openViaContextmenu(): void {
    el.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, clientX: 10, clientY: 10, cancelable: true }));
  }

  function pressKey(key: string): void {
    document.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
  }

  it('menu has an aria-label (default "Context menu")', async () => {
    await create();
    const menu = el.shadowRoot!.querySelector('.menu')!;
    expect(menu.getAttribute('aria-label')).toBe('Context menu');
  });

  it('label property customizes the menu aria-label', async () => {
    await create({ label: 'File actions' });
    const menu = el.shadowRoot!.querySelector('.menu')!;
    expect(menu.getAttribute('aria-label')).toBe('File actions');
  });

  it('closed menu is inert (out of tab order and a11y tree)', async () => {
    await create({ items: [{ id: 'a', label: 'Copy' }] });
    const menu = el.shadowRoot!.querySelector('.menu')!;
    expect(menu.hasAttribute('inert')).toBe(true);
  });

  it('open menu is not inert', async () => {
    await create({ items: [{ id: 'a', label: 'Copy' }] });
    openViaContextmenu();
    await flush();
    expect(el.shadowRoot!.querySelector('.menu')!.hasAttribute('inert')).toBe(false);
  });

  it('focus lands on the first item when opened via contextmenu', async () => {
    await create({ items: [{ id: 'a', label: 'Copy' }, { id: 'b', label: 'Paste' }] });
    openViaContextmenu();
    await flush();
    const first = el.shadowRoot!.querySelector<HTMLButtonElement>('.menu-item')!;
    expect(el.shadowRoot!.activeElement).toBe(first);
  });

  it('arrow navigation moves focus and wraps', async () => {
    await create({
      items: [
        { id: 'a', label: 'Copy' },
        { id: 'b', label: 'Paste' },
      ],
    });
    openViaContextmenu();
    await flush();
    const items = el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.menu-item');

    pressKey('ArrowDown');
    await flush();
    expect(el.shadowRoot!.activeElement).toBe(items[1]);

    pressKey('ArrowDown'); // wraps back to first
    await flush();
    expect(el.shadowRoot!.activeElement).toBe(items[0]);

    pressKey('ArrowUp'); // wraps to last
    await flush();
    expect(el.shadowRoot!.activeElement).toBe(items[1]);

    pressKey('End');
    await flush();
    expect(el.shadowRoot!.activeElement).toBe(items[1]);

    pressKey('Home');
    await flush();
    expect(el.shadowRoot!.activeElement).toBe(items[0]);
  });

  it('disabled items are skipped by roving focus', async () => {
    await create({
      items: [
        { id: 'a', label: 'Locked', disabled: true },
        { id: 'b', label: 'Copy' },
        { id: 'c', label: 'Paste' },
      ],
    });
    openViaContextmenu();
    await flush();
    // First *selectable* item is "Copy", not the disabled "Locked".
    const active = el.shadowRoot!.activeElement as HTMLElement;
    expect(active.textContent).toContain('Copy');

    pressKey('ArrowDown');
    await flush();
    expect((el.shadowRoot!.activeElement as HTMLElement).textContent).toContain('Paste');

    pressKey('ArrowDown'); // wraps — back to Copy, never Locked
    await flush();
    expect((el.shadowRoot!.activeElement as HTMLElement).textContent).toContain('Copy');
  });

  it('Escape closes and returns focus to the previously focused element', async () => {
    const button = document.createElement('button');
    document.body.appendChild(button);
    button.focus();
    try {
      await create({ items: [{ id: 'a', label: 'Copy' }] });
      openViaContextmenu();
      await flush();
      expect(el.open).toBe(true);

      pressKey('Escape');
      await flush();
      expect(el.open).toBe(false);
      expect(document.activeElement).toBe(button);
    } finally {
      button.remove();
    }
  });

  it('Tab closes the menu without trapping focus', async () => {
    await create({ items: [{ id: 'a', label: 'Copy' }] });
    openViaContextmenu();
    await flush();
    pressKey('Tab');
    await flush();
    expect(el.open).toBe(false);
  });

  it('typeahead jumps focus to the item starting with the typed character', async () => {
    await create({
      items: [
        { id: 'a', label: 'Copy' },
        { id: 'b', label: 'Paste' },
        { id: 'c', label: 'Delete' },
      ],
    });
    openViaContextmenu();
    await flush();
    pressKey('d');
    await flush();
    expect((el.shadowRoot!.activeElement as HTMLElement).textContent).toContain('Delete');
  });

  it('renders a muted "No actions" row when items is empty', async () => {
    await create({ items: [] });
    const empty = el.shadowRoot!.querySelector('.menu-empty')!;
    expect(empty).not.toBeNull();
    expect(empty.getAttribute('role')).toBe('presentation');
    expect(empty.textContent).toContain('No actions');
  });

  it('plays an exit animation (closing class) then clears it', async () => {
    await create({ items: [{ id: 'a', label: 'Copy' }] });
    openViaContextmenu();
    await flush();
    pressKey('Escape');
    await flush(); // _closing is set in updated(), one render after open flips
    const menu = el.shadowRoot!.querySelector('.menu')!;
    expect(menu.classList.contains('closing')).toBe(true);
    // Timeout fallback (300ms) clears the closing state even without animationend.
    await new Promise(r => setTimeout(r, 350));
    expect(menu.classList.contains('closing')).toBe(false);
  });
});
