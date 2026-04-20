import { describe, it, expect, afterEach } from 'vitest';
import { CgEmptyState } from '../components/cg-empty-state/cg-empty-state.js';

if (!customElements.get('cg-empty-state')) {
  customElements.define('cg-empty-state', CgEmptyState);
}

describe('cg-empty-state', () => {
  let el: CgEmptyState;

  async function create(props?: Partial<CgEmptyState>): Promise<CgEmptyState> {
    el = document.createElement('cg-empty-state') as CgEmptyState;
    if (props) for (const [k, v] of Object.entries(props)) (el as any)[k] = v;
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => el?.remove());

  it('renders with shadow DOM', async () => {
    await create();
    expect(el.shadowRoot).toBeDefined();
    expect(el.shadowRoot!.querySelector('.root')).not.toBeNull();
  });

  it('default variant is default and role=status', async () => {
    await create();
    expect(el.variant).toBe('default');
    const root = el.shadowRoot!.querySelector('.root')!;
    expect(root.getAttribute('role')).toBe('status');
  });

  it('error variant uses role=alert', async () => {
    await create({ variant: 'error' });
    const root = el.shadowRoot!.querySelector('.root')!;
    expect(root.getAttribute('role')).toBe('alert');
  });

  it('renders title and description', async () => {
    await create({ title: 'No results', description: 'Try again' });
    expect(el.shadowRoot!.querySelector('.title')?.textContent).toBe('No results');
    expect(el.shadowRoot!.querySelector('.description')?.textContent).toBe('Try again');
  });

  it('omits title/description nodes when empty', async () => {
    await create();
    expect(el.shadowRoot!.querySelector('.title')).toBeNull();
    expect(el.shadowRoot!.querySelector('.description')).toBeNull();
  });

  it('variant reflects to attribute', async () => {
    await create({ variant: 'search' });
    expect(el.getAttribute('variant')).toBe('search');
  });

  it('renders default svg icon', async () => {
    await create();
    const svg = el.shadowRoot!.querySelector('.icon-wrap svg');
    expect(svg).not.toBeNull();
  });

  it('has icon, default, and actions slots', async () => {
    await create();
    expect(el.shadowRoot!.querySelector('slot[name="icon"]')).not.toBeNull();
    expect(el.shadowRoot!.querySelector('slot:not([name])')).not.toBeNull();
    expect(el.shadowRoot!.querySelector('slot[name="actions"]')).not.toBeNull();
  });
});
