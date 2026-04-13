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

  it('renders color area', async () => {
    await create();
    const area = el.shadowRoot!.querySelector('.color-area');
    expect(area).not.toBeNull();
  });

  it('renders default preset swatches', async () => {
    await create();
    const presets = el.shadowRoot!.querySelectorAll('.preset');
    expect(presets.length).toBeGreaterThan(0);
  });

  it('accepts custom colors array', async () => {
    await create({ colors: ['#ff0000', '#00ff00', '#0000ff'] });
    const presets = el.shadowRoot!.querySelectorAll('.preset');
    expect(presets.length).toBe(3);
  });

  it('marks selected preset', async () => {
    await create({ colors: ['#ff0000', '#00ff00'], value: '#ff0000' });
    const selected = el.shadowRoot!.querySelectorAll('.preset.active');
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

  it('presets have radio role', async () => {
    await create({ colors: ['#ff0000'] });
    const preset = el.shadowRoot!.querySelector('.preset');
    expect(preset!.getAttribute('role')).toBe('radio');
  });

  it('renders hex input in dropdown', async () => {
    await create();
    const input = el.shadowRoot!.querySelector('.hex-input');
    expect(input).not.toBeNull();
  });

  it('renders hue slider', async () => {
    await create();
    const hueTrack = el.shadowRoot!.querySelector('.hue-track');
    expect(hueTrack).not.toBeNull();
  });
});
