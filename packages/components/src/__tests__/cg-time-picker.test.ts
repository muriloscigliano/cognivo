import { describe, it, expect, afterEach } from 'vitest';
import { CgTimePicker } from '../components/cg-time-picker/cg-time-picker.js';

if (!customElements.get('cg-time-picker')) {
  customElements.define('cg-time-picker', CgTimePicker);
}

describe('cg-time-picker', () => {
  let el: CgTimePicker;

  async function create(props?: Partial<CgTimePicker>): Promise<CgTimePicker> {
    el = document.createElement('cg-time-picker') as CgTimePicker;
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

  // ── Rendering ──

  it('renders with shadow DOM', async () => {
    await create();
    expect(el.shadowRoot).toBeDefined();
    expect(el.shadowRoot!.querySelector('.trigger')).not.toBeNull();
  });

  it('renders placeholder when no value', async () => {
    await create({ placeholder: 'Pick a time' });
    expect(el.shadowRoot!.querySelector('.trigger-text')?.textContent).toContain('Pick a time');
  });

  it('renders label when provided', async () => {
    await create({ label: 'Start time' });
    expect(el.shadowRoot!.querySelector('.label')?.textContent).toContain('Start time');
  });

  it('renders helper text when provided', async () => {
    await create({ helper: 'Choose wisely' });
    expect(el.shadowRoot!.querySelector('.helper')?.textContent).toContain('Choose wisely');
  });

  // ── Defaults ──

  it('default step is 5', async () => {
    await create();
    expect(el.step).toBe(5);
  });

  it('default use12h is false', async () => {
    await create();
    expect(el.use12h).toBe(false);
  });

  // ── Format display ──

  it('formats 24h value correctly', async () => {
    await create({ value: '14:30' });
    expect(el.shadowRoot!.querySelector('.trigger-text')?.textContent).toContain('14:30');
  });

  it('formats 12h value correctly (afternoon)', async () => {
    await create({ value: '14:30', use12h: true });
    expect(el.shadowRoot!.querySelector('.trigger-text')?.textContent).toContain('2:30 PM');
  });

  it('formats 12h value correctly (midnight)', async () => {
    await create({ value: '00:15', use12h: true });
    expect(el.shadowRoot!.querySelector('.trigger-text')?.textContent).toContain('12:15 AM');
  });

  it('formats 12h value correctly (noon)', async () => {
    await create({ value: '12:00', use12h: true });
    expect(el.shadowRoot!.querySelector('.trigger-text')?.textContent).toContain('12:00 PM');
  });

  // ── Open/close ──

  it('clicking trigger toggles open state', async () => {
    await create();
    const trigger = el.shadowRoot!.querySelector('.trigger') as HTMLElement;
    expect(el.shadowRoot!.querySelector('.dropdown')?.classList.contains('open')).toBe(false);
    trigger.click();
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.dropdown')?.classList.contains('open')).toBe(true);
    trigger.click();
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.dropdown')?.classList.contains('open')).toBe(false);
  });

  it('disabled prevents opening', async () => {
    await create({ disabled: true });
    const trigger = el.shadowRoot!.querySelector('.trigger') as HTMLElement;
    trigger.click();
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.dropdown')?.classList.contains('open')).toBe(false);
  });

  it('aria-expanded reflects open state', async () => {
    await create();
    const trigger = el.shadowRoot!.querySelector('.trigger')!;
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    (trigger as HTMLElement).click();
    await el.updateComplete;
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
  });

  it('opening with existing value parses it', async () => {
    await create({ value: '09:15' });
    const trigger = el.shadowRoot!.querySelector('.trigger') as HTMLElement;
    trigger.click();
    await el.updateComplete;
    // Selected hour and minute should be highlighted
    const selected = el.shadowRoot!.querySelectorAll('.time-option.selected');
    expect(selected.length).toBeGreaterThan(0);
  });

  // ── Hours rendering ──

  it('24h mode renders 24 hour options', async () => {
    await create();
    const trigger = el.shadowRoot!.querySelector('.trigger') as HTMLElement;
    trigger.click();
    await el.updateComplete;
    const firstColumn = el.shadowRoot!.querySelectorAll('.time-column')[0]!;
    const hourButtons = firstColumn.querySelectorAll('.time-option');
    expect(hourButtons.length).toBe(24);
  });

  it('12h mode renders 12 hour options starting at 1', async () => {
    await create({ use12h: true });
    const trigger = el.shadowRoot!.querySelector('.trigger') as HTMLElement;
    trigger.click();
    await el.updateComplete;
    const firstColumn = el.shadowRoot!.querySelectorAll('.time-column')[0]!;
    const hourButtons = firstColumn.querySelectorAll('.time-option');
    expect(hourButtons.length).toBe(12);
    expect(hourButtons[0]!.textContent).toContain('1');
  });

  // ── Minute step ──

  it('step=15 generates 4 minute options', async () => {
    await create({ step: 15 });
    const trigger = el.shadowRoot!.querySelector('.trigger') as HTMLElement;
    trigger.click();
    await el.updateComplete;
    const columns = el.shadowRoot!.querySelectorAll('.time-column');
    const minutesCol = columns[1]!;
    expect(minutesCol.querySelectorAll('.time-option').length).toBe(4);
  });

  it('step=5 generates 12 minute options', async () => {
    await create({ step: 5 });
    const trigger = el.shadowRoot!.querySelector('.trigger') as HTMLElement;
    trigger.click();
    await el.updateComplete;
    const columns = el.shadowRoot!.querySelectorAll('.time-column');
    const minutesCol = columns[1]!;
    expect(minutesCol.querySelectorAll('.time-option').length).toBe(12);
  });

  it('step clamps to [1,30]', async () => {
    await create({ step: 100 });
    const trigger = el.shadowRoot!.querySelector('.trigger') as HTMLElement;
    trigger.click();
    await el.updateComplete;
    // step clamps to 30 -> ceil(60/30) = 2
    const minutesCol = el.shadowRoot!.querySelectorAll('.time-column')[1]!;
    expect(minutesCol.querySelectorAll('.time-option').length).toBe(2);
  });

  // ── Select hour/minute → emits cg-change ──

  it('selecting hour then minute emits cg-change with formatted value', async () => {
    await create();
    const trigger = el.shadowRoot!.querySelector('.trigger') as HTMLElement;
    trigger.click();
    await el.updateComplete;

    let detail: any;
    el.addEventListener('cg-change', (e: any) => (detail = e.detail));

    const columns = el.shadowRoot!.querySelectorAll('.time-column');
    const hourBtn = columns[0]!.querySelectorAll('.time-option')[9] as HTMLElement; // 09
    hourBtn.click();
    await el.updateComplete;

    const minBtn = columns[1]!.querySelectorAll('.time-option')[3] as HTMLElement; // 15 (step=5)
    minBtn.click();
    await el.updateComplete;

    expect(el.value).toBe('09:15');
    expect(detail).toEqual({ value: '09:15' });
  });

  it('12h PM selection adds 12 to hour', async () => {
    await create({ use12h: true });
    const trigger = el.shadowRoot!.querySelector('.trigger') as HTMLElement;
    trigger.click();
    await el.updateComplete;

    const columns = el.shadowRoot!.querySelectorAll('.time-column');
    // Hour 3 (index 2 because starts at 1)
    (columns[0]!.querySelectorAll('.time-option')[2] as HTMLElement).click();
    (columns[1]!.querySelectorAll('.time-option')[0] as HTMLElement).click();
    await el.updateComplete;

    // Default period AM, hour 3 -> "03:00"
    expect(el.value).toBe('03:00');

    // Switch to PM
    const pmBtn = el.shadowRoot!.querySelectorAll('.period-btn')[1] as HTMLElement;
    pmBtn.click();
    await el.updateComplete;
    expect(el.value).toBe('15:00');
  });

  it('12h AM with hour 12 becomes 00:mm', async () => {
    await create({ use12h: true });
    const trigger = el.shadowRoot!.querySelector('.trigger') as HTMLElement;
    trigger.click();
    await el.updateComplete;

    const columns = el.shadowRoot!.querySelectorAll('.time-column');
    // Hour 12 is at index 11 (1,2,3...,12)
    (columns[0]!.querySelectorAll('.time-option')[11] as HTMLElement).click();
    (columns[1]!.querySelectorAll('.time-option')[0] as HTMLElement).click();
    await el.updateComplete;
    expect(el.value).toBe('00:00');
  });

  it('period button is "AM" active by default', async () => {
    await create({ use12h: true });
    const trigger = el.shadowRoot!.querySelector('.trigger') as HTMLElement;
    trigger.click();
    await el.updateComplete;
    const periodBtns = el.shadowRoot!.querySelectorAll('.period-btn');
    expect(periodBtns[0]!.classList.contains('active')).toBe(true);
    expect(periodBtns[1]!.classList.contains('active')).toBe(false);
  });

  // ── Keyboard ──

  it('Escape closes the dropdown', async () => {
    await create();
    const trigger = el.shadowRoot!.querySelector('.trigger') as HTMLElement;
    trigger.click();
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.dropdown')?.classList.contains('open')).toBe(true);
    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', cancelable: true }));
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.dropdown')?.classList.contains('open')).toBe(false);
  });

  it('Enter on closed trigger opens the dropdown', async () => {
    await create();
    const trigger = el.shadowRoot!.querySelector('.trigger') as HTMLElement;
    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', cancelable: true }));
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.dropdown')?.classList.contains('open')).toBe(true);
  });

  it('Space on closed trigger opens the dropdown', async () => {
    await create();
    const trigger = el.shadowRoot!.querySelector('.trigger') as HTMLElement;
    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', cancelable: true }));
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.dropdown')?.classList.contains('open')).toBe(true);
  });

  // ── Click outside ──

  it('click outside closes the dropdown', async () => {
    await create();
    const trigger = el.shadowRoot!.querySelector('.trigger') as HTMLElement;
    trigger.click();
    await el.updateComplete;
    // Click outside
    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.dropdown')?.classList.contains('open')).toBe(false);
  });

  // ── Reflection ──

  it('error reflects on host', async () => {
    await create({ error: true });
    expect(el.hasAttribute('error')).toBe(true);
  });

  it('success reflects on host', async () => {
    await create({ success: true });
    expect(el.hasAttribute('success')).toBe(true);
  });

  it('size="lg" reflects on host', async () => {
    await create({ size: 'lg' });
    expect(el.getAttribute('size')).toBe('lg');
  });

  // ── Disconnect cleans up listener ──

  it('removal does not leak global click listener', async () => {
    await create();
    el.remove();
    // Should not throw when clicking anywhere
    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
});
