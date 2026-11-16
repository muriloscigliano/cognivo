// @vitest-environment happy-dom
/**
 * Runtime behaviour of the wrappers under a real react-dom.
 *
 * Issue (create-wrapper.ts): a prop the element defines but `propNames` does
 * not list (CgInput `label`, `required`) was sent as an ATTRIBUTE on the
 * first render — the instance did not exist yet — and dropped from the
 * attributes on every later render, once the instance existed. React then
 * removed the attribute, which reset the property (label → null, required →
 * false) until the effect set it again: a flicker, an extra Lit update and a
 * transient invalid form on every re-render.
 */
import { describe, it, expect, afterEach } from 'vitest';
import { createElement, act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import '@cognivo/components/cg-input';
import '@cognivo/components/cg-link';
import '@cognivo/components/cg-pagination';
import { CgInput, CgLink, CgPagination, CgTable } from '../index.js';

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

let root: Root | undefined;
let host: HTMLElement | undefined;

function mount(): Root {
  host = document.createElement('div');
  document.body.append(host);
  root = createRoot(host);
  return root;
}

afterEach(() => {
  act(() => root?.unmount());
  host?.remove();
  root = undefined;
});

describe('createWrapper at runtime (react-dom)', () => {
  it('an element prop missing from propNames survives re-renders without ever being reset', async () => {
    const r = mount();
    act(() => r.render(createElement(CgInput, { label: 'E-mail', required: true, placeholder: 'a' })));
    const el = host!.querySelector('cg-input') as HTMLElement & { label: string | null; required: boolean };
    expect(el.label).toBe('E-mail');
    expect(el.required).toBe(true);

    const seen: Array<[string | null, boolean]> = [];
    const watch = new MutationObserver(() => seen.push([el.label, el.required]));
    watch.observe(el, { attributes: true });
    // Spy on the class accessor (an own property on the instance would trip
    // Lit's class-field-shadowing check).
    const labels: Array<string | null> = [];
    const proto = Object.getPrototypeOf(el) as object;
    const desc = Object.getOwnPropertyDescriptor(proto, 'label')!;
    Object.defineProperty(proto, 'label', {
      ...desc,
      set(v: string | null) { labels.push(v); desc.set!.call(this, v); },
    });
    try {
      for (const p of ['b', 'c', 'd']) {
        act(() => r.render(createElement(CgInput, { label: 'E-mail', required: true, placeholder: p })));
      }
      await Promise.resolve();
    } finally {
      Object.defineProperty(proto, 'label', desc);
      watch.disconnect();
    }
    expect(el.label).toBe('E-mail');
    expect(el.required).toBe(true);
    expect(labels.filter((v) => v !== 'E-mail')).toEqual([]);
    expect(seen.filter(([l, req]) => l !== 'E-mail' || !req)).toEqual([]);
  });

  it('onClick is the native React click; the custom event has its own prop', () => {
    const r = mount();
    const clicks: string[] = [];
    act(() =>
      r.render(
        createElement(CgLink, {
          href: '#x',
          onClick: (e: { type: string; nativeEvent?: Event }) => clicks.push(`react:${e.nativeEvent?.constructor.name ?? e.type}`),
          onLinkClick: (e: CustomEvent) => clicks.push(`custom:${e.type}`),
        } as never),
      ),
    );
    const el = host!.querySelector('cg-link') as HTMLElement;
    act(() => { el.dispatchEvent(new CustomEvent('cg-link-click', { bubbles: true, composed: true })); });
    act(() => { el.click(); });
    expect(clicks).toContain('custom:cg-link-click');
    expect(clicks.some((c) => c.startsWith('react:') && !c.includes('CustomEvent'))).toBe(true);
    expect(clicks.filter((c) => c.startsWith('react:')).length).toBe(1);
  });

  it('CgTable: name, controlled sort and rich-cell children reach the element; onSortChange gets the requested sort', async () => {
    // happy-dom cannot parse cg-table's row templates, so the React root lives
    // in a detached container: the element is created and upgraded (props,
    // events) but never connected, so it does not render.
    const { CgTable: El } = await import('@cognivo/components/cg-table');
    const r = mount();
    host!.remove();
    const asked: unknown[] = [];
    const columns = [{ key: 'company', label: 'Company', sortable: true, rowHeader: true, slotted: true }];
    act(() =>
      r.render(
        createElement(
          CgTable,
          {
            caption: 'Open deals', captionHidden: true, label: 'Deals', labelledby: 'h', manualSort: true,
            sort: { key: 'company', direction: 'desc' }, columns, rows: [['Acme']],
            onSortChange: (e: CustomEvent) => asked.push(e.detail),
          },
          createElement('a', { slot: 'cell-0-company', href: '#acme' }, 'Acme'),
        ),
      ),
    );
    const el = host!.querySelector('cg-table') as InstanceType<typeof El>;
    expect(el).toBeInstanceOf(El);
    expect({ caption: el.caption, captionHidden: el.captionHidden, label: el.label, labelledby: el.labelledby, manualSort: el.manualSort, sort: el.sort })
      .toEqual({ caption: 'Open deals', captionHidden: true, label: 'Deals', labelledby: 'h', manualSort: true, sort: { key: 'company', direction: 'desc' } });
    expect(el.columns).toBe(columns);
    expect(el.querySelector('a[slot="cell-0-company"]')?.textContent).toBe('Acme');
    act(() => { (el as unknown as { _handleSort(c: unknown): void })._handleSort(columns[0]); });
    expect(asked).toEqual([{ key: 'company', direction: 'asc' }]);
    expect(el.sort).toEqual({ key: 'company', direction: 'desc' }); // controlled: unchanged until the parent re-renders
  });

  it('CgPagination cursor mode: props reach the element; onPageChange gets the direction', async () => {
    const r = mount();
    const got: unknown[] = [];
    act(() => r.render(createElement(CgPagination, { mode: 'cursor', hasNext: true, hasPrevious: false, onPageChange: (e: CustomEvent) => got.push(e.detail) })));
    const el = host!.querySelector('cg-pagination') as HTMLElement & { mode: string; hasNext: boolean; hasPrevious: boolean; updateComplete: Promise<unknown> };
    expect([el.mode, el.hasNext, el.hasPrevious]).toEqual(['cursor', true, false]);
    await el.updateComplete;
    const buttons = [...el.shadowRoot!.querySelectorAll('button')];
    act(() => { buttons.forEach((b) => b.click()); });
    expect(got).toEqual([{ direction: 'next' }]);
  });
});
