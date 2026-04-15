import { describe, it, expect, afterEach } from 'vitest';
import { CgTagInput } from '../components/cg-tag-input/cg-tag-input.js';

if (!customElements.get('cg-tag-input')) {
  customElements.define('cg-tag-input', CgTagInput);
}

describe('cg-tag-input', () => {
  let el: CgTagInput;

  async function create(props?: Partial<CgTagInput>): Promise<CgTagInput> {
    el = document.createElement('cg-tag-input') as CgTagInput;
    if (props) for (const [k, v] of Object.entries(props)) (el as any)[k] = v;
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => el?.remove());

  it('renders with shadow DOM', async () => {
    await create();
    expect(el.shadowRoot).toBeDefined();
    expect(el.shadowRoot!.querySelector('.container')).not.toBeNull();
  });

  it('renders existing tags', async () => {
    await create({ value: ['alpha', 'beta'] });
    const tags = el.shadowRoot!.querySelectorAll('.tag');
    expect(tags.length).toBe(2);
  });

  it('renders label when set', async () => {
    await create({ label: 'Tags' });
    const l = el.shadowRoot!.querySelector('label')!;
    expect(l.textContent).toBe('Tags');
  });

  it('Enter adds tag and dispatches cg-tag-add', async () => {
    await create();
    let detail: any = null;
    el.addEventListener('cg-tag-add', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);
    const input = el.shadowRoot!.querySelector('input')!;
    input.value = 'new';
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await el.updateComplete;
    expect(detail.tag).toBe('new');
    expect(el.value).toContain('new');
  });

  it('prevents duplicate tags by default', async () => {
    await create({ value: ['alpha'] });
    const input = el.shadowRoot!.querySelector('input')!;
    input.value = 'alpha';
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await el.updateComplete;
    expect(el.value.length).toBe(1);
  });

  it('remove button dispatches cg-tag-remove', async () => {
    await create({ value: ['alpha'] });
    let detail: any = null;
    el.addEventListener('cg-tag-remove', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);
    const btn = el.shadowRoot!.querySelector<HTMLButtonElement>('.tag-remove')!;
    btn.click();
    await el.updateComplete;
    expect(detail.tag).toBe('alpha');
    expect(el.value.length).toBe(0);
  });

  it('disabled reflects to attribute', async () => {
    await create({ disabled: true });
    expect(el.hasAttribute('disabled')).toBe(true);
  });

  it('respects max tag limit', async () => {
    await create({ value: ['a', 'b'], max: 2 });
    const input = el.shadowRoot!.querySelector('input')!;
    input.value = 'c';
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await el.updateComplete;
    expect(el.value.length).toBe(2);
  });

  it('is form-associated', () => {
    expect((CgTagInput as any).formAssociated).toBe(true);
  });
});
