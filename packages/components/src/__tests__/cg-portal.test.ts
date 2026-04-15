import { describe, it, expect, afterEach } from 'vitest';
import { CgPortal } from '../components/cg-portal/cg-portal.js';

if (!customElements.get('cg-portal')) {
  customElements.define('cg-portal', CgPortal);
}

describe('cg-portal', () => {
  let el: CgPortal;

  async function create(props?: Partial<CgPortal>): Promise<CgPortal> {
    el = document.createElement('cg-portal') as CgPortal;
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

  it('default target is empty (body)', async () => {
    await create();
    expect(el.target).toBe('');
  });

  it('disabled does not move children', async () => {
    await create({ disabled: true });
    const child = document.createElement('span');
    child.id = 'inside';
    el.appendChild(child);
    await el.updateComplete;
    expect(el.contains(child)).toBe(true);
  });

  it('moves slotted children on connect', async () => {
    el = document.createElement('cg-portal') as CgPortal;
    const child = document.createElement('div');
    child.id = 'teleported';
    el.appendChild(child);
    document.body.appendChild(el);
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(document.getElementById('teleported')?.parentElement).toBe(document.body);
  });
});
