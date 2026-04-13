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

  it('renders a calendar trigger', async () => {
    await create();
    const trigger = el.shadowRoot!.querySelector('.trigger[role="combobox"]');
    expect(trigger).not.toBeNull();
  });

  it('accepts min date', async () => {
    await create({ min: '2025-01-01' });
    expect(el.min).toBe('2025-01-01');
  });

  it('accepts max date', async () => {
    await create({ max: '2025-12-31' });
    expect(el.max).toBe('2025-12-31');
  });

  it('disabled state disables the trigger', async () => {
    await create({ disabled: true });
    const trigger = el.shadowRoot!.querySelector('.trigger')!;
    expect(trigger.classList.contains('disabled')).toBe(true);
    expect(trigger.getAttribute('tabindex')).toBe('-1');
  });

  it('error attribute reflects', async () => {
    await create({ error: true });
    expect(el.hasAttribute('error')).toBe(true);
  });

  it('sets error border style when error', async () => {
    await create({ error: true });
    expect(el.hasAttribute('error')).toBe(true);
    const trigger = el.shadowRoot!.querySelector('.trigger');
    expect(trigger).not.toBeNull();
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
