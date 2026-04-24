import { describe, it, expect, afterEach } from 'vitest';
import { CgSplitButton } from '../components/cg-split-button/cg-split-button.js';

if (!customElements.get('cg-split-button')) {
  customElements.define('cg-split-button', CgSplitButton);
}

describe('cg-split-button', () => {
  let el: CgSplitButton;

  async function create(props?: Partial<CgSplitButton>): Promise<CgSplitButton> {
    el = document.createElement('cg-split-button') as CgSplitButton;
    el.label = 'Save';
    el.items = [
      { id: 'save-as', label: 'Save as…', shortcut: '⌘⇧S' },
      { id: 'copy', label: 'Save a copy' },
      { separator: true, id: 's1', label: '' },
      { id: 'delete', label: 'Delete', danger: true },
    ];
    if (props) for (const [k, v] of Object.entries(props)) (el as any)[k] = v;
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => el?.remove());

  it('renders with shadow DOM', async () => {
    await create();
    expect(el.shadowRoot).toBeDefined();
    expect(el.shadowRoot!.querySelector('.primary')).not.toBeNull();
    expect(el.shadowRoot!.querySelector('.chevron')).not.toBeNull();
  });

  it('primary button shows the label', async () => {
    await create();
    const primary = el.shadowRoot!.querySelector('.primary')!;
    expect(primary.textContent).toContain('Save');
  });

  it('chevron has aria-haspopup="menu" and aria-expanded reflects open', async () => {
    await create();
    const chevron = el.shadowRoot!.querySelector('.chevron')!;
    expect(chevron.getAttribute('aria-haspopup')).toBe('menu');
    expect(chevron.getAttribute('aria-expanded')).toBe('false');
    el.open = true;
    await el.updateComplete;
    expect(chevron.getAttribute('aria-expanded')).toBe('true');
  });

  it('fires cg-split-button-click when primary clicked', async () => {
    await create();
    let fired = false;
    el.addEventListener('cg-split-button-click', () => { fired = true; });
    (el.shadowRoot!.querySelector('.primary') as HTMLButtonElement).click();
    expect(fired).toBe(true);
  });

  it('does not fire click when disabled', async () => {
    await create({ disabled: true });
    let fired = false;
    el.addEventListener('cg-split-button-click', () => { fired = true; });
    (el.shadowRoot!.querySelector('.primary') as HTMLButtonElement).click();
    expect(fired).toBe(false);
  });

  it('toggles menu open on chevron click', async () => {
    await create();
    (el.shadowRoot!.querySelector('.chevron') as HTMLButtonElement).click();
    await el.updateComplete;
    expect(el.open).toBe(true);
    (el.shadowRoot!.querySelector('.chevron') as HTMLButtonElement).click();
    await el.updateComplete;
    expect(el.open).toBe(false);
  });

  it('fires cg-split-button-open and -close', async () => {
    await create();
    let opens = 0, closes = 0;
    el.addEventListener('cg-split-button-open', () => { opens++; });
    el.addEventListener('cg-split-button-close', () => { closes++; });
    el.open = true;
    await el.updateComplete;
    // Opening via property doesn't dispatch open; the _openMenu helper does.
    // Exercise _openMenu via chevron click instead:
    el.open = false;
    await el.updateComplete;
    (el.shadowRoot!.querySelector('.chevron') as HTMLButtonElement).click();
    await el.updateComplete;
    expect(opens).toBeGreaterThanOrEqual(1);
    (el.shadowRoot!.querySelector('.chevron') as HTMLButtonElement).click();
    await el.updateComplete;
    expect(closes).toBeGreaterThanOrEqual(1);
  });

  it('menu renders all items including separator', async () => {
    await create({ open: true });
    await el.updateComplete;
    const menu = el.shadowRoot!.querySelector('.menu')!;
    expect(menu.querySelectorAll('.menu-item').length).toBe(3);
    expect(menu.querySelector('.divider')).not.toBeNull();
  });

  it('fires cg-split-button-select with item detail', async () => {
    await create({ open: true });
    let payload: any = null;
    el.addEventListener('cg-split-button-select', ((e: CustomEvent) => { payload = e.detail; }) as EventListener);
    (el.shadowRoot!.querySelector('.menu-item') as HTMLButtonElement).click();
    expect(payload).toBeTruthy();
    expect(payload.id).toBe('save-as');
    expect(payload.item.label).toBe('Save as…');
  });

  it('danger items get the danger class', async () => {
    await create({ open: true });
    const dangerItem = el.shadowRoot!.querySelector('.menu-item.danger')!;
    expect(dangerItem).not.toBeNull();
    expect(dangerItem.textContent).toContain('Delete');
  });

  it('reflects variant, size, type attributes', async () => {
    await create({ variant: 'secondary', size: 'lg', type: 'danger' });
    expect(el.hasAttribute('variant')).toBe(true);
    expect(el.getAttribute('variant')).toBe('secondary');
    expect(el.getAttribute('size')).toBe('lg');
    expect(el.getAttribute('type')).toBe('danger');
  });

  it('shows spinner when loading', async () => {
    await create({ loading: true });
    expect(el.shadowRoot!.querySelector('.spinner')).not.toBeNull();
  });
});
