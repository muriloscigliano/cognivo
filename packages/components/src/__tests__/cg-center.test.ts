import { describe, it, expect, afterEach } from 'vitest';
import { CgCenter } from '../components/cg-center/cg-center.js';

if (!customElements.get('cg-center')) {
  customElements.define('cg-center', CgCenter);
}

describe('cg-center', () => {
  let el: CgCenter;

  async function create(props?: Partial<CgCenter>): Promise<CgCenter> {
    el = document.createElement('cg-center') as CgCenter;
    if (props) for (const [k, v] of Object.entries(props)) (el as any)[k] = v;
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => el?.remove());

  it('renders a content wrapper with a slot', async () => {
    await create();
    const content = el.shadowRoot!.querySelector('.content');
    expect(content).not.toBeNull();
    expect(content!.querySelector('slot')).not.toBeNull();
  });

  it('reflects inline attribute', async () => {
    await create({ inline: true });
    expect(el.hasAttribute('inline')).toBe(true);
  });

  it('reflects full attribute', async () => {
    await create({ full: true });
    expect(el.hasAttribute('full')).toBe(true);
  });

  it('sets max-width custom property and reflects attribute', async () => {
    await create({ maxWidth: '640px' });
    expect(el.getAttribute('max-width')).toBe('640px');
    expect(el.style.getPropertyValue('--_cg-center-max')).toBe('640px');
  });

  it('defaults max-width property to none', async () => {
    await create();
    expect(el.style.getPropertyValue('--_cg-center-max')).toBe('none');
  });

  it('reflects gap attribute', async () => {
    await create({ gap: 'md' });
    expect(el.getAttribute('gap')).toBe('md');
  });
});
