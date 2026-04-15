import { describe, it, expect, afterEach } from 'vitest';
import { CgAlertDialog } from '../components/cg-alert-dialog/cg-alert-dialog.js';

if (!customElements.get('cg-alert-dialog')) {
  customElements.define('cg-alert-dialog', CgAlertDialog);
}

describe('cg-alert-dialog', () => {
  let el: CgAlertDialog;

  async function create(props?: Partial<CgAlertDialog>): Promise<CgAlertDialog> {
    el = document.createElement('cg-alert-dialog') as CgAlertDialog;
    if (props) for (const [k, v] of Object.entries(props)) (el as any)[k] = v;
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => el?.remove());

  it('renders with shadow DOM', async () => {
    await create();
    expect(el.shadowRoot).toBeDefined();
    expect(el.shadowRoot!.querySelector('.dialog')).not.toBeNull();
  });

  it('is closed by default', async () => {
    await create();
    expect(el.open).toBe(false);
  });

  it('dialog has role="alertdialog"', async () => {
    await create();
    const d = el.shadowRoot!.querySelector('.dialog')!;
    expect(d.getAttribute('role')).toBe('alertdialog');
  });

  it('renders title', async () => {
    await create({ open: true, title: 'Delete?' });
    const t = el.shadowRoot!.querySelector('.title')!;
    expect(t.textContent).toBe('Delete?');
  });

  it('renders description', async () => {
    await create({ open: true, title: 'x', description: 'This cannot be undone.' });
    const d = el.shadowRoot!.querySelector('.description')!;
    expect(d.textContent).toBe('This cannot be undone.');
  });

  it('destructive reflects to attribute', async () => {
    await create({ destructive: true });
    expect(el.hasAttribute('destructive')).toBe(true);
  });

  it('open reflects to attribute', async () => {
    await create({ open: true });
    expect(el.hasAttribute('open')).toBe(true);
  });

  it('dispatches cg-alert-open when opened', async () => {
    await create();
    let fired = false;
    el.addEventListener('cg-alert-open', () => { fired = true; });
    el.open = true;
    await el.updateComplete;
    expect(fired).toBe(true);
  });

  it('dispatches cg-alert-close when closed', async () => {
    await create({ open: true });
    let fired = false;
    el.addEventListener('cg-alert-close', () => { fired = true; });
    el.open = false;
    await el.updateComplete;
    expect(fired).toBe(true);
  });

  it('has aria-modal="true"', async () => {
    await create();
    const d = el.shadowRoot!.querySelector('.dialog')!;
    expect(d.getAttribute('aria-modal')).toBe('true');
  });

  it('default confirmLabel is "Confirm"', async () => {
    await create();
    expect(el.confirmLabel).toBe('Confirm');
  });

  it('default cancelLabel is "Cancel"', async () => {
    await create();
    expect(el.cancelLabel).toBe('Cancel');
  });
});
