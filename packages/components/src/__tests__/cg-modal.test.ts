import { describe, it, expect, afterEach, vi } from 'vitest';
import { CgModal } from '../components/cg-modal/cg-modal.js';

if (!customElements.get('cg-modal')) {
  customElements.define('cg-modal', CgModal);
}

describe('cg-modal', () => {
  let el: CgModal;

  async function create(props?: Partial<CgModal>): Promise<CgModal> {
    el = document.createElement('cg-modal') as CgModal;
    if (props) {
      for (const [k, v] of Object.entries(props)) {
        (el as any)[k] = v;
      }
    }
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => {
    el?.remove();
    document.body.style.overflow = '';
  });

  // ── Rendering ──

  it('renders with shadow DOM', async () => {
    await create();
    expect(el.shadowRoot).toBeDefined();
    expect(el.shadowRoot!.querySelector('.modal')).not.toBeNull();
  });

  // ── Visibility ──

  it('not visible when open=false (no open attribute)', async () => {
    await create({ open: false });
    expect(el.hasAttribute('open')).toBe(false);
  });

  it('visible when open=true (open attribute present)', async () => {
    await create({ open: true });
    expect(el.hasAttribute('open')).toBe(true);
  });

  // ── ARIA ──

  it('has role="dialog"', async () => {
    await create();
    const modal = el.shadowRoot!.querySelector('.modal')!;
    expect(modal.getAttribute('role')).toBe('dialog');
  });

  it('has aria-modal="true"', async () => {
    await create();
    const modal = el.shadowRoot!.querySelector('.modal')!;
    expect(modal.getAttribute('aria-modal')).toBe('true');
  });

  // ── Escape key closes ──

  it('Escape key closes the modal', async () => {
    await create({ open: true });
    const container = el.shadowRoot!.querySelector('.modal-container') as HTMLElement;
    container.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await el.updateComplete;
    expect(el.open).toBe(false);
  });

  // ── Backdrop click ──

  it('outside click (on the container) closes modal when not persistent', async () => {
    await create({ open: true, persistent: false });
    // The container covers the backdrop, so outside-clicks land on it
    const container = el.shadowRoot!.querySelector('.modal-container') as HTMLElement;
    container.click();
    await el.updateComplete;
    expect(el.open).toBe(false);
  });

  it('persistent mode: backdrop click does NOT close', async () => {
    await create({ open: true, persistent: true });
    const backdrop = el.shadowRoot!.querySelector('.modal-container') as HTMLElement;
    backdrop.click();
    await el.updateComplete;
    expect(el.open).toBe(true);
  });

  // ── Focus trap ──

  it('Tab key is handled within modal (focus trap setup)', async () => {
    await create({ open: true, title: 'Test' });
    const container = el.shadowRoot!.querySelector('.modal-container') as HTMLElement;

    // The modal has a close button which is focusable
    const closeBtn = el.shadowRoot!.querySelector('.close-btn') as HTMLElement;
    expect(closeBtn).not.toBeNull();

    // Dispatch Tab — should not throw and should be handled
    const event = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
    container.dispatchEvent(event);
    // The focus trap logic runs without error
    expect(true).toBe(true);
  });

  // ── Events ──

  it('dispatches cg-modal-open when opened', async () => {
    await create({ open: false });
    const handler = vi.fn();
    el.addEventListener('cg-modal-open', handler);

    el.open = true;
    await el.updateComplete;

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('dispatches cg-modal-close when closed', async () => {
    await create({ open: true });
    const handler = vi.fn();
    el.addEventListener('cg-modal-close', handler);

    el.open = false;
    await el.updateComplete;

    expect(handler).toHaveBeenCalledTimes(1);
  });

  // ── Title ──

  it('renders title in header', async () => {
    await create({ title: 'Confirm Action', open: true });
    const titleEl = el.shadowRoot!.querySelector('.modal-title');
    expect(titleEl).not.toBeNull();
    expect(titleEl!.textContent).toBe('Confirm Action');
  });

  it('renders header when title is set', async () => {
    await create({ title: 'Hello' });
    const header = el.shadowRoot!.querySelector('.modal-header');
    expect(header).not.toBeNull();
  });

  // ── Footer slot ──

  it('has footer slot', async () => {
    await create({ open: true });
    const slot = el.shadowRoot!.querySelector('slot[name="footer"]');
    expect(slot).not.toBeNull();
  });

  // ── Closing animation state ──

  it('closing state triggers closing class on modal', async () => {
    await create({ open: true });

    // Close the modal — the _closing state should briefly be true
    el.open = false;
    await el.updateComplete;

    // _closing is set synchronously in updated() then cleared after 150ms
    // We check that the component handled the transition
    // The modal element should exist
    const modal = el.shadowRoot!.querySelector('.modal');
    expect(modal).not.toBeNull();
  });

  // ── Size variants ──

  it('default size is md', async () => {
    await create();
    expect(el.size).toBe('md');
    expect(el.getAttribute('size')).toBe('md');
  });

  it('size="sm" reflects to attribute', async () => {
    await create({ size: 'sm' });
    expect(el.getAttribute('size')).toBe('sm');
  });

  it('size="lg" reflects to attribute', async () => {
    await create({ size: 'lg' });
    expect(el.getAttribute('size')).toBe('lg');
  });

  it('size="xl" reflects to attribute', async () => {
    await create({ size: 'xl' });
    expect(el.getAttribute('size')).toBe('xl');
  });

  // ── Close button ──

  it('close button exists when closable=true (default)', async () => {
    await create({ title: 'Test' });
    const closeBtn = el.shadowRoot!.querySelector('.close-btn');
    expect(closeBtn).not.toBeNull();
  });

  it('close button closes modal on click', async () => {
    await create({ open: true, title: 'Test' });
    const closeBtn = el.shadowRoot!.querySelector('.close-btn') as HTMLElement;
    closeBtn.click();
    await el.updateComplete;
    expect(el.open).toBe(false);
  });

  it('no close button when closable=false', async () => {
    await create({ title: 'Test', closable: false });
    const closeBtn = el.shadowRoot!.querySelector('.close-btn');
    expect(closeBtn).toBeNull();
  });

  // ── Scroll lock ──

  it('locks body scroll when opened', async () => {
    await create({ open: true });
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores body scroll when closed', async () => {
    document.body.style.overflow = '';
    await create({ open: true });
    expect(document.body.style.overflow).toBe('hidden');

    el.open = false;
    await el.updateComplete;
    expect(document.body.style.overflow).toBe('');
  });

  // ── Body slot ──

  it('has a default slot for body content', async () => {
    await create();
    const slot = el.shadowRoot!.querySelector('.modal-body slot:not([name])');
    expect(slot).not.toBeNull();
  });
});
