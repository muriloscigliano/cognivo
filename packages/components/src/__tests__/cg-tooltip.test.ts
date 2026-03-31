import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { CgTooltip } from '../components/cg-tooltip/cg-tooltip.js';

// Register the custom element if not already registered
if (!customElements.get('cg-tooltip')) {
  customElements.define('cg-tooltip', CgTooltip);
}

describe('cg-tooltip', () => {
  let el: CgTooltip;

  beforeEach(async () => {
    vi.useFakeTimers();
    el = document.createElement('cg-tooltip') as CgTooltip;
    el.content = 'Test tooltip';
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => {
    el.remove();
    vi.useRealTimers();
  });

  it('renders with shadow DOM', () => {
    expect(el).toBeDefined();
    expect(el.shadowRoot).toBeDefined();
  });

  it('hidden by default', () => {
    expect(el.hasAttribute('_visible')).toBe(false);
    const tooltip = el.shadowRoot!.querySelector('.tooltip');
    expect(tooltip).not.toBeNull();
  });

  it('shows on mouseenter after delay', async () => {
    const triggerWrap = el.shadowRoot!.querySelector('.trigger-wrap') as HTMLElement;
    triggerWrap.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));

    // Advance past delay (default 300ms)
    vi.advanceTimersByTime(350);
    await el.updateComplete;

    expect(el.hasAttribute('_visible')).toBe(true);
  });

  it('hides on mouseleave', async () => {
    const triggerWrap = el.shadowRoot!.querySelector('.trigger-wrap') as HTMLElement;

    // Show first
    triggerWrap.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    vi.advanceTimersByTime(350);
    await el.updateComplete;
    expect(el.hasAttribute('_visible')).toBe(true);

    // Hide
    triggerWrap.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
    vi.advanceTimersByTime(150);
    await el.updateComplete;

    expect(el.hasAttribute('_visible')).toBe(false);
  });

  it('shows on focusin', async () => {
    const triggerWrap = el.shadowRoot!.querySelector('.trigger-wrap') as HTMLElement;
    triggerWrap.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));

    vi.advanceTimersByTime(350);
    await el.updateComplete;

    expect(el.hasAttribute('_visible')).toBe(true);
  });

  it('hides on focusout', async () => {
    const triggerWrap = el.shadowRoot!.querySelector('.trigger-wrap') as HTMLElement;

    // Show first
    triggerWrap.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    vi.advanceTimersByTime(350);
    await el.updateComplete;
    expect(el.hasAttribute('_visible')).toBe(true);

    // Hide
    triggerWrap.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
    vi.advanceTimersByTime(150);
    await el.updateComplete;

    expect(el.hasAttribute('_visible')).toBe(false);
  });

  it('content property renders text', () => {
    const tooltipEl = el.shadowRoot!.querySelector('.tooltip');
    expect(tooltipEl!.textContent).toContain('Test tooltip');
  });

  it('rich content slot renders', () => {
    const contentSlot = el.shadowRoot!.querySelector('slot[name="content"]');
    expect(contentSlot).not.toBeNull();
  });

  it('default position is top', () => {
    expect(el.position).toBe('top');
    expect(el.getAttribute('position')).toBe('top');
  });

  it('position attribute reflects (bottom)', async () => {
    el.position = 'bottom';
    await el.updateComplete;
    expect(el.getAttribute('position')).toBe('bottom');
  });

  it('position attribute reflects (left)', async () => {
    el.position = 'left';
    await el.updateComplete;
    expect(el.getAttribute('position')).toBe('left');
  });

  it('position attribute reflects (right)', async () => {
    el.position = 'right';
    await el.updateComplete;
    expect(el.getAttribute('position')).toBe('right');
  });

  it('default delay is 300ms', () => {
    expect(el.delay).toBe(300);
  });

  it('custom delay is respected', async () => {
    el.delay = 500;
    await el.updateComplete;

    const triggerWrap = el.shadowRoot!.querySelector('.trigger-wrap') as HTMLElement;
    triggerWrap.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));

    // Advance less than delay
    vi.advanceTimersByTime(400);
    await el.updateComplete;
    expect(el.hasAttribute('_visible')).toBe(false);

    // Advance past delay
    vi.advanceTimersByTime(150);
    await el.updateComplete;
    expect(el.hasAttribute('_visible')).toBe(true);
  });

  it('has role="tooltip" on tooltip element', () => {
    const tooltip = el.shadowRoot!.querySelector('.tooltip');
    expect(tooltip!.getAttribute('role')).toBe('tooltip');
  });

  it('has aria-hidden="true" when hidden', () => {
    const tooltip = el.shadowRoot!.querySelector('.tooltip');
    expect(tooltip!.getAttribute('aria-hidden')).toBe('true');
  });

  it('has no aria-hidden when visible', async () => {
    const triggerWrap = el.shadowRoot!.querySelector('.trigger-wrap') as HTMLElement;
    triggerWrap.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    vi.advanceTimersByTime(350);
    await el.updateComplete;

    const tooltip = el.shadowRoot!.querySelector('.tooltip');
    // When visible, aria-hidden should not be "true"
    expect(tooltip!.getAttribute('aria-hidden')).not.toBe('true');
  });

  it('trigger has aria-describedby pointing to tooltip id', () => {
    const triggerWrap = el.shadowRoot!.querySelector('.trigger-wrap');
    const tooltip = el.shadowRoot!.querySelector('.tooltip');
    const tooltipId = tooltip!.getAttribute('id');
    expect(triggerWrap!.getAttribute('aria-describedby')).toBe(tooltipId);
  });

  it('exit animation with scale exists in styles', () => {
    const styles = CgTooltip.styles;
    const cssText = (styles as { cssText: string }).cssText;
    expect(cssText).toContain('tooltip-exit');
    expect(cssText).toContain('scale(0.92)');
  });

  it('closing class applied during hide animation', async () => {
    const triggerWrap = el.shadowRoot!.querySelector('.trigger-wrap') as HTMLElement;

    // Show
    triggerWrap.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    vi.advanceTimersByTime(350);
    await el.updateComplete;

    // Start hide
    triggerWrap.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
    await el.updateComplete;

    const tooltip = el.shadowRoot!.querySelector('.tooltip');
    expect(tooltip!.classList.contains('closing')).toBe(true);
  });

  it('disabled tooltip does not show', async () => {
    el.disabled = true;
    await el.updateComplete;

    const triggerWrap = el.shadowRoot!.querySelector('.trigger-wrap') as HTMLElement;
    triggerWrap.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    vi.advanceTimersByTime(350);
    await el.updateComplete;

    expect(el.hasAttribute('_visible')).toBe(false);
  });
});
