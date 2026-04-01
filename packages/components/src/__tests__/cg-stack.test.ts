import { describe, it, expect, afterEach } from 'vitest';
import { CgStack } from '../components/cg-stack/cg-stack.js';

if (!customElements.get('cg-stack')) {
  customElements.define('cg-stack', CgStack);
}

describe('cg-stack', () => {
  let el: CgStack;

  async function create(props?: Partial<CgStack>): Promise<CgStack> {
    el = document.createElement('cg-stack') as CgStack;
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
    expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
  });

  it('default direction is column', async () => {
    await create();
    expect(el.direction).toBe('column');
    expect(el.getAttribute('direction')).toBe('column');
  });

  it('applies row direction', async () => {
    await create({ direction: 'row' });
    expect(el.getAttribute('direction')).toBe('row');
  });

  it('default gap is md', async () => {
    await create();
    expect(el.gap).toBe('md');
    expect(el.getAttribute('gap')).toBe('md');
  });

  it('applies gap attribute', async () => {
    await create({ gap: 'lg' });
    expect(el.getAttribute('gap')).toBe('lg');
  });

  it('default align is stretch', async () => {
    await create();
    expect(el.align).toBe('stretch');
  });

  it('applies align attribute', async () => {
    await create({ align: 'center' });
    expect(el.getAttribute('align')).toBe('center');
  });

  it('applies justify attribute', async () => {
    await create({ justify: 'between' });
    expect(el.getAttribute('justify')).toBe('between');
  });

  it('applies wrap attribute', async () => {
    await create({ wrap: true });
    expect(el.getAttribute('wrap')).not.toBeNull();
  });

  it('applies full attribute', async () => {
    await create({ full: true });
    expect(el.getAttribute('full')).not.toBeNull();
  });
});
