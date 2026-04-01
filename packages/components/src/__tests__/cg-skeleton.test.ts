import { describe, it, expect, afterEach } from 'vitest';
import { CgSkeleton } from '../components/cg-skeleton/cg-skeleton.js';

if (!customElements.get('cg-skeleton')) {
  customElements.define('cg-skeleton', CgSkeleton);
}

describe('cg-skeleton', () => {
  let el: CgSkeleton;

  async function create(props?: Partial<CgSkeleton>): Promise<CgSkeleton> {
    el = document.createElement('cg-skeleton') as CgSkeleton;
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
    expect(el.shadowRoot!.querySelector('.skeleton')).not.toBeNull();
  });

  it('default variant is rectangular', async () => {
    await create();
    expect(el.variant).toBe('rectangular');
    const skeleton = el.shadowRoot!.querySelector('.skeleton')!;
    expect(skeleton.classList.contains('rectangular')).toBe(true);
  });

  it('renders circular variant', async () => {
    await create({ variant: 'circular' });
    const skeleton = el.shadowRoot!.querySelector('.skeleton')!;
    expect(skeleton.classList.contains('circular')).toBe(true);
  });

  it('renders text variant with multiple lines', async () => {
    await create({ variant: 'text', lines: 3 });
    const lines = el.shadowRoot!.querySelectorAll('.text-line');
    expect(lines.length).toBe(3);
  });

  it('text variant defaults to 3 lines', async () => {
    await create({ variant: 'text' });
    const lines = el.shadowRoot!.querySelectorAll('.text-line');
    expect(lines.length).toBe(3);
  });

  it('has status role with aria-label', async () => {
    await create();
    const skeleton = el.shadowRoot!.querySelector('[role="status"]');
    expect(skeleton).not.toBeNull();
    expect(skeleton!.getAttribute('aria-label')).toContain('Loading');
  });

  it('applies custom width and height', async () => {
    await create({ width: '200px', height: '100px' });
    const skeleton = el.shadowRoot!.querySelector('.skeleton') as HTMLElement;
    expect(skeleton.style.width).toBe('200px');
    expect(skeleton.style.height).toBe('100px');
  });

  it('default width is 100%', async () => {
    await create();
    expect(el.width).toBe('100%');
  });
});
