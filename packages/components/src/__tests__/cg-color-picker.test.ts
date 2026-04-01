import { describe, it, expect, afterEach } from 'vitest';
import { CgColorPicker } from '../components/cg-color-picker/cg-color-picker.js';

if (!customElements.get('cg-color-picker')) {
  customElements.define('cg-color-picker', CgColorPicker);
}

describe('cg-color-picker', () => {
  let el: CgColorPicker;

  async function create(props?: Partial<CgColorPicker>): Promise<CgColorPicker> {
    el = document.createElement('cg-color-picker') as CgColorPicker;
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
  });

  it('renders swatch grid', async () => {
    await create();
    const grid = el.shadowRoot!.querySelector('.grid');
    expect(grid).not.toBeNull();
  });

  it('renders default color swatches', async () => {
    await create();
    const swatches = el.shadowRoot!.querySelectorAll('.swatch');
    expect(swatches.length).toBeGreaterThan(0);
  });

  it('accepts custom colors array', async () => {
    await create({ colors: ['#ff0000', '#00ff00', '#0000ff'] });
    const swatches = el.shadowRoot!.querySelectorAll('.swatch');
    expect(swatches.length).toBe(3);
  });

  it('marks selected swatch', async () => {
    await create({ colors: ['#ff0000', '#00ff00'], value: '#ff0000' });
    const selected = el.shadowRoot!.querySelectorAll('.swatch.selected');
    expect(selected.length).toBe(1);
  });

  it('displays label when set', async () => {
    await create({ label: 'Theme color' });
    const label = el.shadowRoot!.querySelector('.label');
    expect(label).not.toBeNull();
    expect(label!.textContent).toBe('Theme color');
  });

  it('has radiogroup role', async () => {
    await create();
    const group = el.shadowRoot!.querySelector('[role="radiogroup"]');
    expect(group).not.toBeNull();
  });

  it('swatches have radio role', async () => {
    await create({ colors: ['#ff0000'] });
    const swatch = el.shadowRoot!.querySelector('.swatch');
    expect(swatch!.getAttribute('role')).toBe('radio');
  });

  it('shows hex input when allowCustom is true', async () => {
    await create({ allowCustom: true });
    const input = el.shadowRoot!.querySelector('.hex-input');
    expect(input).not.toBeNull();
  });

  it('hides hex input by default', async () => {
    await create();
    const input = el.shadowRoot!.querySelector('.hex-input');
    expect(input).toBeNull();
  });
});
