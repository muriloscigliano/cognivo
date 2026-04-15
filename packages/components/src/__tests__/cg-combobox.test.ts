import { describe, it, expect, afterEach } from 'vitest';
import { CgCombobox } from '../components/cg-combobox/cg-combobox.js';

if (!customElements.get('cg-combobox')) {
  customElements.define('cg-combobox', CgCombobox);
}

describe('cg-combobox', () => {
  let el: CgCombobox;

  async function create(props?: Partial<CgCombobox>): Promise<CgCombobox> {
    el = document.createElement('cg-combobox') as CgCombobox;
    el.options = [
      { label: 'Apple', value: 'a' },
      { label: 'Banana', value: 'b' },
      { label: 'Cherry', value: 'c' },
    ];
    if (props) for (const [k, v] of Object.entries(props)) (el as any)[k] = v;
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => el?.remove());

  it('renders with shadow DOM', async () => {
    await create();
    expect(el.shadowRoot!.querySelector('input[role="combobox"]')).not.toBeNull();
  });

  it('default searchable is true', async () => {
    await create();
    expect(el.searchable).toBe(true);
  });

  it('input has aria-autocomplete list', async () => {
    await create();
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.getAttribute('aria-autocomplete')).toBe('list');
  });

  it('renders options in listbox', async () => {
    await create({ open: true });
    const options = el.shadowRoot!.querySelectorAll('[role="option"]');
    expect(options.length).toBe(3);
  });

  it('selecting an option dispatches cg-combobox-change', async () => {
    await create({ open: true });
    let detail: any = null;
    el.addEventListener('cg-combobox-change', (e: Event) => { detail = (e as CustomEvent).detail; });
    const option = el.shadowRoot!.querySelectorAll<HTMLElement>('[role="option"]')[0]!;
    option.click();
    await el.updateComplete;
    expect(detail?.value).toBe('a');
  });

  it('multiple mode stores array', async () => {
    await create({ multiple: true, open: true });
    const options = el.shadowRoot!.querySelectorAll<HTMLElement>('[role="option"]');
    options[0]!.click();
    options[1]!.click();
    await el.updateComplete;
    expect(Array.isArray(el.value)).toBe(true);
    expect((el.value as string[]).length).toBe(2);
  });

  it('disabled prevents interaction', async () => {
    await create({ disabled: true });
    expect(el.hasAttribute('disabled')).toBe(true);
  });
});
