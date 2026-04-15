import { describe, it, expect, afterEach } from 'vitest';
import { CgCalendar } from '../components/cg-calendar/cg-calendar.js';

if (!customElements.get('cg-calendar')) {
  customElements.define('cg-calendar', CgCalendar);
}

describe('cg-calendar', () => {
  let el: CgCalendar;

  async function create(props?: Partial<CgCalendar>): Promise<CgCalendar> {
    el = document.createElement('cg-calendar') as CgCalendar;
    if (props) for (const [k, v] of Object.entries(props)) (el as any)[k] = v;
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => el?.remove());

  it('renders with shadow DOM', async () => {
    await create();
    expect(el.shadowRoot).toBeDefined();
    expect(el.shadowRoot!.querySelector('.calendar')).not.toBeNull();
  });

  it('calendar has role="grid"', async () => {
    await create();
    const c = el.shadowRoot!.querySelector('.calendar')!;
    expect(c.getAttribute('role')).toBe('grid');
  });

  it('default mode is single', async () => {
    await create();
    expect(el.mode).toBe('single');
  });

  it('renders prev and next month buttons', async () => {
    await create();
    const btns = el.shadowRoot!.querySelectorAll('.nav-btn');
    expect(btns.length).toBe(2);
  });

  it('renders 42 day cells (6 weeks)', async () => {
    await create({ value: '2026-04-15' });
    const days = el.shadowRoot!.querySelectorAll('.day');
    expect(days.length).toBe(42);
  });

  it('renders 7 weekday headers', async () => {
    await create();
    const wk = el.shadowRoot!.querySelectorAll('.weekday');
    expect(wk.length).toBe(7);
  });

  it('clicking a day dispatches cg-calendar-change', async () => {
    await create({ value: '2026-04-15' });
    let detail: any = null;
    el.addEventListener('cg-calendar-change', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);
    const days = el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.day');
    // Find a non-outside, non-disabled cell
    const target = Array.from(days).find(d => !d.classList.contains('outside') && !d.disabled)!;
    target.click();
    await el.updateComplete;
    expect(detail).not.toBeNull();
    expect(typeof detail.value).toBe('string');
  });

  it('next month button advances display', async () => {
    await create({ value: '2026-04-15' });
    const before = el.shadowRoot!.querySelector('.month-year')!.textContent;
    const [, nextBtn] = el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.nav-btn');
    nextBtn!.click();
    await el.updateComplete;
    const after = el.shadowRoot!.querySelector('.month-year')!.textContent;
    expect(after).not.toBe(before);
  });

  it('prev month button rewinds display', async () => {
    await create({ value: '2026-04-15' });
    const before = el.shadowRoot!.querySelector('.month-year')!.textContent;
    const [prevBtn] = el.shadowRoot!.querySelectorAll<HTMLButtonElement>('.nav-btn');
    prevBtn!.click();
    await el.updateComplete;
    const after = el.shadowRoot!.querySelector('.month-year')!.textContent;
    expect(after).not.toBe(before);
  });

  it('selected day has selected class', async () => {
    await create({ value: '2026-04-15' });
    const selected = el.shadowRoot!.querySelector('.day.selected');
    expect(selected).not.toBeNull();
    expect(selected!.textContent).toBe('15');
  });

  it('is form-associated', () => {
    expect((CgCalendar as any).formAssociated).toBe(true);
  });
});
