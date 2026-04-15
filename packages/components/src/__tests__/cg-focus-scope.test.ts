import { describe, it, expect, afterEach } from 'vitest';
import { CgFocusScope } from '../components/cg-focus-scope/cg-focus-scope.js';

if (!customElements.get('cg-focus-scope')) {
  customElements.define('cg-focus-scope', CgFocusScope);
}

describe('cg-focus-scope', () => {
  let el: CgFocusScope;

  async function create(props?: Partial<CgFocusScope>): Promise<CgFocusScope> {
    el = document.createElement('cg-focus-scope') as CgFocusScope;
    if (props) for (const [k, v] of Object.entries(props)) (el as any)[k] = v;
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => el?.remove());

  it('renders with shadow DOM', async () => {
    await create();
    expect(el.shadowRoot).toBeDefined();
  });

  it('is inactive by default', async () => {
    await create();
    expect(el.active).toBe(false);
    expect(el.hasAttribute('active')).toBe(false);
  });

  it('reflects active attribute', async () => {
    await create({ active: true });
    expect(el.hasAttribute('active')).toBe(true);
  });

  it('default loop is true', async () => {
    await create();
    expect(el.loop).toBe(true);
  });

  it('default return-focus is true', async () => {
    await create();
    expect(el.returnFocus).toBe(true);
  });

  it('renders slot', async () => {
    await create();
    expect(el.shadowRoot!.querySelector('slot')).not.toBeNull();
  });
});
