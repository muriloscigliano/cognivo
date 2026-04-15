import { describe, it, expect, afterEach } from 'vitest';
import { CgScrollArea } from '../components/cg-scroll-area/cg-scroll-area.js';

if (!customElements.get('cg-scroll-area')) {
  customElements.define('cg-scroll-area', CgScrollArea);
}

describe('cg-scroll-area', () => {
  let el: CgScrollArea;

  async function create(props?: Partial<CgScrollArea>): Promise<CgScrollArea> {
    el = document.createElement('cg-scroll-area') as CgScrollArea;
    if (props) for (const [k, v] of Object.entries(props)) (el as any)[k] = v;
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => el?.remove());

  it('renders with shadow DOM', async () => {
    await create();
    expect(el.shadowRoot).toBeDefined();
    expect(el.shadowRoot!.querySelector('.viewport')).not.toBeNull();
  });

  it('default orientation is vertical', async () => {
    await create();
    expect(el.orientation).toBe('vertical');
  });

  it('default type is hover', async () => {
    await create();
    expect(el.type).toBe('hover');
  });

  it('orientation reflects to attribute', async () => {
    await create({ orientation: 'horizontal' });
    expect(el.getAttribute('orientation')).toBe('horizontal');
  });

  it('type reflects to attribute', async () => {
    await create({ type: 'always' });
    expect(el.getAttribute('type')).toBe('always');
  });

  it('viewport is focusable', async () => {
    await create();
    const vp = el.shadowRoot!.querySelector('.viewport')!;
    expect(vp.getAttribute('tabindex')).toBe('0');
  });

  it('renders slot inside viewport', async () => {
    await create();
    const slot = el.shadowRoot!.querySelector('.viewport slot');
    expect(slot).not.toBeNull();
  });
});
