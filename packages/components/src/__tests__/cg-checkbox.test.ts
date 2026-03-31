import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { CgCheckbox } from '../components/cg-checkbox/cg-checkbox.js';

// Register the custom element if not already registered
if (!customElements.get('cg-checkbox')) {
  customElements.define('cg-checkbox', CgCheckbox);
}

describe('cg-checkbox', () => {
  let el: CgCheckbox;

  beforeEach(async () => {
    el = document.createElement('cg-checkbox') as CgCheckbox;
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

  it('shows unchecked state by default', () => {
    expect(el.checked).toBe(false);
    const box = el.shadowRoot!.querySelector('.box');
    expect(box).not.toBeNull();
    expect(box!.classList.contains('checked')).toBe(false);
  });

  it('toggles on click (checked becomes true)', async () => {
    const label = el.shadowRoot!.querySelector('label') as HTMLElement;
    label.click();
    await el.updateComplete;

    expect(el.checked).toBe(true);
    const box = el.shadowRoot!.querySelector('.box');
    expect(box!.classList.contains('checked')).toBe(true);
  });

  it('does NOT double-toggle (clicking once results in exactly one state change)', async () => {
    // The bug we fixed: _toggle is called by click on the label, which should
    // only flip the state once — not twice due to event propagation from the
    // hidden native input.
    expect(el.checked).toBe(false);

    const label = el.shadowRoot!.querySelector('label') as HTMLElement;
    label.click();
    await el.updateComplete;

    // Should be checked after exactly one toggle
    expect(el.checked).toBe(true);

    // Click again — should go back to unchecked, not stay checked
    label.click();
    await el.updateComplete;
    expect(el.checked).toBe(false);
  });

  it('shows animated tick SVG when checked', async () => {
    el.checked = true;
    await el.updateComplete;

    const svg = el.shadowRoot!.querySelector('.check-icon');
    expect(svg).not.toBeNull();
    const tick = el.shadowRoot!.querySelector('.tick');
    expect(tick).not.toBeNull();
  });

  it('does not show tick SVG when unchecked', () => {
    const svg = el.shadowRoot!.querySelector('.check-icon');
    expect(svg).toBeNull();
  });

  it('shows indeterminate dash SVG when indeterminate', async () => {
    el.indeterminate = true;
    await el.updateComplete;

    const box = el.shadowRoot!.querySelector('.box');
    expect(box!.classList.contains('indeterminate')).toBe(true);
    const dash = el.shadowRoot!.querySelector('.dash');
    expect(dash).not.toBeNull();
  });

  it('dispatches cg-change event with {checked, value} detail', async () => {
    el.value = 'terms';
    await el.updateComplete;

    let eventDetail: unknown = null;
    el.addEventListener('cg-change', ((e: CustomEvent) => {
      eventDetail = e.detail;
    }) as EventListener);

    const label = el.shadowRoot!.querySelector('label') as HTMLElement;
    label.click();
    await el.updateComplete;

    expect(eventDetail).not.toBeNull();
    expect((eventDetail as { checked: boolean }).checked).toBe(true);
    expect((eventDetail as { value: string }).value).toBe('terms');
  });

  it('keyboard: Space toggles', async () => {
    const label = el.shadowRoot!.querySelector('label') as HTMLElement;
    label.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    await el.updateComplete;

    expect(el.checked).toBe(true);
  });

  it('keyboard: Enter toggles', async () => {
    const label = el.shadowRoot!.querySelector('label') as HTMLElement;
    label.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await el.updateComplete;

    expect(el.checked).toBe(true);
  });

  it('disabled: click does not toggle', async () => {
    el.disabled = true;
    await el.updateComplete;

    const label = el.shadowRoot!.querySelector('label') as HTMLElement;
    label.click();
    await el.updateComplete;

    expect(el.checked).toBe(false);
  });

  it('has proper role="checkbox"', () => {
    const label = el.shadowRoot!.querySelector('label');
    expect(label!.getAttribute('role')).toBe('checkbox');
  });

  it('has aria-checked="false" by default', () => {
    const label = el.shadowRoot!.querySelector('label');
    expect(label!.getAttribute('aria-checked')).toBe('false');
  });

  it('has aria-checked="true" when checked', async () => {
    el.checked = true;
    await el.updateComplete;

    const label = el.shadowRoot!.querySelector('label');
    expect(label!.getAttribute('aria-checked')).toBe('true');
  });

  it('has aria-checked="mixed" when indeterminate', async () => {
    el.indeterminate = true;
    await el.updateComplete;

    const label = el.shadowRoot!.querySelector('label');
    expect(label!.getAttribute('aria-checked')).toBe('mixed');
  });

  it('clears indeterminate state on toggle', async () => {
    el.indeterminate = true;
    await el.updateComplete;

    const label = el.shadowRoot!.querySelector('label') as HTMLElement;
    label.click();
    await el.updateComplete;

    expect(el.indeterminate).toBe(false);
    expect(el.checked).toBe(true);
  });

  it('renders label text when label prop is set', async () => {
    el.label = 'Accept terms';
    await el.updateComplete;

    const labelText = el.shadowRoot!.querySelector('.label-text');
    expect(labelText).not.toBeNull();
    expect(labelText!.textContent).toBe('Accept terms');
  });

  it('renders description when description prop is set', async () => {
    el.label = 'Accept';
    el.description = 'Required to continue';
    await el.updateComplete;

    const desc = el.shadowRoot!.querySelector('.description');
    expect(desc).not.toBeNull();
    expect(desc!.textContent).toBe('Required to continue');
  });
});
