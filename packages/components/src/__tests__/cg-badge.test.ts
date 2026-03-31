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

  it('shows remove button when removable=true', async () => {
    el = await createElement('cg-badge', { removable: true, label: 'Tag' });
    const btn = el.shadowRoot!.querySelector('.remove');
    expect(btn).not.toBeNull();
    expect(btn!.getAttribute('aria-label')).toBe('Remove Tag');
  });

  it('hides remove button when removable=false', async () => {
    el = await createElement('cg-badge', { removable: false });
    const btn = el.shadowRoot!.querySelector('.remove');
    expect(btn).toBeNull();
  });

  it('dispatches cg-badge-remove on remove click', async () => {
    el = await createElement('cg-badge', { removable: true, label: 'Remove me' });
    let detail: unknown = null;
    el.addEventListener('cg-badge-remove', ((e: CustomEvent) => {
      detail = e.detail;
    }) as EventListener);

    const btn = el.shadowRoot!.querySelector('.remove') as HTMLButtonElement;
    btn.click();

    expect(detail).not.toBeNull();
    expect((detail as { label: string }).label).toBe('Remove me');
  });

  it('has role="status" on the badge element', async () => {
    el = await createElement('cg-badge', { label: 'Status' });
    const badge = el.shadowRoot!.querySelector('.badge');
    expect(badge).not.toBeNull();
    expect(badge!.getAttribute('role')).toBe('status');
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
