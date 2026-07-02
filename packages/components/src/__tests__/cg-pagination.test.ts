import { describe, it, expect, afterEach } from 'vitest';
import '../index.js';

async function createElement(tag: string, props?: Record<string, unknown>): Promise<HTMLElement> {
  const el = document.createElement(tag);
  if (props) for (const [k, v] of Object.entries(props)) (el as any)[k] = v;
  document.body.appendChild(el);
  if ('updateComplete' in el) await (el as any).updateComplete;
  return el;
}

describe('cg-pagination', () => {
  let el: HTMLElement;

  afterEach(() => {
    el?.remove();
  });

  it('renders with shadow DOM', async () => {
    el = await createElement('cg-pagination');
    expect(el.shadowRoot).toBeDefined();
    expect(el.shadowRoot).not.toBeNull();
  });

  it('shows correct page numbers for small total', async () => {
    el = await createElement('cg-pagination', { total: 5, current: 1 });
    const buttons = el.shadowRoot!.querySelectorAll('.page-btn:not([aria-label="Previous page"]):not([aria-label="Next page"])');
    expect(buttons.length).toBe(5);
    expect(buttons[0]!.textContent!.trim()).toBe('1');
    expect(buttons[4]!.textContent!.trim()).toBe('5');
  });

  it('highlights current page with active class', async () => {
    el = await createElement('cg-pagination', { total: 5, current: 3 });
    const active = el.shadowRoot!.querySelector('.page-btn.active');
    expect(active).not.toBeNull();
    expect(active!.textContent!.trim()).toBe('3');
  });

  it('sets aria-current="page" on current page', async () => {
    el = await createElement('cg-pagination', { total: 5, current: 2 });
    const active = el.shadowRoot!.querySelector('.page-btn[aria-current="page"]');
    expect(active).not.toBeNull();
    expect(active!.textContent!.trim()).toBe('2');
  });

  it('dispatches cg-page-change with {page} on page click', async () => {
    el = await createElement('cg-pagination', { total: 5, current: 1 });
    let detail: unknown = null;
    el.addEventListener('cg-page-change', ((e: CustomEvent) => {
      detail = e.detail;
    }) as EventListener);

    const buttons = el.shadowRoot!.querySelectorAll('.page-btn:not([aria-label="Previous page"]):not([aria-label="Next page"])');
    // Click page 3
    (buttons[2] as HTMLButtonElement).click();

    expect(detail).not.toBeNull();
    expect((detail as { page: number }).page).toBe(3);
  });

  it('previous button navigates to previous page', async () => {
    el = await createElement('cg-pagination', { total: 5, current: 3 });
    let detail: unknown = null;
    el.addEventListener('cg-page-change', ((e: CustomEvent) => {
      detail = e.detail;
    }) as EventListener);

    const prev = el.shadowRoot!.querySelector('[aria-label="Previous page"]') as HTMLButtonElement;
    prev.click();

    expect(detail).not.toBeNull();
    expect((detail as { page: number }).page).toBe(2);
  });

  it('next button navigates to next page', async () => {
    el = await createElement('cg-pagination', { total: 5, current: 3 });
    let detail: unknown = null;
    el.addEventListener('cg-page-change', ((e: CustomEvent) => {
      detail = e.detail;
    }) as EventListener);

    const next = el.shadowRoot!.querySelector('[aria-label="Next page"]') as HTMLButtonElement;
    next.click();

    expect(detail).not.toBeNull();
    expect((detail as { page: number }).page).toBe(4);
  });

  it('previous button is aria-disabled on first page (stays focusable)', async () => {
    el = await createElement('cg-pagination', { total: 5, current: 1 });
    const prev = el.shadowRoot!.querySelector('[aria-label="Previous page"]') as HTMLButtonElement;
    // aria-disabled (not native disabled) so focus is not dropped to <body>
    expect(prev.getAttribute('aria-disabled')).toBe('true');
    expect(prev.disabled).toBe(false);
  });

  it('next button is aria-disabled on last page (stays focusable)', async () => {
    el = await createElement('cg-pagination', { total: 5, current: 5 });
    const next = el.shadowRoot!.querySelector('[aria-label="Next page"]') as HTMLButtonElement;
    expect(next.getAttribute('aria-disabled')).toBe('true');
    expect(next.disabled).toBe(false);
  });

  it('previous button is enabled when not on first page', async () => {
    el = await createElement('cg-pagination', { total: 5, current: 3 });
    const prev = el.shadowRoot!.querySelector('[aria-label="Previous page"]') as HTMLButtonElement;
    expect(prev.disabled).toBe(false);
  });

  it('next button is enabled when not on last page', async () => {
    el = await createElement('cg-pagination', { total: 5, current: 3 });
    const next = el.shadowRoot!.querySelector('[aria-label="Next page"]') as HTMLButtonElement;
    expect(next.disabled).toBe(false);
  });

  it('shows ellipsis for large page counts', async () => {
    el = await createElement('cg-pagination', { total: 20, current: 10 });
    const ellipses = el.shadowRoot!.querySelectorAll('.ellipsis');
    expect(ellipses.length).toBeGreaterThan(0);
    expect(ellipses[0]!.textContent).toBe('\u2026');
  });

  it('defaults to size="md"', async () => {
    el = await createElement('cg-pagination');
    expect(el.getAttribute('size')).toBe('md');
  });

  it('reflects size="sm"', async () => {
    el = await createElement('cg-pagination', { size: 'sm' });
    expect(el.getAttribute('size')).toBe('sm');
  });

  it('reflects size="lg"', async () => {
    el = await createElement('cg-pagination', { size: 'lg' });
    expect(el.getAttribute('size')).toBe('lg');
  });

  it('has nav element with aria-label="Pagination"', async () => {
    el = await createElement('cg-pagination', { total: 5, current: 1 });
    const nav = el.shadowRoot!.querySelector('nav');
    expect(nav).not.toBeNull();
    expect(nav!.getAttribute('aria-label')).toBe('Pagination');
  });

  it('does not dispatch event when clicking the already active page', async () => {
    el = await createElement('cg-pagination', { total: 5, current: 3 });
    let eventFired = false;
    el.addEventListener('cg-page-change', () => { eventFired = true; });

    const active = el.shadowRoot!.querySelector('.page-btn.active') as HTMLButtonElement;
    active.click();

    expect(eventFired).toBe(false);
  });
});
