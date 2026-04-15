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
});
