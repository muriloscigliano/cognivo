import { describe, it, expect, afterEach } from 'vitest';
import '../index.js';

async function createElement(tag: string, props?: Record<string, unknown>): Promise<HTMLElement> {
  const el = document.createElement(tag);
  if (props) for (const [k, v] of Object.entries(props)) (el as any)[k] = v;
  document.body.appendChild(el);
  if ('updateComplete' in el) await (el as any).updateComplete;
  return el;
}

const sampleItems = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Widget' },
];

const longItems = [
  { label: 'Home', href: '/' },
  { label: 'Category', href: '/category' },
  { label: 'Subcategory', href: '/subcategory' },
  { label: 'Products', href: '/products' },
  { label: 'Detail' },
];

describe('cg-breadcrumbs', () => {
  let el: HTMLElement;

  afterEach(() => {
    el?.remove();
  });

  it('renders with shadow DOM', async () => {
    el = await createElement('cg-breadcrumbs', { items: sampleItems });
    expect(el.shadowRoot).toBeDefined();
    expect(el.shadowRoot).not.toBeNull();
  });

  it('renders items as links', async () => {
    el = await createElement('cg-breadcrumbs', { items: sampleItems });
    const links = el.shadowRoot!.querySelectorAll('.crumb-link');
    // First two items have href, so they render as <a> links
    expect(links.length).toBe(2);
    const firstLink = links[0] as HTMLAnchorElement;
    expect(firstLink.tagName.toLowerCase()).toBe('a');
    expect(firstLink.getAttribute('href')).toBe('/');
  });

  it('last item has aria-current="page"', async () => {
    el = await createElement('cg-breadcrumbs', { items: sampleItems });
    const current = el.shadowRoot!.querySelector('[aria-current="page"]');
    expect(current).not.toBeNull();
    expect(current!.textContent).toContain('Widget');
  });

  it('last item uses crumb-current class (not a link)', async () => {
    el = await createElement('cg-breadcrumbs', { items: sampleItems });
    const current = el.shadowRoot!.querySelector('.crumb-current');
    expect(current).not.toBeNull();
    expect(current!.textContent).toContain('Widget');
  });

  it('dispatches cg-breadcrumb-click on link click', async () => {
    el = await createElement('cg-breadcrumbs', { items: sampleItems });
    let detail: unknown = null;
    el.addEventListener('cg-breadcrumb-click', ((e: CustomEvent) => {
      detail = e.detail;
    }) as EventListener);

    const links = el.shadowRoot!.querySelectorAll('.crumb-link');
    (links[0] as HTMLElement).click();

    expect(detail).not.toBeNull();
    expect((detail as { label: string }).label).toBe('Home');
    expect((detail as { href: string }).href).toBe('/');
    expect((detail as { index: number }).index).toBe(0);
  });

  it('renders separator between items', async () => {
    el = await createElement('cg-breadcrumbs', { items: sampleItems });
    const separators = el.shadowRoot!.querySelectorAll('.separator');
    // Separators appear after all items except the last
    expect(separators.length).toBe(2);
    expect(separators[0]!.textContent).toBe('/');
  });

  it('uses custom separator', async () => {
    el = await createElement('cg-breadcrumbs', { items: sampleItems, separator: '>' });
    const separators = el.shadowRoot!.querySelectorAll('.separator');
    expect(separators[0]!.textContent).toBe('>');
  });

  it('nav element has aria-label="Breadcrumb"', async () => {
    el = await createElement('cg-breadcrumbs', { items: sampleItems });
    const nav = el.shadowRoot!.querySelector('nav');
    expect(nav).not.toBeNull();
    expect(nav!.getAttribute('aria-label')).toBe('Breadcrumb');
  });

  it('defaults to size="md"', async () => {
    el = await createElement('cg-breadcrumbs', { items: sampleItems });
    expect(el.getAttribute('size')).toBe('md');
  });

  it('reflects size="sm"', async () => {
    el = await createElement('cg-breadcrumbs', { items: sampleItems, size: 'sm' });
    expect(el.getAttribute('size')).toBe('sm');
  });

  it('reflects size="lg"', async () => {
    el = await createElement('cg-breadcrumbs', { items: sampleItems, size: 'lg' });
    expect(el.getAttribute('size')).toBe('lg');
  });

  it('maxVisible collapses middle items', async () => {
    el = await createElement('cg-breadcrumbs', { items: longItems, maxVisible: 3 });
    // Should show: Home, ellipsis, Products, Detail
    const ellipsis = el.shadowRoot!.querySelector('.ellipsis');
    expect(ellipsis).not.toBeNull();

    // First item visible
    const links = el.shadowRoot!.querySelectorAll('.crumb-link');
    expect(links[0]!.textContent).toContain('Home');

    // Last item visible
    const current = el.shadowRoot!.querySelector('.crumb-current');
    expect(current!.textContent).toContain('Detail');
  });

  it('ellipsis button expands collapsed items', async () => {
    el = await createElement('cg-breadcrumbs', { items: longItems, maxVisible: 3 });

    // Click the ellipsis to expand
    const ellipsis = el.shadowRoot!.querySelector('.ellipsis') as HTMLButtonElement;
    expect(ellipsis).not.toBeNull();
    ellipsis.click();
    await (el as any).updateComplete;

    // After expanding, all items should be visible
    const allCrumbs = el.shadowRoot!.querySelectorAll('.breadcrumb-item');
    // All 5 items should now render (plus possible auto-collapse ellipsis for responsive)
    expect(allCrumbs.length).toBeGreaterThanOrEqual(5);

    // The manual ellipsis should no longer appear in collapsed state
    const links = el.shadowRoot!.querySelectorAll('.crumb-link');
    const labels = Array.from(links).map(l => l.textContent!.trim());
    expect(labels).toContain('Category');
    expect(labels).toContain('Subcategory');
  });

  it('renders nothing when items array is empty', async () => {
    el = await createElement('cg-breadcrumbs', { items: [] });
    const nav = el.shadowRoot!.querySelector('nav');
    expect(nav).toBeNull();
  });

  it('items without href render as buttons', async () => {
    const items = [
      { label: 'Dashboard' },
      { label: 'Settings' },
    ];
    el = await createElement('cg-breadcrumbs', { items });
    const buttons = el.shadowRoot!.querySelectorAll('button.crumb-link');
    expect(buttons.length).toBe(1); // Only first item is a button link, last is crumb-current
  });
});
