import { describe, it, expect, afterEach } from 'vitest';
import { CgBadgeGroup } from '../components/cg-badge-group/cg-badge-group.js';

if (!customElements.get('cg-badge-group')) {
  customElements.define('cg-badge-group', CgBadgeGroup);
}

describe('cg-badge-group', () => {
  let el: CgBadgeGroup;

  async function create(props?: Partial<CgBadgeGroup>): Promise<CgBadgeGroup> {
    el = document.createElement('cg-badge-group') as CgBadgeGroup;
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

  it('renders with shadow DOM', async () => {
    await create();
    expect(el.shadowRoot).toBeDefined();
  });

  it('renders a slot for children', async () => {
    await create();
    const slot = el.shadowRoot!.querySelector('slot');
    expect(slot).not.toBeNull();
  });

  it('displays label when set', async () => {
    await create({ label: 'Tags' });
    const label = el.shadowRoot!.querySelector('.label');
    expect(label).not.toBeNull();
    expect(label!.textContent).toBe('Tags');
  });

  it('hides label when not set', async () => {
    await create();
    const label = el.shadowRoot!.querySelector('.label');
    expect(label).toBeNull();
  });

  it('default gap is sm', async () => {
    await create();
    expect(el.gap).toBe('sm');
    expect(el.getAttribute('gap')).toBe('sm');
  });

  it('gap attribute reflects', async () => {
    await create({ gap: 'lg' });
    expect(el.getAttribute('gap')).toBe('lg');
  });

  it('shows overflow indicator when max and total are set', async () => {
    await create({ max: 3, total: 7 });
    const overflow = el.shadowRoot!.querySelector('.overflow');
    expect(overflow).not.toBeNull();
    expect(overflow!.textContent).toContain('+4');
  });

  it('hides overflow when total is within max', async () => {
    await create({ max: 5, total: 3 });
    const overflow = el.shadowRoot!.querySelector('.overflow');
    expect(overflow).toBeNull();
  });

  it('has group role with aria-label', async () => {
    await create({ label: 'Skills' });
    const group = el.shadowRoot!.querySelector('[role="group"]');
    expect(group).not.toBeNull();
    expect(group!.getAttribute('aria-label')).toBe('Skills');
  });
});
