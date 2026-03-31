import { describe, it, expect, afterEach } from 'vitest';
import '../index.js';

async function createElement(tag: string, props?: Record<string, unknown>): Promise<HTMLElement> {
  const el = document.createElement(tag);
  if (props) for (const [k, v] of Object.entries(props)) (el as any)[k] = v;
  document.body.appendChild(el);
  if ('updateComplete' in el) await (el as any).updateComplete;
  return el;
}

describe('cg-chip', () => {
  let el: HTMLElement;

  afterEach(() => {
    el?.remove();
  });

  it('renders with shadow DOM', async () => {
    el = await createElement('cg-chip');
    expect(el.shadowRoot).toBeDefined();
    expect(el.shadowRoot).not.toBeNull();
  });

  it('renders label text', async () => {
    el = await createElement('cg-chip', { label: 'TypeScript' });
    const label = el.shadowRoot!.querySelector('.chip-label');
    expect(label).not.toBeNull();
    expect(label!.textContent).toBe('TypeScript');
  });

  it('defaults to variant="default" and size="md"', async () => {
    el = await createElement('cg-chip');
    expect(el.getAttribute('variant')).toBe('default');
    expect(el.getAttribute('size')).toBe('md');
  });

  it('reflects variant="success"', async () => {
    el = await createElement('cg-chip', { variant: 'success' });
    expect(el.getAttribute('variant')).toBe('success');
  });

  it('reflects variant="warning"', async () => {
    el = await createElement('cg-chip', { variant: 'warning' });
    expect(el.getAttribute('variant')).toBe('warning');
  });

  it('reflects variant="error"', async () => {
    el = await createElement('cg-chip', { variant: 'error' });
    expect(el.getAttribute('variant')).toBe('error');
  });

  it('reflects variant="accent"', async () => {
    el = await createElement('cg-chip', { variant: 'accent' });
    expect(el.getAttribute('variant')).toBe('accent');
  });

  it('reflects size="sm"', async () => {
    el = await createElement('cg-chip', { size: 'sm' });
    expect(el.getAttribute('size')).toBe('sm');
  });

  it('dispatches cg-chip-click on click', async () => {
    el = await createElement('cg-chip', { label: 'Clickable' });
    let detail: unknown = null;
    el.addEventListener('cg-chip-click', ((e: CustomEvent) => {
      detail = e.detail;
    }) as EventListener);

    const chip = el.shadowRoot!.querySelector('.chip') as HTMLElement;
    chip.click();

    expect(detail).not.toBeNull();
    expect((detail as { label: string }).label).toBe('Clickable');
  });

  it('shows remove button when removable=true', async () => {
    el = await createElement('cg-chip', { removable: true, label: 'Tag' });
    const btn = el.shadowRoot!.querySelector('.remove-btn');
    expect(btn).not.toBeNull();
    expect(btn!.getAttribute('aria-label')).toBe('Remove Tag');
  });

  it('hides remove button when removable=false', async () => {
    el = await createElement('cg-chip', { removable: false });
    const btn = el.shadowRoot!.querySelector('.remove-btn');
    expect(btn).toBeNull();
  });

  it('dispatches cg-chip-remove on remove button click', async () => {
    el = await createElement('cg-chip', { removable: true, label: 'Remove me' });
    let detail: unknown = null;
    el.addEventListener('cg-chip-remove', ((e: CustomEvent) => {
      detail = e.detail;
    }) as EventListener);

    const btn = el.shadowRoot!.querySelector('.remove-btn') as HTMLButtonElement;
    btn.click();

    expect(detail).not.toBeNull();
    expect((detail as { label: string }).label).toBe('Remove me');
  });

  it('Enter key triggers cg-chip-click', async () => {
    el = await createElement('cg-chip', { label: 'Enter' });
    let clicked = false;
    el.addEventListener('cg-chip-click', () => { clicked = true; });

    const chip = el.shadowRoot!.querySelector('.chip') as HTMLElement;
    chip.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

    expect(clicked).toBe(true);
  });

  it('Space key triggers cg-chip-click', async () => {
    el = await createElement('cg-chip', { label: 'Space' });
    let clicked = false;
    el.addEventListener('cg-chip-click', () => { clicked = true; });

    const chip = el.shadowRoot!.querySelector('.chip') as HTMLElement;
    chip.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));

    expect(clicked).toBe(true);
  });

  it('Delete key triggers cg-chip-remove when removable', async () => {
    el = await createElement('cg-chip', { label: 'Del', removable: true });
    let removed = false;
    el.addEventListener('cg-chip-remove', () => { removed = true; });

    const chip = el.shadowRoot!.querySelector('.chip') as HTMLElement;
    chip.dispatchEvent(new KeyboardEvent('keydown', { key: 'Delete', bubbles: true }));

    expect(removed).toBe(true);
  });

  it('Backspace key triggers cg-chip-remove when removable', async () => {
    el = await createElement('cg-chip', { label: 'Back', removable: true });
    let removed = false;
    el.addEventListener('cg-chip-remove', () => { removed = true; });

    const chip = el.shadowRoot!.querySelector('.chip') as HTMLElement;
    chip.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace', bubbles: true }));

    expect(removed).toBe(true);
  });

  it('disabled state prevents click event', async () => {
    el = await createElement('cg-chip', { label: 'Disabled', disabled: true });
    let clicked = false;
    el.addEventListener('cg-chip-click', () => { clicked = true; });

    const chip = el.shadowRoot!.querySelector('.chip') as HTMLElement;
    chip.click();

    expect(clicked).toBe(false);
  });

  it('disabled state prevents keyboard interaction', async () => {
    el = await createElement('cg-chip', { label: 'Disabled', disabled: true });
    let clicked = false;
    el.addEventListener('cg-chip-click', () => { clicked = true; });

    const chip = el.shadowRoot!.querySelector('.chip') as HTMLElement;
    chip.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

    expect(clicked).toBe(false);
  });

  it('aria-disabled reflects disabled state', async () => {
    el = await createElement('cg-chip', { disabled: true });
    const chip = el.shadowRoot!.querySelector('.chip');
    expect(chip!.getAttribute('aria-disabled')).toBe('true');
  });

  it('aria-disabled is false when not disabled', async () => {
    el = await createElement('cg-chip', { disabled: false });
    const chip = el.shadowRoot!.querySelector('.chip');
    expect(chip!.getAttribute('aria-disabled')).toBe('false');
  });

  it('disabled chip has disabled CSS class', async () => {
    el = await createElement('cg-chip', { disabled: true });
    const chip = el.shadowRoot!.querySelector('.chip');
    expect(chip!.classList.contains('disabled')).toBe(true);
  });

  it('does not show remove button when disabled even if removable', async () => {
    el = await createElement('cg-chip', { removable: true, disabled: true });
    const btn = el.shadowRoot!.querySelector('.remove-btn');
    expect(btn).toBeNull();
  });
});
