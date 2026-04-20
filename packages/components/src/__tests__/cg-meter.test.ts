import { describe, it, expect, afterEach } from 'vitest';
import { CgMeter } from '../components/cg-meter/cg-meter.js';

if (!customElements.get('cg-meter')) {
  customElements.define('cg-meter', CgMeter);
}

describe('cg-meter', () => {
  let el: CgMeter;

  async function create(props?: Partial<CgMeter>): Promise<CgMeter> {
    el = document.createElement('cg-meter') as CgMeter;
    if (props) for (const [k, v] of Object.entries(props)) (el as any)[k] = v;
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => el?.remove());

  it('renders with shadow DOM', async () => {
    await create({ value: 50 });
    expect(el.shadowRoot).toBeDefined();
    expect(el.shadowRoot!.querySelector('.track')).not.toBeNull();
  });

  it('track has role=meter with aria-value* attrs', async () => {
    await create({ value: 42, min: 0, max: 100 });
    const track = el.shadowRoot!.querySelector('.track')!;
    expect(track.getAttribute('role')).toBe('meter');
    expect(track.getAttribute('aria-valuenow')).toBe('42');
    expect(track.getAttribute('aria-valuemin')).toBe('0');
    expect(track.getAttribute('aria-valuemax')).toBe('100');
  });

  it('default variant is linear', async () => {
    await create({ value: 30 });
    expect(el.variant).toBe('linear');
    expect(el.shadowRoot!.querySelector('.track')).not.toBeNull();
    expect(el.shadowRoot!.querySelector('.circular')).toBeNull();
  });

  it('circular variant renders svg', async () => {
    await create({ variant: 'circular', value: 60 });
    expect(el.shadowRoot!.querySelector('.circular')).not.toBeNull();
    expect(el.shadowRoot!.querySelector('svg')).not.toBeNull();
  });

  it('fill width percent scales to max', async () => {
    await create({ value: 25, max: 100 });
    const fill = el.shadowRoot!.querySelector('.fill') as HTMLElement;
    expect(fill.style.width).toBe('25%');
  });

  it('value in safe zone (between low and high with optimum inside) renders ok', async () => {
    await create({ value: 50, low: 20, high: 80, optimum: 50 });
    expect(el.shadowRoot!.querySelector('.fill.ok')).not.toBeNull();
  });

  it('value outside range with opposite optimum renders bad', async () => {
    await create({ value: 10, low: 20, high: 80, optimum: 90 });
    expect(el.shadowRoot!.querySelector('.fill.bad')).not.toBeNull();
  });

  it('shows value text when show-value is true', async () => {
    await create({ value: 75, showValue: true, label: 'CPU' });
    const txt = el.shadowRoot!.querySelector('.value-text');
    expect(txt?.textContent).toContain('75');
  });

  it('renders label when provided', async () => {
    await create({ value: 10, label: 'Disk' });
    expect(el.shadowRoot!.querySelector('.label')?.textContent).toBe('Disk');
  });
});
