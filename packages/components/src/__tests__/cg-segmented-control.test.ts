import { describe, it, expect, afterEach } from 'vitest';
import { CgSegmentedControl } from '../components/cg-segmented-control/cg-segmented-control.js';

if (!customElements.get('cg-segmented-control')) {
  customElements.define('cg-segmented-control', CgSegmentedControl);
}

const OPTIONS = [
  { label: 'Day', value: 'day' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
];

describe('cg-segmented-control', () => {
  let el: CgSegmentedControl;

  async function create(props?: Partial<CgSegmentedControl>): Promise<CgSegmentedControl> {
    el = document.createElement('cg-segmented-control') as CgSegmentedControl;
    if (props) for (const [k, v] of Object.entries(props)) (el as any)[k] = v;
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => el?.remove());

  it('renders with shadow DOM', async () => {
    await create({ options: OPTIONS });
    expect(el.shadowRoot).toBeDefined();
    expect(el.shadowRoot!.querySelector('.track')).not.toBeNull();
  });

  it('track has role="radiogroup"', async () => {
    await create({ options: OPTIONS });
    const track = el.shadowRoot!.querySelector('.track')!;
    expect(track.getAttribute('role')).toBe('radiogroup');
  });

  it('renders a segment per option', async () => {
    await create({ options: OPTIONS });
    const segs = el.shadowRoot!.querySelectorAll('.segment');
    expect(segs.length).toBe(3);
  });

  it('each segment has role="radio"', async () => {
    await create({ options: OPTIONS });
    const seg = el.shadowRoot!.querySelector('.segment')!;
    expect(seg.getAttribute('role')).toBe('radio');
  });

  it('aria-checked reflects selected value', async () => {
    await create({ options: OPTIONS, value: 'week' });
    const segs = el.shadowRoot!.querySelectorAll('.segment');
    expect(segs[1]!.getAttribute('aria-checked')).toBe('true');
    expect(segs[0]!.getAttribute('aria-checked')).toBe('false');
  });

  it('click dispatches cg-segmented-change with value', async () => {
    await create({ options: OPTIONS, value: 'day' });
    let detail: any = null;
    el.addEventListener('cg-segmented-change', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);
    const segs = el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.segment');
    segs[2]!.click();
    await el.updateComplete;
    expect(detail.value).toBe('month');
    expect(el.value).toBe('month');
  });

  it('ArrowRight moves selection forward', async () => {
    await create({ options: OPTIONS, value: 'day' });
    const track = el.shadowRoot!.querySelector('.track') as HTMLElement;
    track.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    await el.updateComplete;
    expect(el.value).toBe('week');
  });

  it('ArrowLeft moves selection backward', async () => {
    await create({ options: OPTIONS, value: 'week' });
    const track = el.shadowRoot!.querySelector('.track') as HTMLElement;
    track.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    await el.updateComplete;
    expect(el.value).toBe('day');
  });

  it('disabled reflects to attribute', async () => {
    await create({ options: OPTIONS, disabled: true });
    expect(el.hasAttribute('disabled')).toBe(true);
  });

  it('full reflects to attribute', async () => {
    await create({ options: OPTIONS, full: true });
    expect(el.hasAttribute('full')).toBe(true);
  });

  it('size reflects to attribute', async () => {
    await create({ options: OPTIONS, size: 'lg' });
    expect(el.getAttribute('size')).toBe('lg');
  });
});
