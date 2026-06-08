import { describe, it, expect, afterEach } from 'vitest';
import { CgAspectRatio } from '../components/cg-aspect-ratio/cg-aspect-ratio.js';

if (!customElements.get('cg-aspect-ratio')) {
  customElements.define('cg-aspect-ratio', CgAspectRatio);
}

describe('cg-aspect-ratio', () => {
  let el: CgAspectRatio;

  async function create(props?: Partial<CgAspectRatio>): Promise<CgAspectRatio> {
    el = document.createElement('cg-aspect-ratio') as CgAspectRatio;
    if (props) for (const [k, v] of Object.entries(props)) (el as any)[k] = v;
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => el?.remove());

  it('renders with shadow DOM', async () => {
    await create();
    expect(el.shadowRoot).toBeDefined();
    expect(el.shadowRoot!.querySelector('.wrap')).not.toBeNull();
  });

  it('default ratio is 16/9', async () => {
    await create();
    expect(el.ratio).toBe('16/9');
  });

  it('renders slot', async () => {
    await create();
    expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
  });

  it('sets --_aspect-ratio from ratio prop', async () => {
    await create({ ratio: '4/3' });
    const wrap = el.shadowRoot!.querySelector('.wrap') as HTMLElement;
    const style = wrap.getAttribute('style') || '';
    expect(style).toContain('--_aspect-ratio');
    expect(style).toContain('4 / 3');
  });

  it('normalizes ratio with spaces', async () => {
    await create({ ratio: '1/1' });
    const wrap = el.shadowRoot!.querySelector('.wrap') as HTMLElement;
    const style = wrap.getAttribute('style') || '';
    expect(style).toContain('1 / 1');
  });

  it('falls back to 16 / 9 for invalid ratio input', async () => {
    await create({ ratio: 'garbage; background:red' });
    const wrap = el.shadowRoot!.querySelector('.wrap') as HTMLElement;
    const style = wrap.getAttribute('style') || '';
    expect(style).toContain('16 / 9');
    // CSS injection must not leak through styleMap.
    expect(style).not.toContain('background:red');
  });

  it('updates wrap when ratio changes', async () => {
    await create({ ratio: '16/9' });
    el.ratio = '21/9';
    await el.updateComplete;
    const wrap = el.shadowRoot!.querySelector('.wrap') as HTMLElement;
    expect(wrap.getAttribute('style') || '').toContain('21 / 9');
  });
});
