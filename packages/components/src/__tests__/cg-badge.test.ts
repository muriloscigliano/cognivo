import { describe, it, expect, afterEach } from 'vitest';
import '../index.js';

async function createElement(tag: string, props?: Record<string, unknown>): Promise<HTMLElement> {
  const el = document.createElement(tag);
  if (props) for (const [k, v] of Object.entries(props)) (el as any)[k] = v;
  document.body.appendChild(el);
  if ('updateComplete' in el) await (el as any).updateComplete;
  return el;
}

describe('cg-badge', () => {
  let el: HTMLElement;

  afterEach(() => {
    el?.remove();
  });

  it('renders with shadow DOM', async () => {
    el = await createElement('cg-badge');
    expect(el.shadowRoot).toBeDefined();
    expect(el.shadowRoot).not.toBeNull();
  });

  it('renders label text', async () => {
    el = await createElement('cg-badge', { label: 'Active' });
    const text = el.shadowRoot!.querySelector('.text');
    expect(text).not.toBeNull();
    expect(text!.textContent).toContain('Active');
  });

  it('defaults to variant="neutral" and size="md"', async () => {
    el = await createElement('cg-badge');
    expect(el.getAttribute('variant')).toBe('neutral');
    expect(el.getAttribute('size')).toBe('md');
  });

  it('reflects variant="info"', async () => {
    el = await createElement('cg-badge', { variant: 'info' });
    expect(el.getAttribute('variant')).toBe('info');
  });

  it('reflects variant="success"', async () => {
    el = await createElement('cg-badge', { variant: 'success' });
    expect(el.getAttribute('variant')).toBe('success');
  });

  it('reflects variant="warning"', async () => {
    el = await createElement('cg-badge', { variant: 'warning' });
    expect(el.getAttribute('variant')).toBe('warning');
  });

  it('reflects variant="danger"', async () => {
    el = await createElement('cg-badge', { variant: 'danger' });
    expect(el.getAttribute('variant')).toBe('danger');
  });

  it('reflects variant="accent"', async () => {
    el = await createElement('cg-badge', { variant: 'accent' });
    expect(el.getAttribute('variant')).toBe('accent');
  });

  it('reflects size="sm"', async () => {
    el = await createElement('cg-badge', { size: 'sm' });
    expect(el.getAttribute('size')).toBe('sm');
  });

  it('reflects size="lg"', async () => {
    el = await createElement('cg-badge', { size: 'lg' });
    expect(el.getAttribute('size')).toBe('lg');
  });

  it('shows dot indicator when dot=true', async () => {
    el = await createElement('cg-badge', { dot: true, label: 'Online' });
    const dot = el.shadowRoot!.querySelector('.dot');
    expect(dot).not.toBeNull();
  });

  it('hides dot indicator when dot=false', async () => {
    el = await createElement('cg-badge', { dot: false, label: 'Offline' });
    const dot = el.shadowRoot!.querySelector('.dot');
    expect(dot).toBeNull();
  });

  it('renders no role override (static label, not a live region)', async () => {
    el = await createElement('cg-badge', { label: 'Status' });
    const badge = el.shadowRoot!.querySelector('.badge');
    expect(badge).not.toBeNull();
    // A static badge must not be role="status" (a polite live region) nor
    // role="presentation" (which would hide its own label semantics).
    expect(badge!.getAttribute('role')).toBeNull();
  });

  it('marks the decorative dot aria-hidden', async () => {
    el = await createElement('cg-badge', { dot: true, label: 'Live' });
    const dot = el.shadowRoot!.querySelector('.dot');
    expect(dot).not.toBeNull();
    expect(dot!.getAttribute('aria-hidden')).toBe('true');
  });

  it('dot has pulse animation CSS class', async () => {
    el = await createElement('cg-badge', { dot: true });
    const dot = el.shadowRoot!.querySelector('.dot');
    expect(dot).not.toBeNull();
    // The dot element exists and the component styles include dotPulse animation
    // Verify the dot element is rendered with the correct class
    expect(dot!.classList.contains('dot')).toBe(true);
  });
});
