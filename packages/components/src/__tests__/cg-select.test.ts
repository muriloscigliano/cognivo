import { describe, it, expect, afterEach } from 'vitest';
import { CgSelect, SelectOption } from '../components/cg-select/cg-select.js';

if (!customElements.get('cg-select')) {
  customElements.define('cg-select', CgSelect);
}

const FRUITS: SelectOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
];

describe('cg-select', () => {
  let el: CgSelect;

  async function create(props?: Partial<CgSelect>): Promise<CgSelect> {
    el = document.createElement('cg-select') as CgSelect;
    el.options = FRUITS;
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

  // ── Placeholder ──

  it('shows placeholder when no value selected', async () => {
    await create({ placeholder: 'Pick a fruit' });
    const text = el.shadowRoot!.querySelector('.trigger-text')!;
    expect(text.classList.contains('placeholder')).toBe(true);
    expect(text.textContent!.trim()).toBe('Pick a fruit');
  });

  it('shows selected label when value is set', async () => {
    await create({ value: 'banana' });
    const text = el.shadowRoot!.querySelector('.trigger-text')!;
    expect(text.classList.contains('placeholder')).toBe(false);
    expect(text.textContent!.trim()).toBe('Banana');
  });

  // ── Open / close ──

  it('opens dropdown on trigger click', async () => {
    await create();
    const trigger = el.shadowRoot!.querySelector('.trigger') as HTMLElement;
    trigger.click();
    await el.updateComplete;

    const dropdown = el.shadowRoot!.querySelector('.dropdown')!;
    expect(dropdown.classList.contains('open')).toBe(true);
  });

  it('closes dropdown on option select', async () => {
    await create();
    const trigger = el.shadowRoot!.querySelector('.trigger') as HTMLElement;
    trigger.click();
    await el.updateComplete;

    const option = el.shadowRoot!.querySelector('.option') as HTMLElement;
    option.click();
    await el.updateComplete;

    const dropdown = el.shadowRoot!.querySelector('.dropdown')!;
    expect(dropdown.classList.contains('open')).toBe(false);
  });

  // ── Events ──

  it('dispatches cg-change with {value, label} on selection', async () => {
    await create();
    let detail: any = null;
    el.addEventListener('cg-change', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);

    const trigger = el.shadowRoot!.querySelector('.trigger') as HTMLElement;
    trigger.click();
    await el.updateComplete;

    const options = el.shadowRoot!.querySelectorAll('.option');
    (options[1] as HTMLElement).click(); // Banana
    await el.updateComplete;

    expect(detail).not.toBeNull();
    expect(detail.value).toBe('banana');
    expect(detail.label).toBe('Banana');
  });

  // ── Keyboard ──

  it('Enter opens dropdown', async () => {
    await create();
    const trigger = el.shadowRoot!.querySelector('.trigger') as HTMLElement;
    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await el.updateComplete;

    const dropdown = el.shadowRoot!.querySelector('.dropdown')!;
    expect(dropdown.classList.contains('open')).toBe(true);
  });

  it('Escape closes dropdown', async () => {
    await create();
    const trigger = el.shadowRoot!.querySelector('.trigger') as HTMLElement;
    trigger.click();
    await el.updateComplete;

    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await el.updateComplete;

    const dropdown = el.shadowRoot!.querySelector('.dropdown')!;
    expect(dropdown.classList.contains('open')).toBe(false);
  });

  it('ArrowDown highlights next option', async () => {
    await create();
    const trigger = el.shadowRoot!.querySelector('.trigger') as HTMLElement;
    trigger.click();
    await el.updateComplete;

    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await el.updateComplete;

    const highlighted = el.shadowRoot!.querySelector('.option.highlighted');
    expect(highlighted).not.toBeNull();
  });

  it('ArrowDown opens dropdown when closed', async () => {
    await create();
    const trigger = el.shadowRoot!.querySelector('.trigger') as HTMLElement;
    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await el.updateComplete;

    const dropdown = el.shadowRoot!.querySelector('.dropdown')!;
    expect(dropdown.classList.contains('open')).toBe(true);
  });

  // ── Disabled ──

  it('disabled prevents opening', async () => {
    await create({ disabled: true });
    const trigger = el.shadowRoot!.querySelector('.trigger') as HTMLElement;
    trigger.click();
    await el.updateComplete;

    const dropdown = el.shadowRoot!.querySelector('.dropdown')!;
    expect(dropdown.classList.contains('open')).toBe(false);
  });

  it('disabled trigger has disabled class', async () => {
    await create({ disabled: true });
    const trigger = el.shadowRoot!.querySelector('.trigger')!;
    expect(trigger.classList.contains('disabled')).toBe(true);
  });

  // ── Error / Success states ──

  it('error state reflects attribute on host', async () => {
    await create({ error: true });
    expect(el.hasAttribute('error')).toBe(true);
  });

  it('success state reflects attribute on host', async () => {
    await create({ success: true });
    expect(el.hasAttribute('success')).toBe(true);
  });

  // ── Search / filter ──

  it('search input appears when searchable', async () => {
    await create({ searchable: true });
    const trigger = el.shadowRoot!.querySelector('.trigger') as HTMLElement;
    trigger.click();
    await el.updateComplete;

    const searchInput = el.shadowRoot!.querySelector('.search input');
    expect(searchInput).not.toBeNull();
  });

  it('search input filters options', async () => {
    await create({ searchable: true });
    const trigger = el.shadowRoot!.querySelector('.trigger') as HTMLElement;
    trigger.click();
    await el.updateComplete;

    const input = el.shadowRoot!.querySelector('.search input') as HTMLInputElement;
    input.value = 'ban';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await el.updateComplete;

    const options = el.shadowRoot!.querySelectorAll('.option');
    expect(options.length).toBe(1);
    expect(options[0]!.textContent!.trim()).toContain('Banana');
  });

  // ── Selected checkmark ──

  it('selected option shows checkmark SVG', async () => {
    await create({ value: 'apple' });
    const trigger = el.shadowRoot!.querySelector('.trigger') as HTMLElement;
    trigger.click();
    await el.updateComplete;

    const selected = el.shadowRoot!.querySelector('.option.selected');
    expect(selected).not.toBeNull();
    const check = selected!.querySelector('.check');
    expect(check).not.toBeNull();
  });

  // ── Chevron rotation ──

  it('chevron rotates when open (trigger has open class)', async () => {
    await create();
    const trigger = el.shadowRoot!.querySelector('.trigger') as HTMLElement;
    expect(trigger.classList.contains('open')).toBe(false);

    trigger.click();
    await el.updateComplete;
    expect(trigger.classList.contains('open')).toBe(true);
  });

  // ── Size variants ──

  it('size="sm" reflects to attribute', async () => {
    await create({ size: 'sm' });
    expect(el.getAttribute('size')).toBe('sm');
  });

  it('size="lg" reflects to attribute', async () => {
    await create({ size: 'lg' });
    expect(el.getAttribute('size')).toBe('lg');
  });

  // ── ARIA ──

  it('trigger has role="combobox"', async () => {
    await create();
    const trigger = el.shadowRoot!.querySelector('.trigger')!;
    expect(trigger.getAttribute('role')).toBe('combobox');
  });

  it('trigger has aria-expanded reflecting open state', async () => {
    await create();
    const trigger = el.shadowRoot!.querySelector('.trigger')!;
    expect(trigger.getAttribute('aria-expanded')).toBe('false');

    (trigger as HTMLElement).click();
    await el.updateComplete;
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
  });

  it('dropdown has role="listbox"', async () => {
    await create();
    const dropdown = el.shadowRoot!.querySelector('.dropdown')!;
    expect(dropdown.getAttribute('role')).toBe('listbox');
  });
});
