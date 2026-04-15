import { describe, it, expect, afterEach } from 'vitest';
import { CgPopover } from '../components/cg-popover/cg-popover.js';

if (!customElements.get('cg-popover')) {
  customElements.define('cg-popover', CgPopover);
}

describe('cg-popover', () => {
  let el: CgPopover;

  async function create(props?: Partial<CgPopover>): Promise<CgPopover> {
    el = document.createElement('cg-popover') as CgPopover;
    if (props) for (const [k, v] of Object.entries(props)) (el as any)[k] = v;
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => el?.remove());

  it('renders with shadow DOM', async () => {
    await create();
    expect(el.shadowRoot).toBeDefined();
    expect(el.shadowRoot!.querySelector('.popover')).not.toBeNull();
  });

  it('is closed by default', async () => {
    await create();
    expect(el.open).toBe(false);
  });

  it('reflects open attribute', async () => {
    await create({ open: true });
    expect(el.hasAttribute('open')).toBe(true);
  });

  it('default placement is bottom', async () => {
    await create();
    expect(el.placement).toBe('bottom');
  });

  it('dispatches cg-popover-open on open', async () => {
    await create();
    let fired = false;
    el.addEventListener('cg-popover-open', () => { fired = true; });
    el.open = true;
    await el.updateComplete;
    expect(fired).toBe(true);
  });

  it('dispatches cg-popover-close on close', async () => {
    await create({ open: true });
    let fired = false;
    el.addEventListener('cg-popover-close', () => { fired = true; });
    el.open = false;
    await el.updateComplete;
    expect(fired).toBe(true);
  });

  it('popover has role="dialog"', async () => {
    await create();
    const popover = el.shadowRoot!.querySelector('.popover')!;
    expect(popover.getAttribute('role')).toBe('dialog');
  });

  it('renders content slot', async () => {
    await create();
    const contentSlot = el.shadowRoot!.querySelector('slot[name="content"]');
    expect(contentSlot).not.toBeNull();
  });
});
