import { describe, it, expect, afterEach } from 'vitest';
import { CgCodeBlock } from '../components/cg-code-block/cg-code-block.js';

if (!customElements.get('cg-code-block')) {
  customElements.define('cg-code-block', CgCodeBlock);
}

describe('cg-code-block', () => {
  let el: CgCodeBlock;

  async function create(props?: Partial<CgCodeBlock>): Promise<CgCodeBlock> {
    el = document.createElement('cg-code-block') as CgCodeBlock;
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

  it('renders code in a pre element', async () => {
    await create({ code: 'const x = 1;' });
    const pre = el.shadowRoot!.querySelector('pre');
    expect(pre).not.toBeNull();
  });

  it('accepts code prop', async () => {
    await create({ code: 'console.log("hello")' });
    expect(el.code).toBe('console.log("hello")');
  });

  it('displays language badge when set', async () => {
    await create({ code: 'x = 1', language: 'python' });
    const lang = el.shadowRoot!.querySelector('.language');
    expect(lang).not.toBeNull();
    expect(lang!.textContent).toBe('python');
  });

  it('displays filename when set', async () => {
    await create({ code: 'x', filename: 'app.ts' });
    const filename = el.shadowRoot!.querySelector('.filename');
    expect(filename).not.toBeNull();
    expect(filename!.textContent).toBe('app.ts');
  });

  it('has a copy button', async () => {
    await create({ code: 'hello' });
    const btn = el.shadowRoot!.querySelector('.action-btn');
    expect(btn).not.toBeNull();
    expect(btn!.textContent).toContain('Copy');
  });

  it('copy button has accessible label', async () => {
    await create({ code: 'x' });
    const btn = el.shadowRoot!.querySelector('.action-btn');
    expect(btn!.getAttribute('aria-label')).toBe('Copy code to clipboard');
  });

  it('line-numbers attribute reflects', async () => {
    await create({ lineNumbers: true });
    expect(el.hasAttribute('line-numbers')).toBe(true);
  });

  it('renders header with dots', async () => {
    await create({ code: 'x' });
    const dots = el.shadowRoot!.querySelector('.dots');
    expect(dots).not.toBeNull();
    const dotChildren = dots!.querySelectorAll('.dot');
    expect(dotChildren.length).toBe(3);
  });

  it('default rounded is lg', async () => {
    await create();
    expect(el.rounded).toBe('lg');
    expect(el.getAttribute('rounded')).toBe('lg');
  });
});
