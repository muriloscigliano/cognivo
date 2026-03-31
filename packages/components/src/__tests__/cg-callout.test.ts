import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { CgCallout } from '../components/cg-callout/cg-callout.js';

// Register the custom element if not already registered
if (!customElements.get('cg-callout')) {
  customElements.define('cg-callout', CgCallout);
}

describe('cg-callout', () => {
  let el: CgCallout;

  beforeEach(async () => {
    el = document.createElement('cg-callout') as CgCallout;
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => {
    el.remove();
  });

  it('creates and renders with shadow DOM', () => {
    expect(el).toBeDefined();
    expect(el.shadowRoot).toBeDefined();
  });

  it('renders a callout container', () => {
    const callout = el.shadowRoot!.querySelector('.callout');
    expect(callout).not.toBeNull();
  });

  it('defaults to "info" variant', () => {
    expect(el.variant).toBe('info');
    expect(el.getAttribute('variant')).toBe('info');
  });

  it('shows an icon SVG element', () => {
    const icon = el.shadowRoot!.querySelector('.icon svg');
    expect(icon).not.toBeNull();
  });

  it('renders correct icon path per variant — info', async () => {
    el.variant = 'info';
    await el.updateComplete;

    const path = el.shadowRoot!.querySelector('.icon svg path');
    expect(path).not.toBeNull();
    expect(path!.getAttribute('d')).toContain('M12 2a10 10 0');
  });

  it('renders correct icon path per variant — success', async () => {
    el.variant = 'success';
    await el.updateComplete;

    const path = el.shadowRoot!.querySelector('.icon svg path');
    expect(path).not.toBeNull();
    // success path contains the checkmark segment "4-4"
    expect(path!.getAttribute('d')).toContain('4-4');
  });

  it('renders correct icon path per variant — warning', async () => {
    el.variant = 'warning';
    await el.updateComplete;

    const path = el.shadowRoot!.querySelector('.icon svg path');
    expect(path).not.toBeNull();
    // warning path starts with triangle "M12 2L2 22h20L12 2"
    expect(path!.getAttribute('d')).toContain('L2 22h20');
  });

  it('renders correct icon path per variant — danger', async () => {
    el.variant = 'danger';
    await el.updateComplete;

    const path = el.shadowRoot!.querySelector('.icon svg path');
    expect(path).not.toBeNull();
    expect(path!.getAttribute('d')).toContain('M12 2a10 10 0');
  });

  it('renders correct icon path per variant — neutral', async () => {
    el.variant = 'neutral';
    await el.updateComplete;

    const path = el.shadowRoot!.querySelector('.icon svg path');
    expect(path).not.toBeNull();
    expect(path!.getAttribute('d')).toContain('M12 2a10 10 0');
  });

  it('dismissible: shows close button when dismissible=true', async () => {
    el.dismissible = true;
    await el.updateComplete;

    const dismissBtn = el.shadowRoot!.querySelector('.dismiss');
    expect(dismissBtn).not.toBeNull();
  });

  it('does not show close button when dismissible=false', () => {
    const dismissBtn = el.shadowRoot!.querySelector('.dismiss');
    expect(dismissBtn).toBeNull();
  });

  it('dismiss click triggers dismissing animation state', async () => {
    el.dismissible = true;
    await el.updateComplete;

    const dismissBtn = el.shadowRoot!.querySelector('.dismiss') as HTMLElement;
    dismissBtn.click();
    await el.updateComplete;

    const callout = el.shadowRoot!.querySelector('.callout');
    expect(callout!.classList.contains('dismissing')).toBe(true);
  });

  it('dismiss click dispatches cg-callout-dismiss event', async () => {
    el.dismissible = true;
    await el.updateComplete;

    let dismissed = false;
    el.addEventListener('cg-callout-dismiss', () => { dismissed = true; });

    const dismissBtn = el.shadowRoot!.querySelector('.dismiss') as HTMLElement;
    dismissBtn.click();

    expect(dismissed).toBe(true);
  });

  it('dismiss hides the element after animation timeout', async () => {
    vi.useFakeTimers();

    el.dismissible = true;
    await el.updateComplete;

    const dismissBtn = el.shadowRoot!.querySelector('.dismiss') as HTMLElement;
    dismissBtn.click();
    await el.updateComplete;

    // Advance past the 200ms animation timeout
    vi.advanceTimersByTime(250);
    await el.updateComplete;

    expect(el.hasAttribute('hidden')).toBe(true);

    vi.useRealTimers();
  });

  it('has role="alert"', () => {
    const callout = el.shadowRoot!.querySelector('.callout');
    expect(callout!.getAttribute('role')).toBe('alert');
  });

  it('title renders correctly', async () => {
    el.title = 'Important Notice';
    await el.updateComplete;

    const title = el.shadowRoot!.querySelector('.title');
    expect(title).not.toBeNull();
    expect(title!.textContent).toBe('Important Notice');
  });

  it('description renders correctly', async () => {
    el.description = 'Please read carefully.';
    await el.updateComplete;

    const desc = el.shadowRoot!.querySelector('.description');
    expect(desc).not.toBeNull();
    expect(desc!.textContent).toBe('Please read carefully.');
  });

  it('title is not rendered when empty', () => {
    const title = el.shadowRoot!.querySelector('.title');
    expect(title).toBeNull();
  });

  it('description is not rendered when empty', () => {
    const desc = el.shadowRoot!.querySelector('.description');
    expect(desc).toBeNull();
  });
});
