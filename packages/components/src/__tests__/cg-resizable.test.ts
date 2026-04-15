import { describe, it, expect, afterEach } from 'vitest';
import { CgResizable } from '../components/cg-resizable/cg-resizable.js';

if (!customElements.get('cg-resizable')) {
  customElements.define('cg-resizable', CgResizable);
}

describe('cg-resizable', () => {
  let el: CgResizable;

  async function create(props?: Partial<CgResizable>): Promise<CgResizable> {
    el = document.createElement('cg-resizable') as CgResizable;
    if (props) for (const [k, v] of Object.entries(props)) (el as any)[k] = v;
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => el?.remove());

  it('renders with shadow DOM', async () => {
    await create();
    expect(el.shadowRoot).toBeDefined();
    expect(el.shadowRoot!.querySelector('.handle')).not.toBeNull();
  });

  it('default direction is horizontal', async () => {
    await create();
    expect(el.direction).toBe('horizontal');
    expect(el.getAttribute('direction')).toBe('horizontal');
  });

  it('default defaultSize is 0.5', async () => {
    await create();
    expect(el.defaultSize).toBe(0.5);
  });

  it('handle has role separator', async () => {
    await create();
    const handle = el.shadowRoot!.querySelector('.handle')!;
    expect(handle.getAttribute('role')).toBe('separator');
  });

  it('aria-orientation reflects direction', async () => {
    await create({ direction: 'vertical' });
    const handle = el.shadowRoot!.querySelector('.handle')!;
    expect(handle.getAttribute('aria-orientation')).toBe('horizontal');
  });

  it('dispatches cg-resize on keyboard nav', async () => {
    await create();
    let detail: any = null;
    el.addEventListener('cg-resize', (e: Event) => { detail = (e as CustomEvent).detail; });
    const handle = el.shadowRoot!.querySelector<HTMLElement>('.handle')!;
    handle.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    await el.updateComplete;
    expect(detail?.size).toBeCloseTo(0.55);
  });

  it('Home key snaps to min', async () => {
    await create({ min: 0.2 });
    let detail: any = null;
    el.addEventListener('cg-resize', (e: Event) => { detail = (e as CustomEvent).detail; });
    const handle = el.shadowRoot!.querySelector<HTMLElement>('.handle')!;
    handle.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
    await el.updateComplete;
    expect(detail?.size).toBeCloseTo(0.2);
  });
});
