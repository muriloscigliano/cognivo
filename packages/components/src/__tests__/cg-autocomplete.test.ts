import { describe, it, expect, afterEach } from 'vitest';
import { CgAutocomplete, type AutocompleteOption } from '../components/cg-autocomplete/cg-autocomplete.js';

if (!customElements.get('cg-autocomplete')) {
  customElements.define('cg-autocomplete', CgAutocomplete);
}

const sampleOptions: AutocompleteOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
];

describe('cg-autocomplete', () => {
  let el: CgAutocomplete;

  async function create(props?: Partial<CgAutocomplete>): Promise<CgAutocomplete> {
    el = document.createElement('cg-autocomplete') as CgAutocomplete;
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
  });

  it('renders an input element', async () => {
    await create();
    const input = el.shadowRoot!.querySelector('input');
    expect(input).not.toBeNull();
  });

  it('accepts options array', async () => {
    await create({ options: sampleOptions });
    expect(el.options).toHaveLength(4);
    expect(el.options[0]!.label).toBe('Apple');
  });

  it('displays placeholder text', async () => {
    await create({ placeholder: 'Search fruits...' });
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.getAttribute('placeholder')).toBe('Search fruits...');
  });

  it('displays label when set', async () => {
    await create({ label: 'Pick a fruit' });
    const label = el.shadowRoot!.querySelector('.label');
    expect(label).not.toBeNull();
    expect(label!.textContent).toBe('Pick a fruit');
  });

  it('input has combobox role', async () => {
    await create();
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.getAttribute('role')).toBe('combobox');
  });

  it('disabled state disables the input', async () => {
    await create({ disabled: true });
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.disabled).toBe(true);
  });

  it('default rounded is lg', async () => {
    await create();
    expect(el.rounded).toBe('lg');
    expect(el.getAttribute('rounded')).toBe('lg');
  });

  it('rounded attribute reflects', async () => {
    await create({ rounded: 'full' });
    expect(el.getAttribute('rounded')).toBe('full');
  });
});
