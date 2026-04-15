import { describe, it, expect, afterEach } from 'vitest';
import { CgSheet } from '../components/cg-sheet/cg-sheet.js';

if (!customElements.get('cg-sheet')) {
  customElements.define('cg-sheet', CgSheet);
}

describe('cg-sheet', () => {
  let el: CgSheet;

  async function create(props?: Partial<CgSheet>): Promise<CgSheet> {
    el = document.createElement('cg-sheet') as CgSheet;
    if (props) for (const [k, v] of Object.entries(props)) (el as any)[k] = v;
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => el?.remove());

  it('renders with shadow DOM', async () => {
    await create();
    expect(el.shadowRoot!.querySelector('.panel')).not.toBeNull();
  });

  it('default side is bottom', async () => {
    await create();
    expect(el.side).toBe('bottom');
  });

  it('default dismissible is true', async () => {
    await create();
    expect(el.dismissible).toBe(true);
  });

  it('reflects open attribute', async () => {
    await create({ open: true });
    expect(el.hasAttribute('open')).toBe(true);
  });

  it('panel has role dialog', async () => {
    await create();
    const panel = el.shadowRoot!.querySelector('.panel')!;
    expect(panel.getAttribute('role')).toBe('dialog');
  });

  it('dispatches cg-sheet-open when opened', async () => {
    await create();
    let fired = false;
    el.addEventListener('cg-sheet-open', () => { fired = true; });
    el.open = true;
    await el.updateComplete;
    expect(fired).toBe(true);
  });

  it('dispatches cg-sheet-close when closed', async () => {
    await create({ open: true });
    let fired = false;
    el.addEventListener('cg-sheet-close', () => { fired = true; });
    el.open = false;
    await el.updateComplete;
    expect(fired).toBe(true);
  });

  it('renders drag handle for bottom sheet', async () => {
    await create();
    expect(el.shadowRoot!.querySelector('.handle')).not.toBeNull();
  });
});
