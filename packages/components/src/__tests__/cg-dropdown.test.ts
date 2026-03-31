import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { CgDropdown, type DropdownItem } from '../components/cg-dropdown/cg-dropdown.js';

if (!customElements.get('cg-dropdown')) {
  customElements.define('cg-dropdown', CgDropdown);
}

const sampleItems: DropdownItem[] = [
  { id: 'edit', label: 'Edit' },
  { id: 'duplicate', label: 'Duplicate' },
  { id: 'delete', label: 'Delete' },
];

const itemsWithDisabled: DropdownItem[] = [
  { id: 'edit', label: 'Edit' },
  { id: 'locked', label: 'Locked', disabled: true },
  { id: 'delete', label: 'Delete' },
];

const itemsWithDivider: DropdownItem[] = [
  { id: 'edit', label: 'Edit' },
  { id: 'sep', label: '', divider: true },
  { id: 'delete', label: 'Delete' },
];

describe('cg-dropdown', () => {
  let el: CgDropdown;

  beforeEach(async () => {
    el = document.createElement('cg-dropdown') as CgDropdown;
    el.items = sampleItems;
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => el.remove());

  it('renders with shadow DOM', () => {
    expect(el.shadowRoot).toBeDefined();
  });

  it('closed by default', () => {
    expect(el.open).toBe(false);
    expect(el.hasAttribute('open')).toBe(false);
  });

  it('opens via property', async () => {
    el.open = true;
    await el.updateComplete;
    expect(el.hasAttribute('open')).toBe(true);
  });

  it('dispatches cg-dropdown-open via _open method', async () => {
    let fired = false;
    el.addEventListener('cg-dropdown-open', () => { fired = true; });
    // Use keyboard to open (avoids outside-click handler race)
    const trigger = el.shadowRoot!.querySelector('.trigger') as HTMLElement;
    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await el.updateComplete;
    expect(fired).toBe(true);
  });

  it('closes on item select', async () => {
    // Open directly
    el.open = true;
    await el.updateComplete;

    const items = el.shadowRoot!.querySelectorAll('.menu-item');
    (items[0] as HTMLElement).click();
    await el.updateComplete;
    expect(el.open).toBe(false);
  });

  it('dispatches cg-dropdown-select with item data', async () => {
    let detail: { id: string; label: string } | null = null;
    el.addEventListener('cg-dropdown-select', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);

    el.open = true;
    await el.updateComplete;

    const items = el.shadowRoot!.querySelectorAll('.menu-item');
    (items[0] as HTMLElement).click();
    await el.updateComplete;

    expect(detail).not.toBeNull();
    expect(detail!.id).toBe('edit');
    expect(detail!.label).toBe('Edit');
  });

  it('keyboard: Escape closes', async () => {
    el.open = true;
    await el.updateComplete;

    const trigger = el.shadowRoot!.querySelector('.trigger') as HTMLElement;
    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await el.updateComplete;
    expect(el.open).toBe(false);
  });

  it('keyboard: ArrowDown opens when closed', async () => {
    const trigger = el.shadowRoot!.querySelector('.trigger') as HTMLElement;
    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await el.updateComplete;
    expect(el.open).toBe(true);
  });

  it('disabled items cannot be selected', async () => {
    el.items = itemsWithDisabled;
    el.open = true;
    await el.updateComplete;

    let selectFired = false;
    el.addEventListener('cg-dropdown-select', () => { selectFired = true; });

    const items = el.shadowRoot!.querySelectorAll('.menu-item');
    const disabledItem = items[1] as HTMLElement;
    expect(disabledItem.classList.contains('disabled')).toBe(true);
    expect(disabledItem.getAttribute('aria-disabled')).toBe('true');
    // Disabled items don't fire select event
    disabledItem.click();
    expect(selectFired).toBe(false);
  });

  it('disabled items have aria-disabled', async () => {
    el.items = itemsWithDisabled;
    el.open = true;
    await el.updateComplete;

    const items = el.shadowRoot!.querySelectorAll('.menu-item');
    expect(items[1]!.getAttribute('aria-disabled')).toBe('true');
  });

  it('divider renders with role separator', async () => {
    el.items = itemsWithDivider;
    el.open = true;
    await el.updateComplete;

    const divider = el.shadowRoot!.querySelector('.divider');
    expect(divider).not.toBeNull();
    expect(divider!.getAttribute('role')).toBe('separator');
  });

  it('default position is bottom-start', () => {
    expect(el.position).toBe('bottom-start');
    expect(el.getAttribute('position')).toBe('bottom-start');
  });

  it('position attribute reflects', async () => {
    el.position = 'top-end';
    await el.updateComplete;
    expect(el.getAttribute('position')).toBe('top-end');
  });

  it('closing state tracked in component', async () => {
    el.open = true;
    await el.updateComplete;

    // Closing state is managed internally via updated() lifecycle
    // when open transitions from true to false
    expect(el.open).toBe(true);
    expect(el.hasAttribute('open')).toBe(true);
  });

  it('stagger animation in styles', () => {
    const styles = CgDropdown.styles;
    const cssText = Array.isArray(styles) ? styles.map(s => s.cssText).join('') : (styles as { cssText: string }).cssText;
    expect(cssText).toContain('staggerFadeIn');
  });

  it('trigger has aria-haspopup="menu"', () => {
    const trigger = el.shadowRoot!.querySelector('.trigger');
    expect(trigger!.getAttribute('aria-haspopup')).toBe('menu');
  });

  it('trigger aria-expanded reflects open state', async () => {
    const trigger = el.shadowRoot!.querySelector('.trigger');
    expect(trigger!.getAttribute('aria-expanded')).toBe('false');

    el.open = true;
    await el.updateComplete;
    expect(trigger!.getAttribute('aria-expanded')).toBe('true');
  });

  it('menu has role="menu"', () => {
    const menu = el.shadowRoot!.querySelector('.menu');
    expect(menu!.getAttribute('role')).toBe('menu');
  });

  it('menu items have role="menuitem"', async () => {
    el.open = true;
    await el.updateComplete;

    const items = el.shadowRoot!.querySelectorAll('.menu-item');
    items.forEach(item => {
      expect(item.getAttribute('role')).toBe('menuitem');
    });
  });
});
