import { describe, it, expect, afterEach } from 'vitest';
import { CgTreeView } from '../components/cg-tree-view/cg-tree-view.js';

if (!customElements.get('cg-tree-view')) {
  customElements.define('cg-tree-view', CgTreeView);
}

describe('cg-tree-view', () => {
  let el: CgTreeView;

  async function create(props?: Partial<CgTreeView>): Promise<CgTreeView> {
    el = document.createElement('cg-tree-view') as CgTreeView;
    el.items = [
      { label: 'Root', value: 'r', children: [{ label: 'Child', value: 'c' }] },
      { label: 'Sibling', value: 's' },
    ];
    if (props) for (const [k, v] of Object.entries(props)) (el as any)[k] = v;
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => el?.remove());

  it('renders with shadow DOM', async () => {
    await create();
    expect(el.shadowRoot!.querySelector('[role="tree"]')).not.toBeNull();
  });

  it('shows top-level items', async () => {
    await create();
    const items = el.shadowRoot!.querySelectorAll('[role="treeitem"]');
    expect(items.length).toBe(2);
  });

  it('default multiple is false', async () => {
    await create();
    expect(el.multiple).toBe(false);
  });

  it('aria-multiselectable reflects multiple', async () => {
    await create({ multiple: true });
    const tree = el.shadowRoot!.querySelector('[role="tree"]')!;
    expect(tree.getAttribute('aria-multiselectable')).toBe('true');
  });

  it('dispatches cg-tree-select on click', async () => {
    await create();
    let detail: any = null;
    el.addEventListener('cg-tree-select', (e: Event) => { detail = (e as CustomEvent).detail; });
    const node = el.shadowRoot!.querySelector<HTMLElement>('[data-path="1"]')!;
    node.click();
    await el.updateComplete;
    expect(detail?.value).toBe('s');
  });

  it('dispatches cg-tree-expand when toggling parent', async () => {
    await create();
    let fired = false;
    el.addEventListener('cg-tree-expand', () => { fired = true; });
    const node = el.shadowRoot!.querySelector<HTMLElement>('[data-path="0"]')!;
    node.click();
    await el.updateComplete;
    expect(fired).toBe(true);
  });

  it('has correct aria-level', async () => {
    await create();
    const root = el.shadowRoot!.querySelector<HTMLElement>('[data-path="0"]')!;
    expect(root.getAttribute('aria-level')).toBe('1');
  });
});
