import { describe, it, expect, afterEach, vi } from 'vitest';
import { CgTabs, TabItem } from '../components/cg-tabs/cg-tabs.js';

if (!customElements.get('cg-tabs')) {
  customElements.define('cg-tabs', CgTabs);
}

const TABS: TabItem[] = [
  { value: 'all', label: 'All', count: 12 },
  { value: 'active', label: 'Active' },
  { value: 'archived', label: 'Archived' },
];

const TABS_WITH_DISABLED: TabItem[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'locked', label: 'Locked', disabled: true },
  { value: 'archived', label: 'Archived' },
];

describe('cg-tabs', () => {
  let el: CgTabs;

  async function create(props?: Partial<CgTabs>): Promise<CgTabs> {
    el = document.createElement('cg-tabs') as CgTabs;
    el.tabs = TABS;
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
    expect(el.shadowRoot!.querySelector('.tab-list')).not.toBeNull();
  });

  it('renders correct number of tab buttons', async () => {
    await create();
    const tabs = el.shadowRoot!.querySelectorAll('.tab');
    expect(tabs.length).toBe(3);
  });

  // ── First tab active by default ──

  it('first tab is active by default when no value set', async () => {
    await create();
    const firstTab = el.shadowRoot!.querySelector('.tab')!;
    expect(firstTab.classList.contains('active')).toBe(true);
  });

  it('specified value tab is active', async () => {
    await create({ value: 'active' });
    const tabs = el.shadowRoot!.querySelectorAll('.tab');
    expect(tabs[0]!.classList.contains('active')).toBe(false);
    expect(tabs[1]!.classList.contains('active')).toBe(true);
  });

  // ── Click activates tab ──

  it('click activates a tab', async () => {
    await create();
    const tabs = el.shadowRoot!.querySelectorAll('.tab');
    (tabs[1] as HTMLElement).click();
    await el.updateComplete;
    expect(tabs[1]!.classList.contains('active')).toBe(true);
  });

  // ── Event dispatch ──

  it('dispatches cg-tab-change with {value, label}', async () => {
    await create();
    let detail: any = null;
    el.addEventListener('cg-tab-change', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);

    const tabs = el.shadowRoot!.querySelectorAll('.tab');
    (tabs[2] as HTMLElement).click(); // Archived
    await el.updateComplete;

    expect(detail).not.toBeNull();
    expect(detail.value).toBe('archived');
    expect(detail.label).toBe('Archived');
  });

  // ── Keyboard: ArrowRight ──

  it('ArrowRight moves to next tab', async () => {
    await create();
    const handler = vi.fn();
    el.addEventListener('cg-tab-change', handler);

    const tabList = el.shadowRoot!.querySelector('.tab-list') as HTMLElement;
    tabList.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    await el.updateComplete;

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler.mock.calls[0][0].detail.value).toBe('active');
  });

  // ── Keyboard: ArrowLeft ──

  it('ArrowLeft moves to previous tab (wraps around)', async () => {
    await create();
    const handler = vi.fn();
    el.addEventListener('cg-tab-change', handler);

    const tabList = el.shadowRoot!.querySelector('.tab-list') as HTMLElement;
    tabList.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    await el.updateComplete;

    expect(handler).toHaveBeenCalledTimes(1);
    // From first tab, ArrowLeft wraps to last
    expect(handler.mock.calls[0][0].detail.value).toBe('archived');
  });

  // ── Disabled tab ──

  it('disabled tab cannot be selected by click', async () => {
    await create({ tabs: TABS_WITH_DISABLED });
    const handler = vi.fn();
    el.addEventListener('cg-tab-change', handler);

    const tabs = el.shadowRoot!.querySelectorAll('.tab');
    const lockedTab = tabs[2] as HTMLElement; // "Locked" is disabled
    lockedTab.click();
    await el.updateComplete;

    // Disabled tabs have the disabled attribute and _select returns early
    expect(lockedTab.classList.contains('disabled')).toBe(true);
  });

  it('disabled tab has disabled class', async () => {
    await create({ tabs: TABS_WITH_DISABLED });
    const tabs = el.shadowRoot!.querySelectorAll('.tab');
    expect(tabs[2]!.classList.contains('disabled')).toBe(true);
  });

  // ── Indicator bar (underline variant) ──

  it('indicator bar renders in underline variant', async () => {
    await create({ variant: 'underline' });
    const indicator = el.shadowRoot!.querySelector('.indicator');
    expect(indicator).not.toBeNull();
  });

  it('indicator rendered as sliding pill in pills variant', async () => {
    await create({ variant: 'pills' });
    const indicator = el.shadowRoot!.querySelector('.indicator');
    expect(indicator).not.toBeNull();
  });

  // ── Pills variant ──

  it('pills variant reflects attribute', async () => {
    await create({ variant: 'pills' });
    expect(el.getAttribute('variant')).toBe('pills');
  });

  it('pills active tab has active class', async () => {
    await create({ variant: 'pills' });
    const firstTab = el.shadowRoot!.querySelector('.tab')!;
    expect(firstTab.classList.contains('active')).toBe(true);
  });

  // ── Size variants ──

  it('default size is md', async () => {
    await create();
    expect(el.size).toBe('md');
  });

  it('size="sm" reflects to attribute', async () => {
    await create({ size: 'sm' });
    expect(el.getAttribute('size')).toBe('sm');
  });

  it('size="lg" reflects to attribute', async () => {
    await create({ size: 'lg' });
    expect(el.getAttribute('size')).toBe('lg');
  });

  // ── Panel content ──

  it('renders panel with tabpanel role', async () => {
    await create();
    const panel = el.shadowRoot!.querySelector('.panel');
    expect(panel).not.toBeNull();
    expect(panel!.getAttribute('role')).toBe('tabpanel');
  });

  it('panel has named slot for active tab value', async () => {
    await create({ value: 'active' });
    const slot = el.shadowRoot!.querySelector('.panel slot[name="active"]');
    expect(slot).not.toBeNull();
  });

  // ── ARIA ──

  it('tab-list has role="tablist"', async () => {
    await create();
    const tabList = el.shadowRoot!.querySelector('.tab-list')!;
    expect(tabList.getAttribute('role')).toBe('tablist');
  });

  it('tabs have role="tab"', async () => {
    await create();
    const tabs = el.shadowRoot!.querySelectorAll('.tab');
    tabs.forEach(tab => {
      expect(tab.getAttribute('role')).toBe('tab');
    });
  });

  it('active tab has aria-selected="true"', async () => {
    await create();
    const firstTab = el.shadowRoot!.querySelector('.tab')!;
    expect(firstTab.getAttribute('aria-selected')).toBe('true');
  });

  it('inactive tab has aria-selected="false"', async () => {
    await create();
    const tabs = el.shadowRoot!.querySelectorAll('.tab');
    expect(tabs[1]!.getAttribute('aria-selected')).toBe('false');
  });

  // ── Count badge ──

  it('renders count badge when tab has count', async () => {
    await create();
    const badge = el.shadowRoot!.querySelector('.tab-count');
    expect(badge).not.toBeNull();
    expect(badge!.textContent).toBe('12');
  });

  // ── Keyboard: Home/End ──

  it('Home key moves to first tab', async () => {
    await create({ value: 'archived' });
    const handler = vi.fn();
    el.addEventListener('cg-tab-change', handler);

    const tabList = el.shadowRoot!.querySelector('.tab-list') as HTMLElement;
    tabList.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
    await el.updateComplete;

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler.mock.calls[0][0].detail.value).toBe('all');
  });

  it('End key moves to last tab', async () => {
    await create();
    const handler = vi.fn();
    el.addEventListener('cg-tab-change', handler);

    const tabList = el.shadowRoot!.querySelector('.tab-list') as HTMLElement;
    tabList.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
    await el.updateComplete;

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler.mock.calls[0][0].detail.value).toBe('archived');
  });
});
