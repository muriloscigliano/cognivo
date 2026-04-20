import { describe, it, expect, afterEach } from 'vitest';
import { CgDateRangePicker } from '../components/cg-date-range-picker/cg-date-range-picker.js';
// Ensure cg-calendar is registered as it's used inside the dropdown
import '../components/cg-calendar/cg-calendar.js';

if (!customElements.get('cg-date-range-picker')) {
  customElements.define('cg-date-range-picker', CgDateRangePicker);
}

describe('cg-date-range-picker', () => {
  let el: CgDateRangePicker;

  async function create(props?: Partial<CgDateRangePicker>): Promise<CgDateRangePicker> {
    el = document.createElement('cg-date-range-picker') as CgDateRangePicker;
    if (props) for (const [k, v] of Object.entries(props)) (el as any)[k] = v;
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => el?.remove());

  it('renders with shadow DOM', async () => {
    await create();
    expect(el.shadowRoot).toBeDefined();
    expect(el.shadowRoot!.querySelector('.trigger')).not.toBeNull();
  });

  it('trigger has role=combobox with aria-haspopup=dialog', async () => {
    await create();
    const trig = el.shadowRoot!.querySelector('.trigger')!;
    expect(trig.getAttribute('role')).toBe('combobox');
    expect(trig.getAttribute('aria-haspopup')).toBe('dialog');
    expect(trig.getAttribute('aria-expanded')).toBe('false');
  });

  it('click trigger opens the dropdown', async () => {
    await create();
    (el.shadowRoot!.querySelector('.trigger') as HTMLElement).click();
    await el.updateComplete;
    expect(el.open).toBe(true);
    expect(el.hasAttribute('open')).toBe(true);
  });

  it('shows placeholder when no from date', async () => {
    await create({ placeholder: 'Pick range' });
    const seg = el.shadowRoot!.querySelector('.segment.empty');
    expect(seg?.textContent).toContain('Pick range');
  });

  it('formats from and to display', async () => {
    await create({ from: '2026-04-01', to: '2026-04-10' });
    const segs = el.shadowRoot!.querySelectorAll('.segment');
    expect(segs[0]!.textContent).toContain('2026');
    expect(segs[1]!.textContent).toContain('2026');
  });

  it('renders embedded cg-calendar in range mode', async () => {
    await create();
    const cal = el.shadowRoot!.querySelector('cg-calendar');
    expect(cal).not.toBeNull();
    expect(cal!.getAttribute('mode')).toBe('range');
  });

  it('dispatches cg-date-range-change when both dates picked', async () => {
    await create();
    let detail: any = null;
    el.addEventListener('cg-date-range-change', (e) => {
      detail = (e as CustomEvent).detail;
    });
    const cal = el.shadowRoot!.querySelector('cg-calendar')!;
    cal.dispatchEvent(new CustomEvent('cg-calendar-change', {
      detail: { value: '2026-04-01', rangeEnd: '2026-04-10' },
      bubbles: true,
      composed: true,
    }));
    await el.updateComplete;
    expect(detail).toEqual({ from: '2026-04-01', to: '2026-04-10' });
    expect(el.from).toBe('2026-04-01');
    expect(el.to).toBe('2026-04-10');
  });

  it('disabled trigger does not open on click', async () => {
    await create({ disabled: true });
    (el.shadowRoot!.querySelector('.trigger') as HTMLElement).click();
    await el.updateComplete;
    expect(el.open).toBe(false);
  });

  it('is form-associated', () => {
    expect(CgDateRangePicker.formAssociated).toBe(true);
  });
});
