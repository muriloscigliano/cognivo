import { describe, it, expect, afterEach } from 'vitest';
import { CgFollowUp } from '../components/cg-follow-up/cg-follow-up.js';

if (!customElements.get('cg-follow-up')) {
  customElements.define('cg-follow-up', CgFollowUp);
}

describe('cg-follow-up', () => {
  let el: CgFollowUp;

  async function create(props?: Partial<CgFollowUp>): Promise<CgFollowUp> {
    el = document.createElement('cg-follow-up') as CgFollowUp;
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

  it('renders items as buttons', async () => {
    await create({ items: ['Tell me more', 'Explain further', 'Give an example'] });
    const buttons = el.shadowRoot!.querySelectorAll('button:not(.more-badge)');
    expect(buttons.length).toBe(3);
  });

  it('accepts string items', async () => {
    await create({ items: ['Option A', 'Option B'] });
    const buttons = el.shadowRoot!.querySelectorAll('button:not(.more-badge)');
    expect(buttons[0]!.textContent).toContain('Option A');
  });

  it('accepts object items with text and icon', async () => {
    await create({ items: [{ text: 'Help', icon: '?' }] });
    const icon = el.shadowRoot!.querySelector('.icon');
    expect(icon).not.toBeNull();
  });

  it('displays label by default', async () => {
    await create({ items: ['A'] });
    const label = el.shadowRoot!.querySelector('.label');
    expect(label).not.toBeNull();
    expect(label!.textContent).toBe('Suggested');
  });

  it('hides label when hideLabel is true', async () => {
    await create({ items: ['A'], hideLabel: true });
    const header = el.shadowRoot!.querySelector('.header');
    expect(header).toBeNull();
  });

  it('shows loading shimmer when loading', async () => {
    await create({ loading: true });
    const shimmers = el.shadowRoot!.querySelectorAll('.shimmer');
    expect(shimmers.length).toBeGreaterThan(0);
  });

  it('respects maxVisible with overflow badge', async () => {
    await create({ items: ['A', 'B', 'C', 'D', 'E'], maxVisible: 3 });
    const buttons = el.shadowRoot!.querySelectorAll('button:not(.more-badge)');
    expect(buttons.length).toBe(3);
    const more = el.shadowRoot!.querySelector('.more-badge');
    expect(more).not.toBeNull();
    expect(more!.textContent).toContain('+2');
  });

  it('disabled prop disables all buttons', async () => {
    await create({ items: ['A', 'B'], disabled: true });
    const buttons = el.shadowRoot!.querySelectorAll('button:not(.more-badge)');
    buttons.forEach(btn => {
      expect((btn as HTMLButtonElement).disabled).toBe(true);
    });
  });

  it('variant attribute reflects', async () => {
    await create({ variant: 'cards' });
    expect(el.getAttribute('variant')).toBe('cards');
  });
});
