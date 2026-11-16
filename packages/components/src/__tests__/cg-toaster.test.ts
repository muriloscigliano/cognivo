import { describe, it, expect, afterEach } from 'vitest';
import { CgToaster } from '../components/cg-toaster/cg-toaster.js';

if (!customElements.get('cg-toaster')) {
  customElements.define('cg-toaster', CgToaster);
}

describe('cg-toaster', () => {
  let el: CgToaster;

  async function create(props?: Partial<CgToaster>): Promise<CgToaster> {
    el = document.createElement('cg-toaster') as CgToaster;
    if (props) for (const [k, v] of Object.entries(props)) (el as any)[k] = v;
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => { el?.clear?.(); el?.remove(); });

  it('renders with shadow DOM', async () => {
    await create();
    expect(el.shadowRoot!.querySelector('[role="region"]')).not.toBeNull();
  });

  it('default position is bottom-right', async () => {
    await create();
    expect(el.position).toBe('bottom-right');
  });

  it('default max is 5', async () => {
    await create();
    expect(el.max).toBe(5);
  });

  it('show() adds a toast', async () => {
    await create();
    el.show({ title: 'Hello', duration: 0 });
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.toast')).not.toBeNull();
  });

  it('dismiss() removes a toast', async () => {
    await create();
    const id = el.show({ title: 'Remove me', duration: 0 });
    await el.updateComplete;
    el.dismiss(id);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.toast')).toBeNull();
  });

  it('respects max stack', async () => {
    await create({ max: 2 });
    el.show({ title: '1', duration: 0 });
    el.show({ title: '2', duration: 0 });
    el.show({ title: '3', duration: 0 });
    await el.updateComplete;
    expect(el.shadowRoot!.querySelectorAll('.toast').length).toBe(2);
  });

  it('announces through two persistent live regions; the landmark and the cards are not live regions', async () => {
    await create();
    const region = el.shadowRoot!.querySelector('[role="region"]')!;
    // A live region per toast (role=status inserted with its content) is
    // often not announced, and nested regions double-announce. Two regions
    // that exist up front carry the announcements instead.
    expect(region.hasAttribute('aria-live')).toBe(false);
    expect(region.getAttribute('aria-label')).toBe('Notifications');
    // role=status / role=alert imply polite / assertive; no redundant aria-live.
    expect(el.shadowRoot!.querySelectorAll('[aria-live]').length).toBe(0);
    const polite = el.shadowRoot!.querySelector('[role="status"]')!;
    const assertive = el.shadowRoot!.querySelector('[role="alert"]')!;
    el.show({ title: 'Announce me', duration: 0 });
    el.show({ title: 'Failed', variant: 'error', duration: 0 });
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.toast')!.hasAttribute('role')).toBe(false);
    expect(polite.textContent!.trim()).toBe('Announce me');
    expect(assertive.textContent!.trim()).toBe('Failed');
  });

  it('evicted toasts dispatch cg-toaster-dismiss', async () => {
    await create({ max: 1 });
    const dismissed: string[] = [];
    el.addEventListener('cg-toaster-dismiss', e => {
      dismissed.push((e as CustomEvent<{ id: string }>).detail.id);
    });
    const first = el.show({ title: '1', duration: 0 });
    el.show({ title: '2', duration: 0 });
    await el.updateComplete;
    expect(dismissed).toEqual([first]);
  });
});
