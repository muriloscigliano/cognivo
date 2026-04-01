import { describe, it, expect, afterEach } from 'vitest';
import { CgSteps } from '../components/cg-steps/cg-steps.js';

if (!customElements.get('cg-steps')) {
  customElements.define('cg-steps', CgSteps);
}

describe('cg-steps', () => {
  let el: CgSteps;

  async function create(props?: Partial<CgSteps>): Promise<CgSteps> {
    el = document.createElement('cg-steps') as CgSteps;
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

  const sampleItems = [
    { title: 'Step 1', status: 'done' as const },
    { title: 'Step 2', status: 'active' as const },
    { title: 'Step 3', status: 'pending' as const },
  ];

  it('renders with shadow DOM', async () => {
    await create({ items: sampleItems });
    expect(el.shadowRoot).toBeDefined();
  });

  it('renders correct number of steps', async () => {
    await create({ items: sampleItems });
    const circles = el.shadowRoot!.querySelectorAll('.circle');
    expect(circles.length).toBe(3);
  });

  it('default direction is vertical', async () => {
    await create({ items: sampleItems });
    expect(el.direction).toBe('vertical');
    const vertical = el.shadowRoot!.querySelector('.steps-vertical');
    expect(vertical).not.toBeNull();
  });

  it('renders horizontal direction', async () => {
    await create({ items: sampleItems, direction: 'horizontal' });
    const horizontal = el.shadowRoot!.querySelector('.steps-horizontal');
    expect(horizontal).not.toBeNull();
  });

  it('applies done status class', async () => {
    await create({ items: sampleItems });
    const circles = el.shadowRoot!.querySelectorAll('.circle');
    expect(circles[0].classList.contains('done')).toBe(true);
  });

  it('applies active status class', async () => {
    await create({ items: sampleItems });
    const circles = el.shadowRoot!.querySelectorAll('.circle');
    expect(circles[1].classList.contains('active')).toBe(true);
  });

  it('renders step titles', async () => {
    await create({ items: sampleItems });
    const titles = el.shadowRoot!.querySelectorAll('.title');
    expect(titles[0].textContent).toContain('Step 1');
    expect(titles[1].textContent).toContain('Step 2');
  });

  it('renders descriptions when provided', async () => {
    await create({ items: [{ title: 'S1', description: 'Details here', status: 'active' }] });
    const desc = el.shadowRoot!.querySelector('.desc');
    expect(desc).not.toBeNull();
    expect(desc!.textContent).toContain('Details here');
  });

  it('renders connecting lines between vertical steps', async () => {
    await create({ items: sampleItems });
    const lines = el.shadowRoot!.querySelectorAll('.v-line');
    expect(lines.length).toBe(2); // n-1 lines
  });

  it('renders error status', async () => {
    await create({ items: [{ title: 'Failed', status: 'error' }] });
    const circle = el.shadowRoot!.querySelector('.circle')!;
    expect(circle.classList.contains('error')).toBe(true);
  });
});
