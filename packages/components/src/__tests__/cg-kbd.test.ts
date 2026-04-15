import { describe, it, expect, afterEach } from 'vitest';
import { CgKbd } from '../components/cg-kbd/cg-kbd.js';

if (!customElements.get('cg-kbd')) {
  customElements.define('cg-kbd', CgKbd);
}

describe('cg-kbd', () => {
  let el: CgKbd;

  async function create(props?: Partial<CgKbd>): Promise<CgKbd> {
    el = document.createElement('cg-kbd') as CgKbd;
    if (props) for (const [k, v] of Object.entries(props)) (el as any)[k] = v;
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => el?.remove());

  it('renders with shadow DOM', async () => {
    await create();
    expect(el.shadowRoot).toBeDefined();
    expect(el.shadowRoot!.querySelector('kbd')).not.toBeNull();
  });

  it('default size is md', async () => {
    await create();
    expect(el.size).toBe('md');
  });

  it('size reflects to attribute', async () => {
    await create({ size: 'lg' });
    expect(el.getAttribute('size')).toBe('lg');
  });

  it('variant reflects to attribute', async () => {
    await create({ variant: 'outline' });
    expect(el.getAttribute('variant')).toBe('outline');
  });

  it('renders a single kbd with slot when no keys', async () => {
    await create();
    const kbds = el.shadowRoot!.querySelectorAll('kbd');
    expect(kbds.length).toBe(1);
    expect(kbds[0]!.querySelector('slot')).not.toBeNull();
  });

  it('splits keys prop on comma', async () => {
    await create({ keys: 'Shift,Cmd,P' });
    const kbds = el.shadowRoot!.querySelectorAll('kbd');
    expect(kbds.length).toBe(3);
  });

  it('renders + separators between keys', async () => {
    await create({ keys: 'Shift,Cmd' });
    const plus = el.shadowRoot!.querySelectorAll('.plus');
    expect(plus.length).toBe(1);
  });

  it('renders single key without separator', async () => {
    await create({ keys: 'Esc' });
    const plus = el.shadowRoot!.querySelectorAll('.plus');
    expect(plus.length).toBe(0);
    const kbd = el.shadowRoot!.querySelector('kbd')!;
    expect(kbd.textContent).toBe('Esc');
  });
});
