import { describe, it, expect, afterEach } from 'vitest';
import { CgToolbar } from '../components/cg-toolbar/cg-toolbar.js';

if (!customElements.get('cg-toolbar')) {
  customElements.define('cg-toolbar', CgToolbar);
}

describe('cg-toolbar', () => {
  let el: CgToolbar;

  async function create(html = '', props?: Partial<CgToolbar>): Promise<CgToolbar> {
    el = document.createElement('cg-toolbar') as CgToolbar;
    if (props) for (const [k, v] of Object.entries(props)) (el as any)[k] = v;
    el.innerHTML = html;
    document.body.appendChild(el);
    await el.updateComplete;
    // allow slotchange to fire
    await new Promise((r) => requestAnimationFrame(r));
    return el;
  }

  const THREE = '<button>a</button><button>b</button><button>c</button>';

  afterEach(() => el?.remove());

  it('renders with shadow DOM', async () => {
    await create();
    expect(el.shadowRoot).toBeDefined();
  });

  it('has role="toolbar"', async () => {
    await create();
    expect(el.shadowRoot!.querySelector('[role="toolbar"]')).not.toBeNull();
  });

  it('reflects orientation to aria-orientation', async () => {
    await create('', { orientation: 'vertical' });
    const root = el.shadowRoot!.querySelector('[role="toolbar"]')!;
    expect(root.getAttribute('aria-orientation')).toBe('vertical');
  });

  it('uses label as aria-label', async () => {
    await create('', { label: 'Formatting' });
    const root = el.shadowRoot!.querySelector('[role="toolbar"]')!;
    expect(root.getAttribute('aria-label')).toBe('Formatting');
  });

  it('reflects size attribute', async () => {
    await create('', { size: 'lg' });
    expect(el.getAttribute('size')).toBe('lg');
  });

  it('applies roving tabindex — only first item tabbable', async () => {
    await create(THREE);
    const btns = Array.from(el.querySelectorAll('button'));
    expect(btns[0].tabIndex).toBe(0);
    expect(btns[1].tabIndex).toBe(-1);
    expect(btns[2].tabIndex).toBe(-1);
  });

  it('ArrowRight moves roving item forward', async () => {
    await create(THREE);
    const btns = Array.from(el.querySelectorAll('button'));
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    await el.updateComplete;
    expect(btns[1].tabIndex).toBe(0);
    expect(btns[0].tabIndex).toBe(-1);
  });

  it('ArrowLeft wraps from first to last', async () => {
    await create(THREE);
    const btns = Array.from(el.querySelectorAll('button'));
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    await el.updateComplete;
    expect(btns[2].tabIndex).toBe(0);
  });

  it('Home/End jump to first/last', async () => {
    await create(THREE);
    const btns = Array.from(el.querySelectorAll('button'));
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
    await el.updateComplete;
    expect(btns[2].tabIndex).toBe(0);
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
    await el.updateComplete;
    expect(btns[0].tabIndex).toBe(0);
  });

  it('vertical orientation uses ArrowDown/ArrowUp', async () => {
    await create(THREE, { orientation: 'vertical' });
    const btns = Array.from(el.querySelectorAll('button'));
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await el.updateComplete;
    expect(btns[1].tabIndex).toBe(0);
  });

  it('skips disabled items', async () => {
    await create('<button>a</button><button disabled>b</button><button>c</button>');
    const btns = Array.from(el.querySelectorAll('button'));
    // disabled button is excluded from focusable set → first tabbable is btns[0], next is btns[2]
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    await el.updateComplete;
    expect(btns[2].tabIndex).toBe(0);
    expect(btns[1].tabIndex).not.toBe(0);
  });

  it('handles empty toolbar without throwing', async () => {
    await create('');
    expect(() => {
      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    }).not.toThrow();
  });
});
