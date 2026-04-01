import { describe, it, expect, afterEach } from 'vitest';
import { CgNumberInput } from '../components/cg-number-input/cg-number-input.js';

if (!customElements.get('cg-number-input')) {
  customElements.define('cg-number-input', CgNumberInput);
}

describe('cg-number-input', () => {
  let el: CgNumberInput;

  async function create(props?: Partial<CgNumberInput>): Promise<CgNumberInput> {
    el = document.createElement('cg-number-input') as CgNumberInput;
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
    expect(el.shadowRoot!.querySelector('.wrapper')).not.toBeNull();
  });

  it('default value is 0', async () => {
    await create();
    expect(el.value).toBe(0);
  });

  it('renders with initial value', async () => {
    await create({ value: 42 });
    const input = el.shadowRoot!.querySelector('input') as HTMLInputElement;
    expect(input.value).toBe('42');
  });

  it('renders increment and decrement buttons', async () => {
    await create();
    const buttons = el.shadowRoot!.querySelectorAll('.btn');
    expect(buttons.length).toBe(2);
  });

  it('respects min boundary', async () => {
    await create({ value: 0, min: 0 });
    const decBtn = el.shadowRoot!.querySelectorAll('.btn')[0] as HTMLButtonElement;
    expect(decBtn.disabled).toBe(true);
  });

  it('respects max boundary', async () => {
    await create({ value: 10, max: 10 });
    const incBtn = el.shadowRoot!.querySelectorAll('.btn')[1] as HTMLButtonElement;
    expect(incBtn.disabled).toBe(true);
  });

  it('has spinbutton role', async () => {
    await create({ value: 5 });
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.getAttribute('role')).toBe('spinbutton');
    expect(input.getAttribute('aria-valuenow')).toBe('5');
  });

  it('default size is md', async () => {
    await create();
    expect(el.size).toBe('md');
  });

  it('renders label when provided', async () => {
    await create({ label: 'Quantity' });
    const label = el.shadowRoot!.querySelector('.label');
    expect(label).not.toBeNull();
    expect(label!.textContent).toContain('Quantity');
  });

  it('disabled state disables buttons and input', async () => {
    await create({ disabled: true });
    const buttons = el.shadowRoot!.querySelectorAll('.btn') as NodeListOf<HTMLButtonElement>;
    expect(buttons[0].disabled).toBe(true);
    expect(buttons[1].disabled).toBe(true);
    const input = el.shadowRoot!.querySelector('input') as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });
});
