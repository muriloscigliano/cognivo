import { describe, it, expect, afterEach } from 'vitest';
import { CgDatePicker } from '../components/cg-date-picker/cg-date-picker.js';

if (!customElements.get('cg-date-picker')) {
  customElements.define('cg-date-picker', CgDatePicker);
}

describe('cg-date-picker', () => {
  let el: CgDatePicker;

  async function create(props?: Partial<CgDatePicker>): Promise<CgDatePicker> {
    el = document.createElement('cg-date-picker') as CgDatePicker;
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

  it('renders a date input', async () => {
    await create();
    const input = el.shadowRoot!.querySelector('input[type="date"]');
    expect(input).not.toBeNull();
  });

  it('accepts min date', async () => {
    await create({ min: '2025-01-01' });
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.getAttribute('min')).toBe('2025-01-01');
  });

  it('accepts max date', async () => {
    await create({ max: '2025-12-31' });
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.getAttribute('max')).toBe('2025-12-31');
  });

  it('disabled state disables the input', async () => {
    await create({ disabled: true });
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.disabled).toBe(true);
  });

  it('error attribute reflects', async () => {
    await create({ error: true });
    expect(el.hasAttribute('error')).toBe(true);
  });

  it('sets aria-invalid when error', async () => {
    await create({ error: true });
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.getAttribute('aria-invalid')).toBe('true');
  });

  it('default rounded is lg', async () => {
    await create();
    expect(el.rounded).toBe('lg');
    expect(el.getAttribute('rounded')).toBe('lg');
  });

  it('rounded attribute reflects', async () => {
    await create({ rounded: 'sm' });
    expect(el.getAttribute('rounded')).toBe('sm');
  });
});
