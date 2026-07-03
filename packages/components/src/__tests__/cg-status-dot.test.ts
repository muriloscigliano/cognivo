import { describe, it, expect, afterEach } from 'vitest';
import { CgStatusDot } from '../components/cg-status-dot/cg-status-dot.js';

if (!customElements.get('cg-status-dot')) {
  customElements.define('cg-status-dot', CgStatusDot);
}

describe('cg-status-dot', () => {
  let el: CgStatusDot;

  async function create(props?: Partial<CgStatusDot>): Promise<CgStatusDot> {
    el = document.createElement('cg-status-dot') as CgStatusDot;
    if (props) for (const [k, v] of Object.entries(props)) (el as any)[k] = v;
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  afterEach(() => el?.remove());

  it('renders a dot', async () => {
    await create();
    expect(el.shadowRoot!.querySelector('.dot')).not.toBeNull();
  });

  it('reflects status and size', async () => {
    await create({ status: 'online', size: 'lg' });
    expect(el.getAttribute('status')).toBe('online');
    expect(el.getAttribute('size')).toBe('lg');
  });

  it('is aria-hidden when no label', async () => {
    await create();
    const dot = el.shadowRoot!.querySelector('.dot')!;
    expect(dot.getAttribute('aria-hidden')).toBe('true');
    expect(dot.getAttribute('role')).toBeNull();
  });

  it('exposes role=status and aria-label when labelled', async () => {
    await create({ status: 'busy', label: 'Do not disturb' });
    const dot = el.shadowRoot!.querySelector('.dot')!;
    expect(dot.getAttribute('role')).toBe('status');
    expect(dot.getAttribute('aria-label')).toBe('Do not disturb');
    expect(dot.getAttribute('aria-hidden')).toBeNull();
  });

  it('reflects pulse attribute', async () => {
    await create({ pulse: true });
    expect(el.hasAttribute('pulse')).toBe(true);
  });
});
