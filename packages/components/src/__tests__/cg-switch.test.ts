import { describe, it, expect, afterEach } from 'vitest';
import { CgSwitch } from '../components/cg-switch/cg-switch.js';

if (!customElements.get('cg-switch')) {
  customElements.define('cg-switch', CgSwitch);
}

describe('cg-switch', () => {
  let el: CgSwitch;

  async function create(props?: Partial<CgSwitch>): Promise<CgSwitch> {
    el = document.createElement('cg-switch') as CgSwitch;
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

  // ── Rendering ──

  it('renders with shadow DOM', async () => {
    await create();
    expect(el.shadowRoot).toBeDefined();
    expect(el.shadowRoot!.querySelector('label')).not.toBeNull();
  });

  // ── Default unchecked state ──

  it('default state is unchecked', async () => {
    await create();
    expect(el.checked).toBe(false);
  });

  it('track does not have checked class by default', async () => {
    await create();
    const track = el.shadowRoot!.querySelector('.track')!;
    expect(track.classList.contains('checked')).toBe(false);
  });

  // ── Toggle via keyboard (avoids label/input double-toggle in JSDOM) ──

  it('toggle changes checked to true', async () => {
    await create();
    const label = el.shadowRoot!.querySelector('label') as HTMLElement;
    label.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    await el.updateComplete;
    expect(el.checked).toBe(true);
  });

  it('toggle updates track class to checked', async () => {
    await create();
    const label = el.shadowRoot!.querySelector('label') as HTMLElement;
    label.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    await el.updateComplete;

    const track = el.shadowRoot!.querySelector('.track')!;
    expect(track.classList.contains('checked')).toBe(true);
  });

  it('double toggle returns to unchecked', async () => {
    await create();
    const label = el.shadowRoot!.querySelector('label') as HTMLElement;
    label.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    await el.updateComplete;
    label.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    await el.updateComplete;
    expect(el.checked).toBe(false);
  });

  // ── Event dispatch ──

  it('dispatches cg-change with {checked: true} on toggle', async () => {
    await create();
    let detail: any = null;
    el.addEventListener('cg-change', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);

    const label = el.shadowRoot!.querySelector('label') as HTMLElement;
    label.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    await el.updateComplete;

    expect(detail).not.toBeNull();
    expect(detail.checked).toBe(true);
  });

  it('dispatches cg-change with {checked: false} on second toggle', async () => {
    await create({ checked: true });
    let detail: any = null;
    el.addEventListener('cg-change', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);

    const label = el.shadowRoot!.querySelector('label') as HTMLElement;
    label.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    await el.updateComplete;

    expect(detail.checked).toBe(false);
  });

  // ── Keyboard ──

  it('Space toggles switch', async () => {
    await create();
    const label = el.shadowRoot!.querySelector('label') as HTMLElement;
    label.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    await el.updateComplete;
    expect(el.checked).toBe(true);
  });

  it('Enter toggles switch', async () => {
    await create();
    const label = el.shadowRoot!.querySelector('label') as HTMLElement;
    label.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await el.updateComplete;
    expect(el.checked).toBe(true);
  });

  // ── Disabled ──

  it('disabled prevents toggle on click', async () => {
    await create({ disabled: true });
    const label = el.shadowRoot!.querySelector('label') as HTMLElement;
    label.click();
    await el.updateComplete;
    expect(el.checked).toBe(false);
  });

  it('disabled reflects to attribute', async () => {
    await create({ disabled: true });
    expect(el.hasAttribute('disabled')).toBe(true);
  });

  // ── ARIA ──

  it('has role="switch" on label', async () => {
    await create();
    const label = el.shadowRoot!.querySelector('label')!;
    expect(label.getAttribute('role')).toBe('switch');
  });

  it('has aria-checked="false" when unchecked', async () => {
    await create();
    const label = el.shadowRoot!.querySelector('label')!;
    expect(label.getAttribute('aria-checked')).toBe('false');
  });

  it('has aria-checked="true" when checked', async () => {
    await create({ checked: true });
    const label = el.shadowRoot!.querySelector('label')!;
    expect(label.getAttribute('aria-checked')).toBe('true');
  });

  it('aria-checked updates on toggle', async () => {
    await create();
    const label = el.shadowRoot!.querySelector('label') as HTMLElement;
    label.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    await el.updateComplete;
    expect(label.getAttribute('aria-checked')).toBe('true');
  });

  // ── Size variants ──

  it('default size is md', async () => {
    await create();
    expect(el.size).toBe('md');
  });

  it('size="sm" reflects to attribute', async () => {
    await create({ size: 'sm' });
    expect(el.getAttribute('size')).toBe('sm');
  });

  it('size="lg" reflects to attribute', async () => {
    await create({ size: 'lg' });
    expect(el.getAttribute('size')).toBe('lg');
  });

  // ── Track/thumb structure ──

  it('thumb element exists inside track', async () => {
    await create();
    const track = el.shadowRoot!.querySelector('.track')!;
    const thumb = track.querySelector('.thumb');
    expect(thumb).not.toBeNull();
  });

  // ── Label text ──

  it('renders label text when label prop is set', async () => {
    await create({ label: 'Dark mode' });
    const labelText = el.shadowRoot!.querySelector('.label-text');
    expect(labelText).not.toBeNull();
    expect(labelText!.textContent).toBe('Dark mode');
  });

  it('does not render label text when label is empty', async () => {
    await create();
    const labelText = el.shadowRoot!.querySelector('.label-text');
    expect(labelText).toBeNull();
  });
});
