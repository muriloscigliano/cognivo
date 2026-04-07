import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { CgDrawer } from '../components/cg-drawer/cg-drawer.js';

// Register the custom element if not already registered
if (!customElements.get('cg-drawer')) {
  customElements.define('cg-drawer', CgDrawer);
}

describe('cg-drawer', () => {
  let el: CgDrawer;

  beforeEach(async () => {
    el = document.createElement('cg-drawer') as CgDrawer;
    el.title = 'Test Drawer';
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => {
    el.remove();
    // Restore body overflow in case test left it locked
    document.body.style.overflow = '';
  });

  it('creates and renders with shadow DOM', () => {
    expect(el).toBeDefined();
    expect(el.shadowRoot).toBeDefined();
  });

  it('renders backdrop and panel elements', () => {
    const backdrop = el.shadowRoot!.querySelector('.backdrop');
    const panel = el.shadowRoot!.querySelector('.panel');
    expect(backdrop).not.toBeNull();
    expect(panel).not.toBeNull();
  });

  it('opens when open=true', async () => {
    el.open = true;
    await el.updateComplete;

    expect(el.hasAttribute('open')).toBe(true);
  });

  it('dispatches cg-drawer-open when opened', async () => {
    let opened = false;
    el.addEventListener('cg-drawer-open', () => { opened = true; });

    el.open = true;
    await el.updateComplete;

    expect(opened).toBe(true);
  });

  it('dispatches cg-drawer-close when closed', async () => {
    el.open = true;
    await el.updateComplete;

    let closed = false;
    el.addEventListener('cg-drawer-close', () => { closed = true; });

    el.open = false;
    await el.updateComplete;

    expect(closed).toBe(true);
  });

  it('closes on Escape key', async () => {
    el.open = true;
    await el.updateComplete;

    // The drawer listens on document keydown
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await el.updateComplete;

    expect(el.open).toBe(false);
  });

  it('has role="dialog" and aria-modal on panel', () => {
    const panel = el.shadowRoot!.querySelector('.panel');
    expect(panel!.getAttribute('role')).toBe('dialog');
    expect(panel!.getAttribute('aria-modal')).toBe('true');
  });

  it('has aria-labelledby referencing the title', async () => {
    el.title = 'Settings';
    await el.updateComplete;

    const panel = el.shadowRoot!.querySelector('.panel');
    // Either aria-label or aria-labelledby is acceptable
    const hasLabel = panel!.getAttribute('aria-label') === 'Settings' || panel!.getAttribute('aria-labelledby');
    expect(hasLabel).toBeTruthy();
  });

  it('exit animation plays on close (_closing state adds "closing" class)', async () => {
    el.open = true;
    await el.updateComplete;

    el.open = false;
    // Wait for updated() to set _closing, then wait for the re-render it triggers
    await el.updateComplete;
    await el.updateComplete;

    const panel = el.shadowRoot!.querySelector('.panel');
    expect(panel!.classList.contains('closing')).toBe(true);

    const backdrop = el.shadowRoot!.querySelector('.backdrop');
    expect(backdrop!.classList.contains('closing')).toBe(true);
  });

  it('closing class is removed after animation timeout', async () => {
    vi.useFakeTimers();

    el.open = true;
    await el.updateComplete;

    el.open = false;
    await el.updateComplete;

    // Advance past the 200ms closing animation
    vi.advanceTimersByTime(250);
    await el.updateComplete;

    const panel = el.shadowRoot!.querySelector('.panel');
    expect(panel!.classList.contains('closing')).toBe(false);

    vi.useRealTimers();
  });

  it('backdrop click closes when not persistent', async () => {
    el.open = true;
    await el.updateComplete;

    const backdrop = el.shadowRoot!.querySelector('.backdrop') as HTMLElement;
    backdrop.click();
    await el.updateComplete;

    expect(el.open).toBe(false);
  });

  it('persistent mode: backdrop click does NOT close', async () => {
    el.persistent = true;
    el.open = true;
    await el.updateComplete;

    const backdrop = el.shadowRoot!.querySelector('.backdrop') as HTMLElement;
    backdrop.click();
    await el.updateComplete;

    expect(el.open).toBe(true);
  });

  it('locks body scroll when open', async () => {
    el.open = true;
    await el.updateComplete;

    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores body scroll when closed', async () => {
    document.body.style.overflow = 'auto';

    el.open = true;
    await el.updateComplete;

    el.open = false;
    await el.updateComplete;

    expect(document.body.style.overflow).toBe('auto');
  });

  it('renders title in header', async () => {
    el.title = 'My Settings';
    await el.updateComplete;

    const titleEl = el.shadowRoot!.querySelector('.drawer-title');
    expect(titleEl).not.toBeNull();
    expect(titleEl!.textContent).toBe('My Settings');
  });

  it('renders close button when closable=true (default)', () => {
    const closeBtn = el.shadowRoot!.querySelector('.close-btn');
    expect(closeBtn).not.toBeNull();
  });

  it('close button click closes the drawer', async () => {
    el.open = true;
    await el.updateComplete;

    const closeBtn = el.shadowRoot!.querySelector('.close-btn') as HTMLElement;
    closeBtn.click();
    await el.updateComplete;

    expect(el.open).toBe(false);
  });

  it('defaults to right side', () => {
    expect(el.side).toBe('right');
    expect(el.getAttribute('side')).toBe('right');
  });

  it('defaults to md size', () => {
    expect(el.size).toBe('md');
    expect(el.getAttribute('size')).toBe('md');
  });

  it('Escape does not close when closable=false', async () => {
    el.closable = false;
    el.open = true;
    await el.updateComplete;

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await el.updateComplete;

    expect(el.open).toBe(true);

    // Clean up — force close
    el.open = false;
    await el.updateComplete;
  });
});
