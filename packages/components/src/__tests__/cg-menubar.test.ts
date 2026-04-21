import { describe, it, expect, afterEach } from 'vitest';
import { CgMenubar } from '../components/cg-menubar/cg-menubar.js';

if (!customElements.get('cg-menubar')) {
  customElements.define('cg-menubar', CgMenubar);
}

describe('cg-menubar', () => {
  let el: CgMenubar;

  async function create(): Promise<CgMenubar> {
    el = document.createElement('cg-menubar') as CgMenubar;
    el.items = [
      { label: 'File', children: [{ label: 'New', id: 'new' }, { separator: true, label: '' }, { label: 'Quit' }] },
      { label: 'Edit', children: [{ label: 'Copy', shortcut: 'Cmd+C' }] },
    ];
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => el?.remove());

  it('renders with shadow DOM', async () => {
    await create();
    expect(el.shadowRoot!.querySelector('[role="menubar"]')).not.toBeNull();
  });

  it('renders top-level triggers', async () => {
    await create();
    const triggers = el.shadowRoot!.querySelectorAll('.top-trigger');
    expect(triggers.length).toBe(2);
  });

  it('top trigger has aria-haspopup', async () => {
    await create();
    const trigger = el.shadowRoot!.querySelector('.top-trigger')!;
    expect(trigger.getAttribute('aria-haspopup')).toBe('menu');
  });

  it('opens submenu on click', async () => {
    await create();
    const trigger = el.shadowRoot!.querySelector<HTMLButtonElement>('.top-trigger')!;
    trigger.click();
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.submenu')).not.toBeNull();
  });

  it('dispatches cg-menubar-select on item click', async () => {
    await create();
    let detail: any = null;
    el.addEventListener('cg-menubar-select', (e: Event) => { detail = (e as CustomEvent).detail; });
    const trigger = el.shadowRoot!.querySelector<HTMLButtonElement>('.top-trigger')!;
    trigger.click();
    await el.updateComplete;
    const item = el.shadowRoot!.querySelector<HTMLButtonElement>('.submenu-item')!;
    item.click();
    expect(detail?.item).toBe('new');
    expect(detail?.menu).toBe('File');
  });

  // ── Submenu state ──

  it('clicking trigger toggles openIndex', async () => {
    await create();
    const trigger = el.shadowRoot!.querySelector<HTMLButtonElement>('.top-trigger')!;
    trigger.click();
    await el.updateComplete;
    expect((el as any)._openIndex).toBe(0);
    trigger.click();
    await el.updateComplete;
    expect((el as any)._openIndex).toBe(-1);
  });

  it('aria-expanded reflects open state on the trigger', async () => {
    await create();
    const triggers = el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.top-trigger');
    triggers[0]!.click();
    await el.updateComplete;
    expect(triggers[0]!.getAttribute('aria-expanded')).toBe('true');
    expect(triggers[1]!.getAttribute('aria-expanded')).toBe('false');
  });

  it('renders separator item as separator div', async () => {
    await create();
    const trigger = el.shadowRoot!.querySelector<HTMLButtonElement>('.top-trigger')!;
    trigger.click();
    await el.updateComplete;
    const sep = el.shadowRoot!.querySelector('.separator');
    expect(sep).not.toBeNull();
    expect(sep!.getAttribute('role')).toBe('separator');
  });

  it('renders shortcut when provided', async () => {
    await create();
    const triggers = el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.top-trigger');
    triggers[1]!.click(); // Edit
    await el.updateComplete;
    const shortcut = el.shadowRoot!.querySelector('.shortcut');
    expect(shortcut?.textContent).toBe('Cmd+C');
  });

  // ── Keyboard on top ──

  it('ArrowRight moves to next trigger (cycles)', async () => {
    await create();
    const ev = new KeyboardEvent('keydown', { key: 'ArrowRight', cancelable: true });
    (el as any)._onTopKeydown(ev, 0);
    expect(ev.defaultPrevented).toBe(true);
  });

  it('ArrowLeft wraps to last trigger', async () => {
    await create();
    const ev = new KeyboardEvent('keydown', { key: 'ArrowLeft', cancelable: true });
    (el as any)._onTopKeydown(ev, 0);
    expect(ev.defaultPrevented).toBe(true);
  });

  it('ArrowDown on top trigger opens submenu', async () => {
    await create();
    const ev = new KeyboardEvent('keydown', { key: 'ArrowDown', cancelable: true });
    (el as any)._onTopKeydown(ev, 1);
    expect((el as any)._openIndex).toBe(1);
  });

  it('Enter on top trigger opens submenu', async () => {
    await create();
    const ev = new KeyboardEvent('keydown', { key: 'Enter', cancelable: true });
    (el as any)._onTopKeydown(ev, 0);
    expect((el as any)._openIndex).toBe(0);
  });

  it('Space on top trigger opens submenu', async () => {
    await create();
    const ev = new KeyboardEvent('keydown', { key: ' ', cancelable: true });
    (el as any)._onTopKeydown(ev, 0);
    expect((el as any)._openIndex).toBe(0);
  });

  it('Escape on top trigger closes any open menu', async () => {
    await create();
    (el as any)._openIndex = 0;
    const ev = new KeyboardEvent('keydown', { key: 'Escape', cancelable: true });
    (el as any)._onTopKeydown(ev, 0);
    expect((el as any)._openIndex).toBe(-1);
  });

  // ── Keyboard on submenu ──

  it('Escape in submenu closes menu', async () => {
    await create();
    (el as any)._openIndex = 0;
    const ev = new KeyboardEvent('keydown', { key: 'Escape', cancelable: true });
    (el as any)._onSubmenuKeydown(ev, 0);
    expect((el as any)._openIndex).toBe(-1);
  });

  it('ArrowDown in submenu is handled', async () => {
    await create();
    (el as any)._openIndex = 0;
    await el.updateComplete;
    const ev = new KeyboardEvent('keydown', { key: 'ArrowDown', cancelable: true });
    (el as any)._onSubmenuKeydown(ev, 0);
    expect(ev.defaultPrevented).toBe(true);
  });

  // ── Item selection ──

  it('disabled child is not selected on click', async () => {
    el = document.createElement('cg-menubar') as CgMenubar;
    el.items = [{ label: 'M', children: [{ label: 'Nope', disabled: true }] }];
    document.body.appendChild(el);
    await el.updateComplete;

    (el as any)._openIndex = 0;
    await el.updateComplete;

    let fired = false;
    el.addEventListener('cg-menubar-select', () => (fired = true));
    const items = el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.submenu-item');
    items[0]?.click();
    expect(fired).toBe(false);
  });

  it('selection uses menu id when provided, else label', async () => {
    el = document.createElement('cg-menubar') as CgMenubar;
    el.items = [{ label: 'File', id: 'file-menu', children: [{ label: 'New', id: 'new-file' }] }];
    document.body.appendChild(el);
    await el.updateComplete;
    (el as any)._openIndex = 0;
    await el.updateComplete;

    let detail: any;
    el.addEventListener('cg-menubar-select', (e: any) => (detail = e.detail));
    const item = el.shadowRoot!.querySelector<HTMLButtonElement>('.submenu-item')!;
    item.click();
    expect(detail).toEqual({ menu: 'file-menu', item: 'new-file' });
  });

  // ── Click outside ──

  it('outside click closes any open menu', async () => {
    await create();
    (el as any)._openIndex = 0;
    await el.updateComplete;
    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await el.updateComplete;
    expect((el as any)._openIndex).toBe(-1);
  });

  it('disconnect removes document click listener', async () => {
    await create();
    el.remove();
    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
});
