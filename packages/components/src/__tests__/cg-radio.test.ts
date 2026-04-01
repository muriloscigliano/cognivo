import { describe, it, expect, afterEach } from 'vitest';
import { CgRadio } from '../components/cg-radio/cg-radio.js';

if (!customElements.get('cg-radio')) {
  customElements.define('cg-radio', CgRadio);
}

describe('cg-radio', () => {
  let el: CgRadio;

  async function create(props?: Partial<CgRadio>): Promise<CgRadio> {
    el = document.createElement('cg-radio') as CgRadio;
    if (props) {
      for (const [k, v] of Object.entries(props)) {
        (el as any)[k] = v;
      }
    }
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => el?.remove());

  it('renders with shadow DOM', async () => {
    await create();
    expect(el.shadowRoot).toBeDefined();
    expect(el.shadowRoot!.querySelector('label')).not.toBeNull();
  });

  it('renders label text', async () => {
    await create({ label: 'Option A' });
    const labelText = el.shadowRoot!.querySelector('.label-text');
    expect(labelText).not.toBeNull();
    expect(labelText!.textContent).toContain('Option A');
  });

  it('defaults to unchecked', async () => {
    await create();
    expect(el.checked).toBe(false);
    const circle = el.shadowRoot!.querySelector('.circle')!;
    expect(circle.classList.contains('checked')).toBe(false);
  });

  it('renders checked state with dot', async () => {
    await create({ checked: true });
    const dot = el.shadowRoot!.querySelector('.dot');
    expect(dot).not.toBeNull();
    const circle = el.shadowRoot!.querySelector('.circle')!;
    expect(circle.classList.contains('checked')).toBe(true);
  });

  it('has radio role with aria-checked', async () => {
    await create({ checked: false });
    const label = el.shadowRoot!.querySelector('label')!;
    expect(label.getAttribute('role')).toBe('radio');
    expect(label.getAttribute('aria-checked')).toBe('false');
  });

  it('dispatches cg-change on click', async () => {
    await create({ value: 'a', label: 'Option A' });
    let detail: any = null;
    el.addEventListener('cg-change', (e: any) => { detail = e.detail; });
    el.shadowRoot!.querySelector('label')!.click();
    expect(detail).not.toBeNull();
    expect(detail.value).toBe('a');
    expect(detail.checked).toBe(true);
  });

  it('does not fire cg-change when disabled', async () => {
    await create({ disabled: true, value: 'a' });
    let fired = false;
    el.addEventListener('cg-change', () => { fired = true; });
    el.shadowRoot!.querySelector('label')!.click();
    expect(fired).toBe(false);
  });

  it('renders description when provided', async () => {
    await create({ label: 'Opt', description: 'Detailed info' });
    const desc = el.shadowRoot!.querySelector('.description');
    expect(desc).not.toBeNull();
    expect(desc!.textContent).toContain('Detailed info');
  });

  it('does not fire cg-change when already checked', async () => {
    await create({ checked: true, value: 'a' });
    let fired = false;
    el.addEventListener('cg-change', () => { fired = true; });
    el.shadowRoot!.querySelector('label')!.click();
    expect(fired).toBe(false);
  });
});
